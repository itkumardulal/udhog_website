import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Notice from "./component/Notice";
import { TranslationProvider } from "./context/TranslationContext";
import News from "./component/News";
import DisplayMessage from "./component/DisplayMessage";
import MessageView from "./component/history/MessageView";
import NewHistory from "./component/history/NewHistory";
import ServicesPage from "./pages/ServicePage";
import Company from "./component/Company";
import ScrollToTop from "./component/ScrollTop";
import Branch from "./component/branches/Branches";
import Loader from "./component/loader/Loader";
import WhyMembership from "./component/Membership";



const AppRoutes = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const excludedRoutes = ["/", "/contact", "/about"];

  useEffect(() => {

    if (excludedRoutes.includes(location.pathname)) return;

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && !excludedRoutes.includes(location.pathname) && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/notices" element={<Notice />} />
        <Route path="/news" element={<News />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/history" element={<NewHistory />} />
        <Route path="/message" element={<DisplayMessage />} />
        <Route path="/view-message" element={<MessageView />} />
        <Route path="/table" element={<Company />} />
        <Route path="/choose-us" element={<WhyMembership/>} />
        {/* <Route path="/branch/:branchName" element={<Branch />} /> */}
      </Routes>
    </>
  );
};


function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </TranslationProvider>
  );
}

export default App;
