import { OfficialCourseLab } from "../../official-course-lab";

/**
 * <HfdLearningMapDiagram>：《Head First 设计模式》全书学习地图。
 *
 * 五列布局对应五大板块：
 *   模式入门（紫）/ 封装变化（绿）/ 对象组合（橙）/ 状态变化（红）/ 模式总结（青）
 * 每列顶部彩色标题 pill，每个章节是一张圆角小卡片。
 * 底部总结栏点出全书主线：「封装变化」是核心心法。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const COL_W = 124;
const COL_GAP = 12;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const CARD_H = 30;
const CARD_GAP = 10;
const CARD_ROW = CARD_H + CARD_GAP;
const CARDS_TOP_Y = 156;

type Column = {
  id: string;
  name: string;
  color: string;
  chapters: string[];
};

const COLUMNS: readonly Column[] = [
  {
    id: "intro",
    name: "模式入门",
    color: "var(--accent)",
    chapters: ["1. 学习地图", "2. 策略模式"],
  },
  {
    id: "variation",
    name: "封装变化",
    color: "var(--success)",
    chapters: ["3. 观察者模式", "4. 装饰器模式"],
  },
  {
    id: "composition",
    name: "对象组合",
    color: "var(--warning)",
    chapters: ["5. 工厂模式", "6. 单例模式"],
  },
  {
    id: "state",
    name: "状态变化",
    color: "var(--danger)",
    chapters: ["7. 命令模式", "8. 适配器与外观"],
  },
  {
    id: "summary",
    name: "模式总结",
    color: "var(--accent)",
    chapters: ["9. 模板方法", "10. 总复习"],
  },
];

export function HfdLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Head First 设计模式全书学习地图。五列从左到右对应五大板块：模式入门（紫色，2章：学习地图、策略模式）、封装变化（绿色，2章：观察者模式、装饰器模式）、对象组合（橙色，2章：工厂模式、单例模式）、状态变化（红色，2章：命令模式、适配器与外观）、模式总结（青色，2章：模板方法、总复习）。底部总结：核心心法是「封装变化」，所有模式都是把变化的部分抽出来独立封装。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Head First 设计模式 · 全书学习地图
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            从模式入门 → 封装变化 → 对象组合 → 状态变化 → 模式总结，五段递进
          </text>

          {/* ===== 顶部心法条 ===== */}
          <rect
            x={COL_MARGIN}
            y="74"
            width={VIEW_W - COL_MARGIN * 2}
            height="32"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="95"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">
              核心心法
            </tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">
              把变化的部分抽出来，封装成独立对象
            </tspan>
          </text>

          {/* ===== 五列 ===== */}
          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                {/* 列头彩色 pill */}
                <rect
                  x={x}
                  y="116"
                  width={COL_W}
                  height="30"
                  rx="8"
                  fill={col.color}
                  fillOpacity="0.12"
                  stroke={col.color}
                  strokeWidth="1.2"
                />
                <text
                  x={x + COL_W / 2}
                  y="136"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.name}
                </text>

                {/* 章节卡片 */}
                {col.chapters.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  return (
                    <g key={name}>
                      <rect
                        x={x}
                        y={cy}
                        width={COL_W}
                        height={CARD_H}
                        rx="6"
                        fill="var(--bg)"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <circle
                        cx={x + 12}
                        cy={cy + CARD_H / 2}
                        r="3"
                        fill={col.color}
                      />
                      <text
                        x={x + COL_W / 2}
                        y={cy + CARD_H / 2 + 4}
                        textAnchor="middle"
                        fontSize="11"
                        fill="var(--text-primary)"
                      >
                        {name}
                      </text>
                      {pi < col.chapters.length - 1 && (
                        <line
                          x1={x + COL_W / 2}
                          y1={cy + CARD_H}
                          x2={x + COL_W / 2}
                          y2={cy + CARD_ROW - 2}
                          stroke="var(--accent)"
                          strokeWidth="1.4"
                          strokeOpacity="0.6"
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="60"
            y="340"
            width={VIEW_W - 120}
            height="52"
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="363"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            全书 10 章 · 五段递进 · 三大原则
          </text>
          <text
            x={VIEW_W / 2}
            y="382"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            多用组合少用继承 · 针对接口编程 · 对变化封装
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分五大板块：模式入门建立「针对接口编程」的思维方式，封装变化用观察者和装饰器隔离变化点，对象组合用工厂和单例管理对象创建，状态变化用命令和适配器解耦请求与实现，模式总结串联模板方法与全书原则。
      </figcaption>
    </figure>
  );
}

// OFFICIAL_QUALITY_WRAPPER_HeadFirstDesignPatterns_HfdLearningMap
const officialQualityProps = {
  title: "学习地图",
  stages: [
    "学习地图",
    "为什么需要一张地图",
    "五大板块一览",
    "三大设计原则",
    "交互Demo",
  ],
  sourceLabel: "O'Reilly Head First Design Patterns 2e",
} as const;

export function OfficialHeadFirstDesignPatternsHfdLearningMapMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialHeadFirstDesignPatternsHfdLearningMapExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialHeadFirstDesignPatternsHfdLearningMapEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
