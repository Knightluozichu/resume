/**
 * <DogCrossPlatformDiagram>：跨平台兼容性
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogCrossPlatformDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="跨平台特性检测与降级路径" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">特性检测 → 分级 → 选路径 → 缺则降级</text>

          {/* 检测层 */}
          <rect x="40" y="50" width="640" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">运行时特性检测</text>
          <text x="60" y="92" fontSize="11" fill="var(--text-secondary)">{"getContext('webgl2')? · getSupportedExtensions() · getParameter(MAX_*) · getShaderInfoLog"}</text>
          <text x="60" y="110" fontSize="11" fill="var(--text-primary)">查到才用，版本号仅作粗筛</text>

          {/* 三条路径 */}
          <rect x="40" y="140" width="200" height="120" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="140" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">高端路径</text>
          <text x="56" y="184" fontSize="11" fill="var(--text-primary)">WebGL2 + color-buffer 探针</text>
          <text x="56" y="202" fontSize="11" fill="var(--text-secondary)">实例化 · UBO · HDR</text>
          <text x="56" y="220" fontSize="11" fill="var(--text-secondary)">浮点混合另行检测</text>
          <text x="56" y="240" fontSize="11" fill="var(--text-secondary)">完整后处理链</text>

          <rect x="260" y="140" width="200" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="360" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">中端路径</text>
          <text x="276" y="184" fontSize="11" fill="var(--text-primary)">仅 WebGL2</text>
          <text x="276" y="202" fontSize="11" fill="var(--text-secondary)">LDR · RGBA8</text>
          <text x="276" y="220" fontSize="11" fill="var(--text-secondary)">简化色调映射</text>
          <text x="276" y="240" fontSize="11" fill="var(--text-secondary)">基本后处理</text>

          <rect x="480" y="140" width="200" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="580" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">低端路径</text>
          <text x="496" y="184" fontSize="11" fill="var(--text-primary)">独立 WebGL1 后端</text>
          <text x="496" y="202" fontSize="11" fill="var(--text-secondary)">ES100 shader + 扩展适配</text>
          <text x="496" y="220" fontSize="11" fill="var(--text-secondary)">缺能力时选择替代算法</text>
          <text x="496" y="240" fontSize="11" fill="var(--text-secondary)">最少后处理</text>

          <line x1="240" y1="200" x2="260" y2="200" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#cpArrow)" />
          <line x1="460" y1="200" x2="480" y2="200" stroke="var(--accent)" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#cpArrow)" />
          <text x="250" y="194" textAnchor="middle" fontSize="11" fill="var(--accent)">降级</text>
          <text x="470" y="194" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">降级</text>

          {/* GLSL 多版本 */}
          <rect x="40" y="290" width="640" height="86" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">同一效果准备多份 GLSL</text>
          <text x="60" y="332" fontSize="11" fill="var(--accent)">ES2: #version 100 · attribute / varying · gl_FragColor</text>
          <text x="60" y="350" fontSize="11" fill="var(--accent)">ES3: #version 300 es · in / out · 自定义 out fragColor</text>
          <text x="60" y="368" fontSize="11" fill="var(--accent)">桌面: #version 330 core · in/out · layout 限定符</text>

          <defs>
            <marker id="cpArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">运行时按独立能力和格式探针选择路径，版本后端与 GLSL 变体保持一致</figcaption>
    </figure>
  );
}

const CONTRACT_STEPS = [
  ["声明需求", "把必需能力、可选质量和资源格式写成数据"],
  ["读取核心", "查询版本、限制值和核心对象入口"],
  ["启用扩展", "逐项 getExtension，并保存真实对象而非布尔猜测"],
  ["执行探针", "创建最小纹理/FBO/shader/draw，验证组合真的工作"],
  ["选择与记录", "返回路径、关闭的效果和缺失原因，进入设备遥测"],
] as const;

export function DogCapabilityContractDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <div
          role="img"
          aria-label="跨平台能力契约从声明需求到格式探针和路径遥测的流程"
          className="grid gap-2"
        >
          {CONTRACT_STEPS.map(([title, detail], index) => (
            <div
              key={title}
              className="grid min-h-14 grid-cols-[2rem_7rem_1fr] items-center gap-3 rounded-control border border-border bg-bg/40 p-3"
            >
              <span className="font-mono text-xs text-secondary">{index + 1}</span>
              <strong className="text-sm text-accent">{title}</strong>
              <span className="text-xs leading-5 text-secondary">{detail}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        版本和扩展名称只是证据之一，最小可执行探针才验证具体组合
      </figcaption>
    </figure>
  );
}
