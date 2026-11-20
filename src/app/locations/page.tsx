import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocationsView } from '@/components/career/LocationsView';

export const metadata: Metadata = {
  title: 'Office Locations | OperateServices',
  description:
    'Find an OperateServices staffing and recruiting office near you across the United States. Over 200 local branches ready to assist your workforce.',
  alternates: {
    canonical: 'https://operateservices.com/locations',
  },
  openGraph: {
    title: 'Office Locations | OperateServices',
    description:
      'Find an OperateServices staffing and recruiting office near you across the United States. Over 200 local branches ready to assist your workforce.',
    url: 'https://operateservices.com/locations',
    siteName: 'OperateServices',
    type: 'website',
  },
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#081C31]">
      <Header />
      <main id="main-content" className="flex-1">
        <LocationsView />
      </main>
      <Footer />
    </div>
  );
}
