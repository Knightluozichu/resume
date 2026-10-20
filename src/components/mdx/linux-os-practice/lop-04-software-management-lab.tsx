"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Timeline } from "animejs";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

export type PackageManagerMode = "dpkg" | "apt";
export type FaultKind =
  | "none"
  | "missing-dep"
  | "version-conflict"
  | "already-installed";

export type PackageInput = {
  mode: PackageManagerMode;
  fault: FaultKind;
  localIndex: boolean; // apt update has been run
};

export const INITIAL_PACKAGE_INPUT: PackageInput = {
  mode: "apt",
  fault: "none",
  localIndex: true,
};

const C = {
  bg: "var(--bg-elevated)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  success: "var(--success)",
  danger: "var(--danger)",
  warning: "var(--warning)",
} as const;

const STEPS = [
  { label: "parse", caption: "解析控制文件" },
  { label: "query", caption: "查询本地数据库 / 仓库索引" },
  { label: "resolve", caption: "解析依赖图" },
  { label: "obtain", caption: "获取软件包" },
  { label: "unpack", caption: "解包到临时区" },
  { label: "configure", caption: "配置并写入状态" },
] as const;

const LABELS = Object.fromEntries(STEPS.map((s) => [s.label, s.caption]));
const BEAT_MS = 1000;

function buildPackageTimeline(tl: Timeline) {
  const clock = { frame: 0 };
  STEPS.forEach((s, i) => tl.label(s.label, i * BEAT_MS));
  tl.add(clock, { frame: [0, 6], duration: 6 * BEAT_MS, ease: "linear" }, 0);
}

type PackageState =
  | "not-installed"
  | "installed"
  | "selected"
  | "missing"
  | "conflict";

type PackageNode = {
  name: string;
  version: string;
  arch: string;
  state: PackageState;
  deps: string[];
};

type PackageResult =
  | "ok"
  | "missing-dep"
  | "version-conflict"
  | "already-installed"
  | "no-index"
  | "dpkg-no-remote";

function deriveState(input: PackageInput): {
  nodes: PackageNode[];
  result:
    | "ok"
    | "missing-dep"
    | "version-conflict"
    | "already-installed"
    | "no-index"
    | "dpkg-no-remote";
  stopsAt: number; // step index where it stops (0..5); -1 means runs to end
  reason: string;
} {
  const base: PackageNode[] = [
    {
      name: "demo-app",
      version: "1.0.0",
      arch: "amd64",
      state: "selected",
      deps: ["libnet", "libui"],
    },
    {
      name: "libnet",
      version: "1.2.0",
      arch: "amd64",
      state: "not-installed",
      deps: [],
    },
    {
      name: "libui",
      version: "2.1.0",
      arch: "amd64",
      state: "not-installed",
      deps: ["libbase"],
    },
    {
      name: "libbase",
      version: "3.0.0",
      arch: "amd64",
      state: "not-installed",
      deps: [],
    },
  ];

  if (input.fault === "already-installed") {
    base[0].state = "installed";
  }
  if (input.fault === "missing-dep") {
    base[3].state = "missing";
  }
  if (input.fault === "version-conflict") {
    base[2].state = "conflict";
  }

  let stopsAt = -1;
  let result: PackageResult = "ok";
  let reason = "全部依赖满足，安装链成功完成。";

  if (input.mode === "dpkg" && input.fault !== "already-installed") {
    // dpkg can parse .deb and check local db, but cannot fetch from repo.
    // It will stop at resolve if any dependency is not already installed.
    const missingInDb = base.some(
      (n) =>
        n.name !== "demo-app" &&
        n.state !== "installed" &&
        n.state !== "conflict",
    );
    if (missingInDb) {
      stopsAt = 2;
      result = "dpkg-no-remote";
      reason =
        "dpkg 只能读取本地 /var/lib/dpkg/status；未安装的依赖无法从仓库拉取。";
    }
  }

  if (
    input.mode === "apt" &&
    !input.localIndex &&
    input.fault !== "already-installed"
  ) {
    stopsAt = 1;
    result = "no-index";
    reason =
      "APT 需要本地 apt-cache；未执行 apt update 就无法匹配仓库候选版本。";
  }

  if (result === "ok") {
    if (input.fault === "missing-dep") {
      stopsAt = 2;
      result = "missing-dep";
      reason = "依赖图中 libbase 在仓库索引里不存在；递归解析失败。";
    } else if (input.fault === "version-conflict") {
      stopsAt = 2;
      result = "version-conflict";
      reason = "libui 候选版本 2.1.0 与 demo-app 要求的 >=3.0.0 冲突。";
    } else if (input.fault === "already-installed") {
      stopsAt = 1;
      result = "already-installed";
      reason = "本地状态显示 demo-app 已安装；dpkg -i 会提示，apt 会跳过。";
    }
  }

  return { nodes: base, result, stopsAt, reason };
}

const controlClass =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function PackagePipelineExperiment({ onReset }: { onReset: () => void }) {
  const [input, setInput] = useState<PackageInput>({
    ...INITIAL_PACKAGE_INPUT,
  });
  const [prediction, setPrediction] = useState<string>("");
  const id = useId();
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: buildPackageTimeline,
  });
  const pauseRef = useRef(timeline.pause);
  useEffect(() => {
    pauseRef.current = timeline.pause;
  });
  useEffect(() => {
    if (timeline.reducedMotion) pauseRef.current();
  }, [timeline.reducedMotion]);

  const frame = timeline.currentStep;
  const reducedMotion = timeline.reducedMotion;
  const { nodes, result, stopsAt, reason } = deriveState(input);

  const change = <K extends keyof PackageInput>(
    key: K,
    value: PackageInput[K],
  ) => {
    timeline.goToStep(0);
    setInput((previous) => ({ ...previous, [key]: value }));
    setPrediction("");
  };

  const nodeColor = (state: PackageState) => {
    switch (state) {
      case "installed":
        return C.success;
      case "selected":
        return C.accent;
      case "missing":
        return C.danger;
      case "conflict":
        return C.warning;
      default:
        return C.line;
    }
  };

  const nodeFillOpacity = (state: PackageState) =>
    state === "not-installed" ? 0 : 0.2;

  // Layout positions (viewBox 860 x 420)
  const positions: Record<string, { x: number; y: number }> = {
    "demo-app": { x: 430, y: 60 },
    libnet: { x: 280, y: 180 },
    libui: { x: 580, y: 180 },
    libbase: { x: 580, y: 300 },
  };

  const predictionOptions = [
    ["ok", "成功安装"],
    ["missing-dep", "缺少依赖"],
    ["version-conflict", "版本冲突"],
    ["already-installed", "已安装跳过"],
    ["no-index", "索引未更新"],
    ["dpkg-no-remote", "dpkg 无法拉取"],
  ] as const;

  return (
    <section
      data-testid="software-management-lab"
      data-frame={frame}
      data-playing={timeline.isPlaying && !timeline.reducedMotion}
      aria-label="dpkg 与 APT 软件包安装流程对比实验"
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 text-primary sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <h3 className="text-lg font-semibold">
            dpkg 与 APT：谁能把依赖一起解决？
          </h3>
          <p className="text-sm text-secondary">
            教学模型：紫色为选中安装，绿色为已安装，红色为缺失，黄色为版本冲突；灰色为仓库可用但未安装。
          </p>
        </div>
        <button
          type="button"
          data-testid="package-reset"
          className={controlClass}
          onClick={onReset}
        >
          重置实验
        </button>
      </div>

      <fieldset className="my-3 flex flex-wrap gap-2">
        <legend className="text-sm font-semibold">1 · 选择包管理器</legend>
        {(
          [
            ["dpkg", "dpkg（本地 .deb）"],
            ["apt", "APT（仓库+索引）"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            data-testid={`mode-${value}`}
            aria-pressed={input.mode === value}
            className={controlClass}
            onClick={() => change("mode", value)}
          >
            {input.mode === value ? "● " : "○ "}
            {label}
          </button>
        ))}
      </fieldset>

      <fieldset className="my-3 flex flex-wrap gap-2">
        <legend className="text-sm font-semibold">2 · 设置前置条件</legend>
        <button
          type="button"
          data-testid="toggle-local-index"
          aria-pressed={input.localIndex}
          disabled={input.mode === "dpkg"}
          className={controlClass}
          onClick={() => change("localIndex", !input.localIndex)}
        >
          {input.localIndex ? "已" : "未"}执行 apt update（仅 APT 有效）
        </button>
      </fieldset>

      <fieldset className="my-3 flex flex-wrap gap-2">
        <legend className="text-sm font-semibold">3 · 故障注入</legend>
        {(
          [
            ["none", "无故障"],
            ["missing-dep", "libbase 缺失"],
            ["version-conflict", "libui 版本冲突"],
            ["already-installed", "demo-app 已安装"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            data-testid={`fault-${value}`}
            aria-pressed={input.fault === value}
            className={controlClass}
            onClick={() => change("fault", value)}
          >
            {input.fault === value ? "● " : "○ "}
            {label}
          </button>
        ))}
      </fieldset>

      <fieldset className="my-3 flex flex-wrap gap-2">
        <legend className="text-sm font-semibold">4 · 先预测结果</legend>
        {predictionOptions.map(([value, label]) => (
          <button
            key={value}
            type="button"
            data-testid={`predict-${value}`}
            aria-pressed={prediction === value}
            disabled={frame > 0}
            className={controlClass}
            onClick={() => setPrediction(value)}
          >
            {label}
          </button>
        ))}
      </fieldset>

      <fieldset
        disabled={!prediction}
        data-testid="package-timeline"
        className="min-w-0 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11"
      >
        <legend className="text-sm">
          5 ·{" "}
          {prediction
            ? "验证预测：播放、单步或拖动进度"
            : "请先选择预测，再推进时间线"}
        </legend>
        <TimelineControls timeline={timeline} labelText={LABELS} />
      </fieldset>

      <p
        className="text-sm text-secondary"
        data-testid="package-stage"
        role="status"
      >
        步骤 {frame}/6 · {STEPS[frame]?.caption}
        {frame > stopsAt && stopsAt >= 0
          ? " · 已越过真实失败点，模型继续演示仅供观察"
          : ""}
      </p>

      <svg
        viewBox="0 0 860 420"
        className="block h-auto w-full"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        style={{ maxWidth: 860, marginInline: "auto" }}
      >
        <title id={`${id}-title`}>软件包依赖图与安装流程状态</title>
        <desc id={`${id}-desc`}>
          展示 demo-app 依赖 libnet 与 libui，libui 又依赖 libbase 的图。
          不同颜色表示已安装、选中、缺失或冲突；右侧步骤条显示当前解析阶段。
        </desc>

        {/* dependency edges */}
        <g stroke={C.line} strokeWidth="2" fill="none">
          <path d="M430 85 L305 155" />
          <path d="M430 85 L555 155" />
          <path d="M580 205 L580 275" />
        </g>
        <g fill={C.muted} fontSize="12">
          <text x="350" y="115">
            依赖
          </text>
          <text x="600" y="115">
            依赖
          </text>
          <text x="600" y="235">
            依赖
          </text>
        </g>

        {/* nodes */}
        {nodes.map((node) => {
          const pos = positions[node.name];
          const color = nodeColor(node.state);
          return (
            <g key={node.name}>
              <rect
                x={pos.x - 70}
                y={pos.y - 28}
                width="140"
                height="56"
                rx="8"
                fill={color}
                fillOpacity={nodeFillOpacity(node.state)}
                stroke={color}
                strokeWidth="2"
              />
              <text
                x={pos.x}
                y={pos.y - 6}
                textAnchor="middle"
                fill={C.text}
                fontSize="13"
                fontWeight="600"
              >
                {node.name}
              </text>
              <text
                x={pos.x}
                y={pos.y + 14}
                textAnchor="middle"
                fill={C.muted}
                fontSize="11"
              >
                {node.version} · {node.arch}
              </text>
              {node.state === "missing" && (
                <text
                  x={pos.x}
                  y={pos.y + 38}
                  textAnchor="middle"
                  fill={C.danger}
                  fontSize="11"
                >
                  缺失
                </text>
              )}
              {node.state === "conflict" && (
                <text
                  x={pos.x}
                  y={pos.y + 38}
                  textAnchor="middle"
                  fill={C.warning}
                  fontSize="11"
                >
                  版本冲突
                </text>
              )}
            </g>
          );
        })}

        {/* pipeline steps on right */}
        <g transform="translate(720, 40)">
          <text x="0" y="0" fill={C.text} fontSize="13" fontWeight="600">
            安装流程
          </text>
          {STEPS.map((step, index) => {
            const active = frame >= index;
            const failed =
              stopsAt >= 0 && index === stopsAt + 1 && frame >= index;
            return (
              <g
                key={step.label}
                transform={`translate(0, ${index * 52 + 20})`}
              >
                <rect
                  x="0"
                  y="0"
                  width="120"
                  height="38"
                  rx="6"
                  fill={active ? C.accent : C.line}
                  fillOpacity={active ? 0.15 : 0.05}
                  stroke={failed ? C.danger : active ? C.accent : C.line}
                  strokeWidth="2"
                />
                <text
                  x="60"
                  y="24"
                  textAnchor="middle"
                  fill={failed ? C.danger : active ? C.text : C.muted}
                  fontSize="11"
                  fontWeight="600"
                >
                  {step.caption}
                </text>
                {failed && (
                  <text
                    x="60"
                    y="50"
                    textAnchor="middle"
                    fill={C.danger}
                    fontSize="11"
                  >
                    失败
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* mode indicator */}
        <text x="20" y="400" fill={C.muted} fontSize="12">
          当前模式：
          {input.mode === "apt"
            ? "APT（含 apt-get 与 apt-cache）"
            : "dpkg（本地静态包）"}
          {input.mode === "apt" && input.localIndex
            ? " · apt-cache 已更新"
            : ""}
          {input.mode === "apt" && !input.localIndex
            ? " · apt-cache 未更新"
            : ""}
        </text>
      </svg>

      <div
        data-testid="package-explanation"
        aria-live="polite"
        className="rounded-card border border-border p-3 text-sm"
      >
        {frame === 0 && (
          <p>
            <strong>解析控制文件：</strong>
            {input.mode === "dpkg"
              ? "dpkg-deb -I demo-app.deb 读取 DEBIAN/control 中的包名、版本、架构与依赖。"
              : "APT 先从本地 apt-cache 读取 demo-app 的候选版本与依赖。"}
          </p>
        )}
        {frame === 1 && (
          <p>
            <strong>查询本地状态：</strong>
            {input.mode === "dpkg"
              ? "dpkg 读取 /var/lib/dpkg/status，只能判断已安装包；仓库不在它的职责范围内。"
              : "apt-cache policy 对照本地状态与仓库候选；未执行 apt update 时仓库视图为空。"}
          </p>
        )}
        {frame === 2 && (
          <p>
            <strong>解析依赖图：</strong>demo-app → libnet、libui；libui →
            libbase。
            {result === "missing-dep" && " 递归发现 libbase 不存在，解析失败。"}
            {result === "version-conflict" &&
              " libui 候选版本不满足 demo-app 的依赖约束。"}
            {result === "ok" && " 所有依赖约束可满足。"}
          </p>
        )}
        {frame === 3 && (
          <p>
            <strong>获取软件包：</strong>
            {input.mode === "dpkg"
              ? "dpkg -i 只接受已存在的 .deb 文件，不会自动下载。"
              : "apt-get install 从仓库下载所需 .deb 到 /var/cache/apt/archives。"}
          </p>
        )}
        {frame === 4 && (
          <p>
            <strong>解包：</strong>dpkg-deb --extract
            把文件放到临时区域；preinst 脚本在此阶段前执行。
          </p>
        )}
        {frame === 5 && (
          <p>
            <strong>配置：</strong>postinst 脚本运行，/var/lib/dpkg/status
            更新为已安装。
          </p>
        )}
        {frame === 5 || (stopsAt >= 0 && frame > stopsAt) ? (
          <p data-testid="package-result" data-outcome={result}>
            <strong>结果：</strong>
            {result === "ok" ? "成功" : "失败"} — {reason}
            {frame === 5 && prediction && (
              <span> · 预测{prediction === result ? "正确" : "不符"}</span>
            )}
          </p>
        ) : null}
      </div>

      <p className="text-sm text-secondary">
        {reducedMotion
          ? "减少动态效果：自动播放隐藏，单步和拖进度仍可用。"
          : "每 1 秒进入下一步；暂停、改参数、重置与卸载会停止共享时间线。"}
      </p>
    </section>
  );
}

export function Lop04SoftwareManagementLab() {
  const [generation, setGeneration] = useState(0);
  return (
    <PackagePipelineExperiment
      key={generation}
      onReset={() => setGeneration((value) => value + 1)}
    />
  );
}
