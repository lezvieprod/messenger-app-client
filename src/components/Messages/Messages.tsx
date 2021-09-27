import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import React, { ChangeEvent, memo, useState } from 'react';
import { useAuth } from '../../hooks/auth.hook';
import { IMessage } from '../../types/models/Message';
import { IoSend } from "react-icons/io5";
import { Button } from '@chakra-ui/button';
import { useParams } from 'react-router';
import { IResponseError } from '../../types/models/Error';
import { Preloader } from '../Preloader/Preloader';
import { Fade } from '@chakra-ui/transition';

interface IMessagesProps {
  onAddMessageHandle(message: IMessage): void
  onDeleteMessageHandle(_id: string): void,
  onWritingMessageHandle(firstName: string, isWriting: boolean): void
  messages?: IMessage[],
  isWritingMessage: boolean,
  whoIsWritingMessage: string,
  total?: number,
  isLoading: boolean,
  isFetching: boolean,
  error?: {
    data: IResponseError
  }
}


export const Messages: React.FC<IMessagesProps> = ({
  onAddMessageHandle,
  onDeleteMessageHandle,
  onWritingMessageHandle,
  messages,
  isWritingMessage,
  whoIsWritingMessage,
  isLoading,
  isFetching,
}) => {


  const { dialogId } = useParams<Record<string, string>>()
  const [message, setMessage] = useState<string>('')
  const { firstName, lastName } = useAuth()

  const addMessage = () => {
    onAddMessageHandle({ message, author: firstName! + ' ' + lastName!, dialogId })
    setMessage('')
  }

  const addMessageOnKeyboard = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addMessage()
  }


  
  const onEnterMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)

    onWritingMessageHandle(firstName!, true)

  }

  const isGlobalLoading = isLoading || isFetching

  return (
    <Flex flexDirection={'column'} w={'100%'} h={'100%'} pr={5} >
      <Flex alignItems={'center'} w={'100%'} h={'60px'} px={5}  >
        dialog title
      </Flex>
      <Box w={'100%'} p={5} bg={'brand.900'} h={'100%'} borderRadius={'md'} pos={'relative'}>
        <Flex flexDirection={'column'} h={'100%'}>
          <Flex flexDirection={'column'} mt={'auto'} pb={9}>
            {isGlobalLoading && <Preloader />}
            {messages && messages.map(message => {
              return <MessageItem
                key={message._id}
                message={message}
                onDeleteMessageHandle={onDeleteMessageHandle}
              />
            })}
            {messages && messages.length === 0 &&
              <Flex justifyContent={'center'}>
                <Box fontSize={'14px'} bg={'rgba(0,0,0, 0.4)'} borderRadius={'50px'} px={3} py={2}>
                  Напишете первое сообщение в этом диалоге
                </Box>
              </Flex>}
            <Box pos={'absolute'} as={Fade} in={isWritingMessage || !!whoIsWritingMessage} bottom={0} left={0} p={5} fontSize={'14px'}>
              {whoIsWritingMessage} набирает сообщение
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Flex alignItems={'center'} w={'100%'} h={'60px'} px={5}>
        <Input
          variant="unstyled"
          focusBorderColor={'purple.400'}
          placeholder={'Напишите сообщение...'}
          value={message}
          onChange={onEnterMessage}
          onKeyPress={addMessageOnKeyboard}

        />
        <Button
          ml={4}
          variant={'ghost'}
          colorScheme={'purple'}
          _focus={{ boxShadow: "none" }}
          onClick={addMessage}
          isLoading={isGlobalLoading}
        >
          <Icon as={IoSend} boxSize={'25px'} color={'purple.400'} />
        </Button>
      </Flex>
    </Flex>
  );
}

const MessageItem: React.FC<{ message: IMessage, onDeleteMessageHandle(_id: string): void }> = memo(({
  message,
  onDeleteMessageHandle
}) => {

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} mt={4} data-message-id={message._id}>
      <Box>
        <Flex>от: <Box color={'purple.500'} ml={1}>{message.author}</Box> </Flex>
        {message.message}
      </Box>
      <Box>
        <Button size={'sm'} onClick={() => onDeleteMessageHandle(message._id!)}>Удалить</Button>
      </Box>
    </Flex>
  )
})


