import InfluencerManagementSidebar from "@/components/influencer/influencer-management/influencer-management-sidebar/influencer-management-sidebar";
import Footer from "@/components/ui/footer/footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function InfluencerManagementLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen max-w-full overflow-hidden">
        <InfluencerManagementSidebar />

        <main className="flex-1 relative overflow-auto">
          <SidebarTrigger className="absolute top-2 left-2 z-50" />
          <Outlet />
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  );
}
