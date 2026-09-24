"use client";

import { useState } from "react";

export type AstKind = "Literal" | "Add";
export type AstShape = "leaf" | "pair" | "nested";
export type VisitorFault = "none" | "skip-right" | "repeat-left";
export type VisitorOperation = "evaluate" | "print";
export type VisitEvent = {
  phase: "accept" | "visit";
  id: string;
  kind: AstKind;
};
export interface AstVisitor<R> {
  events: VisitEvent[];
  visitLiteral(node: Literal): R;
  visitAdd(node: Add): R;
}
export abstract class Expr {
  constructor(public readonly id: string) {}
  abstract readonly kind: AstKind;
  abstract accept<R>(visitor: AstVisitor<R>): R;
}
export class Literal extends Expr {
  readonly kind = "Literal" as const;
  constructor(
    id: string,
    public readonly value: number,
  ) {
    super(id);
  }
  accept<R>(visitor: AstVisitor<R>): R {
    visitor.events.push({ phase: "accept", id: this.id, kind: this.kind });
    return visitor.visitLiteral(this);
  }
}
export class Add extends Expr {
  readonly kind = "Add" as const;
  constructor(
    id: string,
    public readonly left: Expr,
    public readonly right: Expr,
  ) {
    super(id);
  }
  accept<R>(visitor: AstVisitor<R>): R {
    visitor.events.push({ phase: "accept", id: this.id, kind: this.kind });
    return visitor.visitAdd(this);
  }
}
export class EvalVisitor implements AstVisitor<number> {
  events: VisitEvent[] = [];
  constructor(public readonly fault: VisitorFault = "none") {}
  visitLiteral(node: Literal): number {
    this.events.push({ phase: "visit", id: node.id, kind: node.kind });
    return node.value;
  }
  visitAdd(node: Add): number {
    this.events.push({ phase: "visit", id: node.id, kind: node.kind });
    const left = node.left.accept(this);
    if (this.fault === "repeat-left") node.left.accept(this);
    const right = this.fault === "skip-right" ? 0 : node.right.accept(this);
    return left + right;
  }
}
export class PrintVisitor implements AstVisitor<string> {
  events: VisitEvent[] = [];
  constructor(public readonly fault: VisitorFault = "none") {}
  visitLiteral(node: Literal): string {
    this.events.push({ phase: "visit", id: node.id, kind: node.kind });
    return String(node.value);
  }
  visitAdd(node: Add): string {
    this.events.push({ phase: "visit", id: node.id, kind: node.kind });
    const left = node.left.accept(this);
    if (this.fault === "repeat-left") node.left.accept(this);
    const right = this.fault === "skip-right" ? "?" : node.right.accept(this);
    return `(${left} + ${right})`;
  }
}
export function makeAst(shape: AstShape): Expr {
  const left = new Literal("n2", 2);
  if (shape === "leaf") return left;
  const right =
    shape === "pair"
      ? new Literal("n3", 3)
      : new Add("b", new Literal("n3", 3), new Literal("n4", 4));
  return new Add("a", left, right);
}
export function astNodes(root: Expr): Expr[] {
  return root instanceof Add
    ? [root, ...astNodes(root.left), ...astNodes(root.right)]
    : [root];
}
export function runVisitor(
  shape: AstShape,
  operation: VisitorOperation,
  fault: VisitorFault,
) {
  const root = makeAst(shape);
  if (operation === "evaluate") {
    const visitor = new EvalVisitor(fault);
    return { root, result: root.accept(visitor), events: visitor.events };
  }
  const visitor = new PrintVisitor(fault);
  return { root, result: root.accept(visitor), events: visitor.events };
}

export function visitorFrame(run: ReturnType<typeof runVisitor>, step: number) {
  const nodes = astNodes(run.root);
  const shown = run.events.slice(0, step);
  const current = shown.at(-1);
  const finished = step >= run.events.length;
  const counts = Object.fromEntries(
    nodes.map((node) => [
      node.id,
      shown.filter((event) => event.phase === "visit" && event.id === node.id)
        .length,
    ]),
  );
  const violations = nodes.filter((node) => counts[node.id] !== 1);
  return { nodes, shown, current, finished, counts, violations };
}

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 w-full rounded border border-border bg-elevated px-3 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
const operations: VisitorOperation[] = ["evaluate", "print"];
const kinds: AstKind[] = ["Literal", "Add"];
const operationName = { evaluate: "Eval", print: "Print" };

export function VisitorDoubleDispatchAstLab() {
  const [shape, setShape] = useState<AstShape>("nested");
  const [operation, setOperation] = useState<VisitorOperation>("evaluate");
  const [fault, setFault] = useState<VisitorFault>("none");
  const [step, setStep] = useState(2);
  const run = runVisitor(shape, operation, fault);
  const { nodes, shown, current, finished, counts, violations } = visitorFrame(
    run,
    step,
  );
  const position = (id: string): [number, number] => {
    if (shape === "leaf") return [165, 110];
    if (shape === "pair")
      return id === "a" ? [165, 45] : id === "n2" ? [80, 165] : [250, 165];
    return (
      {
        a: [150, 40],
        n2: [65, 130],
        b: [245, 130],
        n3: [195, 225],
        n4: [290, 225],
      } as Record<string, [number, number]>
    )[id];
  };
  const reset = () => {
    setShape("nested");
    setOperation("evaluate");
    setFault("none");
    setStep(2);
  };

  return (
    <section
      className="not-prose my-8 space-y-4 rounded-xl border border-border bg-elevated p-3 text-sm text-primary"
      aria-label="访问者双分派 AST 实验"
    >
      <h3 className="text-base font-semibold">同一棵树，两种独立操作</h3>
      <p className="text-secondary">
        先选输入，再单步推进。圆环数字是实际 visit
        次数；虚线边表示子节点尚未进入。初始停在根节点的 visitAdd。
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="space-y-1">
          <span>表达式树</span>
          <select
            className={control}
            value={shape}
            onChange={(event) => {
              setShape(event.target.value as AstShape);
              setStep(2);
            }}
          >
            <option value="leaf">单叶：2</option>
            <option value="pair">加法：2 + 3</option>
            <option value="nested">嵌套：2 + (3 + 4)</option>
          </select>
        </label>
        <label className="space-y-1">
          <span>访问者操作</span>
          <select
            className={control}
            value={operation}
            onChange={(event) => {
              setOperation(event.target.value as VisitorOperation);
              setStep(2);
            }}
          >
            <option value="evaluate">Eval：求值</option>
            <option value="print">Print：带括号输出</option>
          </select>
        </label>
        <label className="space-y-1">
          <span>遍历故障</span>
          <select
            className={control}
            value={fault}
            onChange={(event) => {
              setFault(event.target.value as VisitorFault);
              setStep(2);
            }}
          >
            <option value="none">正常：左右各一次</option>
            <option value="skip-right">漏处理：跳过右子树</option>
            <option value="repeat-left">重复：左子树再走一次</option>
          </select>
        </label>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <figure className="m-0 min-w-0">
          <svg
            viewBox="0 0 330 295"
            className="mx-auto block w-full max-w-[440px]"
            role="img"
            aria-label="表达式树；节点高亮表示当前事件，环旁数字表示已执行次数"
          >
            {nodes.flatMap((node) =>
              node instanceof Add
                ? [node.left, node.right].map((child) => {
                    const [x1, y1] = position(node.id);
                    const [x2, y2] = position(child.id);
                    const entered = shown.some(
                      (event) => event.id === child.id,
                    );
                    return (
                      <line
                        key={`${node.id}-${child.id}`}
                        x1={x1}
                        y1={y1 + 20}
                        x2={x2}
                        y2={y2 - 20}
                        stroke={entered ? C.accent : C.border}
                        strokeWidth={entered ? 3 : 2}
                        strokeDasharray={entered ? "none" : "5 4"}
                      />
                    );
                  })
                : [],
            )}
            {nodes.map((node) => {
              const [x, y] = position(node.id);
              const count = counts[node.id];
              const bad = count > 1 || (finished && count === 0);
              return (
                <g key={node.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r={22}
                    fill={C.bg}
                    stroke={
                      bad
                        ? C.danger
                        : current?.id === node.id
                          ? C.accent
                          : C.border
                    }
                    strokeWidth={current?.id === node.id ? 4 : 2}
                  />
                  <text
                    x={x}
                    y={y + 5}
                    textAnchor="middle"
                    fill={C.text}
                    fontSize={16}
                  >
                    {node instanceof Literal ? String(node.value) : "+"}
                  </text>
                  <text
                    x={x}
                    y={y + 41}
                    textAnchor="middle"
                    fill={C.muted}
                    fontSize={13}
                  >{`${node.id} · ${node.kind}`}</text>
                  <text
                    x={x + 27}
                    y={y - 15}
                    textAnchor="middle"
                    fill={bad ? C.danger : C.accent}
                    fontSize={14}
                  >{`×${count}`}</text>
                </g>
              );
            })}
            <text
              x={165}
              y={289}
              textAnchor="middle"
              fill={C.muted}
              fontSize={13}
            >
              {"实线：已进入 / ×0：尚未处理"}
            </text>
          </svg>
          <figcaption className="text-center text-secondary">
            树的连线是持有关系，不是访问者继承关系。
          </figcaption>
        </figure>
        <figure className="m-0 min-w-0">
          <svg
            viewBox="0 0 330 295"
            className="mx-auto block w-full max-w-[440px]"
            role="img"
            aria-label="操作乘节点类型矩阵，显示当前操作对每种类型的实际 visit 次数"
          >
            <text
              x={165}
              y={24}
              textAnchor="middle"
              fill={C.text}
              fontSize={15}
            >
              {"操作 × 节点类型"}
            </text>
            {kinds.map((kind, i) => (
              <text
                key={kind}
                x={160 + i * 100}
                y={57}
                textAnchor="middle"
                fill={C.muted}
                fontSize={14}
              >
                {kind}
              </text>
            ))}
            {operations.map((op, row) => (
              <g key={op}>
                <text
                  x={10}
                  y={100 + row * 80}
                  fill={op === operation ? C.accent : C.muted}
                  fontSize={15}
                >
                  {operationName[op]}
                </text>
                {kinds.map((kind, column) => {
                  const visits = shown.filter(
                    (event) => event.phase === "visit" && event.kind === kind,
                  ).length;
                  const active =
                    op === operation &&
                    current?.kind === kind &&
                    current.phase === "visit";
                  return (
                    <g key={kind}>
                      <rect
                        x={115 + column * 100}
                        y={70 + row * 80}
                        width={90}
                        height={62}
                        rx={6}
                        fill={C.bg}
                        stroke={active ? C.accent : C.border}
                        strokeWidth={active ? 3 : 1}
                      />
                      <text
                        x={160 + column * 100}
                        y={96 + row * 80}
                        textAnchor="middle"
                        fill={op === operation ? C.text : C.muted}
                        fontSize={14}
                      >
                        {op === operation ? `visit ×${visits}` : "未运行"}
                      </text>
                      <text
                        x={160 + column * 100}
                        y={118 + row * 80}
                        textAnchor="middle"
                        fill={C.muted}
                        fontSize={13}
                      >{`需 ${nodes.filter((node) => node.kind === kind).length} 次`}</text>
                    </g>
                  );
                })}
              </g>
            ))}
            <text
              x={165}
              y={245}
              textAnchor="middle"
              fill={C.muted}
              fontSize={13}
            >
              {"加操作：增一行；加类型：增一列"}
            </text>
            <text
              x={165}
              y={270}
              textAnchor="middle"
              fill={C.muted}
              fontSize={13}
            >
              {"未运行不等于缺少实现"}
            </text>
          </svg>
          <figcaption className="text-center text-secondary">
            矩阵只累计当前操作；切换操作会从根重新开始。
          </figcaption>
        </figure>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className={control}
          disabled={finished}
          onClick={() =>
            setStep((value) => Math.min(value + 1, run.events.length))
          }
        >
          下一事件
        </button>
        <button type="button" className={control} onClick={reset}>
          重置
        </button>
      </div>
      <div
        className="space-y-2 rounded border border-border p-3"
        aria-live="polite"
        aria-atomic="true"
      >
        <p>{`事件 ${shown.length}/${run.events.length}：${current?.id}.${current?.phase === "accept" ? "accept(visitor)" : `${operationName[operation]}.visit${current?.kind}(node)`}`}</p>
        <p>
          {finished
            ? `结果：${run.result}`
            : "结果尚未展示；单步走完后检查逐节点次数。"}
        </p>
        <p>
          {!finished
            ? "途中出现 ×0 正常，不提前判为漏处理。"
            : violations.length === 0
              ? "不变量通过：每个节点恰好 visit 一次。"
              : `不变量失败：${violations.map((node) => `${node.id}×${counts[node.id]}`).join("、")}。结果相同也可能多走了一次。`}
        </p>
      </div>
      <ol
        className="grid max-h-48 list-inside list-decimal gap-1 overflow-y-auto rounded border border-border p-3 font-mono text-xs"
        aria-label="实际 accept 和 visit 调用轨迹"
      >
        {shown.map((event, index) => (
          <li
            key={index}
            className={
              index === shown.length - 1 ? "text-accent" : "text-secondary"
            }
          >{`${event.id} → ${event.phase === "accept" ? `${event.kind}.accept` : `${operationName[operation]}.visit${event.kind}`}`}</li>
        ))}
      </ol>
      <p className="text-secondary">
        这里由 visitAdd 负责递归，accept
        只回调。无自动播放或位移动画；重置恢复嵌套树、Eval、无故障及第二个事件。
      </p>
    </section>
  );
}
