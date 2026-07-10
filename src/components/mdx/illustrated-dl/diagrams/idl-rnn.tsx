"use client";

export function IdlRnnDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="循环神经网络展开与LSTM门控机制">
      <defs>
        <linearGradient id="idl-rnn-cell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="idl-rnn-lstm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="idl-rnn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">RNN 展开与 LSTM 门控</text>

      {/* 上半部分：RNN 展开 */}
      <text x="400" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">RNN 按时间步展开</text>

      {/* 时间步 t-1 */}
      <rect x="40" y="80" width="60" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="70" y="100" textAnchor="middle" fontSize="11" fill="#1e40af">x_&#123;t-1&#125;</text>

      <rect x="40" y="130" width="60" height="50" rx="8" fill="url(#idl-rnn-cell)" opacity="0.2" stroke="#2563eb" strokeWidth="2" />
      <text x="70" y="160" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">A</text>

      <line x1="70" y1="110" x2="70" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-rnn-arrow)" />

      <rect x="40" y="200" width="60" height="30" rx="6" fill="#dcfce7" stroke="#059669" strokeWidth="1.5" />
      <text x="70" y="220" textAnchor="middle" fontSize="11" fill="#065f46">h_&#123;t-1&#125;</text>

      <line x1="70" y1="180" x2="70" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-rnn-arrow)" />

      {/* 隐藏状态传递 */}
      <line x1="100" y1="155" x2="240" y2="155" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#idl-rnn-arrow)" />
      <text x="170" y="148" textAnchor="middle" fontSize="9" fill="#7c3aed">h_&#123;t-1&#125;</text>

      {/* 时间步 t */}
      <rect x="280" y="80" width="60" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="310" y="100" textAnchor="middle" fontSize="11" fill="#1e40af">x_t</text>

      <rect x="280" y="130" width="60" height="50" rx="8" fill="url(#idl-rnn-cell)" opacity="0.3" stroke="#2563eb" strokeWidth="2.5" />
      <text x="310" y="160" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">A</text>

      <line x1="310" y1="110" x2="310" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-rnn-arrow)" />

      <rect x="280" y="200" width="60" height="30" rx="6" fill="#dcfce7" stroke="#059669" strokeWidth="1.5" />
      <text x="310" y="220" textAnchor="middle" fontSize="11" fill="#065f46">h_t</text>

      <line x1="310" y1="180" x2="310" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-rnn-arrow)" />

      {/* 隐藏状态传递 */}
      <line x1="340" y1="155" x2="480" y2="155" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#idl-rnn-arrow)" />
      <text x="410" y="148" textAnchor="middle" fontSize="9" fill="#7c3aed">h_t</text>

      {/* 时间步 t+1 */}
      <rect x="520" y="80" width="60" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="550" y="100" textAnchor="middle" fontSize="11" fill="#1e40af">x_&#123;t+1&#125;</text>

      <rect x="520" y="130" width="60" height="50" rx="8" fill="url(#idl-rnn-cell)" opacity="0.2" stroke="#2563eb" strokeWidth="2" />
      <text x="550" y="160" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">A</text>

      <line x1="550" y1="110" x2="550" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-rnn-arrow)" />

      <rect x="520" y="200" width="60" height="30" rx="6" fill="#dcfce7" stroke="#059669" strokeWidth="1.5" />
      <text x="550" y="220" textAnchor="middle" fontSize="11" fill="#065f46">h_&#123;t+1&#125;</text>

      <line x1="550" y1="180" x2="550" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-rnn-arrow)" />

      <text x="620" y="160" fontSize="20" fill="#64748b">...</text>

      {/* RNN 问题说明 */}
      <rect x="40" y="250" width="720" height="40" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="275" textAnchor="middle" fontSize="12" fill="#991b1b">RNN 问题：长序列梯度消失，无法捕捉长距离依赖（h_t 主要受近期输入影响）</text>

      {/* 下半部分：LSTM 门控 */}
      <text x="400" y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">LSTM 三门控机制</text>

      {/* 遗忘门 */}
      <rect x="40" y="340" width="220" height="80" rx="8" fill="url(#idl-rnn-lstm)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="150" y="365" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">遗忘门（Forget Gate）</text>
      <text x="150" y="385" textAnchor="middle" fontSize="11" fill="#6d28d9">f = sigmoid(W_f * [h_&#123;t-1&#125;, x_t])</text>
      <text x="150" y="405" textAnchor="middle" fontSize="10" fill="#64748b">决定丢弃多少旧信息</text>

      {/* 输入门 */}
      <rect x="290" y="340" width="220" height="80" rx="8" fill="url(#idl-rnn-lstm)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="365" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">输入门（Input Gate）</text>
      <text x="400" y="385" textAnchor="middle" fontSize="11" fill="#6d28d9">i = sigmoid(W_i * [h_&#123;t-1&#125;, x_t])</text>
      <text x="400" y="405" textAnchor="middle" fontSize="10" fill="#64748b">决定写入多少新信息</text>

      {/* 输出门 */}
      <rect x="540" y="340" width="220" height="80" rx="8" fill="url(#idl-rnn-lstm)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="650" y="365" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">输出门（Output Gate）</text>
      <text x="650" y="385" textAnchor="middle" fontSize="11" fill="#6d28d9">o = sigmoid(W_o * [h_&#123;t-1&#125;, x_t])</text>
      <text x="650" y="405" textAnchor="middle" fontSize="10" fill="#64748b">决定输出多少信息</text>

      {/* 底部对比 */}
      <rect x="40" y="440" width="720" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="60" y="464" fontSize="12" fontWeight="700" fill="#334155">RNN vs LSTM vs GRU</text>
      <text x="60" y="484" fontSize="11" fill="#475569">RNN：结构简单但梯度消失 | LSTM：三门控+细胞状态，解决长依赖 | GRU：合并门控，参数更少</text>
    </svg>
  );
}
