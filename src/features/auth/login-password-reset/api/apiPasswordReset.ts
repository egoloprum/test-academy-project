import axios from 'axios'

export const apiPasswordReset = async (
  email: string,
  password: string,
  passwordRepeat: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/password/reset`,
      {
        email: email,
        password: password,
        password_confirmation: passwordRepeat,
        token: token
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
