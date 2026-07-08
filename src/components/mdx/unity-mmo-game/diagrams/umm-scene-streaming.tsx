/**
 * <UmmSceneStreamingDiagram>：场景流式加载图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function UmmSceneStreamingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="场景流式加载图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            场景流式加载（SubScene / Additive）
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            玩家移动时动态加载/卸载地图块
          </text>

          {/* 九宫格地图 */}
          <text x="185" y="80" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-secondary)">九宫格地图分块</text>

          <rect x="55" y="90" width="80" height="80" rx="4" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="95" y="135" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">B1</text>

          <rect x="135" y="90" width="80" height="80" rx="4" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="175" y="135" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">B2</text>

          <rect x="215" y="90" width="80" height="80" rx="4" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="255" y="135" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">B3</text>

          <rect x="55" y="170" width="80" height="80" rx="4" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="95" y="215" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">A1</text>

          {/* 当前加载区域（九宫格中心） */}
          <rect x="135" y="170" width="80" height="80" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="2" />
          <text x="175" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">A2</text>
          <text x="175" y="226" textAnchor="middle" fontSize="9" fill="var(--success)">玩家所在</text>

          <rect x="215" y="170" width="80" height="80" rx="4" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="255" y="215" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">A3</text>

          <rect x="55" y="250" width="80" height="80" rx="4" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="95" y="295" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">C1</text>

          <rect x="135" y="250" width="80" height="80" rx="4" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="175" y="295" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">C2</text>

          <rect x="215" y="250" width="80" height="80" rx="4" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="255" y="295" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">C3</text>

          {/* 加载范围标注 */}
          <rect x="55" y="90" width="240" height="240" rx="4" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 3" />
          <text x="175" y="350" textAnchor="middle" fontSize="10" fill="var(--accent)">九宫格加载范围（3x3）</text>

          {/* 右侧：加载流程 */}
          <text x="540" y="80" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-secondary)">动态加载流程</text>

          <rect x="400" y="92" width="280" height="36" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="111" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">玩家进入新网格</text>

          <text x="540" y="142" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="152" width="280" height="36" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="171" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">SceneManager.LoadSceneAsync</text>
          <text x="540" y="184" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">LoadSceneMode.Additive</text>

          <text x="540" y="202" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="212" width="280" height="36" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="231" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">卸载超出九宫格的旧块</text>
          <text x="540" y="244" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">UnloadSceneAsync</text>

          <text x="540" y="262" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="272" width="280" height="36" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="291" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">地址分组（Addressables）</text>
          <text x="540" y="304" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按距离异步加载资源</text>

          {/* 底部总结 */}
          <rect x="50" y="362" width="640" height="44" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="382" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：只加载玩家周围九宫格内的场景块，卸载远离的块——用内存换流畅
          </text>
          <text x={VIEW_W / 2} y="400" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            Additive 模式叠加场景，SubScene 做物理/光照隔离，Addressables 管理资源依赖
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        场景流式加载——九宫格分块、Additive 叠加、动态加载卸载
      </figcaption>
    </figure>
  );
}
