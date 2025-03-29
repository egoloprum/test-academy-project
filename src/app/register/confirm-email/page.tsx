import { redirect } from 'next/navigation'

import { GoToMainBtn } from '@/features/auth/go-to-main'
import { EmailConfirmationModal } from '@/features/auth/register-email-confirm'
import { LinkExpiredModal } from '@/features/auth/register-email-expired'
import { CheckUser } from '@/shared/api/user'

import styles from './page.module.scss'

const page = async ({}) => {
  const classNamePage = styles['page']

  const user = await CheckUser()

  if (user?.id && user.email_verified_at) {
    return redirect('/')
  }

  if (!user?.id) {
    return (
      <div className={classNamePage}>
        <LinkExpiredModal />
      </div>
    )
  }

  return (
    <div className={classNamePage}>
      <GoToMainBtn />
      <EmailConfirmationModal email={user?.email} />
    </div>
  )
}

export default page
