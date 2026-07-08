/**
 * <RplLearningMapDiagram>：Rust 程序设计语言全书四大板块与十章结构。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function RplLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Rust 程序设计语言全书学习地图。四大板块：基础语法、类型系统、高级特性、并发与现代特性。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Rust 程序设计语言 全书学习地图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            基础语法 · 类型系统 · 高级特性 · 并发与异步
          </text>
          <rect x={36} y={76} width={100} height={52} rx="8" fill={var(--accent)} fillOpacity="0.12" stroke={var(--accent)} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={86} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--accent)}>基础语法</text>
          <text x={86} y={114} textAnchor="middle" fontSize="10" fill={secondary}>{`2 章`}</text>
          <rect x={60} y={76} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={115} y={98} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>学习地图</text>
          <text x={115} y={116} textAnchor="middle" fontSize="10" fill={secondary}>{`第 1 章`}</text>
          <rect x={190} y={76} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={245} y={98} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>所有权</text>
          <text x={245} y={116} textAnchor="middle" fontSize="10" fill={secondary}>{`第 2 章`}</text>
          <line x1={86} y1={128} x2={86} y2={142} stroke={secondary} strokeWidth="1.4" markerEnd="url(#lm-arrow-0)" />
          <rect x={36} y={159} width={100} height={52} rx="8" fill={var(--success)} fillOpacity="0.12" stroke={var(--success)} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={86} y={179} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--success)}>类型系统</text>
          <text x={86} y={197} textAnchor="middle" fontSize="10" fill={secondary}>{`2 章`}</text>
          <rect x={60} y={159} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={115} y={181} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>借用与引用</text>
          <text x={115} y={199} textAnchor="middle" fontSize="10" fill={secondary}>{`第 3 章`}</text>
          <rect x={190} y={159} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={245} y={181} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>生命周期</text>
          <text x={245} y={199} textAnchor="middle" fontSize="10" fill={secondary}>{`第 4 章`}</text>
          <line x1={86} y1={211} x2={86} y2={225} stroke={secondary} strokeWidth="1.4" markerEnd="url(#lm-arrow-1)" />
          <rect x={36} y={242} width={100} height={52} rx="8" fill={var(--warning)} fillOpacity="0.12" stroke={var(--warning)} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={86} y={262} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--warning)}>高级特性</text>
          <text x={86} y={280} textAnchor="middle" fontSize="10" fill={secondary}>{`3 章`}</text>
          <rect x={60} y={242} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={115} y={264} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>trait</text>
          <text x={115} y={282} textAnchor="middle" fontSize="10" fill={secondary}>{`第 5 章`}</text>
          <rect x={190} y={242} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={245} y={264} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>错误处理</text>
          <text x={245} y={282} textAnchor="middle" fontSize="10" fill={secondary}>{`第 6 章`}</text>
          <rect x={320} y={242} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={375} y={264} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>泛型</text>
          <text x={375} y={282} textAnchor="middle" fontSize="10" fill={secondary}>{`第 7 章`}</text>
          <line x1={86} y1={294} x2={86} y2={308} stroke={secondary} strokeWidth="1.4" markerEnd="url(#lm-arrow-2)" />
          <rect x={36} y={325} width={100} height={52} rx="8" fill={var(--danger)} fillOpacity="0.12" stroke={var(--danger)} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={86} y={345} textAnchor="middle" fontSize="12" fontWeight="700" fill={var(--danger)}>并发与异步</text>
          <text x={86} y={363} textAnchor="middle" fontSize="10" fill={secondary}>{`3 章`}</text>
          <rect x={60} y={325} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={115} y={347} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>线程并发</text>
          <text x={115} y={365} textAnchor="middle" fontSize="10" fill={secondary}>{`第 8 章`}</text>
          <rect x={190} y={325} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={245} y={347} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>async/await</text>
          <text x={245} y={365} textAnchor="middle" fontSize="10" fill={secondary}>{`第 9 章`}</text>
          <rect x={320} y={325} width={110} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={375} y={347} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>总复习</text>
          <text x={375} y={365} textAnchor="middle" fontSize="10" fill={secondary}>{`第 10 章`}</text>
          <defs>
            <marker id="lm-arrow-0" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" /></marker>
            <marker id="lm-arrow-1" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" /></marker>
            <marker id="lm-arrow-2" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" /></marker>
          </defs>
          <line x1={32} y1={396} x2={VIEW_W - 32} y2={396} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust 程序设计语言全书四大板块与十章结构。
      </figcaption>
    </figure>
  );
}
