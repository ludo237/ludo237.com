import { cookies } from 'next/headers';

import type { FC, ReactNode } from 'react';
import { MainSidebar } from '~/components/main-sidebar';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <MainSidebar />
      <main className='mx-auto w-full max-w-(--breakpoint-lg) p-3'>
        <div className='flex items-center space-x-3 pb-3'>
          <SidebarTrigger />
          <p>Temporary Email as a Service</p>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
