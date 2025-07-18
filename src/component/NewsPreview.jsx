
import React, { useEffect, useState } from "react";
import API from "../http";
import { useTranslation } from "../context/TranslationContext";
import { useNavigate } from "react-router-dom";

const NewsPreview = () => {
  const navigate = useNavigate();
  const [latestNews, setLatestNews] = useState([]);
  const [newsFetched, setNewsFetched] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const { t } = useTranslation();

  const fetchLatestNews = async () => {
    try {
      const response = await API.get("/news");
      setNewsFetched(true);
      if (response.status === 200 && response.data.data.length > 0) {
        const sortedNews = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestNews(sortedNews.slice(0, 2));
      }
    } catch (error) {
      console.error("Error fetching latest news:", error);
      setNewsFetched(true);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, []);

  if (!newsFetched) return null;

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-4 sm:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-blue-800">
          {t("news1") || "Latest News"}
        </h2>
      </div>

      {/* News Cards Grid */}
      <div className="max-w-7xl mx-auto">
        {latestNews.length > 0 && !expanded ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {latestNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
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
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {t("published")}:{" "}
                        {new Date(news.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => setExpanded(news)}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
                      >
                        {t("readMore")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="w-full flex justify-end mt-10">
              <button
                onClick={() => navigate("/news")}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-200 hover:cursor-pointer"
              >
                {t("viewMore")}
              </button>
            </div>
          </>
        ) : latestNews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-300 p-8 flex flex-col justify-center items-center text-center">
            <p className="text-blue-600 font-semibold text-lg mb-2">
              No news has been posted yet.
            </p>
            <p className="text-gray-600">
              Please check back soon. New updates and announcements will appear
              here.
            </p>
          </div>
        ) : null}

        {/* Expanded View */}
        {expanded && (
          <div className="space-y-6 mt-10">
            <button
              onClick={() => setExpanded(null)}
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

            <h2 className="text-3xl font-bold text-gray-900">
              {expanded.title}
            </h2>

            <div className="border border-gray-300 rounded-xl p-6 bg-white flex justify-center items-center min-h-[200px] shadow-sm">
              {expanded.imgUrl ? (
                <img
                  src={expanded.imgUrl}
                  alt={expanded.title}
                  className="max-w-full h-auto sm:max-h-[500px] rounded-md"
                />
              ) : (
                <p className="text-gray-500 italic">
                  No image uploaded for this news.
                </p>
              )}
            </div>

            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {expanded.description}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              {t("published")}:{" "}
              {new Date(expanded.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPreview;

