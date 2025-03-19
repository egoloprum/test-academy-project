import { RegisterForm } from '@/features/RegisterForm/ui'
import { AuthCard } from '@/shared/ui/AuthCard'

import styles from './page.module.scss'

const page = ({}) => {
  const classNamePage = styles['page']

  return (
    <div className={classNamePage}>
      <AuthCard headerText="Регистрация">
        <RegisterForm />
      </AuthCard>
    </div>
  )
}

export default page
