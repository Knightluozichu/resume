"use client";

import { useSyncExternalStore } from "react";

/**
 * 监听 prefers-reduced-motion（SSR 安全：server 与首渲染按「不减弱」，挂载后校正）。
 *
 * 与 stepper.tsx 同款 useSyncExternalStore 写法——订阅 matchMedia，
 * 无需在 effect 内同步 setState，契合 React Compiler「不在 effect 体内级联 setState」规则。
 *
 * 复习卡的 3D 翻转动画据此显式降级（不只靠 CSS）：reduced 下翻面瞬切、无 320ms 过渡。
 */
function subscribe(callback: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // server snapshot：不减弱
  );
}
