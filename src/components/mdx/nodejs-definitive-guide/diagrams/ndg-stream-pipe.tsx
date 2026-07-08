/**
 * <NdgStreamPipeDiagram>：流与管道四种流类型图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function NdgStreamPipeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Node.js流与管道四种流类型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Node.js 四种流类型与管道
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Readable → Writable / Duplex / Transform + pipe &amp; pipeline
          </text>

          {/* Readable */}
          <rect x="40" y="70" width="150" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.5" />
          <text x="115" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Readable</text>
          <text x="115" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可读流</text>
          <text x="115" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fs.createReadStream</text>

          {/* Writable */}
          <rect x="550" y="70" width="150" height="60" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="625" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Writable</text>
          <text x="625" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可写流</text>
          <text x="625" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fs.createWriteStream</text>

          {/* 管道连接 */}
          <line x1="190" y1="100" x2="550" y2="100" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arr2)" />
          <text x="370" y="92" textAnchor="middle" fontSize="10" fill="var(--accent)">pipe() / pipeline()</text>
          <text x="370" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">数据块 chunk 自动流转 + 背压</text>

          <defs>
            <marker id="arr2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Duplex */}
          <rect x="40" y="170" width="300" height="70" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="190" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Duplex（双工流）</text>
          <text x="190" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">同时可读可写，读写独立缓冲</text>
          <text x="190" y="224" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TCP socket = Duplex（收发双通道）</text>
          <line x1="60" y1="232" x2="320" y2="232" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="190" y="244" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">read() &amp; write() 各不干扰</text>

          {/* Transform */}
          <rect x="400" y="170" width="300" height="70" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="550" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Transform（转换流）</text>
          <text x="550" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">写入后变换再读出（读 = 写的函数）</text>
          <text x="550" y="224" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">zlib.createGzip() = 压缩 Transform</text>
          <line x1="420" y1="232" x2="680" y2="232" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="550" y="244" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">_transform(chunk, enc, cb)</text>

          {/* 背压机制 */}
          <rect x="40" y="270" width="660" height="70" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="290" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">背压（Backpressure）机制</text>
          <text x="370" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">写入慢于读取时 Writable 触发 drain 事件，pipe 自动暂停 readable.read()</text>
          <text x="370" y="322" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">pipe 内部已处理背压；手动 pipe 需判断 w.write() 返回 false 后暂停</text>
          <text x="370" y="336" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">推荐用 stream.pipeline() 替代 .pipe()——自动错误传播 + 清理</text>

          {/* 模式说明 */}
          <rect x="40" y="360" width="320" height="60" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="200" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">流动模式（flowing）</text>
          <text x="200" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">data 事件自动推送，需手动暂停/恢复</text>
          <text x="200" y="408" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">readable.on("data", chunk =&gt; ...)</text>

          <rect x="380" y="360" width="320" height="60" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="540" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">暂停模式（paused）</text>
          <text x="540" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">需显式 readable.read() 拉取</text>
          <text x="540" y="408" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">readable.on("readable", () =&gt; read())</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        流与管道——Readable、Writable、Duplex、Transform 四种流类型及背压机制
      </figcaption>
    </figure>
  );
}
