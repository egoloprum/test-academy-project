'use client'

import { DialogHTMLAttributes, FC, useEffect, useRef } from 'react'

import { CheckCircle, X, XCircle } from '@/shared/assets/icons'

import { Button } from '../Button'

import { useToast } from './lib/ToastContext'
import styles from './Toast.module.scss'

interface ToastProps extends DialogHTMLAttributes<HTMLDialogElement> {
  headerText: string
  detailsText: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export const Toast: FC<ToastProps> = ({
  id = '',
  headerText,
  detailsText,
  type,
  ...rest
}) => {
  const classNameToast = [styles[`toast`], styles[`toast-${type}`]].join(' ')
  const classNameToastText = styles['toast-text']
  const classNameToastBtn = styles['toast-btn']
  const classNameToastCircle = styles['toast-svg-circle']
  const classNameToastX = styles['toast-svg-x']

  const classNameToastHeaderText = styles['toast-header-text']
  const classNameToastDetailsText = styles['toast-details-text']

  const { removeToast } = useToast()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog) {
      dialog?.classList.remove('toast-closing')
      dialog?.classList.add('toast-opening')
      dialog?.show()

      const autoCloseTimer = setTimeout(() => {
        startClosing()
      }, 5000)

      return () => {
        clearTimeout(autoCloseTimer)
      }
    }
  }, [id, removeToast])

  const startClosing = () => {
    const dialog = dialogRef.current
    if (dialog) {
      dialog.classList.remove('toast-opening')
      dialog.classList.add('toast-closing')
      setTimeout(() => {
        dialog.classList.remove('toast-closing')
        removeToast(id)
      }, 250)
    }
  }

  return (
    <dialog
      className={classNameToast}
      ref={dialogRef}
      {...rest}
      role="alert"
      aria-live="polite"
      aria-atomic="true">
      {type === 'success' ? (
        <CheckCircle className={classNameToastCircle} />
      ) : (
        <XCircle className={classNameToastCircle} />
      )}

      <div className={classNameToastText}>
        <p className={classNameToastHeaderText}>{headerText}</p>
        {detailsText && (
          <p className={classNameToastDetailsText}>{detailsText}</p>
        )}
      </div>

      <Button
        onClick={() => startClosing()}
        buttonSize="medium"
        buttonType="mini"
        mode="clear"
        className={classNameToastBtn}
        aria-label="Close toast">
        <X className={classNameToastX} />
      </Button>
    </dialog>
  )
}
