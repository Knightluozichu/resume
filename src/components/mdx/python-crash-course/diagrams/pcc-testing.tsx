/**
 * <PccTestingDiagram>：Python 测试代码——unittest 与 pytest。
 *
 * 测试金字塔、unittest 结构、测试函数命名约定、断言方法对照。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
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

export function PccTestingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python 测试代码：测试函数命名以 test_ 开头，unittest 提供 assertEqual/assertTrue 等断言方法，测试覆盖率衡量被测代码比例。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            测试代码：让程序可靠运行
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            test_ 命名约定 · assert 断言 · 覆盖率衡量
          </text>

          {/* 左侧：测试函数结构 */}
          <text x={170} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            测试函数结构
          </text>

          <rect x={40} y={92} width={280} height={28} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={52} y={110} fontSize="12" fontWeight="600" fill={accent}>def test_</text>
          <text x={120} y={110} fontSize="11" fill={secondary}>函数名必须以 test_ 开头</text>

          <rect x={40} y={128} width={280} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={146} fontSize="11" fill={primary}>result = function(args)</text>
          <text x={220} y={146} fontSize="11" fill={secondary}>执行被测代码</text>

          <rect x={40} y={164} width={280} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={52} y={182} fontSize="12" fontWeight="600" fill={success}>assert</text>
          <text x={100} y={182} fontSize="11" fill={secondary}>断言结果是否符合预期</text>

          {/* 断言方法对照 */}
          <text x={170} y={212} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            常用断言
          </text>

          <rect x={40} y={224} width={280} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={240} fontSize="11" fill={primary}>assertEqual(a, b)</text>
          <text x={200} y={240} fontSize="11" fill={secondary}>a == b</text>

          <rect x={40} y={254} width={280} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={270} fontSize="11" fill={primary}>assertTrue(x)</text>
          <text x={200} y={270} fontSize="11" fill={secondary}>x is True</text>

          <rect x={40} y={284} width={280} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={300} fontSize="11" fill={primary}>assertIn(item, list)</text>
          <text x={200} y={300} fontSize="11" fill={secondary}>item in list</text>

          <rect x={40} y={314} width={280} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={330} fontSize="11" fill={primary}>assertRaises(Error)</text>
          <text x={200} y={330} fontSize="11" fill={secondary}>期望抛出异常</text>

          <rect x={40} y={344} width={280} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={360} fontSize="11" fill={primary}>assertAlmostEqual(a,b)</text>
          <text x={200} y={360} fontSize="11" fill={secondary}>浮点数近似相等</text>

          {/* 分隔线 */}
          <line x1={340} y1={70} x2={340} y2={380} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 右侧：测试流程 */}
          <text x={530} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            测试流程
          </text>

          {/* 步骤 */}
          <rect x={360} y={92} width={320} height={28} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={372} y={110} fontSize="12" fontWeight="600" fill={accent}>1. 编写函数</text>
          <text x={470} y={110} fontSize="11" fill={secondary}>实现功能逻辑</text>

          <line x1={520} y1={120} x2={520} y2={132} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-ts-arrow)" />

          <rect x={360} y={136} width={320} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={372} y={154} fontSize="12" fontWeight="600" fill={success}>2. 编写测试</text>
          <text x={470} y={154} fontSize="11" fill={secondary}>test_ 函数 + assert</text>

          <line x1={520} y1={164} x2={520} y2={176} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-ts-arrow)" />

          <rect x={360} y={180} width={320} height={28} rx="4" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" strokeOpacity="0.5" />
          <text x={372} y={198} fontSize="12" fontWeight="600" fill={warning}>3. 运行测试</text>
          <text x={470} y={198} fontSize="11" fill={secondary}>pytest / python -m unittest</text>

          <line x1={520} y1={208} x2={520} y2={220} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-ts-arrow)" />

          <rect x={360} y={224} width={320} height={28} rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" strokeOpacity="0.5" />
          <text x={372} y={242} fontSize="12" fontWeight="600" fill={danger}>4. 测试失败 → 修复</text>
          <text x={520} y={242} fontSize="11" fill={secondary}>回到步骤 1</text>

          <line x1={360} y1={252} x2={340} y2={252} stroke={secondary} strokeWidth="1.2" strokeDasharray="3 2" />
          <path d="M 340 252 Q 330 260 340 268" fill="none" stroke={secondary} strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#pcc-ts-arrow)" />

          <rect x={360} y={268} width={320} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={372} y={286} fontSize="12" fontWeight="600" fill={success}>5. 测试通过 → 完成</text>

          {/* 覆盖率说明 */}
          <line x1={360} y1={310} x2={680} y2={310} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={530} y={332} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>测试覆盖率</text>
          <text x={530} y={352} textAnchor="middle" fontSize="11" fill={secondary}>衡量测试执行了被测代码的多少行</text>
          <text x={530} y={372} textAnchor="middle" fontSize="11" fill={secondary}>pytest --cov → 生成覆盖率报告</text>

          <defs>
            <marker id="pcc-ts-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        测试函数以 test_ 命名，使用 assert 断言验证结果，覆盖率衡量测试充分性。
      </figcaption>
    </figure>
  );
}
