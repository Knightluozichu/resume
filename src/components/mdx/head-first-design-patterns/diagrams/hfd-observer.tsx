"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdObserverDiagram>：气象站观察者模式动画（Head First 设计模式 · 第2章）。
 *
 * 核心：WeatherData（Subject）维护观察者列表，传感器数据更新时调用 notifyObservers()，
 * 三个显示面板（Observer）自动收到通知并刷新——Subject 不知道面板是谁。
 *
 * 节拍：
 *  ① 三个面板调 registerObserver() 注册，订阅线建立、observers 列表填充
 *  ② 传感器数据到达，WeatherData 状态更新（temp/humidity/pressure）
 *  ③ notifyObservers() 遍历列表，数据包并行飞向所有面板
 *  ④ 各面板调 update() 各自刷新显示
 *  ⑤ 新增第四个面板只需实现接口并注册，WeatherData 代码零改动（松耦合）
 *
 * 首帧基底 opacity≈0.25 淡显整体结构（HEL-292 教训），点播放后逐步点亮。
 */

const VIEW_W = 720;
const VIEW_H = 490;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const EVENT_COLOR = "#E5B567";

const T = TEACHING_BEAT_MS;

// WeatherData（Subject）几何
const SUB_X = 60;
const SUB_Y = 140;
const SUB_W = 210;
const SUB_H = 150;
const SUB_RIGHT = SUB_X + SUB_W; // 270
const SUB_MID_Y = SUB_Y + SUB_H / 2; // 215

// 三个显示面板（Observer）
const PANELS = [
  {
    id: "current",
    name: "当前条件面板",
    cls: "CurrentConditionsDisplay",
    reaction: "显示 26.9°C · 65%",
    y: 130,
    color: "#C792EA",
  },
  {
    id: "stats",
    name: "统计面板",
    cls: "StatisticsDisplay",
    reaction: "max 28.4°C / min 24.1°C",
    y: 225,
    color: "#5AA9E6",
  },
  {
    id: "forecast",
    name: "预报面板",
    cls: "ForecastDisplay",
    reaction: "预报：明日晴朗",
    y: 320,
    color: "#3FB97F",
  },
] as const;

const PANEL_X = 470;
const PANEL_W = 200;
const PANEL_H = 56;

const STEPS: readonly TeachingStep[] = [
  { label: "register", caption: "三个显示面板调 registerObserver() 注册到 WeatherData，订阅线建立" },
  { label: "data", caption: "传感器数据到达，WeatherData（Subject）状态更新：温度、湿度、气压" },
  { label: "notify", caption: "notifyObservers() 遍历订阅列表，把数据并行广播给所有 Observer" },
  { label: "refresh", caption: "每个面板调 update() 各自刷新显示——WeatherData 不知道面板是谁" },
  { label: "extend", caption: "新增面板只需实现接口并注册，WeatherData 代码零改动——松耦合" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdObserverDiagram() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const linesRef = useRef<Record<string, SVGLineElement | null>>({});
  const slotsRef = useRef<Record<string, SVGRectElement | null>>({});
  const sensorRef = useRef<SVGGElement | null>(null);
  const dataRef = useRef<SVGGElement | null>(null);
  const notifyTagRef = useRef<SVGGElement | null>(null);
  const packetRefs = useRef<Record<string, SVGGElement | null>>({});
  const glowRefs = useRef<Record<string, SVGRectElement | null>>({});
  const reactRefs = useRef<Record<string, SVGGElement | null>>({});
  const extraPanelRef = useRef<SVGGElement | null>(null);
  const extraLineRef = useRef<SVGLineElement | null>(null);
  const extraSlotRef = useRef<SVGRectElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① register（0→T）：场景从淡显提亮，订阅线逐条画出，列表槽逐个填充
      tl.add(sceneRef.current!, { opacity: [0.25, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      PANELS.forEach((p, i) => {
        tl.add(linesRef.current[p.id]!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 0.15 + i * T * 0.2);
        tl.add(slotsRef.current[p.id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 0.25 + i * T * 0.2);
      });
      tl.label("register", 0);

      // ② data（T→2T）：传感器徽章浮现，状态值点亮
      tl.add(sensorRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T);
      tl.add(dataRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T * 1.3);
      tl.label("data", T);

      // ③ notify（2T→3T）：notifyObservers 标签浮现，三个数据包并行飞向面板
      tl.add(notifyTagRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      PANELS.forEach((p) => {
        tl.add(
          packetRefs.current[p.id]!,
          {
            opacity: [1, 1],
            x: [SUB_RIGHT, PANEL_X - 14],
            y: [SUB_MID_Y, p.y],
            duration: T * 0.8,
            ease: "inOut(2)",
          },
          T * 2,
        );
      });
      tl.label("notify", T * 2);

      // ④ refresh（3T→4T）：数据包淡出，面板描边点亮，反应徽章浮现
      PANELS.forEach((p, i) => {
        tl.add(packetRefs.current[p.id]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
        tl.add(glowRefs.current[p.id]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3 + i * T * 0.15);
        tl.add(reactRefs.current[p.id]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.1 + i * T * 0.15);
      });
      tl.label("refresh", T * 3);

      // ⑤ extend（4T→5T）：第四个面板浮现并注册，结论点亮
      tl.add(extraPanelRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T * 4);
      tl.add(extraLineRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 4.2);
      tl.add(extraSlotRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.3);
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, T * 4.4);
      tl.label("extend", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="观察者模式动画。WeatherData 作为 Subject 维护观察者列表，当前条件面板、统计面板、预报面板作为 Observer 调 registerObserver 注册订阅。传感器数据到达后 WeatherData 状态更新，notifyObservers 把数据并行广播给三个面板，各面板调 update 各自刷新显示。新增第四个面板只需实现接口并注册，WeatherData 代码零改动。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            观察者模式 · 气象站
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            Subject 维护订阅列表，数据变化时自动通知所有 Observer——一对多、松耦合
          </text>

          {/* 场景基底：WeatherData + 三个面板（首帧淡显 0.25） */}
          <g ref={sceneRef} style={{ opacity: 0.25 }}>
            {/* WeatherData（Subject） */}
            <rect
              x={SUB_X}
              y={SUB_Y}
              width={SUB_W}
              height={SUB_H}
              rx="10"
              fill={ACCENT}
              fillOpacity="0.14"
              stroke={ACCENT}
              strokeWidth="2"
            />
            <text x={SUB_X + SUB_W / 2} y={SUB_Y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              WeatherData
            </text>
            <text x={SUB_X + SUB_W / 2} y={SUB_Y + 40} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              Subject · 数据拥有者
            </text>
            <text x={SUB_X + 14} y={SUB_Y + 62} fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">
              observers: List
            </text>

            {/* 三个面板（Observer） */}
            {PANELS.map((p) => (
              <g key={p.id}>
                <rect
                  x={PANEL_X}
                  y={p.y - PANEL_H / 2}
                  width={PANEL_W}
                  height={PANEL_H}
                  rx="8"
                  fill={p.color}
                  fillOpacity="0.1"
                  stroke={p.color}
                  strokeWidth="1.6"
                />
                <text x={PANEL_X + PANEL_W / 2} y={p.y - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
                  {p.name}
                </text>
                <text x={PANEL_X + PANEL_W / 2} y={p.y + 16} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
                  {p.cls}
                </text>
              </g>
            ))}
          </g>

          {/* observers 列表槽（注册时逐个填充） */}
          {PANELS.map((p, i) => (
            <rect
              key={`slot-${p.id}`}
              ref={(el) => {
                slotsRef.current[p.id] = el;
              }}
              x={SUB_X + 14 + i * 34}
              y={SUB_Y + 72}
              width={28}
              height={20}
              rx="4"
              fill={p.color}
              fillOpacity="0.25"
              stroke={p.color}
              strokeWidth="1.2"
              style={{ opacity: 0 }}
            />
          ))}

          {/* 订阅线（注册时逐条画出） */}
          {PANELS.map((p) => (
            <line
              key={`line-${p.id}`}
              ref={(el) => {
                linesRef.current[p.id] = el;
              }}
              x1={SUB_RIGHT}
              y1={SUB_MID_Y}
              x2={PANEL_X}
              y2={p.y}
              stroke={p.color}
              strokeWidth="1.6"
              strokeDasharray="5 3"
              style={{ opacity: 0 }}
            />
          ))}

          {/* 传感器徽章（数据到达时浮现） */}
          <g ref={sensorRef} style={{ opacity: 0 }}>
            <rect x={SUB_X} y={SUB_Y - 62} width={SUB_W} height={40} rx="8" fill={EVENT_COLOR} fillOpacity="0.14" stroke={EVENT_COLOR} strokeWidth="1.4" />
            <text x={SUB_X + SUB_W / 2} y={SUB_Y - 46} textAnchor="middle" fontSize="12" fontWeight="700" fill={EVENT_COLOR}>
              传感器数据到达
            </text>
            <text x={SUB_X + SUB_W / 2} y={SUB_Y - 30} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              setMeasurements(26.9, 65, 1013)
            </text>
            <line x1={SUB_X + SUB_W / 2} y1={SUB_Y - 20} x2={SUB_X + SUB_W / 2} y2={SUB_Y - 4} stroke={EVENT_COLOR} strokeWidth="1.6" />
            <polygon points={`${SUB_X + SUB_W / 2},${SUB_Y - 2} ${SUB_X + SUB_W / 2 - 4},${SUB_Y - 9} ${SUB_X + SUB_W / 2 + 4},${SUB_Y - 9}`} fill={EVENT_COLOR} />
          </g>

          {/* 状态值（Subject 内部点亮） */}
          <g ref={dataRef} style={{ opacity: 0 }}>
            <text x={SUB_X + 14} y={SUB_Y + 116} fontSize="11" fontFamily="monospace" fill="var(--text-primary)">
              temp=26.9°C hum=65%
            </text>
            <text x={SUB_X + 14} y={SUB_Y + 134} fontSize="11" fontFamily="monospace" fill="var(--text-primary)">
              pressure=1013hPa
            </text>
          </g>

          {/* notifyObservers 标签 */}
          <g ref={notifyTagRef} style={{ opacity: 0 }}>
            <rect x={300} y={178} width={180} height={24} rx="6" fill={ACCENT} fillOpacity="0.16" stroke={ACCENT} strokeWidth="1.3" />
            <text x={390} y={194} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill={ACCENT}>
              notifyObservers()
            </text>
          </g>

          {/* 数据包（从 Subject 并行飞向各面板） */}
          {PANELS.map((p) => (
            <g
              key={`packet-${p.id}`}
              ref={(el) => {
                packetRefs.current[p.id] = el;
              }}
              style={{ opacity: 0, transform: `translate(${SUB_RIGHT}px, ${SUB_MID_Y}px)` }}
            >
              <circle cx={0} cy={0} r="7" fill={EVENT_COLOR} stroke="var(--elevated)" strokeWidth="2" />
            </g>
          ))}

          {/* 面板点亮描边 */}
          {PANELS.map((p) => (
            <rect
              key={`glow-${p.id}`}
              ref={(el) => {
                glowRefs.current[p.id] = el;
              }}
              x={PANEL_X - 3}
              y={p.y - PANEL_H / 2 - 3}
              width={PANEL_W + 6}
              height={PANEL_H + 6}
              rx="10"
              fill="none"
              stroke={p.color}
              strokeWidth="2.4"
              style={{ opacity: 0 }}
            />
          ))}

          {/* 面板反应徽章 */}
          {PANELS.map((p) => (
            <g
              key={`react-${p.id}`}
              ref={(el) => {
                reactRefs.current[p.id] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect x={PANEL_X} y={p.y + PANEL_H / 2 + 6} width={PANEL_W} height={22} rx="5" fill={p.color} fillOpacity="0.16" stroke={p.color} strokeWidth="1.2" />
              <text x={PANEL_X + PANEL_W / 2} y={p.y + PANEL_H / 2 + 21} textAnchor="middle" fontSize="11" fontWeight="700" fill={p.color}>
                {p.reaction}
              </text>
            </g>
          ))}

          {/* 第四个面板（扩展时浮现） */}
          <g ref={extraPanelRef} style={{ opacity: 0 }}>
            <rect x={PANEL_X} y={390} width={PANEL_W} height={44} rx="8" fill="#E5B567" fillOpacity="0.1" stroke="#E5B567" strokeWidth="1.6" />
            <text x={PANEL_X + PANEL_W / 2} y={408} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              炎热指数面板（新）
            </text>
            <text x={PANEL_X + PANEL_W / 2} y={426} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              HeatIndexDisplay
            </text>
          </g>
          <line
            ref={extraLineRef}
            x1={SUB_RIGHT}
            y1={SUB_MID_Y}
            x2={PANEL_X}
            y2={412}
            stroke="#E5B567"
            strokeWidth="1.6"
            strokeDasharray="5 3"
            style={{ opacity: 0 }}
          />
          <rect
            ref={extraSlotRef}
            x={SUB_X + 14 + 3 * 34}
            y={SUB_Y + 72}
            width={28}
            height={20}
            rx="4"
            fill="#E5B567"
            fillOpacity="0.25"
            stroke="#E5B567"
            strokeWidth="1.2"
            style={{ opacity: 0 }}
          />

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={446} width={540} height={30} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={360} y={465} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              新增面板：实现 Observer 接口 + 注册 → WeatherData 代码零改动
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="Subject 只依赖 Observer 接口，不依赖任何具体面板。观察者随时注册、随时注销，运行时动态增减。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        观察者模式定义一对多依赖：WeatherData 状态变化时自动通知所有已注册的面板。
        Subject 维护订阅列表并广播，Observer 被动接收更新——双方只依赖接口，
        互不感知具体实现，松耦合达成。
      </figcaption>
    </figure>
  );
}
