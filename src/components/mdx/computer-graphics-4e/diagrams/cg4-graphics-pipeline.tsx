const systemStages = [
  ["Application", "scene/data + interaction", "生成绘制意图"],
  ["API + driver", "state + commands + resources", "验证并编码工作"],
  ["GPU pipeline", "vertices → primitives → fragments", "并行执行与采样"],
  ["Framebuffer + display", "color/depth → scanout", "编码、合成与显示"],
] as const;

const debugRows = [
  ["无图元", "draw/vertex input/clip", "捕获顶点数与 clip position"],
  ["形状错误", "transform/viewport/raster", "坐标快照、w、覆盖样本"],
  ["颜色错误", "interpolation/shader/color model", "线性值、attachment、transfer"],
  ["局部缺失", "cull/depth/stencil/blend", "逐阶段状态和 overdraw"],
  ["性能异常", "CPU submit 或 GPU stage", "timeline + pipeline counters"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4GraphicsPipelineDiagram() {
  return (
    <Frame caption="图形系统从应用意图开始，以显示编码结束；GPU raster pipeline 只是中间一层。">
      <div role="img" aria-label="计算机图形系统和渲染管线数据流" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Application-to-display path</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {systemStages.map(([name, data, result], index) => (
            <div key={name} className="min-h-40 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{name}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{data}</p>
              <p className="mb-0 mt-2 text-xs font-medium text-primary">{result}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function Cg4PipelineDebugDiagram() {
  return (
    <Frame caption="按第一个失真的中间表示定位问题，比从最终黑屏猜 shader 更可靠。">
      <div role="img" aria-label="图形管线故障定位矩阵" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.2fr_1.8fr_2fr] gap-px bg-border text-xs">
            {['症状', '首查阶段', '证据'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {debugRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
