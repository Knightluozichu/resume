"use client";

import { useRef } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <HotfixDexInjectionDiagram>：《Android 进阶解密》advanced-tech/hotfix-principle 章
 * 「ClassLoader 热修复方案——补丁 dex 插桩」配图（HEL-211）。
 *
 * 「可控教学动画」：横向画一排 PathClassLoader 内 DexPathList.dexElements 数组的槽位，
 * 每个槽 = 一个 dex 文件对应的 Element。随时间线演示 ClassLoader 热修复的核心机理——
 * 「基于 dexElements 数组顺序 + 同名类先到先得」：把含修复版的 patch.dex 反射插到数组
 * 最前面，类查找从头扫描时先在 patch.dex 命中修复版，旧 app.dex 里的 Bug.class 被跳过：
 *   ① 初始：dexElements = [app.dex]，里面有含 bug 的 Bug.class →
 *   ② 服务端下发补丁 patch.dex（含修复后的 Bug.class），新卡片出现在数组一侧待插入 →
 *   ③ 反射拿到 dexElements，把 patch.dex 的 Element 插到数组「最前面」（patch 滑入数组头部，
 *      原 app.dex 整体后移一格）→
 *   ④ ClassLoader 加载 Bug 类时按 dexElements 顺序查找：查找令牌从数组头开始向后扫描 →
 *   ⑤ 令牌在 patch.dex（数组头）就命中修复版 Bug.class，命中即返回；旧 app.dex 里的
 *      Bug.class 被「遮蔽」、永不加载（同名类先到先得）。
 *
 * 时序照 ClassLoaderDelegationDiagram / RecyclerViewRecyclingDiagram：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出；
 * 最后一步停在亮态不淡出（命中闭环完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：app.dex 用 --text-secondary（旧、被遮蔽的低对比底色）；patch.dex 用 --accent
 * （品牌紫，新插入的补丁）；命中时该槽点亮 --success（绿，修复版被采用）。全部 DESIGN token
 * 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量、几何布局常量均为 4 的倍数且具名（硬规则 5）。
 */

// —— 画布与数组布局（间距走 4 的倍数）。dexElements 横向铺开，槽 0 = 数组头（最先查找）。 ——
const VIEW_W = 600;
const VIEW_H = 360;

// 单个 dex Element 卡片尺寸。
const CARD_W = 152;
const CARD_H = 96;
const CARD_GAP = 24; // 相邻两槽的水平间隔（留出插入位移 + 顺序箭头空间）
const SLOT_W = CARD_W + CARD_GAP; // 一个「数组槽」宽度

// 数组容器（DexPathList.dexElements）框。
const ARRAY_X = 32;
const ARRAY_Y = 152;
const ARRAY_PAD = 16; // 容器内边距
// 槽 0 卡片左上角（数组头，紧贴容器左内边距）。
const SLOT0_X = ARRAY_X + ARRAY_PAD;
const SLOT_Y = ARRAY_Y + ARRAY_PAD;
// 容器宽容纳两槽（patch 头 + app 后移）；高容纳一行卡片 + 上下内边距。
const ARRAY_W = ARRAY_PAD * 2 + SLOT_W + CARD_W;
const ARRAY_H = ARRAY_PAD * 2 + CARD_H;

// patch.dex 下发时的待命位（数组右上方、容器外，准备滑入头部）。
const PATCH_WAIT_X = SLOT0_X + SLOT_W;
const PATCH_WAIT_Y = SLOT_Y - 112; // 浮在数组上方待命（4 的倍数）

// 查找令牌竖直位（在卡片上沿之上扫描），半径。
const TOKEN_Y = SLOT_Y - 20;
const TOKEN_R = 8;

/** 把槽号换算成卡片左上角 x（槽 0 = 数组头，越大越靠右）。 */
function slotToX(slot: number): number {
  return SLOT0_X + slot * SLOT_W;
}

/** 某槽卡片的水平中心 x（令牌端点 / 箭头端点用）。 */
function slotCenterX(slot: number): number {
  return slotToX(slot) + CARD_W / 2;
}

/**
 * 一个 dex Element 卡片的状态：
 * - slot：它当前落在数组第几槽（数组头 = 0）；负数槽（如 -1）= 仍在容器外待命位。
 * - inArray：是否已属于 dexElements 数组（false = 还在下发/待命，淡现于待命位）。
 */
type DexId = "app" | "patch";
type DexState = {
  /** 卡片落点：在数组内时为槽号；"wait" = 容器外待命位（patch 下发后未插入时）。 */
  place: number | "wait";
  /** 是否可见（patch 在步①还没下发，整张不显示）。 */
  visible: boolean;
};

type DexDef = {
  id: DexId;
  title: string;
  /** 副标题：它含的关键类。 */
  klass: string;
};

const DEXES: readonly DexDef[] = [
  { id: "app", title: "app.dex", klass: "含 bug 的 Bug.class" },
  { id: "patch", title: "patch.dex", klass: "修复后的 Bug.class" },
];

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
// dex：每张 dex 卡片该步的落点与可见性。token：该步查找令牌从哪槽扫到哪槽（null 不扫）。
// hitSlot：该步命中（点亮 --success）的槽号（null 表示无命中）。
type InjectionStep = TeachingStep & {
  dex: Record<DexId, DexState>;
  /** 查找令牌起止槽号；null 表示该步令牌不出现 / 不扫描。 */
  tokenFrom: number | null;
  tokenTo: number | null;
  /** 命中并点亮的槽号（修复版被采用）；null 表示该步无命中。 */
  hitSlot: number | null;
};

const STEPS: readonly InjectionStep[] = [
  {
    label: "initial",
    caption:
      "① 初始：dexElements = [app.dex]，只有一格；里面的 Bug.class 含线上 bug，ClassLoader 加载它就会出问题",
    dex: {
      app: { place: 0, visible: true },
      patch: { place: "wait", visible: false },
    },
    tokenFrom: null,
    tokenTo: null,
    hitSlot: null,
  },
  {
    label: "patch-arrive",
    caption:
      "② 服务端下发补丁 patch.dex：里面是修复后的 Bug.class，新卡片出现在数组上方待命，尚未加入数组",
    dex: {
      app: { place: 0, visible: true },
      patch: { place: "wait", visible: true },
    },
    tokenFrom: null,
    tokenTo: null,
    hitSlot: null,
  },
  {
    label: "inject-head",
    caption:
      "③ 反射拿到 dexElements，把 patch.dex 的 Element 插到数组「最前面」：patch 滑入数组头部（槽 0），原 app.dex 整体后移到槽 1",
    dex: {
      app: { place: 1, visible: true },
      patch: { place: 0, visible: true },
    },
    tokenFrom: null,
    tokenTo: null,
    hitSlot: null,
  },
  {
    label: "scan",
    caption:
      "④ ClassLoader 加载 Bug 类时按 dexElements 顺序查找：查找令牌从数组头（槽 0）开始向后逐格扫描",
    dex: {
      app: { place: 1, visible: true },
      patch: { place: 0, visible: true },
    },
    tokenFrom: 0,
    tokenTo: 0,
    hitSlot: null,
  },
  {
    label: "hit",
    caption:
      "⑤ 令牌在数组头的 patch.dex 就命中修复版 Bug.class，命中即返回；后面 app.dex 里那个含 bug 的 Bug.class 被遮蔽、永不加载——同名类先到先得",
    dex: {
      app: { place: 1, visible: true },
      patch: { place: 0, visible: true },
    },
    tokenFrom: null,
    tokenTo: null,
    hitSlot: 0,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

/** 把某 dex 卡片状态换算成卡片左上角坐标。 */
function dexToXY(st: DexState): { x: number; y: number } {
  if (st.place === "wait") {
    return { x: PATCH_WAIT_X, y: PATCH_WAIT_Y };
  }
  return { x: slotToX(st.place), y: SLOT_Y };
}

export function HotfixDexInjectionDiagram() {
  // 每张 dex 卡片整组（<g>）的 DOM 引用：anime.js 驱动 translateX/translateY（待命位↔数组槽迁移）
  // + opacity（patch 下发前隐形）。app.dex 在插桩步会整体后移（translateX 一格 SLOT_W）。
  const dexRefs = useRef<Partial<Record<DexId, SVGGElement | null>>>({});
  // 每张 dex 卡片的「命中高亮覆盖层」DOM 引用：该卡片被令牌命中时淡入（--success 描边 + 辉光），
  // 强调「这一格的修复版类被采用」。
  const hitRefs = useRef<Partial<Record<DexId, SVGRectElement | null>>>({});
  // 查找令牌 DOM 引用：anime.js 驱动它沿数组横向扫描（cx）+ 淡入淡出（opacity）。
  const tokenRef = useRef<SVGCircleElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全呈现时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        // 各 dex 卡片：迁移到该步落点 + 可见性（patch 下发前隐形 → 下发淡现 → 插入滑到头部）。
        DEXES.forEach((dex) => {
          const el = dexRefs.current[dex.id];
          const st = step.dex[dex.id];
          if (el) {
            const { x, y } = dexToXY(st);
            // 初始 transform 基准是 app 的槽 0（SLOT0_X, SLOT_Y），位移用相对量。
            tl.add(
              el,
              {
                translateX: x - SLOT0_X,
                translateY: y - SLOT_Y,
                opacity: st.visible ? 1 : 0,
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          }

          // 命中高亮层：该步该卡片所在槽 === hitSlot 时淡入 --success；否则保持半灭。
          const hi = hitRefs.current[dex.id];
          if (hi) {
            const inArray = st.place !== "wait";
            const isHit =
              step.hitSlot !== null && inArray && st.place === step.hitSlot;
            tl.add(
              hi,
              {
                opacity: isHit ? 1 : 0,
                duration: TEACHING_BEAT_MS,
                ease: isHit ? "out(3)" : "in(2)",
              },
              start,
            );
          }
        });

        // 查找令牌：扫描步沿数组横向滑动（首格即停，强调头部先到先得）；其余步隐形。
        const token = tokenRef.current;
        if (token) {
          if (step.tokenFrom !== null && step.tokenTo !== null) {
            const fromX = slotCenterX(step.tokenFrom);
            const toX = slotCenterX(step.tokenTo);
            tl.add(
              token,
              {
                opacity: [0, 1],
                cx: [fromX, toX],
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          } else if (step.hitSlot !== null) {
            // 命中步：令牌停在命中槽上方脉冲点亮（强调「就在这格命中」）。
            tl.add(
              token,
              {
                opacity: [0.4, 1],
                cx: slotCenterX(step.hitSlot),
                duration: TEACHING_BEAT_MS,
                ease: "out(2)",
              },
              start,
            );
          } else if (!isLast) {
            // 尚无令牌的步：保持隐形。
            tl.add(
              token,
              { opacity: 0, duration: TEACHING_BEAT_MS * 0.5, ease: "in(2)" },
              start,
            );
          }
        }

        tl.label(step.label, lit);
      });
    },
  });

  // 令牌色：命中时 --success，扫描态 --accent。这里整颗令牌常驻 --accent，命中槽靠高亮层点绿。
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签（与站内 Demo 容器气质一致） */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="ClassLoader 热修复方案——补丁 dex 插桩演示。横向画着 PathClassLoader 内部 DexPathList 的 dexElements 数组，数组里每个槽位代表一个 dex 文件对应的 Element，数组头是第 0 槽、也就是类查找时最先被扫描的位置。五步演示一次 ClassLoader 热修复的核心机理——基于 dexElements 数组顺序加上同名类先到先得：① 初始时 dexElements 数组里只有一格 app.dex，它里面的 Bug.class 含有线上 bug，ClassLoader 加载这个类就会出问题；② 服务端下发补丁 patch.dex，里面是修复后的 Bug.class，新卡片出现在数组上方待命，但此刻还没有加入数组；③ App 通过反射拿到 dexElements 数组，把 patch.dex 对应的 Element 插到数组最前面，patch.dex 滑入数组头部第 0 槽，原来的 app.dex 整体后移到第 1 槽；④ ClassLoader 加载 Bug 类时按 dexElements 数组顺序从头查找，一个查找令牌从数组头第 0 槽开始向后逐格扫描；⑤ 令牌在数组头的 patch.dex 就命中了修复版 Bug.class，命中即返回，这一格被点亮成绿色表示修复版被采用，而后面 app.dex 里那个含 bug 的同名 Bug.class 被遮蔽、永远不会被加载——这就是同名类先到先得。要点一：同名类先到先得是 ClassLoader 热修复的核心，把补丁插到数组最前面就能让修复版优先命中。要点二：如果这个类在补丁生效前已经被 ClassLoader 加载过，那就无法再替换，必须重启 App、冷启动时尽早加载补丁才能生效。可播放、暂停、单步、拖动进度逐帧观察补丁卡片如何插入数组头部、原 app.dex 如何后移，以及查找令牌如何在数组头命中修复版。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* —— 顶部标题：PathClassLoader → DexPathList.dexElements 数组（定位读者）。—— */}
          <text
            x={VIEW_W / 2}
            y={40}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            PathClassLoader · DexPathList.dexElements
          </text>
          <text
            x={VIEW_W / 2}
            y={60}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            类查找按数组顺序从头扫描 → 同名类先到先得
          </text>

          {/* —— dexElements 数组容器框（常驻参照系）+ 数组头标注。—— */}
          <rect
            x={ARRAY_X}
            y={ARRAY_Y}
            width={ARRAY_W}
            height={ARRAY_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {/* 数组头方向标注（左侧 = 查找起点） */}
          <text
            x={SLOT0_X + CARD_W / 2}
            y={ARRAY_Y - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ◂ 数组头（查找起点，补丁插这里）
          </text>
          {/* dexElements 标签（容器底部） */}
          <text
            x={ARRAY_X + ARRAY_W / 2}
            y={ARRAY_Y + ARRAY_H + 24}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            dexElements[]：从前往后遍历，先命中先返回
          </text>

          {/* —— 查找令牌（默认隐形；anime.js 驱动其沿数组 cx 横向扫描 + 命中脉冲）。—— */}
          <circle
            ref={tokenRef}
            cx={slotCenterX(0)}
            cy={TOKEN_Y}
            r={TOKEN_R}
            fill="var(--accent)"
            opacity="0"
          />
          <text
            x={slotCenterX(0)}
            y={TOKEN_Y - 16}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
            opacity="0.7"
          >
            findClass(Bug)
          </text>

          {/* —— 两张 dex Element 卡片（app 旧、patch 补丁）。anime.js 驱动其迁移与命中高亮。—— */}
          {DEXES.map((dex) => {
            const first = STEPS[0].dex[dex.id];
            const { x: fx, y: fy } = dexToXY(first);
            // app 用 --text-secondary 底色（旧、被遮蔽）；patch 用 --accent（新补丁）。
            const stroke =
              dex.id === "patch" ? "var(--accent)" : "var(--text-secondary)";
            const titleFill =
              dex.id === "patch" ? "var(--accent)" : "var(--text-primary)";
            return (
              <g
                key={dex.id}
                ref={(el) => {
                  dexRefs.current[dex.id] = el;
                }}
                transform={`translate(${fx - SLOT0_X} ${fy - SLOT_Y})`}
                opacity={first.visible ? 1 : 0}
              >
                {/* 卡片底框（常驻） */}
                <rect
                  x={SLOT0_X}
                  y={SLOT_Y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="10"
                  fill="var(--bg-elevated)"
                  stroke={stroke}
                  strokeWidth="1.6"
                />
                {/* 命中高亮覆盖层：被令牌命中时淡入 --success 描边 + 辉光（修复版被采用）。 */}
                <rect
                  ref={(el) => {
                    hitRefs.current[dex.id] = el;
                  }}
                  x={SLOT0_X}
                  y={SLOT_Y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="10"
                  fill="var(--accent-glow)"
                  stroke="var(--success)"
                  strokeWidth="2.4"
                  opacity="0"
                />
                {/* dex 文件名（主标题） */}
                <text
                  x={SLOT0_X + CARD_W / 2}
                  y={SLOT_Y + 28}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={titleFill}
                >
                  {dex.title}
                </text>
                {/* 含的关键类（副标题，两行） */}
                <text
                  x={SLOT0_X + CARD_W / 2}
                  y={SLOT_Y + 52}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  Bug.class
                </text>
                <text
                  x={SLOT0_X + CARD_W / 2}
                  y={SLOT_Y + 70}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {dex.id === "patch" ? "（修复版）" : "（含 bug · 被遮蔽）"}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次 ClassLoader 热修复：补丁 patch.dex 插到 dexElements 数组最前面，类查找从头扫描时先命中修复版，旧 app.dex 里的 Bug.class 被遮蔽。可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ClassLoader 热修复方案：把含修复版类的 patch.dex 反射插到 dexElements 数组最前面 ——
        类查找按数组顺序从头扫描、同名类先到先得，于是修复版先命中、旧版被遮蔽。注意：若 Bug
        类在补丁生效前已被加载过则无法替换，需在冷启动尽早加载补丁、重启后才生效。
      </figcaption>
    </figure>
  );
}
