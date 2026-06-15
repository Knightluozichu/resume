/**
 * <QsortBsearchDiagram>：qsort 回调比较函数与 bsearch 有序查找示意。
 */

export function QsortBsearchDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const success = "#3FB97F";
  const warn = "#E5B567";

  const unsorted = [42, 7, 19, 3, 88];
  const sorted = [3, 7, 19, 42, 88];
  const target = 19;
  const targetIdx = 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="qsort 比较回调排序与 bsearch 二分查找"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={24} fontSize="14" fontWeight="700" fill={primary}>
            qsort：通用排序 + 比较函数
          </text>

          {/* unsorted array */}
          <text x={24} y={48} fontSize="11" fill={secondary}>
            排序前 arr[]
          </text>
          {unsorted.map((v, i) => (
            <g key={`u-${i}`}>
              <rect
                x={24 + i * 56}
                y={56}
                width={48}
                height={40}
                rx="6"
                fill={bg}
                stroke={border}
                strokeWidth="1.5"
              />
              <text x={48 + i * 56} y={82} textAnchor="middle" fontSize="14" fontWeight="600" fill={primary}>
                {v}
              </text>
            </g>
          ))}

          {/* compare callback box */}
          <rect x={320} y={52} width={296} height={96} rx="8" fill="var(--bg-elevated)" stroke={accent} strokeWidth="2" />
          <text x={336} y={76} fontSize="11" fontWeight="600" fill={accent}>
            比较函数 compare(a, b)
          </text>
          <text x={336} y={96} fontSize="11" fill={primary} fontFamily="monospace">
            return *(int*)a - *(int*)b;
          </text>
          <text x={336} y={116} fontSize="10" fill={secondary}>
            &lt;0 表示 a 在前 · qsort 反复调用它决定顺序
          </text>
          <text x={336} y={136} fontSize="10" fill={secondary}>
            void * 需 cast 成元素类型再比较
          </text>

          <line x1={304} y1={76} x2={318} y2={76} stroke={accent} strokeWidth="2" />
          <path d="M318 76 l-8 -4 l0 8 z" fill={accent} />
          <text x={200} y={120} textAnchor="middle" fontSize="18" fill={accent}>
            →
          </text>
          <text x={200} y={140} textAnchor="middle" fontSize="10" fill={secondary}>
            qsort(arr, n, sizeof(int), compare)
          </text>

          {/* sorted array */}
          <text x={24} y={168} fontSize="11" fill={secondary}>
            排序后（升序）
          </text>
          {sorted.map((v, i) => (
            <g key={`s-${i}`}>
              <rect
                x={24 + i * 56}
                y={176}
                width={48}
                height={40}
                rx="6"
                fill={bg}
                stroke={success}
                strokeWidth="1.5"
              />
              <text x={48 + i * 56} y={202} textAnchor="middle" fontSize="14" fontWeight="600" fill={success}>
                {v}
              </text>
            </g>
          ))}

          {/* bsearch section */}
          <line x1={24} y1={232} x2={616} y2={232} stroke={border} strokeWidth="1" />

          <text x={24} y={256} fontSize="14" fontWeight="700" fill={primary}>
            bsearch：在已排序数组中查找
          </text>
          <text x={24} y={278} fontSize="11" fill={secondary}>
            key = {target} · 二分缩小范围 · O(log n)
          </text>

          {sorted.map((v, i) => (
            <g key={`b-${i}`}>
              <rect
                x={24 + i * 56}
                y={288}
                width={48}
                height={40}
                rx="6"
                fill={i === targetIdx ? "var(--bg-elevated)" : bg}
                stroke={i === targetIdx ? warn : border}
                strokeWidth={i === targetIdx ? 2.5 : 1.5}
              />
              <text
                x={48 + i * 56}
                y={314}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill={i === targetIdx ? warn : primary}
              >
                {v}
              </text>
            </g>
          ))}

          <text x={48 + targetIdx * 56} y={348} textAnchor="middle" fontSize="10" fill={warn}>
            命中
          </text>

          <rect x={320} y={288} width={296} height={56} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={336} y={312} fontSize="11" fill={primary} fontFamily="monospace">
            bsearch(&amp;key, arr, n, sizeof(int), compare)
          </text>
          <text x={336} y={332} fontSize="10" fill={secondary}>
            必须先排序；compare 与 qsort 同一套规则
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        qsort 通过函数指针传入比较逻辑；bsearch 依赖有序性做二分。二者是 C 标准库对「回调 + 泛型指针」的典型用法。
      </figcaption>
    </figure>
  );
}
