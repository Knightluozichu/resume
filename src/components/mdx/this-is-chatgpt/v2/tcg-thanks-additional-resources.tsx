"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
  type TeachingStep,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  good: "var(--success)",
  bad: "var(--danger)",
};
const buttonClass =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent";
const steps: readonly TeachingStep[] = [
  { label: "入口" },
  { label: "第一组检查" },
  { label: "第二组检查" },
];
const build: BuildTimeline = (tl) => {
  const cursor = { value: 0 };
  steps.forEach((step, i) => {
    tl.label(step.label, i * 1000);
    tl.add(cursor, { value: i + 1, duration: 1000, ease: "linear" }, i * 1000);
  });
};
function useClock() {
  const timeline = useTeachingTimeline({ steps, build });
  const { reducedMotion, pause } = timeline;
  useEffect(() => {
    if (reducedMotion) pause();
  }, [reducedMotion, pause]);
  return timeline;
}
function Param({
  domain,
  label,
  value,
  options,
  change,
}: {
  domain: string;
  label: string;
  value: number;
  options: readonly (readonly [number, string])[];
  change: (value: number) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span>{label}</span>
      <select
        data-param={domain}
        aria-label={label}
        value={value}
        onChange={(e) => change(Number(e.target.value))}
        className="min-h-11 min-w-0 w-full rounded border border-border bg-background px-2 text-primary focus-visible:outline-2 focus-visible:outline-accent"
      >
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
function Shell({
  kind,
  title,
  children,
  timeline,
  reset,
}: {
  kind: string;
  title: string;
  children: ReactNode;
  timeline: TeachingTimeline;
  reset: () => void;
}) {
  return (
    <section
      data-lab={kind}
      data-visual-kind={kind}
      className="not-prose my-6 min-w-0 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-secondary">
        固定合成记录；不探测当前网站，不给来源打可信度分。
      </p>
      {children}
      <div data-controls={kind}>
        <TimelineControls
          timeline={timeline}
          caption="播放只移动检查光标；数值结论由当前参数完整计算。"
        />
      </div>
      <button
        type="button"
        data-reset={kind}
        className={`${buttonClass} mx-auto mt-3 block`}
        onClick={reset}
      >
        完整重置
      </button>
    </section>
  );
}
const graphNodes = [
  { id: "C", label: "论断 C", x: 160, y: 40, primary: false },
  { id: "R", label: "转述 R", x: 65, y: 133, primary: false },
  { id: "A", label: "致谢 A", x: 255, y: 133, primary: false },
  { id: "P", label: "原文 P", x: 65, y: 248, primary: true },
  { id: "Q", label: "材料 Q", x: 255, y: 248, primary: true },
] as const;
const graphEdges = [
  { from: "C", to: "R", kind: "cite", label: "引用" },
  { from: "C", to: "A", kind: "thanks", label: "致谢" },
  { from: "R", to: "P", kind: "cite", label: "引用" },
  { from: "A", to: "Q", kind: "link", label: "外链" },
] as const;
function reachable(depth: number, saved: boolean, fault: boolean) {
  const reached = new Map<string, number>([["C", 0]]);
  for (let hop = 1; hop <= depth; hop++) {
    for (const edge of graphEdges) {
      if (
        reached.get(edge.from) === hop - 1 &&
        (edge.kind === "cite" || fault) &&
        (edge.to !== "P" || saved)
      ) {
        reached.set(edge.to, hop);
      }
    }
  }
  return reached;
}
export function TcgThanksAdditionalResourcesContextContractLab() {
  const [depth, setDepth] = useState(2);
  const [saved, setSaved] = useState(1);
  const [fault, setFault] = useState(false);
  const timeline = useClock();
  const reached = reachable(depth, Boolean(saved), fault);
  const primary = graphNodes.filter((n) => n.primary && reached.has(n.id));
  return (
    <Shell
      kind="citation-dependency-dag"
      title="实验一：沿哪一种边追到原始材料？"
      timeline={timeline}
      reset={() => {
        setDepth(2);
        setSaved(1);
        setFault(false);
        timeline.pause();
        timeline.seek(0);
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Param
          domain="max-hops"
          label="最多追几跳"
          value={depth}
          options={[
            [1, "1 跳"],
            [2, "2 跳"],
          ]}
          change={setDepth}
        />
        <Param
          domain="primary-snapshot"
          label="原文 P 快照"
          value={saved}
          options={[
            [1, "已保存"],
            [0, "未保存"],
          ]}
          change={setSaved}
        />
      </div>
      <button
        type="button"
        className={`${buttonClass} mt-3`}
        data-fault="acknowledgement-as-citation"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：致谢／外链也算引用（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 320 330"
        role="img"
        aria-label="带边类型的引用依赖图；断开的原文快照与被误计的致谢路径"
        className="mt-3 block h-auto w-full"
        fontSize="15"
        fill={C.text}
      >
        {graphEdges.map((edge) => {
          const from = graphNodes.find((n) => n.id === edge.from)!;
          const to = graphNodes.find((n) => n.id === edge.to)!;
          const traversed =
            reached.get(edge.to) === (reached.get(edge.from) ?? -9) + 1;
          const color = traversed
            ? edge.kind === "cite"
              ? C.good
              : C.bad
            : C.muted;
          const x1 = from.x,
            y1 = from.y + 21,
            x2 = to.x,
            y2 = to.y - 21;
          return (
            <g key={edge.to} data-edge={`${edge.from}-${edge.to}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth={traversed ? 4 : 2}
                strokeDasharray={edge.kind === "cite" ? undefined : "5 4"}
              />
              <path
                d={`M ${x2 - 5} ${y2 - 8} L ${x2} ${y2} L ${x2 + 5} ${y2 - 8}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
              />
              <text
                x={
                  edge.from === "C"
                    ? (from.x + to.x) / 2 + (to.x < 160 ? -27 : 8)
                    : to.x + 9
                }
                y={(y1 + y2) / 2}
                fill={color}
              >
                {edge.label}
              </text>
            </g>
          );
        })}
        {graphNodes.map((node) => {
          const distance = reached.get(node.id);
          const missing = node.id === "P" && !saved;
          const invalid =
            fault && ["A", "Q"].includes(node.id) && distance !== undefined;
          const color = missing
            ? C.bad
            : distance === undefined
              ? C.muted
              : invalid
                ? C.bad
                : C.good;
          const focused = distance === Math.min(depth, timeline.currentStep);
          return (
            <g
              key={node.id}
              data-node={node.id}
              data-reached={distance !== undefined}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="24"
                stroke={color}
                strokeWidth={focused ? 5 : 2}
                fill={C.bg}
                strokeDasharray={missing ? "4 3" : undefined}
              />
              <text x={node.x} y={node.y + 5} textAnchor="middle">
                {node.id}
              </text>
              <text x={node.x} y={node.y + 47} textAnchor="middle" fill={color}>
                {missing ? "P 未保存" : node.label}
              </text>
            </g>
          );
        })}
        <text x="8" y="319" fill={C.muted}>
          实线：引用　虚线：致谢／外链
        </text>
      </svg>
      <p
        data-readout="citation-reachability"
        data-reached={Array.from(reached.keys()).sort().join(",")}
        data-primary={primary.length}
        className="text-sm"
        aria-live="polite"
      >
        可达：{Array.from(reached.keys()).sort().join("、")}；计入原始材料：
        {primary.map((p) => p.id).join("、") || "无"}（{primary.length}
        ）。到达材料仍不等于核实论断。
      </p>
    </Shell>
  );
}

const claims = ["2023观点", "出版信息", "复用许可", "当前规格"];
const sourceLabels = ["文章", "书目", "许可", "现行"];
export function TcgThanksAdditionalResourcesComputeTraceLab() {
  const [sourceCount, setSourceCount] = useState(2);
  const [group, setGroup] = useState(0);
  const [fault, setFault] = useState(false);
  const timeline = useClock();
  const rows = group === 0 ? [0, 1] : [2, 3];
  const actual = rows.filter((r) => r < sourceCount).length;
  const reported = fault ? 2 : actual;
  const invalid = fault ? 2 * sourceCount - actual : 0;
  return (
    <Shell
      kind="claim-source-scope-incidence"
      title="实验二：链接存在，能填满哪些论断？"
      timeline={timeline}
      reset={() => {
        setSourceCount(2);
        setGroup(0);
        setFault(false);
        timeline.pause();
        timeline.seek(0);
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Param
          domain="source-count"
          label="已选来源"
          value={sourceCount}
          options={[
            [1, "文章"],
            [2, "文章＋书目"],
            [4, "四种全选"],
          ]}
          change={setSourceCount}
        />
        <Param
          domain="claim-group"
          label="待核对论断"
          value={group}
          options={[
            [0, "历史＋书目"],
            [1, "许可＋当前"],
          ]}
          change={setGroup}
        />
      </div>
      <button
        type="button"
        className={`${buttonClass} mt-3`}
        data-fault="link-presence-as-scope"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：有链接就算支持（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 320 350"
        className="mt-3 block h-auto w-full"
        role="img"
        aria-label="论断范围与来源的二值对应矩阵；斜线格为错误支持"
        fontSize="15"
        fill={C.text}
      >
        {sourceLabels.map((label, c) => (
          <g key={label}>
            <text
              x={132 + c * 47}
              y="27"
              textAnchor="middle"
              fill={c < sourceCount ? C.text : C.muted}
            >
              {label}
            </text>
            <line
              x1={112 + c * 47}
              x2={152 + c * 47}
              y1="37"
              y2="37"
              stroke={c < sourceCount ? C.accent : C.border}
              strokeWidth="4"
            />
          </g>
        ))}
        {claims.map((claim, r) => (
          <g key={claim}>
            <text
              x="6"
              y={77 + r * 51}
              fill={rows.includes(r) ? C.text : C.muted}
            >
              {claim}
            </text>
            {rows.includes(r) && (
              <path
                d={`M 104 ${49 + r * 51} h -5 v 44 h 5`}
                stroke={C.accent}
                strokeWidth={
                  timeline.currentStep > 0 &&
                  rows[timeline.currentStep - 1] === r
                    ? 5
                    : 2
                }
                fill="none"
              />
            )}
            {sourceLabels.map((_, c) => {
              const active = c < sourceCount;
              const real = r === c;
              const promoted = active && rows.includes(r) && !real && fault;
              const color = promoted
                ? C.bad
                : real && active
                  ? C.good
                  : C.border;
              return (
                <g
                  key={c}
                  data-cell={`${r}-${c}`}
                  data-support={real && active}
                  data-invalid={promoted}
                >
                  <rect
                    x={112 + c * 47}
                    y={48 + r * 51}
                    width="40"
                    height="43"
                    rx="3"
                    stroke={color}
                    strokeWidth="2"
                    fill={C.bg}
                    strokeDasharray={!active ? "3 3" : undefined}
                  />
                  {real && (
                    <circle
                      cx={132 + c * 47}
                      cy={69 + r * 51}
                      r={active ? 10 : 5}
                      fill={active ? C.good : C.border}
                    />
                  )}
                  {promoted && (
                    <path
                      d={`M ${117 + c * 47} ${84 + r * 51} l 28 -30 M ${117 + c * 47} ${64 + r * 51} l 11 -11`}
                      stroke={C.bad}
                      strokeWidth="3"
                    />
                  )}
                </g>
              );
            })}
          </g>
        ))}
        <text x="6" y="279" fill={C.good}>
          圆点：范围相符
        </text>
        <text x="6" y="305" fill={C.bad}>
          斜线：故障误计
        </text>
        <text x="6" y="333" fill={C.muted}>
          括号：待核对行；虚框：未选来源
        </text>
      </svg>
      <p
        data-readout="scope-incidence"
        data-actual={actual}
        data-reported={reported}
        data-invalid={invalid}
        className="text-sm"
        aria-live="polite"
      >
        待核对 2 行；实际覆盖 {actual} 行；声称覆盖 {reported} 行；误计{" "}
        {invalid} 格。矩阵是本例给定的范围合同，不是对真实来源自动判真。
      </p>
    </Shell>
  );
}

// SHA-256 is precomputed for these four finite ASCII fixtures only. Python in the
// chapter recomputes it with hashlib; no browser fetch/hash service is implied.
const fixtureHashes: Record<string, string> = {
  abc: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  abd: "a52d159f262b2c6ddb724a61840befc36eb30c88877a4030b65cbe86298449c9",
  "abc ": "5488613c42b0d34d60f7aa9e94be317a3ee102a2bbd91ccc73cc79fbc2269955",
  "abd ": "e7174d4863ce1990b919d569e6694968f741057c8eedc13705e06da6b332d9e7",
};
export function TcgThanksAdditionalResourcesEvidenceGateLab() {
  const [edition, setEdition] = useState(1);
  const [extraByte, setExtraByte] = useState(0);
  const [grant, setGrant] = useState(0);
  const [fault, setFault] = useState(false);
  const timeline = useClock();
  const expected = edition === 1 ? "abc" : "abd";
  const received = expected + (extraByte ? " " : "");
  const integrity = fixtureHashes[expected] === fixtureHashes[received];
  const versionMatch = edition === 1;
  const permitted = Boolean(grant);
  const actual = integrity && versionMatch && permitted;
  const reported = fault || actual;
  const mismatch = Array.from(
    { length: 4 },
    (_, i) => expected[i] !== received[i],
  );
  return (
    <Shell
      kind="edition-byte-rights-provenance"
      title="实验三：同一入口，不等于同字节、同版本、同许可"
      timeline={timeline}
      reset={() => {
        setEdition(1);
        setExtraByte(0);
        setGrant(0);
        setFault(false);
        timeline.pause();
        timeline.seek(0);
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <Param
          domain="candidate-edition"
          label="候选版本"
          value={edition}
          options={[
            [1, "v1：abc"],
            [2, "v2：abd"],
          ]}
          change={setEdition}
        />
        <Param
          domain="received-extra-byte"
          label="收到的字节"
          value={extraByte}
          options={[
            [0, "保持原样"],
            [1, "末尾多空格"],
          ]}
          change={setExtraByte}
        />
        <Param
          domain="copy-grant"
          label="合成许可记录"
          value={grant}
          options={[
            [0, "仅允许阅读"],
            [1, "另有复制授权"],
          ]}
          change={setGrant}
        />
      </div>
      <button
        type="button"
        className={`${buttonClass} mt-3`}
        data-fault="url-as-provenance"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：入口存在就全通过（{fault ? "开" : "关"}）
      </button>
      <svg
        viewBox="0 0 320 500"
        className="mt-3 block h-auto w-full"
        role="img"
        aria-label="版本谱系、逐字节差异、SHA256前缀及许可动作交集；红线是URL旁路"
        fontSize="15"
        fill={C.text}
      >
        <text x="8" y="22">
          请求固定为 v1；候选记录为 v{edition}
        </text>
        <line
          x1="65"
          x2="245"
          y1="62"
          y2="62"
          stroke={C.muted}
          strokeWidth="2"
        />
        {[1, 2].map((v) => (
          <g key={v}>
            <circle
              cx={v === 1 ? 65 : 245}
              cy="62"
              r={edition === v ? 18 : 12}
              fill={C.bg}
              stroke={edition === v ? C.accent : C.border}
              strokeWidth={timeline.currentStep === 1 && edition === v ? 5 : 2}
            />
            <text x={v === 1 ? 65 : 245} y="67" textAnchor="middle">
              v{v}
            </text>
            <text x={v === 1 ? 65 : 245} y="104" textAnchor="middle">
              {v === 1 ? "abc · 原版" : "abd · 修订"}
            </text>
          </g>
        ))}
        <text x="8" y="137">
          记录
        </text>
        <text x="8" y="183">
          收到
        </text>
        {[expected, received].map((bytes, row) => (
          <g key={row}>
            {Array.from({ length: 4 }, (_, i) => (
              <g key={i} data-byte={`${row}-${i}`}>
                <rect
                  x={66 + 56 * i}
                  y={114 + 46 * row}
                  width="48"
                  height="36"
                  fill={C.bg}
                  stroke={mismatch[i] ? C.bad : C.border}
                  strokeWidth={
                    timeline.currentStep === 1 && mismatch[i] ? 4 : 2
                  }
                  strokeDasharray={bytes[i] === undefined ? "3 3" : undefined}
                />
                <text x={90 + 56 * i} y={138 + 46 * row} textAnchor="middle">
                  {bytes[i] === undefined ? "—" : bytes.charCodeAt(i)}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x="8" y="224" fill={C.muted}>
          ASCII：a=97，b=98，c=99，空格=32
        </text>
        <text x="8" y="250">
          记录 SHA：{fixtureHashes[expected].slice(0, 12)}…
        </text>
        <text x="8" y="276" fill={integrity ? C.good : C.bad}>
          收到 SHA：{fixtureHashes[received].slice(0, 12)}…
        </text>
        <text x="8" y="309">
          许可动作集合 ∩ 请求动作
        </text>
        <text x="8" y="342">
          允许
        </text>
        <text x="8" y="390">
          请求
        </text>
        {["read", "copy"].map((action, i) => (
          <g key={action}>
            <rect
              x={72 + 118 * i}
              y="320"
              width="104"
              height="34"
              rx="4"
              fill={C.bg}
              stroke={i === 0 || grant ? C.good : C.border}
              strokeDasharray={i === 1 && !grant ? "4 3" : undefined}
              strokeWidth="2"
            />
            <text
              x={124 + 118 * i}
              y="343"
              textAnchor="middle"
              fill={i === 0 || grant ? C.good : C.muted}
            >
              {i === 0 || grant ? action : "无 copy"}
            </text>
            {i === 1 && (
              <>
                <path
                  d="M 242 357 v 13"
                  stroke={grant ? C.good : C.bad}
                  strokeWidth={timeline.currentStep === 2 ? 5 : 2}
                />
                <rect
                  x="190"
                  y="372"
                  width="104"
                  height="30"
                  fill={C.bg}
                  stroke={grant ? C.good : C.bad}
                />
                <text x="242" y="393" textAnchor="middle">
                  copy
                </text>
              </>
            )}
          </g>
        ))}
        <text x="8" y="435" fill={actual ? C.good : C.bad}>
          请求合格结论：{actual ? "可复用本fixture" : "不能据此复用"}
        </text>
        {fault && (
          <path
            d="M 11 451 H 295 l -8 -6 M 295 451 l -8 6"
            stroke={C.bad}
            strokeWidth="4"
            fill="none"
          />
        )}
        <text x="8" y="483" fill={fault ? C.bad : C.muted}>
          {fault
            ? "入口存在 → 错误绕过全部检查"
            : "入口不参与版本／字节／许可判断"}
        </text>
      </svg>
      <p
        data-readout="provenance-result"
        data-integrity={integrity}
        data-version-match={versionMatch}
        data-permitted={permitted}
        data-actual={actual}
        data-reported={reported}
        data-diff-bytes={mismatch.filter(Boolean).length}
        className="text-sm"
        aria-live="polite"
      >
        字节一致 {integrity ? "是" : "否"}；请求版本匹配{" "}
        {versionMatch ? "是" : "否"}；copy 授权 {permitted ? "有" : "无"}
        ；真实可复用 {actual ? "是" : "否"}；程序声称 {reported ? "是" : "否"}。
      </p>
    </Shell>
  );
}
