/**
 * <Poeaa24Ch04ControllerDecisionDiagram>：控制器策略决策图。Server Component。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 250;

export function Poeaa24Ch04ControllerDecisionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="控制器策略决策图。覆盖第4章 Web表示层、4.1 视图模式、4.2 输入控制器模式、4.3 进一步阅读。页面少且输入局部时使用 Page Controller；认证、路由和错误处理共享时使用 Front Controller；输出变体通过 View Model 与转换视图隔离。模板直接访问数据库或复制业务规则时应拒绝。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="控制器策略：局部页面还是共享入口"
          />

          <rect
            x={34}
            y={60}
            width={198}
            height={112}
            rx="8"
            fill="#3FB97F"
            fillOpacity="0.07"
            stroke="#3FB97F"
            strokeWidth="1.2"
          />
          <text
            x={133}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3FB97F"
          >
            页面少、输入局部
          </text>
          <text
            x={133}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Page Controller
          </text>
          <text
            x={133}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            每页独立处理输入
          </text>
          <text
            x={133}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            失败路径局部可测
          </text>

          <line
            x1={232}
            y1={116}
            x2={260}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={260}
            y={60}
            width={198}
            height={112}
            rx="8"
            fill="#E5B567"
            fillOpacity="0.07"
            stroke="#E5B567"
            strokeWidth="1.2"
          />
          <text
            x={359}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#E5B567"
          >
            共享入口证据
          </text>
          <text
            x={359}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Front Controller
          </text>
          <text
            x={359}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            认证 + 路由 + 错误
          </text>
          <text
            x={359}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            共享上下文可观测
          </text>

          <line
            x1={458}
            y1={116}
            x2={486}
            y2={116}
            stroke={T.accent}
            strokeWidth="1.4"
          />

          <rect
            x={486}
            y={60}
            width={200}
            height={112}
            rx="8"
            fill={T.accent}
            fillOpacity="0.07"
            stroke={T.accent}
            strokeWidth="1.2"
          />
          <text
            x={586}
            y={84}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            输出变体
          </text>
          <text
            x={586}
            y={108}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            View Model
          </text>
          <text
            x={586}
            y={130}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            模板 / CSV 转换
          </text>
          <text
            x={586}
            y={152}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            不复制业务规则
          </text>

          <rect
            x={96}
            y={190}
            width={528}
            height={30}
            rx="8"
            fill={T.danger}
            fillOpacity="0.06"
            stroke={T.danger}
            strokeWidth="1"
          />
          <text
            x={360}
            y={210}
            textAnchor="middle"
            fontSize="11"
            fill={T.danger}
          >
            拒绝条件：模板查库、控制器持有全部业务规则
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="控制器共享基础设施，模型拥有规则，视图消费稳定输入"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        控制器策略由共享范围和输出变化推动；统一入口不等于把所有页面逻辑集中到一个类。
      </figcaption>
    </figure>
  );
}
