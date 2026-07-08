/**
 * <PopFinalReviewDiagram>：Python 自动化运维 全书四象限能力自检图。
 *
 * 四大板块（运维基础 · 系统管理 · 网络自动化 · 高级运维）能力矩阵。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

interface Quadrant {
  title: string;
  color: string;
  skills: string[];
  cx: number;
  cy: number;
}

const QUADRANTS: readonly Quadrant[] = [
  {
    title: "运维基础",
    color: accent,
    skills: ["学习地图", "Python 运维思维", "标准库/三方库/工程化"],
    cx: 180,
    cy: 130,
  },
  {
    title: "系统管理",
    color: success,
    skills: ["pathlib 文件操作", "subprocess 进程管理", "psutil 系统监控"],
    cx: 540,
    cy: 130,
  },
  {
    title: "网络自动化",
    color: warning,
    skills: ["requests HTTP 调用", "Paramiko SSH 运维", "BeautifulSoup 爬虫"],
    cx: 180,
    cy: 280,
  },
  {
    title: "高级运维",
    color: danger,
    skills: ["监控告警闭环", "配置管理幂等", "综合实战能力"],
    cx: 540,
    cy: 280,
  },
];

export function PopFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Python 自动化运维 全书四象限能力自检图：运维基础、系统管理、网络自动化、高级运维四大板块核心能力。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Python 自动化运维 全书能力自检
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            四大板块 · 十章知识 · 从基础到高级的递进闭环
          </text>

          {/* 十字分隔线 */}
          <line x1={360} y1={76} x2={360} y2={340} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <line x1={40} y1={208} x2={680} y2={208} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 四象限 */}
          {QUADRANTS.map((q) => (
            <g key={q.title}>
              <rect x={q.cx - 150} y={q.cy - 44} width={300} height={96} rx="10" fill={q.color} fillOpacity="0.06" stroke={q.color} strokeWidth="1.2" />
              <circle cx={q.cx - 130} cy={q.cy - 24} r="8" fill={q.color} fillOpacity="0.2" stroke={q.color} strokeWidth="1.4" />
              <text x={q.cx - 110} y={q.cy - 20} fontSize="13" fontWeight="700" fill={q.color}>
                {q.title}
              </text>
              {q.skills.map((s, i) => (
                <text key={s} x={q.cx - 130} y={q.cy + 2 + i * 16} fontSize="11" fill={primary}>
                  {`· ${s}`}
                </text>
              ))}
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={352} x2={VIEW_W - 32} y2={352} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="11" fill={secondary}>
            基础是地基 · 系统是骨架 · 网络是血脉 · 高级是大脑
          </text>
          <text x={VIEW_W / 2} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
            自动化运维 = 批量 + 健壮 + 安全 + 可观测
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 自动化运维 全书四象限能力自检：四大板块核心技能一览。
      </figcaption>
    </figure>
  );
}
