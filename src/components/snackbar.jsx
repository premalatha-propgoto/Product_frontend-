import React, { useEffect } from "react";


export default function Snackbar({ message, show, setShow }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  if (!show) return null;

  return <div className="snackbar">{message}</div>;
}