/**
 * <VsiOtaUpdatesDiagram>：OTA 升级流程图（A/B 分区架构）。
 *
 * 上半区 A/B 双分区：Slot A（当前激活）与 Slot B（备用），由 Bootloader
 * 指针切换；下半区五步升级流程：
 *   下载差分包 → 校验签名 → 写入备用分区 → 切换启动分区 → 回滚保护
 * 标注差分更新原理（bsdiff/bspatch）与安全验证链（签名 + 哈希 + 证书）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×560（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const SLOT_W = 280;
const SLOT_H = 150;
const SLOT_Y = 96;
const SLOT_A_X = 60;
const SLOT_B_X = 380;

interface Step {
  no: string;
  title: string;
  detail: string;
}

const STEPS: readonly Step[] = [
  { no: "1", title: "下载差分包", detail: "bsdiff 差分增量" },
  { no: "2", title: "校验签名", detail: "RSA + SHA-256" },
  { no: "3", title: "写入备用分区", detail: "bspatch 合成 Slot B" },
  { no: "4", title: "切换启动分区", detail: "Bootloader 指针 → B" },
  { no: "5", title: "回滚保护", detail: "健康计数器兜底" },
];

export function VsiOtaUpdatesDiagram() {
  const stepW = 120;
  const stepH = 70;
  const stepGap = 16;
  const stepStartX = (VIEW_W - stepW * STEPS.length - stepGap * (STEPS.length - 1)) / 2;
  const stepY = 300;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="OTA 升级流程图。上半 A/B 双分区：Slot A 当前激活、Slot B 备用，由 Bootloader 指针切换。下半五步流程：下载差分包（bsdiff 差分增量）→ 校验签名（RSA+SHA-256）→ 写入备用分区（bspatch 合成 Slot B）→ 切换启动分区（Bootloader 指针指向 B）→ 回滚保护（健康计数器兜底）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vot-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="vot-arrow-acc" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0 0 L8 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={40} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            OTA 升级 · A/B 分区架构与流程
          </text>
          <text x={VIEW_W / 2} y={62} textAnchor="middle" fontSize="11" fill={secondary}>
            双分区互为备份 · 差分增量 · 签名校验 · 失败可回滚
          </text>

          {/* Bootloader 指针 */}
          <text x={SLOT_A_X + SLOT_W / 2} y={84} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
            Bootloader 指针
          </text>
          <line x1={SLOT_A_X + SLOT_W / 2} y1={86} x2={SLOT_A_X + SLOT_W / 2} y2={SLOT_Y} stroke={accent} strokeWidth="1.8" markerEnd="url(#vot-arrow-acc)" />

          {/* Slot A（激活） */}
          <g>
            <rect x={SLOT_A_X} y={SLOT_Y} width={SLOT_W} height={SLOT_H} rx="12" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.8" />
            <rect x={SLOT_A_X} y={SLOT_Y} width={SLOT_W} height="26" rx="12" fill={success} fillOpacity="0.2" stroke={success} strokeWidth="1.4" />
            <text x={SLOT_A_X + SLOT_W / 2} y={SLOT_Y + 18} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
              Slot A · 当前激活
            </text>
            {["Bootloader", "System", "UserData"].map((p, i) => (
              <g key={p}>
                <rect x={SLOT_A_X + 20} y={SLOT_Y + 40 + i * 34} width={SLOT_W - 40} height="26" rx="6" fill="var(--bg)" stroke={success} strokeWidth="1" strokeOpacity="0.5" />
                <text x={SLOT_A_X + SLOT_W / 2} y={SLOT_Y + 40 + i * 34 + 17} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                  {p}
                </text>
              </g>
            ))}
          </g>

          {/* Slot B（备用） */}
          <g>
            <rect x={SLOT_B_X} y={SLOT_Y} width={SLOT_W} height={SLOT_H} rx="12" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.6" strokeDasharray="5 3" />
            <rect x={SLOT_B_X} y={SLOT_Y} width={SLOT_W} height="26" rx="12" fill={warning} fillOpacity="0.16" stroke={warning} strokeWidth="1.4" />
            <text x={SLOT_B_X + SLOT_W / 2} y={SLOT_Y + 18} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
              Slot B · 备用待写
            </text>
            {["Bootloader", "System", "UserData"].map((p, i) => (
              <g key={p}>
                <rect x={SLOT_B_X + 20} y={SLOT_Y + 40 + i * 34} width={SLOT_W - 40} height="26" rx="6" fill="var(--bg)" stroke={warning} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 2" />
                <text x={SLOT_B_X + SLOT_W / 2} y={SLOT_Y + 40 + i * 34 + 17} textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>
                  {p}
                </text>
              </g>
            ))}
          </g>

          {/* 双分区互备标注 */}
          <text x={VIEW_W / 2} y={SLOT_Y + SLOT_H / 2 + 4} textAnchor="middle" fontSize="11" fill={secondary}>
            互为备份
          </text>

          {/* 分区与流程之间分隔 */}
          <line x1={32} y1={270} x2={VIEW_W - 32} y2={270} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={288} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            升级流程（写入备用分区，不影响当前运行）
          </text>

          {/* 五步流程 */}
          {STEPS.map((s, i) => {
            const sx = stepStartX + i * (stepW + stepGap);
            const active = i === STEPS.length - 1;
            const color = i === 0 ? accent : i === STEPS.length - 1 ? success : primary;
            return (
              <g key={s.no}>
                <rect
                  x={sx}
                  y={stepY}
                  width={stepW}
                  height={stepH}
                  rx="10"
                  fill={color}
                  fillOpacity={active ? 0.1 : 0.05}
                  stroke={color}
                  strokeWidth="1.5"
                />
                <circle cx={sx + 18} cy={stepY + 18} r="11" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.2" />
                <text x={sx + 18} y={stepY + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
                  {s.no}
                </text>
                <text x={sx + stepW / 2} y={stepY + 44} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
                  {s.title}
                </text>
                <text x={sx + stepW / 2} y={stepY + 60} textAnchor="middle" fontSize="11" fill={secondary}>
                  {s.detail}
                </text>
                {i < STEPS.length - 1 && (
                  <line
                    x1={sx + stepW + 1}
                    y1={stepY + stepH / 2}
                    x2={sx + stepW + stepGap - 1}
                    y2={stepY + stepH / 2}
                    stroke={secondary}
                    strokeWidth="1.4"
                    markerEnd="url(#vot-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* 安全验证链标注 */}
          <rect x={stepStartX + stepW + 4} y={stepY + stepH + 14} width={stepW * 2 + stepGap - 8} height="36" rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={stepStartX + stepW + stepW + stepGap / 2} y={stepY + stepH + 30} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
            安全验证链
          </text>
          <text x={stepStartX + stepW + stepW + stepGap / 2} y={stepY + stepH + 45} textAnchor="middle" fontSize="11" fill={secondary}>
            签名 → 哈希完整性 → 证书链 → 版本防回滚
          </text>

          {/* 回滚保护标注 */}
          <line x1={stepStartX + 4 * (stepW + stepGap) + stepW / 2} y1={stepY + stepH} x2={stepStartX + 4 * (stepW + stepGap) + stepW / 2} y2={stepY + stepH + 14} stroke={success} strokeWidth="1.2" markerEnd="url(#vot-arrow)" />

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={546} textAnchor="middle" fontSize="12" fill={secondary}>
            A/B 双分区无感升级 · 差分省流量 · 签名防篡改 · 计数器防变砖
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        OTA 升级 A/B 分区架构：Slot A 当前激活、Slot B 备用，Bootloader 指针切换。五步流程为下载差分包（bsdiff 差分增量）、校验签名（RSA+SHA-256）、写入备用分区（bspatch 合成 Slot B）、切换启动分区（指针指向 B）、回滚保护（健康计数器兜底）。安全验证链贯穿签名、哈希、证书、版本防回滚。
      </figcaption>
    </figure>
  );
}
