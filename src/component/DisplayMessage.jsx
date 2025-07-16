import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function DisplayMessage() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="text-center text-red-500 mt-10">No data to display</div>
    );
  }

  const { image, title, description } = state.slide;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden min-h-[800px]">
          <img
            src={image}
            alt={title}
            className="w-full h-[550px] object-cover"
          />
          <div className="p-12">
            <p className="mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              neque recusandae aspernatur. Dolores nisi, corrupti deserunt magni
              quibusdam assumenda sit?
            </p>
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            <p className="text-gray-700">{description}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DisplayMessage;
