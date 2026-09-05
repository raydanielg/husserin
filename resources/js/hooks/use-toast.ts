"use client"

import { toast as globalToast, createToastManager, useToastManager } from "@/components/ui/toast"
import { useCallback } from "react"

type ToastType = "success" | "error" | "info" | "warning" | "loading"

interface ToastOptions {
  title?: string
  description?: string
}

export function useToast() {
  const manager = useToastManager()

  const show = useCallback((type: ToastType, opts: ToastOptions) => {
    manager.add({
      type,
      title: opts.title,
      description: opts.description,
    })
  }, [manager])

  const success = useCallback((title: string, description?: string) => {
    show("success", { title, description })
  }, [show])

  const error = useCallback((title: string, description?: string) => {
    show("error", { title, description })
  }, [show])

  const info = useCallback((title: string, description?: string) => {
    show("info", { title, description })
  }, [show])

  const warning = useCallback((title: string, description?: string) => {
    show("warning", { title, description })
  }, [show])

  const loading = useCallback((title: string, description?: string) => {
    show("loading", { title, description })
  }, [show])

  return { success, error, info, warning, loading, show }
}

export { globalToast }
