/**
 * <CqcNullableRefDiagram>：可空引用类型的 null 流向分析。
 *
 * 上半部分展示「未检查解引用」的危险路径：数据源可能为 null，
 * 直接访问属性触发 NullReferenceException（红色路径）。
 * 下半部分展示「正确检查」的安全路径：用 ? 或 if 检查后访问（绿色路径）。
 * 左侧标注可空标注上下文与编译器警告。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CqcNullableRefDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="可空引用类型的 null 流向分析。上半部分：未检查解引用的危险路径，数据源可能为 null 时直接访问属性会触发 NullReferenceException。下半部分：正确检查的安全路径，用问号运算符或 if 判断后访问。左侧标注可空标注上下文与编译器警告级别。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            可空引用 · null 流向分析
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            编译器追踪 null 可能性，未检查就解引用则发出警告
          </text>

          {/* ===== 上半：危险路径 ===== */}
          <rect x="36" y="68" width={VIEW_W - 72} height="132" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="52" y="88" fontSize="12" fontWeight="700" fill="var(--danger)">危险路径：未检查解引用</text>

          {/* 数据源节点 */}
          <rect x="60" y="104" width="140" height="40" rx="8" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="130" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">string? name</text>
          <text x="130" y="136" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可能为 null</text>

          {/* 箭头 */}
          <line x1="200" y1="124" x2="268" y2="124" stroke="var(--danger)" strokeWidth="1.6" />
          <polygon points="268,124 262,120 262,128" fill="var(--danger)" />

          {/* 直接访问节点 */}
          <rect x="270" y="104" width="180" height="40" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="360" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">name.Length</text>
          <text x="360" y="136" textAnchor="middle" fontSize="10" fill="var(--danger)">CS8602 警告</text>

          {/* 箭头 */}
          <line x1="450" y1="124" x2="498" y2="124" stroke="var(--danger)" strokeWidth="1.6" />
          <polygon points="498,124 492,120 492,128" fill="var(--danger)" />

          {/* 异常节点 */}
          <rect x="500" y="104" width="160" height="40" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.6" />
          <text x="580" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">NullReferenceException</text>
          <text x="580" y="136" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">运行时崩溃</text>

          {/* 底部说明 */}
          <text x="360" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            编译器看到 string? 但代码未检查 null 就解引用，发出 CS8602 警告
          </text>

          {/* ===== 下半：安全路径 ===== */}
          <rect x="36" y="214" width={VIEW_W - 72} height="156" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="52" y="234" fontSize="12" fontWeight="700" fill="var(--success)">安全路径：先检查后访问</text>

          {/* 数据源节点 */}
          <rect x="60" y="250" width="140" height="40" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.4" />
          <text x="130" y="268" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">string? name</text>
          <text x="130" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可能为 null</text>

          {/* 箭头 */}
          <line x1="200" y1="270" x2="268" y2="270" stroke="var(--success)" strokeWidth="1.6" />
          <polygon points="268,270 262,266 262,274" fill="var(--success)" />

          {/* 检查节点 */}
          <rect x="270" y="250" width="180" height="40" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="360" y="268" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">name?.Length ?? 0</text>
          <text x="360" y="282" textAnchor="middle" fontSize="10" fill="var(--success)">编译器满意</text>

          {/* 箭头 */}
          <line x1="450" y1="270" x2="498" y2="270" stroke="var(--success)" strokeWidth="1.6" />
          <polygon points="498,270 492,266 492,274" fill="var(--success)" />

          {/* 结果节点 */}
          <rect x="500" y="250" width="160" height="40" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.6" />
          <text x="580" y="268" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">安全返回 int</text>
          <text x="580" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无异常</text>

          {/* 三种正确做法 */}
          <text x="60" y="316" fontSize="11" fontWeight="600" fill="var(--text-primary)">三种正确做法：</text>
          <text x="60" y="336" fontSize="11" fill="var(--text-secondary)">1. null 条件运算符 name?.Length</text>
          <text x="60" y="354" fontSize="11" fill="var(--text-secondary)">2. if (name is not null) 守卫</text>
          <text x="400" y="336" fontSize="11" fill="var(--text-secondary)">3. ! null 抑制运算符（确信非 null 时）</text>

          {/* 底部注释 */}
          <text x={VIEW_W / 2} y="398" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            开启 Nullable 启用可空标注上下文，让编译器在编译期帮你找空引用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可空引用类型让编译器追踪 null 的流向：未检查就解引用会触发 CS8602 警告，用 ?. 或 if 守卫后编译器才允许访问。
      </figcaption>
    </figure>
  );
}
