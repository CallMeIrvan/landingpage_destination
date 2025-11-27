// Firebase Authentication service untuk admin
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth'
import { initializeApp, deleteApp } from 'firebase/app'
import { auth, firebaseConfig } from '../config/firebase'
import {
  createAdminWithRole,
  isAdmin,
  getAdminData,
  isValidAdminEmail,
  ADMIN_ROLES,
} from './adminService'

// Login admin dengan validasi role
export const loginAdmin = async (email, password) => {
  try {
    // Validasi email admin
    if (!isValidAdminEmail(email)) {
      throw new Error('Email tidak memiliki domain admin yang valid')
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Cek apakah user adalah admin
    const adminStatus = await isAdmin(user.uid)
    if (!adminStatus) {
      await signOut(auth) // Logout jika bukan admin
      throw new Error('User tidak memiliki akses admin')
    }

    // Dapatkan data admin
    const adminData = await getAdminData(user.uid)

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: adminData?.role || ADMIN_ROLES.ADMIN,
      permissions: adminData?.permissions || [],
    }
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

// Logout admin
export const logoutAdmin = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}

// Mendapatkan user yang sedang login
export const getCurrentUser = () => {
  return auth.currentUser
}

// Listener untuk perubahan status auth
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// Membuat admin baru dengan role
export const createAdmin = async (email, password, role = ADMIN_ROLES.ADMIN) => {
  try {
    // Validasi email admin
    if (!isValidAdminEmail(email)) {
      throw new Error('Email harus menggunakan domain admin yang valid')
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Buat admin dengan role di Firestore
    const adminData = await createAdminWithRole(user.uid, email, role)

    return {
      uid: user.uid,
      email: user.email,
      role: adminData.role,
      permissions: adminData.permissions,
    }
  } catch (error) {
    console.error('Error creating admin:', error)
    throw error
  }
}

// Memperbaiki admin yang sudah ada di Auth tapi belum ada di Firestore
export const restoreAdminAccess = async (email, password) => {
  try {
    // Login dulu untuk dapatkan UID
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Buat ulang data admin di Firestore
    const adminData = await createAdminWithRole(user.uid, email, ADMIN_ROLES.SUPER_ADMIN)

    return {
      uid: user.uid,
      email: user.email,
      role: adminData.role,
      permissions: adminData.permissions,
    }
  } catch (error) {
    console.error('Error restoring admin access:', error)
    throw error
  }
}

// Cek apakah user saat ini adalah admin
export const checkCurrentUserIsAdmin = async () => {
  try {
    const user = getCurrentUser()
    if (!user) return false

    return await isAdmin(user.uid)
  } catch (error) {
    console.error('Error checking current user admin status:', error)
    return false
  }
}

// Dapatkan data admin dari user saat ini
export const getCurrentAdminData = async () => {
  try {
    const user = getCurrentUser()
    if (!user) return null

    return await getAdminData(user.uid)
  } catch (error) {
    console.error('Error getting current admin data:', error)
    return null
  }
}

// Membuat admin baru tanpa logout (menggunakan secondary app)
export const createAdminWithoutLogout = async (email, password, role = ADMIN_ROLES.ADMIN) => {
  let secondaryApp = null
  try {
    // Validasi email admin
    if (!isValidAdminEmail(email)) {
      throw new Error('Email harus menggunakan domain admin yang valid')
    }

    // Initialize secondary app
    secondaryApp = initializeApp(firebaseConfig, 'SecondaryApp')
    const secondaryAuth = getAuth(secondaryApp)

    // Create user in secondary app
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password)
    const user = userCredential.user

    // Create admin data in Firestore (using main app's db connection)
    const adminData = await createAdminWithRole(user.uid, email, role)

    return {
      uid: user.uid,
      email: user.email,
      role: adminData.role,
      permissions: adminData.permissions,
    }
  } catch (error) {
    console.error('Error creating admin without logout:', error)
    throw error
  } finally {
    if (secondaryApp) {
      await deleteApp(secondaryApp)
    }
  }
}
