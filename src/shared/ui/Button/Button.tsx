import Link from 'next/link'
import {
  ButtonHTMLAttributes,
  FC,
  HTMLAttributeAnchorTarget,
  LinkHTMLAttributes
} from 'react'

import styles from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  LinkHTMLAttributes<HTMLAnchorElement> & {
    buttonSize?: 'large' | 'medium' | 'small'
    mode?: 'primary' | 'secondary' | 'clear'
    href?: string
    buttonType?: 'mini'
    target?: HTMLAttributeAnchorTarget
    children?: React.ReactNode
  }

export const Button: FC<ButtonProps> = ({
  buttonSize = 'large',
  mode = 'primary',
  href,
  buttonType,
  className,
  children,
  type = 'button',
  target = '_self',
  ...rest
}) => {
  const classNameButton = [
    styles[`button`],
    styles[`${buttonSize}-button`],
    styles[`${mode}-button`],
    buttonType && styles[`${buttonType}-button`],
    buttonType && styles[`${buttonType}-${buttonSize}-button`],
    className
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link className={classNameButton} href={href} target={target} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classNameButton} type={type} {...rest}>
      {children}
    </button>
  )
}
