import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../footer";
import { useTranslation } from "../../context/TranslationContext";
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

function DisplayMessage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { memberIndex } = location.state || {};

  const members = t("members", { returnObjects: true }) || [];

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    chairperson,
  ];

  const displayMessage = t("displayMessage", { returnObjects: true }) || {};

  if (memberIndex === undefined || memberIndex >= members.length) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            {displayMessage.noData || "No data to display"}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {displayMessage.goBack || "Go Back"}
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const member = { ...members[memberIndex], image: images[memberIndex] };
  const contributionsList = Array.isArray(displayMessage.contributions)
    ? displayMessage.contributions
    : [];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 sm:mb-10 text-center">
          {member.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
          <div className="flex justify-center md:justify-end h-full">
            <img
              src={member.image}
              alt={member.title}
              className="h-full w-60 sm:w-80 md:w-[400px] object-cover rounded-2xl shadow-xl border-4 border-blue-100"
            />
          </div>

          <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border flex flex-col justify-between">
            <p className="text-gray-700 text-lg sm:text-xl mb-6 font-medium break-words">
              {displayMessage.yearsOfService || "Years of Service"}:{" "}
              <span className="font-semibold text-blue-600">
                {member.description}
              </span>
            </p>

            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {displayMessage.majorContributionsTitle ||
                  "Major Contributions"}
                :
              </h3>

              <ul className="space-y-4 list-disc list-inside text-gray-700 text-base sm:text-lg">
                {contributionsList.map((point, index) => (
                  <li key={index} className="pl-2 break-words">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded hover:bg-blue-700 transition"
              >
                {displayMessage.goBack || "Go Back"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DisplayMessage;
