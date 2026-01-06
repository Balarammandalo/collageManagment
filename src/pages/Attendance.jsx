import { useMemo } from "react";
import { CalendarDays, Check, Clock3, X } from "lucide-react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";
import { useGlobalContext } from "../context/GlobalContext";

function AttendanceRing({ value }) {
  const radius = 44;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="block">
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#2563eb"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-gray-900 text-sm font-bold"
      >
        {value}%
      </text>
    </svg>
  );
}

export default function Attendance() {
  const { students, schedule, attendanceByStudentId, markAttendance, averageAttendance } =
    useGlobalContext();

  const rows = useMemo(() => {
    return students.map((s) => ({
      ...s,
      attendance: attendanceByStudentId[s.id] || "Absent",
    }));
  }, [students, attendanceByStudentId]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">Attendance Tracker</div>
          <div className="mt-1 text-sm font-medium text-gray-500">
            Mark attendance as Present, Absent or Late.
          </div>
        </div>
        <div className="hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm sm:flex">
          <CalendarDays size={18} className="text-blue-600" />
          <div>
            <div className="text-xs font-semibold text-gray-500">Today</div>
            <div className="text-sm font-bold text-gray-900">Schedule</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <div className="text-sm font-semibold text-gray-500">Average Attendance</div>
          <div className="mt-4 flex items-center gap-4">
            <AttendanceRing value={averageAttendance} />
            <div>
              <div className="text-base font-bold text-gray-900">{averageAttendance}%</div>
              <div className="mt-1 text-sm font-medium text-gray-500">
                Based on today’s marking.
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="text-sm font-semibold text-gray-500">Today’s Schedule</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {schedule.map((s) => (
              <div
                key={`${s.time}-${s.subject}`}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
              >
                <div className="text-xs font-semibold text-gray-500">{s.time}</div>
                <div className="mt-1 text-sm font-bold text-gray-900">{s.subject}</div>
                <div className="mt-1 text-xs font-medium text-gray-500">Room {s.room}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="text-base font-semibold text-gray-900">Mark Attendance</div>
        <div className="mt-4 space-y-3">
          {rows.map((s) => (
            <div
              key={s.id}
              className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <img src={s.avatar} alt={s.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{s.name}</div>
                  <div className="text-xs font-medium text-gray-500">{s.rollNo}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  tone={
                    s.attendance === "Present"
                      ? "green"
                      : s.attendance === "Late"
                        ? "yellow"
                        : "red"
                  }
                >
                  {s.attendance}
                </Badge>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={s.attendance === "Present" ? "primary" : "outline"}
                    onClick={() => markAttendance({ studentId: s.id, status: "Present" })}
                  >
                    <Check size={16} />
                    <span className="ml-1">Present</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={s.attendance === "Absent" ? "danger" : "outline"}
                    onClick={() => markAttendance({ studentId: s.id, status: "Absent" })}
                  >
                    <X size={16} />
                    <span className="ml-1">Absent</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={s.attendance === "Late" ? "secondary" : "outline"}
                    onClick={() => markAttendance({ studentId: s.id, status: "Late" })}
                  >
                    <Clock3 size={16} />
                    <span className="ml-1">Late</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
