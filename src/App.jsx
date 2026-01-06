import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { GlobalProvider } from "./context/GlobalContext";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Expenses from "./pages/Expenses";
import Voting from "./pages/Voting";
import Library from "./pages/Library/Library";
import AddStudent from "./pages/Students/AddStudent";
import StudentList from "./pages/Students/StudentList";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/students/edit/:id" element={<AddStudent />} />
            <Route path="/library" element={<Library />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/voting" element={<Voting />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GlobalProvider>
  );
}
