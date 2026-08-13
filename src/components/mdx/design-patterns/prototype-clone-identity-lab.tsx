"use client";

import { useState } from "react";

const OFFICIAL_CONCEPTS = [
  "模式名称与分类",
  "意图",
  "别名",
  "动机",
  "适用性",
  "结构",
  "参与者",
  "协作",
  "后果",
  "实现",
  "示例代码",
  "已知应用",
  "相关模式",
] as const;

const TEMPLATES = [
  {
    key: "card",
    label: "卡片模板",
    prototypeId: "card-template-01",
    title: "发布卡片",
    child: "状态徽章",
    detail: "标题、颜色和状态节点",
  },
  {
    key: "workflow",
    label: "流程模板",
    prototypeId: "workflow-template-02",
    title: "审核流程",
    child: "审批节点",
    detail: "阶段、负责人和审批节点",
  },
] as const;

type TemplateKey = (typeof TEMPLATES)[number]["key"];
type CopyMode = "deep" | "shallow";

export function PrototypeCloneIdentityLab() {
  const [templateKey, setTemplateKey] = useState<TemplateKey>("card");
  const [copyMode, setCopyMode] = useState<CopyMode>("deep");
  const [cloned, setCloned] = useState(false);
  const [edited, setEdited] = useState(false);
  const template =
    TEMPLATES.find((item) => item.key === templateKey) ?? TEMPLATES[0];
  const originalChanged = cloned && edited && copyMode === "shallow";
  const cloneId = `${template.prototypeId}-instance`;

  function selectTemplate(key: TemplateKey) {
    setTemplateKey(key);
    setCloned(false);
    setEdited(false);
  }

  function selectMode(mode: CopyMode) {
    setCopyMode(mode);
    setCloned(false);
    setEdited(false);
  }

  function cloneFromRegistry() {
    setCloned(true);
    setEdited(false);
  }

  function editClone() {
    if (cloned) setEdited(true);
  }

  function reset() {
    setTemplateKey("card");
    setCopyMode("deep");
    setCloned(false);
    setEdited(false);
  }

  const status = !cloned
    ? "等待克隆"
    : !edited
      ? "实例已创建"
      : originalChanged
        ? "模板被污染"
        : "实例独立";

  return (
    <figure
      aria-label="原型模式克隆身份实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="prototype-clone-identity-lab"
      data-unit-id="designpatterns-11"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              PROTOTYPE · CLONE IDENTITY
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              模板克隆身份台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              从 Registry 复制已配置模板，编辑克隆的可变子节点，观察深/浅复制如何影响原型不变性。
            </p>
          </div>
          <button
            aria-label="重置原型克隆身份实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">选择原型模板</p>
                <span className="text-xs text-secondary">
                  {OFFICIAL_CONCEPTS.length} 个目录节点
                </span>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {TEMPLATES.map((item) => (
                  <button
                    aria-pressed={item.key === templateKey}
                    className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                      item.key === templateKey
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                    key={item.key}
                    onClick={() => selectTemplate(item.key)}
                    type="button"
                  >
                    <span className="block break-words">{item.label}</span>
                    <span className="mt-1 block text-[11px] text-secondary">
                      {item.detail}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-secondary">选择复制策略</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {([
                  ["deep", "深复制", "子节点独立"],
                  ["shallow", "浅复制", "子节点共享"],
                ] as const).map(([key, label, detail]) => (
                  <button
                    aria-pressed={copyMode === key}
                    className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                      copyMode === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                    key={key}
                    onClick={() => selectMode(key)}
                    type="button"
                  >
                    <span className="block break-words">{label}</span>
                    <span className="mt-1 block text-[11px] text-secondary">{detail}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={cloneFromRegistry}
              type="button"
            >
              从 Registry 克隆
            </button>
            <button
              aria-pressed={edited}
              className={`min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                edited
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary"
              }`}
              onClick={editClone}
              type="button"
            >
              编辑克隆子节点
            </button>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {template.label} · REGISTRY
              </p>
              <span
                className={`rounded-control border px-2 py-1 text-xs ${
                  originalChanged
                    ? "border-warning text-warning"
                    : cloned && edited
                      ? "border-success text-success"
                      : "border-border text-secondary"
                }`}
              >
                {status}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div
                className={`rounded-control border p-4 ${
                  originalChanged ? "border-warning" : "border-border"
                }`}
              >
                <p className="text-xs font-semibold text-secondary">Prototype 原型</p>
                <p className="mt-2 break-words font-mono text-sm text-primary">
                  {template.prototypeId}
                </p>
                <p className="mt-2 text-xs text-secondary">{template.title}</p>
                <p
                  className={`mt-3 rounded-control border px-3 py-2 text-xs ${
                    originalChanged
                      ? "border-warning text-warning"
                      : "border-success text-success"
                  }`}
                >
                  {originalChanged ? "子节点被共享修改" : "模板状态保持稳定"}
                </p>
              </div>

              <div className="rounded-control border border-accent p-4">
                <p className="text-xs font-semibold text-accent">Clone 副本</p>
                <p className="mt-2 break-words font-mono text-sm text-primary">
                  {cloned ? cloneId : "尚未创建实例"}
                </p>
                <p className="mt-2 text-xs text-secondary">
                  {cloned
                    ? edited
                      ? `${template.child} → 已编辑`
                      : `${template.child} → 初始副本`
                    : "选择模板后从 Registry 克隆"}
                </p>
                <p className="mt-3 rounded-control border border-accent px-3 py-2 text-xs text-accent">
                  {copyMode === "deep" ? "拥有独立子节点" : "共享原型子节点"}
                </p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={`mt-4 rounded-control border p-4 ${
                originalChanged
                  ? "border-warning"
                  : cloned && edited
                    ? "border-success"
                    : "border-border"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  originalChanged
                    ? "text-warning"
                    : cloned && edited
                      ? "text-success"
                      : "text-primary"
                }`}
              >
                {!cloned
                  ? "尚未克隆：先从 Registry 选择创建起点"
                  : !edited
                    ? "实例已创建：身份与原型不同"
                    : originalChanged
                      ? "合同拒绝：编辑副本污染了原型"
                      : "合同通过：编辑副本不影响原型"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {!cloned
                  ? "原型注册表只交付复制结果，不把可变模板直接交给 Client。"
                  : !edited
                    ? "现在编辑克隆的可变子节点，检查复制策略是否与对象图所有权一致。"
                    : originalChanged
                      ? "浅复制让可变子节点继续共享引用；真实实现必须改为深复制或明确不可变共享。"
                      : "深复制为拥有的子节点创建了独立对象，模板可以继续作为稳定创建起点。"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
