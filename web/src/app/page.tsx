import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import RoadmapDashboard from "@/components/dashboard/RoadmapDashboard";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] transition-colors duration-200">
      <Header />
      <main className="flex-1">
        <Hero />
        <RoadmapDashboard />
      </main>
      <Footer />
    </div>
  );
}
