/**
 * <Gep2LearningMapDiagram>：游戏引擎原理与实践·卷2 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2LearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏引擎原理与实践·卷2 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="34"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            游戏引擎原理与实践·卷2 全书学习地图
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            物理 → 碰撞 → 动画 → 音频 → 网络 → 工具 → 脚本
          </text>

          <rect
            x="30"
            y="76"
            width="680"
            height="320"
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />

          {/* 第一排：物理与表现 */}
          <rect
            x="50"
            y="96"
            width="150"
            height="50"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="125"
            y="118"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            物理引擎
          </text>
          <text
            x="125"
            y="134"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            积分器/约束
          </text>

          <rect
            x="215"
            y="96"
            width="150"
            height="50"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="290"
            y="118"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            碰撞系统
          </text>
          <text
            x="290"
            y="134"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            广相/窄相/流形
          </text>

          <rect
            x="380"
            y="96"
            width="150"
            height="50"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.12"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="455"
            y="118"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            骨骼动画
          </text>
          <text
            x="455"
            y="134"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            蒙皮/层级
          </text>

          <rect
            x="545"
            y="96"
            width="145"
            height="50"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.12"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="617"
            y="118"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            动画混合
          </text>
          <text
            x="617"
            y="134"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            状态机/混合树
          </text>

          {/* 箭头到第二排 */}
          <text
            x="125"
            y="172"
            textAnchor="middle"
            fontSize="18"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>
          <text
            x="290"
            y="172"
            textAnchor="middle"
            fontSize="18"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>
          <text
            x="455"
            y="172"
            textAnchor="middle"
            fontSize="18"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>
          <text
            x="617"
            y="172"
            textAnchor="middle"
            fontSize="18"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>

          {/* 第二排：联机与工具 */}
          <rect
            x="50"
            y="188"
            width="150"
            height="50"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="125"
            y="210"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            音频系统
          </text>
          <text
            x="125"
            y="226"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            3D音频/混音
          </text>

          <rect
            x="215"
            y="188"
            width="150"
            height="50"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="290"
            y="210"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            网络架构
          </text>
          <text
            x="290"
            y="226"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            C/S/同步策略
          </text>

          <rect
            x="380"
            y="188"
            width="150"
            height="50"
            rx="8"
            fill="var(--text-tertiary)"
            fillOpacity="0.15"
            stroke="var(--text-tertiary)"
            strokeWidth="1.2"
          />
          <text
            x="455"
            y="210"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            编辑器框架
          </text>
          <text
            x="455"
            y="226"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            资产管线/工具链
          </text>

          <rect
            x="545"
            y="188"
            width="145"
            height="50"
            rx="8"
            fill="var(--text-tertiary)"
            fillOpacity="0.15"
            stroke="var(--text-tertiary)"
            strokeWidth="1.2"
          />
          <text
            x="617"
            y="210"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            脚本系统
          </text>
          <text
            x="617"
            y="226"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            绑定/热重载
          </text>

          {/* 主线 */}
          <rect
            x="50"
            y="264"
            width="640"
            height="44"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="286"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-primary)"
          >
            核心主线：从「真实交互」到「能协作开发」
          </text>
          <text
            x={VIEW_W / 2}
            y="302"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            先让世界有物理真实感，再让角色会动会响，最后联机并打开工具链
          </text>

          {/* 学习路径 */}
          <text
            x={VIEW_W / 2}
            y="342"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            三阶段递进
          </text>
          <text
            x={VIEW_W / 2}
            y="362"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            模拟层（物理/碰撞） → 表现层（动画/音频）
          </text>
          <text
            x={VIEW_W / 2}
            y="380"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            → 联机与工具层（网络/编辑器/脚本） → 总复习
          </text>

          <text
            x={VIEW_W / 2}
            y="402"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            关键洞察：卷2 聚焦「高级技术」，回答运行时各子系统「如何协同」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏引擎原理与实践·卷2
        全书学习地图——从物理模拟到联机工具的三阶段进阶路径
      </figcaption>
    </figure>
  );
}
