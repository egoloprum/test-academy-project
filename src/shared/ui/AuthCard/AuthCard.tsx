import { FC } from 'react'

import { Logo } from '@/shared/assets'

import styles from './AuthCard.module.scss'

interface AuthCardProps {
  children: React.ReactNode
  headerText: string
}

export const AuthCard: FC<AuthCardProps> = ({ children, headerText }) => {
  const classNameCardWrapper = styles['card-wrapper']
  const classNameCardHeader = styles['card-header']

  return (
    <div className={classNameCardWrapper}>
      <div className={classNameCardHeader}>
        <Logo />
        <h1>{headerText}</h1>
      </div>
      {children}
    </div>
  )
}
