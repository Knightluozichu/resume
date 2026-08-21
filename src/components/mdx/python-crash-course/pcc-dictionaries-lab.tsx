"use client";

import { useCallback, useState } from "react";

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

// 概念领域词汇：key / value / binding / key-space / hashable / CRUD
//                / get / sentinel / view / items / keys / values
//                / nested-shape / dict-of-dicts / list-of-dicts / dict-of-lists

type CrudOp = "add" | "modify" | "remove" | "get";

const CRUD_OPS: { id: CrudOp; label: string; desc: string }[] = [
  { id: "add", label: "add", desc: "新 key 扩大 key-space；value 可为任意对象" },
  { id: "modify", label: "modify", desc: "已有 key 更新 binding，不增加 key 数" },
  { id: "remove", label: "remove", desc: "del / pop 缩小 key-space；pop 返回被删 value" },
  { id: "get", label: "get", desc: "get 只读，不修改 key-space；[] 缺失抛 KeyError" },
];

type MissingPolicy = "bracket" | "get" | "sentinel";

const MISSING_POLICIES: { id: MissingPolicy; label: string; desc: string; result: string; color: string }[] = [
  { id: "bracket", label: "d['x']", desc: "key 必须存在，缺失抛 KeyError", result: "KeyError", color: C.danger },
  { id: "get", label: "d.get('x', 0)", desc: "缺失返回 default，不写入 mapping", result: "0 (未写入)", color: C.warning },
  { id: "sentinel", label: "d.get('x', SENTINEL)", desc: "用唯一哨兵区分 missing 与 present-but-None", result: "SENTINEL (区分缺失)", color: C.success },
];

type NestedShape = "lod" | "dol" | "dod";

const NESTED_SHAPES: { id: NestedShape; label: string; desc: string; access: string; useCase: string }[] = [
  { id: "lod", label: "list of dicts", desc: "有顺序的 records", access: "users[0]['name']", useCase: "按位置遍历展示" },
  { id: "dol", label: "dict of lists", desc: "一个 field 含多个值", access: "groups['team'][0]", useCase: "按 category 分组" },
  { id: "dod", label: "dict of dicts", desc: "按 identity 查 record", access: "users['ada']['city']", useCase: "按唯一 key 查找" },
];

const VIEW_W = 860;
const VIEW_H = 384;

export function PccDictionariesLab() {
  const [mode, setMode] = useState<"crud" | "missing" | "nested">("crud");
  const [crudOp, setCrudOp] = useState<CrudOp>("add");
  const [missingSel, setMissingSel] = useState<MissingPolicy>("bracket");
  const [nestedSel, setNestedSel] = useState<NestedShape>("dod");
  const [faultOn, setFaultOn] = useState(false);

  const reset = useCallback(() => {
    setCrudOp("add");
    setMissingSel("bracket");
    setNestedSel("dod");
    setFaultOn(false);
  }, []);

  const crud = CRUD_OPS.find((c) => c.id === crudOp)!;
  const missing = MISSING_POLICIES.find((m) => m.id === missingSel)!;
  const nested = NESTED_SHAPES.find((n) => n.id === nestedSel)!;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ Dictionaries：key-space CRUD / missing-key policy / nested shape
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {(["crud", "missing", "nested"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${mode === m ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
              style={{ color: mode === m ? C.accent : C.secondary }}
            >
              {m === "crud" ? "key-space CRUD" : m === "missing" ? "missing-key policy" : "nested shape"}
            </button>
          ))}
        </div>

        {mode === "crud" ? (
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full" role="img" aria-label="dictionary key-space CRUD 操作可视化">
            <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.primary}>
              key-space CRUD：add 扩大 / modify 更新 / remove 缩小 / get 只读
            </text>
            <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize={11} fill={C.secondary}>
              方括号赋值既可 add 也可 modify，取决于 key 是否已存在
            </text>

            {/* key-space 格 */}
            <g>
              <rect x={60} y={70} width={140} height={56} rx={6} fill={C.elevated} stroke={C.border} strokeWidth={1.5} />
              <text x={130} y={96} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>"color"</text>
              <text x={130} y={114} textAnchor="middle" fontSize={11} fill={C.secondary}>"green"</text>
            </g>
            <g>
              <rect x={210} y={70} width={140} height={56} rx={6}
                fill={crudOp === "remove" ? C.border : crudOp === "modify" ? C.accent : C.elevated}
                fillOpacity={crudOp === "modify" ? 0.14 : 1}
                stroke={crudOp === "modify" || crudOp === "remove" ? C.danger : C.border}
                strokeWidth={crudOp === "modify" || crudOp === "remove" ? 2 : 1.5} />
              <text x={280} y={96} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>"points"</text>
              <text x={280} y={114} textAnchor="middle" fontSize={11}
                fill={crudOp === "modify" ? C.accent : C.secondary}>
                {crudOp === "modify" ? "10 (已更新)" : "5"}
              </text>
            </g>
            <g>
              <rect x={360} y={70} width={140} height={56} rx={6}
                fill={crudOp === "add" ? C.success : C.elevated}
                fillOpacity={crudOp === "add" ? 0.14 : 1}
                stroke={crudOp === "add" ? C.success : C.border}
                strokeWidth={crudOp === "add" ? 2 : 1.5} />
              <text x={430} y={96} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>
                {crudOp === "add" ? '"x_position"' : crudOp === "remove" ? '(已删除)' : '"x_position"'}
              </text>
              <text x={430} y={114} textAnchor="middle" fontSize={11}
                fill={crudOp === "add" ? C.success : C.secondary}>
                {crudOp === "add" ? "0 (新增)" : crudOp === "remove" ? "—" : "0"}
              </text>
            </g>
            <g>
              <rect x={510} y={70} width={140} height={56} rx={6}
                fill={crudOp === "remove" ? C.danger : C.elevated}
                fillOpacity={crudOp === "remove" ? 0.14 : 1}
                stroke={crudOp === "remove" ? C.danger : C.border}
                strokeWidth={crudOp === "remove" ? 2 : 1.5} />
              <text x={580} y={96} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>
                {crudOp === "remove" ? '"speed" (将被删)' : '"speed"'}
              </text>
              <text x={580} y={114} textAnchor="middle" fontSize={11} fill={C.secondary}>
                {crudOp === "remove" ? "—" : "\"medium\""}
              </text>
            </g>

            {/* 箭头 */}
            {crudOp === "add" && (
              <g>
                <line x1={430} y1={140} x2={430} y2={170} stroke={C.success} strokeWidth={2} markerEnd="url(#arrowS)" />
                <text x={430} y={190} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.success}>
                  alien["x_position"] = 0 → key-space 扩大
                </text>
              </g>
            )}
            {crudOp === "modify" && (
              <g>
                <line x1={280} y1={140} x2={280} y2={170} stroke={C.accent} strokeWidth={2} markerEnd="url(#arrowA)" />
                <text x={280} y={190} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.accent}>
                  alien["points"] = 10 → binding 更新
                </text>
              </g>
            )}
            {crudOp === "remove" && (
              <g>
                <line x1={580} y1={140} x2={580} y2={170} stroke={C.danger} strokeWidth={2} markerEnd="url(#arrowD)" />
                <text x={580} y={190} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.danger}>
                  del alien["speed"] → key-space 缩小
                </text>
              </g>
            )}
            {crudOp === "get" && (
              <g>
                <line x1={345} y1={98} x2={385} y2={98} stroke={C.secondary} strokeWidth={2} strokeDasharray="4 2" />
                <text x={365} y={86} textAnchor="middle" fontSize={11} fill={C.secondary}>get / [] 读取</text>
                <text x={365} y={130} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.secondary}>
                  只读操作，key-space 不变
                </text>
              </g>
            )}

            <defs>
              <marker id="arrowS" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={C.success} />
              </marker>
              <marker id="arrowA" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={C.accent} />
              </marker>
              <marker id="arrowD" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={C.danger} />
              </marker>
            </defs>

            {/* 信息面板 */}
            <rect x={60} y={220} width={740} height={100} rx={8} fill={C.bg} stroke={C.border} />
            <text x={VIEW_W / 2} y={252} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.primary}>
              {crudOp === "add" && "add：新 key → 新 binding → key-space 扩大"}
              {crudOp === "modify" && "modify：已有 key → 更新 value → key-space 不变"}
              {crudOp === "remove" && "remove：del / pop → key-space 缩小；pop 返回被删 value"}
              {crudOp === "get" && "get：只读查询；[] 缺失抛 KeyError，get 返回 default"}
            </text>
            <text x={VIEW_W / 2} y={278} textAnchor="middle" fontSize={11} fill={C.secondary}>
              {crudOp === "add" && "再次给同一 key 赋值不会增加第二个同名 key，而是替换 value"}
              {crudOp === "modify" && "value 可以是 list、dict 或 class instance；多个 key 可引用同一 mutable 对象"}
              {crudOp === "remove" && "先决定调用方是否需要被删 value，再选 del 或 pop"}
              {crudOp === "get" && "先决定 missing key 策略：必填用 []，可选用 get，三态用 sentinel"}
            </text>
            <text x={VIEW_W / 2} y={302} textAnchor="middle" fontSize={11} fill={C.danger}>
              {faultOn && crudOp === "add" && "故障：用 list 做 key → TypeError: unhashable type"}
              {faultOn && crudOp === "modify" && "故障：直接改 value 的 mutable 对象影响所有引用路径"}
              {faultOn && crudOp === "remove" && "故障：遍历中删除 key → RuntimeError: dict changed size"}
              {faultOn && crudOp === "get" && "故障：get(key, []) 后 append 不写入 → 应显式赋值或 defaultdict"}
            </text>
          </svg>
        ) : mode === "missing" ? (
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full" role="img" aria-label="missing-key policy 对比可视化">
            <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.primary}>
              missing-key policy：必填报错 vs 可选默认 vs 哨兵区分
            </text>
            <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize={11} fill={C.secondary}>
              边界层先验证 required keys，核心逻辑再假定 invariant
            </text>

            {/* 三条路径 */}
            <g>
              <rect x={60} y={70} width={230} height={56} rx={6}
                fill={missingSel === "bracket" ? C.danger : C.elevated}
                fillOpacity={missingSel === "bracket" ? 0.14 : 1}
                stroke={missingSel === "bracket" ? C.danger : C.border}
                strokeWidth={missingSel === "bracket" ? 2 : 1.5} />
              <text x={175} y={96} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>d["points"]</text>
              <text x={175} y={114} textAnchor="middle" fontSize={11} fill={C.secondary}>必填字段</text>
            </g>
            <g>
              <rect x={315} y={70} width={230} height={56} rx={6}
                fill={missingSel === "get" ? C.warning : C.elevated}
                fillOpacity={missingSel === "get" ? 0.14 : 1}
                stroke={missingSel === "get" ? C.warning : C.border}
                strokeWidth={missingSel === "get" ? 2 : 1.5} />
              <text x={430} y={96} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>d.get("speed", "medium")</text>
              <text x={430} y={114} textAnchor="middle" fontSize={11} fill={C.secondary}>可选字段</text>
            </g>
            <g>
              <rect x={570} y={70} width={230} height={56} rx={6}
                fill={missingSel === "sentinel" ? C.success : C.elevated}
                fillOpacity={missingSel === "sentinel" ? 0.14 : 1}
                stroke={missingSel === "sentinel" ? C.success : C.border}
                strokeWidth={missingSel === "sentinel" ? 2 : 1.5} />
              <text x={685} y={96} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>d.get("tz", SENTINEL)</text>
              <text x={685} y={114} textAnchor="middle" fontSize={11} fill={C.secondary}>三态区分</text>
            </g>

            {/* 结果区 */}
            <rect x={60} y={150} width={740} height={80} rx={8} fill={C.bg} stroke={C.border} />
            <text x={VIEW_W / 2} y={180} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.primary}>
              key "points" 不存在时 →{" "}
              <tspan fill={missing.color}>{missing.result}</tspan>
            </text>
            <text x={VIEW_W / 2} y={206} textAnchor="middle" fontSize={12} fill={C.secondary}>
              {missing.desc}
            </text>

            {/* 决策树 */}
            <text x={80} y={260} fontSize={12} fontWeight={700} fill={C.secondary}>决策路径</text>
            <line x1={80} y1={270} x2={80} y2={350} stroke={C.border} strokeWidth={1.5} />
            <circle cx={80} cy={290} r={5} fill={C.danger} />
            <text x={100} y={294} fontSize={11} fill={C.primary}>字段是必填？→ 用 d["key"]（KeyError 可见）</text>
            <circle cx={80} cy={320} r={5} fill={C.warning} />
            <text x={100} y={324} fontSize={11} fill={C.primary}>字段是可选？→ 用 d.get(key, default)（不写入）</text>
            <circle cx={80} cy={350} r={5} fill={C.success} />
            <text x={100} y={354} fontSize={11} fill={C.primary}>需区分 missing / None？→ 用 sentinel 对象</text>

            {faultOn && (
              <text x={VIEW_W / 2} y={375} textAnchor="middle" fontSize={11} fill={C.danger}>
                故障：所有读取都用空字符串/0 默认 → 数据损坏在更远处暴露
              </text>
            )}
          </svg>
        ) : (
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full" role="img" aria-label="nested data shape 分层结构可视化">
            <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.primary}>
              nested shape：每层 container 表达一种关系
            </text>
            <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize={11} fill={C.secondary}>
              从访问问题出发：按位置遍历？按 ID 读取？字段是否多值？
            </text>

            {/* 三种 shape */}
            {nestedSel === "lod" && (
              <g>
                {/* list of dicts */}
                <text x={120} y={80} fontSize={12} fontWeight={700} fill={C.secondary}>list</text>
                <rect x={60} y={90} width={80} height={200} rx={6} fill={C.elevated} stroke={C.border} strokeWidth={1.5} />
                <text x={100} y={110} textAnchor="middle" fontSize={11} fill={C.secondary}>0</text>
                <rect x={70} y={120} width={60} height={50} rx={4} fill={C.bg} stroke={C.border} />
                <text x={100} y={142} textAnchor="middle" fontSize={10} fill={C.primary}>name: Ada</text>
                <text x={100} y={158} textAnchor="middle" fontSize={10} fill={C.primary}>city: London</text>

                <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.secondary}>1</text>
                <rect x={70} y={195} width={60} height={50} rx={4} fill={C.bg} stroke={C.border} />
                <text x={100} y={217} textAnchor="middle" fontSize={10} fill={C.primary}>name: Grace</text>
                <text x={100} y={233} textAnchor="middle" fontSize={10} fill={C.primary}>city: NYC</text>

                <text x={100} y={260} textAnchor="middle" fontSize={11} fill={C.secondary}>2</text>
                <rect x={70} y={270} width={60} height={20} rx={4} fill={C.border} opacity={0.3} />
                <text x={100} y={284} textAnchor="middle" fontSize={10} fill={C.secondary}>...</text>

                {/* 访问路径 */}
                <line x1={140} y1={145} x2={220} y2={145} stroke={C.accent} strokeWidth={2} />
                <text x={240} y={150} fontSize={12} fill={C.accent}>users[0]["name"] → "Ada"</text>
                <text x={240} y={170} fontSize={11} fill={C.secondary}>按位置遍历；有插入顺序</text>
              </g>
            )}

            {nestedSel === "dol" && (
              <g>
                {/* dict of lists */}
                <text x={120} y={80} fontSize={12} fontWeight={700} fill={C.secondary}>dict</text>
                <rect x={60} y={90} width={200} height={120} rx={6} fill={C.elevated} stroke={C.border} strokeWidth={1.5} />
                <text x={100} y={112} textAnchor="middle" fontSize={11} fill={C.primary}>"team"</text>
                <rect x={70} y={120} width={160} height={30} rx={4} fill={C.bg} stroke={C.border} />
                <text x={150} y={140} textAnchor="middle" fontSize={11} fill={C.secondary}>["ada", "grace"]</text>

                <text x={100} y={172} textAnchor="middle" fontSize={11} fill={C.primary}>"guest"</text>
                <rect x={70} y={180} width={160} height={20} rx={4} fill={C.bg} stroke={C.border} />
                <text x={150} y={194} textAnchor="middle" fontSize={11} fill={C.secondary}>["guido"]</text>

                {/* 访问路径 */}
                <line x1={160} y1={135} x2={300} y2={135} stroke={C.accent} strokeWidth={2} />
                <text x={320} y={140} fontSize={12} fill={C.accent}>groups["team"][0] → "ada"</text>
                <text x={320} y={160} fontSize={11} fill={C.secondary}>按 category 分组；一个 field 多值</text>
              </g>
            )}

            {nestedSel === "dod" && (
              <g>
                {/* dict of dicts */}
                <text x={120} y={80} fontSize={12} fontWeight={700} fill={C.secondary}>dict (identity)</text>
                <rect x={60} y={90} width={200} height={120} rx={6} fill={C.elevated} stroke={C.border} strokeWidth={1.5} />
                <text x={100} y={112} textAnchor="middle" fontSize={11} fill={C.primary}>"ada"</text>
                <rect x={70} y={120} width={80} height={50} rx={4} fill={C.bg} stroke={C.border} />
                <text x={110} y={140} textAnchor="middle" fontSize={10} fill={C.primary}>first: ada</text>
                <text x={110} y={156} textAnchor="middle" fontSize={10} fill={C.primary}>city: London</text>

                <text x={170} y={112} textAnchor="middle" fontSize={11} fill={C.primary}>"grace"</text>
                <rect x={150} y={120} width={80} height={50} rx={4} fill={C.bg} stroke={C.border} />
                <text x={190} y={140} textAnchor="middle" fontSize={10} fill={C.primary}>first: grace</text>
                <text x={190} y={156} textAnchor="middle" fontSize={10} fill={C.primary}>city: NYC</text>

                {/* 访问路径 */}
                <line x1={160} y1={145} x2={300} y2={145} stroke={C.accent} strokeWidth={2} />
                <text x={320} y={140} fontSize={12} fill={C.accent}>users["ada"]["city"] → "London"</text>
                <text x={320} y={160} fontSize={11} fill={C.secondary}>按唯一 key 查找；外层 identity，内层 fields</text>
              </g>
            )}

            {/* 使用场景对比 */}
            <rect x={60} y={230} width={740} height={110} rx={8} fill={C.bg} stroke={C.border} />
            <text x={VIEW_W / 2} y={256} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.primary}>
              {nested.label}：{nested.desc}
            </text>
            <text x={VIEW_W / 2} y={280} textAnchor="middle" fontSize={12} fill={C.secondary}>
              典型访问：{nested.access}
            </text>
            <text x={VIEW_W / 2} y={304} textAnchor="middle" fontSize={11} fill={C.secondary}>
              适用场景：{nested.useCase}
            </text>
            <text x={VIEW_W / 2} y={328} textAnchor="middle" fontSize={11} fill={C.danger}>
              {faultOn ? "故障：三层以上混合 container 让访问路径和错误处理迅速复杂；先写 schema 说明" : ""}
            </text>
          </svg>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {mode === "crud"
            ? CRUD_OPS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCrudOp(c.id)}
                  className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${crudOp === c.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                  style={{ color: crudOp === c.id ? C.accent : C.secondary }}
                >
                  {c.label}
                </button>
              ))
            : mode === "missing"
              ? MISSING_POLICIES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMissingSel(m.id)}
                    className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${missingSel === m.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                    style={{ color: missingSel === m.id ? C.accent : C.secondary }}
                  >
                    {m.label}
                  </button>
                ))
              : NESTED_SHAPES.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setNestedSel(n.id)}
                    className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${nestedSel === n.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                    style={{ color: nestedSel === n.id ? C.accent : C.secondary }}
                  >
                    {n.label}
                  </button>
                ))}
        </div>

        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs font-semibold" style={{ color: C.primary }}>
            {mode === "crud" && `CRUD：${crud.label}`}
            {mode === "missing" && `missing policy：${missing.label}`}
            {mode === "nested" && `nested shape：${nested.label}`}
          </div>
          <div className="mt-1 text-xs leading-relaxed" style={{ color: C.secondary }}>
            {mode === "crud" && crud.desc}
            {mode === "missing" && missing.desc}
            {mode === "nested" && `${nested.desc}；访问路径 ${nested.access}；${nested.useCase}`}
          </div>
          {faultOn && (
            <div className="mt-2 text-xs leading-relaxed" style={{ color: C.danger }}>
              {mode === "crud" &&
                (crudOp === "add"
                  ? "故障：用 list 做 key → TypeError: unhashable type"
                  : crudOp === "modify"
                    ? "故障：直接改 value 的 mutable 对象影响所有引用路径"
                    : crudOp === "remove"
                      ? "故障：遍历中删除 key → RuntimeError: dict changed size"
                      : "故障：get(key, []) 后 append 不写入 → 应显式赋值")}
              {mode === "missing" && "故障：所有读取都用空字符串/0 默认 → 数据损坏在更远处暴露"}
              {mode === "nested" && "故障：三层以上混合 container 让访问路径和错误处理迅速复杂"}
            </div>
          )}
        </div>

        <label className="mt-3 flex cursor-pointer items-center gap-2 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <input type="checkbox" checked={faultOn} onChange={(e) => setFaultOn(e.target.checked)} className="h-4 w-4 cursor-pointer" />
          <span className="text-xs" style={{ color: faultOn ? C.danger : C.secondary }}>
            注入故障：unhashable key / mutable alias / 遍历中删除 / 默认掩盖损坏
          </span>
        </label>
      </div>
    </div>
  );
}
