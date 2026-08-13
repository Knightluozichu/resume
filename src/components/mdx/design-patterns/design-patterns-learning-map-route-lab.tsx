"use client";

import { useState } from "react";

const ROUTE_STOPS = [
  {
    key: "orientation",
    label: "先修与问题",
    chapter: "导论：什么是设计模式",
    prerequisite: "能描述上下文、变化轴、参与者和后果",
    artifact: "一张问题合同和一个拒绝条件",
    checkpoint: "还没有问题边界时，不进入模式目录。",
  },
  {
    key: "creational",
    label: "创建型",
    chapter: "创建型模式",
    prerequisite: "问题集中在创建规则或产品族变化",
    artifact: "创建者、产品和客户端的依赖草图",
    checkpoint: "先比较直接构造，再决定是否隔离创建变化。",
  },
  {
    key: "structural",
    label: "结构型",
    chapter: "结构型模式",
    prerequisite: "能指出接口、所有权和组合关系",
    artifact: "调用方向与适配边界图",
    checkpoint: "结构相似不等于意图相同，要保留转换代价。",
  },
  {
    key: "behavioral",
    label: "行为型",
    chapter: "行为型模式",
    prerequisite: "能追踪消息、状态和失败传播",
    artifact: "一条协作时序和一个边界样例",
    checkpoint: "只有函数改名时，不要用模式名掩盖简单实现。",
  },
  {
    key: "review",
    label: "综合复盘",
    chapter: "结论与复盘",
    prerequisite: "能比较收益、成本、替代方案和撤回条件",
    artifact: "一份可复查的模式决定记录",
    checkpoint: "接受和拒绝都必须能由样例与证据重放。",
  },
] as const;

const PRESSURES = [
  {
    key: "change",
    label: "变化会扩散",
    detail: "先沿着变化轴找隔离点，再看创建、结构或行为哪一类入口更贴近问题。",
  },
  {
    key: "creation",
    label: "创建规则变化",
    detail: "客户端不应知道具体产品类，但隐藏创建也会增加入口和调试路径。",
  },
  {
    key: "structure",
    label: "接口需要组合",
    detail:
      "已有对象要协作时，先核对所有权与转换责任，不把包装层当成免费抽象。",
  },
  {
    key: "collaboration",
    label: "协作算法变化",
    detail: "先画消息与状态，再判断是否值得把职责拆到多个参与者。",
  },
] as const;

type RouteKey = (typeof ROUTE_STOPS)[number]["key"];
type PressureKey = (typeof PRESSURES)[number]["key"];

export function DesignPatternsLearningMapRouteLab() {
  const [routeKey, setRouteKey] = useState<RouteKey>("orientation");
  const [pressureKey, setPressureKey] = useState<PressureKey>("change");
  const [skipPrerequisite, setSkipPrerequisite] = useState(false);

  const routeIndex = ROUTE_STOPS.findIndex((item) => item.key === routeKey);
  const route = ROUTE_STOPS[routeIndex] ?? ROUTE_STOPS[0];
  const pressure =
    PRESSURES.find((item) => item.key === pressureKey) ?? PRESSURES[0];
  const routeIsValid = !skipPrerequisite || routeIndex === 0;

  function reset() {
    setRouteKey("orientation");
    setPressureKey("change");
    setSkipPrerequisite(false);
  }

  return (
    <figure
      aria-label="设计模式全书学习路线图交互"
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="design-patterns-learning-map-route-lab"
      data-book="design-patterns"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DESIGN PATTERNS · ROUTE MAP
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从变化压力选择学习路径
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              这张路线图把 23
              个模式目录放回问题、分类、实验和复盘四类证据；它是导航，不是把标题当成已学会的结论。
            </p>
          </div>
          <button
            aria-label="重置设计模式学习路线图"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置路线
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-xs font-semibold text-secondary">
                先选择变化压力
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {PRESSURES.map((item) => (
                  <button
                    aria-pressed={item.key === pressureKey}
                    className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                      item.key === pressureKey
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                    key={item.key}
                    onClick={() => setPressureKey(item.key)}
                    type="button"
                  >
                    <span className="block break-words">{item.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {pressure.detail}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-secondary">
                再定位正式路径
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {ROUTE_STOPS.map((item, index) => (
                  <button
                    aria-pressed={item.key === routeKey}
                    className={`min-h-11 min-w-0 rounded-control border px-2 py-2 text-xs transition-colors ${
                      item.key === routeKey
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                    key={item.key}
                    onClick={() => setRouteKey(item.key)}
                    type="button"
                  >
                    <span className="mr-1 text-secondary">{index + 1}.</span>
                    <span className="break-words">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              aria-pressed={skipPrerequisite}
              className={`min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                skipPrerequisite
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary"
              }`}
              onClick={() => setSkipPrerequisite((value) => !value)}
              type="button"
            >
              {skipPrerequisite ? "恢复先修检查" : "注入跳过先修的故障"}
            </button>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                当前路线 · {routeIndex + 1} / {ROUTE_STOPS.length}
              </p>
              <span
                className={`rounded-control border px-2 py-1 text-xs ${
                  routeIsValid
                    ? "border-success text-success"
                    : "border-warning text-warning"
                }`}
              >
                {routeIsValid ? "可继续复核" : "先修条件被跳过"}
              </span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-5">
              {ROUTE_STOPS.map((item, index) => (
                <div className="min-w-0" key={item.key}>
                  <div
                    className={`min-h-24 rounded-control border p-3 ${
                      index === routeIndex
                        ? "border-accent bg-elevated"
                        : index < routeIndex
                          ? "border-success bg-elevated"
                          : "border-border bg-elevated"
                    }`}
                  >
                    <span className="text-xs text-secondary">0{index + 1}</span>
                    <strong className="mt-1 block break-words text-xs text-primary">
                      {item.label}
                    </strong>
                    <span className="mt-2 block text-xs text-secondary">
                      {index < routeIndex
                        ? "已留下证据"
                        : index === routeIndex
                          ? "当前检查"
                          : "待进入"}
                    </span>
                  </div>
                  {index < ROUTE_STOPS.length - 1 ? (
                    <div
                      aria-hidden="true"
                      className="my-1 h-px bg-border sm:my-0 sm:mt-10 sm:ml-[calc(100%+0.5rem)] sm:w-2"
                    />
                  ) : null}
                </div>
              ))}
            </div>

            <div
              className="mt-4 rounded-control border border-border p-4"
              aria-live="polite"
            >
              <p className="text-base font-semibold text-primary">
                {route.chapter}
              </p>
              <dl className="mt-3 grid gap-3 text-xs sm:grid-cols-3">
                <div>
                  <dt className="font-semibold text-accent">进入条件</dt>
                  <dd className="mt-1 leading-5 text-secondary">
                    {route.prerequisite}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-accent">应留下的产物</dt>
                  <dd className="mt-1 leading-5 text-secondary">
                    {route.artifact}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-accent">章节检查线</dt>
                  <dd className="mt-1 leading-5 text-secondary">
                    {route.checkpoint}
                  </dd>
                </div>
              </dl>
              {!routeIsValid ? (
                <p className="mt-3 rounded-control border border-warning p-3 text-xs leading-5 text-warning">
                  故障证据：你直接跳到了“{route.label}”，但没有先保存“
                  {ROUTE_STOPS[0].artifact}
                  ”。先修被跳过时，路线只能作为浏览入口，不能作为学习完成证明。
                </p>
              ) : (
                <p className="mt-3 rounded-control border border-success p-3 text-xs leading-5 text-success">
                  当前路线保留了先修、章节产物和复盘检查；点击其他节点，观察导航焦点如何变化，再点击重置确认基线可复现。
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
