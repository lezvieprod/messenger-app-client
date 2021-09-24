import React from 'react';
import { useParams } from 'react-router';
import { Messages } from '../../components/Messages/Messages';
import { useMutateWithAlert } from '../../hooks/mutate.hook';
import { useQueryWithErrorHandling } from '../../hooks/query.hook';
import { useCreateMessageMutation, useGetMessagesQuery } from '../../store/api';
import { IMessage } from '../../types/models/Message';

const MessagesContainer = () => {

  const { dialogId } = useParams<Record<string, string>>()
  const { data, error, isLoading, isFetching } = useQueryWithErrorHandling<IMessage[]>(useGetMessagesQuery, dialogId)
  const { asyncMutate } = useMutateWithAlert()
  const [createMessage, { isLoading: addMessageLoading }] = useCreateMessageMutation()

  const onAddMessageHandle = async (message: IMessage) => {
    await asyncMutate(createMessage(message))
  }

  return <Messages
    {...data}
    error={error}
    isLoading={isLoading}
    isFetching={isFetching}
    onAddMessageHandle={onAddMessageHandle}
    addMessageLoading={addMessageLoading}
  />
}

export default MessagesContainer;
