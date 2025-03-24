'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { PasswordResetValidator } from '../validations/validations'

import styles from './PasswordResetForm.module.scss'

type PasswordResetData = {
  email: string
}

export const PasswordResetForm = ({}) => {
  const classNameForm = styles['form']
  const classNameFormField = styles['form-field']

  const classNameFieldText = styles['field-text']

  const classNameFormBottom = styles['form-bottom']
  const classNameFormLoginBtn = styles['form-login-btn']

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordResetData>({
    resolver: zodResolver(PasswordResetValidator),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const onSubmit: SubmitHandler<PasswordResetData> = async data => {
    console.log(data)
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
        <p>Уже есть аккоунт?</p>
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
