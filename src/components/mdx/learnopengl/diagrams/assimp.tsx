import type { ReactNode } from "react";

export { AssimpImportFlowDiagram } from "../../diagrams/assimp-import-flow-diagram";
export { AssimpSceneGraphDiagram } from "../../diagrams/assimp-scene-graph-diagram";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const stages = [
  { title: "链接 Assimp", code: "find_package + target_link_libraries", result: "头文件与库目标可用", color: accent },
  { title: "ReadFile + flags", code: "Importer.ReadFile(path, flags)", result: "得到受 Importer 管理的 aiScene", color: success },
  { title: "验证并复制", code: "scene / flags / root → traverse", result: "复制成自己的 Mesh/Model 数据", color: warning },
] as const;

export function AssimpImportStagesDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const through = step === 0 ? 3 : step;
  return (
    <Frame caption="导入成功不只是一句 ReadFile：工程先链接库，运行时再解析与验证，最后在 Importer 存活期间复制所需数据。">
      <div role="img" aria-label={`Assimp 可复刻导入流程第 ${step || "全部"} 步`} className="grid gap-3 md:grid-cols-3">
        {stages.map((stage, i) => {
          const on = i < through;
          return (
            <div key={stage.title} data-stage={i + 1} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: stage.color, opacity: on ? 1 : 0.28 }}>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-control text-xs font-bold text-bg" style={{ backgroundColor: stage.color }}>{i + 1}</span>
                <strong className="text-sm text-primary">{stage.title}</strong>
              </div>
              <p className="mt-3 break-words font-mono text-[10px]" style={{ color: stage.color }}>{stage.code}</p>
              <p className="mt-2 text-xs text-secondary">{stage.result}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

export function AssimpOwnershipDiagram() {
  return (
    <Frame caption="scene 是 Importer 内部数据的借用指针，不是独立所有权；Model 构造期间应复制顶点、索引和纹理信息，不能把裸指针留到 Importer 析构后。">
      <div role="img" aria-label="Assimp Importer 拥有 aiScene 节点网格材质内存，应用模型复制数据后才能独立生存" className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="rounded-control border border-accent bg-bg/40 p-3">
          <strong className="text-sm text-primary">Assimp::Importer 生命周期</strong>
          <div className="mt-3 grid gap-2 text-xs">
            <span className="rounded-control border border-border px-2 py-2 font-mono text-accent">const aiScene* scene</span>
            <span className="rounded-control border border-border px-2 py-2 text-secondary">aiNode / aiMesh / aiMaterial 由 Importer 管理</span>
          </div>
        </div>
        <span className="hidden text-secondary md:block">copy →</span>
        <div className="rounded-control border border-success bg-bg/40 p-3">
          <strong className="text-sm text-primary">应用自己的 Model</strong>
          <div className="mt-3 grid gap-2 text-xs">
            <span className="rounded-control border border-border px-2 py-2 text-success">vector&lt;Vertex&gt; / indices / textures</span>
            <span className="rounded-control border border-border px-2 py-2 text-secondary">Importer 销毁后仍然有效</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}
