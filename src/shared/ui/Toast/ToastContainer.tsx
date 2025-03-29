'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { ToastType } from './lib/ToastModal'
import { Toast } from './Toast'
import styles from './Toast.module.scss'

type ToastContainerProps = {
  toasts: ToastType[]
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
  const portalRootRef = useRef<HTMLElement | null>(null)
  const portalElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    portalRootRef.current = document.getElementById('toast-portal')
    if (!portalRootRef.current) {
      const div = document.createElement('div')
      div.id = 'toast-portal'
      document.body.appendChild(div)
      portalRootRef.current = div
    }

    portalElementRef.current = document.createElement('div')
    portalRootRef.current.appendChild(portalElementRef.current)

    return () => {
      if (portalElementRef.current) {
        portalRootRef.current?.removeChild(portalElementRef.current)
      }
    }
  }, [])

  if (!portalElementRef.current) return null

  const classNameToastContainer = styles['toast-container']

  return createPortal(
    <ul className={classNameToastContainer}>
      {toasts.map(toast => (
        <li key={toast.id}>
          <Toast
            id={`${toast.id}`}
            headerText={toast.headerText}
            detailsText={toast.detailsText || ''}
            type={toast.type}
          />
        </li>
      ))}
    </ul>,
    portalElementRef.current
  )
}
