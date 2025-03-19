'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import styles from './PasswordResetForm.module.scss'

export const PasswordResetForm = ({}) => {
  const classNameForm = styles['form']
  const classNameFormField = styles['form-field']

  const classNameFieldText = styles['field-text']

  const classNameFormFooter = styles['form-footer']
  const classNameFormLoginBtn = styles['form-login-btn']

  return (
    <form action="" className={classNameForm}>
      <fieldset className={classNameFormField}>
        <p className={classNameFieldText}>
          Отправим ссылку на восстановление вам на почту
        </p>
        <Input
          id="email"
          inputSize="large"
          type="email"
          topText="Электронная почта"
          required>
          {' '}
        </Input>
        <Button buttonSize="large" type="submit">
          Отправить
        </Button>
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
