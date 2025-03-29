'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Eye, EyeOff } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { useToast } from '@/shared/ui/Toast'

import { apiPasswordReset } from '../api/apiPasswordReset'
import { PasswordResetValidator } from '../validations/validations'

import styles from './PasswordResetForm.module.scss'

interface PasswordResetFormProps {
  token: string
  email: string
}

type PasswordResetData = {
  password: string
  passwordRepeat: string
}

export const PasswordResetForm: FC<PasswordResetFormProps> = ({
  token,
  email
}) => {
  const classNameForm = styles['form']
  const classNameFormField = styles['form-field']

  const classNameInputPassword = styles['input-password']
  const classNameInputPasswordRepeat = styles['input-password-repeat']

  const classNameInputBtn = styles['input-btn']
  const classNameInputBtnRepeat = styles['input-btn-repeat']

  const classNameFormBottom = styles['form-bottom']
  const classNameCancelBtn = styles['cancel-btn']
  const classNameSaveBtn = styles['save-btn']

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordResetData>({
    resolver: zodResolver(PasswordResetValidator),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isShowPasswordRepeat, setIsShowPasswordRepeat] =
    useState<boolean>(false)

  const router = useRouter()

  const { addToast } = useToast()

  const onSubmit: SubmitHandler<PasswordResetData> = async data => {
    try {
      await apiPasswordReset(email, data.password, data.passwordRepeat, token)

      addToast(
        'Пароль успешно изменён!',
        'Перейдите на страницу входа и войдите в систему.',
        'success'
      )

      router.push('/login')
    } catch (error) {
      if (error instanceof Error) {
        addToast(`${error.message}`, '', 'error')
      }
    }
  }

  return (
    <form className={classNameForm} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classNameFormField}>
        <Input
          id="password"
          inputSize="large"
          type={isShowPassword ? 'text' : 'password'}
          topText="Введите новый пароль"
          placeholder=""
          className={classNameInputPassword}
          isError={errors.password ? true : false}
          bottomText={errors.password?.message || ''}
          {...register('password')}>
          <button
            className={classNameInputBtn}
            onClick={() => setIsShowPassword(!isShowPassword)}
            aria-label={isShowPassword ? 'Скрыть пароль' : 'Показать пароль'}
            type="button">
            {isShowPassword ? <EyeOff /> : <Eye />}
          </button>
        </Input>
        <Input
          id="password-repeat"
          inputSize="large"
          type={isShowPasswordRepeat ? 'text' : 'password'}
          topText="Повторить новый пароль"
          placeholder=""
          className={classNameInputPasswordRepeat}
          isError={errors.passwordRepeat ? true : false}
          bottomText={errors.passwordRepeat?.message || ''}
          {...register('passwordRepeat')}>
          <button
            className={classNameInputBtnRepeat}
            onClick={() => setIsShowPasswordRepeat(!isShowPasswordRepeat)}
            aria-label={
              isShowPasswordRepeat ? 'Скрыть пароль' : 'Показать пароль'
            }
            type="button">
            {isShowPasswordRepeat ? <EyeOff /> : <Eye />}
          </button>
        </Input>
      </fieldset>
      <div className={classNameFormBottom}>
        <Button
          type="button"
          buttonSize="large"
          mode="secondary"
          href="/login"
          className={classNameCancelBtn}>
          Отмена
        </Button>
        <Button
          type="submit"
          buttonSize="large"
          mode="primary"
          className={classNameSaveBtn}>
          Сохранить
        </Button>
      </div>
    </form>
  )
}
