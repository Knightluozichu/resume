"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

const T = TEACHING_BEAT_MS;
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const OK = "#3FB97F";
const ACCENT = "#5A9AE6";
const VW = 900;
const VH = 420;

type Pattern = { name: string; cn: string; desc: string };

const SECTIONS: Record<string, { title: string; subtitle: string; patterns: Pattern[] }> = {
  "gpp-design-patterns-revisited": {
    title: "II. Design Patterns Revisited",
    subtitle: "重访经典 GoF 模式，看它们在游戏里的新生命",
    patterns: [
      { name: "Command", cn: "命令", desc: "把动作变成可传递的对象" },
      { name: "Flyweight", cn: "享元", desc: "共享固有状态" },
      { name: "Observer", cn: "观察者", desc: "主题通知订阅者" },
      { name: "Prototype", cn: "原型", desc: "克隆定义种类" },
      { name: "Singleton", cn: "单例", desc: "唯一实例与全局访问" },
      { name: "State", cn: "状态", desc: "状态即对象" },
    ],
  },
  "gpp-sequencing-patterns": {
    title: "III. Sequencing Patterns",
    subtitle: "时序模式族——控制「什么先什么后」的节奏",
    patterns: [
      { name: "Double Buffer", cn: "双缓冲", desc: "读写隔离" },
      { name: "Game Loop", cn: "游戏循环", desc: "推进游戏时间" },
      { name: "Update Method", cn: "更新方法", desc: "逐帧更新实体" },
    ],
  },
  "gpp-behavioral-patterns": {
    title: "IV. Behavioral Patterns",
    subtitle: "行为模式族——定义「对象怎么做」",
    patterns: [
      { name: "Bytecode", cn: "字节码", desc: "行为编码为指令" },
      { name: "Subclass Sandbox", cn: "子类沙盒", desc: "基类给能力" },
      { name: "Type Object", cn: "类型对象", desc: "种类即数据" },
    ],
  },
  "gpp-decoupling-patterns": {
    title: "V. Decoupling Patterns",
    subtitle: "解耦模式族——让系统互不认识",
    patterns: [
      { name: "Component", cn: "组件", desc: "实体是组件容器" },
      { name: "Event Queue", cn: "事件队列", desc: "事件先排队" },
      { name: "Service Locator", cn: "服务定位器", desc: "按名取服务" },
    ],
  },
  "gpp-optimization-patterns": {
    title: "VI. Optimization Patterns",
    subtitle: "优化模式族——让游戏跑得更快",
    patterns: [
      { name: "Data Locality", cn: "数据局部性", desc: "缓存友好" },
      { name: "Dirty Flag", cn: "脏标志", desc: "变化才重算" },
      { name: "Object Pool", cn: "对象池", desc: "零堆分配" },
      { name: "Spatial Partition", cn: "空间分区", desc: "只查邻格" },
    ],
  },
  "gpp-official-learning-map": {
    title: "《游戏编程模式》权威学习地图",
    subtitle: "六大模式族 · 从设计到优化，逐层掌握",
    patterns: [
      { name: "Design Patterns", cn: "设计模式重访", desc: "六个经典模式在游戏里的新生命" },
      { name: "Sequencing", cn: "时序模式", desc: "控制推进节奏" },
      { name: "Behavioral", cn: "行为模式", desc: "定义对象怎么做" },
      { name: "Decoupling", cn: "解耦模式", desc: "让系统互不认识" },
      { name: "Optimization", cn: "优化模式", desc: "让游戏跑得更快" },
      { name: "Spatial", cn: "空间分区", desc: "只查可能相邻的候选" },
    ],
  },
  "gpp-official-final-review": {
    title: "《游戏编程模式》全书总复习",
    subtitle: "二十个模式 · 一张全景图",
    patterns: [
      { name: "Command", cn: "命令", desc: "输入即对象" },
      { name: "Flyweight", cn: "享元", desc: "共享固有状态" },
      { name: "Observer", cn: "观察者", desc: "主题与订阅" },
      { name: "Prototype", cn: "原型", desc: "克隆即生产" },
      { name: "Singleton", cn: "单例", desc: "唯一与全局" },
      { name: "State", cn: "状态", desc: "状态即对象" },
      { name: "Double Buffer", cn: "双缓冲", desc: "读写隔离" },
      { name: "Game Loop", cn: "游戏循环", desc: "推进游戏时间" },
      { name: "Update Method", cn: "更新方法", desc: "逐帧推进" },
      { name: "Bytecode", cn: "字节码", desc: "行为即数据" },
      { name: "Subclass Sandbox", cn: "子类沙盒", desc: "基类给能力" },
      { name: "Type Object", cn: "类型对象", desc: "种类即数据" },
      { name: "Component", cn: "组件", desc: "组合优于继承" },
      { name: "Event Queue", cn: "事件队列", desc: "解耦时与刻" },
      { name: "Service Locator", cn: "服务定位器", desc: "按名取服务" },
      { name: "Data Locality", cn: "数据局部性", desc: "缓存友好" },
      { name: "Dirty Flag", cn: "脏标志", desc: "变化才重算" },
      { name: "Object Pool", cn: "对象池", desc: "零堆分配" },
      { name: "Spatial Partition", cn: "空间分区", desc: "只查邻格" },
    ],
  },
};

export function GppSectionOverviewLab({ chapter }: { chapter: string }) {
  const spec = SECTIONS[chapter] ?? SECTIONS["gpp-design-patterns-revisited"];
  const titleRef = useRef<SVGGElement>(null);
  const patRefs = spec.patterns.map(() => useRef<SVGGElement>(null));
  const steps: readonly TeachingStep[] = spec.patterns.map((p, i) => ({ label: "p" + i, caption: p.cn + "：" + p.desc }));
  const labelText: Record<string, string> = Object.fromEntries(spec.patterns.map((p, i) => ["p" + i, p.cn]));
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      tl.add(titleRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      spec.patterns.forEach((_, i) => {
        tl.add(patRefs[i].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * i);
        tl.label("p" + i, T * i);
      });
    },
  });
  const cols = spec.patterns.length > 12 ? 5 : 3;
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Game Programming Patterns</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>{spec.title}</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label={`${spec.title}模式族总览：${spec.subtitle}，共${spec.patterns.length}个模式。可播放、暂停、单步、拖动进度。`}>
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>{spec.subtitle}</text>
          <g ref={titleRef} style={{ opacity: 0 }}>
            <rect x={280} y={50} width={340} height={56} rx={12} fill="var(--bg)" stroke={ACCENT} strokeWidth={2} />
            <text x={450} y={84} textAnchor="middle" fontSize={13} fontWeight={700} fill={ACCENT}>{spec.patterns.length} 个模式 · 一个共同主题</text>
          </g>
          {spec.patterns.map((p, i) => {
            const colW = 780 / cols;
            const x = 60 + (i % cols) * colW;
            const y = 130 + Math.floor(i / cols) * 72;
            return (
              <g key={p.name} ref={patRefs[i]} style={{ opacity: 0 }}>
                <rect x={x} y={y} width={colW - 12} height={60} rx={8} fill="var(--bg)" stroke={LINE} strokeWidth={1.5} />
                <text x={x + 10} y={y + 22} fontSize={12} fontWeight={700} fill={ACCENT}>{p.name}</text>
                <text x={x + 10} y={y + 42} fontSize={11} fill={MUTE}>{p.cn} · {p.desc}</text>
              </g>
            );
          })}
          <g ref={patRefs[spec.patterns.length - 1]} style={{ opacity: 0 }}>
            <rect x={60} y={378} width={780} height={34} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.2} />
            <text x={450} y={400} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>共同主题：{spec.subtitle}</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={labelText} caption={spec.subtitle} />
      </div>
    </div>
  );
}
