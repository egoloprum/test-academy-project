'use client'

import { FC, InputHTMLAttributes } from 'react'

import Check from './assets/check.svg'
import styles from './Checkbox.module.scss'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checkboxSize?: 'large' | 'medium' | 'small'
}

export const Checkbox: FC<CheckboxProps> = ({ checkboxSize, id, ...rest }) => {
  const classNameCheckBoxWrapper = [
    styles[`checkbox-wrapper`],
    styles[`${checkboxSize}-checkbox-wrapper`]
  ].join(' ')

  const classNameCheckbox = styles[`checkbox`]

  const classNameCheckboxSvg = [
    styles[`checkbox-svg`],
    styles[`${checkboxSize}-checkbox-svg`]
  ].join(' ')

  return (
    <label htmlFor={id} className={classNameCheckBoxWrapper}>
      <input type="checkbox" id={id} className={classNameCheckbox} {...rest} />

      <Check className={classNameCheckboxSvg} />
    </label>
  )
}
