"use client";

import { useState, type KeyboardEvent } from "react";

type Store = {
  exists: boolean;
  title: string;
  published: boolean;
  events: number;
};
export type ServiceCase = {
  id: string;
  label: string;
  method: string;
  path: string;
  media: string;
  accept: string;
  body: string;
  before: Store;
  after: Store;
  stop: number;
  explain: string;
  status: number;
  output: string;
  contentType: string;
  location: string;
  allow: string;
};
export const serviceCases: ServiceCase[] = [
  {
    id: "create-json",
    label: "JSON创建",
    method: "POST",
    path: "/posts",
    media: "application/json",
    accept: "application/json",
    body: '{"title":"A & B","published":false}',
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 5,
    explain: "解码只是候选值；验证后才创建资源。201和Location描述新身份。",
    after: {
      exists: true,
      title: "A & B",
      published: false,
      events: 0,
    },
    status: 201,
    output: '{"title":"A \\u0026 B","published":false}',
    contentType: "application/json",
    location: "/posts/7",
    allow: "",
  },
  {
    id: "create-xml",
    label: "XML创建",
    method: "POST",
    path: "/posts",
    media: "application/xml",
    accept: "application/xml",
    body: '<p:post xmlns:p="urn:remuse:posts"><p:title>A &amp; B</p:title><p:published>false</p:published></p:post>',
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 5,
    explain: "前缀p不是身份；URI加local才是展开名。实体还原为&，输出再转义。",
    after: {
      exists: true,
      title: "A & B",
      published: false,
      events: 0,
    },
    status: 201,
    output:
      '<post xmlns="urn:remuse:posts"><title xmlns="urn:remuse:posts">A &amp; B</title><published xmlns="urn:remuse:posts">false</published></post>',
    contentType: "application/xml",
    location: "/posts/7",
    allow: "",
  },
  {
    id: "read-json",
    label: "JSON读取",
    method: "GET",
    path: "/posts/7",
    media: "",
    accept: "application/json",
    body: "",
    before: {
      exists: true,
      title: "A & B",
      published: false,
      events: 0,
    },
    stop: 5,
    explain:
      "同一资源选择JSON表示；GET不写入。Go默认把&转成Unicode转义，解码仍为&。",
    after: {
      exists: true,
      title: "A & B",
      published: false,
      events: 0,
    },
    status: 200,
    output: '{"title":"A \\u0026 B","published":false}',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "read-xml",
    label: "XML读取",
    method: "GET",
    path: "/posts/7",
    media: "",
    accept: "application/xml",
    body: "",
    before: {
      exists: true,
      title: "A & B",
      published: false,
      events: 0,
    },
    stop: 5,
    explain: "资源未变，表示切成XML；编码器负责转义&而不是手拼标签。",
    after: {
      exists: true,
      title: "A & B",
      published: false,
      events: 0,
    },
    status: 200,
    output:
      '<post xmlns="urn:remuse:posts"><title xmlns="urn:remuse:posts">A &amp; B</title><published xmlns="urn:remuse:posts">false</published></post>',
    contentType: "application/xml",
    location: "",
    allow: "",
  },
  {
    id: "put-state",
    label: "属性式发布PUT",
    method: "PUT",
    path: "/posts/7",
    media: "application/json",
    accept: "application/json",
    body: '{"title":"Draft","published":true}',
    before: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    stop: 5,
    explain: "PUT替换完整可写表示；重复相同请求不新增事件，published仍为true。",
    after: {
      exists: true,
      title: "Draft",
      published: true,
      events: 0,
    },
    status: 200,
    output: '{"title":"Draft","published":true}',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "post-event",
    label: "资源式发布POST",
    method: "POST",
    path: "/posts/7/publications",
    media: "",
    accept: "application/json",
    body: "",
    before: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    stop: 5,
    explain:
      "发布动作变为publication子资源；每次POST增加事件。示例只返回父资源快照，不实现事件读取。",
    after: {
      exists: true,
      title: "Draft",
      published: true,
      events: 1,
    },
    status: 201,
    output: '{"title":"Draft","published":true}',
    contentType: "application/json",
    location: "/posts/7/publications/1",
    allow: "",
  },
  {
    id: "delete",
    label: "删除",
    method: "DELETE",
    path: "/posts/7",
    media: "",
    accept: "",
    body: "",
    before: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    stop: 5,
    explain:
      "删除后资源不存在，204没有响应正文。第二次可能404，最终状态仍相同。",
    after: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    status: 204,
    output: "",
    contentType: "",
    location: "",
    allow: "",
  },
  {
    id: "unknown",
    label: "JSON未知字段",
    method: "POST",
    path: "/posts",
    media: "application/json",
    accept: "",
    body: '{"title":"A","admin":true}',
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 2,
    explain:
      "DisallowUnknownFields拒绝admin；默认Unmarshal并不会拒绝未知字段。没有进入提交。",
    after: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    status: 400,
    output: '{"error":"decode"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "trailing",
    label: "JSON尾随对象",
    method: "POST",
    path: "/posts",
    media: "application/json",
    accept: "",
    body: '{"title":"A & B","published":false} {}',
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 2,
    explain:
      "首个Decode成功并不代表完整文档；第二次必须EOF，另一个对象会被拒绝。",
    after: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    status: 400,
    output: '{"error":"decode"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "duplicate",
    label: "JSON重复键",
    method: "POST",
    path: "/posts",
    media: "application/json",
    accept: "",
    body: '{"title":"first","title":"last"}',
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 5,
    explain:
      "当前encoding/json对string字段的重复键后值覆盖。未知键严格模式不检测重复键；本例显式接受。",
    after: {
      exists: true,
      title: "last",
      published: false,
      events: 0,
    },
    status: 201,
    output: '{"title":"last","published":false}',
    contentType: "application/json",
    location: "/posts/7",
    allow: "",
  },
  {
    id: "malformed",
    label: "XML标签未闭合",
    method: "POST",
    path: "/posts",
    media: "application/xml",
    accept: "",
    body: '<post xmlns="urn:remuse:posts"><title>A</post>',
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 2,
    explain: "XML结构错误在解码阶段停止；空存储不能出现半成品资源。",
    after: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    status: 400,
    output: '{"error":"decode"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "namespace",
    label: "XML错误命名空间",
    method: "POST",
    path: "/posts",
    media: "application/xml",
    accept: "",
    body: '<post xmlns="urn:wrong"><title>A</title></post>',
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 2,
    explain: "local名称相同但namespace URI不同，XMLName的完整标签拒绝根元素。",
    after: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    status: 400,
    output: '{"error":"decode"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "xml-extra",
    label: "XML未知元素",
    method: "POST",
    path: "/posts",
    media: "application/xml",
    accept: "",
    body: '<post xmlns="urn:remuse:posts"><title>A</title><admin>true</admin></post>',
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 5,
    explain:
      "encoding/xml默认丢弃未映射元素。XMLName不是schema验证，也不是权限检查。",
    after: {
      exists: true,
      title: "A",
      published: false,
      events: 0,
    },
    status: 201,
    output: '{"title":"A","published":false}',
    contentType: "application/json",
    location: "/posts/7",
    allow: "",
  },
  {
    id: "invalid",
    label: "空标题",
    method: "PUT",
    path: "/posts/7",
    media: "application/json",
    accept: "",
    body: '{"title":" "}',
    before: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    stop: 3,
    explain: "语法正确不等于领域有效；标题检查失败，旧Draft不被覆盖。",
    after: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    status: 422,
    output: '{"error":"title_required"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "media",
    label: "不支持的媒体",
    method: "PUT",
    path: "/posts/7",
    media: "text/plain",
    accept: "",
    body: '{"title":"A & B","published":false}',
    before: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    stop: 1,
    explain: "媒体门未通过，不尝试猜测正文格式；错误仍使用固定JSON表示。",
    after: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    status: 415,
    output: '{"error":"unsupported_media"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "limit",
    label: "超过256字节",
    method: "POST",
    path: "/posts",
    media: "application/json",
    accept: "",
    body: '{"title":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}',
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 1,
    explain: "先限制整个消息体再解码；不能只把第一条短对象的成功当总大小合格。",
    after: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    status: 413,
    output: '{"error":"body_limit"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "missing",
    label: "资源不存在",
    method: "GET",
    path: "/posts/7",
    media: "",
    accept: "",
    body: "",
    before: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    stop: 4,
    explain: "路由存在但资源不存在；不能伪造一个空资源返回200。",
    after: {
      exists: false,
      title: "",
      published: false,
      events: 0,
    },
    status: 404,
    output: '{"error":"post_missing"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "conflict",
    label: "重复创建",
    method: "POST",
    path: "/posts",
    media: "application/json",
    accept: "",
    body: '{"title":"A & B","published":false}',
    before: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    stop: 4,
    explain: "这个教学存储只有7号槽位；已有资源不允许POST覆盖，应使用PUT。",
    after: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    status: 409,
    output: '{"error":"already_exists"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
  {
    id: "method",
    label: "方法不支持",
    method: "PATCH",
    path: "/posts/7",
    media: "",
    accept: "",
    body: "",
    before: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    stop: 1,
    explain:
      "路径存在但未实现PATCH；Allow列出GET、PUT、DELETE，本例不实现HEAD。",
    after: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    status: 405,
    output: '{"error":"method"}\n',
    contentType: "application/json",
    location: "",
    allow: "GET, PUT, DELETE",
  },
  {
    id: "accept",
    label: "无法提供表示",
    method: "GET",
    path: "/posts/7",
    media: "",
    accept: "text/csv",
    body: "",
    before: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    stop: 1,
    explain:
      "本例Accept契约只支持单一JSON/XML或通配；不实现权重列表，不能称完整协商器。",
    after: {
      exists: true,
      title: "Draft",
      published: false,
      events: 0,
    },
    status: 406,
    output: '{"error":"unsupported_accept"}\n',
    contentType: "application/json",
    location: "",
    allow: "",
  },
];
export const soapObservation = {
  input:
    '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope"><s:Body><p:GetTitle xmlns:p="urn:remuse:posts">A &amp; B</p:GetTitle></s:Body></s:Envelope>',
  output:
    '<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope"><Body xmlns="http://www.w3.org/2003/05/soap-envelope"><GetTitle xmlns="urn:remuse:posts">A &amp; B</GetTitle></Body></Envelope>',
  scope: "codec only; no HTTP SOAP request, no complete SOAP processor",
  title: "A & B",
};
const C = {
  active: "var(--accent)",
  failed: "var(--danger)",
  idle: "var(--text-secondary)",
  ink: "var(--text-primary)",
};
const stages = [
  "请求字节",
  "方法 / 媒体 / 体积",
  "解析为 Post",
  "检查 title",
  "资源候选 next",
  "编码 / 提交 / 响应",
];
const button =
  "min-h-11 min-w-11 rounded-md border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";
const chosen = "border-accent bg-elevated text-primary";

export function stateAt(c: ServiceCase, frame: number): Store {
  return frame >= c.stop ? c.after : c.before;
}
export function stateChanged(c: ServiceCase): boolean {
  return JSON.stringify(c.before) !== JSON.stringify(c.after);
}
function arrowKeys(event: KeyboardEvent<HTMLDivElement>) {
  const keys = [
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft",
    "ArrowUp",
    "Home",
    "End",
  ];
  if (!keys.includes(event.key)) return;
  const buttons = Array.from(
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]'),
  );
  const current = buttons.indexOf(event.target as HTMLButtonElement);
  if (current < 0) return;
  event.preventDefault();
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? buttons.length - 1
        : (current +
            (event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1) +
            buttons.length) %
          buttons.length;
  buttons[next]?.focus();
  buttons[next]?.click();
}

export function ServiceFrame({ c, frame }: { c: ServiceCase; frame: number }) {
  const failed = c.status >= 400;
  const done = frame >= c.stop;
  const store = stateAt(c, frame);
  const noInput = c.body === "";
  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-2">
      <figure className="m-0 min-w-0">
        <svg
          viewBox="0 0 288 430"
          className="mx-auto block w-full max-w-[360px]"
          role="img"
          aria-label={`HTTP因果流水线，第${frame}帧，${done ? c.status : "尚无响应"}`}
        >
          {stages.map((name, i) => {
            const reached = i <= frame && i <= c.stop;
            const color = reached
              ? failed && i === c.stop
                ? C.failed
                : C.active
              : C.idle;
            const y = 30 + i * 69;
            return (
              <g key={name} opacity={i > c.stop ? 0.45 : 1}>
                {i < 5 && (
                  <path
                    d={`M112 ${y + 20} V${y + 51} l-5 -7 m5 7 l5 -7`}
                    fill="none"
                    stroke={i < frame && i < c.stop ? C.active : C.idle}
                    strokeWidth="2"
                    strokeDasharray={i >= c.stop ? "3 4" : undefined}
                  />
                )}
                {i === 1 || i === 3 ? (
                  <path
                    d={`M112 ${y - 24} L204 ${y} L112 ${y + 24} L20 ${y} Z`}
                    fill="none"
                    stroke={color}
                    strokeWidth={i === frame ? 3 : 1.5}
                  />
                ) : (
                  <rect
                    x="20"
                    y={y - 22}
                    width="184"
                    height="44"
                    rx={i === 4 ? 18 : 5}
                    fill="none"
                    stroke={color}
                    strokeWidth={i === frame ? 3 : 1.5}
                  />
                )}
                <text
                  x="112"
                  y={y + 5}
                  textAnchor="middle"
                  fill={C.ink}
                  fontSize="14"
                >
                  {noInput && (i === 2 || i === 3)
                    ? `${i === 2 ? "解析" : "校验"}：无输入跳过`
                    : name}
                </text>
                {i === frame && <circle cx="9" cy={y} r="5" fill={color} />}
                {failed && i === c.stop && done && (
                  <g>
                    <path
                      d={`M205 ${y} H258 V397 H112`}
                      stroke={C.failed}
                      strokeWidth="3"
                      fill="none"
                    />
                    <text
                      x="247"
                      y={y - 10}
                      textAnchor="middle"
                      fill={C.ink}
                      fontSize="15"
                    >
                      {c.status}
                    </text>
                    <text
                      x="150"
                      y="421"
                      textAnchor="middle"
                      fill={C.ink}
                      fontSize="14"
                    >
                      失败旁路：不提交
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        <figcaption className="text-sm">
          强调色表示已经走过的路径；危险色旁路标注失败且绕过提交，当前站加粗。第4帧只是候选，第5帧才显示成功后的资源。
        </figcaption>
      </figure>
      <figure className="m-0 min-w-0">
        <svg
          viewBox="0 0 288 300"
          className="mx-auto block w-full max-w-[360px]"
          role="img"
          aria-label={`资源树：${store.exists ? store.title : "空"}，published=${store.published}，事件${store.events}`}
        >
          <text x="144" y="24" textAnchor="middle" fontSize="15" fill={C.ink}>
            资源身份 ≠ 表示字节
          </text>
          <path
            d="M35 52 H100 V95 M100 95 H140 M100 95 V231 H144"
            stroke={C.idle}
            strokeWidth="2"
            fill="none"
          />
          <text x="10" y="47" fontSize="15" fill={C.ink}>
            /posts
          </text>
          <circle
            cx="163"
            cy="95"
            r="25"
            stroke={store.exists ? C.active : C.idle}
            strokeDasharray={store.exists ? undefined : "4 4"}
            strokeWidth="3"
            fill="none"
          />
          <text x="163" y="101" textAnchor="middle" fontSize="17" fill={C.ink}>
            7
          </text>
          <text x="144" y="145" textAnchor="middle" fontSize="14" fill={C.ink}>
            {store.exists ? `title: ${store.title}` : "不存在（空槽位）"}
          </text>
          <circle
            cx="53"
            cy="180"
            r="9"
            fill={store.published ? C.active : "none"}
            stroke={C.idle}
            strokeWidth="2"
          />
          <text x="73" y="185" fontSize="14" fill={C.ink}>
            published: {String(store.published)}
          </text>
          <text x="144" y="221" fontSize="14" fill={C.ink}>
            publications
          </text>
          {Array.from({ length: store.events }, (_, i) => (
            <circle key={i} cx={159 + i * 24} cy="244" r="8" fill={C.active} />
          ))}
          <text x="144" y="281" textAnchor="middle" fontSize="14" fill={C.ink}>
            事件数：{store.events} · {done ? "本次最终快照" : "尚未提交"}
          </text>
        </svg>
        <figcaption className="text-sm">
          圆点记录新publication；属性发布只填充状态环。每例初始状态独立，后退是回看快照，不撤销真实网络请求。
        </figcaption>
      </figure>
    </div>
  );
}

export function SoapFrame({ frame }: { frame: number }) {
  return (
    <figure className="m-0 min-w-0">
      <svg
        viewBox="0 0 288 300"
        className="mx-auto block w-full max-w-[360px]"
        role="img"
        aria-label={`SOAP教学信封，第${frame}帧；不是完整SOAP处理器`}
      >
        <rect
          x="8"
          y="12"
          width="272"
          height="276"
          rx="6"
          fill="none"
          stroke={C.active}
          strokeWidth="2"
        />
        <text x="22" y="39" fontSize="15" fill={C.ink}>
          Envelope（SOAP 1.2）
        </text>
        <text x="22" y="65" fontSize="14" fill={C.ink}>
          前缀s → 信封namespace URI
        </text>
        {frame >= 1 && (
          <g>
            <rect
              x="22"
              y="84"
              width="244"
              height="188"
              fill="none"
              stroke={C.active}
              strokeWidth="2"
            />
            <text x="36" y="110" fontSize="15" fill={C.ink}>
              Body（同一SOAP URI）
            </text>
          </g>
        )}
        {frame >= 2 && (
          <g>
            <rect
              x="36"
              y="130"
              width="216"
              height="125"
              fill="none"
              stroke={C.active}
              strokeWidth="2"
            />
            <text x="48" y="157" fontSize="15" fill={C.ink}>
              GetTitle（应用URI）
            </text>
            <text x="48" y="184" fontSize="14" fill={C.ink}>
              urn:remuse:posts
            </text>
            <text x="48" y="223" fontSize="16" fill={C.ink}>
              值：A &amp; B
            </text>
          </g>
        )}
      </svg>
      <figcaption className="text-sm">
        {frame === 3
          ? "已重新编码；前缀可能改变，展开名和值保持。"
          : "逐层展开：协议容器不是业务资源身份。"}{" "}
        此模式只重放本地Go XML codec测试，没有HTTP状态或远端服务。
      </figcaption>
    </figure>
  );
}

export function GwpJsonApiLab() {
  const [mode, setMode] = useState<"http" | "soap">("http");
  const [index, setIndex] = useState(0);
  const [frame, setFrame] = useState(0);
  const [prediction, setPrediction] = useState<"change" | "same" | null>(null);
  const c = serviceCases[index];
  const max = mode === "http" ? c.stop : 3;
  const done = frame === max;
  const expectedChange = mode === "http" && stateChanged(c);
  const clearFrame = () => {
    setFrame(0);
    setPrediction(null);
  };
  const reset = () => {
    setMode("http");
    setIndex(0);
    clearFrame();
  };
  const predictLabel =
    prediction === null
      ? "尚未预测"
      : prediction === "change"
        ? "状态改变"
        : "状态不变";
  return (
    <section
      id="gwp-json-api-lab"
      aria-label="Web服务资源表示协议实验"
      className="not-prose my-6 min-w-0 rounded-xl border p-3 sm:p-5 motion-reduce:scroll-auto"
    >
      <h3 className="text-lg font-semibold">一张工单，三种不同的边界</h3>
      <p className="my-2 text-sm">
        固定Go1.26实测样本，不在浏览器执行Go。先预测资源是否改变，再逐步沿图检查输出与状态。
      </p>
      <div
        role="radiogroup"
        aria-label="实验模式"
        onKeyDown={arrowKeys}
        className="my-3 flex flex-wrap gap-2"
      >
        {(
          [
            ["http", "HTTP资源服务"],
            ["soap", "SOAP编解码"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={mode === value}
            tabIndex={mode === value ? 0 : -1}
            className={`${button} ${mode === value ? chosen : ""}`}
            onClick={() => {
              setMode(value);
              clearFrame();
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === "http" && (
        <div
          role="radiogroup"
          aria-label="请求案例"
          onKeyDown={arrowKeys}
          className="my-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
        >
          {serviceCases.map((value, i) => (
            <button
              key={value.id}
              type="button"
              role="radio"
              aria-checked={index === i}
              tabIndex={index === i ? 0 : -1}
              className={`${button} ${index === i ? chosen : ""}`}
              onClick={() => {
                setIndex(i);
                clearFrame();
              }}
            >
              {value.label}
            </button>
          ))}
        </div>
      )}
      <div className="my-3 min-w-0 rounded-lg border p-3">
        <p className="break-all font-mono text-sm">
          {mode === "http"
            ? `${c.method} ${c.path}`
            : "本地codec：Envelope → Body → GetTitle"}
        </p>
        {mode === "http" && (
          <p className="break-all text-sm">
            Content-Type: {c.media || "无"} · Accept: {c.accept || "缺省JSON"} ·
            初始：{c.before.exists ? c.before.title : "空槽位"}
          </p>
        )}
        <pre
          aria-label="请求或输入字节"
          className="mt-2 whitespace-pre-wrap break-all text-xs"
        >
          {mode === "http" ? c.body || "（无正文）" : soapObservation.input}
        </pre>
      </div>
      <div
        role="radiogroup"
        aria-label="预测资源状态"
        onKeyDown={arrowKeys}
        className="my-3 flex flex-wrap gap-2"
      >
        {(
          [
            ["change", "状态改变"],
            ["same", "状态不变"],
          ] as const
        ).map(([value, label], i) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={prediction === value}
            tabIndex={
              prediction === value || (prediction === null && i === 0) ? 0 : -1
            }
            disabled={frame > 0}
            className={`${button} ${prediction === value ? chosen : ""}`}
            onClick={() => setPrediction(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="my-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={button}
          disabled={frame === 0}
          onClick={() => setFrame(frame - 1)}
        >
          上一步
        </button>
        <button
          type="button"
          className={button}
          disabled={prediction === null || done}
          onClick={() => setFrame(frame + 1)}
        >
          下一步
        </button>
        <button type="button" className={button} onClick={reset}>
          重置全部
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="my-3 text-sm"
      >
        第{frame}/{max}帧 · {predictLabel}。
        {done
          ? `结果：${expectedChange ? "状态改变" : "状态不变"}；预测${(prediction === "change") === expectedChange ? "正确" : "需修正"}。${mode === "http" ? `HTTP ${c.status}` : "SOAP codec完成，无HTTP状态"}`
          : "先做预测，再观察每一站。"}
      </p>
      {mode === "http" ? (
        <ServiceFrame c={c} frame={frame} />
      ) : (
        <SoapFrame frame={frame} />
      )}
      <div
        className="mt-4 min-w-0 rounded-lg border p-3"
        aria-label="响应与解释"
      >
        <h4 className="font-semibold">
          {done ? "真实样本输出" : "响应尚未生成"}
        </h4>
        {done && mode === "http" && (
          <p className="break-all text-sm">
            HTTP {c.status} · Content-Type: {c.contentType || "无"} · Location:{" "}
            {c.location || "无"} · Allow: {c.allow || "无"}
          </p>
        )}
        {done && (
          <pre
            className="mt-2 whitespace-pre-wrap break-all text-xs"
            aria-label="输出字节"
          >
            {mode === "http"
              ? c.output || "（空正文）"
              : soapObservation.output}
          </pre>
        )}
        <p className="mt-2 text-sm">
          {done
            ? mode === "http"
              ? c.explain
              : "只证明本例展开名与文本往返，未实现Header处理、Fault或完整SOAP互操作。"
            : "图示推进不会提前改变存储；失败路径绕过提交，成功也须等编码后才提交。"}
        </p>
      </div>
    </section>
  );
}
