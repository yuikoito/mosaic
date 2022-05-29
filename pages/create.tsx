import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box, Icon, Text, VisuallyHidden } from '@chakra-ui/react';
import type { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import CommonButton from '../src/components/common/Button';
import useTranlate from '../src/hooks/useTranslate';
import AuthLayout from '../src/layouts/AuthLayout';
import resizeImage from '../src/libs/resizeImage';

const CreatePage: NextPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [image, setImage] = useState<string>();
  const [base64, setBase64] = useState<string>();
  const [changedImage, setChangedImage] = useState<string | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const t = useTranlate();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const changeImage = async () => {
    setIsLoad(true);
    // const response = await axios.post(
    //   process.env.NEXT_PUBLIC_API_ENDPOINT,
    //   JSON.stringify({
    //     myimg: base64,
    //     magni: magni,
    //     bokasi: 10,
    //   }),
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
    setIsLoad(false);
    // setChangedImage(`data:image/png;base64,${response.data.img}`);
  };

  return (
    <AuthLayout>
      <Box>
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
      </Box>
    </AuthLayout>
  );
};

export default CreatePage;
