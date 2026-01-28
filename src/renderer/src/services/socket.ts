/**
 * Socket Service
 * Standalone Socket.IO service for non-component usage
 */

import { io, Socket } from 'socket.io-client'
import type { ManagerOptions, SocketOptions } from 'socket.io-client'

class SocketService {
  private socket: Socket | null = null
  private url: string = ''

  get instance(): Socket | null {
    return this.socket
  }

  get connected(): boolean {
    return this.socket?.connected ?? false
  }

  connect(url: string, options?: Partial<ManagerOptions & SocketOptions>): Socket {
    if (this.socket?.connected && this.url === url) {
      return this.socket
    }

    this.disconnect()
    this.url = url

    this.socket = io(url, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      ...options
    })

    return this.socket
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  on(event: string, callback: (...args: unknown[]) => void): this {
    this.socket?.on(event, callback)
    return this
  }

  off(event: string, callback?: (...args: unknown[]) => void): this {
    this.socket?.off(event, callback)
    return this
  }

  emit(event: string, ...args: unknown[]): this {
    this.socket?.emit(event, ...args)
    return this
  }

  async emitWithAck<T = unknown>(event: string, ...args: unknown[]): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('Socket not connected'))
        return
      }
      this.socket.emit(event, ...args, (response: T) => {
        resolve(response)
      })
    })
  }
}

// Singleton export
export const socketService = new SocketService()
