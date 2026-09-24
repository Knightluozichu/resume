"use client";

import { useId, useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const STEPS = [
  { label: "browser", caption: "浏览器发起请求" },
  { label: "wsgi", caption: "Gunicorn 导入 WSGI" },
  { label: "route", caption: "静态或视图分流" },
  { label: "response", caption: "响应或故障返回" },
] as const;
const build: BuildTimeline = (timeline) => {
  const clock = { tick: 0 };
  STEPS.forEach(({ label }, index) => {
    timeline.label(label, index * 1400);
    timeline.add(
      clock,
      { tick: index + 1, duration: 1400, ease: "linear" },
      index * 1400,
    );
  });
};
type RequestKind = "html" | "static";
type Fault =
  | "none"
  | "secret"
  | "host"
  | "schema"
  | "static"
  | "missing"
  | "exception";
const FAULTS: { value: Fault; label: string }[] = [
  { value: "none", label: "正常配置" },
  { value: "secret", label: "缺少 SECRET_KEY" },
  { value: "host", label: "Host 不在允许列表" },
  { value: "schema", label: "忘记 migrate" },
  { value: "static", label: "CSS 文件丢失（清单仍在）" },
  { value: "missing", label: "页面 URL 不存在" },
  { value: "exception", label: "视图抛出异常" },
];

/** Local teaching model, not a live server or a claim of successful deployment. */
export function deployingSnapshot(
  width: number,
  request: RequestKind,
  fault: Fault,
) {
  const dynamic = request === "html";
  const startup = fault === "secret";
  const blockedHost = dynamic && fault === "host";
  const missingPage = dynamic && fault === "missing";
  const exception = dynamic && fault === "exception";
  const database =
    dynamic && !startup && !blockedHost && !missingPage && !exception;
  const missingStatic = !dynamic && fault === "static";
  const schema = database && fault === "schema";
  const status = startup
    ? "未启动"
    : blockedHost
      ? "400"
      : missingPage || missingStatic
        ? "404"
        : exception || schema
          ? "500"
          : "200";
  const cause = startup
    ? "配置导入即失败；没有可接请求的 worker，不等同于 Django 500。"
    : blockedHost
      ? "动态请求被 Host 校验拒绝，尚未查询数据库。"
      : schema
        ? "视图已到数据库，但表不存在；查部署日志和迁移记录。"
        : missingStatic
          ? "WhiteNoise 没找到文件，继续交给 Django，最终 URL 未匹配而返回 404。"
          : missingPage
            ? "URL 未匹配，使用独立的 404.html；不查询 Topic。"
            : exception
              ? "视图异常，DEBUG=False 使用 500.html；堆栈只留在日志。"
              : dynamic
                ? "经过登录与所有权校验，读取 Topic / Entry 后渲染模板。"
                : "WhiteNoise 从 STATIC_ROOT 直接响应，不进入视图或数据库。";
  return {
    collapsed: width < 992,
    columns: width < 768 ? 1 : 2,
    dynamic,
    startup,
    blockedHost,
    database,
    missingStatic,
    schema,
    status,
    cause,
  };
}

export function PccDeployingLab() {
  const id = useId();
  const [width, setWidth] = useState(390);
  const [request, setRequest] = useState<RequestKind>("html");
  const [fault, setFault] = useState<Fault>("none");
  const [menuOpen, setMenuOpen] = useState(false);
  const timeline = useTeachingTimeline({ steps: STEPS, build });
  const state = deployingSnapshot(width, request, fault);
  const step = timeline.currentStep;
  const navOpen = !state.collapsed || menuOpen;
  const contentY = state.collapsed && menuOpen ? 155 : 123;
  const restart = () => {
    timeline.pause();
    timeline.seek(0);
  };
  const reset = () => {
    setWidth(390);
    setRequest("html");
    setFault("none");
    setMenuOpen(false);
    restart();
  };
  const edge = (active: boolean) => (active ? C.accent : C.border);
  const failed = state.status !== "200";
  const browserTitle = `模拟 ${width}px 浏览器：导航${state.collapsed ? "折叠" : "横排"}，内容${state.columns}列`;
  const routeTitle = `${request === "html" ? "HTML" : "静态资源"}请求路径；预测结果 ${state.status}；${state.cause}`;
  return (
    <section
      aria-label="Learning Log 布局与部署实验"
      className="not-prose my-8 rounded-card border border-border bg-elevated p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_select]:min-h-11 [&_input]:min-h-11"
    >
      <h3 className="text-lg font-semibold text-primary">
        同一页面，两条交付路径
      </h3>
      <p className="mt-2 text-sm text-secondary">
        布局是断点模型，不是 iframe；路径是本地模拟，不发送请求。HTML
        场景假设用户已经登录。
      </p>
      <div className="my-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-primary" htmlFor={`${id}-width`}>
          模拟视口：{width}px（768 内容断点 / 992 导航断点）
          <input
            id={`${id}-width`}
            className="block w-full accent-accent"
            type="range"
            min={360}
            max={1200}
            step={1}
            value={width}
            onChange={(event) => setWidth(Number(event.target.value))}
          />
        </label>
        <label className="text-sm text-primary" htmlFor={`${id}-request`}>
          请求资源
          <select
            id={`${id}-request`}
            className="mt-1 block w-full rounded-control border border-border bg-surface px-2"
            value={request}
            onChange={(event) => {
              setRequest(event.target.value as RequestKind);
              restart();
            }}
          >
            <option value="html">HTML：主题页面</option>
            <option value="static">静态：app.css</option>
          </select>
        </label>
        <label className="text-sm text-primary" htmlFor={`${id}-fault`}>
          故障注入
          <select
            id={`${id}-fault`}
            className="mt-1 block w-full rounded-control border border-border bg-surface px-2"
            value={fault}
            onChange={(event) => {
              setFault(event.target.value as Fault);
              restart();
            }}
          >
            {FAULTS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="self-end rounded-control border border-border px-3 text-sm text-primary disabled:opacity-50"
          disabled={!state.collapsed}
          aria-pressed={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          窄屏菜单：{menuOpen ? "收起" : "展开"}
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <figure className="m-0 min-w-0">
          <svg
            viewBox="0 0 340 490"
            role="img"
            aria-labelledby={`${id}-browser-title`}
            className="block w-full"
            fontSize={16}
            fill={C.text}
          >
            <title id={`${id}-browser-title`}>{browserTitle}</title>
            <rect
              x={8}
              y={20}
              width={324}
              height={450}
              rx={14}
              fill={C.bg}
              stroke={C.border}
              strokeWidth={2}
            />
            <path d="M8 58H332" stroke={C.border} />
            {[24, 44, 64].map((x) => (
              <circle key={x} cx={x} cy={39} r={4} fill={C.muted} />
            ))}
            <text x={87} y={45}>
              Learning Log · {width}px
            </text>
            <path d="M20 104H320" stroke={C.accent} strokeWidth={2} />
            <text x={22} y={88}>
              学习笔记
            </text>
            {state.collapsed ? (
              <path
                d="M280 73H307M280 82H307M280 91H307"
                stroke={C.text}
                strokeWidth={2}
              />
            ) : (
              <text x={166} y={88}>
                主题　用户　退出
              </text>
            )}
            {state.collapsed && navOpen && (
              <text x={22} y={133}>
                主题　用户　退出
              </text>
            )}
            <g transform={`translate(20 ${contentY})`}>
              <rect
                width={state.columns === 2 ? 145 : 300}
                height={104}
                rx={5}
                fill="none"
                stroke={C.border}
              />
              <path
                d={`M0 34H${state.columns === 2 ? 145 : 300}`}
                stroke={C.border}
              />
              <text x={12} y={24}>
                条目卡片
              </text>
              <path
                d={`M12 53H${state.columns === 2 ? 124 : 268}M12 72H${state.columns === 2 ? 94 : 240}M12 88H${state.columns === 2 ? 113 : 260}`}
                stroke={C.muted}
                strokeWidth={3}
              />
            </g>
            <g
              transform={`translate(${state.columns === 2 ? 178 : 20} ${state.columns === 2 ? contentY : contentY + 121})`}
            >
              <text x={0} y={18}>
                新增条目
              </text>
              <rect
                y={30}
                width={state.columns === 2 ? 142 : 300}
                height={58}
                rx={4}
                fill="none"
                stroke={C.accent}
              />
              <path
                d={`M10 44H${state.columns === 2 ? 98 : 234}`}
                stroke={C.muted}
              />
              <rect
                y={100}
                width={94}
                height={38}
                rx={4}
                fill={C.accent}
                fillOpacity={0.15}
                stroke={C.accent}
              />
              <text x={14} y={125}>
                保存条目
              </text>
            </g>
            <text x={20} y={474}>
              {state.columns === 1
                ? "col-12：上下排列"
                : "col-md-6：两列各半宽"}
            </text>
          </svg>
          <figcaption className="mt-2 text-sm text-secondary">
            先到 768：卡片与表单并排；再到
            992：导航不再依赖展开按钮。它们不是同一个断点。
          </figcaption>
        </figure>
        <figure className="m-0 min-w-0">
          <svg
            viewBox="0 0 340 450"
            role="img"
            aria-labelledby={`${id}-route-title`}
            className="block w-full"
            fontSize={16}
            fill={C.text}
          >
            <title id={`${id}-route-title`}>{routeTitle}</title>
            <defs>
              <marker
                id={`${id}-arrow`}
                viewBox="0 0 10 10"
                refX={9}
                refY={5}
                markerWidth={6}
                markerHeight={6}
                orient="auto-start-reverse"
              >
                <path d="M0 0L10 5L0 10Z" fill={C.accent} />
              </marker>
            </defs>
            <rect
              x={66}
              y={16}
              width={208}
              height={42}
              rx={6}
              fill={C.bg}
              stroke={C.border}
            />
            <text x={170} y={43} textAnchor="middle">
              {request === "html" ? "GET /topics/1/" : "GET /static/app.css"}
            </text>
            <path d="M170 58V99" stroke={edge(step >= 1)} strokeWidth={3} />
            <rect
              x={51}
              y={100}
              width={238}
              height={44}
              rx={8}
              fill={C.bg}
              stroke={state.startup ? C.danger : C.border}
            />
            <text x={170} y={127} textAnchor="middle">
              Gunicorn → WSGI
            </text>
            {!state.startup && (
              <>
                <path
                  d="M170 144V166"
                  stroke={edge(step >= 2)}
                  strokeWidth={3}
                />
                <path
                  d="M170 166L265 201L170 236L75 201Z"
                  fill={C.bg}
                  stroke={edge(step >= 2)}
                  strokeWidth={2}
                />
                <text x={170} y={207} textAnchor="middle">
                  WhiteNoise
                </text>
                <path
                  d="M75 201H62V267"
                  fill="none"
                  stroke={edge(step >= 2 && state.dynamic)}
                  strokeWidth={3}
                />
                <path
                  d="M265 201H279V270"
                  fill="none"
                  stroke={edge(step >= 2 && !state.dynamic)}
                  strokeWidth={3}
                />
                <rect
                  x={22}
                  y={268}
                  width={158}
                  height={44}
                  rx={5}
                  fill={C.bg}
                  stroke={state.blockedHost ? C.danger : C.border}
                />
                <text x={101} y={295} textAnchor="middle">
                  Host → Django
                </text>
                <g
                  stroke={state.missingStatic ? C.danger : C.border}
                  fill={C.bg}
                >
                  <path d="M219 266H249L263 278H316V329H219Z" />
                  <path
                    d="M229 289H306M229 303H300M229 317H304"
                    strokeDasharray={state.missingStatic ? "3 6" : undefined}
                  />
                </g>
                <text x={266} y={354} textAnchor="middle">
                  STATIC_ROOT
                </text>
                {state.missingStatic && (
                  <path
                    d="M219 317L180 290"
                    stroke={edge(step >= 2)}
                    strokeWidth={3}
                    markerEnd={`url(#${id}-arrow)`}
                  />
                )}
                {state.database && (
                  <path
                    d="M101 312V347"
                    stroke={edge(step >= 3)}
                    strokeWidth={3}
                  />
                )}
                <path
                  d="M38 361V395C38 412 164 412 164 395V361"
                  fill={C.bg}
                  stroke={state.schema ? C.danger : C.border}
                  strokeWidth={2}
                />
                <ellipse
                  cx={101}
                  cy={361}
                  rx={63}
                  ry={14}
                  fill={C.bg}
                  stroke={state.schema ? C.danger : C.border}
                  strokeWidth={2}
                />
                <text x={101} y={392} textAnchor="middle">
                  Topic / Entry
                </text>
                {step === 3 && (
                  <path
                    d={
                      state.dynamic || state.missingStatic
                        ? "M22 290H10V36H64"
                        : "M316 292H330V36H277"
                    }
                    fill="none"
                    stroke={failed ? C.danger : C.accent}
                    strokeWidth={2}
                    strokeDasharray="5 4"
                  />
                )}
              </>
            )}
            {state.startup && (
              <>
                <path
                  d="M153 70L187 92M187 70L153 92"
                  stroke={C.danger}
                  strokeWidth={4}
                />
                <text x={170} y={207} textAnchor="middle">
                  缺密钥：导入失败
                </text>
              </>
            )}
            {state.schema && (
              <path
                d="M86 329L115 344M115 329L86 344"
                stroke={C.danger}
                strokeWidth={3}
              />
            )}
            {state.blockedHost && (
              <path
                d="M46 239L78 256M78 239L46 256"
                stroke={C.danger}
                strokeWidth={3}
              />
            )}
            <circle
              cx={
                step === 0 || step === 1 || state.startup
                  ? 170
                  : state.dynamic
                    ? 62
                    : 279
              }
              cy={
                step === 0
                  ? 63
                  : step === 1 || state.startup
                    ? 84
                    : step === 2
                      ? 250
                      : state.dynamic
                        ? 290
                        : 311
              }
              r={6}
              fill={failed && step === 3 ? C.danger : C.accent}
            />
            <text
              x={170}
              y={437}
              textAnchor="middle"
              fill={failed && step === 3 ? C.danger : C.text}
            >
              {step === 3 ? `结果：${state.status}` : STEPS[step].caption}
            </text>
          </svg>
          <figcaption className="mt-2 text-sm text-secondary">
            实线是请求方向，末步虚线是返回。静态命中不走数据库；缺静态会继续走
            URL 匹配。边缘代理的 Host 校验不在此模型内。
          </figcaption>
        </figure>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="mt-4 rounded-control border border-border p-3 text-sm text-primary"
      >
        {width}px：{state.columns}列，导航{state.collapsed ? "折叠" : "横排"}。
        {STEPS[step].caption}。预测：{state.status}。{state.cause}
      </p>
      <TimelineControls
        timeline={timeline}
        labelText={Object.fromEntries(
          STEPS.map((item) => [item.label, item.caption]),
        )}
        reset={{ label: "重置全部", onClick: reset }}
      />
    </section>
  );
}
