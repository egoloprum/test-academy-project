'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Eye, EyeOff } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import styles from './RegisterForm.module.scss'

export const RegisterForm = ({}) => {
  const classNameForm = styles['form']
  const classNameFormField = styles['form-field']

  const classNameInputPassword = styles['input-password']
  const classNameInputPasswordRepeat = styles['input-password-repeat']

  const classNameInputBtn = styles['input-btn']
  const classNameInputBtnRepeat = styles['input-btn-repeat']

  const classNameFormApproval = styles['form-approval']

  const classNameFormFooter = styles['form-footer']
  const classNameFormLoginBtn = styles['form-login-btn']

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isShowPasswordRepeat, setIsShowPasswordRepeat] =
    useState<boolean>(false)

  return (
    <form action="" className={classNameForm}>
      <fieldset className={classNameFormField}>
        <Input
          id="email"
          inputSize="large"
          type="email"
          topText="Электронная почта"
          required>
          {' '}
        </Input>
        <Input
          id="password"
          inputSize="large"
          type={isShowPassword ? 'text' : 'password'}
          topText="Пароль"
          placeholder=""
          className={classNameInputPassword}
          required>
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
          required>
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
      <footer className={classNameFormFooter}>
        <p>Уже есть аккоунт?</p>
        <Button
          buttonSize="medium"
          mode="clear"
          href="/login"
          className={classNameFormLoginBtn}>
          Войдите
        </Button>
      </footer>
    </form>
  )
}
