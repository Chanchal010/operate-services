import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AboutUsView } from '@/components/career/AboutUsView';

export const metadata: Metadata = {
  title: 'About Us | OperateServices',
  description:
    'Our People Are Everything. Learn about OperateServices leadership, company history, diversity, equity & inclusion initiatives, corporate social responsibility, and military affairs.',
  openGraph: {
    title: 'About Us | OperateServices',
    description:
      'Learn about OperateServices leadership, company history, DEI initiatives, and military affairs.',
    url: 'https://operateservices.com/about-us',
    siteName: 'OperateServices',
    type: 'website',
  },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#081C31]">
      <Header />
      <main id="main-content" className="flex-1">
        <AboutUsView />
      </main>
      <Footer />
    </div>
  );
}
