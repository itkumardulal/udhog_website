import React, { useEffect, useState } from "react";
import API from "../http";
import { useTranslation } from "../context/TranslationContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NoticePreview = () => {
  const [notices, setNotices] = useState([]);
  const [noticesFetched, setNoticesFetched] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fetchNotices = async () => {
    try {
      const response = await API.get("/notices");
      setNoticesFetched(true);
      if (response.status === 200) {
        const sorted = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotices(sorted.slice(0, 2)); // Only top 2
      }
    } catch (err) {
      console.error("Error fetching notices", err);
      setNoticesFetched(true);
    }
  };

  const handleDownload = (url, filename = "notice.pdf") => {
    if (!url) {
      toast.error("No file available to download", {
        position: "top-right",
        autoClose: 3000,
      });
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
        toast.error("Error downloading file", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  if (!noticesFetched) return null;

  return (
    <div className="w-full bg-gray-100 py-10 px-4 sm:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          {t("noticeBoard") || "Latest Notices"}
        </h2>
        <p className="text-base text-gray-600 mt-2">
          {t("noticeDetails") }
        </p>
      </div>

      {/* Notice Cards */}
      <div className="max-w-7xl mx-auto space-y-6">
        {notices.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 flex flex-col justify-center items-center text-center">
            <p className="text-blue-600 font-semibold text-lg mb-2">
              No notices have been posted yet.
            </p>
            <p className="text-gray-600">
              Please check back soon for updates and announcements.
            </p>
          </div>
        ) : (
          <>
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-lg shadow-sm border border-gray-300 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 transition-colors"
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

                {/* Download Button */}
                <button
                  onClick={() =>
                    handleDownload(
                      notice.pdfUrl,
                      notice.pdfName || "notice.pdf"
                    )
                  }
                  className="hover:text-blue-600  hover:cursor-pointer"
                  title={t("download") || "Download"}
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
            ))}

            {/* View More Button */}
            <div className="w-full flex justify-end">
              <button
                onClick={() => navigate("/notices")}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 hover:cursor-pointer "
              >
                {t("viewMore")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoticePreview;
