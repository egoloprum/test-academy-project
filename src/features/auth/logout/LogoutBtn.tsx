'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui/Button'
import { useToast } from '@/shared/ui/Toast'

import { apiLogout } from './api/apiLogout'

export const LogoutBtn = ({}) => {
  const router = useRouter()

  const { addToast } = useToast()

  const onLogout = async () => {
    try {
      await apiLogout()
      router.push('/')
    } catch (error) {
      if (error instanceof Error) {
        addToast(`${error.message}`, '', 'error')
      }
    }
  }

  return (
    <Button type="button" mode="secondary" onClick={onLogout}>
      Выход из системы
    </Button>
  )
}
