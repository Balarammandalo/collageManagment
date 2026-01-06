import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { useGlobalContext } from "../../context/GlobalContext";

const defaultForm = {
  avatar: "",
  name: "",
  dob: "",
  gender: "Male",
  email: "",
  phone: "",
  address: "",
  department: "Computer Science",
  year: "1st Year",
  section: "A",
  rollNo: "",
};

export default function AddStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { students, addStudent, updateStudent } = useGlobalContext();

  const student = useMemo(() => {
    if (!isEdit) return null;
    return students.find((s) => s.id === id) ?? null;
  }, [students, id, isEdit]);

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (student) {
      const next = { ...defaultForm, ...student };
      setForm(next);
    }
  }, [student]);

  const onChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      avatar: form.avatar || "https://i.pravatar.cc/100?img=13",
    };

    if (isEdit) updateStudent(id, payload);
    else addStudent(payload);

    navigate("/students");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">{isEdit ? "Edit" : "Add"} Student</div>
          <div className="mt-1 text-sm font-medium text-gray-500">
            {isEdit ? "Update student profile information." : "Create a new student record."}
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <Card className="p-5">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Photo URL</label>
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={form.avatar || "https://i.pravatar.cc/100?img=13"}
                  alt="preview"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <Input value={form.avatar} onChange={onChange("avatar")} placeholder="https://..." />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <div className="mt-2">
                <Input value={form.name} onChange={onChange("name")} required placeholder="Student name" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
              <div className="mt-2">
                <Input value={form.dob} onChange={onChange("dob")} type="date" required />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Gender</label>
              <div className="mt-2">
                <select
                  value={form.gender}
                  onChange={onChange("gender")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Contact Email</label>
              <div className="mt-2">
                <Input value={form.email} onChange={onChange("email")} type="email" required placeholder="name@college.edu" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Phone</label>
              <div className="mt-2">
                <Input value={form.phone} onChange={onChange("phone")} required placeholder="+91 ..." />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Address</label>
              <div className="mt-2">
                <textarea
                  value={form.address}
                  onChange={onChange("address")}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  placeholder="Address"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Department</label>
              <div className="mt-2">
                <select
                  value={form.department}
                  onChange={onChange("department")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                >
                  <option>Computer Science</option>
                  <option>Electrical</option>
                  <option>Mechanical</option>
                  <option>Civil</option>
                  <option>Business</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Year</label>
              <div className="mt-2">
                <select
                  value={form.year}
                  onChange={onChange("year")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Section</label>
              <div className="mt-2">
                <Input value={form.section} onChange={onChange("section")} required placeholder="A" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Roll No</label>
              <div className="mt-2">
                <Input value={form.rollNo} onChange={onChange("rollNo")} required placeholder="CS-101" />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => navigate("/students")}
            >
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Update Student" : "Save Student"}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
