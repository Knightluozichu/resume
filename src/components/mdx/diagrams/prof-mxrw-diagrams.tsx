/**
 * 书3「Mobile/XR/Web 优化」章节图组（Unity 6）。
 *
 * 全图纯 SVG + DESIGN token，无魔法 hex（硬规则 5）。
 * Server Component，纯展示，无交互、无 three。
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

/** Ch1 §3.1：URP 架构 vs Built-in 管线对照 */
export function UrpArchitectureDiagram() {
  return (
    <DiagramBox title="URP 与 Built-in 渲染管线架构对照">
      <svg
        viewBox="0 0 640 220"
        role="img"
        aria-label="URP 架构图：上方 Built-in 是多条独立、各自为政的渲染路径（前向/延迟各管各），下方 URP 是统一单管线——SRP Batcher 作为共享数据通道、URP Asset 全局配置、Renderer Feature 可插拔注入——所有渲染走同一条路"
        className="mx-auto block h-auto w-full max-w-[640px]"
      >
        {/* Built-in 行 */}
        <rect x="10" y="10" width="620" height="90" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
        <text x="320" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Built-in Render Pipeline</text>
        <rect x="30" y="45" width="130" height="40" rx="3" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="0.5" />
        <text x="95" y="68" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Forward</text>
        <rect x="180" y="45" width="130" height="40" rx="3" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="0.5" />
        <text x="245" y="68" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Deferred</text>
        <rect x="330" y="45" width="130" height="40" rx="3" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="0.5" />
        <text x="395" y="68" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Legacy</text>
        <text x="500" y="68" fontSize="8" fill="var(--text-secondary)">各路径独立<br />各自管理资源</text>

        {/* 箭头 */}
        <line x1="320" y1="100" x2="320" y2="115" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowDown)" />
        <defs>
          <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L5,10 L10,0" fill="var(--accent)" />
          </marker>
        </defs>

        {/* URP 行 */}
        <rect x="10" y="120" width="620" height="90" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1" />
        <text x="320" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Universal Render Pipeline (URP)</text>
        <rect x="30" y="155" width="180" height="40" rx="3" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="0.5" />
        <text x="120" y="172" textAnchor="middle" fontSize="9" fill="var(--text-primary)">SRP Batcher</text>
        <text x="120" y="186" textAnchor="middle" fontSize="7" fill="var(--text-secondary)">统一数据通道</text>
        <rect x="230" y="155" width="180" height="40" rx="3" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="0.5" />
        <text x="320" y="172" textAnchor="middle" fontSize="9" fill="var(--text-primary)">URP Asset</text>
        <text x="320" y="186" textAnchor="middle" fontSize="7" fill="var(--text-secondary)">全局渲染配置</text>
        <rect x="430" y="155" width="180" height="40" rx="3" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="0.5" />
        <text x="520" y="172" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Renderer Feature</text>
        <text x="520" y="186" textAnchor="middle" fontSize="7" fill="var(--text-secondary)">可插拔自定义 pass</text>
      </svg>
    </DiagramBox>
  );
}

/** Ch1 §3.3：URP Asset 核心配置项速览 */
export function UrpAssetConfigDiagram() {
  return (
    <DiagramBox title="URP Asset 核心性能配置项">
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        {([
          { label: "Render Scale", desc: "0.7 降到 49% 像素", rec: "中低端机 0.7–0.8" },
          { label: "MSAA", desc: "2×/4×/8× 多重采样", rec: "移动端关或 2×" },
          { label: "Shadow Res", desc: "主阴影图分辨率", rec: "移动端 1024 以下" },
          { label: "Cascade Count", desc: "级联阴影层数", rec: "移动端 ≤2 级" },
          { label: "HDR", desc: "浮点帧缓冲开关", rec: "中低端机关闭" },
          { label: "Depth Texture", desc: "_CameraDepthTexture", rec: "按需开启含性能代价" },
        ] as const).map((cfg) => (
          <div key={cfg.label} className="rounded border border-border bg-bg p-2">
            <p className="font-semibold text-accent">{cfg.label}</p>
            <p className="mt-1 text-primary">{cfg.desc}</p>
            <p className="mt-0.5 text-secondary">{cfg.rec}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-secondary">
        所有这些配置集中在 URP Asset 一个资产文件中，同一项目可建多份按 Quality Level 切换——高低端设备各一套。
      </p>
    </DiagramBox>
  );
}

/** Ch2 §3.1：移动 GPU Tile-Based Rendering 架构示意 */
export function TileBasedGpuDiagram() {
  return (
    <DiagramBox title="Tile-Based Rendering（移动 GPU）vs Immediate Mode（桌面 GPU）">
      <svg
        viewBox="0 0 640 200"
        role="img"
        aria-label="TBDR 架构：屏幕被切成若干小方块(tile)，每个 tile 在 GPU 片上 SRAM 内完成全部渲染后才写回显存——省带宽、热启动快，但对大帧缓冲来回切 tile 有额外开销"
        className="mx-auto block h-auto w-full max-w-[640px]"
      >
        {/* 桌面 Immediate 行 */}
        <rect x="10" y="5" width="620" height="85" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
        <text x="320" y="22" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">桌面 GPU：Immediate Mode（N卡/AMD）</text>
        <text x="25" y="42" fontSize="9" fill="var(--text-secondary)">顶点处理</text>
        <rect x="90" y="32" width="80" height="14" rx="2" fill="var(--accent)" opacity="0.25" />
        <text x="190" y="42" fontSize="9" fill="var(--text-secondary)">→ 光栅化 →</text>
        <rect x="260" y="32" width="80" height="14" rx="2" fill="var(--accent)" opacity="0.25" />
        <text x="360" y="42" fontSize="9" fill="var(--text-secondary)">→ 片元着色 →</text>
        <rect x="440" y="32" width="80" height="14" rx="2" fill="var(--accent)" opacity="0.25" />
        <text x="540" y="42" fontSize="9" fill="var(--text-secondary)">→ 显存</text>
        <text x="320" y="68" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
          所有像素直接写入显存——长流水线，带宽消耗大
        </text>

        {/* 箭头 */}
        <text x="320" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">⬇ 移动端走另一条路 ⬇</text>

        {/* 移动 Tile 行 */}
        <rect x="10" y="118" width="620" height="75" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1" />
        <text x="320" y="135" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">移动 GPU：Tile-Based Rendering（Mali/Adreno/Apple GPU）</text>
        <text x="25" y="155" fontSize="8" fill="var(--text-secondary)">屏幕切成 Tile</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={`tile-${i}`}
            x={140 + i * 24}
            y={148}
            width="20"
            height="14"
            rx="1"
            fill="var(--accent)"
            opacity="0.2"
            stroke="var(--accent)"
            strokeWidth="0.5"
          />
        ))}
        <text x="285" y="155" fontSize="8" fill="var(--text-secondary)">→ 每 Tile 在片上 SRAM 渲完</text>
        <rect x="440" y="148" width="60" height="14" rx="2" fill="var(--accent)" opacity="0.15" />
        <text x="520" y="155" fontSize="8" fill="var(--text-secondary)">→ 写回显存</text>
        <text x="320" y="183" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
          TBDR 省显存带宽但 Tile 边界需存/取中间结果——避免大 RenderTexture 频繁切换
        </text>
      </svg>
    </DiagramBox>
  );
}

/** Ch3 §3.1：XR 帧预算与 Motion-to-Photon 延迟 */
export function XrFrameBudgetDiagram() {
  return (
    <DiagramBox title="XR 帧预算与 Motion-to-Photon 延迟">
      <div className="space-y-3">
        {([
          { fps: 72, budget: "13.9ms", desc: "Quest 2 默认刷新率", barColor: "var(--accent)", barW: "60%" },
          { fps: 90, budget: "11.1ms", desc: "Quest 3 / PICO 4 推荐", barColor: "var(--accent)", barW: "80%" },
          { fps: 120, budget: "8.3ms", desc: "PC VR 高端头显", barColor: "var(--accent)", barW: "100%" },
        ] as const).map((r) => (
          <div key={r.fps} className="flex items-center gap-3">
            <span className="w-16 text-xs font-semibold text-primary">{r.fps} FPS</span>
            <div className="h-6 flex-1 rounded bg-accent/10">
              <div
                className="h-full rounded flex items-center justify-center text-xs font-semibold text-primary"
                style={{
                  width: r.barW,
                  backgroundColor: r.barColor,
                  opacity: 0.25,
                }}
              />
            </div>
            <span className="w-24 text-right text-xs text-secondary">{r.budget}/帧</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded border border-border bg-bg p-3">
        <p className="text-xs text-primary">
          <strong className="text-yellow-400">Motion-to-Photon 延迟</strong>：从头部运动到屏幕像素更新的总时间。
        </p>
        <p className="mt-1 text-xs text-secondary">
          超过 20ms 开始引发晕动症——这是 XR 的硬红线，不是建议。Single Pass Instanced 和 Foveated Rendering 都是为了在这条红线上抢时间。
        </p>
      </div>
    </DiagramBox>
  );
}

/** Ch3 §3.4：XR 输入处理开销 */
export function XrInputOverheadDiagram() {
  return (
    <DiagramBox title="XR 输入处理管线与开销">
      <svg
        viewBox="0 0 640 160"
        role="img"
        aria-label="XR 输入管线：设备驱动 → XR Plugin → Input System → 游戏逻辑，每帧需处理双手柄 6DoF 位姿+按键+手势"
        className="mx-auto block h-auto w-full max-w-[640px]"
      >
        {/* 流程框 */}
        {([
          { x: 10, label: "设备驱动", desc: "6DoF 位姿\nIMU 数据", color: "var(--bg)" },
          { x: 140, label: "XR Plugin", desc: "OpenXR\n设备抽象", color: "var(--bg)" },
          { x: 270, label: "Input System", desc: "动作绑定\n手部追踪", color: "var(--bg)" },
          { x: 400, label: "XR Toolkit", desc: "射线交互\n抓取/传送", color: "var(--bg)" },
          { x: 530, label: "游戏逻辑", desc: "每帧消费\n输入状态", color: "var(--bg-elevated)" },
        ] as const).map((b, i) => (
          <React.Fragment key={b.label}>
            {i > 0 && (
              <line
                x1={130 + (i - 1) * 130}
                y1="60"
                x2={140 + (i - 1) * 130}
                y2="60"
                stroke="var(--accent)"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
            )}
            <rect x={b.x} y="15" width="110" height="90" rx="4" fill={b.color} stroke="var(--border)" strokeWidth="1" />
            <text x={b.x + 55} y="40" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">{b.label}</text>
            <text x={b.x + 55} y="58" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">{b.desc.split("\n")[0]}</text>
            <text x={b.x + 55} y="72" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">{b.desc.split("\n")[1] || ""}</text>
          </React.Fragment>
        ))}
        {/* 底部注释 */}
        <text x="320" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
          每帧约 1-3ms CPU——在高帧率（72/90/120）下占比可观。考虑用 Jobs/Burst 把输入处理移出主线程。
        </text>
      </svg>
    </DiagramBox>
  );
}

/** Ch4 §3.1：WebAssembly 2023 特性一览 */
export function WebAssemblyFeatureDiagram() {
  return (
    <DiagramBox title="WebAssembly 2023 关键新特性">
      <div className="grid grid-cols-2 gap-3 text-xs">
        {([
          { label: "SIMD 128", desc: "单指令多数据——加速向量/矩阵运算，Unity Mathematics 包直接受益" },
          { label: "Bulk Memory", desc: "批量内存操作指令——memcpy/memset 快 3-5 倍，AssetBundle 加载提速" },
          { label: "Reference Types", desc: "允许 Wasm 直接持有 JS 对象引用——减少跨语言边界调用开销" },
          { label: "Tail Calls", desc: "尾调用优化——递归函数不再炸栈，IL2CPP 代码生成更紧凑" },
          { label: "Relaxed SIMD", desc: "跨平台 SIMD 宽松语义——统一 Wasm SIMD 在 x86/ARM 的行为差异" },
          { label: "GC 集成", desc: "Wasm-GC——未来可直接管理对象图，省 IL2CPP 自带 GC 开销" },
        ] as const).map((f) => (
          <div key={f.label} className="rounded border border-border bg-bg p-2">
            <p className="font-semibold text-accent">{f.label}</p>
            <p className="mt-0.5 text-secondary">{f.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-secondary">
        Unity 6 的 IL2CPP WebAssembly 后端已支持以上全部特性。构建时勾选 PlayerSettings → WebGL → Enable Wasm SIMD，Chrome 91+ / Firefox 89+ / Safari 16.4+ 均兼容。
      </p>
    </DiagramBox>
  );
}
