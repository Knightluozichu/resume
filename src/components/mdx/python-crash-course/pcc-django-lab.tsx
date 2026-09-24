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
  { label: "URL", caption: "匹配地址与整数参数" },
  { label: "view", caption: "进入只读视图" },
  { label: "ORM", caption: "查询主题与关联笔记" },
  { label: "template", caption: "子模板填入公共骨架" },
  { label: "HTML", caption: "返回页面或错误响应" },
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
const TOPICS = [
  { id: 1, text: "Python" },
  { id: 2, text: "Django" },
] as const;
// Teaching fixture: ids and creation times increase together. Not live DB rows.
const ENTRIES = [
  { id: 11, topicId: 1, text: "变量" },
  { id: 12, topicId: 1, text: "循环" },
  { id: 13, topicId: 2, text: "路由" },
] as const;
const ROUTES = [
  "/topics/1/",
  "/topics/2/",
  "/topics/999/",
  "/topics/nope/",
] as const;
type Route = (typeof ROUTES)[number];

/** Predicts this chapter's actual views; never pretends to execute Django. */
export function djangoLabSnapshot(route: Route, migrated: boolean) {
  const matches = route !== "/topics/nope/";
  const topicId = matches ? Number(route.split("/")[2]) : null;
  const topic = TOPICS.find((row) => row.id === topicId);
  if (!matches) {
    return {
      topicId,
      entries: [],
      stop: 0,
      status: 404,
      reason: "字母不匹配整数路由；未进入视图。",
    };
  }
  if (!migrated) {
    return {
      topicId,
      entries: [],
      stop: 2,
      status: 500,
      reason: "查询触发缺表异常；尚未读取模板。",
    };
  }
  if (!topic) {
    return {
      topicId,
      entries: [],
      stop: 2,
      status: 404,
      reason: "路由已匹配；主题不存在，转为 404。",
    };
  }
  return {
    topicId,
    entries: ENTRIES.filter((row) => row.topicId === topicId),
    stop: 4,
    status: 200,
    reason: `${topic.text} 的 ${ENTRIES.filter((row) => row.topicId === topicId).length} 条笔记，按创建顺序展示。`,
  };
}

export function PccDjangoLab() {
  const id = useId();
  const [route, setRoute] = useState<Route>(ROUTES[0]);
  const [migrated, setMigrated] = useState(true);
  const timeline = useTeachingTimeline({ steps: STEPS, build });
  const result = djangoLabSnapshot(route, migrated);
  const step = Math.min(timeline.currentStep, result.stop);
  const failed = result.status !== 200;
  const reachedEnd = timeline.currentStep >= result.stop;
  const color = failed && reachedEnd ? C.danger : C.accent;
  const ys = [74, 164, 254, 369, 500];
  const reset = () => {
    setRoute(ROUTES[0]);
    setMigrated(true);
    timeline.goToStep(0);
  };
  const stageText =
    failed && reachedEnd
      ? `${result.status}：${result.reason}`
      : step === 4
        ? `200：${result.reason}`
        : `${STEPS[step].caption}；${step === 2 ? result.reason : "继续单步追踪。"}`;

  return (
    <section
      aria-label="Django 外键与请求实验：切换地址或未迁移故障，单步观察数据关系和失败位置"
      className="not-prose my-8 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_select]:min-h-11"
    >
      <h3 className="text-lg font-semibold text-primary">
        一条详情请求，两种结构
      </h3>
      <p className="mt-2 text-sm text-secondary">
        固定教学样本，不连接数据库。实体与外键在左，真实代码的请求顺序在右；窄屏上下排列。
      </p>
      <div className="my-4 flex min-w-0 flex-wrap items-end gap-3">
        <label
          className="flex min-w-0 basis-full flex-col gap-1 text-sm text-primary sm:flex-1 sm:basis-auto"
          htmlFor={`${id}-route`}
        >
          请求地址
          <select
            id={`${id}-route`}
            value={route}
            className="w-full min-w-0 rounded-control border border-border bg-surface px-3 text-base"
            onChange={(event) => {
              setRoute(event.target.value as Route);
              timeline.goToStep(0);
            }}
          >
            {ROUTES.map((path) => (
              <option key={path}>{path}</option>
            ))}
          </select>
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-primary">
          <input
            type="checkbox"
            checked={!migrated}
            className="h-11 w-11 shrink-0 accent-[var(--accent)]"
            onChange={(event) => {
              setMigrated(!event.target.checked);
              timeline.goToStep(0);
            }}
          />
          尚未 migrate
        </label>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <figure className="m-0 min-w-0">
          <svg
            viewBox="0 0 340 530"
            role="img"
            aria-labelledby={`${id}-entities`}
            className="block h-auto w-full"
            style={{ color: C.text, fontSize: 16 }}
          >
            <title
              id={`${id}-entities`}
            >{`Topic 与 Entry 外键：${migrated ? `当前主题 ${result.topicId ?? "未匹配"}` : "只有模型计划，尚未建表"}`}</title>
            <text x="12" y="24" fill={C.text} fontSize="18">
              一对多：外键存在笔记这一侧
            </text>
            <text x="64" y="50" fill={C.muted}>
              Topic · 1 端
            </text>
            {migrated ? (
              <>
                {ENTRIES.map((entry, index) => {
                  const fromY = entry.topicId === 1 ? 82 : 142;
                  const toY = 266 + index * 60;
                  const selected = entry.topicId === result.topicId;
                  const lane = 12 + index * 13;
                  return (
                    <path
                      key={`fk-${entry.id}`}
                      d={`M 64 ${fromY} C ${lane} ${fromY}, ${lane} ${toY}, 64 ${toY}`}
                      fill="none"
                      stroke={selected ? C.accent : C.border}
                      strokeWidth={selected ? 3 : 1.5}
                      strokeDasharray={selected ? undefined : "5 5"}
                    />
                  );
                })}
                {TOPICS.map((topic, index) => (
                  <g key={topic.id}>
                    <rect
                      x="64"
                      y={58 + index * 60}
                      width="264"
                      height="48"
                      rx="5"
                      fill={C.bg}
                      stroke={topic.id === result.topicId ? C.accent : C.border}
                      strokeWidth="2"
                    />
                    <circle
                      cx="64"
                      cy={82 + index * 60}
                      r="4"
                      fill={C.accent}
                    />
                    <text
                      x="78"
                      y={88 + index * 60}
                      fill={C.text}
                    >{`id=${topic.id}   ${topic.text}`}</text>
                  </g>
                ))}
                <text x="64" y="226" fill={C.muted}>
                  Entry · 多端（创建顺序）
                </text>
                {ENTRIES.map((entry, index) => (
                  <g key={entry.id}>
                    <rect
                      x="64"
                      y={242 + index * 60}
                      width="264"
                      height="48"
                      rx="5"
                      fill={C.bg}
                      stroke={
                        entry.topicId === result.topicId ? C.accent : C.border
                      }
                      strokeWidth="2"
                    />
                    <circle
                      cx="64"
                      cy={266 + index * 60}
                      r="4"
                      fill={C.accent}
                    />
                    <text
                      x="76"
                      y={273 + index * 60}
                      fill={C.text}
                    >{`${entry.id}  ${entry.text}  topic_id=${entry.topicId}`}</text>
                  </g>
                ))}
                <text x="16" y="449" fill={C.text}>
                  同一主题可以连接多条笔记。
                </text>
                <text x="16" y="477" fill={C.muted}>
                  实线：当前主题；虚线：其他主题。
                </text>
                <text x="16" y="505" fill={C.muted}>
                  删主题 → 删除它的笔记，不反向。
                </text>
              </>
            ) : (
              <>
                <rect
                  x="64"
                  y="58"
                  width="264"
                  height="112"
                  rx="5"
                  fill="none"
                  stroke={C.border}
                  strokeDasharray="6 5"
                />
                <text x="78" y="90" fill={C.muted}>
                  模型计划，尚无数据表
                </text>
                <text x="78" y="123" fill={C.muted}>
                  text / date_added
                </text>
                <text x="64" y="226" fill={C.muted}>
                  Entry · 结构计划
                </text>
                <rect
                  x="64"
                  y="242"
                  width="264"
                  height="168"
                  rx="5"
                  fill="none"
                  stroke={C.border}
                  strokeDasharray="6 5"
                />
                <text x="78" y="275" fill={C.muted}>
                  topic_id → Topic.id
                </text>
                <text x="78" y="310" fill={C.muted}>
                  text / date_added
                </text>
                <path
                  d="M 152 333 L 192 373 M 192 333 L 152 373"
                  stroke={C.danger}
                  strokeWidth="3"
                />
                <text x="16" y="453" fill={C.danger}>
                  写了模型 ≠ 已经建表
                </text>
                <text x="16" y="485" fill={C.muted}>
                  生成迁移 → 执行迁移 → 才可查询
                </text>
              </>
            )}
          </svg>
          <figcaption className="text-sm text-secondary">
            图一：连线按 topic_id 连接，而不是按显示行号。
          </figcaption>
        </figure>

        <figure className="m-0 min-w-0">
          <svg
            viewBox="0 0 340 560"
            role="img"
            aria-labelledby={`${id}-request`}
            className="block h-auto w-full"
            style={{ color: C.text, fontSize: 16 }}
          >
            <title
              id={`${id}-request`}
            >{`请求 ${route}：第 ${step + 1} 层，${stageText}`}</title>
            <text x="12" y="24" fill={C.text} fontSize="18">
              请求链：从地址到响应
            </text>
            <path
              d="M 28 74 V 500"
              fill="none"
              stroke={C.border}
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <path
              d={`M 28 74 V ${ys[step]}`}
              fill="none"
              stroke={color}
              strokeWidth="4"
            />
            {STEPS.map(({ label }, index) => (
              <g key={label} opacity={index > result.stop && failed ? 0.35 : 1}>
                <circle
                  cx="28"
                  cy={ys[index]}
                  r={index === step ? 12 : 7}
                  fill={index <= step ? color : C.bg}
                  stroke={index <= step ? color : C.border}
                  strokeWidth="2"
                />
                <text
                  x="86"
                  y={[54, 140, 210, 323, 459][index]}
                  fill={index === step ? color : C.muted}
                >{`${index + 1} ${label}`}</text>
              </g>
            ))}
            <text x="92" y="82" fill={C.text}>
              {route}
            </text>
            <text x="92" y="110" fill={C.muted}>
              {result.stop === 0
                ? "整数参数不匹配"
                : `topic_id = ${result.topicId}`}
            </text>
            <g opacity={result.stop < 1 ? 0.35 : 1}>
              <path
                d="M 84 148 L 96 164 L 84 180 M 310 148 L 298 164 L 310 180"
                stroke={C.border}
                strokeWidth="2"
                fill="none"
              />
              <text x="111" y="170" fill={C.text}>
                topic(request, id)
              </text>
            </g>
            <g opacity={result.stop < 2 ? 0.35 : 1}>
              <path
                d="M 86 238 V 285 C 86 302 322 302 322 285 V 238"
                fill={C.bg}
                stroke={
                  failed && reachedEnd && result.stop === 2
                    ? C.danger
                    : C.border
                }
                strokeWidth="2"
              />
              <ellipse
                cx="204"
                cy="238"
                rx="118"
                ry="12"
                fill={C.bg}
                stroke={C.border}
              />
              <text x="98" y="273" fill={C.text}>
                {step < 2
                  ? "等待数据库查询"
                  : !migrated
                    ? "无表：查询异常"
                    : result.topicId === 999
                      ? "Topic：0 行"
                      : `Topic：1 行；Entry：${result.entries.length} 行`}
              </text>
            </g>
            <g opacity={result.stop < 3 ? 0.25 : 1}>
              <rect
                x="86"
                y="337"
                width="236"
                height="99"
                rx="3"
                fill={C.bg}
                stroke={step >= 3 ? C.accent : C.border}
                strokeWidth="2"
              />
              <text x="98" y="359" fill={C.muted}>
                base：导航 / 公共骨架
              </text>
              <path d="M 86 370 H 322" stroke={C.border} />
              <rect
                x="96"
                y="380"
                width="216"
                height="44"
                fill="none"
                stroke={C.accent}
                strokeDasharray={step < 3 ? "5 4" : undefined}
              />
              <text x="107" y="407" fill={C.text}>
                {step >= 3
                  ? `content：${result.entries.map((row) => row.text).join("、")}`
                  : "等待填入 content"}
              </text>
            </g>
            {failed && reachedEnd && (
              <>
                <path
                  d={`M 28 ${ys[result.stop]} H 58 V 504 H 84`}
                  fill="none"
                  stroke={C.danger}
                  strokeWidth="2"
                />
                <path
                  d={`M 18 ${ys[result.stop] - 10} L 38 ${ys[result.stop] + 10} M 38 ${ys[result.stop] - 10} L 18 ${ys[result.stop] + 10}`}
                  stroke={C.danger}
                  strokeWidth="3"
                />
              </>
            )}
            <path
              d="M 86 473 H 298 L 322 497 V 534 H 86 Z M 298 473 V 497 H 322"
              fill={C.bg}
              stroke={reachedEnd ? color : C.border}
              strokeWidth="2"
            />
            <text x="100" y="511" fill={reachedEnd ? color : C.muted}>
              {reachedEnd
                ? `${result.status} ${failed ? "错误响应" : "HTML 页面"}`
                : "等待生成响应"}
            </text>
          </svg>
          <figcaption className="text-sm text-secondary">
            图二：灰色下游未执行；红线是错误响应的短路，不是正常模板链。
          </figcaption>
        </figure>
      </div>

      <TimelineControls
        timeline={timeline}
        labelText={Object.fromEntries(
          STEPS.map(({ label, caption }, index) => [
            label,
            failed && index > result.stop && index < 4
              ? `${caption}（已跳过）`
              : caption,
          ]),
        )}
        caption="默认暂停；切换条件回到第一步。减弱动态效果时请使用单步。"
        reset={{ label: "完整重置", onClick: reset }}
      />
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-3 min-h-16 rounded-control border border-border p-3 text-sm text-primary"
      >
        {`${route} · ${migrated ? "已迁移" : "未迁移"} · ${stageText}`}
      </p>
    </section>
  );
}
