import { OfficialCourseLab } from "../../official-course-lab";

/**
 * <HfdStrategyDiagram>：策略模式 UML 类图（Head First 设计模式 · 策略模式章）。
 *
 * 以鸭子游戏为例：
 *   Duck（Context）持有 FlyBehavior 和 QuackBehavior 两个策略接口引用，
 *   具体飞行/叫声行为是独立类，运行时可替换。
 *   右侧对比「继承方案」vs「策略方案」。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function HfdStrategyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="策略模式 UML 类图。Duck 作为 Context 持有 FlyBehavior 和 QuackBehavior 两个策略接口。FlyBehavior 有三个具体实现：FlyWithWings、FlyNoWay、FlyRocketPowered。QuackBehavior 有三个具体实现：Quack、Squeak、MuteQuack。Duck 把 fly() 和 quack() 委托给当前策略对象。右侧对比：继承方案中所有子类共享同一行为无法单独改变，策略方案中每个 Duck 可独立组合行为。"
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
            策略模式 · 鸭子游戏示例
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            把「行为」抽成接口，Duck 委托给策略对象，运行时可替换
          </text>

          {/* ===== 左侧：Context（Duck） ===== */}
          <rect
            x="40"
            y="78"
            width="150"
            height="96"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <rect
            x="40"
            y="78"
            width="150"
            height="24"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
          />
          <text
            x="115"
            y="95"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            Duck（Context）
          </text>
          <text x="48" y="120" fontSize="11" fill="var(--text-primary)">
            - flyBehavior
          </text>
          <text x="48" y="136" fontSize="11" fill="var(--text-primary)">
            - quackBehavior
          </text>
          <line
            x1="48"
            y1="142"
            x2="182"
            y2="142"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x="48" y="158" fontSize="11" fill="var(--text-primary)">
            {"performFly() {"}
          </text>
          <text x="52" y="170" fontSize="11" fill="var(--text-secondary)">
            flyBehavior.fly()
          </text>

          {/* ===== 中间：FlyBehavior 接口 ===== */}
          <rect
            x="250"
            y="78"
            width="170"
            height="60"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />
          <rect
            x="250"
            y="78"
            width="170"
            height="24"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
          />
          <text
            x="335"
            y="95"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            «interface» FlyBehavior
          </text>
          <text
            x="335"
            y="122"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            + fly()
          </text>

          {/* ===== 中间：QuackBehavior 接口 ===== */}
          <rect
            x="250"
            y="158"
            width="170"
            height="60"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />
          <rect
            x="250"
            y="158"
            width="170"
            height="24"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
          />
          <text
            x="335"
            y="175"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            «interface» QuackBehavior
          </text>
          <text
            x="335"
            y="202"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            + quack()
          </text>

          {/* 委托箭头：Duck → FlyBehavior */}
          <line
            x1="190"
            y1="108"
            x2="250"
            y2="108"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <polygon points="250,108 244,105 244,111" fill="var(--accent)" />
          <text
            x="220"
            y="102"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            委托
          </text>

          {/* 委托箭头：Duck → QuackBehavior */}
          <line
            x1="190"
            y1="165"
            x2="250"
            y2="188"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <polygon points="250,188 244,183 245,193" fill="var(--accent)" />
          <text
            x="220"
            y="180"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            委托
          </text>

          {/* ===== 右侧：具体策略 ===== */}
          {/* Fly 实现类 */}
          <rect
            x="480"
            y="72"
            width="200"
            height="24"
            rx="6"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="580"
            y="89"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            FlyWithWings implements fly()
          </text>

          <rect
            x="480"
            y="102"
            width="200"
            height="24"
            rx="6"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="580"
            y="119"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            FlyNoWay implements fly()
          </text>

          <rect
            x="480"
            y="132"
            width="200"
            height="24"
            rx="6"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="580"
            y="149"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            FlyRocketPowered implements fly()
          </text>

          {/* 实现箭头：FlyBehavior ← 具体类 */}
          <line
            x1="420"
            y1="108"
            x2="480"
            y2="96"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <line
            x1="420"
            y1="108"
            x2="480"
            y2="126"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <line
            x1="420"
            y1="108"
            x2="480"
            y2="156"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* Quack 实现类 */}
          <rect
            x="480"
            y="180"
            width="200"
            height="24"
            rx="6"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="580"
            y="197"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            Quack implements quack()
          </text>

          <rect
            x="480"
            y="210"
            width="200"
            height="24"
            rx="6"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="580"
            y="227"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            Squeak implements quack()
          </text>

          <rect
            x="480"
            y="240"
            width="200"
            height="24"
            rx="6"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="580"
            y="257"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            MuteQuack implements quack()
          </text>

          {/* 实现箭头：QuackBehavior ← 具体类 */}
          <line
            x1="420"
            y1="188"
            x2="480"
            y2="192"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <line
            x1="420"
            y1="188"
            x2="480"
            y2="222"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <line
            x1="420"
            y1="188"
            x2="480"
            y2="252"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* ===== 底部对比栏 ===== */}
          <rect
            x="40"
            y="290"
            width="310"
            height="100"
            rx="10"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="195"
            y="312"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--danger)"
          >
            继承方案（反模式）
          </text>
          <text x="50" y="332" fontSize="11" fill="var(--text-primary)">
            所有鸭子子类继承同一 fly()，
          </text>
          <text x="50" y="348" fontSize="11" fill="var(--text-primary)">
            橡皮鸭不会飞却继承了飞行代码，
          </text>
          <text x="50" y="364" fontSize="11" fill="var(--text-primary)">
            改一个行为要改所有子类，
          </text>
          <text x="50" y="380" fontSize="11" fill="var(--text-primary)">
            无法运行时动态切换行为。
          </text>

          <rect
            x="370"
            y="290"
            width="310"
            height="100"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="525"
            y="312"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            策略方案
          </text>
          <text x="380" y="332" fontSize="11" fill="var(--text-primary)">
            行为独立成接口，Duck 持有引用，
          </text>
          <text x="380" y="348" fontSize="11" fill="var(--text-primary)">
            setter 可运行时替换行为，
          </text>
          <text x="380" y="364" fontSize="11" fill="var(--text-primary)">
            新增行为只需加类不改 Duck，
          </text>
          <text x="380" y="380" fontSize="11" fill="var(--text-primary)">
            符合「多用组合少用继承」。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Duck
        把飞行和叫声行为委托给策略接口，具体行为是可替换的独立类。继承方案把行为硬编码在父类，修改波及所有子类；策略方案用组合代替继承，行为可独立变化和运行时切换。
      </figcaption>
    </figure>
  );
}

// OFFICIAL_QUALITY_WRAPPER_HeadFirstDesignPatterns_HfdStrategy
const officialQualityProps = {
  title: "策略模式",
  stages: [
    "第1章 设计模式入门",
    "封装变化",
    "组合优于继承",
    "策略接口",
    "运行时替换",
  ],
  sourceLabel: "O'Reilly Head First Design Patterns 2e",
} as const;

export function OfficialHeadFirstDesignPatternsHfdStrategyMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialHeadFirstDesignPatternsHfdStrategyExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialHeadFirstDesignPatternsHfdStrategyEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
