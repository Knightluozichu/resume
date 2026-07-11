import type { ReactNode } from "react";

export { BufferLayoutDiagram } from "../../diagrams/buffer-layout-diagram";
export { BufferSubDataDiagram } from "../../diagrams/buffer-subdata-diagram";

const rows = [
  { title: "原地 subData", cpu: "覆盖旧存储", gpu: "可能仍在读取", result: "驱动可能等待", color: "var(--warning)" },
  { title: "orphan 后上传", cpu: "bufferData(NULL) 换存储", gpu: "继续使用旧存储", result: "减少写后读冲突", color: "var(--success)" },
  { title: "映射 range", cpu: "按 flags 取得区间", gpu: "同步责任取决于 flags", result: "错误使用仍会 stall/破坏", color: "var(--accent)" },
] as const;

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function BufferUpdateHazardDiagram() {
  return (
    <Frame caption="更新速度不仅取决于字节数，还取决于旧存储是否仍被 GPU 使用。orphaning 让驱动提供新存储，避免 CPU 为同一块忙碌区域等待。">
      <div role="img" aria-label="缓冲更新同步风险对比，原地更新可能等待 GPU，孤儿化后上传允许 GPU 继续读旧存储，映射区间的同步取决于映射标志" className="grid gap-3">
        {rows.map((row) => (
          <div key={row.title} className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 text-xs sm:grid-cols-4 sm:items-center">
            <strong style={{ color: row.color }}>{row.title}</strong>
            <span className="text-secondary">CPU：{row.cpu}</span>
            <span className="text-secondary">GPU：{row.gpu}</span>
            <span style={{ color: row.color }}>{row.result}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}
