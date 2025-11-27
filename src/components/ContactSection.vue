<template>
  <section id="contact" class="contact">
    <div class="contact__container">
      <div class="contact__header">
        <h2 class="contact__title">Hubungi Kami</h2>
        <p class="contact__subtitle">
          Siap memulai petualangan budaya di Pulau Sumba? Mari rencanakan perjalanan Anda bersama
          kami
        </p>
      </div>

      <div class="contact__content">
        <div class="contact__info">
          <div class="contact__info-card">
            <div class="contact__info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M8 12L10.5 14.5L16 9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3>Pesan Sekarang</h3>
            <p>
              Dapatkan penawaran terbaik untuk paket wisata budaya Sumba dengan harga yang
              kompetitif
            </p>
          </div>

          <div class="contact__info-card">
            <div class="contact__info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61 4.79 5.5 7.5 5.5C9.24 5.5 10.73 6.5 11.5 8C12.27 6.5 13.76 5.5 15.5 5.5C18.21 5.5 21 7.61 21 10Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3>Lokasi Kami</h3>
            <p>Jl. Raya Waingapu No. 123<br />Waingapu, Sumba Timur<br />Nusa Tenggara Timur</p>
          </div>

          <div class="contact__info-card">
            <div class="contact__info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9625 21.2094 15.2099 21.5265 15.5834C21.8437 15.9569 22.0122 16.4308 22 16.92Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3>Hubungi Kami</h3>
            <p>0821-3514-6105<br />info@sumbaculture.com<br />booking@sumbaculture.com</p>
          </div>
        </div>

        <div class="contact__form-container">
          <form class="contact__form" @submit.prevent="submitForm">
            <div class="contact__form-header">
              <h3>Form Pemesanan</h3>
              <p>Isi form di bawah ini untuk memesan paket wisata budaya Sumba</p>
            </div>

            <div class="contact__form-grid">
              <div class="contact__form-group">
                <label for="name">Nama Lengkap *</label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  required
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div class="contact__form-group">
                <label for="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  required
                  placeholder="contoh@email.com"
                />
              </div>

              <div class="contact__form-group">
                <label for="phone">Nomor Telepon *</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  required
                  placeholder="082135146105"
                />
              </div>

              <div class="contact__form-group">
                <label for="country">Negara Asal</label>
                <select id="country" v-model="form.country">
                  <option value="">Pilih Negara</option>
                  <option value="ID">Indonesia</option>
                  <option value="AU">Australia</option>
                  <option value="SG">Singapore</option>
                  <option value="MY">Malaysia</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div class="contact__form-group">
                <label for="package">Paket Wisata *</label>
                <select id="package" v-model="form.package" required>
                  <option value="">Pilih Paket</option>
                  <option value="budaya-3d">Paket Budaya 3 Hari</option>
                  <option value="budaya-5d">Paket Budaya 5 Hari</option>
                  <option value="budaya-7d">Paket Budaya 7 Hari</option>
                  <option value="custom">Paket Custom</option>
                </select>
              </div>

              <div class="contact__form-group">
                <label for="participants">Jumlah Peserta *</label>
                <input
                  type="number"
                  id="participants"
                  v-model="form.participants"
                  required
                  min="1"
                  max="20"
                  placeholder="1-20 orang"
                />
              </div>

              <div class="contact__form-group contact__form-group--full">
                <label for="dates">Tanggal Perjalanan *</label>
                <div class="contact__date-inputs">
                  <input
                    type="date"
                    id="startDate"
                    v-model="form.startDate"
                    required
                    :min="minDate"
                  />
                  <span>sampai</span>
                  <input
                    type="date"
                    id="endDate"
                    v-model="form.endDate"
                    required
                    :min="form.startDate || minDate"
                  />
                </div>
              </div>

              <div class="contact__form-group contact__form-group--full">
                <label for="interests">Minat Khusus</label>
                <div class="contact__checkbox-group">
                  <label
                    v-for="interest in interests"
                    :key="interest.value"
                    class="contact__checkbox"
                  >
                    <input type="checkbox" :value="interest.value" v-model="form.interests" />
                    <span>{{ interest.label }}</span>
                  </label>
                </div>
              </div>

              <div class="contact__form-group contact__form-group--full">
                <label for="message">Pesan Tambahan</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  placeholder="Ceritakan kebutuhan khusus atau pertanyaan Anda..."
                ></textarea>
              </div>
            </div>

            <div class="contact__form-actions">
              <button type="submit" class="btn btn--primary" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Kirim Pesanan</span>
                <span v-else>Mengirim...</span>
                <svg v-if="!isSubmitting" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { addOrder } from '../services/orderService'

const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  country: '',
  package: '',
  participants: 1,
  startDate: '',
  endDate: '',
  interests: [],
  message: '',
})

const interests = ref([
  { value: 'pasola', label: 'Ritual Pasola' },
  { value: 'tenun', label: 'Tenun Ikat' },
  { value: 'rumah-adat', label: 'Rumah Adat' },
  { value: 'megalitik', label: 'Situs Megalitik' },
  { value: 'pantai', label: 'Pantai & Alam' },
  { value: 'fotografi', label: 'Fotografi' },
  { value: 'budaya', label: 'Budaya Tradisional' },
  { value: 'sejarah', label: 'Sejarah & Arkeologi' },
])

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulasi pengiriman form
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simpan pesanan ke Firebase
    const orderData = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      country: form.value.country,
      package: form.value.package,
      participants: form.value.participants,
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      interests: form.value.interests,
      message: form.value.message,
    }

    const result = await addOrder(orderData)

    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      country: '',
      package: '',
      participants: 1,
      startDate: '',
      endDate: '',
      interests: [],
      message: '',
    }

    alert(
      `Terima kasih! Pesanan Anda telah berhasil dikirim dengan ID #${result.id}. Tim kami akan menghubungi Anda dalam 24 jam.`,
    )
  } catch (error) {
    console.error('Error submitting order:', error)
    alert('Maaf, terjadi kesalahan. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.contact__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact__header {
  text-align: center;
  margin-bottom: 4rem;
}

.contact__title {
  font-family: 'Big Shoulders Stencil', cursive;
  font-size: 3rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  letter-spacing: 2px;
}

.contact__title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  border-radius: 2px;
}

.contact__subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact__content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact__info-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  text-align: center;
}

.contact__info-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #333;
}

.contact__info-card h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.contact__info-card p {
  color: #666;
  line-height: 1.6;
}

.contact__form-container {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}

.contact__form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact__form-header h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.contact__form-header p {
  color: #666;
  font-size: 1.1rem;
}

.contact__form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact__form-group {
  display: flex;
  flex-direction: column;
}

.contact__form-group--full {
  grid-column: span 2;
}

.contact__form-group label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.contact__form-group input,
.contact__form-group select,
.contact__form-group textarea {
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.contact__form-group input:focus,
.contact__form-group select:focus,
.contact__form-group textarea:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.contact__date-inputs {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact__date-inputs span {
  color: #666;
  font-weight: 500;
}

.contact__checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.contact__checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.contact__checkbox:hover {
  background-color: #f8f9fa;
}

.contact__checkbox input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #d4af37;
}

.contact__checkbox span {
  font-size: 0.9rem;
  color: #666;
}

.contact__form-actions {
  text-align: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.btn--primary {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
}

.btn--primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .contact__title {
    font-size: 2rem;
  }

  .contact__content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact__form-container {
    padding: 2rem;
  }

  .contact__form-grid {
    grid-template-columns: 1fr;
  }

  .contact__form-group--full {
    grid-column: span 1;
  }

  .contact__checkbox-group {
    grid-template-columns: 1fr;
  }

  .contact__date-inputs {
    flex-direction: column;
    align-items: stretch;
  }

  .contact__date-inputs span {
    text-align: center;
  }
}
</style>
