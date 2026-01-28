<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSocket } from '@/composables/useSocket'
import { useElectron } from '@/composables/useElectron'
import { Button, Input } from '@/components'

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
          <Input
            v-model="socketUrl"
            placeholder="Socket server URL"
            :disabled="isConnected"
          />
          <Button v-if="!isConnected" @click="handleConnect">
            Connect
          </Button>
          <Button v-else variant="danger" @click="handleDisconnect">
            Disconnect
          </Button>
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
          <Input
            v-model="inputMessage"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
          />
          <Button @click="sendMessage">Send</Button>
        </div>
      </section>
    </main>
  </div>
</template>
