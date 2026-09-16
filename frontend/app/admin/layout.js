'use client';

import { usePathname } from 'next/navigation';
import BackButton from '../../components/BackButton';

export default function Layout({ children }) {
  const pathname = usePathname();
  const backTarget = (pathname === '/admin/AllButton' || pathname === '/admin/Auth') ? '/Pages/main' : null;
  const hideTopLeftButton = pathname === '/admin/createSlot';

  return (
    <div className="relative min-h-screen">
      {!hideTopLeftButton && (
        <div className="absolute top-6 left-6 z-50">
          <BackButton targetPath={backTarget} />
        </div>
      )}
      {children}
    </div>
  );
}
