import type { ReactNode } from "react";

export { AttribDivisorDiagram } from "../../diagrams/attrib-divisor-diagram";
export { DrawcallCompareDiagram } from "../../diagrams/drawcall-compare-diagram";
export { InstancingDiagram } from "../../diagrams/instancing-diagram";
export { InstancingDemo } from "../../instancing-demo";

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

const batchRows = [
  {
    label: "共享项",
    detail: "同一网格、材质、shader 和兼容渲染状态",
    result: "可合成一个实例化批次",
    color: "var(--success)",
  },
  {
    label: "每实例项",
    detail: "变换、颜色、索引到的数据或自定义属性",
    result: "通过 gl_InstanceID 或 divisor 属性提供",
    color: "var(--accent)",
  },
  {
    label: "批次边界",
    detail: "不同 mesh / material / pipeline 不能由同一调用混画",
    result: "每个兼容批次各有一次 instanced draw",
    color: "var(--warning)",
  },
] as const;

export function InstancingBatchContractDiagram() {
  return (
    <Frame caption="实例化把同一批次的 N 次提交压成一次，但不会抹去批次边界。一个含 M 个子网格或材质的模型，通常仍需要 M 次实例化绘制；GPU 的顶点和片段工作也会随实例数增长。">
      <div
        role="img"
        aria-label="实例化批次契约图，说明同一网格材质和渲染状态可组成一个批次，每实例变换和颜色通过实例数据提供，不同网格材质或管线需要各自的实例化绘制调用"
        className="grid gap-3"
      >
        {batchRows.map((row, index) => (
          <div
            key={row.label}
            className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 text-xs sm:grid-cols-[1.1fr_1.65fr_1.45fr] sm:items-center"
          >
            <strong style={{ color: row.color }}>{index + 1}. {row.label}</strong>
            <span className="text-secondary">{row.detail}</span>
            <span style={{ color: row.color }}>{row.result}</span>
          </div>
        ))}
        <p className="rounded-control border border-border bg-bg/40 p-3 text-xs text-secondary">
          <strong className="text-primary">性能读法：</strong>实例化主要削减 CPU / 驱动提交开销；实例数变大时，顶点处理、片段处理、带宽与过绘仍会增加，应继续用 profiler 判断新的瓶颈。
        </p>
      </div>
    </Frame>
  );
}

const matrixColumns = ["location 3", "location 4", "location 5", "location 6"] as const;

export function InstancingMatrixLayoutDiagram() {
  return (
    <Frame caption="一个 mat4 是四列 vec4，因此一个实例矩阵必须占用四个连续的顶点属性位置。每个 VAO 都要记录四个 pointer 和四个 divisor=1；漏任一列都会得到错误变换。">
      <div
        role="img"
        aria-label="实例矩阵布局图，mat4 按四列 vec4 依次映射到 location 3 到 6，每个属性位置都需要顶点属性指针和 divisor 等于一，之后由 instance matrix 乘顶点位置"
        className="grid gap-3"
      >
        <div className="grid gap-2 sm:grid-cols-4">
          {matrixColumns.map((column, index) => (
            <div key={column} className="rounded-control border border-border bg-bg/40 p-3 text-center text-xs">
              <strong className="text-accent">{column}</strong>
              <p className="mt-2 font-mono text-secondary">mat4 column {index}</p>
              <p className="mt-2 text-secondary">pointer + divisor = 1</p>
            </div>
          ))}
        </div>
        <div className="rounded-control border border-border bg-bg/40 p-3 font-mono text-xs text-primary">
          projection * view * instanceMatrix * vec4(aPos, 1.0)
        </div>
      </div>
    </Frame>
  );
}
