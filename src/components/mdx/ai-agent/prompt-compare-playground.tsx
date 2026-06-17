"use client";

import { useState } from "react";

import { DemoStage, Toggle } from "../controls";

/**
 * <AaPromptComparePlayground>：「随手写的差提示 vs 带角色+指令+few-shot 的好提示」对比交互件（HEL-293）。
 *
 * 读者拨三个开关——是否加 system 角色、是否给 few-shot 示例、是否指定输出格式——组件实时：
 *  1. 拼出对应的 messages 预览（role + content，与 tinyagent 的 Message 结构一致）；
 *  2. 给出一段「这样的提示，输出大概会怎样」的预置说明（好提示 → 稳定规整；差提示 → 跑偏）。
 * 把「提示写得好不好，差别有多大」从抽象判断变成动手试，呼应正文「提示由角色+清晰指令+输入组成」。
 *
 * 为何 client：开关 + 实时拼装预览 + 重置都是真交互（受控状态）。纯 React，无 Canvas / WebGL；
 * reduced-motion 友好（仅颜色/边框过渡，globals 已对 reduced 置 0）。
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）。
 */

type Options = {
  role: boolean; // 加 system 角色（岗位说明书）
  fewshot: boolean; // 给 few-shot 范例
  format: boolean; // 指定输出格式
};

type MsgPreview = { role: string; content: string; color: string };

const DEFAULT_OPTS: Options = { role: false, fewshot: false, format: false };

/** 按当前开关拼出 messages 预览（与正文/§6 tinyagent 的组装顺序一致：system→few-shot→user）。 */
function buildMessages(o: Options): MsgPreview[] {
  const msgs: MsgPreview[] = [];
  if (o.role) {
    msgs.push({
      role: "system",
      content: "你是一位严谨的客服助理，只依据公司政策回答，语气礼貌。",
      color: "var(--accent)",
    });
  }
  if (o.fewshot) {
    msgs.push({
      role: "user",
      content: "示例问：能退货吗？ 示例答：可在签收 7 天内无理由退货。",
      color: "var(--warning)",
    });
    msgs.push({
      role: "assistant",
      content: "（这是范例回答，给模型照着学）",
      color: "var(--text-secondary)",
    });
  }
  // user 本次任务：是否指定格式，content 不同。
  msgs.push({
    role: "user",
    content: o.format
      ? "我的订单还能退吗？请用「结论 + 依据」两行格式回答。"
      : "我的订单还能退吗？",
    color: "var(--success)",
  });
  return msgs;
}

/** 三档评分：开关越全 → 提示越好 → 输出越稳。 */
function quality(o: Options): {
  level: "差" | "一般" | "好";
  color: string;
  note: string;
} {
  const score = (o.role ? 1 : 0) + (o.fewshot ? 1 : 0) + (o.format ? 1 : 0);
  if (score === 0) {
    return {
      level: "差",
      color: "var(--danger)",
      note: "随手一句话、没角色没范例没格式：模型不知道自己该扮谁、按什么标准答，容易跑题、口气随机、格式每次都不一样——同一个问题问两遍，回答可能南辕北辙。",
    };
  }
  if (score >= 3) {
    return {
      level: "好",
      color: "var(--success)",
      note: "有角色定身份、有 few-shot 给样子、又指定了格式：模型扮对了角色、照着范例答、还按你要的格式输出——回答稳定、规整、可直接拿来用，问几遍都一个样。",
    };
  }
  return {
    level: "一般",
    color: "var(--warning)",
    note: "补上了其中一两样，比裸提示强：方向更准了，但还没完全约束住——再把剩下的角色 / 范例 / 格式补齐，输出会更稳更规整。",
  };
}

export function AaPromptComparePlayground() {
  const [opts, setOpts] = useState<Options>(DEFAULT_OPTS);

  const set = (patch: Partial<Options>) =>
    setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULT_OPTS);

  const msgs = buildMessages(opts);
  const q = quality(opts);

  const isDirty = opts.role || opts.fewshot || opts.format;

  return (
    <DemoStage
      title="拨开关，对比「差提示」和「好提示」拼出的 messages 与输出"
      onReset={isDirty ? reset : undefined}
      controls={
        <div className="flex flex-col gap-3">
          <span className="text-xs text-secondary">
            给提示加料，下面实时拼出 messages 并预估输出质量：
          </span>
          <Toggle
            checked={opts.role}
            onChange={(v) => set({ role: v })}
            label="加 system 角色（给它一份「岗位说明书」）"
          />
          <Toggle
            checked={opts.fewshot}
            onChange={(v) => set({ fewshot: v })}
            label="给 few-shot 示例（几组范例，教它照着做）"
          />
          <Toggle
            checked={opts.format}
            onChange={(v) => set({ format: v })}
            label="在 user 任务里指定输出格式"
          />
        </div>
      }
    >
      <div className="w-full max-w-xl">
        {/* messages 预览 */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-primary">
            拼出的 messages（喂给模型的纸条）
          </p>
          <div className="flex flex-col gap-2">
            {msgs.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className="rounded-control border p-2"
                style={{ borderColor: m.color, background: "var(--bg)" }}
              >
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: m.color }}
                >
                  {m.role}
                </span>
                <span className="ml-2 text-xs text-secondary">{m.content}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 输出质量预估 */}
        <div
          className="rounded-control border p-4"
          style={{ borderColor: q.color, background: "var(--bg)" }}
          aria-live="polite"
        >
          <p className="text-sm">
            <span className="text-secondary">这样的提示，输出大概：</span>
            <span className="font-bold" style={{ color: q.color }}>
              {q.level}
            </span>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-secondary">{q.note}</p>
        </div>

        <p className="mt-3 text-xs text-secondary">
          猜一猜：三个开关全关时，同一个问题问两遍，回答会一样吗？把三个都打开呢？
        </p>
      </div>
    </DemoStage>
  );
}
