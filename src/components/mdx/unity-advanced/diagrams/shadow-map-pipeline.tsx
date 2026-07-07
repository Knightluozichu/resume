/**
 * <ShadowMapPipeline>：阴影渲染流程图（Shadow Map 原理）
 *
 * 两阶段渲染：
 * Pass 1（Light视角）：从光源位置渲染场景深度 → ShadowMap
 * Pass 2（Camera视角）：正常渲染，将片元位置变换到Light空间，比较深度 → 是否在阴影中
 * 附加：PCF软阴影（多次采样）、PCSS（自适应软阴影）
 * 标注常见问题：Shadow Acne（阴影痤疮）和 Peter Panning（彼得潘）
 */

const VIEW_W = 780;
const VIEW_H = 480;

export function ShadowMapPipeline() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[780px]"
        style={{ minWidth: 700 }}
        role="img"
        aria-label="阴影渲染流程图（ShadowMap原理）"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        {/* 标题 */}
        <text x={VIEW_W / 2} y={28} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          Shadow Map 阴影渲染流水线
        </text>
        <text x={VIEW_W / 2} y={46} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          两阶段渲染：光源视角记录深度 → 相机视角深度比较 → 阴影判定
        </text>

        {/* ====== Pass 1: Light 视角 ====== */}
        <g>
          <rect x={25} y={65} width={350} height={180} fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" rx="8" />
          <rect x={25} y={65} width={350} height={24} fill="var(--accent)" fillOpacity="0.15" rx="8" />
          <text x={40} y={82} fill="var(--accent)" fontSize="11" fontWeight="700" fontFamily="system-ui">Pass 1：Light 视角（深度Pass）</text>

          {/* 光源 */}
          <circle cx={70} cy={140} r={16} fill="var(--warning)" fillOpacity="0.9" />
          <text x={70} y={144} textAnchor="middle" fill="var(--bg)" fontSize="9" fontWeight="700" fontFamily="system-ui">光</text>
          <text x={70} y={172} textAnchor="middle" fill="var(--warning)" fontSize="8" fontFamily="system-ui">Light</text>

          {/* 光线（从光源射向场景物体） */}
          {[-30, -15, 0, 15, 30].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = 70 + Math.cos(rad) * 70;
            const y2 = 140 + Math.sin(rad) * 70;
            return (
              <line key={i} x1={70 + Math.cos(rad) * 18} y1={140 + Math.sin(rad) * 18}
                x2={x2} y2={y2} stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" markerEnd="url(#sm-arrow-warn)" />
            );
          })}

          {/* 遮挡物（方块） */}
          <rect x={150} y={120} width={40} height={60} fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1.2" rx="2" />
          <text x={170} y={195} textAnchor="middle" fill="var(--accent)" fontSize="8" fontFamily="system-ui">遮挡物</text>

          {/* 地面 */}
          <rect x={150} y={200} width={200} height={8} fill="var(--text-secondary)" fillOpacity="0.3" rx="1" />
          <text x={250} y={220} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">地面/接收面</text>

          {/* ShadowMap 纹理示意（深度图） */}
          <g>
            <rect x={270} y={110} width={85} height={70} fill="var(--bg)" stroke="var(--danger)" strokeWidth="1.2" rx="4" />
            <text x={312} y={125} textAnchor="middle" fill="var(--danger)" fontSize="9" fontWeight="600" fontFamily="system-ui">ShadowMap</text>
            {/* 深度图灰度示意（确定性伪随机） */}
            {[0,1,2,3,4,5,6,7].map((vi) =>
              [0,1,2,3,4,5,6,7].map((hi) => {
                const isBlocker = vi < 4 && hi >= 2 && hi <= 5;
                const noise = ((vi * 7 + hi * 13) % 10) / 30;
                const gray = isBlocker ? 0.2 + vi * 0.05 : 0.55 + noise;
                return (
                  <rect key={`${vi}-${hi}`} x={278 + hi * 9} y={132 + vi * 6} width={8} height={5}
                    fill={`rgba(0,0,0,${gray.toFixed(2)})`} rx="0.5" />
                );
              })
            )}
            <text x={312} y={192} textAnchor="middle" fill="var(--text-secondary)" fontSize="7" fontFamily="system-ui">深度纹理（R16/R32）</text>
          </g>

          {/* 箭头：场景→ShadowMap */}
          <path d="M 200 140 L 265 140" stroke="var(--danger)" strokeWidth="1.5" fill="none" markerEnd="url(#sm-arrow-danger)" strokeDasharray="3 2" />
          <text x={232} y={133} textAnchor="middle" fill="var(--danger)" fontSize="7.5" fontWeight="600" fontFamily="system-ui">记录深度</text>
        </g>

        {/* ====== Pass 2: Camera 视角 ====== */}
        <g>
          <rect x={405} y={65} width={350} height={180} fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" strokeDasharray="4 3" rx="8" />
          <rect x={405} y={65} width={350} height={24} fill="var(--success)" fillOpacity="0.15" rx="8" />
          <text x={420} y={82} fill="var(--success)" fontSize="11" fontWeight="700" fontFamily="system-ui">Pass 2：Camera 视角（主渲染）</text>

          {/* 相机 */}
          <g>
            <rect x={440} y={130} width={24} height={18} fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1.2" rx="3" />
            <polygon points="464,133 480,139 480,139 464,145" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1" />
            <text x={452} y={168} textAnchor="middle" fill="var(--success)" fontSize="8" fontFamily="system-ui">Camera</text>
          </g>

          {/* 视线（从相机到场景） */}
          <path d="M 480 139 L 560 155" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" fill="none" markerEnd="url(#sm-arrow-success)" />

          {/* 场景（带阴影） */}
          <rect x={560} y={120} width={40} height={60} fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1.2" rx="2" />
          <rect x={560} y={200} width={160} height={8} fill="var(--text-secondary)" fillOpacity="0.3" rx="1" />
          {/* 阴影区域 */}
          <ellipse cx={580} cy={204} rx={35} ry={5} fill="var(--danger)" fillOpacity="0.3" />
          <text x={640} y={220} textAnchor="middle" fill="var(--success)" fontSize="8" fontFamily="system-ui">最终画面（带阴影）</text>

          {/* 深度比较示意 */}
          <g>
            <rect x={640} y={105} width={100} height={80} fill="var(--bg)" stroke="var(--warning)" strokeWidth="1.2" rx="4" />
            <text x={690} y={120} textAnchor="middle" fill="var(--warning)" fontSize="9" fontWeight="600" fontFamily="system-ui">深度比较</text>

            {/* 比较公式 */}
            <text x={690} y={138} textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontFamily="JetBrains Mono, monospace">if (Z_frag {">"} Z_map)</text>
            <text x={690} y={152} textAnchor="middle" fill="var(--danger)" fontSize="8" fontFamily="JetBrains Mono, monospace">  → 阴影中</text>
            <text x={690} y={166} textAnchor="middle" fill="var(--success)" fontSize="8" fontFamily="JetBrains Mono, monospace">else → 受光</text>

            {/* 小图示：两个深度值比较 */}
            <line x1={652} y1={177} x2={728} y2={177} stroke="var(--text-secondary)" strokeWidth="0.8" />
            <circle cx={665} cy={177} r={3} fill="var(--warning)" />
            <text x={665} y={173} textAnchor="middle" fill="var(--warning)" fontSize="6" fontFamily="system-ui">Zf</text>
            <circle cx={700} cy={177} r={3} fill="var(--danger)" />
            <text x={700} y={173} textAnchor="middle" fill="var(--danger)" fontSize="6" fontFamily="system-ui">Zm</text>
          </g>

          {/* Pass1→Pass2 大箭头 */}
          <path d="M 375 155 L 400 155" stroke="var(--text-primary)" strokeWidth="2" fill="none" markerEnd="url(#sm-arrow-text)" />
          <text x={387} y={148} textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontWeight="600" fontFamily="system-ui">ShadowMap</text>
        </g>

        {/* ====== 常见问题区 ====== */}
        <g>
          <rect x={25} y={265} width={360} height={95} fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="3 2" rx="6" />
          <text x={40} y={285} fill="var(--danger)" fontSize="11" fontWeight="700" fontFamily="system-ui">常见问题：Shadow Acne（阴影痤疮）</text>

          {/* Acne 示意图：锯齿阴影 */}
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 50 + i * 26;
            const isOffset = i % 2 === 0;
            return (
              <rect key={`acne-${i}`} x={x} y={isOffset ? 310 : 318} width={24} height={isOffset ? 8 : 8}
                fill={isOffset ? "var(--danger)" : "var(--bg)"} fillOpacity={isOffset ? 0.4 : 1} stroke="var(--danger)" strokeWidth="0.5" />
            );
          })}
          <text x={205} y={340} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">摩尔纹/条纹阴影·自阴影 Aliasing</text>
          <text x={205} y={353} textAnchor="middle" fill="var(--success)" fontSize="8" fontWeight="600" fontFamily="system-ui">解法：Shadow Bias（深度偏移）</text>
        </g>

        <g>
          <rect x={395} y={265} width={360} height={95} fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.8" strokeDasharray="3 2" rx="6" />
          <text x={410} y={285} fill="var(--warning)" fontSize="11" fontWeight="700" fontFamily="system-ui">常见问题：Peter Panning（彼得潘）</text>

          {/* Peter Panning 示意：物体和阴影分离 */}
          <rect x={460} y={300} width={36} height={25} fill="var(--warning)" fillOpacity="0.4" stroke="var(--warning)" strokeWidth="1" rx="2" />
          <ellipse cx={478} cy={335} rx={30} ry={4} fill="var(--danger)" fillOpacity="0.3" />
          {/* 分离间隙标注 */}
          <line x1={460} y1={325} x2={460} y2={331} stroke="var(--danger)" strokeWidth="1" strokeDasharray="2 1" />
          <line x1={496} y1={325} x2={496} y2={331} stroke="var(--danger)" strokeWidth="1" strokeDasharray="2 1" />
          <text x={478} y={329} textAnchor="middle" fill="var(--danger)" fontSize="7" fontFamily="system-ui">间隙</text>
          <text x={570} y={320} fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">Bias过大→阴影与物体分离</text>
          <text x={570} y={333} fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">物体像&quot;飞起来&quot;（彼得潘）</text>
          <text x={570} y={350} fill="var(--success)" fontSize="8" fontWeight="600" fontFamily="system-ui">解法：Normal Bias / 减小Bias</text>
        </g>

        {/* ====== 软阴影技术 ====== */}
        <g>
          <rect x={25} y={375} width={730} height={85} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />
          <text x={45} y={397} fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">软阴影技术</text>

          {[
            { name: "Hard Shadow", desc: "硬阴影·1次采样", color: "var(--danger)", shape: "rect" },
            { name: "PCF", desc: "固定核多次采样·均匀模糊", color: "var(--warning)", shape: "soft1" },
            { name: "PCSS", desc: "自适应核·Blocker Search", color: "var(--success)", shape: "soft2" },
            { name: "VSM/ESM", desc: "方差阴影/指数阴影·预滤波", color: "var(--accent)", shape: "soft3" },
            { name: "Ray Traced", desc: "光线追踪·最真实但贵", color: "var(--text-primary)", shape: "soft4" },
          ].map((t, i) => {
            const tx = 50 + i * 142;
            return (
              <g key={t.name}>
                <rect x={tx} y={408} width={132} height={42} fill={t.color} fillOpacity="0.06" stroke={t.color} strokeWidth="0.8" rx="4" />
                <text x={tx + 8} y={423} fill={t.color} fontSize="9" fontWeight="600" fontFamily="system-ui">{t.name}</text>
                <text x={tx + 8} y={436} fill="var(--text-secondary)" fontSize="7.5" fontFamily="system-ui">{t.desc}</text>

                {/* 阴影软硬示意 */}
                {t.shape === "rect" && (
                  <rect x={tx + 100} y={412} width={20} height={10} fill="var(--danger)" fillOpacity="0.5" rx="0" />
                )}
                {t.shape === "soft1" && (
                  <ellipse cx={tx + 110} cy={418} rx={12} ry={6} fill="var(--warning)" fillOpacity="0.4" />
                )}
                {t.shape === "soft2" && (
                  <>
                    <ellipse cx={tx + 110} cy={418} rx={14} ry={7} fill="var(--success)" fillOpacity="0.2" />
                    <ellipse cx={tx + 110} cy={418} rx={8} ry={4} fill="var(--success)" fillOpacity="0.4" />
                  </>
                )}
                {t.shape === "soft3" && (
                  <ellipse cx={tx + 110} cy={418} rx={13} ry={6} fill="var(--accent)" fillOpacity="0.3" filter="blur(1px)" />
                )}
                {t.shape === "soft4" && (
                  <ellipse cx={tx + 110} cy={418} rx={15} ry={7} fill="var(--text-primary)" fillOpacity="0.15" />
                )}
              </g>
            );
          })}
        </g>

        <defs>
          <marker id="sm-arrow-warn" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 5 2, 0 4" fill="var(--warning)" />
          </marker>
          <marker id="sm-arrow-danger" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill="var(--danger)" />
          </marker>
          <marker id="sm-arrow-success" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 5 2, 0 4" fill="var(--success)" />
          </marker>
          <marker id="sm-arrow-text" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--text-primary)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
