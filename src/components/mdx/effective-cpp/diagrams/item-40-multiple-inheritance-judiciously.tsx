type MultipleInheritanceCell = readonly [
  stage: string,
  code: string,
  result: string,
];

function MultipleInheritanceGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly MultipleInheritanceCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, code, result], index) => (
            <section
              key={stage}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {result}
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

const ambiguityCells = [
  ["Two bases", "Borrowable + Gadget", "两个 base 都声明 checkOut。"],
  [
    "Unqualified call",
    "player.checkOut()",
    "lookup 找到两条候选路径，调用歧义。",
  ],
  ["Access later", "public / private", "可访问性不会先替程序选择候选。"],
  ["Qualify", "Borrowable::checkOut", "调用点显式选择目标 base。"],
  ["Wrap", "player.borrow()", "derived 用意图 API 固定选择并隐藏冲突。"],
  ["Audit", "using / override", "检查未来 base 演进是否再次引入同名。"],
] as const;

const diamondCells = [
  ["Root", "File", "共同 base 保存路径和 metadata。"],
  ["Left path", "InputFile : File", "输入角色继承一条 File path。"],
  ["Right path", "OutputFile : File", "输出角色继承另一条 File path。"],
  ["Nonvirtual join", "IOFile", "普通菱形包含两个 File subobjects。"],
  ["Virtual join", "virtual File", "两条路径共享一个 virtual base。"],
  ["Tradeoff", "size / init / access", "共享身份换来布局、初始化和访问成本。"],
] as const;

const roleCells = [
  ["Public contract", "IPerson", "纯接口定义客户可依赖的身份。"],
  ["Private mechanism", "PersonInfo", "复用姓名格式化和数据库实现。"],
  ["Join", "CPerson", "public 接口继承加 private 实现继承。"],
  [
    "Override hook",
    "nameDelimOpen",
    "CPerson 定制 PersonInfo virtual 扩展点。",
  ],
  ["Forward", "name() -> theName()", "公开调用转给私有实现并保持窄 API。"],
  ["Verify", "two contracts", "分别测试 IPerson 替换性和实现协议。"],
] as const;

export function EcppMultipleInheritanceAmbiguityMap() {
  return (
    <MultipleInheritanceGrid
      ariaLabel="两个基类无限定调用访问检查显式限定意图包装演进审计六阶段多继承歧义图"
      caption="多继承名字查找先发现候选冲突，再做访问检查；显式限定或 derived wrapper 才能确定意图。"
      cells={ambiguityCells}
    />
  );
}

export function EcppVirtualDiamondLayoutMap() {
  return (
    <MultipleInheritanceGrid
      ariaLabel="文件根输入路径输出路径普通菱形虚基共享布局代价六阶段虚继承对象图"
      caption="virtual inheritance 把菱形中的共同 base 合并为一个 subobject，但引入额外布局、访问和 most-derived 初始化责任。"
      cells={diamondCells}
    />
  );
}

export function EcppInterfaceImplementationRolesMap() {
  return (
    <MultipleInheritanceGrid
      ariaLabel="公开接口私有机制角色汇合虚钩子覆盖调用转发双契约验证六阶段多继承角色图"
      caption="一个 public interface base 加一个 private implementation base 能分离公开身份与实现协议，是可辩护的多继承形态。"
      cells={roleCells}
    />
  );
}
