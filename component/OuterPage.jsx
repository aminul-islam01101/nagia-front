import Footer from './Footer/Index';
import Header from './Header/Index';
import BackToTop from './Misc/BackToTop';
import Ticker from './Ticker/Index';

const OuterPage = ({ children }) => {
  return (
    <div>
      <Ticker />
      <Header />
      <div>{children}</div>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default OuterPage;
