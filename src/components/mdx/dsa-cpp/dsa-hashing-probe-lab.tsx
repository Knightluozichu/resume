"use client";

import { useState } from "react";

type Slot = { state: "empty" | "deleted" | "live"; key?: number };
type Table = readonly Slot[];
type Operation = "find" | "insert" | "delete" | "rehash";
type Probe = {
  path: number[];
  found: number;
  available: number;
  stopped: string;
};
type Bucket = { depth: number; keys: number[] };
type Directory = { depth: number; pointers: number[]; buckets: Bucket[] };

function validKey(key: number) {
  if (!Number.isInteger(key) || Math.abs(key) > 999)
    throw new RangeError("键必须是 -999 到 999 的整数");
}
function index(key: number, size: number) {
  return ((key % size) + size) % size;
}
function createTable(size = 7): Table {
  if (!Number.isInteger(size) || size < 1 || size > 31)
    throw new RangeError("教学表容量限 1–31");
  return Array.from({ length: size }, () => ({ state: "empty" as const }));
}
// Only tables constructed by this module are supported. Every scan is bounded.
function probe(table: Table, key: number, stopAtDeleted = false): Probe {
  validKey(key);
  let available = -1;
  const path: number[] = [];
  for (let i = 0; i < table.length; i++) {
    const p = index(index(key, table.length) + i, table.length);
    const slot = table[p];
    path.push(p);
    if (slot.state === "live" && slot.key === key)
      return { path, found: p, available, stopped: "命中相等键" };
    if (slot.state === "deleted" && stopAtDeleted)
      return { path, found: -1, available, stopped: "错误：遇墓碑就停止" };
    if (slot.state !== "live" && available < 0) available = p;
    if (slot.state === "empty")
      return { path, found: -1, available, stopped: "遇从未占用的空槽" };
  }
  return { path, found: -1, available, stopped: "已检查完整一圈" };
}
function stats(table: Table) {
  const live = table.filter((s) => s.state === "live").length;
  const deleted = table.filter((s) => s.state === "deleted").length;
  return {
    live,
    deleted,
    load: live / table.length,
    used: (live + deleted) / table.length,
  };
}
function apply(
  table: Table,
  operation: Operation,
  key = 0,
  fault = false,
  size = 11,
) {
  validKey(key);
  if (operation === "rehash") {
    let next = createTable(size);
    const moves: { key: number; from: number; to: number }[] = [];
    for (let from = 0; from < table.length; from++) {
      const slot = table[from];
      if (slot.state !== "live") continue;
      const p = probe(next, slot.key!);
      if (p.available < 0)
        return {
          table,
          path: [] as number[],
          moves: [],
          message: "目标容量不足；原表未改变",
          ok: false,
        };
      next = next.map((s, i) =>
        i === p.available ? { state: "live", key: slot.key } : s,
      );
      moves.push({ key: slot.key!, from, to: p.available });
    }
    return {
      table: next,
      path: [],
      moves,
      message: `再散列到 ${size} 槽，重新插入 ${moves.length} 个键；墓碑清零`,
      ok: true,
    };
  }
  const p = probe(table, key, operation === "find" && fault);
  let next: Table = table;
  let message = p.found >= 0 ? `找到 ${key}，槽 ${p.found}` : `未找到 ${key}`;
  let ok = p.found >= 0;
  if (operation === "insert") {
    ok = p.found < 0 && p.available >= 0;
    message =
      p.found >= 0
        ? "重复键：未插入"
        : p.available < 0
          ? "表满：插入失败"
          : `插入 ${key} 到槽 ${p.available}`;
    if (ok)
      next = table.map((s, i) =>
        i === p.available ? { state: "live", key } : s,
      );
  }
  if (operation === "delete") {
    message =
      p.found >= 0
        ? `删除 ${key}，槽 ${p.found} 留墓碑`
        : `删除失败：没有 ${key}`;
    if (ok)
      next = table.map((s, i) => (i === p.found ? { state: "deleted" } : s));
  }
  return {
    table: next,
    path: p.path,
    moves: [] as { key: number; from: number; to: number }[],
    message: `${message}；${p.stopped}；探查 ${p.path.length} 次`,
    ok,
  };
}
function createDirectory(): Directory {
  return {
    depth: 1,
    pointers: [0, 1],
    buckets: [
      { depth: 1, keys: [] },
      { depth: 1, keys: [] },
    ],
  };
}
function extend(source: Directory, key: number) {
  validKey(key);
  const next: Directory = {
    depth: source.depth,
    pointers: [...source.pointers],
    buckets: source.buckets.map((b) => ({ depth: b.depth, keys: [...b.keys] })),
  };
  const steps: string[] = [];
  for (let attempt = 0; attempt <= 4; attempt++) {
    const address = index(key, 2 ** next.depth);
    const id = next.pointers[address];
    const bucket = next.buckets[id];
    if (bucket.keys.includes(key))
      return { directory: source, steps: ["重复键：未插入"], ok: false };
    if (bucket.keys.length < 2) {
      bucket.keys.push(key);
      steps.push(
        `${key} 的低 ${next.depth} 位 = ${address.toString(2).padStart(next.depth, "0")} → B${id}`,
      );
      return { directory: next, steps, ok: true };
    }
    if (bucket.depth === 4)
      return {
        directory: source,
        steps: ["低 4 位仍无法分离：达到教学深度上限，整次操作回滚"],
        ok: false,
      };
    const oldDepth = bucket.depth;
    const doubled = oldDepth === next.depth;
    if (doubled) {
      next.pointers = [...next.pointers, ...next.pointers];
      next.depth++;
    }
    const sibling = next.buckets.length;
    bucket.depth++;
    next.buckets.push({ depth: bucket.depth, keys: [] });
    for (let d = 0; d < next.pointers.length; d++)
      if (next.pointers[d] === id && d & (1 << oldDepth))
        next.pointers[d] = sibling;
    const keys = [...bucket.keys];
    bucket.keys = [];
    for (const k of keys)
      next.buckets[next.pointers[index(k, 2 ** next.depth)]].keys.push(k);
    steps.push(
      `${doubled ? `目录翻倍，g=${next.depth}；` : "目录不翻倍；"}B${id} 按位 ${oldDepth} 分裂，局部深度 ${oldDepth}→${oldDepth + 1}`,
    );
  }
  throw new Error("不可达：有界分裂未终止");
}

// One model export keeps the two domain views on the exact same tested functions.
export const hashingModel = {
  index,
  createTable,
  probe,
  apply,
  stats,
  createDirectory,
  extend,
};

const C = {
  bg: "var(--bg-elevated)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 rounded border border-border bg-elevated px-3 py-2 text-primary";
function initialProbe() {
  let table = createTable();
  for (const key of [5, 12, 19]) table = apply(table, "insert", key).table;
  table = apply(table, "delete", 12).table;
  return apply(table, "find", 19);
}
function readKey(text: string) {
  if (!/^-?\d+$/.test(text.trim()))
    throw new RangeError("请输入整数，不接受空值或小数");
  const key = Number(text);
  validKey(key);
  return key;
}

export function DsaHashingProbeLab() {
  const [result, setResult] = useState(initialProbe);
  const [keyText, setKeyText] = useState("19");
  const [operation, setOperation] = useState<Operation>("find");
  const [fault, setFault] = useState(false);
  const [error, setError] = useState("");
  const counts = stats(result.table);
  function run(nextFault = fault, action = operation) {
    try {
      const key = readKey(keyText);
      setResult(apply(result.table, action, key, nextFault));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }
  function reset() {
    setResult(initialProbe());
    setKeyText("19");
    setOperation("find");
    setFault(false);
    setError("");
  }
  return (
    <section
      className="not-prose my-6 rounded-xl border border-border p-3"
      aria-label="散列表线性探查实验"
    >
      <h3 className="text-lg font-semibold">同一个起点，三种槽状态</h3>
      <p className="my-2 text-sm text-secondary">
        初始依次插入 5、12、19，再删除
        12。实线框是已探查槽，右侧编号是本次访问顺序；空与墓碑不能混同。
      </p>
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex min-w-0 flex-col gap-1">
          整数键
          <input
            className={`${control} w-28`}
            value={keyText}
            onChange={(e) => setKeyText(e.target.value)}
            inputMode="numeric"
          />
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          操作
          <select
            className={`${control} max-w-full`}
            value={operation}
            onChange={(e) => setOperation(e.target.value as Operation)}
          >
            <option value="find">查找</option>
            <option value="insert">插入</option>
            <option value="delete">删除</option>
            <option value="rehash">再散列到 11 槽</option>
          </select>
        </label>
        <button className={control} onClick={() => run()}>
          执行
        </button>
        <button
          className={control}
          aria-pressed={fault}
          onClick={() => {
            const next = !fault;
            setFault(next);
            setOperation("find");
            run(next, "find");
          }}
        >
          故障：{fault ? "开" : "关"}
        </button>
        <button className={control} onClick={reset}>
          重置
        </button>
      </div>
      <p className="my-2 text-sm">
        故障按钮立即查找当前键；只让查找错误地停在墓碑，不污染插入或删除算法。
      </p>
      <svg
        viewBox={`0 0 300 ${Math.max(350, 64 + result.table.length * 30)}`}
        className="mx-auto block w-full max-w-[300px]"
        role="img"
        aria-label="按物理下标排列的槽及实际探查次序"
      >
        <title>散列表槽布局和本次探查轨迹</title>
        <text x="10" y="24" fontSize="16" fill={C.text}>
          下标
        </text>
        <text x="100" y="24" fontSize="16" fill={C.text}>
          存储槽
        </text>
        <text x="223" y="24" fontSize="16" fill={C.text}>
          访问序
        </text>
        {result.table.map((slot, i) => {
          const order = result.path.indexOf(i);
          const y = 38 + i * 30;
          const stroke =
            order >= 0
              ? fault && slot.state === "deleted"
                ? C.danger
                : C.accent
              : C.border;
          return (
            <g key={i}>
              <text x="22" y={y + 19} fontSize="16" fill={C.text}>
                {i}
              </text>
              <rect
                x="66"
                y={y}
                width="142"
                height="26"
                rx="3"
                fill={C.bg}
                stroke={stroke}
                strokeWidth={order >= 0 ? 2.5 : 1}
              />
              <text
                x="137"
                y={y + 19}
                textAnchor="middle"
                fontSize="16"
                fill={C.text}
              >
                {slot.state === "live"
                  ? slot.key
                  : slot.state === "deleted"
                    ? "墓碑 ×"
                    : "空 ∅"}
              </text>
              {order >= 0 && (
                <text
                  x="247"
                  y={y + 19}
                  textAnchor="middle"
                  fontSize="16"
                  fill={stroke}
                >
                  {order + 1}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="text-sm">
        活键 {counts.live}，墓碑 {counts.deleted}，容量 {result.table.length}
        ；活负载 {counts.load.toFixed(2)}，占用比例（含墓碑）
        {counts.used.toFixed(2)}。
      </p>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="my-2 break-words"
      >
        {error ? `未执行：${error}` : result.message}
      </p>
      {result.path.length > 0 && (
        <p className="break-words text-sm">
          探查顺序：{result.path.join(" → ")}
        </p>
      )}
      {result.moves.length > 0 && (
        <ul className="text-sm">
          {result.moves.map((move) => (
            <li key={move.key}>
              键 {move.key}：槽 {move.from} → {move.to}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function initialDirectory() {
  let directory = createDirectory();
  for (const key of [1, 3]) directory = extend(directory, key).directory;
  return {
    directory,
    steps: ["初始 B1 存 1、3；输入 5 将触发首次分裂"],
    ok: true,
  };
}
export function DsaHashingDirectoryLab() {
  const [result, setResult] = useState(initialDirectory);
  const [keyText, setKeyText] = useState("5");
  const [error, setError] = useState("");
  const { directory } = result;
  const height = Math.max(
    350,
    directory.pointers.length * 30 + 66,
    directory.buckets.length * 82 + 66,
  );
  return (
    <section
      className="not-prose my-6 rounded-xl border border-border p-3"
      aria-label="可扩展散列目录实验"
    >
      <h3 className="text-lg font-semibold">低位目录共享真正的桶</h3>
      <p className="my-2 text-sm">
        每桶 2 个键，最多使用低 4 位。目录项是引用，不是键的副本。可依次插入
        5、9、7、11；最后一次仅分裂桶，不翻倍目录。
      </p>
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1">
          整数键
          <input
            className={`${control} w-28`}
            inputMode="numeric"
            value={keyText}
            onChange={(e) => setKeyText(e.target.value)}
          />
        </label>
        <button
          className={control}
          onClick={() => {
            try {
              setResult(extend(directory, readKey(keyText)));
              setError("");
            } catch (e) {
              setError((e as Error).message);
            }
          }}
        >
          插入
        </button>
        <button
          className={control}
          onClick={() => {
            setResult(initialDirectory());
            setKeyText("5");
            setError("");
          }}
        >
          重置
        </button>
      </div>
      <p className="my-2">
        全局深度 g={directory.depth}；{directory.pointers.length} 项目录，
        {directory.buckets.length} 个桶。
      </p>
      <svg
        viewBox={`0 0 300 ${height}`}
        className="mx-auto block w-full max-w-[300px]"
        role="img"
        aria-label="低位二进制目录项连向桶，桶内显示局部深度及所有键"
      >
        <title>可扩展散列目录与桶的真实共享关系</title>
        <text x="8" y="24" fontSize="16" fill={C.text}>
          低位目录
        </text>
        <text x="176" y="24" fontSize="16" fill={C.text}>
          桶 / 局部深度
        </text>
        {directory.pointers.map((id, d) => (
          <path
            key={`edge-${d}`}
            d={`M 82 ${53 + d * 30} L 174 ${70 + id * 82}`}
            fill="none"
            stroke={C.border}
            strokeWidth="1.5"
          />
        ))}
        {directory.pointers.map((id, d) => (
          <g key={d}>
            <rect
              x="6"
              y={40 + d * 30}
              width="76"
              height="26"
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x="44"
              y={59 + d * 30}
              textAnchor="middle"
              fontSize="16"
              fill={C.text}
            >
              {d.toString(2).padStart(directory.depth, "0")}
            </text>
          </g>
        ))}
        {directory.buckets.map((bucket, id) => (
          <g key={id}>
            <rect
              x="174"
              y={40 + id * 82}
              width="120"
              height="64"
              rx="3"
              fill={C.bg}
              stroke={C.accent}
            />
            <text x="182" y={61 + id * 82} fontSize="16" fill={C.text}>
              B{id} / ℓ={bucket.depth}
            </text>
            <path
              d={`M174 ${70 + id * 82} H294 M234 ${70 + id * 82} V${104 + id * 82}`}
              stroke={C.border}
            />
            {[0, 1].map((slot) => (
              <text
                key={slot}
                x={204 + slot * 60}
                y={94 + id * 82}
                textAnchor="middle"
                fontSize="16"
                fill={C.text}
              >
                {bucket.keys[slot] ?? "∅"}
              </text>
            ))}
          </g>
        ))}
      </svg>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="break-words text-sm"
      >
        {error
          ? `未执行：${error}`
          : result.steps.map((step, i) => <p key={i}>{step}</p>)}
      </div>
      <p className="mt-2 text-sm text-secondary">
        连线只在目录与桶之间的空白区交汇；同桶的多条连线表示共享。上限拒绝会回滚，不是算法对任意文件的容量保证。
      </p>
    </section>
  );
}
