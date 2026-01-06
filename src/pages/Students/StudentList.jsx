import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useGlobalContext } from "../../context/GlobalContext";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Badge from "../../components/UI/Badge";

const tabs = [
  { key: "all", label: "All" },
  { key: "Computer Science", label: "CS" },
  { key: "Electrical", label: "Electrical" },
  { key: "Mechanical", label: "Mechanical" },
];

export default function StudentList() {
  const { students } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter((s) => {
      const inTab = tab === "all" ? true : s.department === tab;
      const inSearch =
        q.length === 0 ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.rollNo || "").toLowerCase().includes(q);
      return inTab && inSearch;
    });
  }, [students, tab, query]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">Student Management</div>
          <div className="mt-1 text-sm font-medium text-gray-500">
            Search, filter by department and edit profiles.
          </div>
        </div>
        <Link to="/students/add">
          <Button>
            <Plus size={16} />
            <span className="ml-2">Add Student</span>
          </Button>
        </Link>
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email or roll no"
              className="pl-9"
            />
          </div>

          <div className="flex rounded-xl border border-gray-200 bg-white p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  tab === t.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="h-11 w-11 flex-none rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">{s.name}</div>
                  <div className="truncate text-xs font-medium text-gray-500">
                    {s.rollNo} · {s.department}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <div className="text-xs font-semibold text-gray-500">Status</div>
                  <Badge tone={s.status === "Active" ? "green" : "gray"}>{s.status}</Badge>
                </div>
                <Link to={`/students/edit/${encodeURIComponent(s.id)}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
              </div>
            </div>
          ))}

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
              <div className="text-sm font-semibold text-gray-900">No students found</div>
              <div className="mt-1 text-sm font-medium text-gray-500">
                Try a different search or department tab.
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
