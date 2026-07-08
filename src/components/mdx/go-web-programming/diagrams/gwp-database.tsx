/**
 * <GwpDatabaseDiagram>: Go database/sql 连接池与查询流程。
 *
 * 展示 database/sql 的连接池复用、预编译语句、Scan 流程，
 * 以及 database driver 的适配器模式。
 * 纯静态 SVG，Server Component。viewBox 720x400。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function GwpDatabaseDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Go database/sql 连接池与查询流程图。展示连接池复用、预编译语句、Query/Scan 流程和 driver 适配器。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            database/sql 连接池与查询流程
          </text>

          {/* 应用层 */}
          <rect x={40} y={50} width={150} height={80} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x={115} y={74} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>应用代码</text>
          <text x={115} y={92} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={secondary}>db.Query()</text>
          <text x={115} y={108} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={secondary}>db.Exec()</text>
          <text x={115} y={124} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={secondary}>rows.Scan()</text>

          {/* database/sql 核心 */}
          <rect x={230} y={50} width={260} height={120} rx="8" fill={elevated} stroke={success} strokeWidth="1.5" />
          <text x={360} y={74} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>database/sql (标准库)</text>
          <line x1={245} y1={82} x2={475} y2={82} stroke={border} strokeWidth="1" strokeDasharray="3 2" />

          <rect x={245} y={92} width={100} height={28} rx="5" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={295} y={110} textAnchor="middle" fontSize="10" fill={success}>连接池</text>

          <rect x={355} y={92} width={100} height={28} rx="5" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={405} y={110} textAnchor="middle" fontSize="10" fill={success}>预编译 Stmt</text>

          <text x={360} y={136} textAnchor="middle" fontSize="10" fill={secondary}>MaxOpenConns / MaxIdleConns</text>
          <text x={360} y={152} textAnchor="middle" fontSize="10" fill={secondary}>ConnMaxLifetime</text>

          {/* driver 层 */}
          <rect x={530} y={50} width={150} height={80} rx="8" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
          <text x={605} y={74} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>Driver</text>
          <text x={605} y={92} textAnchor="middle" fontSize="10" fill={secondary}>github.com/go-sql-...</text>
          <text x={605} y={108} textAnchor="middle" fontSize="10" fill={secondary}>/mysql</text>
          <text x={605} y={124} textAnchor="middle" fontSize="10" fill={secondary}>/postgres</text>

          {/* 数据库 */}
          <rect x={530} y={150} width={150} height={60} rx="8" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1.5" />
          <text x={605} y={172} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>数据库</text>
          <text x={605} y={190} textAnchor="middle" fontSize="10" fill={secondary}>MySQL / PostgreSQL</text>
          <text x={605} y={204} textAnchor="middle" fontSize="10" fill={secondary}>SQLite</text>

          {/* 连接箭头 */}
          <line x1={190} y1={90} x2={225} y2={90} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-db-a1)" />
          <line x1={490} y1={90} x2={525} y2={90} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-db-a1)" />
          <line x1={605} y1={130} x2={605} y2={145} stroke={secondary} strokeWidth="1.5" markerEnd="url(#gwp-db-a1)" />

          {/* 查询流程 */}
          <rect x={40} y={200} width={640} height={170} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={360} y={222} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>查询执行流程</text>

          <rect x={60} y={238} width={130} height={50} rx="6" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" />
          <text x={125} y={258} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>1. 获取连接</text>
          <text x={125} y={274} textAnchor="middle" fontSize="9" fill={secondary}>从池中取空闲</text>

          <rect x={210} y={238} width={130} height={50} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={275} y={258} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>2. 预编译</text>
          <text x={275} y={274} textAnchor="middle" fontSize="9" fill={secondary}>PREPARE (stmt)</text>

          <rect x={360} y={238} width={130} height={50} rx="6" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1" />
          <text x={425} y={258} textAnchor="middle" fontSize="10" fontWeight="600" fill={warning}>3. 执行查询</text>
          <text x={425} y={274} textAnchor="middle" fontSize="9" fill={secondary}>Query / Exec</text>

          <rect x={510} y={238} width={130} height={50} rx="6" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1" />
          <text x={575} y={258} textAnchor="middle" fontSize="10" fontWeight="600" fill={danger}>4. Scan 结果</text>
          <text x={575} y={274} textAnchor="middle" fontSize="9" fill={secondary}>rows.Scan(&amp;v)</text>

          {/* 流程箭头 */}
          <line x1={190} y1={263} x2={205} y2={263} stroke={secondary} strokeWidth="1" markerEnd="url(#gwp-db-a2)" />
          <line x1={340} y1={263} x2={355} y2={263} stroke={secondary} strokeWidth="1" markerEnd="url(#gwp-db-a2)" />
          <line x1={490} y1={263} x2={505} y2={263} stroke={secondary} strokeWidth="1" markerEnd="url(#gwp-db-a2)" />

          {/* 注意事项 */}
          <text x={60} y={312} fontSize="10" fill={secondary}>关键点：</text>
          <text x={60} y={328} fontSize="10" fill={danger}>必须 rows.Close() — 否则连接泄漏</text>
          <text x={60} y={344} fontSize="10" fill={danger}>必须 defer rows.Close()</text>
          <text x={300} y={328} fontSize="10" fill={warning}>Scan 参数传指针</text>
          <text x={300} y={344} fontSize="10" fill={warning}>nil = NULL</text>
          <text x={460} y={328} fontSize="10" fill={success}>连接复用</text>
          <text x={460} y={344} fontSize="10" fill={success}>Stmt 缓存</text>

          <defs>
            <marker id="gwp-db-a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="gwp-db-a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        database/sql 通过 driver 适配多数据库，连接池复用连接，四步完成查询。
      </figcaption>
    </figure>
  );
}
