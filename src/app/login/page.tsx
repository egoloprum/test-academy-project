import { LoginForm } from '@/features/LoginForm/ui'
import { AuthCard } from '@/shared/ui/AuthCard'

import styles from './page.module.scss'

const page = ({}) => {
  const classNamePage = styles['page']

  return (
    <div className={classNamePage}>
      <AuthCard headerText="Вход в профиль">
        <LoginForm />
      </AuthCard>
    </div>
  )
}

export default page
