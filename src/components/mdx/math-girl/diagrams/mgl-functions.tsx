"use client";

import { MathGirlOfficialLab } from "./official-lab";

/**
 * <MglFunctionsDiagram>：函数复合与逆函数图解（mgl-functions 章）。
 *
 * 左侧：函数复合 f(g(x)) 的流程示意。
 * 右侧：逆函数示意 + 常见函数族对比。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const contractCases = [
  {
    label: "函数合同",
    fields: [
      ["记号", "f:X→Y"],
      ["定义域X", "允许输入的集合"],
      ["陪域Y", "声明输出所在集合"],
      ["唯一性", "每个输入恰有一个输出"],
    ],
  },
  {
    label: "像与值域",
    fields: [
      ["像", "某个x对应的f(x)"],
      ["像集", "所有实际输出f(X)"],
      ["关系", "f(X)包含于Y"],
      ["满射", "f(X)=Y"],
    ],
  },
  {
    label: "编程合同",
    fields: [
      ["输入类型", "定义域的近似表达"],
      ["返回类型", "陪域的近似表达"],
      ["前置条件", "类型之外的合法输入约束"],
      ["失败", "异常、错误值或未定义行为需声明"],
    ],
  },
  {
    label: "纯度边界",
    fields: [
      ["数学函数", "同一输入唯一确定同一输出"],
      ["纯函数", "结果只依赖显式输入且无可观察副作用"],
      ["普通过程", "可依赖时间、状态、I/O或随机源"],
      ["建模", "把隐藏依赖加入输入才能视为映射"],
    ],
    alert:
      "编程语言中的function只是调用机制；有状态、I/O或随机过程不自动满足数学函数的合同。",
  },
] as const;

const compositionCases = [
  {
    label: "复合可定义",
    fields: [
      ["g", "X→Y"],
      ["f", "Y→Z"],
      ["复合", "f∘g:X→Z"],
      ["顺序", "先g后f"],
    ],
  },
  {
    label: "复合规律",
    fields: [
      ["结合律", "(f∘g)∘h=f∘(g∘h)"],
      ["交换律", "一般不成立"],
      ["单位函数", "id∘f=f∘id=f"],
      ["类型检查", "中间集合必须兼容"],
    ],
  },
  {
    label: "单射与满射",
    fields: [
      ["单射", "不同输入不会撞到同一输出"],
      ["满射", "陪域每个元素都被命中"],
      ["双射", "同时单射且满射"],
      ["逆函数", "存在当且仅当双射"],
    ],
  },
  {
    label: "限制平方函数",
    fields: [
      ["原函数", "x²:R→R不是单射也非满射"],
      ["限制定义域", "x≥0后成为单射"],
      ["限制陪域", "改为[0,∞)后成为满射"],
      ["逆", "平方根函数"],
    ],
    alert:
      "严格单调保证区间上的单射，但只有把陪域选成实际像集后，函数才是双射并拥有双边逆。",
  },
] as const;

const growthCases = [
  {
    label: "数列也是函数",
    fields: [
      ["定义域", "自然数N"],
      ["输出", "第n项a(n)"],
      ["递推", "用较早输入的值定义后项"],
      ["例子", "斐波那契与调和数"],
    ],
  },
  {
    label: "极限与连续",
    fields: [
      ["极限", "输入接近时输出趋向目标"],
      ["连续", "函数值与极限一致"],
      ["严格语言", "ε-δ量化输入输出误差"],
      ["用途", "证明逼近和迭代行为"],
    ],
  },
  {
    label: "线性变换",
    fields: [
      ["对象", "向量空间之间的函数"],
      ["保持", "向量加法与标量乘法"],
      ["矩阵", "选定基后记录线性变换"],
      ["复合", "对应矩阵乘法"],
    ],
  },
  {
    label: "增长阶",
    fields: [
      ["对数", "log n"],
      ["线性", "n"],
      ["多项式", "nᵏ"],
      ["指数", "cⁿ，c大于1"],
    ],
    alert:
      "增长阶比较是n趋向无穷时的渐近结论；有限输入上的实际耗时还受常数、缓存和实现影响。",
  },
] as const;

export function MglFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="函数复合与逆函数图解。左侧展示函数复合 f(g(x))：x→g(x)=2x→f(2x)=(2x)²+1=4x²+1，三个圆圈用箭头串联。右侧上方展示逆函数：f(x)=x²+1 和 f⁻¹(y)=√(y-1) 互为逆。右侧下方展示四种函数族的增长曲线对比：对数、线性、多项式、指数。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>函数：复合、逆与函数族</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>函数是编程与数学的共通语言</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：函数复合 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>函数复合 (f ∘ g)(x)</text>

          {/* x → g → f → 结果 */}
          <ellipse cx="80" cy="140" rx="28" ry="20" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="80" y="145" textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>x</text>

          <line x1="112" y1="140" x2="138" y2="140" stroke={secondary} strokeWidth="1.4" />
          <polygon points="138,136 138,144 144,140" fill={secondary} />
          <text x="125" y="132" textAnchor="middle" fontSize="10" fill={secondary}>g</text>

          <ellipse cx="180" cy="140" rx="36" ry="20" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x="180" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>2x</text>

          <line x1="218" y1="140" x2="244" y2="140" stroke={secondary} strokeWidth="1.4" />
          <polygon points="244,136 244,144 250,140" fill={secondary} />
          <text x="231" y="132" textAnchor="middle" fontSize="10" fill={secondary}>f</text>

          <ellipse cx="290" cy="140" rx="40" ry="20" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
          <text x="290" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>4x²+1</text>

          <text x="180" y="182" textAnchor="middle" fontSize="11" fill={secondary}>g(x)=2x → f(g(x))=(2x)²+1</text>

          {/* 逆函数 */}
          <rect x="48" y="208" width="280" height="76" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="228" fontSize="12" fontWeight="700" fill={danger}>逆函数 f⁻¹</text>
          <text x="64" y="248" fontSize="11" fontFamily="monospace" fill={primary}>f:[0,∞)→[1,∞), f(x)=x²+1</text>
          <text x="64" y="266" fontSize="11" fontFamily="monospace" fill={primary}>f⁻¹(y) = √(y - 1)</text>
          <text x="64" y="280" fontSize="11" fill={secondary}>限制定义域与陪域后才有双边逆</text>

          {/* ===== 右侧：函数族 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>函数族增长对比</text>

          {/* 坐标轴 */}
          <line x1="380" y1="280" x2="660" y2="280" stroke={border} strokeWidth="1" />
          <line x1="380" y1="110" x2="380" y2="280" stroke={border} strokeWidth="1" />

          {/* 曲线 */}
          <path d="M 380 270 Q 500 264 660 250" fill="none" stroke={success} strokeWidth="2" />
          <text x="580" y="245" fontSize="11" fill={success}>log n（慢）</text>

          <path d="M 380 270 L 660 170" fill="none" stroke={accent} strokeWidth="2" />
          <text x="600" y="175" fontSize="11" fill={accent}>n（线性）</text>

          <path d="M 380 270 Q 500 260 660 160" fill="none" stroke={warning} strokeWidth="2" />
          <text x="610" y="160" fontSize="11" fill={warning}>n²（快）</text>

          <path d="M 380 270 Q 550 268 640 130" fill="none" stroke={danger} strokeWidth="2" />
          <text x="610" y="130" fontSize="11" fill={danger}>2ⁿ（爆炸）</text>

          <text x="520" y="298" textAnchor="middle" fontSize="11" fill={secondary}>x</text>
          <text x="368" y="120" textAnchor="middle" fontSize="11" fill={secondary}>y</text>

          {/* 底部总结 */}
          <rect x="48" y="304" width="624" height="72" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x="64" y="324" fontSize="12" fontWeight="700" fill={accent}>函数 ↔ 编程</text>
          <text x="64" y="344" fontSize="11" fill={primary}>数学函数 f:X→Y ↔ 显式输入决定唯一输出的纯函数</text>
          <text x="64" y="360" fontSize="11" fill={primary}>复合 f∘g = 可类型检查的函数组合　　逆函数 = 双射的反向映射</text>
          <text x="64" y="372" fontSize="11" fill={secondary}>普通程序过程还可能依赖状态、I/O、时间与随机源</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数复合是「先执行一个变换再执行另一个」，逆函数是「撤销变换」。对数增长最慢（O(log n) 算法高效），指数增长最快（O(2ⁿ) 算法不可行）。函数是数学与编程的共通语言。
      </figcaption>
    </figure>
  );
}

export function MglFunctionContractLab() {
  return (
    <MathGirlOfficialLab
      cases={contractCases}
      caption="函数合同需要定义域、陪域和唯一输出；像集是实际输出，不能与声明的陪域混为一谈。"
      tone="cyan"
    />
  );
}

export function MglCompositionInverseLab() {
  return (
    <MathGirlOfficialLab
      cases={compositionCases}
      caption="复合先检查中间类型；逆函数存在当且仅当原函数在所声明的定义域与陪域之间是双射。"
      tone="amber"
    />
  );
}

export function MglFunctionGrowthLab() {
  return (
    <MathGirlOfficialLab
      cases={growthCases}
      caption="数列、连续函数、线性变换与算法增长阶都是函数视角在前四卷中的不同落点。"
      tone="violet"
    />
  );
}
