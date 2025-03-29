import { LogoutBtn } from '@/features/auth/logout'
import { CheckUser } from '@/shared/api/user'

export default async function Home() {
  const user = await CheckUser()

  if (user?.id) {
    return (
      <div>
        qwe
        <LogoutBtn />
      </div>
    )
  }

  return <div>home</div>
}
