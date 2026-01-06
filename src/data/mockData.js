export const mockStudents = [
  {
    id: "STU-1001",
    name: "Aarav Sharma",
    dob: "2004-06-18",
    gender: "Male",
    email: "aarav.sharma@college.edu",
    phone: "+91 98765 43210",
    department: "Computer Science",
    year: "3rd Year",
    section: "A",
    rollNo: "CS-301",
    address: "Sector 21, Chandigarh",
    avatar: "https://i.pravatar.cc/100?img=12",
    status: "Active",
  },
  {
    id: "STU-1002",
    name: "Diya Patel",
    dob: "2005-02-04",
    gender: "Female",
    email: "diya.patel@college.edu",
    phone: "+91 91234 56789",
    department: "Electrical",
    year: "2nd Year",
    section: "B",
    rollNo: "EE-207",
    address: "Navrangpura, Ahmedabad",
    avatar: "https://i.pravatar.cc/100?img=47",
    status: "Active",
  },
  {
    id: "STU-1003",
    name: "Kabir Singh",
    dob: "2003-11-22",
    gender: "Male",
    email: "kabir.singh@college.edu",
    phone: "+91 99887 77665",
    department: "Computer Science",
    year: "4th Year",
    section: "C",
    rollNo: "CS-402",
    address: "Indiranagar, Bengaluru",
    avatar: "https://i.pravatar.cc/100?img=5",
    status: "Active",
  },
  {
    id: "STU-1004",
    name: "Meera Nair",
    dob: "2004-09-09",
    gender: "Female",
    email: "meera.nair@college.edu",
    phone: "+91 90123 45678",
    department: "Mechanical",
    year: "3rd Year",
    section: "A",
    rollNo: "ME-315",
    address: "Kakkanad, Kochi",
    avatar: "https://i.pravatar.cc/100?img=33",
    status: "Active",
  },
];

export const mockStaff = [
  { id: "S-01", name: "Dr. Roy", role: "Professor", status: "present" },
  { id: "S-02", name: "Ms. Iqbal", role: "Librarian", status: "present" },
  { id: "S-03", name: "Mr. Joseph", role: "Admin", status: "absent" },
  { id: "S-04", name: "Mrs. Gupta", role: "Faculty", status: "present" },
];

export const mockActivity = [
  {
    id: "A-01",
    title: "New Student Added",
    description: "Aarav Sharma added to Computer Science",
    time: "10 min ago",
  },
  {
    id: "A-02",
    title: "Book Issued",
    description: "\"Clean Code\" issued to Diya Patel",
    time: "1 hour ago",
  },
  {
    id: "A-03",
    title: "Expense Added",
    description: "Maintenance expense of ₹12,000 recorded",
    time: "Today",
  },
];

export const mockBooks = [
  {
    id: "BK-101",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "Issued",
    cover: "https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg",
    issuedToStudentId: "STU-1002",
  },
  {
    id: "BK-102",
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    status: "Available",
    cover: "https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg",
    issuedToStudentId: null,
  },
  {
    id: "BK-103",
    title: "Design Patterns",
    author: "Erich Gamma",
    status: "Available",
    cover: "https://covers.openlibrary.org/b/isbn/9780201633610-M.jpg",
    issuedToStudentId: null,
  },
];

export const mockExpenses = [
  {
    id: "EX-01",
    amount: 12000,
    category: "Maintenance",
    method: "UPI",
    date: "2026-01-02",
    note: "Lab equipment servicing",
  },
  {
    id: "EX-02",
    amount: 45000,
    category: "Faculty",
    method: "Bank Transfer",
    date: "2026-01-03",
    note: "Guest lecture honorarium",
  },
  {
    id: "EX-03",
    amount: 8000,
    category: "Maintenance",
    method: "Cash",
    date: "2026-01-05",
    note: "Campus cleaning",
  },
];

export const mockExpenseTrend = [
  { date: "Jan 1", spend: 5000 },
  { date: "Jan 2", spend: 12000 },
  { date: "Jan 3", spend: 45000 },
  { date: "Jan 4", spend: 6000 },
  { date: "Jan 5", spend: 8000 },
  { date: "Jan 6", spend: 10000 },
];

export const mockSchedule = [
  { time: "09:00", subject: "Data Structures", room: "C-201" },
  { time: "11:00", subject: "Circuits", room: "E-110" },
  { time: "14:00", subject: "Thermodynamics", room: "M-305" },
];

export const mockCandidates = [
  { id: "C-01", name: "Riya Verma", role: "Cultural Secretary" },
  { id: "C-02", name: "Arjun Mehta", role: "Cultural Secretary" },
  { id: "C-03", name: "Sara Khan", role: "Cultural Secretary" },
];
