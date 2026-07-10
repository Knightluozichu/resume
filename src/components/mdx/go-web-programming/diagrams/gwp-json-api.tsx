/**
 * <GwpJsonApiDiagram>: JSON API 请求-响应与编码解码流程。
 *
 * 展示 encoding/json 的 Marshal/Unmarshal 流程，
 * struct tag 的作用，以及 RESTful API 的状态码约定。
 * 纯静态 SVG，Server Component。viewBox 720x400。
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

export function GwpJsonApiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="JSON API 编码解码流程图。展示 Go struct 通过 json.Marshal 编码为 JSON 响应，JSON 请求通过 json.Unmarshal 解码为 struct。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            JSON API 编码-解码流程
          `}</text>

          {/* 请求侧（解码） */}
          <rect x={40} y={56} width={310} height={160} rx="8" fill={elevated} stroke={accent} strokeWidth="1.5" />
          <text x={195} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>{`请求解码 (Unmarshal)`}</text>
          <line x1={55} y1={86} x2={335} y2={86} stroke={border} strokeWidth="1" strokeDasharray="3 2" />

          <rect x={55} y={96} width={120} height={50} rx="5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x={115} y={116} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={accent}>{`JSON Body`}</text>
          <text x={115} y={132} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={secondary}>{`{"{\\"name\\":\\"Go\\"}"}`}</text>

          <line x1={175} y1={121} x2={190} y2={121} stroke={secondary} strokeWidth="1" markerEnd="url(#gwp-j-a1)" />

          <rect x={195} y={96} width={135} height={50} rx="5" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" />
          <text x={262} y={116} textAnchor="middle" fontSize="10" fontWeight="600" fill={warning}>{`json.Unmarshal`}</text>
          <text x={262} y={132} textAnchor="middle" fontSize="9" fill={secondary}>{`JSON → Struct`}</text>

          <rect x={55} y={160} width={275} height={44} rx="5" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={192} y={178} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={success}>{`type User struct {`}</text>
          <text x={192} y={194} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={success}>{`  Name string \`json:"name"\``}</text>

          {/* 响应侧（编码） */}
          <rect x={370} y={56} width={310} height={160} rx="8" fill={elevated} stroke={success} strokeWidth="1.5" />
          <text x={525} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>{`响应编码 (Marshal)`}</text>
          <line x1={385} y1={86} x2={665} y2={86} stroke={border} strokeWidth="1" strokeDasharray="3 2" />

          <rect x={385} y={96} width={135} height={50} rx="5" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={452} y={116} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={success}>{`Struct 实例`}</text>
          <text x={452} y={132} textAnchor="middle" fontSize="9" fill={secondary}>{`User{...}`}</text>

          <line x1={520} y1={121} x2={535} y2={121} stroke={secondary} strokeWidth="1" markerEnd="url(#gwp-j-a1)" />

          <rect x={540} y={96} width={120} height={50} rx="5" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x={600} y={116} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>{`json.Marshal`}</text>
          <text x={600} y={132} textAnchor="middle" fontSize="9" fill={secondary}>{`[]byte`}</text>

          <rect x={385} y={160} width={275} height={44} rx="5" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={522} y={178} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={accent}>{`w.Header().Set(`}</text>
          <text x={522} y={194} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={accent}>{`"Content-Type", "application/json")`}</text>

          {/* RESTful 状态码 */}
          <rect x={40} y={240} width={640} height={130} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={360} y={262} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>{`RESTful API 状态码约定`}</text>

          <rect x={60} y={276} width={140} height={36} rx="5" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={130} y={292} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>{`200 OK`}</text>
          <text x={130} y={306} textAnchor="middle" fontSize="9" fill={secondary}>{`GET 成功`}</text>

          <rect x={210} y={276} width={140} height={36} rx="5" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={280} y={292} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>{`201 Created`}</text>
          <text x={280} y={306} textAnchor="middle" fontSize="9" fill={secondary}>{`POST 创建成功`}</text>

          <rect x={360} y={276} width={140} height={36} rx="5" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1" />
          <text x={430} y={292} textAnchor="middle" fontSize="10" fontWeight="600" fill={warning}>{`400 Bad Request`}</text>
          <text x={430} y={306} textAnchor="middle" fontSize="9" fill={secondary}>{`请求格式错误`}</text>

          <rect x={510} y={276} width={150} height={36} rx="5" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1" />
          <text x={585} y={292} textAnchor="middle" fontSize="10" fontWeight="600" fill={danger}>{`404 / 500`}</text>
          <text x={585} y={306} textAnchor="middle" fontSize="9" fill={secondary}>{`未找到 / 服务器错误`}</text>

          <text x={60} y={336} fontSize="10" fill={secondary}>{`struct tag：json:"field_name,omitempty" — 控制字段名和空值行为`}</text>
          <text x={60} y={352} fontSize="10" fill={secondary}>{`Encoder/Decoder：流式处理，json.NewEncoder(w).Encode(v)`}</text>

          <defs>
            <marker id="gwp-j-a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        encoding/json 通过 struct tag 映射字段，Marshal 编码、Unmarshal 解码。
      </figcaption>
    </figure>
  );
}
