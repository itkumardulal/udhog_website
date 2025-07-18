import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "../context/TranslationContext";
import API from "../http";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const { t } = useTranslation();

  const fetchNews = async () => {
    try {
      const response = await API.get("/news");
      if (response.status === 200) {
        // Sort news by createdAt descending
        const sortedNews = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewsList(sortedNews);
      } else {
        console.error("Error fetching news");
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
      <div className="min-h-[calc(100vh-448px)] max-w-7xl mx-auto px-4 py-12">
        {!selectedNews ? (
          <>
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-blue-800">{t("news1") || "News"}</h1>
              <p className="text-gray-600 mt-2">{t("newsDetails") || "Latest updates and announcements"}</p>
            </div>

            {/* News Grid */}
            {newsList.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-300 p-8 flex flex-col justify-center items-center text-center">
                <p className="text-blue-600 font-semibold text-lg mb-2">
                  {t("noNews") || "No news articles have been posted yet."}
                </p>
                <p className="text-gray-600">
                  {t("checkBackSoon") || "Please check back soon. New updates and announcements will appear here."}
                </p>
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-14">

                {newsList.map((news) => (
                  <div
                    key={news.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="overflow-hidden group">
                      {news.imgUrl ? (
                        <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
                          <img
                            src={news.imgUrl}
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500 text-sm italic">
                          {t("noImage") || "No Image"}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{news.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {t("published") || "Published"}: {new Date(news.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => setSelectedNews(news)}
                          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
                        >
                          {t("readMore") || "Read More"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // Expanded news view
          <div className="space-y-6 mt-10 max-w-4xl mx-auto">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>{t("back") || "Back"}</span>
            </button>

            <h2 className="text-3xl font-bold text-gray-900">{selectedNews.title}</h2>

            <div className="border border-gray-300 rounded-xl p-6 bg-white flex justify-center items-center min-h-[200px] shadow-sm">
              {selectedNews.imgUrl ? (
                <img
                  src={selectedNews.imgUrl}
                  alt={selectedNews.title}
                  className="max-w-full h-auto sm:max-h-[500px] rounded-md"
                />
              ) : (
                <p className="text-gray-500 italic">{t("noImageUploaded") || "No image uploaded for this news."}</p>
              )}
            </div>

            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">{selectedNews.description}</p>

            <p className="text-sm text-gray-500 mt-4">
              {t("published") || "Published"}: {new Date(selectedNews.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default News;
