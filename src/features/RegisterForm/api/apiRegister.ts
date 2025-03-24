import axios from 'axios'

export const apiRegister = async (data: {
  email: string
  password: string
  passwordRepeat: string
}) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/auth/register`,
      {
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordRepeat
      }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.message || 'Указанный email уже используется'
      throw new Error(errorMessage)
    } else {
      throw new Error('Произошла ошибка. Пожалуйста, попробуйте еще раз позже')
    }
  }
}
