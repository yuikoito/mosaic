import {
  Box,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import nookies from 'nookies';
import React, { useRef, useState } from 'react';
import { MdOutlineChangeCircle, MdOutlineCloudUpload } from 'react-icons/md';
import CommonButton from '../src/components/common/Button';
import { InputWithButton } from '../src/components/common/InputWithButton';
import RegisterModal from '../src/components/common/ResisterModal';
import useTranslate from '../src/hooks/useTranslate';
import { useUnMosaicFaces } from '../src/hooks/useUnMosaicFaces';
import AuthLayout from '../src/layouts/AuthLayout';
import { addMosaic } from '../src/libs/api/mosaic';
import { uploadImageFromLibrary } from '../src/libs/uploadImageFromLibrary';

const CreatePage: NextPage = () => {
  const cookies = nookies.get();
  const token = cookies.idToken;
  const [image, setImage] = useState<string>();
  const { data: unMosaicFaces } = useUnMosaicFaces();
  const [base64, setBase64] = useState<string>();
  const [changedImage, setChangedImage] = useState<string | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [imgTitle, setImgTitle] = useState<string>('hoge');
  const t = useTranslate();
  const [isUnMosaicResisterModalOpen, setIsUnMosaicResisterModalOpen] =
    useState<boolean>(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadImageFromLibrary(e).then((res) => {
      setImage(res?.imageUrl);
      setBase64(res?.imgToBase64);
    });
  };
  const uploadImage = () => {
    setChangedImage(null);
    inputImageRef.current!.click();
  };

  // モザイクをかける
  const changeImage = async () => {
    setIsLoad(true);
    // TODO [] にはモザイクをかけない顔を選択する
    if (!base64) return;
    const response = await addMosaic(imgTitle, base64, []);
    if (response.isLeft()) {
      window.alert(response.value);
      return;
    }
    setIsLoad(false);
    setChangedImage(`data:image/png;base64,${response.value.img}`);
  };

  return (
    <AuthLayout>
      <Box>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', lg: '40% 60%' }}
          gap={6}
          templateAreas={{
            base: `
          "selectImage"
          "image"
          "unMosaic"`,
            lg: `
          "selectImage image"
          "unMosaic image"`,
          }}
        >
          {/* ライブラリから画像を選択 */}
          <GridItem area={'selectImage'}>
            <Text fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
              {t.selectPhotoFromLibrary}
            </Text>
            <Text my={{ base: 1, md: 2, lg: 3 }} color={'gray.500'}>
              {t.note}
            </Text>
            <CommonButton
              leftIcon={<Icon as={MdOutlineCloudUpload} />}
              onClick={uploadImage}
            >
              {t.uploadPicture}
              <VisuallyHidden>
                <input
                  name="picture"
                  type="file"
                  ref={inputImageRef}
                  accept="image/jpeg, image/png"
                  onChange={(e) => handleFile(e)}
                />
              </VisuallyHidden>
            </CommonButton>
          </GridItem>
          {/* 画像 */}
          <GridItem area={'image'} maxH={300}>
            {(changedImage || image) && (
              <Image
                w="100%"
                h="100%"
                src={changedImage ? changedImage : image ? image : ''}
                alt={'default'}
                opacity={isLoad ? 0.5 : 1}
                objectFit={'contain'}
              />
            )}
          </GridItem>
          {/* どの顔にモザイクをかけないか選ぶ */}
          <GridItem area={'unMosaic'}>
            <Text fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
              {t.selectUnMosaicTargets}
            </Text>
            {!image && (
              <Text my={{ base: 1, md: 2, lg: 3 }} color={'gray.500'}>
                {t.selectPhotoFirst}
              </Text>
            )}
            {image && (
              <CommonButton
                leftIcon={<Icon as={MdOutlineChangeCircle} />}
                onClick={() => setIsUnMosaicResisterModalOpen(true)}
              >
                {t.createUnMosaicTargets}
              </CommonButton>
            )}
          </GridItem>
          {/* 画像にモザイクをかける */}
          <GridItem>
            <Text fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
              {t.makePhotoMosaic}
            </Text>
            {!image && (
              <Text my={{ base: 1, md: 2, lg: 3 }} color={'gray.500'}>
                {t.selectPhotoFirst}
              </Text>
            )}
            {image && (
              <CommonButton
                leftIcon={<Icon as={MdOutlineChangeCircle} />}
                onClick={changeImage}
              >
                {t.makePhotoMosaic}
              </CommonButton>
            )}
            {image && (
              <InputWithButton
                label={t.do}
                placeholder={t.inputImageName}
                onClick={changeImage}
              />
            )}
          </GridItem>
        </Grid>
        {isUnMosaicResisterModalOpen && (
          <RegisterModal
            isOpenModal={isUnMosaicResisterModalOpen}
            onClose={() => setIsUnMosaicResisterModalOpen(false)}
          />
        )}
      </Box>
    </AuthLayout>
  );
};

export default CreatePage;
