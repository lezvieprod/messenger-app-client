import { Flex } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import React from 'react';

interface IPreloaderProps {
  my?: string
}

export const Preloader: React.FC<IPreloaderProps> = ({ my }) => {
  return (
    <Flex justifyContent={'center'} py={4} my={!my ? '5rem' : my} flex={'1 0 auto'} >
      <CircularProgress isIndeterminate color="purple.500" trackColor={'transparent'} />
    </Flex>
  );
}
