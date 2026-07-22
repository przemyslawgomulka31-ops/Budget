import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Toast({ message, onClose }) {
  useEffect(() => { const timer = setTimeout(onClose, 2200); return () => clearTimeout(timer); }, [onClose]);
  if (!message) return null;
  return <div className="toast"><FaCheckCircle /> {message}</div>;
}
