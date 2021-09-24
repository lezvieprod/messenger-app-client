import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hook';
import { IDialog } from '../../types/models/Dialog';
import { IResponseError } from '../../types/models/Error';
import { Error } from '../Error/Error';
import { Preloader } from '../Preloader/Preloader';


interface IDialogsProps {
  dialogs?: IDialog[],
  total?: number,
  isLoading: boolean,
  isFetching: boolean,
  error?: {
    data: IResponseError
  }
}

export const Dialogs: React.FC<IDialogsProps> = ({ dialogs, isFetching, isLoading, error }) => {

  const isGlobalLoading = isLoading || isFetching

  return (
    <Flex flexDirection={'column'} h={'100%'} height={'600px'} overflowY={'auto'}>
      {error && error.data &&
        <Box p={4}>
          <Error
            type={'error'}
            title={error.data.title}
            description={error.data.message}
          />
        </Box>
      }
      {
        isGlobalLoading
          ? <Preloader my={'20px'} />
          : dialogs?.length
            ? dialogs.map(dialog => <DialogItem key={dialog._id} dialog={dialog} />)
            : <Box p={4}>Нет диалогов</Box>
      }
    </Flex>
  );
}


const DialogItem: React.FC<{ dialog: IDialog }> = ({ dialog }) => {

  const { _id } = useAuth()

  return <Button
    exact
    as={NavLink}
    to={'/dialog/' + dialog._id}
    p={7}
    variant={'ghost'}
    color={'white'}
    colorScheme={'purple'}
    borderRadius={'0'}
    justifyContent={'flex-start'}
    _focus={{ boxShadow: "none" }}
    activeStyle={{ borderLeft: '2px solid', borderColor: 'purple.600', background: 'rgba(214, 188, 250, 0.07)' }}

  >
    {
      _id === dialog.firstOwner._id
        ? dialog.secondOwner.firstName + ' ' + dialog.secondOwner.lastName
        : dialog.firstOwner.firstName + ' ' + dialog.firstOwner.lastName
    }
  </Button>
}
