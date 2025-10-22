// Service untuk mengelola admin roles dan permissions
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const ADMIN_COLLECTION = 'admins'
const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
}

// Buat admin dengan role
export const createAdminWithRole = async (userUid, email, role = ADMIN_ROLES.ADMIN) => {
  try {
    const adminRef = doc(db, ADMIN_COLLECTION, userUid)
    await setDoc(adminRef, {
      uid: userUid,
      email: email,
      role: role,
      createdAt: new Date().toISOString(),
      isActive: true,
      permissions: getPermissionsByRole(role),
    })

    return {
      uid: userUid,
      email: email,
      role: role,
      permissions: getPermissionsByRole(role),
    }
  } catch (error) {
    console.error('Error creating admin with role:', error)
    throw error
  }
}

// Cek apakah user adalah admin
export const isAdmin = async (userUid) => {
  try {
    const adminRef = doc(db, ADMIN_COLLECTION, userUid)
    const adminSnap = await getDoc(adminRef)

    if (adminSnap.exists()) {
      const adminData = adminSnap.data()
      return adminData.isActive === true
    }

    return false
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

// Dapatkan data admin
export const getAdminData = async (userUid) => {
  try {
    const adminRef = doc(db, ADMIN_COLLECTION, userUid)
    const adminSnap = await getDoc(adminRef)

    if (adminSnap.exists()) {
      return adminSnap.data()
    }

    return null
  } catch (error) {
    console.error('Error getting admin data:', error)
    return null
  }
}

// Dapatkan semua admin
export const getAllAdmins = async () => {
  try {
    const q = query(collection(db, ADMIN_COLLECTION), where('isActive', '==', true))
    const querySnapshot = await getDocs(q)

    const admins = []
    querySnapshot.forEach((doc) => {
      admins.push({ id: doc.id, ...doc.data() })
    })

    return admins
  } catch (error) {
    console.error('Error getting all admins:', error)
    return []
  }
}

// Update admin role
export const updateAdminRole = async (userUid, newRole) => {
  try {
    const adminRef = doc(db, ADMIN_COLLECTION, userUid)
    await setDoc(
      adminRef,
      {
        role: newRole,
        permissions: getPermissionsByRole(newRole),
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    )

    return true
  } catch (error) {
    console.error('Error updating admin role:', error)
    throw error
  }
}

// Deactivate admin
export const deactivateAdmin = async (userUid) => {
  try {
    const adminRef = doc(db, ADMIN_COLLECTION, userUid)
    await setDoc(
      adminRef,
      {
        isActive: false,
        deactivatedAt: new Date().toISOString(),
      },
      { merge: true },
    )

    return true
  } catch (error) {
    console.error('Error deactivating admin:', error)
    throw error
  }
}

// Cek permission admin
export const hasPermission = async (userUid, permission) => {
  try {
    const adminData = await getAdminData(userUid)
    if (!adminData || !adminData.isActive) return false

    return adminData.permissions.includes(permission)
  } catch (error) {
    console.error('Error checking permission:', error)
    return false
  }
}

// Dapatkan permissions berdasarkan role
const getPermissionsByRole = (role) => {
  const permissions = {
    [ADMIN_ROLES.SUPER_ADMIN]: [
      'manage_orders',
      'manage_admins',
      'view_analytics',
      'manage_settings',
      'delete_orders',
      'export_data',
    ],
    [ADMIN_ROLES.ADMIN]: ['manage_orders', 'view_analytics', 'manage_settings'],
    [ADMIN_ROLES.MODERATOR]: ['manage_orders'],
  }

  return permissions[role] || []
}

// Validasi admin email domain
export const isValidAdminEmail = (email) => {
  const adminDomains = ['@sumbaculture.com', '@admin.sumbaculture.com', '@sumba-tourism.com']

  return adminDomains.some((domain) => email.endsWith(domain))
}

export { ADMIN_ROLES }
