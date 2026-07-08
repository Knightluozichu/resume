/**
 * <HpwPointersDiagram>：指针原理图解（指针存地址、解引用、指针运算步长）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HpwPointersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="指针原理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            指针 = 保存地址的变量
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            p 存 a 的地址，*p 顺着地址找到 a 的值
          </text>

          {/* 左侧：指针变量 p */}
          <rect x="50" y="80" width="220" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="160" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">指针变量 p（int *）</text>
          <rect x="80" y="116" width="160" height="44" rx="6" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="160" y="142" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">0x1000</text>
          <text x="160" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">p 本身也在内存里（占 8 字节）</text>
          <text x="160" y="194" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">p 的值 = a 的地址</text>

          {/* 中间：解引用箭头 */}
          <path d="M 270 140 L 430 140" stroke="var(--accent)" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text x="350" y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">*p 解引用</text>
          <text x="350" y="156" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">顺着地址 0x1000 找过去</text>

          {/* 右侧：目标变量 a */}
          <rect x="440" y="80" width="220" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="550" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">变量 a（int）</text>
          <rect x="470" y="116" width="160" height="44" rx="6" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="550" y="142" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">42</text>
          <text x="550" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">地址 0x1000，占 4 字节</text>
          <text x="550" y="194" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">*p 和 a 是同一块内存</text>

          {/* 下方：指针运算步长对比 */}
          <rect x="50" y="224" width="640" height="200" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="248" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">指针运算：步长 = 所指类型的大小</text>

          {/* int *p：p+1 跳 4 字节 */}
          <text x="80" y="278" fontSize="12" fontWeight="600" fill="var(--accent)">int *p（步长 4 字节）</text>
          {[
            { x: 80, label: "p", val: "int" },
            { x: 160, label: "p+1", val: "int" },
            { x: 240, label: "p+2", val: "int" },
            { x: 320, label: "p+3", val: "int" },
          ].map((cell) => (
            <g key={cell.label}>
              <rect x={cell.x} y="288" width="60" height="36" rx="4" fill="var(--bg-secondary)" stroke="var(--accent)" strokeWidth="1.2" />
              <text x={cell.x + 30} y="310" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{cell.val}</text>
              <text x={cell.x + 30} y="338" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{cell.label}</text>
            </g>
          ))}
          <text x="200" y="356" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">p+1 跳过 4 字节 → 指向下一个 int</text>

          {/* char *p：p+1 跳 1 字节 */}
          <text x="440" y="278" fontSize="12" fontWeight="600" fill="var(--success)">char *p（步长 1 字节）</text>
          {[
            { x: 440, label: "p" },
            { x: 484, label: "p+1" },
            { x: 528, label: "p+2" },
            { x: 572, label: "p+3" },
            { x: 616, label: "p+4" },
          ].map((cell) => (
            <g key={cell.label}>
              <rect x={cell.x} y="288" width="36" height="36" rx="4" fill="var(--bg-secondary)" stroke="var(--success)" strokeWidth="1.2" />
              <text x={cell.x + 18} y="310" textAnchor="middle" fontSize="10" fill="var(--text-primary)">ch</text>
              <text x={cell.x + 18} y="338" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{cell.label}</text>
            </g>
          ))}
          <text x="528" y="356" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">p+1 只跳 1 字节 → arr[i] = *(arr+i)</text>

          {/* 三类陷阱 */}
          <text x="80" y="386" fontSize="11" fontWeight="600" fill="var(--danger)">三类陷阱：</text>
          <text x="160" y="386" fontSize="10" fill="var(--text-secondary)">野指针（未初始化）</text>
          <text x="300" y="386" fontSize="10" fill="var(--text-secondary)">悬空指针（已释放）</text>
          <text x="440" y="386" fontSize="10" fill="var(--text-secondary)">空指针（NULL，解引用段错误）</text>
          <text x="80" y="404" fontSize="10" fill="var(--text-tertiary)">防范：声明即初始化、free 后置 NULL、用前判空、检查边界</text>

          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：指针类型决定解引用读多少字节 + 运算跳多少字节
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        指针原理——存地址的变量、解引用与按类型步长的指针运算
      </figcaption>
    </figure>
  );
}
