import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocationsView } from '@/components/career/LocationsView';

export const metadata: Metadata = {
  title: 'Office Locations | OperateServices',
  description:
    'Find an OperateServices recruiting office near you across the United States, Canada, and the United Kingdom. Over 200 local staffing hubs ready to assist.',
  openGraph: {
    title: 'Office Locations | OperateServices',
    description:
      'Find an OperateServices recruiting office near you across the United States, Canada, and the United Kingdom.',
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
