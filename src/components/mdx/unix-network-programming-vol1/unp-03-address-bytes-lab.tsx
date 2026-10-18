"use client";

import { useEffect, useState } from "react";
import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const STEPS: readonly TeachingStep[] = [
  { label: "input", caption: "① 输入：核对对象、容量和请求量" },
  { label: "first", caption: "② 第一次转换 / 拷贝 / 短计数" },
  { label: "next", caption: "③ 检查结果；循环推进指针" },
  { label: "again", caption: "④ 继续处理，或在错误 / EOF 停止" },
  { label: "four", caption: "⑤ 继续累计；完成后不再移动指针" },
  { label: "five", caption: "⑥ 必要时再处理一个字节" },
  { label: "result", caption: "⑦ 核对字节与返回值，不猜测完整性" },
];
const LABELS = Object.fromEntries(STEPS.map((s) => [s.label, s.caption!]));
type ABI = "linux-le" | "macos-le";
type Mode = "address" | "capacity" | "io";
type Operation = "readn" | "writen" | "readline" | "UDP";
const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, "0");

/** Pure teaching model. Not a kernel oracle: independently verified in batch-35 evidence. */
export function addressModel(
  address: string,
  port: number,
  abi: ABI,
  skip: boolean,
  dirty: boolean,
) {
  const parts = address.split(".");
  const valid =
    parts.length === 4 &&
    parts.every((p) => /^(0|[1-9][0-9]{0,2})$/.test(p) && Number(p) <= 255);
  const portValid = Number.isInteger(port) && port >= 0 && port <= 65535;
  const octets = valid ? parts.map(Number) : [];
  const network = [Math.floor(port / 256), port % 256];
  const stored = skip ? [...network].reverse() : network;
  const prefix = abi === "macos-le" ? [16, 2] : [2, 0];
  const padding = dirty
    ? [222, 173, 190, 239, 0, 0, 0, 0]
    : Array<number>(8).fill(0);
  return {
    valid: valid && portValid,
    octets,
    network,
    stored,
    interpreted: stored[0] * 256 + stored[1],
    bytes: [...prefix, ...stored, ...octets, ...padding],
  };
}

export function capacityModel(capacity: number, address: string, port = 8080) {
  // ASCII IPv4 text needs its terminating NUL; sockaddr return length can exceed capacity.
  return {
    addressLength: 16,
    copied: Math.min(capacity, 16),
    truncated: capacity < 16,
    textRequired: address.length + 1,
    textOK: capacity >= address.length + 1,
    endpointRequired: address.length + 1 + String(port).length + 1,
    endpointOK: capacity >= address.length + 1 + String(port).length + 1,
  };
}

export function ioModel(
  operation: Operation,
  chunk: number,
  early: boolean,
  frame: number,
) {
  const target = operation === "readline" ? 3 : 6; // AB\nCDE: line ends after byte 3.
  const done =
    operation === "UDP"
      ? 0
      : Math.min(target, frame * chunk, early ? 2 : target);
  const stopped = early && frame > Math.ceil(2 / chunk) && operation !== "UDP";
  const status =
    frame === 0
      ? "尚未调用"
      : operation === "UDP"
        ? "recvfrom = 0：完整空数据报"
        : stopped
          ? operation === "writen"
            ? "EPIPE：失败，先前已写 2 字节"
            : "EOF：返回已读 2 字节"
          : done === target
            ? `完成：返回 ${target}`
            : `短计数：累计 ${done}，尚需 ${target - done}`;
  return { target, done, stopped, status };
}

function Cell({
  x,
  y,
  value,
  active = false,
  danger = false,
}: {
  x: number;
  y: number;
  value: string;
  active?: boolean;
  danger?: boolean;
}) {
  const color = danger ? C.danger : active ? C.accent : C.border;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="54"
        height="34"
        rx="4"
        fill={C.bg}
        stroke={color}
        strokeWidth={active || danger ? 2.5 : 1}
      />
      <text x={x + 27} y={y + 23} textAnchor="middle" fill={C.text}>
        {value}
      </text>
    </g>
  );
}

export function Unp03AddressBytesLab() {
  const [mode, setMode] = useState<Mode>("address");
  const [address, setAddress] = useState("192.168.1.1");
  const [port, setPort] = useState(8080);
  const [abi, setABI] = useState<ABI>("macos-le");
  const [skip, setSkip] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [capacity, setCapacity] = useState(16);
  const [operation, setOperation] = useState<Operation>("readn");
  const [chunk, setChunk] = useState(2);
  const [early, setEarly] = useState(false);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const clock = { tick: 0 };
      STEPS.forEach((step, i) => {
        tl.label(step.label, i * TEACHING_BEAT_MS);
        tl.add(
          clock,
          { tick: [i, i + 1], duration: TEACHING_BEAT_MS },
          i * TEACHING_BEAT_MS,
        );
      });
    },
  });
  const { reducedMotion, isPlaying, pause } = timeline;
  useEffect(() => {
    if (reducedMotion && isPlaying) pause();
  }, [reducedMotion, isPlaying, pause]);
  const rewind = () => {
    timeline.pause();
    timeline.goToStep(0);
  };
  const reset = () => {
    rewind();
    setMode("address");
    setAddress("192.168.1.1");
    setPort(8080);
    setABI("macos-le");
    setSkip(false);
    setDirty(false);
    setCapacity(16);
    setOperation("readn");
    setChunk(2);
    setEarly(false);
  };
  const a = addressModel(address, port, abi, skip, dirty);
  const b = capacityModel(capacity, address, port);
  const frame = timeline.currentStep;
  const io = ioModel(operation, chunk, early, frame);
  const capacityDescription = [
    `调用前容量 ${capacity} 字节`,
    frame === 0
      ? "独立的取地址容量模型尚未调用"
      : `独立的取地址容量模型：复制 ${b.copied} 字节，返回长度 16`,
    !a.valid
      ? "非法 IPv4 文本：inet_pton = 0；不调用 inet_ntop，不格式化端点，不消费输出"
      : frame === 0
        ? `尚未调用 inet_ntop，也未格式化端点；预测地址文本需 ${b.textRequired} 字节，完整 IPv4 端点需 ${b.endpointRequired} 字节`
        : `inet_ntop 模型：地址文本需 ${b.textRequired} 字节，${b.textOK ? "返回 buf，含末尾 NUL" : "NULL / ENOSPC；勿读 buf"}；自写 IPv4 端点格式需 ${b.endpointRequired} 字节，${b.endpointOK ? "空间足够" : "空间不足"}`,
  ].join("；");
  const control =
    "min-h-11 min-w-11 w-full rounded-control border border-border bg-surface px-2 text-sm text-primary";
  const caption =
    mode === "address"
      ? "先预测 8080 漏掉 htons 后，连接线是否交叉？端口尺是否从 8080 移到 36895？"
      : mode === "capacity"
        ? "先预测容量 4：地址能复制几字节、返回长度是多少？文本输出可以当作成功吗？"
        : "先预测：请求 6 字节，每次仅处理 2 字节，需要几次成功调用？提前 EOF 后指针会停在哪？";

  return (
    <section
      data-testid="unp03-lab"
      data-visual-kind="unp-03-address-bytes"
      aria-label="地址字节、输出容量与短计数实验"
      className="not-prose my-8 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-5"
    >
      <style>{`
      [data-unp03-exercises] button, [data-testid="unp03-lab"] button, [data-testid="unp03-lab"] select { min-height:44px; min-width:44px; }
      [data-testid="unp03-lab"] input[type=range] { height:44px !important; min-width:44px; }
      [data-testid="unp03-lab"] input[type=checkbox] { width:44px; height:44px; flex-shrink:0; }
      [data-testid="unp03-lab"] button:focus-visible, [data-testid="unp03-lab"] input:focus-visible, [data-testid="unp03-lab"] select:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
      [data-testid="unp03-timeline-controls"] > div > div { flex-wrap:wrap; }
      [data-testid="unp03-lab"] svg { width:280px; max-width:100%; height:auto; display:block; margin-inline:auto; }
      [data-testid="unp03-lab"] svg text { font-size:16px; }
    `}</style>
      <h3 className="text-base font-semibold text-primary">
        套接字编程简介：地址、容量与进度
      </h3>
      <p className="mt-2 text-sm leading-6 text-secondary">
        确定性教学模型，不发起网络请求。macOS 与 Linux
        均按小端示例；结构体不是线上首部。每次改参数暂停并回首帧。
      </p>
      <div
        role="group"
        aria-label="实验模式"
        className="my-3 flex flex-wrap gap-2"
      >
        {(
          [
            ["address", "地址字节"],
            ["capacity", "长度与缓冲区"],
            ["io", "短读写"],
          ] as const
        ).map(([id, name]) => (
          <button
            key={id}
            type="button"
            aria-pressed={mode === id}
            className="rounded-control border border-border px-3 text-sm text-primary aria-pressed:border-accent"
            onClick={() => {
              rewind();
              setMode(id);
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="my-3 text-sm leading-6 text-primary">{caption}</p>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <div className="min-w-0 space-y-3">
          {mode !== "io" && (
            <label className="block text-sm text-secondary">
              IPv4 文本
              <select
                className={control}
                value={address}
                onChange={(e) => {
                  rewind();
                  setAddress(e.target.value);
                }}
              >
                {[
                  "192.168.1.1",
                  "10.0.0.7",
                  "172.16.254.3",
                  "255.255.255.255",
                  "999.0.0.1",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          )}
          {mode === "address" && (
            <>
              <label className="block text-sm text-secondary">
                端口
                <select
                  className={control}
                  value={port}
                  onChange={(e) => {
                    rewind();
                    setPort(Number(e.target.value));
                  }}
                >
                  {[0, 80, 8080, 49152, 65535].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm text-secondary">
                目标 ABI
                <select
                  className={control}
                  value={abi}
                  onChange={(e) => {
                    rewind();
                    setABI(e.target.value as ABI);
                  }}
                >
                  <option value="macos-le">macOS / BSD 小端示例</option>
                  <option value="linux-le">Linux 小端示例</option>
                </select>
              </label>
              <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
                <input
                  type="checkbox"
                  checked={skip}
                  onChange={(e) => {
                    rewind();
                    setSkip(e.target.checked);
                  }}
                />
                端口忘记 htons
              </label>
              <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
                <input
                  type="checkbox"
                  checked={dirty}
                  onChange={(e) => {
                    rewind();
                    setDirty(e.target.checked);
                  }}
                />
                保留字节非零（不是连接故障）
              </label>
              <p className="text-sm leading-6 text-secondary">
                套接字地址结构：每格 1 字节，偏移 0–15。第一行：
                {abi === "macos-le"
                  ? "sin_len / sin_family / port / port"
                  : "family / family / port / port"}
                ；第二行是 sin_addr；末两行为保留区。
              </p>
              <p className="text-sm leading-6 text-secondary">
                字节操纵函数：填充变化只改变对象表示。memcmp 比较全部 16
                字节，可能判不等；比较端点应检查 family、port、addr。复制 0A 00
                00 07 必须按 4 字节 memcpy，不能遇 00 就停。
              </p>
              <p className="text-sm leading-6 text-secondary">
                字节排序函数：先预测高低字节应连到哪一端，再打开漏
                htons；观察连线和端口尺，而不只看整数标签。
              </p>
              <p className="text-sm leading-6 text-secondary">
                inet_aton、inet_addr和inet_ntoa函数的对照：广播输入的四个 FF
                是合法数据，不能把全 1
                一律当失败；非法输入则停止填格。本图使用严格点分十进制，不运行历史解析器，也不模拟
                inet_ntoa 内部缓冲区的覆盖。
              </p>
            </>
          )}
          {mode === "capacity" && (
            <>
              <label className="block text-sm text-secondary">
                调用前容量：{capacity} 字节
                <input
                  aria-label="输出缓冲区容量"
                  className="block w-full accent-accent"
                  type="range"
                  min="0"
                  max="20"
                  value={capacity}
                  onChange={(e) => {
                    rewind();
                    setCapacity(Number(e.target.value));
                  }}
                />
              </label>
              <p className="text-sm leading-6 text-secondary">
                值-结果参数（上图）：getsockname
                的成功截断模型，前提是缓冲区和指针合法。实际地址长
                16；容量小时只填入 min(容量, 16) 字节，但返回长度仍为
                16。先检查调用返回值，再检查长度，不能把缺失字段当成零。
              </p>
              <p className="text-sm leading-6 text-secondary">
                inet_pton和inet_ntop函数（中图）：先核对解析状态，再输出文本；需要文本长度
                + 1（NUL）。缓冲区不足返回 NULL /
                ENOSPC；不是成功的短字符串，不得消费缓冲区内容。这里的容量指真实分配空间，不能谎报更大的数。
              </p>
              <p className="text-sm leading-6 text-secondary">
                sock_ntop和相关函数（下图）：以自写 IPv4 格式化契约计算
                {address}:{port}，需 {b.endpointRequired} 字节（含分隔符和
                NUL）。
                调整容量，对比“地址文本够用”与“完整端点够用”是否同时成立；端口沿用地址模式设置。
                这里不执行原书包装器，也不推定其内部缓冲所有权。IPv6
                还需方括号，不能沿用这条 IPv4 长度公式。
              </p>
            </>
          )}
          {mode === "io" && (
            <>
              <label className="block text-sm text-secondary">
                调用契约
                <select
                  className={control}
                  value={operation}
                  onChange={(e) => {
                    rewind();
                    setOperation(e.target.value as Operation);
                  }}
                >
                  {(["readn", "writen", "readline", "UDP"] as const).map(
                    (s) => (
                      <option key={s}>{s}</option>
                    ),
                  )}
                </select>
              </label>
              <label className="block text-sm text-secondary">
                每次正计数上限
                <select
                  className={control}
                  value={chunk}
                  onChange={(e) => {
                    rewind();
                    setChunk(Number(e.target.value));
                  }}
                >
                  {[1, 2, 4].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
                <input
                  type="checkbox"
                  disabled={operation === "UDP"}
                  checked={early}
                  onChange={(e) => {
                    rewind();
                    setEarly(e.target.checked);
                  }}
                />
                2 字节后 EOF；写入则为 EPIPE
              </label>
              <p className="text-sm leading-6 text-secondary">
                readn、writen和readline函数：数据是 AB\nCDE，共 6 字节。readn /
                writen 目标 6；readline 遇第 3
                字节换行即停（内部缓冲可能预读，图示是交给调用方的字节）。帧 0
                尚未调用，后续每帧最多一次进展。
              </p>
              <p className="text-sm leading-6 text-secondary">
                正长度 TCP read 返回 0 才是有序 EOF；UDP 的 0
                是一次空数据报。EINTR 重试原位置；EAGAIN
                应保存进度并等待就绪，不能忙循环。写端 EPIPE 还可能伴随
                SIGPIPE，图示假设信号已妥善处理。
              </p>
            </>
          )}
        </div>
        <div className="min-w-0">
          {mode === "address" && (
            <svg
              viewBox="0 0 280 480"
              role="img"
              aria-label={`16 字节地址结构；${abi}；端口 ${port}，读作 ${a.interpreted}；${a.valid ? "解析有效" : "非法地址，停止填充"}`}
            >
              <text x="8" y="24" fill={C.text}>
                主机小端：低位在前
              </text>
              <Cell x={40} y={38} value={hex(port % 256)} active />
              <Cell x={182} y={38} value={hex(Math.floor(port / 256))} active />
              {[0, 1].map((i) => (
                <path
                  key={i}
                  d={`M ${i === 0 ? 67 : 209} 72 L ${skip ? (i === 0 ? 67 : 209) : i === 0 ? 209 : 67} 120`}
                  stroke={skip ? C.danger : C.accent}
                  strokeWidth="3"
                  fill="none"
                />
              ))}
              <Cell
                x={40}
                y={120}
                value={hex(a.stored[0])}
                active
                danger={skip}
              />
              <Cell
                x={182}
                y={120}
                value={hex(a.stored[1])}
                active
                danger={skip}
              />
              <text x="8" y="180" fill={C.text}>
                内存偏移 0 → 15
              </text>
              {Array.from({ length: 16 }, (_, i) => (
                <Cell
                  key={i}
                  x={8 + (i % 4) * 66}
                  y={194 + Math.floor(i / 4) * 44}
                  value={!a.valid ? "—" : hex(a.bytes[i])}
                  active={
                    a.valid &&
                    (frame === 0
                      ? i < 2
                      : frame === 1
                        ? i >= 2 && i < 4
                        : frame === 2
                          ? i >= 4 && i < 8
                          : frame === 3
                            ? i >= 8
                            : i >= 2 && i < 8)
                  }
                  danger={a.valid && skip && i >= 2 && i < 4}
                />
              ))}
              <text x="8" y="392" fill={C.text}>
                网络序解释：{a.valid ? a.interpreted : "停止"}
              </text>
              <line
                x1="12"
                y1="420"
                x2="264"
                y2="420"
                stroke={C.border}
                strokeWidth="6"
              />
              <circle
                cx={12 + (port / 65535) * 252}
                cy="420"
                r="7"
                fill={C.bg}
                stroke={C.accent}
                strokeWidth="2"
              />
              {a.valid && (
                <circle
                  cx={12 + (a.interpreted / 65535) * 252}
                  cy="420"
                  r="4"
                  fill={skip ? C.danger : C.accent}
                />
              )}
              <text x="8" y="450" fill={C.muted}>
                0
              </text>
              <text x="264" y="450" textAnchor="end" fill={C.muted}>
                65535
              </text>
              <text x="8" y="476" fill={C.muted}>
                空心 = 输入；实心 = 解释值
              </text>
            </svg>
          )}
          {mode === "capacity" && (
            <svg
              viewBox="0 0 280 660"
              role="img"
              aria-label={capacityDescription}
            >
              <text x="8" y="24" fill={C.text}>
                地址结构：16 字节
              </text>
              {Array.from({ length: 16 }, (_, i) => (
                <Cell
                  key={i}
                  x={8 + (i % 4) * 66}
                  y={38 + Math.floor(i / 4) * 42}
                  value={frame === 0 ? "·" : i < b.copied ? hex(i) : "×"}
                  active={frame > 0 && i < b.copied}
                  danger={frame > 0 && i >= b.copied}
                />
              ))}
              <text x="8" y="231" fill={C.text}>
                {frame === 0
                  ? `传入 len = ${capacity}`
                  : `返回 len = 16；复制 ${b.copied}`}
              </text>
              <text x="8" y="261" fill={C.muted}>
                格内数字为偏移，不是数据
              </text>
              <text x="8" y="306" fill={C.text}>
                地址文本 + NUL
              </text>
              <rect
                x="8"
                y="323"
                width={b.textRequired * 12}
                height="28"
                fill="none"
                stroke={C.accent}
                strokeWidth="2"
              />
              <rect
                x="8"
                y="361"
                width={capacity * 12}
                height="28"
                fill={C.border}
              />
              <line
                x1={8 + b.textRequired * 12}
                x2={8 + b.textRequired * 12}
                y1="318"
                y2="400"
                stroke={C.accent}
                strokeDasharray="4 3"
              />
              <text x="8" y="427" fill={C.text}>
                上：需要 {b.textRequired}；下：容量 {capacity}
              </text>
              <text
                x="8"
                y="459"
                fill={a.valid && b.textOK ? C.accent : C.danger}
              >
                {!a.valid
                  ? "先修复非法输入：pton = 0"
                  : frame === 0
                    ? "尚未调用 inet_ntop"
                    : b.textOK
                      ? "返回 buf，含末尾 NUL"
                      : "NULL / ENOSPC；勿读 buf"}
              </text>
              <text x="8" y="497" fill={C.text}>
                IPv4 地址:端口 + NUL
              </text>
              <rect
                x="8"
                y="514"
                width={b.endpointRequired * 12}
                height="28"
                fill="none"
                stroke={C.accent}
                strokeWidth="2"
              />
              <rect
                x="8"
                y="552"
                width={capacity * 12}
                height="28"
                fill={C.border}
              />
              <line
                x1={8 + b.endpointRequired * 12}
                x2={8 + b.endpointRequired * 12}
                y1="509"
                y2="589"
                stroke={C.accent}
                strokeDasharray="4 3"
              />
              <text x="8" y="611" fill={C.text}>
                上：需要 {b.endpointRequired}；下：容量 {capacity}
              </text>
              <text
                x="8"
                y="643"
                fill={a.valid && b.endpointOK ? C.accent : C.danger}
              >
                {!a.valid
                  ? "非法地址：不格式化端点"
                  : frame === 0
                    ? "预测：后缀能否放得下？"
                    : b.endpointOK
                      ? "自写端点格式：空间足够"
                      : "自写端点格式：空间不足"}
              </text>
            </svg>
          )}
          {mode === "io" && (
            <svg
              viewBox="0 0 280 420"
              role="img"
              aria-label={`${operation}；帧 ${frame}；已处理 ${io.done}，目标 ${io.target}；${io.status}`}
            >
              <text x="8" y="24" fill={C.text}>
                {operation === "UDP"
                  ? "一个数据报，载荷为零"
                  : "输入字节：AB\\nCDE"}
              </text>
              {operation === "UDP" ? (
                <g transform={`translate(0 ${frame > 0 ? 120 : 0})`}>
                  <path
                    d="M 30 55 H 250 V 110 H 30 Z M 30 55 L 140 88 L 250 55"
                    fill="none"
                    stroke={C.accent}
                    strokeWidth="3"
                  />
                  <text x="140" y="105" textAnchor="middle" fill={C.text}>
                    0 字节
                  </text>
                </g>
              ) : (
                <>
                  {["41", "42", "0A", "43", "44", "45"].map((v, i) => (
                    <Cell
                      key={i}
                      x={36 + (i % 3) * 76}
                      y={45 + Math.floor(i / 3) * 48}
                      value={v}
                      active={i < io.done}
                      danger={io.stopped && i >= io.done}
                    />
                  ))}
                  <text x="8" y="172" fill={C.text}>
                    目的缓冲区 / 发送进度
                  </text>
                  <rect
                    x="12"
                    y="194"
                    width="252"
                    height="40"
                    fill="none"
                    stroke={C.border}
                  />
                  <rect
                    x="12"
                    y="194"
                    width={io.done * 42}
                    height="40"
                    fill={C.accent}
                  />
                  <path
                    d={`M ${12 + io.done * 42} 240 v 20 l -6 -8 m 6 8 l 6 -8`}
                    fill="none"
                    stroke={io.stopped ? C.danger : C.text}
                    strokeWidth="2"
                  />
                  <text x="8" y="288" fill={C.text}>
                    ptr + {io.done}；目标 {io.target}
                  </text>
                </>
              )}
              <text x="8" y="332" fill={C.text}>
                {operation === "UDP"
                  ? frame
                    ? "收到完整空数据报，不是 EOF"
                    : "等待接收"
                  : io.stopped
                    ? "停止：不能声称完整"
                    : io.done === io.target
                      ? "达到契约终点"
                      : "继续：还未达到契约终点"}
              </text>
              <text x="8" y="370" fill={C.muted}>
                {operation === "UDP"
                  ? "返回 0 ≠ TCP read 的 0"
                  : "填充宽度 = 已处理字节数"}
              </text>
            </svg>
          )}
        </div>
      </div>
      <div
        data-testid="unp03-state-summary"
        role="status"
        className="mt-4 rounded-control border border-border p-3 text-sm leading-6 text-primary"
      >
        {mode === "address"
          ? !a.valid
            ? "inet_pton = 0：非法文本，不能使用目的地址。"
            : `字段字节 ${a.stored.map(hex).join(" ")} / ${a.octets.map(hex).join(" ")}；网络序解释端口 ${a.interpreted}。${port === 0 ? "端口 0：绑定时常用于请求临时端口，不是普通远端服务端口。" : ""}`
          : mode === "capacity"
            ? `返回长度与写入量分开核验：${frame ? `长度 16，最多写入 ${b.copied}` : `调用前容量 ${capacity}`}。`
            : io.status}
      </div>
      <div data-testid="unp03-timeline-controls">
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption={
            reducedMotion
              ? "已启用减少动态效果：使用单步或拖动进度；不会自动播放。"
              : "播放 / 暂停、前后单步或拖动进度；重置恢复全部模式参数。"
          }
          reset={{
            label: "重置实验",
            ariaLabel: "重置第3章地址字节序实验",
            onClick: reset,
          }}
        />
      </div>
      <div
        className="sr-only"
        data-testid="unp03-model"
        data-step={frame}
        data-playing={timeline.isPlaying}
        data-mode={mode}
        data-address={address}
        data-port={port}
        data-abi={abi}
        data-capacity={capacity}
        data-operation={operation}
        data-chunk={chunk}
        data-early={early}
        data-skip-htons={skip}
        data-nonzero-reserved-bytes={dirty}
        data-wire-port-value={a.interpreted}
      >
        教学模型状态；不是独立 oracle。
      </div>
    </section>
  );
}
