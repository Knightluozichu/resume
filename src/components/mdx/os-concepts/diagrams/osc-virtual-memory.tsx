/**
 * <OscVirtualMemoryDiagram>：虚拟内存——请求分页、页面置换与工作集图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscVirtualMemoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="虚拟内存请求分页与页面置换图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            虚拟内存：请求分页 + 页面置换算法 + 工作集
          </text>

          {/* 左侧：请求分页流程 */}
          <text x="170" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">请求分页（按需调页）</text>

          <rect x="40" y="70" width="260" height="28" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="89" textAnchor="middle" fontSize="10" fill="var(--warning)">1. CPU 访问虚拟地址</text>

          <rect x="40" y="104" width="260" height="28" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="123" textAnchor="middle" fontSize="10" fill="var(--warning)">2. 查页表：有效位 = 1?</text>

          <rect x="40" y="138" width="260" height="28" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="170" y="157" textAnchor="middle" fontSize="10" fill="var(--success)">是 → 命中，MMU 翻译地址</text>

          <rect x="40" y="172" width="260" height="28" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="170" y="191" textAnchor="middle" fontSize="10" fill="var(--danger)">否 → 缺页中断</text>

          <rect x="40" y="206" width="260" height="28" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="170" y="225" textAnchor="middle" fontSize="10" fill="var(--danger)">3. 找空闲帧 / 置换淘汰</text>

          <rect x="40" y="240" width="260" height="28" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="170" y="259" textAnchor="middle" fontSize="10" fill="var(--danger)">4. 从磁盘读入页面</text>

          <rect x="40" y="274" width="260" height="28" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="170" y="293" textAnchor="middle" fontSize="10" fill="var(--success)">5. 更新页表，重启指令</text>

          <text x="170" y="322" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">有效访问时间 EAT = (1-p) × 内存 + p × 缺页处理</text>

          {/* 右侧：页面置换算法对比 */}
          <text x="530" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">页面置换算法</text>

          <rect x="400" y="70" width="260" height="40" rx="5" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="530" y="88" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">OPT 最佳置换</text>
          <text x="530" y="103" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">淘汰未来最久不用的（理论最优，不可实现）</text>

          <rect x="400" y="118" width="260" height="40" rx="5" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="530" y="136" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">FIFO 先进先出</text>
          <text x="530" y="151" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">淘汰最先进入的（简单，有 Belady 异常）</text>

          <rect x="400" y="166" width="260" height="40" rx="5" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="530" y="184" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">LRU 最近最少使用</text>
          <text x="530" y="199" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">淘汰最久未访问的（近似 OPT，开销大）</text>

          <rect x="400" y="214" width="260" height="40" rx="5" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="530" y="232" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">Clock 时钟算法</text>
          <text x="530" y="247" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">近似 LRU（引用位 + 环形扫描）</text>

          <rect x="400" y="262" width="260" height="40" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
          <text x="530" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">Belady 异常</text>
          <text x="530" y="295" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">FIFO 帧数增多反而缺页更多（LRU 无此问题）</text>

          {/* 底部：工作集与抖动 */}
          <rect x="30" y="318" width="680" height="132" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="50" y="340" fontSize="13" fontWeight="600" fill="var(--text-primary)">工作集模型与抖动</text>

          <text x="50" y="364" fontSize="10" fontWeight="600" fill="var(--accent)">工作集 W(t, Δ)</text>
          <text x="50" y="380" fontSize="9" fill="var(--text-tertiary)">过去 Δ 时间窗口内访问的页面集合</text>
          <text x="50" y="394" fontSize="9" fill="var(--text-tertiary)">= 进程当前活跃所需的驻留集大小</text>
          <text x="50" y="408" fontSize="9" fill="var(--text-tertiary)">预调策略：跟踪工作集，提前调入</text>

          <text x="280" y="364" fontSize="10" fontWeight="600" fill="var(--danger)">抖动 Thrashing</text>
          <text x="280" y="380" fontSize="9" fill="var(--text-tertiary)">多道程序度过高 → 每个进程帧不够</text>
          <text x="280" y="394" fontSize="9" fill="var(--text-tertiary)">频繁缺页 → CPU 利用率骤降</text>
          <text x="280" y="408" fontSize="9" fill="var(--text-tertiary)">解法：降低多道程序度 / 增加物理内存</text>

          <text x="510" y="364" fontSize="10" fontWeight="600" fill="var(--success)">页错误频率控制</text>
          <text x="510" y="380" fontSize="9" fill="var(--text-tertiary)">缺页率过高 → 给更多帧</text>
          <text x="510" y="394" fontSize="9" fill="var(--text-tertiary)">缺页率过低 → 可回收帧</text>
          <text x="510" y="408" fontSize="9" fill="var(--text-tertiary)">维持缺页率在合理区间</text>

          <text x="50" y="436" fontSize="10" fill="var(--text-secondary)">
            写时复制（COW）：fork() 父子共享只读页，写时才复制——延迟复制降低开销
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        虚拟内存请求分页流程、页面置换算法对比与工作集抖动模型
      </figcaption>
    </figure>
  );
}
