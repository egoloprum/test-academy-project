import { redirect } from 'next/navigation'

import { PasswordResetForm } from '@/features/auth/login-password-reset/ui'
import { CheckUser } from '@/shared/api/user'

import styles from './page.module.scss'

interface SearchParams {
  token: string
  email: string
}

const page = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const resolvedSearchParams = await searchParams
  const token = resolvedSearchParams?.token || ''
  const email = resolvedSearchParams?.email || ''

  if (!token || !email) {
    return redirect('password-email')
  }

  const user = await CheckUser()

  if (user?.id && user.email_verified_at) {
    return redirect('/')
  }

  const classNamePage = styles['page']
  return (
    <div className={classNamePage}>
      <PasswordResetForm token={token} email={email} />
    </div>
  )
}

export default page
