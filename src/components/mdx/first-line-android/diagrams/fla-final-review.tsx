/**
 * <FlaFinalReviewDiagram>：全书复习——知识图谱与技术选型矩阵图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function FlaFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第一行代码Android全书知识图谱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            第一行代码Android——全书知识图谱
          </text>

          {/* 知识树 */}
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">知识体系全景</text>

          <rect x="280" y="64" width="180" height="36" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="87" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Android开发全景</text>

          <text x="160" y="118" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="118" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="580" y="118" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第一层：三大分支 */}
          <rect x="60" y="128" width="200" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="153" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">四大组件</text>

          <rect x="270" y="128" width="200" height="40" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="153" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">数据与存储</text>

          <rect x="480" y="128" width="200" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="580" y="153" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">UI与架构</text>

          {/* 第二层：细分 */}
          <rect x="60" y="180" width="200" height="56" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="160" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Activity 生命周期</text>
          <text x="160" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Service 启动/绑定</text>
          <text x="160" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Broadcast 动态/静态</text>

          <rect x="270" y="180" width="200" height="56" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="370" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SharedPreferences</text>
          <text x="370" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SQLite / Room</text>
          <text x="370" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">文件 / ContentProvider</text>

          <rect x="480" y="180" width="200" height="56" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="580" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">布局/RecyclerView</text>
          <text x="580" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">网络/OkHttp/Retrofit</text>
          <text x="580" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Material/Jetpack/MVVM</text>

          {/* 第三层：工程化 */}
          <text x={VIEW_W / 2} y="264" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">技术选型决策矩阵</text>

          <rect x="30" y="276" width="680" height="120" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />

          <text x="55" y="298" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">场景</text>
          <text x="240" y="298" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">推荐方案</text>
          <text x="480" y="298" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">理由</text>

          <text x="55" y="318" textAnchor="start" fontSize="10" fill="var(--text-secondary)">列表展示</text>
          <text x="240" y="318" textAnchor="start" fontSize="10" fill="var(--success)">RecyclerView + Adapter</text>
          <text x="480" y="318" textAnchor="start" fontSize="10" fill="var(--text-secondary)">ViewHolder复用，性能优</text>

          <text x="55" y="338" textAnchor="start" fontSize="10" fill="var(--text-secondary)">本地存储</text>
          <text x="240" y="338" textAnchor="start" fontSize="10" fill="var(--success)">Room（Jetpack）</text>
          <text x="480" y="338" textAnchor="start" fontSize="10" fill="var(--text-secondary)">编译期检查+响应式查询</text>

          <text x="55" y="358" textAnchor="start" fontSize="10" fill="var(--text-secondary)">网络请求</text>
          <text x="240" y="358" textAnchor="start" fontSize="10" fill="var(--success)">Retrofit + OkHttp</text>
          <text x="480" y="358" textAnchor="start" fontSize="10" fill="var(--text-secondary)">接口化+拦截器+连接池</text>

          <text x="55" y="378" textAnchor="start" fontSize="10" fill="var(--text-secondary)">后台任务</text>
          <text x="240" y="378" textAnchor="start" fontSize="10" fill="var(--success)">WorkManager</text>
          <text x="480" y="378" textAnchor="start" fontSize="10" fill="var(--text-secondary)">可约束/可延迟/系统调度</text>

          {/* 技术演进 */}
          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">技术演进逻辑</text>

          <rect x="30" y="432" width="680" height="100" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />

          <text x="370" y="454" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ListView（性能差） → RecyclerView（ViewHolder复用） → Jetpack ListAdapter/DiffUtil</text>
          <text x="370" y="472" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SQLite（手写SQL） → LitePal（ORM） → Room（编译期检查+LiveData/Flow）</text>
          <text x="370" y="490" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Thread+Handler → AsyncTask（废弃） → Coroutines/Flow（协程）</text>
          <text x="370" y="508" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MVC → MVP → MVVM（ViewModel+LiveData） → MVI（单向数据流）</text>
          <text x="370" y="526" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Intent → Navigation Component（可视化导航图）</text>

          {/* 全书闭环 */}
          <text x="370" y="558" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            全书闭环：入门 → UI → 四大组件 → 数据 → 网络 → 架构 → 现代Android开发（MAD）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识图谱：四大组件/数据存储/UI架构三大分支、技术选型矩阵、从传统到现代Android开发的技术演进逻辑
      </figcaption>
    </figure>
  );
}
