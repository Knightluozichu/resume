"use client";

import { CodingInterviewLab } from "./official-lab";

const safetyCases = [
  {
    label: "先删后分配",
    fields: [
      ["顺序", "delete旧资源 → new新资源 → copy"],
      ["分配失败", "对象已失去旧值，甚至进入空状态"],
      ["保证", "不满足强异常保证"],
      ["修复", "在提交新状态前完成所有可能失败操作"],
    ],
    alert: "自赋值检查只能防止删除自己的数据，不能修复new失败后的状态损坏。",
  },
  {
    label: "临时对象交换",
    fields: [
      ["准备", "先用源对象构造临时副本"],
      ["分配失败", "临时对象未建成，目标对象不变"],
      ["提交", "交换资源指针，不再分配"],
      ["清理", "临时对象析构目标对象的旧资源"],
    ],
  },
  {
    label: "按值传参交换",
    fields: [
      ["签名", "operator=(CMyString other)"],
      ["副本", "进入函数前完成复制或移动"],
      ["主体", "swap(other)后返回*this"],
      ["收益", "统一复制赋值与资源提交逻辑"],
    ],
  },
] as const;

const testCases = [
  {
    label: "普通赋值",
    fields: [
      ["输入", "str2 = str1"],
      ["检查", "两个对象内容相等"],
      ["再检查", "修改或销毁str1不破坏str2"],
      ["覆盖", "深拷贝与旧资源释放"],
    ],
  },
  {
    label: "自赋值",
    fields: [
      ["输入", "str1 = str1"],
      ["检查", "内容和对象不变式保持"],
      ["风险", "先释放后读取会访问已释放内存"],
      ["覆盖", "别名与提交顺序"],
    ],
  },
  {
    label: "连续赋值",
    fields: [
      ["输入", "str3 = str2 = str1"],
      ["结合", "赋值从右向左"],
      ["要求", "str2 = str1返回str2的左值引用"],
      ["覆盖", "返回类型和return *this"],
    ],
  },
  {
    label: "分配失败",
    fields: [
      ["注入", "让复制构造或分配抛出异常"],
      ["检查", "目标对象仍保留原内容"],
      ["资源", "无泄漏、无重复释放"],
      ["覆盖", "强异常保证"],
    ],
  },
] as const;

export function AssignmentContractMap() {
  const checks = [
    ["返回引用", "支持 a = b = c"],
    ["const参数", "不修改源对象"],
    ["释放旧值", "避免资源泄漏"],
    ["深拷贝", "两个对象独立拥有数据"],
    ["自赋值", "x = x 后仍有效"],
    ["异常安全", "失败时保持旧状态"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 780 390" role="img" aria-label="CMyString赋值运算符的六项契约，包括返回引用、const参数、释放旧值、深拷贝、自赋值和异常安全。" className="mx-auto block h-auto w-full max-w-[780px]">
          <text x="390" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">赋值运算符不是一次memcpy，而是一组对象契约</text>
          <rect x="286" y="62" width="208" height="64" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" />
          <text x="390" y="89" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">CMyString::operator=</text>
          <text x="390" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">复制值，同时守住所有权与可用状态</text>
          {checks.map(([title, detail], index) => {
            const column = index % 3;
            const row = Math.floor(index / 3);
            const x = 38 + column * 248;
            const y = 174 + row * 92;
            return (
              <g key={title}>
                <path d={`M390 126 L${x + 98} ${y}`} stroke="var(--border)" />
                <rect x={x} y={y} width="196" height="64" rx="5" fill="var(--bg)" stroke="var(--success)" />
                <text x={x + 98} y={y + 25} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">{title}</text>
                <text x={x + 98} y={y + 46} textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">{detail}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">六项都满足，才能把“语法可调用”提升为“资源对象可正确赋值”。</figcaption>
    </figure>
  );
}

export function OwnershipTransitionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 780 330" role="img" aria-label="临时对象交换赋值的四步：复制源对象、目标和临时对象各自持有资源、交换指针、临时对象析构旧资源。" className="mx-auto block h-auto w-full max-w-[780px]">
          <text x="390" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">先准备成功，再用不抛异常的交换提交</text>
          {[
            ["1 复制源对象", "temp → new data", "可能抛出，目标未改变"],
            ["2 两份资源有效", "this → old data", "temp → new data"],
            ["3 交换所有权", "this → new data", "temp → old data"],
            ["4 自动清理", "temp析构old data", "this保持new data"],
          ].map(([title, first, second], index) => {
            const x = 24 + index * 190;
            return (
              <g key={title}>
                <rect x={x} y="76" width="166" height="166" rx="6" fill="var(--bg)" stroke={index === 0 ? "var(--warning)" : "var(--accent)"} />
                <text x={x + 83} y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">{title}</text>
                <rect x={x + 18} y="126" width="130" height="38" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--border)" />
                <text x={x + 83} y="150" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{first}</text>
                <rect x={x + 18} y="178" width="130" height="38" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--border)" />
                <text x={x + 83} y="202" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{second}</text>
                {index < 3 ? <path d={`M${x + 168} 159 H${x + 186}`} stroke="var(--warning)" strokeWidth="2" /> : null}
              </g>
            );
          })}
          <rect x="108" y="270" width="564" height="34" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" />
          <text x="390" y="291" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">复制失败发生在提交之前；交换完成后，临时对象负责释放旧资源。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">临时对象把可能失败的准备阶段与不应失败的提交阶段分离。</figcaption>
    </figure>
  );
}

export function ExceptionSafetyLab() {
  return <CodingInterviewLab cases={safetyCases} caption="切换方案，观察分配失败时目标对象能否保持原值。" />;
}

export function AssignmentTestLab() {
  return <CodingInterviewLab cases={testCases} caption="作者源码的三组测试之外，还应注入分配失败验证异常保证。" />;
}
