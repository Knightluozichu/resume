/**
 * <UmsTeamCollaborationDiagram>：团队协作版本控制四层分层图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsTeamCollaborationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="团队协作版本控制四层分层图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 项目版本控制四层分层</text>

          {/* 代码层 */}
          <rect x="40" y="60" width="640" height="44" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="80" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">代码 (.cs)</text>
          <text x="320" y="80" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Git 文本合并</text>
          <text x="560" y="80" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Code Review + .editorconfig + Roslyn Analyzer</text>
          <text x="560" y="96" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">PR 流程：feature 分支 &rarr; Review &rarr; merge</text>

          {/* 场景层 */}
          <rect x="40" y="120" width="640" height="44" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="80" y="140" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">场景 (.unity/.prefab)</text>
          <text x="320" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">UnityYAMLMerge 语义合并</text>
          <text x="560" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">按 GUID/fileID 合并，非按文本行</text>
          <text x="560" y="156" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">大场景拆 Additive 多场景减少冲突</text>

          {/* 美术资源层 */}
          <rect x="40" y="180" width="640" height="44" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="80" y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">美术 (.png/.fbx/.wav)</text>
          <text x="320" y="200" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Git LFS 大文件存储</text>
          <text x="560" y="200" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">仓库存指针，LFS 存实体</text>
          <text x="560" y="216" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">冲突时选一方，避免仓库膨胀</text>

          {/* 配置层 */}
          <rect x="40" y="240" width="640" height="44" rx="8" fill="var(--info)" fillOpacity="0.10" stroke="var(--info)" strokeWidth="1.4" />
          <text x="80" y="260" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--info)">配置 (.asmdef/.asset)</text>
          <text x="320" y="260" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Git 文本合并</text>
          <text x="560" y="260" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">.meta 必须提交（GUID 是引用基础）</text>
          <text x="560" y="276" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Library/Temp/Build 排除，*.meta 绝不排除</text>

          {/* 核心规则 */}
          <rect x="40" y="310" width="640" height="70" rx="8" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="332" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">核心规则</text>
          <text x="360" y="350" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">.gitignore 排除 Library/Temp/Build/Obj，保留 *.meta | Git LFS track *.png *.fbx *.wav</text>
          <text x="360" y="368" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">.gitattributes: *.unity/*.prefab merge=unityyamlmerge eol=lf | .editorconfig 强制命名/格式</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        团队协作——版本控制四层分层 + .gitignore + Git LFS + UnityYAMLMerge
      </figcaption>
    </figure>
  );
}
