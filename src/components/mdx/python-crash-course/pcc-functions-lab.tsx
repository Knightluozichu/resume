"use client";

import { useId, useState } from "react";

const colors = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  surface: "var(--bg-elevated)",
  active: "var(--accent)",
};
const control =
  "min-h-11 min-w-11 rounded-lg border border-border bg-elevated px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:opacity-50";
const codeStyle =
  "whitespace-pre-wrap break-words rounded-lg border border-border bg-elevated p-3 text-xs leading-6 [overflow-wrap:anywhere]";

type CallCase = {
  label: string;
  call: string;
  arguments: [string, string];
  values: [string, string];
  sources: [number, number];
  error?: string;
};
const calls: CallCase[] = [
  {
    label: "省略默认值",
    call: 'describe_pet("milo")',
    arguments: ['"milo"', '默认 "dog"'],
    values: ['"milo"', '"dog"'],
    sources: [0, 1],
  },
  {
    label: "两个位置实参",
    call: 'describe_pet("milo", "cat")',
    arguments: ['位置 1: "milo"', '位置 2: "cat"'],
    values: ['"milo"', '"cat"'],
    sources: [0, 1],
  },
  {
    label: "倒序关键字",
    call: 'describe_pet(animal_type="cat", pet_name="milo")',
    arguments: ['animal_type="cat"', 'pet_name="milo"'],
    values: ['"milo"', '"cat"'],
    sources: [1, 0],
  },
  {
    label: "重复绑定",
    call: 'describe_pet("milo", pet_name="luna")',
    arguments: ['位置 1: "milo"', 'pet_name="luna"'],
    values: ["冲突", "—"],
    sources: [0, 0],
    error: "TypeError：pet_name 收到了两个值",
  },
  {
    label: "缺少必填参数",
    call: 'describe_pet(animal_type="cat")',
    arguments: ['animal_type="cat"', "pet_name 未提供"],
    values: ["缺失", '"cat"'],
    sources: [1, 0],
    error: "TypeError：缺少 pet_name",
  },
  {
    label: "未知关键字",
    call: 'describe_pet("milo", species="cat")',
    arguments: ['位置 1: "milo"', 'species="cat"'],
    values: ['"milo"', "未知关键字"],
    sources: [0, 1],
    error: "TypeError：不接受 species",
  },
];

function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.active} />
      </marker>
    </defs>
  );
}

function BindingLab() {
  const id = useId().replace(/:/g, "");
  const [selection, setSelection] = useState(0);
  const [printOnly, setPrintOnly] = useState(false);
  const [phase, setPhase] = useState(0);
  const [prediction, setPrediction] = useState("");
  const call = calls[selection];
  const failed = Boolean(call.error) && phase > 0;
  const bound = phase > 0 && !failed;
  const result = `Milo is a ${selection === 0 ? "dog" : "cat"}.`;
  const stages = ["尚未调用", "绑定实参", "执行函数体", "返回调用方"];
  const expected = call.error ? "error" : printOnly ? "none" : "value";
  const finished = failed || phase === 3;
  const reset = () => {
    setSelection(0);
    setPrintOnly(false);
    setPhase(0);
    setPrediction("");
  };
  const description = failed
    ? `${call.error}。函数体执行次数为 0；没有正常返回值。`
    : phase === 0
      ? "先预测，再逐步调用：参数尚未绑定。"
      : phase === 1
        ? "实参已经绑定到局部参数；交叉连线表示关键字按名字而非书写顺序匹配。"
        : phase === 2
          ? printOnly
            ? `函数体执行 print，stdout 出现 ${result}；这还不是返回值。`
            : `函数体算出字符串 ${result}，准备执行 return。`
          : printOnly
            ? "走到函数末尾隐式返回 None；调用帧退出，result 绑定到 None。"
            : "return 交付字符串；调用帧退出，result 保存返回值。";
  return (
    <section aria-label="参数绑定与返回实验" className="min-w-0 space-y-4">
      <h3 className="text-lg font-semibold">
        实验 A · 实参怎样进入、离开调用帧？
      </h3>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          调用形式
          <select
            className={`${control} w-full`}
            value={selection}
            onChange={(e) => {
              setSelection(Number(e.target.value));
              setPhase(0);
              setPrediction("");
            }}
          >
            {calls.map((item, index) => (
              <option key={item.label} value={index}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          交付方式
          <select
            className={`${control} w-full`}
            value={printOnly ? "print" : "return"}
            onChange={(e) => {
              setPrintOnly(e.target.value === "print");
              setPhase(0);
              setPrediction("");
            }}
          >
            <option value="return">return text</option>
            <option value="print">print(text)，无 return</option>
          </select>
        </label>
      </div>
      <pre className={codeStyle}>
        <code>{`def describe_pet(pet_name, animal_type="dog"):\n    text = f"{pet_name.title()} is a {animal_type}."\n    ${printOnly ? "print(text)" : "return text"}\n\nresult = ${call.call}`}</code>
      </pre>
      <label className="grid gap-1 text-sm">
        预测：result 会得到什么？
        <select
          className={`${control} w-full`}
          value={prediction}
          disabled={phase !== 0}
          onChange={(e) => setPrediction(e.target.value)}
        >
          <option value="">请选择预测</option>
          <option value="value">字符串</option>
          <option value="none">None</option>
          <option value="error">TypeError，无法正常赋值</option>
        </select>
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={control}
          disabled={!prediction || finished}
          onClick={() => setPhase((value) => Math.min(value + 1, 3))}
        >
          下一步（{phase}/3）
        </button>
        <button type="button" className={control} onClick={reset}>
          重置绑定实验
        </button>
      </div>
      <figure className="m-0 min-w-0 rounded-lg border border-border p-2">
        <svg
          viewBox="0 0 320 420"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="mx-auto block h-auto w-full max-w-[420px]"
          style={{ color: colors.text }}
        >
          <title id={`${id}-title`}>实参到参数的映射、调用帧和返回通道</title>
          <desc id={`${id}-desc`}>{description}</desc>
          <Arrow id={`${id}-arrow`} />
          <text x="12" y="24" fontSize="13" fill="currentColor">
            调用方 · {stages[phase]}
          </text>
          {call.arguments.map((arg, index) => (
            <g key={index}>
              <rect
                x={index * 156 + 8}
                y="38"
                width="148"
                height="48"
                rx="8"
                fill={colors.surface}
                stroke={colors.line}
              />
              <text
                x={index * 156 + 82}
                y="67"
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
              >
                {arg}
              </text>
            </g>
          ))}
          {bound &&
            call.sources.map((source, index) => (
              <path
                key={index}
                d={`M ${source * 156 + 82} 86 L ${index * 156 + 82} 153`}
                stroke={colors.active}
                strokeWidth="2"
                fill="none"
                markerEnd={`url(#${id}-arrow)`}
              />
            ))}
          <rect
            x="8"
            y="126"
            width="304"
            height="166"
            rx="12"
            stroke={bound && phase < 3 ? colors.active : colors.line}
            strokeDasharray={phase === 3 || failed ? "5 5" : undefined}
            fill="none"
          />
          <text x="20" y="146" fontSize="12" fill="currentColor">
            {failed
              ? "绑定失败 · 不进入函数体"
              : phase === 3
                ? "调用帧已退出（虚线保留轨迹）"
                : "describe_pet · 局部调用帧"}
          </text>
          {["pet_name", "animal_type"].map((name, index) => (
            <g key={name} opacity={phase === 3 ? 0.6 : 1}>
              <rect
                x={index * 148 + 18}
                y="158"
                width="136"
                height="62"
                rx="6"
                fill={colors.surface}
                stroke={colors.line}
              />
              <text
                x={index * 148 + 86}
                y="179"
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
              >
                {name}
              </text>
              <text
                x={index * 148 + 86}
                y="203"
                textAnchor="middle"
                fontSize="13"
                fill="currentColor"
              >
                {phase > 0 ? call.values[index] : "未绑定"}
              </text>
            </g>
          ))}
          <text x="20" y="247" fontSize="12" fill="currentColor">
            函数体执行次数：{phase >= 2 && !failed ? 1 : 0}
          </text>
          <text x="20" y="270" fontSize="12" fill="currentColor">
            {phase >= 2 && !failed ? `text = "${result}"` : "text 尚未计算"}
          </text>
          {phase >= 2 && !failed && (
            <path
              d={`M 160 292 L ${printOnly ? 240 : 80} 338`}
              stroke={colors.active}
              strokeWidth="2"
              fill="none"
              markerEnd={`url(#${id}-arrow)`}
            />
          )}
          {phase === 3 && printOnly && (
            <path
              d="M 120 292 L 80 338"
              stroke={colors.active}
              strokeWidth="2"
              strokeDasharray="4 3"
              markerEnd={`url(#${id}-arrow)`}
            />
          )}
          {["result（返回）", "stdout（屏幕）"].map((name, index) => (
            <g key={name}>
              <rect
                x={index * 156 + 8}
                y="344"
                width="148"
                height="64"
                rx="8"
                fill={colors.surface}
                stroke={colors.line}
              />
              <text
                x={index * 156 + 82}
                y="365"
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
              >
                {name}
              </text>
              <text
                x={index * 156 + 82}
                y="391"
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
              >
                {index === 0
                  ? phase === 3
                    ? printOnly
                      ? "None"
                      : result
                    : "未赋值"
                  : phase >= 2 && printOnly && !failed
                    ? result
                    : "无输出"}
              </text>
            </g>
          ))}
        </svg>
        <figcaption className="text-sm text-secondary">
          箭头是数据去向；实线是本次计算，虚线表示退出或隐式返回。类型错误发生在函数体执行前。
        </figcaption>
      </figure>
      <p role="status" aria-live="polite" className="min-h-16 text-sm">
        {description}
        {finished && ` 预测${prediction === expected ? "正确" : "需要修正"}。`}
      </p>
    </section>
  );
}

type HeapMode = "shared" | "fresh" | "direct" | "shallow";
type HeapObject = { id: string; cells: string[]; y: number };

function HeapLab() {
  const id = useId().replace(/:/g, "");
  const [mode, setMode] = useState<HeapMode>("shared");
  const [count, setCount] = useState(0);
  const [prediction, setPrediction] = useState("");
  const isDefault = mode === "shared" || mode === "fresh";
  const shared = mode === "shared" || mode === "direct";
  const objects: HeapObject[] =
    mode === "shared"
      ? [{ id: "L0", cells: ["A", "B"].slice(0, count), y: 64 }]
      : mode === "fresh"
        ? Array.from({ length: count }, (_, i) => ({
            id: `L${i + 1}`,
            cells: [i === 0 ? "A" : "B"],
            y: 64 + i * 105,
          }))
        : mode === "direct"
          ? [{ id: "L0", cells: ["→D0", ...["A", "B"].slice(0, count)], y: 64 }]
          : [
              { id: "L0", cells: ["→D0"], y: 64 },
              ...Array.from({ length: count }, (_, i) => ({
                id: `L${i + 1}`,
                cells: ["→D0", i === 0 ? "A" : "B"],
                y: 154 + i * 90,
              })),
            ];
  const references = [
    ...(mode === "shared"
      ? [{ name: "默认值", target: "L0" }]
      : !isDefault
        ? [{ name: "source", target: "L0" }]
        : []),
    ...Array.from({ length: count }, (_, i) => ({
      name: `r${i + 1}`,
      target: shared ? "L0" : `L${i + 1}`,
    })),
  ];
  const code = isDefault
    ? `def add(item, items=${mode === "shared" ? "[]" : "None"}):\n${mode === "fresh" ? "    if items is None:\n        items = []\n" : ""}    items.append(item)\n    return items\n\nr1 = add("A")\nr2 = add("B")`
    : `def mark(items, item):\n    items[0]["done"] = True\n    items.append(item)\n    return items\n\nsource = [{"done": False}]\nr1 = mark(source${mode === "shallow" ? "[:]" : ""}, "A")\nr2 = mark(source${mode === "shallow" ? "[:]" : ""}, "B")`;
  const expected = shared ? "same" : "different";
  const explanation =
    count === 0
      ? "先预测两次返回是否为同一个列表。L 是列表，D 是字典；标签仅表示对象身份，不是实际地址。"
      : mode === "shared"
        ? `默认列表 L0 在 def 执行时创建；${count === 2 ? "r1、r2 都指向它，因此 r1 现在也包含 B" : "第一次返回的 r1 也指向它"}。`
        : mode === "fresh"
          ? "每次省略 items 都先得到 None，再在函数体中新建列表；不会共享默认列表。"
          : mode === "direct"
            ? "参数绑定不复制列表：source 与返回值指向 L0；外层 append 和内层字典修改都能从 source 观察到。"
            : "切片新建外层列表，所以 source 没有 A/B；但每个索引 0 都指向同一个 D0，其 done 仍会被改成 True。";
  return (
    <section
      aria-label="默认值与列表对象实验"
      className="min-w-0 space-y-4 border-t border-border pt-6"
    >
      <h3 className="text-lg font-semibold">实验 B · 两次调用究竟共享什么？</h3>
      <label className="grid gap-1 text-sm">
        默认值 / 传入列表
        <select
          className={`${control} w-full`}
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as HeapMode);
            setCount(0);
            setPrediction("");
          }}
        >
          <option value="shared">可变默认值：items=[]</option>
          <option value="fresh">修复：items=None</option>
          <option value="direct">直接传入 source</option>
          <option value="shallow">传入浅拷贝 source[:]</option>
        </select>
      </label>
      <pre className={codeStyle}>
        <code>{code}</code>
      </pre>
      <label className="grid gap-1 text-sm">
        预测：两次调用后，r1 is r2 是什么？
        <select
          className={`${control} w-full`}
          value={prediction}
          disabled={count > 0}
          onChange={(e) => setPrediction(e.target.value)}
        >
          <option value="">请选择预测</option>
          <option value="same">True：同一个列表</option>
          <option value="different">False：两个列表</option>
        </select>
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={control}
          disabled={!prediction || count === 2}
          onClick={() => setCount((value) => Math.min(2, value + 1))}
        >
          {count === 0
            ? "执行第一次调用"
            : count === 1
              ? "执行第二次调用"
              : "两次调用完成"}
        </button>
        <button
          type="button"
          className={control}
          onClick={() => {
            setMode("shared");
            setCount(0);
            setPrediction("");
          }}
        >
          重置对象实验
        </button>
      </div>
      <figure className="m-0 min-w-0 rounded-lg border border-border p-2">
        <svg
          viewBox="0 0 320 420"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="mx-auto block h-auto w-full max-w-[420px]"
          style={{ color: colors.text }}
        >
          <title id={`${id}-title`}>列表身份、返回引用与浅拷贝对象图</title>
          <desc id={`${id}-desc`}>
            {explanation}{" "}
            {objects
              .map((object) => `${object.id}: [${object.cells.join(", ")}]`)
              .join("；")}
          </desc>
          <Arrow id={`${id}-arrow`} />
          <text x="10" y="24" fontSize="13" fill="currentColor">
            调用方 / 默认值
          </text>
          <text x="154" y="24" fontSize="13" fill="currentColor">
            对象区 · 调用 {count}/2
          </text>
          {references.map((reference, i) => {
            const target = objects.find(
              (object) => object.id === reference.target,
            )!;
            const y = 88 + i * 90;
            return (
              <g key={reference.name}>
                <text x="10" y={y} fontSize="13" fill="currentColor">
                  {reference.name}
                </text>
                <circle cx="76" cy={y - 5} r="4" fill={colors.active} />
                <path
                  d={`M 80 ${y - 5} C 112 ${y - 5}, 114 ${target.y + 30}, 145 ${target.y + 30}`}
                  fill="none"
                  stroke={colors.active}
                  strokeWidth="2"
                  markerEnd={`url(#${id}-arrow)`}
                />
              </g>
            );
          })}
          {objects.map((object) => (
            <g key={object.id}>
              <rect
                x="150"
                y={object.y}
                width="160"
                height="72"
                rx="8"
                fill={colors.surface}
                stroke={colors.line}
              />
              <text x="160" y={object.y + 19} fontSize="12" fill="currentColor">
                {object.id} · list · len={object.cells.length}
              </text>
              {object.cells.length === 0 && (
                <text
                  x="166"
                  y={object.y + 48}
                  fontSize="13"
                  fill="currentColor"
                >
                  [ ]
                </text>
              )}
              {object.cells.map((cell, index) => (
                <g key={index}>
                  <rect
                    x={159 + index * 48}
                    y={object.y + 29}
                    width="44"
                    height="29"
                    rx="4"
                    fill="none"
                    stroke={colors.active}
                  />
                  <text
                    x={181 + index * 48}
                    y={object.y + 48}
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    {cell}
                  </text>
                </g>
              ))}
              {!isDefault && (
                <path
                  d={`M 155 ${object.y + 57} C 127 ${object.y + 60}, 125 345, 150 365`}
                  fill="none"
                  stroke={colors.active}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  markerEnd={`url(#${id}-arrow)`}
                />
              )}
            </g>
          ))}
          {mode === "fresh" && count === 0 && (
            <text x="150" y="92" fontSize="12" fill="currentColor">
              尚未创建列表
            </text>
          )}
          {!isDefault && (
            <g>
              <rect
                x="150"
                y="350"
                width="160"
                height="54"
                rx="8"
                fill={colors.surface}
                stroke={colors.active}
              />
              <text x="160" y="372" fontSize="12" fill="currentColor">
                D0 · dict
              </text>
              <text x="160" y="392" fontSize="13" fill="currentColor">
                done: {count > 0 ? "True" : "False"}
              </text>
            </g>
          )}
          {isDefault && (
            <text x="10" y="388" fontSize="13" fill="currentColor">
              r1 is r2：
              {count === 2 ? (shared ? "True" : "False") : "等待两次调用"}
            </text>
          )}
        </svg>
        <figcaption className="text-sm text-secondary">
          实线：名字引用列表。虚线：列表的索引 0
          引用字典。一个格子是一个元素，而不是对象的字节布局。
        </figcaption>
      </figure>
      <p role="status" aria-live="polite" className="min-h-16 text-sm">
        {explanation}
        {count === 2 &&
          ` r1 is r2 = ${shared ? "True" : "False"}；预测${prediction === expected ? "正确" : "需要修正"}。`}
      </p>
    </section>
  );
}

export function PccFunctionsLab() {
  return (
    <div
      className="my-6 min-w-0 space-y-8 rounded-xl border border-border p-3 text-primary sm:p-5"
      data-testid="pcc-functions-lab"
    >
      <p className="text-sm text-secondary">
        这是本章固定 Python 示例的语义模型，不是浏览器 Python
        解释器。图中的状态与下文可运行代码一一对应；可用键盘选择、逐步执行并重置。
      </p>
      <BindingLab />
      <HeapLab />
    </div>
  );
}
