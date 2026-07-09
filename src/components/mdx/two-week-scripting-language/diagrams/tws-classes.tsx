"use client";

export function TwsClassesDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="类定义继承与方法分发">
      <defs>
        <linearGradient id="tws-cl-cls" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tws-cl-inh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tws-cl-disp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tws-cl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">类与继承：定义 / 继承 / 方法分发</text>

      {/* 类定义 */}
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">类定义</text>

      <rect x="40" y="72" width="340" height="150" rx="10" fill="url(#tws-cl-cls)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="95" fontSize="11" fill="#475569" fontFamily="monospace">class Point(x, y) &lbrace;</text>
      <text x="60" y="112" fontSize="11" fill="#475569" fontFamily="monospace">  def move(dx, dy) &lbrace;</text>
      <text x="60" y="129" fontSize="11" fill="#475569" fontFamily="monospace">    x = x + dx</text>
      <text x="60" y="146" fontSize="11" fill="#475569" fontFamily="monospace">    y = y + dy</text>
      <text x="60" y="163" fontSize="11" fill="#475569" fontFamily="monospace">  &rbrace;</text>
      <text x="60" y="180" fontSize="11" fill="#475569" fontFamily="monospace">  def toString() &lbrace; ... &rbrace;</text>
      <text x="60" y="197" fontSize="11" fill="#475569" fontFamily="monospace">&rbrace;</text>
      <text x="60" y="216" fontSize="11" fill="#1e40af">构造参数 x,y 自动成为字段</text>

      {/* 继承 */}
      <text x="600" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">类继承（extends）</text>

      <rect x="420" y="72" width="340" height="150" rx="10" fill="url(#tws-cl-inh)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="440" y="95" fontSize="11" fill="#475569" fontFamily="monospace">class Point3D(x, y, z)</text>
      <text x="440" y="112" fontSize="11" fill="#475569" fontFamily="monospace">  extends Point(x, y) &lbrace;</text>
      <text x="440" y="129" fontSize="11" fill="#475569" fontFamily="monospace">  def moveZ(dz) &lbrace;</text>
      <text x="440" y="146" fontSize="11" fill="#475569" fontFamily="monospace">    z = z + dz</text>
      <text x="440" y="163" fontSize="11" fill="#475569" fontFamily="monospace">  &rbrace;</text>
      <text x="440" y="180" fontSize="11" fill="#475569" fontFamily="monospace">&rbrace;</text>
      <text x="440" y="200" fontSize="11" fill="#5b21b6">Point3D 继承 Point 的 move 方法</text>
      <text x="440" y="216" fontSize="11" fill="#5b21b6">并新增 moveZ 方法</text>

      {/* 方法分发流程 */}
      <text x="400" y="250" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">方法调用与分发流程</text>

      <rect x="60" y="265" width="160" height="36" rx="8" fill="url(#tws-cl-disp)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="140" y="288" textAnchor="middle" fontSize="11" fill="#065f46">p.move(1, 2)</text>
      <path d="M220 283 L245 283" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-cl-arrow)" />

      <rect x="245" y="265" width="160" height="36" rx="8" fill="url(#tws-cl-disp)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="325" y="288" textAnchor="middle" fontSize="11" fill="#065f46">查找方法 move</text>
      <path d="M405 283 L430 283" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-cl-arrow)" />

      <rect x="430" y="265" width="160" height="36" rx="8" fill="url(#tws-cl-disp)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="510" y="288" textAnchor="middle" fontSize="11" fill="#065f46">绑定 this = p</text>
      <path d="M590 283 L615 283" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-cl-arrow)" />

      <rect x="615" y="265" width="125" height="36" rx="8" fill="url(#tws-cl-disp)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="677" y="288" textAnchor="middle" fontSize="11" fill="#065f46">执行方法体</text>

      {/* StoneObject 结构 */}
      <text x="400" y="325" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">StoneObject 内部结构</text>

      <rect x="100" y="340" width="600" height="50" rx="10" fill="url(#tws-cl-cls)" opacity="0.10" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="362" fontSize="12" fontWeight="600" fill="#1e40af">StoneObject（实例对象）</text>
      <text x="130" y="380" fontSize="11" fill="#475569" fontFamily="monospace">classInfo: StoneClassInfo</text>
      <text x="400" y="380" fontSize="11" fill="#475569" fontFamily="monospace">fields: Environment（字段绑定）</text>

      {/* 方法查找链 */}
      <text x="400" y="415" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">方法查找链（从子类到父类）</text>

      <rect x="80" y="430" width="200" height="36" rx="8" fill="url(#tws-cl-inh)" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="180" y="453" textAnchor="middle" fontSize="11" fill="#5b21b6">Point3D 类定义查找</text>

      <path d="M280 448 L310 448" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-cl-arrow)" />
      <text x="295" y="440" textAnchor="middle" fontSize="9" fill="#64748b">未找到</text>

      <rect x="310" y="430" width="200" height="36" rx="8" fill="url(#tws-cl-cls)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="410" y="453" textAnchor="middle" fontSize="11" fill="#1e40af">Point 父类查找</text>

      <path d="M510 448 L540 448" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-cl-arrow)" />
      <text x="525" y="440" textAnchor="middle" fontSize="9" fill="#64748b">未找到</text>

      <rect x="540" y="430" width="200" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="640" y="453" textAnchor="middle" fontSize="11" fill="#475569">报错：方法不存在</text>

      {/* this 绑定 */}
      <rect x="40" y="490" width="340" height="50" rx="8" fill="#fef3c7" opacity="0.4" stroke="#d97706" strokeWidth="1" />
      <text x="60" y="510" fontSize="12" fontWeight="600" fill="#92400e">this 绑定</text>
      <text x="60" y="528" fontSize="11" fill="#475569">方法执行时 this 指向调用者对象，可访问其字段和方法</text>

      {/* super 调用 */}
      <rect x="420" y="490" width="340" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="440" y="510" fontSize="12" fontWeight="600" fill="#334155">super 调用</text>
      <text x="440" y="528" fontSize="11" fill="#475569">super.method() 从父类开始查找方法，跳过当前类</text>
    </svg>
  );
}
