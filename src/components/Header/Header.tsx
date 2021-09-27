import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Container, Flex } from '@chakra-ui/layout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { VscHome, VscSmiley } from "react-icons/vsc";
import { BiLogOut, BiUser } from "react-icons/bi";
import { useAuth } from '../../hooks/auth.hook';
import { IconType } from 'react-icons/lib';

export const Header: React.FC = () => {

  const { logout } = useAuth()

  return (
    <Flex flex={'0 0 auto'} bg={'brand.700'} h={'70px'}>
      <Container h={'100%'}>
        <Flex justifyContent={'center'} h={'100%'}>

          <NavButton
            as={NavLink}
            to={'/users'}
            icon={VscSmiley}
            isLink
          />
          <NavButton
            as={NavLink}
            exact
            to={'/'}
            icon={VscHome}
            isLink
          />
          <NavButton
            as={NavLink}
            to={'/profile'}
            icon={BiUser}
            isLink
          />
          <NavButton
            icon={BiLogOut}
            onClick={logout}
          />
         
        </Flex>
      </Container>
    </Flex>
  );
}


const NavButton: React.FC<{ icon: IconType, [rest: string]: any, isLink?: boolean }> = ({ icon, isLink, ...rest }) => {
  return isLink ? <Button
    {...rest}
    variant={'ghost'}
    activeStyle={{ borderBottom: '2px solid', borderColor: 'purple.600' }}
    colorScheme={'purple'}
    borderRadius={'0'}
    h={'100%'}
    px={5}
    borderBottom={'2px solid transparent'}
    _focus={{ boxShadow: "none" }}
  >
    <Icon as={icon} boxSize={'25px'} />
  </Button>
    : <Button
      {...rest}
      variant={'ghost'}
      colorScheme={'purple'}
      borderRadius={'0'}
      h={'100%'}
      px={5}
      _focus={{ boxShadow: "none" }}
    >
      <Icon as={icon} boxSize={'25px'} />
    </Button>
}