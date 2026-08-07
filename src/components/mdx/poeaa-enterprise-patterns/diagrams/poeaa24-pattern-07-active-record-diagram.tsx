/**
 * <Poeaa24Pattern07ActiveRecord.Diagram>：活动记录生命周期图。
 *
 * The registry intentionally keeps the historical object name
 * `Poeaa24Pattern07ActiveRecord`; the `.Diagram` member lets MDX and the
 * chapter audit identify this as the chapter's dedicated visual component
 * without requiring a shared registry edit during an isolated chapter fix.
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 390;

type ActiveRecordStage = "overview" | "load" | "dirty" | "conflict";

const STAGE_COPY: Record<
  ActiveRecordStage,
  { label: string; detail: string; color: string }
> = {
  overview: {
    label: "对象边界",
    detail: "字段 + 局部行为 + 明确写回",
    color: T.accent,
  },
  load: {
    label: "1 · 加载身份",
    detail: "数据库行 → 一个 Order 实例",
    color: T.accent,
  },
  dirty: {
    label: "2 · 保留脏状态",
    detail: "修改先留在内存，save() 才写回",
    color: T.warning,
  },
  conflict: {
    label: "3 · 暴露冲突",
    detail: "version 7 已过期 → 返回 conflict",
    color: T.danger,
  },
};

function Poeaa24Pattern07ActiveRecordDiagram({
  stage = "overview",
}: {
  stage?: ActiveRecordStage;
}) {
  const copy = STAGE_COPY[stage];
  const isLoad = stage === "load";
  const isDirty = stage === "dirty";
  const isConflict = stage === "conflict";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`活动记录生命周期图：${copy.label}。${copy.detail}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={36}
            text="Active Record：对象 = 行 + 业务逻辑"
          />
          <rect
            x="34"
            y="76"
            width="148"
            height="92"
            rx="10"
            fill={T.primary}
            fillOpacity="0.04"
            stroke={T.secondary}
            strokeWidth="1.2"
            strokeDasharray={isLoad ? undefined : "5 4"}
          />
          <text
            x="108"
            y="101"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            数据行
          </text>
          <text
            x="108"
            y="124"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill={T.secondary}
          >
            id=42 · version=7
          </text>
          <text
            x="108"
            y="146"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            amount=100
          </text>
          <line
            x1="182"
            y1="122"
            x2="218"
            y2="122"
            stroke={copy.color}
            strokeWidth="2"
          />
          <polygon points="218,122 208,116 208,128" fill={copy.color} />
          <text
            x="200"
            y="106"
            textAnchor="middle"
            fontSize="11"
            fill={copy.color}
          >
            {isConflict ? "条件更新" : "映射"}
          </text>

          <rect
            x="218"
            y="60"
            width="284"
            height="244"
            rx="10"
            fill={copy.color}
            fillOpacity="0.06"
            stroke={copy.color}
            strokeWidth="1.5"
          />
          <rect
            x="218"
            y="60"
            width="284"
            height="30"
            rx="10"
            fill={copy.color}
            fillOpacity="0.14"
          />
          <rect
            x="218"
            y="82"
            width="284"
            height="8"
            fill={copy.color}
            fillOpacity="0.14"
          />
          <text
            x="360"
            y="80"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={copy.color}
          >
            Order · {copy.label}
          </text>
          <text
            x="236"
            y="116"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id: 42 · version: {isConflict ? "7 (过期)" : "7"}
          </text>
          <text
            x="236"
            y="136"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            amount: {isDirty ? "80" : "100"}
          </text>
          <line
            x1="218"
            y1="148"
            x2="502"
            y2="148"
            stroke={copy.color}
            strokeWidth="0.6"
            strokeOpacity="0.5"
          />
          <text
            x="236"
            y="170"
            fontSize="11"
            fontFamily="monospace"
            fill="#3FB97F"
          >
            + save(expectedVersion)
          </text>
          <text
            x="236"
            y="190"
            fontSize="11"
            fontFamily="monospace"
            fill="#3FB97F"
          >
            + delete()
          </text>
          <text
            x="236"
            y="216"
            fontSize="11"
            fontFamily="monospace"
            fill="#E5B567"
          >
            + applyCoupon(code)
          </text>
          <text
            x="236"
            y="236"
            fontSize="11"
            fontFamily="monospace"
            fill="#E5B567"
          >
            + cancel()
          </text>
          <text
            x="236"
            y="273"
            fontSize="11"
            fontWeight="700"
            fill={copy.color}
          >
            {copy.detail}
          </text>

          <line
            x1="502"
            y1="122"
            x2="538"
            y2="122"
            stroke={isConflict ? T.danger : T.accent}
            strokeWidth="2"
          />
          <polygon
            points="538,122 528,116 528,128"
            fill={isConflict ? T.danger : T.accent}
          />
          <rect
            x="538"
            y="76"
            width="148"
            height="92"
            rx="10"
            fill={isConflict ? T.danger : T.accent}
            fillOpacity="0.08"
            stroke={isConflict ? T.danger : T.accent}
            strokeWidth="1.2"
          />
          <text
            x="612"
            y="101"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={isConflict ? T.danger : T.accent}
          >
            {isConflict ? "冲突出口" : "写回结果"}
          </text>
          <text
            x="612"
            y="124"
            textAnchor="middle"
            fontSize="11"
            fill={isConflict ? T.danger : T.secondary}
          >
            {isConflict
              ? "conflict"
              : isDirty
                ? "save() 后 version=8"
                : "success / error"}
          </text>
          <text
            x="612"
            y="146"
            textAnchor="middle"
            fontSize="11"
            fill={isConflict ? T.danger : T.secondary}
          >
            {isConflict ? "不覆盖 version=8" : "由调用者处理"}
          </text>

          <rect
            x="34"
            y="326"
            width="652"
            height="28"
            rx="8"
            fill={copy.color}
            fillOpacity="0.08"
            stroke={copy.color}
            strokeOpacity="0.35"
          />
          <text
            x={VIEW_W / 2}
            y="345"
            textAnchor="middle"
            fontSize="11"
            fill={copy.color}
          >
            {isLoad
              ? "加载阶段：身份先绑定，读取不产生写回"
              : isDirty
                ? "修改阶段：脏状态停留在内存，写回时机明确"
                : isConflict
                  ? "并发阶段：版本条件失败必须成为可见结果"
                  : "活动记录 = 行数据入口 + 与该行紧密相关的领域行为"}
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="专属观察轴：身份 → 脏状态 → 版本条件 → 写回结果"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {copy.detail}；对象既是数据容器又是行为载体，适合边界清楚的简单领域。
      </figcaption>
    </figure>
  );
}

export const Poeaa24Pattern07ActiveRecord = Object.assign(
  Poeaa24Pattern07ActiveRecordDiagram,
  { Diagram: Poeaa24Pattern07ActiveRecordDiagram },
);
