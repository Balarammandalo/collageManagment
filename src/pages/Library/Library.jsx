import { useMemo, useState } from "react";
import { BookOpen, CheckCircle2, ClipboardCheck, XCircle } from "lucide-react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Badge from "../../components/UI/Badge";
import Modal from "../../components/UI/Modal";
import { useGlobalContext } from "../../context/GlobalContext";

export default function Library() {
  const { books, students, issueBook, returnBook } = useGlobalContext();
  const [q, setQ] = useState("");
  const [issueOpen, setIssueOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return books;
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.id.toLowerCase().includes(query)
    );
  }, [books, q]);

  const openIssue = (bookId) => {
    setSelectedBookId(bookId);
    setSelectedStudentId("");
    setIssueOpen(true);
  };

  const confirmIssue = () => {
    if (!selectedBookId || !selectedStudentId) return;
    issueBook({ bookId: selectedBookId, studentId: selectedStudentId });
    setIssueOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">Library Management</div>
          <div className="mt-1 text-sm font-medium text-gray-500">
            Browse catalog and issue books to students.
          </div>
        </div>
        <div className="hidden rounded-2xl bg-blue-50 px-4 py-3 text-blue-700 sm:flex sm:items-center sm:gap-2">
          <BookOpen size={18} />
          <div className="text-sm font-semibold">Catalog</div>
        </div>
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search books..." />
          </div>
          <div className="text-sm font-semibold text-gray-500">
            Total: <span className="text-gray-900">{books.length}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => {
            const tone = b.status === "Available" ? "green" : "yellow";
            const borrower = b.issuedToStudentId
              ? students.find((s) => s.id === b.issuedToStudentId)
              : null;

            return (
              <div
                key={b.id}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-14 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={b.cover}
                      alt={b.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-gray-900">{b.title}</div>
                    <div className="mt-1 truncate text-xs font-medium text-gray-500">
                      {b.author}
                    </div>
                    <div className="mt-2">
                      <Badge tone={tone}>{b.status}</Badge>
                    </div>
                    {borrower ? (
                      <div className="mt-2 text-xs font-semibold text-gray-500">
                        Issued to: <span className="text-gray-900">{borrower.name}</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {b.status === "Available" ? (
                    <Button className="flex-1" onClick={() => openIssue(b.id)}>
                      <ClipboardCheck size={16} />
                      <span className="ml-2">Issue</span>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => returnBook(b.id)}
                    >
                      <CheckCircle2 size={16} />
                      <span className="ml-2">Return</span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Modal
        open={issueOpen}
        title="Issue Book"
        onClose={() => setIssueOpen(false)}
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setIssueOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmIssue}>
              <CheckCircle2 size={16} />
              <span className="ml-2">Confirm Issue</span>
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="text-sm font-semibold text-gray-900">Select Borrower</div>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          >
            <option value="">Choose student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.rollNo})
              </option>
            ))}
          </select>

          {!selectedStudentId ? (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              <XCircle size={16} />
              Select a student to issue.
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
