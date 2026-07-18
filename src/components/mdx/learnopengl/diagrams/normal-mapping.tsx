import type { ReactNode } from "react";

export { NormalDecodeDiagram } from "../../diagrams/normal-decode-diagram";
export { TBNDiagram } from "../../diagrams/tbn-diagram";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

type Step = 1 | 2 | 3;

const rows = [
  {
    title: "法线图是线性数据",
    detail: "RGB 存的是编码的方向，不是 albedo；不要按 sRGB 解码。",
    code: "normalMap: linear texture",
    color: "var(--accent)",
  },
  {
    title: "先从颜色还原方向",
    detail: "采样范围 [0,1]，需要映射回 [-1,1] 并归一化。",
    code: "tangentN = normalize(rgb * 2.0 - 1.0)",
    color: "var(--warning)",
  },
  {
    title: "点乘前统一坐标空间",
    detail:
      "把 tangentN 乘 TBN 到世界空间，或把光/视向量乘 transpose(TBN) 到切线空间。",
    code: "worldN = normalize(TBN * tangentN)",
    color: "var(--success)",
  },
] as const;

export function NormalMapSpaceContractDiagram({ step = 3 }: { step?: Step }) {
  return (
    <Frame caption="法线贴图的三个不可交换步骤：它是线性方向数据，采样后先解码，再令法线和光/视向量落在同一坐标空间。漏任一步都会产生看似有凹凸、实则方向错误的光照。">
      <div
        role="img"
        aria-label="法线贴图空间契约图，显示法线图必须保持线性，采样 RGB 乘二减一还原切线空间法线，最后使用 TBN 变换到世界空间或把光和视线变到切线空间"
        className="grid gap-3"
      >
        {rows.slice(0, step).map((row, index) => (
          <div
            key={row.title}
            className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 sm:grid-cols-[1.1fr_1.6fr_1.3fr] sm:items-center"
          >
            <strong className="text-sm" style={{ color: row.color }}>
              {index + 1}. {row.title}
            </strong>
            <p className="text-xs leading-5 text-secondary">{row.detail}</p>
            <code className="break-words text-xs text-primary">{row.code}</code>
          </div>
        ))}
      </div>
    </Frame>
  );
}
