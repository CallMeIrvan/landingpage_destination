# Setup Firebase untuk Sistem Admin

## Langkah-langkah Setup Firebase

### 1. Buat Project Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Create a project" atau "Add project"
3. Masukkan nama project (contoh: `sumba-tourism-admin`)
4. Pilih apakah ingin menggunakan Google Analytics (opsional)
5. Klik "Create project"

### 2. Setup Authentication

1. Di Firebase Console, pilih project Anda
2. Klik "Authentication" di sidebar kiri
3. Klik "Get started"
4. Pilih tab "Sign-in method"
5. Aktifkan "Email/Password" provider
6. Klik "Save"

### 3. Setup Firestore Database

1. Klik "Firestore Database" di sidebar kiri
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi server (pilih yang terdekat dengan Indonesia)
5. Klik "Done"

### 4. Dapatkan Konfigurasi Firebase

1. Klik ikon gear (Settings) di sidebar kiri
2. Pilih "Project settings"
3. Scroll ke bawah ke bagian "Your apps"
4. Klik ikon web (`</>`) untuk menambahkan web app
5. Masukkan nama app (contoh: `sumba-tourism-web`)
6. Klik "Register app"
7. Copy konfigurasi Firebase yang diberikan

### 5. Update Konfigurasi di Kode

Buka file `src/config/firebase.js` dan ganti konfigurasi dengan yang Anda dapatkan:

```javascript
const firebaseConfig = {
  apiKey: 'your-actual-api-key',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project-id.appspot.com',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
}
```

### 6. Buat Admin User

Setelah Firebase dikonfigurasi, Anda perlu membuat user admin. **PENTING**: Admin menggunakan sistem terpisah dari user biasa dengan validasi domain email.

#### Cara 1: Menggunakan Browser Console (Paling Mudah)

1. Jalankan aplikasi: `npm run dev`
2. Buka browser dan buka Developer Tools (F12)
3. Di Console, copy dan paste script berikut:

```javascript
;(async function createAdminUser() {
  try {
    // Import Firebase functions dari aplikasi yang sudah berjalan
    const { createUserWithEmailAndPassword } = await import('firebase/auth')
    const { auth } = await import('./src/config/firebase.js')
    const { createAdminWithRole, ADMIN_ROLES } = await import('./src/services/adminService.js')

    console.log('🔥 Membuat admin user dengan role...')

    // Buat user di Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      'admin@sumbaculture.com',
      'admin123',
    )

    // Buat admin dengan role di Firestore
    const adminData = await createAdminWithRole(
      userCredential.user.uid,
      userCredential.user.email,
      ADMIN_ROLES.SUPER_ADMIN,
    )

    console.log('✅ Admin user berhasil dibuat!')
    console.log('📧 Email:', userCredential.user.email)
    console.log('🆔 UID:', userCredential.user.uid)
    console.log('👑 Role:', adminData.role)
    console.log('🔑 Permissions:', adminData.permissions)
    console.log('🔗 Silakan login di: http://localhost:5173/admin/login')
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️ Admin user sudah ada!')
      console.log('🔗 Silakan login di: http://localhost:5173/admin/login')
    } else if (error.code === 'auth/operation-not-allowed') {
      console.error('❌ Error: Email/Password authentication tidak diaktifkan')
      console.log(
        '💡 Solusi: Aktifkan Email/Password di Firebase Console > Authentication > Sign-in method',
      )
    } else if (error.message.includes('domain admin')) {
      console.error('❌ Error: Email harus menggunakan domain admin yang valid')
      console.log('💡 Gunakan email dengan domain: @sumbaculture.com')
    } else {
      console.error('❌ Error membuat admin:', error.message)
      console.log('💡 Pastikan Firebase sudah dikonfigurasi dengan benar')
    }
  }
})()
```

4. Tekan Enter untuk menjalankan script

#### Cara 2: Menggunakan Halaman Setup Admin

1. Buka `http://localhost:5173/admin/setup`
2. Isi form dengan email dan password admin
3. Klik "Buat Admin User"

#### Cara 3: Melalui Firebase Console

1. Buka Firebase Console > Authentication > Users
2. Klik "Add user"
3. Email: `admin@sumbaculture.com`
4. Password: `admin123`
5. Klik "Add user"
6. **PENTING**: Setelah user dibuat, Anda perlu menambahkan role admin di Firestore secara manual

### 7. Sistem Admin Terpisah

Admin panel menggunakan sistem terpisah dari user biasa:

- **Domain Email**: Hanya email dengan domain `@sumbaculture.com` yang bisa login sebagai admin
- **Role System**: Admin memiliki role dan permissions yang berbeda
- **Security**: Admin tidak bisa diakses dari navigation bar utama
- **Access Control**: Hanya admin yang terdaftar di Firestore yang bisa mengakses dashboard

#### Admin Roles:

- **SUPER_ADMIN**: Full access (manage orders, manage admins, analytics, settings)
- **ADMIN**: Standard access (manage orders, analytics, settings)
- **MODERATOR**: Limited access (manage orders only)

### 7. Setup Firestore Security Rules (Opsional)

Untuk keamanan yang lebih baik, update Firestore rules:

1. Buka Firestore Database > Rules
2. Ganti rules dengan:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to tourOrders collection for authenticated users
    match /tourOrders/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Klik "Publish"

## Testing Sistem

### 1. Test Form Pemesanan

1. Buka halaman utama (`/`)
2. Scroll ke bagian "Hubungi Kami"
3. Isi form pemesanan
4. Submit form
5. Cek di Firebase Console > Firestore Database apakah data tersimpan

### 2. Test Admin Login

1. Buka `/admin/login`
2. Login dengan:
   - Email: `admin@sumbaculture.com`
   - Password: `admin123`
3. Pastikan redirect ke dashboard

### 3. Test Admin Dashboard

1. Di dashboard, pastikan pesanan muncul
2. Test fitur:
   - Lihat detail pesanan
   - Ubah status pesanan
   - Hapus pesanan
   - Filter berdasarkan status

## Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"

- Pastikan API key di `firebase.js` sudah benar
- Restart development server setelah update konfigurasi

### Error: "Firebase: Error (auth/user-not-found)"

- Pastikan user admin sudah dibuat
- Cek email dan password sudah benar

### Error: "Firebase: Error (permission-denied)"

- Cek Firestore security rules
- Pastikan user sudah login

### Data tidak muncul di dashboard

- Cek koneksi internet
- Cek Firebase Console untuk error
- Pastikan Firestore rules mengizinkan read/write

## Production Deployment

Untuk production, pastikan:

1. Update Firestore security rules untuk keamanan yang lebih ketat
2. Setup Firebase Hosting untuk deployment
3. Konfigurasi domain custom
4. Setup monitoring dan analytics

## Fitur Firebase yang Digunakan

- **Firestore Database**: Menyimpan data pesanan wisata
- **Authentication**: Login/logout admin
- **Real-time Updates**: Data pesanan update secara real-time
- **Security Rules**: Mengontrol akses data

## Keuntungan Menggunakan Firebase

1. **Real-time**: Data update otomatis tanpa refresh
2. **Scalable**: Bisa handle jutaan data
3. **Secure**: Authentication dan security rules terintegrasi
4. **Easy Setup**: Setup cepat tanpa backend server
5. **Free Tier**: Gratis untuk penggunaan kecil-menengah
