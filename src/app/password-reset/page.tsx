import { PasswordResetForm } from '@/features/PasswordResetForm/ui'
import { AuthCard } from '@/shared/ui/AuthCard'

import styles from './page.module.scss'

const page = ({}) => {
  const classNamePage = styles['page']

  return (
    <div className={classNamePage}>
      <AuthCard headerText="Восстановление пароля">
        <PasswordResetForm />
      </AuthCard>
    </div>
  )
}

export default page
