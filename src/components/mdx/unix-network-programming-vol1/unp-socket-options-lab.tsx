"use client";

import { useCallback, useEffect } from "react";
import { useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const LEVELS = [
  "SOL_SOCKET",
  "IPPROTO_IP",
  "IPPROTO_ICMPV6",
  "IPPROTO_IPV6",
  "IPPROTO_TCP",
  "IPPROTO_SCTP",
];
const CASES = [
  {
    id: "buffer",
    concept: "7.3 检查选项是否受支持并获取默认值",
    task: "7.5 通用套接字选项：先看请求柱，再看受限柱与读回柱。把请求从8192调到65536，再开启4096上限；预测读回为何不再增长。真实默认值须另用本章C探针读取。",
    title: "7.3/7.5 接收缓冲区",
    level: 0,
    option: "SO_RCVBUF",
    parameter: "请求字节数",
    initial: 8192,
    min: 128,
    max: 65536,
    step: 128,
    boundary: "把示意 rmem_max 降到 4096",
    prediction: "请求变大，读回一定同比增大吗？",
  },
  {
    id: "namespace",
    concept: "7.2 getsockopt和setsockopt函数",
    task: "先检查IPPROTO_TCP/TCP_NODELAY的整数配对与sizeof(int)。开启错误level，沿分派树追踪同一optname数字进入另一张表；返回可能失败，也可能合法碰撞，图不伪造固定errno。",
    title: "7.2 错误 level",
    level: 4,
    option: "TCP_NODELAY",
    parameter: "开关值（0/1）",
    initial: 1,
    min: 0,
    max: 1,
    step: 1,
    boundary: "误把 level 写成 SOL_SOCKET",
    prediction: "名称不会传入内核；数值碰撞能成功吗？",
  },
  {
    id: "error",
    concept: "7.4 套接字状态",
    task: "先预测第二次SO_ERROR。单步看第三帧读走旧错误，再在边界开启时观察新错误进入同一槽；第四帧第二次读取并清空。对比连接状态与读取产生的副作用。",
    title: "7.4 SO_ERROR 读并清除",
    level: 0,
    option: "SO_ERROR",
    parameter: "是否有 pending error（0/1）",
    initial: 1,
    min: 0,
    max: 1,
    step: 1,
    boundary: "两次读取之间又出现错误",
    prediction: "第二次读到零能否否定第一次失败？",
  },
  {
    id: "ttl",
    concept: "7.6 IPv4套接字选项",
    task: "设TTL=3，逐跳沿路由器标记核对递减。开启增加一跳后，定位哪个路由器丢弃分组；增加路径不会给TTL续命，IP_TTL也不是连接超时。",
    title: "7.6 IPv4 逐跳 TTL",
    level: 1,
    option: "IP_TTL",
    parameter: "初始 TTL（示意路径3个路由器）",
    initial: 3,
    min: 1,
    max: 6,
    step: 1,
    boundary: "路径增加一个路由器",
    prediction: "TTL=3 能穿过三个路由器吗？",
  },
  {
    id: "icmp",
    concept: "7.7 ICMPv6套接字选项",
    task: "选择129，比较三行消息从类型到位图再到socket的投递。开启已知初态全允许的边界，检查为什么只加SETPASS并不能撤销其他类型的通行权。",
    title: "7.7 ICMPv6 类型过滤",
    level: 2,
    option: "ICMP6_FILTER",
    parameter: "允许的类型（1/128/129）",
    initial: 129,
    min: 1,
    max: 129,
    step: 1,
    boundary: "初态全部允许，只加 SETPASS",
    prediction: "仅放行129时，128与1会投递给此socket吗？",
  },
  {
    id: "ipv6",
    concept: "7.8 IPv6套接字选项",
    task: "在绑定前切换V6ONLY，观察映射IPv4入口开闭。再开启已有IPv4绑定，区分地址族入口开放与bind成功：双栈支持和绑定冲突是两个判断。",
    title: "7.8 IPv6 双栈入口",
    level: 3,
    option: "IPV6_V6ONLY",
    parameter: "V6ONLY（0/1）",
    initial: 1,
    min: 0,
    max: 1,
    step: 1,
    boundary: "已有冲突的 IPv4 绑定",
    prediction: "关闭V6ONLY是否保证bind成功？",
  },
  {
    id: "tcp",
    concept: "7.9 TCP套接字选项",
    task: "已有未确认小段，再写20字节。对比NODELAY=0与1的第三帧；再打开零窗口，观察矩形是否离开发送队列。第四帧的ACK解除Nagle等待，但不会替你移除零窗口。",
    title: "7.9 Nagle 与窗口",
    level: 4,
    option: "TCP_NODELAY",
    parameter: "NODELAY（0/1）",
    initial: 0,
    min: 0,
    max: 1,
    step: 1,
    boundary: "接收窗口为零（禁止新数据）",
    prediction: "关闭Nagle能绕过零窗口吗？",
  },
  {
    id: "sctp",
    concept: "7.10 SCTP套接字选项",
    task: "请求8个出站流，先看对端6个接收槽，再把上限降为2。第三帧数实际连线；它们是本方向协商流数，不是八条TCP连接。建立后应按关联ID读取SCTP_STATUS。",
    title: "7.10 SCTP 流数协商",
    level: 5,
    option: "SCTP_INITMSG",
    parameter: "本端请求出站流数",
    initial: 4,
    min: 1,
    max: 8,
    step: 1,
    boundary: "对端入站流上限从6降到2",
    prediction: "本端请求8个流，能否强迫对端接受8个？",
  },
  {
    id: "flags",
    concept: "7.11 fcntl函数",
    task: "沿fd=3与dup后的fd=4的引用找到同一对象。通过一个fd开关O_NONBLOCK，再开启覆盖旧值的错误：观察共享非阻塞位与其他状态位，而不是误改各fd独立的FD_CLOEXEC。",
    title: "7.11 fcntl 共享状态",
    level: -1,
    option: "F_GETFL / F_SETFL",
    parameter: "O_NONBLOCK（0/1）",
    initial: 1,
    min: 0,
    max: 1,
    step: 1,
    boundary: "错误：不读旧值直接覆盖状态位",
    prediction: "dup产生的新fd会共享非阻塞状态吗？",
  },
] as const;
export type SocketOptionCase = (typeof CASES)[number]["id"];
const STEPS = [
  { label: "调用前", caption: "先预测；查看应用参数和初始对象" },
  { label: "选择对象", caption: "按命名空间选处理者，或按fd找到共享状态" },
  { label: "操作结果", caption: "观察限制、过滤、协商或读清除的结果" },
  { label: "再次观察", caption: "读回或推进事件；区分返回成功与业务成功" },
];

// 有限教学模型，不执行系统调用；常量不是当前浏览器所在主机的测量值。
export function socketOptionModel(
  id: SocketOptionCase,
  value: number,
  boundary: boolean,
  frame: number,
) {
  const applied = frame >= 2;
  const cap = boundary ? 4096 : 32768;
  const receiveBytes = Math.max(256, 2 * Math.min(value, cap));
  const peerStreams = boundary ? 2 : 6;
  const streams = Math.min(value, peerStreams);
  const hops = boundary ? 4 : 3;
  const tcpCanSend = !boundary && (value === 1 || frame >= 3);
  const pending = frame < 2 ? value === 1 : frame === 2 && boundary;
  const secondError = boundary ? "新错误" : "0";
  const output: Record<SocketOptionCase, string> = {
    buffer: `模型限制：请求上限${cap} B，记账下限256 B；读回${receiveBytes} B。翻倍是记账规则，不是故障；超过上限后继续调大请求也不会同比增长。`,
    namespace: boundary
      ? "错误命名空间只收到数字，不知道源码写了TCP_NODELAY。可能EINVAL/ENOPROTOOPT，也可能命中另一合法选项而成功。本图保留结果未知，必须核对本机头文件与正确level读回。"
      : `IPPROTO_TCP + TCP_NODELAY：设置值${value}，类型int；仅移除Nagle等待，不等于立即上网。`,
    error: `第一次读取：${value ? "已有错误" : "0"}；成功读取后原pending error清除。第二次读取：${secondError}。读取SO_ERROR的调用成功，与读出的连接错误是两回事。`,
    ttl: `初值${value}，路径${hops}个路由器：${value <= hops ? `在第${value}个路由器减至0并丢弃` : `到达终点，剩余${value - hops}`}。TTL不用于设置TCP超时；错误通知可能被过滤或限速。`,
    icmp: boundary
      ? "示意初态为全部通过；仅SETPASS不会自动关闭其他类型。先SETBLOCKALL再SETPASS(129)，才能只接收Echo Reply。此过滤器不是整机防火墙。"
      : `先全阻止，再允许类型${value}：只把该类型交给这个原始socket，不改变内核处理ICMPv6的其他路径。`,
    ipv6:
      boundary && value === 0
        ? "双栈通配绑定与已存在的IPv4绑定在本模型中冲突；不能把V6ONLY=0当作必然成功。"
        : value
          ? "仅IPv6入口；IPv4映射入口关闭。在bind前显式设值，避免依赖不同系统的默认策略。"
          : "示意系统支持IPv4映射地址：两类入口开放，但仍需检查bind返回和平台绑定规则。",
    tcp: boundary
      ? "零接收窗口阻止新数据，即便NODELAY=1。本图不画窗口探测报文；拥塞窗口与调度也仍然约束发送。"
      : value
        ? "移除Nagle等待；本模型假定拥塞窗口和发送窗口足够，允许发送小段，不承诺真实发送时刻。"
        : "已有未确认的小段时先留在发送队列；第4帧收到ACK后，Nagle等待条件解除。",
    sctp: `请求${value}个出站流，对端最多接收${peerStreams}个，协商为${streams}个。修改初始化默认值不会改造已经存在的关联；应用应查SCTP_STATUS确认实际流数。`,
    flags: boundary
      ? "直接F_SETFL新值可能清除其他可修改状态位。fd和dup(fd)指向同一open file description，都会观察到该变化；FD_CLOEXEC另属每个fd。"
      : `读旧标志再按位修改，O_NONBLOCK=${value}；其余状态位保留。空读${value ? "返回EAGAIN/EWOULDBLOCK" : "等待数据"}，不会创建额外数据。`,
  };
  return {
    applied,
    receiveBytes,
    cap,
    streams,
    peerStreams,
    hops,
    tcpCanSend,
    pending,
    output: output[id],
  };
}

function Label({
  x = 16,
  y,
  children,
}: {
  x?: number;
  y: number;
  children: React.ReactNode;
}) {
  return (
    <text x={x} y={y} fontSize={16} fill={C.primary}>
      {children}
    </text>
  );
}
function Arrow({
  x1,
  y1,
  x2,
  y2,
  active = true,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
}) {
  return (
    <path
      d={`M${x1} ${y1} L${x2} ${y2}`}
      stroke={active ? C.accent : C.border}
      strokeWidth={3}
      fill="none"
      strokeDasharray={active ? undefined : "5 5"}
    />
  );
}

export function UnpSocketOptionsLab() {
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState<number>(8192);
  const [boundary, setBoundary] = useState(false);
  const [prediction, setPrediction] = useState("");
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      STEPS.forEach((step, i) => tl.label(step.label, i * 900));
      tl.add({ tick: 0 }, { tick: 1, duration: 3600, ease: "linear" }, 0);
    },
    [],
  );
  const timeline = useTeachingTimeline({ steps: STEPS, build });
  const { reducedMotion, pause } = timeline;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  const item = CASES[selected];
  const frame = timeline.currentStep;
  const m = socketOptionModel(item.id, value, boundary, frame);
  const rewind = () => {
    timeline.pause();
    timeline.seek(0);
  };
  const reset = () => {
    rewind();
    setSelected(0);
    setValue(8192);
    setBoundary(false);
    setPrediction("");
  };
  const target = item.id === "namespace" && boundary ? 0 : item.level;
  const svgProps = {
    viewBox: "0 0 320 390",
    role: "img",
    style: { width: "100%", height: "auto", display: "block" },
  } as const;

  return (
    <section
      className="not-prose socket-options-lab my-6 rounded-xl border border-border p-2 sm:p-3"
      aria-label="套接字选项命名空间与对象状态实验"
    >
      <style>{`
      .socket-options-lab { min-width:0; max-width:100%; overflow-wrap:anywhere; }
      .socket-options-lab svg { width:100%; max-width:100%; height:auto; }
      .socket-options-lab .grid > * { min-width:0; }
      .socket-options-lab button,.socket-options-lab select,.socket-options-lab input { min-height:44px; min-width:44px; max-width:100%; }
      .socket-options-lab select { width:100%; }
      .socket-options-lab input[type=range] { height:44px; }
      .socket-options-lab .socket-controls ol { display:none; }
      .socket-options-lab .socket-controls .flex { flex-wrap:wrap; }
      .socket-options-lab :is(button,input,select):focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
    `}</style>
      <h3 className="text-lg font-semibold">
        7.1 概述：一次调用只选定一个命名空间
      </h3>
      <p className="my-2 text-sm text-secondary">
        有限状态教学模型，不读取本机内核。先预测，再单步到第3、4帧核对对象变化。图中分支互斥，不是数据包协议栈。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          实验场景
          <select
            className="block rounded border border-border bg-bg p-2"
            value={selected}
            onChange={(e) => {
              const n = Number(e.target.value);
              rewind();
              setSelected(n);
              setValue(CASES[n].initial);
              setBoundary(false);
              setPrediction("");
            }}
          >
            {CASES.map((c, i) => (
              <option key={c.id} value={i}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          {item.parameter}
          {item.id === "icmp" ? (
            <select
              className="block rounded border border-border bg-bg p-2"
              value={value}
              onChange={(e) => {
                rewind();
                setValue(Number(e.target.value));
              }}
            >
              <option value={1}>1 Destination Unreachable</option>
              <option value={128}>128 Echo Request</option>
              <option value={129}>129 Echo Reply</option>
            </select>
          ) : (
            <>
              <input
                className="block w-full accent-accent"
                type="range"
                min={item.min}
                max={item.max}
                step={item.step}
                value={value}
                onChange={(e) => {
                  rewind();
                  setValue(Number(e.target.value));
                }}
              />
              <output>{value}</output>
            </>
          )}
        </label>
        <label className="text-sm">
          先预测：{item.prediction}
          <select
            className="block rounded border border-border bg-bg p-2"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
          >
            <option value="">先选一个判断</option>
            <option value="yes">会 / 可以</option>
            <option value="no">不会 / 不可以</option>
            <option value="depends">取决于状态或平台</option>
          </select>
        </label>
        <button
          type="button"
          className="self-end rounded border border-border p-2 text-sm"
          aria-pressed={boundary}
          onClick={() => {
            rewind();
            setBoundary((v) => !v);
          }}
        >
          {boundary ? "已开启" : "未开启"}故障/边界：{item.boundary}
        </button>
      </div>
      <div className="mt-4" data-scenario-instructions>
        <h4 className="font-semibold">{item.concept}</h4>
        <p className="mt-1 text-sm text-secondary">{item.task}</p>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <svg
          {...svgProps}
          aria-label={`命名空间分派：${item.option}选择${target < 0 ? "fcntl描述符操作，不走level" : LEVELS[target]}，其余分支不经过`}
        >
          <Label y={24}>
            应用：{item.id === "flags" ? "fcntl(fd, cmd)" : "(level, optname)"}
          </Label>
          <Label y={48}>{item.option}</Label>
          <path d="M26 62 V350" stroke={C.border} fill="none" strokeWidth={2} />
          {LEVELS.map((level, i) => (
            <g key={level}>
              <Arrow
                x1={26}
                y1={88 + i * 51}
                x2={65}
                y2={88 + i * 51}
                active={target === i && frame >= 1}
              />
              <circle
                cx={26}
                cy={88 + i * 51}
                r={target === i ? 7 : 3}
                fill={target === i ? C.accent : C.border}
              />
              <rect
                x={65}
                y={70 + i * 51}
                width={239}
                height={36}
                rx={6}
                fill={C.elevated}
                stroke={target === i ? C.accent : C.border}
              />
              <Label x={77} y={94 + i * 51}>
                {level}
              </Label>
            </g>
          ))}
          <Label y={378}>
            {target < 0
              ? "fcntl不使用socket选项命名空间"
              : "只选择一个分支，不沿所有分支下穿"}
          </Label>
        </svg>
        <svg
          {...svgProps}
          aria-label={`${item.title}第${frame + 1}帧；${m.applied ? m.output : "参数已就绪；推进到操作结果，查看真实对象的状态变化。"}`}
        >
          <Label y={24}>{item.title}</Label>
          {item.id === "buffer" && (
            <>
              <Label y={66}>请求 / 截断后 / 记账读回</Label>
              {[value, Math.min(value, m.cap), m.receiveBytes].map((n, i) => (
                <g key={i}>
                  <rect
                    x={16}
                    y={90 + i * 78}
                    width={288}
                    height={32}
                    fill={C.elevated}
                    stroke={C.border}
                  />
                  <rect
                    x={16}
                    y={90 + i * 78}
                    width={(288 * (i === 0 || m.applied ? n : 0)) / 131072}
                    height={32}
                    fill={C.accent}
                  />
                  <Label y={145 + i * 78}>
                    {i === 0 || m.applied ? `${n} B` : "尚未设置"}
                  </Label>
                </g>
              ))}
              <Label y={350}>同一标尺：整条 = 131072 B</Label>
              <Label y={378}>超上限后读回不再随请求增加</Label>
            </>
          )}
          {item.id === "namespace" && (
            <>
              <Label y={70}>传入的是两个整数，不是名字</Label>
              <circle
                cx={160}
                cy={126}
                r={28}
                fill={C.elevated}
                stroke={C.accent}
              />
              <Label x={146} y={132}>
                n
              </Label>
              <Arrow
                x1={160}
                y1={154}
                x2={boundary ? 72 : 245}
                y2={220}
                active={frame >= 1}
              />
              <Label x={20} y={248}>
                SOL_SOCKET
              </Label>
              <Label x={188} y={275}>
                TCP选项表
              </Label>
              <rect
                x={20}
                y={285}
                width={280}
                height={50}
                fill={C.elevated}
                stroke={boundary ? C.danger : C.accent}
              />
              <Label x={30} y={316}>
                {m.applied
                  ? boundary
                    ? "错误 / 合法碰撞：结果未定"
                    : `NODELAY = ${value}`
                  : "等待调用"}
              </Label>
              <Label y={365}>n的值依赖平台，不能凭名字推断</Label>
            </>
          )}
          {item.id === "error" && (
            <>
              <Label y={72}>内核 pending error 槽</Label>
              <rect
                x={35}
                y={90}
                width={250}
                height={76}
                fill={C.elevated}
                stroke={C.accent}
              />
              {m.pending && <circle cx={80} cy={128} r={17} fill={C.danger} />}
              <Label x={110} y={134}>
                {m.pending ? (frame < 2 ? "已有错误" : "新错误") : "空 / 0"}
              </Label>
              <Arrow x1={160} y1={168} x2={160} y2={213} active={m.applied} />
              <Label y={246}>
                首次读出：{m.applied ? (value ? "已有错误" : "0") : "等待"}
              </Label>
              <Label y={294}>
                再次读出：{frame === 3 ? (boundary ? "新错误" : "0") : "等待"}
              </Label>
              <Label y={348}>读走旧错误，不会把连接修好</Label>
            </>
          )}
          {item.id === "ttl" && (
            <>
              <Label y={62}>分组初始 TTL = {value}</Label>
              {Array.from({ length: m.hops }, (_, i) => (
                <g key={i}>
                  <Arrow
                    x1={70}
                    y1={78 + i * 64}
                    x2={70}
                    y2={100 + i * 64}
                    active={m.applied && value > i}
                  />
                  <circle
                    cx={70}
                    cy={121 + i * 64}
                    r={20}
                    fill={m.applied && value === i + 1 ? C.danger : C.elevated}
                    stroke={C.border}
                  />
                  <Label x={105} y={127 + i * 64}>
                    R{i + 1}：
                    {m.applied
                      ? value > i
                        ? `TTL ${value - i - 1}`
                        : "未到达"
                      : "等待"}
                  </Label>
                </g>
              ))}
              <Label y={378}>
                {m.applied
                  ? value <= m.hops
                    ? "减至0：丢弃，不再转发"
                    : "到达目的端"
                  : "先设IP_TTL，再发送分组"}
              </Label>
            </>
          )}
          {item.id === "icmp" && (
            <>
              <Label y={65}>收到类型 → 过滤位 → 此socket</Label>
              {[1, 128, 129].map((type, i) => {
                const pass = boundary || type === value;
                return (
                  <g key={type}>
                    <circle
                      cx={40}
                      cy={115 + i * 80}
                      r={23}
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <Label x={type === 1 ? 35 : 23} y={121 + i * 80}>
                      {type}
                    </Label>
                    <Arrow
                      x1={65}
                      y1={115 + i * 80}
                      x2={140}
                      y2={115 + i * 80}
                      active={m.applied}
                    />
                    <rect
                      x={140}
                      y={95 + i * 80}
                      width={45}
                      height={40}
                      fill={pass ? C.accent : C.elevated}
                      stroke={C.border}
                    />
                    <Label x={208} y={121 + i * 80}>
                      {m.applied ? (pass ? "投递" : "阻止") : "等待"}
                    </Label>
                  </g>
                );
              })}
              <Label y={355}>亮格：允许投递；暗格：阻止</Label>
              <Label y={378}>不是关闭内核的全部ICMPv6处理</Label>
            </>
          )}
          {item.id === "ipv6" && (
            <>
              <Label y={68}>绑定前设置V6ONLY</Label>
              <Label x={25} y={110}>
                IPv6
              </Label>
              <Label x={184} y={110}>
                IPv4映射
              </Label>
              <Arrow x1={55} y1={125} x2={145} y2={225} active={m.applied} />
              <Arrow
                x1={240}
                y1={125}
                x2={175}
                y2={225}
                active={m.applied && value === 0 && !boundary}
              />
              {value === 1 && (
                <path
                  d="M204 158 l30 30 m0 -30 l-30 30"
                  stroke={C.danger}
                  strokeWidth={3}
                />
              )}
              <rect
                x={65}
                y={230}
                width={190}
                height={55}
                fill={C.elevated}
                stroke={boundary && value === 0 ? C.danger : C.accent}
              />
              <Label x={83} y={265}>
                {m.applied
                  ? boundary && value === 0
                    ? "bind：地址冲突"
                    : "AF_INET6 socket"
                  : "尚未bind"}
              </Label>
              <Label y={340}>假定系统支持IPv4映射地址</Label>
              <Label y={378}>默认值、复用条件须查目标平台</Label>
            </>
          )}
          {item.id === "tcp" && (
            <>
              <Label y={68}>已有未确认小段；再写20字节</Label>
              <path
                d="M28 120 H292 M28 270 H292"
                stroke={C.border}
                strokeWidth={2}
              />
              <Label y={103}>发送队列</Label>
              <Label y={304}>网络（不是send返回）</Label>
              <rect
                x={45}
                y={m.applied && m.tcpCanSend ? 240 : 130}
                width={62}
                height={28}
                fill={C.accent}
              />
              <path
                d="M25 206 H295"
                stroke={boundary ? C.danger : C.border}
                strokeDasharray="6 5"
                strokeWidth={3}
              />
              <Label x={120} y={190}>
                {boundary ? "窗口=0" : "窗口足够"}
              </Label>
              <Label y={344}>
                {frame === 3 && !value
                  ? "ACK到达：Nagle等待解除"
                  : value
                    ? "NODELAY：移除Nagle等待"
                    : "NODELAY=0：暂缓小段"}
              </Label>
              <Label y={378}>窗口/拥塞/调度仍可延迟发送</Label>
            </>
          )}
          {item.id === "sctp" && (
            <>
              <Label y={65}>本端出站流 对端入站上限</Label>
              {Array.from({ length: 8 }, (_, i) => (
                <g key={i}>
                  <rect
                    x={30}
                    y={85 + i * 30}
                    width={40}
                    height={20}
                    fill={i < value ? C.accent : C.elevated}
                  />
                  <rect
                    x={250}
                    y={85 + i * 30}
                    width={40}
                    height={20}
                    fill={i < m.peerStreams ? C.accent : C.elevated}
                  />
                  {i < m.streams && m.applied && (
                    <Arrow x1={70} y1={95 + i * 30} x2={250} y2={95 + i * 30} />
                  )}
                </g>
              ))}
              <Label y={355}>
                协商后流数：{m.applied ? m.streams : "等待建立关联"}
              </Label>
              <Label y={378}>只画一方向，不是TCP字节流</Label>
            </>
          )}
          {item.id === "flags" && (
            <>
              <Label x={20} y={70}>
                fd=3
              </Label>
              <Label x={230} y={70}>
                dup→4
              </Label>
              <Arrow x1={45} y1={85} x2={120} y2={150} />
              <Arrow x1={255} y1={85} x2={200} y2={150} />
              <rect
                x={30}
                y={150}
                width={260}
                height={112}
                fill={C.elevated}
                stroke={C.accent}
              />
              <Label x={40} y={180}>
                同一个打开文件描述对象
              </Label>
              <rect
                x={50}
                y={200}
                width={40}
                height={35}
                fill={m.applied && value ? C.accent : C.bg}
              />
              <rect
                x={190}
                y={200}
                width={40}
                height={35}
                fill={m.applied && boundary ? C.bg : C.accent}
              />
              <Label x={20} y={289}>
                NONBLOCK
              </Label>
              <Label x={175} y={289}>
                其他状态位
              </Label>
              <Label y={340}>FD_CLOEXEC分别属于fd 3和4</Label>
              <Label y={378}>不是setsockopt的另一个level</Label>
            </>
          )}
        </svg>
      </div>
      <div className="mt-3 text-sm" aria-live="polite" data-output>
        <h4 className="font-semibold">7.12 小结：把预测与对象的实际变化对照</h4>
        <p>
          预测：
          {prediction === "yes"
            ? "会 / 可以"
            : prediction === "no"
              ? "不会 / 不可以"
              : prediction === "depends"
                ? "取决于状态或平台"
                : "尚未选择"}
          。当前第{frame + 1}帧。
        </p>
        <p>
          {m.applied
            ? m.output
            : "参数已就绪；推进到操作结果，查看真实对象的状态变化。"}
        </p>
      </div>
      <div className="socket-controls">
        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(STEPS.map((s) => [s.label, s.caption]))}
          reset={{ label: "重置参数、预测与时间线", onClick: reset }}
          caption="参数变化会停止播放并回到首帧；减少动态效果偏好下仅手动步进。"
        />
      </div>
    </section>
  );
}
