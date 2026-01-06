import { NavLink } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  Receipt,
  Users,
  Vote,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Students", to: "/students", icon: Users },
  { label: "Library", to: "/library", icon: BookOpen },
  { label: "Attendance", to: "/attendance", icon: CalendarDays },
  { label: "Expenses", to: "/expenses", icon: Receipt },
  { label: "Voting", to: "/voting", icon: Vote },
];

function NavItem({ item, variant }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      className={({ isActive }) => {
        const active = isActive
          ? "bg-blue-50 text-blue-700"
          : "text-gray-700 hover:bg-gray-100";

        if (variant === "mobile") {
          return `flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium ${active}`;
        }

        return `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${active}`;
      }}
    >
      <Icon size={18} />
      <span>{item.label}</span>
    </NavLink>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex h-full flex-col bg-white px-5 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-blue-600">College</div>
              <div className="text-xs font-medium text-gray-500">Management System</div>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full bg-blue-100">
              <img
                src="https://i.pravatar.cc/100?img=3"
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </div>

          <div className="mt-auto rounded-2xl bg-blue-600 px-4 py-4 text-white shadow-sm">
            <div className="text-sm font-semibold">Royal Blue UI</div>
            <div className="mt-1 text-xs text-white/80">
              Mobile-first layout with sidebar + bottom navigation.
            </div>
          </div>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <div className="text-base font-bold text-blue-600">College</div>
              <div className="text-xs font-medium text-gray-500">Management System</div>
            </div>
            <div className="h-9 w-9 overflow-hidden rounded-full bg-blue-100">
              <img
                src="https://i.pravatar.cc/100?img=3"
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 lg:px-8 lg:pb-10">
          {children}
        </main>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-2 py-2">
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} variant="mobile" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
