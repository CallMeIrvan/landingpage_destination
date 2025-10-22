// Script untuk membuat admin user di Firebase
// Jalankan script ini di browser console setelah Firebase dikonfigurasi

// Import Firebase functions (jalankan di browser console)
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './src/config/firebase.js'

// Buat admin user
const createAdmin = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      'admin@sumbaculture.com',
      'admin123',
    )
    console.log('✅ Admin user berhasil dibuat:', userCredential.user.email)
    console.log('UID:', userCredential.user.uid)
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️ Admin user sudah ada')
    } else {
      console.error('❌ Error membuat admin:', error.message)
    }
  }
}

// Jalankan fungsi
createAdmin()
