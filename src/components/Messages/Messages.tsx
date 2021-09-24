import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth.hook';
import { IMessage } from '../../types/models/Message';
import { IoSend } from "react-icons/io5";
import { Button } from '@chakra-ui/button';
import { useParams } from 'react-router';
import { IResponseError } from '../../types/models/Error';

interface IMessagesProps {
  onAddMessageHandle(message: IMessage): void
  messages?: IMessage[],
  addMessageLoading: boolean,
  total?: number,
  isLoading: boolean,
  isFetching: boolean,
  error?: {
    data: IResponseError
  }
}


export const Messages: React.FC<IMessagesProps> = ({ onAddMessageHandle, messages, isLoading, isFetching, addMessageLoading }) => {

  const isGlobalLoading = isLoading || isFetching

  const { dialogId } = useParams<Record<string, string>>()
  const [message, setMessage] = useState<string>('')
  const { firstName, lastName } = useAuth()

  const addMessage = async () => {
    await onAddMessageHandle({ message, author: firstName! + ' ' + lastName!, dialogId })
    setMessage('')
  }

  return (
    <Flex flexDirection={'column'} w={'100%'} h={'100%'} pr={5} >
      <Flex alignItems={'center'} w={'100%'} h={'60px'} px={5}  >
        dialog title
      </Flex>
      <Box w={'100%'} p={5} bg={'brand.900'} h={'100%'} borderRadius={'md'}>
        <Flex flexDirection={'column-reverse'} h={'100%'}>
          {messages && messages.map(message => <MessageItem key={message._id} message={message} />)}
        </Flex>
      </Box>
      <Flex alignItems={'center'} w={'100%'} h={'60px'} px={5}>
        <Input
          variant="unstyled"
          focusBorderColor={'purple.400'}
          placeholder={'Напишите сообщение...'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}

        />
        <Button
          ml={4}
          variant={'ghost'}
          colorScheme={'purple'}
          _focus={{ boxShadow: "none" }}
          onClick={addMessage}
          isLoading={isGlobalLoading || addMessageLoading}
        >
          <Icon as={IoSend} boxSize={'25px'} color={'purple.400'} />
        </Button>
      </Flex>
    </Flex>
  );
}

const MessageItem: React.FC<{ message: IMessage }> = ({ message }) => {
  return <Box mt={4}>
    <Flex>от: <Box color={'purple.500'} ml={1}>{message.author}</Box> </Flex>
    {message.message}
  </Box>
}


