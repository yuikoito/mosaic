import Footer from '../components/Footer';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
