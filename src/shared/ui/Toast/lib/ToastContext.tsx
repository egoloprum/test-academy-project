'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

import ToastContainer from '../ToastContainer'

import { ToastType } from './ToastModal'

type ToastContextType = {
  addToast: (
    headerText: string,
    detailsText?: string,
    type?: ToastType['type']
  ) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const addToast = (
    headerText: string,
    detailsText?: string,
    type: ToastType['type'] = 'info'
  ) => {
    const id = `${Date.now()}`
    setToasts(prev => [...prev, { id, headerText, detailsText, type }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
