import { useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import Footer from "./footer";
import Navbar from "./Navbar";
import API from "../http";
import { useLocation } from "react-router-dom";

const Company = () => {
  const { t } = useTranslation();
  const headers = t("companyTable");
  const [companies, setCompanies] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  const fetchTable = async () => {
    try {
      if (query) {
        // Fetch search results from backend API
        const response = await API.get(
          `/company/search?q=${encodeURIComponent(query)}`
        );

        if (
          response.status === 200 &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setCompanies(response.data);
          setNotFound(false);
        } else {
          setCompanies([]);
          setNotFound(true);
        }
      } else {
        const response = await API.get("/company");
        if (response.status === 200 && response.data.data) {
          setCompanies(response.data.data);
          setNotFound(false);
        } else {
          setCompanies([]);
          setNotFound(true);
        }
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
      setCompanies([]);
      setNotFound(true);
    }
  };

  useEffect(() => {
    fetchTable();
  }, [query]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {t("companyTitle")}
          </h2>
          <div className="overflow-x-auto pb-4">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg border-gray-300">
                <table className="table-auto min-w-full rounded-xl">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.sn}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.membershipNo}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.registrationNo}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900 min-w-[150px]">
                        {headers.nameAndEmail}
                      </th>
                       <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.address}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.orgType}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.industry}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.contactPerson}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.phoneNo}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.vat}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.pan}
                      </th>
                     
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.employees}
                      </th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-900">
                        {headers.renewStatus}
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-300">
                    {companies.length > 0 ? (
                      companies.map((company, index) => (
                        <tr
                          key={index}
                          className="bg-white transition-all duration-500 hover:bg-gray-50"
                        >
                          <td className="p-5">{index + 1}</td>
                          <td className="p-5">{company.membershipNo}</td>
                          <td className="p-5">{company.registrationNo}</td>
                          <td className="p-5">
                            <div className="flex flex-col">
                              <p className="text-sm">
                                {company.companyNameEng}
                              </p>
                              <p className="text-xs text-gray-400">
                                {company.email}
                              </p>
                            </div>
                          </td>
                          <td className="p-5">{company.address}</td>
                          <td className="p-5">{company.organizationType}</td>
                          <td className="p-5">{company.industryType}</td>
                          <td className="p-5">{company.contactPerson}</td>
                          <td className="p-5">{company.phoneNo}</td>
                          <td className="p-5">{company.vat || "-"}</td>
                          <td className="p-5">{company.pan || "-"}</td>
                          <td className="p-5">{company.numberOfEmployees}</td>
                          <td className="p-5">
                            {company.renewStatus === "Active" ? (
                              <span className="px-3 py-1 text-green-700 bg-green-100 rounded-full text-xs font-medium">
                                Active
                              </span>
                            ) : (
                              <span className="px-3 py-1 text-red-700 bg-red-100 rounded-full text-xs font-medium">
                                Inactive
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="13"
                          className="text-center p-12 text-gray-500 text-lg font-semibold italic bg-blue-50 rounded"
                        >
                          <svg
                            className="mx-auto mb-2 h-10 w-10 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 110-16 8 8 0 010 16z"
                            />
                          </svg>
                          No company information is available at the moment.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Company;
