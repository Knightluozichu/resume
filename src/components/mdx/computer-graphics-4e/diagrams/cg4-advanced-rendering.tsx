const applicationStages = [
  ["Generate", "model / animation / simulation", "随时间产生场景或数据状态"],
  ["Interact", "input / picking / GUI", "把用户意图映射回状态"],
  ["Transport", "visibility / local + global light", "计算传感器收到的贡献"],
  ["Visualize", "encoding / transfer function / volume", "让数据语义可读且可验证"],
] as const;

const methodRows = [
  ["Shadow map", "direct visibility", "离散 light-space depth；bias/filter 误差"],
  ["Deferred shading", "surface attributes then lights", "opaque 多光源；G-buffer bandwidth/单层"],
  ["Path tracing", "Monte Carlo light paths", "通用 transport；variance 与求交成本"],
  ["Radiosity", "diffuse patch energy exchange", "漫反射静态场景；离散和线性系统"],
  ["Volume rendering", "ray integral through field", "科学/医学数据；transfer function 与采样"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4AdvancedRenderingDiagram() {
  return (
    <Frame caption="高级图形应用是生成、交互、光传输和可视编码的闭环，不是效果列表。">
      <div role="img" aria-label="动画交互渲染可视化闭环" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Graphics application loop</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {applicationStages.map(([stage, operation, purpose], index) => (
            <div key={stage} className="min-h-40 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{stage}</strong>
              <code className="mt-2 block text-xs text-accent">{operation}</code>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{purpose}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function Cg4AdvancedMethodsDiagram() {
  return (
    <Frame caption="每种方法估计不同贡献并引入不同偏差、方差、带宽和数据语义风险。">
      <div role="img" aria-label="高级渲染与可视化方法对比" className="overflow-x-auto">
        <div className="min-w-[760px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.3fr_1.8fr_2.4fr] gap-px bg-border text-xs">
            {['方法', '估计对象', '边界'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {methodRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
