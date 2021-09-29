import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/auth.hook';
import { IMessage } from '../../types/models/Message';
import { IoSend } from "react-icons/io5";
import { Button } from '@chakra-ui/button';
import { useParams } from 'react-router';
import { IResponseError } from '../../types/models/Error';
import { Preloader } from '../Preloader/Preloader';
import { Fade, ScaleFade, SlideFade } from '@chakra-ui/transition';

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

  const { _id: currentUserId } = useAuth()
  const { dialogId } = useParams<Record<string, string>>()
  const [message, setMessage] = useState<string>('')
  const { firstName, lastName } = useAuth()
  const messagesRef = useRef<HTMLDivElement>(null)

  const addMessage = () => {
    onAddMessageHandle({ message, author: firstName! + ' ' + lastName!, dialogId, ownerId: currentUserId! })
    setMessage('')
  }

  const addMessageOnKeyboard = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addMessage()
  }



  const onEnterMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    onWritingMessageHandle(firstName!, true)
  }

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, 9999)
    }



  }, [messages])

  const isGlobalLoading = isLoading || isFetching

  return (
    <Flex flexDirection={'column'} w={'100%'} h={'100%'} pr={5}  pos={'relative'}>
      <Flex alignItems={'center'} w={'100%'} h={'60px'} px={5}  >
        dialog title
      </Flex>
      <Box w={'100%'} p={5} bg={'brand.900'} h={'100%'} overflowY={'auto'} ref={messagesRef} borderRadius={'md'}>
        <Flex flexDirection={'column'} h={'100%'} >
          <Flex flexDirection={'column'} mt={'auto'} pb={9}>

            {isGlobalLoading && <Preloader />}
            {messages && messages.map(message => {
              return <MessageItem
                key={message._id}
                message={message}
                onDeleteMessageHandle={onDeleteMessageHandle}

              />
            })}
            {messages && messages.length === 0 && !isGlobalLoading &&
              <Flex justifyContent={'center'}>
                <Box fontSize={'14px'} bg={'#cfcfcf66'} color={'brand.purple'} borderRadius={'50px'} px={5} py={2}>
                  Напишете первое сообщение в этом диалоге
                </Box>
              </Flex>}

            <Box pos={'absolute'} as={Fade} in={isWritingMessage} bottom={45} left={0} p={5} fontSize={'14px'}>
              {whoIsWritingMessage} набирает сообщение...
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

  const { _id: currentUserId } = useAuth()
  return (

    currentUserId === message.ownerId
      ?
      <Flex
        maxW={'60%'}
        ml={'auto'}
        flexDir={'column'}
        alignItems={'flex-end'}
        as={ScaleFade}
        in={true}
        initialScale={0.4}
      >
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          mt={4}
          data-message-id={message._id}
          bg={'brand.purple'}
          color={'#fff'}
          px={4}
          borderRadius={'lg'}
          py={2}
        >
          <Box>
            {message.message}
          </Box>
        </Flex>
        <Button
          variant={'link'}
          fontSize={'12px'}
          fontWeight={'400'}
          mt={1}
          color={'brand.light_gray'}
          opacity={0.8}
          _focus={{ boxShadow: "none" }}
          onClick={() => onDeleteMessageHandle(message._id!)}>
          Удалить
        </Button>
      </Flex>
      : // not current user
      <Flex
        maxW={'60%'}
        mr={'auto'}
        flexDir={'column'}
        alignItems={'flex-end'}
        as={ScaleFade}
        in={true}
        initialScale={0.4}
      >
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          mt={4}
          data-message-id={message._id}
          bg={'gray'}
          color={'#fff'}
          px={4}
          borderRadius={'lg'}
          py={2}
        >
          <Box wordBreak={'break-word'}>
            {message.message}
          </Box>
        </Flex>
        <Button
          variant={'link'}
          fontSize={'12px'}
          fontWeight={'400'}
          mt={1}
          color={'brand.light_gray'}
          opacity={0.8}
          _focus={{ boxShadow: "none" }}
          onClick={() => onDeleteMessageHandle(message._id!)}>
          Удалить
        </Button>
      </Flex>
  )
})


