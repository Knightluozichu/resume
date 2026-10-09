"use client";

import { useState } from "react";

type Answers = {
  diagnosis: string;
  boundary: string;
  option: string;
  review: string;
};

const prompts = [
  {
    key: "diagnosis" as const,
    legend: "1. 目前最稳妥的问题判断是什么？",
    choices: [
      ["operator", "值班人员不够谨慎，应要求更仔细检查。"],
      ["signal", "一周有 2 次关键告警漏报、18% 为误报；原因尚未确认。"],
      ["tool", "现有告警工具必然失效，应该立即全面替换。"],
    ],
  },
  {
    key: "boundary" as const,
    legend: "2. 哪一条应先作为硬边界核实？",
    choices: [
      ["noise", "试点期间尽可能减少所有告警数量。"],
      ["safe", "试点不能让关键告警失去响应，并须保留回退办法。"],
      ["speed", "必须在今天完成全量调整。"],
    ],
  },
  {
    key: "option" as const,
    legend: "3. 哪个方案最能在边界内获得新证据？",
    choices: [
      ["remove", "全量取消低优先级告警，观察下月投诉。"],
      [
        "pilot",
        "选定测试队列调阈值，影子核验关键样本，授权后小范围试点并可回退。",
      ],
      ["hire", "先增加一名值班人员，其他问题暂不调查。"],
    ],
  },
  {
    key: "review" as const,
    legend: "4. 哪项复核记录最能回应异议？",
    choices: [
      ["done", "发布后记录‘已上线’，月底再讨论体验。"],
      [
        "evidence",
        "指定负责人和日期；比较关键告警漏报、误报量，预先约定停止/回退阈值。",
      ],
      ["vote", "请团队投票决定是否安全。"],
    ],
  },
];

const initialAnswers: Answers = {
  diagnosis: "",
  boundary: "",
  option: "",
  review: "",
};

const correct: Answers = {
  diagnosis: "signal",
  boundary: "safe",
  option: "pilot",
  review: "evidence",
};

const notes: Record<keyof Answers, string> = {
  diagnosis:
    "先描述可观察信号并保留原因未知。把现象归咎于人员或工具，都是尚未验证的解释。",
  boundary:
    "先由有权限的安全责任人确认关键告警的响应要求和回退条件；减少噪声是优化目标，不应取代安全边界。",
  option:
    "限定范围、影子验证和回退机制能逐步取得证据；生产试点仍须经过正式授权。",
  review:
    "将担忧落成负责人、日期、指标和停止条件，才有机会发现风险并及时修正。",
};

const controlClass =
  "min-h-11 rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm leading-6 text-slate-800 hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700";

export function EexChapter06DecisionLab() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [checked, setChecked] = useState(false);
  const complete = Object.values(answers).every(Boolean);
  const score = (Object.keys(correct) as (keyof Answers)[]).filter(
    (key) => answers[key] === correct[key],
  ).length;

  return (
    <section
      className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6"
      aria-label="决策诊所实验"
      aria-labelledby="eex-ch06-clinic-title"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-800">
        原创情境 · 逐项核对，不作自动决策
      </p>
      <h3
        id="eex-ch06-clinic-title"
        className="mt-1 text-xl font-bold text-slate-950"
      >
        告警降噪：决定前的四个检查
      </h3>
      <p className="mt-3 max-w-3xl leading-7 text-slate-700">
        某服务团队过去一周记录到 2 次关键告警漏报、18%
        的告警为误报。样本量小，原因未定；团队希望两周内降低噪声，且关键告警必须有人响应。以下选择都可用键盘操作；完成后查看理由与错误选项的陷阱。
      </p>

      <div className="mt-5 space-y-5">
        {prompts.map((prompt, promptIndex) => (
          <fieldset key={prompt.key} className="min-w-0">
            <legend className="font-semibold text-slate-950">
              {prompt.legend}
            </legend>
            <div
              className="mt-2 grid gap-2"
              role="group"
              aria-label={`${prompt.legend} 选项`}
            >
              {prompt.choices.map(([value, label]) => {
                const selected = answers[prompt.key] === value;
                const isCorrect = correct[prompt.key] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setAnswers((current) => ({
                        ...current,
                        [prompt.key]: value,
                      }));
                      setChecked(false);
                    }}
                    className={`${controlClass} flex min-h-11 items-start gap-3 ${selected ? "border-indigo-700 bg-indigo-50 ring-1 ring-indigo-700" : ""}`}
                  >
                    <span className="flex-1">{label}</span>
                    {checked && isCorrect ? (
                      <span className="text-xs font-semibold text-emerald-800">
                        参考选择
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            {checked && answers[prompt.key] !== correct[prompt.key] ? (
              <p className="mt-2 text-sm leading-6 text-amber-900">
                易错点：当前选择跳过了一个必要判断。{notes[prompt.key]}
              </p>
            ) : null}
            {checked && answers[prompt.key] === correct[prompt.key] ? (
              <p className="mt-2 text-sm leading-6 text-emerald-900">
                为什么：{notes[prompt.key]}
              </p>
            ) : null}
            <span className="sr-only">第 {promptIndex + 1} 项</span>
          </fieldset>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className={`${controlClass} bg-indigo-700 font-semibold text-white hover:bg-indigo-800`}
          disabled={!complete}
          onClick={() => setChecked(true)}
        >
          核对我的判断
        </button>
        <button
          type="button"
          className={controlClass}
          onClick={() => {
            setAnswers(initialAnswers);
            setChecked(false);
          }}
        >
          重置练习
        </button>
      </div>
      <p
        className="mt-3 text-sm text-slate-700"
        aria-live="polite"
        aria-atomic="true"
      >
        {!complete
          ? `已选择 ${Object.values(answers).filter(Boolean).length}/4 项。完成四项后即可核对。`
          : checked
            ? `参考匹配 ${score}/4。答案用于检查推理链；真实决定仍需核实数据、权限和风险边界。`
            : "四项已完成。选择核对按钮后会逐项显示理由与常见陷阱。"}
      </p>
      <p className="mt-2 text-xs leading-5 text-slate-600">
        教学边界：场景与建议均为虚构练习。影子验证、试点范围和安全阈值必须由组织授权人员按本地制度决定；不得把本练习当作生产变更批准。
      </p>
    </section>
  );
}
