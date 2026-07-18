"use client";

import { useState } from "react";

type CleanupMode = "manual" | "goto" | "raii";

export function CseRaiiCleanupLab() {
  const [mode, setMode] = useState<CleanupMode>("raii");
  const [failureAt, setFailureAt] = useState(2);
  const resources = ["socket", "buffer", "file"];
  const acquired = resources.slice(0, failureAt);
  const released = mode === "raii" ? [...acquired].reverse() : mode === "goto" ? [...acquired].reverse() : acquired.slice(0, Math.max(0, acquired.length - 1)).reverse();
  const leaked = acquired.filter((resource) => !released.includes(resource));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[27rem] gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div>
              <span className="text-xs text-secondary">cleanup strategy</span>
              <div className="mt-2 grid grid-cols-3 border border-border" role="group" aria-label="cleanup strategy">
                {(["manual", "goto", "raii"] as const).map((item, index) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${mode === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}
              </div>
            </div>
            <label className="block text-sm text-primary">failure after acquire step：{failureAt}<input type="range" min="1" max="3" value={failureAt} onChange={(event) => setFailureAt(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <code className="block min-h-40 whitespace-pre-wrap border border-border bg-elevated p-3 text-xs leading-6 text-primary">{mode === "raii" ? `Socket socket(...);\nBuffer buffer(...);\nFile file(...);\nwork(); // throw or return\n// destructors run in reverse order` : mode === "goto" ? `socket = open_socket();\nbuffer = alloc_buffer();\nfile = open_file();\nif (error) goto cleanup;\ncleanup: close(file); free(buffer); close(socket);` : `auto socket = open_socket();\nauto buffer = alloc_buffer();\nif (error) return; // one branch forgets socket\nauto file = open_file();\n// every exit path duplicates cleanup`}</code>
          </section>
          <section className={`border p-4 ${leaked.length === 0 ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">failure path simulation</span>
            <h3 className="mt-3 text-base font-semibold text-primary">{leaked.length === 0 ? "已取得资源全部按逆序释放" : `泄漏：${leaked.join(", ")}`}</h3>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
              {resources.map((resource, index) => {
                const owned = index < failureAt;
                const cleaned = released.includes(resource);
                return <div key={resource} className={`min-h-24 border p-3 ${!owned ? "border-border bg-bg text-secondary" : cleaned ? "border-emerald-500/40 bg-bg text-primary" : "border-rose-500/50 bg-rose-500/10 text-rose-300"}`}><span className="block text-sm font-semibold">{resource}</span><span className="mt-3 block">{!owned ? "not acquired" : cleaned ? "destructor / cleanup" : "still owned"}</span></div>;
              })}
            </div>
            <div className="mt-5 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{mode === "raii" ? "ownership 进入 stack object；normal return、early return 与 exception unwinding 都走同一 destructor path。" : mode === "goto" ? "集中 cleanup 比复制多条分支更可靠，但资源与 lifetime 仍靠人工 label/order 对齐，无法组合进 object invariant。" : "每增加一个 resource 或 exit path，手工 cleanup 组合数增长；遗漏只在特定 failure branch 暴露。"}</div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">RAII 的关键不是“自动 delete”，而是让 resource ownership 与 object lifetime 成为同一个可组合 contract。</figcaption>
    </figure>
  );
}

type FeatureCase = "override" | "init" | "range" | "binding" | "emplace";

const FEATURE_CASES: Record<FeatureCase, { label: string; old: string; modern: string; proof: string; standard: string }> = {
  override: { label: "虚函数覆写", old: "void onData(int);", modern: "void onData(int) override;", proof: "signature 不匹配时编译失败，避免静默创建新 virtual function", standard: "C++11" },
  init: { label: "成员初始化", old: "Session() : retries_(3) {}", modern: "int retries_{3};\nSession() = default;", proof: "default member value 在所有 constructors 复用；initializer_list 仍需留意重载优先级", standard: "C++11" },
  range: { label: "范围循环", old: "for (It it = xs.begin(); it != xs.end(); ++it)", modern: "for (const auto& value : xs)", proof: "begin/end 协议驱动；是否用引用决定复制与 mutation", standard: "C++11" },
  binding: { label: "结构化绑定", old: "auto item = *map.begin();\nauto key = item.first;", modern: "auto& [key, value] = *map.begin();", proof: "binding 的 auto/const/reference 修饰决定 copy 还是 alias", standard: "C++17" },
  emplace: { label: "原位构造", old: "items.insert({key, Value(args)});", modern: "items.try_emplace(key, args);", proof: "key 已存在时避免构造 mapped value；insert_or_assign 则明确覆盖", standard: "C++17" },
};

export function CseModernFeatureContractLab() {
  const [selected, setSelected] = useState<FeatureCase>("override");
  const info = FEATURE_CASES[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-5" role="group" aria-label="现代 C++ 特性案例">
          {(Object.keys(FEATURE_CASES) as FeatureCase[]).map((key, index) => <button key={key} type="button" aria-pressed={selected === key} onClick={() => setSelected(key)} className={`min-h-12 border-b border-r border-border px-2 text-xs last:border-r-0 sm:border-b-0 ${selected === key ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{FEATURE_CASES[key].label}</button>)}
        </div>
        <div className="mt-4 grid min-h-[23rem] gap-4 lg:grid-cols-2">
          <section className="border border-border bg-bg p-4"><span className="text-xs text-secondary">implicit / legacy expression</span><code className="mt-4 block min-h-32 whitespace-pre-wrap border border-border bg-elevated p-3 text-xs leading-6 text-primary">{info.old}</code><p className="mt-4 text-sm leading-7 text-secondary">旧写法不一定错误，但 intent 可能分散在 constructor、iterator type、temporary 或 virtual hierarchy 中，reviewer 需要人工恢复 contract。</p></section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">{info.standard} explicit contract</span><code className="mt-4 block min-h-32 whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{info.modern}</code><h3 className="mt-4 text-base font-semibold text-primary">{info.proof}</h3><p className="mt-4 text-sm leading-7 text-secondary">现代语法的价值是把 intent 交给 compiler 验证；若只是缩短代码却改变 lifetime、copy 或 overload selection，就必须先解释新语义。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">final/override/default/delete、auto、range-for、structured binding 与 emplace 都是 contract 工具，不是统一替换旧语法的格式规则。</figcaption>
    </figure>
  );
}

type PointerMode = "unique" | "shared" | "weak" | "self";

export function CseSmartPointerOwnershipLab() {
  const [mode, setMode] = useState<PointerMode>("unique");
  const [cycle, setCycle] = useState(false);
  const [managed, setManaged] = useState(true);
  const strongEdges = mode === "unique" ? 1 : mode === "weak" ? 1 : mode === "self" ? (managed ? 2 : 0) : 2;
  const cycleLeaks = cycle && mode === "shared";
  const safe = mode !== "self" || managed;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[27rem] gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div className="grid grid-cols-2 border border-border" role="group" aria-label="smart pointer ownership">
              {(["unique", "shared", "weak", "self"] as const).map((item, index) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 text-sm ${(index % 2) === 0 ? "border-r border-border" : ""} ${index < 2 ? "border-b border-border" : ""} ${mode === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item === "self" ? "shared_from_this" : `${item}_ptr`}</button>)}
            </div>
            <label className={`flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary ${mode !== "shared" && mode !== "weak" ? "opacity-50" : ""}`}><input type="checkbox" checked={cycle} disabled={mode !== "shared" && mode !== "weak"} onChange={(event) => setCycle(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />parent/child 存在反向 edge</label>
            <label className={`flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary ${mode !== "self" ? "opacity-50" : ""}`}><input type="checkbox" checked={managed} disabled={mode !== "self"} onChange={(event) => setManaged(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />对象最初由 shared_ptr control block 管理</label>
            <code className="block whitespace-pre-wrap border border-border bg-elevated p-3 text-xs leading-6 text-primary">{mode === "unique" ? "auto owner = std::make_unique<Session>();\nauto next = std::move(owner);" : mode === "shared" ? "auto owner = std::make_shared<Node>();\nauto second = owner;" : mode === "weak" ? "std::weak_ptr<Node> parent = owner;\nif (auto live = parent.lock()) { use(*live); }" : "struct Session : std::enable_shared_from_this<Session> {\n  auto self() { return shared_from_this(); }\n};"}</code>
          </section>
          <section className={`border p-4 ${safe && !cycleLeaks ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">control block / owner graph</span>
            <h3 className="mt-3 text-base font-semibold text-primary">{!safe ? "shared_from_this 没有 control block：抛 bad_weak_ptr / 未定义用法" : cycleLeaks ? "双向 strong cycle：strong_count 永不归零" : mode === "weak" && cycle ? "反向 weak edge 不拥有 parent，可正常释放" : `${strongEdges} 条 strong owner edge`}</h3>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center text-sm"><div className="min-h-24 border border-border bg-bg p-3 text-primary">owner A<br /><span className="text-xs text-secondary">{mode === "weak" ? "strong" : mode}</span></div><span className="text-secondary">{cycle ? "<->" : "->"}</span><div className={`min-h-24 border p-3 text-primary ${cycleLeaks ? "border-rose-500/50 bg-rose-500/10" : "border-border bg-bg"}`}>object/control block<br /><span className="text-xs text-secondary">strong={strongEdges}</span></div></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">exclusive</span><strong className="mt-2 block text-sm text-primary">{mode === "unique" ? "yes" : "no"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">ownership cost</span><strong className="mt-2 block text-sm text-primary">{mode === "shared" || mode === "self" ? "atomic count" : mode === "weak" ? "weak count" : "pointer only"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">expiry check</span><strong className="mt-2 block text-sm text-primary">{mode === "weak" ? "lock()" : "not needed"}</strong></div></div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">优先 unique ownership；只有真实 shared lifetime 才引入 control block，用 weak_ptr 表达不拥有的反向观察。</figcaption>
    </figure>
  );
}
