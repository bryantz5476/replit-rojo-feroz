import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import ServicesCarousel from "@/components/ServicesCarousel";
import Gallery from "@/components/Gallery";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background" data-testid="page-home">
      <Header />
      <Hero />
      <ValueProposition />
      <ServicesCarousel />
      <section id="galeria">
        <Gallery />
      </section>
      <FinalCTA />
      <Footer />
    </main>
  );
}
