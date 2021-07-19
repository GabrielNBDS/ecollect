import React, { ChangeEvent, useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
  theme,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FiPlus, FiSave, FiUpload } from 'react-icons/fi';
import Measure from 'react-measure';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import ImageCropper from '../../components/ImageCropper';
import onFileChange from '../../utils/onFileChange';

import Map from './_Map';
import getFileFromBlob from '../../utils/getFileFromBlob';
import fire, { cdn, db } from '../../lib/firebase';
import { useAuth } from '../../hooks/auth';

interface IFormData {
  name: string;
  address: string;
}

const Create: React.FC = () => {
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useAuth();
  const toast = useToast();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileChange(e, setImage);
      setIsUploading(true);
    }
  };

  const [center, setCenter] = useState<[number, number]>([0, 0]);

  const [markerPos, setMarkerPos] = useState<[number, number]>([0, 0]);

  const [relativeHeight, setRelativeHeight] = useState(0);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: IFormData) => {
    setError('');
    setLoading(true);

    if (image === '') {
      setError('Image is required.');
      setLoading(false);
      return;
    }

    getFileFromBlob(image, async blob => {
      const [, extension] = blob.type.split('/');

      const ref = cdn.child(`${uuidv4()}.${extension}`);

      const task = ref.put(blob);

      task.then(() => {
        ref.getDownloadURL().then(async url => {
          await db.collection('points').add({
            ...data,
            image: url,
            imagePath: ref.fullPath,
            center: new fire.firestore.GeoPoint(center[0], center[1]),
            markerPos: new fire.firestore.GeoPoint(markerPos[0], markerPos[1]),
            ownerId: user.uid,
          });

          setImage('');

          setLoading(false);

          toast({
            title: 'Added recycle point!',
            status: 'success',
            duration: 2500,
            isClosable: true,
          });

          reset();
        });
      });
    });
  };

  return (
    <Container px={0} h="max-content" borderRadius="5px">
      <Text fontWeight="700" borderBottom="4px solid black" fontSize={18}>
        Create a new recycling point
      </Text>
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        spacing={4}
        py={2}
      >
        <Measure
          bounds
          onResize={contentRect => {
            setRelativeHeight((contentRect.bounds.width * 9) / 16);
          }}
        >
          {({ measureRef }) => (
            <Box
              ref={measureRef}
              position="relative"
              marginX="auto"
              p={2}
              w="100%"
              h={`${relativeHeight}px`}
              backgroundImage={isUploading ? '' : `url('${image}')`}
              bgRepeat="no-repeat"
              bgSize="cover"
              border={`4px dotted ${theme.colors.green[400]}`}
            >
              {isUploading && (
                <ImageCropper
                  aspect={[16, 9]}
                  image={image}
                  setReturn={setImage}
                  onComplete={() => setIsUploading(false)}
                />
              )}
              <Button
                isDisabled={loading}
                position="absolute"
                bottom="-16px"
                right="-16px"
                cursor="pointer"
                as="label"
                htmlFor="image"
                maxW="min-content"
                colorScheme="green"
                borderRadius="full"
                minW="50px"
                height="50px"
                aria-label="Add Image"
              >
                <Icon as={FiUpload} />
                <input
                  onChange={handleImageChange}
                  accept="image/x-png,image/jpeg"
                  style={{ display: 'none' }}
                  id="image"
                  type="file"
                  onClick={e => {
                    (e.target as HTMLInputElement).value = null;
                  }}
                />
              </Button>
            </Box>
          )}
        </Measure>

        <FormControl isRequired isDisabled={loading}>
          <FormLabel>Recycling point name</FormLabel>
          <Input {...register('name')} />
        </FormControl>
        <Box
          position="relative"
          marginX="auto"
          w="100%"
          h={`${relativeHeight}px`}
          border={`4px dotted ${theme.colors.green[400]}`}
        >
          <Map
            center={center}
            markerPos={markerPos}
            setCenter={setCenter}
            setMarkerPos={setMarkerPos}
          />
        </Box>

        <FormControl isRequired isDisabled={loading}>
          <FormLabel>Address line:</FormLabel>
          <Input {...register('address')} type="text" />
        </FormControl>

        {error !== '' && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{error}</AlertTitle>
          </Alert>
        )}

        <Button
          isLoading={loading}
          type="submit"
          colorScheme="green"
          borderRadius="full"
          rightIcon={<Icon as={FiSave} />}
        >
          Create recycling point
        </Button>
      </VStack>
    </Container>
  );
};

const AddPoint: React.FC = () => {
  const [createNewPoint, setCreateNewPoint] = useState(true);

  return (
    <Box w="100%">
      {createNewPoint ? (
        <Create />
      ) : (
        <Button
          onClick={() => setCreateNewPoint(true)}
          borderRadius="full"
          rightIcon={<Icon fontSize={24} as={FiPlus} />}
          colorScheme="green"
          mr="auto"
        >
          Create a new recycling point
        </Button>
      )}
    </Box>
  );
};

export default AddPoint;
