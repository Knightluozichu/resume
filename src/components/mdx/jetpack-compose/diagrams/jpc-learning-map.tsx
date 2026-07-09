/**
 * <JpcLearningMapDiagram>：Jetpack Compose从入门到实战 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function JpcLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Jetpack Compose从入门到实战全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Jetpack Compose从入门到实战——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            基础 → 布局 → 状态 → 动画 → 主题 → 导航 → 互操作 → 高级 → 复习
          </text>

          <rect x="30" y="62" width="680" height="502" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：学习地图 与 Compose基础 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">全书学习地图</text>
          <text x="205" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第0章 知识体系总览</text>
          <text x="205" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">九阶段递进路径</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Compose基础</text>
          <text x="535" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第1章 @Composable/remember</text>
          <text x="535" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">声明式UI心智模型</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：布局与修饰符 与 状态管理 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">布局与修饰符</text>
          <text x="205" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第2章 Box/Column/Row</text>
          <text x="205" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Modifier链/Lazy列表</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">状态管理</text>
          <text x="535" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第3章 State/重组</text>
          <text x="535" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">rememberSaveable/ViewModel</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：动画 与 主题与样式 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">动画</text>
          <text x="205" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第4章 animate*/Animatable</text>
          <text x="205" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">AnimatedVisibility/updateTransition</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">主题与样式</text>
          <text x="535" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第5章 MaterialTheme</text>
          <text x="535" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ColorScheme/Typography</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：导航与路由 与 与View互操作 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">导航与路由</text>
          <text x="205" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第6章 NavHost/NavController</text>
          <text x="205" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">类型安全路由/嵌套图</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">与View互操作</text>
          <text x="535" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第7章 AndroidView/ComposeView</text>
          <text x="535" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">互操作性能/迁移策略</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：高级Compose 与 全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">高级Compose</text>
          <text x="205" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第8章 自定义布局/手势</text>
          <text x="205" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Layout/pointerInput/SubcomposeLayout</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="535" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第9章 知识图谱/选型矩阵</text>
          <text x="535" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">基础→布局→状态→动画</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Jetpack Compose全书学习地图——基础、布局、状态、动画、主题、导航、互操作、高级九阶段递进路径
      </figcaption>
    </figure>
  );
}
