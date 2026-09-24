"use client";

import { useReducer, type KeyboardEvent } from "react";

/*
 * 需求分析 / 知识点 → 专属视觉决策（pcc3-12，非共用文字卡片）：
 * 安装、窗口与程序绘制资源 → MDX 可组合运行代码；无需外部 ship.bmp。
 * 事件、持续移动、keyup → 方向矢量 + 事件到帧的因果轨迹；键盘/按钮输入。
 * float 与 Rect、屏幕边界 → 飞船轮廓、虚线旧位置、整数框及浮点位置线。
 * Sprite/Group → 真实弹道、三格发射槽、飞出移除；逐帧/20 帧有限推进。
 * 类组织/Clock.tick → MDX 职责与循环代码；教学模型没有定时器和无限动画。
 * 独立状态机可直接测试；故障注入只忽略方向松键，完整重置恢复全部状态。
 */
export const SHIP_WORLD = {
  width: 330,
  height: 360,
  shipWidth: 36,
  shipHeight: 28,
  shipTop: 314,
  shipSpeed: 2.5,
  bulletHeight: 10,
  bulletSpeed: 8,
  bulletLimit: 3,
} as const;

type Direction = "left" | "right";
type Bullet = { id: number; x: number; y: number };
export type ShipState = {
  frame: number;
  x: number;
  previousX: number;
  left: boolean;
  right: boolean;
  bullets: Bullet[];
  nextId: number;
  removed: number;
  blocked: number;
  atBoundary: boolean;
  ignoreKeyup: boolean;
  phase: "event" | "frame";
  event: string;
};
export type ShipAction =
  | { type: "direction"; direction: Direction; down: boolean }
  | { type: "release" }
  | { type: "fire" }
  | { type: "advance"; frames: 1 | 20 }
  | { type: "fault"; enabled: boolean }
  | { type: "reset" };

export function initialShipState(): ShipState {
  return {
    frame: 0,
    x: 147,
    previousX: 147,
    left: false,
    right: false,
    bullets: [],
    nextId: 1,
    removed: 0,
    blocked: 0,
    atBoundary: false,
    ignoreKeyup: false,
    phase: "event",
    event: "等待输入：按键只改变状态，推进才移动。",
  };
}

export function shipReducer(state: ShipState, action: ShipAction): ShipState {
  switch (action.type) {
    case "reset":
      return initialShipState();
    case "fault":
      return {
        ...state,
        ignoreKeyup: action.enabled,
        event: action.enabled
          ? "故障开启：松键不会清除方向标志。"
          : "故障关闭：请释放方向，或完整重置。",
      };
    case "direction":
      return {
        ...state,
        [action.direction]:
          !action.down && state.ignoreKeyup
            ? state[action.direction]
            : action.down,
        phase: "event",
        event: `${action.direction === "left" ? "左" : "右"}键${action.down ? "按下" : "松开"} → ${!action.down && state.ignoreKeyup ? "松键被故障忽略" : `标志设为 ${action.down ? "真" : "假"}`}；位置尚未更新。`,
      };
    case "release":
      // Focus loss is a safety stop, even while demonstrating the keyup fault.
      return {
        ...state,
        left: false,
        right: false,
        phase: "event",
        event: "安全释放两个方向；下一帧飞船停止。",
      };
    case "fire":
      if (state.bullets.length >= SHIP_WORLD.bulletLimit) {
        return {
          ...state,
          blocked: state.blocked + 1,
          phase: "event",
          event: "发射被拒绝：已有 3 颗活动子弹。先推进并清理。",
        };
      }
      return {
        ...state,
        nextId: state.nextId + 1,
        bullets: [
          ...state.bullets,
          {
            id: state.nextId,
            x: Math.trunc(state.x) + SHIP_WORLD.shipWidth / 2,
            y: SHIP_WORLD.shipTop - SHIP_WORLD.bulletHeight,
          },
        ],
        phase: "event",
        event: "发射 → 加入子弹组；下一帧沿弹道向上。",
      };
    case "advance": {
      let next = state;
      for (let frame = 0; frame < action.frames; frame += 1) {
        const requestedX =
          next.x +
          (Number(next.right) - Number(next.left)) * SHIP_WORLD.shipSpeed;
        const moved = next.bullets.map((bullet) => ({
          ...bullet,
          y: bullet.y - SHIP_WORLD.bulletSpeed,
        }));
        const alive = moved.filter(
          (bullet) => bullet.y + SHIP_WORLD.bulletHeight > 0,
        );
        next = {
          ...next,
          frame: next.frame + 1,
          previousX: next.x,
          x: Math.max(
            0,
            Math.min(SHIP_WORLD.width - SHIP_WORLD.shipWidth, requestedX),
          ),
          bullets: alive,
          removed: next.removed + moved.length - alive.length,
          atBoundary:
            requestedX < 0 ||
            requestedX > SHIP_WORLD.width - SHIP_WORLD.shipWidth,
          phase: "frame",
        };
      }
      return next;
    }
  }
}

const C = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  warning: "var(--warning)",
};
const control =
  "min-h-11 min-w-11 rounded-lg border border-border px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
const shipShape = "18,0 34,24 24,20 18,27 12,20 2,24";

export function PccShipBulletsLab() {
  const [state, dispatch] = useReducer(
    shipReducer,
    undefined,
    initialShipState,
  );
  const rectX = Math.trunc(state.x);
  const velocity =
    (Number(state.right) - Number(state.left)) * SHIP_WORLD.shipSpeed;
  const handleKey = (event: KeyboardEvent<HTMLDivElement>, down: boolean) => {
    // Native button Space/Enter must keep working. Arrow keys also work on controls.
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      if (down && event.repeat) return;
      dispatch({
        type: "direction",
        direction: event.key === "ArrowLeft" ? "left" : "right",
        down,
      });
    } else if (
      event.target === event.currentTarget &&
      (event.key === " " || event.key === "Enter")
    ) {
      event.preventDefault();
      if (down && !event.repeat) {
        dispatch(
          event.key === " " ? { type: "fire" } : { type: "advance", frames: 1 },
        );
      }
    }
  };

  return (
    <section
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 sm:p-4"
      aria-label="第12章飞船与子弹确定性实验"
    >
      <h3 className="text-lg font-semibold text-primary">
        输入不等于位移：逐帧飞船实验
      </h3>
      <p className="my-2 text-sm text-secondary">
        先选方向，再推进。方向按钮是锁定开关，第二次点击模拟松键。
        聚焦下方游戏区后，方向键按下/松开改变标志，空格发射，回车推进一帧。
        切出实验区会安全停止；没有自动播放。
      </p>
      <div
        tabIndex={0}
        role="group"
        aria-label="可键盘操作的飞船空间。左右键控制方向，空格发射，回车单步。"
        onKeyDown={(event) => handleKey(event, true)}
        onKeyUp={(event) => handleKey(event, false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            dispatch({ type: "release" });
        }}
        className="min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <svg
          viewBox="0 0 330 495"
          role="img"
          aria-label={`第${state.frame}帧。飞船浮点位置${state.x}，整数框位置${rectX}。左标志${state.left}，右标志${state.right}。活动子弹${state.bullets.length}，已清理${state.removed}。`}
          className="mx-auto block h-auto w-full max-w-[440px]"
          style={{ background: C.background }}
        >
          <text x="10" y="24" fill={C.text} fontSize={16}>
            子弹槽
          </text>
          {[0, 1, 2].map((slot) => (
            <rect
              key={slot}
              x={82 + slot * 24}
              y={8}
              width={14}
              height={20}
              rx={2}
              stroke={C.accent}
              fill={slot < state.bullets.length ? C.accent : "none"}
            />
          ))}
          <text x="10" y="50" fill={C.text} fontSize={16}>
            上边界：完全飞出才移除
          </text>
          <g transform="translate(0 60)">
            <path
              d="M1 360V1H329V360"
              stroke={state.atBoundary ? C.warning : C.border}
              fill="none"
              strokeWidth={2}
            />
            {[60, 120, 180, 240, 300].map((y) => (
              <path
                key={y}
                d={`M1 ${y}H329`}
                stroke={C.border}
                strokeDasharray="3 9"
              />
            ))}
            {state.bullets.map((bullet) => (
              <g key={bullet.id}>
                <path
                  d={`M${bullet.x} ${Math.max(0, bullet.y)}V${SHIP_WORLD.shipTop}`}
                  stroke={C.accent}
                  strokeDasharray="2 7"
                  opacity={0.3}
                />
                <rect
                  x={bullet.x - 2}
                  y={Math.max(0, bullet.y)}
                  width={4}
                  height={Math.min(
                    SHIP_WORLD.bulletHeight,
                    bullet.y + SHIP_WORLD.bulletHeight,
                  )}
                  fill={C.accent}
                />
              </g>
            ))}
            <g
              transform={`translate(${state.previousX} ${SHIP_WORLD.shipTop})`}
              opacity={0.4}
            >
              <polygon
                points={shipShape}
                fill="none"
                stroke={C.muted}
                strokeDasharray="2 2"
              />
            </g>
            <rect
              x={rectX}
              y={SHIP_WORLD.shipTop}
              width={36}
              height={28}
              fill="none"
              stroke={C.muted}
              strokeDasharray="4 3"
            />
            <g transform={`translate(${rectX} ${SHIP_WORLD.shipTop})`}>
              <polygon points={shipShape} fill={C.accent} />
              <circle cx={18} cy={13} r={4} fill={C.background} />
            </g>
            <path d={`M${state.x} 310V346`} stroke={C.text} strokeWidth={1} />
            <path
              d={`M${Math.max(29, rectX + 8)} 300h-28l8 -6m-8 6l8 6`}
              fill="none"
              stroke={state.left ? C.accent : C.border}
              strokeWidth={3}
            />
            <path
              d={`M${Math.min(301, rectX + 28)} 300h28l-8 -6m8 6l-8 6`}
              fill="none"
              stroke={state.right ? C.accent : C.border}
              strokeWidth={3}
            />
          </g>
          <text x="10" y="441" fill={C.muted} fontSize={16}>
            虚框：整数位置　细线：浮点位置
          </text>
          <path d="M32 460H296" fill="none" stroke={C.border} strokeWidth={2} />
          {["事件", "标志", "位移", "绘制"].map((label, index) => (
            <g key={label}>
              <circle
                cx={32 + index * 88}
                cy={460}
                r={5}
                fill={
                  (state.phase === "event" ? index < 2 : index >= 2)
                    ? C.accent
                    : C.border
                }
              />
              <text
                x={32 + index * 88}
                y={485}
                textAnchor="middle"
                fill={C.text}
                fontSize={16}
              >
                {label}
              </text>
            </g>
          ))}
        </svg>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <button
            type="button"
            className={control}
            aria-pressed={state.left}
            onClick={() =>
              dispatch({
                type: "direction",
                direction: "left",
                down: !state.left,
              })
            }
          >
            左键：{state.left ? "按住" : "松开"}
          </button>
          <button
            type="button"
            className={control}
            aria-pressed={state.right}
            onClick={() =>
              dispatch({
                type: "direction",
                direction: "right",
                down: !state.right,
              })
            }
          >
            右键：{state.right ? "按住" : "松开"}
          </button>
          <button
            type="button"
            className={control}
            onClick={() => dispatch({ type: "release" })}
          >
            释放方向
          </button>
          <button
            type="button"
            className={control}
            onClick={() => dispatch({ type: "fire" })}
          >
            发射一颗
          </button>
          <button
            type="button"
            className={control}
            onClick={() => dispatch({ type: "advance", frames: 1 })}
          >
            推进 1 帧
          </button>
          <button
            type="button"
            className={control}
            onClick={() => dispatch({ type: "advance", frames: 20 })}
          >
            推进 20 帧
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            className={control}
            aria-pressed={state.ignoreKeyup}
            onClick={() =>
              dispatch({ type: "fault", enabled: !state.ignoreKeyup })
            }
          >
            忽略松键：{state.ignoreKeyup ? "开" : "关"}
          </button>
          <button
            type="button"
            className={control}
            onClick={() => dispatch({ type: "reset" })}
          >
            完整重置
          </button>
        </div>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="mt-3 space-y-1 break-words text-sm text-secondary"
      >
        <p>
          第 {state.frame} 帧 · 位置 {state.x.toFixed(1)} → 整数框 {rectX} ·
          每帧位移 {velocity.toFixed(1)}
        </p>
        <p>最近输入：{state.event}</p>
        <p>
          本帧结果：
          {state.atBoundary
            ? "已钳制在边界；浮点位置也一起钳制。"
            : "先读方向标志，再更新坐标并绘制。"}{" "}
          活动 {state.bullets.length}/3，累计清理 {state.removed}，拒绝发射{" "}
          {state.blocked} 次。
        </p>
      </div>
      <p className="mt-2 text-sm text-secondary">
        图中旧飞船虚线表示上一帧；左右同时按住时相互抵消。重置后发射，再推进两次
        20 帧，观察弹道和子弹槽一同清空。
      </p>
    </section>
  );
}
