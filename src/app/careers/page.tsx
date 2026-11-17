import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CareerOpportunitiesView } from '@/components/career/CareerOpportunitiesView';

export const metadata: Metadata = {
  title: 'Career Opportunities | OperateServices',
  description:
    'Explore industrial, skilled trades, manufacturing, aviation, logistics, and corporate careers with OperateServices. Weekly pay, comprehensive benefits, and dedicated local recruiters.',
  openGraph: {
    title: 'Career Opportunities | OperateServices',
    description:
      'Explore industrial, skilled trades, manufacturing, aviation, logistics, and corporate careers with OperateServices.',
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
