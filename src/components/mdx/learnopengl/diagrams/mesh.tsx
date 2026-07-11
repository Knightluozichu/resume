import type { ReactNode } from "react";

export { MeshDataLayoutDiagram } from "../../diagrams/mesh-data-layout-diagram";
export { MeshTextureBindingDiagram } from "../../diagrams/mesh-texture-binding-diagram";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

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

const stages = [
  {
    title: "上传数据",
    code: "vector.data() -> VBO / EBO",
    result: "GPU 获得连续的顶点与索引字节",
    color: accent,
  },
  {
    title: "记录布局",
    code: "sizeof(Vertex) + offsetof",
    result: "VAO 记住属性格式与 EBO 绑定",
    color: success,
  },
  {
    title: "绑定并绘制",
    code: "texture units -> glDrawElements",
    result: "采样器、纹理单元和索引契约对齐",
    color: warning,
  },
] as const;

export function MeshSetupStagesDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const through = step === 0 ? 3 : step;

  return (
    <Frame caption="一个可绘制 Mesh 要完成三份契约：上传有效字节、让 VAO 记录真实结构体布局、按着色器约定绑定纹理后索引绘制。">
      <div
        role="img"
        aria-label={`Mesh 建立与绘制流程第 ${step || "全部"} 步`}
        className="grid gap-3 md:grid-cols-3"
      >
        {stages.map((stage, index) => {
          const active = index < through;
          return (
            <div
              key={stage.title}
              data-stage={index + 1}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: stage.color, opacity: active ? 1 : 0.28 }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-control text-xs font-bold text-bg"
                  style={{ backgroundColor: stage.color }}
                >
                  {index + 1}
                </span>
                <strong className="text-sm text-primary">{stage.title}</strong>
              </div>
              <p className="mt-3 break-words font-mono text-[10px]" style={{ color: stage.color }}>
                {stage.code}
              </p>
              <p className="mt-2 text-xs text-secondary">{stage.result}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

export function MeshLifecycleDiagram() {
  const items = [
    { title: "CPU 数据", detail: "vertices / indices / textures", color: accent },
    { title: "GPU 资源", detail: "VAO / VBO / EBO", color: success },
    { title: "绘制", detail: "Draw(shader)", color: warning },
    { title: "释放", detail: "delete VAO / VBO / EBO", color: "var(--danger)" },
  ] as const;

  return (
    <Frame caption="Mesh 同时持有 CPU 容器与独占 GPU 句柄；析构必须释放句柄，复制必须禁用或定义共享语义，移动则转交句柄所有权。">
      <div
        role="img"
        aria-label="Mesh 从 CPU 顶点索引纹理数据上传到 VAO VBO EBO，绘制后在析构时释放 GPU 资源的生命周期"
        className="grid gap-2 sm:grid-cols-4"
      >
        {items.map((item, index) => (
          <div key={item.title} className="relative rounded-control border border-border bg-bg/40 p-3">
            <span className="text-xs font-bold" style={{ color: item.color }}>
              {index + 1}. {item.title}
            </span>
            <p className="mt-2 break-words font-mono text-[10px] text-secondary">{item.detail}</p>
            {index < items.length - 1 ? (
              <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-secondary sm:block">
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}
