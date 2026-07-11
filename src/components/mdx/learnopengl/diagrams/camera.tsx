import type { ReactNode } from "react";

export { CameraMovementDiagram } from "../../diagrams/camera-movement-diagram";
export { EulerAnglesDiagram } from "../../diagrams/euler-angles-diagram";
export { LookAtDiagram } from "../../diagrams/lookat-diagram";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

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

const stateRows = [
  { name: "position", role: "摄像机站在哪里", source: "WASD × speed × dt", color: success },
  { name: "yaw / pitch", role: "摄像机朝哪里", source: "mouse offset × sensitivity", color: accent },
  { name: "front / right / up", role: "移动与观察正交基", source: "角度重算 + cross + normalize", color: warning },
  { name: "fov", role: "镜头视场角", source: "scroll offset + clamp", color: danger },
] as const;

export function CameraStateContractDiagram() {
  return (
    <Frame caption="输入事件只修改摄像机状态；每帧再由状态构造 View 与 Projection，渲染代码不直接解释键鼠事件。">
      <div className="grid gap-3 md:grid-cols-2" role="img" aria-label="摄像机状态契约，位置由键盘和帧时间更新，朝向由鼠标更新，正交基由角度重算，视场角由滚轮更新">
        {stateRows.map((row) => (
          <div key={row.name} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: row.color }}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <strong className="font-mono text-sm" style={{ color: row.color }}>{row.name}</strong>
              <span className="text-xs text-secondary">{row.role}</span>
            </div>
            <div className="mt-3 rounded-control border border-border bg-elevated px-3 py-2 font-mono text-[11px] text-primary">
              {row.source}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-control border border-accent bg-bg/40 px-3 py-2 text-center text-xs text-primary">
        view = lookAt(position, position + front, up) · projection = perspective(fov, aspect, near, far)
      </div>
    </Frame>
  );
}

const loopStages = [
  { title: "采样输入", code: "keys · mouse Δ · wheel", result: "意图与偏移量", color: accent },
  { title: "更新状态", code: "position += dir·speed·dt", result: "帧率无关的位置", color: success },
  { title: "重算正交基", code: "front(yaw,pitch) · cross", result: "front / right / up", color: warning },
  { title: "生成矩阵", code: "lookAt + perspective", result: "View / Projection", color: danger },
] as const;

export function CameraUpdateLoopDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const active = step === 0 ? [0, 1, 2, 3] : step === 1 ? [0] : step === 2 ? [0, 1] : [0, 1, 2, 3];

  return (
    <Frame caption="稳定相机每帧遵循同一顺序：先采样输入，再更新时间相关状态，随后重算正交基，最后生成矩阵。">
      <svg viewBox="0 0 900 285" role="img" aria-label={`摄像机每帧更新循环第 ${step || "全部"} 步`} className="mx-auto hidden h-auto w-full max-w-[900px] md:block">
        <text x="450" y="28" textAnchor="middle" fontSize="17" fontWeight="700" fill={primary}>Camera update loop</text>
        {loopStages.map((stage, i) => {
          const on = active.includes(i);
          const x = 16 + i * 221;
          return (
            <g key={stage.title} data-stage={i + 1} opacity={on ? 1 : 0.25}>
              <rect x={x} y="60" width="204" height="164" rx="8" fill={stage.color} fillOpacity={on ? 0.08 : 0.02} stroke={stage.color} strokeWidth={step > 0 && on && i === active.at(-1) ? 2.5 : 1.2} />
              <circle cx={x + 28} cy="89" r="15" fill={stage.color} />
              <text x={x + 28} y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bg)">{i + 1}</text>
              <text x={x + 52} y="94" fontSize="12" fontWeight="700" fill={primary}>{stage.title}</text>
              <rect x={x + 12} y="118" width="180" height="42" rx="6" fill={elevated} stroke={border} />
              <text x={x + 102} y="143" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill={stage.color}>{stage.code}</text>
              <text x={x + 102} y="190" textAnchor="middle" fontSize="11" fill={secondary}>{stage.result}</text>
            </g>
          );
        })}
        {[210, 431, 652].map((x) => (
          <path key={x} d={`M${x} 142 H${x + 24} M${x + 16} 134 L${x + 25} 142 L${x + 16} 150`} fill="none" stroke={border} strokeWidth="2" />
        ))}
        <path d="M866 235 C866 270 35 270 35 235" fill="none" stroke={secondary} strokeDasharray="5 4" />
        <text x="450" y="272" textAnchor="middle" fontSize="10" fill={secondary}>requestAnimationFrame：下一帧重新采样</text>
      </svg>

      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">Camera update loop</p>
        {loopStages.map((stage, i) => {
          const on = active.includes(i);
          return (
            <div key={stage.title} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: stage.color, opacity: on ? 1 : 0.3 }}>
              <div className="flex items-start justify-between gap-3">
                <strong className="text-sm text-primary">{i + 1}. {stage.title}</strong>
                <span className="font-mono text-[10px]" style={{ color: stage.color }}>{stage.code}</span>
              </div>
              <p className="mt-2 text-xs text-secondary">输出：{stage.result}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}
