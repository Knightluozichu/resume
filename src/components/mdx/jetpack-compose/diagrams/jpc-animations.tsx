/**
 * <JpcAnimationsDiagram>：Compose 动画API层级与选型图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function JpcAnimationsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Compose动画API层级与选型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            动画体系——API层级与选型决策
          </text>

          {/* 顶层：高级声明式 */}
          <rect x="30" y="50" width="680" height="70" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">高层声明式 API（最常用）</text>

          <rect x="50" y="84" width="200" height="30" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="150" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">AnimatedVisibility</text>

          <rect x="270" y="84" width="200" height="30" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="370" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">AnimatedContent</text>

          <rect x="490" y="84" width="200" height="30" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="590" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Crossfade</text>

          {/* 中层：animate* / updateTransition */}
          <text x="370" y="140" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="30" y="150" width="680" height="100" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="172" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">中层：状态驱动动画</text>

          <rect x="50" y="184" width="200" height="56" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="150" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">animate*AsState</text>
          <text x="150" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">animateColorAsState</text>
          <text x="150" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">animateDpAsState</text>

          <rect x="270" y="184" width="200" height="56" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="370" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">updateTransition</text>
          <text x="370" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">多属性同时动画</text>
          <text x="370" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">状态机式切换</text>

          <rect x="490" y="184" width="200" height="56" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="590" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">rememberInfiniteTransition</text>
          <text x="590" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无限循环动画</text>
          <text x="590" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">呼吸/脉冲/进度条</text>

          {/* 底层：Animatable / AnimationSpec */}
          <text x="370" y="268" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="30" y="278" width="680" height="100" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">底层：精确控制</text>

          <rect x="50" y="312" width="200" height="56" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="150" y="332" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Animatable</text>
          <text x="150" y="350" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">协程驱动，可暂停/取消</text>
          <text x="150" y="364" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">snapTo / animateTo</text>

          <rect x="270" y="312" width="200" height="56" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="332" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">AnimationSpec</text>
          <text x="370" y="350" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">tween / spring / keyframes</text>
          <text x="370" y="364" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">repeatable / infiniteRepeatable</text>

          <rect x="490" y="312" width="200" height="56" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="590" y="332" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Easing 曲线</text>
          <text x="590" y="350" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">FastOutSlowInEasing</text>
          <text x="590" y="364" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">LinearOutSlowInEasing</text>

          {/* 底部选型决策 */}
          <rect x="30" y="396" width="680" height="120" rx="10" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">选型决策</text>

          <text x="50" y="440" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 显隐切换 &rarr; AnimatedVisibility（fade + slide + expand 自动组合）</text>
          <text x="50" y="458" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 内容切换 &rarr; AnimatedContent / Crossfade（新旧内容过渡）</text>
          <text x="50" y="476" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 单属性变化 &rarr; animate*AsState（颜色/位移/大小，一行搞定）</text>
          <text x="50" y="494" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 多属性联动 &rarr; updateTransition（同一状态驱动多个属性）</text>
          <text x="50" y="512" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 手势驱动/精确控制 &rarr; Animatable + coroutine（协程可暂停/取消）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compose动画体系——从高层声明式到底层精确控制的三层API与选型决策
      </figcaption>
    </figure>
  );
}
