import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Fade } from '@chakra-ui/transition';
import React from 'react';
import { VscAccount } from 'react-icons/vsc';
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
      <Box p={7}>
        <Heading fontSize={'32px'}>{isGlobalLoading ? 'Загрузка...' : 'Ваши диалоги'}</Heading>
      </Box>
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
          : dialogs && dialogs.map(dialog => <DialogItem key={dialog._id} dialog={dialog} />)
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
    colorScheme={'white'}
    color={'brand.dark_gray'}
    borderRadius={'0'}
    justifyContent={'flex-start'}
    _focus={{ boxShadow: "none" }}
    py={8}
    px={7}
    activeStyle={{ borderLeft: '2px solid', borderColor: 'purple.600', background: 'rgba(214, 188, 250, 0.07)' }}

  >
    <Icon as={VscAccount} boxSize={'28px'} mr={4} />
    <Box overflow={'hidden'}>
      <Box mb={1}>
        {
          _id === dialog.firstOwner._id
            ? dialog.secondOwner.firstName + ' ' + dialog.secondOwner.lastName
            : dialog.firstOwner.firstName + ' ' + dialog.firstOwner.lastName
        }
      </Box>
      <Box as={Fade} in={!!dialog.lastMessage} color={'#9b9b9b'} fontSize={'14px'} fontWeight={'400'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'} h={'17px'}>
        {
          dialog.lastMessage && dialog.lastMessage.length >= 90
            ? dialog.lastMessage.substring(0, 90) + '...'
            : dialog.lastMessage
        }
      </Box>
    </Box>

  </Button>
}
