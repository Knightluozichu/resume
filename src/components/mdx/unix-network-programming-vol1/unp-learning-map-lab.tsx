"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TimelineControls, TEACHING_BEAT_MS } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

export const learningTracks = [
  {
    id: "base",
    name: "TCP 消息边界",
    chapters: [2, 3, 4, 5],
    titles: ["传输语义", "地址与读写", "建立连接", "客户/服务器"],
    reasons: ["语义约束接口", "端点先于连接", "连接不等于消息"],
    gap: 2,
    missing: "第 2 章字节流 → 第 5 章应用分帧",
    repair: "以长度 4 累积字节，不把一次 recv 当成一条消息。",
  },
  {
    id: "udp",
    name: "UDP 交付核验",
    chapters: [2, 3, 8, 22],
    titles: ["传输语义", "地址结构", "UDP 基础", "高级 UDP"],
    reasons: ["区分流与报文", "提供目标地址", "应用检测缺失"],
    gap: 2,
    missing: "第 8 章不保证交付 → 第 22 章观测与超时",
    repair: "记录期望序号 1、2，截止时间仅判定未完成，不断言永远丢失。",
  },
  {
    id: "design",
    name: "非阻塞服务设计",
    chapters: [4, 6, 16, 30],
    titles: ["TCP 端点", "就绪通知", "非阻塞 I/O", "服务设计"],
    reasons: ["监视已建端点", "就绪不是读满", "保存连接状态"],
    gap: 1,
    missing: "第 6 章就绪语义 → 第 16 章非阻塞读写",
    repair: "EAGAIN 时保留偏移与连接，等待下一次就绪；线程同步另读第 26 章。",
  },
] as const;
type Track = (typeof learningTracks)[number]["id"];
const steps: readonly TeachingStep[] = [
  { label: "api", caption: "1 · 请求与契约" },
  { label: "first", caption: "2 · 首批到达" },
  { label: "boundary", caption: "3 · 边界事件" },
  { label: "verdict", caption: "4 · 核验结果" },
];
const labels = Object.fromEntries(
  steps.map((s) => [s.label, s.caption ?? s.label]),
);

/** 固定教学事件，非真实网络仿真；缺口只改变处理规则，不篡改输入。 */
export function learningMapSnapshot(
  track: Track,
  fault: boolean,
  frame: number,
) {
  const f = Math.max(0, Math.min(3, Math.floor(frame)));
  const received =
    f === 0
      ? 0
      : track === "udp"
        ? 2
        : track === "design"
          ? f === 3 && !fault
            ? 4
            : 2
          : f >= 2
            ? 4
            : 2;
  const records =
    track === "base" && fault
      ? f >= 2
        ? ["AB", "CD"]
        : f === 1
          ? ["AB"]
          : []
      : received === 4
        ? ["ABCD"]
        : track === "udp" && fault && f >= 1
          ? ["AB"]
          : [];
  const closed = track === "design" && fault && f >= 2;
  const events =
    track === "base"
      ? [
          "send 报告 4 字节；对端处理尚未知",
          "recv 返回 AB（2 字节）",
          "下一次 recv 返回 CD（2 字节）",
          "检查长度 4 的应用消息",
        ]
      : track === "udp"
        ? [
            "发送序号 1:AB、2:CD；本地均成功",
            "接收序号 1:AB；序号 2 本轮未到达",
            "固定场景：序号 2 在途中丢失",
            "到达预设截止时间，检查序号集合",
          ]
        : [
            "已建连接：就绪通知到达",
            "非阻塞 recv 返回 AB（2 字节）",
            "继续 recv 返回 EAGAIN，不是 EOF",
            "CD 到达；存活端点可再次就绪",
          ];
  const verdict =
    f < 3
      ? "待核验"
      : track === "udp"
        ? fault
          ? "误报完成：只收到序号 1"
          : "未完成：截止时缺序号 2"
        : closed
          ? "错误关闭：CD 无法交给本处理器"
          : track === "base" && fault
            ? "错误拆分：2 条半消息"
            : "完成：1 条 ABCD";
  return {
    received,
    records,
    closed,
    event: events[f],
    verdict,
    missingSequence: track === "udp" && f >= 3 && !fault,
  };
}

export function UnpLearningMapLab() {
  // Keep the experiment root and its controls stable across reset.
  const diagramRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<"stacked" | "wide">("stacked");
  useEffect(() => {
    const element = diagramRef.current;
    if (!element) return;
    const update = () =>
      setLayout(
        element.getBoundingClientRect().width < 780 ? "stacked" : "wide",
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const stacked = layout === "stacked";
  const [track, setTrack] = useState<Track>("base");
  const [fault, setFault] = useState(false);
  const id = useId();
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      // 时钟只驱动 frame；React 统一绘制图形，避免 SVG 样式与 anime 相互覆盖。
      const clock = { beat: 0 };
      steps.forEach((step, i) => {
        tl.label(step.label, i * TEACHING_BEAT_MS);
        tl.add(
          clock,
          { beat: i + 1, duration: TEACHING_BEAT_MS, ease: "linear" },
          i * TEACHING_BEAT_MS,
        );
      });
    },
  });
  const { reducedMotion, pause } = timeline;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  const selected = learningTracks.find((item) => item.id === track)!;
  const frame = timeline.currentStep;
  const state = learningMapSnapshot(track, fault, frame);
  const baseline = learningMapSnapshot(track, false, frame);
  const rewind = () => {
    timeline.pause();
    timeline.goToStep(0);
  };
  const reset = () => {
    // pause cancels advancement; seek to the first label also resets progress.
    // Reuse the clock/root rather than leaving observers with a detached tree.
    rewind();
    setTrack("base");
    setFault(false);
  };
  const parts = [
    { label: "I · 简介与 TCP/IP", units: [1, 2] },
    {
      label: "II · 基本套接字",
      units: Array.from({ length: 9 }, (_, i) => i + 3),
    },
    {
      label: "III · 高级套接字",
      units: Array.from({ length: 20 }, (_, i) => i + 12),
    },
    { label: "附录 · 跨路线参考", units: ["A", "B", "C", "D", "E"] },
  ];
  return (
    <figure
      className="unp-learning-map-lab not-prose my-8 min-w-0 max-w-full"
      data-testid="unp-learning-map-lab"
      data-visual-kind="unp-learning-route"
      data-layout={layout}
      data-track={track}
      data-fault={fault}
      data-step={steps[frame].label}
      data-frame={frame}
      data-playing={timeline.isPlaying}
      data-progress={timeline.progress}
      data-received={state.received}
      data-records={state.records.length}
      data-closed={state.closed}
    >
      <div className="min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-6">
        <figcaption className="text-lg font-semibold text-primary">
          从先修知识到可核验证据
        </figcaption>
        <p className="mt-2 text-sm text-secondary">
          31 章 + 5 附录 = 36
          单元。实线箭头是本课建议的先修关系，不是原书规定的唯一顺序；缺口表示错误处理规则，不表示知识能让网络断线。
        </p>
        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="选择学习轨道"
        >
          {learningTracks.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={track === item.id}
              onClick={() => {
                rewind();
                setTrack(item.id);
                setFault(false);
              }}
            >
              {item.name}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={fault}
            onClick={() => {
              rewind();
              setFault((v) => !v);
            }}
          >
            {fault ? "恢复先修与处理规则" : "注入先修缺口"}
          </button>
        </div>
        <p className="mt-3 text-sm text-secondary">
          当前依赖：{selected.missing}。{selected.repair}
        </p>
        <p id={`${id}-scroll`} className="mt-3 text-sm text-secondary">
          窄屏按纵向重排：目录节点换行、先修与责任链向下连接，两种规则上下对照。全部图形可随页面向下阅读，不需横向滚动。
        </p>
        <div
          ref={diagramRef}
          className="map-diagram mt-2"
          role="region"
          aria-label="学习地图，窄屏纵向排列全部节点"
          aria-describedby={`${id}-scroll`}
        >
          <svg
            width={stacked ? 280 : 840}
            height={stacked ? 1680 : 690}
            viewBox={stacked ? "0 0 280 1680" : "0 0 840 690"}
            role="img"
            aria-labelledby={`${id}-title ${id}-desc`}
          >
            <title id={`${id}-title`}>
              {`${selected.name}：先修关系、收取字节与应用输出`}
            </title>
            <desc id={`${id}-desc`}>
              上方完整目录位置，中间四章依赖，下方固定事件的正确规则与当前规则对照。
              {state.event}。{state.verdict}。
            </desc>
            <defs>
              <marker
                id={`${id}-arrow`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
              </marker>
            </defs>
            {stacked ? (
              <g data-layout-content="stacked">
                {parts.map((part, row) => {
                  const y = [30, 96, 190, 312][row];
                  return (
                    <g key={part.label} data-part={row}>
                      <text
                        x="12"
                        y={y}
                        fontSize="13"
                        fill="var(--text-primary)"
                      >
                        {part.label}
                      </text>
                      {part.units.map((unit, i) => {
                        const x = 25 + (i % 8) * 32;
                        const cy = y + 24 + Math.floor(i / 8) * 28;
                        const chosen =
                          typeof unit === "number" &&
                          (selected.chapters as readonly number[]).includes(
                            unit,
                          );
                        return (
                          <g key={unit} data-unit={unit}>
                            <circle
                              cx={x}
                              cy={cy}
                              r="12"
                              fill="var(--bg)"
                              stroke={
                                chosen ? "var(--accent)" : "var(--border)"
                              }
                              strokeWidth={chosen ? 3 : 1}
                            />
                            <text
                              x={x}
                              y={cy + 4}
                              textAnchor="middle"
                              fontSize="12"
                              fill={
                                chosen
                                  ? "var(--accent)"
                                  : "var(--text-secondary)"
                              }
                            >
                              {unit}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
                <text x="12" y="374" fontSize="13" fill="var(--text-primary)">
                  建议先修路径 · 箭头给出依赖原因
                </text>
                {selected.chapters.map((chapter, i) => {
                  const y = 410 + i * 76;
                  const gap = fault && selected.gap === i;
                  return (
                    <g key={chapter} data-prerequisite={chapter}>
                      <circle
                        cx="34"
                        cy={y}
                        r="20"
                        fill="var(--bg)"
                        stroke="var(--accent)"
                        strokeWidth="2"
                      />
                      <text
                        x="34"
                        y={y + 5}
                        fontSize="14"
                        textAnchor="middle"
                        fill="var(--text-primary)"
                      >
                        {chapter}
                      </text>
                      <text
                        x="70"
                        y={y + 5}
                        fontSize="13"
                        fill="var(--text-primary)"
                      >
                        {selected.titles[i]}
                      </text>
                      {i < 3 && (
                        <>
                          <path
                            d={`M 34 ${y + 23} v 30`}
                            stroke={gap ? "var(--danger)" : "var(--accent)"}
                            strokeWidth="2"
                            strokeDasharray={gap ? "4 3" : undefined}
                            markerEnd={`url(#${id}-arrow)`}
                          />
                          <text
                            x="70"
                            y={y + 43}
                            fontSize="12"
                            fill={
                              gap ? "var(--danger)" : "var(--text-secondary)"
                            }
                          >
                            {selected.reasons[i]}
                            {gap ? " × 缺口" : ""}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
                <path d="M 12 672 H 268" stroke="var(--border)" />
                <text x="12" y="693" fontSize="13" fill="var(--text-primary)">
                  核验责任链 · 不能跨层推定成功
                </text>
                {[
                  ["应用 API", "返回长度：仅本地调用结果"],
                  ["内核端点", "可读状态：不保证消息完整"],
                  ["协议语义", "流或报文：决定边界与交付承诺"],
                  ["对端观测", "解析 / 业务确认：核对完成条件"],
                ].map(([layer, evidence], i) => (
                  <g key={layer} data-responsibility={i}>
                    <circle
                      cx="24"
                      cy={721 + i * 48}
                      r="5"
                      fill="var(--accent)"
                    />
                    <text
                      x="40"
                      y={725 + i * 48}
                      fontSize="13"
                      fill="var(--text-primary)"
                    >
                      {layer}
                    </text>
                    <text
                      x="40"
                      y={743 + i * 48}
                      fontSize="12"
                      fill="var(--text-secondary)"
                    >
                      {evidence}
                    </text>
                    {i < 3 && (
                      <path
                        d={`M 24 ${731 + i * 48} v 28`}
                        stroke="var(--accent)"
                        markerEnd={`url(#${id}-arrow)`}
                      />
                    )}
                  </g>
                ))}
                <text x="12" y="918" fontSize="13" fill="var(--text-primary)">
                  固定输入 · 两栏不改变网络事件
                </text>
                <text x="12" y="942" fontSize="12" fill="var(--text-secondary)">
                  {track === "udp"
                    ? "#1 AB / #2 CD；#2 本轮丢失"
                    : "长度 4 的 ABCD；分批到达 AB / CD"}
                </text>
                <text x="12" y="976" fontSize="13" fill="var(--text-primary)">
                  当前事件（第 {frame + 1} 帧）
                </text>
                {(state.event.match(/.{1,19}/gu) ?? []).map((line, i) => (
                  <text
                    key={i}
                    x="12"
                    y={998 + i * 18}
                    fontSize="12"
                    fill="var(--text-primary)"
                  >
                    {line}
                  </text>
                ))}
                {[
                  { label: "正确规则", data: baseline },
                  { label: fault ? "缺口规则" : "当前规则", data: state },
                ].map(({ label, data }, row) => (
                  <g
                    key={row}
                    transform={`translate(0 ${1032 + row * 238})`}
                    data-lane={row === 0 ? "baseline" : "current"}
                  >
                    <rect
                      x="8"
                      y="0"
                      width="264"
                      height="224"
                      rx="6"
                      fill="var(--bg)"
                      stroke={
                        row === 1 && fault ? "var(--danger)" : "var(--border)"
                      }
                    />
                    <text
                      x="16"
                      y="24"
                      fontSize="14"
                      fill="var(--text-primary)"
                    >
                      {label}
                    </text>
                    <text
                      x="16"
                      y="48"
                      fontSize="12"
                      fill="var(--text-secondary)"
                    >
                      累计收取 {data.received} / 4 字节
                    </text>
                    {["A", "B", "C", "D"].map((byte, i) => (
                      <g key={byte}>
                        <rect
                          x={16 + i * 38}
                          y="58"
                          width="32"
                          height="28"
                          rx="3"
                          fill={
                            i < data.received
                              ? "var(--bg-elevated)"
                              : "var(--bg)"
                          }
                          stroke={
                            i < data.received
                              ? "var(--accent)"
                              : "var(--border)"
                          }
                        />
                        <text
                          x={32 + i * 38}
                          y="77"
                          fontSize="14"
                          textAnchor="middle"
                          fill="var(--text-primary)"
                        >
                          {i < data.received ? byte : "·"}
                        </text>
                      </g>
                    ))}
                    <text
                      x="16"
                      y="107"
                      fontSize="12"
                      fill="var(--text-secondary)"
                    >
                      应用宣布的完整记录：{data.records.length} 条
                    </text>
                    {data.records.length ? (
                      data.records.map((record, i) => (
                        <g key={i}>
                          <rect
                            x={16 + i * 100}
                            y="116"
                            width="90"
                            height="28"
                            rx="3"
                            fill="var(--bg)"
                            stroke={
                              row === 1 && fault
                                ? "var(--danger)"
                                : "var(--accent)"
                            }
                            strokeWidth="2"
                          />
                          <text
                            x={61 + i * 100}
                            y="135"
                            textAnchor="middle"
                            fontSize="14"
                            fill="var(--text-primary)"
                          >
                            {record}
                          </text>
                        </g>
                      ))
                    ) : (
                      <text
                        x="16"
                        y="135"
                        fontSize="13"
                        fill="var(--text-secondary)"
                      >
                        尚无完整记录
                      </text>
                    )}
                    <text
                      x="16"
                      y="166"
                      fontSize="13"
                      fill={
                        data.closed ? "var(--danger)" : "var(--text-primary)"
                      }
                    >
                      {data.closed ? "端点：错误关闭 ×" : "端点：保留"}
                      {data.missingSequence ? "；缺序号 2" : ""}
                    </text>
                    {(data.verdict.match(/.{1,18}/gu) ?? []).map((line, i) => (
                      <text
                        key={i}
                        x="16"
                        y={189 + i * 18}
                        fontSize="12"
                        fill="var(--text-primary)"
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                ))}
                {steps.map((step, i) => (
                  <g key={step.label}>
                    <circle
                      cx="24"
                      cy={1526 + i * 40}
                      r={frame === i ? 8 : 5}
                      fill={frame === i ? "var(--accent)" : "var(--border)"}
                    />
                    {i < 3 && (
                      <path
                        d={`M 24 ${1538 + i * 40} v 16`}
                        stroke="var(--border)"
                      />
                    )}
                    <text
                      x="44"
                      y={1530 + i * 40}
                      fontSize="12"
                      fill="var(--text-primary)"
                    >
                      {step.caption}
                    </text>
                  </g>
                ))}
              </g>
            ) : (
              <g data-layout-content="wide">
                {parts.map((part, row) => (
                  <g key={part.label}>
                    <text
                      x="16"
                      y={32 + row * 36}
                      fontSize="13"
                      fill="var(--text-primary)"
                    >
                      {part.label}
                    </text>
                    {part.units.map((unit, col) => {
                      const chosen =
                        typeof unit === "number" &&
                        (selected.chapters as readonly number[]).includes(unit);
                      return (
                        <g key={unit}>
                          <circle
                            cx={202 + col * 32}
                            cy={27 + row * 36}
                            r="13"
                            fill="var(--bg)"
                            stroke={chosen ? "var(--accent)" : "var(--border)"}
                            strokeWidth={chosen ? 3 : 1}
                          />
                          <text
                            x={202 + col * 32}
                            y={31 + row * 36}
                            textAnchor="middle"
                            fontSize="12"
                            fill={
                              chosen ? "var(--accent)" : "var(--text-secondary)"
                            }
                          >
                            {unit}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                ))}
                <text x="16" y="178" fontSize="13" fill="var(--text-primary)">
                  建议先修路径 · 先说清箭头原因，再解释错误结果
                </text>
                {selected.chapters.map((chapter, i) => (
                  <g key={chapter}>
                    <circle
                      cx={90 + i * 216}
                      cy="218"
                      r="22"
                      fill="var(--bg)"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <text
                      x={90 + i * 216}
                      y="223"
                      textAnchor="middle"
                      fontSize="14"
                      fill="var(--text-primary)"
                    >
                      {chapter}
                    </text>
                    <text
                      x={90 + i * 216}
                      y="262"
                      textAnchor="middle"
                      fontSize="13"
                      fill="var(--text-primary)"
                    >
                      {selected.titles[i]}
                    </text>
                    {i < 3 && (
                      <>
                        <path
                          d={`M ${116 + i * 216} 218 H ${276 + i * 216}`}
                          stroke={
                            fault && selected.gap === i
                              ? "var(--danger)"
                              : "var(--accent)"
                          }
                          strokeWidth="2"
                          strokeDasharray={
                            fault && selected.gap === i ? "6 5" : undefined
                          }
                          markerEnd={`url(#${id}-arrow)`}
                        />
                        <text
                          x={198 + i * 216}
                          y="198"
                          textAnchor="middle"
                          fontSize="12"
                          fill="var(--text-secondary)"
                        >
                          {selected.reasons[i]}
                        </text>
                        {fault && selected.gap === i && (
                          <path
                            d={`M ${190 + i * 216} 210 l 16 16 m 0 -16 l -16 16`}
                            stroke="var(--danger)"
                            strokeWidth="3"
                          />
                        )}
                      </>
                    )}
                  </g>
                ))}
                <path d="M 16 284 H 824" stroke="var(--border)" />
                {["应用 API", "内核端点", "协议语义", "对端观测"].map(
                  (layer, i) => (
                    <g key={layer}>
                      <text
                        x={32 + i * 206}
                        y="315"
                        fontSize="14"
                        fill="var(--text-primary)"
                      >
                        {layer}
                      </text>
                      {i < 3 && (
                        <path
                          d={`M ${122 + i * 206} 310 h 95`}
                          stroke="var(--accent)"
                          markerEnd={`url(#${id}-arrow)`}
                        />
                      )}
                    </g>
                  ),
                )}
                <text x="20" y="350" fontSize="13" fill="var(--text-secondary)">
                  固定输入：
                  {track === "udp"
                    ? "两报文 #1 AB / #2 CD；#2 本轮丢失"
                    : "一条长度 4 的 ABCD；两次到达 AB / CD"}
                </text>
                <text x="20" y="377" fontSize="13" fill="var(--text-primary)">
                  {state.event}
                </text>
                {(
                  [
                    { label: "正确规则", data: baseline },
                    { label: fault ? "缺口规则" : "当前规则", data: state },
                  ] as const
                ).map(({ label, data }, row) => (
                  <g key={row} data-lane={row === 0 ? "baseline" : "current"}>
                    <text
                      x="20"
                      y={423 + row * 105}
                      fontSize="14"
                      fill="var(--text-primary)"
                    >
                      {label}
                    </text>
                    <text
                      x="116"
                      y={402 + row * 105}
                      fontSize="12"
                      fill="var(--text-secondary)"
                    >
                      本处理器累计收取
                    </text>
                    {Array.from("ABCD").map((byte, i) => (
                      <g key={i}>
                        <rect
                          x={116 + i * 36}
                          y={410 + row * 105}
                          width="32"
                          height="32"
                          rx="3"
                          fill="var(--bg)"
                          stroke={
                            i < data.received
                              ? "var(--accent)"
                              : "var(--border)"
                          }
                          strokeWidth={i < data.received ? 3 : 1}
                          strokeDasharray={
                            i >= data.received ? "3 3" : undefined
                          }
                        />
                        <text
                          x={132 + i * 36}
                          y={432 + row * 105}
                          textAnchor="middle"
                          fontSize="14"
                          fill={
                            i < data.received
                              ? "var(--text-primary)"
                              : "var(--text-secondary)"
                          }
                        >
                          {i < data.received ? byte : "·"}
                        </text>
                      </g>
                    ))}
                    <text
                      x="294"
                      y={402 + row * 105}
                      fontSize="12"
                      fill="var(--text-secondary)"
                    >
                      应用宣布的完整记录
                    </text>
                    {data.records.map((record, i) => (
                      <g key={i}>
                        <rect
                          x={294 + i * 92}
                          y={410 + row * 105}
                          width="82"
                          height="32"
                          rx="3"
                          fill="var(--bg)"
                          stroke={
                            row === 1 && fault
                              ? "var(--danger)"
                              : "var(--accent)"
                          }
                          strokeWidth="2"
                        />
                        <text
                          x={335 + i * 92}
                          y={432 + row * 105}
                          textAnchor="middle"
                          fontSize="14"
                          fill="var(--text-primary)"
                        >
                          {record}
                        </text>
                      </g>
                    ))}
                    {!data.records.length && (
                      <text
                        x="294"
                        y={432 + row * 105}
                        fontSize="13"
                        fill="var(--text-secondary)"
                      >
                        尚无完整记录
                      </text>
                    )}
                    <text
                      x="500"
                      y={425 + row * 105}
                      fontSize="13"
                      fill={
                        row === 1 && fault
                          ? "var(--danger)"
                          : "var(--text-primary)"
                      }
                    >
                      {data.closed ? "端点：错误关闭 ×" : "端点：保留"}
                    </text>
                    {data.missingSequence && (
                      <text
                        x="660"
                        y={425 + row * 105}
                        fontSize="13"
                        fill="var(--warning)"
                      >
                        缺序号 2
                      </text>
                    )}
                    <text
                      x="116"
                      y={466 + row * 105}
                      fontSize="13"
                      fill="var(--text-primary)"
                    >
                      {data.verdict}
                    </text>
                  </g>
                ))}
                {steps.map((s, i) => (
                  <g key={s.label}>
                    <circle
                      cx={70 + i * 216}
                      cy="617"
                      r={frame === i ? 10 : 6}
                      fill={frame === i ? "var(--accent)" : "var(--border)"}
                    />
                    {i < 3 && (
                      <path
                        d={`M ${84 + i * 216} 617 h 187`}
                        stroke="var(--border)"
                      />
                    )}
                    <text
                      x={70 + i * 216}
                      y="650"
                      textAnchor="middle"
                      fontSize="12"
                      fill="var(--text-primary)"
                    >
                      {s.caption}
                    </text>
                  </g>
                ))}
              </g>
            )}
          </svg>
        </div>
        <p
          className="mt-3 text-sm text-secondary"
          aria-live="polite"
          aria-atomic="true"
        >
          第 {frame + 1} 帧：{state.event}。收取 {state.received}/4
          字节，完整记录 {state.records.length} 条。{state.verdict}。
        </p>
        <p className="mt-2 text-sm text-secondary">
          基线：{baseline.verdict}。
          {reducedMotion
            ? "减少动态效果已开启：自动播放禁用，请手动逐步查看。"
            : "默认暂停；切换轨道或缺口会暂停并回到首帧。"}
        </p>
        {/* 共享控件的步点 ol 带 aria-hidden；本章用可访问的等价步点替换，不改共享。 */}
        <ol
          className="map-step-buttons mt-3 flex flex-wrap gap-2"
          aria-label="选择教学时间线步骤"
        >
          {steps.map((s, i) => (
            <li key={s.label}>
              <button
                type="button"
                onClick={() => timeline.goToStep(i)}
                aria-current={frame === i ? "step" : undefined}
              >
                {s.caption}
              </button>
            </li>
          ))}
        </ol>
        <div className="map-timeline">
          <TimelineControls
            timeline={timeline}
            labelText={labels}
            reset={{
              label: "重置路线",
              ariaLabel: "重置轨道、缺口、帧、播放与计时器",
              onClick: reset,
            }}
          />
        </div>
      </div>
      <style jsx global>{`
        .unp-learning-map-lab {
          width: 100%;
          min-width: 0;
        }
        .unp-learning-map-lab button {
          min-width: 44px;
          min-height: 44px;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 14px;
          white-space: normal;
        }
        .unp-learning-map-lab button[aria-pressed="true"],
        .unp-learning-map-lab button[aria-current="step"] {
          border-color: var(--accent);
          color: var(--accent);
        }
        .unp-learning-map-lab .map-diagram {
          width: 100%;
          max-width: 100%;
          border: 1px solid var(--border);
          border-radius: 6px;
        }
        .unp-learning-map-lab .map-diagram svg {
          display: block;
          width: 100%;
          max-width: 840px;
          height: auto;
          margin-inline: auto;
        }
        .unp-learning-map-lab[data-layout="stacked"] .map-diagram svg {
          max-width: 420px;
        }
        .unp-learning-map-lab .map-timeline ol[aria-hidden="true"] {
          display: none;
        }
        .unp-learning-map-lab .map-timeline .justify-center {
          flex-wrap: wrap;
        }
        .unp-learning-map-lab input[type="range"] {
          min-height: 44px;
          height: 44px;
          touch-action: pan-y;
        }
        .unp-learning-map-lab button:focus-visible,
        .unp-learning-map-lab input:focus-visible,
        .unp-learning-map-lab [tabindex="0"]:focus-visible {
          outline: 3px solid var(--accent);
          outline-offset: 2px;
        }
        .unp-learning-map-exercises button {
          min-width: 44px;
          min-height: 44px;
        }
      `}</style>
    </figure>
  );
}
