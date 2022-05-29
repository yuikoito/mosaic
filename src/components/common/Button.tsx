import { Button } from '@chakra-ui/react';
import React from 'react';

type Props = {
  leftIcon?: React.ReactElement;
  onClick?: () => void;
  width?: any;
};

const CommonButton: React.FC<Props> = ({
  children,
  leftIcon,
  onClick,
  width,
}) => {
  return (
    <Button
      leftIcon={leftIcon}
      onClick={onClick}
      rounded={'full'}
      boxShadow="xl"
      size={'lg'}
      width={width ?? 'auto'}
      fontWeight={'normal'}
      px={6}
      colorScheme={'cyan.700'}
      bg={'cyan.700'}
      _hover={{ opacity: 0.8 }}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
