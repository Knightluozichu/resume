"use client";

import { useState } from "react";
import { easeInOut } from "../gamemath/animotor";

const VIEW_W = 760;
const VIEW_H = 440;

type TaskNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  cost: number; // relative cost
  deps: string[];
};

const TASKS: TaskNode[] = [
  { id: "input", label: "输入采样", x: 100, y: 60, cost: 1, deps: [] },
  { id: "scene", label: "场景遍历", x: 100, y: 200, cost: 3, deps: ["input"] },
  { id: "physics", label: "物理模拟", x: 100, y: 340, cost: 5, deps: ["scene"] },
  { id: "cull", label: "可见性剔除", x: 340, y: 60, cost: 2, deps: ["scene"] },
  { id: "anim", label: "动画更新", x: 340, y: 200, cost: 3, deps: ["scene"] },
  { id: "audio", label: "音频混音", x: 340, y: 340, cost: 1, deps: ["scene"] },
  { id: "draw", label: "构建绘制列表", x: 580, y: 60, cost: 2, deps: ["cull", "anim"] },
  { id: "submit", label: "提交 GPU 命令", x: 580, y: 200, cost: 2, deps: ["draw", "physics"] },
  { id: "present", label: "Present", x: 580, y: 340, cost: 1, deps: ["submit", "audio"] },
];

const NODE_W = 110;
const NODE_H = 52;

export function TaskGraphViz() {
  const [threads, setThreads] = useState(3);
  const [animProgress, setAnimProgress] = useState(0);

  // Simple greedy scheduler simulation
  const schedule = simulateSchedule(TASKS, threads);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
      <figcaption className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-accent">任务图调度</p>
          <h4 className="text-base font-semibold text-primary">
            并行任务依赖图与线程分配
          </h4>
        </div>
        <div className="flex items-center gap-3 text-xs text-secondary">
          <label className="flex items-center gap-1">
            线程数:
            <select
              value={threads}
              onChange={(e) => setThreads(Number(e.target.value))}
              className="rounded-control border border-border bg-bg px-2 py-1 text-xs text-primary"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>
        </div>
      </figcaption>
      <p className="mb-3 text-xs leading-5 text-secondary">
        同一帧内的任务不能乱跑——它们之间有依赖关系。依赖满足的任务可以并行，有依赖的必须等前驱完成。把线程数从 1 调到 4，看调度效率怎么变。
      </p>

      <div className="overflow-x-auto rounded-card border border-border bg-bg">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并行任务图与调度可视化"
          className="block w-full min-w-[660px]"
        >
          {/* Dependency edges */}
          {TASKS.map((task) =>
            task.deps.map((depId) => {
              const dep = TASKS.find((t) => t.id === depId);
              if (!dep) return null;
              const midX = (dep.x + task.x) / 2;
              const midY = (dep.y + task.y) / 2;
              return (
                <g key={`${depId}-${task.id}`}>
                  <path
                    d={`M ${dep.x + NODE_W / 2} ${dep.y + NODE_H / 2} Q ${midX} ${dep.y + NODE_H / 2}, ${midX} ${midY} Q ${midX} ${task.y + NODE_H / 2}, ${task.x - NODE_W / 2 + 12} ${task.y + NODE_H / 2}`}
                    className="fill-none stroke-border"
                    strokeWidth="1.5"
                    markerEnd="url(#taskgraph-arrow)"
                  />
                </g>
              );
            }),
          )}

          {/* Task nodes */}
          {TASKS.map((task) => {
            const sched = schedule.find((s) => s.id === task.id);
            const threadColor = sched
              ? ["fill-accent-glow stroke-accent", "fill-warning/10 stroke-warning", "fill-success/10 stroke-success", "fill-accent-glow stroke-accent"][sched.threadId % 4]
              : "fill-elevated stroke-border";

            return (
              <g key={task.id}>
                <rect
                  x={task.x - NODE_W / 2}
                  y={task.y - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  className={threadColor}
                  strokeWidth="1.5"
                />
                <text
                  x={task.x}
                  y={task.y - 6}
                  textAnchor="middle"
                  className="fill-primary text-[12px] font-semibold"
                >
                  {task.label}
                </text>
                <text
                  x={task.x}
                  y={task.y + 14}
                  textAnchor="middle"
                  className="fill-secondary text-[10px]"
                >
                  开销: {task.cost} | {sched ? `T${sched.threadId}` : "—"}
                </text>
              </g>
            );
          })}

          {/* Arrow marker */}
          <defs>
            <marker id="taskgraph-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0 0 6 3 0 6Z" className="fill-border" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Explanation */}
      <div className="mt-3 rounded-card border border-border bg-bg/60 p-3">
        <p className="text-xs leading-5 text-secondary">
          任务图说明了并行的两个核心约束：<strong>依赖</strong>（箭头 = 必须等前驱完成）和<strong>独立</strong>（没有箭头相连的可以并行）。线程越多并不总是越快——如果任务之间的依赖是串行的（长链），加再多线程也只能一个一个做。这就是 Amdahl 定律：加速比的上限由串行部分决定。
        </p>
      </div>
    </figure>
  );
}

type ScheduleEntry = { id: string; threadId: number; startTime: number };

function simulateSchedule(
  tasks: TaskNode[],
  numThreads: number,
): ScheduleEntry[] {
  const result: ScheduleEntry[] = [];
  const threadTimes = new Array(numThreads).fill(0);
  const taskTimes = new Map(tasks.map((t) => [t.id, t.cost]));
  const completed = new Set<string>();

  let changed = true;
  while (changed) {
    changed = false;
    for (const task of tasks) {
      if (completed.has(task.id)) continue;
      if (task.deps.some((d) => !completed.has(d))) continue;

      const earliestStart = Math.max(
        ...task.deps.map((d) => {
          const entry = result.find((r) => r.id === d);
          return entry ? entry.startTime + (taskTimes.get(d) ?? 0) : 0;
        }),
        0,
      );

      // Find the thread that finishes earliest after earliestStart
      let bestThread = 0;
      let bestTime = Infinity;
      for (let t = 0; t < numThreads; t++) {
        const start = Math.max(earliestStart, threadTimes[t]);
        if (start < bestTime) {
          bestTime = start;
          bestThread = t;
        }
      }

      result.push({ id: task.id, threadId: bestThread, startTime: bestTime });
      threadTimes[bestThread] = bestTime + (taskTimes.get(task.id) ?? 0);
      completed.add(task.id);
      changed = true;
    }
  }

  return result;
}
