const templateStages = [
  {
    stage: "Template definition",
    lookup: "parse syntax; bind non-dependent names",
    code: "no specialization body required yet",
    error: "definition-time errors reported now",
  },
  {
    stage: "Use requests specialization",
    lookup: "deduce/choose template arguments",
    code: "form point of instantiation",
    error: "substitution can reject candidates",
  },
  {
    stage: "Dependent name resolution",
    lookup: "resolve with instantiated types and associated scopes",
    code: "instantiate required member/function body",
    error: "context-rich but delayed diagnostics",
  },
  {
    stage: "Emission and linkage",
    lookup: "ODR-equivalent specialization identity",
    code: "COMDAT/weak merging or explicit instantiation",
    error: "visibility and duplicate-definition boundary",
  },
] as const;

export function IcoTemplateInstantiationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="模板从定义非依赖名称绑定到请求特化依赖名称解析和链接发射的实例化流程图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {templateStages.map((row, index) => (
            <section
              key={row.stage}
              className="min-h-72 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.lookup}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{row.code}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.error}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        template compilation 不是简单文本替换：non-dependent names
        早绑定，dependent names 在 point of instantiation 结合 actual types
        解析并形成 specialization。
      </figcaption>
    </figure>
  );
}

const exceptionStages = [
  {
    phase: "Throw expression",
    runtime: "create exception object from operand",
    tables: "record thrown type and cleanup state",
    outcome: "normal control flow stops",
  },
  {
    phase: "Handler search",
    runtime: "walk active frames / exception metadata",
    tables: "find enclosing try regions and catch types",
    outcome: "select first matching handler",
  },
  {
    phase: "Stack unwinding",
    runtime: "destroy completed automatic subobjects",
    tables: "execute registered cleanups per frame",
    outcome: "resources leave through RAII",
  },
  {
    phase: "Catch activation",
    runtime: "initialize catch parameter",
    tables: "preserve exception object until handler chain ends",
    outcome: "handle, rethrow, or translate",
  },
] as const;

export function IcoExceptionRuntimeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="异常从抛出对象处理器搜索栈展开到catch激活的运行时支持流程图"
          className="space-y-3"
        >
          {exceptionStages.map((row, index) => (
            <section
              key={row.phase}
              className="grid min-h-40 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1.3fr_1.2fr_1.1fr] md:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  phase 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.phase}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.runtime}
              </code>
              <span className="text-xs text-primary">{row.tables}</span>
              <span className="text-xs text-secondary">{row.outcome}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        exception runtime 要同时解决“throw 属于哪些 active try regions”“哪个
        catch type 匹配”与“到达 handler 前销毁哪些已构造对象”。
      </figcaption>
    </figure>
  );
}

const runtimeTypeRows = [
  {
    boundary: "dynamic_cast pointer",
    metadata: "polymorphic dynamic-type graph",
    success: "adjusted target pointer",
    failure: "nullptr",
  },
  {
    boundary: "dynamic_cast reference",
    metadata: "same checked relation and adjustment",
    success: "target reference",
    failure: "throw std::bad_cast",
  },
  {
    boundary: "typeid expression",
    metadata: "static or polymorphic dynamic type identity",
    success: "type_info reference",
    failure: "bad_typeid for null polymorphic dereference",
  },
  {
    boundary: "DSO / shared memory",
    metadata: "process-local ABI symbols, pointers, vtables",
    success: "versioned ABI or offset/ID representation",
    failure: "identity mismatch or invalid addresses",
  },
] as const;

export function IcoRttiBoundaryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="动态转换指针动态转换引用typeid及动态库共享内存边界下类型元数据成功失败路径图"
          className="space-y-3"
        >
          {runtimeTypeRows.map((row, index) => (
            <section
              key={row.boundary}
              className="grid min-h-40 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 lg:grid-cols-[0.9fr_1.35fr_1.1fr_1.1fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  case 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.boundary}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.metadata}
              </code>
              <span className="text-xs text-primary">{row.success}</span>
              <span className="text-xs text-secondary">{row.failure}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        RTTI 能在一个兼容 runtime/ABI 内恢复 dynamic relationship；它不会把 raw
        vptr、 type_info address 或 object pointer 自动变成跨
        DSO/进程的稳定协议。
      </figcaption>
    </figure>
  );
}
