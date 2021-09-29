import React from 'react';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IRegSubmit } from '../../types/submits/RegistrationSubmit';
import { EmailValidateParams, PasswordValidateParams, UserNamesValidateParams } from '../../utils/validations';
import { RegFormField } from '../../components/FormField/FormField';
import { Preloader } from '../../components/Preloader/Preloader';
import { IResponseError } from '../../types/models/Error';
import { Error } from '../../components/Error/Error';


interface IRegistrationProps {
  isLoading: boolean,
  onSubmitHandle(data: IRegSubmit): void,
  errorData: IResponseError | null
}

export const Registration: React.FC<IRegistrationProps> = ({ onSubmitHandle, isLoading, errorData }) => {

  const { register, handleSubmit, formState } = useForm<IRegSubmit>();

  const onSubmit = handleSubmit(data => { onSubmitHandle(data) })

  return (
    <Flex flexDirection={'column'} w={'100%'}>
      <Heading size={'lg'} mb={8} >{isLoading ? 'Загрузка...' : 'Быстрая регистрация'}</Heading>
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

          <SimpleGrid columns={2} spacing={4} w={'100%'}>
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
          </SimpleGrid>

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
          <Button type={'submit'} bg={'brand.purple'} color={'#fff'} _hover={{ bg: 'purple.500' }} _focus={{ boxShadow: "none", }}>Зарегистрироваться</Button>
          <Button as={Link} to={'/auth/login'} size="sm"  color={'brand.dark_gray'} variant="link" _focus={{ boxShadow: "none", }}>Есть аккаунт?</Button>
        </VStack>
      </Box>


    </Flex >
  );
}
