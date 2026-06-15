"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/components/review/use-prefers-reduced-motion";

/**
 * useTeachingTimeline —— 「可控教学动画原语」之核心 hook（HEL-170）。
 *
 * 封装 anime.js v4（具名 ESM 导出 createTimeline）的时间线，对外暴露一套
 * 与 DESIGN §动效原则 2 对齐的可控接口：教学动效是教具不是装饰，必须
 * **可暂停、可单步、可拖进度**。
 *
 * 设计要点：
 *  - 调用方通过 `build(timeline)` 回调往时间线里塞 anime.js 动画并打 label
 *    （`timeline.add(...)` / `timeline.label(name, position)`）。labels 即「关键帧」
 *    锚点，stepNext/stepPrev 在这些 label 的时间点之间跳转。
 *  - 默认 **暂停态加载**（autoplay:false）——DESIGN 要求教学动效由用户点播放，
 *    不自动开演；prefers-reduced-motion 下同样停在 t=0（更不会自动播）。
 *  - anime.js 自带全局引擎驱动 rAF，只在有动画在播时走时钟；我们用 onUpdate
 *    把 progress / playing / currentStep 同步进 React state 触发受控 UI 重渲染。
 *  - unmount / build 变化 / Strict-Mode 双调用时 cancel 旧实例，杜绝泄漏与重复时钟。
 *
 * 仅类型 import 用 `import type`，使 anime.js 运行时代码可被 code-split——本 hook
 * 由 "use client" 叶子组件经 next/dynamic(ssr:false) 懒加载，anime.js 不进公共 bundle
 * （硬规则 2/6）。
 */

import type { Timeline } from "animejs";

/** 关键帧步骤声明：label 必须与 `build` 里 `timeline.label(label, ...)` 的名字一致。 */
export type TeachingStep = {
  /** 关键帧锚点名（= anime.js timeline label），stepNext/stepPrev 据此跳转。 */
  readonly label: string;
  /** 该步在控制条上展示的人话描述（可选；缺省时回退到 label）。 */
  readonly caption?: string;
};

/** 调用方用它往时间线塞动画 + 打 label；framework 已置 autoplay:false。 */
export type BuildTimeline = (timeline: Timeline) => void;

export type UseTeachingTimelineOptions = {
  /** 关键帧步骤（顺序即时间顺序）。 */
  readonly steps: readonly TeachingStep[];
  /** 构建时间线回调：把 anime.js 动画 add 进 timeline 并对每个关键帧 label。 */
  readonly build: BuildTimeline;
};

export type TeachingTimeline = {
  play: () => void;
  pause: () => void;
  /** 在播则暂停、否则播放（播完后再点从头重播）。 */
  toggle: () => void;
  /** 跳到下一个关键帧 label 的时间点（暂停态停在该帧）。 */
  stepNext: () => void;
  /** 跳到上一个关键帧 label 的时间点（暂停态停在该帧）。 */
  stepPrev: () => void;
  /** 直接跳到第 i 个关键帧（夹紧到合法范围），暂停停帧。供步点条直跳用。 */
  goToStep: (i: number) => void;
  /** 拖进度：0~1 直接 seek 到对应时间（会暂停，符合「拖 = 手动」语义）。 */
  seek: (progress0to1: number) => void;
  /** 是否正在自动播放。 */
  isPlaying: boolean;
  /** 当前播放进度 0~1（受控，随时钟更新）。 */
  progress: number;
  /** 当前所处关键帧下标（[0, labels.length-1]，按 currentTime 落在哪段判定）。 */
  currentStep: number;
  /** 关键帧 label 列表（顺序与 steps 一致），供控制条渲染步点。 */
  labels: readonly string[];
  /** reduced-motion 是否生效（控制条据此隐藏「自动播放」语义控件）。 */
  reducedMotion: boolean;
};

/** 在已排定的 label 时间点里，找 currentTime 落在第几段（最后命中的 ≤ t 的 label）。 */
function stepIndexAt(times: readonly number[], t: number): number {
  let idx = 0;
  for (let i = 0; i < times.length; i++) {
    // 容差 1ms：避免浮点抖动让恰好落在 label 上的帧被算到上一段。
    if (t + 1 >= times[i]) idx = i;
    else break;
  }
  return idx;
}

export function useTeachingTimeline(
  options: UseTeachingTimelineOptions,
): TeachingTimeline {
  const { steps, build } = options;
  const reducedMotion = usePrefersReducedMotion();

  const timelineRef = useRef<Timeline | null>(null);
  // 各关键帧 label 对应的时间点（ms），按 steps 顺序；构建完成后填充。
  const labelTimesRef = useRef<number[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // 把 steps/build 收进 ref，使 effect 只依赖「结构指纹」而非每渲染新建的对象/函数，
  // 避免父组件每次渲染都重建时间线（重建 = 闪帧 + 时钟泄漏）。
  const buildRef = useRef(build);
  buildRef.current = build;
  const labelsKey = steps.map((s) => s.label).join("|");

  useEffect(() => {
    let cancelled = false;
    let tl: Timeline | null = null;

    // 运行时按需 import anime.js（动态 import → 独立 chunk，绝不进公共 bundle）。
    void import("animejs").then(({ createTimeline }) => {
      if (cancelled) return;

      tl = createTimeline({
        autoplay: false, // DESIGN：教学动效默认暂停态加载，由用户点播放
        onUpdate: (self) => {
          // 时钟每帧把状态同步进 React（受控 UI）。self 即该 Timeline。
          setProgress(self.progress);
          setIsPlaying(!self.paused && !self.completed);
          const times = labelTimesRef.current;
          if (times.length > 0) {
            setCurrentStep(stepIndexAt(times, self.currentTime));
          }
        },
        onComplete: () => {
          setIsPlaying(false);
        },
        onPause: () => {
          setIsPlaying(false);
        },
      });

      // 让调用方塞动画 + 打 label。
      buildRef.current(tl);

      // 收集每个声明步骤 label 的实际时间点（anime.js 已在 add/label 后填好 tl.labels）。
      labelTimesRef.current = steps.map((s) => tl!.labels[s.label] ?? 0);

      timelineRef.current = tl;

      // 暂停态加载：显式 seek 到 t=0 并 pause，保证首帧呈现第一关键帧的样子。
      tl.pause();
      tl.seek(0);
      setProgress(0);
      setIsPlaying(false);
      setCurrentStep(0);
    });

    return () => {
      cancelled = true;
      // cancel 停时钟 + 解绑；置空 ref 防 Strict-Mode 双挂载残留两套时钟。
      if (tl) tl.cancel();
      if (timelineRef.current && timelineRef.current !== tl) {
        timelineRef.current.cancel();
      }
      timelineRef.current = null;
      labelTimesRef.current = [];
    };
  }, [labelsKey, steps]);

  const play = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    // 已播完则从头再播（教学场景：看完一遍想重看）。
    if (tl.completed) tl.restart();
    else tl.play();
    setIsPlaying(true);
  };

  const pause = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    tl.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (!tl.paused && !tl.completed) pause();
    else play();
  };

  /** 跳到第 i 个关键帧的时间点（夹紧到合法范围），暂停停帧。 */
  const goToStep = (i: number) => {
    const tl = timelineRef.current;
    const times = labelTimesRef.current;
    if (!tl || times.length === 0) return;
    const clamped = Math.min(times.length - 1, Math.max(0, i));
    tl.pause();
    tl.seek(times[clamped]);
    setIsPlaying(false);
    setProgress(tl.progress);
    setCurrentStep(clamped);
  };

  const stepNext = () => goToStep(currentStep + 1);
  const stepPrev = () => goToStep(currentStep - 1);

  const seek = (progress0to1: number) => {
    const tl = timelineRef.current;
    if (!tl) return;
    const p = Math.min(1, Math.max(0, progress0to1));
    tl.pause();
    tl.seek(tl.duration * p);
    setIsPlaying(false);
    setProgress(p);
    const times = labelTimesRef.current;
    if (times.length > 0) setCurrentStep(stepIndexAt(times, tl.currentTime));
  };

  return {
    play,
    pause,
    toggle,
    stepNext,
    stepPrev,
    goToStep,
    seek,
    isPlaying,
    progress,
    currentStep,
    labels: steps.map((s) => s.label),
    reducedMotion,
  };
}
