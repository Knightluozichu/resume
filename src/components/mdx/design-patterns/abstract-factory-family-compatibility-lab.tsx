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

const FAMILIES = [
  {
    key: "web",
    label: "Web 产品族",
    detail: "按钮、菜单和对话框共享浏览器交互约束。",
    products: ["WebButton", "WebMenu", "WebDialog"],
  },
  {
    key: "desktop",
    label: "桌面产品族",
    detail: "按钮、菜单和对话框共享桌面窗口语义。",
    products: ["DesktopButton", "DesktopMenu", "DesktopDialog"],
  },
  {
    key: "test",
    label: "测试替身族",
    detail: "每个产品都记录调用，便于界面契约测试。",
    products: ["FakeButton", "FakeMenu", "FakeDialog"],
  },
] as const;

type FamilyKey = (typeof FAMILIES)[number]["key"];

export function AbstractFactoryFamilyCompatibilityLab() {
  const [familyKey, setFamilyKey] = useState<FamilyKey>("web");
  const [mixedFamily, setMixedFamily] = useState(false);
  const family = FAMILIES.find((item) => item.key === familyKey) ?? FAMILIES[0];
  const products = mixedFamily
    ? [family.products[0], "DesktopMenu", family.products[2]]
    : family.products;
  const compatible = !mixedFamily;

  function reset() {
    setFamilyKey("web");
    setMixedFamily(false);
  }

  return (
    <figure
      aria-label="抽象工厂产品族兼容性实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="abstract-factory-family-compatibility-lab"
      data-unit-id="designpatterns-09"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              ABSTRACT FACTORY · FAMILY CONTRACT
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              产品族兼容性评审台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个工厂，观察它如何成组创建产品；故障开关会把一个菜单替换成桌面产品，展示混用为何应该被拒绝。
            </p>
          </div>
          <button
            aria-label="重置抽象工厂产品族实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-xs font-semibold text-secondary">
                选择具体工厂
              </p>
              <div className="mt-2 grid gap-2">
                {FAMILIES.map((item) => (
                  <button
                    aria-pressed={item.key === familyKey}
                    className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                      item.key === familyKey
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                    key={item.key}
                    onClick={() => setFamilyKey(item.key)}
                    type="button"
                  >
                    <span className="block break-words">{item.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {family.detail}
              </p>
            </div>

            <button
              aria-pressed={mixedFamily}
              className={`min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                mixedFamily
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary"
              }`}
              onClick={() => setMixedFamily((value) => !value)}
              type="button"
            >
              {mixedFamily ? "恢复同族产品" : "注入跨族混用故障"}
            </button>
            <p className="text-xs leading-5 text-secondary">
              当前按 {OFFICIAL_CONCEPTS.length}{" "}
              个正式目录字段复核：创建规则、产品角色、协作契约和后果必须能回到代码。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {family.label} · 当前结构
              </p>
              <span
                className={`rounded-control border px-2 py-1 text-xs ${
                  compatible
                    ? "border-success text-success"
                    : "border-warning text-warning"
                }`}
              >
                {compatible ? "同族兼容" : "跨族混用"}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[0.7fr_1.3fr]">
              <div className="rounded-control border border-accent p-4">
                <p className="text-xs font-semibold text-accent">抽象工厂</p>
                <p className="mt-2 break-words font-mono text-sm text-primary">
                  {family.key}Factory
                </p>
                <p className="mt-2 text-xs leading-5 text-secondary">
                  客户端只请求产品角色，不直接依赖具体产品类。
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {products.map((product, index) => (
                  <div
                    className={`min-w-0 rounded-control border p-3 ${
                      compatible
                        ? "border-border"
                        : index === 1
                          ? "border-warning"
                          : "border-border"
                    }`}
                    key={`${product}-${index}`}
                  >
                    <span className="text-xs text-secondary">
                      产品角色 {index + 1}
                    </span>
                    <strong className="mt-2 block break-words font-mono text-xs text-primary">
                      {product}
                    </strong>
                    <p className="mt-2 text-xs leading-5 text-secondary">
                      {index === 0 ? "按钮" : index === 1 ? "菜单" : "对话框"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              aria-live="polite"
              className={`mt-4 rounded-control border p-4 ${
                compatible ? "border-success" : "border-warning"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  compatible ? "text-success" : "text-warning"
                }`}
              >
                {compatible
                  ? "契约通过：产品来自同一兼容族"
                  : "契约拒绝：产品族已被混用"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {compatible
                  ? "界面树可以只依赖抽象产品接口；切换整个工厂时，按钮、菜单和对话框一起变化。"
                  : "菜单来自 Desktop 产品族，接口形状可能仍然相同，但平台行为和样式契约已经失效。"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
