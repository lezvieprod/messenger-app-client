import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import React from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { IRegSubmit } from '../../types/submits/RegistrationSubmit';
import { renderFieldError, ValidateParams } from '../../utils/validations';

interface IFormFieldProps<T> {
  formState: FormState<T>,
  fieldLabel: string,
  fieldType: 'text' | 'email' | 'password',
  fieldRegName: keyof T,
  register: UseFormRegister<T>,
  validateParams: ValidateParams
}

export const RegFormField: React.FC<IFormFieldProps<IRegSubmit>> = ({
  formState: { errors }, fieldLabel, fieldType, fieldRegName, register, validateParams
}) => {
  return (
    <FormControl id={fieldRegName} isInvalid={!!errors[fieldRegName]}>
      <FormLabel>{fieldLabel}</FormLabel>
      <Input type={fieldType} variant="flushed" w={'100%'} {...register(fieldRegName, validateParams)} />
      <FormErrorMessage>
        {errors[fieldRegName] && renderFieldError(fieldRegName, errors[fieldRegName]!.type)}
      </FormErrorMessage>
    </FormControl>
  );
}


