'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { useToast } from '@/shared/ui/Toast'

import { apiEmailSend } from '../api/apiEmailSend'
import { EmailSendValidator } from '../validations/validations'

import styles from './EmailSendForm.module.scss'

interface EmailSendData {
  email: string
}

export const EmailSendForm = ({}) => {
  const classNameForm = styles['form']
  const classNameFormField = styles['form-field']

  const classNameFieldText = styles['field-text']

  const classNameFormBottom = styles['form-bottom']
  const classNameFormLoginBtn = styles['form-login-btn']

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EmailSendData>({
    resolver: zodResolver(EmailSendValidator),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { addToast } = useToast()

  const onSubmit: SubmitHandler<EmailSendData> = async data => {
    try {
      await apiEmailSend(data.email)
      addToast(
        'Письмо отправлено!',
        'Не забудьте проверить папку “Спам”.',
        'success'
      )
    } catch (error) {
      if (error instanceof Error) {
        addToast('error.message', '', 'error')
      }
    }
  }

  return (
    <form className={classNameForm} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classNameFormField}>
        <p className={classNameFieldText}>
          Отправим ссылку на восстановление вам на почту
        </p>
        <Input
          id="email"
          inputSize="large"
          type="email"
          topText="Электронная почта"
          isError={errors.email ? true : false}
          bottomText={errors.email?.message || ''}
          {...register('email')}>
          {' '}
        </Input>
        <Button buttonSize="large" type="submit">
          Отправить
        </Button>
      </fieldset>
      <div className={classNameFormBottom}>
        <p>Уже есть аккаунт?</p>
        <Button
          buttonSize="medium"
          mode="clear"
          href="/login"
          className={classNameFormLoginBtn}>
          Войдите
        </Button>
      </div>
    </form>
  )
}
