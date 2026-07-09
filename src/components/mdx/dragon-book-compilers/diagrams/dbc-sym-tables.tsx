"use client";

export function DbcSymTablesDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="符号表与语义分析：语法制导翻译">
      <defs>
        <linearGradient id="dbc-sym-sdt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dbc-sym-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dbc-sym-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">符号表与语义分析：语法制导翻译</text>

      {/* 语法制导翻译 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">语法制导翻译（SDT）= CFG + 属性</text>

      <rect x="30" y="72" width="240" height="90" rx="10" fill="url(#dbc-sym-sdt)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">SDD 语法制导定义</text>
      <text x="150" y="118" textAnchor="middle" fontSize="11" fill="#475569">每个文法符号绑定属性</text>
      <text x="150" y="138" textAnchor="middle" fontSize="11" fill="#475569">综合属性：自底向上求值</text>
      <text x="150" y="156" textAnchor="middle" fontSize="11" fill="#475569">继承属性：自顶向下求值</text>

      <rect x="290" y="72" width="240" height="90" rx="10" fill="url(#dbc-sym-sdt)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="410" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">SDT 语法制导翻译方案</text>
      <text x="410" y="118" textAnchor="middle" fontSize="11" fill="#475569">在产生式中嵌入语义动作</text>
      <text x="410" y="138" textAnchor="middle" fontSize="11" fill="#475569">&#123; action &#125; 附着在规则上</text>
      <text x="410" y="156" textAnchor="middle" fontSize="11" fill="#475569">L 属性：可单遍求值</text>

      <rect x="550" y="72" width="220" height="90" rx="10" fill="url(#dbc-sym-sdt)" opacity="0.28" stroke="#2563eb" strokeWidth="1.5" />
      <text x="660" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">依赖图</text>
      <text x="660" y="118" textAnchor="middle" fontSize="11" fill="#475569">属性间的求值依赖关系</text>
      <text x="660" y="138" textAnchor="middle" fontSize="11" fill="#475569">拓扑序求值</text>
      <text x="660" y="156" textAnchor="middle" fontSize="11" fill="#475569">无环 = 可求值</text>

      {/* 符号表 */}
      <text x="400" y="196" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">符号表（Symbol Table）</text>

      <rect x="30" y="210" width="370" height="130" rx="10" fill="url(#dbc-sym-table)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="50" y="234" fontSize="13" fontWeight="700" fill="#065f46">作用域与嵌套管理</text>
      <text x="50" y="258" fontSize="11" fill="#475569">每个作用域一张符号表（链表 / 栈式）</text>
      <text x="50" y="278" fontSize="11" fill="#475569">进入作用域 → push 新表；退出 → pop</text>
      <text x="50" y="298" fontSize="11" fill="#475569">查表：先查当前作用域，再查外层</text>
      <text x="50" y="318" fontSize="11" fill="#475569">支持嵌套过程 / 块级作用域</text>

      <rect x="410" y="210" width="360" height="130" rx="10" fill="url(#dbc-sym-table)" opacity="0.16" stroke="#059669" strokeWidth="2" />
      <text x="430" y="234" fontSize="13" fontWeight="700" fill="#065f46">符号表条目信息</text>
      <text x="430" y="258" fontSize="11" fill="#475569">name: 标识符名</text>
      <text x="430" y="278" fontSize="11" fill="#475569">type: 数据类型（int / float / array）</text>
      <text x="430" y="298" fontSize="11" fill="#475569">kind: 变量 / 函数 / 类 / 参数</text>
      <text x="430" y="318" fontSize="11" fill="#475569">scope / offset / 额外属性</text>

      {/* 语义分析任务 */}
      <text x="400" y="372" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">语义分析核心任务</text>

      <rect x="30" y="386" width="180" height="80" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="410" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">类型检查</text>
      <text x="120" y="430" textAnchor="middle" fontSize="11" fill="#475569">操作数类型匹配</text>
      <text x="120" y="448" textAnchor="middle" fontSize="11" fill="#475569">隐式 / 显式转换</text>

      <rect x="220" y="386" width="180" height="80" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="410" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">中间代码生成</text>
      <text x="310" y="430" textAnchor="middle" fontSize="11" fill="#475569">AST → 三地址码</text>
      <text x="310" y="448" textAnchor="middle" fontSize="11" fill="#475569">语法树 → 后缀式</text>

      <rect x="410" y="386" width="180" height="80" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="410" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">作用域解析</text>
      <text x="500" y="430" textAnchor="middle" fontSize="11" fill="#475569">名字 → 声明绑定</text>
      <text x="500" y="448" textAnchor="middle" fontSize="11" fill="#475569">遮蔽 / 重名检测</text>

      <rect x="600" y="386" width="170" height="80" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="410" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">一致性检查</text>
      <text x="685" y="430" textAnchor="middle" fontSize="11" fill="#475569">未声明 / 重复声明</text>
      <text x="685" y="448" textAnchor="middle" fontSize="11" fill="#475569">参数个数匹配</text>
    </svg>
  );
}
