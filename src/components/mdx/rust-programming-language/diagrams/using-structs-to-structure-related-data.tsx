"use client";

import { useMemo, useState } from "react";

const structKinds = {
  named: {
    title: "named-field struct",
    declaration: "struct User { active: bool, username: String }",
    construction: 'User { active: true, username: String::from("ada") }',
    access: "user.username",
    meaning: "字段名承载领域语义，顺序不决定访问含义",
    tone: "border-cyan-500/40 bg-cyan-500/10",
  },
  tuple: {
    title: "tuple struct",
    declaration: "struct Point(i32, i32, i32);",
    construction: "Point(10, 20, 30)",
    access: "point.0",
    meaning: "类型名提供语义，字段保持位置访问",
    tone: "border-amber-500/40 bg-amber-500/10",
  },
  unit: {
    title: "unit-like struct",
    declaration: "struct AlwaysEqual;",
    construction: "AlwaysEqual",
    access: "无字段",
    meaning: "零字段也能形成独立类型并实现 trait",
    tone: "border-emerald-500/40 bg-emerald-500/10",
  },
} as const;

type StructKind = keyof typeof structKinds;

export function RplStructShapeLab() {
  const [kind, setKind] = useState<StructKind>("named");
  const selected = structKinds[kind];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="选择 Rust struct 形状">
          {(Object.keys(structKinds) as StructKind[]).map((item) => (
            <button key={item} type="button" aria-pressed={kind === item} onClick={() => setKind(item)} className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${kind === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="mt-5 grid min-h-72 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className={`border p-4 ${selected.tone}`}>
            <span className="text-xs text-secondary">类型声明</span>
            <code className="mt-3 block min-h-14 break-words text-sm leading-6 text-primary">{selected.declaration}</code>
            <span className="mt-6 block text-xs text-secondary">实例化</span>
            <code className="mt-3 block min-h-14 break-words text-sm leading-6 text-primary">{selected.construction}</code>
          </div>
          <section className="min-h-64 border border-border bg-bg p-4" aria-live="polite">
            <span className="text-xs text-secondary">{selected.title}</span>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-secondary">访问</dt>
                <dd className="mt-1 font-mono text-primary">{selected.access}</dd>
              </div>
              <div>
                <dt className="text-secondary">适用判断</dt>
                <dd className="mt-1 text-primary">{selected.meaning}</dd>
              </div>
              <div>
                <dt className="text-secondary">类型身份</dt>
                <dd className="mt-1 text-primary">即使字段类型相同，不同 struct 名仍是不同静态类型。</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        struct 既定义数据形状，也创建新的领域类型；命名字段、位置字段和零字段表达不同意图。
      </figcaption>
    </figure>
  );
}

export function RplStructUpdateLab() {
  const [replaceUsername, setReplaceUsername] = useState(false);
  const [replaceEmail, setReplaceEmail] = useState(true);

  const movedFields = useMemo(() => {
    const fields = [];
    if (!replaceUsername) fields.push("username: String (move)");
    if (!replaceEmail) fields.push("email: String (move)");
    return fields;
  }, [replaceEmail, replaceUsername]);
  const user1WholeValid = movedFields.length === 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-80 gap-5 lg:grid-cols-[1fr_1.25fr]">
          <div className="space-y-4 border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input type="checkbox" checked={replaceEmail} onChange={(event) => setReplaceEmail(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              为 user2 提供新 email
            </label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input type="checkbox" checked={replaceUsername} onChange={(event) => setReplaceUsername(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              为 user2 提供新 username
            </label>
            <p className="text-xs leading-5 text-secondary">未显式提供的字段由 `..user1` 补齐；Copy 字段复制，String 字段 move。</p>
          </div>

          <div className="grid grid-rows-[1fr_auto] gap-4">
            <pre className="overflow-x-auto border border-cyan-500/40 bg-cyan-500/10 p-4 text-xs leading-6 text-primary">
              <code>{`let user2 = User {\n${replaceEmail ? '  email: String::from("new@example.com"),\n' : ""}${replaceUsername ? '  username: String::from("grace"),\n' : ""}  ..user1\n};`}</code>
            </pre>
            <section className={`min-h-28 border p-4 ${user1WholeValid ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
              <strong className="text-sm text-primary">{user1WholeValid ? "user1 整体仍可使用" : "user1 整体发生部分 move"}</strong>
              <p className="mt-2 text-xs text-secondary">
                {movedFields.length ? `被移动：${movedFields.join("、")}。未移动字段仍可按字段规则使用。` : "String 字段都由新值替代，..user1 只复制 bool/u64 等 Copy 字段。"}
              </p>
            </section>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        struct update 使用赋值语义：未覆盖的非 Copy 字段会从旧实例 move，不能把 `..base` 当成深拷贝。
      </figcaption>
    </figure>
  );
}

type MethodMode = "area" | "can_hold" | "square";

export function RplRectangleMethodsLab() {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(50);
  const [mode, setMode] = useState<MethodMode>("area");
  const [otherWidth, setOtherWidth] = useState(20);
  const [otherHeight, setOtherHeight] = useState(40);

  const output = mode === "area"
    ? `${width * height} square pixels`
    : mode === "can_hold"
      ? String(width > otherWidth && height > otherHeight)
      : `Rectangle { width: ${width}, height: ${width} }`;
  const signature = mode === "area"
    ? "fn area(&self) -> u32"
    : mode === "can_hold"
      ? "fn can_hold(&self, other: &Self) -> bool"
      : "fn square(size: u32) -> Self";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="Rectangle 方法与关联函数">
          {(["area", "can_hold", "square"] as MethodMode[]).map((item) => (
            <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 border-r border-border px-2 font-mono text-sm last:border-r-0 ${mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="mt-5 grid min-h-[22rem] gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">width：{width}<input type="range" min="1" max="100" value={width} onChange={(event) => setWidth(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">height：{height}<input type="range" min="1" max="100" value={height} onChange={(event) => setHeight(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            {mode === "can_hold" ? (
              <div className="border-t border-border pt-4">
                <label className="block text-sm text-primary">other width：{otherWidth}<input type="range" min="1" max="100" value={otherWidth} onChange={(event) => setOtherWidth(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
                <label className="mt-3 block text-sm text-primary">other height：{otherHeight}<input type="range" min="1" max="100" value={otherHeight} onChange={(event) => setOtherHeight(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
              </div>
            ) : null}
          </div>
          <section className="min-h-80 border border-emerald-500/40 bg-emerald-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">impl Rectangle</span>
            <code className="mt-3 block break-words text-sm text-primary">{signature}</code>
            <dl className="mt-7 space-y-5 text-sm">
              <div><dt className="text-secondary">调用</dt><dd className="mt-1 font-mono text-primary">{mode === "square" ? `Rectangle::square(${width})` : mode === "area" ? "rect.area()" : "rect.can_hold(&other)"}</dd></div>
              <div><dt className="text-secondary">结果</dt><dd className="mt-1 break-words font-mono text-primary">{output}</dd></div>
              <div><dt className="text-secondary">receiver</dt><dd className="mt-1 text-primary">{mode === "square" ? "无 self，是类型命名空间下的关联函数" : "&self 只读借用实例，不取得所有权"}</dd></div>
            </dl>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        方法以 self 为第一个参数并用实例点号调用；无 self 的关联函数通过 `Type::function` 调用。
      </figcaption>
    </figure>
  );
}
