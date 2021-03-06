import Icon from '@chakra-ui/icon';
import { Container, Flex, Heading, SimpleGrid } from '@chakra-ui/layout';
import React, { Suspense } from 'react';
import { Preloader } from '../../components/Preloader/Preloader';
import { BsCheckCircle } from "react-icons/bs";

interface IAuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <Container variant={'auth'} h={'100%'} d={'flex'} flexDirection={'column'}>
      <Flex my={'auto'} bg={'#fff'} w={'100%'} p={12} borderRadius={'lg'} boxShadow={'md'} minH={'666px'} maxW={'1000px'} mx={'auto'}>
        <Suspense fallback={<Preloader />}>
          <SimpleGrid columns={2} spacing={8} w={'100%'}>
            <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <Icon as={BsCheckCircle} color={'brand.purple'} boxSize={'190px'} />
              <Heading fontSize={'42px'}  color={'brand.purple'} fontWeight={'900'}>Security Chat</Heading>
            </Flex>
            <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              {children}
            </Flex>
          </SimpleGrid>
        </Suspense>
      </Flex>
    </Container>
  );
}


