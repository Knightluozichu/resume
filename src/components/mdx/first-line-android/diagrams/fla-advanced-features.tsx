/**
 * <FlaAdvancedFeaturesDiagram>：高级特性——Material Design与Jetpack架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 560;

export function FlaAdvancedFeaturesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Material Design与Jetpack架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Material Design 与 Jetpack 架构组件
          </text>

          {/* 左侧：Material Design */}
          <text x="185" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Material Design</text>

          <rect x="60" y="66" width="250" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="91" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">MaterialCardView 卡片</text>

          <rect x="60" y="116" width="250" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="185" y="141" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">CoordinatorLayout 协调布局</text>

          <rect x="60" y="166" width="250" height="40" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="185" y="191" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">AppBarLayout / CollapsingToolbarLayout</text>

          <rect x="60" y="216" width="250" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="241" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">FloatingActionButton 悬浮按钮</text>

          <rect x="60" y="266" width="250" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="291" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Snackbar 底部提示</text>

          <rect x="60" y="316" width="250" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="185" y="341" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">BottomNavigation 底部导航</text>

          {/* 右侧：Jetpack架构组件 */}
          <text x="545" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Jetpack 架构组件</text>

          <rect x="420" y="66" width="250" height="50" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">ViewModel</text>
          <text x="545" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">配置变更时保留数据（不随Activity重建销毁）</text>
          <text x="545" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ViewModelProvider(this).get()</text>

          <rect x="420" y="126" width="250" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="146" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">LiveData</text>
          <text x="545" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可观察的数据持有者</text>
          <text x="545" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生命周期感知，自动管理订阅</text>

          <rect x="420" y="186" width="250" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="545" y="206" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Room</text>
          <text x="545" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@Entity / @Dao / @Database</text>
          <text x="545" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译期SQL检查 + 返回LiveData/Flow</text>

          <rect x="420" y="246" width="250" height="50" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="545" y="266" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Navigation Component</text>
          <text x="545" y="280" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">导航图（NavGraph）管理Fragment跳转</text>
          <text x="545" y="292" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可视化编辑导航路径 + safe args传参</text>

          <rect x="420" y="306" width="250" height="50" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="326" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">WorkManager</text>
          <text x="545" y="340" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可延迟/可约束的后台任务调度</text>
          <text x="545" y="352" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">替代Service处理后台任务</text>

          {/* 底部：MVVM架构与推荐架构 */}
          <rect x="30" y="380" width="680" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="402" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Jetpack 推荐架构（MVVM）</text>

          <rect x="50" y="414" width="180" height="34" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="436" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">UI层（Activity/Fragment）</text>

          <text x="245" y="436" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&harr;</text>

          <rect x="265" y="414" width="180" height="34" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="355" y="436" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">ViewModel + LiveData</text>

          <text x="460" y="436" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&harr;</text>

          <rect x="480" y="414" width="210" height="34" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="585" y="436" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Repository → Room / Retrofit</text>

          <text x="370" y="478" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">UI层观察LiveData → ViewModel管理状态 → Repository协调本地(Room)和远程(Retrofit)数据源</text>

          <text x="370" y="506" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Material Design = 视觉规范（怎么做界面好看）</text>
          <text x="370" y="524" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Jetpack = 架构规范（怎么写代码稳健）</text>
          <text x="370" y="542" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">两者结合 = 现代 Android 开发（Modern Android Development, MAD）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Material Design视觉组件（CoordinatorLayout/FAB/Snackbar）与Jetpack架构组件（ViewModel/LiveData/Room/Navigation/WorkManager）及MVVM架构
      </figcaption>
    </figure>
  );
}
