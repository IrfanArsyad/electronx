/**
 * Shared Type Definitions
 */

// Socket message types
export interface SocketMessage {
  event: string
  data: unknown
  timestamp: number
}

// App state
export interface AppState {
  version: string
  platform: NodeJS.Platform
  isOnline: boolean
}

// Common response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
}
