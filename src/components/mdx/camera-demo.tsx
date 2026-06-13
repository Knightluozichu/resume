"use client";

/**
 * <CameraDemo>：「摄像机」章 3D 视角交互演示的 MDX 入口。
 *
 * WebGL2 能力检测 + next/dynamic(ssr:false) 懒加载 CameraCanvas（硬规则 2/6）。
 */

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

import type { CameraCanvasProps } from "./camera/camera-canvas";

type CameraDemoProps = CameraCanvasProps;

function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mdx-camera-demo my-6 rounded-card border border-border bg-elevated p-6">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
      </div>
      <div className="flex min-h-40 items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <DemoShell>
      <p className="text-sm text-secondary">摄像机演示加载中…</p>
    </DemoShell>
  );
}

function FallbackCard() {
  return (
    <DemoShell>
      <p className="max-w-prose text-sm text-secondary">
        当前浏览器不支持 WebGL2，无法运行摄像机 3D 演示。请用较新版本的 Chrome /
        Firefox / Edge / Safari 查看。
      </p>
    </DemoShell>
  );
}

const CameraCanvas = dynamic(() => import("./camera/camera-canvas"), {
  ssr: false,
  loading: () => <LoadingCard />,
});

let cachedWebgl2: boolean | null = null;

function detectWebGL2(): boolean {
  if (cachedWebgl2 !== null) return cachedWebgl2;
  try {
    const canvas = document.createElement("canvas");
    cachedWebgl2 = !!canvas.getContext("webgl2");
  } catch {
    cachedWebgl2 = false;
  }
  return cachedWebgl2;
}

const noopSubscribe = () => () => {};

function useWebGL2Supported(): boolean {
  return useSyncExternalStore(noopSubscribe, detectWebGL2, () => true);
}

export function CameraDemo(props: CameraDemoProps) {
  const webgl2 = useWebGL2Supported();
  if (!webgl2) return <FallbackCard />;
  return <CameraCanvas {...props} />;
}
