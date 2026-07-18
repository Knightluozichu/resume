type FunctionCell = readonly [
  role: string,
  access: string,
  consequence: string,
];

function FunctionGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly FunctionCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([role, access, consequence], index) => (
            <section
              key={role}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {role}
              </strong>
              <code className="mt-3 block text-xs text-accent">{access}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {consequence}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const privilegeCells = [
  [
    "Core member",
    "private + invariant",
    "实现原子状态操作，确实需要对象内部权限。",
  ],
  [
    "Extra member",
    "all private data",
    "便利组合也能访问全部表示，扩大变化影响范围。",
  ],
  [
    "Friend helper",
    "all private data",
    "不是 member 但权限相同，封装没有改善。",
  ],
  ["Free helper", "public API only", "只能依赖稳定契约，表示变化不会穿透。"],
  [
    "Representation change",
    "private fields change",
    "只需审查 core privileged set。",
  ],
  [
    "Extension",
    "new free function",
    "无需修改 class definition 即可增加组合能力。",
  ],
] as const;

const namespaceCells = [
  ["Core header", "web_browser.hpp", "只声明 class 与最小核心操作。"],
  [
    "Privacy header",
    "web_browser/privacy.hpp",
    "组合 history/cookies 清理便利函数。",
  ],
  ["Bookmarks header", "web_browser/bookmarks.hpp", "书签导入导出按需包含。"],
  [
    "Diagnostics header",
    "web_browser/diagnostics.hpp",
    "诊断功能不污染核心依赖。",
  ],
  ["Same namespace", "namespace browser", "保持逻辑关联并支持普通查找/ADL。"],
  ["Client choice", "include needed feature", "用户只承担使用功能的编译依赖。"],
] as const;

const decisionCells = [
  ["Needs private invariant?", "member", "必须在一个受权边界内原子维护表示。"],
  ["Must be virtual?", "member", "运行期 dispatch 依赖对象 virtual table。"],
  [
    "Language requires member?",
    "operator=",
    "遵循语言对特定操作符的成员要求。",
  ],
  [
    "Composes public calls?",
    "non-member non-friend",
    "便利逻辑不需要额外权限。",
  ],
  ["Symmetric operands?", "non-member", "两侧参数地位相同，转换规则更自然。"],
  [
    "Domain extension?",
    "namespace function",
    "保持关联同时允许独立演进与分包。",
  ],
] as const;

export function EcppPrivilegeSurfaceMap() {
  return (
    <FunctionGrid
      ariaLabel="核心成员额外成员友元自由函数表示变化扩展六类权限面封装图"
      caption="封装强度取决于能直接访问 private 表示的代码数量；friend 与多余 member 都会扩大权限面。"
      cells={privilegeCells}
    />
  );
}

export function EcppConvenienceNamespaceMap() {
  return (
    <FunctionGrid
      ariaLabel="核心隐私书签诊断同命名空间客户选择六层便利函数组织图"
      caption="便利函数与 class 放在同一 namespace、按主题拆分 header，既保持关联又降低编译依赖。"
      cells={namespaceCells}
    />
  );
}

export function EcppMemberDecisionMap() {
  return (
    <FunctionGrid
      ariaLabel="私有不变量虚函数语言要求公开组合对称参数领域扩展六项成员决策图"
      caption="先问功能需要什么权限和分派语义，再决定 member、friend 或 non-member；调用风格不是首要标准。"
      cells={decisionCells}
    />
  );
}
