/**
 * <Poeaa24Ch13MetadataCompare>：元数据驱动 vs 代码驱动对比图（POEAA 第13章概览）。
 *
 * 展示 Metadata Mapping / Query Object / Repository 三个模式，
 * 以及元数据驱动 vs 代码驱动的对比。
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 420;

export function Poeaa24Ch13MetadataCompare() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="元数据映射模式对比图。左侧是代码驱动：每个类手写 Mapper，映射逻辑硬编码在 Java/TS 中，改表结构要改代码。右侧是元数据驱动：映射规则存在 XML/注解/配置中，通用引擎读取元数据自动生成 SQL，改表结构只改配置。下方展示 Query Object 把查询条件封装为对象，Repository 把集合语义包装为领域接口。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={36} text="元数据映射：代码驱动 vs 元数据驱动" />

          {/* 左侧：代码驱动 */}
          <rect x={48} y={60} width={296} height={180} rx="10" fill={T.danger} fillOpacity="0.04" stroke={T.danger} strokeWidth="1.5" />
          <text x={196} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill={T.danger}>代码驱动（手写 Mapper）</text>
          <line x1={48} y1={94} x2={344} y2={94} stroke={T.danger} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={64} y={116} fontSize="11" fill={T.primary}>每个实体类 → 一个 Mapper 类</text>
          <text x={64} y={138} fontSize="11" fill={T.primary}>映射逻辑硬编码在代码中</text>
          <text x={64} y={160} fontSize="11" fill={T.primary}>改表结构 → 改代码 → 重新编译</text>
          <text x={64} y={182} fontSize="11" fill={T.secondary}>优点：类型安全、IDE 友好</text>
          <text x={64} y={204} fontSize="11" fill={T.secondary}>缺点：重复代码多、维护成本高</text>
          <text x={64} y={226} fontSize="11" fontFamily="monospace" fill={T.secondary}>class OrderMapper {"{ ... }"}</text>

          {/* 右侧：元数据驱动 */}
          <rect x={376} y={60} width={296} height={180} rx="10" fill="#3FB97F" fillOpacity="0.04" stroke="#3FB97F" strokeWidth="1.5" />
          <text x={524} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill="#3FB97F">元数据驱动（配置映射）</text>
          <line x1={376} y1={94} x2={672} y2={94} stroke="#3FB97F" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={392} y={116} fontSize="11" fill={T.primary}>映射规则存在 XML / 注解 / 配置</text>
          <text x={392} y={138} fontSize="11" fill={T.primary}>通用引擎读取元数据 → 生成 SQL</text>
          <text x={392} y={160} fontSize="11" fill={T.primary}>改表结构 → 改配置 → 无需编译</text>
          <text x={392} y={182} fontSize="11" fill={T.secondary}>优点：一处修改、全局生效</text>
          <text x={392} y={204} fontSize="11" fill={T.secondary}>缺点：调试难、运行时才发现错误</text>
          <text x={392} y={226} fontSize="11" fontFamily="monospace" fill={T.secondary}>@Column(name="order_id")</text>

          {/* VS */}
          <text x={VIEW_W / 2} y={156} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.secondary}>VS</text>

          {/* 下方：Query Object + Repository */}
          <line x1={48} y1={260} x2={672} y2={260} stroke={T.border} strokeWidth="0.8" />
          <text x={VIEW_W / 2} y={284} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.primary}>配套模式</text>

          {/* Query Object */}
          <rect x={48} y={296} width={296} height={72} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={196} y={320} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>Query Object</text>
          <text x={196} y={340} textAnchor="middle" fontSize="11" fill={T.secondary}>把查询条件封装为对象</text>
          <text x={196} y={356} textAnchor="middle" fontSize="11" fill={T.secondary}>可组合、可复用、可序列化</text>

          {/* Repository */}
          <rect x={376} y={296} width={296} height={72} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <text x={524} y={320} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E5B567">Repository</text>
          <text x={524} y={340} textAnchor="middle" fontSize="11" fill={T.secondary}>把集合语义包装为领域接口</text>
          <text x={524} y={356} textAnchor="middle" fontSize="11" fill={T.secondary}>领域层只看到 add/get/remove</text>

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="元数据映射的权衡：灵活性 vs 类型安全——小项目手写，大项目配置" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        元数据映射模式族解决"映射规则放在哪里"。代码驱动类型安全但重复多，
        元数据驱动灵活但调试难。Query Object 封装查询条件，Repository 封装集合访问。
      </figcaption>
    </figure>
  );
}
