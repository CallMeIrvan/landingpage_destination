// Firebase service untuk mengelola pesanan wisata
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const COLLECTION_NAME = 'tourOrders'

// Menambah pesanan baru
export const addOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return { id: docRef.id, ...orderData }
  } catch (error) {
    console.error('Error adding order:', error)
    throw error
  }
}

// Mengambil semua pesanan
export const getOrders = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)

    const orders = []
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })

    return orders
  } catch (error) {
    console.error('Error getting orders:', error)
    throw error
  }
}

// Mengambil pesanan berdasarkan status
export const getOrdersByStatus = async (status) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('createdAt', 'desc'),
    )
    const querySnapshot = await getDocs(q)

    const orders = []
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })

    return orders
  } catch (error) {
    console.error('Error getting orders by status:', error)
    throw error
  }
}

// Mengupdate status pesanan
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, COLLECTION_NAME, orderId)
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    })

    return { id: orderId, status: newStatus }
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

// Menghapus pesanan
export const deleteOrder = async (orderId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, orderId))
    return { id: orderId }
  } catch (error) {
    console.error('Error deleting order:', error)
    throw error
  }
}

// Real-time listener untuk pesanan
export const subscribeToOrders = (callback) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))

  return onSnapshot(
    q,
    (querySnapshot) => {
      const orders = []
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() })
      })
      callback(orders)
    },
    (error) => {
      console.error('Error in orders subscription:', error)
    },
  )
}

// Real-time listener untuk pesanan berdasarkan status
export const subscribeToOrdersByStatus = (status, callback) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('status', '==', status),
    orderBy('createdAt', 'desc'),
  )

  return onSnapshot(
    q,
    (querySnapshot) => {
      const orders = []
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() })
      })
      callback(orders)
    },
    (error) => {
      console.error('Error in orders by status subscription:', error)
    },
  )
}
