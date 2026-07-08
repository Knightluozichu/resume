/**
 * <UmsAssetManagementDiagram>：资源管理三种方式对比图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsAssetManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="资源管理三种方式对比图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 资源管理三种方式</text>

          {/* Resources */}
          <rect x="40" y="60" width="200" height="150" rx="10" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="140" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">Resources</text>
          <text x="140" y="105" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最老，同步加载</text>
          <text x="140" y="125" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 启动时全量索引</text>
          <text x="140" y="141" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 包体膨胀</text>
          <text x="140" y="157" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 启动慢</text>
          <text x="140" y="173" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 无法热更新</text>
          <text x="140" y="195" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">尽量少用！</text>

          {/* AssetBundle */}
          <rect x="260" y="60" width="200" height="150" rx="10" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="360" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">AssetBundle</text>
          <text x="360" y="105" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">异步加载，可热更</text>
          <text x="360" y="125" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 独立 .bundle 文件</text>
          <text x="360" y="141" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 按需下载</text>
          <text x="360" y="157" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 分组打包</text>
          <text x="360" y="173" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 管理复杂</text>
          <text x="360" y="195" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Addressables 底层</text>

          {/* Addressables */}
          <rect x="480" y="60" width="200" height="150" rx="10" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="580" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Addressables</text>
          <text x="580" y="105" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">现代方案，推荐</text>
          <text x="580" y="125" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 地址定位资源</text>
          <text x="580" y="141" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 自动引用计数</text>
          <text x="580" y="157" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 自动卸载</text>
          <text x="580" y="173" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 热更新 / 远程加载</text>
          <text x="580" y="195" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">首选方案</text>

          {/* AB 分组策略 */}
          <rect x="40" y="235" width="640" height="80" rx="8" fill="var(--info)" fillOpacity="0.06" stroke="var(--info)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="257" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--info)">AB 分组策略：同时用的合，不同时用的分，常更的与不更的分</text>
          <text x="360" y="277" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按场景分组（同场景资源一个 AB）| 按类型分组（跨场景共享）| 按更新频率分组（热更粒度）</text>
          <text x="360" y="295" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Core（不更新）+ Levels（按需下载）+ Config（频繁热更）</text>

          {/* 生命周期 */}
          <text x="360" y="345" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Addressables 生命周期：LoadAssetAsync &rarr; 使用 &rarr; Release（引用计数归零自动卸载）</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">陷阱：Release 只减计数，Instantiate 的实例必须 Destroy，否则 AB 永不卸载</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        资源管理——Resources / AssetBundle / Addressables + AB 分组策略
      </figcaption>
    </figure>
  );
}
