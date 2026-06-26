import About from "../../components/About";
import FAQ from "../../components/FAQ";
import FeedbackForm from "../../components/FeedbackForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Testimonials from "../../components/Testimonials";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <FAQ />
      <Testimonials />
      <FeedbackForm />
      <Footer />
    </div>
  );
}
