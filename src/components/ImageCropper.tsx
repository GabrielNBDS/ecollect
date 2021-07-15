import { Box, Button, ButtonGroup, Flex, useToast } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/getCroppedImage';

interface IProps {
  image: string;
  aspect: [number, number];
  setReturn: React.Dispatch<React.SetStateAction<string>>;
  onComplete: () => void;
}

const ImageCropper: React.FC<IProps> = ({
  image,
  aspect,
  setReturn,
  onComplete,
}) => {
  const toast = useToast();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels_) => {
    setCroppedAreaPixels(croppedAreaPixels_);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImageResult = await getCroppedImg(
        image,
        croppedAreaPixels,
        0,
      );

      setReturn(croppedImageResult);

      onComplete();
    } catch {
      toast({
        title: 'Try again.',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    }
  }, [image, croppedAreaPixels, 0]);

  return (
    <Flex bg="#111" flexDir="column" h="100%" w="100%">
      <Box position="relative" h="100%" w="100%" background="#000">
        <Cropper
          image={image}
          crop={crop}
          rotation={0}
          zoom={zoom}
          aspect={aspect[0] / aspect[1]}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </Box>
      <Flex my={2} justify="center">
        <ButtonGroup>
          <Button size="sm" onClick={showCroppedImage} colorScheme="green">
            Confirm
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default ImageCropper;
