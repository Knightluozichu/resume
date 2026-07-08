/**
 * <DnjStreamImplementationDiagram>：Stream 实现原理图解（背压 / 四种流 / pipe）。
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DnjStreamImplementationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Stream实现与背压机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Stream 实现原理：四种流 + 背压 + 管道
          </text>

          {/* 背压机制 */}
          <text x={VIEW_W / 2} y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">背压（Backpressure）机制</text>

          <rect x="40" y="64" width="140" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="110" y="86" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Readable</text>
          <text x="110" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">highWaterMark</text>
          <text x="110" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">缓冲区 16KB</text>
          <text x="110" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">_read() 读取</text>

          <text x="185" y="104" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="185" y="118" textAnchor="middle" fontSize="8" fill="var(--accent)">push(chunk)</text>

          <rect x="210" y="64" width="100" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="260" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">缓冲队列</text>
          <text x="260" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">[chunk1]</text>
          <text x="260" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">[chunk2]</text>
          <text x="260" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">[chunk3]</text>

          <text x="315" y="104" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="315" y="118" textAnchor="middle" fontSize="8" fill="var(--accent)">write(chunk)</text>

          <rect x="340" y="64" width="100" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="390" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">写缓冲</text>
          <text x="390" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">若超 HWM</text>
          <text x="390" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">return false</text>
          <text x="390" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ 暂停读取</text>

          <text x="445" y="104" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="470" y="64" width="140" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="540" y="86" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Writable</text>
          <text x="540" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">_write() 写入</text>
          <text x="540" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">完成后 callback</text>
          <text x="540" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ resume()</text>

          {/* 背压反馈箭头 */}
          <path d="M 540 144 Q 540 166 260 166 Q 260 166 260 144" fill="none" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#arr3)" opacity="0.6" />
          <text x="400" y="180" textAnchor="middle" fontSize="9" fill="var(--danger)">背压反馈：write 返回 false → Readable.pause() → 写完 drain → Readable.resume()</text>

          {/* 四种流 */}
          <text x={VIEW_W / 2} y="204" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">四种流类型</text>

          <rect x="40" y="218" width="155" height="70" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="117" y="238" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Readable</text>
          <text x="117" y="254" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可读流（只输出）</text>
          <text x="117" y="268" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fs.createReadStream</text>
          <text x="117" y="282" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">process.stdin</text>

          <rect x="210" y="218" width="155" height="70" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="287" y="238" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Writable</text>
          <text x="287" y="254" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可写流（只输入）</text>
          <text x="287" y="268" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fs.createWriteStream</text>
          <text x="287" y="282" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">process.stdout</text>

          <rect x="380" y="218" width="155" height="70" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="457" y="238" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Duplex</text>
          <text x="457" y="254" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">双工流（读+写独立）</text>
          <text x="457" y="268" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">net.Socket</text>
          <text x="457" y="282" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">上下游互不干扰</text>

          <rect x="550" y="218" width="155" height="70" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="627" y="238" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Transform</text>
          <text x="627" y="254" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">转换流（读→变换→写）</text>
          <text x="627" y="268" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">zlib.createGzip</text>
          <text x="627" y="282" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">_transform()</text>

          {/* pipe / pipeline */}
          <text x={VIEW_W / 2} y="310" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">管道：pipe 与 pipeline</text>

          <rect x="40" y="324" width="320" height="64" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="200" y="344" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">readable.pipe(writable)  [已过时]</text>
          <text x="200" y="360" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">错误处理复杂：需监听 error 事件</text>
          <text x="200" y="374" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不自动销毁上下游 → 资源泄漏风险</text>

          <rect x="380" y="324" width="320" height="64" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="344" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">pipeline(src, ...transforms, dest)  [推荐]</text>
          <text x="540" y="360" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">统一错误处理回调</text>
          <text x="540" y="374" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">失败时自动销毁全部流</text>

          {/* 底部 */}
          <rect x="50" y="404" width="640" height="56" rx="6" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            核心：流通过 highWaterMark 控制缓冲，write 返回 false 触发背压暂停，drain 后恢复
          </text>
          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            自定义流：继承 Readable 实现 _read() / Writable 实现 _write() / Transform 实现 _transform()
          </text>

          <defs>
            <marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--danger)" opacity="0.6" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Stream 实现原理——四种流类型、highWaterMark 背压、pipe 与 pipeline 管道
      </figcaption>
    </figure>
  );
}
