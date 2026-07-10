/**
 * <GiaMapStructDiagram>：Go map 与 struct 的内存与语义。
 *
 * 展示 map 的哈希表引用本质、struct 的值语义与组合优于继承。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function GiaMapStructDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Go map 与 struct：map 是哈希表引用类型，struct 是值类型，组合优于继承。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            Map 与 Struct：引用聚合 vs 值聚合
          `}</text>

          {/* map */}
          <rect x={36} y={50} width={310} height={170} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={191} y={72} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`map[K]V（引用类型）`}</text>
          <text x={191} y={90} textAnchor="middle" fontSize="10" fill={secondary}>{`底层哈希表指针 · 零值 nil`}</text>
          <g>
            {["name→Alice", "age→30", "city→北京"].map((kv, i) => (
              <g key={kv}>
                <rect x={80} y={102 + i * 30} width={222} height={24} rx="4" fill={elevated} stroke={border} />
                <text x={191} y={118 + i * 30} textAnchor="middle" fontSize="10" fill={primary}>{kv}</text>
              </g>
            ))}
          </g>
          <text x={191} y={200} textAnchor="middle" fontSize="10" fill={warning}>{`无序 · 非并发安全 · 需 make 初始化`}</text>
          <text x={191} y={214} textAnchor="middle" fontSize="10" fill={secondary}>{`赋值/传参共享同一底层数据`}</text>

          {/* struct */}
          <rect x={374} y={50} width={310} height={170} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={529} y={72} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>{`struct（值类型）`}</text>
          <text x={529} y={90} textAnchor="middle" fontSize="10" fill={secondary}>{`字段连续内存 · 零值为各类型零值`}</text>
          <rect x={414} y={102} width={230} height={88} rx="6" fill={elevated} stroke={border} />
          <text x={424} y={120} fontSize="10" fill={primary}>{`type User struct {`}</text>
          <text x={434} y={136} fontSize="10" fill={accent}>{`Name string`}</text>
          <text x={434} y={152} fontSize="10" fill={accent}>{`Age  int`}</text>
          <text x={434} y={168} fontSize="10" fill={accent}>{`City string`}</text>
          <text x={424} y={184} fontSize="10" fill={primary}>{`}`}</text>
          <text x={529} y={200} textAnchor="middle" fontSize="10" fill={warning}>{`值语义 · 赋值/传参复制全部字段`}</text>
          <text x={529} y={214} textAnchor="middle" fontSize="10" fill={secondary}>{`用指针 *User 避免复制或修改原值`}</text>

          {/* 组合优于继承 */}
          <line x1={36} y1={240} x2={684} y2={240} stroke={border} strokeWidth="1" />
          <text x={360} y={262} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>{`组合优于继承（Go 无继承）`}</text>
          <rect x={120} y={278} width={140} height={50} rx="6" fill={success} fillOpacity="0.12" stroke={success} />
          <text x={190} y={300} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>{`Animal`}</text>
          <text x={190} y={316} textAnchor="middle" fontSize="9" fill={secondary}>{`Eat() Sleep()`}</text>
          <rect x={340} y={278} width={140} height={50} rx="6" fill={accent} fillOpacity="0.12" stroke={accent} />
          <text x={410} y={300} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>{`Dog`}</text>
          <text x={410} y={316} textAnchor="middle" fontSize="9" fill={secondary}>{`嵌套 Animal + Bark()`}</text>
          <line x1={260} y1={303} x2={340} y2={303} stroke={secondary} strokeWidth="1.4" markerEnd="url(#gia-ms-arrow)" />
          <text x={300} y={295} textAnchor="middle" fontSize="9" fill={secondary}>{`嵌入`}</text>

          <rect x={500} y={278} width={160} height={50} rx="6" fill={warning} fillOpacity="0.1" stroke={warning} />
          <text x={580} y={298} textAnchor="middle" fontSize="10" fontWeight="700" fill={warning}>{`接口隐式实现`}</text>
          <text x={580} y={314} textAnchor="middle" fontSize="9" fill={secondary}>{`实现全部方法即满足接口`}</text>

          <text x={360} y={356} textAnchor="middle" fontSize="10" fill={secondary}>{`嵌入字段提升方法 · 无 class 关键字 · 无继承链`}</text>
          <text x={360} y={374} textAnchor="middle" fontSize="10" fill={accent}>{`struct + interface = Go 的全部面向对象能力`}</text>
          <text x={360} y={392} textAnchor="middle" fontSize="10" fill={secondary}>{`map 用 sync.Map 或加锁实现并发安全`}</text>

          <defs>
            <marker id="gia-ms-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        map 是引用类型共享底层数据，struct 是值类型复制字段；Go 用组合+接口替代继承。
      </figcaption>
    </figure>
  );
}
