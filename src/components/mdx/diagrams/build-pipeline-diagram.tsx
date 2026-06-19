"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <BuildPipelineDiagram>：主图（anime）——「从工程到平台产物」的构建流水线（HEL-290）。
 *
 * 从左到右四阶段，最后一阶段分叉出四个平台产物：
 *  工程（场景+资源+脚本） → Build Settings（选平台 + 勾 Scenes In Build）
 *   → 构建 → 平台产物（Win .exe / Mac .app / Android .apk / WebGL 文件夹）。
 *
 * 动画分 4 步（label 锚定该步「点亮完成」时刻 lit = BEAT*(i+1)）：
 *  - 步①：工程卡点亮（场景+资源+脚本这三样进料）。
 *  - 步②：Build Settings 卡点亮（选目标平台 + 勾 Scenes In Build 列表）。
 *  - 步③：构建齿轮卡点亮。
 *  - 步④：四个平台产物依次分叉出现（stagger 入场）。
 *
 * 全部坐标整数常量（无 Math 浮点；产物 y 用单一行内常量算）。
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥20px（底部基线离底边 ≥20px）。
 */

const VIEW_W = 736;
// VIEW_H=320：最低内容是底部产物组文字基线 296，下留 24px。纵向利用率 ~88%。
const VIEW_H = 320;

// 三个主阶段卡（横排，整数坐标）。
const STAGE_Y = 96;
const STAGE_H = 92;
const PROJ_X = 24;
const PROJ_W = 188;
const BS_X = 248;
const BS_W = 200;
const BUILD_X = 484;
const BUILD_W = 116;

// 连线箭头之间的水平间隙（整数）。
// 产物列（步④分叉）：四个小卡纵向排在右侧最末。
const ART_X = 632;
const ART_W = 80;
const ART_H = 38;
const ART_GAP = 10;
const ART_TOP = 104;

// 四个产物的 y（单一行内常量：top + i*(h+gap)）。
const ART_YS = [
  ART_TOP,
  ART_TOP + (ART_H + ART_GAP),
  ART_TOP + 2 * (ART_H + ART_GAP),
  ART_TOP + 3 * (ART_H + ART_GAP),
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "project",
    caption:
      "① 工程进料：所有场景 + 资源（模型/贴图/音频）+ 脚本，攒成一个待打包的项目",
  },
  {
    label: "settings",
    caption:
      "② Build Settings：选目标平台（PC/手机/网页…），勾选 Scenes In Build——哪些场景进包、按什么顺序（索引 0 = 启动先加载）",
  },
  {
    label: "build",
    caption:
      "③ 点 Build：引擎把场景 + 资源 + 编译好的脚本一起压成该平台的成品包",
  },
  {
    label: "artifacts",
    caption:
      "④ 得到平台产物：Win 出 .exe、Mac 出 .app、Android 出 .apk、WebGL 出一个网页文件夹——同一工程，按平台各打一个",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const ARTIFACTS: readonly { name: string; sub: string }[] = [
  { name: "Windows", sub: ".exe" },
  { name: "macOS", sub: ".app" },
  { name: "Android", sub: ".apk" },
  { name: "WebGL", sub: "网页文件夹" },
];

export function BuildPipelineDiagram() {
  const projRef = useRef<SVGGElement | null>(null);
  const settingsRef = useRef<SVGGElement | null>(null);
  const buildRef = useRef<SVGGElement | null>(null);
  const artRefs = useRef<(SVGGElement | null)[]>([]);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：工程卡点亮（start = BEAT*0）。
      if (projRef.current) {
        tl.add(
          projRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * 0,
        );
      }
      tl.label("project", TEACHING_BEAT_MS * 1);

      // 步②：Build Settings 卡点亮（start = BEAT*1）。
      if (settingsRef.current) {
        tl.add(
          settingsRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * 1,
        );
      }
      tl.label("settings", TEACHING_BEAT_MS * 2);

      // 步③：构建卡点亮（start = BEAT*2）。
      if (buildRef.current) {
        tl.add(
          buildRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * 2,
        );
      }
      tl.label("build", TEACHING_BEAT_MS * 3);

      // 步④：四个平台产物 stagger 分叉入场（start = BEAT*3）。
      const arts = artRefs.current.filter(Boolean) as SVGGElement[];
      if (arts.length > 0) {
        tl.add(
          arts,
          {
            opacity: [0, 1],
            translateX: [16, 0],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
            delay: (_el: unknown, i: number) => i * 120,
          },
          TEACHING_BEAT_MS * 3,
        );
      }
      tl.label("artifacts", TEACHING_BEAT_MS * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 构建流水线动画，从左到右四个阶段。第一阶段：工程，里面是所有场景、资源（模型贴图音频）和脚本。箭头指向第二阶段：Build Settings，在这里选目标平台并勾选 Scenes In Build 列表，决定哪些场景进包、按什么顺序，索引 0 的场景启动时先加载。箭头指向第三阶段：点 Build 构建，引擎把场景、资源和编译好的脚本一起压成该平台的成品包。最后分叉出四个平台产物：Windows 的 .exe、macOS 的 .app、Android 的 .apk、WebGL 的网页文件夹。核心是同一个工程按不同目标平台各打一个包。动画分四步，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[736px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            构建流水线：从工程到平台产物
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            同一个工程，按目标平台各打一个成品包（影院版 / 流媒体版 /
            蓝光版的关系）
          </text>

          {/* ===== 连线（先画，卡盖线头） ===== */}
          <line
            x1={PROJ_X + PROJ_W}
            y1={STAGE_Y + STAGE_H / 2}
            x2={BS_X}
            y2={STAGE_Y + STAGE_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#bp-arrow)"
          />
          <line
            x1={BS_X + BS_W}
            y1={STAGE_Y + STAGE_H / 2}
            x2={BUILD_X}
            y2={STAGE_Y + STAGE_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#bp-arrow)"
          />
          {/* 构建 → 产物列（一条主线到分叉点，四条分支线） */}
          <line
            x1={BUILD_X + BUILD_W}
            y1={STAGE_Y + STAGE_H / 2}
            x2={ART_X - 16}
            y2={STAGE_Y + STAGE_H / 2}
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          {ART_YS.map((ay, i) => (
            <polyline
              key={`branch-${i}`}
              points={`${ART_X - 16},${STAGE_Y + STAGE_H / 2} ${ART_X - 16},${ay + ART_H / 2} ${ART_X},${ay + ART_H / 2}`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.6"
              markerEnd="url(#bp-arrow-accent)"
            />
          ))}

          {/* ===== 阶段① 工程 ===== */}
          <g ref={projRef} opacity="0.25">
            <rect
              x={PROJ_X}
              y={STAGE_Y}
              width={PROJ_W}
              height={STAGE_H}
              rx="10"
              fill="var(--text-secondary)"
              fillOpacity="0.06"
              stroke="var(--border)"
              strokeWidth="1.8"
            />
            <text
              x={PROJ_X + PROJ_W / 2}
              y={STAGE_Y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              工程
            </text>
            <text
              x={PROJ_X + PROJ_W / 2}
              y={STAGE_Y + 46}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              场景 + 资源
            </text>
            <text
              x={PROJ_X + PROJ_W / 2}
              y={STAGE_Y + 62}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              （模型 / 贴图 / 音频）
            </text>
            <text
              x={PROJ_X + PROJ_W / 2}
              y={STAGE_Y + 78}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              + 脚本
            </text>
          </g>

          {/* ===== 阶段② Build Settings ===== */}
          <g ref={settingsRef} opacity="0.25">
            <rect
              x={BS_X}
              y={STAGE_Y}
              width={BS_W}
              height={STAGE_H}
              rx="10"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x={BS_X + BS_W / 2}
              y={STAGE_Y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--accent)"
            >
              Build Settings
            </text>
            <text
              x={BS_X + BS_W / 2}
              y={STAGE_Y + 46}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              选目标平台
            </text>
            <text
              x={BS_X + BS_W / 2}
              y={STAGE_Y + 64}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              勾 Scenes In Build
            </text>
            <text
              x={BS_X + BS_W / 2}
              y={STAGE_Y + 80}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              哪些场景进包 + 顺序
            </text>
          </g>

          {/* ===== 阶段③ 构建 ===== */}
          <g ref={buildRef} opacity="0.25">
            <rect
              x={BUILD_X}
              y={STAGE_Y}
              width={BUILD_W}
              height={STAGE_H}
              rx="10"
              fill="var(--success)"
              fillOpacity="0.1"
              stroke="var(--success)"
              strokeWidth="2"
            />
            <text
              x={BUILD_X + BUILD_W / 2}
              y={STAGE_Y + 34}
              textAnchor="middle"
              fontSize="20"
              fill="var(--success)"
            >
              ⚙
            </text>
            <text
              x={BUILD_X + BUILD_W / 2}
              y={STAGE_Y + 60}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--success)"
            >
              Build
            </text>
            <text
              x={BUILD_X + BUILD_W / 2}
              y={STAGE_Y + 78}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              压成成品包
            </text>
          </g>

          {/* ===== 阶段④ 平台产物（步④ stagger 分叉） ===== */}
          <text
            x={ART_X + ART_W / 2}
            y={ART_TOP - 14}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            平台产物
          </text>
          {ARTIFACTS.map((art, i) => (
            <g
              key={art.name}
              ref={(el) => {
                artRefs.current[i] = el;
              }}
              opacity="0"
            >
              <rect
                x={ART_X}
                y={ART_YS[i]}
                width={ART_W}
                height={ART_H}
                rx="8"
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
              <text
                x={ART_X + ART_W / 2}
                y={ART_YS[i] + 16}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {art.name}
              </text>
              <text
                x={ART_X + ART_W / 2}
                y={ART_YS[i] + 30}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--accent)"
              >
                {art.sub}
              </text>
            </g>
          ))}

          <defs>
            <marker
              id="bp-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="bp-arrow-accent"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：如果在 Build Settings 里只勾了一个场景就构建，打出来的包还能进到游戏的第二关吗？单步走到第②步，想清楚「Scenes In Build 列表」管的是什么。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        构建 = 在 Build Settings 选目标平台、勾好 Scenes In
        Build（哪些场景进包、按什么顺序），点 Build
        把工程压成该平台的成品包（Win `.exe` / Mac `.app` / Android `.apk` /
        WebGL 文件夹）。
      </figcaption>
    </figure>
  );
}
