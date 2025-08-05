"use client"

// Sonner-based toast hook for Next.js/React
// https://sonner.emilkowal.ski/

import { toast as sonnerToast, Toaster } from "sonner"

// Export a toast function (like react-hot-toast)
export const toast = (message: string, options?: Record<string, unknown>) => {
  return sonnerToast(message, options)
}

// Hook to use toast in components (no-op for Sonner, can just use toast directly)
export function useToast() {
  return { toast }
}

// Optionally, export the Toaster component for your app's layout/root
export { Toaster }