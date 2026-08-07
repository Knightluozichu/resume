/**
 * <Poeaa24Ch11BehaviorCollaboration>：对象-关系行为模式协作图（POEAA 第11章概览）。
 *
 * 展示 3 个模式的协作关系：
 *   Unit of Work 包裹 Identity Map，Lazy Load 挂在关联上。
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 420;

export function Poeaa24Ch11BehaviorCollaborationDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对象-关系行为模式协作图，覆盖第11章 对象-关系行为模式。Unit of Work 是最外层容器，跟踪所有新建、修改、删除的对象；Identity Map 在 UoW 内部作为缓存，确保同一 ID 只有一个实例；Lazy Load 挂在对象的关联属性上，首次访问时才触发查询。三者协作完成一次事务中的对象生命周期管理。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="对象-关系行为模式：三者如何协作"
          />

          {/* Unit of Work 外框 */}
          <rect
            x={48}
            y={60}
            width={624}
            height={300}
            rx="12"
            fill={T.accent}
            fillOpacity="0.03"
            stroke={T.accent}
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          <text x={64} y={84} fontSize="13" fontWeight="700" fill={T.accent}>
            Unit of Work
          </text>
          <text x={64} y={102} fontSize="11" fill={T.secondary}>
            跟踪 new / dirty / removed 集合，commit() 时一次性写出
          </text>

          {/* Identity Map 内框 */}
          <rect
            x={80}
            y={120}
            width={380}
            height={216}
            rx="10"
            fill="#3FB97F"
            fillOpacity="0.04"
            stroke="#3FB97F"
            strokeWidth="1.5"
          />
          <text x={96} y={144} fontSize="13" fontWeight="700" fill="#3FB97F">
            Identity Map
          </text>
          <text x={96} y={162} fontSize="11" fill={T.secondary}>
            Map&lt;ID, Object&gt; — 同一 ID 只存一个实例
          </text>

          {/* 对象实例 */}
          <rect
            x={104}
            y={180}
            width={140}
            height={56}
            rx="6"
            fill="#3FB97F"
            fillOpacity="0.08"
            stroke="#3FB97F"
            strokeWidth="1"
          />
          <text
            x={174}
            y={202}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={T.primary}
          >
            Order #1001
          </text>
          <text
            x={174}
            y={220}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            status: dirty
          </text>

          <rect
            x={104}
            y={252}
            width={140}
            height={56}
            rx="6"
            fill="#3FB97F"
            fillOpacity="0.08"
            stroke="#3FB97F"
            strokeWidth="1"
          />
          <text
            x={174}
            y={274}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={T.primary}
          >
            Customer #42
          </text>
          <text
            x={174}
            y={292}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            status: clean
          </text>

          {/* Lazy Load 区域 */}
          <rect
            x={488}
            y={120}
            width={168}
            height={216}
            rx="10"
            fill="#E5B567"
            fillOpacity="0.04"
            stroke="#E5B567"
            strokeWidth="1.5"
          />
          <text
            x={572}
            y={144}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#E5B567"
          >
            Lazy Load
          </text>
          <text
            x={572}
            y={162}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首次访问时加载
          </text>

          {/* 关联属性 */}
          <rect
            x={504}
            y={180}
            width={136}
            height={44}
            rx="6"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1"
          />
          <text
            x={572}
            y={200}
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            order.items
          </text>
          <text
            x={572}
            y={214}
            textAnchor="middle"
            fontSize="11"
            fill="#E5B567"
          >
            → 触发 SELECT
          </text>

          <rect
            x={504}
            y={240}
            width={136}
            height={44}
            rx="6"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1"
          />
          <text
            x={572}
            y={260}
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            order.customer
          </text>
          <text
            x={572}
            y={274}
            textAnchor="middle"
            fontSize="11"
            fill="#E5B567"
          >
            → 查 IdentityMap
          </text>

          {/* 连接线：Order → Lazy Load */}
          <defs>
            <marker
              id="ch11-arr"
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L6 3.5 L0 7 z" fill="#E5B567" />
            </marker>
          </defs>
          <line
            x1={244}
            y1={208}
            x2={504}
            y2={200}
            stroke="#E5B567"
            strokeWidth="1"
            strokeDasharray="4 3"
            markerEnd="url(#ch11-arr)"
          />

          {/* 连接线：Lazy Load → Identity Map (查缓存) */}
          <line
            x1={504}
            y1={262}
            x2={244}
            y2={280}
            stroke="#3FB97F"
            strokeWidth="1"
            strokeDasharray="4 3"
            markerEnd="url(#ch11-arr)"
          />

          {/* 底部说明 */}
          <text x={48} y={384} fontSize="11" fill={T.primary}>
            协作流程：UoW 管理事务边界 → Identity Map 保证唯一实例 → Lazy Load
            延迟加载关联
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="三个模式解决三个问题：何时写（UoW）、是否重复（IM）、何时读（LL）"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unit of Work 跟踪变更并决定何时写回；Identity Map 确保同一 ID
        只有一个内存实例； Lazy Load
        把关联加载推迟到首次访问。三者协作管理一次事务中的完整对象生命周期。
      </figcaption>
    </figure>
  );
}
