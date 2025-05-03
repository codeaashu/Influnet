import { Outlet } from "react-router-dom";

import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer/footer";

const PublicLayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
