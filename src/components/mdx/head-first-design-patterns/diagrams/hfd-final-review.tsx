import { OfficialCourseLab } from "../../official-course-lab";

/**
 * <HfdFinalReviewDiagram>：全书模式分类总览（Head First 设计模式 · 总复习章）。
 *
 * 三列对应 GoF 三大分类：
 *   创建型（紫）/ 结构型（绿）/ 行为型（橙）
 * 每列列出本书覆盖的模式，底部标注三大设计原则。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

type Category = {
  id: string;
  name: string;
  color: string;
  desc: string;
  patterns: { name: string; covered: boolean }[];
};

const CATEGORIES: readonly Category[] = [
  {
    id: "creational",
    name: "创建型",
    color: "var(--accent)",
    desc: "对象的创建",
    patterns: [
      { name: "单例模式", covered: true },
      { name: "工厂方法", covered: true },
      { name: "抽象工厂", covered: true },
      { name: "建造者模式", covered: false },
      { name: "原型模式", covered: false },
    ],
  },
  {
    id: "structural",
    name: "结构型",
    color: "var(--success)",
    desc: "对象的组合",
    patterns: [
      { name: "装饰器模式", covered: true },
      { name: "适配器模式", covered: true },
      { name: "外观模式", covered: true },
      { name: "代理模式", covered: false },
      { name: "组合模式", covered: false },
    ],
  },
  {
    id: "behavioral",
    name: "行为型",
    color: "var(--warning)",
    desc: "对象的交互",
    patterns: [
      { name: "策略模式", covered: true },
      { name: "观察者模式", covered: true },
      { name: "命令模式", covered: true },
      { name: "模板方法", covered: true },
      { name: "状态模式", covered: false },
    ],
  },
];

export function HfdFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Head First 设计模式全书模式分类总览。三大分类：创建型（紫色）包含单例、工厂方法、抽象工厂，本书覆盖前三个；结构型（绿色）包含装饰器、适配器、外观，本书覆盖前三个；行为型（橙色）包含策略、观察者、命令、模板方法，本书覆盖前四个。底部三大原则：针对接口编程、多用组合少用继承、对变化封装。"
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
            设计模式 · GoF 分类总览
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            本书覆盖 8
            个核心模式（实心圆），按创建型、结构型、行为型三大分类组织
          </text>

          {/* ===== 三列 ===== */}
          {CATEGORIES.map((cat, ci) => {
            const x = 40 + ci * 218;
            const w = 198;
            return (
              <g key={cat.id}>
                {/* 列头 */}
                <rect
                  x={x}
                  y="74"
                  width={w}
                  height="40"
                  rx="8"
                  fill={cat.color}
                  fillOpacity="0.12"
                  stroke={cat.color}
                  strokeWidth="1.2"
                />
                <text
                  x={x + w / 2}
                  y="92"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={cat.color}
                >
                  {cat.name}
                </text>
                <text
                  x={x + w / 2}
                  y="108"
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  关注{cat.desc}
                </text>

                {/* 模式列表 */}
                {cat.patterns.map((p, pi) => {
                  const py = 128 + pi * 32;
                  return (
                    <g key={p.name}>
                      <rect
                        x={x}
                        y={py}
                        width={w}
                        height="28"
                        rx="6"
                        fill="var(--bg)"
                        stroke={p.covered ? cat.color : "var(--border)"}
                        strokeWidth="1"
                        strokeOpacity={p.covered ? "0.6" : "1"}
                      />
                      <circle
                        cx={x + 14}
                        cy={py + 14}
                        r="4"
                        fill={p.covered ? cat.color : "var(--bg)"}
                        stroke={p.covered ? cat.color : "var(--border)"}
                        strokeWidth="1.2"
                      />
                      <text
                        x={x + 26}
                        y={py + 18}
                        fontSize="11"
                        fill={
                          p.covered
                            ? "var(--text-primary)"
                            : "var(--text-secondary)"
                        }
                        fontWeight={p.covered ? "600" : "400"}
                      >
                        {p.name}
                      </text>
                      {p.covered && (
                        <text
                          x={x + w - 10}
                          y={py + 18}
                          textAnchor="end"
                          fontSize="10"
                          fill={cat.color}
                        >
                          本书
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 底部三大原则 ===== */}
          <rect
            x="40"
            y="316"
            width={VIEW_W - 80}
            height="80"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="338"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            三大设计原则（贯穿全书）
          </text>
          <text x="60" y="360" fontSize="11" fill="var(--text-primary)">
            1. 针对接口编程，不针对实现编程——客户端面向抽象，不依赖具体类
          </text>
          <text x="60" y="376" fontSize="11" fill="var(--text-primary)">
            2. 多用组合，少用继承——行为用组合注入，不用继承硬编码
          </text>
          <text x="60" y="392" fontSize="11" fill="var(--text-primary)">
            3. 为交互对象之间的松耦合设计——变化点独立封装，互不影响
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书覆盖 8 个 GoF
        核心模式：创建型（单例、工厂方法、抽象工厂）、结构型（装饰器、适配器、外观）、行为型（策略、观察者、命令、模板方法）。三大原则贯穿所有模式——针对接口编程、多用组合少用继承、对变化封装。
      </figcaption>
    </figure>
  );
}

// OFFICIAL_QUALITY_WRAPPER_HeadFirstDesignPatterns_HfdFinalReview
const officialQualityProps = {
  title: "总复习",
  stages: [
    "总复习",
    "回到起点",
    "GoF 三大分类",
    "三大原则贯穿全书",
    "交互Demo",
  ],
  sourceLabel: "O'Reilly Head First Design Patterns 2e",
} as const;

export function OfficialHeadFirstDesignPatternsHfdFinalReviewMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialHeadFirstDesignPatternsHfdFinalReviewExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialHeadFirstDesignPatternsHfdFinalReviewEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
