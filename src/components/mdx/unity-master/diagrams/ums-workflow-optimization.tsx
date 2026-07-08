/**
 * <UmsWorkflowOptimizationDiagram>：工作流优化三条路径图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsWorkflowOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="工作流优化三条路径图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">工作流优化三条路径</text>

          {/* 快捷键定制 */}
          <rect x="40" y="65" width="200" height="130" rx="10" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="140" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">快捷键定制</text>
          <text x="140" y="112" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少点击次数</text>
          <text x="140" y="134" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">[MenuItem("Tools/xx %g")]</text>
          <text x="140" y="150" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">% = Ctrl  # = Shift</text>
          <text x="140" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&amp; = Alt</text>
          <text x="140" y="185" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Edit &gt; Shortcuts 可视化绑定</text>

          {/* 项目模板 */}
          <rect x="260" y="65" width="200" height="130" rx="10" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="360" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">项目模板</text>
          <text x="360" y="112" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">统一团队起点</text>
          <text x="360" y="134" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">标准目录结构</text>
          <text x="360" y="150" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">预设 Prefab</text>
          <text x="360" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">基础脚本 / 配置</text>
          <text x="360" y="185" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Template Package</text>

          {/* 导入自动化 */}
          <rect x="480" y="65" width="200" height="130" rx="10" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="580" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">导入自动化</text>
          <text x="580" y="112" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">消除手动配置</text>
          <text x="580" y="134" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">AssetPostprocessor</text>
          <text x="580" y="150" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">OnPreprocessTexture</text>
          <text x="580" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">按文件名自动设参数</text>
          <text x="580" y="185" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">_ui / _nml / _char</text>

          {/* 投入产出判断 */}
          <rect x="40" y="230" width="640" height="70" rx="8" fill="var(--info)" fillOpacity="0.06" stroke="var(--info)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--info)">自动化判断标准：频率 x 耗时</text>
          <text x="360" y="272" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">高频（每天多次）&rarr; 必须自动化 | 中频（每周）&rarr; 值得自动化 | 低频（偶尔）&rarr; 写文档</text>
          <text x="360" y="290" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">阈值：一周内重复 3 次以上且每次超过 30 秒 &rarr; 写脚本</text>

          {/* 底部 */}
          <text x="360" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">核心原则：凡重复三次以上的操作，就值得自动化</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">自动化脚本必须挂 [MenuItem]，入口放 Tools/ 下，团队培训演示</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        工作流优化三条路径——快捷键 / 模板 / 自动化
      </figcaption>
    </figure>
  );
}
