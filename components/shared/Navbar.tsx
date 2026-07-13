"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Search Box */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search candidates, jobs..."
            className="w-72 rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Notification */}
        <button className="rounded-full p-2 hover:bg-gray-100 transition">
          <Bell size={22} />
        </button>

        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          TV
        </div>
      </div>
    </header>
  );
}