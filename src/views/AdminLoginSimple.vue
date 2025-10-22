<template>
  <div class="admin-login">
    <div class="admin-login__container">
      <div class="admin-login__card">
        <div class="admin-login__header">
          <h1 class="admin-login__title">Admin Panel</h1>
          <p class="admin-login__subtitle">Masuk untuk mengelola pesanan wisata</p>
        </div>

        <form @submit.prevent="handleLogin" class="admin-login__form">
          <div class="admin-login__form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="loginForm.email"
              required
              placeholder="Masukkan email admin"
            />
          </div>

          <div class="admin-login__form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="loginForm.password"
              required
              placeholder="Masukkan password"
            />
          </div>

          <button type="submit" class="admin-login__button" :disabled="isLoading">
            <span v-if="!isLoading">Masuk</span>
            <span v-else>Memproses...</span>
          </button>
        </form>

        <div v-if="errorMessage" class="admin-login__error">
          {{ errorMessage }}
        </div>

        <div class="admin-login__demo">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@sumbaculture.com</p>
          <p>Password: admin123</p>
          <p><small>Pastikan Firebase sudah dikonfigurasi dengan benar</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')

const loginForm = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    // Simulasi login untuk testing
    console.log('Login attempt:', loginForm.value.email)

    // Untuk testing, langsung redirect ke dashboard
    if (
      loginForm.value.email === 'admin@sumbaculture.com' &&
      loginForm.value.password === 'admin123'
    ) {
      localStorage.setItem(
        'adminUser',
        JSON.stringify({
          uid: 'test-uid',
          email: loginForm.value.email,
          role: 'super_admin',
          permissions: ['manage_orders', 'manage_admins'],
          loginTime: new Date().toISOString(),
        }),
      )

      router.push('/admin/dashboard')
    } else {
      errorMessage.value = 'Email atau password salah'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Terjadi kesalahan saat login'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.admin-login__container {
  width: 100%;
  max-width: 500px;
}

.admin-login__card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.admin-login__header {
  text-align: center;
  margin-bottom: 2rem;
}

.admin-login__title {
  font-family: 'Oswald', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.admin-login__subtitle {
  color: #666;
  font-size: 1rem;
}

.admin-login__form {
  margin-bottom: 1.5rem;
}

.admin-login__form-group {
  margin-bottom: 1.5rem;
}

.admin-login__form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.admin-login__form-group input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.admin-login__form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.admin-login__button {
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

.admin-login__button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.admin-login__button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.admin-login__error {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #fcc;
}

.admin-login__demo {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  border: 1px solid #e9ecef;
}

.admin-login__demo p {
  margin-bottom: 0.5rem;
}

@media (max-width: 480px) {
  .admin-login {
    padding: 1rem;
  }

  .admin-login__card {
    padding: 2rem;
  }

  .admin-login__title {
    font-size: 2rem;
  }
}
</style>
