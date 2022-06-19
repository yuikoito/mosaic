import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box, Flex, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { MdLogout, MdMenu, MdOutlineAddPhotoAlternate } from 'react-icons/md';
import useTranslate from '../hooks/useTranslate';

export const Header: React.FC = () => {
  const { signOut } = useAuthenticator();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const t = useTranslate();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      px={2}
      position="sticky"
      top={0}
      zIndex={50}
    >
      <IconButton
        aria-label="open side menu"
        icon={<MdMenu size={24} />}
        variant="ghost"
        size="lg"
        _focus={{ boxShadow: 'none' }}
      />
      <Box>
        <IconButton
          aria-label="add photo"
          icon={<MdOutlineAddPhotoAlternate size={24} />}
          variant="ghost"
          size="lg"
          _focus={{ boxShadow: 'none' }}
        />
        <IconButton
          variant="ghost"
          aria-label="open user menu"
          icon={<CgProfile size={24} />}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          size="lg"
          _focus={{ boxShadow: 'none' }}
        />
      </Box>
      {isUserMenuOpen && (
        <Box
          position="fixed"
          top={10}
          right={4}
          borderRadius="md"
          boxShadow="md"
          background="white"
          zIndex={50}
        >
          <Flex alignItems="center" p={4} gap={4} cursor="pointer">
            <Icon as={FiSettings} />
            {t.accountSettings}
          </Flex>
          <Flex
            alignItems="center"
            p={4}
            gap={4}
            borderTop="1px"
            borderColor="gray.100"
            cursor="pointer"
            onClick={signOut}
          >
            <Icon as={MdLogout} />
            {t.signOut}
          </Flex>
        </Box>
      )}
    </Flex>
  );
};
