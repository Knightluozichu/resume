/**
 * <Gep1EngineArchitectureDiagram>：引擎分层架构与模块划分图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 430;

export function Gep1EngineArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏引擎分层架构与模块划分图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            引擎分层架构：自底向上的四层模型
          </text>

          {/* 游戏层 */}
          <rect x="60" y="56" width="600" height="56" rx="10" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="90" y="80" fontSize="13" fontWeight="700" fill="var(--warning)">游戏层 Game-Specific</text>
          <text x="90" y="98" fontSize="11" fill="var(--text-secondary)">游戏逻辑 / 玩法规则 / 角色控制 / 关卡脚本 — 每款游戏都不一样</text>

          {/* 功能层 */}
          <rect x="60" y="124" width="600" height="56" rx="10" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="90" y="148" fontSize="13" fontWeight="700" fill="var(--accent)">功能层 Function</text>
          <text x="90" y="166" fontSize="11" fill="var(--text-secondary)">渲染 / 物理 / 动画 / 音频 / 网络 — 引擎的核心能力模块</text>

          {/* 核心层 */}
          <rect x="60" y="192" width="600" height="56" rx="10" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.4" />
          <text x="90" y="216" fontSize="13" fontWeight="700" fill="var(--success)">核心层 Core</text>
          <text x="90" y="234" fontSize="11" fill="var(--text-secondary)">内存管理 / 数学库 / 容器 / 事件 / 任务调度 — 被所有上层共享</text>

          {/* 平台层 */}
          <rect x="60" y="260" width="600" height="56" rx="10" fill="var(--text-tertiary)" fillOpacity="0.16" stroke="var(--text-tertiary)" strokeWidth="1.4" />
          <text x="90" y="284" fontSize="13" fontWeight="700" fill="var(--text-primary)">平台层 Platform</text>
          <text x="90" y="302" fontSize="11" fill="var(--text-secondary)">OS / 文件IO / 窗口 / 输入设备 / 图形API — 隔离硬件与操作系统差异</text>

          {/* 依赖方向 */}
          <text x="30" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)" transform="rotate(-90 30 180)">
            依赖方向
          </text>
          <text x="30" y="100" textAnchor="middle" fontSize="22" fill="var(--text-tertiary)">&darr;</text>
          <text x="30" y="250" textAnchor="middle" fontSize="22" fill="var(--text-tertiary)">&darr;</text>

          {/* 横切模块 */}
          <rect x="60" y="336" width="290" height="70" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="205" y="356" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">工具与资源管线</text>
          <text x="205" y="374" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">资产导入 → 序列化 → 运行时加载</text>
          <text x="205" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">离线工具链与运行时解耦</text>

          <rect x="370" y="336" width="290" height="70" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="515" y="356" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">配置与子系统初始化</text>
          <text x="515" y="374" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">启动顺序 / 依赖注入 / 生命周期</text>
          <text x="515" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单例或服务定位器管理全局</text>

          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            规则：上层依赖下层，绝不反向；同层模块通过事件/接口解耦
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        引擎四层架构模型——平台层屏蔽硬件、核心层提供基础设施、功能层组装能力、游戏层实现玩法
      </figcaption>
    </figure>
  );
}
