import {
  Fade,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useModalWindow } from '../../../hooks/useModalWindow';
import useTranslate from '../../../hooks/useTranslate';
import { uploadImageFromLibrary } from '../../../libs/uploadImageFromLibrary';
import { Upload } from './Upload';

export const MakePhotoMosaicModal: React.FC = () => {
  const [image, setImage] = useState<string>();
  const [base64, setBase64] = useState<string>();
  const [selectedUnMosaicFaceUuids, setSelectedUnMosaicFaceUuids] = useState<
    string[]
  >([]);
  const [status, setStatus] = useState<'upload' | 'select' | 'confirm'>(
    'upload'
  );
  const t = useTranslate();
  const { isVisible, setIsVisible } = useModalWindow('makePhotoMosaic');
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadImageFromLibrary(e).then((res) => {
      setImage(res?.imageUrl);
      setBase64(res?.imgToBase64);
    });
  };
  const handleNext = () => {
    switch (status) {
      case 'upload':
        setStatus('select');
        break;
      case 'select':
        setStatus('confirm');
        break;
    }
  };
  return (
    <Modal isOpen={isVisible} onClose={() => setIsVisible(false)} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center" justifyContent="space-between">
            <MdOutlineClose
              size={24}
              onClick={() => setIsVisible(false)}
              cursor="pointer"
            />
            <Text fontSize="md" textAlign="center">
              {t.makePhotoMosaic}
            </Text>
            <Fade in={!!image}>
              <Text
                fontSize="md"
                color={'cyan.700'}
                onClick={handleNext}
                cursor="pointer"
              >
                {t.next}
              </Text>
            </Fade>
          </Flex>
        </ModalHeader>
        <ModalBody>
          {status === 'upload' && (
            <Upload image={image} handleFile={handleFile} />
          )}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
