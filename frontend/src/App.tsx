import { Route, Routes } from "react-router-dom";
import RecentAds from "./components/RecentsAds";
import Layout from "./pages/Layout";
import AboutPage from "./pages/AboutPage";
import AdDetails from "./pages/AdDetails";
import NewAdForm from "./pages/NewAdForm";
import AdbyCategory from "./pages/AdByCategory";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="ad/new" element={<NewAdForm />} />
        <Route path="ad/:id" element={<AdDetails />} />
        <Route path="category/:name" element={<AdbyCategory />} />
      </Route>
    </Routes>
  );
};

export default App;
