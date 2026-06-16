"use client";

/**
 * <ConcurrencyBugTaxonomyDiagram>：并发 bug 分类速查图（HEL-240，§3 引出 / §5 辅）。
 *
 * 收官章「测试与调试」的总览：把全书出现过的几类并发 bug 摊成一张「遇到诡异现象 →
 * 大概率是哪类 bug」的对照速查表。五类各一行卡片，每行三栏：症状 / 常见成因 / 往哪查，
 * 并点名呼应前面各章（竞态=ch3、死锁=ch3、数据竞争与内存序=ch5/6 等）。
 *
 * 餐厅后厨隐喻：后厨偶发的几种乱子各有「长相」——同改一张单（竞态）、互等工具僵死（死锁）、
 * 反复礼让谁也不动（活锁）、同时碰一份料没打招呼（数据竞争）、半成品被端走（破坏不变量）。
 *
 * 纯静态 SVG（无 anime.js）：分类是「一眼对照」的查表，不需要分步动画，故不引入时间线，
 * 也不挂 "use client" 的交互——但保留 "use client" 仅为与同目录组件一致的注册形态（实际无状态）。
 * 实为纯展示，无 hook、无 ref。
 *
 * 几何：根标题条 1 个 + 5 张分类卡，各卡仅一个 rect（类别名以彩色粗体文字呈现，
 * 不再嵌套色条 rect，杜绝 rect-rect 互压）。所有 rect 两两不重叠。
 * 视觉全部 DESIGN token，无裸 hex；字号 / 颜色走规范。
 */

const VIEW_W = 700;

// —— 根标题条 ——
const HEAD_X = 24;
const HEAD_Y = 16;
const HEAD_W = VIEW_W - 48;
const HEAD_H = 46;

// —— 5 张分类卡 ——
const CARD_X = 24;
const CARD_W = VIEW_W - 48;
const CARD_H = 78;
const CARD_GAP = 12;
const CARD_Y0 = 78;
const cardY = (i: number) => CARD_Y0 + i * (CARD_H + CARD_GAP);

const VIEW_H = CARD_Y0 + 5 * (CARD_H + CARD_GAP) + 8;

type BugRow = {
  name: string;
  chapter: string;
  color: string;
  symptom: string;
  cause: string;
  where: string;
};

const ROWS: readonly BugRow[] = [
  {
    name: "条件竞争 / 竞态条件",
    chapter: "（呼应第 3 章）",
    color: "var(--accent)",
    symptom: "结果时对时错，依赖线程交错的时序，重跑结果会变",
    cause: "多个线程对共享数据的操作交错，破坏了「该原子完成」的步骤",
    where: "找未保护的共享读改写；先单线程测逻辑、再加压复现",
  },
  {
    name: "死锁 deadlock",
    chapter: "（呼应第 3 章）",
    color: "var(--danger)",
    symptom: "程序整个卡住、毫无进展，CPU 通常很闲（线程被挂起）",
    cause: "多个线程各持一锁、又互等对方的锁 → 环形等待",
    where: "看线程栈都停在等锁；查加锁顺序是否一致（统一顺序可破环）",
  },
  {
    name: "活锁 livelock",
    chapter: "（本章新增对照）",
    color: "var(--warning)",
    symptom: "程序卡住但 CPU 跑满，看着很忙却没有任何进展",
    cause: "线程检测到冲突就退避重试，但动作总同时发生 → 反复礼让",
    where: "看 CPU 高却无产出；给退避加随机化 / 错开重试时机",
  },
  {
    name: "数据竞争 data race",
    chapter: "（呼应第 5、6 章）",
    color: "var(--success)",
    symptom: "偶发的脏数据 / 撕裂值 / 崩溃，换机器或开优化就变样",
    cause: "两线程并发访问同一内存、至少一个是写，且无 happens-before",
    where: "用 ThreadSanitizer 自动抓；检查内存序与同步是否到位",
  },
  {
    name: "破坏不变量",
    chapter: "broken invariant（呼应第 3、7 章）",
    color: "var(--text-secondary)",
    symptom: "对象处于「半成品」非法状态，断言失败、链表断裂等",
    cause: "更新多个相关字段的中途被别的线程看见 / 异常中断",
    where: "查临界区是否覆盖整组更新；异常路径是否回滚到一致状态",
  },
];

export function ConcurrencyBugTaxonomyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并发 bug 分类速查图。表头：遇到诡异并发现象，大概率是哪类 bug。五类分类卡，每类给出症状、常见成因、往哪查。第一类条件竞争（呼应第 3 章）：症状是结果时对时错、依赖时序、重跑会变；成因是多线程对共享数据的操作交错破坏了应原子完成的步骤；往哪查是找未保护的共享读改写，先单线程测逻辑再加压复现。第二类死锁（呼应第 3 章）：症状是程序整个卡住、CPU 很闲；成因是多线程各持一锁又互等对方的锁形成环形等待；往哪查是看线程栈都停在等锁、检查加锁顺序是否一致。第三类活锁（本章新增对照）：症状是卡住但 CPU 跑满、看着忙却没进展；成因是线程检测到冲突就退避重试但动作总同时发生；往哪查是看 CPU 高却无产出、给退避加随机化。第四类数据竞争（呼应第 5、6 章）：症状是偶发脏数据撕裂值崩溃、换机器或开优化就变样；成因是两线程并发访问同一内存、至少一个是写、且无 happens-before；往哪查是用 ThreadSanitizer 自动抓、检查内存序与同步。第五类破坏不变量（呼应第 3、7 章）：症状是对象处于半成品非法状态、断言失败链表断裂；成因是更新多个相关字段的中途被别的线程看见或异常中断；往哪查是检查临界区是否覆盖整组更新、异常路径是否回滚到一致状态。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* 根标题条 */}
          <rect
            x={HEAD_X}
            y={HEAD_Y}
            width={HEAD_W}
            height={HEAD_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={VIEW_W / 2}
            y={HEAD_Y + 20}
            textAnchor="middle"
            fontSize="13.5"
            fontWeight="700"
            fill="var(--accent)"
          >
            遇到诡异并发现象 → 大概率是哪类 bug？
          </text>
          <text
            x={VIEW_W / 2}
            y={HEAD_Y + 37}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            每类对照：症状 · 常见成因 · 往哪查
          </text>

          {/* 5 张分类卡 */}
          {ROWS.map((r, i) => {
            const y = cardY(i);
            return (
              <g key={r.name}>
                <rect
                  x={CARD_X}
                  y={y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="10"
                  fill={r.color}
                  fillOpacity="0.06"
                  stroke={r.color}
                  strokeWidth="1.6"
                />
                {/* 类别名 + 章节呼应（粗体彩色文字，不再嵌套色块 rect） */}
                <text
                  x={CARD_X + 16}
                  y={y + 22}
                  fontSize="13"
                  fontWeight="700"
                  fill={r.color}
                >
                  {r.name}
                </text>
                <text
                  x={CARD_X + 16}
                  y={y + 38}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {r.chapter}
                </text>
                {/* 三栏信息：症状 / 成因 / 往哪查（同行用前缀标签区分，纯文字） */}
                <text
                  x={CARD_X + 168}
                  y={y + 22}
                  fontSize="10.5"
                  fill="var(--text-primary)"
                >
                  症状：{r.symptom}
                </text>
                <text
                  x={CARD_X + 168}
                  y={y + 41}
                  fontSize="10.5"
                  fill="var(--text-primary)"
                >
                  成因：{r.cause}
                </text>
                <text
                  x={CARD_X + 168}
                  y={y + 60}
                  fontSize="10.5"
                  fontWeight="600"
                  fill={r.color}
                >
                  往哪查：{r.where}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发 bug 速查：先看「症状」对号入座，再顺着「常见成因 /
        往哪查」缩小排查范围。 条件竞争与死锁来自第 3 章、数据竞争与内存序来自第
        5、6 章、破坏不变量来自第 3、7 章——本章把它们统一成「要测试、要调试的
        bug 源」并给出抓法。
      </figcaption>
    </figure>
  );
}
