"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "carmichaelt-visitor-key";

function subscribe() {
  return () => undefined;
}

function getSnapshot() {
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(STORAGE_KEY, next);
  return next;
}

function getServerSnapshot() {
  return undefined;
}

export function useVisitorKey() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
