import { z } from 'zod'

export const PasswordResetValidator = z.object({
  email: z
    .string()
    .nonempty('Необходимо заполнить все обязательные поля')
    .max(256, 'Количество символов в электронной почте превышает допустимое')
    .regex(
      /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+@[A-Za-z0-9-]+\.(ru|com)$/i,
      'Недействительный адрес электронной почты'
    )
})
