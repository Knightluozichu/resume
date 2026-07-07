/**
 * <BookLearningMap>：《Unity3D高级编程：主程手记》全书学习地图
 *
 * 三段式结构：基础架构 → 核心系统 → 进阶专题，共10章。
 * 视觉：横向三列（篇），每列纵向排列章节卡片；卡片间用箭头表示依赖关系。
 * 主程能力成长线在底部贯穿。
 */

const VIEW_W = 960;
const VIEW_H = 620;

const COL_W = 300;
const COL_GAP = 30;
const CARD_H = 52;
const CARD_GAP = 14;
const CARD_RADIUS = 8;
const SECTION_PAD_Y = 24;
const SECTION_HEADER_H = 44;

const COL_X = (i: number) => 30 + i * (COL_W + COL_GAP);

type Chapter = {
  num: number;
  title: string;
  subtitle: string;
  color: string;
};

type Section = {
  title: string;
  subtitle: string;
  color: string;
  chapters: Chapter[];
};

const SECTIONS: readonly Section[] = [
  {
    title: "第1篇 · 基础架构",
    subtitle: "从写功能到搭架子",
    color: "var(--accent)",
    chapters: [
      { num: 1, title: "软件架构", subtitle: "架构思维·Unity项目结构", color: "var(--accent)" },
      { num: 2, title: "C#技术要点", subtitle: "底层原理·集合·算法·优化", color: "var(--accent)" },
      { num: 3, title: "数据表与程序", subtitle: "数据驱动·多语言·流水线", color: "var(--accent)" },
    ],
  },
  {
    title: "第2篇 · 核心系统",
    subtitle: "游戏客户端主干模块",
    color: "var(--success)",
    chapters: [
      { num: 4, title: "用户界面", subtitle: "UGUI原理·UI框架·UI优化", color: "var(--success)" },
      { num: 5, title: "3D模型与动画", subtitle: "资源规范·批处理·状态机·换装", color: "var(--success)" },
      { num: 6, title: "网络通信", subtitle: "TCP/UDP·HTTP·协议·同步方案", color: "var(--success)" },
    ],
  },
  {
    title: "第3篇 · 进阶专题",
    subtitle: "AI·寻路·渲染·图形学深度",
    color: "var(--warning)",
    chapters: [
      { num: 7, title: "游戏中的AI", subtitle: "状态机·行为树·博弈式AI", color: "var(--warning)" },
      { num: 8, title: "地图与寻路", subtitle: "A*·NavMesh·网格构建·地图编辑器", color: "var(--warning)" },
      { num: 9, title: "渲染管线与图形学", subtitle: "向量矩阵·渲染管线·混合", color: "var(--warning)" },
      { num: 10, title: "渲染原理与知识", subtitle: "Early-Z·Mipmap·阴影·Instancing", color: "var(--warning)" },
    ],
  },
];

function chapterY(idx: number) {
  return (
    SECTION_PAD_Y +
    SECTION_HEADER_H +
    idx * (CARD_H + CARD_GAP) +
    CARD_H / 2
  );
}

export function BookLearningMap() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[960px]"
        style={{ minWidth: 640 }}
        role="img"
        aria-label="《Unity3D高级编程：主程手记》全书学习地图"
      >
        {/* 背景 */}
        <rect
          x="0"
          y="0"
          width={VIEW_W}
          height={VIEW_H}
          fill="var(--bg-elevated)"
          rx="12"
        />

        {/* 标题 */}
        <text
          x={VIEW_W / 2}
          y={36}
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize="20"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Unity3D 高级编程：主程手记 · 全书学习地图
        </text>
        <text
          x={VIEW_W / 2}
          y={58}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="13"
          fontFamily="Inter, system-ui, sans-serif"
        >
          从工程师到主程的 10 章进阶路径
        </text>

        {/* 三篇列 */}
        {SECTIONS.map((section, si) => {
          const cx = COL_X(si);
          const sectionH =
            SECTION_PAD_Y * 2 +
            SECTION_HEADER_H +
            section.chapters.length * (CARD_H + CARD_GAP) -
            CARD_GAP;

          return (
            <g key={section.title}>
              {/* 篇背景 */}
              <rect
                x={cx}
                y={80}
                width={COL_W}
                height={sectionH}
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1"
                rx="12"
              />

              {/* 篇左侧色条 */}
              <rect
                x={cx}
                y={80}
                width={4}
                height={sectionH}
                fill={section.color}
                rx="2"
              />

              {/* 篇标题 */}
              <text
                x={cx + 20}
                y={80 + 30}
                fill={section.color}
                fontSize="15"
                fontWeight="600"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {section.title}
              </text>
              <text
                x={cx + 20}
                y={80 + 50}
                fill="var(--text-secondary)"
                fontSize="12"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {section.subtitle}
              </text>

              {/* 章节卡片 */}
              {section.chapters.map((ch, ci) => {
                const cy = 80 + chapterY(ci);
                return (
                  <g key={ch.num}>
                    <rect
                      x={cx + 12}
                      y={cy - CARD_H / 2}
                      width={COL_W - 24}
                      height={CARD_H}
                      fill="var(--bg-elevated)"
                      stroke="var(--border)"
                      strokeWidth="1"
                      rx={CARD_RADIUS}
                    />
                    {/* 章节编号圆 */}
                    <circle
                      cx={cx + 34}
                      cy={cy}
                      r={14}
                      fill={ch.color}
                      fillOpacity="0.15"
                    />
                    <text
                      x={cx + 34}
                      y={cy + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={ch.color}
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="Inter, system-ui, sans-serif"
                    >
                      {ch.num}
                    </text>
                    {/* 章标题 */}
                    <text
                      x={cx + 58}
                      y={cy - 6}
                      fill="var(--text-primary)"
                      fontSize="14"
                      fontWeight="500"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {ch.title}
                    </text>
                    {/* 副标题 */}
                    <text
                      x={cx + 58}
                      y={cy + 12}
                      fill="var(--text-secondary)"
                      fontSize="11"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {ch.subtitle}
                    </text>
                  </g>
                );
              })}

              {/* 篇之间的连接箭头 */}
              {si < SECTIONS.length - 1 && (
                <g>
                  <path
                    d={`M ${cx + COL_W + 2} ${80 + sectionH / 2} L ${cx + COL_W + COL_GAP - 6} ${80 + sectionH / 2}`}
                    stroke="var(--border)"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* 底部主程能力成长条 */}
        <g>
          <rect
            x={30}
            y={VIEW_H - 70}
            width={VIEW_W - 60}
            height={44}
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
            rx="8"
          />
          <text
            x={50}
            y={VIEW_H - 42}
            fill="var(--text-primary)"
            fontSize="13"
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
          >
            主程能力成长
          </text>
          <text
            x={50}
            y={VIEW_H - 24}
            fill="var(--text-secondary)"
            fontSize="11"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            架构思维 → 模块设计 → 性能意识 → 技术决策 → 工程负责
          </text>
          {/* 成长阶段点 */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={VIEW_W - 100 + i * 18}
              cy={VIEW_H - 48}
              r={4}
              fill={i === 0 ? "var(--accent)" : "var(--border)"}
            />
          ))}
        </g>

        {/* 箭头定义 */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--border)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
