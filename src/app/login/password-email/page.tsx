import { redirect } from 'next/navigation'

import { GoToMainBtn } from '@/features/auth/go-to-main'
import { EmailSendForm } from '@/features/auth/login-email-send/ui'
import { CheckUser } from '@/shared/api/user'
import { AuthCard } from '@/shared/ui/AuthCard'

import styles from './page.module.scss'

const page = async ({}) => {
  const classNamePage = styles['page']

  const user = await CheckUser()

  if (user?.id && user.email_verified_at) {
    return redirect('/')
  }

  return (
    <div className={classNamePage}>
      <GoToMainBtn />
      <AuthCard headerText="Восстановление пароля">
        <EmailSendForm />
      </AuthCard>
    </div>
  )
}

export default page
