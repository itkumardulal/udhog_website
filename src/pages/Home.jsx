
import Contact from "../component/Contact";
import Footer from "../component/footer";
// import ImageSlider from "../component/ImageSlider";
import Message from "../component/Message";
import Navbar from "../component/Navbar";
import Services from "../component/Services";
import Video from "../component/Video";

function Home() {
  return (
    <>
      <Navbar />
      <Video />
      {/* <ImageSlider /> */}
      <Services />
      <Message />
      <Contact />
      <Footer />
    </>
  );
}
export default Home;
