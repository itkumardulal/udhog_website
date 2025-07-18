import Contact from "../component/Contact";
import Footer from "../component/Footer";
import ImageSlider from "../component/ImageSlider";
import Message from "../component/Message";
import Navbar from "../component/Navbar";
import NewsPreview from "../component/NewsPreview";
import NoticePreview from "../component/NoticePreview";
import Services from "../component/Services";
import Video from "../component/Video";

function Home() {
  return (
    <>
      <Navbar />
      <Video />
      <ImageSlider />
      <NoticePreview />
      <NewsPreview />
      <Services />
      <Message />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
