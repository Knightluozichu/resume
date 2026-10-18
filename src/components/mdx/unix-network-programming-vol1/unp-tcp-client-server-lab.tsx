"use client";

import { useEffect, useId, useState } from "react";

export type EchoFault = "none" | "server-exit" | "early-close";
const stages = [
  "监听",
  "连接并 fork",
  "客户发送",
  "服务器回射",
  "关闭发送方向",
  "读取结束并回收",
];
const defaults = {
  message: "hello\n",
  chunkSize: 3,
  fault: "none" as EchoFault,
};
const C = {
  border: "var(--border)",
  ink: "var(--text-primary)",
  bg: "var(--bg-elevated)",
  accent: "var(--accent)",
  success: "var(--success)",
  danger: "var(--danger)",
  warning: "var(--warning)",
};

// Model choices, not a prediction of kernel read sizes or network error timing.
export function modelEcho(
  message: string,
  chunkSize: number,
  fault: EchoFault,
  frame: number,
) {
  const bytes = Array.from(new TextEncoder().encode(message));
  const size = Math.max(1, Math.min(8, Math.trunc(chunkSize) || 1));
  const chunks = Array.from(
    { length: Math.ceil(bytes.length / size) },
    (_, i) => bytes.slice(i * size, (i + 1) * size),
  );
  const sent = frame >= 2 ? bytes.length : 0;
  const echoed =
    frame < 3 || fault === "server-exit"
      ? 0
      : fault === "early-close"
        ? Math.floor(bytes.length / 2)
        : bytes.length;
  const failed = frame >= 3 && fault !== "none";
  const serverAlive =
    frame >= 1 &&
    frame < (fault === "server-exit" ? 3 : fault === "early-close" ? 4 : 5);
  // Fault modes explicitly choose orderly kernel close, no unread input, no reset.
  const clientEof = frame >= 5;
  const clientFin = frame >= 4 && fault === "none";
  return {
    bytes,
    chunks,
    sent,
    echoed,
    failed,
    serverAlive,
    clientEof,
    clientFin,
  };
}

export function UnpTcpClientServerLab() {
  const [message, setMessage] = useState(defaults.message);
  const [chunkSize, setChunkSize] = useState(defaults.chunkSize);
  const [fault, setFault] = useState<EchoFault>(defaults.fault);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [resetEpoch, setResetEpoch] = useState(0);
  const arrowId = useId().replace(/:/g, "");
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(media.matches);
      if (media.matches) setPlaying(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!playing || reduced || frame >= stages.length - 1) return;
    const timer = window.setTimeout(() => {
      setFrame(frame + 1);
      if (frame + 1 === stages.length - 1) setPlaying(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [playing, reduced, frame]);
  const rewind = () => {
    setPlaying(false);
    setFrame(0);
  };
  const reset = () => {
    rewind();
    setMessage(defaults.message);
    setChunkSize(defaults.chunkSize);
    setFault(defaults.fault);
    setResetEpoch((value) => value + 1);
  };
  const model = modelEcho(message, chunkSize, fault, frame);
  const echoColor = model.failed
    ? C.danger
    : model.echoed > 0
      ? C.success
      : C.border;
  const outcome =
    frame < 2
      ? "父进程保留监听描述符；accept 后 fork，父关会话副本、子关监听副本。"
      : frame === 2
        ? `客户提交 ${model.sent} 字节；本模型假定服务器已全部读取，尚未回射。`
        : fault === "server-exit"
          ? `模型选择：子进程消费请求后、回射前退出。回射 0 字节；${model.clientEof ? "客户读到 EOF，但没有收到期望响应。" : "等待读取结果，不把写成功当作远端存活证明。"}`
          : fault === "early-close"
            ? `模型选择：服务器只回射前 ${model.echoed}/${model.bytes.length} 字节，再有序关闭。${model.clientEof ? "先读完此前缀再 EOF；非空请求是不完整响应。" : "红色短箭头表示前缀，不是完整回射。"}`
            : model.clientEof
              ? "客户已收到全部回射及服务器方向 EOF；父进程 waitpid 回收子进程。EOF 不等于任意应用协议成功。"
              : model.clientFin
                ? "客户 shutdown(SHUT_WR)；服务器耗尽请求后 read=0，关闭会话，客户仍可接收。"
                : `服务器将 ${model.echoed} 字节原样回射；组边界仅是教学选定的 read 上限，不是 TCP 消息。`;

  return (
    <figure
      className="unp-tcp-lab not-prose my-8"
      data-testid="tcp-echo-lab"
      data-frame={frame}
      data-fault={fault}
      data-chunk-size={chunkSize}
      data-client-read={String(model.clientEof)}
      data-server-alive={String(model.serverAlive)}
      data-playing={String(playing)}
      data-reduced-motion={String(reduced)}
      data-byte-count={model.bytes.length}
      data-echoed={model.echoed}
    >
      <div className="rounded-card border border-border bg-elevated p-3 sm:p-5">
        <h3 className="text-lg font-semibold text-primary">
          5.1 概述：TCP 回射的三个生命周期
        </h3>
        <p className="text-sm leading-6 text-secondary">
          先预测，再单步。正常模式返回全部字节；两种故障分别返回零字节或前缀。不是抓包或真实内核仿真。
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label>
            客户输入（最多 24 个 Unicode 码点）
            <textarea
              data-testid="tcp-input"
              rows={2}
              className="mt-1 w-full rounded-control border border-border bg-[var(--bg)] p-2"
              value={message}
              onChange={(e) => {
                rewind();
                setMessage(Array.from(e.target.value).slice(0, 24).join(""));
              }}
            />
          </label>
          <label>
            读取容量：{chunkSize} 字节
            <input
              data-testid="tcp-chunk-size"
              className="w-full"
              type="range"
              min={1}
              max={8}
              value={chunkSize}
              onChange={(e) => {
                rewind();
                setChunkSize(Number(e.target.value));
              }}
            />
          </label>
        </div>
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="group"
          aria-label="故障模式"
        >
          {(
            [
              ["none", "正常半关闭"],
              ["server-exit", "回射前退出"],
              ["early-close", "仅回射前缀"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              data-testid={`fault-${value}`}
              aria-pressed={fault === value}
              onClick={() => {
                rewind();
                setFault(value);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2 text-sm leading-6">
          <div>
            <dt className="font-semibold">5.2 TCP回射服务器程序：main函数</dt>
            <dd>
              {frame === 0
                ? "父进程监听，尚无服务子进程。"
                : "accept 后 fork：父关会话副本、子关监听副本；图顶分支不是额外 TCP 连接。"}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">
              5.3 TCP回射服务器程序：str_echo函数
            </dt>
            <dd>
              本帧已回射 {model.echoed}{" "}
              字节；下方绿色字节是返回前缀，红色字节未返回。短写必须继续处理剩余部分。
            </dd>
          </div>
          <div>
            <dt className="font-semibold">5.4 TCP回射客户程序：main函数</dt>
            <dd>
              {frame === 0
                ? "尚未 connect；不能开始请求。"
                : "连接已建立；main 将连接交给读写循环，连接成功不等于业务完成。"}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">5.5 TCP回射客户程序：str_cli函数</dt>
            <dd>
              本实验用有限批量模型代替行协议：发出 {model.sent}{" "}
              字节后结束发送，仍读取返回值；不把一次 read 当成一条消息。
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-sm">
          5.6 正常启动：先监听再连接。5.7
          正常终止：客户半关闭只结束发送方向；末步 EOF 与进程回收必须分别确认。
        </p>
        <svg
          className="flow"
          viewBox="0 0 360 420"
          role="img"
          aria-label={`双向连接时序：${stages[frame]}；发送${model.sent}字节，回射${model.echoed}字节`}
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10Z" fill="context-stroke" />
            </marker>
          </defs>
          <g fill={C.ink} fontSize={18} textAnchor="middle">
            <text x={180} y={28}>
              父进程：listen / accept
            </text>
            <path
              d="M245 38V70"
              stroke={frame >= 1 ? C.accent : C.border}
              strokeWidth={3}
              markerEnd={`url(#${arrowId})`}
            />
            <text x={75} y={95}>
              客户
            </text>
            <text x={285} y={95}>
              服务子进程
            </text>
            <path
              d="M55 110V395M305 110V395"
              stroke={C.border}
              strokeWidth={3}
            />
            <circle
              cx={305}
              cy={115}
              r={9}
              fill={
                frame === 0 ? C.border : model.serverAlive ? C.accent : C.danger
              }
            />
            <text x={180} y={142}>
              请求：{model.sent} 字节 →
            </text>
            <path
              d="M55 160H305"
              stroke={frame >= 2 ? C.accent : C.border}
              strokeWidth={4}
              markerEnd={`url(#${arrowId})`}
            />
            <text x={180} y={202}>
              ← 回射：{model.echoed} 字节
            </text>
            <path
              data-testid="echo-arrow"
              d={
                model.failed
                  ? model.echoed
                    ? "M305 220H180"
                    : "M305 220H275"
                  : "M305 220H55"
              }
              stroke={echoColor}
              strokeWidth={4}
              markerEnd={model.echoed ? `url(#${arrowId})` : undefined}
            />
            {model.failed && (
              <path
                d="M145 210L165 230M165 210L145 230"
                stroke={C.danger}
                strokeWidth={4}
              />
            )}
            <text x={180} y={266}>
              {fault === "none" ? "客户 FIN →" : "服务器关闭 → 客户 EOF"}
            </text>
            <path
              d={fault === "none" ? "M55 284H305" : "M305 284H55"}
              stroke={
                model.clientFin || (fault !== "none" && frame >= 4)
                  ? C.warning
                  : C.border
              }
              strokeWidth={3}
              strokeDasharray="6 5"
              markerEnd={`url(#${arrowId})`}
            />
            <text x={180} y={330}>
              {model.clientEof ? "客户 read = 0" : "等待后续阶段"}
            </text>
            <text x={180} y={370}>
              {frame >= 5 ? "父 waitpid：回收子进程" : `阶段 ${frame + 1} / 6`}
            </text>
          </g>
        </svg>
        <div aria-label="UTF-8 完整字节与读取分组" className="byte-panel">
          <p>
            UTF-8：{model.bytes.length} 字节；{model.chunks.length}{" "}
            组。每格为十六进制字节；红格在本故障轨迹中未回射。
          </p>
          <h4 className="font-semibold mb-2">
            5.18 数据格式：UTF-8 字节与读取边界
          </h4>
          <div className="chunks">
            {model.chunks.map((chunk, i) => (
              <div
                className="chunk"
                key={i}
                aria-label={`第${i + 1}组，${chunk.length}字节`}
              >
                <span>#{i + 1}</span>
                <div className="bytes">
                  {chunk.map((byte, j) => {
                    const offset = i * chunkSize + j;
                    return (
                      <span
                        key={offset}
                        className="byte"
                        data-offset={offset}
                        data-returned={frame >= 3 && offset < model.echoed}
                        style={{
                          borderColor:
                            frame >= 3
                              ? offset < model.echoed
                                ? C.success
                                : C.danger
                              : C.border,
                        }}
                        title={`偏移${offset}：${byte}`}
                      >
                        {byte.toString(16).padStart(2, "0")}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {!model.bytes.length && (
            <p>空输入：没有数据字节，仍需结束发送方向。</p>
          )}
        </div>
        <p
          role="status"
          data-testid="tcp-oracle"
          className="mt-3 text-sm leading-6"
        >
          {outcome}
        </p>
        <p className="text-sm leading-6 text-secondary">
          故障模型假定已消费请求、没有未读数据引发的 RST。真实退出可能产生
          FIN、RST 或稍后错误；不保证立即 SIGPIPE，也不固定第几次 write
          失败。前缀可能截在 UTF-8 字符中间，应累积完整字节或流式解码。
        </p>
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="group"
          aria-label="时间线控制"
        >
          <button
            type="button"
            disabled={frame === 0}
            onClick={() => {
              setPlaying(false);
              setFrame(frame - 1);
            }}
          >
            上一步
          </button>
          {!reduced && (
            <button
              type="button"
              onClick={() => {
                if (frame === 5) setFrame(0);
                setPlaying(!playing);
              }}
            >
              {playing ? "暂停" : "播放"}
            </button>
          )}
          <button
            type="button"
            disabled={frame === 5}
            onClick={() => {
              setPlaying(false);
              setFrame(frame + 1);
            }}
          >
            下一步
          </button>
          <button type="button" onClick={reset}>
            重置实验
          </button>
        </div>
        <label className="mt-3 block">
          进度：{stages[frame]}
          <input
            aria-label="实验进度"
            type="range"
            min={0}
            max={5}
            value={frame}
            onChange={(e) => {
              setPlaying(false);
              setFrame(Number(e.target.value));
            }}
            className="w-full"
          />
        </label>
        {reduced && (
          <p>减少动态效果已启用：仅使用单步或进度，不运行自动计时器。</p>
        )}
      </div>
      <SignalReapingLab key={`signal-${resetEpoch}`} />
      <HostFailureLab key={`host-${resetEpoch}`} />
      <figcaption className="mt-4 text-sm leading-6">
        5.17
        TCP程序例子小结：字节图回答“回来了多少”，回收图回答“还有几个僵尸”，故障图回答“内核是否有机会回复”。
        5.19 小结：收到全部字节、读到 EOF 和 waitpid
        回收是三个不同判据；先预测，再操作，最后用重置实验恢复三张图。
      </figcaption>
      <style jsx>{`
        .unp-tcp-lab {
          min-width: 0;
          font-size: 14px;
          overflow-wrap: anywhere;
        }
        .unp-tcp-lab :global(button) {
          min-width: 44px;
          min-height: 44px;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 14px;
        }
        .unp-tcp-lab :global(button[aria-pressed="true"]) {
          border-color: var(--accent);
          background: var(--bg);
        }
        .unp-tcp-lab :global(button:disabled) {
          opacity: 0.5;
        }
        input,
        textarea {
          min-width: 0;
          min-height: 44px;
          font-size: 14px;
        }
        input[type="range"] {
          height: 44px;
          touch-action: pan-y;
        }
        .unp-tcp-lab :global(button:focus-visible),
        .unp-tcp-lab :global(input:focus-visible),
        .unp-tcp-lab :global(textarea:focus-visible) {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .unp-tcp-lab :global(.flow) {
          display: block;
          width: 100%;
          max-width: 540px;
          height: auto;
          margin: 12px auto;
        }
        .byte-panel {
          font-size: 14px;
        }
        .chunks,
        .bytes {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .chunk {
          max-width: 100%;
          padding: 6px;
          border: 1px solid var(--border);
          border-radius: 8px;
        }
        .byte {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          min-height: 32px;
          border: 2px solid;
          border-radius: 4px;
          font: 14px monospace;
        }
        [data-returned="true"] {
          background: var(--bg);
        }
      `}</style>
    </figure>
  );
}

// Synthetic waitpid return stream. This is not a scheduler or signal delivery predictor.
export function modelReaping(step: number, loop: boolean) {
  const events = [
    "保存 errno=34",
    "waitpid=-1 / EINTR",
    "waitpid=101",
    ...(loop ? ["waitpid=102", "waitpid=103", "waitpid=-1 / ECHILD"] : []),
    "恢复 errno=34",
  ];
  const index = Math.max(0, Math.min(events.length - 1, Math.trunc(step) || 0));
  const reaped = events
    .slice(0, index + 1)
    .filter((e) => /^waitpid=10[123]$/.test(e)).length;
  const finished = index === events.length - 1;
  const errno = finished || index === 0 ? 34 : loop && index === 5 ? 10 : 4;
  return { events, index, reaped, remaining: 3 - reaped, errno, finished };
}

export function SignalReapingLab() {
  const [step, setStep] = useState(0);
  const [loop, setLoop] = useState(true);
  const m = modelReaping(step, loop);
  return (
    <section
      className="mt-5 rounded-card border border-border bg-elevated p-3 sm:p-5"
      aria-label="子进程回收实验"
    >
      <h3 className="text-lg font-semibold">
        5.8 POSIX信号处理：保存与恢复 errno
      </h3>
      <p className="text-sm leading-6">
        三个子进程已退出，现只处理一个 SIGCHLD 通知。此图注入一次 EINTR；显示的
        34/4/10 是本模型代号，不是跨平台 errno
        常量。先预测：只回收一次会留下几个僵尸？
      </p>
      <div
        className="my-3 flex flex-wrap gap-2"
        role="group"
        aria-label="回收策略"
      >
        <button
          type="button"
          aria-pressed={loop}
          onClick={() => {
            setLoop(true);
            setStep(0);
          }}
        >
          循环回收
        </button>
        <button
          type="button"
          aria-pressed={!loop}
          onClick={() => {
            setLoop(false);
            setStep(0);
          }}
        >
          只回收一个
        </button>
      </div>
      <h4 className="font-semibold">5.9 处理SIGCHLD信号：通知数不等于退出数</h4>
      <svg
        className="flow"
        viewBox="0 0 360 205"
        role="img"
        aria-label={`等待回收${m.remaining}个，已回收${m.reaped}个`}
      >
        <g fontSize={18} textAnchor="middle" fill={C.ink}>
          <text x={180} y={22}>
            退出状态：等待回收
          </text>
          <path d="M16 95H344" stroke={C.border} strokeDasharray="5 5" />
          {[101, 102, 103].map((pid, i) => (
            <g key={pid} data-testid={`pid-${pid}`} data-reaped={i < m.reaped}>
              <path
                d={`M${60 + i * 120} 85V110`}
                stroke={i < m.reaped ? C.success : C.border}
                strokeWidth={3}
              />
              <circle
                cx={60 + i * 120}
                cy={i < m.reaped ? 145 : 60}
                r={26}
                fill={C.bg}
                stroke={i < m.reaped ? C.success : C.warning}
                strokeWidth={3}
              />
              <text x={60 + i * 120} y={i < m.reaped ? 151 : 66}>
                {pid}
              </text>
            </g>
          ))}
          <text x={180} y={196}>
            已回收记录（非存活进程）
          </text>
        </g>
      </svg>
      <h4 className="font-semibold">
        5.10 wait和waitpid函数：沿返回值分支前进
      </h4>
      <ol className="my-3 list-decimal pl-6 text-sm leading-7">
        {m.events.map((event, i) => (
          <li
            key={i}
            aria-current={i === m.index ? "step" : undefined}
            style={{
              fontWeight: i === m.index ? 700 : 400,
              color: i > m.index ? C.ink : C.accent,
            }}
          >
            {event}
            {i === m.index ? " ← 当前" : ""}
          </li>
        ))}
      </ol>
      <p
        role="status"
        data-testid="reaping-status"
        data-remaining={m.remaining}
        data-errno={m.errno}
        className="text-sm leading-6"
      >
        errno={m.errno}；回收 {m.reaped}/3；
        {m.finished
          ? m.remaining
            ? "处理器返回了，但还遗留僵尸。"
            : "退出状态已收完，主流程 errno 恢复。"
          : "EINTR 重试不回收任何 PID；正返回值才移除一个状态。"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={m.finished}
          onClick={() => setStep(step + 1)}
        >
          下一次返回
        </button>
        <button
          type="button"
          onClick={() => {
            setLoop(true);
            setStep(0);
          }}
        >
          重置回收
        </button>
      </div>
      <p className="mt-2 text-sm leading-6">
        真实 waitpid(WNOHANG) 也可能返回
        0：还有子进程但暂无可取状态，应返回而非忙等。wait 会阻塞；SA_RESTART
        不是所有调用免于 EINTR 的保证。此面板手动推进，无自动计时器。
      </p>
    </section>
  );
}

export type HostScenario =
  | "process"
  | "crash"
  | "reboot"
  | "shutdown"
  | "accept-abort";
export function modelHostFailure(scenario: HostScenario, reachable: boolean) {
  if (scenario === "accept-abort")
    return {
      reply: "accept 报中止",
      path: false,
      kind: "abort",
      detail:
        "示例实现返回 ECONNABORTED；监听端点继续使用，未创建服务子进程。其他实现可隐藏中止队列项。",
    };
  if (scenario === "crash")
    return {
      reply: "无回复",
      path: false,
      kind: "silence",
      detail:
        "内核失效，不能正常发送 FIN；空闲连接可能长期无通知，有未确认数据时才经历重传。",
    };
  if (scenario === "reboot")
    return reachable
      ? {
          reply: "可能 RST",
          path: true,
          kind: "reset",
          detail:
            "旧报文到达重启后的主机，但旧连接状态已丢失；新 connect 不能恢复旧会话。",
        }
      : {
          reply: "无回复",
          path: false,
          kind: "silence",
          detail:
            "报文未抵达：即使主机已重启，客户也不能据此立即知道；仍可能等待或超时。",
        };
  if (scenario === "shutdown" && !reachable)
    return {
      reply: "无回复",
      path: false,
      kind: "silence",
      detail: "网络先停，连接清理未送达；不能将有序关机一律画成 FIN。",
    };
  return {
    reply: "有序 FIN",
    path: true,
    kind: "fin",
    detail:
      scenario === "process"
        ? "本分支假定请求已消费、最后描述符引用关闭；客户读尽已有数据后 EOF。未读数据等情况可能 RST。"
        : "本分支选择进程清理及连接关闭先于网络停止；客户先读完排队数据，再观察 EOF。",
  };
}

export function HostFailureLab() {
  const [scenario, setScenario] = useState<HostScenario>("process");
  const [reachable, setReachable] = useState(true);
  const [unwritable, setUnwritable] = useState(false);
  const m = modelHostFailure(scenario, reachable);
  const reset = () => {
    setScenario("process");
    setReachable(true);
    setUnwritable(false);
  };
  return (
    <section
      className="mt-5 rounded-card border border-border bg-elevated p-3 sm:p-5"
      aria-label="主机与进程故障比较"
    >
      <h3 className="text-lg font-semibold">
        故障比较：还能回复的内核在哪里？
      </h3>
      <p className="text-sm leading-6">
        先选事件，再改变显式条件。断口表示无回复路径，虚线表示有序
        FIN，折线表示重置分支；形状不是实际波形、包序列或耗时。
      </p>
      <div
        className="my-3 flex flex-wrap gap-2"
        role="group"
        aria-label="系统故障"
      >
        {(
          [
            ["accept-abort", "5.11 accept返回前连接中止"],
            ["process", "5.12 服务器进程终止"],
            ["crash", "5.14 服务器主机崩溃"],
            ["reboot", "5.15 服务器主机崩溃后重启"],
            ["shutdown", "5.16 服务器主机关机"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={scenario === value}
            onClick={() => {
              setScenario(value);
              setUnwritable(false);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {(scenario === "reboot" || scenario === "shutdown") && (
        <button
          type="button"
          aria-pressed={reachable}
          onClick={() => {
            setReachable(!reachable);
            setUnwritable(false);
          }}
        >
          {scenario === "reboot"
            ? `旧报文抵达：${reachable ? "是" : "否"}`
            : `清理先于断网：${reachable ? "是" : "否"}`}
        </button>
      )}
      <svg
        className="flow"
        viewBox="0 0 360 210"
        role="img"
        aria-label={`客户与服务器回复路径：${m.reply}`}
      >
        <g fontSize={18} fill={C.ink} textAnchor="middle">
          <rect
            x={8}
            y={20}
            width={100}
            height={56}
            rx={8}
            fill={C.bg}
            stroke={C.border}
          />
          <rect
            x={250}
            y={20}
            width={102}
            height={56}
            rx={8}
            fill={C.bg}
            stroke={m.path ? C.accent : C.danger}
          />
          <text x={58} y={54}>
            客户
          </text>
          <text x={301} y={54}>
            服务端
          </text>
          <path
            data-testid="host-path"
            d={
              !m.path
                ? "M300 95V130H220M140 130H60V95"
                : m.kind === "reset"
                  ? "M300 95V112L270 148L240 112L210 148L180 112L150 148L120 112H60V95"
                  : "M300 95V130H60V95"
            }
            strokeDasharray={m.kind === "fin" ? "6 4" : undefined}
            fill="none"
            stroke={m.path ? C.accent : C.danger}
            strokeWidth={4}
          />
          {!m.path && (
            <path
              d="M168 118L192 142M192 118L168 142"
              stroke={C.danger}
              strokeWidth={4}
            />
          )}
          <text x={180} y={178}>
            {m.reply}
          </text>
        </g>
      </svg>
      <p
        role="status"
        data-testid="host-status"
        data-kind={m.kind}
        className="text-sm leading-6"
      >
        {m.detail}
      </p>
      <h4 className="mt-4 font-semibold">5.13 SIGPIPE信号：写入结果有前提</h4>
      <button
        type="button"
        className="my-2"
        aria-pressed={unwritable}
        onClick={() => setUnwritable(!unwritable)}
      >
        本地已确认不可写：{unwritable ? "是" : "未知"}
      </button>
      <p data-testid="pipe-status" role="status" className="text-sm leading-6">
        {unwritable
          ? "若这次 write 因断开的流失败，可返回 EPIPE 并产生 SIGPIPE；未抑制且默认处理时会终止进程。"
          : "仅凭事件名不能断言下一次 write 失败；可能先进入发送缓冲。写成功也不证明远端应用已接收。"}
        这个独立条件不是按点击次数预测真实信号；EOF
        本身不证明本地发送方向不可写。
      </p>
      <button type="button" className="mt-3" onClick={reset}>
        重置故障比较
      </button>
    </section>
  );
}
