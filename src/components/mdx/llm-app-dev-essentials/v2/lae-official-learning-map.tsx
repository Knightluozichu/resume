"use client";

import { useId, useState, type ReactNode } from "react";

// 本章需求：五章依赖/可选进阶支路；逐站推进与缺少 API 前置的阻断；历史/现代证据分轨；各实验独立重置；原生键盘控件与窄屏自适应。保留旧导出名兼容 registry，不复用通用证据卡。
const C = {
  bg: "var(--bg-elevated)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  route: "var(--accent)",
  done: "var(--success)",
  fault: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 max-w-full rounded-lg border px-3 py-2 text-sm text-left whitespace-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50";
const chapters = [
  { id: 1, x: 140, y: 100, label: "模型基础" },
  { id: 2, x: 140, y: 260, label: "API 合同" },
  { id: 3, x: 140, y: 420, label: "应用架构" },
  { id: 4, x: 570, y: 420, label: "进阶优化" },
  { id: 5, x: 140, y: 640, label: "框架与插件" },
];
const routes = { full: [1, 2, 3, 4, 5], application: [1, 2, 3, 5] };
const dependencies = [
  { from: 1, to: 2, path: "M140 133 V222", end: "140,230 132,214 148,214" },
  { from: 2, to: 3, path: "M140 293 V382", end: "140,390 132,374 148,374" },
  {
    from: 3,
    to: 4,
    path: "M165 444 Q350 535 538 444",
    end: "548,440 527,440 535,455",
  },
  { from: 3, to: 5, path: "M140 453 V602", end: "140,610 132,594 148,594" },
];

function Lab({
  title,
  kind,
  reset,
  children,
}: {
  title: string;
  kind: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 min-w-0 max-w-full rounded-xl border p-3 sm:p-5"
      style={{ borderColor: C.border, color: C.text }}
      aria-label={title}
      data-visual-kind={kind}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="min-w-0 text-base font-semibold">{title}</h3>
        <button type="button" className={control} onClick={reset}>
          重置
        </button>
      </div>
      {children}
    </section>
  );
}

function ChapterNetwork({
  route,
  completed = [],
  current,
  missingApi = false,
}: {
  route: number[];
  completed?: number[];
  current?: number;
  missingApi?: boolean;
}) {
  const id = useId();
  const blocked = missingApi && current === 2;
  return (
    <svg
      className="mx-auto block h-auto w-full max-w-2xl"
      viewBox="0 0 800 760"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
    >
      <title id={`${id}-title`}>五章学习依赖与路线</title>
      <desc id={`${id}-desc`}>
        依赖实线：1到2、2到3、3到4、3到5。虚线表示完整路线从4转到5的阅读次序，不是硬性依赖。路线为
        {route.join("、")}。已完成{completed.join("、") || "无"}。
        {current ? `当前位置第${current}章。` : ""}
        {blocked ? "第2章 API 缺项，第3章入口阻断。" : ""}
      </desc>
      <g fill="none" strokeWidth="7">
        {dependencies.map((edge) => {
          const active = route.includes(edge.from) && route.includes(edge.to);
          const done =
            completed.includes(edge.from) && completed.includes(edge.to);
          const color =
            missingApi && edge.from === 2
              ? C.fault
              : done
                ? C.done
                : active
                  ? C.route
                  : C.border;
          return (
            <g key={`${edge.from}-${edge.to}`} stroke={color}>
              <path
                d={edge.path}
                strokeDasharray={
                  missingApi && edge.from === 2 ? "12 12" : undefined
                }
              />
              <polygon points={edge.end} fill={color} stroke="none" />
            </g>
          );
        })}
        {route.includes(4) && (
          <g stroke={C.route}>
            <path
              d="M570 453 V555 Q570 640 470 640 H190"
              strokeDasharray="12 12"
            />
            <polygon
              points="180,640 198,630 198,650"
              fill={C.route}
              stroke="none"
            />
          </g>
        )}
      </g>
      {route.includes(4) && (
        <g fill={C.muted} fontSize="36">
          <text x="365" y="547">
            阅读顺序
          </text>
          <text x="365" y="590">
            非前置
          </text>
        </g>
      )}
      {chapters.map((chapter) => {
        const included = route.includes(chapter.id);
        const done = completed.includes(chapter.id);
        const missing = missingApi && chapter.id === 2;
        return (
          <g key={chapter.id}>
            {current === chapter.id && (
              <circle
                cx={chapter.x}
                cy={chapter.y}
                r="47"
                fill="none"
                stroke={C.text}
                strokeWidth="4"
                strokeDasharray="7 5"
              />
            )}
            <circle
              cx={chapter.x}
              cy={chapter.y}
              r="31"
              fill={done ? C.done : C.bg}
              stroke={missing ? C.fault : included ? C.route : C.border}
              strokeWidth="6"
            />
            <text
              x={chapter.x}
              y={chapter.y + 12}
              textAnchor="middle"
              fontSize="36"
              fill={C.text}
            >
              {chapter.id}
            </text>
            <text
              x={chapter.id === 4 ? 570 : 205}
              y={
                chapter.id === 4 ? 360 : chapter.id === 5 ? 695 : chapter.y + 12
              }
              textAnchor={chapter.id === 4 ? "middle" : "start"}
              fontSize="36"
              fill={included ? C.text : C.muted}
            >
              {chapter.label}
            </text>
            {done && (
              <path
                d={`M${chapter.x - 13} ${chapter.y - 49} l10 10 l20 -22`}
                fill="none"
                stroke={C.done}
                strokeWidth="6"
              />
            )}
            {missing && (
              <path
                d="M90 210 L190 310 M190 210 L90 310"
                stroke={C.fault}
                strokeWidth="6"
              />
            )}
          </g>
        );
      })}
      {blocked && (
        <g stroke={C.fault} strokeWidth="8">
          <path d="M105 338 H175 M105 352 H175" />
        </g>
      )}
      <text x="80" y="732" fontSize="36" fill={C.muted}>
        前言定范围 · 术语表随查
      </text>
    </svg>
  );
}

export function LaeOfficialLearningMapRequestContractLab() {
  const [route, setRoute] = useState<keyof typeof routes>("full");
  return (
    <Lab
      kind="chapter-dependency-map"
      title="五章依赖路网"
      reset={() => setRoute("full")}
    >
      <p className="mt-3 text-sm leading-6">
        先猜：学习框架前一定要做微调吗？切换路线，观察第4章支路。实线是本页建议的学习依赖，虚线只是阅读次序；不是原书规定的先修要求。
      </p>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-label="学习路线"
      >
        <button
          type="button"
          className={control}
          aria-pressed={route === "full"}
          onClick={() => setRoute("full")}
        >
          完整路线 1→2→3→4→5
        </button>
        <button
          type="button"
          className={control}
          aria-pressed={route === "application"}
          onClick={() => setRoute("application")}
        >
          应用主线 1→2→3→5
        </button>
      </div>
      <ChapterNetwork route={routes[route]} />
      <p className="text-sm leading-6" role="status">
        {route === "full"
          ? "完整路线：先构建应用，再研究提示与微调，最后学习框架和历史插件。第3章同时为第4、5章提供应用背景。"
          : "应用主线：第4章暂缓而非删除；先有可检查的 API 调用和应用边界，再引入框架。遇到质量问题时回访第4章。"}{" "}
        这张图仅显示五章关系，不代表88条目已逐项验收。
      </p>
    </Lab>
  );
}

export function LaeOfficialLearningMapExecutionTraceLab() {
  const [position, setPosition] = useState(0);
  const [missingApi, setMissingApi] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const route = routes.application;
  const current = route[position];
  const blocked = missingApi && current === 2;
  const finished = position === route.length;
  function reset() {
    setPosition(0);
    setMissingApi(false);
    setAttempted(false);
  }
  return (
    <Lab
      kind="prerequisite-route-trace"
      title="沿应用主线逐站推进"
      reset={reset}
    >
      <p className="mt-3 text-sm leading-6">
        预测：省略第2章的请求与响应知识，能否直接进入第3章？开启缺项，再连续推进。圆环为当前位置，勾号为已完成，红色双横线为阻断。此处是教学模拟，不是阅读成绩。
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={control}
          aria-pressed={missingApi}
          onClick={() => {
            setMissingApi(!missingApi);
            setPosition(0);
            setAttempted(false);
          }}
        >
          {missingApi ? "补回 API 前置并回起点" : "模拟遗漏 API 前置（回起点）"}
        </button>
        <button
          type="button"
          className={control}
          disabled={finished}
          onClick={() => {
            if (blocked) setAttempted(true);
            else {
              setPosition(position + 1);
              setAttempted(false);
            }
          }}
        >
          {finished ? "路线已完成" : "完成本站并前进"}
        </button>
      </div>
      <ChapterNetwork
        route={route}
        completed={route.slice(0, position)}
        current={current}
        missingApi={missingApi}
      />
      <p className="text-sm leading-6" role="status">
        {finished
          ? "已完成模拟路线 1→2→3→5。可回访第4章研究优化；走完路线并不等于88个条目已掌握。"
          : blocked
            ? `${attempted ? "推进被拒绝，位置保持在第2章。" : "已到第2章，前置缺项。"}先补请求输入、响应格式及版本标签，才能检查第3章应用的调用边界。点击补回前置后重新走路线。`
            : `当前位置：第${current}章。${position === 0 ? "从模型能力与局限出发。" : position === 1 ? "核对请求输入、响应格式与版本标签。" : position === 2 ? "将 API 合同放入密钥、数据与输入输出边界中。" : "把框架抽象还原为提示、状态、工具和权限。"}`}
      </p>
    </Lab>
  );
}

export function LaeOfficialLearningMapAuthorizationGateLab() {
  const [chapter, setChapter] = useState<2 | 5>(2);
  const [overwrite, setOverwrite] = useState(false);
  const id = useId();
  const historical =
    chapter === 2
      ? ["旧 SDK 调用", "输入 / 输出", "版本化样例"]
      : ["GPT-4 插件", "清单 / API", "历史集成"];
  const modern =
    chapter === 2
      ? ["Responses", "事件 / 工具", "迁移测试"]
      : ["现行工具", "参数 / 授权", "应用验证"];
  return (
    <Lab
      kind="historical-migration-swimlanes"
      title="时代分界：保留历史，再做迁移"
      reset={() => {
        setChapter(2);
        setOverwrite(false);
      }}
    >
      <p className="mt-3 text-sm leading-6">
        预测：把旧名字直接替换成新名字，是否就完成迁移？切换第2／5章，再模拟覆盖。左右轨道各自保留证据；中间只有经过核对的迁移关系，不是接口等价关系。
      </p>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-label="时代比较样本"
      >
        <button
          type="button"
          className={control}
          aria-pressed={chapter === 2}
          onClick={() => setChapter(2)}
        >
          第2章：API
        </button>
        <button
          type="button"
          className={control}
          aria-pressed={chapter === 5}
          onClick={() => setChapter(5)}
        >
          第5章：插件
        </button>
        <button
          type="button"
          className={control}
          aria-pressed={overwrite}
          onClick={() => setOverwrite(!overwrite)}
        >
          {overwrite ? "恢复分轨" : "模拟直接改名覆盖"}
        </button>
      </div>
      <svg
        className="mx-auto block h-auto w-full max-w-2xl"
        viewBox="0 0 800 760"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>{`第${chapter}章历史与现代双轨`}</title>
        <desc id={`${id}-desc`}>
          左侧第一版历史轨：{historical.join("、")}。右侧2026迁移轨：
          {modern.join("、")}。
          {overwrite
            ? "错误覆盖切断了历史证据链，红色跨界线不能代表迁移完成。"
            : "两轨独立，在底部核对差异，不互相替代。"}
        </desc>
        <g fontSize="36" fill={C.text}>
          <text x="45" y="65">
            第一版历史轨
          </text>
          <text x="465" y="65">
            2026迁移轨
          </text>
          <path
            d="M400 100 V570"
            stroke={C.muted}
            strokeWidth="3"
            strokeDasharray="10 12"
          />
          <text x="400" y="620" textAnchor="middle">
            时代分界
          </text>
          <path
            d="M80 135 V510"
            stroke={overwrite ? C.border : C.route}
            strokeWidth="8"
            strokeDasharray={overwrite ? "12 18" : undefined}
          />
          <path d="M480 135 V510" stroke={C.done} strokeWidth="8" />
          {[0, 1, 2].map((index) => {
            const y = 160 + index * 150;
            return (
              <g key={index}>
                <circle
                  cx="80"
                  cy={y}
                  r="14"
                  fill={overwrite ? C.border : C.route}
                />
                <circle cx="480" cy={y} r="14" fill={C.done} />
                <text x="110" y={y + 12} fill={overwrite ? C.muted : C.text}>
                  {historical[index]}
                </text>
                <text x="510" y={y + 12}>
                  {modern[index]}
                </text>
                {overwrite && (
                  <g fill="none" stroke={C.fault} strokeWidth="5">
                    <path d={`M105 ${y} H365 M480 ${y - 25} L345 ${y - 25}`} />
                    <path d={`M365 ${y - 35} l-20 10 l20 10`} />
                  </g>
                )}
              </g>
            );
          })}
          {overwrite ? (
            <g stroke={C.fault} fill={C.fault}>
              <path d="M365 235 l70 70 M435 235 l-70 70" strokeWidth="8" />
              <text x="400" y="700" textAnchor="middle" stroke="none">
                覆盖 ≠ 迁移完成
              </text>
            </g>
          ) : (
            <g>
              <path
                d="M80 520 V650 H480 V520"
                stroke={C.route}
                strokeWidth="5"
                fill="none"
              />
              <text x="400" y="710" textAnchor="middle">
                保留版本 → 核对差异 → 验证
              </text>
            </g>
          )}
        </g>
      </svg>
      <p className="text-sm leading-6" role="status">
        {overwrite
          ? "错误：历史标签被划掉，旧证据链断开；现代文档无法证明旧接口行为。恢复分轨，分别保存原示例版本和迁移测试。"
          : chapter === 2
            ? "历史侧保留 ChatCompletion / Completion 与当时 SDK 的上下文。迁移到 Responses 应核对请求、响应、事件和工具循环，不能只替换调用名称；这也不意味着所有 Chat Completions 接口都已失效。"
            : "原书 GPT-4 插件的清单与 OpenAPI 规范属于历史集成方式。现行工具调用不是插件的同名替代：工具参数可解析，仍不代表应用已授权执行。"}
      </p>
    </Lab>
  );
}
