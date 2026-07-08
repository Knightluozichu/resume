/**
 * <UsgUnityApiDiagram>: Unity API 核心调用
 *
 * Transform / GameObject / Input / Time 四大核心 API
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function UsgUnityApiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity API 核心调用。四大 API：Transform 变换、GameObject 对象、Input 输入、Time 时间。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity 核心 API 速查
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            Transform / GameObject / Input / Time
          </text>
          <g>
            <rect x={36} y={76} width={312} height={140} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={56} y={98} fontSize="13" fontWeight="700" fill={accent}>Transform（变换）</text>
            <rect x={56} y={110} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={124} y={127} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>transform.position</text>
            <rect x={200} y={110} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={268} y={127} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>transform.rotation</text>
            <rect x={56} y={144} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={124} y={161} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>transform.localScale</text>
            <rect x={200} y={144} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={268} y={161} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Translate / Rotate</text>
            <rect x={56} y={178} width={280} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={196} y={195} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Find / GetChild / SetParent</text>
          </g>
          <g>
            <rect x={372} y={76} width={312} height={140} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={392} y={98} fontSize="13" fontWeight="700" fill={success}>GameObject（对象）</text>
            <rect x={392} y={110} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={460} y={127} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Instantiate</text>
            <rect x={536} y={110} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={604} y={127} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Destroy</text>
            <rect x={392} y={144} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={460} y={161} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>GetComponent&lt;T&gt;</text>
            <rect x={536} y={144} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={604} y={161} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>SetActive</text>
            <rect x={392} y={178} width={280} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={195} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Find / FindObjectOfType</text>
          </g>
          <g>
            <rect x={36} y={230} width={312} height={110} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={56} y={252} fontSize="13" fontWeight="700" fill={warning}>Input（输入）</text>
            <rect x={56} y={264} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={124} y={281} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Input.GetKeyDown</text>
            <rect x={200} y={264} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={268} y={281} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Input.GetAxis</text>
            <rect x={56} y={298} width={280} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={196} y={315} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Input.mousePosition / 新输入系统</text>
          </g>
          <g>
            <rect x={372} y={230} width={312} height={110} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={392} y={252} fontSize="13" fontWeight="700" fill={danger}>Time（时间）</text>
            <rect x={392} y={264} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={460} y={281} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Time.deltaTime</text>
            <rect x={536} y={264} width={136} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={604} y={281} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Time.timeScale</text>
            <rect x={392} y={298} width={280} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={315} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Time.fixedDeltaTime / frameCount</text>
          </g>
          <text x={360} y={368} textAnchor="middle" fontSize="11" fill={secondary}>移动逻辑必须乘 Time.deltaTime 才与帧率无关</text>
          <text x={360} y={386} textAnchor="middle" fontSize="11" fill={secondary}>GetComponent 每帧调用有开销，应在 Awake/Start 缓存引用</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四大核心 API：Transform 管变换、GameObject 管生命周期、Input 管输入、Time 管帧时间。
      </figcaption>
    </figure>
  );
}
