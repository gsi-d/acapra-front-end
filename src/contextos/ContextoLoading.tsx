"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Loading from "@/app/components/Loading";

let pending = 0;
const listeners = new Set<(count: number) => void>();

export function beginLoading() {
  pending++;
  listeners.forEach((l) => l(pending));
}

export function endLoading() {
  pending = Math.max(0, pending - 1);
  listeners.forEach((l) => l(pending));
}

export function subscribeLoading(listener: (count: number) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const startRef = useRef<number | null>(null);
  const closeTimeout = useRef<any>(null);
  const MIN_SHOW_MS = 300;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeLoading((count) => {
      setOpen((currentOpen) => {
        if (count > 0) {
          if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
          }
          if (!currentOpen) {
            startRef.current = Date.now();
            return true;
          }
          return currentOpen;
        } else {
          const startedAt = startRef.current ?? Date.now();
          const elapsed = Date.now() - startedAt;
          const delay = elapsed < MIN_SHOW_MS ? MIN_SHOW_MS - elapsed : 0;

          closeTimeout.current = setTimeout(() => {
            setOpen(false);
            startRef.current = null;
            closeTimeout.current = null;
          }, delay);

          return currentOpen;
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {isClient && <Loading open={open} />}
      {children}
    </>
  );
}