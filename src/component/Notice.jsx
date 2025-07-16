import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import { useTranslation } from "../context/TranslationContext";
import API from "../http";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notice() {
  const [notices, setNotices] = useState([]);
  const { t } = useTranslation();
  const [selectedNotice, setSelectedNotice] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await API.get("/notices");
      if (response.status === 200) {
        setNotices(response.data.data);
      } else {
        console.log("Something went wrong");
      }
    } catch (err) {
      console.log("Error fetching notices", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDownload = (url, filename = "notice.pdf") => {
    if (!url) {
      toast.error("No file available to download");
      return;
    }

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(() => {
        toast.error("Error downloading file");
      });
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex flex-col min-h-[calc(100vh-448px)] px-4 py-8 max-w-7xl mx-auto w-full">
        {!selectedNotice ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {t("noticeBoard")}
              </h1>
              <p className="text-base text-gray-600 mt-2">
                {t("noticeDetails")}
              </p>
            </div>

            <div className="space-y-6 flex-grow overflow-auto">
              {notices.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 flex flex-col justify-center items-center text-center">
                  <p className="text-blue-600 font-semibold text-lg mb-2">
                    No notices have been posted yet.
                  </p>
                  <p className="text-gray-600">
                    Please check back soon. New updates and announcements will
                    appear here.
                  </p>
                </div>
              ) : (
                notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-300 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedNotice(notice)}
                  >
                    <div className="mb-4 sm:mb-0">
                      <p className="text-lg sm:text-xl font-semibold text-gray-900">
                        {notice.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {t("published")}:{" "}
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(
                          notice.pdfUrl,
                          notice.pdfName || "notice.pdf"
                        );
                      }}
                      className="hover:text-blue-600"
                      title={t("download")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 16a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 1 1 2 0v8.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-5 5A1 1 0 0 1 12 16ZM4 20a1 1 0 0 1 0-2h16a1 1 0 1 1 0 2H4Z" />
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
              onClick={() => setSelectedNotice(null)}
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
              {selectedNotice.title}
            </h2>

            <div className="border border-gray-300 rounded-lg p-4 sm:p-6 bg-gray-50 flex justify-center">
              {selectedNotice.fileType === "image" ? (
                <img
                  src={selectedNotice.pdfUrl}
                  alt={selectedNotice.title}
                  className="max-w-full h-auto sm:max-h-[500px]"
                />
              ) : (
                <iframe
                  src={selectedNotice.pdfUrl}
                  className="w-full h-[400px] sm:h-[500px]"
                  title="Notice File"
                />
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() =>
                  handleDownload(
                    selectedNotice.pdfUrl,
                    selectedNotice.pdfName || "notice.pdf"
                  )
                }
                className="px-4 py-2 flex items-center space-x-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 16a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 1 1 2 0v8.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-5 5A1 1 0 0 1 12 16ZM4 20a1 1 0 0 1 0-2h16a1 1 0 1 1 0 2H4Z" />
                </svg>
                <span>{t("download")}</span>
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              {t("published")}:{" "}
              {new Date(selectedNotice.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Notice;
