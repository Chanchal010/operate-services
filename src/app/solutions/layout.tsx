import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workforce & Industrial Staffing Solutions | OperateServices',
  description:
    'Custom workforce management, on-premise coordination, and specialized skilled trades staffing solutions tailored to industrial facility operations.',
  alternates: {
    canonical: 'https://operateservices.com/solutions',
  },
  openGraph: {
    title: 'Workforce & Industrial Staffing Solutions | OperateServices',
    description:
      'Custom workforce management, on-premise coordination, and specialized skilled trades staffing solutions tailored to industrial facility operations.',
    url: 'https://operateservices.com/solutions',
    siteName: 'OperateServices',
    type: 'website',
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
