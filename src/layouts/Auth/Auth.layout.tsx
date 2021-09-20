import { Container, Flex } from '@chakra-ui/layout';
import React, { Suspense } from 'react';
import { Preloader } from '../../components/Preloader/Preloader';


interface IAuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <Container variant={'auth'} h={'100%'} d={'flex'} flexDirection={'column'}>
      <Flex my={'auto'} bg={'#2F364B'} w={'100%'} p={9} borderRadius={'md'} boxShadow={'xs'}>
        <Suspense fallback={<Preloader />}>
          {children}
        </Suspense>
      </Flex>
    </Container>
  );
}


