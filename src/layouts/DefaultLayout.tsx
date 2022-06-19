import { Box } from '@chakra-ui/react';
import Footer from '../components/Footer';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
