import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AboutUsView } from '@/components/career/AboutUsView';

export const metadata: Metadata = {
  title: 'About Us | OperateServices',
  description:
    'Learn about OperateServices leadership, company history, culture, diversity initiatives, corporate responsibility, and military veteran programs.',
  alternates: {
    canonical: 'https://operateservices.com/about-us',
  },
  openGraph: {
    title: 'About Us | OperateServices',
    description:
      'Learn about OperateServices leadership, company history, culture, diversity initiatives, corporate responsibility, and military veteran programs.',
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
