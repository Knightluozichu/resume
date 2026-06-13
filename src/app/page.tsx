import Link from "next/link";
import { HeroCanvas } from "@/components/hero/hero-canvas";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero：视口级高度 section，全站唯一允许「满配特效」的场景（HEL-13） */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center gap-4 px-6">
        {/*
         * 跑车全屏画布：next/dynamic + ssr:false 懒加载挂入（硬规则 2/6）。
         * 画布在底层（z-0，aria-hidden），文字/CTA 在上层（relative z-10），
         * 保证标题/副标题/按钮始终清晰可读。
         */}
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <HeroCanvas />
        </div>
        <h1 className="relative z-10 text-3xl font-semibold">
          re<span className="text-accent">muse</span>
        </h1>
        <p className="relative z-10 text-center text-lg text-secondary">
          可交互的 Shader / OpenGL 教学
        </p>
        <Link
          href="/learn"
          className="relative z-10 rounded-control border border-border bg-bg/60 px-6 py-2 text-secondary backdrop-blur-sm transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          开始学习 →
        </Link>
      </section>
    </main>
  );
}
