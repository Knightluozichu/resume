/**
 * <UmmAoiSystemDiagram>：AOI 兴趣区域管理图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function UmmAoiSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="AOI 兴趣区域管理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            AOI 兴趣区域管理
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            九宫格算法 vs 十字链表算法
          </text>

          {/* 左半：九宫格算法 */}
          <text x="185" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">九宫格算法</text>

          <rect x="55" y="90" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <rect x="115" y="90" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <rect x="175" y="90" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <rect x="235" y="90" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <rect x="295" y="90" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />

          <rect x="55" y="150" width="60" height="60" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
          <rect x="115" y="150" width="60" height="60" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
          <rect x="175" y="150" width="60" height="60" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
          <rect x="235" y="150" width="60" height="60" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
          <rect x="295" y="150" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />

          <rect x="55" y="210" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <rect x="115" y="210" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <rect x="175" y="210" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <rect x="235" y="210" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <rect x="295" y="210" width="60" height="60" rx="3" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 玩家标记 */}
          <circle cx="205" cy="180" r="6" fill="var(--accent)" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x="205" y="184" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--text-primary)">P</text>

          {/* 其他玩家 */}
          <circle cx="85" cy="175" r="4" fill="var(--warning)" />
          <circle cx="145" cy="195" r="4" fill="var(--warning)" />
          <circle cx="255" cy="170" r="4" fill="var(--warning)" />

          <text x="185" y="296" textAnchor="middle" fontSize="10" fill="var(--success)">绿色 = 玩家可见的九宫格</text>
          <text x="185" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">只广播这些格子内的实体</text>
          <text x="185" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">优点：实现简单、查询快</text>
          <text x="185" y="348" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缺点：格子大小固定、边界抖动</text>

          {/* 右半：十字链表算法 */}
          <text x="555" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">十字链表算法</text>

          <rect x="420" y="90" width="270" height="200" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* X 轴链表头 */}
          <text x="440" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">X 链表</text>
          <rect x="465" y="100" width="40" height="20" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="485" y="114" textAnchor="middle" fontSize="9" fill="var(--warning)">x1</text>
          <line x1="505" y1="110" x2="525" y2="110" stroke="var(--warning)" strokeWidth="1" />
          <rect x="525" y="100" width="40" height="20" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="114" textAnchor="middle" fontSize="9" fill="var(--warning)">x2</text>
          <line x1="565" y1="110" x2="585" y2="110" stroke="var(--warning)" strokeWidth="1" />
          <rect x="585" y="100" width="40" height="20" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="605" y="114" textAnchor="middle" fontSize="9" fill="var(--warning)">x3</text>
          <line x1="625" y1="110" x2="645" y2="110" stroke="var(--warning)" strokeWidth="1" />
          <rect x="645" y="100" width="40" height="20" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="665" y="114" textAnchor="middle" fontSize="9" fill="var(--warning)">x4</text>

          {/* Y 轴链表头 */}
          <text x="435" y="150" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">Y 链表</text>
          <rect x="425" y="140" width="20" height="30" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="435" y="159" textAnchor="middle" fontSize="9" fill="var(--warning)">y1</text>
          <line x1="435" y1="170" x2="435" y2="185" stroke="var(--warning)" strokeWidth="1" />
          <rect x="425" y="185" width="20" height="30" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="435" y="204" textAnchor="middle" fontSize="9" fill="var(--warning)">y2</text>
          <line x1="435" y1="215" x2="435" y2="230" stroke="var(--warning)" strokeWidth="1" />
          <rect x="425" y="230" width="20" height="30" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="435" y="249" textAnchor="middle" fontSize="9" fill="var(--warning)">y3</text>

          {/* 交叉节点 */}
          <circle cx="545" cy="180" r="5" fill="var(--accent)" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="545" y="184" textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--text-primary)">P</text>
          <line x1="485" y1="120" x2="545" y2="175" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="445" y1="200" x2="540" y2="180" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />

          <text x="555" y="296" textAnchor="middle" fontSize="10" fill="var(--warning)">每个实体同时挂在 X 和 Y 链表上</text>
          <text x="555" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">查询 = X 链表区间 ∩ Y 链表区间</text>
          <text x="555" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">优点：视野范围灵活可变</text>
          <text x="555" y="348" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缺点：维护复杂、移动时链表更新开销</text>

          {/* 底部总结 */}
          <rect x="50" y="372" width="640" height="52" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：AOI 解决的是「谁需要知道谁的存在」——只给玩家推送视野内实体的消息
          </text>
          <text x={VIEW_W / 2} y="410" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            万人同服的关键：不是减少消息数量，而是只发给关心的客户端
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AOI 兴趣区域管理——九宫格与十字链表两种空间索引算法
      </figcaption>
    </figure>
  );
}
