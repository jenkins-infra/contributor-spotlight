import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/Hero";
import ContributorsPage from "./components/pages/contributorPage";
import Footer from "./components/layout/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ContributorsPage />
      <Footer />
    </>
  );
}

export default App;