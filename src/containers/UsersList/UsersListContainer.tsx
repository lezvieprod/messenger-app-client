import React from 'react';
import { useHistory } from 'react-router';
import { useMutateWithAlert } from '../../hooks/mutate.hook';
import { useQueryWithErrorHandling } from '../../hooks/query.hook';
import { UsersList } from '../../pages/UsersList/UsersList';
import { useCreateDialogMutation, useGetAllUsersQuery } from '../../store/api';
import { IUser } from '../../types/models/User';

const UsersListContainer: React.FC = () => {

  const { data, error, isLoading, isFetching } = useQueryWithErrorHandling<IUser[]>(useGetAllUsersQuery)
  const { asyncMutate } = useMutateWithAlert()
  const [createDialog] = useCreateDialogMutation()
  const history = useHistory()

  // Отправляем данные о юзере с которым хотим создать диалог
  const onCreateDialogHandle = async (user: IUser) => {
    try {
      await asyncMutate(createDialog(user), true)
      history.push('/')
    } catch (e) { }
  }

  return <UsersList
    {...data}
    isLoading={isLoading}
    isFetching={isFetching}
    error={error}
    onCreateDialogHandle={onCreateDialogHandle}
  />
}


export default UsersListContainer;
