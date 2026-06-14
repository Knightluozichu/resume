/**
 * <AccessInheritanceTable>：C++ public/protected/private 继承下的成员访问级别变化表。
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function AccessInheritanceTable() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const danger = "rgb(229,103,92)";

  const w = 720;
  const h = 440;
  const rowH = 48;

  const colX = [30, 165, 395, 575];
  const colW = [120, 215, 165, 130];
  const headers = ["Inheritance", "Base public →", "Base protected →", "Base private →"];

  const rows = [
    { label: "public", colors: [good, good, secondary], access: ["public", "protected", "inaccessible"] },
    { label: "protected", colors: [warn, warn, secondary], access: ["protected", "protected", "inaccessible"] },
    { label: "private", colors: [danger, danger, secondary], access: ["private", "private", "inaccessible"] },
  ];

  const accessColors: Record<string, string> = { public: good, protected: warn, private: danger, inaccessible: secondary };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ public/protected/private inheritance access level changes"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            Inheritance Type vs Member Access Levels
          </text>
          <text x={w / 2} y={42} fontSize={10} fill={secondary} textAnchor="middle">
            Base private members are NEVER directly accessible to derived classes
          </text>

          {/* Headers */}
          {headers.map((h, i) => (
            <g key={`h-${i}`}>
              <rect x={colX[i]} y={56} width={colW[i]} height={48} rx={4} fill={accent} opacity={0.08} stroke={border} strokeWidth={1} />
              <text x={colX[i] + colW[i] / 2} y={78} fontSize="10" fontWeight="600" fill={primary} textAnchor="middle">{h}</text>
            </g>
          ))}

          {/* Rows */}
          {rows.map((row, ri) => {
            const y = 112 + ri * rowH;
            return (
              <g key={`row-${ri}`}>
                <rect x={colX[0]} y={y} width={colW[0] + colW[1] + colW[2] + colW[3]} height={rowH} rx={4}
                  fill={ri % 2 === 0 ? elevated : bg} stroke={border} strokeWidth={0.5} />

                <text x={colX[0] + colW[0] / 2} y={y + 28} fontSize="11" fontWeight="700" fill={accent} textAnchor="middle">
                  {row.label} inherits
                </text>

                {row.access.map((acc, ai) => {
                  const accColor = accessColors[acc] || secondary;
                  const isBlocked = acc === "inaccessible";
                  return (
                    <g key={`cell-${ri}-${ai}`}>
                      <rect x={colX[ai + 1] + 6} y={y + 8} width={colW[ai + 1] - 12} height={rowH - 16} rx={4}
                        fill={accColor} opacity={0.08} stroke={accColor} strokeWidth={1} />
                      <text x={colX[ai + 1] + colW[ai + 1] / 2} y={y + 28} fontSize="10"
                        fontWeight="600" fill={accColor} textAnchor="middle"
                        fontFamily={isBlocked ? undefined : "monospace"}>
                        {isBlocked ? "BLOCKED" : acc}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Three rules */}
          <rect x={30} y={270} width={660} height={152} rx={8} fill={bg} stroke={accent} strokeWidth={1.5} />
          <text x={360} y={296} fontSize="13" fontWeight={700} fill={accent} textAnchor="middle">
            Three Golden Rules for Access Control
          </text>

          <text x={60} y={320} fontSize="10" fill={primary}>
            1. <tspan fontWeight="700" fill={good}>public inheritance</tspan> (most common): base public → public, base protected → protected. Expresses IS-A.
          </text>
          <text x={70} y={336} fontSize="9" fill={secondary}>User code can access inherited public members through derived objects directly.</text>

          <text x={60} y={356} fontSize="10" fill={primary}>
            2. <tspan fontWeight="700" fill={warn}>protected inheritance</tspan>: base public + protected → derived protected. Rarely used.
          </text>
          <text x={70} y={372} fontSize="9" fill={secondary}>Derived class users see nothing inherited. Only further derived classes can access.</text>

          <text x={60} y={392} fontSize="10" fill={primary}>
            3. <tspan fontWeight="700" fill={danger}>private inheritance</tspan>: base public + protected → derived private. "Implementation inheritance" - almost never use.
          </text>
          <text x={70} y={408} fontSize="9" fill={secondary}>Prefer composition (HAS-A as a member) over private inheritance in virtually all cases.</text>

          <text x={360} y={426} fontSize="9" fill={secondary} textAnchor="middle">
            struct defaults to public inheritance | class defaults to private inheritance
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>public inheritance</strong> preserves access levels - IS-A relationship, most common.
        <strong>protected/private inheritance</strong> reduces visibility. Base <code>private</code> members are never directly accessible to derived classes regardless of inheritance type.
      </figcaption>
    </figure>
  );
}
