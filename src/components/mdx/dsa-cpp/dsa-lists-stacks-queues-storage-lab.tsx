"use client";

import { useState } from "react";

type Item = { id: number; value: number };
type Mode = "storage" | "ends";
type Operation =
  | "append"
  | "erase"
  | "capture"
  | "read"
  | "push"
  | "pop"
  | "peek";
type State = {
  mode: Mode;
  operation: Operation;
  fault: boolean;
  items: Item[];
  capacity: number;
  generation: number;
  retired: { generation: number; items: Item[] } | null;
  handle: { generation: number; id: number; valid: boolean } | null;
  stack: Item[];
  ring: (Item | null)[];
  head: number;
  count: number;
  nextId: number;
  status: string;
};
type Event =
  | { type: "reset" }
  | { type: "mode"; mode: Mode }
  | { type: "operation"; operation: Operation }
  | { type: "fault" }
  | { type: "execute" };

export function initialListsLab(): State {
  return {
    mode: "storage",
    operation: "append",
    fault: false,
    items: [
      { id: 1, value: 7 },
      { id: 2, value: 7 },
    ],
    capacity: 2,
    generation: 1,
    retired: null,
    handle: { generation: 1, id: 1, valid: true },
    stack: [],
    ring: [null, null, null],
    head: 0,
    count: 0,
    nextId: 3,
    status: "已保存首元素：vector 第1代 / list 节点#1。两个7是不同元素。",
  };
}

// Models only append/erase-first, not the complete std::vector invalidation rules.
// Node IDs denote identity, never addresses. No stale pointer is dereferenced.
export function stepListsLab(s: State, event: Event): State {
  if (event.type === "reset") return initialListsLab();
  if (event.type === "mode") {
    return {
      ...initialListsLab(),
      mode: event.mode,
      operation: event.mode === "storage" ? "append" : "push",
      status:
        event.mode === "storage"
          ? initialListsLab().status
          : "容量3；栈与队列均空。每次入列使用相同的元素。",
    };
  }
  if (event.type === "operation") return { ...s, operation: event.operation };
  if (event.type === "fault")
    return {
      ...s,
      fault: !s.fault,
      status: !s.fault
        ? "错误模式：存储读取跳过重新获取句柄；队列弹出误选尾部。执行相应操作后由守卫核验。"
        : "已关闭错误模式；数据未改变。",
    };
  const result = (status: string): State => ({ ...s, status });
  if (s.mode === "storage") {
    if (s.operation === "capture") {
      if (!s.items.length)
        return result("空表：没有可保存的元素；原句柄不变。");
      return {
        ...s,
        handle: { generation: s.generation, id: s.items[0].id, valid: true },
        status: `重新保存首元素#${s.items[0].id}；这不是让旧句柄复活。`,
      };
    }
    if (s.operation === "read") {
      // The normal caller reacquires the current first element. The faulty caller
      // skips that step; both paths still pass through the same safe validator.
      const handle = s.fault
        ? s.handle
        : s.items.length
          ? { generation: s.generation, id: s.items[0].id, valid: true }
          : null;
      if (!handle) return result("空表或没有句柄：拒绝读取，存储不变。");
      const vectorOK = handle.valid && handle.generation === s.generation;
      const node = s.items.find((item) => item.id === handle.id);
      return {
        ...s,
        handle,
        status: `${s.fault ? "错误调用方跳过重新获取；沿用旧句柄。" : "正常调用方先重新获取当前首元素，再校验。"}vector：${vectorOK ? `读取${s.items[0].value}` : "拒绝失效句柄"}；list：${node ? `节点#${node.id}读取${node.value}` : "拒绝已删除节点"}。`,
      };
    }
    if (s.operation === "erase") {
      if (!s.items.length) return result("空表拒绝删除，存储不变。");
      return {
        ...s,
        items: s.items.slice(1),
        handle: s.handle ? { ...s.handle, valid: false } : null,
        status: `删除#${s.items[0].id}；vector 首位及其后句柄失效；list 只删除该节点。capacity 不减。`,
      };
    }
    if (s.operation !== "append") return result("此操作不属于存储模式。");
    if (s.items.length === 4)
      return result("展示上限4：拒绝追加；这不是标准容器的固定容量。");
    if (s.nextId > 99) return result("教学编号到99，请重置后继续。");
    const grow = s.items.length === s.capacity;
    const item = { id: s.nextId, value: s.nextId % 3 === 0 ? 9 : 7 };
    return {
      ...s,
      items: [...s.items, item],
      nextId: s.nextId + 1,
      capacity: grow ? s.capacity * 2 : s.capacity,
      generation: s.generation + Number(grow),
      retired: grow
        ? { generation: s.generation, items: [...s.items] }
        : s.retired,
      status: grow
        ? `搬移${s.items.length}个值，新块第${s.generation + 1}代；vector 旧句柄全失效，list 原节点保留。`
        : "无需扩容；vector 已有元素句柄与 list 原节点均保留（旧 end 除外）。",
    };
  }
  if (s.operation === "push") {
    if (s.count === 3) return result("满容量3：两个结构都拒绝写入，状态不变。");
    if (s.nextId > 99) return result("教学编号到99，请重置后继续。");
    const item = { id: s.nextId, value: s.nextId % 3 === 0 ? 9 : 7 };
    const slot = (s.head + s.count) % 3;
    return {
      ...s,
      stack: [...s.stack, item],
      ring: s.ring.map((x, i) => (i === slot ? item : x)),
      count: s.count + 1,
      nextId: s.nextId + 1,
      status: `压栈#${item.id}；队列写入物理槽${slot}。相同值也保留独立身份。`,
    };
  }
  if (s.operation !== "pop" && s.operation !== "peek")
    return result("此操作不属于栈/队列模式。");
  if (!s.count) return result("空结构：拒绝读取或弹出，head 与 count 不变。");
  const top = s.stack[s.stack.length - 1];
  const front = s.ring[s.head]!;
  if (s.operation === "peek")
    return result(
      `栈顶#${top.id}=${top.value}；队首#${front.id}=${front.value}；读取不删除。`,
    );
  const wrong = s.ring[(s.head + s.count - 1) % 3]!;
  if (s.fault && wrong.id !== front.id)
    return result(
      `守卫拒绝队尾#${wrong.id}冒充队首#${front.id}；即使值相同也不是同一元素。两个结构均未弹出。`,
    );
  return {
    ...s,
    stack: s.stack.slice(0, -1),
    ring: s.ring.map((x, i) => (i === s.head ? null : x)),
    head: (s.head + 1) % 3,
    count: s.count - 1,
    status: `栈弹出#${top.id}=${top.value}；队列弹出#${front.id}=${front.value}；head 向前循环一步。${s.fault ? "仅一个元素，错误算法恰巧未显现差异。" : ""}`,
  };
}

const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const surface = "var(--bg-elevated)";
const control =
  "min-h-11 rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function DsaListsStacksQueuesStorageLab() {
  const [state, setState] = useState(initialListsLab);
  const dispatch = (event: Event) => setState((s) => stepListsLab(s, event));
  const storage = state.mode === "storage";
  const options: [Operation, string][] = storage
    ? [
        ["append", "追加一个元素"],
        ["erase", "删除首元素"],
        ["capture", "保存首元素句柄"],
        ["read", "读取（正常先刷新句柄）"],
      ]
    : [
        ["push", "共同入列 / 压栈"],
        ["pop", "共同出列 / 弹栈"],
        ["peek", "读取队首 / 栈顶"],
      ];
  const vectorOK =
    state.handle?.valid && state.handle.generation === state.generation;
  const listOK = state.items.some((item) => item.id === state.handle?.id);
  const nodes = [
    { id: 0, value: "head" },
    ...state.items,
    { id: -1, value: "tail" },
  ];
  return (
    <section
      aria-label="线性存储与两端契约实验"
      className="my-6 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-5"
    >
      <h3 className="text-lg font-semibold text-primary">
        同一序列，不同身份与出口
      </h3>
      <div className="my-3 grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-secondary">
          结构视图
          <select
            className={control}
            value={state.mode}
            onChange={(e) =>
              dispatch({ type: "mode", mode: e.target.value as Mode })
            }
          >
            <option value="storage">连续块 / 双向链表</option>
            <option value="ends">栈 / 环形队列</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm text-secondary">
          下一操作
          <select
            className={control}
            value={state.operation}
            onChange={(e) =>
              dispatch({
                type: "operation",
                operation: e.target.value as Operation,
              })
            }
          >
            {options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={control}
          onClick={() => dispatch({ type: "execute" })}
        >
          执行一次
        </button>
        <button
          type="button"
          className={control}
          aria-pressed={state.fault}
          onClick={() => dispatch({ type: "fault" })}
        >
          错误模式：{state.fault ? "开" : "关"}
        </button>
        <button
          type="button"
          className={control}
          onClick={() => dispatch({ type: "reset" })}
        >
          完整重置
        </button>
      </div>
      {storage ? (
        <div className="grid min-w-0 gap-4 lg:grid-cols-2">
          <svg
            role="img"
            aria-label="vector 连续容量和已保存句柄"
            viewBox="0 0 300 290"
            className="w-full"
            style={{ fontSize: 16 }}
          >
            <title>vector：连续槽、存储代号与失效句柄</title>
            <text x="8" y="24" fill={ink}>
              vector：size {state.items.length} / cap {state.capacity}
            </text>
            <text x="8" y="52" fill={muted}>
              当前块 · 第{state.generation}代
            </text>
            {Array.from({ length: state.capacity }, (_, i) => (
              <g key={i}>
                <rect
                  x={10 + i * 70}
                  y="70"
                  width="70"
                  height="54"
                  fill={surface}
                  stroke={accent}
                  strokeWidth="2"
                  strokeDasharray={i >= state.items.length ? "5 3" : undefined}
                />
                <text x={45 + i * 70} y="103" textAnchor="middle" fill={ink}>
                  {state.items[i]?.value ?? "空余"}
                </text>
                <text x={45 + i * 70} y="146" textAnchor="middle" fill={muted}>
                  [{i}]
                </text>
              </g>
            ))}
            <text x="8" y="178" fill={ink}>
              保存：第{state.handle?.generation ?? "—"}代 [0]
            </text>
            <text x="8" y="204" fill={vectorOK ? ink : "var(--danger)"}>
              {vectorOK ? "句柄有效" : "句柄失效：禁止读取"}
            </text>
            {state.retired ? (
              <g>
                <text x="8" y="233" fill={muted}>
                  已释放的旧块（仅历史示意）
                </text>
                {state.retired.items.map((item, i) => (
                  <g key={item.id}>
                    <rect
                      x={10 + i * 70}
                      y="243"
                      width="70"
                      height="32"
                      fill="none"
                      stroke={muted}
                      strokeDasharray="4 3"
                    />
                    <path d={`M${12 + i * 70} 273 l66 -28`} stroke={muted} />
                  </g>
                ))}
              </g>
            ) : (
              <text x="8" y="246" fill={muted}>
                追加第3个元素将更换存储块
              </text>
            )}
          </svg>
          <svg
            role="img"
            aria-label="list 独立节点和双向链接"
            viewBox={`0 0 300 ${104 + nodes.length * 66}`}
            className="w-full"
            style={{ fontSize: 16 }}
          >
            <title>list：带头尾哨兵的独立节点与双向链接</title>
            <text x="8" y="24" fill={ink}>
              list：节点编号不是内存地址
            </text>
            <text x="8" y="49" fill={listOK ? ink : "var(--danger)"}>
              保存#{state.handle?.id ?? "—"}：
              {listOK ? "节点仍存活" : "节点已删除"}
            </text>
            {nodes.map((node, i) => {
              const y = 76 + i * 66;
              return (
                <g key={node.id}>
                  <rect
                    x="76"
                    y={y}
                    width="148"
                    height="38"
                    rx="8"
                    fill={surface}
                    stroke={node.id === state.handle?.id ? accent : muted}
                    strokeWidth="2"
                  />
                  <text x="150" y={y + 25} textAnchor="middle" fill={ink}>
                    {node.id > 0 ? `#${node.id} · 值${node.value}` : node.value}
                  </text>
                  {i < nodes.length - 1 && (
                    <g fill="none" stroke={muted} strokeWidth="2">
                      <path
                        d={`M224 ${y + 19} H246 V${y + 85} H224 m7 -5 l-7 5 7 5`}
                      />
                      <path
                        d={`M76 ${y + 85} H54 V${y + 19} H76 m-7 -5 l7 5 -7 5`}
                      />
                    </g>
                  )}
                </g>
              );
            })}
            <text x="8" y={94 + nodes.length * 66} fill={muted}>
              左边 prev ↑　右边 next ↓
            </text>
          </svg>
        </div>
      ) : (
        <svg
          role="img"
          aria-label="栈顶与环形队列物理槽"
          viewBox="0 0 300 470"
          className="mx-auto w-full max-w-md"
          style={{ fontSize: 16 }}
        >
          <title>同样的进入顺序：栈从顶部取，队列从 head 取</title>
          <text x="8" y="24" fill={ink}>
            栈：后进先出 · 数量{state.stack.length}
          </text>
          <path
            d="M65 43 V185 H230 V43"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x="75"
                y={142 - i * 46}
                width="145"
                height="38"
                fill={surface}
                stroke={muted}
                strokeDasharray={state.stack[i] ? undefined : "4 3"}
              />
              <text x="148" y={168 - i * 46} textAnchor="middle" fill={ink}>
                {state.stack[i]
                  ? `#${state.stack[i].id} · ${state.stack[i].value}`
                  : "空"}
              </text>
            </g>
          ))}
          <text x="8" y="213" fill={ink}>
            栈顶：
            {state.stack.length
              ? `#${state.stack[state.stack.length - 1].id}`
              : "无（不能读）"}
          </text>
          <text x="8" y="250" fill={ink}>
            队列：先进先出 · count {state.count}/3
          </text>
          {state.ring.map((item, i) => (
            <g key={i}>
              <rect
                x={14 + i * 92}
                y="270"
                width="88"
                height="55"
                fill={surface}
                stroke={i === state.head ? accent : muted}
                strokeWidth={i === state.head ? 3 : 1}
              />
              <text x={58 + i * 92} y="304" textAnchor="middle" fill={ink}>
                {item ? `#${item.id}:${item.value}` : "空"}
              </text>
              <text x={58 + i * 92} y="348" textAnchor="middle" fill={muted}>
                槽{i}
              </text>
            </g>
          ))}
          <path
            d="M280 358 V375 H24 V358 m-5 7 l5 -7 5 7"
            stroke={accent}
            fill="none"
            strokeWidth="2"
          />
          <text x="8" y="405" fill={ink}>
            head={state.head}；写槽=({state.head}+{state.count})%3
          </text>
          <text x="8" y="434" fill={muted}>
            {state.count === 3
              ? "满：写槽等于 head，仍禁止覆盖"
              : state.count === 0
                ? "空：只凭 head 无法判断满空"
                : "粗边是队首；下方箭头是回绕"}
          </text>
        </svg>
      )}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-3 break-words rounded-control border border-border p-3 text-sm text-primary"
      >
        {state.status}
      </p>
      <p className="mt-2 text-sm text-secondary">
        模型不是 C++
        内存执行器。存储上限4、栈/队列容量3；值可重复，编号不复用。切换视图重新开始；完整重置还恢复视图、操作、错误开关与句柄。
      </p>
    </section>
  );
}
