'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Eye, EyeOff } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { apiRegister } from '../api/apiRegister'
import { RegisterValidator } from '../validations/validations'

import styles from './RegisterForm.module.scss'

interface RegisterData {
  email: string
  password: string
  passwordRepeat: string
}

export const RegisterForm = ({}) => {
  const classNameForm = styles['form']
  const classNameFormField = styles['form-field']

  const classNameInputPassword = styles['input-password']
  const classNameInputPasswordRepeat = styles['input-password-repeat']

  const classNameInputBtn = styles['input-btn']
  const classNameInputBtnRepeat = styles['input-btn-repeat']

  const classNameFormApproval = styles['form-approval']

  const classNameFormBottom = styles['form-bottom']
  const classNameFormLoginBtn = styles['form-login-btn']

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterValidator),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isShowPasswordRepeat, setIsShowPasswordRepeat] =
    useState<boolean>(false)

  const onSubmit: SubmitHandler<RegisterData> = async data => {
    try {
      await apiRegister(data)
    } catch (error) {
      if (error instanceof Error) {
        setError('email', { type: 'manual', message: error.message })
      }
    }
  }

  return (
    <form className={classNameForm} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classNameFormField}>
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
        <Input
          id="password"
          inputSize="large"
          type={isShowPassword ? 'text' : 'password'}
          topText="Пароль"
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
          topText="Повторить пароль"
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
        <div className={classNameFormApproval}>
          <Button buttonSize="large" type="submit">
            Зарегистрироваться
          </Button>
          <p>
            <span>Нажимая на кнопку, я соглашаюсь с </span>
            <Link
              href="https://docs.google.com/document/d/1Z73zBpsJn5AiN4F5GBjIgE0XTzK0m9k07Jkm0vMjijU/edit?tab=t.0#heading=h.ra1mkrwov02f"
              target="_blank">
              политикой обработки персональных данных
            </Link>
          </p>
        </div>
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
