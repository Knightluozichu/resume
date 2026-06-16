/**
 * <MultipleInheritanceDiagram step={1|2}>：C++ 多重继承与虚继承内存布局对比图。
 *
 * Step 1: 普通多重继承——数据重复——SmartPanel 继承自 Display 和 Sensor，
 *         Display 和 Sensor 各自继承自 Device，
 *         SmartPanel 内部有两份 Device 子对象（歧义）
 * Step 2: 虚继承——虚基类共享——虚继承只保留一份 Device 子对象
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface MultipleInheritanceDiagramProps {
  step?: 1 | 2;
}

export function MultipleInheritanceDiagram({ step = 1 }: MultipleInheritanceDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const blue = "rgb(99,179,237)";
  const orange = "rgb(237,137,99)";
  const green = "rgb(63,185,127)";
  const red = "rgb(229,103,92)";

  const w = 880;
  const h = 520;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 多重继承内存布局对比——普通 MI（两份基类子对象）vs 虚继承（共享唯一基类子对象）"
          className="mx-auto block h-auto w-full max-w-[880px]"
        >
          <text x={w / 2} y={24} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            {step === 1
              ? "普通多重继承——SmartPanel 内部有两份 Device（数据重复）"
              : "虚继承——SmartPanel 内部只有一份 Device（共享唯一子对象）"}
          </text>

          {/* ===== Left half: Regular MI ===== */}
          <g>
            <text x={200} y={54} fontSize={12} fontWeight={600} fill={secondary} textAnchor="middle">
              {step === 1 ? "菱形继承问题" : "普通 MI（对比参考）"}
            </text>

            {/* Top: Device */}
            <rect x={140} y={66} width={120} height={36} rx={6} fill={accent + "15"} stroke={accent} strokeWidth={1.5} />
            <text x={200} y={89} fontSize={11} fontWeight={600} fill={accent} textAnchor="middle" fontFamily="monospace">
              Device
            </text>

            {/* Lines down */}
            <line x1={170} y1={102} x2={120} y2={140} stroke={border} strokeWidth={1} opacity={0.7} />
            <line x1={230} y1={102} x2={280} y2={140} stroke={border} strokeWidth={1} opacity={0.7} />

            {/* Left branch: Display */}
            <rect x={80} y={140} width={80} height={32} rx={6} fill={blue + "12"} stroke={blue} strokeWidth={1} />
            <text x={120} y={160} fontSize={10} fontWeight={600} fill={blue} textAnchor="middle" fontFamily="monospace">
              Display
            </text>

            {/* Right branch: Sensor */}
            <rect x={240} y={140} width={80} height={32} rx={6} fill={orange + "12"} stroke={orange} strokeWidth={1} />
            <text x={280} y={160} fontSize={10} fontWeight={600} fill={orange} textAnchor="middle" fontFamily="monospace">
              Sensor
            </text>

            {/* Lines down to SmartPanel */}
            <line x1={120} y1={172} x2={155} y2={210} stroke={border} strokeWidth={1} opacity={0.7} />
            <line x1={280} y1={172} x2={245} y2={210} stroke={border} strokeWidth={1} opacity={0.7} />

            {/* Bottom: SmartPanel */}
            <rect x={120} y={210} width={160} height={36} rx={6} fill={green + "15"} stroke={green} strokeWidth={1.5} />
            <text x={200} y={233} fontSize={11} fontWeight={600} fill={green} textAnchor="middle" fontFamily="monospace">
              SmartPanel
            </text>

            {/* Memory layout diagram */}
            <text x={200} y={268} fontSize={10} fill={secondary} textAnchor="middle">
              SmartPanel 内存布局（对象内部）
            </text>

            <rect x={100} y={278} width={200} height={126} rx={6} fill={bg} stroke={border} strokeWidth={1} />

            {step === 1 && (
              <>
                {/* Two copies of Device */}
                <rect x={110} y={286} width={180} height={24} rx={4} fill={accent + "20"} stroke={accent} strokeWidth={1} />
                <text x={200} y={302} fontSize={9} fill={accent} textAnchor="middle" fontFamily="monospace">
                  Device（从 Display 来）
                </text>
                <rect x={110} y={316} width={180} height={24} rx={4} fill={blue + "15"} stroke={blue} strokeWidth={0.5} />
                <text x={200} y={332} fontSize={9} fill={blue} textAnchor="middle" fontFamily="monospace">
                  Display 数据
                </text>
                <rect x={110} y={346} width={180} height={24} rx={4} fill={accent + "20"} stroke={accent} strokeWidth={1} />
                <text x={200} y={362} fontSize={9} fill={accent} textAnchor="middle" fontFamily="monospace">
                  Device（从 Sensor 来）
                </text>
                <rect x={110} y={376} width={180} height={24} rx={4} fill={orange + "15"} stroke={orange} strokeWidth={0.5} />
                <text x={200} y={392} fontSize={9} fill={orange} textAnchor="middle" fontFamily="monospace">
                  Sensor 数据
                </text>

                {/* Warning text */}
                <rect x={50} y={406} width={300} height={40} rx={4} fill={red + "10"} stroke={red} strokeWidth={0.5} />
                <text x={200} y={424} fontSize={9} fill={red} textAnchor="middle" fontFamily="monospace">
                  ⚠ 有两份 Device 子对象！
                </text>
                <text x={200} y={440} fontSize={9} fill={red} textAnchor="middle" fontFamily="monospace">
                  panel.serial ← 歧义！用 panel.Display::serial 消除
                </text>
              </>
            )}

            {step === 2 && (
              <>
                <rect x={110} y={286} width={180} height={24} rx={4} fill={accent + "20"} stroke={accent} strokeWidth={0.5} />
                <text x={200} y={302} fontSize={9} fill={accent} textAnchor="middle" fontFamily="monospace">
                  Device（唯一一份）
                </text>
                <rect x={110} y={316} width={180} height={24} rx={4} fill={blue + "15"} stroke={blue} strokeWidth={0.5} />
                <text x={200} y={332} fontSize={9} fill={blue} textAnchor="middle" fontFamily="monospace">
                  Display 特有数据
                </text>
                <rect x={110} y={346} width={180} height={24} rx={4} fill={orange + "15"} stroke={orange} strokeWidth={0.5} />
                <text x={200} y={362} fontSize={9} fill={orange} textAnchor="middle" fontFamily="monospace">
                  Sensor 特有数据
                </text>
                <rect x={110} y={376} width={180} height={24} rx={4} fill={green + "15"} stroke={green} strokeWidth={0.5} />
                <text x={200} y={392} fontSize={9} fill={green} textAnchor="middle" fontFamily="monospace">
                  SmartPanel 特有数据
                </text>

                <rect x={50} y={406} width={300} height={30} rx={4} fill={green + "08"} stroke={green} strokeWidth={0.5} />
                <text x={200} y={426} fontSize={9} fill={green} textAnchor="middle" fontFamily="monospace">
                  ✓ 共享一份 Device——panel.serial 无歧义
                </text>
              </>
            )}
          </g>

          {/* ===== Right half: Virtual inheritance ===== */}
          <g>
            <text x={680} y={54} fontSize={12} fontWeight={600} fill={secondary} textAnchor="middle">
              {step === 1 ? "虚继承（对比参考）" : "虚继承——正确的菱形继承方案"}
            </text>

            {/* Top: Device (virtual base) */}
            <rect x={620} y={66} width={120} height={36} rx={6} fill={accent + "20"} stroke={accent} strokeWidth={2} />
            <text x={680} y={89} fontSize={11} fontWeight={700} fill={accent} textAnchor="middle" fontFamily="monospace">
              Device
            </text>
            <text x={680} y={98} fontSize={8} fill={accent} textAnchor="middle" fontFamily="monospace">
              （虚基类）
            </text>

            {/* Lines down (dashed for virtual) */}
            <line x1={650} y1={102} x2={600} y2={140} stroke={accent} strokeWidth={1} strokeDasharray="5,3" opacity={0.6} />
            <line x1={710} y1={102} x2={760} y2={140} stroke={accent} strokeWidth={1} strokeDasharray="5,3" opacity={0.6} />

            {/* Left branch: Display (virtual) */}
            <rect x={560} y={140} width={80} height={32} rx={6} fill={blue + "15"} stroke={blue} strokeWidth={1} />
            <text x={600} y={160} fontSize={10} fontWeight={600} fill={blue} textAnchor="middle" fontFamily="monospace">
              Display
            </text>
            {step === 1 && (
              <text x={600} y={170} fontSize={7} fill={blue} textAnchor="middle" fontFamily="monospace">
                : virtual Device
              </text>
            )}
            {step === 2 && (
              <>
                <text x={600} y={170} fontSize={7} fill={blue} textAnchor="middle" fontFamily="monospace">
                  : virtual Device
                </text>
              </>
            )}

            {/* Right branch: Sensor (virtual) */}
            <rect x={720} y={140} width={80} height={32} rx={6} fill={orange + "15"} stroke={orange} strokeWidth={1} />
            <text x={760} y={160} fontSize={10} fontWeight={600} fill={orange} textAnchor="middle" fontFamily="monospace">
              Sensor
            </text>
            {step === 1 && (
              <text x={760} y={170} fontSize={7} fill={orange} textAnchor="middle" fontFamily="monospace">
                : virtual Device
              </text>
            )}
            {step === 2 && (
              <text x={760} y={170} fontSize={7} fill={orange} textAnchor="middle" fontFamily="monospace">
                : virtual Device
              </text>
            )}

            {/* Lines down to SmartPanel */}
            <line x1={600} y1={172} x2={635} y2={210} stroke={border} strokeWidth={1} opacity={0.7} />
            <line x1={760} y1={172} x2={725} y2={210} stroke={border} strokeWidth={1} opacity={0.7} />

            {/* Bottom: SmartPanel */}
            <rect x={600} y={210} width={160} height={36} rx={6} fill={green + "18"} stroke={green} strokeWidth={1.5} />
            <text x={680} y={233} fontSize={11} fontWeight={600} fill={green} textAnchor="middle" fontFamily="monospace">
              SmartPanel
            </text>

            {/* Virtual VTable pointer annotation */}
            <text x={680} y={260} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
              虚基类通过指针间接访问
            </text>

            {/* Memory layout (virtual) */}
            <text x={680} y={272} fontSize={10} fill={secondary} textAnchor="middle">
              SmartPanel 内存布局（虚继承）
            </text>

            <rect x={580} y={282} width={200} height={110} rx={6} fill={bg} stroke={green} strokeWidth={1} />

            <rect x={590} y={290} width={180} height={20} rx={4} fill={blue + "15"} stroke={blue} strokeWidth={0.5} />
            <text x={680} y={305} fontSize={9} fill={blue} textAnchor="middle" fontFamily="monospace">
              Display 数据 + vptr→Device
            </text>
            <rect x={590} y={316} width={180} height={20} rx={4} fill={orange + "15"} stroke={orange} strokeWidth={0.5} />
            <text x={680} y={331} fontSize={9} fill={orange} textAnchor="middle" fontFamily="monospace">
              Sensor 数据 + vptr→Device
            </text>
            <rect x={590} y={342} width={180} height={20} rx={4} fill={green + "15"} stroke={green} strokeWidth={0.5} />
            <text x={680} y={357} fontSize={9} fill={green} textAnchor="middle" fontFamily="monospace">
              SmartPanel 特有数据
            </text>
            <rect x={590} y={368} width={180} height={20} rx={4} fill={accent + "25"} stroke={accent} strokeWidth={1} />
            <text x={680} y={383} fontSize={9} fill={accent} textAnchor="middle" fontFamily="monospace">
              Device（共享的唯一一份）
            </text>

            {/* Note */}
            <rect x={530} y={406} width={300} height={50} rx={4} fill={accent + "06"} stroke={border} strokeWidth={0.5} />
            <text x={680} y={424} fontSize={9} fill={accent} textAnchor="middle">
              构造：从 Device 开始，沿虚继承链
            </text>
            <text x={680} y={440} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
              最底层的派生类负责直接构造虚基类
            </text>
          </g>

          {/* Center divider */}
          <line x1={440} y1={52} x2={440} y2={460} stroke={border} strokeWidth={1} strokeDasharray="6,4" opacity={0.4} />

          {/* Step indicator */}
          <rect x={w / 2 - 220} y={h - 26} width={440} height={20} rx={6} fill={accent + "06"} stroke={border} strokeWidth={0.5} />
          <text x={w / 2} y={h - 10} fontSize={10} fill={accent} textAnchor="middle" fontFamily="monospace">
            {step === 1
              ? "① 普通 MI——每继承路径各自拷贝一份基类子对象 → 数据重复 + 歧义"
              : "② 虚继承——所有继承路径共享唯一一份虚基类子对象 → 无歧义、无浪费"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1
          ? "第一步：普通多重继承下，Display 和 Sensor 各自包含一份 Device 子对象，SmartPanel 从两条路径各继承一份 → 两份 Device（浪费内存 + 名字歧义）。"
          : "第二步：虚继承（关键字 virtual）让所有派生类共享唯一的虚基类子对象。最底层派生类（SmartPanel）负责直接构造虚基类。每个类内部通过 vptr 指针间接定位 Device——比普通继承稍慢，但消除了歧义和浪费。"}
      </figcaption>
    </figure>
  );
}
