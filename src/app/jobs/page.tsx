import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JobsPortalView } from '@/components/career/JobsPortalView';

export const metadata: Metadata = {
  title: 'Search Industrial & Skilled Trades Jobs | OperateServices',
  description:
    'Search open jobs across aviation, CNC machining, welding, electrical, maintenance, warehousing, and logistics with OperateServices. Apply today.',
  alternates: {
    canonical: 'https://operateservices.com/jobs',
  },
  openGraph: {
    title: 'Search Industrial & Skilled Trades Jobs | OperateServices',
    description:
      'Search open jobs across aviation, CNC machining, welding, electrical, maintenance, warehousing, and logistics with OperateServices. Apply today.',
    url: 'https://operateservices.com/jobs',
    siteName: 'OperateServices',
    type: 'website',
  },
};

export default function JobsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#081C31]">
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[500px] flex items-center justify-center bg-[#F8FAFC]">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00558C]" />
            </div>
          }
        >
          <JobsPortalView />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
