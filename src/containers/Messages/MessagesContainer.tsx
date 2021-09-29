import { useToast } from '@chakra-ui/toast';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { Messages } from '../../components/Messages/Messages';
import { useMutateWithAlert } from '../../hooks/mutate.hook';
import { useQueryWithErrorHandling } from '../../hooks/query.hook';
import { useTimer } from '../../hooks/timer.hook';
import socket from '../../socket';
import { useCreateMessageMutation, useGetMessagesQuery } from '../../store/api';
import { addNewMessage, deleteMessage, setMessages, setWritingMessage } from '../../store/reducers/messages.reducer';
import { RootState } from '../../store/store';
import { IMessage } from '../../types/models/Message';



const MessagesContainer = () => {

  const { dialogId } = useParams<Record<string, string>>()
  const { data: messages, error, isLoading, isFetching } = useQueryWithErrorHandling<IMessage[]>(useGetMessagesQuery, dialogId)
  const { whoIsWritingMessage, isWritingMessage } = useSelector((state: RootState) => state.messages)
  const dispatch = useDispatch()
  // const {pathname} = useLocation()

  const {
    setStartTimer,
    setInitialTime,
    initialTime,
    setStopTimer
  } = useTimer(whoIsWritingMessage, dialogId)

  const onAddMessageHandle = (message: IMessage) => {
    console.log('MESSAGE', message);
    
    socket.emit('MESSAGE:ADD', message)

  }

  const onDeleteMessageHandle = (_id: string) => {
    socket.emit('MESSAGE:DELETE', { messageId: _id, dialogId })

  }



  let inputTimeout: any;

  const onWritingMessageHandle = (firstName: string, isWriting: boolean) => {

   

    clearTimeout(inputTimeout);

    
    socket.emit('MESSAGE:WRITING_MESSAGE', firstName, isWriting, dialogId)
    

    inputTimeout = setTimeout(() => {

   

      socket.emit('MESSAGE:WRITING_MESSAGE', firstName, false, dialogId)

    }, 2000)

  }

  useEffect(() => {
    socket.emit('DIALOG:JOIN', dialogId)

    socket.on('MESSAGE:WRITING_MESSAGE', (firstName, isWriting) => {
   
      
      
      dispatch(setWritingMessage({ firstName, isWriting }))


    })


    


    return () => { socket.emit('DIALOG:LEAVE', dialogId) }
  }, [dialogId]);


  return <Messages
    messages={messages}
    error={error}
    isLoading={isLoading}
    isFetching={isFetching}
    isWritingMessage={isWritingMessage}
    whoIsWritingMessage={whoIsWritingMessage}
    onAddMessageHandle={onAddMessageHandle}
    onDeleteMessageHandle={onDeleteMessageHandle}
    onWritingMessageHandle={onWritingMessageHandle}
  />
}

export default MessagesContainer;
