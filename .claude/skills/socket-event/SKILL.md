---
name: socket-event
description: Generate Socket.IO event handler pattern for client-server communication
argument-hint: "<event-name> [emit|listen|both]"
allowed-tools: Read, Edit
---

# Generate Socket.IO Event Handler

Create handler for event: **$0**

## Patterns

### Listen to Server Event

```typescript
import { useSocket } from '@/composables/useSocket'

const { on } = useSocket()

// Listen for event
on('$0', (data) => {
  console.log('Received $0:', data)
  // Handle data
})
```

### Emit to Server

```typescript
import { useSocket } from '@/composables/useSocket'

const { emit, emitWithAck } = useSocket()

// Fire and forget
emit('$0', payload)

// With acknowledgement
const response = await emitWithAck('$0', payload)
```

### Complete Pattern (Listen + Emit)

```typescript
import { ref, onMounted, onUnmounted } from 'vue'
import { useSocket } from '@/composables/useSocket'

const { on, emit, isConnected } = useSocket()

// State
const $0Data = ref(null)

// Listen
const unsubscribe = on('$0', (data) => {
  $0Data.value = data
})

// Emit
function send$0(payload) {
  if (isConnected.value) {
    emit('$0', payload)
  }
}

// Cleanup
onUnmounted(() => {
  unsubscribe()
})
```

## Type Safety

Define types in `src/renderer/src/types/socket.ts`:

```typescript
// Event payload types
export interface $0Payload {
  // Define structure
}

export interface $0Response {
  // Define structure
}
```

## Server Side (Node.js reference)

```javascript
// Listen
socket.on('$0', (data) => {
  console.log('Received:', data)
})

// Emit
socket.emit('$0', response)

// Broadcast to all
io.emit('$0', data)

// Broadcast to room
io.to('room').emit('$0', data)
```

Generate the Socket.IO handler for event "$0".
