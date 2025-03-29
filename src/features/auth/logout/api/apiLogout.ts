'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

export const apiLogout = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  if (!accessToken) return null

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const message: string = response.data
    return message
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.message || 'Что-то пошло не так. Попробуйте позже.'
      throw new Error(errorMessage)
    } else {
      throw new Error('Произошла ошибка. Пожалуйста, попробуйте еще раз позже')
    }
  }
}
