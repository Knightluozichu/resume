"use client";

import { useReducer, type CSSProperties } from "react";

type Fixture = {
  id: string;
  source: string;
  extra?: string;
  data: string;
  output: string;
  error: string;
  phase: "parse" | "execute" | "success";
  label: string;
  note: string;
  bench: number;
};
// Exact finite vectors verified by native Go1.26.0. This is a replay, not a Go interpreter.
export const TEMPLATE_CASES: readonly Fixture[] = [
  {
    id: "hello",
    source: "Hello {{.Name}}",
    data: 'page{Name:"Lin"}',
    output: "Hello Lin",
    error: "",
    phase: "success",
    label: "成功",
    note: "固定文本与字段值合并，执行成功后才允许提交。",
    bench: 0,
  },
  {
    id: "parse-error",
    source: "{{if .Name}}Hi",
    data: 'page{Name:"Lin"}',
    output: "",
    error: "template: lab:1: unexpected EOF",
    phase: "parse",
    label: "解析错误",
    note: "if缺少end，Parse没有得到可执行模板。",
    bench: 0,
  },
  {
    id: "unknown-func",
    source: "{{shout .Name}}",
    data: "shout 未注册",
    output: "",
    error: 'template: lab:1: function "shout" not defined',
    phase: "parse",
    label: "未知函数",
    note: "函数名在Parse前必须注册；这里未注册shout。",
    bench: 0,
  },
  {
    id: "field-error",
    source: "prefix|{{.Missing}}",
    data: 'page{Name:"Lin"}',
    output: "prefix|",
    error:
      'template: lab:1:9: executing "lab" at <.Missing>: can\'t evaluate field Missing in type chapter.page',
    phase: "execute",
    label: "字段错误",
    note: "先写prefix|再读Missing失败。buffer有内容，但不能提交。",
    bench: 0,
  },
  {
    id: "scope",
    source:
      "{{$root := .}}{{if .Admin}}admin|{{else}}reader|{{end}}{{with .User}}{{.Name}}{{else}}guest{{end}}:{{range .Tags}}{{.}}/{{$root.Name}};{{else}}empty{{end}}",
    data: "Name=Lin, Admin=false, User.Name=Ada, Tags=[Go,Web]",
    output: "reader|Ada:Go/Lin;Web/Lin;",
    error: "",
    phase: "success",
    label: "作用域",
    note: "if保留根；with进入User；range进入字符串；$root仍指向根。",
    bench: 0,
  },
  {
    id: "empty",
    source:
      "{{$root := .}}{{if .Admin}}admin|{{else}}reader|{{end}}{{with .User}}{{.Name}}{{else}}guest{{end}}:{{range .Tags}}{{.}}/{{$root.Name}};{{else}}empty{{end}}",
    data: "Name=Lin, Admin=false, User=nil, Tags=[]",
    output: "reader|guest:empty",
    error: "",
    phase: "success",
    label: "空集合",
    note: "with走guest分支，range走empty分支；不进入元素作用域。",
    bench: 0,
  },
  {
    id: "pipeline",
    source: '{{.Name | printf "%s!" | printf "[%s]"}}',
    data: "Name=Lin; printf(format, previous)",
    output: "[Lin!]",
    error: "",
    phase: "success",
    label: "末参数",
    note: "Lin进入printf的最后参数，再把Lin!送入下一次printf的最后参数。",
    bench: 1,
  },
  {
    id: "function-error",
    source: "prefix|{{check .Name}}",
    data: "Name=bad; check 返回非 nil error",
    output: "prefix|",
    error:
      'template: lab:1:9: executing "lab" at <check .Name>: error calling check: rejected',
    phase: "execute",
    label: "函数错误",
    note: "check已注册，调用时返回error，停止执行；prefix|不会自动回滚。",
    bench: 1,
  },
  {
    id: "text-raw",
    source: "<p>{{.}}</p>",
    data: "string: <b>A&B</b>",
    output: "<p><b>A&B</b></p>",
    error: "",
    phase: "success",
    label: "文本引擎",
    note: "text/template不做HTML上下文转义；此输出若作为HTML发送可解释成标签。",
    bench: 2,
  },
  {
    id: "html-text",
    source: "<p>{{.}}</p>",
    data: "string: <b>A&B</b>",
    output: "<p>&lt;b&gt;A&amp;B&lt;/b&gt;</p>",
    error: "",
    phase: "success",
    label: "HTML正文",
    note: "html/template把普通字符串作为正文数据，标签变成实体。",
    bench: 2,
  },
  {
    id: "attribute",
    source: '<span title="{{.}}">ok</span>',
    data: 'string: " onmouseover="alert(1)',
    output: '<span title="&#34; onmouseover=&#34;alert(1)">ok</span>',
    error: "",
    phase: "success",
    label: "属性引号",
    note: "引号被编码，输入没有逃出title属性；不是新增事件处理器。",
    bench: 2,
  },
  {
    id: "url",
    source: '<a href="{{.}}">go</a>',
    data: "string: javascript:alert(1)",
    output: '<a href="#ZgotmplZ">go</a>',
    error: "",
    phase: "success",
    label: "危险URL",
    note: "URL过滤器拒绝javascript协议；这不是业务URL白名单。",
    bench: 2,
  },
  {
    id: "js",
    source: "<script>const x = {{.}};</script>",
    data: "string: </script><b>&",
    output:
      '<script>const x = "\\u003c/script\\u003e\\u003cb\\u003e\\u0026";</script>',
    error: "",
    phase: "success",
    label: "JS值",
    note: "JS值被序列化为带引号的字符串，小于号等被转义。",
    bench: 2,
  },
  {
    id: "trusted",
    source: "<p>{{.}}</p>",
    data: 'template.HTML("<b>fixed</b>") 仅开发者常量',
    output: "<p><b>fixed</b></p>",
    error: "",
    phase: "success",
    label: "可信常量",
    note: "仅开发者固定常量被声明为template.HTML；这是绕过，不是清洗。",
    bench: 2,
  },
  {
    id: "context-error",
    source: '<a href="{{.}}',
    data: "string: /safe",
    output: "",
    error:
      "html/template:lab: ends in a non-text context: {stateURL delimDoubleQuote urlPartNone jsCtxRegexp attrURL elementNone <nil>}",
    phase: "execute",
    label: "上下文错误",
    note: "Parse成功不代表上下文安全检查成功；未结束的属性在Execute入口被拒绝。",
    bench: 2,
  },
  {
    id: "default",
    source:
      '{{define "page"}}<main>{{template "item" .}}{{block "content" .}}Default {{.Name}}{{end}}</main>{{end}}{{define "item"}}<h1>{{.Name}}</h1>{{end}}',
    data: "ExecuteTemplate(page, Name=Lin)",
    output: "<main><h1>Lin</h1>Default Lin</main>",
    error: "",
    phase: "success",
    label: "默认",
    note: "page调用item与content；block为content提供Default实现。",
    bench: 3,
  },
  {
    id: "override",
    source:
      '{{define "page"}}<main>{{template "item" .}}{{block "content" .}}Default {{.Name}}{{end}}</main>{{end}}{{define "item"}}<h1>{{.Name}}</h1>{{end}}',
    extra: '{{define "content"}}Custom {{.Name}}{{end}}',
    data: "先解析base，再解析content覆盖；Name=Lin",
    output: "<main><h1>Lin</h1>Custom Lin</main>",
    error: "",
    phase: "success",
    label: "覆盖",
    note: "后续Parse覆盖content，item分支保持不变；覆盖发生在执行前。",
    bench: 3,
  },
  {
    id: "missing-template",
    source: '{{template "absent" .}}',
    data: "absent未定义",
    output: "",
    error: 'html/template:lab:1:11: no such template "absent"',
    phase: "execute",
    label: "缺少模板",
    note: "调用的absent未定义；html/template在执行准备时拒绝，没有输出。",
    bench: 3,
  },
];

export type TemplateState = { id: string; stage: number; prediction: string };
export const INITIAL_TEMPLATE_STATE: TemplateState = {
  id: "hello",
  stage: 0,
  prediction: "",
};
type Action =
  | { type: "reset" | "parse" | "execute" | "commit" }
  | { type: "choose" | "predict"; value: string };
export function templateReducer(
  state: TemplateState,
  action: Action,
): TemplateState {
  const f = TEMPLATE_CASES.find((item) => item.id === state.id)!;
  switch (action.type) {
    case "reset":
      return INITIAL_TEMPLATE_STATE;
    case "choose":
      return TEMPLATE_CASES.some((item) => item.id === action.value)
        ? { id: action.value, stage: 0, prediction: "" }
        : state;
    case "predict":
      return state.stage === 0 ? { ...state, prediction: action.value } : state;
    case "parse":
      return state.stage === 0 && state.prediction
        ? { ...state, stage: 1 }
        : state;
    case "execute":
      return state.stage === 1 && f.phase !== "parse"
        ? { ...state, stage: 2 }
        : state;
    case "commit":
      return state.stage === 2 && f.phase === "success"
        ? { ...state, stage: 3 }
        : state;
  }
}
const C = {
  bg: "var(--bg)",
  line: "var(--border)",
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  bad: "var(--danger)",
  good: "var(--success)",
};
const buttonStyle: CSSProperties = {
  minHeight: 44,
  minWidth: 44,
  padding: "8px 12px",
  border: "1px solid var(--border)",
  borderRadius: 6,
  whiteSpace: "normal",
  overflowWrap: "anywhere",
};
const codeStyle: CSSProperties = {
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  fontSize: 13,
  lineHeight: 1.7,
  margin: "8px 0",
};
const benches = ["执行与作用域", "管道函数", "上下文转义", "布局组合"];
const firstCases = ["hello", "pipeline", "html-text", "default"];
const predictions = [
  ["success", "预测：成功"],
  ["parse", "预测：解析失败"],
  ["execute", "预测：执行失败"],
];
export function TemplateMechanism({
  id,
  stage,
}: {
  id: string;
  stage: number;
}) {
  const f = TEMPLATE_CASES.find((item) => item.id === id)!;
  const parsed = stage > 0 && f.phase !== "parse";
  const done = stage > 1;
  const failed =
    stage > 0 && (f.phase === "parse" || (done && f.phase === "execute"));
  const ink = parsed ? C.accent : C.muted;
  const scope = id === "scope" || id === "empty";
  return (
    <svg
      role="img"
      aria-label={`${f.label}机制图：阶段${stage}`}
      viewBox="0 0 240 230"
      width="240"
      height="230"
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "block",
        margin: "0 auto",
        color: C.ink,
      }}
    >
      <g fill="none" stroke={ink} strokeWidth="2">
        {f.bench === 1 ? (
          <>
            <path d="M30 28 V76 H170 V96 M170 124 V169" />
            <path d="M35 110 H98 M35 186 H98" strokeDasharray="4 3" />
            <circle
              cx="170"
              cy={done ? 186 : 110}
              r="20"
              fill={done ? C.accent : C.bg}
            />
          </>
        ) : f.bench === 3 && id !== "missing-template" ? (
          <>
            <path d="M120 35 V62 M120 62 H45 V105 M120 62 H185 V105 M185 125 V150 H70 V177 M185 150 H200 V177" />
            <circle cx="120" cy="28" r="7" />
            <circle cx="45" cy="108" r="7" />
            <circle cx="185" cy="108" r="7" />
            <circle
              cx={id === "override" ? 200 : 70}
              cy="182"
              r="10"
              fill={done ? C.accent : C.bg}
            />
          </>
        ) : scope ? (
          <>
            <path d="M120 35 V60 H45 V100 M120 60 H185 V100 M185 120 V158 H150 V182 M185 158 H220 V182" />
            <path
              d="M150 190 C100 230 10 170 10 35 H100"
              strokeDasharray="4 3"
            />
            <circle cx="120" cy="28" r="8" />
            <circle
              cx="45"
              cy="108"
              r="8"
              fill={done && id === "scope" ? C.accent : C.bg}
            />
            <circle cx="185" cy="108" r="8" />
            {id === "scope" && (
              <>
                <circle cx="150" cy="185" r="7" fill={done ? C.accent : C.bg} />
                <circle cx="220" cy="185" r="7" fill={done ? C.accent : C.bg} />
              </>
            )}
          </>
        ) : f.bench === 2 ? (
          <>
            <path d="M18 30 H222 M18 90 H222 M120 90 V146 M40 163 H200" />
            {Array.from({ length: 11 }, (_, i) => (
              <path
                key={i}
                d={`M${20 + i * 20} 150 V177`}
                stroke={done ? C.accent : C.line}
              />
            ))}
            <circle cx="120" cy="60" r="18" fill={parsed ? C.accent : C.bg} />
            {done && (
              <path
                d="M60 198 H180 M165 191 L180 198 L165 205"
                stroke={failed ? C.bad : C.good}
              />
            )}
          </>
        ) : (
          <>
            <path d="M120 30 V60 H45 V100 M120 60 H190 V100 M45 120 V155 H120 M190 120 V155 H120 V185" />
            <circle cx="120" cy="25" r="7" />
            <circle cx="45" cy="108" r="7" />
            <circle cx="190" cy="108" r="7" fill={parsed ? C.accent : C.bg} />
            {failed && (
              <path d="M177 95 L202 120 M202 95 L177 120" stroke={C.bad} />
            )}
            <path
              d="M85 190 H155"
              stroke={stage === 3 ? C.good : C.bad}
              strokeWidth="4"
            />
          </>
        )}
      </g>
      <g fill={C.ink} fontSize="14" textAnchor="middle">
        {f.bench === 1 ? (
          <>
            <text x="65" y="23">
              {id === "function-error" ? ".Name = bad" : ".Name = Lin"}
            </text>
            <text x="48" y="100">
              {id === "function-error" ? "check" : "%s!"}
            </text>
            <text x="143" y="80">
              {id === "function-error" ? "参数 bad" : "末参数 Lin"}
            </text>
            <text x="48" y="177">
              {id === "function-error" ? "停止" : "[%s]"}
            </text>
            <text x="155" y="153">
              {id === "function-error" ? "非 nil error" : "末参数 Lin!"}
            </text>
            <text x="120" y="224">
              {id === "function-error"
                ? "check → error，停止"
                : done
                  ? "结果 [Lin!]"
                  : "等待执行函数链"}
            </text>
          </>
        ) : f.bench === 3 && id !== "missing-template" ? (
          <>
            <text x="120" y="16">
              page
            </text>
            <text x="45" y="89">
              item
            </text>
            <text x="185" y="89">
              content
            </text>
            <text x="70" y="212">
              Default
            </text>
            <text x="200" y="212">
              Custom
            </text>
            <text x="120" y="142">
              传入同一份数据
            </text>
          </>
        ) : scope ? (
          <>
            <text x="120" y="16">
              根：Name=Lin
            </text>
            <text x="45" y="88">
              with
            </text>
            <text x="185" y="88">
              range
            </text>
            <text x="45" y="137">
              {id === "empty" ? "guest" : "Ada"}
            </text>
            <text x="150" y="213">
              {id === "empty" ? "empty" : "Go"}
            </text>
            <text x="220" y="213">
              {id === "empty" ? "" : "Web"}
            </text>
            <text x="62" y="174">
              $root
            </text>
          </>
        ) : f.bench === 2 ? (
          <>
            <text x="120" y="22">
              {id === "js"
                ? "JavaScript 值位置"
                : id === "url"
                  ? "URL 属性位置"
                  : id === "attribute"
                    ? "title 属性位置"
                    : "HTML 正文位置"}
            </text>
            <text x="120" y="65" fill={parsed ? C.bg : C.ink}>
              点
            </text>
            <text x="120" y="121">
              {id === "text-raw" || id === "trusted"
                ? "无正文转义保护"
                : "按上下文编码 / 过滤"}
            </text>
            {done &&
              f.output
                .slice(0, 10)
                .split("")
                .map((char, i) => (
                  <text key={i} x={30 + i * 20} y="169">
                    {char}
                  </text>
                ))}
            <text x="120" y="224">
              {done
                ? `输出前10字符 / 共${f.output.length}字符`
                : "输入尚未写出"}
            </text>
          </>
        ) : (
          <>
            <text x="120" y="15">
              {parsed ? "已解析结构" : "模板结构草图"}
            </text>
            <text x="45" y="87">
              {id === "missing-template" || id === "unknown-func"
                ? "空根"
                : "固定文本"}
            </text>
            <text x="190" y="87">
              {id === "missing-template"
                ? "absent调用"
                : id === "unknown-func"
                  ? "shout调用"
                  : id === "parse-error"
                    ? "if缺end"
                    : "字段取值"}
            </text>
            <text x="120" y="178">
              局部缓冲区
            </text>
            <text x="120" y="216">
              {stage === 3 ? "提交闸门：打开" : "提交闸门：关闭"}
            </text>
          </>
        )}
      </g>
    </svg>
  );
}

export function GwpTemplatesLab() {
  const [state, dispatch] = useReducer(templateReducer, INITIAL_TEMPLATE_STATE);
  const f = TEMPLATE_CASES.find((item) => item.id === state.id)!;
  const { stage, prediction } = state;
  const parseFailed = stage > 0 && f.phase === "parse";
  const finished = parseFailed || stage >= 2;
  const status =
    stage === 0
      ? "等待预测"
      : parseFailed
        ? "Parse 失败"
        : stage === 1
          ? "Parse 成功，尚未执行"
          : f.phase === "execute"
            ? "Execute 失败，禁止提交"
            : stage === 2
              ? "Execute 成功，待提交"
              : "已提交完整输出";
  const choose = (id: string) => dispatch({ type: "choose", value: id });
  function control(
    label: string,
    active: boolean,
    onClick: () => void,
    disabled = false,
  ) {
    return (
      <button
        type="button"
        key={label}
        aria-pressed={active}
        disabled={disabled}
        onClick={onClick}
        style={{
          ...buttonStyle,
          background: active ? "var(--bg-elevated)" : C.bg,
          color: active ? C.accent : C.ink,
          opacity: disabled ? 0.5 : 1,
        }}
        className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {label}
      </button>
    );
  }
  return (
    <section
      aria-label="模板边界演算台"
      className="not-prose my-8 rounded-xl border border-border p-3 sm:p-5"
      style={{ minWidth: 0, maxWidth: "100%" }}
    >
      <h3 className="text-lg font-semibold">模板边界演算台</h3>
      <p className="my-3 text-sm">
        有限案例重放：输出来自 Go 1.26.0
        实测。先预测阶段，再解析、执行、提交；页面不运行 Go，不将输出当成 HTML。
      </p>
      <div
        role="group"
        aria-label="实验台选择"
        className="flex flex-wrap gap-2"
      >
        {benches.map((b, i) =>
          control(b, f.bench === i, () => choose(firstCases[i])),
        )}
      </div>
      <div
        role="group"
        aria-label="模板案例"
        className="my-3 flex flex-wrap gap-2"
      >
        {TEMPLATE_CASES.filter((item) => item.bench === f.bench).map((item) =>
          control(item.label, item.id === state.id, () => choose(item.id)),
        )}
      </div>
      <p className="text-sm">
        当前案例：<strong>{f.label}</strong> ·{" "}
        {state.id === "text-raw" || f.bench === 1
          ? "text/template语义"
          : "html/template语义"}
      </p>
      <pre aria-label="模板源码" style={codeStyle}>
        <code>
          {f.source}
          {f.extra ? `\n后续 Parse：${f.extra}` : ""}
        </code>
      </pre>
      <p aria-label="模板输入数据" style={{ ...codeStyle, color: C.muted }}>
        {f.data}
      </p>
      <fieldset className="my-3">
        <legend className="mb-2 text-sm">
          先预测最终结果（切换案例会清空预测）
        </legend>
        <div className="flex flex-wrap gap-2">
          {predictions.map(([value, label]) =>
            control(
              label,
              prediction === value,
              () => dispatch({ type: "predict", value }),
              stage !== 0,
            ),
          )}
        </div>
      </fieldset>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="解析执行与提交"
      >
        {control(
          "解析模板",
          stage === 1,
          () => dispatch({ type: "parse" }),
          stage !== 0 || !prediction,
        )}
        {control(
          "执行到缓冲区",
          stage === 2,
          () => dispatch({ type: "execute" }),
          stage !== 1 || parseFailed,
        )}
        {control(
          "提交完整输出",
          stage === 3,
          () => dispatch({ type: "commit" }),
          stage !== 2 || f.phase !== "success",
        )}
        {control("重置全部实验", false, () => dispatch({ type: "reset" }))}
      </div>
      <p role="status" aria-live="polite" className="my-3 font-semibold">
        {status}
        {finished
          ? ` · ${prediction === f.phase ? "预测一致" : "预测需修正"}`
          : ""}
      </p>
      <p aria-label="图示阅读方法" className="my-3 text-sm">
        {f.bench === 0
          ? "模板与模板引擎：上方是规则分支，下方是局部写入与提交闸门；作用域案例用分叉追踪dot。"
          : f.bench === 1
            ? "Action、参数、变量与Pipeline：圆点是传入值，虚线是固定参数；模板函数只在执行时调用，error会截断输出。"
            : f.bench === 2
              ? "text/template与html/template：同一插入点是否具有上下文感知保护，决定下方字符流是原文、实体还是过滤结果。"
              : "嵌套模板、布局与block action：沿page走向item和content；底部分支标出默认实现或执行前选定的覆盖。"}
      </p>
      <TemplateMechanism id={state.id} stage={stage} />
      <div
        aria-label="缓冲区字节流"
        className="my-3 border-y border-border py-3"
      >
        <p className="text-sm">缓冲区（按输出字面显示；不执行标签）</p>
        <output
          aria-label="缓冲区内容"
          style={{ ...codeStyle, display: "block" }}
        >
          {stage >= 2 && f.output ? f.output : "（空）"}
        </output>
        <p className="text-sm">
          已提交字节：
          {stage === 3 ? new TextEncoder().encode(f.output).length : 0}
        </p>
        <output
          aria-label="已提交内容"
          style={{ ...codeStyle, display: "block" }}
        >
          {stage === 3 ? f.output : "（未提交）"}
        </output>
      </div>
      <p aria-label="机制解释" className="text-sm">
        {finished
          ? f.note
          : stage === 1
            ? "结构已解析。尚未读取这份数据；上下文检查或字段访问仍可能在执行时报错。"
            : "预测后推进，观察分支、参数插槽与输出流。成功不等于可把任意输出当HTML插入。"}
      </p>
      {finished && f.error && (
        <pre aria-label="Go原始错误" style={{ ...codeStyle, color: C.bad }}>
          {f.error}
        </pre>
      )}
    </section>
  );
}
