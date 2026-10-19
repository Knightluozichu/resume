"use client";

import { useId, useReducer } from "react";

// These dependencies are editorial study gates, not the publisher's TOC order.
export const learningNodes = [
  {
    id: 1,
    title: "Go与Web应用",
    short: "协议",
    slug: "01-foundations/gwp-http-basics",
    prerequisites: [],
    x: 420,
    y: 100,
    question:
      "重复同一个删除请求，第二次返回404。仅凭状态码不同，能否否定幂等性？",
    choices: [
      "能，幂等要求每次响应完全一致",
      "不能，应比较重复请求对目标状态的预期影响",
    ],
    answer: 1,
    reason:
      "幂等性比较预期状态效果，不保证每次响应相同。回第1章检查方法语义，再谈分派。",
  },
  {
    id: 2,
    title: "Go ChitChat",
    short: "全景",
    slug: "01-foundations/gwp-chitchat",
    prerequisites: [1],
    x: 150,
    y: 350,
    question: "浏览器带来一个会话cookie。哪一步才足以把请求关联到已登录用户？",
    choices: [
      "服务端验证会话记录、有效性和对应用户",
      "只要cookie字段存在就视为已登录",
    ],
    answer: 0,
    reason:
      "浏览器输入不是身份保证。ChitChat把请求、会话查询、数据和页面串成完整路径；这里只诊断这条职责边界。",
  },
  {
    id: 3,
    title: "处理请求",
    short: "分派",
    slug: "02-request-response/gwp-routing",
    prerequisites: [1],
    x: 600,
    y: 350,
    question:
      "用httptest.ResponseRecorder调用处理器并得到200，是否证明HTTPS协商成功？",
    choices: ["是，200意味着TLS已建立", "否，Recorder没有建立真实连接"],
    answer: 1,
    reason:
      "处理器输出与监听/TLS协商是不同边界。先认清入口，才能定位输入与响应的责任。",
  },
  {
    id: 4,
    title: "处理输入与响应",
    short: "输入",
    slug: "02-request-response/gwp-processing-requests",
    prerequisites: [3],
    x: 420,
    y: 600,
    question:
      "处理器先Write消息体，再设置响应头。客户端一定收到后来设置的头吗？",
    choices: [
      "不一定；首次Write可能已隐式提交响应头",
      "一定；返回函数时才统一发送响应头",
    ],
    answer: 0,
    reason:
      "首次Write会在尚未提交时隐式写出状态。后续模板、服务错误都受这个提交边界约束。",
  },
  {
    id: 5,
    title: "展示内容",
    short: "展示",
    slug: "03-display-data/gwp-templates",
    prerequisites: [4],
    x: 150,
    y: 850,
    question: "模板执行到一半报错，如何避免把半张HTML当成功页面交给客户端？",
    choices: [
      "直接写ResponseWriter，出错再补500即可",
      "先写缓冲区，成功后再提交响应",
    ],
    answer: 1,
    reason:
      "模板可能部分写出。缓冲把执行与响应提交隔开；安全输出还要遵守具体上下文。",
  },
  {
    id: 6,
    title: "存储数据",
    short: "存储",
    slug: "03-display-data/gwp-database",
    prerequisites: [4],
    x: 420,
    y: 850,
    question:
      "创建帖子及其附属记录，第二次写入失败。怎样避免留下半份业务状态？",
    choices: [
      "把相关写入放入同一事务，失败回滚并检查提交错误",
      "第一次写入成功就返回成功",
    ],
    answer: 0,
    reason:
      "原子提交是业务一致性的边界，不是连接成功的附带效果。真实数据库还需单独集成验证。",
  },
  {
    id: 7,
    title: "Go Web服务",
    short: "服务",
    slug: "04-service-testing/gwp-json-api",
    prerequisites: [4],
    x: 690,
    y: 850,
    question: "JSON解码成功，是否足以直接修改资源状态？",
    choices: [
      "是，解析器已完成业务校验和授权",
      "否，仍要检查完整消息、领域约束及权限",
    ],
    answer: 1,
    reason:
      "解析成功只说明相应解码步骤成功。第7章还区分SOAP/REST与XML/JSON，不能把服务简化成JSON接口。",
  },
  {
    id: 8,
    title: "测试应用",
    short: "测试",
    slug: "04-service-testing/gwp-testing",
    prerequisites: [3],
    x: 600,
    y: 1100,
    question:
      "测试替身总是返回成功，所有测试绿了。能否据此排除真实存储失败路径的问题？",
    choices: [
      "不能；应注入失败并补充对应边界的集成证据",
      "能；测试通过就覆盖了所有依赖行为",
    ],
    answer: 0,
    reason:
      "断言只覆盖实际输入与替身行为。第8章可在第3章后开始，不必等十章全读完。",
  },
  {
    id: 9,
    title: "利用Go并发",
    short: "并发",
    slug: "05-runtime-release/gwp-concurrency",
    prerequisites: [8],
    x: 600,
    y: 1350,
    question: "开了多个goroutine，为什么仍不能断言请求更快且任务最终都会结束？",
    choices: [
      "数量足够多就会自动更快并自动退出",
      "仍受调度、共享资源和阻塞影响，需要测量及退出协议",
    ],
    answer: 1,
    reason:
      "并发组织工作不等于保证并行加速。此图要求先会观察失败，再评估任务退出；这是学习建议，不是Go语法依赖。",
  },
  {
    id: 10,
    title: "部署Go应用",
    short: "部署",
    slug: "05-runtime-release/gwp-deployment",
    prerequisites: [6, 7, 8, 9],
    x: 420,
    y: 1600,
    question: "二进制成功构建，是否足以批准一次带持久化和后台任务的服务发布？",
    choices: [
      "不足；还需环境、健康检查、资源退出及回滚证据",
      "足够；构建成功等同于线上可用",
    ],
    answer: 0,
    reason:
      "发布检查同时汇合数据、服务、测试和任务收敛。本图只给学习路线，不颁发生产发布许可。",
  },
] as const;

export type LearningId = (typeof learningNodes)[number]["id"];
export const learningGoals = [
  { id: "service", title: "无持久化服务练习", targets: [7, 8] },
  { id: "page", title: "有存储的网页练习", targets: [2, 5, 6, 8] },
  { id: "release", title: "带后台任务的服务发布准备", targets: [10] },
] as const;
export type GoalId = (typeof learningGoals)[number]["id"];
export type Evidence = Partial<Record<LearningId, "pass" | "fail">>;
export type Readiness = "pass" | "ready" | "blocked" | "fail" | "stale";
export const readinessLabels: Record<Readiness, string> = {
  pass: "证据有效",
  ready: "可以诊断",
  blocked: "先修阻塞",
  fail: "本题未过",
  stale: "证据待复核",
};
const byId = (id: LearningId) => learningNodes.find((node) => node.id === id)!;

export function prerequisiteClosure(goal: GoalId): LearningId[] {
  const required = new Set<LearningId>();
  function visit(id: LearningId) {
    if (required.has(id)) return;
    required.add(id);
    byId(id).prerequisites.forEach(visit);
  }
  learningGoals.find((item) => item.id === goal)!.targets.forEach(visit);
  return learningNodes
    .filter((node) => required.has(node.id))
    .map((node) => node.id);
}

export function evaluateReadiness(
  evidence: Evidence,
): Record<LearningId, Readiness> {
  const result = {} as Record<LearningId, Readiness>;
  // Nodes are topologically sorted; every dependency is an earlier node.
  for (const node of learningNodes) {
    const valid = node.prerequisites.every((id) => result[id] === "pass");
    result[node.id] =
      evidence[node.id] === "fail"
        ? "fail"
        : !valid
          ? evidence[node.id] === "pass"
            ? "stale"
            : "blocked"
          : evidence[node.id] === "pass"
            ? "pass"
            : "ready";
  }
  return result;
}

export interface LearningState {
  goal: GoalId;
  selected: LearningId;
  choice: number | null;
  evidence: Evidence;
  feedback: string;
  attempts: number;
}
export type LearningAction =
  | { type: "goal"; goal: GoalId }
  | { type: "select"; id: LearningId }
  | { type: "choice"; choice: number }
  | { type: "check" }
  | { type: "revoke" }
  | { type: "next" }
  | { type: "reset" };
export const initialLearningState: LearningState = {
  goal: "service",
  selected: 1,
  choice: null,
  evidence: {},
  attempts: 0,
  feedback: "先预测第1章诊断的答案，再核验。图中的虚线表示前置证据尚未有效。",
};

export function learningReducer(
  state: LearningState,
  action: LearningAction,
): LearningState {
  if (action.type === "reset") return { ...initialLearningState, evidence: {} };
  if (action.type === "goal")
    return {
      ...state,
      goal: action.goal,
      choice: null,
      feedback: "目标已切换；只改变所需路径，已有诊断记录保留。",
    };
  if (action.type === "select")
    return {
      ...state,
      selected: action.id,
      choice: null,
      feedback: `已选择第${action.id}章。先修未有效时可看题，但不能记入通过。`,
    };
  if (action.type === "choice") return { ...state, choice: action.choice };
  const readiness = evaluateReadiness(state.evidence);
  if (action.type === "next") {
    const id = prerequisiteClosure(state.goal).find(
      (id) => readiness[id] === "ready" || readiness[id] === "fail",
    );
    return id
      ? {
          ...state,
          selected: id,
          choice: null,
          feedback: `下一处待核验：第${id}章。若有前置阻塞，先沿虚线回溯。`,
        }
      : {
          ...state,
          feedback:
            "目标路径中的诊断证据均有效；仍需到对应章节做实际迁移任务。",
        };
  }
  if (action.type === "revoke") {
    const evidence = { ...state.evidence };
    delete evidence[state.selected];
    return {
      ...state,
      evidence,
      choice: null,
      feedback: `已撤销第${state.selected}章证据；依赖它的已通过节点转为待复核，不再计入有效进度。`,
    };
  }
  const node = byId(state.selected);
  if (node.prerequisites.some((id) => readiness[id] !== "pass"))
    return {
      ...state,
      feedback: `不能记录：第${node.prerequisites.filter((id) => readiness[id] !== "pass").join("、")}章前置证据尚未有效。先补前置，再回本题。`,
    };
  if (state.choice === null)
    return {
      ...state,
      feedback: "请选择一个预测答案，再核验；空答案不会增加记录。",
    };
  const pass = state.choice === node.answer;
  return {
    ...state,
    evidence: { ...state.evidence, [node.id]: pass ? "pass" : "fail" },
    attempts: state.attempts + 1,
    feedback: `${pass ? "本题通过" : "本题未通过"}：${node.reason}`,
  };
}

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
};
const control =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-left text-sm text-primary hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function dependencyPath(from: LearningId, to: LearningId) {
  const a = byId(from),
    b = byId(to);
  if (from === 3 && to === 8)
    return `M ${a.x + 65} ${a.y} C 825 ${a.y}, 825 ${b.y}, ${b.x + 75} ${b.y}`;
  if (to === 10 && from === 6)
    return `M 375 915 C 285 1060, 285 1490, 375 1530`;
  if (to === 10 && from === 7)
    return `M 735 915 C 815 1100, 815 1520, 495 1600`;
  if (to === 10 && from === 8)
    return `M 545 1155 C 470 1230, 370 1390, 400 1525`;
  return `M ${a.x} ${a.y + 65} L ${b.x} ${b.y - 78}`;
}

export function LearningDependencyGraph({ state }: { state: LearningState }) {
  const marker = useId().replace(/:/g, "");
  const readiness = evaluateReadiness(state.evidence);
  const required = prerequisiteClosure(state.goal);
  return (
    <svg
      viewBox="0 -48 840 1848"
      role="img"
      aria-label="十章学习依赖图：粗环是目标路径，实线是已满足的前置边，虚线是阻塞边"
      className="mx-auto block h-auto w-full max-w-[360px]"
      data-testid="learning-dependency-graph"
    >
      <defs>
        <marker
          id={marker}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
        </marker>
      </defs>
      {learningNodes.flatMap((node) =>
        node.prerequisites.map((from) => {
          const satisfied = readiness[from] === "pass";
          return (
            <path
              key={`${from}-${node.id}`}
              data-edge={`${from}-${node.id}`}
              data-satisfied={satisfied}
              d={dependencyPath(from, node.id)}
              fill="none"
              stroke={satisfied ? C.success : C.secondary}
              strokeWidth={satisfied ? 7 : 4}
              strokeDasharray={satisfied ? undefined : "16 12"}
              markerEnd={`url(#${marker})`}
            />
          );
        }),
      )}
      {learningNodes.map((node) => {
        const status = readiness[node.id];
        const color =
          status === "pass"
            ? C.success
            : status === "fail"
              ? C.danger
              : status === "stale"
                ? C.warning
                : status === "ready"
                  ? C.accent
                  : C.secondary;
        const symbol =
          status === "pass"
            ? "✓"
            : status === "fail"
              ? "×"
              : status === "stale"
                ? "!"
                : status === "ready"
                  ? "○"
                  : "−";
        return (
          <g
            key={node.id}
            data-node={node.id}
            data-readiness={status}
            data-required={required.includes(node.id)}
          >
            <title>{`${node.id} ${node.title}：${readinessLabels[status]}`}</title>
            {required.includes(node.id) && (
              <circle
                cx={node.x}
                cy={node.y}
                r="81"
                fill="none"
                stroke={C.accent}
                strokeWidth="7"
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r="70"
              fill={C.bg}
              stroke={color}
              strokeWidth="7"
              strokeDasharray={
                status === "blocked" || status === "stale" ? "12 8" : undefined
              }
            />
            <text
              x={node.x}
              y={node.y - 8}
              textAnchor="middle"
              fill={C.primary}
              fontSize="48"
              fontWeight="700"
            >
              {node.id}
            </text>
            <text
              x={node.x + 62}
              y={node.y - 63}
              fill={color}
              fontSize="48"
              fontWeight="700"
            >
              {symbol}
            </text>
            <text
              x={node.x}
              y={node.y + 46}
              textAnchor="middle"
              fill={C.primary}
              fontSize="48"
            >
              {node.short}
            </text>
            {state.selected === node.id && (
              <path
                d={`M ${node.x - 40} ${node.y + 100} h 80`}
                stroke={C.accent}
                strokeWidth="8"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function GwpLearningMapLab() {
  const [state, dispatch] = useReducer(learningReducer, initialLearningState);
  const groupId = useId();
  const selected = byId(state.selected);
  const readiness = evaluateReadiness(state.evidence);
  const required = prerequisiteClosure(state.goal);
  const valid = required.filter((id) => readiness[id] === "pass").length;
  return (
    <section
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-4"
      aria-label="先修路径诊断实验"
      data-testid="gwp-learning-map-lab"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-primary">
          先预测，再让依赖边放行
        </h3>
        <button
          type="button"
          className={control}
          data-testid="learning-reset"
          onClick={() => dispatch({ type: "reset" })}
        >
          重置全部
        </button>
      </header>
      <p className="my-3 text-sm text-secondary">
        这是本站学习建议，不是原书强制先修，也不是真实Go程序执行器。节点只记录本题诊断；不保存到浏览器或服务器。
      </p>
      <fieldset className="min-w-0">
        <legend className="mb-2 text-sm font-semibold text-primary">
          1. 选择当前任务
        </legend>
        <div className="flex flex-wrap gap-2">
          {learningGoals.map((goal) => (
            <label
              key={goal.id}
              className={`${control} flex cursor-pointer items-center gap-2`}
            >
              <input
                type="radio"
                name={`${groupId}-goal`}
                value={goal.id}
                checked={state.goal === goal.id}
                onChange={() => dispatch({ type: "goal", goal: goal.id })}
                data-testid={`learning-goal-${goal.id}`}
              />
              {goal.title}
            </label>
          ))}
        </div>
      </fieldset>
      <p
        className="my-3 text-sm font-semibold text-primary"
        data-testid="learning-progress"
      >
        目标路径有效证据：{valid}/{required.length}；已核验次数：
        {state.attempts}
      </p>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <figure className="m-0 min-w-0">
          <LearningDependencyGraph state={state} />
          <figcaption className="text-sm text-secondary">
            粗外环：目标所需；下划线：当前选择。✓有效、○可诊断、−阻塞、×未过、!待复核。实线仅说明起点证据有效，汇合点仍需全部前置有效。文字状态也列在右侧（窄屏下方）。
          </figcaption>
        </figure>
        <div className="min-w-0">
          <p className="mb-2 text-sm font-semibold text-primary">
            2. 选择诊断节点
          </p>
          <div className="grid grid-cols-2 gap-2" aria-label="章节诊断节点">
            {learningNodes.map((node) => (
              <button
                key={node.id}
                type="button"
                className={`${control} break-words ${state.selected === node.id ? "border-accent" : ""}`}
                aria-pressed={state.selected === node.id}
                data-testid={`learning-node-${node.id}`}
                onClick={() => dispatch({ type: "select", id: node.id })}
              >
                <span className="block">
                  {node.id}. {node.short}
                </span>
                <span className="block text-xs text-secondary">
                  {readinessLabels[readiness[node.id]]}
                </span>
              </button>
            ))}
          </div>
          <div
            className="mt-4 border-t border-border pt-4"
            data-testid="learning-diagnostic"
          >
            <h4 className="text-base font-semibold text-primary">
              第{selected.id}章 · {selected.title}
            </h4>
            <p
              className="my-2 text-sm text-secondary"
              data-testid="learning-prerequisites"
            >
              直接前置：
              {selected.prerequisites.length
                ? selected.prerequisites
                    .map(
                      (id) => `第${id}章（${readinessLabels[readiness[id]]}）`,
                    )
                    .join("、")
                : "无；从这里开始"}
              。
            </p>
            <p
              className="my-2 text-sm text-primary"
              data-testid="learning-record"
            >
              历史答题：
              {state.evidence[selected.id] === "pass"
                ? "通过"
                : state.evidence[selected.id] === "fail"
                  ? "未过"
                  : "无记录"}
              ；当前有效性：{readinessLabels[readiness[selected.id]]}。
            </p>
            <fieldset className="min-w-0">
              <legend className="mb-2 text-sm text-primary">
                3. 预测：{selected.question}
              </legend>
              <div className="grid gap-2">
                {selected.choices.map((choice, index) => (
                  <label
                    key={`${selected.id}-${index}`}
                    className={`${control} flex cursor-pointer items-start gap-2`}
                  >
                    <input
                      type="radio"
                      className="mt-1 shrink-0"
                      name={`${groupId}-answer`}
                      checked={state.choice === index}
                      onChange={() =>
                        dispatch({ type: "choice", choice: index })
                      }
                      data-testid={`learning-answer-${index}`}
                    />
                    {choice}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="my-3 flex flex-wrap gap-2">
              <button
                type="button"
                className={control}
                data-testid="learning-check"
                onClick={() => dispatch({ type: "check" })}
              >
                核验预测
              </button>
              <button
                type="button"
                className={control}
                data-testid="learning-next"
                onClick={() => dispatch({ type: "next" })}
              >
                下一待学节点
              </button>
              <button
                type="button"
                className={control}
                data-testid="learning-revoke"
                onClick={() => dispatch({ type: "revoke" })}
              >
                撤销本节点证据
              </button>
            </div>
            <a
              href={`/learn/go-web-programming/${selected.slug}`}
              className={`${control} inline-flex items-center underline`}
            >
              去第{selected.id}章补证据
            </a>
          </div>
        </div>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-4 break-words rounded-control border border-border p-3 text-sm text-primary"
        data-testid="learning-feedback"
      >
        {state.feedback}
      </p>
      <p className="mt-3 text-xs text-secondary">
        撤销前置后，下游保留历史答题记录但不计入进度；重新通过前置会恢复其有效性，不代表重新考过下游。若需要完整重考，请重置。没有动画、计时器或自动跳题。
      </p>
    </section>
  );
}
