"use client";

import { useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
};
const buttonClass =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm aria-pressed:border-accent aria-pressed:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
// Local overrides keep the shared timeline's small step dots out of the focus
// order and enlarge its remaining controls without changing shared components.
const controlsClass =
  "[&_ol]:hidden [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_input]:min-h-11 [&_input]:focus-visible:outline-2 [&_input]:focus-visible:outline-accent [&_.flex]:flex-wrap";

type Value = string | number | null;
type Entry = [string, Value];
const initialEntries: Entry[] = [
  ["color", "green"],
  ["points", 5],
];
const operations = [
  {
    label: "初始",
    code: 'alien = {"color": "green", "points": 5}',
    why: "两条绑定；图中序号表示插入顺序，不是整数键。",
  },
  {
    label: "新增",
    code: 'alien["x"] = 0',
    why: "x 是新键，追加到末尾，长度从 2 变成 3。",
  },
  {
    label: "修改",
    code: 'alien["points"] = 10',
    why: "points 已存在，只替换值；长度和位置都不变。",
  },
  {
    label: "删除",
    code: 'removed = alien.pop("color")',
    why: '返回 "green"，同时删除 color 的绑定，长度变成 2。',
  },
  {
    label: "重插",
    code: 'alien["color"] = "yellow"',
    why: "删除后重插算新插入，color 排到 x 后面，而非回到原位。",
  },
  {
    label: "默认读取",
    code: 'result = alien.get("speed", "medium")',
    why: 'speed 缺失，返回 "medium"，但没有新增 speed。',
  },
  {
    label: "缺失报错",
    code: 'result = alien["speed"]',
    why: "抛出 KeyError，字典不变。本模拟器展示异常后允许继续；普通脚本中未捕获异常会中止执行。",
  },
  {
    label: "写入空值",
    code: 'alien["speed"] = None',
    why: "现在 speed 确实存在，值为 None；长度变成 4。",
  },
  {
    label: "空值读取",
    code: 'result = alien.get("speed", "medium")',
    why: "键已存在，所以返回 None，而不是默认值。",
  },
] as const;
const sequenceSteps = operations.map((op) => ({ label: op.label }));
const pathSteps = [
  { label: "完整结构" },
  { label: "取外层" },
  { label: "取内层" },
];

const buildSequence: BuildTimeline = (tl) => {
  const clock = { beat: 0 };
  sequenceSteps.forEach((step, i) => {
    tl.label(step.label, i * 1600);
    tl.add(clock, { beat: i + 1, duration: 1600, ease: "linear" }, i * 1600);
  });
};
const buildPath: BuildTimeline = (tl) => {
  const clock = { beat: 0 };
  pathSteps.forEach((step, i) => {
    tl.label(step.label, i * 1600);
    tl.add(clock, { beat: i + 1, duration: 1600, ease: "linear" }, i * 1600);
  });
};

function python(value: Value) {
  return value === null ? "None" : JSON.stringify(value);
}

// Fixed string keys only: this models Python's observable mapping/order,
// not hash buckets, memory addresses, or arbitrary Python key equality.
function dictionaryAt(step: number): Entry[] {
  const mapping = new Map<string, Value>(initialEntries);
  if (step >= 1) mapping.set("x", 0);
  if (step >= 2) mapping.set("points", 10);
  if (step >= 3) mapping.delete("color");
  if (step >= 4) mapping.set("color", "yellow");
  if (step >= 7) mapping.set("speed", null);
  return [...mapping];
}

function SequenceLab({
  views,
  onReset,
}: {
  views: boolean;
  onReset: () => void;
}) {
  const tl = useTeachingTimeline({
    steps: sequenceSteps,
    build: buildSequence,
  });
  const [projection, setProjection] = useState<
    "items" | "keys" | "values" | "sorted"
  >("items");
  const step = tl.currentStep;
  const entries = dictionaryAt(step);
  const projected =
    projection === "sorted"
      ? [...entries].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      : entries;
  const result =
    step === 3
      ? '返回 "green"'
      : step === 5
        ? '返回 "medium"'
        : step === 6
          ? 'KeyError: "speed"'
          : step === 8
            ? "返回 None"
            : "赋值不产生返回值";
  const output = projected.map(([key, value]) =>
    projection === "items"
      ? `(${python(key)}, ${python(value)})`
      : projection === "values"
        ? python(value)
        : python(key),
  );
  const summary = entries
    .map(([key, value]) => `${key} → ${python(value)}`)
    .join("；");
  return (
    <>
      <p className="text-sm leading-relaxed">
        先预测：修改 points 会换位置吗？删除再插入 color 呢？get
        缺失时会增加一行吗？用“下一步”验证，最后重置再预测。
      </p>
      {views && (
        <fieldset className="mt-3 min-w-0">
          <legend className="text-sm">选择遍历输出（不改变字典）</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["items", "keys", "values", "sorted"] as const).map((kind) => (
              <button
                type="button"
                key={kind}
                className={buttonClass}
                aria-pressed={projection === kind}
                onClick={() => setProjection(kind)}
              >
                {kind === "sorted" ? "sorted(alien)" : `${kind}()`}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <p className="mt-3 break-words font-mono text-sm">
        {operations[step].code}
      </p>
      <svg
        viewBox="0 0 340 360"
        className="mx-auto mt-3 w-full max-w-[400px]"
        role="img"
        aria-label={`第 ${step + 1} 步，${operations[step].label}。字典长度 ${entries.length}。按插入顺序：${summary}。${views ? `遍历输出：${output.join("；")}` : result}`}
      >
        <text x="12" y="24" fill={C.text} fontSize="17">
          alien：{entries.length} 条绑定
        </text>
        <text x="12" y="51" fill={C.muted} fontSize="16">
          {views ? "键 → 值 → 本次遍历输出" : "插入顺序 ↓     键 → 值"}
        </text>
        <path
          d="M 21 72 V 300 l -5 -8 m 5 8 l 5 -8"
          fill="none"
          stroke={C.muted}
        />
        {entries.map(([key, value], i) => {
          const y = 74 + i * 55;
          const changed =
            (step === 1 && key === "x") ||
            (step === 2 && key === "points") ||
            (step === 4 && key === "color") ||
            (step === 7 && key === "speed");
          return (
            <g key={key}>
              <circle
                cx="21"
                cy={y + 21}
                r="12"
                fill={C.bg}
                stroke={C.border}
              />
              <text
                x="21"
                y={y + 27}
                textAnchor="middle"
                fill={C.muted}
                fontSize="16"
              >
                {i + 1}
              </text>
              <rect
                x="42"
                y={y}
                width="280"
                height="42"
                rx="5"
                fill={C.bg}
                stroke={changed ? C.accent : C.border}
                strokeWidth={changed ? 3 : 1}
              />
              <text x="53" y={y + 27} fill={C.text} fontSize="17">
                {key}
              </text>
              <path
                d={`M 129 ${y + 21} h 26 l -6 -5 m 6 5 l -6 5`}
                fill="none"
                stroke={C.accent}
                strokeWidth="2"
              />
              <text x="166" y={y + 27} fill={C.text} fontSize="17">
                {python(value)}
              </text>
              {changed && <circle cx="309" cy={y + 8} r="4" fill={C.accent} />}
            </g>
          );
        })}
        {(step === 5 || step === 6) && (
          <g>
            <path d="M 42 260 H 322" stroke={C.muted} strokeDasharray="5 4" />
            <text x="53" y="287" fill={C.text} fontSize="17">
              speed：无绑定（不是 None）
            </text>
          </g>
        )}
        <text x="12" y="335" fill={C.text} fontSize="17">
          {step === 0 ? "尚未执行操作" : result}
        </text>
      </svg>
      {views && (
        <>
          <svg
            viewBox="0 0 340 330"
            className="mx-auto w-full max-w-[400px]"
            role="img"
            aria-label={`${projection} 的当前输出为 ${output.join("；")}；初始 items 快照始终是 color green、points 5。`}
          >
            <text x="12" y="24" fill={C.text} fontSize="17">
              {projection === "sorted"
                ? "新排序列表（此刻重新计算）"
                : `保存的 ${projection} 视图（此刻读取）`}
            </text>
            {output.map((item, i) => (
              <g key={i}>
                <circle
                  cx="22"
                  cy={49 + i * 42}
                  r="12"
                  fill={C.bg}
                  stroke={C.accent}
                />
                <text
                  x="22"
                  y={55 + i * 42}
                  textAnchor="middle"
                  fill={C.text}
                  fontSize="16"
                >
                  {entries.findIndex(([key]) => key === projected[i][0]) + 1}
                </text>
                <rect
                  x="44"
                  y={32 + i * 42}
                  width="280"
                  height="34"
                  rx="4"
                  fill={C.bg}
                  stroke={C.border}
                />
                <text x="52" y={55 + i * 42} fill={C.text} fontSize="16">
                  {item}
                </text>
              </g>
            ))}
            <path d="M 12 216 H 328" stroke={C.border} />
            <text x="12" y="244" fill={C.muted} fontSize="16">
              初始 list(alien.items()) 快照
            </text>
            <text x="12" y="274" fill={C.text} fontSize="16">
              {'[("color", "green"),'}
            </text>
            <text x="24" y="301" fill={C.text} fontSize="16">
              {'("points", 5)]（不变）'}
            </text>
          </svg>
          <p className="text-sm">
            输出左侧数字对应上图的插入序号，可观察排序如何重新排列键。前三项模拟在初始时保存的动态视图；每步重新读取会反映当前绑定。sorted
            是每步新算的列表，不是动态视图。快照中的本例值不可变；它并非任意嵌套对象的深复制。
          </p>
        </>
      )}
      <p
        role="status"
        aria-live="polite"
        className="mt-3 text-sm leading-relaxed"
      >
        第 {step + 1}/{operations.length} 步 · {operations[step].why}
      </p>
      <div className={controlsClass}>
        <TimelineControls
          timeline={tl}
          caption={operations[step].label}
          reset={{
            label: "重置实验",
            ariaLabel: "重置全部实验到增删与缺失的初始状态",
            onClick: () => {
              tl.goToStep(0);
              setProjection("items");
              onReset();
            },
          }}
        />
      </div>
    </>
  );
}

const shapes = {
  records: {
    label: "列表装字典",
    source: 'users = [{"city": "London"}, {"city": "NYC"}]',
    path: 'users[0]["city"]',
    root: "users · list",
    first: "[0]",
    second: '["city"]',
    middle: "dict",
    leaf: '"London"',
    sibling: "[1] → dict",
  },
  groups: {
    label: "字典装列表",
    source: 'groups = {"team": ["ada", "grace"]}',
    path: 'groups["team"][0]',
    root: "groups · dict",
    first: '["team"]',
    second: "[0]",
    middle: "list",
    leaf: '"ada"',
    sibling: '[1] → "grace"',
  },
  users: {
    label: "字典装字典",
    source: 'users = {"ada": {"city": "London"}, "grace": {"city": "NYC"}}',
    path: 'users["ada"]["city"]',
    root: "users · dict",
    first: '["ada"]',
    second: '["city"]',
    middle: "dict",
    leaf: '"London"',
    sibling: '"grace" → dict',
  },
} as const;
type Shape = keyof typeof shapes;

function NestedLab({ onReset }: { onReset: () => void }) {
  const [shape, setShape] = useState<Shape>("users");
  const [missing, setMissing] = useState(false);
  const tl = useTeachingTimeline({ steps: pathSteps, build: buildPath });
  const data = shapes[shape];
  const stage = tl.currentStep;
  const failed = missing && stage === 2;
  const second = missing ? '["missing"]' : data.second;
  const path = data.path.replace(/\[[^\]]+\]$/, second);
  const explanation =
    stage === 0
      ? "先看容器类型，方括号里的 0 是位置；带引号的文字是键。"
      : stage === 1
        ? `第一层 ${data.first} 得到 ${data.middle}，还不是最终值。`
        : failed
          ? shape === "groups"
            ? "内层是列表，却用字符串索引：TypeError；原结构未改变。"
            : "内层字典没有 missing 键：KeyError；原结构未改变。"
          : `第二层 ${data.second} 得到 ${data.leaf}。两次取值，没有复制或修改容器。`;
  return (
    <>
      <fieldset className="min-w-0">
        <legend className="text-sm">先预测：每次取出的对象是什么类型？</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(Object.keys(shapes) as Shape[]).map((key) => (
            <button
              type="button"
              key={key}
              className={buttonClass}
              aria-pressed={shape === key}
              onClick={() => {
                tl.goToStep(0);
                setShape(key);
                setMissing(false);
              }}
            >
              {shapes[key].label}
            </button>
          ))}
        </div>
      </fieldset>
      <p className="mt-3 break-words font-mono text-sm">{data.source}</p>
      <p className="mt-2 break-words font-mono text-sm">读取：{path}</p>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={missing}
          onChange={(event) => {
            tl.goToStep(0);
            setMissing(event.target.checked);
          }}
        />
        {'将第二层访问改成 ["missing"]（错误路径）'}
      </label>
      <svg
        viewBox="0 0 340 400"
        className="mx-auto w-full max-w-[400px]"
        role="img"
        aria-label={`${data.source}。访问路径 ${path}。${explanation}`}
      >
        <text x="12" y="26" fill={C.text} fontSize="17">
          {data.root}
        </text>
        <rect
          x="12"
          y="42"
          width="316"
          height="340"
          rx="8"
          fill="none"
          stroke={C.border}
        />
        <text x="26" y="71" fill={C.text} fontSize="17">
          {data.first}
        </text>
        <path
          d="M 52 83 V 111 l -5 -7 m 5 7 l 5 -7"
          fill="none"
          stroke={stage >= 1 ? C.accent : C.border}
          strokeWidth="3"
        />
        <rect
          x="34"
          y="119"
          width="272"
          height="172"
          rx="8"
          fill={C.bg}
          stroke={stage >= 1 ? C.accent : C.border}
          strokeWidth="2"
        />
        <text x="48" y="146" fill={C.muted} fontSize="17">
          {data.middle}
        </text>
        <text x="48" y="180" fill={C.text} fontSize="17">
          {data.second}
        </text>
        <path
          d="M 128 175 h 33 l -6 -5 m 6 5 l -6 5"
          fill="none"
          stroke={stage === 2 && !failed ? C.accent : C.border}
          strokeWidth="2"
        />
        <ellipse
          cx="228"
          cy="175"
          rx="61"
          ry="23"
          fill="none"
          stroke={stage === 2 && !failed ? C.accent : C.border}
          strokeWidth="2"
        />
        <text x="228" y="181" textAnchor="middle" fill={C.text} fontSize="16">
          {data.leaf}
        </text>
        {shape === "groups" && (
          <text x="48" y="228" fill={C.muted} fontSize="17">
            {data.sibling}
          </text>
        )}
        {failed && (
          <g>
            <path d="M 49 244 h 220" stroke={C.accent} strokeDasharray="5 4" />
            <path
              d="M 266 235 l 16 18 m 0 -18 l -16 18"
              stroke={C.accent}
              strokeWidth="3"
            />
            <text x="48" y="276" fill={C.text} fontSize="16">
              {shape === "groups"
                ? "TypeError：索引类型错误"
                : "KeyError：missing 无绑定"}
            </text>
          </g>
        )}
        {shape !== "groups" && (
          <text x="26" y="329" fill={C.muted} fontSize="17">
            {data.sibling}
          </text>
        )}
        <text x="26" y="365" fill={C.text} fontSize="16">
          {stage === 2
            ? failed
              ? "× 查找中断，结构未变"
              : "✓ 到达值，结构未变"
            : "按下一步，沿访问路径前进"}
        </text>
      </svg>
      <p role="status" aria-live="polite" className="text-sm leading-relaxed">
        {explanation}
      </p>
      <div className={controlsClass}>
        <TimelineControls
          timeline={tl}
          caption={pathSteps[stage].label}
          reset={{
            label: "重置实验",
            ariaLabel: "重置全部实验到增删与缺失的初始状态",
            onClick: () => {
              tl.goToStep(0);
              setShape("users");
              setMissing(false);
              onReset();
            },
          }}
        />
      </div>
    </>
  );
}

export function PccDictionariesLab() {
  const [mode, setMode] = useState<"mapping" | "views" | "nested">("mapping");
  return (
    <section
      aria-label="字典结构实验"
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 text-primary sm:p-4"
    >
      <h3 className="text-base font-semibold">字典：绑定、顺序与访问路径</h3>
      <p className="mt-2 text-sm text-secondary">
        这是固定样本的 Python 语义模拟，不是 Python 运行器；图示是逻辑关系，不是
        CPython
        哈希槽布局。切换实验会从初始状态开始；重置会返回“增删与缺失”的初始状态。
      </p>
      <div
        className="my-3 flex flex-wrap gap-2"
        role="group"
        aria-label="选择实验"
      >
        {(["mapping", "views", "nested"] as const).map((value) => (
          <button
            type="button"
            key={value}
            className={buttonClass}
            aria-pressed={mode === value}
            onClick={() => setMode(value)}
          >
            {value === "mapping"
              ? "增删与缺失"
              : value === "views"
                ? "视图与快照"
                : "嵌套路径"}
          </button>
        ))}
      </div>
      {mode === "nested" ? (
        <NestedLab onReset={() => setMode("mapping")} />
      ) : (
        <SequenceLab
          key={mode}
          views={mode === "views"}
          onReset={() => setMode("mapping")}
        />
      )}
    </section>
  );
}
