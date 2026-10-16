"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

/** 仅用于 SVG 绘制坐标：消除浮点尾差，避免 SSR hydration 失配；判定逻辑从不舍入。 */
const rd = (n: number) => Number(n.toFixed(9));

type TreeNode = {
  id: string;
  key: number;
  x: number;
  y: number;
  left: string | null;
  right: string | null;
  parent: string | null;
};

type NodeMap = Record<string, TreeNode>;

function inorderKeys(nodes: NodeMap, rootId: string | null): number[] {
  if (!rootId) return [];
  const n = nodes[rootId];
  return [...inorderKeys(nodes, n.left), n.key, ...inorderKeys(nodes, n.right)];
}

function reachableIds(nodes: NodeMap, rootId: string | null): Set<string> {
  const out = new Set<string>();
  const walk = (id: string | null) => {
    if (!id || out.has(id)) return;
    out.add(id);
    walk(nodes[id].left);
    walk(nodes[id].right);
  };
  walk(rootId);
  return out;
}

/* ---------------- Lab 1：BST 全子树范围验证器 ---------------- */

type Lab1ScenarioKey = "valid" | "hidden";

function buildLab1Tree(hiddenViolation: boolean): NodeMap {
  const n = (
    id: string,
    key: number,
    x: number,
    y: number,
    left: string | null = null,
    right: string | null = null,
    parent: string | null = null,
  ): TreeNode => ({ id, key, x, y, left, right, parent });
  const nodes: NodeMap = {
    k12: n("k12", 12, 450, 96, "k5", "k19"),
    k5: n("k5", 5, 300, 200, "k2", "k8", "k12"),
    k19: n("k19", 19, 600, 200, "k15", "k22", "k12"),
    k2: n("k2", 2, 222, 304, null, null, "k5"),
    k8: n("k8", 8, 378, 304, "k7", "k10", "k5"),
    k15: n("k15", 15, 522, 304, null, "k17", "k19"),
    k22: n("k22", 22, 678, 304, null, null, "k19"),
    k7: n("k7", hiddenViolation ? 4 : 7, 330, 408, null, null, "k8"),
    k10: n("k10", 10, 426, 408, null, null, "k8"),
    k17: n("k17", 17, 570, 408, null, null, "k15"),
  };
  return nodes;
}

const LAB1_SCENARIOS: Record<Lab1ScenarioKey, { label: string; note: string }> =
  {
    valid: {
      label: "合法树 · 全子树满足范围",
      note: "每个节点的键都落在祖先们划定的区间内",
    },
    hidden: {
      label: "埋雷树 · 深层节点违反范围",
      note: "节点 4 小于其父 8，看似正常，却破坏了祖先 5 划定的下界",
    },
  };

const LAB1_STEPS: readonly TeachingStep[] = [
  { label: "root", caption: "根获得无界范围 (−∞, +∞)" },
  {
    label: "narrow",
    caption: "范围沿边收窄：走左孩子换父键为上界，走右孩子换父键为下界",
  },
  { label: "check", caption: "每个节点对照自己的区间逐一核对" },
  { label: "inorder", caption: "中序序列必须非降序——它是 BST 性质的等价镜像" },
  { label: "verdict", caption: "汇总违例数，判定整棵树而不是每条边" },
];

const LAB1_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  LAB1_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function computeRanges(
  nodes: NodeMap,
  rootId: string,
): {
  range: Map<string, { low: number | null; high: number | null }>;
  violations: string[];
} {
  const range = new Map<string, { low: number | null; high: number | null }>();
  const violations: string[] = [];
  const walk = (id: string, low: number | null, high: number | null) => {
    const node = nodes[id];
    range.set(id, { low, high });
    if (
      (low !== null && node.key < low) ||
      (high !== null && node.key > high)
    ) {
      violations.push(id);
    }
    if (node.left) walk(node.left, low, node.key);
    if (node.right) walk(node.right, node.key, high);
  };
  walk(rootId, null, null);
  return { range, violations };
}

/** 只查直接父子对的“伪验证”：返回违例的边数。埋雷树上它什么都查不出来。 */
function localPairViolations(nodes: NodeMap): number {
  let bad = 0;
  for (const node of Object.values(nodes)) {
    if (node.left) {
      const c = nodes[node.left];
      if (c.key > node.key) bad += 1;
    }
    if (node.right) {
      const c = nodes[node.right];
      if (c.key < node.key) bad += 1;
    }
  }
  return bad;
}

function fmtBound(v: number | null): string {
  return v === null ? "±∞" : String(v);
}

function BstRangeValidatorLab() {
  const cardRefs = useRef<Array<SVGGElement | null>>([]);
  const [scenario, setScenario] = useState<Lab1ScenarioKey>("hidden");
  const [localOnly, setLocalOnly] = useState(false);

  const timeline = useTeachingTimeline({
    steps: LAB1_STEPS,
    build: (tl) => {
      LAB1_STEPS.forEach((step, index) => {
        tl.add(
          cardRefs.current[index]!,
          {
            opacity: index === 0 ? [1, 1] : [0, 1],
            duration: T * 0.55,
            ease: "out(3)",
          },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const nodes = buildLab1Tree(scenario === "hidden");
  const rootId = "k12";
  const { range, violations } = computeRanges(nodes, rootId);
  const localBad = localPairViolations(nodes);
  const seq = inorderKeys(nodes, rootId);
  let firstInversion = -1;
  for (let i = 0; i < seq.length - 1; i++) {
    if (seq[i] > seq[i + 1]) {
      firstInversion = i;
      break;
    }
  }
  const s = timeline.currentStep;
  const verdictOk = violations.length === 0;

  function reset() {
    timeline.goToStep(0);
    setScenario("hidden");
    setLocalOnly(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch12-bst-range-validator"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Lab 1 · BST 全子树范围验证器
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              只查父子对，为什么查不出埋在最深处的雷
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              验证器沿递归把允许区间 (low, high)
              一路传下去。先预测埋雷树上哪一步会亮红，
              再逐步看范围怎样逐层收窄，最后打开“只查父子对”故障，对比两种验证器的结论。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-3 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">
            选择待验的树
          </span>
          <select
            aria-label="选择 BST 验证器待验树：合法树或埋雷树"
            data-param="validator-scenario"
            value={scenario}
            onChange={(event) => {
              setScenario(event.target.value as Lab1ScenarioKey);
              timeline.goToStep(0);
            }}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            {(Object.keys(LAB1_SCENARIOS) as Lab1ScenarioKey[]).map((key) => (
              <option key={key} value={key}>
                {LAB1_SCENARIOS[key].label}
              </option>
            ))}
          </select>
        </label>

        <svg
          viewBox="0 0 900 690"
          role="img"
          aria-label="BST 全子树范围验证器实验：树节点带键值，验证器从根携带上下界区间逐层收窄，违例节点亮红；底部展示中序序列与违例计数，支持树切换、只查父子对的故障注入与步进播放。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch12-a-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="clrs4-ch12-a-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="690" rx="14" fill={C.bg} />
          <text x="30" y="32" fontSize="15" fontWeight="700" fill={C.primary}>
            {LAB1_SCENARIOS[scenario].label}
          </text>
          <text
            x="870"
            y="32"
            textAnchor="end"
            fontSize="12"
            fill={C.secondary}
          >
            {s >= 4
              ? verdictOk
                ? "● 性质成立"
                : "● 性质破坏"
              : `阶段 ${s + 1} / 5`}
          </text>
          <text x="30" y="54" fontSize="12" fill={C.secondary}>
            {LAB1_SCENARIOS[scenario].note}
          </text>

          {Object.values(nodes).map((node) => {
            if (!node.parent) return null;
            const p = nodes[node.parent];
            const isViolation = s >= 2 && violations.includes(node.id);
            return (
              <line
                key={`edge-${node.id}`}
                x1={p.x}
                y1={p.y}
                x2={node.x}
                y2={node.y}
                stroke={isViolation ? C.danger : C.border}
                strokeWidth={isViolation ? 2.5 : 1.5}
                markerEnd={isViolation ? undefined : "url(#clrs4-ch12-a-arrow)"}
              />
            );
          })}

          {Object.values(nodes).map((node) => {
            const r = range.get(node.id);
            const isViolation = s >= 2 && violations.includes(node.id);
            const stroke = isViolation ? C.danger : C.border;
            return (
              <g key={`node-${node.id}`}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill={isViolation ? C.danger : C.elevated}
                  fillOpacity={isViolation ? 0.16 : 1}
                  stroke={stroke}
                  strokeWidth={isViolation ? 3 : 1.5}
                />
                <text
                  x={node.x}
                  y={rd(node.y + 5)}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {node.key}
                </text>
                {s >= 1 && r && (
                  <text
                    x={node.x}
                    y={rd(node.y - 32)}
                    textAnchor="middle"
                    fontSize="11"
                    fill={isViolation ? C.danger : C.secondary}
                  >
                    ({fmtBound(r.low)}, {fmtBound(r.high)})
                  </text>
                )}
                {isViolation && (
                  <text
                    x={node.x}
                    y={rd(node.y + 42)}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={C.danger}
                  >
                    {node.key} &lt; 下界 {r?.low ?? "?"}
                  </text>
                )}
              </g>
            );
          })}

          <text x="30" y="492" fontSize="13" fontWeight="700" fill={C.primary}>
            中序序列（左 → 根 → 右）
          </text>
          {s >= 3 ? (
            <g>
              {seq.map((value, i) => {
                const badPair =
                  firstInversion >= 0 &&
                  (i === firstInversion || i === firstInversion + 1);
                return (
                  <text
                    key={`seq-${i}`}
                    x={rd(30 + i * 58)}
                    y="520"
                    fontSize="13"
                    fontWeight={badPair ? 700 : 400}
                    fill={badPair ? C.danger : C.primary}
                  >
                    {value}
                  </text>
                );
              })}
              <text x="30" y="546" fontSize="11" fill={C.secondary}>
                {firstInversion >= 0
                  ? `首处逆序在位置 ${firstInversion + 1} 与 ${firstInversion + 2}：中序不再非降序`
                  : "序列非降序：与范围检查结论一致"}
              </text>
            </g>
          ) : (
            <text x="30" y="520" fontSize="11" fill={C.secondary}>
              走完“check”一步后显示——先预测它长什么样
            </text>
          )}

          {LAB1_STEPS.map((step, index) => {
            const isActive = index === s;
            return (
              <g
                key={`stage-${step.label}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <rect
                  x="30"
                  y="566"
                  width="840"
                  height="52"
                  rx="10"
                  fill={isActive ? C.accent : C.elevated}
                  fillOpacity={isActive ? 0.1 : 1}
                  stroke={isActive ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x="52"
                  y="588"
                  fontSize="13"
                  fontWeight="700"
                  fill={isActive ? C.accent : C.primary}
                >
                  {index + 1} · {step.label}
                </text>
                <text x="52" y="606" fontSize="12" fill={C.primary}>
                  {step.caption}
                </text>
                <text
                  x="848"
                  y="588"
                  textAnchor="end"
                  fontSize="11"
                  fill={isActive ? C.accent : C.secondary}
                >
                  {index < s ? "◇ 已完成" : index === s ? "▷ 当前" : "· 未开始"}
                </text>
              </g>
            );
          })}

          <rect
            x="30"
            y="634"
            width="840"
            height="36"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1"
          />
          <text x="52" y="657" fontSize="12" fill={C.secondary}>
            {localOnly
              ? `故障注入中：只查父子对 → ${localBad} 处违例，会误判“合法”——祖先划定的区间被整段跳过`
              : s >= 4
                ? verdictOk
                  ? "范围检查与中序镜像互相印证：全子树性质成立"
                  : "范围检查逮到违例，中序镜像同时失序：两个证据指向同一处"
                : "完整验证沿递归传递 (low, high)，每个节点对照祖先链划定的区间"}
          </text>
        </svg>

        <div
          data-readout="bst-validator"
          className="mt-3 rounded-control border border-border bg-bg px-3 py-2 text-xs leading-6 text-secondary"
        >
          范围违例{" "}
          <span
            className={
              s >= 2 && violations.length > 0
                ? "font-semibold text-[var(--danger)]"
                : "font-semibold text-[var(--success)]"
            }
          >
            {s >= 2 ? violations.length : "待核对"}
          </span>{" "}
          · 父子对违例 {localBad} · 中序逆序{" "}
          <span
            className={
              s >= 3 && firstInversion >= 0
                ? "font-semibold text-[var(--danger)]"
                : "font-semibold text-[var(--success)]"
            }
          >
            {s >= 3
              ? firstInversion >= 0
                ? `1 处（位置 ${firstInversion + 1}）`
                : "0 处"
              : "待核对"}
          </span>
          {s >= 4
            ? verdictOk
              ? " · 结论：合法 BST"
              : " · 结论：非法，但只查父子对会漏报"
            : ""}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-pressed={localOnly}
            data-fault="local-pairs-only"
            onClick={() => setLocalOnly((v) => !v)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              localOnly
                ? "border-[var(--danger)] text-[var(--danger)]"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {localOnly ? "● 故障已注入：只查父子对" : "◇ 注入故障：只查父子对"}
          </button>
          <p className="max-w-xl text-xs leading-5 text-secondary">
            现象：埋雷树上“只查父子对”报 0
            违例，与完整验证结论相反。原因：每个节点要满足的是
            整条祖先链划定的区间，不是只看父亲一个数。修法：验证器递归传递 (low,
            high)， 左递归换 high、右递归换 low。
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LAB1_LABEL_TEXT}
          caption="先预测违例出现在哪一步，再逐步核对范围怎样收窄；最后打开故障开关，看局部验证器怎样漏报。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置 BST 范围验证器实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BST
        性质是“每个键都落在祖先划定的区间内”的全局约束。中序序列非降序是它的等价镜像，
        两个证据互相印证时才可以下结论。
      </figcaption>
    </figure>
  );
}

/* ---------------- Lab 2：DELETE / TRANSPLANT 手术台 ---------------- */

type DeleteTrace = {
  zId: string;
  searchPath: string[];
  caseType: "zero" | "one" | "two";
  childId: string | null;
  successorPath: string[];
  yId: string | null;
  final: NodeMap;
  finalRoot: string | null;
  movedId: string | null;
  movedFrom: { x: number; y: number } | null;
  rewired: Array<[string, string]>;
  orphanIds: string[];
};

function cloneNodes(nodes: NodeMap): NodeMap {
  const out: NodeMap = {};
  for (const [id, n] of Object.entries(nodes)) out[id] = { ...n };
  return out;
}

/** 标准 BST 删除：返回缝合后的结构与轨迹。forgetRelink 模拟“忘记把 z 的左子树接到 y”。 */
function deleteTrace(
  source: NodeMap,
  targetKey: number,
  forgetRelink: boolean,
): DeleteTrace | null {
  const nodes = cloneNodes(source);
  let rootId: string | null = "k12";
  const searchPath: string[] = [];
  let zId: string | null = null;
  let cur: string | null = rootId;
  while (cur) {
    searchPath.push(cur);
    const node: TreeNode = nodes[cur];
    if (node.key === targetKey) {
      zId = cur;
      break;
    }
    cur = node.key > targetKey ? node.left : node.right;
  }
  if (!zId) return null;
  const z = nodes[zId];
  const hasLeft = z.left !== null;
  const hasRight = z.right !== null;
  const caseType =
    hasLeft && hasRight ? "two" : !hasLeft && !hasRight ? "zero" : "one";
  const childId = caseType === "one" ? (z.left ?? z.right) : null;

  const transplant = (uId: string, vId: string | null) => {
    const u = nodes[uId];
    if (u.parent === null) {
      rootId = vId;
    } else {
      const p = nodes[u.parent];
      if (p.left === uId) p.left = vId;
      else p.right = vId;
    }
    if (vId) nodes[vId].parent = u.parent;
  };

  let successorPath: string[] = [];
  let yId: string | null = null;
  let movedId: string | null = null;
  let movedFrom: { x: number; y: number } | null = null;
  const rewired: Array<[string, string]> = [];
  let orphanIds: string[] = [];

  if (caseType === "zero") {
    transplant(zId, null);
  } else if (caseType === "one") {
    transplant(zId, childId!);
    movedId = childId;
    movedFrom = { x: nodes[childId!].x, y: nodes[childId!].y };
    nodes[childId!].x = z.x;
    nodes[childId!].y = z.y;
    rewired.push([z.parent ?? "ROOT", childId!]);
  } else {
    successorPath = [z.right!];
    let y = nodes[z.right!];
    while (y.left) {
      successorPath.push(y.left);
      y = nodes[y.left];
    }
    yId = y.id;
    const zLeft = z.left!;
    const zRight = z.right!;
    if (y.parent !== zId) {
      transplant(yId, y.right);
      rewired.push([y.parent ?? "ROOT", y.right ?? "NIL"]);
      y.right = zRight;
      nodes[zRight].parent = yId;
      rewired.push([yId, zRight]);
    }
    transplant(zId, yId);
    if (z.parent === null) rewired.push(["ROOT", yId]);
    else rewired.push([z.parent, yId]);
    if (!forgetRelink) {
      y.left = zLeft;
      nodes[zLeft].parent = yId;
      rewired.push([yId, zLeft]);
    } else {
      const sub = reachableIds(nodes, zLeft);
      orphanIds = [...sub];
    }
    movedId = yId;
    movedFrom = { x: y.x, y: y.y };
    y.x = z.x;
    y.y = z.y;
  }

  delete nodes[zId];

  const final = nodes;
  // 清掉悬挂引用，保证 final 自洽。
  for (const node of Object.values(final)) {
    if (node.left && !final[node.left]) node.left = null;
    if (node.right && !final[node.right]) node.right = null;
  }
  const reach = reachableIds(final, rootId);
  orphanIds = orphanIds.filter((id) => !reach.has(id));

  return {
    zId,
    searchPath,
    caseType,
    childId,
    successorPath,
    yId,
    final,
    finalRoot: rootId,
    movedId,
    movedFrom,
    rewired,
    orphanIds,
  };
}

function buildLab2Tree(): NodeMap {
  const n = (
    id: string,
    key: number,
    x: number,
    y: number,
    left: string | null = null,
    right: string | null = null,
    parent: string | null = null,
  ): TreeNode => ({ id, key, x, y, left, right, parent });
  const nodes: NodeMap = {
    k12: n("k12", 12, 450, 92, "k5", "k20"),
    k5: n("k5", 5, 292, 196, "k3", null, "k12"),
    k20: n("k20", 20, 608, 196, "k15", "k25", "k12"),
    k3: n("k3", 3, 214, 300, null, null, "k5"),
    k15: n("k15", 15, 530, 300, "k13", "k17", "k20"),
    k25: n("k25", 25, 686, 300, null, null, "k20"),
    k13: n("k13", 13, 482, 404, null, null, "k15"),
    k17: n("k17", 17, 578, 404, null, null, "k15"),
  };
  return nodes;
}

const LAB2_TARGETS: ReadonlyArray<{ key: number; label: string; why: string }> =
  [
    { key: 3, label: "3 · 叶子（零孩子）", why: "零孩子：直接用 NIL 替换 z" },
    { key: 5, label: "5 · 单孩子", why: "单孩子：唯一的孩子顶到 z 的位置" },
    {
      key: 15,
      label: "15 · 双孩子·successor 紧贴",
      why: "双孩子：successor 17 就是 z 的右孩子，直接换位",
    },
    {
      key: 12,
      label: "12 · 根·双孩子·深 successor",
      why: "双孩子：successor 13 深在右子树里，要先摘除再缝合",
    },
    { key: 25, label: "25 · 叶子", why: "零孩子：直接摘除" },
  ];

const LAB2_STEPS: readonly TeachingStep[] = [
  { label: "locate", caption: "沿搜索路径定位待删节点 z" },
  { label: "case", caption: "判定情形：零个、一个还是两个孩子" },
  {
    label: "successor",
    caption: "双孩子情形：在右子树一路向左找最小值 successor y",
  },
  {
    label: "splice",
    caption: "TRANSPLANT 把 y 缝到 z 的原位置，逐条边重接并同步 parent",
  },
  { label: "verify", caption: "校验：中序仍非降序、节点数减一、没有失联子树" },
];

const LAB2_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  LAB2_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const CASE_TEXT: Record<DeleteTrace["caseType"], string> = {
  zero: "情形一 · 零孩子",
  one: "情形二 · 单孩子",
  two: "情形三 · 双孩子",
};

function BstDeleteTransplantLab() {
  const cardRefs = useRef<Array<SVGGElement | null>>([]);
  const [target, setTarget] = useState(12);
  const [forgetRelink, setForgetRelink] = useState(false);

  const timeline = useTeachingTimeline({
    steps: LAB2_STEPS,
    build: (tl) => {
      LAB2_STEPS.forEach((step, index) => {
        tl.add(
          cardRefs.current[index]!,
          {
            opacity: index === 0 ? [1, 1] : [0, 1],
            duration: T * 0.55,
            ease: "out(3)",
          },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const original = buildLab2Tree();
  const trace = deleteTrace(original, target, forgetRelink);
  const s = timeline.currentStep;
  const showingFinal = s >= 3 && trace !== null;
  const display = showingFinal ? trace.final : original;
  const rootId = showingFinal ? trace.finalRoot : "k12";
  const movedNode =
    showingFinal && trace.movedId ? display[trace.movedId] : null;
  const finalSeq = rootId ? inorderKeys(display, rootId) : [];
  let firstInversion = -1;
  for (let i = 0; i < finalSeq.length - 1; i++) {
    if (finalSeq[i] > finalSeq[i + 1]) {
      firstInversion = i;
      break;
    }
  }
  const sortedOk = firstInversion === -1;
  const reachCount = rootId ? reachableIds(display, rootId).size : 0;
  const totalLeft = Object.keys(display).length;
  const orphanCount = trace ? trace.orphanIds.length : 0;
  const verifyOk = sortedOk && reachCount === totalLeft;
  const targetInfo = LAB2_TARGETS.find((t) => t.key === target)!;

  const pathSet = new Set(trace?.searchPath ?? []);
  const succSet = new Set(trace?.successorPath ?? []);
  const orphanSet = new Set(trace?.orphanIds ?? []);
  const rewiredSet = new Set(
    (trace?.rewired ?? [])
      .filter(([a, b]) => a !== "ROOT" && b !== "NIL")
      .map(([a, b]) => `${a}->${b}`),
  );

  function reset() {
    timeline.goToStep(0);
    setTarget(12);
    setForgetRelink(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch12-bst-delete-transplant"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Lab 2 · DELETE / TRANSPLANT 手术台
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              摘掉一个节点，整棵树的边怎样重新缝合
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选一个新目标键，先预测它的 successor
              是谁、有几条边要重接，再沿时间线看 TRANSPLANT
              如何替换子树根、successor 怎样顶到 z 的位置，最后看中序校验。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-3 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">
            选择待删目标 z
          </span>
          <select
            aria-label="选择 BST 删除目标：叶子 3、单孩子 5、双孩子 15、根 12 或叶子 25"
            data-param="delete-target"
            value={target}
            onChange={(event) => {
              setTarget(Number(event.target.value));
              timeline.goToStep(0);
            }}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            {LAB2_TARGETS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <svg
          viewBox="0 0 900 700"
          role="img"
          aria-label="BST 删除手术台实验：树随删除目标逐阶段展示搜索路径、情形判定、successor 下探、TRANSPLANT 缝合与最终校验；故障注入会忘记把 z 的左子树接到 successor，导致子树失联。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch12-b-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="clrs4-ch12-b-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
            <marker
              id="clrs4-ch12-b-warning"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="700" rx="14" fill={C.bg} />
          <text x="30" y="32" fontSize="15" fontWeight="700" fill={C.primary}>
            删除目标 z = {target} · {targetInfo.why}
          </text>
          <text
            x="870"
            y="32"
            textAnchor="end"
            fontSize="12"
            fill={C.secondary}
          >
            {s >= 4
              ? verifyOk
                ? "● 校验通过"
                : "● 校验失败"
              : `阶段 ${s + 1} / 5`}
          </text>
          <text x="30" y="54" fontSize="12" fill={C.secondary}>
            {s === 1 && trace
              ? CASE_TEXT[trace.caseType]
              : s === 2 && trace?.caseType === "two"
                ? `successor y = ${trace.yId ? display[trace.yId].key : "?"}（z 右子树的最小键）`
                : s >= 3 && movedNode
                  ? `${movedNode.key} 顶到 z 的原位置，${trace?.rewired.filter(([a, b]) => a !== "ROOT" && b !== "NIL").length ?? 0} 条边重接`
                  : "每条重接的边都要同步更新两侧的 parent 指针"}
          </text>

          {Object.values(display).map((node) => {
            if (!node.parent) return null;
            const p = display[node.parent];
            if (!p) return null;
            const isRewired =
              showingFinal && rewiredSet.has(`${node.parent}->${node.id}`);
            const isOrphanEdge =
              orphanSet.has(node.id) && orphanSet.has(node.parent);
            const onSearch =
              !showingFinal &&
              s >= 1 &&
              pathSet.has(node.id) &&
              pathSet.has(node.parent);
            const onSucc =
              !showingFinal &&
              s === 2 &&
              succSet.has(node.id) &&
              succSet.has(node.parent);
            const stroke = isOrphanEdge
              ? C.danger
              : isRewired || onSearch
                ? C.accent
                : onSucc
                  ? C.warning
                  : C.border;
            return (
              <line
                key={`edge-${node.parent}->${node.id}`}
                x1={p.x}
                y1={p.y}
                x2={node.x}
                y2={node.y}
                stroke={stroke}
                strokeWidth={
                  isRewired || isOrphanEdge || onSearch || onSucc ? 2.5 : 1.5
                }
                strokeDasharray={isOrphanEdge ? "6 5" : undefined}
                markerEnd={
                  isRewired || onSearch
                    ? "url(#clrs4-ch12-b-accent)"
                    : onSucc
                      ? "url(#clrs4-ch12-b-warning)"
                      : "url(#clrs4-ch12-b-arrow)"
                }
              />
            );
          })}

          {Object.values(display).map((node) => {
            const isZ =
              !showingFinal &&
              trace !== null &&
              node.id === trace.zId &&
              s >= 1;
            const isY = !showingFinal && s === 2 && trace?.yId === node.id;
            const isMoved = showingFinal && trace?.movedId === node.id;
            const isOrphan = showingFinal && orphanSet.has(node.id);
            const onSearch = !showingFinal && s >= 1 && pathSet.has(node.id);
            const stroke = isOrphan
              ? C.danger
              : isZ || isY
                ? C.warning
                : isMoved || onSearch
                  ? C.accent
                  : C.border;
            return (
              <g key={`node-${node.id}`}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill={
                    isOrphan
                      ? C.danger
                      : isZ || isY
                        ? C.warning
                        : isMoved || onSearch
                          ? C.accent
                          : C.elevated
                  }
                  fillOpacity={
                    isOrphan || isZ || isY || isMoved || onSearch ? 0.16 : 1
                  }
                  stroke={stroke}
                  strokeWidth={isZ || isY || isMoved || isOrphan ? 3 : 1.5}
                  strokeDasharray={isOrphan ? "5 4" : undefined}
                />
                <text
                  x={node.x}
                  y={rd(node.y + 5)}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {node.key}
                </text>
                {isZ && (
                  <text
                    x={node.x}
                    y={rd(node.y + 42)}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={C.warning}
                  >
                    z 待删
                  </text>
                )}
                {isY && (
                  <text
                    x={node.x}
                    y={rd(node.y + 42)}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={C.warning}
                  >
                    y successor
                  </text>
                )}
                {isMoved && (
                  <text
                    x={node.x}
                    y={rd(node.y + 42)}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={C.accent}
                  >
                    接入 z 的位置
                  </text>
                )}
                {isOrphan && (
                  <text
                    x={node.x}
                    y={rd(node.y + 42)}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={C.danger}
                  >
                    失联
                  </text>
                )}
              </g>
            );
          })}

          <text x="30" y="502" fontSize="13" fontWeight="700" fill={C.primary}>
            缝合后的中序序列
          </text>
          {s >= 4 && trace ? (
            <g>
              {finalSeq.map((value, i) => (
                <text
                  key={`seq-${i}`}
                  x={rd(30 + i * 52)}
                  y="530"
                  fontSize="13"
                  fontWeight={
                    firstInversion >= 0 &&
                    (i === firstInversion || i === firstInversion + 1)
                      ? 700
                      : 400
                  }
                  fill={
                    firstInversion >= 0 &&
                    (i === firstInversion || i === firstInversion + 1)
                      ? C.danger
                      : C.primary
                  }
                >
                  {value}
                </text>
              ))}
              <text x="30" y="554" fontSize="11" fill={C.secondary}>
                {sortedOk
                  ? "非降序保持：successor 缝合没有破坏范围约束"
                  : "出现逆序：缝合打破了 BST 范围约束"}
              </text>
            </g>
          ) : (
            <text x="30" y="530" fontSize="11" fill={C.secondary}>
              到“verify”一步显示——先预测删完后的顺序
            </text>
          )}

          {LAB2_STEPS.map((step, index) => {
            const isActive = index === s;
            return (
              <g
                key={`stage-${step.label}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <rect
                  x="30"
                  y="572"
                  width="840"
                  height="52"
                  rx="10"
                  fill={isActive ? C.accent : C.elevated}
                  fillOpacity={isActive ? 0.1 : 1}
                  stroke={isActive ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x="52"
                  y="594"
                  fontSize="13"
                  fontWeight="700"
                  fill={isActive ? C.accent : C.primary}
                >
                  {index + 1} · {step.label}
                </text>
                <text x="52" y="612" fontSize="12" fill={C.primary}>
                  {step.caption}
                </text>
                <text
                  x="848"
                  y="594"
                  textAnchor="end"
                  fontSize="11"
                  fill={isActive ? C.accent : C.secondary}
                >
                  {index < s ? "◇ 已完成" : index === s ? "▷ 当前" : "· 未开始"}
                </text>
              </g>
            );
          })}

          <rect
            x="30"
            y="640"
            width="840"
            height="36"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1"
          />
          <text x="52" y="663" fontSize="12" fill={C.secondary}>
            {forgetRelink
              ? `故障注入中：successor 没有接管 z 的左子树 → ${orphanCount} 个节点失联（红虚线）`
              : trace?.caseType === "two"
                ? "双孩子删除：successor 没有左孩子，接管 z 的两棵子树是安全的"
                : "零/单孩子删除：一次 TRANSPLANT 即可，无需 successor"}
          </text>
        </svg>

        <div
          data-readout="delete-transplant"
          className="mt-3 rounded-control border border-border bg-bg px-3 py-2 text-xs leading-6 text-secondary"
        >
          节点 {totalLeft} / 9 · 重接边{" "}
          {s >= 3 && trace
            ? trace.rewired.filter(([a, b]) => a !== "ROOT" && b !== "NIL")
                .length
            : "待手术"}{" "}
          · 中序逆序{" "}
          <span
            className={
              s >= 4 && !sortedOk
                ? "font-semibold text-[var(--danger)]"
                : "font-semibold text-[var(--success)]"
            }
          >
            {s >= 4 ? (sortedOk ? "0 处" : "≥1 处") : "待校验"}
          </span>{" "}
          · 失联节点{" "}
          <span
            className={
              orphanCount > 0
                ? "font-semibold text-[var(--danger)]"
                : "font-semibold text-[var(--success)]"
            }
          >
            {orphanCount}
          </span>
          {s >= 4
            ? verifyOk
              ? " · 结论：删除合法"
              : " · 结论：删除破坏了结构"
            : ""}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-pressed={forgetRelink}
            data-fault="forget-relink"
            onClick={() => setForgetRelink((v) => !v)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              forgetRelink
                ? "border-[var(--danger)] text-[var(--danger)]"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {forgetRelink
              ? "● 故障已注入：忘记接左子树"
              : "◇ 注入故障：忘记接左子树"}
          </button>
          <p className="max-w-xl text-xs leading-5 text-secondary">
            现象：双孩子删除后 z
            的左子树整棵失联（红虚线），可达节点数对不上。原因：y.parent≠z
            的深缝合分支里，y 要先顶替 z，必须显式执行 y.left = z.left 并同步
            parent。修法： 对照 Lab 时间线第 4 步，逐条边核对两侧的指针更新。
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LAB2_LABEL_TEXT}
          caption="先预测 successor 是谁、要重接几条边，再逐步看缝合；换目标后整台手术重来。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置 BST 删除手术台实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        删除的全部复杂度藏在“边重接”里：零/单孩子一次
        TRANSPLANT，双孩子先用右子树最小值 successor
        顶替，再把它自己的右孩子移交出去。每条边都要双向同步。
      </figcaption>
    </figure>
  );
}

export function Clrs4Chapter12BstLab() {
  return (
    <div className="not-prose">
      <BstRangeValidatorLab />
      <BstDeleteTransplantLab />
    </div>
  );
}
