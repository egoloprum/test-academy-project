'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Eye, EyeOff } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Input } from '@/shared/ui/Input'
import { useToast } from '@/shared/ui/Toast'

import { apiLogin } from '../api/apiLogin'
import { LoginValidator } from '../validations/validations'

import styles from './LoginForm.module.scss'

type LoginData = {
  email: string
  password: string
}

export const LoginForm = ({}) => {
  const classNameForm = styles['form']
  const classNameFormField = styles['form-field']

  const classNameInputPassword = styles['input-password']
  const classNameInputBtn = styles['input-btn']

  const classNameFormForgetBtn = styles['form-forget-btn']

  const classNameFormBottom = styles['form-bottom']
  const classNameFormRegisterBtn = styles['form-register-btn']

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: zodResolver(LoginValidator),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const { addToast } = useToast()

  const onSubmit: SubmitHandler<LoginData> = async data => {
    if (isSaved) {
      const userLoginData = {
        email: data.email
      }
      localStorage.setItem('userLoginData', JSON.stringify(userLoginData))
    } else {
      localStorage.removeItem('userLoginData')
    }

    try {
      await apiLogin(data)
    } catch (error) {
      if (error instanceof Error) {
        addToast(`${error.message}`, '', 'error')
        setError('email', { type: 'manual', message: error.message })
        setError('password', { type: 'manual', message: error.message })
      }
    }
  }

  useEffect(() => {
    const storedData = localStorage.getItem('userLoginData')

    if (storedData) {
      const parsedData = JSON.parse(storedData)
      reset({
        email: parsedData.email,
        password: ''
      })
    }
  }, [reset])

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
        <Button buttonSize="large" type="submit">
          Войти
        </Button>
        <Button
          buttonSize="medium"
          mode="clear"
          href="/login/password-email"
          className={classNameFormForgetBtn}>
          Не помню пароль
        </Button>
      </fieldset>
      <div className={classNameFormBottom}>
        <div>
          <Checkbox
            checkboxSize="large"
            id="remember-me"
            onChange={() => setIsSaved(!isSaved)}
          />
          <p>Запомнить меня</p>
        </div>
        <Button
          buttonSize="medium"
          mode="clear"
          href="/register"
          className={classNameFormRegisterBtn}>
          Регистрация
        </Button>
      </div>
    </form>
  )
}
