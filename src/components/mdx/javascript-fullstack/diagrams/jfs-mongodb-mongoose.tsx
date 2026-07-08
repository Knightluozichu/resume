/**
 * <JfsMongodbMongooseDiagram>：MongoDB 嵌入vs引用建模与 Mongoose 三层抽象图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function JfsMongodbMongooseDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MongoDB 嵌入与引用建模及 Mongoose 三层抽象图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            MongoDB 建模方式与 Mongoose 抽象
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            嵌入（一起读）vs 引用（独立共享）+ Schema/Model/Document 三层
          </text>

          {/* 嵌入 */}
          <rect x="30" y="68" width="330" height="150" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="195" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">嵌入 Embedding</text>
          <rect x="50" y="104" width="290" height="48" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="124" textAnchor="middle" fontSize="11" fill="var(--text-primary)">文章文档</text>
          <text x="195" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&#123; title, comments: [...] &rbrace;</text>
          <text x="195" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一次读取拿到全部，原子写入</text>
          <text x="195" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合：读多写少、数据成簇</text>
          <text x="195" y="208" textAnchor="middle" fontSize="10" fill="var(--danger)">限制：子文档无限增长撑爆 16MB</text>

          {/* 引用 */}
          <rect x="380" y="68" width="330" height="150" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">引用 Referencing</text>
          <rect x="400" y="104" width="135" height="48" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1" />
          <text x="467" y="124" textAnchor="middle" fontSize="11" fill="var(--text-primary)">文章</text>
          <text x="467" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&#123; authorId &rbrace;</text>
          <text x="545" y="130" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="565" y="104" width="135" height="48" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1" />
          <text x="632" y="124" textAnchor="middle" fontSize="11" fill="var(--text-primary)">用户</text>
          <text x="632" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&#123; name, email &rbrace;</text>
          <text x="545" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">populate 填充，无冗余可独立分页</text>
          <text x="545" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">适合：独立共享、多处引用</text>
          <text x="545" y="208" textAnchor="middle" fontSize="10" fill="var(--danger)">注意：populate 非 JOIN，易 N+1</text>

          {/* Mongoose 三层 */}
          <text x={VIEW_W / 2} y="246" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">Mongoose 三层抽象</text>

          <rect x="40" y="262" width="200" height="100" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="286" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Schema</text>
          <text x="140" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">定义结构与校验</text>
          <text x="140" y="322" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">字段类型/required</text>
          <text x="140" y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">unique/默认值</text>

          <text x="250" y="312" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="270" y="262" width="200" height="100" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="286" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Model</text>
          <text x="370" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译后的集合类</text>
          <text x="370" y="322" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">find/create/update</text>
          <text x="370" y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对应一个集合</text>

          <text x="480" y="312" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="262" width="200" height="100" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="286" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Document</text>
          <text x="600" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Model 的实例</text>
          <text x="600" y="322" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">save/validate</text>
          <text x="600" y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单条文档</text>

          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            在无 schema 的 MongoDB 上加类型约束与校验
          </text>
          <text x={VIEW_W / 2} y="410" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            代价：每条查询实例化 Document 有开销，大数据集用 lean()
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MongoDB嵌入vs引用建模与Mongoose Schema/Model/Document三层抽象
      </figcaption>
    </figure>
  );
}
