/**
 * <VdiDiffAlgorithmDiagram>：Diff 算法图解。
 * 展示新旧 children 比对：双端 Diff / 快速 Diff / key 复用。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VdiDiffAlgorithmDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Diff 算法图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Diff 算法：新旧子节点比对与最小化更新
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            用 key 标识节点身份，复用可复用的，只移动不可复用的
          </text>

          {/* 上半：双端 Diff 四步 */}
          <rect x="30" y="64" width="680" height="160" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">双端 Diff：从头尾向中间逼近</text>

          <rect x="50" y="96" width="145" height="110" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="122" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. 头头比</text>
          <text x="122" y="136" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">oldStart vs newStart</text>
          <text x="122" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">key 同 → patch 复用</text>
          <text x="122" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">两指针后移</text>
          <text x="122" y="192" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">最常见路径</text>

          <rect x="210" y="96" width="145" height="110" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="282" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">2. 尾尾比</text>
          <text x="282" y="136" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">oldEnd vs newEnd</text>
          <text x="282" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">key 同 → patch 复用</text>
          <text x="282" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">两指针前移</text>
          <text x="282" y="192" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">尾部追加场景</text>

          <rect x="370" y="96" width="145" height="110" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="442" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">3. 头尾交叉</text>
          <text x="442" y="136" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">oldStart vs newEnd</text>
          <text x="442" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">key 同 → 移动节点</text>
          <text x="442" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">旧头移到旧尾后</text>
          <text x="442" y="192" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">尾部前移场景</text>

          <rect x="530" y="96" width="145" height="110" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="602" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">4. 尾头交叉</text>
          <text x="602" y="136" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">oldEnd vs newStart</text>
          <text x="602" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">key 同 → 移动节点</text>
          <text x="602" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">旧尾移到旧头前</text>
          <text x="602" y="192" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">头部插入场景</text>

          {/* 下半：快速 Diff 三阶段 */}
          <rect x="30" y="240" width="680" height="160" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="260" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">快速 Diff（Vue 3 采用）：预处理 + 未知序列</text>

          <rect x="50" y="272" width="200" height="110" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. 头部预处理</text>
          <text x="150" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从头比 key 相同的</text>
          <text x="150" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">直接 patch，跳过</text>
          <text x="150" y="350" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">省去公共前缀的比对</text>

          <rect x="270" y="272" width="200" height="110" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">2. 尾部预处理</text>
          <text x="370" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从尾比 key 相同的</text>
          <text x="370" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">直接 patch，跳过</text>
          <text x="370" y="350" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">省去公共后缀的比对</text>

          <rect x="490" y="272" width="200" height="110" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="590" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">3. 未知序列</text>
          <text x="590" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">新有旧无 → 新增</text>
          <text x="590" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">旧有新无 → 卸载</text>
          <text x="590" y="350" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">最长递增子序列定移动</text>

          <text x="370" y="424" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：key 是节点身份标识，有 key 才能复用；无 key 只能按位置 patch
          </text>
          <text x="370" y="444" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            最长递增子序列（LIS）让需要移动的节点数最少
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Diff 算法——双端 Diff 四步交叉比对，快速 Diff 预处理头尾后用 LIS 最小化移动
      </figcaption>
    </figure>
  );
}
