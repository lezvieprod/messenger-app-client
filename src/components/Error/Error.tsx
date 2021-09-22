import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Box } from '@chakra-ui/layout';
import React from 'react';

interface IErrorProps {
  type: "info" | "warning" | "success" | "error",
  title: string,
  description?: string
}

export const Error: React.FC<IErrorProps> = ({ type, title, description }) => {
  return (
    <Alert status={type} borderRadius={'md'}>
      <AlertIcon />
      <Box flex="1">
        {title && <AlertTitle>{title}</AlertTitle>}
        {
          description &&
          <AlertDescription display="block" fontSize={'14px'}>
            {description}
          </AlertDescription>
        }
      </Box>
    </Alert>
  );
}

