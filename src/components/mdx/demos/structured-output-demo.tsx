"use client";

import { useState } from "react";

import { DemoStage, Toggle } from "../controls";

/**
 * <StructuredOutputDemo>：「自由文本 vs 结构化输出」交互演示（HEL-255，
 * 《提示工程与角色设定》篇1·3，知识点 4）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。同一桩任务——「把口语订票需求抽成字段」——小特给出
 * 两种输出，toggle 切换看程序怎么从里面提取字段：
 *   - 自由文本：一段散文，字段埋在句子里，程序只能靠正则/切字符串去抠——换个措辞就崩，脆；
 *   - JSON 结构化：{"city":"广州", ...}，程序一行 json.loads(...) 拿到 dict，按 key 稳定取值。
 * 右侧「程序提取」面板逐字段显示成功 ✓ / 失败 ✗，直观对比「为什么要让小特按表格填、别写散文」。
 *
 * 诚实声明：两段输出均为预写示意（非实时模型）。必有重置（回到 JSON 这一侧，先看好的）。
 *
 * 为何 client：toggle 是真交互（受控状态），用状态直接选两套预写输出 + 算提取结果——C 型
 * 「改输入看输出」落地。颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

// 程序想从模型输出里提取的四个字段（你的下游代码约定）。
const FIELDS = [
  { key: "city", label: "city（城市）", expect: "广州" },
  { key: "date", label: "date（日期）", expect: "后天" },
  { key: "type", label: "type（交通方式）", expect: "高铁" },
  { key: "budget", label: "budget（预算上限）", expect: "600" },
] as const;

// JSON 一侧：程序 json.loads 后每个 key 都稳定取到。
const JSON_OUTPUT =
  '{"city": "广州", "date": "后天", "type": "高铁", "budget": 600}';

// 自由文本一侧：字段埋在散文里，措辞还和约定不一致（「坐高铁」「六百」），抠取脆弱。
const TEXT_OUTPUT =
  "好的，您是想后天从这边坐高铁去广州对吧？预算大概六百块上下，我帮您看看有没有合适的车次哈～";

type Extract = { ok: boolean; got: string };

// JSON 侧：四字段全稳定取到（budget 数字转成字符串展示）。
const JSON_EXTRACT: Record<string, Extract> = {
  city: { ok: true, got: '"广州"' },
  date: { ok: true, got: '"后天"' },
  type: { ok: true, got: '"高铁"' },
  budget: { ok: true, got: "600" },
};

// 文本侧：靠正则/切字符串抠——有的措辞对不上、有的根本没显式字段，多数失败或不可靠。
const TEXT_EXTRACT: Record<string, Extract> = {
  city: { ok: true, got: "广州（碰巧抠到，换句话就崩）" },
  date: { ok: true, got: "后天（碰巧抠到，换句话就崩）" },
  type: { ok: false, got: "「坐高铁」≠ 约定值，抠不准" },
  budget: { ok: false, got: "「六百块上下」不是数字，解析失败" },
};

export function StructuredOutputDemo() {
  // 初始停在 JSON 侧（先看「好」的样子），toggle 关 = 切到自由文本。
  const [structured, setStructured] = useState(true);
  const reset = () => setStructured(true);

  const output = structured ? JSON_OUTPUT : TEXT_OUTPUT;
  const extract = structured ? JSON_EXTRACT : TEXT_EXTRACT;
  const okCount = FIELDS.filter((f) => extract[f.key].ok).length;

  return (
    <DemoStage
      title="同一任务，两种输出：散文 vs JSON，程序提取天差地别"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Toggle
            checked={structured}
            onChange={setStructured}
            label={structured ? "当前：JSON 结构化输出" : "当前：自由文本输出"}
          />
          <span className="text-xs text-secondary">
            （关掉开关切到「自由文本」，看程序怎么抠瞎）
          </span>
        </div>
      }
    >
      <div className="w-full max-w-[640px] text-sm">
        {/* 模型输出（按 toggle 切两套） */}
        <div className="mb-3 rounded-control border border-border bg-bg p-3">
          <p className="mb-1 text-xs font-semibold text-secondary">
            模型输出（示意）·{" "}
            <span className={structured ? "text-success" : "text-warning"}>
              {structured ? "JSON 结构化" : "自由文本（散文）"}
            </span>
          </p>
          <pre className="whitespace-pre-wrap break-words font-mono text-xs text-primary">
            {output}
          </pre>
        </div>

        {/* 程序提取面板：逐字段 ✓/✗ */}
        <div className="rounded-control border border-border bg-elevated p-3">
          <p className="mb-2 text-xs font-semibold text-secondary">
            程序提取字段（
            {structured
              ? "data = json.loads(输出)，按 key 取"
              : "只能靠正则/切字符串抠"}
            ）：
          </p>
          <ul className="flex flex-col gap-1.5">
            {FIELDS.map((f) => {
              const e = extract[f.key];
              return (
                <li
                  key={f.key}
                  className="flex items-start justify-between gap-3 text-xs"
                >
                  <span className="font-mono text-primary">{f.label}</span>
                  <span
                    className={`flex-1 text-right ${e.ok ? "text-success" : "text-danger"}`}
                  >
                    {e.ok ? "✓ " : "✗ "}
                    <span className={e.ok ? "text-primary" : undefined}>
                      {e.got}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-xs">
            <span className="text-secondary">稳定提取成功：</span>
            <span
              className={`font-semibold ${okCount === FIELDS.length ? "text-success" : "text-danger"}`}
            >
              {okCount} / {FIELDS.length} 字段
            </span>
          </p>
        </div>

        {/* 点题 */}
        <p className="mt-3 text-[11px] leading-relaxed text-secondary">
          {structured ? (
            <>
              JSON 这一侧，
              <strong className="text-primary">
                一行 json.loads 就拿到一个 dict
              </strong>
              ，按 key 取值，稳。这就是为什么要让小特「按表格填」。
            </>
          ) : (
            <>
              散文这一侧，字段埋在句子里、措辞还和约定对不上，程序只能靠正则去
              <strong className="text-primary">「猜」</strong>
              ——换个说法就崩，脆得没法用。
            </>
          )}{" "}
          两段输出均为预写示意（非实时模型）。
        </p>
      </div>
    </DemoStage>
  );
}
