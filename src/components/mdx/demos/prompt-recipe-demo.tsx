"use client";

import { useState } from "react";

import { DemoStage, Toggle } from "../controls";

/**
 * <PromptRecipeDemo>：「提示三味配料」交互演示（HEL-255，《提示工程与角色设定》篇1·3，
 * 知识点 1/3/4 的合演）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。同一桩差事——「把这句口语订票需求整理出来」——
 * 给小特的提示里逐味加「配料」，看它的输出怎么从「跑题啰嗦没法用」变到「精准规范能被程序
 * 解析」：
 *   ① 角色设定（system）：框定它是严谨的订票助理，别闲聊别跑题；
 *   ② few-shot 示例：给一个「输入→输出」范例，它照着格式与字段答；
 *   ③ 输出格式要求：要求它只输出 JSON，程序才能稳定提取字段。
 * 三个开关任意组合（共 8 种），下方「模型输出」区切到对应的 **预写示意输出**，并打一个
 * 质量评级（差 / 一般 / 好），点出这一味配料各自补了什么。
 *
 * 诚实声明（醒目）：以下输出为「按规律预写的示意」，不是实时调用模型——本章无法在线跑 LLM，
 * 用 curated 输出演示每味配料的作用即可。必有重置（回到全关）。
 *
 * 为何 client：三个开关是真交互（受控状态），用状态直接选预写输出——这是 C 型「改输入看
 * 输出」在「没法在线推理」约束下的落地（参考 AutonomySpectrumExplorer 的 curated 范式）。
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

type Recipe = {
  /** 角色设定 system 是否开 */
  role: boolean;
  /** few-shot 示例是否开 */
  shots: boolean;
  /** 输出格式（JSON）要求是否开 */
  json: boolean;
};

type Quality = "bad" | "ok" | "good";

type CannedOutput = {
  /** 质量评级 */
  quality: Quality;
  /** 模型示意输出（多行用 \n） */
  text: string;
  /** 这套配料下，输出好/坏在哪（一句话点评） */
  note: string;
  /** 程序能不能稳定解析出字段 */
  parseable: boolean;
};

const QUALITY_LABEL: Record<Quality, string> = {
  bad: "差 · 跑题/啰嗦/没法解析",
  ok: "一般 · 像样了但仍不稳",
  good: "好 · 精准、规范、可被程序解析",
};

const QUALITY_COLOR: Record<Quality, string> = {
  bad: "text-danger",
  ok: "text-warning",
  good: "text-success",
};

// 固定的「用户口语需求」——三味配料都为它服务。
const USER_REQUEST = "帮我订后天下午去广州的高铁票，预算别超 600。";

// 8 种组合的预写示意输出。key = `${role}${shots}${json}`（0/1）。
function pickOutput({ role, shots, json }: Recipe): CannedOutput {
  // 全关：没角色没范例没格式——跑题、啰嗦、夹带闲聊，程序没法用。
  if (!role && !shots && !json) {
    return {
      quality: "bad",
      text: "哈喽！去广州玩呀？广州可是个好地方，塔下夜景很赞，早茶也别错过～\n要订高铁的话我建议你提前看看天气哦。需要我帮你推荐景点吗？😄",
      note: "没给任何约束，大脑自由发挥：闲聊跑题、没提取要点，程序完全没法用。",
      parseable: false,
    };
  }
  // 只开角色：不跑题了，像个订票助理，但输出是散文、字段散落，程序仍难提取。
  if (role && !shots && !json) {
    return {
      quality: "ok",
      text: "好的，为您整理订票需求：目的地是广州，时间是后天下午出发，方式是高铁，预算上限大约 600 元以内。我这就为您查询合适车次。",
      note: "「角色设定」一味就让它不再闲聊、聚焦正事——但还是一段散文，字段埋在句子里，程序提取很脆弱。",
      parseable: false,
    };
  }
  // 只开 few-shot：照着范例的格式答，结构对了，但偶尔多句寒暄/多个字段，仍不够稳。
  if (!role && shots && !json) {
    return {
      quality: "ok",
      text: "城市：广州\n日期：后天\n时段：下午\n方式：高铁\n预算：600\n（已按示例格式整理，需要我直接帮你下单吗？）",
      note: "「few-shot 示例」让它照葫芦画瓢、字段对齐了——但还夹了句多余的寒暄，格式也不是机器最爱的 JSON。",
      parseable: false,
    };
  }
  // 只开 JSON 要求：给了 JSON，但没角色没范例，字段命名/取值可能跑偏、夹解释。
  if (!role && !shots && json) {
    return {
      quality: "ok",
      text: '当然可以，这是 JSON：\n{"目的地": "广州市", "什么时候": "后天下午", "交通": "坐高铁", "钱": "六百块以内"}',
      note: "「格式要求」一味让它吐 JSON，但没范例约束，字段名、取值各凭发挥（「钱」「六百块以内」），程序仍难对接。",
      parseable: false,
    };
  }
  // 角色 + few-shot（无 JSON）：聚焦且字段对齐，但仍是文本格式，解析靠切字符串、脆。
  if (role && shots && !json) {
    return {
      quality: "ok",
      text: "城市：广州\n日期：后天\n时段：下午\n方式：高铁\n预算：600",
      note: "角色 + 范例让输出既聚焦又字段对齐——但还是「键：值」文本，程序得靠切字符串解析，换个标点就崩。",
      parseable: false,
    };
  }
  // 角色 + JSON（无 few-shot）：JSON 且不跑题，但字段名没范例锚定，可能和你程序对不上。
  if (role && !shots && json) {
    return {
      quality: "ok",
      text: '{"城市": "广州", "时间": "后天下午", "方式": "高铁", "预算上限": 600}',
      note: "角色 + JSON 已经不错：是合法 JSON 也不跑题——但字段名没范例锚定，可能和你程序约定的 key 对不上。",
      parseable: true,
    };
  }
  // few-shot + JSON（无角色）：字段名被范例锚住、是 JSON，但少了角色可能偶尔夹闲聊。
  if (!role && shots && json) {
    return {
      quality: "ok",
      text: '好的～\n{"city": "广州", "date": "后天", "period": "下午", "type": "高铁", "budget": 600}',
      note: "范例锚定了字段名、又是 JSON，已经很好用——但少了角色约束，偶尔会冒一句寒暄，得多防一手。",
      parseable: true,
    };
  }
  // 三味全开：聚焦 + 字段被范例锚定 + 纯 JSON，程序 json.loads 直接拿字段。
  return {
    quality: "good",
    text: '{"city": "广州", "date": "后天", "period": "下午", "type": "高铁", "budget": 600}',
    note: "三味齐了：角色让它不跑题、范例锚定字段名、格式要求逼出纯 JSON——程序一行 json.loads 就能稳定拿到每个字段。",
    parseable: true,
  };
}

const INITIAL: Recipe = { role: false, shots: false, json: false };

export function PromptRecipeDemo() {
  const [recipe, setRecipe] = useState<Recipe>(INITIAL);
  const reset = () => setRecipe(INITIAL);

  const out = pickOutput(recipe);
  const onCount =
    Number(recipe.role) + Number(recipe.shots) + Number(recipe.json);

  return (
    <DemoStage
      title="三味配料：每加一味，模型输出好一截"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Toggle
            checked={recipe.role}
            onChange={(v) => setRecipe((r) => ({ ...r, role: v }))}
            label="① 角色设定"
          />
          <Toggle
            checked={recipe.shots}
            onChange={(v) => setRecipe((r) => ({ ...r, shots: v }))}
            label="② few-shot 示例"
          />
          <Toggle
            checked={recipe.json}
            onChange={(v) => setRecipe((r) => ({ ...r, json: v }))}
            label="③ 输出格式要求（JSON）"
          />
        </div>
      }
    >
      <div className="w-full max-w-[640px] text-sm">
        {/* 固定的用户口语需求 */}
        <div className="mb-3 rounded-control border border-border bg-bg p-3">
          <p className="mb-1 text-xs font-semibold text-secondary">
            用户口语需求（固定不变）
          </p>
          <p className="font-mono text-xs text-primary">{USER_REQUEST}</p>
        </div>

        {/* 当前开了几味配料 */}
        <p className="mb-2 text-xs text-secondary">
          已加配料：
          <span className="font-semibold text-accent">{onCount} / 3</span>
          {onCount === 0 && "（什么都没加，看大脑自由发挥）"}
        </p>

        {/* 模型示意输出 */}
        <div
          className="rounded-control border border-border border-l-2 bg-elevated p-3"
          style={{ borderLeftColor: "currentColor" }}
        >
          <div
            className={`mb-1 flex items-center justify-between gap-2 ${QUALITY_COLOR[out.quality]}`}
          >
            <span className="text-xs font-semibold">模型输出（示意）</span>
            <span className="text-xs font-semibold">
              {QUALITY_LABEL[out.quality]}
            </span>
          </div>
          <pre className="mb-2 whitespace-pre-wrap break-words font-mono text-xs text-primary">
            {out.text}
          </pre>
          {/* 程序能否解析 */}
          <p className="mb-2 text-xs">
            <span className="text-secondary">程序提取字段：</span>
            {out.parseable ? (
              <span className="font-semibold text-success">✓ 能稳定解析</span>
            ) : (
              <span className="font-semibold text-danger">
                ✗ 解析脆弱 / 失败
              </span>
            )}
          </p>
          <p className="text-xs text-secondary">{out.note}</p>
        </div>

        {/* 诚实声明 */}
        <p className="mt-3 text-[11px] leading-relaxed text-secondary">
          说明：以上输出为按规律
          <strong className="text-primary">预写的示意</strong>，
          <strong className="text-primary">非实时调用模型</strong>——本章用
          curated 输出演示每味配料的作用，真实模型每次输出会略有不同，但「加配料
          → 输出更可控」的趋势一致。
        </p>
      </div>
    </DemoStage>
  );
}
