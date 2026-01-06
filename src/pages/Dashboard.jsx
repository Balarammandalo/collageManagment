import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Receipt,
  Users,
} from "lucide-react";
import { useGlobalContext } from "../context/GlobalContext";
import Card from "../components/UI/Card";

function ProgressBar({ value }) {
  return (
    <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
      <div
        className="h-2 rounded-full bg-blue-600"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export default function Dashboard() {
  const { students, staff, staffPresentCount, activity } = useGlobalContext();
  const staffPct = staff.length ? Math.round((staffPresentCount / staff.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-500">Good Afternoon</div>
          <div className="mt-1 text-2xl font-bold text-gray-900">Admin Dashboard</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-semibold text-gray-900">Admin</div>
            <div className="text-xs font-medium text-gray-500">College Operations</div>
          </div>
          <div className="h-11 w-11 overflow-hidden rounded-full bg-blue-100">
            <img
              src="https://i.pravatar.cc/100?img=3"
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-500">Total Students</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{students.length}</div>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-gray-500">
            Updated from global state.
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-500">Staff Present</div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-bold text-gray-900">{staffPresentCount}</div>
                <div className="pb-1 text-sm font-semibold text-gray-500">/ {staff.length}</div>
              </div>
              <ProgressBar value={staffPct} />
              <div className="mt-2 text-xs font-medium text-gray-500">{staffPct}% present</div>
            </div>
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <Users size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-500">Quick Overview</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">Today</div>
              <div className="mt-1 text-sm font-medium text-gray-500">
                Attendance, library and expenses in one place.
              </div>
            </div>
            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
              <BookOpen size={20} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="text-base font-semibold text-gray-900">Quick Actions</div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Student Mgmt",
              to: "/students",
              icon: Users,
              tone: "bg-blue-50 text-blue-700",
            },
            {
              label: "Library",
              to: "/library",
              icon: BookOpen,
              tone: "bg-purple-50 text-purple-700",
            },
            {
              label: "Attendance",
              to: "/attendance",
              icon: CalendarDays,
              tone: "bg-green-50 text-green-700",
            },
            {
              label: "Expenses",
              to: "/expenses",
              icon: Receipt,
              tone: "bg-yellow-50 text-yellow-700",
            },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.to}
                to={a.to}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`inline-flex rounded-xl p-3 ${a.tone}`}>
                  <Icon size={20} />
                </div>
                <div className="mt-3 text-sm font-semibold text-gray-900">{a.label}</div>
                <div className="mt-1 flex items-center gap-1 text-xs font-medium text-gray-500">
                  View
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-gray-900">Recent Activity</div>
          <Link to="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>

        <div className="mt-4 space-y-4">
          {activity.slice(0, 6).map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-blue-600" />
              <div className="flex-1 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                <div className="mt-1 text-sm font-medium text-gray-500">{item.description}</div>
                <div className="mt-2 text-xs font-semibold text-gray-400">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
