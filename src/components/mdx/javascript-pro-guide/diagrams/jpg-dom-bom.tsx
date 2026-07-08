/**
 * <JpgDomBomDiagram>：DOM 与 BOM 操作图解（文档树 + BOM 对象层级）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgDomBomDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="DOM 与 BOM 操作图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            DOM 文档树与 BOM 对象层级
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            DOM 操作文档结构；BOM 操作浏览器窗口与环境
          </text>

          {/* DOM 树 */}
          <rect x="40" y="64" width="360" height="370" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="220" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">DOM 文档树（节点层级）</text>

          <rect x="160" y="96" width="120" height="34" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="220" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">document</text>

          <path d="M220 130 L 220 140" stroke="var(--text-tertiary)" strokeWidth="1.2" fill="none" />

          <rect x="160" y="140" width="120" height="34" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="220" y="162" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">&lt;html&gt;</text>

          <path d="M220 174 L 220 184 M 130 184 L 310 184 M 130 184 L 130 192 M 310 184 L 310 192" stroke="var(--text-tertiary)" strokeWidth="1.2" fill="none" />

          <rect x="70" y="192" width="120" height="34" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="214" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">&lt;head&gt;</text>
          <rect x="250" y="192" width="120" height="34" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="310" y="214" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">&lt;body&gt;</text>

          <path d="M130 226 L 130 234 M 100 234 L 160 234 M 100 234 L 100 242 M 160 234 L 160 242" stroke="var(--text-tertiary)" strokeWidth="1.2" fill="none" />
          <path d="M310 226 L 310 234 M 280 234 L 340 234 M 280 234 L 280 242 M 340 234 L 340 242" stroke="var(--text-tertiary)" strokeWidth="1.2" fill="none" />

          <rect x="70" y="242" width="60" height="28" rx="5" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="100" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">&lt;title&gt;</text>
          <rect x="140" y="242" width="70" height="28" rx="5" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="175" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">&lt;meta&gt;</text>
          <rect x="250" y="242" width="60" height="28" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="280" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">&lt;div&gt;</text>
          <rect x="320" y="242" width="60" height="28" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="350" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">&lt;p&gt;</text>

          <rect x="60" y="290" width="320" height="60" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="220" y="308" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">常用 DOM API</text>
          <text x="76" y="326" fontSize="9" fill="var(--text-secondary)">getElementById / querySelector</text>
          <text x="76" y="342" fontSize="9" fill="var(--text-secondary)">createElement / appendChild / removeChild</text>

          <rect x="60" y="360" width="320" height="62" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="220" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">增删改查性能要点</text>
          <text x="76" y="394" fontSize="9" fill="var(--text-tertiary)">批量改动用 DocumentFragment 离线操作</text>
          <text x="76" y="410" fontSize="9" fill="var(--text-tertiary)">避免布局抖动：读写分离，用 rAF 批处理</text>
          <text x="76" y="424" fontSize="9" fill="var(--text-tertiary)">事件委托：利用冒泡在父节点统一监听</text>

          {/* BOM 层级 */}
          <rect x="420" y="64" width="300" height="370" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="570" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">BOM 对象层级（浏览器环境）</text>

          <rect x="510" y="96" width="120" height="34" rx="6" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="570" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">window</text>
          <text x="570" y="138" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">全局对象 + 浏览器窗口</text>

          <rect x="440" y="150" width="130" height="34" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="505" y="172" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">document</text>
          <text x="505" y="186" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">DOM 入口</text>

          <rect x="580" y="150" width="130" height="34" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="645" y="172" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">location</text>
          <text x="645" y="186" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">URL 信息</text>

          <rect x="440" y="200" width="130" height="34" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="505" y="222" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">navigator</text>
          <text x="505" y="236" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">浏览器信息</text>

          <rect x="580" y="200" width="130" height="34" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="645" y="222" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">history</text>
          <text x="645" y="236" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">会话历史</text>

          <rect x="440" y="250" width="130" height="34" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="505" y="272" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">screen</text>
          <text x="505" y="286" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">屏幕信息</text>

          <rect x="580" y="250" width="130" height="34" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="645" y="272" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">performance</text>
          <text x="645" y="286" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">性能计时</text>

          <rect x="440" y="300" width="270" height="120" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="575" y="320" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">关键 BOM 能力</text>
          <text x="456" y="340" fontSize="9" fill="var(--text-secondary)">window.alert/confirm/prompt —— 交互</text>
          <text x="456" y="358" fontSize="9" fill="var(--text-secondary)">location.href / history.pushState —— 路由</text>
          <text x="456" y="376" fontSize="9" fill="var(--text-secondary)">navigator.userAgent —— 环境探测</text>
          <text x="456" y="394" fontSize="9" fill="var(--text-secondary)">localStorage / sessionStorage —— 存储</text>
          <text x="456" y="412" fontSize="9" fill="var(--text-tertiary)">setTimeout/setInterval 也挂在 window 上</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DOM 是 document 下的文档节点树；BOM 以 window 为根，包含 location/history/navigator 等环境对象
      </figcaption>
    </figure>
  );
}
