"use client";

import { useRef, useState, type ReactNode } from "react";
import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline } from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const STEPS = [
  ["socket", "创建端点"],
  ["listen", "绑定并监听"],
  ["connect", "客户建连"],
  ["accept", "取出连接"],
  ["write", "循环写入"],
  ["read-1", "第一次读"],
  ["read-2", "第二次读"],
  ["read-3", "继续读取"],
  ["read-4", "读完数据"],
  ["eof", "读到 EOF"],
  ["close", "回收资源"],
].map(([label, caption]) => ({ label, caption }));
type Fault = "none" | "socket" | "refused" | "read";

/** Pure teaching model: byte counts are read results, never TCP packet boundaries. */
export function daytimeState(step: number, fault: Fault, chunk: number) {
  const failedAt =
    fault === "socket"
      ? 0
      : fault === "refused"
        ? 2
        : fault === "read"
          ? 5
          : Infinity;
  const failed = step >= failedAt;
  const connected = step >= 2 && !(fault === "socket" || fault === "refused");
  const bytes = failed ? 0 : Math.min(8, Math.max(0, step - 4) * chunk);
  return {
    failed,
    connected,
    bytes,
    listening: step >= 1 && fault !== "refused",
    queued: connected && step === 2,
    accepted: connected && step >= 3,
    clientOpen: fault !== "socket" && !failed && step < 10,
    serverOpen: connected && step >= 3 && step < 10,
    eof: !failed && step >= 9,
    errno: failed
      ? fault === "socket"
        ? "EMFILE"
        : fault === "refused"
          ? "ECONNREFUSED"
          : "ECONNRESET"
      : "none",
  };
}

function Frame({
  children,
  label,
  height = 360,
}: {
  children: ReactNode;
  label: string;
  height?: number;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 280 ${height}`}
      className="mx-auto block w-full max-w-[280px]"
      style={{ color: C.text, fontSize: 16 }}
    >
      {children}
    </svg>
  );
}
function Text({
  x = 140,
  y,
  children,
  color = C.text,
}: {
  x?: number;
  y: number;
  children: ReactNode;
  color?: string;
}) {
  return (
    <text x={x} y={y} fill={color} textAnchor="middle" fontSize={16}>
      {children}
    </text>
  );
}
function Box({
  x,
  y,
  w,
  label,
  active = false,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  active?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={40}
        rx={6}
        fill={C.elevated}
        stroke={active ? C.accent : C.border}
        strokeWidth={2}
      />
      <Text x={x + w / 2} y={y + 25}>
        {label}
      </Text>
    </g>
  );
}
function Arrow({
  y,
  right,
  label,
  danger = false,
}: {
  y: number;
  right: boolean;
  label: string;
  danger?: boolean;
}) {
  const x = right ? 242 : 38;
  const color = danger ? C.danger : C.accent;
  return (
    <g>
      <line x1={38} x2={242} y1={y} y2={y} stroke={color} strokeWidth={2} />
      <path
        d={
          right
            ? `M ${x - 9} ${y - 5} L ${x} ${y} L ${x - 9} ${y + 5}`
            : `M ${x + 9} ${y - 5} L ${x} ${y} L ${x + 9} ${y + 5}`
        }
        fill="none"
        stroke={color}
        strokeWidth={2}
      />
      <Text y={y - 10} color={color}>
        {label}
      </Text>
    </g>
  );
}
function LocalStyle() {
  return (
    <style>{`
    .unp-intro-lab { min-width: 0; overflow-wrap: anywhere; }
    .unp-intro-practice .mdx-answer button, .unp-intro-lab button, .unp-intro-lab select { min-height: 44px; min-width: 44px; }
    .unp-intro-lab input[type=range] { height: 44px; min-height: 44px; min-width: 44px; }
    .unp-intro-lab input[type=checkbox] { width: 44px; height: 44px; }
    .unp-intro-lab select { max-width: 100%; }
    .unp-intro-lab .unp-controls > div > .flex { flex-wrap: wrap; }
    .unp-intro-lab .unp-controls ol[aria-hidden] { display: none; }
    .unp-intro-lab button:focus-visible, .unp-intro-lab select:focus-visible, .unp-intro-lab input:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
  `}</style>
  );
}
const PANEL =
  "unp-intro-lab not-prose my-6 rounded-card border border-border bg-elevated p-3";
const BUTTON = "rounded-control border border-border px-3 py-2 text-sm";

export function UnpDaytimeClientServerLab({
  view = "lifecycle",
}: {
  view?: "lifecycle" | "layers" | "environment";
}) {
  if (view === "layers") return <UnpLayerLab />;
  if (view === "environment") return <UnpEnvironmentLab />;
  return <DaytimeLab />;
}

function DaytimeLab() {
  const clock = useRef<SVGCircleElement>(null);
  const [family, setFamily] = useState("ipv4");
  const [fault, setFault] = useState<Fault>("none");
  const [chunk, setChunk] = useState(2);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((s, i) => {
        tl.label(s.label, i * TEACHING_BEAT_MS);
        // End labels are reachable. The hook owns/cancels the only animation clock.
        tl.add(
          clock.current!,
          { opacity: [1, 1], duration: TEACHING_BEAT_MS },
          i * TEACHING_BEAT_MS,
        );
      });
    },
  });
  const step = timeline.currentStep;
  const state = daytimeState(step, fault, chunk);
  const target = family === "ipv4" ? "127.0.0.1:1313" : "[::1]:1313";
  const rewind = () => {
    timeline.pause();
    timeline.goToStep(0);
  };
  const reset = () => {
    rewind();
    setFamily("ipv4");
    setFault("none");
    setChunk(2);
  };
  const details = [
    "客户 socket 成功后才有 fd。服务端独立创建端点；两个进程的 fd 3 不是同一个对象。",
    "一个简单的时间获取服务器程序先 bind 到所选回环地址的 1313 端口，再 listen。客户尚未 connect；不会因为 socket 成功就自动监听。",
    "阻塞 connect 完成建连后成功返回；服务端内核可先排队，应用还未 accept。图省略重传，不以 accept 返回作为客户建连的前提。",
    "accept 从完成队列取出连接并返回 fd 4；fd 3 继续监听。队列不等于应用已经读取。",
    "服务端的 8 字节教学载荷按短写 3 + 5 被发送缓冲区接收；这是 write 返回次数，不是报文分段。",
    `read 上限为 ${chunk}；本轮得到正数，累计 ${state.bytes} 字节。短读不是错误，也不是 EOF。`,
    `继续读取，累计 ${state.bytes} 字节。只处理实际返回的 n 字节，不依赖 C 字符串终止符。`,
    `累计 ${state.bytes} 字节。已读满时本帧不再制造一次正数返回；还没读满则继续。`,
    "8 字节全部交给应用，但收到数据不等于收到了流结束通知。服务器下一帧才 shutdown 写方向。",
    "服务器 shutdown(SHUT_WR) 结束发送方向。客户耗尽已排队数据后，正长度 read 返回 0；这是接收 EOF，不是超时。服务器描述符仍待 close。",
    "本次会话两端 close。描述符回收不必等待 TCP 状态全部消失；TIME_WAIT 可继续存在。监听 fd 仍供下一位客户使用。",
  ];
  const failure =
    fault === "socket"
      ? "客户 socket 返回 -1（示例 EMFILE），没有客户 fd 可 close，不能继续 connect。服务端是独立进程，可继续监听。"
      : fault === "refused"
        ? "本实验假定回环可达且无过滤：SYN 被 RST 拒绝，connect 返回 -1 / ECONNREFUSED。保存 errno 并 close 客户 fd；不进入 accept、read 成功路径。"
        : "示例 read 返回 -1 / ECONNRESET：保存错误并清理客户 fd，不记作 EOF。此轨迹在首次读注入复位；真实复位前可能已交付部分数据。";
  return (
    <figure
      className={PANEL}
      data-testid="unp-daytime-lab"
      data-family={family}
      data-target={target}
      data-stage={STEPS[step].label}
      data-stage-index={step}
      data-fault-enabled={String(fault !== "none")}
      data-fault-active={String(state.failed)}
      data-server-listening={String(state.listening)}
      data-errno={state.errno}
      data-playing={String(timeline.isPlaying)}
      data-progress={timeline.progress.toFixed(3)}
      data-reduced-motion={String(timeline.reducedMotion)}
      data-bytes={state.bytes}
    >
      <LocalStyle />
      <figcaption className="font-semibold">
        实验 A · 第1章 简介：客户与服务器的协作
      </figcaption>
      <p className="my-2 text-sm">
        概述：从一个简单的时间获取客户程序出发，先预测故障发生后会有 fd 4 或 EOF
        吗？改变参数会暂停并回首帧；按下一步核对，再重置比较。
      </p>
      <div className="my-3 flex flex-wrap gap-3">
        <label className="grid gap-1 text-sm">
          协议无关性：客户端与监听端地址族
          <select
            value={family}
            onChange={(e) => {
              rewind();
              setFamily(e.target.value);
            }}
            className={BUTTON}
          >
            <option value="ipv4">IPv4 回环</option>
            <option value="ipv6">IPv6 回环</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          错误处理：包裹函数遇到以下失败怎么办？
          <select
            value={fault}
            onChange={(e) => {
              rewind();
              setFault(e.target.value as Fault);
            }}
            className={BUTTON}
          >
            <option value="none">正常</option>
            <option value="socket">客户 socket 失败</option>
            <option value="refused">服务端未监听</option>
            <option value="read">客户 read 复位错误</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          每次读取上限
          <select
            value={chunk}
            onChange={(e) => {
              rewind();
              setChunk(Number(e.target.value));
            }}
            className={BUTTON}
          >
            <option value={2}>2 字节</option>
            <option value={4}>4 字节</option>
          </select>
        </label>
      </div>
      <p className="text-sm">
        目标 {target}；两端必须使用兼容的监听地址。IPv6 并不自动保证 IPv4 可连。
      </p>
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
        }}
      >
        <Frame label={`TCP 时序：${STEPS[step].caption}；${state.errno}`}>
          <circle ref={clock} cx={140} cy={10} r={3} fill={C.accent} />
          <Text x={44} y={35}>
            客户
          </Text>
          <Text x={236} y={35}>
            服务器
          </Text>
          <line x1={38} x2={38} y1={48} y2={340} stroke={C.border} />
          <line x1={242} x2={242} y1={48} y2={340} stroke={C.border} />
          {step >= 2 && fault !== "socket" && (
            <Arrow y={91} right label="SYN" />
          )}
          {step >= 2 && fault === "refused" && (
            <Arrow y={140} right={false} label="RST：拒绝" danger />
          )}
          {state.connected && (
            <>
              <Arrow y={140} right={false} label="SYN + ACK" />
              <Arrow y={189} right label="ACK" />
            </>
          )}
          {state.connected && step >= 4 && (
            <Arrow y={238} right={false} label="8 字节数据 → 客户" />
          )}
          {state.failed && fault === "read" && (
            <Arrow y={287} right={false} label="RST：复位" danger />
          )}
          {state.eof && (
            <Arrow y={287} right={false} label="FIN：发送方向结束" />
          )}
          <Text y={336} color={state.failed ? C.danger : C.muted}>
            {state.failed ? "错误路径不再前进" : "纵轴表示事件先后"}
          </Text>
        </Frame>
        <Frame
          label={`资源图：监听 ${state.listening}，排队 ${state.queued}，已接入 ${state.accepted}`}
        >
          <Text y={30}>进程持有的资源</Text>
          <Box
            x={20}
            y={50}
            w={240}
            label={state.clientOpen ? "客户 fd 3：打开" : "客户：无存活 fd"}
            active={state.clientOpen}
          />
          <Box
            x={20}
            y={120}
            w={240}
            label={
              state.listening ? "服务器 fd 3：监听" : "服务器 fd 3：未监听"
            }
            active={state.listening}
          />
          <Text y={190}>内核完成队列</Text>
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={90 + i * 50}
              cy={216}
              r={15}
              stroke={C.border}
              fill={i === 0 && state.queued ? C.accent : C.bg}
            />
          ))}
          {state.accepted && (
            <path
              d="M 140 235 L 140 260 L 134 254 M 140 260 L 146 254"
              fill="none"
              stroke={C.accent}
              strokeWidth={2}
            />
          )}
          <Box
            x={20}
            y={268}
            w={240}
            label={state.serverOpen ? "服务器 fd 4：会话" : "服务器：无会话 fd"}
            active={state.serverOpen}
          />
          <Text y={340}>fd 编号仅在各进程内有效</Text>
        </Frame>
        <Frame
          label={`接收缓冲：共 8 字节，应用已读取 ${state.bytes}；EOF ${state.eof}`}
        >
          <Text y={30}>应用字节流（教学载荷）</Text>
          <Text y={65}>12:34:56 · 共 8 字节</Text>
          {Array.from("12:34:56").map((c, i) => (
            <g key={i}>
              <rect
                x={32 + (i % 4) * 54}
                y={96 + Math.floor(i / 4) * 56}
                width={46}
                height={44}
                rx={4}
                fill={i < state.bytes ? C.accent : C.bg}
                fillOpacity={i < state.bytes ? 0.22 : 1}
                stroke={i < state.bytes ? C.accent : C.border}
              />
              <Text x={55 + (i % 4) * 54} y={124 + Math.floor(i / 4) * 56}>
                {c}
              </Text>
            </g>
          ))}
          <line
            x1={32}
            x2={248}
            y1={230}
            y2={230}
            stroke={C.border}
            strokeWidth={8}
          />
          <line
            x1={32}
            x2={32 + (216 * state.bytes) / 8}
            y1={230}
            y2={230}
            stroke={C.accent}
            strokeWidth={8}
          />
          <Text y={267}>已读 {state.bytes} / 8</Text>
          <Text y={305} color={state.failed ? C.danger : C.text}>
            {state.failed
              ? `错误：${state.errno}`
              : state.eof
                ? "read = 0：EOF"
                : "尚未观察到 EOF"}
          </Text>
          <Text y={338}>色块不是 TCP 报文边界</Text>
        </Frame>
      </div>
      <p aria-live="polite" className="my-3 text-sm leading-6">
        第 {step + 1} 帧 · {state.failed ? failure : details[step]}
      </p>
      <nav aria-label="实验 A 关键帧" className="my-3 flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <button
            type="button"
            key={s.label}
            className={BUTTON}
            aria-current={step === i ? "step" : undefined}
            aria-label={`跳到第 ${i + 1} 步：${s.caption}`}
            onClick={() => timeline.goToStep(i)}
          >
            {i + 1}
          </button>
        ))}
      </nav>
      <div className="unp-controls">
        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(STEPS.map((s) => [s.label, s.caption]))}
          reset={{ label: "重置全部参数与时间线", onClick: reset }}
        />
      </div>
    </figure>
  );
}

export function UnpLayerLab() {
  const [layer, setLayer] = useState(0);
  const [route, setRoute] = useState(0);
  const routes = [
    {
      issue: "地址表示",
      chapter: "第3章 · 地址",
      reason:
        "核对 sockaddr 长度、字节序与地址族；先定位表示，不先换并发模型。",
    },
    {
      issue: "建立连接",
      chapter: "第4–5章 · TCP",
      reason: "追踪 bind/listen/connect/accept 与会话端点，再看请求响应示例。",
    },
    {
      issue: "多连接等待",
      chapter: "第6/30章 · 等待",
      reason:
        "比较 I/O 复用和并发结构；增大一次 read 的容量不会消除慢客户阻塞。",
    },
    {
      issue: "报文语义",
      chapter: "第8–10章 · 协议",
      reason: "比较 UDP 数据报和 SCTP 消息服务；协议选择不是修改缓冲区长度。",
    },
  ];
  const names = ["应用文本", "TCP 字节流", "IP 数据报", "链路帧"];
  return (
    <figure className={PANEL}>
      <LocalStyle />
      <figcaption className="font-semibold">
        实验 B · OSI模型：数据被哪些边界包住？
      </figcaption>
      <p className="my-2 text-sm">
        先预测端口和下一跳地址分别属于哪里。选择封装深度：外框增加不是文本变长，而是新增协议首部；各层尺寸不按实际字节比例。
      </p>
      <div className="flex flex-wrap gap-2">
        {names.map((s, i) => (
          <button
            type="button"
            key={s}
            className={BUTTON}
            aria-pressed={layer === i}
            onClick={() => setLayer(i)}
          >
            {s}
          </button>
        ))}
      </div>
      <Frame label={`${names[layer]} 封装剖面`}>
        {layer >= 3 && (
          <rect
            x={8}
            y={30}
            width={264}
            height={315}
            rx={8}
            fill={C.bg}
            stroke={C.accent}
            strokeWidth={2}
          />
        )}
        {layer >= 3 && <Text y={58}>链路首部：下一跳</Text>}
        {layer >= 2 && (
          <rect
            x={22}
            y={85}
            width={236}
            height={245}
            rx={8}
            fill={C.elevated}
            stroke={C.accent}
            strokeWidth={2}
          />
        )}
        {layer >= 2 && <Text y={116}>IP 首部：主机地址</Text>}
        {layer >= 1 && (
          <rect
            x={36}
            y={145}
            width={208}
            height={168}
            rx={8}
            fill={C.bg}
            stroke={C.accent}
            strokeWidth={2}
          />
        )}
        {layer >= 1 && (
          <>
            <Text y={176}>TCP 首部：端口</Text>
            <Text y={202}>序号 / 确认号</Text>
          </>
        )}
        <Box x={50} y={245} w={180} label="12:34:56" active />
      </Frame>
      <p className="text-sm">
        解释：
        {
          [
            "日期时间格式由应用约定，TCP 不替你选择文本编码。",
            "TCP 对端口与字节序号负责，但不保留 write 边界。",
            "IP 对跨网络寻址负责；端口仍留在 TCP 首部。",
            "链路只管当前一跳。路由器转发会更换链路封装；物理层把它编码为信号。",
          ][layer]
        }
      </p>
      <p className="my-3 text-sm">
        本课程自编学习路线：先预测当前问题需要哪种知识，再选择问题。
        章号沿用本课程当前编排；后续章号与原书目录的对应关系尚待独立核实。
        下图的分支代表学习路径，不是网络报文的流向，也不是完整官方目录的核验结果。
      </p>
      <label className="grid gap-1 text-sm">
        当前需要解决的问题
        <select
          className={BUTTON}
          value={route}
          onChange={(e) => setRoute(Number(e.target.value))}
        >
          {routes.map((r, i) => (
            <option key={r.issue} value={i}>
              {r.issue}
            </option>
          ))}
        </select>
      </label>
      <Frame
        label={`示例索引路线：${routes[route].issue}，前往${routes[route].chapter}`}
      >
        <Box x={20} y={16} w={240} label="从当前问题选择下一章" active />
        {routes.map((r, i) => (
          <g key={r.issue}>
            <path
              d={`M 40 56 V ${102 + i * 70} H 80`}
              fill="none"
              stroke={route === i ? C.accent : C.border}
              strokeWidth={route === i ? 4 : 1}
            />
            {route === i && (
              <circle cx={65} cy={102 + i * 70} r={6} fill={C.accent} />
            )}
            <Box
              x={80}
              y={82 + i * 70}
              w={190}
              label={r.chapter}
              active={route === i}
            />
          </g>
        ))}
      </Frame>
      <p aria-live="polite" className="my-2 text-sm">
        解释：{routes[route].reason}
      </p>
      <button
        type="button"
        className={BUTTON}
        onClick={() => {
          setLayer(0);
          setRoute(0);
        }}
      >
        重置封装与章节路线
      </button>
    </figure>
  );
}

export function UnpEnvironmentLab() {
  const [remote, setRemote] = useState(false);
  const [lp64, setLp64] = useState(false);
  return (
    <figure className={PANEL}>
      <LocalStyle />
      <figcaption className="font-semibold">
        实验 C · 测试用网络及主机：拓扑与 ABI
      </figcaption>
      <p className="my-2 text-sm">
        先预测：64位体系结构会改变哪些内存格？增加一台测试主机会多出什么排错边界？改成
        LP64
        后，线上端口也会加宽吗？两项输入分别只改变拓扑与内存布局。BSD网络支持历史解释接口传统，UNIX标准规定接口契约；它们都不能代替图中新增链路与目标主机的实际检查。
      </p>
      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={remote}
            onChange={(e) => setRemote(e.target.checked)}
          />
          改为两台测试主机
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={lp64}
            onChange={(e) => setLp64(e.target.checked)}
          />
          选择 LP64 模型
        </label>
      </div>
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
        }}
      >
        <Frame
          label={
            remote ? "两台隔离主机经测试路由器连接" : "一台主机内经回环连接"
          }
        >
          <rect
            x={15}
            y={18}
            width={250}
            height={remote ? 92 : 320}
            rx={12}
            fill={C.bg}
            stroke={C.border}
            strokeWidth={2}
          />
          <Text y={46}>主机 A：客户</Text>
          <Text y={76}>{remote ? "192.0.2.10" : "127.0.0.1 / ::1"}</Text>
          <path
            d="M 140 100 L 140 260 L 134 254 M 140 260 L 146 254"
            fill="none"
            stroke={C.accent}
            strokeWidth={3}
          />
          {remote && (
            <>
              <Box x={45} y={145} w={190} label="隔离测试路由器" active />
              <rect
                x={15}
                y={245}
                width={250}
                height={93}
                rx={12}
                fill={C.bg}
                stroke={C.border}
                strokeWidth={2}
              />
            </>
          )}
          {!remote && <Text y={184}>本机内核回环路径</Text>}
          <Text y={280}>{remote ? "主机 B：服务器" : "同机：服务器"}</Text>
          <Text y={312}>
            {remote ? "198.51.100.20:1313" : "同族回环端口 1313"}
          </Text>
        </Frame>
        <Frame label={`${lp64 ? "LP64" : "ILP32"} 字节布局；端口固定两字节`}>
          <Text y={28}>{lp64 ? "LP64" : "ILP32"}：每格一字节</Text>
          {[
            ["int / fd", 4],
            ["long", lp64 ? 8 : 4],
            ["pointer", lp64 ? 8 : 4],
            ["port (uint16)", 2],
          ].map(([name, count], row) => (
            <g key={name}>
              <Text y={65 + row * 75}>{name}</Text>
              {Array.from({ length: Number(count) }, (_, i) => (
                <rect
                  key={i}
                  x={25 + i * 29}
                  y={77 + row * 75}
                  width={24}
                  height={26}
                  fill={C.accent}
                  fillOpacity={0.22}
                  stroke={C.accent}
                />
              ))}
            </g>
          ))}
        </Frame>
      </div>
      <p className="text-sm">
        解释：
        {remote
          ? "双主机增加路由、过滤与链路边界；图中是文档地址，不能直接拿来联网，须替换为隔离网实际分配地址。"
          : "回环不依赖外部链路，但仍检查目标地址族和监听服务；它不能证明跨主机路由正确。"}{" "}
        {lp64
          ? "LP64 的 long 和指针为 8 字节，int 仍为 4；这不是所有 64 位 ABI 的保证。"
          : "ILP32 的 int、long、指针均为 4 字节；图假定一字节 8 位。"}
        端口在线上始终是 16 位，不随 ABI 改变。
      </p>
      <button
        type="button"
        className={BUTTON}
        onClick={() => {
          setRemote(false);
          setLp64(false);
        }}
      >
        重置拓扑与数据模型
      </button>
    </figure>
  );
}
