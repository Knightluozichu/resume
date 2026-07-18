import type { ReactNode } from "react";

export { GammaCurveDiagram } from "../../diagrams/gamma-curve-diagram";
export { GammaGradientBarDiagram } from "../../diagrams/gamma-gradient-bar-diagram";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

type GammaStep = 1 | 2 | 3;

const pipelineRows = [
  {
    title: "输入：颜色纹理",
    detail: "albedo / diffuse 的 sRGB 值先解码为线性值；法线、粗糙度等数据纹理保持线性。",
    code: "sRGB texture -> linear sample",
    color: "var(--accent)",
  },
  {
    title: "中间：光照与合成",
    detail: "相加、衰减、混合、HDR 与中间 FBO 都保留在线性空间。",
    code: "lighting + post process in linear",
    color: "var(--warning)",
  },
  {
    title: "输出：仅编码一次",
    detail: "最终目标使用硬件 sRGB 编码，或最后一次 shader pow；两条路径二选一。",
    code: "linear -> sRGB exactly once",
    color: "var(--success)",
  },
] as const;

export function GammaPipelineContractDiagram({ step = 3 }: { step?: GammaStep }) {
  const rows = pipelineRows.slice(0, step);

  return (
    <Frame caption="Gamma 的边界是颜色管理边界，不是每个 shader 都随手 pow 一次。颜色输入先解码，中间结果保持线性，最终输出恰好编码一次；数据纹理和中间线性 FBO 不应被当作 sRGB 颜色处理。">
      <div
        role="img"
        aria-label="Gamma 颜色管线图，从 sRGB 颜色纹理解码为线性值，在线性空间执行光照和后处理，最终通过硬件 sRGB 或着色器 pow 仅一次编码到显示输出"
        className="grid gap-3"
      >
        {rows.map((row, index) => (
          <div key={row.title} className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 sm:grid-cols-[1.1fr_1.55fr_1.25fr] sm:items-center">
            <strong className="text-sm" style={{ color: row.color }}>{index + 1}. {row.title}</strong>
            <p className="text-xs leading-5 text-secondary">{row.detail}</p>
            <code className="break-words text-xs text-primary">{row.code}</code>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function GammaAttenuationContractDiagram() {
  return (
    <Frame caption="未校正时，显示器额外压暗会让物理的平方反比看起来过快衰减，团队常以线性或可调曲线补偿。进入线性工作流后，应从平方反比重新开始调参，再按画面需求保留艺术控制。">
      <div
        role="img"
        aria-label="Gamma 校正前后的光照衰减取舍图，未校正时平方反比在显示器压暗后看起来太快，校正后平方反比恢复物理上合理的视觉基础，艺术可调衰减仍可用于控制范围"
        className="grid gap-3 md:grid-cols-3"
      >
        <div className="rounded-control border border-border bg-bg/40 p-3">
          <strong className="text-sm text-danger">未校正</strong>
          <code className="mt-3 block text-xs text-primary">(1 / d^2)^2.2</code>
          <p className="mt-3 text-xs leading-5 text-secondary">显示器再压暗，平方反比显得过快；过去常以 1 / d 补偿。</p>
        </div>
        <div className="rounded-control border border-border bg-bg/40 p-3">
          <strong className="text-sm text-success">线性工作流</strong>
          <code className="mt-3 block text-xs text-primary">1 / d^2</code>
          <p className="mt-3 text-xs leading-5 text-secondary">光照在线性空间计算，平方反比重新成为合理起点。</p>
        </div>
        <div className="rounded-control border border-border bg-bg/40 p-3">
          <strong className="text-sm text-warning">艺术控制</strong>
          <code className="mt-3 block text-xs text-primary">1 / (kc + kl d + kq d^2)</code>
          <p className="mt-3 text-xs leading-5 text-secondary">仍可在校正后调参数控制光源范围，但不要复用旧的非线性参数。</p>
        </div>
      </div>
    </Frame>
  );
}
