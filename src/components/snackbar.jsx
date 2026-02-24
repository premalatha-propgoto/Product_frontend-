import React, { useEffect } from "react";


export default function Snackbar({ message, show, setShow }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 3000); // hide after 3 sec
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  if (!show) return null;

  return <div className="snackbar">{message}</div>;
}