import { createContext, useContext, useState, useCallback, useRef } from "react";
import { AlertTriangle } from "lucide-react";

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const [dialog, setDialog] = useState(null);
  const resolveRef = useRef(null);

  const confirm = useCallback(({ title = "Are you sure?", message, confirmText = "Confirm", danger = true }) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setDialog({ title, message, confirmText, danger });
    });
  }, []);

  const handleClose = (result) => {
    setDialog(null);
    if (resolveRef.current) resolveRef.current(result);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {dialog && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[200] p-4 no-print">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${dialog.danger ? "bg-rose-50 text-rose-600" : "bg-brand-50 text-brand-600"}`}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{dialog.title}</h3>
                {dialog.message && <p className="text-sm text-slate-500 mt-1">{dialog.message}</p>}
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => handleClose(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleClose(true)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${
                  dialog.danger ? "bg-rose-600 hover:bg-rose-700" : "bg-brand-600 hover:bg-brand-700"
                }`}
              >
                {dialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
