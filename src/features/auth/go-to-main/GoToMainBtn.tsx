'use client'

import { ArrowLeft } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/Button'

import styles from './GoToMainBtn.module.scss'

export const GoToMainBtn = ({}) => {
  const classNameGoMainBtn = styles[`go-main-btn`]
  const classNameGoMainBtnSvg = styles[`go-main-btn-svg`]

  return (
    <Button
      type="button"
      mode="clear"
      buttonSize="large"
      href="/"
      className={classNameGoMainBtn}>
      <ArrowLeft className={classNameGoMainBtnSvg} />
      <span>Назад на главную</span>
    </Button>
  )
}
