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
import NewAdForm from "./pages/NewAdForm";
import AdTagsFetch from "./components/AdTagsFetch";
import SingleFileUploader from "./pages/TestFileUpload";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecentAds />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="ad/new" element={<NewAdForm />} />
          <Route path="ad/search/:keyword" element={<AdSearchPage />} />
          <Route path="ad/:id" element={<AdDetails />} />
          <Route path="ad/:id/update" element={<UpdateAd />} />
          <Route path="category/new" element={<NewCategoryFormPage />} />
          <Route path="category/:name" element={<AdbyCategory />} />
          <Route path="test" element={<AdTagsFetch />} />
          <Route path="testimg" element={<SingleFileUploader />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="confirm/:code?" element={<ConfirmEmailPage />} />
          <Route path="forgotPassword" element={<ForgotPasswordPage />} />
          <Route
            path="changePassword/:code?"
            element={<ChangePasswordPage />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
