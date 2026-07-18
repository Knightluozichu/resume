"use client";

import { useState } from "react";

const setupLayers = [
  {
    layer: "compiler",
    choice: "Clang / GCC / MSVC",
    responsibility: "把每个翻译单元编译为目标文件，并给出语言与类型诊断",
    evidence: "版本 · C++ 标准 · 警告选项",
    className: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    layer: "build graph",
    choice: "CMake + CTest",
    responsibility: "声明产品目标、测试目标、依赖边和可重复测试入口",
    evidence: "configure · build · test 命令",
    className: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    layer: "test framework",
    choice: "GoogleTest / GoogleMock / CppUTest",
    responsibility: "注册测试、执行夹具、比较结果并报告失败位置",
    evidence: "测试发现数 · 退出码 · 失败输出",
    className: "border-amber-500/35 bg-amber-500/10",
  },
] as const;

export function CtrToolchainSetupMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="现代 C++ TDD 环境中编译器、CMake 构建图和测试框架的责任与证据分层图"
          className="grid gap-3 lg:grid-cols-3"
        >
          {setupLayers.map((item, index) => (
            <section key={item.layer} className={`min-h-64 border p-4 ${item.className}`}>
              <span className="text-xs text-secondary">layer 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{item.layer}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{item.choice}</code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.responsibility}</p>
              <p className="mb-0 mt-4 border-t border-border pt-3 text-xs text-secondary">
                evidence · {item.evidence}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三层工具各有独立责任；“IDE 能运行”不能替代编译器版本、构建图和测试结果三类证据。
      </figcaption>
    </figure>
  );
}

const targetFlow = [
  { target: "soundex", input: "Soundex.cpp", output: "libsoundex", contract: "产品代码不依赖测试框架" },
  { target: "soundex_test", input: "SoundexTest.cpp", output: "test executable", contract: "链接 soundex + GTest::gtest_main" },
  { target: "discover", input: "gtest_discover_tests", output: "CTest cases", contract: "配置后自动枚举 TEST 用例" },
  { target: "verify", input: "ctest --output-on-failure", output: "exit code + report", contract: "测试失败使流水线失败" },
] as const;

export function CtrTestTargetBuildFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="CMake 从产品库、测试可执行文件到 CTest 发现和验证的目标依赖流程" className="space-y-3">
          {targetFlow.map((item, index) => (
            <section
              key={item.target}
              className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.45fr_0.8fr_0.8fr_1.25fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">step 0{index + 1}</span>
                <strong className="mt-2 block text-sm text-primary">{item.target}</strong>
              </div>
              <code className="break-words text-xs text-accent">{item.input}</code>
              <span className="text-xs text-primary">output · {item.output}</span>
              <span className="text-xs text-secondary">contract · {item.contract}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        测试不是手工运行的旁路程序，而是构建图中的一等目标，并通过 CTest 把失败退出码传给持续集成。
      </figcaption>
    </figure>
  );
}

const environmentCases = [
  {
    label: "版本漂移",
    mutation: "开发机使用 Clang 19，流水线仍使用 Clang 16",
    symptom: "警告、标准库行为或 sanitizer 结果不同",
    proof: "在配置日志打印编译器 ID/版本，并让 CI 使用同一 preset",
    owner: "toolchain contract",
  },
  {
    label: "漏跑测试",
    mutation: "新增 TEST 源文件，但测试目标没有包含它",
    symptom: "构建成功，CTest 报告的用例数没有增加",
    proof: "先预测测试总数，再核对 ctest -N 与源文件注册关系",
    owner: "test discovery",
  },
  {
    label: "依赖漂移",
    mutation: "每次配置都从网络抓取未固定分支的 GoogleTest",
    symptom: "相同源码在不同日期得到不同依赖代码",
    proof: "固定发布版本或提交哈希，保留锁定值与离线缓存策略",
    owner: "third-party boundary",
  },
  {
    label: "旧构建树",
    mutation: "切换编译器后继续复用原有 CMakeCache.txt",
    symptom: "日志显示的编译器与预期不一致，结果难以复现",
    proof: "每个工具链使用独立构建目录，从空目录重新 configure",
    owner: "build directory",
  },
] as const;

export function CtrEnvironmentProofLab() {
  const [active, setActive] = useState(0);
  const current = environmentCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 C++ TDD 环境故障" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {environmentCases.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`min-h-11 border px-3 py-2 text-sm transition-colors ${
                active === index
                  ? "border-accent bg-accent/15 text-primary"
                  : "border-border bg-background text-secondary hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">owner · {current.owner}</span>
          <strong className="mt-3 block text-base text-primary">{current.mutation}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4">
              <span className="text-xs text-secondary">可观察症状</span>
              <p className="mb-0 mt-3 text-xs text-primary">{current.symptom}</p>
            </div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">验证方法</span>
              <p className="mb-0 mt-3 text-xs text-primary">{current.proof}</p>
            </div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点击故障类型并先写预测；一套环境只有能暴露版本、发现数量、依赖锁定和构建目录时才可复现。
      </figcaption>
    </figure>
  );
}
