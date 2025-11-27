import emailjs from '@emailjs/browser'

// KONFIGURASI EMAILJS
// PENTING: User harus mengganti nilai ini dengan akun EmailJS mereka sendiri
const EMAILJS_SERVICE_ID = 'service_hmiqm7t' // Ganti dengan Service ID dari EmailJS
const EMAILJS_TEMPLATE_ID = 'template_d5bme81' // Ganti dengan Template ID dari EmailJS
const EMAILJS_PUBLIC_KEY = 'nj_NZ_dpqtdcc550n' // Ganti dengan Public Key dari EmailJS

// Inisialisasi EmailJS (panggil ini di main.js atau App.vue jika perlu, tapi di sini kita panggil saat kirim)
export const initEmailService = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY)
}

// Fungsi untuk mengirim E-Tiket
export const sendETicket = async (order) => {
  try {
    // Format tanggal untuk tiket
    const startDate = new Date(order.startDate).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const endDate = new Date(order.endDate).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Persiapkan data untuk dikirim ke template EmailJS
    // Pastikan nama variabel ini cocok dengan {{variable}} di template EmailJS Anda
    const templateParams = {
      to_name: order.name,
      to_email: order.email,
      email: order.email, // Fallback jika user pakai {{email}} di template
      order_id: order.id.slice(-8).toUpperCase(), // Ambil 8 karakter terakhir ID
      package_name: order.package,
      participants: order.participants,
      travel_dates: `${startDate} - ${endDate}`,
      total_price: 'Hubungi Admin', // Atau hitung jika ada logika harga

      // Kita bisa mengirim HTML string jika template EmailJS mendukungnya (menggunakan {{{ticket_content}}})
      // Ini untuk memastikan logo dan format tiket terlihat bagus
      ticket_html: `
        <div style="font-family: 'Helvetica', sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #d4af37; border-radius: 15px; overflow: hidden;">
          <!-- Header dengan Logo Sumba Culture -->
          <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 20px; text-align: center; color: white;">
            <img src="https://sumbaculture.netlify.app/images/brand/logo.svg" alt="Sumba Culture" style="max-width: 250px; height: auto; margin-bottom: 10px;">
            <p style="margin: 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #bdc3c7;">Wisata Budaya</p>
          </div>

          <!-- Isi Tiket -->
          <div style="padding: 30px; background-color: #fff;">
            <h2 style="color: #2c3e50; text-align: center; margin-top: 0;">E-TIKET WISATA</h2>
            <p style="text-align: center; color: #7f8c8d; font-size: 14px;">Kode Booking: <strong style="color: #d4af37; font-size: 18px;">#${order.id.slice(-8).toUpperCase()}</strong></p>

            <hr style="border: 0; border-top: 1px dashed #bdc3c7; margin: 20px 0;">

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; color: #7f8c8d;">Nama Tamu:</td>
                <td style="padding: 10px; font-weight: bold; color: #2c3e50; text-align: right;">${order.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #7f8c8d;">Paket Wisata:</td>
                <td style="padding: 10px; font-weight: bold; color: #2c3e50; text-align: right;">${order.package}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #7f8c8d;">Jumlah Peserta:</td>
                <td style="padding: 10px; font-weight: bold; color: #2c3e50; text-align: right;">${order.participants} Orang</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #7f8c8d;">Tanggal:</td>
                <td style="padding: 10px; font-weight: bold; color: #2c3e50; text-align: right;">${startDate}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #d4af37; font-size: 12px; color: #7f8c8d;">
              <p style="margin: 0;"><strong>Catatan:</strong></p>
              <p style="margin: 5px 0 0;">Harap tunjukkan e-tiket ini kepada pemandu wisata kami saat penjemputan. Selamat menikmati keindahan Sumba!</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #ecf0f1; padding: 15px; text-align: center; font-size: 11px; color: #95a5a6;">
            &copy; 2025 Sumba Culture. All rights reserved.<br>
            Jl. Raya Waingapu No. 123, Sumba Timur | 0821-3514-6105
          </div>
        </div>
      `,
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY,
    )

    console.log('SUCCESS!', response.status, response.text)
    return response
  } catch (error) {
    console.error('FAILED...', error)
    throw error
  }
}
