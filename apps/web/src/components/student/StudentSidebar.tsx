"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface Enrollment {
  courseType: string;
  courseName: string;
  enrolledAt: string;
}

interface Props {
  user: User;
  enrollment?: Enrollment;
}

// Custom Academy Icons - unique to AI Launchpad
const AcademyIcons = {
  // Dashboard - Progress grid with rocket accent
  dashboard: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M17.5 14L17.5 17M17.5 17L17.5 21M17.5 17L14 17M17.5 17L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="17.5" cy="17" r="1" fill="currentColor"/>
    </svg>
  ),
  // Courses - Video play with curriculum lines
  courses: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 9L15 11.5L10 14V9Z" fill="currentColor"/>
      <path d="M6 21H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 21V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 21V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  // Templates - Layered documents with AI sparkle
  templates: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M8 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14C15.1046 21 16 20.1046 16 19V16" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8" y="1" width="13" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 6H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 18L20.5 19.5L22 20L20.5 20.5L20 22L19.5 20.5L18 20L19.5 19.5L20 18Z" fill="currentColor"/>
    </svg>
  ),
  // Config - Code brackets with circuit nodes
  config: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M8 6L3 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6L21 12L16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
      <path d="M12 9.5V14.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  // Logout - Exit with motion trail
  logout: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M14 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 12H4M4 12L7 9M4 12L7 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M11 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
};

const navigation = [
  {
    name: "Dashboard",
    href: "/academy/dashboard",
    icon: AcademyIcons.dashboard,
  },
  {
    name: "My Courses",
    href: "/academy/learn/module-0/0.1",
    icon: AcademyIcons.courses,
  },
  {
    name: "Templates",
    href: "/academy/resources/templates",
    icon: AcademyIcons.templates,
  },
  {
    name: "Config Files",
    href: "/academy/resources/config",
    icon: AcademyIcons.config,
  },
];

export default function StudentSidebar({ user, enrollment }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/student/login" });
  };

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border-subtle z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image
            src="/academy-logo.svg"
            alt="AI Launchpad Academy"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="font-semibold text-accent" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            AI Launchpad
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-elevated transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-surface border-r border-border-subtle z-50 transform transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-4 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <Image
                src="/academy-logo.svg"
                alt="AI Launchpad Academy"
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <span className="font-bold text-lg block leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  AI Launchpad
                </span>
                <span className="text-xs text-accent">Academy</span>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="px-4 py-4 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium">
                {user.name?.charAt(0) || user.email?.charAt(0) || "S"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user.name || "Student"}
                </p>
                <p className="text-xs text-text-muted truncate">{user.email}</p>
              </div>
            </div>
            {enrollment && (
              <div className="mt-3 px-3 py-2 rounded-lg bg-accent/10 text-xs">
                <p className="text-accent font-medium">{enrollment.courseName}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:bg-elevated hover:text-text-primary"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border-subtle">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-elevated hover:text-text-primary transition-colors"
            >
              {AcademyIcons.logout}
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
