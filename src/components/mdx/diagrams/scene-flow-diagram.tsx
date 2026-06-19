"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <SceneFlowDiagram>：辅图（anime）——「多场景跳转 + Scenes In Build 列表约束」（HEL-290）。
 *
 * 上排三个场景卡横排：MainMenu（场景 0）→ Game（场景 1）→ GameOver（场景 2），
 * 卡间箭头标 SceneManager.LoadScene(...)。
 * 下方一个「Scenes In Build」列表框，列出这三个场景 + 索引，并醒目标注
 * 「场景必须在此列表里才能被 Load，否则运行时报 scene not in build settings」。
 *
 * 动画分 3 步（label 锚 lit = BEAT*(i+1)）：
 *  - 步①：MainMenu 卡点亮（启动加载场景 0）。
 *  - 步②：LoadScene("Game") 箭头 + Game 卡点亮（玩家点开始）。
 *  - 步③：LoadScene("GameOver") 箭头 + GameOver 卡 + 下方 Scenes In Build 列表框点亮
 *         （强调：能被 Load 的前提是它在列表里）。
 *
 * 全部坐标整数常量（无 Math 浮点）。视觉 DESIGN token；无裸 hex（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥20px（底部基线离底边 ≥20px）。
 */

const VIEW_W = 736;
// VIEW_H=336：最低内容是列表框底文字基线 312，下留 24px。纵向利用率 ~88%。
const VIEW_H = 336;

// 上排三个场景卡。
const SCENE_Y = 78;
const SCENE_W = 168;
const SCENE_H = 72;
const SCENE_GAP = 56; // 卡间隙，给箭头 + LoadScene 标
// 单一行内 x 公式：left + i*(w+gap)。
const SCENE_LEFT = 36;
const SCENE_XS = [
  SCENE_LEFT,
  SCENE_LEFT + (SCENE_W + SCENE_GAP),
  SCENE_LEFT + 2 * (SCENE_W + SCENE_GAP),
];

const SCENES: readonly { name: string; idx: number }[] = [
  { name: "MainMenu", idx: 0 },
  { name: "Game", idx: 1 },
  { name: "GameOver", idx: 2 },
];

// 下方 Scenes In Build 列表框。
const LIST_X = 36;
const LIST_Y = 196;
const LIST_W = 664;
const LIST_H = 112;

const STEPS: readonly TeachingStep[] = [
  {
    label: "menu",
    caption:
      "① 启动：引擎加载 Scenes In Build 里索引 0 的场景（MainMenu）——索引 0 就是「开机第一个加载」的那场戏",
  },
  {
    label: "game",
    caption:
      '② 玩家点「开始」：SceneManager.LoadScene("Game") 切到关卡场景（也可按索引 LoadScene(1)）',
  },
  {
    label: "over",
    caption:
      '③ 角色死亡：LoadScene("GameOver") 切到结算场景。前提：这三个场景都已加进 Scenes In Build 列表，否则运行时报「scene not in build settings」',
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function SceneFlowDiagram() {
  const menuRef = useRef<SVGGElement | null>(null);
  const gameRef = useRef<SVGGElement | null>(null);
  const overRef = useRef<SVGGElement | null>(null);
  const arrow1Ref = useRef<SVGGElement | null>(null);
  const arrow2Ref = useRef<SVGGElement | null>(null);
  const listRef = useRef<SVGGElement | null>(null);

  const sceneRefs = [menuRef, gameRef, overRef];

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：MainMenu 卡点亮（start = BEAT*0）。
      if (menuRef.current) {
        tl.add(
          menuRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * 0,
        );
      }
      tl.label("menu", TEACHING_BEAT_MS * 1);

      // 步②：LoadScene("Game") 箭头 + Game 卡（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (arrow1Ref.current) {
        tl.add(
          arrow1Ref.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      if (gameRef.current) {
        tl.add(
          gameRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("game", TEACHING_BEAT_MS * 2);

      // 步③：LoadScene("GameOver") 箭头 + GameOver 卡 + Scenes In Build 列表框（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (arrow2Ref.current) {
        tl.add(
          arrow2Ref.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      if (overRef.current) {
        tl.add(
          overRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      if (listRef.current) {
        tl.add(
          listRef.current,
          { opacity: [0.2, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("over", TEACHING_BEAT_MS * 3);
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
          aria-label="多场景跳转动画。上排三个场景卡横排：MainMenu 是场景索引 0，Game 是场景索引 1，GameOver 是场景索引 2。卡之间的箭头标着 SceneManager.LoadScene。第一步启动时引擎加载索引 0 的 MainMenu。第二步玩家点开始，调用 SceneManager.LoadScene 加 Game 切到关卡。第三步角色死亡，LoadScene 加 GameOver 切到结算场景。下方有一个 Scenes In Build 列表框，列出这三个场景和它们的索引，并醒目标注：场景必须在这个列表里才能被 Load，否则运行时会报 scene not in build settings 错误。动画分三步，可播放、暂停、单步、拖动进度。"
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
            多场景跳转：SceneManager.LoadScene
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            主菜单 → 关卡 → 结算，用代码切换；但要切的场景必须先进 Scenes In
            Build
          </text>

          {/* ===== 箭头① MainMenu → Game（步②点亮） ===== */}
          <g ref={arrow1Ref} opacity="0">
            <line
              x1={SCENE_XS[0] + SCENE_W}
              y1={SCENE_Y + SCENE_H / 2}
              x2={SCENE_XS[1]}
              y2={SCENE_Y + SCENE_H / 2}
              stroke="var(--accent)"
              strokeWidth="1.8"
              markerEnd="url(#sf-arrow)"
            />
            <text
              x={(SCENE_XS[0] + SCENE_W + SCENE_XS[1]) / 2}
              y={SCENE_Y + SCENE_H / 2 - 10}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              LoadScene
            </text>
            <text
              x={(SCENE_XS[0] + SCENE_W + SCENE_XS[1]) / 2}
              y={SCENE_Y + SCENE_H / 2 + 18}
              textAnchor="middle"
              fontSize="8.5"
              fill="var(--text-secondary)"
            >
              点「开始」
            </text>
          </g>

          {/* ===== 箭头② Game → GameOver（步③点亮） ===== */}
          <g ref={arrow2Ref} opacity="0">
            <line
              x1={SCENE_XS[1] + SCENE_W}
              y1={SCENE_Y + SCENE_H / 2}
              x2={SCENE_XS[2]}
              y2={SCENE_Y + SCENE_H / 2}
              stroke="var(--accent)"
              strokeWidth="1.8"
              markerEnd="url(#sf-arrow)"
            />
            <text
              x={(SCENE_XS[1] + SCENE_W + SCENE_XS[2]) / 2}
              y={SCENE_Y + SCENE_H / 2 - 10}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              LoadScene
            </text>
            <text
              x={(SCENE_XS[1] + SCENE_W + SCENE_XS[2]) / 2}
              y={SCENE_Y + SCENE_H / 2 + 18}
              textAnchor="middle"
              fontSize="8.5"
              fill="var(--text-secondary)"
            >
              角色死亡
            </text>
          </g>

          {/* ===== 三个场景卡 ===== */}
          {SCENES.map((sc, i) => (
            <g key={sc.name} ref={sceneRefs[i]} opacity="0.25">
              <rect
                x={SCENE_XS[i]}
                y={SCENE_Y}
                width={SCENE_W}
                height={SCENE_H}
                rx="10"
                fill="var(--accent)"
                fillOpacity={i === 0 ? "0.16" : "0.08"}
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <text
                x={SCENE_XS[i] + SCENE_W / 2}
                y={SCENE_Y + 30}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {sc.name}
              </text>
              <text
                x={SCENE_XS[i] + SCENE_W / 2}
                y={SCENE_Y + 52}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="var(--accent)"
              >
                场景索引 {sc.idx}
              </text>
            </g>
          ))}

          {/* ===== Scenes In Build 列表框（步③点亮） ===== */}
          <g ref={listRef} opacity="0.2">
            <rect
              x={LIST_X}
              y={LIST_Y}
              width={LIST_W}
              height={LIST_H}
              rx="10"
              fill="var(--bg)"
              stroke="var(--success)"
              strokeWidth="1.8"
            />
            <text
              x={LIST_X + 18}
              y={LIST_Y + 24}
              textAnchor="start"
              fontSize="12"
              fontWeight="700"
              fill="var(--success)"
            >
              Scenes In Build 列表（File → Build Settings）
            </text>
            <text
              x={LIST_X + 18}
              y={LIST_Y + 48}
              textAnchor="start"
              fontSize="10.5"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              [0] MainMenu　[1] Game　[2] GameOver
            </text>
            <text
              x={LIST_X + 18}
              y={LIST_Y + 70}
              textAnchor="start"
              fontSize="10"
              fontWeight="700"
              fill="var(--warning)"
            >
              ⚠ 场景必须在此列表里，才能被 LoadScene 加载
            </text>
            <text
              x={LIST_X + 18}
              y={LIST_Y + 90}
              textAnchor="start"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              不在列表里就 Load → 运行时报「scene not in build settings」；索引
              0 = 启动时第一个加载
            </text>
          </g>

          <defs>
            <marker
              id="sf-arrow"
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
          caption={
            '猜一猜：代码里写了 LoadScene("Game")，但你忘了把 Game 场景拖进下面那个 Scenes In Build 列表——运行时会顺利切过去，还是会报错？单步走到第③步看那条红色提示。'
          }
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏分多个场景（主菜单 / 关卡 / 结算），用 `SceneManager.LoadScene(名字
        或索引)` 切换；但要 Load 的场景**必须先加进 Build Settings 的 Scenes In
        Build 列表**，否则运行时报「scene not in build settings」。索引 0
        是启动时第一个加载的场景。
      </figcaption>
    </figure>
  );
}
