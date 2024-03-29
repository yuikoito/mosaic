import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import useTranslate from '../../hooks/useTranslate';

type Props = {
  shareUrl: string;
  uuid: string;
  isOpenModal: boolean;
  onClose: () => void;
  modalType: 'TWITTER' | 'FACEBOOK';
  isLoading: boolean;
};

const ShareModal = ({
  shareUrl,
  uuid,
  isOpenModal,
  onClose,
  modalType,
  isLoading,
}: Props) => {
  const t = useTranslate();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const snsUrl = () => {
    const hash = `#${t.hash}`;
    const shareText = t.shareText;
    switch (modalType) {
      case 'TWITTER':
        return (
          `https://twitter.com/intent/tweet?url=${shareUrl}&text=` +
          encodeURIComponent(shareText + `\n` + hash)
        );
      case 'FACEBOOK':
        return `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${shareText}\n${hash}`;
    }
  };

  return (
    <Modal isOpen={isOpenModal} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t.shareTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            borderRadius="xl"
            border="1px"
            borderColor="gray.400"
            spacing={0}
            _hover={{ bg: 'gray.200', textDecoration: 'none' }}
          >
            <Image
              src={
                !isLoading
                  ? `${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/ogpimg/${uuid}.jpg`
                  : '/loading.gif'
              }
              fallbackSrc="/loading.gif"
              alt="image"
              width="100%"
              onLoad={() => setIsImageLoading(false)}
              maxHeight="2xs"
              borderTopRadius="xl"
              objectFit="cover"
            />
            <Box
              borderBottomRadius="xl"
              borderTop="1px"
              borderColor="gray.400"
              padding="3"
              width="100%"
            >
              <Text>{t.description}</Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          {modalType === 'FACEBOOK' && (
            <Button
              colorScheme="facebook"
              isLoading={isLoading || isImageLoading}
              leftIcon={<FaFacebook />}
              w="full"
              onClick={() => window.open(snsUrl(), '_blank')}
            >
              Share
            </Button>
          )}
          {modalType === 'TWITTER' && (
            <Button
              colorScheme="twitter"
              isLoading={isLoading || isImageLoading}
              leftIcon={<FaTwitter />}
              w="full"
              onClick={() => window.open(snsUrl(), '_blank')}
            >
              Tweet
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
