import HeroSection from '@/components/landing-page/HeroSection';
import FeaturesSection from '@/components/landing-page/FeaturesSection';
import HowItWorksSection from '@/components/landing-page/HowItWorksSection';
import CallToActionSection from '@/components/landing-page/CallToActionSection';
import Footer from '@/components/landing-page/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
