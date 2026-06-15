/**
 * Profiling Unity Games 章节图组 —— 功耗优化 + 平台专项 Profiling 各图占位。
 *
 * 当前为骨架占位（构建可通过）。每个 Diagram 均可后续换为真正的 SVG / Canvas 实现，
 * 接口不变（React 组件，零 prop / 有限 prop）。
 */
import React from "react";

function DiagramBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      className="my-6 rounded-card border border-border bg-elevated p-6 text-sm"
      aria-label={title}
    >
      <figcaption className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
        {title}
      </figcaption>
      {children}
    </figure>
  );
}

/** Ch6 知识点一：帧率-功耗非线性关系图 */
export function PowerFrameRateDiagram() {
  return (
    <DiagramBox title="帧率 vs 功耗（非线性）">
      <div className="grid grid-cols-3 gap-4 text-center">
        {(["30 FPS", "60 FPS", "120 FPS"] as const).map((label, i) => {
          const barH = [40, 100, 220][i];
          const rel = ["1.0×", "≈2.5×", "≈5.5×"][i];
          return (
            <div key={label}>
              <div
                className="mx-auto w-16 rounded-t-md bg-accent"
                style={{ height: `${barH / 2.5}px` }}
              />
              <p className="mt-1 text-xs font-semibold text-primary">{label}</p>
              <p className="text-xs text-secondary">{rel}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-secondary">
        帧率翻倍，功耗不是翻倍——而是超线性上涨。60→30 FPS 省电远超 50%。
      </p>
    </DiagramBox>
  );
}

/** Ch6 知识点二：Render Scale 缩放可视化 */
export function RenderScaleDiagram() {
  return (
    <DiagramBox title="Render Scale 缩放（0.7× → 像素量 = 49%）">
      <div className="flex items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded border border-accent/40 bg-accent/10 text-xs text-accent">
          1.0×
          <br />
          100% 像素
        </div>
        <span className="text-secondary">→</span>
        <div className="flex h-[68px] w-[68px] items-center justify-center rounded border border-accent/40 bg-accent/10 text-xs text-accent">
          0.7×
          <br />
          49% 像素
        </div>
      </div>
    </DiagramBox>
  );
}

/** Ch6 知识点三：TargetFrameRate 帧预算图 */
export function TargetFrameRateDiagram() {
  return (
    <DiagramBox title="VSync 帧预算对比">
      <div className="space-y-3">
        {(["60 FPS 每帧 16.67ms", "30 FPS 每帧 33.3ms"] as const).map(
          (label, i) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-32 text-xs text-primary">{label}</span>
              <div className="h-4 flex-1 rounded bg-accent/20">
                <div
                  className="h-full rounded bg-accent"
                  style={{ width: i === 0 ? "100%" : "50%" }}
                />
              </div>
              <span className="text-xs text-secondary">
                {i === 0 ? "满载" : "空闲 50%"}
              </span>
            </div>
          ),
        )}
      </div>
    </DiagramBox>
  );
}

/** Ch6 知识点四：温控降频应对分层图 */
export function ThermalThrottlingDiagram() {
  return (
    <DiagramBox title="温控退让分层策略">
      <div className="space-y-2">
        {[
          { temp: "≤35°C", fps: "60 FPS", color: "#22c55e" },
          { temp: "35–40°C", fps: "40 FPS", color: "#eab308" },
          { temp: "40–45°C", fps: "30 FPS", color: "#f97316" },
          { temp: ">45°C", fps: "20 FPS", color: "#ef4444" },
        ].map((t) => (
          <div key={t.temp} className="flex items-center gap-3">
            <span className="w-20 text-xs text-primary">{t.temp}</span>
            <div
              className="h-3 w-48 rounded"
              style={{ backgroundColor: t.color }}
            />
            <span className="text-xs text-secondary">{t.fps}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-secondary">
        每层提前 5°C 触发，给硬件缓冲——不等到一刀切降频。
      </p>
    </DiagramBox>
  );
}

/** Ch6 知识点五：移动端 QualitySettings 分级 */
export function MobileQualityDiagram() {
  return (
    <DiagramBox title="移动端 QualitySettings 分级">
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { label: "非常低", desc: "关阴影/关AA/半纹理" },
          { label: "低", desc: "硬阴影/关AA" },
          { label: "中", desc: "软阴影/FXAA" },
          { label: "高", desc: "全阴影/MSAA" },
        ].map((q) => (
          <div
            key={q.label}
            className="rounded border border-border bg-bg p-2"
          >
            <p className="font-semibold text-primary">{q.label}</p>
            <p className="mt-1 text-secondary">{q.desc}</p>
          </div>
        ))}
      </div>
    </DiagramBox>
  );
}

/** Ch6 Demo：帧率-功耗交互滑块（占位） */
export function PowerDemo({ caption }: { caption: string }) {
  return (
    <DiagramBox title="帧率—功耗演示">
      <div className="flex h-40 items-center justify-center rounded border border-border text-sm text-secondary">
        <p>
          帧率—功耗交互 Demo（施工中）。
          <br />
          {caption}
        </p>
      </div>
    </DiagramBox>
  );
}

/** Ch7 知识点一：五平台 Profiling 工具总览图 */
export function PlatformProfilingOverviewDiagram() {
  return (
    <DiagramBox title="五平台 Profiling 工具链总览">
      <div className="grid grid-cols-5 gap-2 text-center text-xs">
        {[
          { platform: "Console", tools: "PIX / SN Systems" },
          { platform: "PC", tools: "Profiler + RenderDoc" },
          { platform: "Mobile", tools: "Profiler 远程 + Perfdog" },
          { platform: "XR", tools: "OVR Metrics / Perf HUD" },
          { platform: "Web", tools: "Chrome DevTools" },
        ].map((p) => (
          <div
            key={p.platform}
            className="rounded border border-border bg-bg p-2"
          >
            <p className="font-semibold text-primary">{p.platform}</p>
            <p className="mt-1 text-secondary">{p.tools}</p>
          </div>
        ))}
      </div>
    </DiagramBox>
  );
}

/** Ch7 知识点三：第三方工具对比图 */
export function ToolComparisonDiagram() {
  return (
    <DiagramBox title="第三方 Profiling 工具对比">
      <div className="space-y-2 text-xs">
        {[
          {
            tool: "RenderDoc",
            platform: "PC / Console",
            strength: "逐 Draw Call 回放、看每个 RenderTexture 中间结果",
          },
          {
            tool: "Perfdog",
            platform: "Android / iOS",
            strength: "后台持续记录 FPS + 功耗 + 温度，不修改工程",
          },
          {
            tool: "Xcode Instruments",
            platform: "iOS",
            strength: "线程调度、Metal 性能计数器、内存分配调用栈",
          },
          {
            tool: "Chrome DevTools",
            platform: "WebGL",
            strength: "帧时间线 + 内存堆快照，JavaScript 调用栈",
          },
        ].map((t) => (
          <div
            key={t.tool}
            className="flex items-center gap-3 rounded border border-border bg-bg p-2"
          >
            <span className="w-24 font-semibold text-primary">{t.tool}</span>
            <span className="w-20 text-secondary">{t.platform}</span>
            <span className="flex-1 text-secondary">{t.strength}</span>
          </div>
        ))}
      </div>
    </DiagramBox>
  );
}

/** Ch7 Demo：五平台数据对比（占位） */
export function PlatformProfilingDemo({ caption }: { caption: string }) {
  return (
    <DiagramBox title="五平台帧预算对比">
      <div className="flex h-40 items-center justify-center rounded border border-border text-sm text-secondary">
        <p>
          五平台帧预算对比 Demo（施工中）。
          <br />
          {caption}
        </p>
      </div>
    </DiagramBox>
  );
}
