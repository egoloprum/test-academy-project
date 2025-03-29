'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

export const apiLogin = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/auth/login`, {
      email: data.email,
      password: data.password
    })

    const cookieStore = await cookies()

    cookieStore.set({
      name: 'access_token',
      value: response.data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: response.data.expires_in,
      path: '/'
    })

    return response.data
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
