/**
 * <KdgTestingDiagram>：测试与最佳实践核心概念图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KdgTestingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin测试与最佳实践核心概念图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            测试与最佳实践
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            JUnit 5 / MockK / 协程测试 / Kotest / 性能与互操作
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 左列：JUnit 测试 */}
          <rect x="50" y="80" width="320" height="130" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">JUnit 单元测试</text>
          <text x="65" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">class CalculatorTest &lbrace;</text>
          <text x="65" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  @Test</text>
          <text x="65" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  fun `add two numbers`() &lbrace;</text>
          <text x="65" y="178" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">    assertEquals(5, 2 + 3)</text>
          <text x="65" y="196" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  &rbrace;</text>

          {/* 右列：MockK 模拟 */}
          <rect x="390" y="80" width="320" height="130" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">MockK 模拟框架</text>
          <text x="405" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val repo = mockk&lt;UserRepo&gt;()</text>
          <text x="405" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">every &lbrace; repo.findById(1) &rbrace; returns</text>
          <text x="405" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  User("Alice")</text>
          <text x="405" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">verify &lbrace; repo.findById(1) &rbrace;</text>
          <text x="405" y="200" fontSize="10" fill="var(--text-tertiary)">every/verify/verifyAll DSL 式 API</text>

          {/* 左列：协程测试 */}
          <rect x="50" y="230" width="320" height="130" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">协程测试</text>
          <text x="65" y="274" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">@Test</text>
          <text x="65" y="292" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun test() = runTest &lbrace;</text>
          <text x="65" y="310" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  val result = fetchData()</text>
          <text x="65" y="328" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  assertEquals("ok", result)</text>
          <text x="65" y="346" fontSize="10" fill="var(--text-tertiary)">runTest 跳过 delay，虚拟时间</text>

          {/* 右列：最佳实践 */}
          <rect x="390" y="230" width="320" height="130" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">代码规范最佳实践</text>
          <text x="405" y="274" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">- 优先 val，避免可变状态</text>
          <text x="405" y="292" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">- 用 data class 代替 POJO</text>
          <text x="405" y="310" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">- 善用 when + sealed 穷尽分支</text>
          <text x="405" y="328" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">- 协程替代回调与线程池</text>
          <text x="405" y="346" fontSize="10" fill="var(--text-tertiary)">用惯用 Kotlin，而非翻译 Java</text>

          {/* 底部：测试金字塔 */}
          <rect x="50" y="380" width="660" height="100" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="380" y="402" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">测试金字塔</text>
          <text x="65" y="424" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">单元测试（70%）—— JUnit + MockK，快、多、隔离</text>
          <text x="65" y="442" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">集成测试（20%）—— 协程 + Room/Repository，验证组件协作</text>
          <text x="65" y="460" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">UI 测试（10%）—— Espresso/Compose Test，端到端验证</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin测试与最佳实践——JUnit单元测试、MockK模拟、协程测试runTest、代码规范与测试金字塔
      </figcaption>
    </figure>
  );
}
