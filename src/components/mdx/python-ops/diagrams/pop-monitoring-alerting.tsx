/**
 * <PopMonitoringAlertingDiagram>：运维监控与告警流程图。
 *
 * 左侧 psutil 四维度采集，右侧告警管道（采集→阈值判定→通知分发）。
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

interface Metric {
  label: string;
  value: string;
  color: string;
}

const METRICS: readonly Metric[] = [
  { label: "CPU 使用率", value: "cpu_percent()", color: accent },
  { label: "内存占用", value: "virtual_memory()", color: success },
  { label: "磁盘 IO", value: "disk_usage()", color: warning },
  { label: "网络流量", value: "net_io_counters()", color: danger },
];

interface AlertStep {
  step: string;
  title: string;
  desc: string;
  color: string;
}

const ALERT_STEPS: readonly AlertStep[] = [
  { step: "1", title: "采集", desc: "psutil 定时采样", color: accent },
  { step: "2", title: "判定", desc: "阈值对比 > 80%", color: warning },
  { step: "3", title: "通知", desc: "邮件/短信/钉钉", color: danger },
];

export function PopMonitoringAlertingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="运维监控与告警流程图：左侧 psutil 采集 CPU/内存/磁盘/网络四维度指标，右侧告警管道采集→阈值判定→通知分发三步。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            运维监控与告警：从采集到通知
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            psutil 采集指标 · 阈值判定 · 多渠道告警
          </text>

          {/* 左面板：psutil 四维度采集 */}
          <rect x={36} y={84} width={300} height={240} rx="10" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={186} y={108} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            psutil 指标采集
          </text>
          <line x1={56} y1={120} x2={316} y2={120} stroke={border} strokeWidth="1" strokeDasharray="3 2" />

          {METRICS.map((m, i) => {
            const y = 146 + i * 42;
            return (
              <g key={m.label}>
                <rect x={56} y={y - 14} width={14} height={28} rx="3" fill={m.color} fillOpacity="0.15" stroke={m.color} strokeWidth="1" />
                <circle cx={63} cy={y} r="4" fill={m.color} />
                <text x={82} y={y - 2} fontSize="12" fontWeight="600" fill={primary}>
                  {m.label}
                </text>
                <text x={82} y={y + 13} fontSize="11" fill={secondary} fontFamily="monospace">
                  {m.value}
                </text>
              </g>
            );
          })}

          {/* 箭头：采集→判定 */}
          <line x1={336} y1={204} x2={384} y2={204} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pop-ma-arrow)" />
          <text x={360} y={196} textAnchor="middle" fontSize="11" fill={secondary}>
            指标流
          </text>

          {/* 右面板：告警管道三步 */}
          <rect x={384} y={84} width={300} height={240} rx="10" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={534} y={108} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
            告警管道
          </text>
          <line x1={404} y1={120} x2={664} y2={120} stroke={border} strokeWidth="1" strokeDasharray="3 2" />

          {ALERT_STEPS.map((s, i) => {
            const y = 150 + i * 64;
            return (
              <g key={s.step}>
                <rect x={404} y={y - 16} width={246} height={44} rx="8" fill={s.color} fillOpacity="0.1" stroke={s.color} strokeWidth="1.2" />
                <circle cx={424} cy={y + 6} r="12" fill={s.color} fillOpacity="0.2" stroke={s.color} strokeWidth="1.4" />
                <text x={424} y={y + 10} textAnchor="middle" fontSize="12" fontWeight="700" fill={s.color}>
                  {s.step}
                </text>
                <text x={446} y={y + 2} fontSize="12" fontWeight="600" fill={primary}>
                  {s.title}
                </text>
                <text x={446} y={y + 17} fontSize="11" fill={secondary}>
                  {s.desc}
                </text>
                {i < ALERT_STEPS.length - 1 && (
                  <line x1={534} y1={y + 28} x2={534} y2={y + 48} stroke={secondary} strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#pop-ma-arrow)" />
                )}
              </g>
            );
          })}

          <defs>
            <marker id="pop-ma-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={352} x2={VIEW_W - 32} y2={352} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="11" fill={secondary}>
            采集是基础 · 阈值是规则 · 告警是结果 · 闭环是目标
          </text>
          <text x={VIEW_W / 2} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
            告警须可抑制、可聚合、可升级，避免告警风暴
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        运维监控与告警：psutil 四维度采集指标，经阈值判定后多渠道分发告警。
      </figcaption>
    </figure>
  );
}
