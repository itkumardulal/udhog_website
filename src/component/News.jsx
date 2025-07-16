import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import image from "../assets/img.jpg";
import { useTranslation } from "../context/TranslationContext";
import API from "../http";

function News() {
  const [newsList, setNewsList] = useState([]);
  const { t } = useTranslation();
  const [selectedNews, setSelectedNews] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await API.get("/news");
      if (response.status === 200) {
        setNewsList(response.data.data);
      } else {
        console.error("Error fetching news:");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-448px)] px-4 py-8 max-w-7xl mx-auto w-full">
        {!selectedNews ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{t("news1")}</h1>
              <p className="text-base text-gray-600 mt-2">{t("newsDetails")}</p>
            </div>

            <div className="space-y-6 flex-grow overflow-auto">
              {newsList.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 flex flex-col justify-center items-center text-center">
                  <p className="text-blue-600 font-semibold text-lg mb-2">
                    No news articles have been posted yet.
                  </p>
                  <p className="text-gray-600">
                    Please check back soon. New updates and announcements will
                    appear here.
                  </p>
                </div>
              ) : (
                newsList.map((news) => (
                  <div
                    key={news.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-300 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="mb-4 sm:mb-0">
                      <p className="text-lg sm:text-xl font-semibold text-gray-900">
                        {news.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {" "}
                        {t("published")}:{" "}
                        {new Date(news.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Eye Icon */}
                    <button onClick={() => setSelectedNews(news)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-black hover:text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6 flex-grow overflow-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>{t("back")}</span>
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {selectedNews.title}
            </h2>

            <div className="border border-gray-300 rounded-lg p-4 sm:p-6 bg-gray-50 flex justify-center items-center min-h-[200px]">
              {selectedNews.imgUrl ? (
                <img
                  src={selectedNews.imgUrl}
                  alt={selectedNews.title}
                  className="max-w-full h-auto sm:max-h-[500px]"
                />
              ) : (
                <p className="text-gray-500 italic">
                  No image uploaded for this news.
                </p>
              )}
            </div>

            <p className="text-base text-gray-700">
              {selectedNews.description}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              {t("published")}:{" "}
              {new Date(selectedNews.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default News;
