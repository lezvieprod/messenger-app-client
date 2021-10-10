import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
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
    <Flex maxW={'800px'} flexDirection={'column'} borderRadius={'md'} pb={5} h={'100%'}>
      <Box mb={9}>
        <Heading fontSize={'32px'}>{isGlobalLoading ? 'Загрузка...' : 'Выберите пользователя'}</Heading>
        <Text fontSize={'23px'} color={'purple.400'}>для создания диалога </Text>
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
          :
          <VStack alignItems={'stretch'} spacing={4}>
            {users && users.map(user => <UserItem key={user._id} user={user} onCreateDialogHandle={onCreateDialogHandle} />)}
          </VStack>
      }
    </Flex>
  );
}


const UserItem: React.FC<{ user: IUser, onCreateDialogHandle(user: IUser): void }> = ({ user, onCreateDialogHandle }) => {
  return <Button
    data-user-id={user._id}
    key={user._id}
    bg={'#fff'}
    d={'flex'}
    alignItems={'center'}
    colorScheme={'white'}
    color={'brand.light_gray'}
    px={4}
    py={9}
    justifyContent={'flex-start'}
    borderRadius={'md'}
    boxShadow="sm"
    _focus={{ boxShadow: "none" }}
    _hover={{ transform: 'scale(1.03)', boxShadow: 'lg' }}
    onClick={() => onCreateDialogHandle(user)}
  >
    <Icon as={VscAccount} boxSize={'22px'} mr={3} /> {user.firstName + ' ' + user.lastName}
  </Button>
}