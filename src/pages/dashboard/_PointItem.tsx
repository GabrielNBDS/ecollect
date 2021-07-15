import React, { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Icon,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';
import { cdn, db } from '../../lib/firebase';

interface IProps {
  id: string;
  name: string;
  imagePath: string;
}

const PointItem: React.FC<IProps> = ({ id, name, imagePath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const toast = useToast();

  const deletePoint = () => {
    cdn.child(imagePath).delete();

    db.collection('points').doc(id).delete();

    toast({
      title: 'Removed recycle point.',
      status: 'success',
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <>
      <Flex as="li" boxShadow="base" p={4} borderRadius="5px" align="center">
        <Text fontWeight="600">{name}</Text>
        <IconButton
          onClick={() => setIsOpen(true)}
          ml="auto"
          colorScheme="red"
          aria-label={`Delete recycling point ${name}`}
          icon={<Icon as={FiTrash} />}
        />
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete &quot;{name}&quot;
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deletePoint} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default PointItem;
