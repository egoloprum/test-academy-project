'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

import { User } from '@/shared/model/user'

export const CheckUser = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  if (!accessToken) return null

  try {
    const response = await axios.post<User>(
      'http://127.0.0.1:8000/api/auth/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch {
    return null
  }
}
