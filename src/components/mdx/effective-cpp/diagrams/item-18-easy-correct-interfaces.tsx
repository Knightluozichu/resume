"use client";

import { useState } from "react";

type OwnershipScenario = {
  label: string;
  owner: string;
  release: string;
  failure: string;
  rule: string;
};

const OWNERSHIP_SCENARIOS: readonly OwnershipScenario[] = [
  {
    label: "裸指针协议",
    owner: "应用拿到 ApiObject*",
    release: "应用侧 delete",
    failure: "allocator / CRT 不一致，释放责任靠记忆",
    rule: "不要把 create 与 destroy 分成文档约定",
  },
  {
    label: "typed owner",
    owner: "ApiOwner 绑定 destroy_api_object",
    release: "owner 析构回到创建 DLL",
    failure: "错误 delete 路径无法从类型自然产生",
    rule: "让返回类型携带 ownership 和 deleter",
  },
  {
    label: "opaque handle",
    owner: "C handle 隐藏对象布局",
    release: "destroy(handle) 由模块导出",
    failure: "ABI 不暴露 class layout 与 STL 类型",
    rule: "跨边界只暴露稳定的操作与释放函数",
  },
];

export function EcppItem18InterfaceContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 960 360"
          role="img"
          aria-label="接口防误用地图：原始整数允许参数错位，强类型阻止错位，验证 factory 把无效值挡在领域核心之外。"
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          <text
            x="480"
            y="30"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Turn natural misuse into an earlier boundary failure
          </text>
          <text
            x="480"
            y="54"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            same representation is not the same meaning
          </text>

          <g>
            <rect
              x="32"
              y="92"
              width="258"
              height="124"
              rx="14"
              fill="var(--background)"
              stroke="var(--danger)"
              strokeWidth="1.6"
            />
            <text
              x="161"
              y="122"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--danger)"
            >
              int, int, int
            </text>
            <text
              x="161"
              y="151"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              Date(30, 2, 2026)
            </text>
            <text
              x="161"
              y="181"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              编译通过，语义错位晚发现
            </text>
          </g>

          <path
            d="M290 154 H332"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M324 147 L336 154 L324 161"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="340"
              y="92"
              width="278"
              height="124"
              rx="14"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="479"
              y="122"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--accent)"
            >
              Month · Day · Year
            </text>
            <text
              x="479"
              y="151"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              Date{`{Day{30}, Month::Feb()}`}
            </text>
            <text
              x="479"
              y="181"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              类型错误先在编译期失败
            </text>
          </g>

          <path
            d="M618 154 H660"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M652 147 L664 154 L652 161"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="668"
              y="92"
              width="260"
              height="124"
              rx="14"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="798"
              y="122"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--accent)"
            >
              validating factory
            </text>
            <text
              x="798"
              y="151"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              fromInt / Date::create
            </text>
            <text
              x="798"
              y="181"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              无效值停在边界，不进入核心
            </text>
          </g>

          <line
            x1="32"
            y1="262"
            x2="928"
            y2="262"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <text
            x="480"
            y="292"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            接口设计的顺序：先减 caller burden，再把规则交给类型和 factory
          </text>
          <text
            x="480"
            y="324"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            错误越高频，越应该在调用者最自然的路径上尽早暴露
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        强类型解决参数互换，验证 factory
        解决无效状态；两者共同缩短从误用到反馈的距离。
      </figcaption>
    </figure>
  );
}

export function EcppItem18ValidationBoundaryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 900 330"
          role="img"
          aria-label="验证边界图：原始输入先经过 validating factory，再进入满足 class invariant 的领域对象；非法输入沿错误分支返回。"
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <text
            x="450"
            y="30"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Validate once, then keep the invariant inside
          </text>
          <text
            x="450"
            y="54"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            boundary validation prevents every business function from rechecking
            the same rule
          </text>

          <g>
            <rect
              x="38"
              y="110"
              width="190"
              height="82"
              rx="12"
              fill="var(--background)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <text
              x="133"
              y="141"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              raw input
            </text>
            <text
              x="133"
              y="169"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              month=37, day=30
            </text>
          </g>
          <path d="M228 151 H286" stroke="var(--accent)" strokeWidth="2.5" />
          <path
            d="M278 144 L290 151 L278 158"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          <g>
            <rect
              x="294"
              y="92"
              width="246"
              height="118"
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="417"
              y="127"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--accent)"
            >
              validating factory
            </text>
            <text
              x="417"
              y="157"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              fromInt + Date::create
            </text>
            <text
              x="417"
              y="184"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              检查单字段与跨字段规则
            </text>
          </g>
          <path d="M540 151 H598" stroke="var(--accent)" strokeWidth="2.5" />
          <path
            d="M590 144 L602 151 L590 158"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          <g>
            <rect
              x="606"
              y="92"
              width="256"
              height="118"
              rx="12"
              fill="var(--success)"
              fillOpacity="0.08"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x="734"
              y="127"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--success)"
            >
              valid Date object
            </text>
            <text
              x="734"
              y="157"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              class invariant always holds
            </text>
            <text
              x="734"
              y="184"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              业务函数可以信任输入
            </text>
          </g>

          <path
            d="M417 210 V254 H250"
            fill="none"
            stroke="var(--danger)"
            strokeWidth="2"
          />
          <path
            d="M258 247 L246 254 L258 261"
            fill="none"
            stroke="var(--danger)"
            strokeWidth="2"
          />
          <text
            x="120"
            y="289"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--danger)"
          >
            invalid → optional / Result error
          </text>
          <text
            x="690"
            y="254"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            成功才发布对象
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        把验证集中到构造边界，核心代码只接收已经满足不变量的对象。
      </figcaption>
    </figure>
  );
}

export function EcppItem18OwnershipBoundaryLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = OWNERSHIP_SCENARIOS[activeIndex];

  const reset = () => setActiveIndex(0);

  return (
    <section
      aria-label="Item 18 ownership boundary 实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">
            ownership boundary 实验
          </p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            先预测：哪条释放路径最难被误用？
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            切换三种跨模块接口，观察 ownership、释放函数和 ABI
            边界是否被返回类型携带。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 18 ownership boundary 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Item 18 ownership boundary 场景"
          className="grid gap-2 md:grid-cols-3"
        >
          {OWNERSHIP_SCENARIOS.map((scenario, index) => (
            <button
              key={scenario.label}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`min-h-11 rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                index === activeIndex
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <svg
            viewBox="0 0 760 250"
            role="img"
            aria-label={`当前 ownership 场景：${active.label}。${active.owner}，${active.release}。`}
            className="h-auto w-full"
          >
            <text
              x="380"
              y="24"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              create → own → release
            </text>
            <rect
              x="30"
              y="78"
              width="200"
              height="84"
              rx="12"
              fill="var(--background)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <text
              x="130"
              y="111"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              创建模块
            </text>
            <text
              x="130"
              y="139"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              create()
            </text>
            <path d="M230 120 H286" stroke="var(--accent)" strokeWidth="2.5" />
            <path
              d="M278 113 L290 120 L278 127"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <rect
              x="298"
              y="78"
              width="200"
              height="84"
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="398"
              y="111"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--accent)"
            >
              owner / handle
            </text>
            <text
              x="398"
              y="139"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              {active.owner}
            </text>
            <path d="M498 120 H554" stroke="var(--accent)" strokeWidth="2.5" />
            <path
              d="M546 113 L558 120 L546 127"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <rect
              x="566"
              y="78"
              width="164"
              height="84"
              rx="12"
              fill="var(--success)"
              fillOpacity="0.08"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x="648"
              y="111"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--success)"
            >
              释放
            </text>
            <text
              x="648"
              y="139"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              {active.release}
            </text>
            <text
              x="380"
              y="207"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--danger)"
            >
              风险：{active.failure}
            </text>
            <text
              x="380"
              y="232"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              设计规则：{active.rule}
            </text>
          </svg>
        </div>
        <div className="p-4">
          <p className="text-xs font-medium text-accent">当前观察</p>
          <div
            role="status"
            aria-live="polite"
            className="mt-2 rounded-control border border-border bg-background p-4"
          >
            <p className="font-semibold text-primary">{active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {active.failure}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-primary">
              {active.rule}
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-secondary">
            选择 typed owner 后，业务层只持有 borrow 或
            owner；它不再需要记住“由哪一个 DLL 的 allocator 释放”。
          </p>
        </div>
      </div>
    </section>
  );
}
