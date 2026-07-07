/**
 * <EventQueueDiagram>：事件队列模式流程图（game-programming-patterns 课程）。
 *
 * 左 Producer（产生事件）→ 中 EventQueue（4 个事件依序排队，FIFO）→ 右 Consumer（处理事件）。
 * enqueue / dequeue 两条箭头标注流向。底部总结：解耦——生产者与消费者互不感知
 * 对方的存在和时间，队列缓冲双方的速率差。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×320、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 流程主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 320;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

// Producer / Consumer 框
const PRODUCER = { x: 40, y: 108, w: 140, h: 80 };
const CONSUMER = { x: 540, y: 108, w: 140, h: 80 };
// EventQueue 框
const QUEUE = { x: 240, y: 100, w: 240, h: 96 };
// 队列内 4 个事件 pill
const EV_W = 44;
const EV_H = 34;
const EV_GAP = 8;
const EV_Y = 138;
const EVENTS = ["e1", "e2", "e3", "e4"];
const evX = (i: number) => QUEUE.x + (QUEUE.w - (EVENTS.length * EV_W + (EVENTS.length - 1) * EV_GAP)) / 2 + i * (EV_W + EV_GAP);
const evCx = (i: number) => evX(i) + EV_W / 2;

export function EventQueueDiagram() {
  const producerCx = PRODUCER.x + PRODUCER.w / 2; // 110
  const consumerCx = CONSUMER.x + CONSUMER.w / 2; // 610
  const queueCx = QUEUE.x + QUEUE.w / 2; // 360
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="事件队列模式流程图。左侧 Producer 产生事件，经 enqueue 进入中间的 EventQueue；队列内有 e1、e2、e3、e4 四个事件依序排队，FIFO 先进先出，箭头指向右侧。右侧 Consumer 经 dequeue 取出事件并处理。底部总结：解耦——生产者与消费者互不感知对方的存在和时间，队列缓冲双方的速率差。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="eq-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
            <marker
              id="eq-fifo-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={secondary} />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            事件队列 · 流程图
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            生产者入队、消费者出队，队列在中间缓冲
          </text>

          {/* ===== Producer ===== */}
          <g>
            <rect
              x={PRODUCER.x}
              y={PRODUCER.y}
              width={PRODUCER.w}
              height={PRODUCER.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={producerCx}
              y={PRODUCER.y + 26}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Producer
            </text>
            <line
              x1={PRODUCER.x}
              y1={PRODUCER.y + 34}
              x2={PRODUCER.x + PRODUCER.w}
              y2={PRODUCER.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={producerCx}
              y={PRODUCER.y + 54}
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              产生事件
            </text>
            <text
              x={producerCx}
              y={PRODUCER.y + 70}
              textAnchor="middle"
              fontSize="11"
              fontStyle="italic"
              fill={secondary}
            >
              （任意时刻）
            </text>
          </g>

          {/* ===== EventQueue ===== */}
          <g>
            <rect
              x={QUEUE.x}
              y={QUEUE.y}
              width={QUEUE.w}
              height={QUEUE.h}
              rx="10"
              fill="var(--bg)"
              stroke={accent}
              strokeWidth="1.6"
              strokeOpacity="0.6"
            />
            <text
              x={queueCx}
              y={QUEUE.y + 20}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              EventQueue
            </text>
            <line
              x1={QUEUE.x}
              y1={QUEUE.y + 28}
              x2={QUEUE.x + QUEUE.w}
              y2={QUEUE.y + 28}
              stroke={border}
              strokeWidth="1"
            />
            {/* 4 个排队事件 */}
            {EVENTS.map((e, i) => (
              <g key={e}>
                <rect
                  x={evX(i)}
                  y={EV_Y}
                  width={EV_W}
                  height={EV_H}
                  rx="6"
                  fill={elevated}
                  stroke={border}
                  strokeWidth="1.4"
                />
                <text
                  x={evCx(i)}
                  y={EV_Y + EV_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {e}
                </text>
              </g>
            ))}
            {/* FIFO 方向箭头 */}
            <text
              x={queueCx}
              y={180}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={secondary}
            >
              FIFO
            </text>
            <line
              x1={evX(0)}
              y1={186}
              x2={evX(EVENTS.length - 1) + EV_W - 4}
              y2={186}
              stroke={secondary}
              strokeWidth="1.4"
              markerEnd="url(#eq-fifo-arrow)"
            />
          </g>

          {/* ===== Consumer ===== */}
          <g>
            <rect
              x={CONSUMER.x}
              y={CONSUMER.y}
              width={CONSUMER.w}
              height={CONSUMER.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={consumerCx}
              y={CONSUMER.y + 26}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Consumer
            </text>
            <line
              x1={CONSUMER.x}
              y1={CONSUMER.y + 34}
              x2={CONSUMER.x + CONSUMER.w}
              y2={CONSUMER.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={consumerCx}
              y={CONSUMER.y + 54}
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              处理事件
            </text>
            <text
              x={consumerCx}
              y={CONSUMER.y + 70}
              textAnchor="middle"
              fontSize="11"
              fontStyle="italic"
              fill={secondary}
            >
              （按自己节奏）
            </text>
          </g>

          {/* ===== enqueue / dequeue 箭头 ===== */}
          <line
            x1={PRODUCER.x + PRODUCER.w + 4}
            y1={148}
            x2={QUEUE.x - 4}
            y2={148}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#eq-arrow)"
          />
          <text
            x={(PRODUCER.x + PRODUCER.w + QUEUE.x) / 2}
            y={140}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={accent}
            fontFamily="monospace"
          >
            enqueue
          </text>

          <line
            x1={QUEUE.x + QUEUE.w + 4}
            y1={148}
            x2={CONSUMER.x - 4}
            y2={148}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#eq-arrow)"
          />
          <text
            x={(QUEUE.x + QUEUE.w + CONSUMER.x) / 2}
            y={140}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={accent}
            fontFamily="monospace"
          >
            dequeue
          </text>

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y="224"
            width={VIEW_W - 160}
            height="56"
            rx="10"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="248"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            解耦：生产者和消费者互不感知对方的存在和时间
          </text>
          <text
            x={VIEW_W / 2}
            y="268"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            队列缓冲双方的速率差，任一方的实现或时序变化都不影响另一方
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        队列把「谁产生事件」和「谁处理事件」彻底分开：生产者只管往队列里塞，消费者按自己的节奏往外取。两者之间没有直接引用，速率不同步也无所谓——这正是游戏里音频、动画、成就等子系统异步通信的常用骨架。
      </figcaption>
    </figure>
  );
}
