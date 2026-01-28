/**
 * Composable: useSocket
 * Socket.IO client wrapper with reactive state
 */

import { ref, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'
import type { ManagerOptions, SocketOptions } from 'socket.io-client'

type SocketCallback = (...args: unknown[]) => void

// Shared socket instance
let socket: Socket | null = null
const isConnected = ref(false)
const connectionError = ref<string | null>(null)

export function useSocket() {
  const listeners = new Map<string, SocketCallback[]>()

  /**
   * Connect to socket server
   */
  function connect(
    url: string,
    options?: Partial<ManagerOptions & SocketOptions>
  ): Socket {
    // Disconnect existing connection
    if (socket?.connected) {
      socket.disconnect()
    }

    socket = io(url, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      ...options
    })

    // Connection state handlers
    socket.on('connect', () => {
      isConnected.value = true
      connectionError.value = null
    })

    socket.on('disconnect', () => {
      isConnected.value = false
    })

    socket.on('connect_error', (error) => {
      connectionError.value = error.message
      isConnected.value = false
    })

    return socket
  }

  /**
   * Disconnect from socket server
   */
  function disconnect(): void {
    if (socket) {
      socket.disconnect()
      socket = null
      isConnected.value = false
    }
  }

  /**
   * Listen to socket event
   */
  function on(event: string, callback: SocketCallback): () => void {
    if (!socket) {
      console.warn('[Socket] Not connected. Call connect() first.')
      return () => {}
    }

    socket.on(event, callback)

    // Track listener for cleanup
    if (!listeners.has(event)) {
      listeners.set(event, [])
    }
    listeners.get(event)!.push(callback)

    // Return unsubscribe function
    return () => off(event, callback)
  }

  /**
   * Listen to socket event once
   */
  function once(event: string, callback: SocketCallback): void {
    if (!socket) {
      console.warn('[Socket] Not connected. Call connect() first.')
      return
    }
    socket.once(event, callback)
  }

  /**
   * Remove event listener
   */
  function off(event: string, callback?: SocketCallback): void {
    if (!socket) return

    if (callback) {
      socket.off(event, callback)
      const eventListeners = listeners.get(event)
      if (eventListeners) {
        const index = eventListeners.indexOf(callback)
        if (index > -1) {
          eventListeners.splice(index, 1)
        }
      }
    } else {
      socket.off(event)
      listeners.delete(event)
    }
  }

  /**
   * Emit event to server
   */
  function emit(event: string, ...args: unknown[]): void {
    if (!socket?.connected) {
      console.warn('[Socket] Not connected. Call connect() first.')
      return
    }
    socket.emit(event, ...args)
  }

  /**
   * Emit with acknowledgement
   */
  function emitWithAck<T = unknown>(
    event: string,
    ...args: unknown[]
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!socket?.connected) {
        reject(new Error('Socket not connected'))
        return
      }
      socket.emit(event, ...args, (response: T) => {
        resolve(response)
      })
    })
  }

  /**
   * Get socket instance
   */
  function getSocket(): Socket | null {
    return socket
  }

  // Cleanup on unmount
  onUnmounted(() => {
    // Remove all tracked listeners
    listeners.forEach((callbacks, event) => {
      callbacks.forEach(callback => {
        socket?.off(event, callback)
      })
    })
    listeners.clear()
  })

  return {
    // State
    isConnected,
    connectionError,
    // Methods
    connect,
    disconnect,
    on,
    once,
    off,
    emit,
    emitWithAck,
    getSocket
  }
}
