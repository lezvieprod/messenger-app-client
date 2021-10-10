import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Error } from '../../components/Error/Error';
import { Messages } from '../../components/Messages/Messages';
import { Preloader } from '../../components/Preloader/Preloader';
import { useAuth } from '../../hooks/auth.hook';
import { useQueryWithErrorHandling } from '../../hooks/query.hook';
import socket from '../../socket';
import { useGetMessagesQuery, useGetOneDialogQuery } from '../../store/api';
import { setWritingMessage } from '../../store/reducers/messages.reducer';
import { RootState } from '../../store/store';
import { IDialog } from '../../types/models/Dialog';
import { IMessage } from '../../types/models/Message';

const MessagesContainer = () => {

  const { dialogId } = useParams<Record<string, string>>()
  const { data: messages, error, isLoading, isFetching } = useQueryWithErrorHandling<IMessage[]>(useGetMessagesQuery, dialogId)
  const { data: currentDialog, isLoading: isLoadingDialog, isFetching: isFetchingDialog } = useQueryWithErrorHandling<IDialog>(useGetOneDialogQuery, dialogId)
  const { whoIsWritingMessage, isWritingMessage } = useSelector((state: RootState) => state.messages)
  const dispatch = useDispatch()
  const { _id: currentUserId } = useAuth()

  const isMessagesLoading = isLoading || isFetching;
  const isDialogLoading = isLoadingDialog || isFetchingDialog;


  const onAddMessageHandle = (message: IMessage) => socket.emit('MESSAGE:ADD', message)
  const onDeleteMessageHandle = (_id: string) => socket.emit('MESSAGE:DELETE', { messageId: _id, dialogId })

  let inputTimeout: any;

  const onWritingMessageHandle = (firstName: string, isWriting: boolean) => {

    clearTimeout(inputTimeout);
    socket.emit('MESSAGE:WRITING_MESSAGE', firstName, isWriting, dialogId)
    inputTimeout = setTimeout(() => {
      socket.emit('MESSAGE:WRITING_MESSAGE', firstName, false, dialogId)
    }, 2000)

  }

  useEffect(() => {
    if (currentDialog) {
      socket.emit('DIALOG:JOIN', dialogId, currentDialog.firstOwner._id === currentUserId ? currentUserId : currentDialog.secondOwner._id)
    }

    socket.on('MESSAGE:WRITING_MESSAGE', (firstName, isWriting) => {
      dispatch(setWritingMessage({ firstName, isWriting }))
    })

    return () => { socket.emit('DIALOG:LEAVE', dialogId) }
  }, [dialogId, currentUserId, dispatch, currentDialog]);

  if (isDialogLoading) return <Preloader />

  if (currentDialog) {
    return <Messages
      messages={messages}
      currentDialog={currentDialog}
      error={error}

      isMessagesLoading={isMessagesLoading}

      isWritingMessage={isWritingMessage}
      whoIsWritingMessage={whoIsWritingMessage}

      onAddMessageHandle={onAddMessageHandle}
      onDeleteMessageHandle={onDeleteMessageHandle}
      onWritingMessageHandle={onWritingMessageHandle}
    />
  } else if (!isDialogLoading) {
    return <Box p={5}>
      <Error type={'error'} title={'Ошибка загрузки диалога'} description={'Возможно диалога не существует'} />
    </Box>
  } else {
    return null
  }
}

export default MessagesContainer;
