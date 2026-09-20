import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav"

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-black">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <Header />

          <main className="mx-auto max-w-[1400px] px-4 pb-24 pt-6 sm:px-5 md:px-8 md:py-8 md:pb-8">
            {children}
          </main>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}