import { MainSidebar } from '~/components/main-sidebar';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
