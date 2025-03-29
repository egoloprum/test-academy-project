'use server'

import axios from 'axios'

export const apiEmailSend = async (email: string) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/password/email`,
      {
        email: email
      }
    )

    return response.data
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
