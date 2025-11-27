<template>
  <div class="admin-setup">
    <div class="admin-setup__container">
      <div class="admin-setup__card">
        <div class="admin-setup__header">
          <h1 class="admin-setup__title">Setup Admin User</h1>
          <p class="admin-setup__subtitle">Buat admin user untuk pertama kali</p>
        </div>

        <div v-if="!isCreated" class="admin-setup__form">
          <div class="admin-setup__form-group">
            <label for="email">Email Admin</label>
            <input
              type="email"
              id="email"
              v-model="adminForm.email"
              placeholder="admin@sumbaculture.com"
              disabled
              class="admin-setup__input--disabled"
            />
            <small class="admin-setup__hint">Email admin dikunci untuk keamanan</small>
          </div>

          <div class="admin-setup__form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="adminForm.password"
              placeholder="admin123"
            />
          </div>

          <button @click="createAdminUser" class="admin-setup__button" :disabled="isLoading">
            <span v-if="!isLoading">Buat Admin User</span>
            <span v-else>Membuat...</span>
          </button>
        </div>

        <div v-if="isCreated" class="admin-setup__success">
          <div class="admin-setup__success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
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
          <h3>Admin User Berhasil Dibuat!</h3>
          <p>Email: {{ adminForm.email }}</p>
          <p>UID: {{ createdUser.uid }}</p>
          <div class="admin-setup__actions">
            <button @click="goToLogin" class="admin-setup__button admin-setup__button--primary">
              Login Sekarang
            </button>
            <button @click="reset" class="admin-setup__button admin-setup__button--secondary">
              Buat Admin Lain
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="admin-setup__error">
          {{ errorMessage }}
        </div>

        <div class="admin-setup__info">
          <p><strong>Catatan:</strong></p>
          <ul>
            <li>Pastikan Firebase sudah dikonfigurasi dengan benar</li>
            <li>Authentication harus sudah diaktifkan di Firebase Console</li>
            <li>Email/Password provider harus sudah diaktifkan</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createAdmin, restoreAdminAccess } from '../services/authService'

const router = useRouter()
const isLoading = ref(false)
const isCreated = ref(false)
const errorMessage = ref('')
const createdUser = ref(null)

const adminForm = ref({
  email: 'admin@sumbaculture.com',
  password: 'admin123',
})

const createAdminUser = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const user = await createAdmin(adminForm.value.email, adminForm.value.password)
    createdUser.value = user
    isCreated.value = true
  } catch (error) {
    console.error('Error creating admin:', error)

    if (
      error.code === 'auth/email-already-in-use' ||
      error.message.includes('email-already-in-use')
    ) {
      try {
        // Coba perbaiki akses admin jika user sudah ada
        const user = await restoreAdminAccess(adminForm.value.email, adminForm.value.password)
        createdUser.value = user
        isCreated.value = true
        errorMessage.value = 'User sudah ada. Akses admin berhasil diperbaiki/ditambahkan!'
        return
      } catch (restoreError) {
        console.error('Error restoring admin:', restoreError)
        errorMessage.value =
          'Email sudah digunakan. Gagal memperbaiki akses karena password salah atau error lain.'
        return
      }
    }

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage.value = 'Format email tidak valid'
        break
      case 'auth/weak-password':
        errorMessage.value = 'Password terlalu lemah. Minimal 6 karakter.'
        break
      case 'auth/operation-not-allowed':
        errorMessage.value = 'Email/Password authentication tidak diaktifkan di Firebase Console'
        break
      default:
        if (error.message && error.message.includes('domain admin')) {
          errorMessage.value = 'Email harus menggunakan domain admin yang valid (@sumbaculture.com)'
        } else {
          errorMessage.value = 'Terjadi kesalahan saat membuat admin user'
        }
    }
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/admin/login')
}

const reset = () => {
  isCreated.value = false
  createdUser.value = null
  errorMessage.value = ''
  adminForm.value = {
    email: 'admin@sumbaculture.com',
    password: 'admin123',
  }
}
</script>

<style scoped>
.admin-setup {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.admin-setup__container {
  width: 100%;
  max-width: 500px;
}

.admin-setup__card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.admin-setup__header {
  text-align: center;
  margin-bottom: 2rem;
}

.admin-setup__title {
  font-family: 'Oswald', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.admin-setup__subtitle {
  color: #666;
  font-size: 1rem;
}

.admin-setup__form {
  margin-bottom: 1.5rem;
}

.admin-setup__form-group {
  margin-bottom: 1.5rem;
}

.admin-setup__form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.admin-setup__form-group input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.admin-setup__form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.admin-setup__input--disabled {
  background-color: #e9ecef !important;
  color: #6c757d;
  cursor: not-allowed;
}

.admin-setup__hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #6c757d;
  font-style: italic;
}

.admin-setup__button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.admin-setup__button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.admin-setup__button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.admin-setup__button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.admin-setup__button--secondary {
  background: #e9ecef;
  color: #333;
  margin-top: 0.5rem;
}

.admin-setup__button--secondary:hover {
  background: #dee2e6;
}

.admin-setup__success {
  text-align: center;
  margin-bottom: 1.5rem;
}

.admin-setup__success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.admin-setup__success h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.admin-setup__success p {
  color: #666;
  margin-bottom: 0.5rem;
}

.admin-setup__actions {
  margin-top: 2rem;
}

.admin-setup__error {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #fcc;
}

.admin-setup__info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  text-align: left;
  font-size: 0.9rem;
  color: #666;
  border: 1px solid #e9ecef;
}

.admin-setup__info p {
  margin-bottom: 0.5rem;
}

.admin-setup__info ul {
  margin-left: 1rem;
}

.admin-setup__info li {
  margin-bottom: 0.25rem;
}

@media (max-width: 480px) {
  .admin-setup {
    padding: 1rem;
  }

  .admin-setup__card {
    padding: 2rem;
  }

  .admin-setup__title {
    font-size: 2rem;
  }
}
</style>
