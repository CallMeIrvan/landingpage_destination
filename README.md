# 🏝️ Sumba Tourism Landing Page dengan Admin Panel

Landing page untuk wisata budaya Sumba dengan sistem admin untuk mengelola pesanan wisata menggunakan Firebase.

## ✨ Fitur Utama

### 🌐 Landing Page

- **Hero Section** dengan video background dan call-to-action
- **Culture Section** menampilkan budaya tradisional Sumba
- **Attractions Section** destinasi wisata populer
- **Gallery Section** foto-foto menarik
- **Testimonials Section** review dari pengunjung
- **Contact Section** form pemesanan wisata

### 🔐 Admin Panel

- **Authentication** menggunakan Firebase Auth
- **Dashboard** dengan statistik pesanan
- **Order Management** CRUD operations untuk pesanan
- **Real-time Updates** data update otomatis
- **Status Management** mengubah status pesanan
- **Responsive Design** mobile-friendly

## 🚀 Tech Stack

- **Frontend**: Vue 3 + Composition API
- **Styling**: CSS3 dengan modern design
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Build Tool**: Vite
- **Router**: Vue Router 4

## 📦 Instalasi

1. **Clone repository**

```bash
git clone <repository-url>
cd landingpage-destination
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup Firebase** (lihat [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

4. **Jalankan aplikasi**

```bash
npm run dev
```

5. **Buka browser**

```
http://localhost:5173
```

## 🔥 Setup Firebase

### 1. Buat Project Firebase

- Buka [Firebase Console](https://console.firebase.google.com/)
- Buat project baru dengan nama `sumba-tourism-admin`

### 2. Aktifkan Services

- **Authentication**: Aktifkan Email/Password provider
- **Firestore Database**: Buat database dalam test mode

### 3. Update Konfigurasi

File `src/config/firebase.js` sudah dikonfigurasi dengan project Firebase Anda.

### 4. Buat Admin User

Ada 3 cara untuk membuat admin user:

#### Cara 1: Browser Console (Paling Mudah)

1. Buka Developer Tools (F12) > Console
2. Copy script dari `create-admin-console.js`
3. Paste dan tekan Enter

#### Cara 2: Halaman Setup Admin

1. Buka `http://localhost:5173/admin/setup`
2. Isi form dan klik "Buat Admin User"

#### Cara 3: Firebase Console

1. Firebase Console > Authentication > Users
2. Add user dengan email: `admin@sumbaculture.com`

## 🎯 Cara Menggunakan

### Untuk Pengunjung

1. Buka halaman utama
2. Scroll untuk melihat informasi wisata
3. Isi form pemesanan di bagian "Hubungi Kami"
4. Submit form untuk mengirim pesanan

### Untuk Admin

1. Buka `/admin/login`
2. Login dengan:
   - Email: `admin@sumbaculture.com`
   - Password: `admin123`
3. Kelola pesanan di dashboard:
   - Lihat semua pesanan
   - Ubah status pesanan
   - Lihat detail pesanan
   - Hapus pesanan

## 📁 Struktur Proyek

```
src/
├── components/          # Komponen Vue
│   ├── ContactSection.vue
│   ├── AdminDashboard.vue
│   └── ...
├── views/              # Halaman Vue
│   ├── HomeView.vue
│   ├── AdminLogin.vue
│   └── AdminSetup.vue
├── services/           # Firebase services
│   ├── authService.js
│   └── orderService.js
├── config/             # Konfigurasi
│   └── firebase.js
└── router/             # Vue Router
    └── index.js
```

## 🔧 Scripts

```bash
# Development
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview

# Linting
npm run lint

# Format code
npm run format
```

## 🌟 Fitur Firebase

- **Firestore Database**: Menyimpan data pesanan wisata
- **Authentication**: Login/logout admin yang aman
- **Real-time Updates**: Data update otomatis tanpa refresh
- **Security Rules**: Kontrol akses data
- **Analytics**: Tracking pengunjung (opsional)

## 📱 Responsive Design

Aplikasi sudah dioptimasi untuk:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🎨 Design Features

- **Modern UI/UX** dengan gradient dan animasi
- **Smooth Scrolling** antar section
- **Interactive Elements** dengan hover effects
- **Loading States** untuk better UX
- **Error Handling** dengan pesan yang jelas

## 🚀 Deployment

### Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login Firebase
firebase login

# Initialize hosting
firebase init hosting

# Build dan deploy
npm run build
firebase deploy
```

### Vercel/Netlify

```bash
npm run build
# Upload folder 'dist' ke platform hosting
```

## 🐛 Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"

- Pastikan API key di `firebase.js` sudah benar
- Restart development server

### Error: "Firebase: Error (auth/user-not-found)"

- Pastikan user admin sudah dibuat
- Cek email dan password

### Data tidak muncul di dashboard

- Cek koneksi internet
- Cek Firebase Console untuk error
- Pastikan Firestore rules mengizinkan read/write

## 📄 License

MIT License - bebas digunakan untuk proyek pribadi atau komersial.

## 🤝 Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📞 Support

Jika ada pertanyaan atau masalah:

1. Cek [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) untuk setup Firebase
2. Cek troubleshooting section di atas
3. Buat issue di repository

---

**Happy Coding! 🎉**

Dibuat dengan ❤️ untuk mempromosikan wisata budaya Sumba yang indah.
