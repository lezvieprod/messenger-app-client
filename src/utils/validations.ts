export interface ValidateParams {
  readonly required: boolean,
  readonly pattern?: RegExp,
  readonly minLength?: number,
  readonly maxLength?: number
}

export const EmailValidateParams = {
  required: true,
  pattern: /^\S+@\S+$/i
} as ValidateParams

export const UserNamesValidateParams = {
  required: true,
  // pattern: /^[A-Za-z0-9]+$/i,
  minLength: 1,
  maxLength: 30
} as ValidateParams

export const PasswordValidateParams = {
  required: true,
  minLength: 5,
  maxLength: 20
} as ValidateParams


export const renderFieldError = (fieldType: string, errorType: string): string => {
  switch (fieldType) {
    case 'email':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'pattern': return 'Введен некорректный email';
        default: return 'Неизвестная ошибка';
      }
    case 'firstName':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'pattern': return 'В поле ввода обнаружены некорректные символы';
        case 'maxLength': return `Максимальное количество символов ${UserNamesValidateParams.maxLength}`;
        case 'minLength': return `Минимальное количество символов ${UserNamesValidateParams.minLength}`;
        default: return 'Неизвестная ошибка';
      }
    case 'lastName':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'pattern': return 'В поле ввода обнаружены некорректные символы';
        case 'maxLength': return `Максимальное количество символов ${UserNamesValidateParams.maxLength}`;
        case 'minLength': return `Минимальное количество символов ${UserNamesValidateParams.minLength}`;
        default: return 'Неизвестная ошибка';
      }
    case 'password':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'maxLength': return `Максимальное количество символов ${PasswordValidateParams.maxLength}`;
        case 'minLength': return `Минимальная длина пароля - ${PasswordValidateParams.minLength} символов`;
        default: return 'Неизвестная ошибка';
      }
    case 'password_repeat':
      switch (errorType) {
        case 'required': return 'Это поле обязательно для заполнения';
        case 'maxLength': return `Максимальное количество символов ${PasswordValidateParams.maxLength}`;
        case 'minLength': return `Минимальная длина пароля - ${PasswordValidateParams.minLength} символов`;
        case 'passwordMatch': return 'Пароли не совпадают';
        default: return 'Неизвестная ошибка';
      }

    default: return 'Неизвестный тип поля';
  }

}