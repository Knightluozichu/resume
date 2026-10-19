"use client";

import { useEffect, useId, useMemo, useReducer } from "react";
import {
  useTeachingTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
};
type Arch = "arm64" | "x86_64";
export type LinuxConfig = {
  host: Arch;
  guest: Arch;
  engine: "virtualize" | "emulate";
  ram: number;
  profile: "desktop" | "server";
  bootDisk: boolean;
  rootDisk: boolean;
  desktop: boolean;
  tools: boolean;
};
export type LinuxState = {
  config: LinuxConfig;
  epoch: number;
  prediction: "kernel" | "integration" | "blocked" | null;
  manualReduced: boolean;
};
export function initialLinuxState(): LinuxState {
  return {
    config: {
      host: "arm64",
      guest: "arm64",
      engine: "virtualize",
      ram: 4,
      profile: "desktop",
      bootDisk: true,
      rootDisk: true,
      desktop: true,
      tools: true,
    },
    epoch: 0,
    prediction: null,
    manualReduced: false,
  };
}
export function linuxDiagnosis(c: LinuxConfig) {
  // Finite classroom policy, NOT an Ubuntu minimum-memory predictor.
  if (c.ram + 4 + 1 > 16)
    return {
      stop: 1,
      code: "host-budget",
      text: "宿主预算越界：16 − 4 − 1 = 11 GiB，不能按本模型承诺这次分配。先减小来宾内存。",
    };
  if (c.engine === "virtualize" && c.host !== c.guest)
    return {
      stop: 1,
      code: "cpu-mismatch",
      text: "同架构虚拟化不能直接执行另一指令集。换匹配镜像；跨架构须改用仿真并核对机器型号。",
    };
  if (!c.bootDisk)
    return {
      stop: 2,
      code: "no-boot-media",
      text: "固件没有可启动介质，尚未进入 Linux 内核。检查虚拟磁盘/ISO 挂载与启动顺序，不要先重装桌面。",
    };
  if (!c.rootDisk)
    return {
      stop: 4,
      code: "root-unavailable",
      text: "内核已进入，但模型中的根文件系统不可读，无法启动用户空间。检查虚拟控制器、根设备与镜像，而非剪贴板工具。",
    };
  if (c.profile === "desktop" && !c.desktop)
    return {
      stop: 6,
      code: "cli-only",
      text: "系统仍到达命令行；图形登录服务未启动，不等于 Linux 内核没启动。先检查桌面/显示服务。",
    };
  if (!c.tools)
    return {
      stop: 6,
      code: "no-tools",
      text: "系统能启动；仅来宾集成链缺失。按虚拟机产品核对来宾工具、版本和主机共享设置，不是安装宿主显卡驱动。",
    };
  return {
    stop: 6,
    code: "ready",
    text: "系统与来宾集成链均已就绪（教学模型）。是否支持剪贴板/缩放仍取决于产品、会话与共享策略。",
  };
}
export type LinuxAction =
  | { type: "configure"; patch: Partial<LinuxConfig> }
  | { type: "predict"; value: LinuxState["prediction"] }
  | { type: "reduced" }
  | { type: "reset" };
export function linuxReducer(s: LinuxState, a: LinuxAction): LinuxState {
  if (a.type === "reset") return { ...initialLinuxState(), epoch: s.epoch + 1 };
  if (a.type === "configure")
    return {
      ...s,
      config: { ...s.config, ...a.patch },
      prediction: null,
      epoch: s.epoch + 1,
    };
  if (a.type === "predict")
    return { ...s, prediction: a.value, epoch: s.epoch + 1 };
  if (a.type === "reduced") return { ...s, manualReduced: !s.manualReduced };
  return s;
}
/** Discrete visible state: seeking can never cross the first causal failure. */
export function linuxFrame(config: LinuxConfig, requestedFrame: number) {
  const d = linuxDiagnosis(config);
  const frame = Math.max(0, Math.min(d.stop, Math.floor(requestedFrame)));
  const blocked = d.stop < 6 && frame >= d.stop;
  const kernel = frame >= 3 && !(blocked && d.stop <= 3);
  const userspace = frame >= 4 && !blocked;
  const gui =
    userspace && frame >= 5 && config.profile === "desktop" && config.desktop;
  const integrated = frame >= 6 && userspace && config.tools;
  return { frame, blocked, kernel, userspace, gui, integrated };
}
export const LINUX_BEAT_MS = 1000;
const STAGES = [
  "配置待启动",
  "创建虚拟机",
  "固件与引导",
  "Linux 内核",
  "根与用户空间",
  "桌面或命令行",
  "来宾集成",
] as const;
const buttonClass =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm whitespace-normal break-words focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

export function LinuxRecognizingLab() {
  const [state, dispatch] = useReducer(
    linuxReducer,
    undefined,
    initialLinuxState,
  );
  // A new session unmounts the old hook: cancel() also guards a pending anime import.
  return (
    <LinuxBootSession key={state.epoch} state={state} dispatch={dispatch} />
  );
}
function LinuxBootSession({
  state: s,
  dispatch,
}: {
  state: LinuxState;
  dispatch: (action: LinuxAction) => void;
}) {
  const id = useId();
  const d = linuxDiagnosis(s.config);
  const steps = useMemo(
    () =>
      STAGES.slice(0, d.stop + 1).map((caption, i) => ({
        label: `boot-${i}`,
        caption,
      })),
    [d.stop],
  );
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      // Animate a model clock, not DOM decoration; currentStep is the only frame source.
      tl.add(
        { tick: 0 },
        { tick: d.stop, duration: d.stop * LINUX_BEAT_MS, ease: "linear" },
        0,
      );
      steps.forEach((step, i) => tl.label(step.label, i * LINUX_BEAT_MS));
    },
  });
  const reduced = timeline.reducedMotion || s.manualReduced;
  useEffect(() => {
    if (reduced && timeline.isPlaying) timeline.pause();
  }, [reduced, timeline]);
  function send(action: LinuxAction) {
    timeline.pause();
    dispatch(action);
  }
  const { frame, blocked, kernel, userspace, gui, integrated } = linuxFrame(
    s.config,
    timeline.currentStep,
  );
  const stages: string[] = [...STAGES];
  stages[5] = s.config.profile === "server" ? "命令行服务" : "桌面或命令行";
  const outcome =
    d.stop < 6 ? "blocked" : d.code === "ready" ? "integration" : "kernel";
  const controls: TeachingTimeline = {
    ...timeline,
    reducedMotion: reduced,
    play: () => {
      if (s.prediction && !reduced) timeline.play();
    },
    toggle: () => {
      if (s.prediction && !reduced) timeline.toggle();
    },
    stepNext: () => {
      if (s.prediction) timeline.stepNext();
    },
    stepPrev: () => {
      if (s.prediction) timeline.stepPrev();
    },
    goToStep: (i) => {
      if (s.prediction) timeline.goToStep(i);
    },
    seek: (p) => {
      if (s.prediction) timeline.seek(p);
    },
  };
  function choice<T extends string | number>(
    key: keyof LinuxConfig,
    label: string,
    values: readonly T[],
  ) {
    return (
      <fieldset className="min-w-0 border-t border-border pt-3">
        <legend className="px-1 text-sm font-medium">{label}</legend>
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <button
              className={buttonClass}
              type="button"
              key={value}
              aria-pressed={s.config[key] === value}
              data-testid={`lop01-${key}-${value}`}
              onClick={() =>
                send({ type: "configure", patch: { [key]: value } })
              }
              style={{
                borderColor: s.config[key] === value ? C.accent : C.border,
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </fieldset>
    );
  }
  return (
    <section
      className="not-prose my-8 min-w-0 rounded border border-border bg-elevated p-3 sm:p-5"
      aria-labelledby={`${id}-title`}
      data-testid="lop01-lab"
      data-frame={frame}
      data-diagnosis={d.code}
      data-playing={timeline.isPlaying && !reduced}
      data-reduced={reduced}
      data-progress={timeline.progress}
      data-kernel={kernel}
      data-userspace={userspace}
      data-gui={gui}
      data-integrated={integrated}
      data-stop={d.stop}
      data-session={s.epoch}
    >
      <h3 id={`${id}-title`} className="text-lg font-semibold">
        开机责任链：哪一层先失效？
      </h3>
      <p className="my-3 text-sm text-secondary">
        这是确定性的课堂状态机，不执行虚拟机或
        Ubuntu。先改条件、作预测，再单步观察。箭头表示依赖/集成通道，不是 CPU
        实时调用栈。
      </p>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        {choice("host", "宿主 CPU（模型参数）", ["arm64", "x86_64"])}
        {choice("guest", "来宾镜像 CPU", ["arm64", "x86_64"])}
        {choice("engine", "执行方式：同架构虚拟化 / 跨架构仿真", [
          "virtualize",
          "emulate",
        ])}
        {choice(
          "ram",
          "来宾内存 GiB（宿主 16，保留 4，开销 1）",
          [2, 4, 8, 12],
        )}
        {choice("profile", "系统用途：桌面 / 服务器", ["desktop", "server"])}
        <fieldset className="min-w-0 border-t border-border pt-3">
          <legend className="text-sm font-medium">
            故障与边界（按钮表示当前状态）
          </legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["bootDisk", "启动介质"],
                ["rootDisk", "根文件系统"],
                ["desktop", "桌面服务"],
                ["tools", "来宾工具"],
              ] as const
            ).map(([key, label]) => (
              <button
                type="button"
                key={key}
                className={buttonClass}
                data-testid={`lop01-${key}`}
                aria-pressed={s.config[key]}
                onClick={() =>
                  send({ type: "configure", patch: { [key]: !s.config[key] } })
                }
              >
                {label}：{s.config[key] ? "有" : "无"}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <fieldset className="my-4 min-w-0">
        <legend className="mb-2 font-medium">预测最终结果</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["blocked", "到不了用户空间"],
              ["kernel", "能用系统，集成或桌面受限"],
              ["integration", "系统与集成链均就绪"],
            ] as const
          ).map(([value, label]) => (
            <button
              type="button"
              key={value}
              className={buttonClass}
              aria-pressed={s.prediction === value}
              data-testid={`lop01-predict-${value}`}
              onClick={() => send({ type: "predict", value })}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <div
        data-testid="lop01-timeline"
        className="[&_button]:min-h-11 [&_button]:min-w-11 [&_button]:text-sm [&_input]:min-h-11 [&_.justify-center]:flex-wrap"
      >
        <fieldset
          disabled={!s.prediction}
          aria-label="启动时间线"
          className="min-w-0"
        >
          <TimelineControls
            timeline={controls}
            labelText={Object.fromEntries(
              steps.map((step, i) => [step.label, stages[i]]),
            )}
            caption="拖动进度会暂停；只能走到首个失败边界。步骤编号 1 对应模型帧 0。"
          />
        </fieldset>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className={buttonClass}
            data-testid="lop01-reduced"
            aria-pressed={reduced}
            onClick={() => send({ type: "reduced" })}
          >
            减少动态：{reduced ? "开" : "关"}
          </button>
          <button
            type="button"
            className={buttonClass}
            data-testid="lop01-reset"
            onClick={() => send({ type: "reset" })}
          >
            全部重置
          </button>
        </div>
      </div>
      <p className="my-3 text-sm">
        {!s.prediction
          ? "先预测，才可操作时间线。"
          : reduced
            ? "减少动态已生效：停在当前状态，仅单步或拖动推进；关闭后不会自行播放。"
            : "共享时间线每秒推进一层，默认暂停；到末帧后点播放可从头重播。"}
      </p>
      {/* At 360px viewport: conservative 240px content / 280 viewBox × 14 = 12px. */}
      <svg
        viewBox="0 0 280 565"
        role="img"
        aria-labelledby={`${id}-svg-title ${id}-svg-desc`}
        className="mx-auto block w-full max-w-[420px]"
        fontSize="14"
      >
        <title id={`${id}-svg-title`}>
          宿主、虚拟机监控器、来宾内核与用户空间
        </title>
        <desc id={`${id}-svg-desc`}>
          宿主资源供给虚拟硬件，固件引导来宾内核，内核接通根与用户空间，桌面可选。故障在首次失败的边界停止；来宾工具另走集成通道。
        </desc>
        <rect
          x="2"
          y="2"
          width="276"
          height="550"
          rx="8"
          fill={C.bg}
          stroke={C.border}
        />
        <text x="14" y="26" fill={C.text}>
          宿主 {s.config.host} · 16 GiB
        </text>
        <rect
          x="14"
          y="38"
          width="252"
          height="18"
          fill={C.panel}
          stroke={C.border}
        />
        <rect x="14" y="38" width={(252 * 5) / 16} height="18" fill={C.muted} />
        <rect
          x={14 + (252 * 5) / 16}
          y="38"
          width={(252 * Math.min(s.config.ram, 11)) / 16}
          height="18"
          fill={d.code === "host-budget" ? C.danger : C.accent}
        />
        <text x="14" y="77" fill={C.text}>
          保留+开销 5 / 来宾 {s.config.ram}
        </text>
        <path
          d="M140 84v18m-5-6 5 6 5-6"
          stroke={C.accent}
          fill="none"
          strokeWidth="2"
        />
        <rect
          x="14"
          y="108"
          width="252"
          height="54"
          rx="4"
          fill={C.panel}
          stroke={blocked && d.stop === 1 ? C.danger : C.accent}
          strokeWidth="2"
        />
        <text x="24" y="130" fill={C.text}>
          虚拟机监控器 / 虚拟硬件
        </text>
        <text x="24" y="151" fill={C.muted}>
          {s.config.engine === "emulate" ? "TCG 类仿真" : "同指令集虚拟化"} →{" "}
          {s.config.guest}
        </text>
        <rect
          x="24"
          y="181"
          width="232"
          height="292"
          rx="6"
          fill="none"
          stroke={C.accent}
          strokeDasharray="5 3"
        />
        <text x="34" y="204" fill={C.text}>
          来宾系统边界
        </text>
        {[
          {
            y: 224,
            label: "固件 → 引导程序",
            active: frame >= 2 && !(blocked && d.stop <= 2),
          },
          { y: 283, label: "Linux 内核 / 设备与资源", active: kernel },
          { y: 342, label: "根文件系统 → 用户空间", active: userspace },
          {
            y: 401,
            label: gui ? "桌面图形会话" : "命令行 / 无图形会话",
            active: userspace && frame >= 5,
          },
        ].map((node, i) => (
          <g key={node.y}>
            <path
              d={`M140 ${node.y - 17}v15m-5-5 5 5 5-5`}
              stroke={node.active ? C.success : C.border}
              strokeWidth="2"
              fill="none"
            />
            <rect
              x="34"
              y={node.y}
              width="212"
              height="40"
              fill={node.active ? C.panel : C.bg}
              stroke={
                blocked && d.stop === i + 2
                  ? C.danger
                  : node.active
                    ? C.success
                    : C.border
              }
              strokeWidth="2"
            />
            <circle
              cx="44"
              cy={node.y + 20}
              r="3"
              fill={node.active ? C.success : C.muted}
            />
            <text
              x="52"
              y={node.y + 25}
              fill={node.active ? C.text : C.muted}
              fontSize="14"
            >
              {node.label}
            </text>
          </g>
        ))}
        <path
          d="M254 137h17v370H149"
          fill="none"
          stroke={integrated ? C.success : C.border}
          strokeDasharray={integrated ? undefined : "4 4"}
          strokeWidth="2"
        />
        <path
          d="M140 442v45"
          fill="none"
          stroke={integrated ? C.success : C.border}
          strokeWidth="2"
        />
        <rect
          x="24"
          y="488"
          width="232"
          height="45"
          rx="4"
          fill={C.panel}
          stroke={integrated ? C.success : C.border}
          strokeWidth="2"
        />
        <text x="34" y="516" fill={C.text}>
          来宾工具 ↔ 宿主集成端
        </text>
        {blocked && (
          <g>
            <path
              d="M118 455l10 10m0-10-10 10"
              stroke={C.danger}
              strokeWidth="3"
            />
            <text x="137" y="467" fill={C.danger}>
              依赖中断
            </text>
          </g>
        )}
      </svg>
      <div
        aria-live="polite"
        aria-atomic="true"
        data-testid="lop01-result"
        className="border-t border-border pt-3 text-sm"
      >
        <p>
          帧 {frame}/6 · {stages[frame]} ·{" "}
          {blocked ? "首错停止" : "未越过失败边界"}
        </p>
        <p className="my-2">
          内核：{kernel ? "已进入" : "未进入"}；用户空间：
          {userspace ? "可用" : "不可用"}；图形：{gui ? "可用" : "无"}；集成：
          {integrated ? "接通" : "未接通"}。
        </p>
        <p>
          {frame > 0 && frame >= d.stop
            ? d.text
            : "先预测并推进，观察首个断开的依赖；完整诊断在本轮终点显示。"}
        </p>
        {frame > 0 && frame >= d.stop && (
          <p data-testid="lop01-prediction-result">
            预测{s.prediction === outcome ? "一致" : "不一致"}
            ：请沿上图定位原因，而不是只看最后的桌面。
          </p>
        )}
      </div>
    </section>
  );
}

const FAMILY_STEPS = [
  {
    label: "origins",
    caption: "两条贡献：GNU 用户空间与 Linux 内核并非同一项目",
  },
  {
    label: "distribution",
    caption: "发行版整合内核、用户空间、安装器与维护渠道",
  },
  {
    label: "ubuntu",
    caption: "Ubuntu 首发在 2004 年，发行版版本不等于内核版本",
  },
  {
    label: "uses",
    caption: "桌面、服务器、嵌入式是用途选择，不构成内核继承链",
  },
] as const;
export function LinuxFamilyDiagram() {
  const [epoch, reset] = useReducer((n: number) => n + 1, 0);
  return <LinuxFamilySession key={epoch} onReset={reset} />;
}
function LinuxFamilySession({ onReset }: { onReset: () => void }) {
  const id = useId();
  const timeline = useTeachingTimeline({
    steps: FAMILY_STEPS,
    build: (tl) => {
      tl.add({ tick: 0 }, { tick: 3, duration: 3000, ease: "linear" }, 0);
      FAMILY_STEPS.forEach((step, i) =>
        tl.label(step.label, i * LINUX_BEAT_MS),
      );
    },
  });
  useEffect(() => {
    if (timeline.reducedMotion && timeline.isPlaying) timeline.pause();
  }, [timeline]);
  const frame = timeline.currentStep;
  const controls: TeachingTimeline = {
    ...timeline,
    play: () => {
      if (!timeline.reducedMotion) timeline.play();
    },
    toggle: () => {
      if (!timeline.reducedMotion) timeline.toggle();
    },
  };
  return (
    <figure
      className="not-prose my-6 min-w-0"
      data-testid="lop01-family"
      data-frame={frame}
      data-playing={timeline.isPlaying && !timeline.reducedMotion}
      data-reduced={timeline.reducedMotion}
    >
      <svg
        viewBox="0 0 280 440"
        className="mx-auto block w-full max-w-[420px]"
        role="img"
        aria-labelledby={`${id}-title`}
        fontSize="14"
      >
        <title id={`${id}-title`}>
          历史汇合与系统分工：GNU 用户空间和 Linux
          内核组合为发行版；嵌入式也可使用不同内核的 Zephyr
        </title>
        <path
          d="M70 85v35h70m70-35v35h-70v24M140 205v27m0 53v26m0 53v25"
          stroke={frame >= 1 ? C.accent : C.border}
          fill="none"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="4"
          width="130"
          height="81"
          fill={C.panel}
          stroke={C.border}
        />
        <text x="14" y="29" fill={C.text}>
          GNU · 1984 起
        </text>
        <text x="14" y="54" fill={C.muted}>
          工具 / 库
        </text>
        <text x="14" y="74" fill={C.muted}>
          用户空间贡献
        </text>
        <rect
          x="146"
          y="4"
          width="130"
          height="81"
          fill={C.panel}
          stroke={C.border}
        />
        <text x="156" y="29" fill={C.text}>
          Linux · 1991
        </text>
        <text x="156" y="54" fill={C.muted}>
          内核
        </text>
        <text x="156" y="74" fill={C.muted}>
          调度 / 设备
        </text>
        <rect
          x="20"
          y="144"
          width="240"
          height="61"
          fill={C.panel}
          stroke={frame >= 1 ? C.accent : C.border}
        />
        <text x="32" y="169" fill={C.text}>
          发行版整合：内核 + 用户空间
        </text>
        <text x="32" y="192" fill={C.muted}>
          安装器 / 软件仓库 / 更新策略
        </text>
        <text x="20" y="252" fill={frame >= 2 ? C.accent : C.muted}>
          Ubuntu · 2004 首发
        </text>
        <text x="20" y="276" fill={C.muted}>
          Debian 渊源；不是内核版本号
        </text>
        <text x="20" y="331" fill={frame >= 3 ? C.accent : C.muted}>
          桌面：图形会话可选
        </text>
        <text x="20" y="355" fill={frame >= 3 ? C.accent : C.muted}>
          服务器：可只运行命令行服务
        </text>
        <rect
          x="4"
          y="388"
          width="272"
          height="48"
          fill={C.panel}
          stroke={frame >= 3 ? C.accent : C.border}
        />
        <text x="14" y="407" fill={C.text}>
          嵌入式：可选 Linux；也可选
        </text>
        <text x="14" y="428" fill={C.text}>
          Zephyr 等小内核，并非桌面缩小
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-secondary">
        两条历史贡献汇合，不把 Linux
        的诞生误写成所有工具的诞生。底部嵌入式为用途对照，连线不表示 Zephyr 继承
        Ubuntu。
      </figcaption>
      <div
        data-testid="lop01-family-timeline"
        className="[&_button]:min-h-11 [&_button]:min-w-11 [&_button]:text-sm [&_input]:min-h-11 [&_.justify-center]:flex-wrap"
      >
        <TimelineControls
          timeline={controls}
          labelText={Object.fromEntries(
            FAMILY_STEPS.map((step) => [step.label, step.caption]),
          )}
          caption={FAMILY_STEPS[frame].caption}
          reset={{
            label: "重置关系图",
            ariaLabel: "重置关系图",
            onClick: () => {
              timeline.pause();
              onReset();
            },
          }}
        />
      </div>
    </figure>
  );
}
