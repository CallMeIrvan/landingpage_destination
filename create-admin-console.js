// Script untuk membuat admin user dengan role di Firebase
// Copy dan paste script ini di browser console setelah aplikasi berjalan

// Pastikan aplikasi sudah berjalan di http://localhost:5173
// Buka Developer Tools (F12) > Console
// Copy script di bawah ini dan paste di console, lalu tekan Enter

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
