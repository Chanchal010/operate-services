import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CareerOpportunitiesView } from '@/components/career/CareerOpportunitiesView';

export const metadata: Metadata = {
  title: 'Career Opportunities | OperateServices',
  description:
    'Explore industrial, manufacturing, aviation, and skilled trades careers with OperateServices. Enjoy weekly pay, great benefits, and dedicated recruiters.',
  alternates: {
    canonical: 'https://operateservices.com/careers',
  },
  openGraph: {
    title: 'Career Opportunities | OperateServices',
    description:
      'Explore industrial, manufacturing, aviation, and skilled trades careers with OperateServices. Enjoy weekly pay, great benefits, and dedicated recruiters.',
    url: 'https://operateservices.com/careers',
    siteName: 'OperateServices',
    type: 'website',
  },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#081C31]">
      <Header />
      <main id="main-content" className="flex-1">
        <CareerOpportunitiesView />
      </main>
      <Footer />
    </div>
  );
}
