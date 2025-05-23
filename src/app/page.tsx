import HeroSection from '@/components/landing-page/hero-section';
import FeaturesSection from '@/components/landing-page/features-section';
import HowItWorksSection from '@/components/landing-page/how-it-work-section';
import CallToActionSection from '@/components/landing-page/call-to-action-section';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from '@/components/layout/footer';

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) redirect('/dashboard');

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
