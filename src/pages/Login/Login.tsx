import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Heading, VStack } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  return (
    <Flex flexDirection={'column'} w={'100%'}>
      <Heading size={'md'} mb={8} >Вход в аккаунт</Heading>
      <VStack as={'form'} alignItems={'stretch'} spacing={5} >
        <FormControl id="login" >
          <FormLabel>Логин</FormLabel>
          <Input type="email"
             variant="flushed"
            w={'100%'}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Пароль</FormLabel>
          <Input type="email"
             variant="flushed"
            w={'100%'}
          />
        </FormControl>
      </VStack>

      <VStack alignItems={'stretch'} spacing={5} mt={8}>
        <Button colorScheme={'blue'} _focus={{ boxShadow: "none", }}>Войти</Button>
        <Button as={Link} to={'/auth/registration'} size="sm" variant="link" _focus={{ boxShadow: "none", }}>Нет аккаунта?</Button>
      </VStack>
    </Flex>
  );
}

