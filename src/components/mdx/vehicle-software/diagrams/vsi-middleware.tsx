/**
 * <VsiMiddlewareDiagram>：车载中间件架构图。
 *
 * 左半区 AUTOSAR Adaptive Platform 分层（自上而下）：
 *   Application → ara::com（SOME/IP + 服务发现）→ Runtime（EM/SM）→ OS（POSIX）
 * 右半区 DDS Pub/Sub 模式：Publisher → 全局数据空间（Topic）→ Subscriber
 * 底部三栏对照：通信模式（C/S vs Pub/Sub）、序列化、服务发现。
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

const LEFT_X = 32;
const LEFT_W = 384;
const RIGHT_X = 440;
const RIGHT_W = 248;

interface ApLayer {
  name: string;
  detail: string;
  color: string;
  y: number;
  h: number;
}

const AP_LAYERS: readonly ApLayer[] = [
  { name: "Application", detail: "应用 · 调用 ara::com API", color: accent, y: 96, h: 66 },
  { name: "ara::com", detail: "SOME/IP · 服务发现 · 序列化", color: accent, y: 174, h: 66 },
  { name: "Runtime", detail: "EM 执行管理 · SM 状态管理", color: success, y: 252, h: 66 },
  { name: "OS（POSIX）", detail: "Linux / QNX · 进程调度", color: warning, y: 330, h: 66 },
];

export function VsiMiddlewareDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="车载中间件架构图。左半区 AUTOSAR Adaptive Platform 分层：Application 调用 ara::com（SOME/IP、服务发现、序列化），下接 Runtime（EM 执行管理、SM 状态管理），再下接 OS（POSIX、Linux/QNX）。右半区 DDS Pub/Sub 模式：Publisher 写入全局数据空间 Topic，Subscriber 订阅读取。底部对照通信模式、序列化、服务发现三项。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vmw-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="vmw-arrow-acc" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={40} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            车载中间件架构 · AUTOSAR AP vs DDS
          </text>
          <text x={VIEW_W / 2} y={62} textAnchor="middle" fontSize="11" fill={secondary}>
            左：分层 C/S 中间件 · 右：去中心化 Pub/Sub 数据空间
          </text>

          {/* 左半区 AUTOSAR AP */}
          <text x={LEFT_X + LEFT_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            AUTOSAR Adaptive Platform
          </text>
          {AP_LAYERS.map((l) => (
            <g key={l.name}>
              <rect x={LEFT_X} y={l.y} width={LEFT_W} height={l.h} rx="10" fill={l.color} fillOpacity="0.06" stroke={l.color} strokeWidth="1.5" />
              <text x={LEFT_X + 16} y={l.y + 27} fontSize="13" fontWeight="700" fill={l.color}>
                {l.name}
              </text>
              <text x={LEFT_X + 16} y={l.y + 48} fontSize="11" fill={secondary}>
                {l.detail}
              </text>
            </g>
          ))}
          {/* 层间调用箭头 */}
          {AP_LAYERS.slice(0, -1).map((l, i) => (
            <line
              key={`ap-${l.name}`}
              x1={LEFT_X + LEFT_W / 2}
              y1={l.y + l.h + 1}
              x2={LEFT_X + LEFT_W / 2}
              y2={AP_LAYERS[i + 1].y - 1}
              stroke={secondary}
              strokeWidth="1.4"
              markerEnd="url(#vmw-arrow)"
            />
          ))}

          {/* 右半区 DDS Pub/Sub */}
          <text x={RIGHT_X + RIGHT_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            DDS · Pub/Sub 模式
          </text>
          <rect x={RIGHT_X} y={96} width={RIGHT_W} height={300} rx="12" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />

          {/* Publisher */}
          <rect x={RIGHT_X + 36} y={112} width={RIGHT_W - 72} height="44" rx="8" fill={success} fillOpacity="0.16" stroke={success} strokeWidth="1.4" />
          <text x={RIGHT_X + RIGHT_W / 2} y={130} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            Publisher
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={146} textAnchor="middle" fontSize="11" fill={secondary}>
            写入数据
          </text>

          {/* 全局数据空间 Topic */}
          <rect x={RIGHT_X + 20} y={188} width={RIGHT_W - 40} height="64" rx="10" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.4" strokeDasharray="5 3" />
          <text x={RIGHT_X + RIGHT_W / 2} y={212} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            全局数据空间
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={228} textAnchor="middle" fontSize="11" fill={primary}>
            Topic · DCPS
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={244} textAnchor="middle" fontSize="11" fill={secondary}>
            QoS 策略 · 自动发现
          </text>

          {/* Subscriber */}
          <rect x={RIGHT_X + 36} y={284} width={RIGHT_W - 72} height="44" rx="8" fill={success} fillOpacity="0.16" stroke={success} strokeWidth="1.4" />
          <text x={RIGHT_X + RIGHT_W / 2} y={302} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            Subscriber
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={318} textAnchor="middle" fontSize="11" fill={secondary}>
            订阅回调
          </text>

          {/* 多 Subscriber 示意 */}
          <text x={RIGHT_X + RIGHT_W / 2} y={350} textAnchor="middle" fontSize="11" fill={secondary}>
            一对多广播 · 去中心化
          </text>

          {/* Pub→Topic→Sub 箭头 */}
          <line x1={RIGHT_X + RIGHT_W / 2} y1={156} x2={RIGHT_X + RIGHT_W / 2} y2={186} stroke={accent} strokeWidth="1.6" markerEnd="url(#vmw-arrow-acc)" />
          <line x1={RIGHT_X + RIGHT_W / 2} y1={252} x2={RIGHT_X + RIGHT_W / 2} y2={282} stroke={accent} strokeWidth="1.6" markerEnd="url(#vmw-arrow-acc)" />

          {/* 底部三栏对照 */}
          <line x1={32} y1={418} x2={VIEW_W - 32} y2={418} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={438} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            中间件三维度对照
          </text>

          {[
            { title: "通信模式", autosar: "C/S 请求-响应", dds: "Pub/Sub 发布-订阅", x: 40 },
            { title: "序列化", autosar: "SOME/IP-TP / protobuf", dds: "CDR 二进制", x: 264 },
            { title: "服务发现", autosar: "SD 报文注册", dds: "SPDP/RTPS 自动", x: 488 },
          ].map((c) => (
            <g key={c.title}>
              <rect x={c.x} y={450} width={196} height={72} rx="8" fill={primary} fillOpacity="0.03" stroke={border} strokeWidth="1" />
              <text x={c.x + 98} y={468} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>
                {c.title}
              </text>
              <text x={c.x + 12} y={488} fontSize="11" fill={accent}>
                AP
              </text>
              <text x={c.x + 30} y={488} fontSize="11" fill={secondary}>
                {c.autosar}
              </text>
              <text x={c.x + 12} y={508} fontSize="11" fill={success}>
                DDS
              </text>
              <text x={c.x + 30} y={508} fontSize="11" fill={secondary}>
                {c.dds}
              </text>
            </g>
          ))}

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={546} textAnchor="middle" fontSize="12" fill={secondary}>
            AP 分层显式管控 · DDS 数据空间解耦——通信范式决定系统骨架
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        车载中间件架构：左半 AUTOSAR Adaptive Platform 分层（Application → ara::com 的 SOME/IP 与服务发现 → Runtime 执行/状态管理 → POSIX OS）；右半 DDS Pub/Sub 模式（Publisher 写入全局数据空间 Topic，Subscriber 订阅，支持 QoS 与自动发现）。底部对照通信模式、序列化、服务发现三维度。
      </figcaption>
    </figure>
  );
}
