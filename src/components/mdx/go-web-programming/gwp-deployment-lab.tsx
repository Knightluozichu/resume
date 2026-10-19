"use client";

import { useId, useState } from "react";

type Release = "v1" | "v2";
type Health =
  | "absent"
  | "starting"
  | "ready"
  | "rejected"
  | "draining"
  | "stopped";
export type DeploymentFault =
  | "none"
  | "port"
  | "assets"
  | "dependency"
  | "runtime"
  | "timeout";
export type DeploymentAction =
  | "prepare"
  | "probe"
  | "switch"
  | "send"
  | "finish"
  | "stop"
  | "rollback";
export interface DeploymentState {
  fault: DeploymentFault;
  route: Release;
  health: Record<Release, Health>;
  active: Record<Release, string[]>;
  queue: string[];
  completed: string[];
  failed: string[];
  events: string[];
}
export const deploymentFaults: [DeploymentFault, string][] = [
  ["none", "正常发布"],
  ["port", "候选端口错误"],
  ["assets", "候选缺少模板"],
  ["dependency", "候选依赖不可达"],
  ["runtime", "切流后请求失败"],
  ["timeout", "旧请求排空超时"],
];
export function initialDeployment(
  fault: DeploymentFault = "none",
): DeploymentState {
  return {
    fault,
    route: "v1",
    health: { v1: "ready", v2: "absent" },
    active: { v1: ["R1", "R2"], v2: [] },
    queue: ["R3", "R4", "R5", "R6"],
    completed: [],
    failed: [],
    events: ["初始：v1 接流，R1/R2 已在途；R3–R6 等待发送。"],
  };
}
export function stepDeployment(
  state: DeploymentState,
  action: DeploymentAction,
): DeploymentState {
  const s: DeploymentState = {
    ...state,
    health: { ...state.health },
    active: { v1: [...state.active.v1], v2: [...state.active.v2] },
    queue: [...state.queue],
    completed: [...state.completed],
    failed: [...state.failed],
    events: [...state.events],
  };
  const log = (text: string) => {
    s.events = [...s.events, text].slice(-10);
    return s;
  };
  switch (action) {
    case "prepare":
      if (s.health.v2 !== "absent")
        return log("拒绝：候选已存在；重新实验请 Reset。");
      s.health.v2 = "starting";
      return log("创建 v2 候选；只有进程存在，尚未获得接流资格。");
    case "probe":
      if (s.health.v2 !== "starting")
        return log("拒绝：请先准备候选，再探测一次。");
      if (["port", "assets", "dependency"].includes(s.fault)) {
        s.health.v2 = "rejected";
        return log(
          `探测失败：${deploymentFaults.find(([key]) => key === s.fault)?.[1]}；v1 继续接流。`,
        );
      }
      s.health.v2 = "ready";
      return log("候选探测通过：监听、模板和关键依赖均满足本模型检查。");
    case "switch":
      if (s.route === "v2" || s.health.v2 !== "ready")
        return log("拒绝切流：v2 必须就绪且尚未接流。");
      s.route = "v2";
      s.health.v1 = "draining";
      return log("新请求改投 v2；v1 的在途请求不搬家，进入排空。");
    case "send": {
      if (!s.queue.length) return log("待发队列为空；没有凭空生成请求。");
      if (s.health[s.route] !== "ready")
        return log("拒绝发送：当前路由没有就绪实例。");
      const id = s.queue.shift()!;
      if (s.route === "v2" && s.fault === "runtime") {
        s.failed.push(id);
        return log(`${id} 在 v2 返回失败；探测通过不保证所有业务请求成功。`);
      }
      s.active[s.route].push(id);
      return log(`${id} → ${s.route} 在途；等待完成，不等同于成功。`);
    }
    case "finish": {
      const release = s.active.v1.length ? "v1" : "v2";
      const id = s.active[release].shift();
      if (!id) return log("没有在途请求可完成。");
      s.completed.push(id);
      return log(`${id} 在 ${release} 完成；释放一个在途槽。`);
    }
    case "stop": {
      const old = s.route === "v1" ? "v2" : "v1";
      if (s.health[old] !== "draining")
        return log("拒绝停止：非接流版本必须先进入排空。");
      if (s.active[old].length && !(old === "v1" && s.fault === "timeout"))
        return log("拒绝停止：仍有在途请求；先完成请求或等待平台期限。");
      if (s.active[old].length) {
        s.failed.push(...s.active[old]);
        s.active[old] = [];
        s.health[old] = "stopped";
        return log("排空期限耗尽：v1 被强制关闭，在途请求中止并计入失败。");
      }
      s.health[old] = "stopped";
      return log(`${old} 在途为零，已停止；不能直接把流量切回已停止实例。`);
    }
    case "rollback":
      if (s.route !== "v2") return log("无需回滚：当前仍由 v1 接流。");
      if (s.health.v1 !== "draining")
        return log("拒绝回滚：v1 已停止，须重新启动并探测，不能切到空目标。");
      s.route = "v1";
      s.health.v1 = "ready";
      s.health.v2 = "draining";
      return log(
        "路由退回仍存活的 v1；v2 已在途请求继续排空，失败请求不会自动重放。",
      );
  }
}

const healthLabels: Record<Health, string> = {
  absent: "未创建",
  starting: "待探测",
  ready: "就绪",
  rejected: "探测失败",
  draining: "排空中",
  stopped: "已停止",
};
const actions: [DeploymentAction, string][] = [
  ["prepare", "准备候选 v2"],
  ["probe", "探测候选"],
  ["switch", "切流到 v2"],
  ["send", "发送一个请求"],
  ["finish", "完成一个请求"],
  ["stop", "停止非接流版本"],
  ["rollback", "回滚到 v1"],
];
const verificationBoundaries: Record<DeploymentFault, string> = {
  none: "探测检查端口、模板与依赖；探测通过不保证所有请求健康。",
  port: "端口故障在候选探测时验证，不在选择场景时判定。",
  assets: "模板缺失在候选探测时验证，不在选择场景时判定。",
  dependency: "依赖不可达在候选探测时验证，不在选择场景时判定。",
  runtime: "请求故障在切流到 v2 后发送请求时验证，探测通过不排除此故障。",
  timeout: "排空超时在停止仍有在途请求的旧版本时验证，切流不会搬走旧请求。",
};
const buttonClass =
  "min-h-11 rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

export function GwpDeploymentLab() {
  const [state, setState] = useState(initialDeployment);
  const [prediction, setPrediction] = useState("未预测");
  const id = useId().replaceAll(":", "");
  return (
    <section
      aria-label="部署切流与排空实验"
      className="not-prose my-6 space-y-4 rounded-xl border border-slate-300 p-3 sm:p-5 dark:border-slate-700"
    >
      <h3 className="text-lg font-semibold">请求不会跟着版本搬家</h3>
      <p className="text-sm leading-6">
        有界教学模拟，不会部署到任何云。队列是实验待发请求，不代表平台内部缓冲。每次只执行一个动作；无计时器、自动播放或动画。
      </p>
      <fieldset className="space-y-2">
        <legend className="font-medium">故障场景（切换会重建整场实验）</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {deploymentFaults.map(([fault, label]) => (
            <button
              key={fault}
              type="button"
              aria-pressed={state.fault === fault}
              onClick={() => {
                setState(initialDeployment(fault));
                setPrediction("未预测");
              }}
              className={`${buttonClass} ${state.fault === fault ? "bg-sky-100 dark:bg-sky-950" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="font-medium">预测：切流后 R1 在哪里完成？</legend>
        <div className="flex flex-wrap gap-2">
          {["仍在 v1", "迁移到 v2", "自动重放"].map((choice) => (
            <label
              key={choice}
              className={`${buttonClass} flex items-center gap-2`}
            >
              <input
                type="radio"
                name={`${id}-prediction`}
                value={choice}
                checked={prediction === choice}
                onChange={() => setPrediction(choice)}
              />
              {choice}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 lg:grid-cols-2">
        <figure className="m-0 min-w-0">
          <svg
            viewBox="0 0 300 460"
            role="img"
            aria-labelledby={`${id}-title ${id}-desc`}
            className="mx-auto block w-full max-w-[440px] rounded-lg bg-slate-950 text-slate-100"
          >
            <title id={`${id}-title`}>请求队列、版本健康和接流拓扑</title>
            <desc
              id={`${id}-desc`}
            >{`新请求指向 ${state.route}；v1 ${healthLabels[state.health.v1]}，在途 ${state.active.v1.length}；v2 ${healthLabels[state.health.v2]}，在途 ${state.active.v2.length}。`}</desc>
            <defs>
              <marker
                id={`${id}-arrow`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
            </defs>
            <text x="15" y="26" fill="white" fontSize="15">
              客户端待发请求
            </text>
            {state.queue.map((request, i) => (
              <g key={request}>
                <rect
                  x={15 + i * 62}
                  y="40"
                  width="55"
                  height="30"
                  rx="7"
                  fill="#334155"
                />
                <text x={25 + i * 62} y="61" fill="white" fontSize="14">
                  {request}
                </text>
              </g>
            ))}
            {!state.queue.length && (
              <text x="15" y="60" fill="#cbd5e1" fontSize="14">
                空队列
              </text>
            )}
            <path
              d="M150 78 V100"
              stroke="#38bdf8"
              strokeWidth="3"
              markerEnd={`url(#${id}-arrow)`}
            />
            <rect
              x="55"
              y="106"
              width="190"
              height="38"
              rx="18"
              fill="#075985"
            />
            <text x="75" y="131" fill="white" fontSize="15">
              新请求路由 → {state.route}
            </text>
            {(["v1", "v2"] as const).map((release, index) => {
              const y = index === 0 ? 196 : 344;
              const receiving = state.route === release;
              return (
                <g
                  key={release}
                  data-release={release}
                  data-health={state.health[release]}
                >
                  <path
                    d={
                      index === 0
                        ? `M75 144 V${y - 18} H150 V${y}`
                        : `M225 144 H285 V${y - 18} H150 V${y}`
                    }
                    fill="none"
                    stroke={receiving ? "#38bdf8" : "#64748b"}
                    strokeWidth={receiving ? 4 : 2}
                    strokeDasharray={receiving ? undefined : "5 5"}
                    markerEnd={receiving ? `url(#${id}-arrow)` : undefined}
                  />
                  <rect
                    x="30"
                    y={y}
                    width="240"
                    height="98"
                    rx="10"
                    fill="#1e293b"
                    stroke={receiving ? "#38bdf8" : "#64748b"}
                    strokeWidth="2"
                  />
                  <circle
                    cx="48"
                    cy={y + 22}
                    r="6"
                    fill={
                      state.health[release] === "ready"
                        ? "#4ade80"
                        : state.health[release] === "rejected"
                          ? "#fb7185"
                          : "#fbbf24"
                    }
                  />
                  <text x="62" y={y + 27} fill="white" fontSize="15">
                    {release} · {healthLabels[state.health[release]]}
                  </text>
                  <text x="42" y={y + 52} fill="#cbd5e1" fontSize="14">
                    在途 {state.active[release].length}
                  </text>
                  {state.active[release].map((request, i) => (
                    <g key={request}>
                      <circle
                        cx={48 + i * 38}
                        cy={y + 76}
                        r="16"
                        fill={release === "v1" ? "#1d4ed8" : "#047857"}
                      />
                      <text
                        x={38 + i * 38}
                        y={y + 81}
                        fill="white"
                        fontSize="14"
                      >
                        {request}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>
          <figcaption className="mt-2 text-sm leading-6">
            <p>
              实线是新请求接流边，虚线是不接流的候选或旧版本。圆点是具体在途请求；路由改变不移动已有圆点。
            </p>
            <p className="mt-2 font-medium">部署方案怎样对应图中的责任？</p>
            <p>
              以下是责任对照，不是平台探测结果；所有方案共用上方有界请求模型，不模拟各云的内部调度。
            </p>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="font-medium">部署到独立服务器</dt>
                <dd className="m-0">
                  候选进程、入口接流边和退出监督由部署方协调；“停止非接流版本”仍须等待旧请求，不能把进程启动当成上线完成。
                </dd>
              </div>
              <div>
                <dt className="font-medium">部署到Heroku</dt>
                <dd className="m-0">
                  候选对应应用进程；“候选端口错误”用于解释监听契约。图中探测不调用Heroku，dyno临时盘也不在请求账本中。
                </dd>
              </div>
              <div>
                <dt className="font-medium">部署到Google App Engine</dt>
                <dd className="m-0">
                  候选版本与接流边分开：先准备、探测，再切流。图中单一路由不复现standard按IP或Cookie分流，平台运行时须另行核查。
                </dd>
              </div>
              <div>
                <dt className="font-medium">部署到Docker</dt>
                <dd className="m-0">
                  镜像分发在准备候选之前；容器进程存在仍须检查端口和健康。图中没有执行build、push或真实容器网络探测。
                </dd>
              </div>
              <div>
                <dt className="font-medium">部署方法比较</dt>
                <dd className="m-0">
                  对照谁准备候选、谁控制接流、谁给旧请求退出期限；请求守恒相同不代表运维责任相同。持久数据不在图中，须用练习3另查。
                </dd>
              </div>
            </dl>
          </figcaption>
        </figure>
        <div className="min-w-0 space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {actions.map(([action, label]) => (
              <button
                key={action}
                type="button"
                className={buttonClass}
                onClick={() =>
                  setState((previous) => stepDeployment(previous, action))
                }
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className={`${buttonClass} bg-slate-100 dark:bg-slate-800`}
              onClick={() => {
                setState(initialDeployment());
                setPrediction("未预测");
              }}
            >
              Reset 全部状态
            </button>
          </div>
          <output
            aria-label="部署状态账本"
            className="block break-words rounded-lg border border-slate-300 p-3 text-sm leading-7"
            data-route={state.route}
          >
            <div>预测：{prediction}</div>
            <div>接流版本：{state.route}</div>
            <div>
              v1：{healthLabels[state.health.v1]}；在途 [
              {state.active.v1.join(", ") || "空"}]
            </div>
            <div>
              v2：{healthLabels[state.health.v2]}；在途 [
              {state.active.v2.join(", ") || "空"}]
            </div>
            <div>待发：{state.queue.join(", ") || "空"}</div>
            <div>完成：{state.completed.join(", ") || "无"}</div>
            <div>失败：{state.failed.join(", ") || "无"}</div>
            <div>
              守恒：待发 {state.queue.length} + 在途{" "}
              {state.active.v1.length + state.active.v2.length} + 完成{" "}
              {state.completed.length} + 失败 {state.failed.length} = 6
            </div>
          </output>
          <p
            role="status"
            aria-live="polite"
            className="rounded-lg bg-sky-50 p-3 text-sm leading-6 text-slate-900 dark:bg-sky-950 dark:text-slate-100"
          >
            <span className="block">
              当前场景：
              {deploymentFaults.find(([fault]) => fault === state.fault)?.[1]}
            </span>
            <span className="block">
              验证边界：{verificationBoundaries[state.fault]}
            </span>
            {state.health.v2 === "absent" && (
              <span className="block">
                待执行：准备候选 v2，再探测候选；当前尚未探测。
              </span>
            )}
            {state.health.v2 === "starting" && (
              <span className="block">
                待执行：探测候选；当前尚未得到探测结果。
              </span>
            )}
            <span className="block">{state.events.at(-1)}</span>
          </p>
          <details className="text-sm">
            <summary className="min-h-11 cursor-pointer py-3">
              查看动作因果记录
            </summary>
            <ol className="list-decimal space-y-2 pl-5">
              {state.events.map((event, index) => (
                <li key={`${index}-${event}`}>{event}</li>
              ))}
            </ol>
          </details>
        </div>
      </div>
      <p className="text-sm leading-6">
        解释边界：探测只是所选检查，不证明所有请求健康。这里的回滚仅恢复路由，不撤销数据库写入、不复活已停止实例、不自动重放失败请求。真实平台停止期限和流量控制各不相同。
      </p>
    </section>
  );
}
