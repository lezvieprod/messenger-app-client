
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { Route } from 'react-router';
import DialogsContainer from '../../containers/Dialogs/DialogsContainer';
import MessagesContainer from '../../containers/Messages/MessagesContainer';
import { useAuth } from '../../hooks/auth.hook';

export const Messenger: React.FC = () => {

  const { firstName, lastName } = useAuth()


  return (
    <Flex bg={'brand.700'} h={'100%'} borderRadius={'md'}>
      <Flex flexDirection={'column'} minW={'380px'}>
        <Box p={5}>
          <Heading fontSize={'22px'} color={'purple.400'}>Security Messenger</Heading>
        </Box>
        <DialogsContainer />
        <Box mt={'auto'} p={5}>
          <Box w={'100%'} mb={3} h={'3px'} bg={'#292D35'} borderRadius={'lg'}></Box>
          <Text color={'purple.400'}>Вы авторизованы как </Text>
          <Box>
          {firstName} {lastName}
          </Box>
        </Box>
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
