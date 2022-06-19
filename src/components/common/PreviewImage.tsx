import { Box, BoxProps, forwardRef } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      {...props}
      ref={ref}
    />
  );
});
