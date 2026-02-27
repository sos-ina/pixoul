"use client";
import { createPortal } from "react-dom";
import AuthForm from "@/components/ui/AuthForm";

export default function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[40] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative">
        <AuthForm />
      </div>
    </div>,
    document.body
  );
}
