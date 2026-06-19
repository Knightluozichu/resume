"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <ToolSchemaAnatomy>：拆解一个工具 JSON Schema 各字段的交互演示（HEL-298，
 * 《工具调用 Tool Calling》篇2·2，知识点 1）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。工具定义（schema）就是给小特的一份「工具说明书」。
 * 这个 Demo 把一个真实的 weather 工具 schema 摊给你看（示意格式），点字段标签把对应那段 JSON
 * 高亮，并旁注「这个字段告诉 LLM 什么」：
 *   - name：调它用啥名（LLM 产出 tool_call 时填这个名字）
 *   - description：啥时候该用它 —— LLM **靠这句话判断要不要调、什么时候调**
 *   - parameters：要传哪些参数、各是什么类型（也用 description 解释每个参数）
 *   - required：哪些参数必填
 *
 * 关键教学点（本 Demo 的灵魂）：**description 写得好不好，直接决定 LLM 会不会、会不会正确地
 * 调用这个工具**——这是初学者最容易忽视的一处（以为 description 可有可无）。
 *
 * 诚实声明：展示的 schema 文本为「按格式预写的示意」，不是实时调用模型。必有重置（回到
 * 「全览」无高亮态）。
 *
 * 为何 client：字段标签按钮是真交互（受控状态），用状态直接高亮对应行——这是「拆解 schema
 * 各字段」在「没法在线跑 LLM」约束下的落地（参考 ReActStepAnatomy 的 curated 范式）。
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

type Field = "name" | "description" | "parameters" | "required";

type SchemaLine = {
  /** 这一行属于哪个字段（点标签时据此高亮）。 */
  field: Field | null;
  /** 这一行的文本（带缩进，等宽呈现）。 */
  text: string;
};

// weather 工具的 schema（OpenAI tools 风格），逐行标注归属字段。
const SCHEMA_LINES: readonly SchemaLine[] = [
  { field: null, text: "{" },
  { field: null, text: '  "type": "function",' },
  { field: null, text: '  "function": {' },
  { field: "name", text: '    "name": "get_weather",' },
  {
    field: "description",
    text: '    "description": "查询某个城市当天的天气。当用户问到天气、要不要带伞、穿衣建议时调用。",',
  },
  { field: "parameters", text: '    "parameters": {' },
  { field: "parameters", text: '      "type": "object",' },
  { field: "parameters", text: '      "properties": {' },
  { field: "parameters", text: '        "city": {' },
  { field: "parameters", text: '          "type": "string",' },
  {
    field: "parameters",
    text: '          "description": "城市名，如「上海」"',
  },
  { field: "parameters", text: "        }" },
  { field: "parameters", text: "      }," },
  { field: "required", text: '      "required": ["city"]' },
  { field: "parameters", text: "    }" },
  { field: null, text: "  }" },
  { field: null, text: "}" },
];

type FieldInfo = {
  label: string;
  color: string;
  /** 这个字段「告诉 LLM 什么」。 */
  note: string;
};

const FIELDS: Record<Field, FieldInfo> = {
  name: {
    label: "name",
    color: "var(--accent)",
    note: "调它用啥名。LLM 产出 tool_call 时，name 字段就填这个字符串；你的程序也靠这个名字找到对应的真实函数。名字要唯一、见名知意。",
  },
  description: {
    label: "description",
    color: "var(--warning)",
    note: "啥时候该用它。LLM 全靠这句话判断「要不要调、什么时候调」——这是整份说明书里最关键的一段：description 写得清楚，模型该调时才会调、不该调时才不乱调。写得含糊或干脆不写，模型就会漏调、错调。",
  },
  parameters: {
    label: "parameters",
    color: "var(--success)",
    note: "要传哪些参数、各是什么类型。用 JSON Schema 描述每个参数（这里是 city，类型 string），每个参数也配一句 description 告诉 LLM 这个参数填什么。模型据此决定 arguments 里填什么。",
  },
  required: {
    label: "required",
    color: "var(--danger)",
    note: "哪些参数必填。列在 required 里的参数，LLM 产出 tool_call 时必须给出；没列的就是可选。漏填必填参数，你的程序在解析阶段就该拦下来。",
  },
};

const FIELD_ORDER: readonly Field[] = [
  "name",
  "description",
  "parameters",
  "required",
];

export function ToolSchemaAnatomy() {
  // null = 全览（无高亮）。
  const [active, setActive] = useState<Field | null>(null);
  const reset = () => setActive(null);

  const activeInfo = active ? FIELDS[active] : null;

  return (
    <DemoStage
      title="拆解一份工具说明书（JSON Schema）：每个字段告诉 LLM 什么"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-secondary">
            点一个字段看它告诉 LLM 什么：
          </span>
          {FIELD_ORDER.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(active === f ? null : f)}
              aria-pressed={active === f}
              className={`rounded-control border px-3 py-1 font-mono text-xs transition-colors duration-(--duration-hover) ease-standard ${
                active === f
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:text-primary"
              }`}
            >
              {FIELDS[f].label}
            </button>
          ))}
        </div>
      }
    >
      <div className="w-full max-w-[640px] text-sm">
        {/* weather 工具的 JSON Schema（示意） */}
        <div className="mb-3 rounded-control border border-border bg-bg p-3">
          <p className="mb-2 text-xs font-semibold text-secondary">
            一个 weather 工具的 JSON Schema（示意格式）
          </p>
          <div className="flex flex-col font-mono text-xs leading-relaxed">
            {SCHEMA_LINES.map((line, i) => {
              const lineColor = line.field ? FIELDS[line.field].color : null;
              const on = active !== null && line.field === active;
              const dim = active !== null && line.field !== active;
              return (
                <div
                  key={i}
                  className="rounded-control border-l-2 px-2 transition-colors duration-(--duration-hover) ease-standard"
                  style={{
                    borderLeftColor: on
                      ? (lineColor ?? "var(--border)")
                      : "transparent",
                    backgroundColor: on ? "var(--bg-elevated)" : "transparent",
                    opacity: dim ? 0.32 : 1,
                  }}
                >
                  <span
                    className="whitespace-pre text-primary"
                    style={on && lineColor ? { color: lineColor } : undefined}
                  >
                    {line.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 旁注：选中字段告诉 LLM 什么 */}
        <div className="rounded-control border border-border bg-elevated p-3">
          {activeInfo ? (
            <>
              <p
                className="mb-1 font-mono text-xs font-semibold"
                style={{ color: activeInfo.color }}
              >
                {activeInfo.label}
              </p>
              <p className="text-xs text-secondary">{activeInfo.note}</p>
            </>
          ) : (
            <p className="text-xs text-secondary">
              一份工具说明书有四个关键字段：
              <strong className="text-accent">name</strong>（调它用啥名）、
              <strong className="text-warning">description</strong>
              （啥时候该用它）、
              <strong className="text-success">parameters</strong>
              （要传哪些参数）、
              <strong className="text-danger">required</strong>
              （哪些必填）。点上面的字段逐个看清楚——尤其是{" "}
              <strong className="text-warning">description</strong>。
            </p>
          )}
        </div>

        {/* 关键教学点强调 */}
        <p className="mt-3 rounded-control border border-warning/40 bg-bg p-2 text-[11px] leading-relaxed text-secondary">
          <strong className="text-warning">最关键的一句</strong>：
          <strong className="text-primary">description</strong>{" "}
          写得好不好，直接决定 LLM
          会不会、会不会正确地调用这个工具。它不是注释，是{" "}
          <strong className="text-primary">模型唯一的判断依据</strong>。
        </p>

        {/* 诚实声明 */}
        <p className="mt-2 text-[11px] leading-relaxed text-secondary">
          说明：以上 schema 为按格式
          <strong className="text-primary">预写的示意</strong>
          （非实时调用模型）。真实里这份 schema 会随 tools 列表一起传给
          API，模型据此产出 tool_call。
        </p>
      </div>
    </DemoStage>
  );
}
