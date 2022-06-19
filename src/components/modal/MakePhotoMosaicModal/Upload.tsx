import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Input,
  Stack,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import React from 'react';
import useTranslate from '../../../hooks/useTranslate';
import { PreviewImage } from '../../common/PreviewImage';

const first = {
  rest: {
    rotate: '-15deg',
    scale: 0.95,
    x: '-50%',
    filter: 'grayscale(80%)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    x: '-70%',
    scale: 1.1,
    rotate: '-20deg',
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
};

const second = {
  rest: {
    rotate: '15deg',
    scale: 0.95,
    x: '50%',
    filter: 'grayscale(80%)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    x: '70%',
    scale: 1.1,
    rotate: '20deg',
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
};

const third = {
  rest: {
    scale: 1.1,
    filter: 'grayscale(80%)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    scale: 1.3,
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
};

type Props = {
  image: string | undefined;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Upload: React.FC<Props> = ({ image, handleFile }) => {
  const t = useTranslate();
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();
  return (
    <AspectRatio w="100%" ratio={1}>
      <Box
        borderColor="gray.300"
        borderStyle="dashed"
        borderWidth="2px"
        rounded="md"
        shadow="sm"
        role="group"
        transition="all 150ms ease-in-out"
        _hover={{
          shadow: 'md',
        }}
        as={motion.div}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <Box position="relative" height="100%" width="100%">
          <Box
            position="absolute"
            top="0"
            left="0"
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
          >
            {image ? (
              <Image
                w="100%"
                h="100%"
                src={image}
                alt={'default'}
                objectFit={'contain'}
              />
            ) : (
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
                spacing="4"
              >
                <Box height="20" width="16" position="relative">
                  <PreviewImage
                    variants={first}
                    backgroundImage="url('/images/faces/1.png')"
                  />
                  <PreviewImage
                    variants={second}
                    backgroundImage="url('/images/faces/2.png')"
                  />
                  <PreviewImage
                    variants={third}
                    backgroundImage="url('/images/faces/3.png')"
                  />
                </Box>
                <Stack p="8" textAlign="center" spacing="1">
                  <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                    {t.selectPhotoFromLibrary}
                  </Heading>
                </Stack>
              </Stack>
            )}
          </Box>
          <Input
            type="file"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*"
            onDragEnter={startAnimation}
            onDragLeave={stopAnimation}
            cursor="pointer"
            onChange={handleFile}
          />
        </Box>
      </Box>
    </AspectRatio>
  );
};
