import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Layout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />

      <div className="flex min-h-[calc(100vh-73px)]">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 px-4 py-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="사이드바 닫기"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <button
        type="button"
        onClick={() => navigate("/lp/new")}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-3xl font-bold text-white shadow-lg transition hover:bg-pink-400"
      >
        +
      </button>
    </div>
  );
}

export default Layout;