<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSocket } from '@/composables/useSocket'
import { useElectron } from '@/composables/useElectron'

const { app } = useElectron()
const { connect, disconnect, isConnected, on, emit } = useSocket()

const appVersion = ref('')
const platform = ref('')
const socketUrl = ref('http://localhost:3000')
const messages = ref<string[]>([])
const inputMessage = ref('')

onMounted(async () => {
  appVersion.value = await app.getVersion()
  platform.value = await app.getPlatform()
})

function handleConnect() {
  connect(socketUrl.value)

  on('connect', () => {
    messages.value.push('[System] Connected to server')
  })

  on('disconnect', () => {
    messages.value.push('[System] Disconnected from server')
  })

  on('message', (data: unknown) => {
    messages.value.push(`[Server] ${data}`)
  })
}

function handleDisconnect() {
  disconnect()
}

function sendMessage() {
  if (inputMessage.value.trim()) {
    emit('message', inputMessage.value)
    messages.value.push(`[You] ${inputMessage.value}`)
    inputMessage.value = ''
  }
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>ElectronX</h1>
      <p>v{{ appVersion }} | {{ platform }}</p>
    </header>

    <main class="main">
      <section class="socket-section">
        <h2>Socket.IO Connection</h2>

        <div class="connection-form">
          <input
            v-model="socketUrl"
            type="text"
            placeholder="Socket server URL"
            :disabled="isConnected"
          />
          <button v-if="!isConnected" @click="handleConnect">
            Connect
          </button>
          <button v-else @click="handleDisconnect" class="disconnect">
            Disconnect
          </button>
        </div>

        <div class="status" :class="{ connected: isConnected }">
          Status: {{ isConnected ? 'Connected' : 'Disconnected' }}
        </div>

        <div class="messages">
          <div v-for="(msg, index) in messages" :key="index" class="message">
            {{ msg }}
          </div>
        </div>

        <div v-if="isConnected" class="send-form">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Send</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  background: #1a1a2e;
  color: #eee;
}

.app {
  min-height: 100vh;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2rem;
  color: #00d9ff;
}

.header p {
  color: #888;
  font-size: 0.9rem;
}

.main {
  max-width: 600px;
  margin: 0 auto;
}

.socket-section h2 {
  margin-bottom: 15px;
  color: #00d9ff;
}

.connection-form {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.connection-form input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #333;
  border-radius: 6px;
  background: #16213e;
  color: #eee;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background: #00d9ff;
  color: #1a1a2e;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.9;
}

button.disconnect {
  background: #ff4757;
  color: #fff;
}

.status {
  padding: 10px;
  border-radius: 6px;
  background: #16213e;
  margin-bottom: 15px;
  color: #ff4757;
}

.status.connected {
  color: #2ed573;
}

.messages {
  height: 300px;
  overflow-y: auto;
  background: #16213e;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
}

.message {
  padding: 5px 0;
  border-bottom: 1px solid #333;
}

.message:last-child {
  border-bottom: none;
}

.send-form {
  display: flex;
  gap: 10px;
}

.send-form input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #333;
  border-radius: 6px;
  background: #16213e;
  color: #eee;
}
</style>
