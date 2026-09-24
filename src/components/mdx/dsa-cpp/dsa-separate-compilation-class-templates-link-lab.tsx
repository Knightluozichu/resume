"use client";

import { useId, useState } from "react";

export type TemplateMode = "hidden" | "included" | "explicit";
export type CellType = "int" | "double";
export type TemplateLinkState = Readonly<{
  mode: TemplateMode;
  requestedType: CellType;
  supportDouble: boolean;
  omitImplementation: boolean;
}>;
export const INITIAL_TEMPLATE_LINK_STATE: TemplateLinkState = {
  mode: "hidden",
  requestedType: "int",
  supportDouble: false,
  omitImplementation: false,
};
const members = ["C", "R", "W"] as const;
type Member = (typeof members)[number];
type Owner = "main.o" | "peer.o" | "Cell.o";
type SymbolDefinition = { owner: Owner; type: CellType; member: Member };
const symbolKey = (type: CellType, member: Member) => `${type}:${member}`;

/** Finite teaching model, NOT a C++ parser, compiler, ABI or object-file emulator. */
export function modelTemplateLink(state: TemplateLinkState) {
  const units = (["main.o", "peer.o", "Cell.o"] as const).map((owner) => {
    const implementation = owner === "Cell.o";
    const definitionsVisible = implementation || state.mode === "included";
    const implicitRequests: CellType[] = implementation
      ? []
      : [state.requestedType];
    const explicitRequests: CellType[] =
      implementation && state.mode === "explicit"
        ? state.supportDouble
          ? ["int", "double"]
          : ["int"]
        : [];
    // Cell.h declares extern template for int in explicit mode only.
    const externSuppressed = !implementation && state.mode === "explicit";
    const implicitTypes = definitionsVisible
      ? implicitRequests.filter((type) => !(externSuppressed && type === "int"))
      : [];
    const instantiatedTypes = [
      ...new Set([...implicitTypes, ...explicitRequests]),
    ];
    const definitions: SymbolDefinition[] = instantiatedTypes.flatMap((type) =>
      members.map((member) => ({ owner, type, member })),
    );
    return {
      owner,
      definitionsVisible,
      implicitRequests,
      explicitRequests,
      definitions,
      linked: !(implementation && state.omitImplementation),
    };
  });
  const available = units
    .filter((unit) => unit.linked)
    .flatMap((unit) => unit.definitions);
  const requirements = (["main.o", "peer.o"] as const).flatMap((caller) =>
    members.map((member) => {
      const key = symbolKey(state.requestedType, member);
      const providers = available.filter(
        (definition) => symbolKey(definition.type, definition.member) === key,
      );
      return { caller, member, key, providers, resolved: providers.length > 0 };
    }),
  );
  return {
    units,
    requirements,
    available,
    unresolvedCount: requirements.filter((requirement) => !requirement.resolved)
      .length,
    linkable: requirements.every((requirement) => requirement.resolved),
  };
}

const C = {
  bg: "var(--bg)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const controlClass =
  "min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-accent";

export function DsaSeparateCompilationClassTemplatesLinkLab() {
  const [state, setState] = useState<TemplateLinkState>(
    INITIAL_TEMPLATE_LINK_STATE,
  );
  const id = useId();
  const result = modelTemplateLink(state);
  return (
    <section
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3"
      aria-label="类模板跨翻译单元链接实验"
    >
      <h3 className="text-lg font-semibold text-primary">
        谁能生成，谁来提供？
      </h3>
      <p className="mt-2 text-sm text-secondary">
        有界教学模型，不是真实编译器。仅跟踪 Cell 的 C 构造、R read、W
        write；忽略优化、符号改名及平台合并细节。真实 clang++ 实验见正文。
      </p>
      <div className="my-4 grid min-w-0 gap-3">
        <label className="min-w-0 text-sm text-primary" htmlFor={`${id}-mode`}>
          定义安排
          <select
            id={`${id}-mode`}
            className={controlClass}
            value={state.mode}
            onChange={(event) =>
              setState({ ...state, mode: event.target.value as TemplateMode })
            }
          >
            <option value="hidden">声明头 + 实现 .cpp</option>
            <option value="included">头文件包含 .tpp</option>
            <option value="explicit">.cpp 显式实例化</option>
          </select>
        </label>
        <label className="min-w-0 text-sm text-primary" htmlFor={`${id}-type`}>
          两个调用方请求类型
          <select
            id={`${id}-type`}
            className={controlClass}
            value={state.requestedType}
            onChange={(event) =>
              setState({
                ...state,
                requestedType: event.target.value as CellType,
              })
            }
          >
            <option value="int">int</option>
            <option value="double">double</option>
          </select>
        </label>
        <label
          className="min-w-0 text-sm text-primary"
          htmlFor={`${id}-support`}
        >
          显式实例化清单（仅显式模式）
          <select
            id={`${id}-support`}
            className={`${controlClass} disabled:opacity-60`}
            disabled={state.mode !== "explicit"}
            value={state.supportDouble ? "both" : "int"}
            onChange={(event) =>
              setState({
                ...state,
                supportDouble: event.target.value === "both",
              })
            }
          >
            <option value="int">只生成 int</option>
            <option value="both">生成 int 与 double</option>
          </select>
        </label>
        <button
          type="button"
          className={controlClass}
          aria-pressed={state.omitImplementation}
          onClick={() =>
            setState({
              ...state,
              omitImplementation: !state.omitImplementation,
            })
          }
        >
          故障：
          {state.omitImplementation ? "已漏链 Cell.o" : "漏链 Cell.o（关闭）"}
        </button>
        <button
          type="button"
          className={controlClass}
          onClick={() => setState({ ...INITIAL_TEMPLATE_LINK_STATE })}
        >
          重置
        </button>
      </div>
      <div className="grid min-w-0 gap-4">
        <svg
          viewBox="0 0 330 530"
          className="mx-auto block w-full max-w-[380px]"
          role="img"
          aria-label="三个翻译单元中的模板定义可见性与具体成员生成关系"
          fontSize="16"
        >
          <title>翻译单元：菱形是定义，圆点是具体成员</title>
          <text x="12" y="24" fill={C.primary}>
            ① 定义 + 类型 → 具体成员
          </text>
          {result.units.map((unit, index) => {
            const y = 48 + index * 152;
            const generated = unit.definitions.length > 0;
            return (
              <g
                key={unit.owner}
                data-unit={unit.owner}
                data-linked={unit.linked}
              >
                <path
                  d={`M 20 ${y + 24} H 10 V ${y + 130} H 20`}
                  fill="none"
                  stroke={C.border}
                  strokeWidth="2"
                />
                <text x="24" y={y + 17} fill={C.primary}>
                  {unit.owner.replace(".o", ".cpp")}
                </text>
                <text
                  x="167"
                  y={y + 17}
                  fill={unit.linked ? C.secondary : C.danger}
                >
                  {unit.linked ? "参与链接" : "不参与链接"}
                </text>
                <path
                  d={`M 60 ${y + 36} L 86 ${y + 62} L 60 ${y + 88} L 34 ${y + 62} Z`}
                  fill={C.bg}
                  stroke={unit.definitionsVisible ? C.accent : C.border}
                  strokeWidth="2"
                  strokeDasharray={unit.definitionsVisible ? "none" : "4 4"}
                />
                <text x="60" y={y + 68} textAnchor="middle" fill={C.primary}>
                  {unit.definitionsVisible ? "有" : "无"}
                </text>
                <text x="26" y={y + 113} fill={C.secondary}>
                  成员定义
                </text>
                {members.map((member, memberIndex) => {
                  const x = 206 + memberIndex * 44;
                  return (
                    <g key={member}>
                      {generated ? (
                        <path
                          d={`M 87 ${y + 62} Q 150 ${y + 28} ${x} ${y + 62}`}
                          fill="none"
                          stroke={C.accent}
                          strokeWidth="2"
                        />
                      ) : null}
                      <circle
                        cx={x}
                        cy={y + 62}
                        r="16"
                        fill={C.bg}
                        stroke={generated ? C.accent : C.border}
                        strokeWidth="2"
                        strokeDasharray={generated ? "none" : "3 3"}
                      />
                      <text
                        x={x}
                        y={y + 68}
                        textAnchor="middle"
                        fill={generated ? C.primary : C.secondary}
                      >
                        {member}
                      </text>
                    </g>
                  );
                })}
                <text x="120" y={y + 113} fill={C.secondary}>
                  {unit.explicitRequests.length
                    ? `指令：${unit.explicitRequests.join(" / ")}`
                    : unit.implicitRequests.length
                      ? `请求：${state.requestedType}`
                      : "无具体类型请求"}
                </text>
              </g>
            );
          })}
          <text x="12" y="522" fill={C.secondary}>
            实线圆：已生成；虚线圆：未生成
          </text>
        </svg>
        <svg
          viewBox="0 0 330 530"
          className="mx-auto block w-full max-w-[380px]"
          role="img"
          aria-label={`请求 ${state.requestedType}，六条成员调用依赖中 ${result.unresolvedCount} 条未解析`}
          fontSize="16"
        >
          <title>{`链接解析：${state.requestedType} 的六条调用依赖`}</title>
          <text x="12" y="24" fill={C.primary}>
            ② 匹配具体类型与成员
          </text>
          <text x="12" y="53" fill={C.secondary}>
            调用方：{state.requestedType}
          </text>
          <text x="218" y="53" fill={C.secondary}>
            定义提供方
          </text>
          {members.map((member, index) => {
            const y = 102 + index * 133;
            const calls = result.requirements.filter(
              (requirement) => requirement.member === member,
            );
            const provider = calls[0].providers[0];
            return (
              <g
                key={member}
                data-member={member}
                data-resolved={Boolean(provider)}
              >
                {calls.map((call, callerIndex) => {
                  const cy = y + callerIndex * 46;
                  return (
                    <g key={call.caller}>
                      <circle
                        cx="35"
                        cy={cy}
                        r="15"
                        fill={C.bg}
                        stroke={C.primary}
                      />
                      <text
                        x="35"
                        y={cy + 6}
                        textAnchor="middle"
                        fill={C.primary}
                      >
                        {member}
                      </text>
                      <text x="57" y={cy + 6} fill={C.secondary}>
                        {callerIndex === 0 ? "main" : "peer"}
                      </text>
                      <path
                        data-edge={`${call.caller}:${call.key}`}
                        d={`M 104 ${cy} Q 155 ${cy} ${call.resolved ? 244 : 194} ${y + 23}`}
                        stroke={call.resolved ? C.accent : C.danger}
                        strokeWidth="2"
                        strokeDasharray={call.resolved ? "none" : "5 5"}
                        fill="none"
                      />
                    </g>
                  );
                })}
                {!provider ? (
                  <path
                    d={`M 194 ${y + 15} l 16 16 m 0 -16 l -16 16`}
                    stroke={C.danger}
                    strokeWidth="2"
                  />
                ) : null}
                <circle
                  cx="263"
                  cy={y + 23}
                  r="19"
                  fill={C.bg}
                  stroke={provider ? C.accent : C.border}
                  strokeWidth="2"
                  strokeDasharray={provider ? "none" : "4 4"}
                />
                <text x="263" y={y + 29} textAnchor="middle" fill={C.primary}>
                  {member}
                </text>
                <text
                  x="263"
                  y={y + 69}
                  textAnchor="middle"
                  fill={provider ? C.primary : C.danger}
                >
                  {provider?.owner ?? "缺定义"}
                </text>
                <text
                  x="12"
                  y={y + 99}
                  fill={C.secondary}
                >{`Cell<${state.requestedType}>::${member === "C" ? "Cell" : member === "R" ? "read" : "write"}`}</text>
              </g>
            );
          })}
          <text x="12" y="514" fill={C.secondary}>
            实线：可解析；断线 ×：无法解析
          </text>
        </svg>
      </div>
      <p className="mt-3 text-sm text-primary" role="status" aria-live="polite">
        {result.linkable
          ? "模型：6 / 6 条依赖可解析。"
          : `模型：${result.unresolvedCount} / 6 条依赖未解析。`}
        当前参与链接的具体类型：
        {[
          ...new Set(result.available.map((definition) => definition.type)),
        ].join("、") || "无"}
        。
      </p>
      <p className="mt-2 text-sm text-secondary">
        包含模式下 main.o 与 peer.o
        都可提供成员，图②只画一个匹配提供方；这不是平台实际符号选取规则。图①被漏链的
        Cell.o 仍可能已生成成员，但不能进入图②的候选集。
      </p>
    </section>
  );
}
