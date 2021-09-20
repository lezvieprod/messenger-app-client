import React from 'react';
import { Button } from '@chakra-ui/button';
import { Flex, Heading, VStack } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IRegSubmit } from '../../types/submits/RegistrationSubmit';
import { EmailValidateParams, PasswordValidateParams, UserNamesValidateParams } from '../../utils/validations';
import { RegFormField } from '../../components/FormField/FormField';

export const Registration = () => {

  const { register, handleSubmit, formState } = useForm<IRegSubmit>();

  const onSubmit = handleSubmit(data => { console.log(data) })

  return (
    <Flex flexDirection={'column'} w={'100%'}>
      <Heading size={'md'} mb={8} >Быстрая регистрация</Heading>
      <VStack as={'form'} alignItems={'stretch'} spacing={5} onSubmit={onSubmit} >

        <RegFormField
          formState={formState}
          fieldLabel={"Ваше имя"}
          fieldType={'text'}
          fieldRegName={'firstName'}
          register={register}
          validateParams={UserNamesValidateParams}
        />

        <RegFormField
          formState={formState}
          fieldLabel={"Ваша фамилия"}
          fieldType={'text'}
          fieldRegName={'lastName'}
          register={register}
          validateParams={UserNamesValidateParams}
        />

        <RegFormField
          formState={formState}
          fieldLabel={"Email"}
          fieldType={'email'}
          fieldRegName={'email'}
          register={register}
          validateParams={EmailValidateParams}
        />

        <RegFormField
          formState={formState}
          fieldLabel={"Пароль"}
          fieldType={'password'}
          fieldRegName={'password'}
          register={register}
          validateParams={PasswordValidateParams}
        />

        <VStack alignItems={'stretch'} spacing={5} mt={8}>
          <Button type={'submit'} colorScheme={'blue'} _focus={{ boxShadow: "none", }}>Зарегистрироваться</Button>
          <Button as={Link} to={'/auth/login'} size="sm" variant="link" _focus={{ boxShadow: "none", }}>Есть аккаунт?</Button>
        </VStack>
      </VStack>


    </Flex>
  );
}
