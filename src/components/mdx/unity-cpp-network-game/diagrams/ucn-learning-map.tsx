/**
 * <UcnLearningMapDiagram>：Unity 与 C++ 网络游戏开发实战 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function UcnLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 与 C++ 网络游戏开发实战 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity 与 C++ 网络游戏开发实战 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            C++ 服务器 → 协议设计 → Unity 客户端 → 玩法系统 → 总复习
          </text>

          <rect x="30" y="72" width="680" height="360" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：C++ 服务器基础 */}
          <rect x="50" y="92" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="113" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">全书学习地图</text>
          <text x="150" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">四阶段递进 / 知识脉络</text>

          <rect x="270" y="92" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="113" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">C++ 服务器基础</text>
          <text x="370" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">epoll / IOCP / Reactor</text>

          <rect x="490" y="92" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="590" y="113" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Socket 编程</text>
          <text x="590" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缓冲区 / 粘包 / 封包</text>

          {/* 箭头到第二排 */}
          <text x="150" y="164" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="164" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="164" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：协议层 */}
          <rect x="50" y="180" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="150" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Protobuf 协议设计</text>
          <text x="150" y="217" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Schema / 序列化 / 版本</text>

          <rect x="270" y="180" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">消息路由与分发</text>
          <text x="370" y="217" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Handler 注册 / 派发</text>

          <rect x="490" y="180" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="590" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Unity 客户端集成</text>
          <text x="590" y="217" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Native Plugin / P-Invoke</text>

          {/* 第三排箭头 */}
          <text x="150" y="254" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="254" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="254" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：客户端与玩法 */}
          <rect x="50" y="270" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="291" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">网络框架设计</text>
          <text x="150" y="307" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">连接池 / 重连 / 心跳</text>

          <rect x="270" y="270" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="291" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">实时同步与预测</text>
          <text x="370" y="307" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">插值 / 预测 / 校正</text>

          <rect x="490" y="270" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="291" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">房间管理与匹配</text>
          <text x="590" y="307" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">房间生命周期 / MMR</text>

          {/* 第四排箭头 */}
          <text x="370" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：总复习 */}
          <rect x="270" y="360" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="381" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="370" y="397" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">知识串联 / 架构设计</text>

          {/* 主线 */}
          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「C++ 服务器怎么跑」到「Unity 客户端怎么联」再到「万人对战怎么同步」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 与 C++ 网络游戏开发实战 全书学习地图——从 C++ 服务器到 Unity 客户端的四阶段进阶路径
      </figcaption>
    </figure>
  );
}
