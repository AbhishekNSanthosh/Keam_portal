// utils/showToast.tsx
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import TedxToast from "./Toast";

interface ToastOptions {
  type: "success" | "error" | "info"; // Added 'info' type
  showIcon?: boolean;
  message: string;
  desc?: string;
}

const customToast = ({ type, message, desc, showIcon }: ToastOptions) => {
  toast.custom((t) => (
    <TedxToast
      type={type}
      message={message}
      toastId={t.id}
      desc={desc}
      showIcon={showIcon}
    />
  ));
};

export default customToast;