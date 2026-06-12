import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero：视口级高度 section，全站唯一允许「满配特效」的场景（M2） */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center gap-4 px-6">
        {/*
         * M2 跑车全屏画布挂载点：届时以 next/dynamic + ssr:false 懒加载挂入
         * WebGL 画布（CLAUDE.md 硬规则 2/6），此处不放任何 3D 代码。
         */}
        <div aria-hidden="true" className="absolute inset-0" />
        <h1 className="relative text-3xl font-semibold">
          re<span className="text-accent">muse</span>
        </h1>
        <p className="relative text-center text-lg text-secondary">
          可交互的 Shader / OpenGL 教学
        </p>
        <Link
          href="/learn"
          className="relative rounded-control border border-border px-6 py-2 text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          开始学习 →
        </Link>
      </section>
    </main>
  );
}
