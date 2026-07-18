import { OfficialCourseLab } from "../../official-course-lab";

/**
 * <HfdTemplateMethodDiagram>：模板方法模式 UML 类图（Head First 设计模式 · 模板方法章）。
 *
 * 以咖啡因饮料为例：
 *   CaffeineBeverage（AbstractClass）定义 prepareRecipe() 模板方法，
 *   固定步骤顺序：boilWater → brew → pourInCup → addCondiments。
 *   brew() 和 addCondiments() 是抽象方法，由子类（Coffee/Tea）实现。
 *   hook() 是可选钩子，子类可选择覆盖。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function HfdTemplateMethodDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模板方法模式 UML 类图。CaffeineBeverage 抽象类定义 prepareRecipe 模板方法，固定步骤顺序：boilWater、brew、pourInCup、addCondiments。其中 boilWater 和 pourInCup 是具体方法（final 不可覆盖），brew 和 addCondiments 是抽象方法由子类实现。customerWantsCondiments 是钩子方法默认返回 true。Coffee 子类实现 brew 用咖啡粉冲泡、addCondiments 加糖奶。Tea 子类实现 brew 用茶包浸泡、addCondiments 加柠檬。"
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
            模板方法模式 · 咖啡因饮料示例
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            父类定义算法骨架，子类实现具体步骤；控制权在父类，细节在子类
          </text>

          {/* ===== 顶部中心：AbstractClass ===== */}
          <rect
            x="210"
            y="74"
            width="300"
            height="128"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <rect
            x="210"
            y="74"
            width="300"
            height="24"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
          />
          <text
            x="360"
            y="91"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            «abstract» CaffeineBeverage
          </text>

          {/* 模板方法 */}
          <text
            x="220"
            y="114"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            + prepareRecipe() {`{`}
          </text>
          <text x="228" y="128" fontSize="11" fill="var(--text-primary)">
            boilWater();
          </text>
          <text x="228" y="142" fontSize="11" fill="var(--text-primary)">
            brew();
          </text>
          <text x="228" y="156" fontSize="11" fill="var(--text-primary)">
            pourInCup();
          </text>
          <text x="228" y="170" fontSize="11" fill="var(--text-primary)">
            addCondiments();
          </text>
          <text
            x="220"
            y="184"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            {"}"}
          </text>

          {/* 抽象方法 + 钩子 */}
          <text x="430" y="114" fontSize="11" fill="var(--success)">
            abstract brew()
          </text>
          <text x="430" y="130" fontSize="11" fill="var(--success)">
            abstract addCondiments()
          </text>
          <line
            x1="430"
            y1="136"
            x2="500"
            y2="136"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x="430" y="152" fontSize="11" fill="var(--text-secondary)">
            final boilWater()
          </text>
          <text x="430" y="168" fontSize="11" fill="var(--text-secondary)">
            final pourInCup()
          </text>
          <text x="430" y="184" fontSize="11" fill="var(--warning)">
            hook: wantsCondiments()
          </text>

          {/* ===== 左下：Coffee ===== */}
          <rect
            x="36"
            y="230"
            width="300"
            height="92"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <rect
            x="36"
            y="230"
            width="300"
            height="24"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
          />
          <text
            x="186"
            y="247"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            Coffee
          </text>
          <text x="46" y="270" fontSize="11" fill="var(--text-primary)">
            brew() {`{`}
          </text>
          <text x="50" y="284" fontSize="11" fill="var(--text-secondary)">
            {'System.out.println("冲咖啡粉");'}
          </text>
          <text x="46" y="300" fontSize="11" fill="var(--text-primary)">
            addCondiments() {`{`}
          </text>
          <text x="50" y="314" fontSize="11" fill="var(--text-secondary)">
            {'System.out.println("加糖和奶");'}
          </text>

          {/* 继承箭头：Coffee → AbstractClass */}
          <line
            x1="186"
            y1="230"
            x2="280"
            y2="202"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* ===== 右下：Tea ===== */}
          <rect
            x="384"
            y="230"
            width="300"
            height="92"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <rect
            x="384"
            y="230"
            width="300"
            height="24"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
          />
          <text
            x="534"
            y="247"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            Tea
          </text>
          <text x="394" y="270" fontSize="11" fill="var(--text-primary)">
            brew() {`{`}
          </text>
          <text x="398" y="284" fontSize="11" fill="var(--text-secondary)">
            {'System.out.println("茶包浸泡");'}
          </text>
          <text x="394" y="300" fontSize="11" fill="var(--text-primary)">
            addCondiments() {`{`}
          </text>
          <text x="398" y="314" fontSize="11" fill="var(--text-secondary)">
            {'System.out.println("加柠檬");'}
          </text>

          {/* 继承箭头：Tea → AbstractClass */}
          <line
            x1="534"
            y1="230"
            x2="440"
            y2="202"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* ===== 底部总结 ===== */}
          <rect
            x="36"
            y="340"
            width={VIEW_W - 72}
            height="56"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="362"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            模板方法 = 好莱坞原则
          </text>
          <text
            x={VIEW_W / 2}
            y="382"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            「别调用我们，我们会调用你」——父类控制流程，子类只填空；抽象方法强制实现，钩子方法可选覆盖
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模板方法在父类定义算法骨架（final
        不可覆盖），把可变步骤声明为抽象方法交子类实现。钩子方法提供默认实现，子类可选择覆盖以影响流程。这是好莱坞原则的体现：高层组件控制流程，低层组件只提供实现。
      </figcaption>
    </figure>
  );
}

// OFFICIAL_QUALITY_WRAPPER_HeadFirstDesignPatterns_HfdTemplateMethod
const officialQualityProps = {
  title: "模板方法",
  stages: ["第8章 模板方法模式", "算法骨架", "原语操作", "钩子", "好莱坞原则"],
  sourceLabel: "O'Reilly Head First Design Patterns 2e",
} as const;

export function OfficialHeadFirstDesignPatternsHfdTemplateMethodMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialHeadFirstDesignPatternsHfdTemplateMethodExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialHeadFirstDesignPatternsHfdTemplateMethodEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
