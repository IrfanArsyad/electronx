---
name: service
description: Generate a new service class for business logic
argument-hint: "<ServiceName> [description]"
allowed-tools: Read, Write
---

# Generate Service

Create a new service: **$0Service**

## File Location

`src/renderer/src/services/$0.ts`

## Template

```typescript
/**
 * Service: $0Service
 * $1
 */

class $0Service {
  private static instance: $0Service

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): $0Service {
    if (!$0Service.instance) {
      $0Service.instance = new $0Service()
    }
    return $0Service.instance
  }

  // Methods
  async fetch(): Promise<unknown> {
    try {
      // Implementation
      return null
    } catch (error) {
      console.error('[$0Service] Error:', error)
      throw error
    }
  }
}

// Singleton export
export const $0Service = $0Service.getInstance()
```

## Alternative: Functional Service

```typescript
/**
 * Service: $0
 * $1
 */

// State (module-level)
let state: unknown = null

// Methods
export async function fetch$0(): Promise<unknown> {
  // Implementation
  return null
}

export function get$0(): unknown {
  return state
}

export function reset$0(): void {
  state = null
}
```

## Guidelines

1. Use singleton pattern for stateful services
2. Use functional pattern for stateless utilities
3. Handle errors with try-catch
4. Log errors with service prefix
5. Export from `services/index.ts`

## After Creating

Add export to `src/renderer/src/services/index.ts`:

```typescript
export { $0Service } from './$0'
```

Generate service "$0Service" with description "$1".
