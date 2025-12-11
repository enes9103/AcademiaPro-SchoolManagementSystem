"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative flex h-screen overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0" />

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative z-10 flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="pb-6">
          <div className="mx-auto px-4 pt-4 md:px-8 md:pt-6">
            {children}
            <Toaster />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
