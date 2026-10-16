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

/** 绘制坐标统一出口：finite 守卫 + 9 位定点，数学结果本身不取整。 */
function fx(n: number): number {
  return Number.isFinite(n) ? Number(n.toFixed(9)) : 0;
}

/* ---------- 6 城道路图 + Hamilton 回路证书验证的共享 oracle ---------- */

/** 顶点数固定为 6，布局、证书、检查全部确定性，无随机/时间函数。 */
const N = 6;

/** 无向边集（规范序 "u-v"，u<v）。六边形环 + 一条弦 3-5。 */
const EDGES = new Set(["0-1", "1-2", "2-3", "3-4", "4-5", "0-5", "3-5"]);

/** 画在图上的边（含弦）。 */
const DRAW_EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [3, 5],
];

function edgeKey(u: number, v: number): string {
  return u < v ? `${u}-${v}` : `${v}-${u}`;
}

/** 图布局：6 个顶点均匀分布在圆上（中心 (250,200)，半径 105）。 */
const GC = { x: 250, y: 200, r: 105 } as const;

const VPOS: ReadonlyArray<readonly [number, number]> = Array.from(
  { length: N },
  (_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return [GC.x + GC.r * Math.cos(a), GC.y + GC.r * Math.sin(a)] as const;
  },
);

type CertKind = "valid" | "invalid";

type Cert = {
  readonly id: CertKind;
  readonly label: string;
  readonly order: readonly number[];
  readonly note: string;
};

/** 两张声称的证书：A 是真回路；B 每个顶点恰好一次、但闭合边 4-0 不存在。 */
const CERTS: readonly Cert[] = [
  {
    id: "valid",
    label: "证书 A · 0-1-2-3-4-5",
    order: [0, 1, 2, 3, 4, 5],
    note: "六条边全在图上：应当被接受",
  },
  {
    id: "invalid",
    label: "证书 B · 0-1-2-3-5-4",
    order: [0, 1, 2, 3, 5, 4],
    note: "只坏在闭合边 4-0：其余检查全过",
  },
];

const CERT_DEFAULT: CertKind = "valid";

/** 检查①：长度与唯一性。 */
function checkUnique(order: readonly number[]): boolean {
  return order.length === N && new Set(order).size === N;
}

/** 逐段存在性：segOk[i] 表示 order[i] → order[(i+1)%N] 是否为图中的边。 */
function segResults(order: readonly number[]): boolean[] {
  return order.map((u, i) => EDGES.has(edgeKey(u, order[(i + 1) % N])));
}

const SEARCH_PERMUTATIONS = 720; // 6! = 720
const VERIFY_STEPS = 6;

const NP_STEPS: readonly TeachingStep[] = [
  {
    label: "certificate",
    caption: "声称的证书登场：一张顶点序列，声称它是一条回路",
  },
  {
    label: "checks",
    caption: "验证器三项检查：唯一性、相邻边逐段、闭合边",
  },
  {
    label: "verdict",
    caption: "判定读数：接受/拒绝，对照盲目搜索与验证的代价",
  },
  {
    label: "reduction",
    caption: "归约方向：从已知难的 A 到目标 B，难度沿箭头传染",
  },
];

const NP_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  NP_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type CheckStatus = "pass" | "fail" | "skip";

const CHECK_TITLES = [
  "检查① 每个顶点恰好出现一次",
  "检查② 相邻顶点之间都有路",
  "检查③ 末位能回到起点",
] as const;

export function Clrs4Chapter34NpCompletenessLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [certId, setCertId] = useState<CertKind>(CERT_DEFAULT);
  const [faultSkipClosing, setFaultSkipClosing] = useState(false);
  const [faultReverseArrow, setFaultReverseArrow] = useState(false);

  const timeline = useTeachingTimeline({
    steps: NP_STEPS,
    build: (tl) => {
      NP_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          index === 0
            ? { opacity: [1, 1], duration: T * 0.55, ease: "out(3)" }
            : { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const cert = CERTS.find((c) => c.id === certId) ?? CERTS[0];
  const order = cert.order;
  const uniqueOk = checkUnique(order);
  const segOk = segResults(order);

  // 检查③在故障注入时被整项跳过——这正是"验证器不健全"的事故。
  const check3Status: CheckStatus = faultSkipClosing
    ? "skip"
    : segOk[N - 1]
      ? "pass"
      : "fail";
  const checkStatuses: readonly CheckStatus[] = [
    uniqueOk ? "pass" : "fail",
    segOk.slice(0, N - 1).every(Boolean) ? "pass" : "fail",
    check3Status,
  ];

  // 判定：前两项必须过，第三项在跳过故障下视为"默认通过"。
  const accepted =
    checkStatuses[0] === "pass" &&
    checkStatuses[1] === "pass" &&
    (faultSkipClosing || segOk[N - 1]);
  // 错误放行：真实闭合边不存在，却因跳过检查而被接受。
  const wrongAccept = accepted && !segOk[N - 1];
  const rejectReason = !uniqueOk
    ? "顶点重复或缺漏"
    : !segOk.slice(0, N - 1).every(Boolean)
      ? "某段相邻顶点之间没有路"
      : "闭合边 4-0 不在图上";

  function applyCert(id: CertKind) {
    setCertId(id);
    timeline.seek(0);
  }

  function reset() {
    setCertId(CERT_DEFAULT);
    setFaultSkipClosing(false);
    setFaultReverseArrow(false);
    timeline.seek(0);
  }

  const currentStep =
    timeline.currentStep >= NP_STEPS.length
      ? NP_STEPS.length - 1
      : timeline.currentStep;

  const searchBarW = 250;
  const verifyBarW = fx((VERIFY_STEPS / SEARCH_PERMUTATIONS) * searchBarW * 8);
  const verdictText = wrongAccept
    ? "错误放行：漏查闭合边后，非法证书 B 被接受。"
    : accepted
      ? "接受：证书中的每个顶点唯一，且每段边（包括闭合边）都存在。"
      : `拒绝：${rejectReason}。`;

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="np-certificate-verifier-audit-reduction-direction"
      data-readout="np-verifier-oracle"
      data-status={
        wrongAccept ? "wrongly-accepted" : accepted ? "accepted" : "rejected"
      }
      data-certificate={cert.label}
      data-checks={checkStatuses.join(",")}
      data-closing-edge={segOk[N - 1] ? "present" : "missing"}
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 34 · NP-Completeness
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              验证器审计台：证书怎么被逐项核验，归约箭头该指向哪边
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              猜一猜：换成证书 B（0-1-2-3-5-4），验证器会接受还是拒绝？
              如果注入“漏查闭合边”故障，判定又会变成什么？先预测，再推进时间线核对每一步检查与最终读数。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <fieldset className="mb-4 flex flex-wrap items-center gap-2">
          <legend className="text-xs font-semibold text-primary">
            声称的证书
          </legend>
          <div
            role="radiogroup"
            aria-label="选择声称的 Hamilton 回路证书"
            className="flex flex-wrap gap-2"
          >
            {CERTS.map((c) => (
              <label
                key={c.id}
                className={`flex min-h-11 cursor-pointer items-center rounded-control border px-3 text-sm transition-colors duration-(--duration-hover) ease-standard ${
                  certId === c.id
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                } focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent`}
              >
                <input
                  type="radio"
                  name="np-certificate"
                  value={c.id}
                  checked={certId === c.id}
                  onChange={() => applyCert(c.id)}
                  className="sr-only"
                />
                {c.label}
              </label>
            ))}
          </div>
          <span className="text-xs leading-5 text-secondary">{cert.note}</span>
        </fieldset>

        <section
          className="mb-4 rounded-card border border-border p-3 sm:hidden"
          aria-label="移动版证书与边检查"
        >
          <h4 className="text-sm font-semibold text-primary">
            本次证书逐段核对
          </h4>
          <p className="mt-1 text-xs leading-5 text-secondary">
            道路边：0–1、1–2、2–3、3–4、4–5、5–0、3–5。下表按证书顺序检查，最后一行是回到起点的闭合边。
          </p>
          <ol className="mt-3 grid gap-2">
            {order.map((u, i) => {
              const v = order[(i + 1) % N];
              const exists = segOk[i];
              const skipped = i === N - 1 && faultSkipClosing;
              return (
                <li
                  key={`mobile-edge-${i}`}
                  className="flex min-h-11 items-center justify-between gap-3 rounded-control border border-border px-3 py-2 text-sm"
                >
                  <span className="font-mono text-primary">
                    {u} → {v}
                    {i === N - 1 ? "（闭合）" : ""}
                  </span>
                  <span
                    className={
                      skipped
                        ? "text-warning"
                        : exists
                          ? "text-success"
                          : "text-danger"
                    }
                  >
                    {skipped ? "未检查" : exists ? "边存在" : "边不存在"}
                  </span>
                </li>
              );
            })}
          </ol>
          <p
            className="mt-3 text-sm font-semibold text-primary"
            aria-live="polite"
          >
            {verdictText}
          </p>
        </section>

        <div
          className="hidden overflow-x-auto rounded-card border border-border sm:block"
          role="region"
          aria-label="可横向浏览的验证器与归约方向图"
          tabIndex={0}
        >
          <svg
            viewBox="0 0 800 560"
            role="img"
            aria-label="CLRS 4e 第 34 章 NP 完全性专属实验。左侧是一张 6 顶点道路图（六边形加一条 3-5 弦），下方是声称的顶点序列证书；右侧验证器逐项执行三项检查（顶点唯一、相邻边存在、闭合边存在），随后给出接受或拒绝判定并对比盲目搜索 720 种排列与固定 6 步验证的代价；最后展示多项式归约方向图，从已知难问题 A 经多项式映射 f 指向目标问题 B，注入故障时箭头被画反并标注错误。支持播放、暂停、单步、拖进度、证书切换、两项故障注入和重置。"
            className="h-auto min-w-[760px] w-full"
          >
            {/* 底图：标题与图例 */}
            <text x={60} y={36} fontSize="13" fill={C.primary} fontWeight="600">
              6 城道路图：顶点 0–5，环边 + 弦 3-5
            </text>
            <text
              x={500}
              y={36}
              fontSize="13"
              fill={C.primary}
              fontWeight="600"
            >
              验证器审计面板
            </text>

            {/* Stage 0：图 + 证书序列 */}
            <g
              ref={(el) => {
                stageRefs.current[0] = el;
              }}
              opacity={1}
            >
              {DRAW_EDGES.map(([u, v]) => (
                <line
                  key={`e-${u}-${v}`}
                  x1={fx(VPOS[u][0])}
                  y1={fx(VPOS[u][1])}
                  x2={fx(VPOS[v][0])}
                  y2={fx(VPOS[v][1])}
                  stroke={C.border}
                  strokeWidth="2"
                />
              ))}
              {VPOS.map(([x, y], i) => {
                const dx = x - GC.x;
                const dy = y - GC.y;
                const len = Math.hypot(dx, dy) || 1;
                const lx = fx(x + (dx / len) * 20);
                const ly = fx(y + (dy / len) * 20 + 4);
                return (
                  <g key={`v-${i}`}>
                    <circle
                      cx={fx(x)}
                      cy={fx(y)}
                      r="11"
                      fill={C.elevated}
                      stroke={C.primary}
                      strokeWidth="2"
                    />
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                      fontWeight="600"
                    >
                      {i}
                    </text>
                  </g>
                );
              })}
              <text
                x={fx((VPOS[3][0] + VPOS[5][0]) / 2 - 14)}
                y={fx((VPOS[3][1] + VPOS[5][1]) / 2)}
                fontSize="11"
                fill={C.secondary}
              >
                弦
              </text>

              {/* 证书序列 chips */}
              <text x={60} y={356} fontSize="12" fill={C.secondary}>
                {`声称的证书（${cert.label}）：`}
              </text>
              {order.map((v, i) => (
                <g key={`chip-${i}`}>
                  <rect
                    x={60 + i * 62}
                    y={370}
                    width="40"
                    height="34"
                    rx="8"
                    fill={C.elevated}
                    stroke={C.accent}
                    strokeWidth="1.5"
                  />
                  <text
                    x={80 + i * 62}
                    y={392}
                    textAnchor="middle"
                    fontSize="13"
                    fill={C.accent}
                    fontWeight="600"
                  >
                    {v}
                  </text>
                  {i < N - 1 && (
                    <text
                      x={108 + i * 62}
                      y={392}
                      fontSize="12"
                      fill={C.secondary}
                    >
                      →
                    </text>
                  )}
                </g>
              ))}
              <text
                x={60 + N * 62 - 8}
                y={392}
                fontSize="12"
                fill={C.secondary}
              >
                ↺ 回到 0
              </text>
            </g>

            {/* Stage 1：逐项检查（路径段着色 + 检查清单） */}
            <g
              ref={(el) => {
                stageRefs.current[1] = el;
              }}
              opacity={0}
            >
              {order.map((u, i) => {
                const v = order[(i + 1) % N];
                const [x1, y1] = VPOS[u];
                const [x2, y2] = VPOS[v];
                const isClosing = i === N - 1;
                const skipped = isClosing && faultSkipClosing;
                const ok = segOk[i];
                const color = skipped ? C.secondary : ok ? C.accent : C.danger;
                return (
                  <g key={`seg-${i}`}>
                    <line
                      x1={fx(x1)}
                      y1={fx(y1)}
                      x2={fx(x2)}
                      y2={fx(y2)}
                      stroke={color}
                      strokeWidth="3.5"
                      strokeDasharray={skipped ? "5 5" : undefined}
                      opacity={skipped ? 0.7 : 1}
                    />
                    {!ok && (
                      <g>
                        <circle
                          cx={fx((x1 + x2) / 2)}
                          cy={fx((y1 + y2) / 2)}
                          r="9"
                          fill={C.danger}
                        />
                        <text
                          x={fx((x1 + x2) / 2)}
                          y={fx((y1 + y2) / 2 + 4)}
                          textAnchor="middle"
                          fontSize="12"
                          fill={C.bg}
                          fontWeight="700"
                        >
                          ✕
                        </text>
                      </g>
                    )}
                    {skipped && (
                      <text
                        x={fx((x1 + x2) / 2)}
                        y={fx((y1 + y2) / 2 - 12)}
                        textAnchor="middle"
                        fontSize="11"
                        fill={C.warning}
                      >
                        已跳过
                      </text>
                    )}
                  </g>
                );
              })}

              {/* 检查清单 */}
              {CHECK_TITLES.map((title, i) => {
                const status = checkStatuses[i];
                const mark =
                  status === "pass" ? "✓" : status === "fail" ? "✕" : "⊘";
                const color =
                  status === "pass"
                    ? C.success
                    : status === "fail"
                      ? C.danger
                      : C.warning;
                return (
                  <g key={`check-${i}`}>
                    <rect
                      x={500}
                      y={64 + i * 52}
                      width="285"
                      height="44"
                      rx="8"
                      fill={C.elevated}
                      stroke={color}
                      strokeWidth="1.5"
                    />
                    <text
                      x={516}
                      y={fx(64 + i * 52 + 27)}
                      fontSize="12"
                      fill={color}
                      fontWeight="600"
                    >
                      {mark}
                    </text>
                    <text
                      x={538}
                      y={fx(64 + i * 52 + 27)}
                      fontSize="12"
                      fill={C.primary}
                    >
                      {title}
                      {status === "skip" ? "（故障：跳过）" : ""}
                    </text>
                  </g>
                );
              })}
              <text
                x={500}
                y={64 + 3 * 52 + 16}
                fontSize="11"
                fill={C.secondary}
              >
                每项检查只花固定几次查表；证书长度 = 顶点数，是输入的一部分。
              </text>
            </g>

            {/* Stage 2：判定 + 代价对照 */}
            <g
              ref={(el) => {
                stageRefs.current[2] = el;
              }}
              opacity={0}
            >
              <rect
                x={500}
                y={236}
                width="285"
                height="86"
                rx="10"
                fill={C.elevated}
                stroke={
                  wrongAccept ? C.danger : accepted ? C.success : C.danger
                }
                strokeWidth="2"
              />
              <text
                x={516}
                y={264}
                fontSize="14"
                fill={wrongAccept ? C.danger : accepted ? C.success : C.danger}
                fontWeight="700"
              >
                {wrongAccept
                  ? "判定：接受 —— 但这是错的！"
                  : accepted
                    ? "判定：接受（证书有效）"
                    : `判定：拒绝 —— ${rejectReason}`}
              </text>
              <text x={516} y={288} fontSize="12" fill={C.primary}>
                {wrongAccept
                  ? "验证器不健全：假证书被放行，no 被误判成 yes"
                  : accepted
                    ? "存在性证据成立：该实例是 yes-instance"
                    : "证书不能证明任何事：换一个证书，或实例本是 no"}
              </text>
              <text x={516} y={308} fontSize="11" fill={C.secondary}>
                {wrongAccept
                  ? "修法：三项检查缺一不可，跳过任何一项都要写进审计记录"
                  : "验证只负责核验证据，不负责替你找到证据"}
              </text>

              {/* 盲目搜索 vs 验证 */}
              <text
                x={500}
                y={356}
                fontSize="12"
                fill={C.primary}
                fontWeight="600"
              >
                代价对照（n = 6）
              </text>
              <text x={500} y={380} fontSize="11" fill={C.secondary}>
                盲目搜索全部排列
              </text>
              <rect
                x={500}
                y={388}
                width={searchBarW}
                height="16"
                rx="4"
                fill={C.danger}
                opacity="0.55"
              />
              <text
                x={fx(500 + searchBarW + 8)}
                y={401}
                fontSize="11"
                fill={C.secondary}
              >
                6! = 720 条，逐条试
              </text>
              <text x={500} y={428} fontSize="11" fill={C.secondary}>
                验证一张证书
              </text>
              <rect
                x={500}
                y={436}
                width={Math.max(verifyBarW, 24)}
                height="16"
                rx="4"
                fill={C.success}
                opacity="0.7"
              />
              <text
                x={fx(500 + Math.max(verifyBarW, 24) + 8)}
                y={449}
                fontSize="11"
                fill={C.secondary}
              >
                固定 6 步查表
              </text>
            </g>

            {/* Stage 3：归约方向图 */}
            <g
              ref={(el) => {
                stageRefs.current[3] = el;
              }}
              opacity={0}
            >
              <text
                x={60}
                y={452}
                fontSize="13"
                fill={C.primary}
                fontWeight="600"
              >
                想证明 B 很难？从已知难的 A 归约到 B
              </text>

              {/* A 盒 */}
              <rect
                x={60}
                y={472}
                width="190"
                height="62"
                rx="10"
                fill={C.elevated}
                stroke={C.primary}
                strokeWidth="1.5"
              />
              <text
                x={155}
                y={498}
                textAnchor="middle"
                fontSize="12"
                fill={C.primary}
                fontWeight="600"
              >
                A：已知难的问题
              </text>
              <text
                x={155}
                y={518}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                （例如 SAT，已是 NP-complete）
              </text>

              {/* B 盒 */}
              <rect
                x={610}
                y={472}
                width="175"
                height="62"
                rx="10"
                fill={C.elevated}
                stroke={C.accent}
                strokeWidth="1.5"
              />
              <text
                x={fx(610 + 87.5)}
                y={498}
                textAnchor="middle"
                fontSize="12"
                fill={C.accent}
                fontWeight="600"
              >
                B：要证难的目标
              </text>
              <text
                x={fx(610 + 87.5)}
                y={518}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                （你的新问题）
              </text>

              {/* 箭头：正常 A→B；故障时画反并标错 */}
              {!faultReverseArrow ? (
                <g>
                  <line
                    x1={262}
                    y1={503}
                    x2={596}
                    y2={503}
                    stroke={C.accent}
                    strokeWidth="2.5"
                    markerEnd="url(#np-arrow)"
                  />
                  <text
                    x={429}
                    y={490}
                    textAnchor="middle"
                    fontSize="12"
                    fill={C.accent}
                    fontWeight="600"
                  >
                    f：多项式时间映射
                  </text>
                  <text
                    x={429}
                    y={542}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    x∈A ⇔ f(x)∈B：B 至少和 A 一样难
                  </text>
                </g>
              ) : (
                <g data-fault="reversed-reduction">
                  <line
                    x1={596}
                    y1={503}
                    x2={262}
                    y2={503}
                    stroke={C.danger}
                    strokeWidth="2.5"
                    strokeDasharray="7 5"
                    markerEnd="url(#np-arrow-danger)"
                  />
                  <text
                    x={429}
                    y={490}
                    textAnchor="middle"
                    fontSize="12"
                    fill={C.danger}
                    fontWeight="600"
                  >
                    ✕ 方向画反了！
                  </text>
                  <text
                    x={429}
                    y={542}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    B≤ₚA 只说明“B 不比 A 难”，证明不了 B 难
                  </text>
                </g>
              )}
            </g>

            <defs>
              <marker
                id="np-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
              </marker>
              <marker
                id="np-arrow-danger"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
              </marker>
            </defs>

            <text
              x={785}
              y={36}
              textAnchor="end"
              fontSize="11"
              fill={C.secondary}
            >
              {`步骤：${NP_STEPS[currentStep]?.label ?? "certificate"}`}
            </text>
          </svg>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">验证器判定</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                wrongAccept
                  ? "text-danger"
                  : accepted
                    ? "text-success"
                    : "text-primary"
              }`}
              data-status-chip
              aria-live="polite"
            >
              {wrongAccept
                ? "WRONGLY ACCEPTED（错误放行）"
                : accepted
                  ? "ACCEPT（接受证书）"
                  : "REJECT（拒绝证书）"}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">
              闭合边 {order[N - 1]}-{order[0]} 检查
            </p>
            <p
              className={`mt-1 text-sm font-semibold ${
                faultSkipClosing
                  ? "text-warning"
                  : segOk[N - 1]
                    ? "text-success"
                    : "text-danger"
              }`}
            >
              {faultSkipClosing
                ? "已跳过（故障注入）"
                : segOk[N - 1]
                  ? "通过（边存在）"
                  : `失败（边 ${order[N - 1]}-${order[0]} 不存在）`}
            </p>
          </div>
          <div className="rounded-card border border-border p-3">
            <p className="text-xs text-secondary">归约方向</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                faultReverseArrow ? "text-danger" : "text-primary"
              }`}
            >
              {faultReverseArrow
                ? "B ≤ₚ A（反了，证明无效）"
                : "A ≤ₚ B（难度沿箭头传染）"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label
            className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-control border px-3 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              faultSkipClosing
                ? "border-warning text-warning"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            <input
              type="checkbox"
              checked={faultSkipClosing}
              onChange={(e) => {
                setFaultSkipClosing(e.target.checked);
                timeline.seek(0);
              }}
              data-fault="skip-closing-edge-check"
              className="h-4 w-4 accent-[var(--warning)]"
            />
            注入故障：漏查闭合边
          </label>
          <label
            className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-control border px-3 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              faultReverseArrow
                ? "border-danger text-danger"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            <input
              type="checkbox"
              checked={faultReverseArrow}
              onChange={(e) => {
                setFaultReverseArrow(e.target.checked);
                timeline.seek(0);
              }}
              data-fault="reverse-reduction-direction"
              className="h-4 w-4 accent-[var(--danger)]"
            />
            注入故障：归约方向画反
          </label>
          <span className="max-w-xl text-xs leading-5 text-secondary">
            漏查闭合边 → 现象：假证书 B 被错误放行 →
            原因：验证器跳过一项检查就不再健全 →
            修法：三项检查缺一不可；方向画反 → 现象：拿出了 B≤ₚA 却声称证明 B 难
            → 原因：难度只沿箭头方向传染 → 修法：从已知 NP-complete 的 A
            归约到目标 B。
          </span>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={NP_LABEL_TEXT}
          caption="先预测证书 B 的判定结果，再推进时间线；第四步看归约箭头为什么必须从左（已知难）指向右（目标）。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置 NP 完全性验证器审计实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        验证不等于求解：找到证书可能要枚举 720 条排列，核验一张证书只需固定 6
        步；而证明“新问题很难”的唯一合法姿势，是让难度沿归约箭头从已知难题流进新问题。
      </figcaption>
    </figure>
  );
}
