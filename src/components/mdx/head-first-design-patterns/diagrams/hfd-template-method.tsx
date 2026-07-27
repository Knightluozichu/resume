"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdTemplateMethodDiagram>：咖啡因饮料模板方法动画（Head First 设计模式 · 第8章）。
 *
 * 核心：父类 CaffeineBeverage 用 final 的 prepareRecipe() 固定算法骨架
 * （烧水→冲泡→倒杯→加调料），把 brew/addCondiments 声明为抽象方法交子类填空，
 * 钩子 customerWantsCondiments() 可选地影响流程——好莱坞原则。
 *
 * 节拍：
 *  ① 骨架：prepareRecipe() final 固定四步，boilWater/pourInCup 父类实现，brew/addCondiments 抽象
 *  ② Coffee 子类填空：brew=冲咖啡粉、addCondiments=加糖奶
 *  ③ 执行：请求穿过四步，抽象步骤由子类实现点亮
 *  ④ 钩子：customerWantsCondiments() 可覆盖为 false 跳过加调料；Tea 填自己的空
 *  ⑤ 好莱坞原则：父类控制流程调用子类——别调用我们，我们会调用你
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const COFFEE_COLOR = "#C792EA";
const TEA_COLOR = "#3FB97F";
const HOOK_COLOR = "#E5B567";

const T = TEACHING_BEAT_MS;

const CHIP_Y = 160;
const CHIP_H = 44;
const CHIP_MID = CHIP_Y + CHIP_H / 2; // 182

const STEPS: readonly TeachingStep[] = [
  { label: "skeleton", caption: "prepareRecipe() 声明为 final——骨架固定：烧水→冲泡→倒杯→加调料" },
  { label: "fill", caption: "Coffee 子类填空：brew()=冲咖啡粉、addCondiments()=加糖和奶" },
  { label: "run", caption: "执行穿过四步——具体步骤用父类实现，抽象步骤由子类实现" },
  { label: "hook", caption: "钩子 customerWantsCondiments() 可覆盖为 false 跳过加调料——Tea 填自己的空" },
  { label: "hollywood", caption: "好莱坞原则：父类控制流程主动调子类——「别调用我们，我们会调用你」" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdTemplateMethodDiagram() {
  const parentBoxRef = useRef<SVGGElement | null>(null);
  const chipsRef = useRef<SVGGElement | null>(null);
  const coffeeRef = useRef<SVGGElement | null>(null);
  const teaRef = useRef<SVGGElement | null>(null);
  const packetRef = useRef<SVGGElement | null>(null);
  const brewFillRef = useRef<SVGGElement | null>(null);
  const condFillRef = useRef<SVGGElement | null>(null);
  const glowBoilRef = useRef<SVGRectElement | null>(null);
  const glowBrewRef = useRef<SVGRectElement | null>(null);
  const glowPourRef = useRef<SVGRectElement | null>(null);
  const glowCondRef = useRef<SVGRectElement | null>(null);
  const hookRef = useRef<SVGGElement | null>(null);
  const hollywoodRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① skeleton（0→T）：父类骨架 + 步骤条
      tl.add(parentBoxRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(chipsRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 0.3);
      tl.label("skeleton", 0);

      // ② fill（T→2T）：Coffee 子类出现
      tl.add(coffeeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("fill", T);

      // ③ run（2T→3T）：执行包穿过四步，依次点亮，抽象步骤显示子类实现
      tl.add(packetRef.current!, { opacity: [1, 1], x: [100, 630], y: [CHIP_MID, CHIP_MID], duration: T * 0.8, ease: "inOut(2)" }, T * 2);
      tl.add(packetRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 2.8);
      tl.add(glowBoilRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.05);
      tl.add(glowBrewRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.25);
      tl.add(brewFillRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.3);
      tl.add(glowPourRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.45);
      tl.add(glowCondRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.65);
      tl.add(condFillRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("run", T * 2);

      // ④ hook（3T→4T）：钩子高亮 + Tea 出现
      tl.add(hookRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T * 3);
      tl.add(teaRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3.3);
      tl.label("hook", T * 3);

      // ⑤ hollywood（4T→5T）：结论
      tl.add(hollywoodRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, T * 4);
      tl.label("hollywood", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模板方法模式动画。CaffeineBeverage 父类用 final 的 prepareRecipe 固定骨架：烧水、冲泡、倒杯、加调料。烧水和倒杯是父类具体方法，冲泡和加调料是抽象方法由子类实现。Coffee 填冲咖啡粉和加糖奶，执行时请求穿过四步。钩子 customerWantsCondiments 可覆盖为 false 跳过加调料，Tea 填茶包浸泡和加柠檬。好莱坞原则：父类控制流程调用子类，别调用我们我们会调用你。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            模板方法 · 咖啡与茶
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            父类定骨架（final），子类填空——骨架一致，细节可变
          </text>

          {/* 父类骨架 */}
          <g ref={parentBoxRef} style={{ opacity: 0 }}>
            <rect x={48} y={85} width={624} height={170} rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="2" />
            <text x={60} y={110} fontSize="13" fontWeight="700" fill={ACCENT}>
              CaffeineBeverage（抽象父类）
            </text>
            <text x={60} y={130} fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              final prepareRecipe()  ← 算法骨架，子类不可覆盖
            </text>
          </g>

          {/* 步骤条 */}
          <g ref={chipsRef} style={{ opacity: 0 }}>
            {/* boilWater（具体） */}
            <rect x={70} y={CHIP_Y} width={118} height={CHIP_H} rx="7" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x={129} y={178} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              boilWater()
            </text>
            <text x={129} y={194} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              具体 · 父类实现
            </text>
            <path d="M190 182 h16 M202 178 l6 4 l-6 4" fill="none" stroke="var(--text-secondary)" strokeWidth="1.3" />

            {/* brew（抽象） */}
            <rect x={208} y={CHIP_Y} width={118} height={CHIP_H} rx="7" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="5 3" />
            <text x={267} y={178} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              brew()
            </text>
            <text x={267} y={194} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              抽象 · 子类填空
            </text>
            <path d="M328 182 h16 M340 178 l6 4 l-6 4" fill="none" stroke="var(--text-secondary)" strokeWidth="1.3" />

            {/* pourInCup（具体） */}
            <rect x={346} y={CHIP_Y} width={118} height={CHIP_H} rx="7" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x={405} y={178} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              pourInCup()
            </text>
            <text x={405} y={194} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              具体 · 父类实现
            </text>
            <path d="M466 182 h18 M480 178 l6 4 l-6 4" fill="none" stroke="var(--text-secondary)" strokeWidth="1.3" />

            {/* 钩子门 */}
            <rect x={486} y={166} width={36} height={32} rx="5" fill={HOOK_COLOR} fillOpacity="0.14" stroke={HOOK_COLOR} strokeWidth="1.3" />
            <text x={504} y={186} textAnchor="middle" fontSize="9" fontWeight="700" fill={HOOK_COLOR}>
              钩子
            </text>
            <path d="M524 182 h16 M536 178 l6 4 l-6 4" fill="none" stroke="var(--text-secondary)" strokeWidth="1.3" />

            {/* addCondiments（抽象） */}
            <rect x={542} y={CHIP_Y} width={118} height={CHIP_H} rx="7" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="5 3" />
            <text x={601} y={178} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              addCondiments()
            </text>
            <text x={601} y={194} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              抽象 · 子类填空
            </text>
          </g>

          {/* 步骤点亮描边 */}
          <rect ref={glowBoilRef} x={67} y={157} width={124} height={50} rx="9" fill="none" stroke={OK_COLOR} strokeWidth="2.2" style={{ opacity: 0 }} />
          <rect ref={glowBrewRef} x={205} y={157} width={124} height={50} rx="9" fill="none" stroke={COFFEE_COLOR} strokeWidth="2.2" style={{ opacity: 0 }} />
          <rect ref={glowPourRef} x={343} y={157} width={124} height={50} rx="9" fill="none" stroke={OK_COLOR} strokeWidth="2.2" style={{ opacity: 0 }} />
          <rect ref={glowCondRef} x={539} y={157} width={124} height={50} rx="9" fill="none" stroke={COFFEE_COLOR} strokeWidth="2.2" style={{ opacity: 0 }} />

          {/* 抽象步骤的子类实现标签 */}
          <g ref={brewFillRef} style={{ opacity: 0 }}>
            <rect x={218} y={132} width={98} height={20} rx="5" fill={COFFEE_COLOR} fillOpacity="0.16" stroke={COFFEE_COLOR} strokeWidth="1.1" />
            <text x={267} y={146} textAnchor="middle" fontSize="9" fontWeight="700" fill={COFFEE_COLOR}>
              冲咖啡粉
            </text>
          </g>
          <g ref={condFillRef} style={{ opacity: 0 }}>
            <rect x={552} y={132} width={98} height={20} rx="5" fill={COFFEE_COLOR} fillOpacity="0.16" stroke={COFFEE_COLOR} strokeWidth="1.1" />
            <text x={601} y={146} textAnchor="middle" fontSize="9" fontWeight="700" fill={COFFEE_COLOR}>
              加糖和奶
            </text>
          </g>

          {/* 执行包 */}
          <g ref={packetRef} style={{ opacity: 0, transform: `translate(100px, ${CHIP_MID}px)` }}>
            <circle cx={0} cy={0} r="7" fill={ACCENT} stroke="var(--elevated)" strokeWidth="2" />
          </g>

          {/* Coffee 子类 */}
          <g ref={coffeeRef} style={{ opacity: 0 }}>
            <rect x={90} y={290} width={250} height={95} rx="10" fill={COFFEE_COLOR} fillOpacity="0.1" stroke={COFFEE_COLOR} strokeWidth="1.8" />
            <text x={215} y={315} textAnchor="middle" fontSize="13" fontWeight="700" fill={COFFEE_COLOR}>
              Coffee（子类）
            </text>
            <text x={215} y={338} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              brew() → 冲咖啡粉
            </text>
            <text x={215} y={358} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              addCondiments() → 加糖和奶
            </text>
            <text x={215} y={376} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              只填空，不改骨架
            </text>
          </g>

          {/* Tea 子类 */}
          <g ref={teaRef} style={{ opacity: 0 }}>
            <rect x={380} y={290} width={250} height={95} rx="10" fill={TEA_COLOR} fillOpacity="0.1" stroke={TEA_COLOR} strokeWidth="1.8" />
            <text x={505} y={315} textAnchor="middle" fontSize="13" fontWeight="700" fill={TEA_COLOR}>
              Tea（子类）
            </text>
            <text x={505} y={338} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              brew() → 茶包浸泡
            </text>
            <text x={505} y={358} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              addCondiments() → 加柠檬
            </text>
            <text x={505} y={376} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              同一骨架，不同填法
            </text>
          </g>

          {/* 钩子说明 */}
          <g ref={hookRef} style={{ opacity: 0 }}>
            <rect x={486} y={222} width={174} height={40} rx="7" fill={HOOK_COLOR} fillOpacity="0.12" stroke={HOOK_COLOR} strokeWidth="1.3" />
            <text x={573} y={238} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="monospace" fill={HOOK_COLOR}>
              customerWantsCondiments()
            </text>
            <text x={573} y={253} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              默认 true · 可覆盖为 false 跳过
            </text>
          </g>

          {/* 好莱坞原则结论 */}
          <g ref={hollywoodRef} style={{ opacity: 0 }}>
            <rect x={90} y={402} width={540} height={44} rx="8" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x={360} y={420} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              好莱坞原则：「别调用我们，我们会调用你」
            </text>
            <text x={360} y={438} textAnchor="middle" fontSize="11" fill="var(--text-primary)">
              父类控制流程（骨架），子类提供实现（填空）——控制权在父类
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="模板方法用 final 锁住骨架保证流程一致，用抽象方法和钩子把变化点交给子类——继承在这里是「被控制」的。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模板方法在父类中定义算法骨架，把个别步骤延迟到子类实现。
        骨架（步骤顺序）由父类控制且不可覆盖，可变步骤（抽象方法）和可选开关（钩子）
        交给子类——既复用代码又保证流程一致，是好莱坞原则的典型体现。
      </figcaption>
    </figure>
  );
}
