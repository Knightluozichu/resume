/** Tpp20Chapter02DecisionLoopDiagram：第2章在未知处学习并更新估算的回路。 */
import {
  T,
  DiagramCaption,
  DiagramTitle,
} from "@/components/mdx/poeaa-enterprise-patterns/poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Tpp20Chapter02DecisionLoopDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第2章 务实的方法决策回路：提示18：不设最终决定，先写未知与回滚；用提示20：使用曳光弹找到目标和提示21：用原型学习取得真实反馈；用提示22：靠近问题域编程核对规则；最后按提示23：通过估算来避免意外和提示24：根据代码不断迭代进度表更新范围，若失败则回到可逆决定。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="第2章：在未知处做可撤回实验"
          />

          <rect
            x={48}
            y={78}
            width={148}
            height={82}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={122}
            y={104}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            未知与边界
          </text>
          <text
            x={122}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            事实 / 假设 / 风险
          </text>
          <text
            x={122}
            y={150}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            可逆出口
          </text>

          <line
            x1={196}
            y1={119}
            x2={238}
            y2={119}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={238}
            y={78}
            width={148}
            height={82}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.08"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={312}
            y={104}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            最小实验
          </text>
          <text
            x={312}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            曳光 / 原型
          </text>
          <text
            x={312}
            y={150}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            时间盒 / 丢弃条件
          </text>

          <line
            x1={386}
            y1={119}
            x2={428}
            y2={119}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={428}
            y={78}
            width={148}
            height={82}
            rx="8"
            fill="#D77A61"
            fillOpacity="0.08"
            stroke="#D77A61"
            strokeWidth="1.2"
          />
          <text
            x={502}
            y={104}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#D77A61"
          >
            真实反馈
          </text>
          <text
            x={502}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            领域规则 / 用户结果
          </text>
          <text
            x={502}
            y={150}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            首个失配 / 新约束
          </text>

          <line
            x1={576}
            y1={119}
            x2={618}
            y2={119}
            stroke={T.accent}
            strokeWidth="1.4"
          />
          <rect
            x={618}
            y={78}
            width={58}
            height={82}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={647}
            y={104}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            重估
          </text>
          <text
            x={647}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            区间
          </text>
          <text
            x={647}
            y={150}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            偏差
          </text>

          <path
            d="M 647 160 C 647 214, 122 214, 122 160"
            fill="none"
            stroke={T.accent}
            strokeWidth="1.4"
            strokeDasharray="5 4"
          />
          <text
            x={360}
            y={207}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            失败或新信息：回到可逆决定，而不是掩盖偏差
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="实验产生反馈，反馈改变设计和估算"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        务实的方法把未知转成小实验，再把结果写回下一轮承诺。
      </figcaption>
    </figure>
  );
}
