'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

export const SendEmailConfirm = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  if (!accessToken) return null

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/email/resend',
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
        error.response.data.message ||
        'Неверный адрес электронной почты или пароль'
      throw new Error(errorMessage)
    } else {
      throw new Error('Произошла ошибка. Пожалуйста, попробуйте еще раз позже')
    }
  }
}
