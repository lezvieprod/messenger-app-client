import React from 'react';
import { Dialogs } from '../../components/Dialogs/Dialogs';
import { useAuth } from '../../hooks/auth.hook';
import { useQueryWithErrorHandling } from '../../hooks/query.hook';
import { useGetAllDialogsQuery } from '../../store/api';
import { IDialog } from '../../types/models/Dialog';

const DialogsContainer = () => {

  const { _id } = useAuth()
  const { data: dialogs, error, isLoading, isFetching } = useQueryWithErrorHandling<IDialog[]>(useGetAllDialogsQuery, _id)

  return <Dialogs dialogs={dialogs} isLoading={isLoading} isFetching={isFetching} error={error} />
}

export default DialogsContainer;
