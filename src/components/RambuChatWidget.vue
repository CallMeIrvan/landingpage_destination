<script setup>
import { ref, nextTick } from 'vue'

import { GoogleGenerativeAI } from '@google/generative-ai'
import { marked } from 'marked'

const API_KEY = 'AIzaSyBxpW6SWBRdP9AAk3XHoCDGKmXF1miekC0'

const SYSTEM_INSTRUCTION = `Namamu adalah Rambu. Kamu adalah asisten virtual ramah asli Pulau Sumba. Tugasmu hanya menjawab pertanyaan seputar pariwisata, budaya, adat, dan geografi Pulau Sumba, serta informasi yang ada di website Sumba Culture ini.

Gaya bicaramu:
- Gunakan sapaan khas 'Kabaena' atau 'Kakak'.
- Ramah, sopan, dan membantu.
- Jika user bertanya tentang hal di luar Sumba (misal: wisata Bali), tolak dengan sopan dan arahkan kembali ke topik Sumba.
- Berikan jawaban yang ringkas tapi informatif.

Pengetahuan Website Kamu:
1. Destinasi Wisata Unggulan:
   - Pantai Walakiri (Sumba Timur): Terkenal dengan pohon bakau menari (dancing trees) dan sunset memukau.
   - Desa Adat Ratenggaro (Sumba Barat Daya): Desa tradisional dengan atap menara tinggi (hingga 25m) dan kuburan megalitik di tepi pantai.
   - Air Terjun Lapopu (Sumba Tengah): Air terjun bertingkat di tengah hutan, butuh trekking ringan.
   - Bukit Wairinding (Sumba Timur): Hamparan perbukitan savana yang berubah warna sesuai musim (hijau saat hujan, kuning saat kemarau).
   - Pantai Puru Kambera (Sumba Timur): Pantai dengan savana di latar belakang, sering ada kuda liar.
   - Museum Sumba (Waingapu): Tempat belajar sejarah dan melihat koleksi tenun ikat.

2. Budaya & Tradisi:
   - Pasola: Ritual perang berkuda melempar lembing (biasanya Feb-Mar) untuk menyambut musim tanam.
   - Tenun Ikat: Kain khas dengan pewarna alami dan motif penuh makna (hewan, leluhur).
   - Rumah Adat (Uma Mbatangu): Rumah menara dengan 3 bagian (bawah untuk hewan, tengah untuk manusia, atas untuk leluhur/marapu).

3. Paket Wisata:
   - Kami menyediakan paket: Budaya 3 Hari, 5 Hari, 7 Hari, dan Custom.

4. Kontak & Lokasi:
   - Alamat: Jl. Raya Waingapu No. 123, Waingapu, Sumba Timur.
   - Telepon/WA: 0821-3514-6105.
   - Email: info@sumbaculture.com / booking@sumbaculture.com.

Jika user ingin memesan, arahkan mereka untuk mengisi form di bagian 'Hubungi Kami' atau kontak WA.`

// --- State ---
const isOpen = ref(false)
const isLoading = ref(false)
const userInput = ref('')
const messages = ref([
  {
    id: 1,
    sender: 'bot',
    text: 'Kabaena! Saya Rambu. Mau tanya soal rute, kain tenun, atau tiket masuk?',
  },
])
const chatBodyRef = ref(null)

// --- Logic ---
const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    scrollToBottom()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatBodyRef.value) {
    chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  // 1. Add User Message
  const userText = userInput.value
  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text: userText,
  })
  userInput.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    // 2. Call Gemini API
    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-001',
      systemInstruction: SYSTEM_INSTRUCTION,
    })

    // Construct history for context (limit to last 10 messages to save tokens)
    const history = messages.value
      .slice(0, -1) // Exclude the very last message we just added (it's the prompt)
      .slice(-10)
      .map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }))
      .filter((msg, index) => {
        // Ensure history starts with 'user'
        if (index === 0 && msg.role === 'model') return false
        return true
      })

    const chat = model.startChat({
      history: history,
    })

    const result = await chat.sendMessage(userText)
    const responseText = result.response.text()

    // 3. Add Bot Response
    messages.value.push({
      id: Date.now() + 1,
      sender: 'bot',
      text: responseText,
    })
  } catch (error) {
    console.error('Gemini API Error:', error)
    messages.value.push({
      id: Date.now() + 1,
      sender: 'bot',
      text: 'Maaf Kak, Rambu sedang ada gangguan sinyal. Coba tanya lagi nanti ya.',
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const renderMarkdown = (text) => {
  return marked(text)
}
</script>

<template>
  <div class="rambu-widget">
    <!-- Chat Window -->
    <transition name="slide-up">
      <div v-if="isOpen" class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="header-profile">
            <div class="avatar-circle small">
              <img
                src="https://ui-avatars.com/api/?name=Rambu&background=d4af37&color=fff"
                alt="Rambu"
              />
            </div>
            <div class="header-info">
              <h4>Rambu</h4>
              <span class="status-dot"></span> Online
            </div>
          </div>
          <button class="close-btn" @click="toggleChat">&times;</button>
        </div>

        <!-- Chat Body -->
        <div class="chat-body" ref="chatBodyRef">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="message-bubble"
            :class="msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'"
            v-html="renderMarkdown(msg.text)"
          ></div>
          <div v-if="isLoading" class="message-bubble bot-bubble typing">
            <span>.</span><span>.</span><span>.</span>
          </div>
        </div>

        <!-- Input Area -->
        <div class="chat-input">
          <input
            v-model="userInput"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Tanya sesuatu..."
          />
          <button @click="sendMessage" :disabled="isLoading || !userInput.trim()">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </button>
        </div>
      </div>
    </transition>

    <!-- Floating Button (Avatar) -->
    <button class="fab-btn" @click="toggleChat">
      <div class="avatar-circle">
        <!-- Placeholder Avatar using UI Avatars service -->
        <img
          src="https://ui-avatars.com/api/?name=Rambu&background=d4af37&color=fff&size=128"
          alt="Rambu"
        />
      </div>
      <div v-if="!isOpen" class="tooltip">Tanya seputar Sumba?</div>
    </button>
  </div>
</template>

<style scoped>
.rambu-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  font-family: 'Inter', sans-serif;
}

/* Floating Action Button */
.fab-btn {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fab-btn:hover {
  transform: scale(1.05);
}

.avatar-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  background: #f0f0f0;
}

.avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tooltip {
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  white-space: nowrap;
  color: #333;
  font-weight: 500;
  animation: fadeIn 0.5s ease;
}

.tooltip::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-left: 6px solid white;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

/* Chat Window */
.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Header */
.chat-header {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar-circle.small {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.header-info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.header-info {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #2ecc71;
  border-radius: 50%;
  margin-right: 4px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
  opacity: 0.8;
}

.close-btn:hover {
  opacity: 1;
}

/* Chat Body */
.chat-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.message-bubble :deep(p) {
  margin: 0;
}

.message-bubble :deep(ul),
.message-bubble :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
}

.message-bubble :deep(strong) {
  font-weight: 600;
}

.message-bubble {
  max-width: 80%;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.4;
  position: relative;
}

.bot-bubble {
  align-self: flex-start;
  background: white;
  color: #333;
  border-bottom-left-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.user-bubble {
  align-self: flex-end;
  background: #d4af37; /* Gold accent color from footer */
  color: white;
  border-bottom-right-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.typing span {
  animation: blink 1.4s infinite both;
  font-size: 1.5rem;
  line-height: 10px;
  margin: 0 1px;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}
.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Input Area */
.chat-input {
  padding: 1rem;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  gap: 0.5rem;
}

.chat-input input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  font-size: 0.95rem;
  transition: border-color 0.3s;
}

.chat-input input:focus {
  border-color: #d4af37;
}

.chat-input button {
  background: #d4af37;
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.chat-input button:hover:not(:disabled) {
  background: #c09b2d;
}

.chat-input button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-40%);
  }
  to {
    opacity: 1;
    transform: translateY(-50%);
  }
}

/* Mobile Responsiveness */
@media (max-width: 480px) {
  .chat-window {
    width: calc(100vw - 2rem);
    height: 60vh;
    bottom: 90px;
    right: 1rem;
    left: 1rem;
  }

  .rambu-widget {
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
