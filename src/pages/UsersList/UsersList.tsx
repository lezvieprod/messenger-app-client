import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { VscAccount } from 'react-icons/vsc';
import { Error } from '../../components/Error/Error';
import { Preloader } from '../../components/Preloader/Preloader';
import { IResponseError } from '../../types/models/Error';
import { IUser } from '../../types/models/User';


interface IUsersListProps {
  users?: IUser[],
  onCreateDialogHandle(user: IUser): void,
  total?: number,
  isLoading: boolean,
  isFetching: boolean,
  error?: {
    data: IResponseError
  }
}

export const UsersList: React.FC<IUsersListProps> = ({ users, isLoading, isFetching, error, onCreateDialogHandle }) => {

  const isGlobalLoading = isLoading || isFetching

  return (
    <Flex maxW={'500px'} mx={'auto'} bg={'brand.700'} flexDirection={'column'} borderRadius={'md'} pb={5} h={'100%'}>
      <Box p={4}>
        <Heading fontSize={'22px'}>{isGlobalLoading ? 'Загрузка...' : 'Выберите пользователя'}</Heading>
        <Text fontSize="md" color={'purple.400'}>для создания диалога </Text>
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
          : users && users.map(user => <UserItem key={user._id} user={user} onCreateDialogHandle={onCreateDialogHandle} />)
      }
    </Flex>
  );
}


const UserItem: React.FC<{ user: IUser, onCreateDialogHandle(user: IUser): void }> = ({ user, onCreateDialogHandle }) => {
  return <Button
    data-user-id={user._id}
    key={user._id}
    variant={'ghost'}
    d={'flex'}
    alignItems={'center'}
    colorScheme={'purple'}
    color={'white'}
    px={4}
    py={7}
    justifyContent={'flex-start'}
    borderRadius={'0'}
    _focus={{ boxShadow: "none" }}
    onClick={() => onCreateDialogHandle(user)}
  >
    <Icon as={VscAccount} boxSize={'22px'} mr={3} color={'purple.200'} /> {user.firstName + ' ' + user.lastName}
  </Button>
}