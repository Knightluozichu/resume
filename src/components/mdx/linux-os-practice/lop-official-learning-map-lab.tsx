"use client";

import { useEffect, useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";

export type MapFault = "none" | "root" | "path" | "permission";
export type MapCommand = "external" | "builtin";
export const mapSteps = [
  { label: "host", caption: "宿主提供虚拟硬件" },
  { label: "boot", caption: "来宾内核访问根文件系统" },
  { label: "shell", caption: "来宾 Shell 接收命令" },
  { label: "lookup", caption: "解析内建或查找外部程序" },
  { label: "open", caption: "外部程序请求打开输入文件" },
  { label: "output", caption: "观察输出与退出状态" },
] as const;
const labelText = Object.fromEntries(mapSteps.map((s) => [s.label, s.caption]));
const build: BuildTimeline = (timeline) => {
  const clock = { value: 0 };
  for (let i = 0; i < mapSteps.length; i++) {
    timeline.label(mapSteps[i].label, i * 900);
    timeline.add(
      clock,
      { value: i + 1, duration: 900, ease: "linear" },
      i * 900,
    );
  }
};

/** Finite pedagogical model, not a Linux emulator or a trace from a real VM. */
export function deriveMapState(
  command: MapCommand,
  fault: MapFault,
  frame: number,
) {
  const failedAt =
    fault === "root"
      ? 1
      : command === "external" && fault === "path"
        ? 3
        : command === "external" && fault === "permission"
          ? 4
          : null;
  const reached = failedAt !== null && frame >= failedAt ? failedAt : frame;
  const failed = failedAt !== null && frame >= failedAt;
  const result = failed
    ? fault === "root"
      ? "未到 Shell"
      : fault === "path"
        ? "查找失败：127"
        : "读文件失败：模型值 1"
    : frame === 5
      ? "成功：模型值 0"
      : "尚无最终结果";
  const prediction = failedAt === null ? "success" : fault;
  const explanation = failed
    ? fault === "root"
      ? "本模型在来宾根文件系统处停止：没有启动交互 Shell，不能把故障归因于 PATH。真实系统须查看来宾控制台、启动参数和磁盘挂载证据。"
      : fault === "path"
        ? "Shell 已运行，但测试 PATH 不含 cat 所在目录，且模型假设无缓存、别名或同名函数；未启动 cat。Bash 的命令未找到状态为 127。"
        : "cat 已被找到并运行；它请求内核打开 input.txt，普通用户被文件权限拒绝。这里的 1 是教学模型值，不代表所有程序都使用相同错误码。"
    : command === "builtin"
      ? "pwd 在这个无函数、无别名的 Bash 模型中是内建命令。它不依赖 PATH 查找 cat，也不读取 input.txt；这两个故障不阻断它。其真实工作目录获取仍可能涉及内核。"
      : "cat 经 PATH 定位后作为来宾进程执行；内核检查文件访问并提供数据。看到 ok 只能支持本次来宾命令路径成功，不能证明宿主配置、网络或项目正确。";
  return { failedAt, reached, failed, result, prediction, explanation };
}

const faults: { value: MapFault; label: string }[] = [
  { value: "none", label: "无故障" },
  { value: "root", label: "根文件系统不可用" },
  { value: "path", label: "PATH 缺少程序目录" },
  { value: "permission", label: "input.txt 不可读" },
];
const guesses = [
  { value: "success", label: "能输出" },
  { value: "root", label: "到不了 Shell" },
  { value: "path", label: "找不到程序" },
  { value: "permission", label: "读文件被拒绝" },
];
const buttonClass =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent aria-pressed:border-accent aria-pressed:text-accent";

function MapExperiment({ reset }: { reset: () => void }) {
  const [command, setCommand] = useState<MapCommand>("external");
  const [fault, setFault] = useState<MapFault>("none");
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const timeline = useTeachingTimeline({ steps: mapSteps, build });
  // Preference changes during playback must stop the existing animation too.
  const { reducedMotion, pause } = timeline;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  const state = deriveMapState(command, fault, timeline.currentStep);
  function rewind() {
    timeline.pause();
    timeline.goToStep(0);
    setChecked(false);
    setGuess("");
  }
  const active = (stage: number) =>
    state.reached >= stage && !(state.failed && state.reached === stage);
  const stroke = (stage: number) =>
    active(stage) ? "var(--accent)" : "var(--border)";
  return (
    <section
      aria-label="启动和命令依赖实验，教学模型非真实虚拟机"
      data-testid="lop-map-lab"
      data-frame={timeline.currentStep}
      data-reached={state.reached}
      data-playing={timeline.isPlaying}
      data-reduced-motion={reducedMotion}
      className="not-prose my-6 min-w-0 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input[type=range]]:h-11"
    >
      <h3 className="text-lg font-semibold">哪一层先失效？</h3>
      <p className="my-2 text-sm">
        固定普通用户、已知目录与文件内容
        ok；不模拟启动细节、缓存、别名、函数、ACL
        或网络文件系统。先选条件和预测，再验证。改变条件会暂停并回到首帧。
      </p>
      <fieldset className="my-3">
        <legend>命令参数</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ["external", "外部 cat input.txt"],
              ["builtin", "内建 pwd"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              data-testid={`lop-command-${value}`}
              aria-pressed={command === value}
              className={buttonClass}
              onClick={() => {
                rewind();
                setCommand(value);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="my-3">
        <legend>单个故障（不改变宿主）</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {faults.map((item) => (
            <button
              key={item.value}
              type="button"
              data-testid={`lop-fault-${item.value}`}
              aria-pressed={fault === item.value}
              className={buttonClass}
              onClick={() => {
                rewind();
                setFault(item.value);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="my-3">
        <legend>先预测最终边界</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {guesses.map((item) => (
            <button
              key={item.value}
              type="button"
              data-testid={`lop-predict-${item.value}`}
              aria-pressed={guess === item.value}
              className={buttonClass}
              onClick={() => {
                setGuess(item.value);
                setChecked(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        data-testid="lop-check"
        disabled={!guess}
        className={`${buttonClass} disabled:opacity-50`}
        onClick={() => {
          timeline.goToStep(5);
          setChecked(true);
        }}
      >
        验证预测并显示终态
      </button>
      <div className="mx-auto my-4 w-full max-w-80">
        <svg
          viewBox="0 0 320 530"
          role="img"
          aria-label={`嵌套宿主与来宾；帧 ${timeline.currentStep}，${state.result}。路径断口表示首个失败边界。`}
          className="block h-auto w-full"
          style={{ fontSize: 16 }}
        >
          <rect
            x="2"
            y="2"
            width="316"
            height="526"
            rx="12"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
          />
          <text x="15" y="28" fill="var(--text-primary)">
            宿主：虚拟磁盘 / CPU
          </text>
          <path d="M160 40 V68" stroke={stroke(0)} strokeWidth="4" />
          <rect
            x="10"
            y="68"
            width="300"
            height="446"
            rx="10"
            fill="none"
            stroke={stroke(1)}
            strokeWidth="2"
          />
          <text x="24" y="94" fill="var(--text-primary)">
            来宾 Ubuntu（不是宿主）
          </text>
          <ellipse
            cx="160"
            cy="130"
            rx="110"
            ry="23"
            fill="none"
            stroke={stroke(1)}
            strokeWidth="3"
          />
          <text x="160" y="136" textAnchor="middle" fill="var(--text-primary)">
            内核 + 根文件系统
          </text>
          <path
            d="M160 154 V186"
            stroke={stroke(2)}
            strokeWidth="4"
            strokeDasharray={state.failedAt === 1 ? "4 8" : undefined}
          />
          <rect
            x="50"
            y="186"
            width="220"
            height="48"
            rx="5"
            fill="none"
            stroke={stroke(2)}
            strokeWidth="3"
          />
          <text x="160" y="215" textAnchor="middle" fill="var(--text-primary)">
            Shell 解析命令
          </text>
          <path
            d={
              command === "external"
                ? "M160 234 L95 270 V303"
                : "M160 234 L255 270 V465 H160"
            }
            fill="none"
            stroke={stroke(3)}
            strokeWidth="4"
            strokeDasharray={state.failedAt === 3 ? "4 8" : undefined}
          />
          <text x="25" y="265" fill="var(--text-primary)">
            外部查找
          </text>
          <text x="194" y="265" fill="var(--text-primary)">
            内建直达
          </text>
          <rect
            x="30"
            y="303"
            width="176"
            height="48"
            rx="5"
            fill="none"
            stroke={command === "external" ? stroke(3) : "var(--border)"}
            strokeWidth="3"
          />
          <text x="118" y="332" textAnchor="middle" fill="var(--text-primary)">
            cat 进程（来宾）
          </text>
          <path
            d="M118 351 V383"
            stroke={command === "external" ? stroke(4) : "var(--border)"}
            strokeWidth="4"
            strokeDasharray={state.failedAt === 4 ? "4 8" : undefined}
          />
          <path
            d="M38 383 H196 V433 H38 Z M38 393 H196"
            fill="none"
            stroke={command === "external" ? stroke(4) : "var(--border)"}
            strokeWidth="3"
          />
          <text x="118" y="417" textAnchor="middle" fill="var(--text-primary)">
            内核检查读权限
          </text>
          <path
            d="M118 433 V465 H160"
            fill="none"
            stroke={command === "external" ? stroke(5) : "var(--border)"}
            strokeWidth="4"
          />
          <circle
            cx="160"
            cy="465"
            r="7"
            fill={active(5) ? "var(--accent)" : "var(--border)"}
          />
          <text x="160" y="497" textAnchor="middle" fill="var(--text-primary)">
            输出 + 退出状态
          </text>
          {state.failed && (
            <g stroke="var(--accent)" strokeWidth="4">
              <path
                d={`M143 ${state.reached === 1 ? 163 : state.reached === 3 ? 277 : 363} l18 14 m0 -14 l-18 14`}
              />
            </g>
          )}
        </svg>
      </div>
      <div className="mx-auto my-4 w-full max-w-80">
        <svg
          viewBox="0 0 320 550"
          className="block h-auto w-full"
          role="img"
          aria-label="九主题建议依赖图：环境到命令，分支到身份、软件和网络；软件到工具链，命令到脚本再到正则，工具链与脚本和正则汇入项目。根文件系统故障阻断来宾命令实验入口。"
          style={{ fontSize: 16 }}
        >
          <g
            fill="none"
            stroke={
              fault === "root" && state.failed
                ? "var(--border)"
                : "var(--accent)"
            }
            strokeWidth="2"
          >
            <path d="M160 48 V120 M160 143 L45 215 M160 143 V215 M160 143 L270 215 M160 143 L230 320 M160 239 L70 320 M230 344 V415 M70 344 V495 M230 344 L80 495 M230 439 L80 495" />
          </g>
          {[
            [1, 160, 36, "环境"],
            [2, 160, 132, "命令"],
            [3, 45, 227, "身份"],
            [4, 160, 227, "软件"],
            [6, 270, 227, "网络"],
            [5, 70, 332, "工具链"],
            [7, 230, 332, "脚本"],
            [8, 230, 427, "正则"],
            [9, 80, 507, "项目"],
          ].map(([id, x, y, title]) => (
            <g key={id}>
              <circle
                cx={Number(x)}
                cy={Number(y)}
                r="12"
                fill="var(--bg-elevated)"
                stroke={
                  fault === "root" && state.failed
                    ? "var(--border)"
                    : "var(--accent)"
                }
                strokeWidth="3"
              />
              <text
                x={Number(x)}
                y={Number(y) + 38}
                textAnchor="middle"
                fill="var(--text-primary)"
              >
                {id} {title}
              </text>
            </g>
          ))}
          {state.failed && (
            <text x="160" y="94" textAnchor="middle" fill="var(--accent)">
              {fault === "root"
                ? "入口中断"
                : fault === "path"
                  ? "命令查找反例"
                  : "身份权限反例"}
            </text>
          )}
        </svg>
      </div>
      <p className="text-sm">
        连线是本站建议的学习前置关系，不是内核调用图，也不是原书的强制顺序。身份规则横跨各分支；网络可并行学习，并非本地游戏的必需依赖。暗线只表示根文件系统故障使来宾命令实验暂不可进入，不代表学习记录被抹除。
      </p>
      <p data-testid="lop-result" role="status">
        {state.result}
        {checked
          ? `；预测${guess === state.prediction ? "符合模型" : "不符，请定位第一处断口"}`
          : "；尚未核对预测"}
      </p>
      <p data-testid="lop-explanation" className="my-3 text-sm">
        {timeline.currentStep === 5 || state.failed
          ? state.explanation
          : `当前责任：${mapSteps[timeline.currentStep].caption}。后续步骤尚未产生证据。`}
      </p>
      <div data-testid="lop-timeline">
        <TimelineControls
          timeline={timeline}
          labelText={labelText}
          reset={{
            label: "重置全部参数与预测",
            onClick: () => {
              timeline.pause();
              reset();
            },
          }}
        />
      </div>
      {reducedMotion && (
        <p className="text-sm">
          系统已请求减少动态效果：自动播放隐藏；用下一步或步点检查同样的因果状态。
        </p>
      )}
    </section>
  );
}

export function LopOfficialLearningMapLab() {
  const [generation, setGeneration] = useState(0);
  return (
    <MapExperiment
      key={generation}
      reset={() => setGeneration((value) => value + 1)}
    />
  );
}
