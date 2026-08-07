/**
 * <Poeaa24Pattern09UnitOfWorkDiagram>：工作单元三阶段状态图。Server Component。
 *
 * stage 让同一张专属图在 Stepper 的每一步显示不同的教学焦点：
 * 1. 登记新增对象；2. 收集修改与删除；3. 按依赖顺序原子提交。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 440;

type Stage = 1 | 2 | 3;

const STAGE_LABELS: Record<Stage, string> = {
  1: "阶段一：登记新增对象，暂不写库",
  2: "阶段二：收集修改与删除，形成变更集合",
  3: "阶段三：按依赖顺序提交，失败则整体回滚",
};

function phaseTone(phase: Stage, activeStage: Stage): string {
  return phase === activeStage ? T.accent : T.secondary;
}

function phaseOpacity(phase: Stage, activeStage: Stage): number {
  return phase === activeStage ? 1 : 0.42;
}

export function Poeaa24Pattern09UnitOfWorkDiagram({
  stage = 3,
}: {
  stage?: Stage;
}) {
  const activeStage = stage;
  const activeTone = phaseTone(activeStage, activeStage);
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`工作单元第${activeStage}阶段：${STAGE_LABELS[activeStage]}。三条泳道分别表示业务代码、工作单元和数据库。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="uow-diagram-arrow"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L9 4 L0 8 Z" fill={T.primary} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Unit of Work：登记变化 → 原子提交"
          />
          <text
            x={VIEW_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {STAGE_LABELS[activeStage]}
          </text>

          {/* 当前步骤条：让每个 Step 的图示状态一眼可辨。 */}
          {[1, 2, 3].map((phase) => {
            const current = phase as Stage;
            const x = 40 + (current - 1) * 214;
            const tone = phaseTone(current, activeStage);
            return (
              <g
                key={`phase-${current}`}
                opacity={phaseOpacity(current, activeStage)}
              >
                <rect
                  x={x}
                  y={68}
                  width={190}
                  height={28}
                  rx="7"
                  fill={tone}
                  fillOpacity="0.08"
                  stroke={tone}
                  strokeWidth="1.2"
                />
                <text
                  x={x + 95}
                  y={87}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={tone}
                >
                  {current}.{" "}
                  {current === 1 ? "登记" : current === 2 ? "收集" : "提交"}
                </text>
              </g>
            );
          })}

          {/* 泳道标题与生命线。 */}
          <text
            x={120}
            y={120}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.success}
          >
            业务代码
          </text>
          <text
            x={360}
            y={120}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            工作单元
          </text>
          <text
            x={600}
            y={120}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.warning}
          >
            数据库
          </text>
          <line
            x1={120}
            y1={130}
            x2={120}
            y2={374}
            stroke={T.success}
            strokeWidth="1"
            strokeDasharray="5 4"
            strokeOpacity="0.5"
          />
          <line
            x1={360}
            y1={130}
            x2={360}
            y2={374}
            stroke={T.accent}
            strokeWidth="1"
            strokeDasharray="5 4"
            strokeOpacity="0.5"
          />
          <line
            x1={600}
            y1={130}
            x2={600}
            y2={374}
            stroke={T.warning}
            strokeWidth="1"
            strokeDasharray="5 4"
            strokeOpacity="0.5"
          />

          {/* 阶段一：新增对象只进入 new[]。 */}
          <g opacity={phaseOpacity(1, activeStage)}>
            <line
              x1={120}
              y1={154}
              x2={350}
              y2={154}
              stroke={T.success}
              strokeWidth="1.5"
              markerEnd="url(#uow-diagram-arrow)"
            />
            <text
              x={235}
              y={148}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.success}
            >
              registerNew(order)
            </text>
            <rect
              x={326}
              y={164}
              width={68}
              height={24}
              rx="4"
              fill={T.accent}
              fillOpacity="0.12"
              stroke={T.accent}
              strokeWidth="1.2"
            />
            <text
              x={360}
              y={180}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={activeStage === 1 ? activeTone : T.accent}
            >
              new[]
            </text>
          </g>

          {/* 阶段二：修改与删除分别登记，避免把意图压扁成一个列表。 */}
          <g opacity={phaseOpacity(2, activeStage)}>
            <line
              x1={120}
              y1={216}
              x2={350}
              y2={216}
              stroke={T.success}
              strokeWidth="1.5"
              markerEnd="url(#uow-diagram-arrow)"
            />
            <text
              x={235}
              y={210}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.success}
            >
              registerDirty(customer)
            </text>
            <rect
              x={326}
              y={226}
              width={68}
              height={24}
              rx="4"
              fill={T.warning}
              fillOpacity="0.12"
              stroke={T.warning}
              strokeWidth="1.2"
            />
            <text
              x={360}
              y={242}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.warning}
            >
              dirty[]
            </text>

            <line
              x1={120}
              y1={270}
              x2={350}
              y2={270}
              stroke={T.success}
              strokeWidth="1.5"
              markerEnd="url(#uow-diagram-arrow)"
            />
            <text
              x={235}
              y={264}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.success}
            >
              registerRemoved(old)
            </text>
            <rect
              x={326}
              y={280}
              width={68}
              height={24}
              rx="4"
              fill={T.danger}
              fillOpacity="0.12"
              stroke={T.danger}
              strokeWidth="1.2"
            />
            <text
              x={360}
              y={296}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.danger}
            >
              del[]
            </text>
          </g>

          {/* 阶段三：一次封口，把已登记的集合按依赖关系交给数据库。 */}
          <g opacity={phaseOpacity(3, activeStage)}>
            <line
              x1={120}
              y1={330}
              x2={350}
              y2={330}
              stroke={T.accent}
              strokeWidth="1.8"
              markerEnd="url(#uow-diagram-arrow)"
            />
            <text
              x={235}
              y={324}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="monospace"
              fill={T.accent}
            >
              commit()
            </text>
            <line
              x1={370}
              y1={344}
              x2={590}
              y2={344}
              stroke={T.warning}
              strokeWidth="1.5"
              markerEnd="url(#uow-diagram-arrow)"
            />
            <text
              x={480}
              y={338}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.warning}
            >
              INSERT → UPDATE → DELETE
            </text>
            <line
              x1={590}
              y1={362}
              x2={370}
              y2={362}
              stroke={T.success}
              strokeWidth="1.2"
              strokeDasharray="5 3"
              markerEnd="url(#uow-diagram-arrow)"
            />
            <text
              x={480}
              y={378}
              textAnchor="middle"
              fontSize="11"
              fill={T.success}
            >
              全部成功；失败则全部回滚
            </text>
          </g>

          <text
            x={VIEW_W / 2}
            y={410}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            当前焦点：
            {activeStage === 1
              ? "new[] 暂存订单"
              : activeStage === 2
                ? "new[] / dirty[] / del[] 三类意图"
                : "一次 commit 封口"}
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 8}
            text="工作单元把变化收集起来，再以可检查的顺序统一写出"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第 {activeStage} 步：{STAGE_LABELS[activeStage]}
        。同一张专属图在分步实验中逐步突出登记、收集和提交状态。
      </figcaption>
    </figure>
  );
}

// 兼容总监稍后重新生成共享 chapter-component-registry 前的旧导出名。
export const Poeaa24Pattern09UnitOfWork = Poeaa24Pattern09UnitOfWorkDiagram;
