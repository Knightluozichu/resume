/**
 * <CswLearningMapDiagram>：《CSS世界》（张鑫旭）全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CswLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS世界全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            《CSS世界》全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            流与盒模型 → 文本与排版 → 布局体系 → 视觉与动效 → 总复习
          </text>

          <rect x="30" y="64" width="680" height="386" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：流与盒模型 + 学习地图 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">流与盒模型</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">正常流、浮动与 BFC（第 2 章）</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">盒模型：content-box / border-box（第 3 章）</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">全书学习地图</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">四阶段递进总览</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从「流」到「动效」的完整旅程</text>

          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：文本与排版 */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">文本与排版</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">文本装饰与换行（第 4 章）</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">垂直韵律与行高（第 5 章）</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">排版层目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能断：控制换行与空白</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能排：行高与垂直对齐</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：布局体系 */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">布局体系</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Flex 一维弹性布局（第 6 章）</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Grid 二维网格布局（第 7 章）</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">布局层目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能排：主轴交叉轴分配空间</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能定：行列网格精确落位</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：视觉与动效 + 总复习 */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">视觉与动效</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">变换与透视（第 8 章）</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">动画与过渡（第 9 章）</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">四层知识图谱串联</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CSS 渲染机制工程判断力</text>

          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「会写样式」到「懂流与盒」的四层进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CSS世界全书学习地图——流与盒模型、文本与排版、布局体系、视觉与动效四阶段递进路径
      </figcaption>
    </figure>
  );
}
