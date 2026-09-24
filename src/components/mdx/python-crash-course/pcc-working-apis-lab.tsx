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
  { label: "request", caption: "发送公开只读请求" },
  { label: "response", caption: "先检查 HTTP 与限流头" },
  { label: "decode", caption: "解码并检查记录结构" },
  { label: "rank", caption: "过滤、排序与绘图" },
] as const;
const build: BuildTimeline = (timeline) => {
  const clock = { tick: 0 };
  STEPS.forEach(({ label }, index) => {
    timeline.label(label, index * 1600);
    timeline.add(
      clock,
      { tick: index + 1, duration: 1600, ease: "linear" },
      index * 1600,
    );
  });
};
type Feed = "github" | "hn";
type Scenario =
  | "ok"
  | "partial"
  | "rate403"
  | "rate429"
  | "forbidden"
  | "json"
  | "shape"
  | "timeout";
type RecordRow = { name: string; value: number | null; invalid?: string };
const SCENARIOS: { value: Scenario; label: string }[] = [
  { value: "ok", label: "正常响应" },
  { value: "partial", label: "部分结果 / 缺失记录" },
  { value: "rate403", label: "403：remaining=0" },
  { value: "rate429", label: "429：Retry-After=90" },
  { value: "forbidden", label: "403：无限流信号" },
  { value: "json", label: "200：正文不是 JSON" },
  { value: "shape", label: "200：JSON 结构错误" },
  { value: "timeout", label: "连接 / 读取超时" },
];

/** Pure deterministic model; neither fetch nor a Python interpreter runs here. */
export function apiLabSnapshot(
  feed: Feed,
  scenario: Scenario,
  minimum: number,
  descending: boolean,
) {
  const records: RecordRow[] =
    feed === "github"
      ? [
          { name: "lab/alpha", value: 88 },
          { name: "lab/beta", value: 125 },
          { name: "lab/gamma", value: 42 },
        ]
      : [
          { name: "story/101", value: 18 },
          { name: "story/102", value: 42 },
          { name: "story/103", value: 0 },
        ];
  if (scenario === "partial") {
    records[1] =
      feed === "github"
        ? { name: "lab/beta", value: null, invalid: "缺 stars" }
        : { name: "item/102", value: null, invalid: "null / 删除" };
    if (feed === "hn") records[2] = { name: "story/103", value: null };
  }
  const error = !["ok", "partial"].includes(scenario);
  const ranked = error
    ? []
    : records
        .filter(
          (row) => !row.invalid && row.value !== null && row.value >= minimum,
        )
        .sort(
          (a, b) =>
            (descending ? -1 : 1) * (a.value! - b.value!) ||
            a.name.localeCompare(b.name),
        );
  const unknown = error
    ? []
    : records.filter((row) => !row.invalid && row.value === null);
  const status =
    scenario === "timeout"
      ? "无响应"
      : scenario === "rate429"
        ? "429"
        : ["rate403", "forbidden"].includes(scenario)
          ? "403"
          : "200";
  const reason = {
    ok: "成功；只对当前 3 条样本排名，不代表全站排行。",
    partial:
      feed === "github"
        ? "partial=true：缺失 stars 的记录剔除，不把未知当零。"
        : "partial=true：null/删除记录剔除；评论未知单独保留，不绘成零。",
    rate403: "rate_limit：remaining=0；reset=1180，now=1000，至少等待 180 秒。",
    rate429: "rate_limit：Retry-After=90，至少等待 90 秒；不自动重试。",
    forbidden: "http：普通 403。没有限流证据，不能认定配额耗尽。",
    json: "json：200 不保证正文是 JSON；停止绘图。",
    shape: "shape：JSON 可解码，但 items/编号列表不是约定结构。",
    timeout: "timeout：没有取得响应，不能伪造 HTTP 状态码。",
  }[scenario];
  return { records, ranked, unknown, status, reason, error };
}

export function PccWorkingApisLab() {
  const [feed, setFeed] = useState<Feed>("github");
  const [scenario, setScenario] = useState<Scenario>("ok");
  const [minimum, setMinimum] = useState(0);
  const [descending, setDescending] = useState(true);
  const timeline = useTeachingTimeline({ steps: STEPS, build });
  const id = useId().replace(/:/g, "");
  const step = timeline.currentStep;
  const data = apiLabSnapshot(feed, scenario, minimum, descending);
  const limit = scenario === "rate403" || scenario === "rate429";
  const decoded = ![
    "timeout",
    "rate403",
    "rate429",
    "forbidden",
    "json",
    "shape",
  ].includes(scenario);
  const showRecords = step >= 2 && decoded;
  const showRank = step === 3 && !data.error;
  const max = feed === "github" ? 150 : 50;
  const unit = feed === "github" ? "stars" : "comments";
  const reset = () => {
    timeline.pause();
    timeline.goToStep(0);
    setFeed("github");
    setScenario("ok");
    setMinimum(0);
    setDescending(true);
  };
  const inputClass =
    "w-full min-w-0 rounded-control border border-border bg-[var(--bg)] px-2";
  return (
    <section
      aria-label="API 请求、记录筛选和排名实验"
      className="not-prose my-8 min-w-0 max-w-full rounded-card border border-border bg-elevated p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:whitespace-normal [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_input]:min-h-11 [&_input]:focus-visible:outline-2 [&_input]:focus-visible:outline-accent [&_select]:min-h-11 [&_select]:focus-visible:outline-2 [&_select]:focus-visible:outline-accent"
    >
      <h3 className="text-base font-semibold text-primary">
        公开数据如何变成一条可比较的柱？
      </h3>
      <p className="my-2 text-sm text-secondary">
        固定样本的 JavaScript 模拟，不是浏览器真实网络调用，也不执行 Python。HN
        上半图将榜单请求及逐条详情请求折叠为一轮；下方记录对应详情结果。
      </p>
      <div className="my-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          数据源
          <select
            className={inputClass}
            value={feed}
            onChange={(e) => {
              timeline.pause();
              setFeed(e.target.value as Feed);
              setMinimum(0);
            }}
          >
            <option value="github">GitHub 仓库 / stars</option>
            <option value="hn">HN 故事 / 评论总数</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          注入响应
          <select
            className={inputClass}
            value={scenario}
            onChange={(e) => {
              timeline.pause();
              setScenario(e.target.value as Scenario);
            }}
          >
            {SCENARIOS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          最低 {unit}：{minimum}
          <input
            aria-label={`最低 ${unit}`}
            type="range"
            min={0}
            max={max}
            step={1}
            value={minimum}
            onChange={(e) => {
              timeline.pause();
              setMinimum(Number(e.target.value));
            }}
            className="w-full accent-accent"
          />
        </label>
        <label className="grid gap-1 text-sm">
          本地排序
          <select
            className={inputClass}
            value={descending ? "desc" : "asc"}
            onChange={(e) => {
              timeline.pause();
              setDescending(e.target.value === "desc");
            }}
          >
            <option value="desc">数值降序；名称打破平局</option>
            <option value="asc">数值升序；名称打破平局</option>
          </select>
        </label>
      </div>
      <TimelineControls
        timeline={timeline}
        labelText={Object.fromEntries(
          STEPS.map(({ label, caption }) => [label, caption]),
        )}
        reset={{ label: "完整重置", onClick: reset }}
      />
      <svg
        className="mt-4 block h-auto w-full"
        viewBox="0 0 360 830"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        style={{ fontSize: 16, color: C.text }}
      >
        <title id={`${id}-title`}>
          {`请求时序、记录字段筛选、${unit} 条形排序`}
        </title>
        <desc id={`${id}-desc`}>
          {STEPS[step].caption}。{data.reason}。阈值 {minimum}，
          {descending ? "降序" : "升序"}。完整结果阶段保留 {data.ranked.length}{" "}
          条已知数值记录。
        </desc>
        <defs>
          <marker
            id={`${id}-arrow`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.accent} />
          </marker>
        </defs>
        <g fill={C.text}>
          <text x="20" y="25">
            Python 客户端
          </text>
          <text x="233" y="25">
            公开 API
          </text>
          <path
            d="M 55 40 V 240 M 290 40 V 240"
            stroke={C.border}
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <path
            d="M 55 77 H 290"
            stroke={C.accent}
            strokeWidth="2"
            markerEnd={`url(#${id}-arrow)`}
          />
          <text x="74" y="62">
            GET · {feed === "github" ? "search" : "top → items"}
          </text>
          <circle cx={step === 0 ? 169 : 290} cy="77" r="7" fill={C.accent} />
          {step >= 1 && scenario !== "timeout" && (
            <g>
              <path
                d="M 290 144 H 55"
                stroke={C.accent}
                strokeWidth="2"
                markerEnd={`url(#${id}-arrow)`}
              />
              <rect
                x="131"
                y="126"
                width="75"
                height="36"
                rx="3"
                fill={C.bg}
                stroke={data.error ? C.danger : C.accent}
              />
              <text x="168" y="150" textAnchor="middle">
                {data.status}
              </text>
              <text x="65" y="188">
                {scenario === "rate403"
                  ? "remaining=0 · reset=1180"
                  : scenario === "rate429"
                    ? "Retry-After: 90"
                    : "先判 HTTP，再解析正文"}
              </text>
            </g>
          )}
          {step >= 1 && scenario === "timeout" && (
            <g stroke={C.danger} strokeWidth="3">
              <path d="M 157 124 l 26 26 M 183 124 l -26 26" />
              <text x="91" y="188" stroke="none" fill={C.danger}>
                timeout · 没有状态码
              </text>
            </g>
          )}
          {step >= 1 && limit && (
            <g>
              <path
                d="M 65 221 H 295 M 65 214 V 228 M 180 214 V 228 M 295 214 V 228"
                stroke={C.danger}
                strokeWidth="2"
              />
              <text x="65" y="249">
                now=1000
              </text>
              <text x="214" y="249">
                {scenario === "rate403" ? "1180 再试" : "1090 再试"}
              </text>
            </g>
          )}
          <text x="20" y="285">
            记录字段 → 筛选（最低 {minimum}）
          </text>
          <text x="20" y="317">
            name / id
          </text>
          <text x="174" y="317">
            {unit}
          </text>
          <text x="282" y="317">
            判定
          </text>
          {showRecords ? (
            data.records.map((row, index) => {
              const y = 343 + index * 49;
              const accepted =
                !row.invalid && row.value !== null && row.value >= minimum;
              const rank = data.ranked.findIndex(
                (candidate) => candidate.name === row.name,
              );
              return (
                <g key={row.name}>
                  <rect
                    x="16"
                    y={y - 20}
                    width="324"
                    height="38"
                    rx="3"
                    fill={C.bg}
                    stroke={accepted ? C.accent : C.border}
                  />
                  <path
                    d={`M 159 ${y - 20} v 38 M 269 ${y - 20} v 38`}
                    stroke={C.border}
                  />
                  <text x="23" y={y + 5}>
                    {row.name}
                  </text>
                  <text x="189" y={y + 5}>
                    {row.value ?? "?"}
                  </text>
                  <text x="277" y={y + 5} fill={accepted ? C.accent : C.muted}>
                    {row.invalid
                      ? "剔除"
                      : row.value === null
                        ? "未知"
                        : accepted
                          ? "保留"
                          : "过滤"}
                  </text>
                  {showRank && rank >= 0 && (
                    <path
                      d={`M 339 ${y} C 355 ${y}, 355 ${564 + rank * 65}, 319 ${564 + rank * 65}`}
                      stroke={C.accent}
                      opacity="0.45"
                      fill="none"
                      strokeWidth="2"
                    />
                  )}
                </g>
              );
            })
          ) : (
            <g>
              <path
                d="M 24 346 H 336 M 24 387 H 336 M 24 428 H 336"
                stroke={C.border}
                strokeDasharray="5 5"
              />
              <text x="24" y="373">
                {step < 2 ? "尚未解码记录" : "错误阻断：无可用记录"}
              </text>
            </g>
          )}
          <text x="20" y="510">
            {descending ? "降序" : "升序"} · 仅已知值进入条形图
          </text>
          <path d="M 24 536 V 735 H 319" fill="none" stroke={C.border} />
          {[0, max / 2, max].map((tick) => (
            <g key={tick}>
              <path
                d={`M ${24 + (tick / max) * 262} 735 v 6`}
                stroke={C.muted}
              />
              <text x={24 + (tick / max) * 262} y="763" textAnchor="middle">
                {tick}
              </text>
            </g>
          ))}
          {showRank &&
            data.ranked.map((row, index) => (
              <g key={row.name}>
                <text x="29" y={550 + index * 65}>
                  {row.name}
                </text>
                <rect
                  x="24"
                  y={557 + index * 65}
                  width={(row.value! / max) * 262}
                  height="22"
                  fill={C.accent}
                />
                <text x={31 + (row.value! / max) * 262} y={574 + index * 65}>
                  {row.value}
                </text>
              </g>
            ))}
          {showRank && !data.ranked.length && (
            <text x="35" y="591">
              没有满足阈值的已知记录
            </text>
          )}
          {!showRank && (
            <text x="35" y="591">
              {step < 3 ? "推进至绘图阶段" : "失败不是零值：不画柱"}
            </text>
          )}
          <text x="20" y="802">
            {showRank
              ? `已绘 ${data.ranked.length} 条 · 未知 ${data.unknown.length} 条`
              : "固定坐标范围：长度可直接比较"}
          </text>
        </g>
      </svg>
      <p
        role="status"
        aria-live="polite"
        className="mt-3 break-words text-sm text-primary"
      >
        {step === 0 ? "请求已发出，尚无响应。请单步观察。" : data.reason}
      </p>
      {showRank && (
        <p className="mt-2 text-sm text-secondary">
          数据摘要：
          {data.ranked.map((r) => `${r.name}=${r.value}`).join("；") ||
            "已知值列表为空"}
          {data.unknown.length > 0
            ? `；未知：${data.unknown.map((r) => r.name).join("、")}`
            : ""}
          。未知记录不参与阈值比较。
        </p>
      )}
    </section>
  );
}
