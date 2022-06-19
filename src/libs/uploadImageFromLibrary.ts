import resizeImage from './resizeImage';

export const uploadImageFromLibrary = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const imageFiles = e.target.files;
  if (!imageFiles) return;
  const imageFile = imageFiles[0];
  const imageUrl = URL.createObjectURL(imageFile);
  let imgToBase64 = await resizeImage(imageFile, 1000, 1000);
  if (!imgToBase64) return;
  imgToBase64 = imgToBase64.replace(/^data:image\/[a-z]+;base64,/, '');
  e.target.value = '';
  return {
    imageUrl,
    imgToBase64,
  };
};
