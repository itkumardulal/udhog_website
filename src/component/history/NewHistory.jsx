import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/img1.JPG";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.JPG";
import img6 from "../../assets/img6.JPG";
import img7 from "../../assets/img7.JPG";
import img8 from "../../assets/img8.JPG";
import img9 from "../../assets/img9.JPG";
import img10 from "../../assets/img10.jpg";
import chairperson from "../../assets/chaiperson.JPG";
import Navbar from "../Navbar";
import Footer from "../footer";
import { useTranslation } from "../../context/TranslationContext";

function NewHistory() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const members = t("members", { returnObjects: true }) || [];

  const images = [
    img1,
    img2,
    img3,
    img5,
    img4,
    img6,
    img7,
    img8,
    img9,
    img10,
    chairperson,
  ];

  const timelineEvents = t("timelineEvents", { returnObjects: true }) || [];

  const MemberCard = ({ member, index }) => {
    const handleViewMessage = () => {
      navigate("/view-message", { state: { memberIndex: index } });
    };

    return (
      <div className="w-full md:w-1/3 px-2 py-4">
        <div className="rounded-lg overflow-hidden shadow-md h-full flex flex-col group">
          {/* ✅ Natural Proportion, Responsive */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg group">
            <img
              src={images[index]}
              alt={member.title}
              className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-90 transition duration-300" />
          </div>

          <div className="p-4 flex-grow bg-white">
            <h3 className="text-xl font-semibold text-gray-800">
              {member.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {t("yearsOfService")}:{" "}
              <span className="text-gray-600">{member.description}</span>
            </p>
          </div>

          <div className="p-4 bg-white">
            <button
              onClick={handleViewMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition"
            >
              {t("viewContributions")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // const Timeline = () => (
  //   <div className="mt-16">
  //     <h2 className="text-3xl font-extrabold text-blue-600 mb-8">
  //       {t("timelineTitle")}
  //     </h2>
  //     <div className="flex flex-col">
  //       {timelineEvents.map((item, index) => (
  //         <div
  //           key={index}
  //           className="relative pl-8 border-l-4 border-blue-600 mb-12"
  //         >
  //           <div className="absolute -left-4 top-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
  //             {index + 1}
  //           </div>
  //           <h3 className="text-2xl font-bold mb-2">
  //             {item.year} - {item.event}
  //           </h3>
  //           <p className="text-gray-700 text-lg leading-relaxed">
  //             {item.description}
  //           </p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto pb-8 px-6">
          <h1 className="text-4xl font-bold mb-6 animate-fade-in mt-4">
            {t("title")}
          </h1>

          <div className="flex flex-wrap">
            {members.map((member, index) => (
              <MemberCard key={index} member={member} index={index} />
            ))}
          </div>

          {/* <Timeline /> */}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default NewHistory;
