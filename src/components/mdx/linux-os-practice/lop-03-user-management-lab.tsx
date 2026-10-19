"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Timeline } from "animejs";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

export type IdentityQuotaInput = {
  member: boolean;
  freshLogin: boolean;
  groupWrite: boolean;
  quotaReady: boolean;
  usage: "below" | "atSoft" | "overSoft";
  blockGraceExpired: boolean;
  inodeGraceExpired: boolean;
  kib: number;
  files: number;
};
export const INITIAL_IDENTITY_QUOTA: IdentityQuotaInput = {
  member: true,
  freshLogin: false,
  groupWrite: true,
  quotaReady: true,
  usage: "below",
  blockGraceExpired: false,
  inodeGraceExpired: false,
  kib: 20,
  files: 1,
};

// Finite ordinary-allocation model, NOT a syscall or a universal Linux rule.
// Initial <=soft snapshots have no timer; >soft snapshots have an existing timer.
// Positive grace, enforced UID quotas; excludes capabilities, reservations,
// preallocation, NOFAIL, timer edits, backend differences and partial writes.
// 0/0 is a model no-op (no syscall), not an actual zero-length file creation.
export function evaluateIdentityQuota(input: IdentityQuotaInput) {
  const credentialHasGroup = input.member && input.freshLogin;
  const permission = credentialHasGroup && input.groupWrite;
  const blocksBefore = { below: 80, atSoft: 100, overSoft: 105 }[input.usage];
  const inodesBefore = { below: 8, atSoft: 10, overSoft: 11 }[input.usage];
  const blocksAfter = blocksBefore + input.kib;
  const inodesAfter = inodesBefore + input.files;
  // Independent dqb_btime / dqb_itime. Teaching clock now=10; positive
  // bgrace=4, igrace=2. Neither clock advances with the narration timeline.
  const blockDeadlineBefore =
    blocksBefore > 100 ? (input.blockGraceExpired ? 9 : 14) : null;
  const inodeDeadlineBefore =
    inodesBefore > 10 ? (input.inodeGraceExpired ? 9 : 12) : null;
  // Zero delta skips that resource allocator in this finite model.
  const blockHard = input.kib > 0 && blocksAfter > 120;
  const inodeHard = input.files > 0 && inodesAfter > 12;
  const hard = blockHard || inodeHard;
  // v6.8 ordinary paths check AFTER > soft and their OWN nonzero deadline.
  // before>soft above encodes only our valid initial-snapshot invariant.
  const blockExpired =
    input.kib > 0 &&
    blocksAfter > 100 &&
    blockDeadlineBefore !== null &&
    10 >= blockDeadlineBefore;
  const inodeExpired =
    input.files > 0 &&
    inodesAfter > 10 &&
    inodeDeadlineBefore !== null &&
    10 >= inodeDeadlineBefore;
  const expired = blockExpired || inodeExpired;
  const outcome: "permission" | "prerequisite" | "quota" | "allow" = !permission
    ? "permission"
    : !input.quotaReady
      ? "prerequisite"
      : hard || expired
        ? "quota"
        : "allow";
  const blockGraceStarted =
    outcome === "allow" &&
    input.kib > 0 &&
    blockDeadlineBefore === null &&
    blocksAfter > 100;
  const inodeGraceStarted =
    outcome === "allow" &&
    input.files > 0 &&
    inodeDeadlineBefore === null &&
    inodesAfter > 10;
  return {
    credentialHasGroup,
    permission,
    blocksBefore,
    inodesBefore,
    blocksAfter,
    inodesAfter,
    hard,
    blockHard,
    inodeHard,
    blockExpired,
    inodeExpired,
    expired,
    blockDeadlineBefore,
    inodeDeadlineBefore,
    blockDeadlineAfter: blockGraceStarted ? 14 : blockDeadlineBefore,
    inodeDeadlineAfter: inodeGraceStarted ? 12 : inodeDeadlineBefore,
    outcome,
    soft: blocksAfter > 100 || inodesAfter > 10,
    blockGraceStarted,
    inodeGraceStarted,
    committedBlocks: outcome === "allow" ? blocksAfter : blocksBefore,
    committedInodes: outcome === "allow" ? inodesAfter : inodesBefore,
  };
}

const outcomeText = {
  permission: "EACCES：目录写入门未通过，尚未检查配额。",
  prerequisite: "前置条件未证实：停止模型，不能推断真实文件系统结果。",
  quota: "EDQUOT：硬限额或已过宽限期拒绝新增分配。",
  allow: "模型允许：仅计入所申请的资源；0/0 不发起调用。",
} as const;
const stages = [
  "读取账户记录",
  "建立登录凭据",
  "检查目录 w+x",
  "核算两类配额",
  "提交或拒绝分配",
];
const controlClass =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const STEPS = stages.map((caption, index) => ({
  label: `identity-${index}`,
  caption,
}));
const LABELS = Object.fromEntries(
  STEPS.map(({ label, caption }) => [label, caption]),
);
const BEAT_MS = 1100;
function buildIdentityTimeline(timeline: Timeline) {
  const clock = { frame: 0 };
  STEPS.forEach(({ label }, index) => timeline.label(label, index * BEAT_MS));
  timeline.add(
    clock,
    { frame: [0, 5], duration: 5 * BEAT_MS, ease: "linear" },
    0,
  );
}

function IdentityQuotaExperiment({ onReset }: { onReset: () => void }) {
  const [input, setInput] = useState<IdentityQuotaInput>({
    ...INITIAL_IDENTITY_QUOTA,
  });
  const [prediction, setPrediction] = useState("");
  const id = useId();
  const result = evaluateIdentityQuota(input);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: buildIdentityTimeline,
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

  const change = <K extends keyof IdentityQuotaInput>(
    key: K,
    value: IdentityQuotaInput[K],
  ) => {
    timeline.goToStep(0);
    setInput((previous) => ({ ...previous, [key]: value }));
    setPrediction("");
  };
  const switches: {
    key: keyof Pick<
      IdentityQuotaInput,
      | "member"
      | "freshLogin"
      | "groupWrite"
      | "quotaReady"
      | "blockGraceExpired"
      | "inodeGraceExpired"
    >;
    label: string;
  }[] = [
    { key: "member", label: "数据库含项目组 2000" },
    { key: "freshLogin", label: "模拟新登录（重建凭据）" },
    { key: "groupWrite", label: "目录 2770（关闭为 2750）" },
    { key: "quotaReady", label: "配额前置条件已核实" },
    { key: "blockGraceExpired", label: "块旧期限已到（仅已超额快照）" },
    { key: "inodeGraceExpired", label: "inode 旧期限已到（仅已超额快照）" },
  ];
  const revealPermission = frame >= 2;
  const revealQuota = frame >= 3 && result.permission && input.quotaReady;
  const final = frame === 4;
  const accent = "var(--accent, #2563eb)";
  const danger = "var(--danger, #b91c1c)";
  const bars = [
    {
      label: "块 / KiB",
      before: result.blocksBefore,
      after: result.blocksAfter,
      soft: 100,
      hard: 120,
      y: 297,
    },
    {
      label: "inode / 个",
      before: result.inodesBefore,
      after: result.inodesAfter,
      soft: 10,
      hard: 12,
      y: 373,
    },
  ];

  return (
    <section
      data-testid="identity-quota-lab"
      data-frame={frame}
      data-playing={timeline.isPlaying && !timeline.reducedMotion}
      aria-label="身份、凭据、权限与配额分配实验"
      className="my-6 min-w-0 rounded border border-border bg-elevated p-3 text-primary sm:p-5"
    >
      <h3 className="text-lg font-semibold">同一个账户，为何这次不能写？</h3>
      <p className="text-sm">
        纯教学模型，不读取系统账户，不调用 shell。固定普通用户 UID 1001、主组
        1001、项目组 2000；目录属于 root:2000，无
        ACL、无提权。配对申请只是教学上全收或全拒的显示提交，
        不是内核原子事务；真实 syscall 可分多次分配、部分写入或有额外开销。
      </p>
      <fieldset className="my-3 flex flex-wrap gap-2">
        <legend className="text-sm font-semibold">
          1 · 设置参数与故障（改动会退回步骤 0）
        </legend>
        {switches.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            data-testid={`identity-${key}`}
            aria-pressed={input[key]}
            className={controlClass}
            onClick={() => change(key, !input[key])}
          >
            {input[key] ? "开 · " : "关 · "}
            {label}
          </button>
        ))}
      </fieldset>
      <fieldset className="my-3 flex flex-wrap gap-2">
        <legend className="text-sm font-semibold">
          初始用量快照（块 / inode）
        </legend>
        {(
          [
            ["below", "低于软额：80 / 8"],
            ["atSoft", "等于软额：100 / 10"],
            ["overSoft", "已超软额：105 / 11"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            data-testid={`identity-usage-${value}`}
            aria-pressed={input.usage === value}
            className={controlClass}
            onClick={() => change("usage", value)}
          >
            {label}
          </button>
        ))}
      </fieldset>
      <p className="text-sm">
        有限模型：低于/等于软额的快照没有计时器；已超额快照各有独立期限。
        教学当前时刻 t=10，块宽限时长 4，inode 时长 2（非真实秒数）。
        各资源首次越过自己的软额才开自己的期限，两个开关可形成混合状态。排除预分配、保留块、特权、
        手改期限及后端差异；不能推广到所有 Linux。0/0 表示不发起系统调用。
      </p>
      <label className="my-2 block text-sm" htmlFor={`${id}-kib`}>
        申请额外分配：{input.kib} KiB（整数模型单位，不等于文件长度）
      </label>
      <input
        id={`${id}-kib`}
        data-testid="identity-kib"
        className="min-h-11 w-full"
        type="range"
        min="0"
        max="50"
        step="1"
        value={input.kib}
        onChange={(event) => change("kib", Number(event.target.value))}
      />
      <label className="my-2 block text-sm" htmlFor={`${id}-files`}>
        申请新 inode：{input.files} 个
      </label>
      <input
        id={`${id}-files`}
        data-testid="identity-files"
        className="min-h-11 w-full"
        type="range"
        min="0"
        max="5"
        step="1"
        value={input.files}
        onChange={(event) => change("files", Number(event.target.value))}
      />
      <fieldset className="my-3 flex flex-wrap gap-2">
        <legend className="text-sm font-semibold">
          2 · 先预测结果，再单步或播放
        </legend>
        {(
          [
            ["allow", "允许分配"],
            ["permission", "权限拒绝"],
            ["quota", "配额拒绝"],
            ["prerequisite", "前置未核实"],
          ] as const
        ).map(([value, label]) => (
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
        data-testid="identity-timeline"
        className="min-w-0 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11"
      >
        <legend className="text-sm">
          3 ·{" "}
          {prediction
            ? "验证预测：播放、单步或拖动进度"
            : "请先选择预测，再推进时间线"}
        </legend>
        <TimelineControls timeline={timeline} labelText={LABELS} />
      </fieldset>
      <button
        type="button"
        data-testid="identity-reset"
        className={controlClass}
        onClick={onReset}
      >
        重置全部
      </button>
      <p className="text-sm">
        {reducedMotion
          ? "减少动态效果：自动播放隐藏，单步和拖进度仍可用。"
          : "每 1.1 秒进入下一步；暂停、改参数、重置与卸载会停止共享时间线。"}
      </p>
      <p data-testid="identity-stage" role="status">
        步骤 {frame}/4 · {stages[frame]}
      </p>
      <svg
        viewBox="0 0 240 602"
        className="block h-auto w-full"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        style={{ maxWidth: 480, marginInline: "auto", fontSize: 14 }}
      >
        <title id={`${id}-title`}>账户组关系到块与 inode 分配的门控图</title>
        <desc id={`${id}-desc`}>
          圆形表示组编号，虚线连接数据库与进程凭据；权限门之后是独立的块和 inode
          用量尺。实心条为原用量，虚线外框为申请后用量，刻线标记软硬限额。
          下方两条独立期限轴以竖线标出当前
          t=10，点在左侧表示到期，右侧表示有效；
          最终步显示教学提交后的期限，未启动的资源没有期限点。
        </desc>
        <g fill="currentColor" fontSize="14">
          <text x="8" y="20">
            账户记录：UID 1001
          </text>
          <circle cx="42" cy="49" r="22" fill="none" stroke="currentColor" />
          <text x="24" y="54">
            1001
          </text>
          <circle
            cx="115"
            cy="49"
            r="22"
            fill={input.member ? accent : "none"}
            fillOpacity="0.2"
            stroke={input.member ? accent : "currentColor"}
          />
          <text x="97" y="54">
            2000
          </text>
          <text x="151" y="53">
            {input.member ? "已入组" : "未入组"}
          </text>
          <path
            d="M42 73 V99 M115 73 V99"
            fill="none"
            stroke="currentColor"
            strokeDasharray="4 4"
          />
          <text x="8" y="119">
            进程凭据：
            {frame >= 1 ? (input.freshLogin ? "新登录" : "旧会话") : "待建立"}
          </text>
          <circle cx="42" cy="151" r="22" fill="none" stroke="currentColor" />
          <text x="24" y="156">
            1001
          </text>
          {frame >= 1 && result.credentialHasGroup ? (
            <>
              <circle
                cx="115"
                cy="151"
                r="22"
                fill={accent}
                fillOpacity="0.2"
                stroke={accent}
              />
              <text x="97" y="156">
                2000
              </text>
            </>
          ) : (
            <path
              opacity={frame >= 1 ? 1 : 0.25}
              d="M98 134 L132 168 M132 134 L98 168"
              stroke={danger}
              strokeWidth="2"
            />
          )}
          <path d="M42 175 V193 H210 V216" fill="none" stroke="currentColor" />
          <text x="8" y="213">
            目录 root:2000
          </text>
          <text x="8" y="236">
            组权限：r {input.groupWrite ? "w" : "−"} x
          </text>
          <path
            opacity={revealPermission ? 1 : 0.25}
            d={
              revealPermission && result.permission
                ? "M183 244 L197 257 L227 224"
                : "M190 225 L220 255 M220 225 L190 255"
            }
            fill="none"
            stroke={revealPermission && result.permission ? accent : danger}
            strokeWidth="3"
          />
          {bars.map(({ label, before, after, soft, hard, y }) => {
            const shown = revealQuota ? after : before;
            return (
              <g key={label}>
                <text x="8" y={y - 13}>
                  {label}：{shown} / {hard}
                </text>
                <rect
                  x="8"
                  y={y}
                  width="204"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                />
                <rect
                  x="8"
                  y={y}
                  width={(204 * before) / hard}
                  height="20"
                  fill={accent}
                  fillOpacity="0.4"
                />
                {revealQuota && (
                  <rect
                    x="8"
                    y={y}
                    width={(204 * Math.min(after, hard)) / hard}
                    height="20"
                    fill="none"
                    stroke={after > hard ? danger : accent}
                    strokeWidth="2"
                    strokeDasharray="5 3"
                  />
                )}
                <path
                  d={`M${8 + (204 * soft) / hard} ${y - 4} v28 M212 ${y - 4} v28`}
                  stroke={danger}
                />
                <text x="8" y={y + 40}>
                  软 {soft}　硬 {hard}
                  {shown > hard ? "　超出!" : ""}
                </text>
              </g>
            );
          })}
          <g data-testid="identity-deadline-diagram">
            <text x="8" y="442">
              独立期限 · 当前 t=10
            </text>
            <path
              d="M100 451 V582"
              stroke="currentColor"
              strokeDasharray="3 3"
            />
            {(
              [
                [
                  "块",
                  result.blockDeadlineBefore,
                  result.blockDeadlineAfter,
                  474,
                ],
                [
                  "inode",
                  result.inodeDeadlineBefore,
                  result.inodeDeadlineAfter,
                  546,
                ],
              ] as const
            ).map(([label, before, after, y]) => {
              const deadline = final ? after : before;
              return (
                <g key={label}>
                  <text x="8" y={y}>
                    {label}期限：
                    {deadline === null ? "未启动" : `t=${deadline}`}
                  </text>
                  <path d={`M40 ${y + 20} H220`} stroke="currentColor" />
                  {deadline !== null && (
                    <circle
                      cx={100 + (deadline - 10) * 30}
                      cy={y + 20}
                      r="5"
                      fill={deadline <= 10 ? danger : accent}
                    />
                  )}
                  <text x="8" y={y + 43}>
                    {deadline === null
                      ? "各自首次越软额才启动"
                      : deadline <= 10
                        ? "已到期 · 点在当前左侧"
                        : "有效期内 · 点在当前右侧"}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
      <div
        data-testid="identity-explanation"
        aria-live="polite"
        className="break-words text-sm"
      >
        {frame === 0 && (
          <p>
            数据库主
            GID=1001；项目组是附加组。数据库有记录，不等于旧进程已经拿到凭据。
          </p>
        )}
        {frame === 1 && (
          <p>
            本次凭据附加组：{result.credentialHasGroup ? "2000" : "空"}
            。现实中新登录建立凭据，子进程通常继承父进程凭据；不是每次访问都查询
            group 文件。
          </p>
        )}
        {revealPermission && (
          <p>
            权限门：
            {result.permission
              ? "项目组命中且具有 w+x"
              : "组未进入凭据，或缺少目录写权限"}
            。setgid
            位让新文件通常继承目录组，不会自行授予写权限，也不会改变文件 UID。
          </p>
        )}
        {revealQuota && (
          <p>
            申请后：{result.blocksBefore}+{input.kib}={result.blocksAfter} KiB；
            {result.inodesBefore}+{input.files}={result.inodesAfter}{" "}
            inode。硬上限用严格大于判断。只申请 inode 时不调用块分配路径，
            块期限到期不否决 inode
            路径；只申请块时亦然。每条路径只查自己的期限，
            不是每次写入重开宽限期。
            {result.soft
              ? "至少一项超软额；仍须判断硬额和宽限期。"
              : "两项均未超软额。"}
          </p>
        )}
        <p
          data-testid="identity-block-deadline"
          data-before={result.blockDeadlineBefore ?? "none"}
          data-after={result.blockDeadlineAfter ?? "none"}
        >
          块旧期限（t=10）：
          {result.blockDeadlineBefore === null
            ? "无旧期限"
            : input.blockGraceExpired
              ? "已到期 t=9"
              : "有效 t=14"}
          ； 块申请：{input.kib === 0 ? "零增量，不调用此路径" : "申请增长"}。
          {final &&
            `显示提交后期限：${result.blockDeadlineAfter === null ? "未启动" : `t=${result.blockDeadlineAfter}`}。`}
        </p>
        <p
          data-testid="identity-inode-deadline"
          data-before={result.inodeDeadlineBefore ?? "none"}
          data-after={result.inodeDeadlineAfter ?? "none"}
        >
          inode 旧期限（t=10）：
          {result.inodeDeadlineBefore === null
            ? "无旧期限"
            : input.inodeGraceExpired
              ? "已到期 t=9"
              : "有效 t=12"}
          ； inode 申请：
          {input.files === 0 ? "零增量，不调用此路径" : "申请增长"}。
          {final &&
            `显示提交后期限：${result.inodeDeadlineAfter === null ? "未启动" : `t=${result.inodeDeadlineAfter}`}。`}
        </p>
        {final && (
          <>
            <p data-testid="identity-result" data-outcome={result.outcome}>
              {outcomeText[result.outcome]}
            </p>
            {(result.blockGraceStarted || result.inodeGraceStarted) && (
              <p>
                首次越过软额：{result.blockGraceStarted ? "块" : ""}
                {result.inodeGraceStarted ? " inode" : ""} 开始新的正宽限期，
                不沿用界面上不适用于此快照的“旧计时器到期”开关。
              </p>
            )}
            <p>
              预测{prediction === result.outcome ? "正确" : "不符"}
              。模型提交用量：{result.committedBlocks} KiB /{" "}
              {result.committedInodes}{" "}
              inode。配对全收/全拒仅是教学显示策略，不是内核原子提交，
              也不证明真实 touch 成功；真实失败可能部分写入。
            </p>
          </>
        )}
      </div>
    </section>
  );
}

// Remount reset cancels the owned shared timeline and restores every local state.
export function LopUserManagementLab() {
  const [generation, setGeneration] = useState(0);
  return (
    <IdentityQuotaExperiment
      key={generation}
      onReset={() => setGeneration((value) => value + 1)}
    />
  );
}
