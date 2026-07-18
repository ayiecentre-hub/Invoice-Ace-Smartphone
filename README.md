# 📱 ACE Books — ACE Smartphone

A simple, shared accounting + invoice tool for **ACE Smartphone** (Kepala Batas).
Record repairs, sales, expenses and supplier invoices. See profit, a P&L report,
and smart analysis — live, shared across your whole team.

**Stack:** plain HTML/JS (no build step) + [Supabase](https://supabase.com)
(database) + [Vercel](https://vercel.com) (hosting). All free tier.

---

## What you get

- ➕ Record sales / repairs (customer, iPhone model, service, charge, part cost)
- 💸 Record expenses
- 📦 Supplier invoice tracker (paid / belum bayar) for daily sparepart orders
- 📊 Live **P&L report** (Untung Rugi)
- 🧠 **Smart Analysis** — best service, margin, cashflow warnings
- 👥 **Shared database** — every staff member sees the same data, updated live

---

## Setup — do this once (about 10 minutes)

### 1. Create a free Supabase project
1. Go to **https://supabase.com** → sign up (free) → **New project**.
2. Name it `ace-books`, set a database password, pick the Singapore region.
3. Wait ~2 minutes for it to finish setting up.

### 2. Create the database tables
1. In your Supabase project → left sidebar → **SQL Editor** → **New query**.
2. Open the file **`supabase-schema.sql`** from this repo, copy everything,
   paste it in, and click **Run**.
3. You should see "Success". Your two tables are ready.

### 3. Get your two keys
1. Supabase → **Project Settings** (gear icon) → **API**.
2. Copy the **Project URL**.
3. Copy the **`anon` `public`** key (the long one under "Project API keys").
   > ⚠️ Use the **anon public** key only. Never the `service_role` key.

### 4. Put the keys in the app
1. Open **`config.js`**.
2. Paste your **Project URL** and **anon public key** into the two spots.
3. Save.

### 5. Test it locally (optional)
Open `index.html` in your browser. Bottom of the page should say
**"Database connected"**. Add a test record — refresh — it stays. ✅

---

## Deploy to Vercel (get your shareable link)

### Easiest way — no terminal
1. Push this repo to GitHub (see below).
2. Go to **https://vercel.com** → sign up with GitHub (free).
3. **Add New → Project** → import `Invoice-Ace-Smartphone`.
4. Framework preset: **Other**. Leave everything default. Click **Deploy**.
5. In ~30 seconds you get a link like `https://invoice-ace-smartphone.vercel.app`.

**That's the link you share with your team.** 🎉
Anyone who opens it uses the same live database.

---

## Push this to your GitHub

Everything is already committed locally. To push to
`https://github.com/ayiecentre-hub/Invoice-Ace-Smartphone`:

```bash
cd Invoice-Ace-Smartphone
git remote add origin https://github.com/ayiecentre-hub/Invoice-Ace-Smartphone.git
git branch -M main
git push -u origin main
```

Git will ask you to log in to GitHub the first time (use a
**Personal Access Token** as the password — GitHub → Settings → Developer
settings → Personal access tokens). This keeps your account secure — nobody
else ever handles your login.

> No terminal? On the GitHub repo page click **"uploading an existing file"**
> and drag all these files in. Same result.

---

## A note on security (read this)

Right now the app uses Supabase's **anon** access — meaning **anyone who has the
link + the app can read and write records.** That is fine for a **private team
link you don't share publicly.**

For proper per-staff logins (each person signs in, you control who sees what),
turn on **Supabase Auth** and tighten the policies in `supabase-schema.sql`
(change `to anon` → `to authenticated`). That's the recommended next step —
worth doing at your consultation.

## What this does NOT do (yet)
- Auto-scanning receipts / bank statements (needs an AI OCR pipeline)
- Bank reconciliation (needs a bank data connection)
- Full balance sheet (needs assets / capital data)

These are real, separate builds — good candidates for phase 2.
