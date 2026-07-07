/**
 * <VsiCybersecurityDiagram>：车载信息安全架构图（多层纵深防御）。
 *
 * 三层同心防御，由外到内：
 *   - 外层 网络边界：防火墙、IDS / IPS 入侵检测
 *   - 中层 通信安全：TLS、SecOC、证书
 *   - 内层 设备安全：安全启动、HSM 硬件安全模块、密钥存储
 * 中心为车内 ECU / CAN / 以太网。四向标注攻击面：OTA、OBD-II、WiFi/蓝牙、T-Box。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×540（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 540;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const CX = 360;
const CY = 270;

// 同心层几何（中心 360,270）
const OUTER = { x: 70, y: 100, w: 580, h: 340 };
const MIDDLE = { x: 130, y: 150, w: 460, h: 240 };
const INNER = { x: 190, y: 200, w: 340, h: 140 };
const CORE = { x: 270, y: 250, w: 180, h: 60 };

interface Attack {
  name: string;
  detail: string;
  // 锚点（标签位置）与箭头起止
  lx: number;
  ly: number;
  ax1: number;
  ay1: number;
  ax2: number;
  ay2: number;
  anchor: "start" | "middle" | "end";
}

const ATTACKS: readonly Attack[] = [
  { name: "OTA", detail: "远程升级通道", lx: CX, ly: 80, ax1: CX, ay1: 86, ax2: CX, ay2: 98, anchor: "middle" },
  { name: "OBD-II", detail: "诊断接口", lx: 690, ly: CY, ax1: 684, ay1: CY, ax2: 652, ay2: CY, anchor: "start" },
  { name: "WiFi / 蓝牙", detail: "短距无线", lx: CX, ly: 462, ax1: CX, ay1: 456, ax2: CX, ay2: 442, anchor: "middle" },
  { name: "T-Box", detail: "蜂窝远程", lx: 30, ly: CY, ax1: 36, ay1: CY, ax2: 68, ay2: CY, anchor: "end" },
];

export function VsiCybersecurityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="车载信息安全架构图。三层同心纵深防御：外层网络边界（防火墙、IDS/IPS），中层通信安全（TLS、SecOC、证书），内层设备安全（安全启动、HSM、密钥存储），中心为车内 ECU/CAN/以太网。四向攻击面：OTA、OBD-II、WiFi/蓝牙、T-Box。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vcs-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            车载信息安全 · 纵深防御
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            外堵边界 · 中密通信 · 内固设备 · 四面攻击面层层拦截
          </text>

          {/* ========== 同心层（由外到内绘制） ========== */}
          {/* 外层 网络边界 */}
          <rect x={OUTER.x} y={OUTER.y} width={OUTER.w} height={OUTER.h} rx="16" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.6" />
          <text x={OUTER.x + 16} y={OUTER.y + 20} fontSize="12" fontWeight="700" fill={warning}>
            外层 · 网络边界
          </text>
          {["防火墙", "IDS / IPS 入侵检测"].map((m, i) => (
            <g key={m}>
              <rect x={OUTER.x + 16 + i * 130} y={OUTER.y + 30} width="120" height="22" rx="5" fill={warning} fillOpacity="0.14" stroke={warning} strokeWidth="1.1" />
              <text x={OUTER.x + 16 + i * 130 + 60} y={OUTER.y + 45} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>
                {m}
              </text>
            </g>
          ))}

          {/* 中层 通信安全 */}
          <rect x={MIDDLE.x} y={MIDDLE.y} width={MIDDLE.w} height={MIDDLE.h} rx="14" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.6" />
          <text x={MIDDLE.x + 16} y={MIDDLE.y + 20} fontSize="12" fontWeight="700" fill={accent}>
            中层 · 通信安全
          </text>
          {["TLS 加密", "SecOC 报文认证", "证书 / PKI"].map((m, i) => (
            <g key={m}>
              <rect x={MIDDLE.x + 16 + i * 140} y={MIDDLE.y + 30} width="128" height="22" rx="5" fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="1.1" />
              <text x={MIDDLE.x + 16 + i * 140 + 64} y={MIDDLE.y + 45} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
                {m}
              </text>
            </g>
          ))}

          {/* 内层 设备安全 */}
          <rect x={INNER.x} y={INNER.y} width={INNER.w} height={INNER.h} rx="12" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.6" />
          <text x={INNER.x + 14} y={INNER.y + 20} fontSize="12" fontWeight="700" fill={success}>
            内层 · 设备安全
          </text>
          {["安全启动", "HSM 硬件安全模块", "密钥存储"].map((m, i) => (
            <g key={m}>
              <rect x={INNER.x + 14 + i * 104} y={INNER.y + 30} width="96" height="22" rx="5" fill={success} fillOpacity="0.14" stroke={success} strokeWidth="1.1" />
              <text x={INNER.x + 14 + i * 104 + 48} y={INNER.y + 45} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>
                {m}
              </text>
            </g>
          ))}

          {/* 中心 车内网络 */}
          <rect x={CORE.x} y={CORE.y} width={CORE.w} height={CORE.h} rx="10" fill={primary} fillOpacity="0.1" stroke={primary} strokeWidth="1.8" />
          <text x={CX} y={CORE.y + 26} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            车内 ECU
          </text>
          <text x={CX} y={CORE.y + 44} textAnchor="middle" fontSize="11" fill={secondary}>
            CAN / 以太网总线
          </text>

          {/* 中心防护说明 */}
          <text x={CX} y={INNER.y + INNER.h + 20} textAnchor="middle" fontSize="11" fill={secondary}>
            密钥不出 HSM · 启动链逐级验签 · 报文逐帧认证
          </text>

          {/* ========== 攻击面（四向） ========== */}
          {ATTACKS.map((a) => (
            <g key={a.name}>
              <rect
                x={a.anchor === "middle" ? a.lx - 52 : a.anchor === "end" ? a.lx - 104 : a.lx}
                y={a.ly - 14}
                width="104"
                height="28"
                rx="6"
                fill={warning}
                fillOpacity="0.12"
                stroke={warning}
                strokeWidth="1.3"
              />
              <text x={a.anchor === "middle" ? a.lx : a.anchor === "end" ? a.lx - 52 : a.lx + 52} y={a.ly - 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>
                {a.name}
              </text>
              <text x={a.anchor === "middle" ? a.lx : a.anchor === "end" ? a.lx - 52 : a.lx + 52} y={a.ly + 10} textAnchor="middle" fontSize="11" fill={secondary}>
                {a.detail}
              </text>
              <line x1={a.ax1} y1={a.ay1} x2={a.ax2} y2={a.ay2} stroke={warning} strokeWidth="1.6" markerEnd="url(#vcs-arrow)" />
            </g>
          ))}

          {/* 攻击面汇总标注 */}
          <text x={CX} y={OUTER.y + OUTER.h + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>
            攻击面 · 四面来风
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={496} x2={VIEW_W - 32} y2={496} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={516} textAnchor="middle" fontSize="11" fill={secondary}>
            纵深防御 · 层层拦截 · 最小信任 · 密钥落锁
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        车载信息安全纵深防御：外层网络边界（防火墙、IDS/IPS），中层通信安全（TLS、SecOC、证书/PKI），内层设备安全（安全启动、HSM、密钥存储），中心为车内 ECU 与 CAN/以太网总线。四向攻击面 OTA、OBD-II、WiFi/蓝牙、T-Box 由外向内逐层拦截。
      </figcaption>
    </figure>
  );
}
