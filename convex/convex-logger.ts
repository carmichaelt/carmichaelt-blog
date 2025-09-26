// Simple logger for Convex environment
class ConvexLogger {
    private isDevelopment: boolean
  
    constructor() {
      this.isDevelopment = process.env.NODE_ENV === 'development'
    }
  
    private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
      if (!this.isDevelopment) {
        // Only log errors and warnings in production
        return level === 'error' || level === 'warn'
      }
      return true
    }
  
    debug(message: string, context?: Record<string, unknown>): void {
      if (this.shouldLog('debug')) {
        console.log(`[DEBUG] ${message}`, context ? JSON.stringify(context) : '')
      }
    }
  
    info(message: string, context?: Record<string, unknown>): void {
      if (this.shouldLog('info')) {
        console.log(`[INFO] ${message}`, context ? JSON.stringify(context) : '')
      }
    }
  
    warn(message: string, context?: Record<string, unknown>): void {
      if (this.shouldLog('warn')) {
        console.warn(`[WARN] ${message}`, context ? JSON.stringify(context) : '')
      }
    }
  
    error(message: string, context?: Record<string, unknown>): void {
      if (this.shouldLog('error')) {
        console.error(`[ERROR] ${message}`, context ? JSON.stringify(context) : '')
      }
    }
  }
  
  export const convexLogger = new ConvexLogger()