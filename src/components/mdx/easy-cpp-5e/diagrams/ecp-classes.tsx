/**
 * <EcpClassesDiagram>：C++ 类与对象结构图（easy-cpp-5e 类与对象章）。
 *
 * 左侧展示类的内部结构：public / private 分区，成员变量与成员函数。
 * 右侧展示对象内存布局：每个对象独立的成员变量 + 共享的成员函数。
 * 底部总结构造/析构函数与访问控制的要点。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function EcpClassesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 类与对象结构图。左侧展示 Student 类的内部结构：public 分区含构造函数 Student、成员函数 isPass 和 display；private 分区含成员变量 name 和 score。右侧展示两个对象 s1 和 s2 的内存布局：各对象有独立的成员变量值，但共享同一套成员函数。底部总结构造/析构函数与访问控制要点。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 类与对象：图纸与实例
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            左：类定义（图纸） · 右：对象内存（实例）
          </text>

          {/* ===== 左侧：类定义 ===== */}
          <rect x="40" y="76" width="300" height="260" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <rect x="40" y="76" width="300" height="28" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="190" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">class Student</text>

          {/* public 分区 */}
          <rect x="56" y="116" width="268" height="108" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeDasharray="4 2" />
          <text x="68" y="134" fontSize="11" fontWeight="700" fill="var(--success)">public:</text>
          <text x="76" y="152" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">Student(string, int);  // 构造</text>
          <text x="76" y="170" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">~Student();           // 析构</text>
          <text x="76" y="188" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">bool isPass();        // 成员函数</text>
          <text x="76" y="206" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">void display();       // 成员函数</text>

          {/* private 分区 */}
          <rect x="56" y="232" width="268" height="60" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeDasharray="4 2" />
          <text x="68" y="250" fontSize="11" fontWeight="700" fill="var(--danger)">private:</text>
          <text x="76" y="268" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">string name;  int score;</text>
          <text x="76" y="284" fontSize="10" fill="var(--text-secondary)">外部不能直接访问，通过函数操作</text>

          {/* 箭头：类 → 对象 */}
          <line x1="340" y1="200" x2="380" y2="200" stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.5" />
          <polygon points="376,196 376,204 384,200" fill="var(--accent)" fillOpacity="0.5" />
          <text x="360" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实例化</text>

          {/* ===== 右侧：对象内存 ===== */}
          {/* 对象 s1 */}
          <rect x="390" y="92" width="290" height="100" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.2" />
          <text x="406" y="112" fontSize="12" fontWeight="700" fill="var(--success)">对象 s1</text>
          <rect x="406" y="120" width="258" height="24" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" />
          <text x="416" y="136" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">name = "张三"</text>
          <rect x="406" y="148" width="258" height="24" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" />
          <text x="416" y="164" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">score = 85</text>
          <text x="535" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">独立内存 ↑</text>

          {/* 对象 s2 */}
          <rect x="390" y="204" width="290" height="100" rx="8" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="406" y="224" fontSize="12" fontWeight="700" fill="var(--warning)">对象 s2</text>
          <rect x="406" y="232" width="258" height="24" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="416" y="248" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">name = "李四"</text>
          <rect x="406" y="260" width="258" height="24" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="416" y="276" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">score = 50</text>
          <text x="535" y="294" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">独立内存 ↑</text>

          {/* 共享函数标注 */}
          <rect x="390" y="312" width="290" height="24" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="535" y="328" textAnchor="middle" fontSize="10" fill="var(--accent)">s1、s2 共享同一套成员函数代码</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="40" y="352" width={VIEW_W - 80} height="48" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            构造函数：对象创建时初始化 · 析构函数：对象销毁时清理资源
          </text>
          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            public 暴露接口 · private 隐藏实现 · protected 供子类访问——封装的核心
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类是图纸，对象是实例。每个对象有独立的成员变量值，但共享同一套成员函数。构造函数初始化对象，析构函数清理资源，访问控制实现封装。
      </figcaption>
    </figure>
  );
}
