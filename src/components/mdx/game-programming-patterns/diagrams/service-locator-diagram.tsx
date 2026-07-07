/**
 * <ServiceLocatorDiagram>：服务定位器结构图（game-programming-patterns 课程）。
 *
 * 顶部 Client 调用 ServiceLocator.getService("audio")；中部 ServiceLocator 静态类，
 * 暴露 provide(service) / getService(type)；底部两个具体服务 AudioService、LoggerService
 * 经 provide() 注册进定位器，由 bus 分发。底部对比直接依赖：客户端只面向定位器，
 * 不耦合具体服务实现。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×360、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 360;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

// Client 框（顶部居中）
const CLIENT = { x: 270, y: 64, w: 180, h: 48 };
// ServiceLocator 框（中部居中）
const LOCATOR = { x: 240, y: 128, w: 240, h: 72 };
// bus y（Locator → 两个服务的分发总线）
const BUS_Y = 214;
// 两个服务框
const SVC_Y = 230;
const SVC_H = 60;
const SERVICES = [
  { name: "AudioService", x: 80, w: 200, method: "+ play()" },
  { name: "LoggerService", x: 440, w: 200, method: "+ log()" },
];
const svcCx = (s: { x: number; w: number }) => s.x + s.w / 2;

export function ServiceLocatorDiagram() {
  const clientCx = CLIENT.x + CLIENT.w / 2; // 360
  const locatorCx = LOCATOR.x + LOCATOR.w / 2; // 360
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="服务定位器结构图。顶部 Client 调用 ServiceLocator 的 getService 传入 audio。中部 ServiceLocator 是静态类，暴露 provide 与 getService 方法。底部两个具体服务 AudioService（play）与 LoggerService（log）经 provide 注册进定位器，由分发总线连接。底部对比直接依赖：客户端只面向定位器，不耦合具体服务实现。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="sl-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
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
            服务定位器 · 结构图
          </text>
          <text
            x={VIEW_W / 2}
            y="52"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            客户端从定位器获取服务，而非直接依赖具体类
          </text>

          {/* ===== Client ===== */}
          <g>
            <rect
              x={CLIENT.x}
              y={CLIENT.y}
              width={CLIENT.w}
              height={CLIENT.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={clientCx}
              y={CLIENT.y + 20}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Client
            </text>
            <line
              x1={CLIENT.x}
              y1={CLIENT.y + 28}
              x2={CLIENT.x + CLIENT.w}
              y2={CLIENT.y + 28}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={clientCx}
              y={CLIENT.y + 42}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              getService(&quot;audio&quot;)
            </text>
          </g>

          {/* Client → Locator 箭头 */}
          <line
            x1={clientCx}
            y1={CLIENT.y + CLIENT.h}
            x2={locatorCx}
            y2={LOCATOR.y - 4}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#sl-arrow)"
          />
          <text
            x={clientCx + 8}
            y={(CLIENT.y + CLIENT.h + LOCATOR.y) / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            查询
          </text>

          {/* ===== ServiceLocator ===== */}
          <g>
            <rect
              x={LOCATOR.x}
              y={LOCATOR.y}
              width={LOCATOR.w}
              height={LOCATOR.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={locatorCx}
              y={LOCATOR.y + 22}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ServiceLocator
            </text>
            {/* «静态» pill */}
            <rect
              x={LOCATOR.x + LOCATOR.w - 52}
              y={LOCATOR.y + 8}
              width="40"
              height="16"
              rx="8"
              fill={accent}
              fillOpacity="0.14"
              stroke={accent}
              strokeWidth="1"
            />
            <text
              x={LOCATOR.x + LOCATOR.w - 32}
              y={LOCATOR.y + 20}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={accent}
            >
              静态
            </text>
            <line
              x1={LOCATOR.x}
              y1={LOCATOR.y + 30}
              x2={LOCATOR.x + LOCATOR.w}
              y2={LOCATOR.y + 30}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={LOCATOR.x + 16}
              y={LOCATOR.y + 48}
              fontSize="12"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              + provide(service)
            </text>
            <text
              x={LOCATOR.x + 16}
              y={LOCATOR.y + 64}
              fontSize="12"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              + getService(type)
            </text>
          </g>

          {/* ===== 分发 bus：Locator → 两个服务 ===== */}
          {/* 主干 */}
          <line
            x1={locatorCx}
            y1={LOCATOR.y + LOCATOR.h}
            x2={locatorCx}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
          />
          {/* 水平 bus */}
          <line
            x1={svcCx(SERVICES[0])}
            y1={BUS_Y}
            x2={svcCx(SERVICES[1])}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
          />
          {/* risers（bus → 服务顶部，带箭头） */}
          {SERVICES.map((s) => (
            <line
              key={`sr-${s.name}`}
              x1={svcCx(s)}
              y1={BUS_Y}
              x2={svcCx(s)}
              y2={SVC_Y - 2}
              stroke={accent}
              strokeWidth="1.6"
              markerEnd="url(#sl-arrow)"
            />
          ))}
          <text
            x={svcCx(SERVICES[0]) + 8}
            y={BUS_Y - 6}
            fontSize="11"
            fontWeight="600"
            fill={accent}
            fontFamily="monospace"
          >
            provide()
          </text>
          <text
            x={svcCx(SERVICES[1]) + 8}
            y={BUS_Y - 6}
            fontSize="11"
            fontWeight="600"
            fill={accent}
            fontFamily="monospace"
          >
            provide()
          </text>

          {/* ===== 两个服务框 ===== */}
          {SERVICES.map((s) => (
            <g key={s.name}>
              <rect
                x={s.x}
                y={SVC_Y}
                width={s.w}
                height={SVC_H}
                rx="10"
                fill={elevated}
                stroke={border}
                strokeWidth="1.8"
              />
              <text
                x={svcCx(s)}
                y={SVC_Y + 24}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {s.name}
              </text>
              <line
                x1={s.x}
                y1={SVC_Y + 32}
                x2={s.x + s.w}
                y2={SVC_Y + 32}
                stroke={border}
                strokeWidth="1"
              />
              <text
                x={svcCx(s)}
                y={SVC_Y + 50}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={accent}
                fontFamily="monospace"
              >
                {s.method}
              </text>
            </g>
          ))}

          {/* ===== 底部对比总结栏 ===== */}
          <rect
            x="80"
            y="302"
            width={VIEW_W - 160}
            height="32"
            rx="10"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="323"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            对比「直接依赖具体类」：客户端只面向定位器，不耦合服务实现
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        定位器像一个全局服务台：服务在启动时通过 provide 注册自己，客户端用 getService 按类型取用。客户端不再硬编码依赖某个具体类，服务的替换、Mock、加载顺序都被收拢到定位器一处——代价是依赖关系从编译期退化成了运行期查找。
      </figcaption>
    </figure>
  );
}
