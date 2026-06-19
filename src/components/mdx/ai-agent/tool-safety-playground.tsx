"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

type ScenarioId = "ok" | "missing" | "range" | "danger";

type Scenario = {
  id: ScenarioId;
  label: string;
  call: string;
  validate: string;
  sandbox: string;
  observation: string;
  status: "success" | "warning";
};

const SCENARIOS: readonly Scenario[] = [
  {
    id: "ok",
    label: "正常调用",
    call: 'read_note({"path":"notes/today.md","max_chars":800})',
    validate: "必填 path 存在，max_chars 在 1..2000 内。",
    sandbox: "路径位于 notes/ 白名单，按只读权限执行。",
    observation: 'Observation: {ok:true, value:"会议纪要前 800 字..."}',
    status: "success",
  },
  {
    id: "missing",
    label: "参数缺失",
    call: 'read_note({"max_chars":800})',
    validate: "缺少必填参数 path，校验阶段直接拦下。",
    sandbox: "未进入沙箱，不读取任何文件。",
    observation:
      'Observation: {ok:false, error:{code:"VALIDATION_ERROR", message:"缺少 path"}}',
    status: "warning",
  },
  {
    id: "range",
    label: "参数越界",
    call: 'read_note({"path":"notes/today.md","max_chars":999999})',
    validate: "max_chars 超过上限 2000，可能导致超长上下文灌入。",
    sandbox: "未进入沙箱，先要求模型缩小范围或向用户确认。",
    observation:
      'Observation: {ok:false, error:{code:"RANGE_ERROR", message:"max_chars 必须 <= 2000"}}',
    status: "warning",
  },
  {
    id: "danger",
    label: "危险操作",
    call: 'read_note({"path":"../local.env","max_chars":500})',
    validate: "参数类型没错，但路径包含越权跳转。",
    sandbox: "沙箱拒绝访问白名单外路径，密钥文件不会被读取。",
    observation:
      'Observation: {ok:false, error:{code:"PERMISSION_DENIED", message:"路径不在允许范围"}}',
    status: "warning",
  },
];

const DEFAULT_ID: ScenarioId = "ok";

export function AaToolSafetyPlayground() {
  const [id, setId] = useState<ScenarioId>(DEFAULT_ID);
  const scenario = SCENARIOS.find((item) => item.id === id) ?? SCENARIOS[0];
  const isDirty = id !== DEFAULT_ID;
  const tone =
    scenario.status === "success" ? "var(--success)" : "var(--warning)";

  return (
    <DemoStage
      title="切换调用样本，看参数校验和沙箱分别在哪一层拦截"
      onReset={isDirty ? () => setId(DEFAULT_ID) : undefined}
      controls={
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((item) => {
            const active = item.id === id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setId(item.id)}
                aria-pressed={active}
                className="rounded-control border px-3 py-1.5 text-xs font-medium transition-colors duration-(--duration-hover) ease-standard"
                style={{
                  borderColor: active ? "var(--accent)" : "var(--border)",
                  background: active ? "var(--accent)" : "var(--bg)",
                  color: active ? "var(--bg)" : "var(--text-secondary)",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      }
    >
      <div className="w-full max-w-2xl">
        <div className="rounded-control border border-border bg-bg p-3">
          <p className="text-xs font-semibold text-secondary">
            模型写来的调用请求
          </p>
          <p className="mt-1 break-words font-mono text-xs text-primary">
            {scenario.call}
          </p>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-control border border-border p-3">
            <p className="text-xs font-semibold text-accent">1 校验参数</p>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              {scenario.validate}
            </p>
          </div>
          <div className="rounded-control border border-border p-3">
            <p className="text-xs font-semibold text-accent">2 沙箱与权限</p>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              {scenario.sandbox}
            </p>
          </div>
        </div>

        <div
          className="mt-3 rounded-control border p-3"
          style={{ borderColor: tone, background: "var(--bg)" }}
          aria-live="polite"
        >
          <p className="text-xs font-semibold" style={{ color: tone }}>
            回灌给 ReAct 的 Observation
          </p>
          <p className="mt-1 break-words font-mono text-xs leading-relaxed text-primary">
            {scenario.observation}
          </p>
        </div>
      </div>
    </DemoStage>
  );
}
