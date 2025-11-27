# Panduan Setup EmailJS untuk E-Tiket Otomatis

Untuk mengaktifkan fitur pengiriman email otomatis, Anda perlu mendapatkan 3 "kunci" dari EmailJS. Layanan ini **GRATIS** untuk penggunaan dasar (hingga 200 email/bulan).

## Langkah 1: Daftar Akun (Gratis)

1. Buka [https://www.emailjs.com/](https://www.emailjs.com/)
2. Klik **"Sign Up Free"**.
3. Isi data diri dan buat akun.

## Langkah 2: Buat Email Service (Dapatkan `YOUR_SERVICE_ID`)

1. Di dashboard EmailJS, klik tab **"Email Services"**.
2. Klik **"Add New Service"**.
3. Pilih **Gmail** (atau layanan email lain yang Anda gunakan).
4. Klik **"Connect Account"** dan login dengan akun Gmail yang akan digunakan sebagai pengirim.
5. Klik **"Create Service"**.
6. **COPY** `Service ID` yang muncul (biasanya formatnya `service_xxxx`).
   - 👉 Masukkan ini ke `EMAILJS_SERVICE_ID` di file `emailService.js`.

## Langkah 3: Buat Email Template (Dapatkan `YOUR_TEMPLATE_ID`)

1. Klik tab **"Email Templates"** di sebelah kiri.
2. Klik **"Create New Template"**.
3. Di editor template, Anda bisa mendesain subjek dan isi email.
   - **Subject**: `E-Tiket Wisata Sumba Culture`
   - **Content**: Hapus semua isinya, lalu ketik `{{{ticket_html}}}` (gunakan 3 kurung kurawal).
     - _Kenapa?_ Karena kode kita sudah membuat desain tiket yang cantik secara otomatis. Jadi di sini kita hanya perlu "wadah" untuk menaruh desain tersebut.
4. Klik **"Save"**.
5. Klik tab **"Settings"** di atas editor template.
6. **COPY** `Template ID` (biasanya formatnya `template_xxxx`).
   - 👉 Masukkan ini ke `EMAILJS_TEMPLATE_ID` di file `emailService.js`.

## Langkah 4: Ambil Public Key (Dapatkan `YOUR_PUBLIC_KEY`)

1. Klik nama akun Anda di pojok kanan atas dashboard, lalu pilih **"Account"** (atau klik tab **"Account"** di menu kiri jika ada).
2. Cari bagian **"API Keys"**.
3. **COPY** `Public Key` (kode acak panjang).
   - 👉 Masukkan ini ke `EMAILJS_PUBLIC_KEY` di file `emailService.js`.

---

## Contoh Hasil di `src/services/emailService.js`:

```javascript
const EMAILJS_SERVICE_ID = 'service_a1b2c3d'
const EMAILJS_TEMPLATE_ID = 'template_x9y8z7'
const EMAILJS_PUBLIC_KEY = 'user_1234567890abcdef'
```

Setelah 3 data ini diisi, fitur E-Tiket otomatis akan langsung berfungsi! 🚀
