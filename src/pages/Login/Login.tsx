import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, VStack } from '@chakra-ui/layout';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Error } from '../../components/Error/Error';
import { RegFormField } from '../../components/FormField/FormField';
import { Preloader } from '../../components/Preloader/Preloader';
import { IResponseError } from '../../types/models/Error';
import { ILoginSubmit } from '../../types/submits/LoginSubmit';
import { EmailValidateParams, PasswordValidateParams } from '../../utils/validations';


interface ILoginProps {
  isLoading: boolean,
  onSubmitHandle(data: ILoginSubmit): void,
  errorData: IResponseError | null
}

export const Login: React.FC<ILoginProps> = ({ onSubmitHandle, isLoading, errorData }) => {

  const { register, handleSubmit, formState } = useForm<ILoginSubmit>();

  const onSubmit = handleSubmit(data => { onSubmitHandle(data) })

  return (
    <Flex flexDirection={'column'} w={'100%'}>
      <Heading size={'lg'} mb={8} >{isLoading ? 'Загрузка...' : 'Вход в аккаунт'}</Heading>
      <Box as={'form'} onSubmit={onSubmit} pos={'relative'} >

        {
          errorData &&
          <Box mb={7}>
            <Error
              type={'error'}
              title={errorData.title!}
              description={errorData.message!}
            />
          </Box>
        }
        {
          isLoading &&
          <Box pos={'absolute'} top={0} r={0} w={'100%'} h={'100%'} bg={'#fff'} zIndex={1}>
            <Preloader />
          </Box>
        }
        <VStack alignItems={'stretch'} spacing={5} >

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
        </VStack>

        <VStack alignItems={'stretch'} spacing={5} mt={8}>
          <Button type={'submit'} bg={'brand.purple'} color={'#fff'} _hover={{ bg: 'purple.500' }} _focus={{ boxShadow: "none" }}>Войти</Button>
          <Button as={Link} to={'/auth/registration'} color={'brand.dark_gray'}  size="sm" variant="link" _focus={{ boxShadow: "none" }}>Нет аккаунта?</Button>
        </VStack>

      </Box>
    </Flex>
  );
}

