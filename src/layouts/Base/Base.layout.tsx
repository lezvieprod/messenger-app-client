import { Box, Container, Flex } from '@chakra-ui/layout';
import React, { Suspense } from 'react';
import { Header } from '../../components/Header/Header';
import { Preloader } from '../../components/Preloader/Preloader';

interface IBaseLayoutProps {
  children: React.ReactNode
}

export const BaseLayout: React.FC<IBaseLayoutProps> = ({ children }) => {

  return (
    <Flex h={'100%'}>
      <Header />
      <Suspense fallback={<Preloader />}>

        <Container flex={'1 0 auto'} mx={9} my={12}>
          <Box h={'100%'}>
            {children}
          </Box>
        </Container>

      </Suspense>

    </Flex>
  );
}

