"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastPayload = {
  title: string;
  description?: string;
};

type Toast = ToastPayload & { id: number };

type ToastContextValue = {
  toast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((payload: ToastPayload) => {
    const id = Date.now();
    setToasts((previous) => [...previous, { ...payload, id }]);
    window.setTimeout(() => {
      setToasts((previous) => previous.filter((toastItem) => toastItem.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        {toasts.map((toastItem) => (
          <div
            key={toastItem.id}
            className="min-w-[260px] rounded-xl border border-border/50 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-md animate-fade-in-up"
          >
            <p className="text-sm font-semibold text-foreground">{toastItem.title}</p>
            {toastItem.description && (
              <p className="text-xs text-muted-foreground mt-1">{toastItem.description}</p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

