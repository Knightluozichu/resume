/**
 * <HcwAssemblyLanguageDiagram>：汇编语言入门图解——指令格式与寻址方式。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HcwAssemblyLanguageDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="汇编语言入门图解——指令格式与寻址方式"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            汇编语言：指令格式、寻址方式与抽象层级
          </text>

          {/* 上部：抽象层级 */}
          <rect x="30" y="48" width="680" height="100" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">语言抽象层级</text>

          {/* 高级语言 */}
          <rect x="60" y="80" width="180" height="50" rx="8" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">高级语言</text>
          <text x="150" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">C / Python / Java</text>
          <text x="150" y="128" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">平台无关 · 人类可读</text>

          <text x="270" y="110" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 汇编语言 */}
          <rect x="290" y="80" width="180" height="50" rx="8" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="380" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">汇编语言</text>
          <text x="380" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">MOV AX, 5</text>
          <text x="380" y="128" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">助记符 · 架构绑定</text>

          <text x="490" y="110" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 机器语言 */}
          <rect x="510" y="80" width="180" height="50" rx="8" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">机器语言</text>
          <text x="600" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">10111000 00000101</text>
          <text x="600" y="128" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">二进制 · CPU 直接执行</text>

          {/* 左下：指令格式 */}
          <rect x="30" y="164" width="330" height="150" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="184" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">汇编指令格式</text>

          <rect x="50" y="196" width="120" height="30" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="110" y="216" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)" fontFamily="monospace">MOV</text>
          <text x="110" y="238" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">助记符(opcode)</text>

          <text x="180" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">操作数1</text>
          <rect x="190" y="200" width="60" height="26" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="220" y="218" textAnchor="middle" fontSize="10" fill="var(--warning)" fontFamily="monospace">AX</text>

          <text x="260" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">,</text>

          <text x="280" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">操作数2</text>
          <rect x="290" y="200" width="50" height="26" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="315" y="218" textAnchor="middle" fontSize="10" fill="var(--danger)" fontFamily="monospace">5</text>

          <text x="50" y="260" textAnchor="start" fontSize="9" fill="var(--text-secondary)">MOV AX, 5 → 把立即数 5 存入寄存器 AX</text>
          <text x="50" y="276" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">操作数类型：立即数(常量) · 寄存器 · 内存地址</text>
          <text x="50" y="292" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">注意：MOV 不能直接做内存→内存传送</text>

          {/* 右下：寻址方式 */}
          <rect x="380" y="164" width="330" height="150" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="184" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">常见寻址方式</text>

          <text x="400" y="204" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">立即寻址</text>
          <text x="470" y="204" textAnchor="start" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">MOV AX, 5</text>
          <text x="580" y="204" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">赋常量</text>

          <text x="400" y="220" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">寄存器寻址</text>
          <text x="470" y="220" textAnchor="start" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">MOV AX, BX</text>
          <text x="580" y="220" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">最快</text>

          <text x="400" y="236" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">直接寻址</text>
          <text x="470" y="236" textAnchor="start" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">MOV AX, [2000H]</text>
          <text x="580" y="236" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">全局变量</text>

          <text x="400" y="252" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">间接寻址</text>
          <text x="470" y="252" textAnchor="start" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">MOV AX, [BX]</text>
          <text x="580" y="252" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">指针/遍历</text>

          <text x="400" y="268" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">基址寻址</text>
          <text x="470" y="268" textAnchor="start" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">MOV AX, [BX+8]</text>
          <text x="580" y="268" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">结构体成员</text>

          <text x="400" y="284" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">变址寻址</text>
          <text x="470" y="284" textAnchor="start" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">MOV AX, [SI+4]</text>
          <text x="580" y="284" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">数组元素</text>

          <text x="400" y="300" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">基址变址</text>
          <text x="470" y="300" textAnchor="start" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">MOV AX, [BX+SI]</text>
          <text x="580" y="300" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">二维数组</text>

          {/* 底部：应用场景 */}
          <rect x="30" y="328" width="680" height="110" rx="10" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="348" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">为什么需要汇编？实际应用场景</text>
          <text x="50" y="368" textAnchor="start" fontSize="9" fill="var(--text-secondary)">① 操作系统内核——bootloader、中断处理、上下文切换必须用汇编（直接控制 CPU 状态）</text>
          <text x="50" y="384" textAnchor="start" fontSize="9" fill="var(--text-secondary)">② 驱动开发——直接读写硬件寄存器和 I/O 端口</text>
          <text x="50" y="400" textAnchor="start" fontSize="9" fill="var(--text-secondary)">③ 性能关键路径——编解码热点、加密 SIMD 优化，手写汇编可快数倍</text>
          <text x="50" y="416" textAnchor="start" fontSize="9" fill="var(--text-secondary)">④ 逆向工程——分析恶意软件、漏洞挖掘需读反汇编</text>
          <text x="50" y="432" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">日常应用开发几乎不需要写汇编，但理解汇编能帮助写出更好的高级语言代码——栈帧/寄存器/内存布局</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        汇编语言入门图解——指令格式（助记符+操作数）、七种寻址方式、抽象层级与应用场景
      </figcaption>
    </figure>
  );
}
