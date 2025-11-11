import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import LiveLoginTicker from "@/components/LiveLoginTicker";

export default function Home() {
  return (
    <div>
      <Header />
      <LandingPage />
      <LiveLoginTicker />
      <Footer />
    </div>
  );
}
