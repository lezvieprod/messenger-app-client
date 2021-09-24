import { Box, Container } from '@chakra-ui/layout';
import React, { Suspense } from 'react';
import { Header } from '../../components/Header/Header';
import { Preloader } from '../../components/Preloader/Preloader';

interface IBaseLayoutProps {
  children: React.ReactNode
}

export const BaseLayout: React.FC<IBaseLayoutProps> = ({ children }) => {

  return (
    <>
      <Suspense fallback={<Preloader />}>

        <Container flex={'1 0 auto'} my={12}>
          <Box maxH={'810px'} h={'100%'}>
          {children}
          </Box>
        </Container>

      </Suspense>
      <Header />
    </>
  );
}

