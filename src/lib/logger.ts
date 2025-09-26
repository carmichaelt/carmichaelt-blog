import { z } from 'zod'

// Log levels schema
const LogLevelSchema = z.enum(['debug', 'info', 'warn', 'error'])
type LogLevel = z.infer<typeof LogLevelSchema>

// Log entry schema
const LogEntrySchema = z.object({
  level: LogLevelSchema,
  message: z.string(),
  timestamp: z.string(),
  context: z.record(z.string(), z.any()).optional(),
  error: z.object({
    name: z.string(),
    message: z.string(),
    stack: z.string().optional(),
  }).optional(),
})

type LogEntry = z.infer<typeof LogEntrySchema>

class Logger {
  private isDevelopment: boolean
  private isProduction: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.isProduction = process.env.NODE_ENV === 'production'
  }

  private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error): string {
    const timestamp = new Date().toISOString()
    const logEntry: LogEntry = {
      level,
      message,
      timestamp,
      context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    }

    // Validate log entry
    const validatedEntry = LogEntrySchema.parse(logEntry)

    if (this.isDevelopment) {
      // Pretty format for development
      const prefix = `[${timestamp}] ${level.toUpperCase()}:`
      if (error) {
        return `${prefix} ${message}\n${error.stack}${context ? `\nContext: ${JSON.stringify(context, null, 2)}` : ''}`
      }
      return `${prefix} ${message}${context ? `\nContext: ${JSON.stringify(context, null, 2)}` : ''}`
    }

    // JSON format for production
    return JSON.stringify(validatedEntry)
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isProduction) {
      // Only log errors and warnings in production
      return level === 'error' || level === 'warn'
    }
    // Log everything in development
    return true
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, context))
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context))
    }
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context))
    }
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, context, error))
    }
  }

  // Convenience method for API errors
  apiError(endpoint: string, error: Error, context?: Record<string, unknown>): void {
    this.error(`API Error in ${endpoint}`, error, { endpoint, ...context })
  }

  // Convenience method for database errors
  dbError(operation: string, error: Error, context?: Record<string, unknown>): void {
    this.error(`Database Error during ${operation}`, error, { operation, ...context })
  }

  // Convenience method for authentication errors
  authError(operation: string, error: Error, context?: Record<string, unknown>): void {
    this.error(`Authentication Error during ${operation}`, error, { operation, ...context })
  }
}

// Export singleton instance
export const logger = new Logger()

// Export types for use in other files
export type { LogLevel, LogEntry }
