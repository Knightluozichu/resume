import { OfficialCourseLab } from "../../official-course-lab";

/**
 * <HfdCommandDiagram>：命令模式 UML 类图（Head First 设计模式 · 命令模式章）。
 *
 * 以遥控器为例：
 *   RemoteControl（Invoker）持有 Command 数组，按键执行 command.execute()。
 *   Command 接口 ← LightOnCommand（ConcreteCommand）持有 Light（Receiver）引用。
 *   底部展示宏命令（一组命令批量执行）。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function HfdCommandDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="命令模式 UML 类图。RemoteControl 是 Invoker，持有 Command 数组，按键时调用 command.execute()。Command 接口声明 execute 和 undo 方法。LightOnCommand 是具体命令，持有 Light（Receiver）引用，execute 调用 light.on()。MacroCommand 持有一组 Command，execute 逐个调用。请求者不直接操作接收者，通过命令对象解耦。"
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
            命令模式 · 遥控器示例
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            把请求封装成对象，Invoker 不直接操作 Receiver，通过 Command 解耦
          </text>

          {/* ===== 左侧：Invoker ===== */}
          <rect
            x="36"
            y="78"
            width="170"
            height="96"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <rect
            x="36"
            y="78"
            width="170"
            height="24"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
          />
          <text
            x="121"
            y="95"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            RemoteControl（Invoker）
          </text>
          <text x="44" y="120" fontSize="11" fill="var(--text-primary)">
            - onCommands[]: Command
          </text>
          <text x="44" y="136" fontSize="11" fill="var(--text-primary)">
            - offCommands[]: Command
          </text>
          <line
            x1="44"
            y1="142"
            x2="198"
            y2="142"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x="44" y="158" fontSize="11" fill="var(--text-primary)">
            onButtonPressed(slot)
          </text>
          <text x="44" y="170" fontSize="11" fill="var(--text-secondary)">
            → onCommands[slot].execute()
          </text>

          {/* ===== 中间：Command 接口 ===== */}
          <rect
            x="260"
            y="78"
            width="160"
            height="60"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />
          <rect
            x="260"
            y="78"
            width="160"
            height="24"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
          />
          <text
            x="340"
            y="95"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            «interface» Command
          </text>
          <text
            x="340"
            y="120"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            + execute()
          </text>
          <text
            x="340"
            y="134"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            + undo()
          </text>

          {/* 委托箭头：Invoker → Command */}
          <line
            x1="206"
            y1="108"
            x2="260"
            y2="108"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <polygon points="260,108 254,105 254,111" fill="var(--accent)" />
          <text
            x="233"
            y="102"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            持有
          </text>

          {/* ===== 右侧：Receiver ===== */}
          <rect
            x="520"
            y="78"
            width="164"
            height="78"
            rx="8"
            fill="var(--bg)"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <rect
            x="520"
            y="78"
            width="164"
            height="24"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.12"
          />
          <text
            x="602"
            y="95"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--warning)"
          >
            Light（Receiver）
          </text>
          <text x="530" y="120" fontSize="11" fill="var(--text-primary)">
            - on: boolean
          </text>
          <line
            x1="530"
            y1="126"
            x2="674"
            y2="126"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x="530" y="142" fontSize="11" fill="var(--text-primary)">
            + on() / + off()
          </text>

          {/* ===== 中下：ConcreteCommand ===== */}
          <rect
            x="180"
            y="180"
            width="200"
            height="80"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <rect
            x="180"
            y="180"
            width="200"
            height="24"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
          />
          <text
            x="280"
            y="197"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            LightOnCommand
          </text>
          <text x="190" y="220" fontSize="11" fill="var(--text-primary)">
            - light: Light
          </text>
          <line
            x1="190"
            y1="226"
            x2="370"
            y2="226"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x="190" y="242" fontSize="11" fill="var(--text-primary)">
            {"execute() { light.on() }"}
          </text>
          <text x="190" y="256" fontSize="11" fill="var(--text-primary)">
            {"undo() { light.off() }"}
          </text>

          {/* 实现箭头：ConcreteCommand → Command */}
          <line
            x1="280"
            y1="180"
            x2="340"
            y2="138"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* 委托箭头：ConcreteCommand → Receiver */}
          <line
            x1="380"
            y1="220"
            x2="520"
            y2="117"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <polygon points="520,117 512,114 513,122" fill="var(--success)" />
          <text
            x="460"
            y="172"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            调用
          </text>

          {/* ===== 右下：MacroCommand ===== */}
          <rect
            x="460"
            y="180"
            width="224"
            height="80"
            rx="8"
            fill="var(--bg)"
            stroke="var(--danger)"
            strokeWidth="1.4"
          />
          <rect
            x="460"
            y="180"
            width="224"
            height="24"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.12"
          />
          <text
            x="572"
            y="197"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--danger)"
          >
            MacroCommand
          </text>
          <text x="470" y="220" fontSize="11" fill="var(--text-primary)">
            - commands[]: Command
          </text>
          <line
            x1="470"
            y1="226"
            x2="674"
            y2="226"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x="470" y="242" fontSize="11" fill="var(--text-primary)">
            {"execute() { 遍历 commands"}
          </text>
          <text x="470" y="256" fontSize="11" fill="var(--text-primary)">
            {"  逐个 .execute() }"}
          </text>

          {/* 实现箭头：MacroCommand → Command */}
          <line
            x1="460"
            y1="195"
            x2="420"
            y2="108"
            stroke="var(--danger)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* ===== 底部总结 ===== */}
          <rect
            x="36"
            y="298"
            width={VIEW_W - 72}
            height="94"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="320"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            命令模式的价值
          </text>
          <text x="56" y="342" fontSize="11" fill="var(--text-primary)">
            1. 请求者与接收者解耦：Invoker 不知道 Receiver 是谁，只管
            execute()。
          </text>
          <text x="56" y="360" fontSize="11" fill="var(--text-primary)">
            2. 可撤销：命令对象记录状态，undo() 回滚操作，实现 undo/redo 队列。
          </text>
          <text x="56" y="378" fontSize="11" fill="var(--text-primary)">
            3. 可组合：MacroCommand 把多个命令组合成一个，一键执行一组操作。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        命令模式把请求封装成对象，Invoker 通过 Command 接口间接操作
        Receiver。命令对象可存储、传递、排队、撤销和组合，让请求的生命周期脱离调用栈，支持
        undo/redo 和宏操作。
      </figcaption>
    </figure>
  );
}

// OFFICIAL_QUALITY_WRAPPER_HeadFirstDesignPatterns_HfdCommand
const officialQualityProps = {
  title: "命令模式",
  stages: ["第6章 命令模式", "封装请求", "调用者与接收者", "撤销", "宏命令"],
  sourceLabel: "O'Reilly Head First Design Patterns 2e",
} as const;

export function OfficialHeadFirstDesignPatternsHfdCommandMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialHeadFirstDesignPatternsHfdCommandExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialHeadFirstDesignPatternsHfdCommandEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
