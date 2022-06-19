import { AspectRatio, Box, Flex, Image } from '@chakra-ui/react';
import { useSharedState } from '../../../hooks/useSharedState';
import { ImageSchema } from '../../../models/ImageSchema';

type Props = {
  image: string;
  setSelectedUnMosaicFaceUuids: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Select: React.FC<Props> = ({
  image,
  setSelectedUnMosaicFaceUuids,
}) => {
  const [unMosaicFaces] = useSharedState<ImageSchema[] | undefined>(
    'unMosaicFaces',
    []
  );
  return (
    <>
      <AspectRatio w="100%" ratio={1}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
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
              <Image
                w="100%"
                h="100%"
                src={image}
                alt={'default'}
                objectFit={'contain'}
              />
            </Box>
          </Box>
        </Box>
      </AspectRatio>
      <Flex overflowX="scroll">
        {unMosaicFaces?.map((face, index) => (
          <Image
            key={index}
            w="5rem"
            h="5rem"
            src={face.img}
            alt={'default'}
            objectFit={'contain'}
            onClick={() =>
              setSelectedUnMosaicFaceUuids((faces) => [...faces, face.uuid])
            }
          />
        ))}
      </Flex>
    </>
  );
};
