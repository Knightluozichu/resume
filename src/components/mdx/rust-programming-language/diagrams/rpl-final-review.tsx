/**
 * <RplFinalReviewDiagram>：全书知识串联：所有权→借用→生命周期→trait→错误处理→泛型→并发→异步的完整体系。
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

export function RplFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书知识串联图。从所有权到借用、生命周期、trait、错误处理、泛型、并发和异步的完整 Rust 体系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`全书知识串联`}</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>{`从所有权到异步的完整 Rust 体系`}</text>
          <rect x={280} y={170} width={160} height={56} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.6" />
          <text x={360} y={194} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`核心知识`}</text>
          <text x={360} y={212} textAnchor="middle" fontSize="10" fill={secondary}>{`全书串联`}</text>
          <rect x={285} y={60} width={150} height={40} rx="6" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={360} y={80} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">{`所有权`}</text>
          <text x={360} y={94} textAnchor="middle" fontSize="9" fill={secondary}>{`move/drop 基础`}</text>
          <line x1={360} y1={198} x2={360} y2={78} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={440.88457268119896} y={120} width={150} height={40} rx="6" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={515.884572681199} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">{`借用与生命周期`}</text>
          <text x={515.884572681199} y={154} textAnchor="middle" fontSize="9" fill={secondary}>{`编译期引用安全`}</text>
          <line x1={360} y1={198} x2={515.884572681199} y2={138} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={440.88457268119896} y={240} width={150} height={40} rx="6" fill={elevated} stroke="var(--warning)" strokeWidth="1.2" />
          <text x={515.884572681199} y={260} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">{`trait 与泛型`}</text>
          <text x={515.884572681199} y={274} textAnchor="middle" fontSize="9" fill={secondary}>{`多态与抽象`}</text>
          <line x1={360} y1={198} x2={515.884572681199} y2={258} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={285} y={300} width={150} height={40} rx="6" fill={elevated} stroke="var(--danger)" strokeWidth="1.2" />
          <text x={360} y={320} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">{`错误处理`}</text>
          <text x={360} y={334} textAnchor="middle" fontSize="9" fill={secondary}>{`Result/? /thiserror`}</text>
          <line x1={360} y1={198} x2={360} y2={318} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={129.11542731880107} y={240.00000000000006} width={150} height={40} rx="6" fill={elevated} stroke="var(--accent)" strokeWidth="1.2" />
          <text x={204.11542731880107} y={260.00000000000006} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">{`线程并发`}</text>
          <text x={204.11542731880107} y={274.00000000000006} textAnchor="middle" fontSize="9" fill={secondary}>{`Send/Sync/Arc`}</text>
          <line x1={360} y1={198} x2={204.11542731880107} y2={258.00000000000006} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={129.11542731880104} y={120} width={150} height={40} rx="6" fill={elevated} stroke="var(--success)" strokeWidth="1.2" />
          <text x={204.11542731880104} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">{`async/await`}</text>
          <text x={204.11542731880104} y={154} textAnchor="middle" fontSize="9" fill={secondary}>{`状态机+runtime`}</text>
          <line x1={360} y1={198} x2={204.11542731880104} y2={138} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <text x={VIEW_W / 2} y={400} textAnchor="middle" fontSize="11" fill={secondary}>{`所有权是基础 · 借用/生命周期保安全 · trait/泛型做抽象 · 并发/异步是应用`}</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识串联：所有权→借用→生命周期→trait→错误处理→泛型→并发→异步的完整体系。
      </figcaption>
    </figure>
  );
}
