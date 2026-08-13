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

const CREATORS = [
  {
    key: "csv",
    label: "CSV 创建者",
    className: "CsvImporter",
    product: "CsvParser",
    detail: "逗号分隔记录",
  },
  {
    key: "json",
    label: "JSON 创建者",
    className: "JsonImporter",
    product: "JsonParser",
    detail: "对象数组记录",
  },
  {
    key: "markdown",
    label: "Markdown 创建者",
    className: "MarkdownImporter",
    product: "MarkdownParser",
    detail: "标题与段落记录",
  },
] as const;

const PIPELINE_STEPS = [
  { key: "open", label: "打开输入", detail: "open()" },
  { key: "create", label: "调用工厂方法", detail: "createParser()" },
  { key: "parse", label: "解析记录", detail: "parser.parse()" },
  { key: "close", label: "统一收尾", detail: "close()" },
] as const;

type CreatorKey = (typeof CREATORS)[number]["key"];

export function FactoryMethodCreationBoundaryLab() {
  const [creatorKey, setCreatorKey] = useState<CreatorKey>("csv");
  const [bypassFactory, setBypassFactory] = useState(false);
  const [ran, setRan] = useState(false);
  const creator =
    CREATORS.find((item) => item.key === creatorKey) ?? CREATORS[0];
  const contractPasses = !bypassFactory;
  const resultState = !ran
    ? "等待运行"
    : contractPasses
      ? "契约通过"
      : "契约拒绝";

  function runImport() {
    setRan(true);
  }

  function reset() {
    setCreatorKey("csv");
    setBypassFactory(false);
    setRan(false);
  }

  return (
    <figure
      aria-label="工厂方法创建边界实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="factory-method-creation-boundary-lab"
      data-unit-id="designpatterns-08"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              FACTORY METHOD · CREATION BOUNDARY
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              文档导入创建边界台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择具体创建者，观察稳定流程如何调用工厂方法；越过创建边界时，抽象产品合同会拒绝不兼容对象。
            </p>
          </div>
          <button
            aria-label="重置工厂方法创建边界实验"
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
                <p className="text-xs font-semibold text-secondary">
                  选择具体创建者
                </p>
                <span className="text-xs text-secondary">
                  {OFFICIAL_CONCEPTS.length} 个目录节点
                </span>
              </div>
              <div className="mt-2 grid gap-2">
                {CREATORS.map((item) => (
                  <button
                    aria-pressed={item.key === creatorKey}
                    className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                      item.key === creatorKey
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                    key={item.key}
                    onClick={() => {
                      setCreatorKey(item.key);
                      setRan(false);
                    }}
                    type="button"
                  >
                    <span className="block break-words">{item.label}</span>
                    <span className="mt-1 block text-[11px] text-secondary">
                      {item.product} · {item.detail}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              aria-pressed={bypassFactory}
              className={`min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                bypassFactory
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary"
              }`}
              onClick={() => {
                setBypassFactory((value) => !value);
                setRan(false);
              }}
              type="button"
            >
              {bypassFactory ? "恢复工厂方法创建" : "绕过工厂方法"}
            </button>
            <p className="text-xs leading-5 text-secondary">
              越界对象仍可能有 `parse` 方法，但不再由当前 ConcreteCreator 的工厂方法创建；这正是抽象产品边界要捕捉的差异。
            </p>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={runImport}
              type="button"
            >
              运行导入流程
            </button>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {creator.className} · CREATOR
              </p>
              <span
                className={`rounded-control border px-2 py-1 text-xs ${
                  !ran
                    ? "border-border text-secondary"
                    : contractPasses
                      ? "border-success text-success"
                      : "border-warning text-warning"
                }`}
              >
                {resultState}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[0.82fr_1.18fr]">
              <div className="rounded-control border border-accent p-4">
                <p className="text-xs font-semibold text-accent">工厂方法</p>
                <p className="mt-2 break-words font-mono text-sm text-primary">
                  createParser()
                </p>
                <p className="mt-2 text-xs leading-5 text-secondary">
                  {bypassFactory
                    ? "当前创建被绕过，产品来源不再受 ConcreteCreator 保护。"
                    : `返回 ${creator.product}，Creator 仍只依赖 Parser。`}
                </p>
              </div>
              <div className="rounded-control border border-border p-4">
                <p className="text-xs font-semibold text-secondary">统一流程轨迹</p>
                <div className="mt-3 space-y-2">
                  {PIPELINE_STEPS.map((step, index) => (
                    <div className="flex min-w-0 items-center gap-2" key={step.key}>
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full border text-[11px] ${
                          ran && contractPasses
                            ? "border-success text-success"
                            : index === 1 && bypassFactory
                              ? "border-warning text-warning"
                              : "border-border text-secondary"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="min-w-0 break-words text-xs text-primary">
                        {step.label}
                        <span className="ml-2 font-mono text-[11px] text-secondary">
                          {step.detail}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              aria-live="polite"
              className={`mt-4 rounded-control border p-4 ${
                !ran
                  ? "border-border"
                  : contractPasses
                    ? "border-success"
                    : "border-warning"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  !ran
                    ? "text-primary"
                    : contractPasses
                      ? "text-success"
                      : "text-warning"
                }`}
              >
                {!ran
                  ? "流程尚未运行：先观察创建点"
                  : contractPasses
                    ? "契约通过：Creator 使用抽象 Product"
                    : "契约拒绝：直接构造越过创建边界"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {!ran
                  ? "可以切换具体创建者；格式变化应该只改变工厂方法返回的 Product。"
                  : contractPasses
                    ? `${creator.product} 完成解析，稳定的打开、错误处理与关闭流程无需复制。`
                    : "当前对象不由 ConcreteCreator 的工厂方法提供，通用流程拒绝继续，以免格式细节穿透抽象产品。"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
