/**
 * <UmsFinalReviewDiagram>：全书总复习达人工作链图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习达人工作链图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">达人工作链——从需求到上线</text>

          {/* 需求 */}
          <rect x="280" y="55" width="160" height="36" rx="8" fill="var(--text-primary)" fillOpacity="0.10" stroke="var(--text-primary)" strokeWidth="1.2" />
          <text x="360" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">需求</text>
          <text x="360" y="108" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 工具层 */}
          <rect x="40" y="120" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">工具层</text>
          <text x="100" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">第 2-3 章</text>
          <text x="100" y="170" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">EditorWindow</text>
          <text x="170" y="148" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 脚本层 */}
          <rect x="190" y="120" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="250" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">脚本层</text>
          <text x="250" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">第 4 章</text>
          <text x="250" y="170" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">泛型 / 事件总线</text>
          <text x="320" y="148" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 渲染层 */}
          <rect x="340" y="120" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="400" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">渲染层</text>
          <text x="400" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">第 6 章</text>
          <text x="400" y="170" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">URP 描边</text>
          <text x="470" y="148" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 性能层 */}
          <rect x="490" y="120" width="100" height="50" rx="8" fill="var(--info)" fillOpacity="0.12" stroke="var(--info)" strokeWidth="1.2" />
          <text x="540" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--info)">性能层</text>
          <text x="540" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">第 7 章</text>
          <text x="540" y="170" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">零 GC 验证</text>
          <text x="600" y="148" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 工程层 */}
          <rect x="610" y="120" width="70" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="645" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">工程</text>
          <text x="645" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">8-9 章</text>
          <text x="645" y="170" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">上线</text>

          <text x="360" y="200" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 塔防实战 */}
          <rect x="40" y="215" width="640" height="100" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="237" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">综合实战：塔防游戏</text>
          <text x="360" y="257" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">关卡编辑器（EditorWindow）+ 对象池/事件总线（泛型+委托）+ 攻击范围描边（URP）</text>
          <text x="360" y="273" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Profiler 零 GC 验证（OverlapSphereNonAlloc）+ Addressables 分包热更 + Git LFS / UnityYAMLMerge</text>
          <text x="360" y="295" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-tertiary)">六步走完 = 从需求到上线的完整技术流程</text>

          {/* 核心原则 */}
          <text x="360" y="345" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">持续 Profiling：从第一天起每完成一个功能就录 Profiler，设性能预算，超标立即修</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">移动端 30FPS / CPU 16ms/帧 / 零 GC.Alloc &rarr; 没有性能验证，所有优化都是盲目的</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——达人工作链：需求 &rarr; 工具 &rarr; 脚本 &rarr; 渲染 &rarr; 性能 &rarr; 工程
      </figcaption>
    </figure>
  );
}
