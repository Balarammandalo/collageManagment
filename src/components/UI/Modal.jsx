import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 sm:items-center">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-md">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="text-base font-semibold text-gray-900">{title}</div>
          <Button variant="ghost" className="h-9 w-9 p-0" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer ? <div className="border-t border-gray-100 px-5 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
