import { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";
import { useGlobalContext } from "../context/GlobalContext";

export default function Voting() {
  const { candidates, ballot, setSelectedCandidate, submitVote } = useGlobalContext();

  const canSubmit = useMemo(() => {
    return Boolean(ballot.selectedCandidateId) && !ballot.submitted;
  }, [ballot.selectedCandidateId, ballot.submitted]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-bold text-gray-900">Voting System</div>
        <div className="mt-1 text-sm font-medium text-gray-500">
          Select a candidate and review before submitting.
        </div>
      </div>

      <Card className="p-5">
        <div className="text-base font-semibold text-gray-900">Ballot</div>
        <div className="mt-4 space-y-3">
          {candidates.map((c) => {
            const checked = ballot.selectedCandidateId === c.id;
            return (
              <label
                key={c.id}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 shadow-sm transition-colors ${
                  checked ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-white hover:bg-gray-50"
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-gray-900">{c.name}</div>
                  <div className="mt-1 text-xs font-medium text-gray-500">{c.role}</div>
                </div>
                <div className="flex items-center gap-3">
                  {checked ? <Badge tone="blue">Selected</Badge> : null}
                  <input
                    type="radio"
                    name="candidate"
                    checked={checked}
                    onChange={() => setSelectedCandidate(c.id)}
                    className="h-4 w-4 accent-blue-600"
                  />
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl bg-gray-50 p-4">
          <div className="text-sm font-semibold text-gray-900">Review</div>
          <div className="mt-1 text-sm font-medium text-gray-500">
            Selected: {ballot.selectedCandidateId ? ballot.selectedCandidateId : "None"}
          </div>
          {ballot.submitted ? (
            <div className="mt-3 text-sm font-semibold text-green-700">Vote submitted successfully.</div>
          ) : null}
        </div>

        <div className="mt-6">
          <Button className="w-full" disabled={!canSubmit} onClick={submitVote}>
            <CheckCircle2 size={16} />
            <span className="ml-2">Review & Submit</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
