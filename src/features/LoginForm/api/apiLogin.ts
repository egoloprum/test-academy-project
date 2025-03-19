import axios from 'axios'

export const apiLogin = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/auth/login`, {
      email: data.email,
      password: data.password
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
