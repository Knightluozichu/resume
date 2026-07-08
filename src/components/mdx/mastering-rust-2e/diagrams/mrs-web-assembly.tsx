/**
 * <MrsWebAssemblyDiagram>：Rust WebAssembly 工程图解。
 *
 * Rust → wasm 编译流程 + wasm-bindgen 桥接 + 浏览器/Node 部署。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function MrsWebAssemblyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Rust WebAssembly工程图解：Rust源码编译为wasm，通过wasm-bindgen桥接JS，部署到浏览器或Node.js。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Rust + WebAssembly：跨平台高性能
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            Rust 编译 wasm · wasm-bindgen 桥接 JS · 浏览器/Node 部署
          </text>

          {/* 编译流程管道 */}
          {/* Rust 源码 */}
          <rect x={36} y={84} width={120} height={68} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.4" />
          <text x={96} y={110} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>Rust</text>
          <text x={96} y={128} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">.rs 源码</text>
          <text x={96} y={142} textAnchor="middle" fontSize="11" fill={secondary}>所有权+类型安全</text>

          {/* 箭头 */}
          <line x1={156} y1={118} x2={196} y2={118} stroke={secondary} strokeWidth="1.4" markerEnd="url(#mrs-wa-arrow)" />
          <text x={176} y={110} textAnchor="middle" fontSize="11" fill={secondary}>wasm32</text>

          {/* wasm 模块 */}
          <rect x={196} y={84} width={120} height={68} rx="8" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.4" />
          <text x={256} y={110} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>.wasm</text>
          <text x={256} y={128} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">字节码模块</text>
          <text x={256} y={142} textAnchor="middle" fontSize="11" fill={secondary}>沙箱安全执行</text>

          {/* 箭头 */}
          <line x1={316} y1={118} x2={356} y2={118} stroke={secondary} strokeWidth="1.4" markerEnd="url(#mrs-wa-arrow)" />
          <text x={336} y={110} textAnchor="middle" fontSize="11" fill={secondary}>bindgen</text>

          {/* wasm-bindgen 桥接 */}
          <rect x={356} y={84} width={120} height={68} rx="8" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.4" />
          <text x={416} y={110} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>wasm-bindgen</text>
          <text x={416} y={128} textAnchor="middle" fontSize="11" fill={secondary}>Rust ↔ JS 桥接</text>
          <text x={416} y={142} textAnchor="middle" fontSize="11" fill={secondary}>类型自动转换</text>

          {/* 箭头 */}
          <line x1={476} y1={118} x2={516} y2={118} stroke={secondary} strokeWidth="1.4" markerEnd="url(#mrs-wa-arrow)" />

          {/* JS 胶水 */}
          <rect x={516} y={84} width={120} height={68} rx="8" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1.4" />
          <text x={576} y={110} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>JS</text>
          <text x={576} y={128} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">.js 胶水层</text>
          <text x={576} y={142} textAnchor="middle" fontSize="11" fill={secondary}>DOM/API 交互</text>

          <defs>
            <marker id="mrs-wa-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 分隔线 */}
          <line x1={32} y1={178} x2={VIEW_W - 32} y2={178} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半区：优势 + 部署目标 */}
          <rect x={48} y={194} width={300} height={120} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={198} y={214} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            为什么 Rust + wasm？
          </text>
          <text x={64} y={234} fontSize="11" fill={secondary}>· 零 GC 停顿，性能接近原生</text>
          <text x={64} y={252} fontSize="11" fill={secondary}>· 编译期内存安全，无 UAF/溢出</text>
          <text x={64} y={270} fontSize="11" fill={secondary}>· 小体积（wasm &lt; 等效 JS）</text>
          <text x={64} y={288} fontSize="11" fill={secondary}>· 可移植（浏览器/Node/边缘计算）</text>
          <text x={64} y={306} fontSize="11" fill={secondary}>· 与 JS 无缝互操作</text>

          <rect x={372} y={194} width={300} height={120} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={522} y={214} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            部署目标
          </text>
          {/* 浏览器 */}
          <rect x={388} y={226} width={80} height={36} rx="6" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1" />
          <text x={428} y={248} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>浏览器</text>
          {/* Node.js */}
          <rect x={478} y={226} width={80} height={36} rx="6" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" />
          <text x={518} y={248} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>Node.js</text>
          {/* 边缘计算 */}
          <rect x={568} y={226} width={88} height={36} rx="6" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1" />
          <text x={612} y={248} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>边缘计算</text>
          <text x={388} y={284} fontSize="11" fill={secondary}>wasm-pack build → pkg/</text>
          <text x={388} y={300} fontSize="11" fill={secondary}>npm install → 前端集成</text>

          {/* 底部总结 */}
          <line x1={32} y1={338} x2={VIEW_W - 32} y2={338} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={360} textAnchor="middle" fontSize="11" fill={secondary}>
            Rust 提供安全与性能 · wasm 提供可移植沙箱 · JS 提供生态与 DOM
          </text>
          <text x={VIEW_W / 2} y={378} textAnchor="middle" fontSize="11" fill={secondary}>
            三者组合 = Web 端的系统级编程能力
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust WebAssembly：Rust 编译为 wasm，经 wasm-bindgen 桥接 JS，部署到多平台。
      </figcaption>
    </figure>
  );
}
