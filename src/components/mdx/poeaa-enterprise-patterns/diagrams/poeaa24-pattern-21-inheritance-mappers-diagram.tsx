/**
 * <Poeaa24Pattern21InheritanceMappers>：继承映射器结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern21InheritanceMappers() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="继承映射器结构图。父类 Mapper 负责公共字段和类型分发，子类 Mapper 继承父类并处理特有字段，形成与领域继承树平行的 Mapper 继承树。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Inheritance Mappers：Mapper 树镜像类树" />
          {/* 领域类树 */}
          <text x={130} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">领域类</text>
          <rect x={68} y={78} width={124} height={36} rx="6" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={130} y={100} textAnchor="middle" fontSize="11" fill="#3FB97F">Employee</text>
          <line x1={100} y1={114} x2={100} y2={130} stroke={T.secondary} strokeWidth="1" />
          <line x1={160} y1={114} x2={160} y2={130} stroke={T.secondary} strokeWidth="1" />
          <rect x={58} y={130} width={84} height={32} rx="6" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1" />
          <text x={100} y={150} textAnchor="middle" fontSize="11" fill="#E5B567">Engineer</text>
          <rect x={158} y={130} width={84} height={32} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
          <text x={200} y={150} textAnchor="middle" fontSize="11" fill={T.accent}>Manager</text>
          {/* 镜像箭头 */}
          <line x1={260} y1={110} x2={340} y2={110} stroke="#E5B567" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={300} y={102} textAnchor="middle" fontSize="11" fill="#E5B567">镜像</text>
          {/* Mapper 树 */}
          <text x={470} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>Mapper 树</text>
          <rect x={388} y={78} width={164} height={56} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1.5" />
          <text x={470} y={98} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>EmployeeMapper</text>
          <text x={400} y={118} fontSize="11" fontFamily="monospace" fill="#3FB97F">find(id) → 按 type 分发</text>
          <line x1={430} y1={134} x2={430} y2={150} stroke={T.secondary} strokeWidth="1" />
          <line x1={510} y1={134} x2={510} y2={150} stroke={T.secondary} strokeWidth="1" />
          <rect x={368} y={150} width={124} height={48} rx="6" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1" />
          <text x={430} y={170} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5B567">EngineerMapper</text>
          <text x={380} y={188} fontSize="11" fontFamily="monospace" fill={T.secondary}>loadSkill()</text>
          <rect x={508} y={150} width={124} height={48} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
          <text x={570} y={170} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.accent}>ManagerMapper</text>
          <text x={520} y={188} fontSize="11" fontFamily="monospace" fill={T.secondary}>loadBudget()</text>
          {/* 底部说明 */}
          <rect x={48} y={228} width={624} height={72} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={252} fontSize="11" fontWeight="600" fill={T.primary}>工作流程：</text>
          <text x={64} y={274} fontSize="11" fill={T.secondary}>1. 父 Mapper.find(id) 读取 type 列 → 2. 实例化正确子类对象</text>
          <text x={64} y={292} fontSize="11" fill={T.secondary}>3. 委托子 Mapper 加载特有字段 → 4. 返回完整多态对象</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="Mapper 继承树镜像领域类继承树，父 Mapper 负责分发，子 Mapper 负责特有字段" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Inheritance Mappers 建立与领域类平行的 Mapper 继承树。
        父 Mapper 读取鉴别器列并分发，子 Mapper 加载各自特有字段。
      </figcaption>
    </figure>
  );
}
