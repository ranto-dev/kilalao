import About from "../../components/about";
import FeedbackForm from "../../components/FeedbackForm";
import Footer from "../../components/footer";
import Hero from "../../components/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <FeedbackForm />
      <Footer />
    </div>
  );
}
