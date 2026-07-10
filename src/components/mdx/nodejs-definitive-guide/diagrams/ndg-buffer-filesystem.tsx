/**
 * <NdgBufferFilesystemDiagram>：Buffer 与文件系统图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function NdgBufferFilesystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Buffer与文件系统图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Buffer 与文件系统（fs 模块）
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            二进制数据处理 + 同步/异步/流式文件操作 + 路径处理
          </text>

          {/* 左侧：Buffer 结构 */}
          <rect x="30" y="66" width="330" height="200" rx="12" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Buffer（固定长度二进制）</text>

          <rect x="50" y="100" width="40" height="30" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="70" y="119" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">48</text>
          <rect x="92" y="100" width="40" height="30" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="112" y="119" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">65</text>
          <rect x="134" y="100" width="40" height="30" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="154" y="119" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">6C</text>
          <rect x="176" y="100" width="40" height="30" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="196" y="119" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">6C</text>
          <rect x="218" y="100" width="40" height="30" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="238" y="119" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">6F</text>
          <text x="278" y="119" fontSize="9" fill="var(--text-tertiary)">= "Hello"</text>
          <text x="70" y="144" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">[0]</text>
          <text x="112" y="144" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">[1]</text>

          <text x="50" y="162" fontSize="9" fill="var(--text-tertiary)">创建</text>
          <text x="50" y="176" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">Buffer.alloc(8) / allocUnsafe(8)</text>
          <text x="50" y="190" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">Buffer.from("Hi", "utf8")</text>

          <text x="50" y="208" fontSize="9" fill="var(--text-tertiary)">操作</text>
          <text x="50" y="222" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">buf.write() / buf.toString()</text>
          <text x="50" y="236" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">buf.slice() / Buffer.concat()</text>
          <text x="50" y="250" fontSize="9" fill="var(--text-secondary)">V8 堆外内存，不经过 GC 直接管理</text>

          {/* 右侧：fs 操作三种方式 */}
          <rect x="380" y="66" width="330" height="200" rx="12" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">fs 模块三种读写方式</text>

          <rect x="400" y="100" width="290" height="44" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="410" y="116" fontSize="9" fill="var(--text-tertiary)">同步（阻塞）</text>
          <text x="410" y="132" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">fs.readFileSync(path, "utf8")</text>
          <text x="410" y="142" fontSize="8" fill="var(--text-tertiary)">仅在启动期用；运行时阻塞事件循环</text>

          <rect x="400" y="152" width="290" height="44" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="410" y="168" fontSize="9" fill="var(--text-tertiary)">异步回调</text>
          <text x="410" y="184" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">fs.readFile(path, cb)</text>
          <text x="410" y="194" fontSize="8" fill="var(--text-tertiary)">非阻塞；回调地狱需 Promise 化</text>

          <rect x="400" y="204" width="290" height="52" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="410" y="220" fontSize="9" fill="var(--text-tertiary)">Promise（推荐）</text>
          <text x="410" y="236" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">fs.promises.readFile(path)</text>
          <text x="410" y="250" fontSize="8" fill="var(--text-tertiary)">const &#123;readFile&#125; = fs.promises; await</text>

          {/* 底部：路径处理 */}
          <rect x="30" y="286" width="680" height="100" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="306" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">path 模块 + 文件描述符</text>

          <text x="50" y="324" fontSize="9" fill="var(--text-tertiary)">路径</text>
          <text x="50" y="338" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">path.join("a", "b", "c.txt") → a/b/c.txt</text>
          <text x="50" y="352" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">path.resolve("a") → 绝对路径（cwd 为基）</text>
          <text x="50" y="366" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">path.extname("f.txt") → ".txt"</text>
          <text x="50" y="380" fontSize="9" fill="var(--text-secondary)">__dirname / __filename（CJS）/ import.meta.url（ESM）</text>

          <text x="390" y="324" fontSize="9" fill="var(--text-tertiary)">文件描述符 fd</text>
          <text x="390" y="338" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">fs.open → fd（整数）</text>
          <text x="390" y="352" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">fs.read(fd, buf, offset, len, pos)</text>
          <text x="390" y="366" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">fs.close(fd) 释放</text>
          <text x="390" y="380" fontSize="9" fill="var(--text-secondary)">大文件随机读取用 fd + 定位偏移</text>

          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键：Buffer 是二进制数据的「容器」；fs 读取返回 Buffer（不指定编码时）
          </text>
          <text x={VIEW_W / 2} y="438" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            运行时禁用同步 API（阻塞事件循环）；大文件用流式 ReadStream
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Buffer与文件系统——二进制数据处理、fs三种读写方式、path路径操作与文件描述符
      </figcaption>
    </figure>
  );
}
