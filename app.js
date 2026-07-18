// ============================================================
//  ACE Books — app logic (Supabase-backed, shared team data)
// ============================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cfg = window.ACE_CONFIG || {};
const configured =
  cfg.SUPABASE_URL &&
  cfg.SUPABASE_ANON_KEY &&
  !cfg.SUPABASE_URL.includes("PASTE_") &&
  !cfg.SUPABASE_ANON_KEY.includes("PASTE_");

const rm = (n) => "RM" + Number(n || 0).toLocaleString("en-MY", { maximumFractionDigits: 0 });
const $ = (id) => document.getElementById(id);
const setConn = (txt, cls) => { $("connTxt").textContent = txt; $("connDot").className = "dot " + (cls || ""); };

let supabase = null;
let TX = [];   // transactions
let INV = [];  // supplier invoices

// ---------- guard: not configured yet ----------
if (!configured) {
  $("setup").style.display = "block";
  $("empty").textContent = "Setup config.js dulu.";
  $("invEmpty").textContent = "Setup config.js dulu.";
  setConn("Belum disambung — isi config.js", "bad");
} else {
  supabase = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  init();
}

async function init() {
  setConn("Menyambung ke database…");
  await refresh();
  wireEvents();
  subscribeRealtime();
}

// ---------- data ----------
async function refresh() {
  try {
    const [txRes, invRes] = await Promise.all([
      supabase.from("transactions").select("*").order("tdate", { ascending: false }).order("created_at", { ascending: false }),
      supabase.from("supplier_invoices").select("*").order("inv_date", { ascending: false }).order("created_at", { ascending: false }),
    ]);
    if (txRes.error) throw txRes.error;
    if (invRes.error) throw invRes.error;
    TX = txRes.data || [];
    INV = invRes.data || [];
    setConn("Database connected · " + (TX.length + INV.length) + " rekod", "ok");
    renderAll();
  } catch (e) {
    console.error(e);
    setConn("Error: " + (e.message || e) + " — check config / schema", "bad");
  }
}

function subscribeRealtime() {
  supabase
    .channel("ace-books")
    .on("postgres_changes", { event: "*", schema: "public", table: "transactions" }, refresh)
    .on("postgres_changes", { event: "*", schema: "public", table: "supplier_invoices" }, refresh)
    .subscribe();
}

// ---------- add / delete ----------
let type = "sale";

function wireEvents() {
  document.querySelectorAll(".seg button").forEach((b) =>
    b.addEventListener("click", () => setType(b.dataset.type))
  );
  $("btnAdd").addEventListener("click", addRecord);
  $("btnInv").addEventListener("click", addInvoice);
}

function setType(t) {
  type = t;
  $("tSale").classList.toggle("on", t === "sale");
  $("tExp").classList.toggle("on", t === "expense");
  $("saleFields").style.display = t === "sale" ? "block" : "none";
  $("expFields").style.display = t === "expense" ? "block" : "none";
}

async function addRecord() {
  let row;
  if (type === "sale") {
    const amount = +$("amount").value || 0;
    if (!amount) return alert("Isi charge customer dulu.");
    row = {
      type: "sale",
      description: $("desc").value || "Repair",
      model: $("model").value,
      service: $("service").value,
      amount,
      cost: +$("cost").value || 0,
    };
  } else {
    const amount = +$("eamount").value || 0;
    if (!amount) return alert("Isi amount dulu.");
    row = { type: "expense", description: $("edesc").value || "Expense", amount, cost: 0 };
  }
  $("btnAdd").disabled = true;
  const { error } = await supabase.from("transactions").insert(row);
  $("btnAdd").disabled = false;
  if (error) return alert("Tak dapat simpan: " + error.message);
  ["desc", "model", "amount", "cost", "edesc", "eamount"].forEach((id) => ($(id).value = ""));
  await refresh();
}

async function del(id) {
  if (!confirm("Padam rekod ni?")) return;
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) return alert(error.message);
  await refresh();
}

async function addInvoice() {
  const amount = +$("iAmount").value || 0;
  if (!amount) return alert("Isi jumlah invois dulu.");
  const row = {
    supplier: $("iSupplier").value || "Supplier",
    inv_no: $("iNo").value || "-",
    inv_date: $("iDate").value || new Date().toISOString().slice(0, 10),
    items: $("iItems").value || "",
    amount,
    status: $("iStatus").value,
  };
  $("btnInv").disabled = true;
  const { error } = await supabase.from("supplier_invoices").insert(row);
  $("btnInv").disabled = false;
  if (error) return alert("Tak dapat simpan: " + error.message);
  ["iSupplier", "iNo", "iItems", "iAmount"].forEach((id) => ($(id).value = ""));
  await refresh();
}

async function delInv(id) {
  if (!confirm("Padam invois ni?")) return;
  const { error } = await supabase.from("supplier_invoices").delete().eq("id", id);
  if (error) return alert(error.message);
  await refresh();
}

async function toggleInv(id) {
  const r = INV.find((x) => x.id === id);
  if (!r) return;
  const { error } = await supabase
    .from("supplier_invoices")
    .update({ status: r.status === "paid" ? "unpaid" : "paid" })
    .eq("id", id);
  if (error) return alert(error.message);
  await refresh();
}

// expose handlers used in inline onclick
window.del = del;
window.delInv = delInv;
window.toggleInv = toggleInv;

// ---------- render ----------
function renderAll() {
  renderTx();
  renderInv();
  renderReports();
}

function renderTx() {
  const now = new Date();
  const sameMonth = (d) => { const x = new Date(d); return x.getMonth() === now.getMonth() && x.getFullYear() === now.getFullYear(); };
  const sameDay = (d) => new Date(d).toDateString() === now.toDateString();

  let sToday = 0, sMonth = 0, cMonth = 0, expMonth = 0, jobs = 0;
  TX.forEach((r) => {
    if (r.type === "sale") {
      if (sameDay(r.tdate)) sToday += +r.amount;
      if (sameMonth(r.tdate)) { sMonth += +r.amount; cMonth += +(r.cost || 0); jobs++; }
    } else if (r.type === "expense" && sameMonth(r.tdate)) expMonth += +r.amount;
  });
  const profit = sMonth - cMonth - expMonth;
  $("sToday").textContent = rm(sToday);
  $("sMonth").textContent = rm(sMonth);
  $("sProfit").textContent = rm(profit);
  $("sJobs").textContent = jobs;

  const margin = sMonth ? Math.max(0, Math.round((profit / sMonth) * 100)) : 0;
  $("marginBar").style.width = margin + "%";
  $("marginTxt").textContent = sMonth ? "Margin bulan ini: " + margin + "% untung" : "Margin bulan ini: —";

  $("empty").style.display = TX.length ? "none" : "block";
  if (!TX.length) $("empty").textContent = "Belum ada rekod. Tambah yang pertama lah. 👈";
  $("rows").innerHTML = TX.slice(0, 60).map((r) => {
    const d = new Date(r.tdate).toLocaleDateString("en-MY", { day: "2-digit", month: "short" });
    if (r.type === "sale") {
      const prof = +r.amount - +(r.cost || 0);
      return `<tr><td>${d}</td>
        <td>${esc(r.description)}<br><span class="tag">${esc(r.model || "")} ${esc(r.service || "")}</span></td>
        <td><span class="tag">Sale</span></td>
        <td class="amt-in">${rm(prof)}</td>
        <td class="amt-in">${rm(r.amount)}</td>
        <td><button class="del" onclick="del('${r.id}')">×</button></td></tr>`;
    }
    return `<tr><td>${d}</td><td>${esc(r.description)}</td>
      <td><span class="tag">Expense</span></td>
      <td>—</td><td class="amt-out">-${rm(r.amount)}</td>
      <td><button class="del" onclick="del('${r.id}')">×</button></td></tr>`;
  }).join("");
}

function renderInv() {
  const now = new Date();
  let unpaid = 0, partsMonth = 0;
  INV.forEach((r) => {
    if (r.status === "unpaid") unpaid += +r.amount;
    const x = new Date(r.inv_date);
    if (x.getMonth() === now.getMonth() && x.getFullYear() === now.getFullYear()) partsMonth += +r.amount;
  });
  $("sUnpaid").textContent = rm(unpaid);
  $("sParts").textContent = rm(partsMonth);

  $("invEmpty").style.display = INV.length ? "none" : "block";
  if (!INV.length) $("invEmpty").textContent = "Belum ada invois supplier. Simpan yang pertama. 👈";
  $("invRows").innerHTML = INV.slice(0, 60).map((r) => {
    const badge = r.status === "paid"
      ? `<span class="tag" style="color:var(--green)">Dah bayar</span>`
      : `<span class="tag" style="color:var(--red)">Belum bayar</span>`;
    return `<tr><td>${new Date(r.inv_date).toLocaleDateString("en-MY", { day: "2-digit", month: "short" })}</td>
      <td>${esc(r.supplier)}</td><td>${esc(r.inv_no)}</td>
      <td style="font-size:12px;color:var(--sub)">${esc(r.items)}</td>
      <td class="amt-out">${rm(r.amount)}</td>
      <td style="cursor:pointer" onclick="toggleInv('${r.id}')" title="Klik tukar status">${badge}</td>
      <td><button class="del" onclick="delInv('${r.id}')">×</button></td></tr>`;
  }).join("");
}

function renderReports() {
  const now = new Date();
  const sm = (d) => { const x = new Date(d); return x.getMonth() === now.getMonth() && x.getFullYear() === now.getFullYear(); };
  const sales = TX.filter((r) => r.type === "sale" && sm(r.tdate));
  const exps = TX.filter((r) => r.type === "expense" && sm(r.tdate));

  const totalSales = sales.reduce((a, r) => a + +r.amount, 0);
  const partsCost = sales.reduce((a, r) => a + +(r.cost || 0), 0);
  const gross = totalSales - partsCost;
  const otherExp = exps.reduce((a, r) => a + +r.amount, 0);
  const net = gross - otherExp;

  $("plSales").textContent = rm(totalSales);
  $("plParts").textContent = "−" + rm(partsCost);
  $("plGross").textContent = rm(gross);
  $("plExp").textContent = "−" + rm(otherExp);
  const netEl = $("plNet");
  netEl.textContent = rm(net);
  netEl.className = net >= 0 ? "amt-in" : "amt-out";

  const tips = [];
  if (sales.length) {
    const byService = {};
    sales.forEach((r) => { const k = r.service || "Other"; byService[k] = (byService[k] || 0) + (+r.amount - +(r.cost || 0)); });
    const top = Object.entries(byService).sort((a, b) => b[1] - a[1])[0];
    tips.push(`💰 Servis paling untung bulan ni: <b>${esc(top[0])}</b> — ${rm(top[1])} untung. Push benda ni dalam content kau.`);
    tips.push(`🎫 Purata satu job: <b>${rm(totalSales / sales.length)}</b> (${sales.length} jobs).`);
    const margin = totalSales ? Math.round((gross / totalSales) * 100) : 0;
    tips.push(margin >= 50
      ? `📈 Margin kasar <b>${margin}%</b> — sihat. Kau charge betul.`
      : `⚠️ Margin kasar <b>${margin}%</b> — kos part makan untung. Tengok balik pricing / supplier.`);
  }
  const unpaid = INV.filter((r) => r.status === "unpaid").reduce((a, r) => a + +r.amount, 0);
  if (unpaid > 0) tips.push(`🔴 Kau ada <b>${rm(unpaid)}</b> belum bayar supplier. Jangan lupa cashflow.`);
  if (net < 0) tips.push(`🚨 Bulan ni <b>rugi ${rm(-net)}</b> setakat ni. Kena kejar sales atau potong expenses.`);

  $("smart").innerHTML = tips.length
    ? tips.map((t) => `<p style="margin:10px 0;font-size:14px;line-height:1.5">${t}</p>`).join("")
    : '<div class="empty">Tambah beberapa rekod, nanti sini keluar insight bisnes kau.</div>';
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
