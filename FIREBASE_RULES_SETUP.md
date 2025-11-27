# Setup Firebase Security Rules

Masalah "Missing or insufficient permissions" terjadi karena aturan keamanan (Security Rules) di Firebase Firestore belum diatur atau terlalu ketat. Ikuti langkah-langkah ini untuk memperbaikinya.

## 1. Copy Rules

Salin kode berikut dari file `firestore.rules` yang baru saja dibuat:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is an admin
    function isAdmin() {
      return request.auth != null &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isActive == true;
    }

    // Admins collection
    match /admins/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || isAdmin());
      allow write: if isAdmin();
    }

    // Tour Orders collection
    match /tourOrders/{orderId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }
  }
}
```

## 2. Apply di Firebase Console

1. Buka [Firebase Console](https://console.firebase.google.com/).
2. Pilih project Anda (`sumba-tourism-admin`).
3. Di menu kiri, klik **Firestore Database**.
4. Klik tab **Rules** di bagian atas.
5. Hapus semua kode yang ada di editor, lalu **Paste** kode yang Anda salin tadi.
6. Klik tombol **Publish**.

## 3. Buat Admin Pertama (Bootstrap)

Karena aturan di atas mengharuskan pengirim permintaan adalah admin (`isAdmin()`) untuk membuat admin baru, Anda tidak bisa membuat admin pertama melalui aplikasi web jika belum ada admin sama sekali.

**Lakukan ini SEKALI saja untuk akun Anda:**

1. Di Firebase Console > Firestore Database, klik tab **Data**.
2. Klik **Start collection** (jika belum ada collection `admins`).
3. Masukkan Collection ID: `admins`
4. Klik **Next**.
5. Untuk Document ID, **JANGAN** gunakan Auto-ID. **Copy UID akun Anda** dari menu **Authentication**.
   - Buka tab Authentication di tab baru.
   - Salin UID user Anda (contoh: `k8Lm...`).
   - Paste UID tersebut sebagai Document ID di Firestore.
6. Tambahkan field berikut:
   - `uid` (string): [Paste UID Anda lagi]
   - `email` (string): [Email Anda]
   - `role` (string): `super_admin`
   - `isActive` (boolean): `true`
   - `permissions` (array):
     - 0: `manage_orders`
     - 1: `manage_admins`
     - 2: `view_analytics`
     - 3: `manage_settings`
     - 4: `delete_orders`
     - 5: `export_data`
7. Klik **Save**.

Setelah langkah ini, Anda adalah Super Admin dan bisa membuat admin lain langsung dari menu "Kelola Admin" di dashboard aplikasi.
