/**
 * <UsgDataPersistenceDiagram>: 数据持久化
 *
 * PlayerPrefs / JSON 文件 / ScriptableObject 三种方案对比
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

export function UsgDataPersistenceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="数据持久化三种方案：PlayerPrefs 轻量键值、JSON 文件存档、ScriptableObject 配置数据。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            数据持久化三种方案
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            PlayerPrefs / JSON 文件 / ScriptableObject
          </text>
          {/* PlayerPrefs */}
          <g>
            <rect x={36} y={76} width={200} height={280} rx="8" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={136} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>PlayerPrefs</text>
            <rect x={52} y={110} width={168} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={136} y={127} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>SetInt / GetInt</text>
            <rect x={52} y={142} width={168} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={136} y={159} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>SetFloat / SetString</text>
            <rect x={52} y={174} width={168} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={136} y={191} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>Save()</text>
            <text x={136} y={222} textAnchor="middle" fontSize="10" fill={secondary}>适合：设置/最高分</text>
            <text x={136} y={240} textAnchor="middle" fontSize="10" fill={secondary}>轻量键值对</text>
            <text x={136} y={258} textAnchor="middle" fontSize="10" fill={secondary}>不支持复杂结构</text>
            <text x={136} y={286} textAnchor="middle" fontSize="10" fill={danger}>数据明文可被篡改</text>
            <text x={136} y={318} textAnchor="middle" fontSize="10" fill={secondary}>容量小，勿存大对象</text>
          </g>
          {/* JSON 文件 */}
          <g>
            <rect x={260} y={76} width={200} height={280} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={360} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>JSON 文件存档</text>
            <rect x={276} y={110} width={168} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={127} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>JsonUtility.ToJson</text>
            <rect x={276} y={142} width={168} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={159} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>JsonUtility.FromJson</text>
            <rect x={276} y={174} width={168} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={191} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>Application.persistentDataPath</text>
            <text x={360} y={222} textAnchor="middle" fontSize="10" fill={secondary}>适合：存档/背包</text>
            <text x={360} y={240} textAnchor="middle" fontSize="10" fill={secondary}>支持复杂嵌套对象</text>
            <text x={360} y={258} textAnchor="middle" fontSize="10" fill={secondary}>可跨平台持久</text>
            <text x={360} y={286} textAnchor="middle" fontSize="10" fill={danger}>需处理异常与版本迁移</text>
            <text x={360} y={318} textAnchor="middle" fontSize="10" fill={secondary}>File.WriteAllText / ReadAllText</text>
          </g>
          {/* ScriptableObject */}
          <g>
            <rect x={484} y={76} width={200} height={280} rx="8" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={584} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>ScriptableObject</text>
            <rect x={500} y={110} width={168} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={584} y={127} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>CreateAssetMenu</text>
            <rect x={500} y={142} width={168} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={584} y={159} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>.asset 资产文件</text>
            <rect x={500} y={174} width={168} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={584} y={191} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>Inspector 可编辑</text>
            <text x={584} y={222} textAnchor="middle" fontSize="10" fill={secondary}>适合：配置数据</text>
            <text x={584} y={240} textAnchor="middle" fontSize="10" fill={secondary}>武器/角色参数</text>
            <text x={584} y={258} textAnchor="middle" fontSize="10" fill={secondary}>数据与逻辑分离</text>
            <text x={584} y={286} textAnchor="middle" fontSize="10" fill={danger}>运行时不自动持久化</text>
            <text x={584} y={318} textAnchor="middle" fontSize="10" fill={secondary}>多对象共享同一份数据</text>
          </g>
          <text x={360} y={380} textAnchor="middle" fontSize="11" fill={secondary}>选择原则：轻量用 PlayerPrefs，存档用 JSON，配置用 ScriptableObject</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种持久化方案：PlayerPrefs（轻量设置）→JSON（存档）→ScriptableObject（配置数据）。
      </figcaption>
    </figure>
  );
}
