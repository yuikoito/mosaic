import {
  Box,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import nookies from 'nookies';
import React, { useRef, useState } from 'react';
import { MdOutlineChangeCircle, MdOutlineCloudUpload } from 'react-icons/md';
import CommonButton from '../src/components/common/Button';
import useTranslate from '../src/hooks/useTranslate';
import { useUnMosaicFaces } from '../src/hooks/useUnMosaicFaces';
import AuthLayout from '../src/layouts/AuthLayout';
import resizeImage from '../src/libs/resizeImage';

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

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const imageFiles = e.target.files;
    if (!imageFiles) return;
    const imageFile = imageFiles[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
    let imgToBase64 = await resizeImage(imageFile, 1000, 1000);
    if (!imgToBase64) return;
    imgToBase64 = imgToBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    setBase64(imgToBase64);
  };
  const uploadImage = () => {
    setChangedImage(null);
    inputImageRef.current!.click();
  };

  // モザイクをかける
  const changeImage = async () => {
    setIsLoad(true);
    const response = await axios.post(
      `${process.env.API_ENDPOINT}/mosaic`,
      JSON.stringify({
        imgTitle,
        img: base64,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsLoad(false);
    setChangedImage(`data:image/png;base64,${response.data.img}`);
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
                  multiple
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
              <>
                <CommonButton
                  leftIcon={<Icon as={MdOutlineChangeCircle} />}
                  onClick={changeImage}
                >
                  {t.createUnMosaicTargets}
                </CommonButton>
              </>
            )}
          </GridItem>
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
          </GridItem>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default CreatePage;
