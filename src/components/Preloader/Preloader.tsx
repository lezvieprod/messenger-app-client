import { Flex } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import React from 'react';

export const Preloader = () => {
  return (
    <Flex justifyContent={'center'} py={4} my={'5rem'} flex={'1 0 auto'} >
      <CircularProgress isIndeterminate color="purple.500" trackColor={'#1B202C'} />
    </Flex>
  );
}
