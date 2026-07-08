/**
 * <JfsGraphqlApiDiagram>：GraphQL 按需取数与 Resolver 解析树图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function JfsGraphqlApiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GraphQL 按需取数与 Resolver 解析树图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            GraphQL：按需取数与解析树
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            REST 固定端点过度/欠获取 → GraphQL 单端点按需查询
          </text>

          {/* REST 对比 */}
          <rect x="30" y="68" width="330" height="90" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">REST 痛点</text>
          <text x="195" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">过度获取：要 name 却连 address 返回</text>
          <text x="195" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">欠获取：要用户+文章需两次请求</text>
          <text x="195" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">/users/1 + /users/1/posts 两次往返</text>

          {/* GraphQL 解决 */}
          <rect x="380" y="68" width="330" height="90" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">GraphQL 解决</text>
          <text x="545" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单端点 /graphql，客户端声明字段</text>
          <text x="545" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">精确返回 name + posts.title</text>
          <text x="545" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一次请求，不多不少</text>

          {/* 解析树 */}
          <text x={VIEW_W / 2} y="184" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">Resolver 解析树（逐字段取数）</text>

          <rect x="290" y="198" width="160" height="44" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="216" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Query.user(id)</text>
          <text x="370" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">User.findById</text>

          <text x="300" y="258" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&swarr;</text>
          <text x="440" y="258" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&searr;</text>

          <rect x="170" y="268" width="140" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="240" y="286" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">User.name</text>
          <text x="240" y="302" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">默认从 parent 取</text>

          <rect x="430" y="268" width="140" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="500" y="286" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">User.posts</text>
          <text x="500" y="302" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Post.find(authorId)</text>

          <text x="500" y="328" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="430" y="338" width="140" height="44" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="500" y="356" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Post.title</text>
          <text x="500" y="372" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">默认从 parent 取</text>

          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            N+1 陷阱：10 用户各取 posts = 11 次查询 → DataLoader 批量合并
          </text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            同 tick 内多次 load(id) 合并为一次 find(&#123; _id: &#123; $in: ids &rbrace; &rbrace;)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GraphQL按需取数与Resolver解析树——逐字段解析配DataLoader防N+1
      </figcaption>
    </figure>
  );
}
