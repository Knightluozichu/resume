const spaces = [
  ["Local", "object coordinates", "M"],
  ["World", "shared scene coordinates", "V"],
  ["View", "camera-relative coordinates", "P"],
  ["Clip", "homogeneous view volume", "÷ w"],
  ["NDC/Screen", "viewport + depth mapping", "sample"],
] as const;

const transformRows = [
  ["Point", "w=1", "平移、旋转、缩放"],
  ["Direction", "w=0", "无平移；线性部分"],
  ["Normal", "covector", "inverse-transpose linear part"],
  ["Camera", "frame transform", "world matrix 的逆"],
  ["Child node", "local frame", "parentWorld × childLocal"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4TransformationsDiagram() {
  return (
    <Frame caption="每条箭头是坐标合同；Clip 到 NDC 的除 w 不可提前，也不是普通仿射矩阵。">
      <div role="img" aria-label="模型世界观察裁剪屏幕坐标链" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Coordinate-space chain</strong>
        <div className="grid gap-3 lg:grid-cols-5">
          {spaces.map(([name, meaning, next], index) => (
            <div key={name} className="min-h-36 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{name}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{meaning}</p>
              {index < spaces.length - 1 && <code className="mt-2 block text-xs text-accent">next: {next}</code>}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function Cg4TransformRolesDiagram() {
  return (
    <Frame caption="点、方向、法线、相机和层次节点不是同一种变换对象，不能统一乘同一 4×4 后结束。">
      <div role="img" aria-label="几何对象变换规则矩阵" className="overflow-x-auto">
        <div className="min-w-[680px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.2fr_1.2fr_2fr] gap-px bg-border text-xs">
            {['对象', '表示', '正确变换'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {transformRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
