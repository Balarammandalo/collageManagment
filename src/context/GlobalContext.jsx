import { createContext, useContext, useMemo, useState } from "react";
import {
  mockActivity,
  mockBooks,
  mockCandidates,
  mockExpenseTrend,
  mockExpenses,
  mockSchedule,
  mockStaff,
  mockStudents,
} from "../data/mockData";

const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [students, setStudents] = useState(mockStudents);
  const [staff, setStaff] = useState(mockStaff);
  const [activity, setActivity] = useState(mockActivity);
  const [books, setBooks] = useState(mockBooks);
  const [expenses, setExpenses] = useState(mockExpenses);
  const [expenseTrend] = useState(mockExpenseTrend);
  const [schedule] = useState(mockSchedule);
  const [attendanceByStudentId, setAttendanceByStudentId] = useState(() => {
    const initial = {};
    for (const s of mockStudents) initial[s.id] = "Present";
    return initial;
  });
  const [ballot, setBallot] = useState({ selectedCandidateId: null, submitted: false });

  const staffPresentCount = useMemo(
    () => staff.filter((s) => s.status === "present").length,
    [staff]
  );

  const addActivity = (item) => {
    setActivity((prev) => [{ id: `A-${Date.now()}`, ...item }, ...prev].slice(0, 12));
  };

  const addStudent = (student) => {
    const id = `STU-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent = {
      id,
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=13",
      ...student,
    };
    setStudents((prev) => [newStudent, ...prev]);
    addActivity({
      title: "New Student Added",
      description: `${newStudent.name} added to ${newStudent.department}`,
      time: "Just now",
    });
  };

  const updateStudent = (id, updates) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    addActivity({
      title: "Student Updated",
      description: `Profile updated for ${updates?.name ?? "student"}`,
      time: "Just now",
    });
  };

  const issueBook = ({ bookId, studentId }) => {
    setBooks((prev) => {
      const next = prev.map((b) =>
        b.id === bookId ? { ...b, status: "Issued", issuedToStudentId: studentId } : b
      );
      return next;
    });

    const student = students.find((s) => s.id === studentId);
    const bookTitle = books.find((b) => b.id === bookId)?.title ?? "Book";
    addActivity({
      title: "Book Issued",
      description: `\"${bookTitle}\" issued to ${student?.name ?? "student"}`,
      time: "Just now",
    });
  };

  const returnBook = (bookId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId ? { ...b, status: "Available", issuedToStudentId: null } : b
      )
    );
    addActivity({
      title: "Book Returned",
      description: `Book ${bookId} marked as returned`,
      time: "Just now",
    });
  };

  const markAttendance = ({ studentId, status }) => {
    setAttendanceByStudentId((prev) => ({ ...prev, [studentId]: status }));
  };

  const addExpense = (expense) => {
    const id = `EX-${Date.now()}`;
    const newExpense = { id, ...expense };
    setExpenses((prev) => [newExpense, ...prev]);
    addActivity({
      title: "Expense Added",
      description: `Expense of ₹${newExpense.amount} recorded`,
      time: "Just now",
    });
  };

  const setSelectedCandidate = (candidateId) => {
    setBallot((prev) => ({ ...prev, selectedCandidateId: candidateId }));
  };

  const submitVote = () => {
    setBallot((prev) => {
      const selected = prev.selectedCandidateId;
      const candidate = mockCandidates.find((c) => c.id === selected);
      addActivity({
        title: "Vote Submitted",
        description: `Vote submitted for ${candidate?.name ?? "candidate"}`,
        time: "Just now",
      });
      return { ...prev, submitted: true };
    });
  };

  const totalBalance = useMemo(() => {
    const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const base = 250000;
    return base - totalSpent;
  }, [expenses]);

  const expenseByCategory = useMemo(() => {
    const out = {};
    for (const e of expenses) {
      out[e.category] = (out[e.category] || 0) + Number(e.amount || 0);
    }
    return out;
  }, [expenses]);

  const averageAttendance = useMemo(() => {
    const values = Object.values(attendanceByStudentId);
    if (values.length === 0) return 0;
    const score = values.reduce((acc, v) => acc + (v === "Present" ? 1 : v === "Late" ? 0.75 : 0), 0);
    return Math.round((score / values.length) * 100);
  }, [attendanceByStudentId]);

  const value = {
    students,
    staff,
    activity,
    books,
    expenses,
    expenseTrend,
    schedule,
    attendanceByStudentId,
    ballot,
    candidates: mockCandidates,
    staffPresentCount,
    totalBalance,
    expenseByCategory,
    averageAttendance,
    addStudent,
    updateStudent,
    issueBook,
    returnBook,
    markAttendance,
    addExpense,
    setSelectedCandidate,
    submitVote,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function useGlobalContext() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobalContext must be used within GlobalProvider");
  return ctx;
}
