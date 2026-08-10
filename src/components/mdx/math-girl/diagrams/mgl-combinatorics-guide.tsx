"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function CombinatoricsFrame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

/** 主图：切换组合与排列，观察“同一结果”的定义如何改变答案。 */
export function MglCountingChoiceDiagram() {
  const [mode, setMode] = useState<"combination" | "permutation">(
    "combination",
  );
  const isCombination = mode === "combination";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            aria-pressed={isCombination}
            onClick={() => setMode("combination")}
            className={`rounded-full border px-3 py-1 text-sm ${isCombination ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
          >
            只选小组
          </button>
          <button
            type="button"
            aria-pressed={!isCombination}
            onClick={() => setMode("permutation")}
            className={`rounded-full border px-3 py-1 text-sm ${!isCombination ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
          >
            分配职位
          </button>
          <button
            type="button"
            onClick={() => setMode("combination")}
            className="rounded-full border border-border px-3 py-1 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={`组合计数交互图。当前模式为${isCombination ? "组合" : "排列"}；从 5 人中取 3 人，${isCombination ? "顺序不重要，结果有 10 个" : "三个职位区分顺序，结果有 60 个"}。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            计数前先定义：哪些结果算同一个？
          </text>
          <text x="80" y="74" fontSize="13" fill={accent}>
            从 5 人中取 3 人
          </text>
          <rect
            x="64"
            y="96"
            width="270"
            height="214"
            rx="12"
            fill={isCombination ? success : accent}
            fillOpacity="0.07"
            stroke={isCombination ? success : accent}
            strokeOpacity="0.5"
          />
          <text
            x="199"
            y="132"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={isCombination ? success : accent}
          >
            {isCombination ? "组合：顺序不重要" : "排列：位置有区别"}
          </text>
          <text
            x="199"
            y="178"
            textAnchor="middle"
            fontSize="25"
            fontWeight="700"
            fill={primary}
          >
            {isCombination ? "C(5,3) = 10" : "P(5,3) = 60"}
          </text>
          <text
            x="199"
            y="220"
            textAnchor="middle"
            fontSize="13"
            fill={primary}
          >
            {isCombination ? "{A,B,C} = {C,B,A}" : "主席、秘书、财务"}
          </text>
          <text
            x="199"
            y="258"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {isCombination
              ? "交换内部顺序不产生新结果"
              : "交换职位就产生新结果"}
          </text>
          <text
            x="199"
            y="290"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {isCombination ? "除去 3! 次重复排列" : "每个位置依次选择"}
          </text>
          <line
            x1="366"
            y1="100"
            x2="366"
            y2="314"
            stroke={border}
            strokeDasharray="4 4"
          />
          <text x="398" y="132" fontSize="13" fontWeight="700" fill={warning}>
            验收问题
          </text>
          <text x="398" y="170" fontSize="13" fill={primary}>
            1. 顺序是否改变结果？
          </text>
          <text x="398" y="204" fontSize="13" fill={primary}>
            2. 是否允许重复？
          </text>
          <text x="398" y="238" fontSize="13" fill={primary}>
            3. 是否有边界约束？
          </text>
          <text x="398" y="286" fontSize="13" fill={success}>
            先定义对象，再选公式
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换模式观察同一批人为何产生两个答案；重置回到“只选小组”。
      </figcaption>
    </figure>
  );
}

export function MglCatalanConvolutionDiagram() {
  return (
    <CombinatoricsFrame
      ariaLabel="加法括号组合与卡塔兰数列图。一个合法对象按最后一次加法分类成左右两个子对象，大小 i 与 n−i 产生乘积 C_i C_{n−i}，所有 i 相加得到卡塔兰递推；右侧展示生成函数乘法和 C(x)=1+xC(x)^2。"
      caption="卡塔兰递推不是凭公式记忆，而是把对象按最后一次组合动作拆成两个独立子对象。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        最后一次动作，把一个对象拆成左右两半
      </text>
      <rect
        x="50"
        y="86"
        width="230"
        height="238"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="165"
        y="122"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        加法括号组合
      </text>
      <text
        x="165"
        y="166"
        textAnchor="middle"
        fontSize="23"
        fontFamily="monospace"
        fill={primary}
      >
        (L) + (R)
      </text>
      <text x="165" y="208" textAnchor="middle" fontSize="13" fill={primary}>
        左大小 i，右大小 n−i
      </text>
      <text x="165" y="246" textAnchor="middle" fontSize="13" fill={success}>
        Cᵢ · Cₙ₋ᵢ
      </text>
      <text x="165" y="288" textAnchor="middle" fontSize="12" fill={secondary}>
        子对象独立选择，再组合
      </text>
      <line
        x1="304"
        y1="204"
        x2="390"
        y2="204"
        stroke={border}
        strokeWidth="3"
      />
      <text x="347" y="182" textAnchor="middle" fontSize="12" fill={secondary}>
        对 i 求和
      </text>
      <rect
        x="390"
        y="86"
        width="280"
        height="238"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="530"
        y="122"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        卡塔兰数列
      </text>
      <text
        x="530"
        y="166"
        textAnchor="middle"
        fontSize="15"
        fontFamily="monospace"
        fill={primary}
      >
        C₀ = 1
      </text>
      <text
        x="530"
        y="202"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        Cₙ₊₁ = Σ CᵢCₙ₋ᵢ
      </text>
      <text
        x="530"
        y="246"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={accent}
      >
        C(x) = 1 + xC(x)²
      </text>
      <text x="530" y="286" textAnchor="middle" fontSize="12" fill={secondary}>
        生成函数乘法编码卷积
      </text>
      <text x="360" y="380" textAnchor="middle" fontSize="12" fill={secondary}>
        递推、生成函数和对象拆分必须互相对齐
      </text>
    </CombinatoricsFrame>
  );
}

export function MglGridReflectionDiagram() {
  return (
    <CombinatoricsFrame
      ariaLabel="格路径与反射原理图。左侧展示从原点到终点的右步与上步路径，红色路径越过对角边界；右侧将越界路径反射到另一组无约束路径，说明用总路径减去坏路径。"
      caption="边界把简单组合数变成受限计数；反射原理通过建立坏路径的对应关系来扣除它们。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        格路径：总数 − 越界数
      </text>
      <line
        x1="62"
        y1="334"
        x2="292"
        y2="334"
        stroke={border}
        strokeWidth="2"
      />
      <line x1="62" y1="334" x2="62" y2="104" stroke={border} strokeWidth="2" />
      <path
        d="M62 334 L120 334 L120 276 L178 276 L178 218 L236 218 L236 160 L292 160"
        fill="none"
        stroke={success}
        strokeWidth="4"
      />
      <path
        d="M62 334 L120 334 L120 276 L178 276 L236 276 L236 218 L292 218"
        fill="none"
        stroke={danger}
        strokeWidth="4"
      />
      <line
        x1="62"
        y1="334"
        x2="292"
        y2="104"
        stroke={warning}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <text x="62" y="370" fontSize="12" fill={secondary}>
        起点
      </text>
      <text x="292" y="94" textAnchor="end" fontSize="12" fill={secondary}>
        终点
      </text>
      <text x="178" y="142" textAnchor="middle" fontSize="12" fill={success}>
        合法路径
      </text>
      <text x="214" y="300" textAnchor="middle" fontSize="12" fill={danger}>
        越过边界
      </text>
      <line
        x1="328"
        y1="100"
        x2="328"
        y2="350"
        stroke={border}
        strokeDasharray="4 4"
      />
      <text x="360" y="118" fontSize="13" fontWeight="700" fill={accent}>
        反射原理
      </text>
      <text x="360" y="158" fontSize="13" fill={primary}>
        总路径：C(r+u,r)
      </text>
      <text x="360" y="198" fontSize="13" fill={danger}>
        坏路径：反射后与另一组路径一一对应
      </text>
      <text x="360" y="238" fontSize="13" fill={success}>
        合法数 = 总数 − 坏数
      </text>
      <text x="360" y="286" fontSize="13" fill={primary}>
        反射点保留步数，只改变越界前缀
      </text>
      <text x="360" y="326" fontSize="12" fill={secondary}>
        边界条件必须写进对象定义
      </text>
    </CombinatoricsFrame>
  );
}

export function MglCombinatoricsVerificationDiagram() {
  return (
    <CombinatoricsFrame
      ariaLabel="组合验证图。左侧展示公式、递推、动态规划和小规模枚举四条证据路径，右侧展示二项式系数对称性、系数和为 2 的 n 次方，以及生成函数乘法的交叉检查。"
      caption="发布级计数结论要留下第二条证据：公式、递推、程序和枚举互相检查，而不是只相信一个闭式。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        公式不是免除验证的口令
      </text>
      <rect
        x="52"
        y="78"
        width="260"
        height="266"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="182"
        y="114"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        四条证据路径
      </text>
      <text x="82" y="156" fontSize="13" fill={primary}>
        公式：C(n,k)
      </text>
      <text x="82" y="198" fontSize="13" fill={primary}>
        递推：帕斯卡关系
      </text>
      <text x="82" y="240" fontSize="13" fill={primary}>
        程序：动态规划
      </text>
      <text x="82" y="282" fontSize="13" fill={primary}>
        枚举：小 n 位掩码
      </text>
      <text x="182" y="326" textAnchor="middle" fontSize="12" fill={secondary}>
        不同错误会在不同路径暴露
      </text>
      <rect
        x="374"
        y="78"
        width="294"
        height="266"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="521"
        y="114"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        快速不变量
      </text>
      <text x="404" y="164" fontSize="14" fontFamily="monospace" fill={primary}>
        C(n,k) = C(n,n−k)
      </text>
      <text x="404" y="210" fontSize="14" fontFamily="monospace" fill={primary}>
        Σ C(n,k) = 2ⁿ
      </text>
      <text x="404" y="256" fontSize="14" fontFamily="monospace" fill={primary}>
        [xⁿ] A(x)B(x) = Σ aᵢbₙ₋ᵢ
      </text>
      <line x1="404" y1="278" x2="638" y2="278" stroke={border} />
      <text x="521" y="314" textAnchor="middle" fontSize="13" fill={success}>
        通过后才报告结果
      </text>
    </CombinatoricsFrame>
  );
}
