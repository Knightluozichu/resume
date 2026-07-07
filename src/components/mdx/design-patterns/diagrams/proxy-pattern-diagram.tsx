/**
 * <ProxyPatternDiagram>：代理模式结构图（design-patterns 课程）。
 *
 * 展示代理模式的核心结构：
 *   - 左侧 Client 类
 *   - 中间上方 Subject 接口（虚线边框、斜体、«interface»），声明 request()
 *   - 中间下方左 RealSubject（真正干活的类）
 *   - 中间下方右 Proxy（代理类，持有 RealSubject 引用，request() 前可加前置/后置处理）
 *   - 箭头：Client→Subject（依赖，虚线开放箭头）；RealSubject/Proxy→Subject（实现，虚线空心三角）；
 *     Proxy→RealSubject（持有，实线实心箭头）
 *   - 底部文字：「代理：控制对对象的访问——延迟加载、权限校验、远程代理」
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// Client 框（左侧）
const CLIENT = { x: 40, y: 76, w: 140, h: 72 };
// Subject 接口框（中间上方）
const SUBJECT = { x: 280, y: 76, w: 160, h: 80 };
// RealSubject 框（中间下方左）
const REAL_SUBJECT = { x: 180, y: 212, w: 180, h: 84 };
// Proxy 框（中间下方右）
const PROXY = { x: 440, y: 212, w: 220, h: 100 };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";

export function ProxyPatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="代理模式结构图。左侧是 Client 类。中间上方是 Subject 接口（虚线边框、斜体），声明 request() 方法。中间下方左侧是 RealSubject 类，真正执行请求的逻辑。中间下方右侧是 Proxy 代理类，持有 RealSubject 引用，其 request() 方法在调用前可加前置处理，调用后可加后置处理。虚线开放箭头从 Client 指向 Subject 表示依赖关系；虚线空心三角箭头从 RealSubject 和 Proxy 指向 Subject 表示实现关系；实线实心箭头从 Proxy 指向 RealSubject 表示持有关系。底部说明：代理控制对对象的访问——延迟加载、权限校验、远程代理。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 依赖关系：开放箭头（V形），UML dependency */}
            <marker
              id="proxy-dep-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path
                d="M0 0 L9 5 L0 10"
                fill="none"
                stroke={secondary}
                strokeWidth="1.5"
              />
            </marker>
            {/* 实现关系：空心三角箭头 */}
            <marker
              id="proxy-impl-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="11"
              refY="6"
              orient="auto"
            >
              <path
                d="M1 1 L11 6 L1 11 z"
                fill={elevated}
                stroke={accent}
                strokeWidth="1"
              />
            </marker>
            {/* 持有 / 关联：实心三角箭头 */}
            <marker
              id="proxy-holds-arrow"
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
            y="40"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            代理模式 · 结构
          </text>

          {/* ===== Client 框（左侧） ===== */}
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
              x={CLIENT.x + CLIENT.w / 2}
              y={CLIENT.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Client
            </text>
            <line
              x1={CLIENT.x}
              y1={CLIENT.y + 34}
              x2={CLIENT.x + CLIENT.w}
              y2={CLIENT.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CLIENT.x + 12}
              y={CLIENT.y + 54}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              // 依赖 Subject 接口
            </text>
          </g>

          {/* ===== Subject 接口框（中间上方） ===== */}
          <g>
            <rect
              x={SUBJECT.x}
              y={SUBJECT.y}
              width={SUBJECT.w}
              height={SUBJECT.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={SUBJECT.x + SUBJECT.w / 2}
              y={SUBJECT.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={SUBJECT.x + SUBJECT.w / 2}
              y={SUBJECT.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Subject
            </text>
            <line
              x1={SUBJECT.x}
              y1={SUBJECT.y + 46}
              x2={SUBJECT.x + SUBJECT.w}
              y2={SUBJECT.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={SUBJECT.x + 14}
              y={SUBJECT.y + 64}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + request()
            </text>
          </g>

          {/* ===== RealSubject 框（中间下方左） ===== */}
          <g>
            <rect
              x={REAL_SUBJECT.x}
              y={REAL_SUBJECT.y}
              width={REAL_SUBJECT.w}
              height={REAL_SUBJECT.h}
              rx="10"
              fill={elevated}
              stroke={success}
              strokeWidth="1.8"
            />
            <text
              x={REAL_SUBJECT.x + REAL_SUBJECT.w / 2}
              y={REAL_SUBJECT.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              RealSubject
            </text>
            <line
              x1={REAL_SUBJECT.x}
              y1={REAL_SUBJECT.y + 32}
              x2={REAL_SUBJECT.x + REAL_SUBJECT.w}
              y2={REAL_SUBJECT.y + 32}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={REAL_SUBJECT.x + 14}
              y={REAL_SUBJECT.y + 52}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + request()
            </text>
            <text
              x={REAL_SUBJECT.x + 14}
              y={REAL_SUBJECT.y + 70}
              fontSize="11"
              fill={success}
              fontStyle="italic"
            >
              // 真正干活
            </text>
          </g>

          {/* ===== Proxy 框（中间下方右） ===== */}
          <g>
            <rect
              x={PROXY.x}
              y={PROXY.y}
              width={PROXY.w}
              height={PROXY.h}
              rx="10"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={PROXY.x + PROXY.w / 2}
              y={PROXY.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Proxy
            </text>
            <line
              x1={PROXY.x}
              y1={PROXY.y + 32}
              x2={PROXY.x + PROXY.w}
              y2={PROXY.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={PROXY.x + 14}
              y={PROXY.y + 50}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              - realSubject: RealSubject
            </text>
            <text
              x={PROXY.x + 14}
              y={PROXY.y + 68}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + request()
            </text>
            <text
              x={PROXY.x + 14}
              y={PROXY.y + 88}
              fontSize="11"
              fill={warning}
              fontStyle="italic"
            >
              // 前置处理 → 委托 → 后置处理
            </text>
          </g>

          {/* ===== 依赖箭头：Client → Subject（虚线开放箭头） ===== */}
          <line
            x1={CLIENT.x + CLIENT.w}
            y1={CLIENT.y + 36}
            x2={SUBJECT.x - 2}
            y2={SUBJECT.y + 40}
            stroke={secondary}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#proxy-dep-arrow)"
          />
          <text
            x={(CLIENT.x + CLIENT.w + SUBJECT.x) / 2}
            y={CLIENT.y + 26}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={secondary}
          >
            依赖
          </text>

          {/* ===== 实现箭头：RealSubject → Subject（虚线空心三角） ===== */}
          <line
            x1={REAL_SUBJECT.x + REAL_SUBJECT.w / 2}
            y1={REAL_SUBJECT.y}
            x2={SUBJECT.x + 40}
            y2={SUBJECT.y + SUBJECT.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#proxy-impl-arrow)"
          />

          {/* ===== 实现箭头：Proxy → Subject（虚线空心三角） ===== */}
          <line
            x1={PROXY.x + 64}
            y1={PROXY.y}
            x2={SUBJECT.x + SUBJECT.w - 40}
            y2={SUBJECT.y + SUBJECT.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#proxy-impl-arrow)"
          />
          <text
            x={SUBJECT.x + SUBJECT.w / 2}
            y={SUBJECT.y + SUBJECT.h + 20}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            «implements»
          </text>

          {/* ===== 持有箭头：Proxy → RealSubject（实线实心箭头） ===== */}
          <line
            x1={PROXY.x}
            y1={PROXY.y + 50}
            x2={REAL_SUBJECT.x + REAL_SUBJECT.w + 2}
            y2={REAL_SUBJECT.y + 42}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#proxy-holds-arrow)"
          />
          <text
            x={(REAL_SUBJECT.x + REAL_SUBJECT.w + PROXY.x) / 2}
            y={PROXY.y + 40}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="372"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            代理：控制对对象的访问——延迟加载、权限校验、远程代理
          </text>
          <text
            x={VIEW_W / 2}
            y="392"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            Client 面向 Subject 编程，实际操作的是 Proxy，由 Proxy 决定何时、如何委托给 RealSubject
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Proxy 和 RealSubject 实现同一个 Subject 接口，Client 无需感知代理的存在。
        Proxy 在 request() 中插入前置 / 后置逻辑——如权限校验、缓存、延迟加载、
        远程调用——再委托给 RealSubject，从而在不修改真实对象的前提下控制访问。
      </figcaption>
    </figure>
  );
}
