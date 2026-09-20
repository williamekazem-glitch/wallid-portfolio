"use client";
import { useEffect } from "react";

// Fix CRITICAL a11y #1 — hide the custom cursor for keyboard users.
// Adds `body.keyboard-user` when Tab is pressed, removes on mouse click.
export function useKeyboardUser(): void {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        document.body.classList.add("keyboard-user");
      }
    };
    const onMouse = () => {
      document.body.classList.remove("keyboard-user");
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouse);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouse);
    };
  }, []);
}
