/**
 * <DogWebglBasicsDiagram>：WebGL 基础与上下文
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogWebglBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="WebGL 上下文获取与丢失恢复" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">WebGL：取上下文 → 建资源 → 防丢失恢复</text>

          {/* canvas */}
          <rect x="40" y="56" width="140" height="80" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="110" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">&lt;canvas&gt;</text>
          <text x="110" y="98" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">画布元素</text>
          <text x="110" y="116" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">getContext</text>

          {/* 上下文 */}
          <rect x="210" y="56" width="160" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">WebGL 上下文</text>
          <text x="290" y="98" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">webgl2 优先</text>
          <text x="290" y="116" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">回退 webgl1</text>
          <line x1="180" y1="96" x2="210" y2="96" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#wbArrow)" />

          {/* 资源 */}
          <rect x="410" y="56" width="270" height="80" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="545" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">GPU 资源</text>
          <text x="426" y="98" fontSize="9.5" fill="var(--text-secondary)">程序 · VAO/VBO · 纹理 · uniform 位置</text>
          <text x="426" y="116" fontSize="9.5" fill="var(--text-secondary)">链接后 getAttribLocation/getUniformLocation</text>
          <line x1="370" y1="96" x2="410" y2="96" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#wbArrow)" />

          {/* 上下文丢失/恢复循环 */}
          <rect x="120" y="180" width="220" height="70" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="230" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">上下文丢失</text>
          <text x="230" y="222" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">webglcontextlost</text>
          <text x="230" y="238" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">preventDefault + 标记失效</text>

          <rect x="380" y="180" width="220" height="70" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="490" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">上下文恢复</text>
          <text x="490" y="222" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">webglcontextrestored</text>
          <text x="490" y="238" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">重建全部资源与状态</text>
          <line x1="340" y1="215" x2="380" y2="215" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#wbArrow)" />
          <line x1="380" y1="240" x2="340" y2="240" stroke="var(--accent)" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#wbArrow)" />

          {/* 底部说明 */}
          <rect x="40" y="288" width="640" height="86" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="310" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">WebGL2 ≈ ES3（3D 纹理/UBO/MRT/原生 VAO/实例化）· WebGL1 ≈ ES2</text>
          <text x="360" y="328" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">上下文丢失时所有 GL 资源失效，必须在 restored 里重建</text>
          <text x="360" y="346" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">uniform/attribute 位置在链接后查询；返回 -1 表示被优化掉，跳过设定</text>
          <text x="360" y="364" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">render 循环检测 resourcesValid，失效期间跳过绘制</text>

          <defs>
            <marker id="wbArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">canvas 取上下文建资源，丢失时 preventDefault、恢复时重建全部资源</figcaption>
    </figure>
  );
}
