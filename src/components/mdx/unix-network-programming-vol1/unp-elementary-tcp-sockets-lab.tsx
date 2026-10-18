"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  panel: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
};
const stages = [
  [
    "socket",
    "socket函数：创建两端端点",
    "两个进程各有未连接的 fd；服务端 fd 3 尚未绑定。",
  ],
  ["bind", "bind函数：绑定本地端点", "bind 只关联本地名称，不会进入监听状态。"],
  [
    "listen",
    "listen函数：开始监听",
    "listenfd 保留接入职责。图中只追踪一个请求，不模拟队列容量。",
  ],
  [
    "connect",
    "connect函数：建立连接",
    "目标端口匹配且有监听者；一个已建立连接进入 accept 队列。",
  ],
  [
    "accept",
    "accept函数：返回新 connfd",
    "队列 token 被取出；新 connfd 4 与 listenfd 3 同时存在。",
  ],
  [
    "fork",
    "复制父子 fd 表",
    "fork和exec函数分两步观察：本帧 fork 后，父子各持有监听与连接 fd，两个对象各有 2 个引用。",
  ],
  [
    "cleanup",
    "并发服务器：关闭无用副本",
    "子进程关闭 listenfd；正常路径中父进程关闭 connfd 并回到接入循环。",
  ],
  [
    "exec",
    "子进程 exec",
    "假定 exec 成功：已设置 FD_CLOEXEC 的子进程 connfd 关闭，否则被新程序继承。",
  ],
  [
    "close",
    "close函数：子进程结束服务",
    "子进程关闭仍持有的 connfd。若父进程泄漏引用，连接对象仍被保留。",
  ],
] as const;
type Fault = "none" | "collision" | "no-listener" | "retained";
type Config = { port: number; target: number; fault: Fault; cloexec: boolean };
const defaults: Config = {
  port: 9876,
  target: 9876,
  fault: "none",
  cloexec: false,
};

// The pure model deliberately does not claim to emulate a kernel queue or TCP timers.
export function tcpSnapshot(config: Config, requestedFrame: number) {
  const actualPort = config.port === 0 ? 49152 : config.port;
  const collision = config.fault === "collision" && config.port !== 0;
  const unavailable =
    config.fault === "no-listener" || config.target !== actualPort;
  const lastFrame = collision ? 1 : unavailable ? 3 : stages.length - 1;
  const frame = Math.max(0, Math.min(lastFrame, requestedFrame));
  const failedBind = collision && frame >= 1;
  const refused = !failedBind && unavailable && frame >= 3;
  const error = failedBind ? "EADDRINUSE" : refused ? "ECONNREFUSED" : "none";
  const bound = frame >= 1 && !failedBind;
  const listening = frame >= 2 && bound && config.fault !== "no-listener";
  const connected = frame >= 3 && listening && !refused;
  const accepted = frame >= 4 && connected;
  const forked = frame >= 5 && accepted;
  const parentListener = !failedBind;
  const childListener = forked && frame < 6;
  const parentConnection =
    accepted && (frame < 6 || config.fault === "retained");
  const childConnection =
    forked && frame < 8 && !(frame >= 7 && config.cloexec);
  const refs = Number(parentConnection) + Number(childConnection);
  const eof = accepted && refs === 0;
  return {
    frame,
    lastFrame,
    actualPort,
    error,
    bound,
    listening,
    connected,
    accepted,
    forked,
    parentListener,
    childListener,
    parentConnection,
    childConnection,
    refs,
    eof,
    queued: connected && !accepted,
  };
}

export function parseTargetPort(draft: string): number | null {
  if (!/^\d+$/.test(draft)) return null;
  const port = Number(draft);
  return Number.isSafeInteger(port) && port >= 1 && port <= 65535 ? port : null;
}

export function UnpElementaryTcpSocketsLab() {
  const [config, setConfig] = useState<Config>(defaults);
  const [targetDraft, setTargetDraft] = useState(String(defaults.target));
  const [targetInvalid, setTargetInvalid] = useState(false);
  // Remounting the runner cancels its timeline, including pending async initialization.
  const [generation, setGeneration] = useState(0);
  const change = (patch: Partial<Config>) => {
    setConfig((previous) => ({ ...previous, ...patch }));
    setGeneration((n) => n + 1);
  };
  const reset = () => {
    setConfig({ ...defaults });
    setTargetDraft(String(defaults.target));
    setTargetInvalid(false);
    setGeneration((n) => n + 1);
  };
  const commitTarget = () => {
    const port = parseTargetPort(targetDraft);
    if (port === null) {
      setTargetInvalid(true);
      return;
    }
    setTargetDraft(String(port));
    setTargetInvalid(false);
    // Editing already remounted/paused the runner. Do not remount on blur:
    // that would remove a clicked playback/reset button before its click fires.
    setConfig((previous) => ({ ...previous, target: port }));
  };
  const id = useId();
  return (
    <section
      className="tcp-lab not-prose my-6 rounded-card border border-border bg-bg p-4"
      aria-label="TCP 套接字生命周期实验"
    >
      <h3 className="text-base font-semibold text-primary">
        概述实验：listenfd 保留，新 connfd 从哪里来？
      </h3>
      <p className="text-sm text-secondary">
        先预测：accept 后有几个 fd？fork 后有几个引用？每次更改输入都暂停并回到
        socket；目标端口在失焦或 Enter
        后生效，编辑期间保留已应用值。全部重置也恢复端口、故障、输入草稿和标志。
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label>
          服务端绑定端口
          <select
            aria-label="服务端绑定端口"
            value={config.port}
            onChange={(e) => change({ port: Number(e.target.value) })}
          >
            <option value={9876}>9876（固定）</option>
            <option value={9877}>9877（另一个固定端口）</option>
            <option value={0}>0（系统分配；示例 49152）</option>
          </select>
        </label>
        <label>
          客户端目标端口
          <input
            aria-label="客户端目标端口"
            type="number"
            min="1"
            max="65535"
            inputMode="numeric"
            value={targetDraft}
            aria-invalid={targetInvalid}
            aria-describedby={`${id}-target-help`}
            onChange={(e) => {
              setTargetDraft(e.target.value);
              setTargetInvalid(false);
              setGeneration((n) => n + 1);
            }}
            onBlur={commitTarget}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
              if (e.key === "Escape") {
                setTargetDraft(String(config.target));
                setTargetInvalid(false);
              }
            }}
          />
          <span
            id={`${id}-target-help`}
            role={targetInvalid ? "alert" : undefined}
          >
            {targetInvalid
              ? "请输入 1–65535 的整数；未应用此草稿。"
              : "可清空后重新输入；失焦或 Enter 应用，Escape 撤销。"}
            当前已应用：{config.target}。
          </span>
        </label>
      </div>
      <fieldset className="mt-3 grid gap-1 sm:grid-cols-2">
        <legend>故障注入（连接拒绝假定无防火墙丢弃）</legend>
        {(
          [
            ["none", "无故障"],
            ["collision", "固定端口已占用"],
            ["no-listener", "服务端跳过 listen"],
            ["retained", "父进程遗漏 close(connfd)"],
          ] as const
        ).map(([value, label]) => (
          <label className="choice" key={value}>
            <input
              type="radio"
              name={`${id}-fault`}
              value={value}
              checked={config.fault === value}
              onChange={() => change({ fault: value })}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <label className="choice">
        <input
          type="checkbox"
          checked={config.cloexec}
          onChange={(e) => change({ cloexec: e.target.checked })}
        />
        子进程 exec 前给 connfd 设置 FD_CLOEXEC
      </label>
      <TcpRun key={generation} config={config} reset={reset} />
      <style jsx>{`
        .tcp-lab {
          min-width: 0;
        }
        label {
          font-size: 14px;
          color: var(--text-secondary);
        }
        select,
        input[type="number"] {
          display: block;
          width: 100%;
          min-width: 44px;
          min-height: 44px;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 8px;
          background: var(--bg);
          color: var(--text-primary);
        }
        .choice {
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          cursor: pointer;
        }
        .choice input {
          width: 44px;
          height: 44px;
          flex: 0 0 44px;
        }
        .tcp-lab :global(button),
        .tcp-lab :global(input[type="range"]) {
          min-width: 44px;
          min-height: 44px;
        }
        .tcp-lab :global(button:focus-visible),
        input:focus-visible,
        select:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
      `}</style>
    </section>
  );
}

function TcpRun({ config, reset }: { config: Config; reset: () => void }) {
  const lastFrame = tcpSnapshot(config, 0).lastFrame;
  const steps = useMemo(
    () =>
      stages.slice(0, lastFrame + 1).map(([label, caption], i) => ({
        label,
        caption:
          i === lastFrame && lastFrame < 8
            ? `${label} 失败，停止`
            : i === 2 && config.fault === "no-listener"
              ? "故障：跳过 listen"
              : caption,
      })),
    [lastFrame, config.fault],
  );
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      steps.forEach(({ label }, i) => tl.label(label, i * 1000));
      tl.add(
        { frame: 0 },
        { frame: lastFrame, duration: lastFrame * 1000, ease: "linear" },
        0,
      );
    },
    [steps, lastFrame],
  );
  const timeline = useTeachingTimeline({ steps, build });
  const s = tcpSnapshot(config, timeline.currentStep);
  const listenerState =
    s.error === "EADDRINUSE"
      ? "bind 失败，fd 已关闭"
      : s.listening
        ? "LISTEN · 接受新连接"
        : s.bound
          ? "已绑定 · 尚未监听"
          : "未绑定 · 未监听";
  const caption =
    s.error === "EADDRINUSE"
      ? "bind = -1 / EADDRINUSE；关闭本次服务端 fd，后续 listen/connect/accept 不执行。"
      : s.error === "ECONNREFUSED"
        ? "connect = -1 / ECONNREFUSED；关闭客户端 fd，未产生 connfd。核对目标端口及监听状态后新建 socket 重试。"
        : s.frame === 2 && config.fault === "no-listener"
          ? "故障：服务端仅 bind，跳过 listen，尚不能接受连接。"
          : s.frame === 6 && config.fault === "retained"
            ? "故障：父进程遗漏 close(connfd)，两条连接引用均保留；子进程已关闭 listenfd。"
            : stages[s.frame][2];
  const marker = useId().replace(/:/g, "");
  const connectionColor =
    s.error !== "none" ? C.danger : s.connected ? C.success : C.border;
  return (
    <>
      <div className="diagrams mt-4" data-testid="tcp-lifecycle-diagram">
        <svg
          viewBox="0 0 320 430"
          role="img"
          aria-label={`端点状态图：${listenerState}；队列${s.queued ? 1 : 0}个连接；${s.accepted ? "新connfd已创建" : "尚无connfd"}`}
        >
          <defs>
            <marker
              id={marker}
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0L7 3.5L0 7" fill="none" stroke="context-stroke" />
            </marker>
          </defs>
          <rect
            x="8"
            y="12"
            width="304"
            height="78"
            rx="8"
            fill={C.panel}
            stroke={C.border}
          />
          <text x="20" y="40" fontSize="16" fill={C.text}>
            客户端 → 127.0.0.1:{config.target}
          </text>
          <text x="20" y="68" fontSize="16" fill={C.muted}>
            {s.error !== "none"
              ? "本次路径终止"
              : s.connected
                ? "connect 已成功"
                : "client fd · 尚未连接"}
          </text>
          <path
            d="M160 90V145"
            stroke={connectionColor}
            strokeWidth="3"
            strokeDasharray={s.connected ? undefined : "6 4"}
            markerEnd={`url(#${marker})`}
            data-testid="tcp-connect-edge"
            data-success={s.connected}
          />
          <text x="175" y="125" fontSize="16" fill={connectionColor}>
            {s.error !== "none" ? "停止" : "connect"}
          </text>
          <rect
            x="8"
            y="150"
            width="304"
            height="80"
            rx="8"
            fill={C.panel}
            stroke={
              s.error === "EADDRINUSE"
                ? C.danger
                : s.listening
                  ? C.accent
                  : C.border
            }
          />
          <text x="20" y="179" fontSize="16" fill={C.text}>
            服务端 fd 3 · {s.bound ? `0.0.0.0:${s.actualPort}` : "未命名"}
          </text>
          <text x="20" y="208" fontSize="16" fill={C.muted}>
            {listenerState}
          </text>
          <rect
            x="35"
            y="250"
            width="250"
            height="44"
            rx="6"
            fill="none"
            stroke={C.border}
          />
          <text x="45" y="278" fontSize="16" fill={C.muted}>
            已握手待 accept
          </text>
          {s.queued && (
            <circle
              cx="260"
              cy="272"
              r="12"
              fill={C.success}
              data-testid="tcp-queued-token"
            />
          )}
          <path
            d="M160 295V330"
            stroke={s.accepted ? C.success : C.border}
            strokeWidth="3"
            markerEnd={`url(#${marker})`}
          />
          <rect
            x="8"
            y="338"
            width="304"
            height="78"
            rx="8"
            fill={C.panel}
            stroke={s.accepted ? C.success : C.border}
          />
          {s.accepted && (
            <circle
              cx="285"
              cy="361"
              r="10"
              fill={s.eof ? C.muted : C.success}
            />
          )}
          <text x="20" y="368" fontSize="16" fill={C.text}>
            {s.accepted ? "accept → 新 connfd 4" : "尚未产生 connfd"}
          </text>
          <text x="20" y="397" fontSize="16" fill={C.muted}>
            {s.accepted
              ? "原 listenfd 3 继续接入"
              : "不能用 listenfd 读写客户数据"}
          </text>
        </svg>
        <svg
          viewBox="0 0 320 430"
          role="img"
          aria-label={`描述符所有权：连接引用${s.refs}个；${s.eof ? "最后引用已释放" : "尚未满足最后引用释放"}`}
        >
          {(
            [
              [8, "父进程", s.parentListener, s.parentConnection],
              [
                172,
                s.forked ? "子进程" : "尚未 fork",
                s.childListener,
                s.childConnection,
              ],
            ] as const
          ).map(([x, label, l, c]) => (
            <g key={x}>
              <rect
                x={x}
                y="12"
                width="140"
                height="128"
                rx="8"
                fill={C.panel}
                stroke={C.border}
              />
              <text x={x + 10} y="40" fontSize="16" fill={C.text}>
                {label}
              </text>
              <text
                x={x + 10}
                y="78"
                fontSize="16"
                fill={l ? C.accent : C.muted}
              >
                fd 3 {l ? "持有" : "无引用"}
              </text>
              <text
                x={x + 10}
                y="116"
                fontSize="16"
                fill={c ? C.success : C.muted}
              >
                fd 4 {c ? "持有" : "无引用"}
              </text>
              {l && (
                <path
                  d={`M${x + 35} 140L78 292`}
                  fill="none"
                  stroke={C.accent}
                  strokeWidth="3"
                />
              )}
              {c && (
                <path
                  d={`M${x + 105} 140L242 292`}
                  fill="none"
                  stroke={C.success}
                  strokeWidth="3"
                  data-testid={
                    x === 8
                      ? "tcp-parent-connection-ref"
                      : "tcp-child-connection-ref"
                  }
                />
              )}
            </g>
          ))}
          <rect
            x="8"
            y="292"
            width="140"
            height="80"
            rx="8"
            fill={C.panel}
            stroke={C.accent}
          />
          <text x="20" y="323" fontSize="16" fill={C.text}>
            {s.listening ? "监听对象" : "服务端对象"}
          </text>
          <text x="20" y="353" fontSize="16" fill={C.muted}>
            {Number(s.parentListener) + Number(s.childListener)} 个引用
          </text>
          <rect
            x="172"
            y="292"
            width="140"
            height="80"
            rx="8"
            fill={C.panel}
            stroke={s.accepted ? C.success : C.border}
          />
          <text x="184" y="323" fontSize="16" fill={C.text}>
            {s.accepted ? "连接对象" : "尚无连接"}
          </text>
          <text x="184" y="353" fontSize="16" fill={C.muted}>
            {s.refs} 个引用
          </text>
          <text
            x="160"
            y="405"
            textAnchor="middle"
            fontSize="16"
            fill={s.eof ? C.success : C.muted}
          >
            {s.eof
              ? "最后引用释放 → 对端可读 EOF"
              : s.frame === 8
                ? "父进程残留引用 → 尚无 EOF"
                : "引用尚未释放完毕"}
          </text>
        </svg>
      </div>
      <div className="mt-3" data-testid="tcp-timeline-controls">
        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(steps.map((s) => [s.label, s.caption]))}
          reset={{
            label: "全部重置",
            ariaLabel: "重置参数、故障、帧、播放与定时器",
            onClick: reset,
          }}
        />
      </div>
      <p
        role="status"
        aria-live="polite"
        className="mt-3 text-sm text-secondary"
        data-testid="tcp-lifecycle-oracle"
        data-step={stages[s.frame][0]}
        data-fault={config.fault}
        data-port={config.port}
        data-target={config.target}
        data-cloexec={config.cloexec}
        data-error={s.error}
        data-refs={s.refs}
        data-listening={s.listening}
        data-eof={s.eof}
      >
        {caption}
      </p>
      <h4 className="mt-3 text-sm font-semibold text-primary">
        getsockname和getpeername函数：核实本地与远端
      </h4>
      <dl className="endpoint-readout mt-3 text-sm" aria-label="端点查询结果">
        <dt>getsockname(listenfd)</dt>
        <dd>
          {s.error === "EADDRINUSE"
            ? "fd 已清理，不能查询"
            : s.bound
              ? `0.0.0.0:${s.actualPort}`
              : "尚未绑定（不推断可用端口）"}
        </dd>
        <dt>getpeername(listenfd)</dt>
        <dd>
          {s.error === "EADDRINUSE"
            ? "fd 已关闭"
            : "ENOTCONN：监听端点不是连接"}
        </dd>
        <dt>连接端点（最近一次成功查询）</dt>
        <dd>
          {s.accepted
            ? `服务端 local=127.0.0.1:${s.actualPort}，peer=127.0.0.1:53000；客户端两者互换。`
            : "accept 成功后显示；53000 为示例客户端临时端口。"}
        </dd>
      </dl>
      <p className="mt-3 text-sm text-secondary">
        小结：端点图区分监听与接入，引用图的实线对应仍存活的引用；最后引用未释放，就不能宣称正常关闭完成。模型边界：一条连接、一个子进程；49152/53000
        为演示值，不是固定系统分配。没有未读数据、未发数据、linger、shutdown
        或重置；EOF 指释放最后引用并完成正常关闭后的可观察结果，不是同步 FIN
        抓包结论。backlog 不在此模型中量化；现代 Linux 将它用于已完成握手、待
        accept 的队列，SYN 队列另行控制。
      </p>
      <style jsx>{`
        .diagrams {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 280px), 1fr)
          );
        }
        svg {
          display: block;
          width: 100%;
          max-width: 360px;
          margin: auto;
        }
        dt {
          font-weight: 600;
          color: var(--text-primary);
          overflow-wrap: anywhere;
        }
        dd {
          margin: 4px 0 12px;
          color: var(--text-secondary);
          overflow-wrap: anywhere;
        }
      `}</style>
    </>
  );
}
