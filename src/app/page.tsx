import Link from "next/link";
import { HeroCanvas } from "@/components/hero/hero-canvas";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero：视口级高度 section，全站唯一允许「满配特效」的场景（HEL-13） */}
      <section className="relative min-h-dvh overflow-hidden">
        {/*
         * 跑车全屏画布：next/dynamic + ssr:false 懒加载挂入（硬规则 2/6）。
         * 画布铺满 section 作底层舞台（z-0，aria-hidden）。
         */}
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <HeroCanvas />
        </div>
        {/*
         * 文字置于顶部留白区（车体在下方舞台），与车不重叠 → 始终清晰可读。
         * pt-24 = 96px（DESIGN 间距标度内），避开 sticky 导航与车顶。
         */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 pt-24 text-center">
          <h1 className="text-3xl font-semibold">
            re<span className="text-accent">muse</span>
          </h1>
          <p className="max-w-md text-balance text-lg text-secondary">
            可交互的 Shader / OpenGL 教学
          </p>
          <Link
            href="/learn"
            className="rounded-control border border-border bg-bg/60 px-6 py-2 text-secondary backdrop-blur-sm transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            开始学习 →
          </Link>
        </div>
      </section>
    </main>
  );
}
