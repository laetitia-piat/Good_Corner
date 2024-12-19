import { Route, Routes } from "react-router-dom";
import RecentAds from "./components/RecentsAds";
import Layout from "./pages/Layout";
import AboutPage from "./pages/AboutPage";
import AdDetails from "./pages/AdDetails";
import AdbyCategory from "./pages/AdByCategory";
import UpdateAd from "./pages/UpdateAd";
import NewCategoryFormPage from "./pages/NewCategoryForm";
import AdSearchPage from "./pages/AdSearchPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestNewAdForm from "./pages/NewAdForm";
import AdTagsFetch from "./components/AdTagsFetch";
import SingleFileUploader from "./pages/TestFileUpload";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecentAds />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="ad/new" element={<TestNewAdForm />} />
          <Route path="ad/search/:keyword" element={<AdSearchPage />} />
          <Route path="ad/:id" element={<AdDetails />} />
          <Route path="ad/:id/update" element={<UpdateAd />} />
          <Route path="category/new" element={<NewCategoryFormPage />} />
          <Route path="category/:name" element={<AdbyCategory />} />
          <Route path="test" element={<AdTagsFetch />} />
          <Route path="testimg" element={<SingleFileUploader />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
