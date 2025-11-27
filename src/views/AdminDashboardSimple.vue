<template>
  <div class="admin-dashboard">
    <div class="admin-dashboard__header">
      <div class="admin-dashboard__container">
        <div class="admin-dashboard__title-section">
          <h1 class="admin-dashboard__title">Dashboard Sumba Culture</h1>
          <p class="admin-dashboard__subtitle">Kelola pesanan wisata budaya Sumba dengan mudah</p>
        </div>

        <div class="admin-dashboard__actions">
          <button
            @click="openAdminModal"
            class="admin-dashboard__action-btn admin-dashboard__action-btn--admin"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="currentColor"
              />
            </svg>
            Kelola Admin
          </button>
          <button @click="refreshOrders" class="admin-dashboard__refresh-btn" :disabled="isLoading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 3v5h-5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 21v-5h5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Refresh
          </button>
          <button @click="logout" class="admin-dashboard__logout-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <polyline
                points="16,17 21,12 16,7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                x1="21"
                y1="12"
                x2="9"
                y2="12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Admin Management Modal -->
    <div v-if="showAdminModal" class="admin-dashboard__modal-overlay" @click="closeAdminModal">
      <div class="admin-dashboard__modal-card" @click.stop>
        <div class="admin-dashboard__modal-header">
          <h3 class="admin-dashboard__modal-title">Kelola Admin</h3>
          <button @click="closeAdminModal" class="admin-dashboard__modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="admin-dashboard__modal-content">
          <!-- Add New Admin Form -->
          <div class="admin-dashboard__section">
            <h4>Tambah Admin Baru</h4>
            <div class="admin-dashboard__form-group">
              <input
                v-model="newAdminForm.email"
                type="email"
                placeholder="Email (@sumbaculture.com)"
                class="admin-dashboard__input"
              />
              <input
                v-model="newAdminForm.password"
                type="password"
                placeholder="Password"
                class="admin-dashboard__input"
              />
              <button
                @click="createNewAdmin"
                class="admin-dashboard__btn-primary"
                :disabled="isLoadingAdmins"
              >
                {{ isLoadingAdmins ? 'Memproses...' : 'Tambah Admin' }}
              </button>
            </div>
            <p v-if="adminCreationError" class="admin-dashboard__error">{{ adminCreationError }}</p>
            <p v-if="adminCreationSuccess" class="admin-dashboard__success">
              {{ adminCreationSuccess }}
            </p>
          </div>

          <!-- Admin List -->
          <div class="admin-dashboard__section">
            <h4>Daftar Admin</h4>
            <div v-if="isLoadingAdmins && admins.length === 0" class="admin-dashboard__loading">
              Memuat...
            </div>
            <ul v-else class="admin-dashboard__list">
              <li v-for="admin in admins" :key="admin.uid" class="admin-dashboard__list-item">
                <div class="admin-dashboard__list-info">
                  <span class="admin-dashboard__list-email">{{ admin.email }}</span>
                  <span class="admin-dashboard__list-role">{{ admin.role }}</span>
                </div>
                <span
                  class="admin-dashboard__list-status"
                  :class="{ active: admin.isActive, inactive: !admin.isActive }"
                >
                  {{ admin.isActive ? 'Aktif' : 'Nonaktif' }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="admin-dashboard__content">
      <div class="admin-dashboard__container">
        <div class="admin-dashboard__stats">
          <div class="admin-dashboard__stat-card">
            <div class="admin-dashboard__stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2" />
                <path
                  d="M20 8v6M23 11h-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="admin-dashboard__stat-content">
              <h3>Total Pesanan</h3>
              <p class="admin-dashboard__stat-number">{{ totalOrders }}</p>
            </div>
          </div>

          <div class="admin-dashboard__stat-card">
            <div class="admin-dashboard__stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <polyline
                  points="12,6 12,12 16,14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="admin-dashboard__stat-content">
              <h3>Pending</h3>
              <p class="admin-dashboard__stat-number">{{ pendingOrders }}</p>
            </div>
          </div>

          <div class="admin-dashboard__stat-card">
            <div class="admin-dashboard__stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline
                  points="22,4 12,14.01 9,11.01"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="admin-dashboard__stat-content">
              <h3>Confirmed</h3>
              <p class="admin-dashboard__stat-number">{{ confirmedOrders }}</p>
            </div>
          </div>
        </div>

        <div class="admin-dashboard__orders">
          <div class="admin-dashboard__orders-header">
            <h2>Pesanan Wisata</h2>
            <div class="admin-dashboard__filter">
              <select v-model="statusFilter" @change="filterOrders">
                <option value="">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div v-if="isLoading" class="admin-dashboard__loading">
            <div class="admin-dashboard__spinner"></div>
            <p>Memuat pesanan...</p>
          </div>

          <div v-else-if="filteredOrders.length === 0" class="admin-dashboard__empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <polyline
                points="3.27,6.96 12,12.01 20.73,6.96"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                x1="12"
                y1="22.08"
                x2="12"
                y2="12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3>Belum ada pesanan</h3>
            <p>Pesanan wisata akan muncul di sini setelah ada yang mengisi form pemesanan.</p>
          </div>

          <div v-else class="admin-dashboard__orders-list">
            <div
              v-for="order in paginatedOrders"
              :key="order.id"
              class="admin-dashboard__order-card"
            >
              <div class="admin-dashboard__order-header">
                <div class="admin-dashboard__order-info">
                  <h4>#{{ order.id.slice(-8) }}</h4>
                  <span class="admin-dashboard__order-date">{{ formatDate(order.createdAt) }}</span>
                </div>
                <div
                  class="admin-dashboard__order-status"
                  :class="`admin-dashboard__order-status--${order.status}`"
                >
                  {{ getStatusText(order.status) }}
                </div>
              </div>

              <div class="admin-dashboard__order-details">
                <div class="admin-dashboard__order-customer">
                  <strong>{{ order.name }}</strong>
                  <span>{{ order.email }}</span>
                  <span>{{ order.phone }}</span>
                </div>

                <div class="admin-dashboard__order-package">
                  <strong>{{ order.package }}</strong>
                  <span>{{ order.participants }} peserta</span>
                  <span>{{ formatDateRange(order.startDate, order.endDate) }}</span>
                </div>
              </div>

              <div class="admin-dashboard__order-actions">
                <button
                  @click="viewOrder(order)"
                  class="admin-dashboard__action-btn admin-dashboard__action-btn--view"
                >
                  Lihat Detail
                </button>
                <button
                  @click="updateOrderStatusHandler(order)"
                  class="admin-dashboard__action-btn admin-dashboard__action-btn--edit"
                >
                  Ubah Status
                </button>
                <button
                  @click="deleteOrder(order)"
                  class="admin-dashboard__action-btn admin-dashboard__action-btn--delete"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="admin-dashboard__pagination">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="admin-dashboard__pagination-btn"
            >
              Previous
            </button>
            <span class="admin-dashboard__pagination-info">
              Halaman {{ currentPage }} dari {{ totalPages }}
            </span>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="admin-dashboard__pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Update Modal -->
    <div v-if="showStatusModal" class="admin-dashboard__modal-overlay" @click="closeStatusModal">
      <div class="admin-dashboard__modal-card" @click.stop>
        <div class="admin-dashboard__modal-header">
          <h3 class="admin-dashboard__modal-title">Ubah Status Pesanan</h3>
          <button @click="closeStatusModal" class="admin-dashboard__modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="admin-dashboard__modal-content">
          <div class="admin-dashboard__modal-order-info">
            <p class="admin-dashboard__modal-order-id">
              Pesanan #{{ selectedOrder?.id?.slice(-8) }}
            </p>
            <p class="admin-dashboard__modal-customer">
              {{ selectedOrder?.name }} - {{ selectedOrder?.email }}
            </p>
          </div>

          <div class="admin-dashboard__modal-status-options">
            <label class="admin-dashboard__modal-option">
              <input type="radio" v-model="newStatus" value="pending" />
              <span class="admin-dashboard__modal-option-label">
                <div
                  class="admin-dashboard__modal-option-icon admin-dashboard__modal-option-icon--pending"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                    <polyline
                      points="12,6 12,12 16,14"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="admin-dashboard__modal-option-text">
                  <strong>Pending</strong>
                  <span>Menunggu konfirmasi</span>
                </div>
              </span>
            </label>

            <label class="admin-dashboard__modal-option">
              <input type="radio" v-model="newStatus" value="confirmed" />
              <span class="admin-dashboard__modal-option-label">
                <div
                  class="admin-dashboard__modal-option-icon admin-dashboard__modal-option-icon--confirmed"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <polyline
                      points="22,4 12,14.01 9,11.01"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="admin-dashboard__modal-option-text">
                  <strong>Confirmed</strong>
                  <span>Pesanan dikonfirmasi</span>
                </div>
              </span>
            </label>

            <label class="admin-dashboard__modal-option">
              <input type="radio" v-model="newStatus" value="cancelled" />
              <span class="admin-dashboard__modal-option-label">
                <div
                  class="admin-dashboard__modal-option-icon admin-dashboard__modal-option-icon--cancelled"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                    <line
                      x1="15"
                      y1="9"
                      x2="9"
                      y2="15"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <line
                      x1="9"
                      y1="9"
                      x2="15"
                      y2="15"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="admin-dashboard__modal-option-text">
                  <strong>Cancelled</strong>
                  <span>Pesanan dibatalkan</span>
                </div>
              </span>
            </label>
          </div>
        </div>

        <div class="admin-dashboard__modal-actions">
          <button
            @click="closeStatusModal"
            class="admin-dashboard__modal-btn admin-dashboard__modal-btn--cancel"
          >
            Batal
          </button>
          <button
            @click="confirmStatusUpdate"
            class="admin-dashboard__modal-btn admin-dashboard__modal-btn--confirm"
            :disabled="!newStatus"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>

    <!-- Detail Order Modal -->
    <div v-if="showDetailModal" class="admin-dashboard__modal-overlay" @click="closeDetailModal">
      <div class="admin-dashboard__modal-card" @click.stop>
        <div class="admin-dashboard__modal-header">
          <h3 class="admin-dashboard__modal-title">Detail Pesanan</h3>
          <button @click="closeDetailModal" class="admin-dashboard__modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="admin-dashboard__modal-content">
          <div class="admin-dashboard__detail-section">
            <div class="admin-dashboard__detail-header">
              <h4 class="admin-dashboard__detail-order-id">
                Pesanan #{{ selectedOrder?.id?.slice(-8) }}
              </h4>
              <div
                class="admin-dashboard__detail-status"
                :class="`admin-dashboard__detail-status--${selectedOrder?.status}`"
              >
                {{ getStatusText(selectedOrder?.status) }}
              </div>
            </div>

            <div class="admin-dashboard__detail-info">
              <div class="admin-dashboard__detail-group">
                <h5 class="admin-dashboard__detail-label">Informasi Pelanggan</h5>
                <div class="admin-dashboard__detail-item">
                  <span class="admin-dashboard__detail-key">Nama Lengkap:</span>
                  <span class="admin-dashboard__detail-value">{{ selectedOrder?.name }}</span>
                </div>
                <div class="admin-dashboard__detail-item">
                  <span class="admin-dashboard__detail-key">Email:</span>
                  <span class="admin-dashboard__detail-value">{{ selectedOrder?.email }}</span>
                </div>
                <div class="admin-dashboard__detail-item">
                  <span class="admin-dashboard__detail-key">Telepon:</span>
                  <span class="admin-dashboard__detail-value">{{ selectedOrder?.phone }}</span>
                </div>
              </div>

              <div class="admin-dashboard__detail-group">
                <h5 class="admin-dashboard__detail-label">Detail Paket Wisata</h5>
                <div class="admin-dashboard__detail-item">
                  <span class="admin-dashboard__detail-key">Paket:</span>
                  <span class="admin-dashboard__detail-value">{{ selectedOrder?.package }}</span>
                </div>
                <div class="admin-dashboard__detail-item">
                  <span class="admin-dashboard__detail-key">Jumlah Peserta:</span>
                  <span class="admin-dashboard__detail-value"
                    >{{ selectedOrder?.participants }} orang</span
                  >
                </div>
                <div class="admin-dashboard__detail-item">
                  <span class="admin-dashboard__detail-key">Tanggal Mulai:</span>
                  <span class="admin-dashboard__detail-value">{{
                    formatDate(selectedOrder?.startDate)
                  }}</span>
                </div>
                <div class="admin-dashboard__detail-item">
                  <span class="admin-dashboard__detail-key">Tanggal Selesai:</span>
                  <span class="admin-dashboard__detail-value">{{
                    formatDate(selectedOrder?.endDate)
                  }}</span>
                </div>
              </div>

              <div class="admin-dashboard__detail-group">
                <h5 class="admin-dashboard__detail-label">Informasi Tambahan</h5>
                <div class="admin-dashboard__detail-item">
                  <span class="admin-dashboard__detail-key">Tanggal Pesanan:</span>
                  <span class="admin-dashboard__detail-value">{{
                    formatDate(selectedOrder?.createdAt)
                  }}</span>
                </div>
                <div class="admin-dashboard__detail-item">
                  <span class="admin-dashboard__detail-key">Pesan Khusus:</span>
                  <span class="admin-dashboard__detail-value">{{
                    selectedOrder?.message || 'Tidak ada pesan khusus'
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="admin-dashboard__modal-actions">
          <button
            @click="closeDetailModal"
            class="admin-dashboard__modal-btn admin-dashboard__modal-btn--cancel"
            style="width: 100%"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  getOrders,
  updateOrderStatus,
  deleteOrder as deleteOrderService,
  subscribeToOrders,
} from '../services/orderService'
import { createAdminWithoutLogout } from '../services/authService'

import { getAllAdmins } from '../services/adminService'
import { sendETicket } from '../services/emailService'

const router = useRouter()
const isLoading = ref(false)
const orders = ref([])
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modal state
const showStatusModal = ref(false)
const showDetailModal = ref(false)
const showAdminModal = ref(false)
const selectedOrder = ref(null)
const newStatus = ref('')

// Admin Management State
const admins = ref([])
const isLoadingAdmins = ref(false)
const newAdminForm = ref({
  email: '',
  password: '',
})
const adminCreationError = ref('')
const adminCreationSuccess = ref('')

// Computed properties
const totalOrders = computed(() => orders.value.length)
const pendingOrders = computed(
  () => orders.value.filter((order) => order.status === 'pending').length,
)
const confirmedOrders = computed(
  () => orders.value.filter((order) => order.status === 'confirmed').length,
)

const filteredOrders = computed(() => {
  if (!statusFilter.value) return orders.value
  return orders.value.filter((order) => order.status === statusFilter.value)
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

// Methods
const loadOrders = async () => {
  try {
    isLoading.value = true
    console.log('Loading orders from Firebase...')
    const ordersData = await getOrders()
    orders.value = ordersData
    console.log('Orders loaded:', ordersData.length)
  } catch (error) {
    console.error('Error loading orders:', error)
    // Fallback ke localStorage jika Firebase error
    const localOrders = JSON.parse(localStorage.getItem('tourOrders') || '[]')
    orders.value = localOrders
    console.log('Using localStorage orders:', localOrders.length)
  } finally {
    isLoading.value = false
  }
}

const refreshOrders = () => {
  loadOrders()
}

const filterOrders = () => {
  currentPage.value = 1
}

const viewOrder = (order) => {
  console.log('View order:', order)
  selectedOrder.value = order
  showDetailModal.value = true
}

const updateOrderStatusHandler = (order) => {
  selectedOrder.value = order
  newStatus.value = order.status
  showStatusModal.value = true
}

const closeStatusModal = () => {
  showStatusModal.value = false
  selectedOrder.value = null
  newStatus.value = ''
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedOrder.value = null
}

const confirmStatusUpdate = async () => {
  if (!newStatus.value || !selectedOrder.value) return

  try {
    await updateOrderStatus(selectedOrder.value.id, newStatus.value)

    // Kirim E-Tiket otomatis jika status diubah menjadi 'confirmed'
    if (newStatus.value === 'confirmed') {
      try {
        // Tampilkan loading atau notifikasi bahwa sedang mengirim email
        console.log('Mengirim E-Tiket...')
        await sendETicket(selectedOrder.value)
        alert(`Status diperbarui & E-Tiket berhasil dikirim ke ${selectedOrder.value.email}`)
      } catch (emailError) {
        console.error('Gagal mengirim email:', emailError)
        alert('Status diperbarui, tapi GAGAL mengirim E-Tiket. Cek konfigurasi EmailJS.')
      }
    } else {
      console.log('Order status updated:', selectedOrder.value.id, newStatus.value)
    }

    selectedOrder.value.status = newStatus.value
    closeStatusModal()
  } catch (error) {
    console.error('Error updating order status:', error)
    alert('Gagal mengupdate status pesanan')
  }
}

const deleteOrder = (order) => {
  if (confirm(`Apakah Anda yakin ingin menghapus pesanan #${order.id.slice(-8)}?`)) {
    try {
      deleteOrderService(order.id)
      const index = orders.value.findIndex((o) => o.id === order.id)
      if (index > -1) {
        orders.value.splice(index, 1)
      }
      console.log('Order deleted:', order.id)
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Gagal menghapus pesanan')
    }
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return 'N/A'
  const start = new Date(startDate)
  const end = new Date(endDate)
  return `${start.toLocaleDateString('id-ID')} - ${end.toLocaleDateString('id-ID')}`
}

const getStatusText = (status) => {
  const statusMap = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
  }
  return statusMap[status] || status
}

import { logoutAdmin } from '../services/authService'

// ... existing imports ...

const logout = async () => {
  try {
    await logoutAdmin()
    router.push('/admin/login')
  } catch (error) {
    console.error('Logout error:', error)
    router.push('/admin/login')
  }
}

// Admin Management Methods
const openAdminModal = async () => {
  showAdminModal.value = true
  await loadAdmins()
}

const closeAdminModal = () => {
  showAdminModal.value = false
  newAdminForm.value = { email: '', password: '' }
  adminCreationError.value = ''
  adminCreationSuccess.value = ''
}

const loadAdmins = async () => {
  isLoadingAdmins.value = true
  try {
    admins.value = await getAllAdmins()
  } catch (error) {
    console.error('Error loading admins:', error)
  } finally {
    isLoadingAdmins.value = false
  }
}

const createNewAdmin = async () => {
  if (!newAdminForm.value.email || !newAdminForm.value.password) {
    adminCreationError.value = 'Email dan password harus diisi'
    return
  }

  isLoadingAdmins.value = true
  adminCreationError.value = ''
  adminCreationSuccess.value = ''

  try {
    await createAdminWithoutLogout(newAdminForm.value.email, newAdminForm.value.password)
    adminCreationSuccess.value = 'Admin berhasil dibuat!'
    newAdminForm.value = { email: '', password: '' }
    await loadAdmins()
  } catch (error) {
    console.error('Error creating admin:', error)
    if (error.code === 'auth/email-already-in-use') {
      adminCreationError.value = 'Email sudah digunakan'
    } else if (error.message.includes('domain admin')) {
      adminCreationError.value = 'Email harus menggunakan domain @sumbaculture.com'
    } else {
      adminCreationError.value = 'Gagal membuat admin: ' + error.message
    }
  } finally {
    isLoadingAdmins.value = false
  }
}

// Lifecycle
let unsubscribeOrders = null

onMounted(() => {
  console.log('Admin dashboard mounted, loading orders...')
  loadOrders()

  // Set up real-time listener
  try {
    unsubscribeOrders = subscribeToOrders((ordersData) => {
      console.log('Real-time orders update:', ordersData.length)
      orders.value = ordersData
    })
  } catch (error) {
    console.error('Error setting up real-time listener:', error)
    // Fallback ke polling
    setInterval(loadOrders, 30000) // Refresh setiap 30 detik
  }
})

onUnmounted(() => {
  if (unsubscribeOrders) {
    unsubscribeOrders()
  }
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}

.admin-dashboard__header {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  padding: 2rem 0;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
  position: relative;
  overflow: hidden;
}

.admin-dashboard__header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.admin-dashboard__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.admin-dashboard__title-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.admin-dashboard__title {
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.admin-dashboard__subtitle {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.3px;
}

.admin-dashboard__actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
}

.admin-dashboard__refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: rgba(51, 51, 51, 0.1);
  color: #333;
  border: 2px solid rgba(51, 51, 51, 0.2);
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  letter-spacing: 0.3px;
}

.admin-dashboard__refresh-btn:hover:not(:disabled) {
  background: rgba(51, 51, 51, 0.2);
  border-color: rgba(51, 51, 51, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.admin-dashboard__refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.admin-dashboard__logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
  border: 2px solid rgba(139, 69, 19, 0.3);
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  letter-spacing: 0.3px;
}

.admin-dashboard__logout-btn:hover {
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  border-color: rgba(139, 69, 19, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
}

.admin-dashboard__content {
  padding: 3rem 0;
  position: relative;
}

.admin-dashboard__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.admin-dashboard__stat-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.admin-dashboard__stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
}

.admin-dashboard__stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.admin-dashboard__stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
}

.admin-dashboard__stat-content h3 {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-dashboard__stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.admin-dashboard__orders {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.admin-dashboard__orders::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
}

.admin-dashboard__orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f1f5f9;
}

.admin-dashboard__orders-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.5px;
}

.admin-dashboard__filter select {
  padding: 0.75rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  font-weight: 500;
  color: #475569;
  transition: all 0.3s ease;
  min-width: 150px;
}

.admin-dashboard__filter select:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.admin-dashboard__loading {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.admin-dashboard__spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.admin-dashboard__empty {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.admin-dashboard__empty svg {
  color: #ccc;
  margin-bottom: 1rem;
}

.admin-dashboard__empty h3 {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.admin-dashboard__empty p {
  margin: 0;
  font-size: 0.9rem;
}

.admin-dashboard__orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-dashboard__order-card {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2rem;
  background: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.admin-dashboard__order-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.admin-dashboard__order-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
  border-color: #cbd5e1;
}

.admin-dashboard__order-card:hover::before {
  opacity: 1;
}

.admin-dashboard__order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.admin-dashboard__order-info h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.3px;
}

.admin-dashboard__order-date {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

.admin-dashboard__order-status {
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.admin-dashboard__order-status--pending {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
}

.admin-dashboard__order-status--confirmed {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
}

.admin-dashboard__order-status--cancelled {
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
}

.admin-dashboard__order-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.admin-dashboard__order-customer,
.admin-dashboard__order-package {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin-dashboard__order-customer strong,
.admin-dashboard__order-package strong {
  color: #333;
  font-size: 0.9rem;
}

.admin-dashboard__order-customer span,
.admin-dashboard__order-package span {
  font-size: 0.8rem;
  color: #666;
}

.admin-dashboard__order-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.admin-dashboard__action-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
}

.admin-dashboard__action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.admin-dashboard__action-btn:hover::before {
  left: 100%;
}

.admin-dashboard__action-btn--view {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.admin-dashboard__action-btn--view:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
}

.admin-dashboard__action-btn--edit {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.admin-dashboard__action-btn--edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
}

.admin-dashboard__action-btn--delete {
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
}

.admin-dashboard__action-btn--delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
}

.admin-dashboard__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.admin-dashboard__pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e9ecef;
  background: white;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.admin-dashboard__pagination-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #667eea;
}

.admin-dashboard__pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.admin-dashboard__pagination-info {
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 768px) {
  .admin-dashboard__container {
    padding: 0 1rem;
  }

  .admin-dashboard__title {
    font-size: 2rem;
  }

  .admin-dashboard__subtitle {
    font-size: 1rem;
  }

  .admin-dashboard__stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .admin-dashboard__stat-card {
    padding: 1.5rem;
  }

  .admin-dashboard__orders {
    padding: 1.5rem;
  }

  .admin-dashboard__order-details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .admin-dashboard__order-actions {
    flex-direction: column;
  }

  .admin-dashboard__action-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .admin-dashboard__actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .admin-dashboard__refresh-btn,
  .admin-dashboard__logout-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .admin-dashboard__header {
    padding: 1.5rem 0;
  }

  .admin-dashboard__title {
    font-size: 1.75rem;
  }

  .admin-dashboard__content {
    padding: 2rem 0;
  }

  .admin-dashboard__orders-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .admin-dashboard__filter select {
    width: 100%;
  }
}

/* Modal Styles */
.admin-dashboard__modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.admin-dashboard__modal-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  animation: slideUp 0.3s ease;
  position: relative;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.admin-dashboard__modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid #f1f5f9;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
}

.admin-dashboard__modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.admin-dashboard__modal-close {
  background: rgba(51, 51, 51, 0.1);
  border: none;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.3s ease;
  font-size: 16px;
}

.admin-dashboard__modal-close:hover {
  background: rgba(51, 51, 51, 0.2);
  transform: scale(1.1);
}

.admin-dashboard__modal-content {
  padding: 2rem;
}

.admin-dashboard__modal-order-info {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #d4af37;
}

.admin-dashboard__modal-order-id {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  font-family: 'Inter', sans-serif;
}

.admin-dashboard__modal-customer {
  color: #64748b;
  margin: 0;
  font-size: 0.9rem;
}

.admin-dashboard__modal-status-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-dashboard__modal-option {
  display: block;
  cursor: pointer;
}

.admin-dashboard__modal-option input[type='radio'] {
  display: none;
}

.admin-dashboard__modal-option-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  transition: all 0.3s ease;
  background: white;
}

.admin-dashboard__modal-option:hover .admin-dashboard__modal-option-label {
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.admin-dashboard__modal-option input[type='radio']:checked + .admin-dashboard__modal-option-label {
  border-color: #d4af37;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(244, 228, 188, 0.05) 100%);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
}

.admin-dashboard__modal-option-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.admin-dashboard__modal-option-icon--pending {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
}

.admin-dashboard__modal-option-icon--confirmed {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
}

.admin-dashboard__modal-option-icon--cancelled {
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
}

.admin-dashboard__modal-option-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin-dashboard__modal-option-text strong {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  font-family: 'Inter', sans-serif;
}

.admin-dashboard__modal-option-text span {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

.admin-dashboard__modal-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem 2rem 2rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.admin-dashboard__modal-btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

.admin-dashboard__modal-btn--cancel {
  background: #f1f5f9;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.admin-dashboard__modal-btn--cancel:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.admin-dashboard__modal-btn--confirm {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.admin-dashboard__modal-btn--confirm:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
}

.admin-dashboard__modal-btn--confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Mobile Modal Styles */
@media (max-width: 768px) {
  .admin-dashboard__modal-card {
    width: 95%;
    margin: 1rem;
  }

  .admin-dashboard__modal-header {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
  }

  .admin-dashboard__modal-title {
    font-size: 1.25rem;
  }

  .admin-dashboard__modal-content {
    padding: 1.5rem;
  }

  .admin-dashboard__modal-actions {
    flex-direction: column;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }

  .admin-dashboard__modal-btn {
    width: 100%;
  }
}

/* Detail Modal Styles */
.admin-dashboard__detail-section {
  max-height: 60vh;
  overflow-y: auto;
}

.admin-dashboard__detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.admin-dashboard__detail-order-id {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.admin-dashboard__detail-status {
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.admin-dashboard__detail-status--pending {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
}

.admin-dashboard__detail-status--confirmed {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
}

.admin-dashboard__detail-status--cancelled {
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
}

.admin-dashboard__detail-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.admin-dashboard__detail-group {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #d4af37;
}

.admin-dashboard__detail-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-dashboard__detail-label::before {
  content: '';
  width: 4px;
  height: 20px;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  border-radius: 2px;
}

.admin-dashboard__detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.admin-dashboard__detail-item:last-child {
  border-bottom: none;
}

.admin-dashboard__detail-key {
  font-weight: 600;
  color: #64748b;
  font-size: 0.9rem;
  min-width: 120px;
}

.admin-dashboard__detail-value {
  font-weight: 500;
  color: #1e293b;
  font-size: 0.9rem;
  text-align: right;
  flex: 1;
  margin-left: 1rem;
}

/* Mobile Detail Modal Styles */
@media (max-width: 768px) {
  .admin-dashboard__detail-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .admin-dashboard__detail-order-id {
    font-size: 1.25rem;
  }

  .admin-dashboard__detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .admin-dashboard__detail-key {
    min-width: auto;
  }

  .admin-dashboard__detail-value {
    text-align: left;
    margin-left: 0;
  }

  .admin-dashboard__detail-info {
    gap: 1.5rem;
  }

  .admin-dashboard__detail-group {
    padding: 1rem;
  }
}
</style>

<style scoped>
/* Admin Management Styles */
.admin-dashboard__action-btn--admin {
  background: #667eea;
  color: white;
  border: none;
}

.admin-dashboard__action-btn--admin:hover {
  background: #5a6fd6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.admin-dashboard__section {
  margin-bottom: 2rem;
}

.admin-dashboard__section h4 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.1rem;
}

.admin-dashboard__form-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.admin-dashboard__input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
}

.admin-dashboard__btn-primary {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-dashboard__btn-primary:hover:not(:disabled) {
  background: #5a6fd6;
}

.admin-dashboard__btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.admin-dashboard__list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.admin-dashboard__list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.admin-dashboard__list-item:last-child {
  border-bottom: none;
}

.admin-dashboard__list-info {
  display: flex;
  flex-direction: column;
}

.admin-dashboard__list-email {
  font-weight: 600;
  color: #333;
}

.admin-dashboard__list-role {
  font-size: 0.85rem;
  color: #666;
  text-transform: capitalize;
}

.admin-dashboard__list-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.admin-dashboard__list-status.active {
  background: #e6fffa;
  color: #2c7a7b;
}

.admin-dashboard__list-status.inactive {
  background: #fff5f5;
  color: #c53030;
}

.admin-dashboard__error {
  color: #c53030;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.admin-dashboard__success {
  color: #2f855a;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
