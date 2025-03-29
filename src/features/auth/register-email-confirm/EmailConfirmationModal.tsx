'use client'

import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

import { SendEmailConfirm } from '@/shared/api/register-email-verify'
import { CheckUser } from '@/shared/api/user'
import { ArrowLeft } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/Button'
import { useToast } from '@/shared/ui/Toast'

import styles from './EmailConfirmationModal.module.scss'

interface EmailConfirmationModalProps {
  email: string
}

export const EmailConfirmationModal: FC<EmailConfirmationModalProps> = ({
  email
}) => {
  const router = useRouter()

  useEffect(() => {
    if (!email) {
      router.push('/register')
    }
  }, [email, router])

  const classNameWrapper = styles['email-conf-wrapper']
  const classNameTextFrame = styles['email-conf-text-frame']
  const classNameBtn = styles['email-conf-btn']
  const classNameGoBackBtn = styles['email-conf-go-back-btn']

  const { addToast } = useToast()

  const ResendEmail = async () => {
    try {
      await SendEmailConfirm()
      addToast(
        'Письмо отправлено!',
        'Не забудьте проверить папку “Спам”.',
        'success'
      )
    } catch (error) {
      if (error instanceof Error) {
        addToast(`${error.message}`, '', 'error')
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = await CheckUser()
      if (user && user.email_verified_at) {
        addToast('Электронная почта подтверждена!', '', 'success')
        clearInterval(interval)
        router.push('/')
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={classNameWrapper}>
      <Button
        type="button"
        href="/register"
        buttonSize="medium"
        mode="clear"
        buttonType="mini"
        className={classNameGoBackBtn}>
        <ArrowLeft />
      </Button>

      <div className={classNameTextFrame}>
        <h1>Подтвердите почту</h1>
        <p>
          Остался последний шаг! Завершите регистрацию, перейдя по ссылке в
          письме, отправленном на указанный email. Если вы уже перешли по ссылке
          из письма, обновите страницу.
        </p>
        <p>{email}</p>
      </div>

      <Button
        buttonSize="large"
        mode="primary"
        className={classNameBtn}
        onClick={ResendEmail}>
        Отправить еще раз
      </Button>
    </div>
  )
}
