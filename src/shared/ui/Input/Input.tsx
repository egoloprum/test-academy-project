'use client'

import { FC, InputHTMLAttributes, useState } from 'react'

import { X } from '../../assets/icons'

import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'large' | 'medium' | 'small'
  topText?: string
  bottomText?: string
  isError?: boolean
  className?: string
  id?: string
  children?: React.ReactNode
}

export const Input: FC<InputProps> = ({
  inputSize,
  topText,
  bottomText,
  isError,
  className,
  id,
  children,
  disabled,
  defaultValue = '',
  ...rest
}) => {
  const classNameInputContainer = styles[`input-container`]

  const classNameInputTopLabel = [
    styles['input-top-label'],
    styles[`${inputSize}-input-top-label`],
    styles[`${isError && 'error-input-top-label'}`]
  ]
    .filter(Boolean)
    .join(' ')

  const classNameInputWrapper = [
    styles['input-wrapper'],
    styles[`${inputSize}-input-wrapper`],
    styles[`${isError && 'error-input-wrapper'}`]
  ]
    .filter(Boolean)
    .join(' ')

  const classNameInput = [
    styles['input'],
    styles[`${inputSize}-input`],
    styles[`${isError && 'error-input'}`],
    className
  ]
    .filter(Boolean)
    .join(' ')

  const classNameInputBtn = styles['input-btn']

  const classNameInputSvg = [
    styles['input-svg'],
    styles[`${isError && 'error-input-svg'}`]
  ]
    .filter(Boolean)
    .join(' ')

  const classNameInputBottomText = [
    styles['input-bottom-text'],
    styles[`${isError && 'error-input-bottom-text'}`]
  ]
    .filter(Boolean)
    .join(' ')

  const [inputValue, setInputValue] = useState<string>(
    defaultValue as string | ''
  )
  const clearInput = () => {
    if (!disabled) setInputValue('')
  }

  return (
    <div className={classNameInputContainer}>
      {topText && (
        <label htmlFor={id} className={classNameInputTopLabel}>
          {topText}
        </label>
      )}
      <div className={classNameInputWrapper}>
        <input
          id={id}
          className={classNameInput}
          defaultValue={inputValue}
          onChange={e => setInputValue(e.target.value)}
          disabled={disabled}
          {...rest}
        />
        {children ? (
          children
        ) : (
          <button
            type="button"
            className={classNameInputBtn}
            onClick={clearInput}
            aria-disabled={disabled}
            aria-label="Clear input">
            <X className={classNameInputSvg} />
          </button>
        )}
      </div>
      {bottomText && <p className={classNameInputBottomText}>{bottomText}</p>}
    </div>
  )
}
