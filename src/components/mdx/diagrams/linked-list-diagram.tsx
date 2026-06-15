/**
 * <LinkedListDiagram step={0|1|2|3|4}>：单向链表节点连接。
 *
 * step 1: 定义含 data + next 的节点
 * step 2: 创建头指针与首节点
 * step 3: 用 next 串联多个节点
 * step 4: 沿 next 遍历直到 NULL
 */

type ListStep = 0 | 1 | 2 | 3 | 4;

interface Props {
  step?: ListStep;
}

export function LinkedListDiagram({ step = 0 }: Props) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const warn = "#E5B567";

  const isActive = (n: ListStep) => step === 0 || step >= n;
  const nodeStroke = (idx: number) =>
    step === 0 || (step >= 3 && idx <= 2) || (step === 2 && idx === 0) ? accent : border;

  const captions: Record<ListStep, string> = {
    0: "按 Stepper 看单向链表：节点 + next 指针，头指针指向第一个节点",
    1: "节点 struct 含 payload 与 struct Node *next，next 指向下一个或 NULL",
    2: "head 保存首节点地址；空链表时 head == NULL",
    3: "插入时在尾部或头部改 next 链；各节点在堆上可能不相邻",
    4: "遍历：for (p = head; p; p = p->next) 直到 next 为 NULL",
  };

  const nodes = [
    { label: "A", x: 180 },
    { label: "B", x: 320 },
    { label: "C", x: 460 },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 300"
          role="img"
          aria-label="单向链表：头指针、节点 data 与 next 连接"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* Step 1 struct */}
          <rect
            x={24}
            y={16}
            width={592}
            height={56}
            rx="8"
            fill={step === 1 || step === 0 ? "var(--bg-elevated)" : bg}
            stroke={step === 1 || step === 0 ? accent : border}
            strokeWidth={step === 1 ? 2.5 : 1.5}
          />
          <text x={36} y={38} fontSize="11" fontWeight="600" fill={secondary}>
            struct Node {"{"} int data; struct Node *next; {"}"}
          </text>
          <text x={36} y={56} fontSize="10" fill={secondary}>
            next 存「下一个节点的地址」，末节点 next = NULL
          </text>

          {/* head pointer */}
          <text x={48} y={108} fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">
            head
          </text>
          <line
            x1={88}
            y1={104}
            x2={148}
            y2={104}
            stroke={isActive(2) ? accent : border}
            strokeWidth="2"
          />
          <path
            d="M148 104 l-8 -4 l0 8 z"
            fill={isActive(2) ? accent : border}
          />
          <text x={100} y={96} fontSize="10" fill={secondary}>
            头指针
          </text>

          {nodes.map((n, i) => (
            <g key={n.label}>
              <rect
                x={n.x}
                y={88}
                width={100}
                height={56}
                rx="8"
                fill={bg}
                stroke={nodeStroke(i)}
                strokeWidth={step >= 3 || (step === 2 && i === 0) ? 2 : 1.5}
              />
              <text x={n.x + 28} y={112} fontSize="11" fill={secondary}>
                data
              </text>
              <text x={n.x + 24} y={132} fontSize="16" fontWeight="700" fill={accent}>
                {n.label}
              </text>
              <text x={n.x + 68} y={112} fontSize="11" fill={secondary}>
                next
              </text>
              {i < nodes.length - 1 && isActive(3) && (
                <>
                  <line
                    x1={n.x + 100}
                    y1={116}
                    x2={nodes[i + 1].x}
                    y2={116}
                    stroke={accent}
                    strokeWidth="2"
                  />
                  <path
                    d={`M${nodes[i + 1].x} 116 l-8 -4 l0 8 z`}
                    fill={accent}
                  />
                </>
              )}
            </g>
          ))}

          {/* NULL terminator */}
          {isActive(3) && (
            <>
              <line x1={560} y1={116} x2={592} y2={116} stroke={accent} strokeWidth="2" />
              <text x={608} y={120} fontSize="12" fill={warn} fontFamily="monospace">
                NULL
              </text>
            </>
          )}

          {/* traverse cursor */}
          {isActive(4) && (
            <>
              <text x={180} y={168} fontSize="11" fill={accent} fontWeight="600">
                p →
              </text>
              <path
                d="M 200 172 L 220 188 L 200 204"
                fill="none"
                stroke={accent}
                strokeWidth="2"
              />
              <text x={320} y={200} textAnchor="middle" fontSize="11" fill={primary}>
                p = p-&gt;next 逐步后移
              </text>
            </>
          )}

          <text x={320} y={248} textAnchor="middle" fontSize="12" fill={step === 0 ? secondary : primary}>
            {captions[step]}
          </text>

          <text x={320} y={272} textAnchor="middle" fontSize="10" fill={secondary}>
            对比数组：链表插入 O(1) 改指针，但无法 O(1) 随机下标访问
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        单向链表每个节点知道「下一个是谁」；头指针是唯一固定入口，丢失 head 则整链无法访问。
      </figcaption>
    </figure>
  );
}
