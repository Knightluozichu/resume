import type { ReactNode } from "react";

const columns = [
  {
    title: "物理与数值基础",
    color: "var(--accent)",
    rows: ["1 Introduction", "2 Light Transport", "3 Monte Carlo", "4 Strategies"],
  },
  {
    title: "核心求解器",
    color: "var(--success)",
    rows: ["5 Path Tracing", "6 Stochastic Radiosity", "7 Hybrid Algorithms"],
  },
  {
    title: "边界与实现",
    color: "var(--warning)",
    rows: ["8 Realism & Speed", "9 Conclusion", "A / B / C Appendices"],
  },
] as const;

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function GilLearningMapDiagram() {
  return (
    <Frame caption="第二版的主线是先建立光传输算子，再比较随机路径、随机辐射度与混合算法，最后讨论速度、感知和未解问题。">
      <div role="img" aria-label="Advanced Global Illumination 第二版九章三附录结构" className="grid gap-3 lg:grid-cols-3">
        {columns.map((column, index) => (
          <section key={column.title} className="border border-border bg-bg/40 p-3">
            <div className="mb-3 flex items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: column.color }}>{index + 1}</span>
              <strong className="text-sm text-primary">{column.title}</strong>
            </div>
            <div className="grid gap-2">
              {column.rows.map((row) => <div key={row} className="min-h-9 border-l-2 border-border bg-elevated px-3 py-2 text-xs text-secondary">{row}</div>)}
            </div>
          </section>
        ))}
      </div>
    </Frame>
  );
}

const owners = [
  ["direct-indirect", "1, 2, B", "物理、方程、半球坐标"],
  ["importance-sampling", "3", "Monte Carlo 与方差缩减"],
  ["bias-unbiased", "4", "策略分类、伴随量与路径表述"],
  ["path-tracing", "5, A", "随机路径与实现类库"],
  ["radiosity", "6, C", "随机辐射度与理论分析"],
  ["advanced-techniques", "7", "混合算法全景"],
  ["photon-mapping", "7.6", "光子映射专项"],
  ["realtime-gi", "8, 9", "真实感、速度与结论"],
] as const;

export function GilChapterOwnershipDiagram() {
  return (
    <Frame caption="每个原书单元只设一个正文责任页；光子映射是第 7 章专项，不伪装成独立原书章节。">
      <div role="img" aria-label="九章三附录到八个正文责任页的映射" className="overflow-x-auto">
        <div className="min-w-[660px] border border-border">
          <div className="grid grid-cols-[1.35fr_.7fr_1.6fr] bg-bg px-3 py-2 text-xs font-bold text-primary">
            <span>正文页</span><span>原书单元</span><span>不可缺失的知识责任</span>
          </div>
          {owners.map(([page, units, responsibility], index) => (
            <div key={page} className={`grid min-h-11 grid-cols-[1.35fr_.7fr_1.6fr] items-center gap-2 px-3 py-2 text-xs ${index % 2 === 0 ? "bg-elevated" : "bg-bg/40"}`}>
              <code className="text-accent">gil-{page}</code><strong className="text-primary">{units}</strong><span className="text-secondary">{responsibility}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

const evidence = [
  ["目录证据", "版本、章名、唯一责任页", "12/12"],
  ["教学证据", "概念、公式、算法、专用图", ">= 90"],
  ["验证证据", "参考值、边界输入、误差预算", "可复现"],
] as const;

export function GilEvidenceLoopDiagram() {
  return (
    <Frame caption="目录覆盖回答“有没有”，教学与验证证据共同回答“是否真的掌握”。">
      <div role="img" aria-label="全局光照章节的目录教学验证三重验收循环" className="grid gap-3 md:grid-cols-3">
        {evidence.map(([title, body, gate], index) => (
          <div key={title} className="relative min-h-36 border border-border bg-bg/40 p-4">
            <div className="mb-3 flex items-center justify-between gap-3"><strong className="text-sm text-primary">{index + 1}. {title}</strong><span className="text-xs font-bold text-accent">{gate}</span></div>
            <p className="m-0 text-sm leading-6 text-secondary">{body}</p>
            <div className="absolute inset-x-4 bottom-3 h-1 bg-border"><div className="h-full bg-success" style={{ width: index === 0 ? "100%" : index === 1 ? "90%" : "75%" }} /></div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
