
import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { Route } from 'react-router';
import DialogsContainer from '../../containers/Dialogs/DialogsContainer';
import MessagesContainer from '../../containers/Messages/MessagesContainer';

export const Messenger: React.FC = () => {

  return (
    <Flex h={'100%'} bg={'#fff'} borderRadius={'md'} boxShadow="sm">
      <Flex flexDirection={'column'} w={'340px'} minW={'340px'}>
        <DialogsContainer />
      </Flex>
      <Box w={'100%'}>
        <Route exact path={'/'}>
          <Flex flexDirection={'column'} w={'100%'} h={'100%'} pb={5} pr={5} pt={5}>
            <Flex bg={'brand.900'} alignItems={'center'} justifyContent={'center'} h={'100%'} borderRadius={'md'} >
              Выберите диалог, чтобы начать общение
            </Flex>
          </Flex>
        </Route>
        <Route path={'/dialog/:dialogId'}>
          <MessagesContainer />
        </Route>
      </Box>
    </Flex>
  );
}

export default Messenger;
