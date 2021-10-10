import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Box, Text, Flex, VStack } from '@chakra-ui/layout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { VscHome, VscSmiley } from "react-icons/vsc";
import { BiLogOut, BiUser } from "react-icons/bi";
import { useAuth } from '../../hooks/auth.hook';
import { IconType } from 'react-icons/lib';
import { FiSend } from "react-icons/fi";

export const Header: React.FC = () => {

  const { firstName, lastName, logout } = useAuth()

  return (
    <Flex flex={'0 0 auto'} bg={'brand.700'} h={'100%'} w={'250px'} flexDir={'column'} px={3}>
      <Flex color={'brand.purple'} justifyContent={'center'} alignItems={'center'} w={'100%'} h={'200px'} px={3} >
        <Icon as={FiSend} boxSize={'55px'} mr={5} />
        <Text fontWeight={'100'} fontSize={'22px'} textTransform={'uppercase'}> Security Messenger </Text>
      </Flex>
      <VStack spacing={4} alignItems={'stretch'} w={'100%'} h={'100%'}>

        <NavButton
          as={NavLink}
          to={'/users'}
          icon={VscSmiley}
          buttonText={'Пользователи'}
          isLink
        />
        <NavButton
          as={NavLink}
          exact
          to={'/'}
          icon={VscHome}
          buttonText={'Мессенджер'}
          isLink
        />
        <NavButton
          as={NavLink}
          to={'/profile'}
          buttonText={'Профиль'}
          icon={BiUser}
          isLink
        />
        <NavButton
          buttonText={'Выход'}
          icon={BiLogOut}
          onClick={logout}
        />

      </VStack>
      <Box w={'100%'} h={'100px'} px={3} >
        <Text> Вы авторизованы как: </Text>
        <Text fontWeight={'700'}> {firstName} {lastName} </Text>
      </Box>

    </Flex>
  );
}


const NavButton: React.FC<{ icon: IconType, buttonText: string, [rest: string]: any, isLink?: boolean }> = ({
  icon,
  isLink,
  buttonText,
  ...rest
}) => {
  return isLink ? <Button
    {...rest}
    fontSize={'14px'}
    letterSpacing={'0.05rem'}
    variant={'ghost'}
    willChange={'transform'}
    _hover={{ bg: 'transparent', color: '#915edd', transform: 'translateX(2%)' }}
    _active={{ bg: 'transparent' }}
    activeStyle={{ color: '#7033CA', fontWeight: '600' }}
    colorScheme={'gray'}
    borderRadius={'0'}
    borderBottom={'2px solid transparent'}
    _focus={{ boxShadow: "none" }}
    textTransform={'uppercase'}
    justifyContent={'flex-start'}
    fontWeight={'400'}
  >
    <Icon as={icon} boxSize={'20px'} mr={4} />
    {buttonText}
  </Button>
    :
    <Button
      {...rest}
      fontSize={'14px'}
      letterSpacing={'0.05rem'}
      variant={'ghost'}
      willChange={'transform'}
      _hover={{ bg: 'transparent', color: '#915edd', transform: 'translateX(2%)' }}
      _active={{ bg: 'transparent' }}
      colorScheme={'gray'}
      borderRadius={'0'}
      borderBottom={'2px solid transparent'}
      _focus={{ boxShadow: "none" }}
      textTransform={'uppercase'}
      justifyContent={'flex-start'}
      fontWeight={'400'}
    >
      <Icon as={icon} boxSize={'20px'} mr={4} />
      {buttonText}
    </Button>

}