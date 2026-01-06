import { useMemo, useState } from "react";
import { CreditCard, Plus, Receipt, Wallet } from "lucide-react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Badge from "../components/UI/Badge";
import Modal from "../components/UI/Modal";
import ExpenseChart from "../components/Charts/ExpenseChart";
import { useGlobalContext } from "../context/GlobalContext";

export default function Expenses() {
  const { expenses, addExpense, expenseTrend, totalBalance, expenseByCategory } =
    useGlobalContext();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    category: "Maintenance",
    method: "UPI",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });

  const onChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const onSubmit = () => {
    const amount = Number(form.amount);
    if (!amount || amount <= 0) return;
    addExpense({
      amount,
      category: form.category,
      method: form.method,
      date: form.date,
      note: form.note,
    });
    setOpen(false);
    setForm((p) => ({ ...p, amount: "", note: "" }));
  };

  const breakdown = useMemo(() => {
    return Object.entries(expenseByCategory)
      .map(([k, v]) => ({ category: k, total: v }))
      .sort((a, b) => b.total - a.total);
  }, [expenseByCategory]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">Expense Tracker</div>
          <div className="mt-1 text-sm font-medium text-gray-500">
            Track expenses, trends and category-wise spending.
          </div>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus size={16} />
          <span className="ml-2">Add Expense</span>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-white shadow-sm lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white/80">Total Balance</div>
              <div className="mt-2 text-3xl font-bold">₹{totalBalance.toLocaleString("en-IN")}</div>
            </div>
            <div className="rounded-xl bg-white/10 p-3">
              <Wallet size={20} />
            </div>
          </div>
          <div className="mt-4 text-xs font-semibold text-white/70">
            Balance is calculated from a base budget minus expenses.
          </div>
        </div>

        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-500">Spending Trend</div>
              <div className="mt-1 text-base font-bold text-gray-900">Last 6 Days</div>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <Receipt size={18} />
            </div>
          </div>
          <div className="mt-4">
            <ExpenseChart data={expenseTrend} />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-500">Breakdown</div>
              <div className="mt-1 text-base font-bold text-gray-900">By Category</div>
            </div>
            <div className="rounded-xl bg-yellow-50 p-3 text-yellow-700">
              <CreditCard size={18} />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {breakdown.map((b) => (
              <div key={b.category} className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <div className="text-sm font-semibold text-gray-900">{b.category}</div>
                <div className="text-sm font-bold text-gray-900">₹{b.total.toLocaleString("en-IN")}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="text-base font-semibold text-gray-900">Recent Expenses</div>
          <div className="mt-4 space-y-3">
            {expenses.slice(0, 8).map((e) => (
              <div key={e.id} className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">₹{Number(e.amount).toLocaleString("en-IN")}</div>
                  <div className="mt-1 text-xs font-medium text-gray-500">{e.date} · {e.method}</div>
                  {e.note ? (
                    <div className="mt-1 text-xs font-medium text-gray-500">{e.note}</div>
                  ) : null}
                </div>
                <Badge tone={e.category === "Maintenance" ? "yellow" : "blue"}>{e.category}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        open={open}
        title="Add Expense"
        onClose={() => setOpen(false)}
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>Save Expense</Button>
          </div>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Amount</label>
            <div className="mt-2">
              <Input value={form.amount} onChange={onChange("amount")} type="number" placeholder="5000" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Payment Method</label>
            <div className="mt-2">
              <select
                value={form.method}
                onChange={onChange("method")}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
              >
                <option>UPI</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Card</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <div className="mt-2">
              <select
                value={form.category}
                onChange={onChange("category")}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
              >
                <option>Maintenance</option>
                <option>Faculty</option>
                <option>Administration</option>
                <option>Events</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Date</label>
            <div className="mt-2">
              <Input value={form.date} onChange={onChange("date")} type="date" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Note</label>
            <div className="mt-2">
              <Input value={form.note} onChange={onChange("note")} placeholder="Optional note" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
