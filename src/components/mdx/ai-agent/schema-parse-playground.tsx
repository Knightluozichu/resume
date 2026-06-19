"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <AaSchemaParsePlayground>：「脏输出怎么被剥壳 + 校验 + 触发重试」交互件（HEL-295）。
 *
 * 给定一个固定 schema，读者用分段按钮切换模型的几种「回话样本」：
 *   合规 JSON / 带 ```json 围栏 / 夹了废话 / 缺必填字段 / 类型错。
 * 组件实时展示该样本：
 *   1. 剥壳 extract_json 后抠出的 JSON 文本（围栏 / 废话被剥掉）；
 *   2. 按 schema 校验的结果（✅ 通过 / ❌ 哪条不合规）；
 *   3. 会不会触发回灌重试（不合规 → 触发；合规 → 不触发）。
 * 把正文「脏输出怎么被容错处理」从抽象判断变成动手切换看变化。
 *
 * 为何 client：分段切换 + 实时剥壳/校验/重试判定 + 重置都是真交互（受控状态）。
 * 纯 React，无 Canvas / WebGL；reduced-motion 友好（仅颜色/边框过渡）。
 * 颜色/间距/圆角全部走 DESIGN token（硬规则 5）。
 */

// 固定 schema（与 §6 代码、AaJsonSchemaDiagram 同形）：字段名 → 类型 + 必填。
const SCHEMA_TEXT = '{ "city": str(必填), "temp": int(必填), "rain": bool(必填) }';

type SampleId = "ok" | "fenced" | "chatty" | "missing" | "wrongtype";

type Sample = {
  id: SampleId;
  label: string; // 分段按钮文案
  raw: string; // 模型的原始回话（可能脏）
  extracted: string; // extract_json 剥壳后抠出的 JSON 文本
  /** 校验结果：null = 通过；字符串 = 不合规原因。 */
  validateError: string | null;
};

const SAMPLES: readonly Sample[] = [
  {
    id: "ok",
    label: "合规 JSON",
    raw: '{"city": "上海", "temp": 26, "rain": true}',
    extracted: '{"city": "上海", "temp": 26, "rain": true}',
    validateError: null,
  },
  {
    id: "fenced",
    label: "带 ```json 围栏",
    raw: '```json\n{"city": "上海", "temp": 26, "rain": true}\n```',
    extracted: '{"city": "上海", "temp": 26, "rain": true}',
    validateError: null,
  },
  {
    id: "chatty",
    label: "夹了废话",
    raw: '好的，这是结果：{"city": "上海", "temp": 26, "rain": true} 希望对你有帮助！',
    extracted: '{"city": "上海", "temp": 26, "rain": true}',
    validateError: null,
  },
  {
    id: "missing",
    label: "缺必填字段",
    raw: '```json\n{"city": "上海", "temp": 26}\n```',
    extracted: '{"city": "上海", "temp": 26}',
    validateError: "缺少必填字段 rain（schema 要求 bool）",
  },
  {
    id: "wrongtype",
    label: "类型错",
    raw: '{"city": "上海", "temp": "二十六度", "rain": true}',
    extracted: '{"city": "上海", "temp": "二十六度", "rain": true}',
    validateError: "字段 temp 类型错：要 int，却是 str（\"二十六度\"）",
  },
];

const DEFAULT_ID: SampleId = "ok";

export function AaSchemaParsePlayground() {
  const [id, setId] = useState<SampleId>(DEFAULT_ID);

  const sample = SAMPLES.find((s) => s.id === id) ?? SAMPLES[0];
  const ok = sample.validateError === null;
  const isDirty = id !== DEFAULT_ID;

  return (
    <DemoStage
      title="切换模型的几种回话样本，看它怎么被剥壳、校验、决定要不要重试"
      onReset={isDirty ? () => setId(DEFAULT_ID) : undefined}
      controls={
        <div className="flex flex-col gap-3">
          <span className="text-xs text-secondary">
            固定 schema：
            <code className="ml-1 rounded bg-[var(--bg)] px-1 py-0.5 font-mono text-[11px] text-primary">
              {SCHEMA_TEXT}
            </code>
          </span>
          <span className="text-xs text-secondary">选一种模型回话样本：</span>
          <div className="flex flex-wrap gap-2">
            {SAMPLES.map((s) => {
              const active = s.id === id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setId(s.id)}
                  aria-pressed={active}
                  className="rounded-control border px-3 py-1.5 text-xs font-medium transition-colors duration-(--duration-hover) ease-standard"
                  style={{
                    borderColor: active ? "var(--accent)" : "var(--border)",
                    background: active ? "var(--accent)" : "var(--bg)",
                    color: active ? "var(--bg)" : "var(--text-secondary)",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-xl">
        {/* ① 模型原始回话（可能脏） */}
        <div className="mb-3">
          <p className="mb-1 text-xs font-semibold text-primary">
            ① 模型原始回话（可能带围栏 / 夹废话）
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-control border border-border bg-[var(--bg)] p-2 font-mono text-xs text-secondary">
            {sample.raw}
          </pre>
        </div>

        {/* ② extract_json 剥壳后 */}
        <div className="mb-3">
          <p className="mb-1 text-xs font-semibold text-primary">
            ② extract_json 剥壳后抠出的 JSON
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-control border border-accent bg-[var(--bg)] p-2 font-mono text-xs text-primary">
            {sample.extracted}
          </pre>
        </div>

        {/* ③ 校验结果 + 是否重试 */}
        <div
          className="rounded-control border p-3"
          style={{
            borderColor: ok ? "var(--success)" : "var(--danger)",
            background: "var(--bg)",
          }}
          aria-live="polite"
        >
          <p className="text-sm">
            <span className="text-secondary">③ 按 schema 校验：</span>
            <span
              className="font-bold"
              style={{ color: ok ? "var(--success)" : "var(--danger)" }}
            >
              {ok ? "✅ 通过" : "❌ 不合规"}
            </span>
          </p>
          {!ok && (
            <p className="mt-1 text-xs text-danger">原因：{sample.validateError}</p>
          )}
          <p className="mt-2 text-xs text-secondary">
            <span className="font-semibold">④ 会不会触发重试：</span>
            {ok
              ? "不触发——校验通过，直接产出结构化对象交给下游。"
              : "触发——把这条错误回灌进 messages 再问一遍，到 max_retries 上限才放弃。"}
          </p>
        </div>

        <p className="mt-3 text-xs text-secondary">
          猜一猜：「带围栏」和「夹废话」两种样本，剥壳后的 JSON 一样吗？校验都能过吗？
        </p>
      </div>
    </DemoStage>
  );
}
