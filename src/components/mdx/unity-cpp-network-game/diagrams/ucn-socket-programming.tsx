/**
 * <UcnSocketProgrammingDiagram>：Socket 编程与缓冲区设计——环形缓冲区与粘包处理图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function UcnSocketProgrammingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Socket 编程与缓冲区设计——环形缓冲区与粘包处理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            接收缓冲区与粘包拆包流程
          </text>

          {/* TCP 字节流 */}
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">TCP 是字节流——没有消息边界，多条消息可能粘在一起</text>

          <rect x="50" y="72" width="640" height="32" rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="110" y="92" textAnchor="middle" fontSize="10" fill="var(--warning)">Len=12</text>
          <text x="235" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Msg A (12B)</text>
          <text x="385" y="92" textAnchor="middle" fontSize="10" fill="var(--warning)">Len=8</text>
          <text x="490" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Msg B (8B)</text>
          <text x="620" y="92" textAnchor="middle" fontSize="10" fill="var(--warning)">Len=12</text>
          <text x="680" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">M</text>

          <text x={VIEW_W / 2} y="122" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; recv() 读入接收缓冲区</text>

          {/* 环形缓冲区 */}
          <text x={VIEW_W / 2} y="148" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">环形缓冲区（Ring Buffer）</text>

          <circle cx="370" cy="240" r="75" fill="none" stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.4" />
          <circle cx="370" cy="165" r="5" fill="var(--success)" />
          <text x="370" y="155" textAnchor="middle" fontSize="9" fill="var(--success)">write_pos</text>
          <circle cx="295" cy="240" r="5" fill="var(--warning)" />
          <text x="270" y="244" textAnchor="middle" fontSize="9" fill="var(--warning)">read_pos</text>

          <text x="370" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可写区域</text>
          <text x="370" y="280" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">待处理数据</text>

          <text x="370" y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">write_pos 追赶 read_pos → 缓冲区满时扩容或拒收</text>

          {/* 拆包流程 */}
          <rect x="30" y="350" width="680" height="95" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="370" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">拆包三步骤（长度前缀法）</text>

          <rect x="50" y="380" width="195" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="148" y="398" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">① 读取前 4 字节 = 消息长度 N</text>
          <text x="148" y="414" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">若可读 &lt; 4 字节，等下次 recv</text>

          <rect x="272" y="380" width="195" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="398" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">② 检查可读 &gt;= N</text>
          <text x="370" y="414" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不足 N 字节则等下次 recv</text>

          <rect x="495" y="380" width="195" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="593" y="398" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">③ 取出 N 字节 = 完整消息</text>
          <text x="593" y="414" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">read_pos 前移 N，交业务层处理</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Socket 接收缓冲区设计——环形缓冲区管理读写指针，长度前缀法解决 TCP 粘包问题
      </figcaption>
    </figure>
  );
}
