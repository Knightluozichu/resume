/**
 * <GchMarkCompactDiagram>：标记-压缩算法——滑动压缩与转发指针。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GchMarkCompactDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="标记-压缩算法滑动压缩与转发指针"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            标记-压缩算法：原地滑动压缩
          </text>

          {/* 压缩前 */}
          <text x="185" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">标记后、压缩前</text>
          <rect x="40" y="64" width="290" height="90" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" />
          {/* 堆块 - 有空洞 */}
          <rect x="52" y="78" width="30" height="22" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="67" y="93" textAnchor="middle" fontSize="8" fill="var(--text-primary)">A</text>
          <rect x="84" y="78" width="30" height="22" fill="none" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="99" y="93" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">&#215;</text>
          <rect x="116" y="78" width="30" height="22" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="131" y="93" textAnchor="middle" fontSize="8" fill="var(--text-primary)">C</text>
          <rect x="148" y="78" width="30" height="22" fill="none" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="163" y="93" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">&#215;</text>
          <rect x="180" y="78" width="30" height="22" fill="none" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="195" y="93" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">&#215;</text>
          <rect x="212" y="78" width="30" height="22" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="227" y="93" textAnchor="middle" fontSize="8" fill="var(--text-primary)">E</text>
          <rect x="244" y="78" width="30" height="22" fill="none" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="259" y="93" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">&#215;</text>
          <rect x="276" y="78" width="30" height="22" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="291" y="93" textAnchor="middle" fontSize="8" fill="var(--text-primary)">G</text>

          <text x="185" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">A,C,E,G 存活</text>
          <text x="185" y="134" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">3个空洞 = 碎片</text>
          <text x="185" y="148" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">转发指针尚未设置</text>

          {/* 箭头 */}
          <text x="370" y="105" textAnchor="middle" fontSize="20" fill="var(--accent)">&rarr;</text>
          <text x="370" y="125" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">滑动 + 转发</text>

          {/* 压缩后 */}
          <text x="555" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">压缩后</text>
          <rect x="410" y="64" width="290" height="90" rx="8" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" />
          {/* 堆块 - 紧凑 */}
          <rect x="422" y="78" width="30" height="22" fill="var(--success)" fillOpacity="0.5" stroke="var(--success)" strokeWidth="0.8" />
          <text x="437" y="93" textAnchor="middle" fontSize="8" fill="var(--text-primary)">A</text>
          <rect x="454" y="78" width="30" height="22" fill="var(--success)" fillOpacity="0.5" stroke="var(--success)" strokeWidth="0.8" />
          <text x="469" y="93" textAnchor="middle" fontSize="8" fill="var(--text-primary)">C</text>
          <rect x="486" y="78" width="30" height="22" fill="var(--success)" fillOpacity="0.5" stroke="var(--success)" strokeWidth="0.8" />
          <text x="501" y="93" textAnchor="middle" fontSize="8" fill="var(--text-primary)">E</text>
          <rect x="518" y="78" width="30" height="22" fill="var(--success)" fillOpacity="0.5" stroke="var(--success)" strokeWidth="0.8" />
          <text x="533" y="93" textAnchor="middle" fontSize="8" fill="var(--text-primary)">G</text>
          <rect x="550" y="78" width="140" height="22" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="620" y="93" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">连续空闲区</text>

          <text x="555" y="120" textAnchor="middle" fontSize="9" fill="var(--success)">无碎片！</text>
          <text x="555" y="134" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">存活对象向左滑动</text>
          <text x="555" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">空闲区连续可用</text>

          {/* 分割 */}
          <line x1="30" y1="180" x2="710" y2="180" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

          {/* 转发指针机制 */}
          <text x={VIEW_W / 2} y="202" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">转发指针（Forwarding Pointer）机制</text>

          <rect x="40" y="216" width="660" height="70" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" />

          <rect x="60" y="230" width="50" height="40" rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="85" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">旧对象</text>
          <text x="85" y="262" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">header</text>

          <text x="130" y="252" textAnchor="middle" fontSize="10" fill="var(--accent)">fwd ptr</text>
          <line x1="118" y1="252" x2="170" y2="252" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrowGch)" />

          <rect x="180" y="230" width="50" height="40" rx="4" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="205" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">新位置</text>
          <text x="205" y="262" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">header</text>

          <text x="260" y="245" fontSize="9" fill="var(--text-secondary)">对象头中记录转发地址</text>
          <text x="260" y="258" fontSize="9" fill="var(--text-secondary)">引用更新时读旧对象头</text>
          <text x="260" y="271" fontSize="9" fill="var(--text-secondary)">跳转到新地址</text>

          <defs>
            <marker id="arrowGch" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 算法对比 */}
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">压缩算法对比</text>

          {/* Two-Finger */}
          <rect x="40" y="326" width="210" height="120" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="145" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Two-Finger（双指法）</text>
          <text x="55" y="364" fontSize="9" fill="var(--text-secondary)">两趟遍历：</text>
          <text x="55" y="378" fontSize="9" fill="var(--text-secondary)">① 从两端向中间找存活+空洞</text>
          <text x="55" y="392" fontSize="9" fill="var(--text-secondary)">② 将末端对象移到空洞</text>
          <text x="55" y="410" fontSize="9" fill="var(--text-tertiary)">对象顺序不保留</text>
          <text x="55" y="424" fontSize="9" fill="var(--text-tertiary)">不保证滑动→缓存差</text>

          {/* 滑动 */}
          <rect x="265" y="326" width="210" height="120" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">滑动压缩（Slide）</text>
          <text x="280" y="364" fontSize="9" fill="var(--text-secondary)">多趟遍历：</text>
          <text x="280" y="378" fontSize="9" fill="var(--text-secondary)">① 计算存活对象新地址</text>
          <text x="280" y="392" fontSize="9" fill="var(--text-secondary)">② 更新所有引用</text>
          <text x="280" y="406" fontSize="9" fill="var(--text-secondary)">③ 移动对象到新位置</text>
          <text x="280" y="424" fontSize="9" fill="var(--success)">保留分配顺序→缓存友好</text>

          {/* 表格法 */}
          <rect x="490" y="326" width="210" height="120" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="595" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">表格法（Table）</text>
          <text x="505" y="364" fontSize="9" fill="var(--text-secondary)">用标记位图+偏移表：</text>
          <text x="505" y="378" fontSize="9" fill="var(--text-secondary)">① 位图记录存活位置</text>
          <text x="505" y="392" fontSize="9" fill="var(--text-secondary)">② 偏移表记录新地址</text>
          <text x="505" y="410" fontSize="9" fill="var(--text-tertiary)">额外空间存偏移表</text>
          <text x="505" y="424" fontSize="9" fill="var(--text-tertiary)">适合大堆/并行化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        标记-压缩算法：存活对象向一端滑动消除碎片，通过转发指针更新引用，对比双指法/滑动/表格三种压缩策略
      </figcaption>
    </figure>
  );
}
