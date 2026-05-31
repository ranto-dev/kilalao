import About from "../../components/about";
import FAQ from "../../components/FAQ";
import FeedbackForm from "../../components/FeedbackForm";
import Footer from "../../components/footer";
import Hero from "../../components/hero";
import Testimonials from "../../components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <FAQ />
      <Testimonials />
      <FeedbackForm />
      <Footer />
    </div>
  );
}
