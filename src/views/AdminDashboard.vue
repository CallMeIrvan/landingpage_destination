<template>
  <div class="admin-dashboard">
    <div class="admin-dashboard__header">
      <div class="admin-dashboard__container">
        <div class="admin-dashboard__title-section">
          <h1 class="admin-dashboard__title">Dashboard Admin </h1>
          <p class="admin-dashboard__subtitle">Kelola pesanan wisata budaya Sumba</p>
          <div v-if="adminData" class="admin-dashboard__admin-info">
            <span class="admin-dashboard__admin-role">{{ adminData.role }}</span>
            <span class="admin-dashboard__admin-email">{{ adminData.email }}</span>
          </div>
        </div>

        <div class="admin-dashboard__actions">
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

    <div class="admin-dashboard__container">
      <!-- Statistics Cards -->
      <div class="admin-dashboard__stats">
        <div class="admin-dashboard__stat-card">
          <div class="admin-dashboard__stat-icon admin-dashboard__stat-icon--total">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" />
              <path
                d="M22 21v-2a4 4 0 0 0-3-3.87"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 3.13a4 4 0 0 1 0 7.75"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="admin-dashboard__stat-content">
            <h3>{{ totalOrders }}</h3>
            <p>Total Pesanan</p>
          </div>
        </div>

        <div class="admin-dashboard__stat-card">
          <div class="admin-dashboard__stat-icon admin-dashboard__stat-icon--pending">
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
            <h3>{{ pendingOrders }}</h3>
            <p>Menunggu Konfirmasi</p>
          </div>
        </div>

        <div class="admin-dashboard__stat-card">
          <div class="admin-dashboard__stat-icon admin-dashboard__stat-icon--confirmed">
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
            <h3>{{ confirmedOrders }}</h3>
            <p>Sudah Dikonfirmasi</p>
          </div>
        </div>

        <div class="admin-dashboard__stat-card">
          <div class="admin-dashboard__stat-icon admin-dashboard__stat-icon--completed">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </div>
          <div class="admin-dashboard__stat-content">
            <h3>{{ completedOrders }}</h3>
            <p>Selesai</p>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="admin-dashboard__orders">
        <div class="admin-dashboard__orders-header">
          <h2>Daftar Pesanan</h2>
          <div class="admin-dashboard__filter">
            <select v-model="statusFilter" @change="filterOrders">
              <option value="">Semua Status</option>
              <option value="pending">Menunggu Konfirmasi</option>
              <option value="confirmed">Dikonfirmasi</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
        </div>

        <div v-if="isLoading" class="admin-dashboard__loading">
          <div class="admin-dashboard__spinner"></div>
          <p>Memuat data pesanan...</p>
        </div>

        <div v-else-if="filteredOrders.length === 0" class="admin-dashboard__empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <h3>Tidak ada pesanan</h3>
          <p>Tidak ada pesanan yang sesuai dengan filter yang dipilih.</p>
        </div>

        <div v-else class="admin-dashboard__table-container">
          <table class="admin-dashboard__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Paket</th>
                <th>Peserta</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in paginatedOrders"
                :key="order.id"
                class="admin-dashboard__table-row"
              >
                <td class="admin-dashboard__table-id">#{{ order.id }}</td>
                <td class="admin-dashboard__table-name">{{ order.name }}</td>
                <td class="admin-dashboard__table-email">{{ order.email }}</td>
                <td class="admin-dashboard__table-package">{{ getPackageName(order.package) }}</td>
                <td class="admin-dashboard__table-participants">{{ order.participants }} orang</td>
                <td class="admin-dashboard__table-date">
                  {{ formatDate(order.startDate) }} - {{ formatDate(order.endDate) }}
                </td>
                <td class="admin-dashboard__table-status">
                  <span :class="`admin-dashboard__status admin-dashboard__status--${order.status}`">
                    {{ getStatusText(order.status) }}
                  </span>
                </td>
                <td class="admin-dashboard__table-actions">
                  <button
                    @click="viewOrder(order)"
                    class="admin-dashboard__action-btn admin-dashboard__action-btn--view"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </button>
                  <button
                    @click="updateOrderStatus(order)"
                    class="admin-dashboard__action-btn admin-dashboard__action-btn--edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteOrderHandler(order)"
                    class="admin-dashboard__action-btn admin-dashboard__action-btn--delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <polyline
                        points="3,6 5,6 21,6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="admin-dashboard__pagination">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="admin-dashboard__pagination-btn"
          >
            Previous
          </button>

          <span class="admin-dashboard__pagination-info">
            Halaman {{ currentPage }} dari {{ totalPages }}
          </span>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="admin-dashboard__pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div v-if="selectedOrder" class="admin-dashboard__modal" @click="closeModal">
      <div class="admin-dashboard__modal-content" @click.stop>
        <div class="admin-dashboard__modal-header">
          <h3>Detail Pesanan #{{ selectedOrder.id }}</h3>
          <button @click="closeModal" class="admin-dashboard__modal-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div class="admin-dashboard__modal-body">
          <div class="admin-dashboard__order-detail">
            <div class="admin-dashboard__detail-group">
              <h4>Informasi Pelanggan</h4>
              <p><strong>Nama:</strong> {{ selectedOrder.name }}</p>
              <p><strong>Email:</strong> {{ selectedOrder.email }}</p>
              <p><strong>Telepon:</strong> {{ selectedOrder.phone }}</p>
              <p><strong>Negara:</strong> {{ selectedOrder.country || 'Tidak diisi' }}</p>
            </div>

            <div class="admin-dashboard__detail-group">
              <h4>Detail Pesanan</h4>
              <p><strong>Paket:</strong> {{ getPackageName(selectedOrder.package) }}</p>
              <p><strong>Jumlah Peserta:</strong> {{ selectedOrder.participants }} orang</p>
              <p><strong>Tanggal Mulai:</strong> {{ formatDate(selectedOrder.startDate) }}</p>
              <p><strong>Tanggal Selesai:</strong> {{ formatDate(selectedOrder.endDate) }}</p>
              <p>
                <strong>Status:</strong>
                <span
                  :class="`admin-dashboard__status admin-dashboard__status--${selectedOrder.status}`"
                >
                  {{ getStatusText(selectedOrder.status) }}
                </span>
              </p>
            </div>

            <div
              v-if="selectedOrder.interests && selectedOrder.interests.length > 0"
              class="admin-dashboard__detail-group"
            >
              <h4>Minat Khusus</h4>
              <ul>
                <li v-for="interest in selectedOrder.interests" :key="interest">
                  {{ getInterestName(interest) }}
                </li>
              </ul>
            </div>

            <div v-if="selectedOrder.message" class="admin-dashboard__detail-group">
              <h4>Pesan Tambahan</h4>
              <p>{{ selectedOrder.message }}</p>
            </div>
          </div>
        </div>

        <div class="admin-dashboard__modal-footer">
          <button
            @click="closeModal"
            class="admin-dashboard__modal-btn admin-dashboard__modal-btn--secondary"
          >
            Tutup
          </button>
          <button
            @click="updateOrderStatus(selectedOrder)"
            class="admin-dashboard__modal-btn admin-dashboard__modal-btn--primary"
          >
            Ubah Status
          </button>
        </div>
      </div>
    </div>

    <!-- Status Update Modal -->
    <div v-if="showStatusModal" class="admin-dashboard__modal" @click="closeStatusModal">
      <div class="admin-dashboard__modal-content" @click.stop>
        <div class="admin-dashboard__modal-header">
          <h3>Ubah Status Pesanan</h3>
          <button @click="closeStatusModal" class="admin-dashboard__modal-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div class="admin-dashboard__modal-body">
          <div class="admin-dashboard__status-form">
            <label for="newStatus">Status Baru:</label>
            <select id="newStatus" v-model="newStatus">
              <option value="pending">Menunggu Konfirmasi</option>
              <option value="confirmed">Dikonfirmasi</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
        </div>

        <div class="admin-dashboard__modal-footer">
          <button
            @click="closeStatusModal"
            class="admin-dashboard__modal-btn admin-dashboard__modal-btn--secondary"
          >
            Batal
          </button>
          <button
            @click="confirmStatusUpdate"
            class="admin-dashboard__modal-btn admin-dashboard__modal-btn--primary"
          >
            Simpan
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
  deleteOrder,
  subscribeToOrders,
} from '../services/orderService'
import { logoutAdmin, onAuthStateChange, getCurrentAdminData } from '../services/authService'

const router = useRouter()
const isLoading = ref(false)
const orders = ref([])
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedOrder = ref(null)
const showStatusModal = ref(false)
const newStatus = ref('')
const orderToUpdate = ref(null)
const adminData = ref(null)

// Computed properties
const totalOrders = computed(() => orders.value.length)
const pendingOrders = computed(
  () => orders.value.filter((order) => order.status === 'pending').length,
)
const confirmedOrders = computed(
  () => orders.value.filter((order) => order.status === 'confirmed').length,
)
const completedOrders = computed(
  () => orders.value.filter((order) => order.status === 'completed').length,
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
    const ordersData = await getOrders()
    orders.value = ordersData
  } catch (error) {
    console.error('Error loading orders:', error)
  } finally {
    isLoading.value = false
  }
}

const refreshOrders = async () => {
  await loadOrders()
}

const filterOrders = () => {
  currentPage.value = 1
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID')
}

const getPackageName = (packageValue) => {
  const packages = {
    'budaya-3d': 'Paket Budaya 3 Hari',
    'budaya-5d': 'Paket Budaya 5 Hari',
    'budaya-7d': 'Paket Budaya 7 Hari',
    custom: 'Paket Custom',
  }
  return packages[packageValue] || packageValue
}

const getStatusText = (status) => {
  const statuses = {
    pending: 'Menunggu Konfirmasi',
    confirmed: 'Dikonfirmasi',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  }
  return statuses[status] || status
}

const getInterestName = (interest) => {
  const interests = {
    pasola: 'Ritual Pasola',
    tenun: 'Tenun Ikat',
    'rumah-adat': 'Rumah Adat',
    megalitik: 'Situs Megalitik',
    pantai: 'Pantai & Alam',
    fotografi: 'Fotografi',
    budaya: 'Budaya Tradisional',
    sejarah: 'Sejarah & Arkeologi',
  }
  return interests[interest] || interest
}

const viewOrder = (order) => {
  selectedOrder.value = order
}

const closeModal = () => {
  selectedOrder.value = null
}

const updateOrderStatus = (order) => {
  orderToUpdate.value = order
  newStatus.value = order.status
  showStatusModal.value = true
}

const closeStatusModal = () => {
  showStatusModal.value = false
  orderToUpdate.value = null
  newStatus.value = ''
}

const confirmStatusUpdate = async () => {
  if (orderToUpdate.value && newStatus.value) {
    try {
      await updateOrderStatus(orderToUpdate.value.id, newStatus.value)

      // Update local state
      const orderIndex = orders.value.findIndex((order) => order.id === orderToUpdate.value.id)
      if (orderIndex !== -1) {
        orders.value[orderIndex].status = newStatus.value
        orders.value[orderIndex].updatedAt = new Date().toISOString()
      }

      // Close modal and refresh
      closeStatusModal()
      if (selectedOrder.value && selectedOrder.value.id === orderToUpdate.value.id) {
        selectedOrder.value.status = newStatus.value
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Gagal mengupdate status pesanan')
    }
  }
}

const deleteOrderHandler = async (order) => {
  if (confirm(`Apakah Anda yakin ingin menghapus pesanan #${order.id}?`)) {
    try {
      await deleteOrder(order.id)

      // Remove from local state
      const orderIndex = orders.value.findIndex((o) => o.id === order.id)
      if (orderIndex !== -1) {
        orders.value.splice(orderIndex, 1)
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Gagal menghapus pesanan')
    }
  }
}

const logout = async () => {
  try {
    await logoutAdmin()
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

// Lifecycle
let unsubscribeOrders = null

onMounted(async () => {
  // Check authentication state
  const unsubscribeAuth = onAuthStateChange(async (user) => {
    if (!user) {
      router.push('/admin/login')
      return
    }

    // Get admin data
    adminData.value = await getCurrentAdminData()

    // Load orders and set up real-time listener
    loadOrders()

    // Set up real-time listener for orders
    unsubscribeOrders = subscribeToOrders((ordersData) => {
      orders.value = ordersData
    })
  })

  // Cleanup function
  onUnmounted(() => {
    if (unsubscribeAuth) unsubscribeAuth()
    if (unsubscribeOrders) unsubscribeOrders()
  })
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: #f8f9fa;
}

.admin-dashboard__header {
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 1.5rem 0;
  margin-bottom: 2rem;
}

.admin-dashboard__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.admin-dashboard__title-section {
  margin-bottom: 1rem;
}

.admin-dashboard__title {
  font-family: 'Oswald', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.admin-dashboard__subtitle {
  color: #666;
  font-size: 1.1rem;
}

.admin-dashboard__admin-info {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  align-items: center;
}

.admin-dashboard__admin-role {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-dashboard__admin-email {
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}

.admin-dashboard__actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.admin-dashboard__refresh-btn,
.admin-dashboard__logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.admin-dashboard__refresh-btn {
  background: #e9ecef;
  color: #333;
}

.admin-dashboard__refresh-btn:hover:not(:disabled) {
  background: #dee2e6;
}

.admin-dashboard__logout-btn {
  background: #dc3545;
  color: white;
}

.admin-dashboard__logout-btn:hover {
  background: #c82333;
}

.admin-dashboard__refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-dashboard__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.admin-dashboard__stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-dashboard__stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.admin-dashboard__stat-icon--total {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.admin-dashboard__stat-icon--pending {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.admin-dashboard__stat-icon--confirmed {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.admin-dashboard__stat-icon--completed {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.admin-dashboard__stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.25rem;
}

.admin-dashboard__stat-content p {
  color: #666;
  font-size: 0.9rem;
}

.admin-dashboard__orders {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.admin-dashboard__orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.admin-dashboard__orders-header h2 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.admin-dashboard__filter select {
  padding: 0.5rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
}

.admin-dashboard__loading {
  text-align: center;
  padding: 3rem;
}

.admin-dashboard__spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e9ecef;
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
  margin-bottom: 1rem;
  opacity: 0.5;
}

.admin-dashboard__empty h3 {
  margin-bottom: 0.5rem;
}

.admin-dashboard__table-container {
  overflow-x: auto;
}

.admin-dashboard__table {
  width: 100%;
  border-collapse: collapse;
}

.admin-dashboard__table th,
.admin-dashboard__table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.admin-dashboard__table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.admin-dashboard__table-row:hover {
  background: #f8f9fa;
}

.admin-dashboard__table-id {
  font-weight: 600;
  color: #667eea;
}

.admin-dashboard__table-name {
  font-weight: 500;
}

.admin-dashboard__table-email {
  color: #666;
  font-size: 0.9rem;
}

.admin-dashboard__table-package {
  font-size: 0.9rem;
}

.admin-dashboard__table-participants {
  text-align: center;
}

.admin-dashboard__table-date {
  font-size: 0.9rem;
  color: #666;
}

.admin-dashboard__status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-dashboard__status--pending {
  background: #fff3cd;
  color: #856404;
}

.admin-dashboard__status--confirmed {
  background: #d1ecf1;
  color: #0c5460;
}

.admin-dashboard__status--completed {
  background: #d4edda;
  color: #155724;
}

.admin-dashboard__status--cancelled {
  background: #f8d7da;
  color: #721c24;
}

.admin-dashboard__table-actions {
  display: flex;
  gap: 0.5rem;
}

.admin-dashboard__action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.admin-dashboard__action-btn--view {
  background: #e9ecef;
  color: #333;
}

.admin-dashboard__action-btn--view:hover {
  background: #dee2e6;
}

.admin-dashboard__action-btn--edit {
  background: #d1ecf1;
  color: #0c5460;
}

.admin-dashboard__action-btn--edit:hover {
  background: #bee5eb;
}

.admin-dashboard__action-btn--delete {
  background: #f8d7da;
  color: #721c24;
}

.admin-dashboard__action-btn--delete:hover {
  background: #f5c6cb;
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
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.admin-dashboard__pagination-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.admin-dashboard__pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.admin-dashboard__pagination-info {
  color: #666;
  font-size: 0.9rem;
}

.admin-dashboard__modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.admin-dashboard__modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.admin-dashboard__modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e9ecef;
}

.admin-dashboard__modal-header h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.admin-dashboard__modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #e9ecef;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.admin-dashboard__modal-close:hover {
  background: #dee2e6;
}

.admin-dashboard__modal-body {
  padding: 2rem;
}

.admin-dashboard__order-detail {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.admin-dashboard__detail-group h4 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.admin-dashboard__detail-group p {
  margin-bottom: 0.5rem;
  color: #666;
}

.admin-dashboard__detail-group ul {
  margin-left: 1rem;
  color: #666;
}

.admin-dashboard__status-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-dashboard__status-form label {
  font-weight: 600;
  color: #333;
}

.admin-dashboard__status-form select {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
}

.admin-dashboard__modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 2rem 2rem;
  border-top: 1px solid #e9ecef;
}

.admin-dashboard__modal-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.admin-dashboard__modal-btn--secondary {
  background: #e9ecef;
  color: #333;
}

.admin-dashboard__modal-btn--secondary:hover {
  background: #dee2e6;
}

.admin-dashboard__modal-btn--primary {
  background: #667eea;
  color: white;
}

.admin-dashboard__modal-btn--primary:hover {
  background: #5a6fd8;
}

@media (max-width: 768px) {
  .admin-dashboard__container {
    padding: 0 1rem;
  }

  .admin-dashboard__title {
    font-size: 2rem;
  }

  .admin-dashboard__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-dashboard__stats {
    grid-template-columns: 1fr;
  }

  .admin-dashboard__orders-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .admin-dashboard__table {
    font-size: 0.8rem;
  }

  .admin-dashboard__table th,
  .admin-dashboard__table td {
    padding: 0.5rem;
  }

  .admin-dashboard__modal {
    padding: 1rem;
  }

  .admin-dashboard__modal-content {
    max-height: 90vh;
  }

  .admin-dashboard__modal-header,
  .admin-dashboard__modal-body,
  .admin-dashboard__modal-footer {
    padding: 1rem;
  }
}
</style>
