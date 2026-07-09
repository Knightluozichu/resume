"use client";

export function BlaLlmLandscapeDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="LLM应用生态全景：从模型层到应用层的技术栈">
      <defs>
        <linearGradient id="bla-ll-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-ll-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-ll-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bla-ll-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bla-ll-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">LLM应用生态全景</text>

      {/* 四层技术栈：自底向上 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">LLM应用四层技术栈</text>

      {/* 第一层：模型层 */}
      <rect x="30" y="76" width="740" height="90" rx="10" fill="url(#bla-ll-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="50" y="98" fontSize="13" fontWeight="700" fill="#1e40af">模型层</text>
      <text x="50" y="114" fontSize="10" fill="#64748b">核心能力来源</text>

      <rect x="120" y="88" width="120" height="64" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="180" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">闭源 API</text>
      <text x="180" y="126" textAnchor="middle" fontSize="9" fill="#475569">GPT-4 / Claude</text>
      <text x="180" y="140" textAnchor="middle" fontSize="9" fill="#475569">Gemini</text>

      <rect x="260" y="88" width="120" height="64" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="320" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">开源模型</text>
      <text x="320" y="126" textAnchor="middle" fontSize="9" fill="#475569">LLaMA / Mistral</text>
      <text x="320" y="140" textAnchor="middle" fontSize="9" fill="#475569">Qwen / Falcon</text>

      <rect x="400" y="88" width="120" height="64" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="460" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">嵌入模型</text>
      <text x="460" y="126" textAnchor="middle" fontSize="9" fill="#475569">text-embedding</text>
      <text x="460" y="140" textAnchor="middle" fontSize="9" fill="#475569">BGE / E5</text>

      <rect x="540" y="88" width="120" height="64" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="600" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">多模态模型</text>
      <text x="600" y="126" textAnchor="middle" fontSize="9" fill="#475569">GPT-4V</text>
      <text x="600" y="140" textAnchor="middle" fontSize="9" fill="#475569">LLaVA / CLIP</text>

      <path d="M400 170 L400 176" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ll-arrow)" />

      {/* 第二层：编排层 */}
      <rect x="30" y="180" width="740" height="90" rx="10" fill="url(#bla-ll-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="50" y="202" fontSize="13" fontWeight="700" fill="#5b21b6">编排层</text>
      <text x="50" y="218" fontSize="10" fill="#64748b">链式调用与组合</text>

      <rect x="120" y="192" width="120" height="64" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="180" y="214" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">LangChain</text>
      <text x="180" y="230" textAnchor="middle" fontSize="9" fill="#475569">Chains / Agents</text>
      <text x="180" y="244" textAnchor="middle" fontSize="9" fill="#475569">Memory / Tools</text>

      <rect x="260" y="192" width="120" height="64" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="320" y="214" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">LlamaIndex</text>
      <text x="320" y="230" textAnchor="middle" fontSize="9" fill="#475569">数据框架</text>
      <text x="320" y="244" textAnchor="middle" fontSize="9" fill="#475569">索引与查询</text>

      <rect x="400" y="192" width="120" height="64" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="460" y="214" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">Semantic Kernel</text>
      <text x="460" y="230" textAnchor="middle" fontSize="9" fill="#475569">微软生态</text>
      <text x="460" y="244" textAnchor="middle" fontSize="9" fill="#475569">Plugin编排</text>

      <rect x="540" y="192" width="120" height="64" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="600" y="214" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">Haystack</text>
      <text x="600" y="230" textAnchor="middle" fontSize="9" fill="#475569">Pipeline</text>
      <text x="600" y="244" textAnchor="middle" fontSize="9" fill="#475569">RAG专用</text>

      <path d="M400 274 L400 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ll-arrow)" />

      {/* 第三层：工具层 */}
      <rect x="30" y="284" width="740" height="90" rx="10" fill="url(#bla-ll-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="50" y="306" fontSize="13" fontWeight="700" fill="#92400e">工具层</text>
      <text x="50" y="322" fontSize="10" fill="#64748b">存储与增强</text>

      <rect x="120" y="296" width="120" height="64" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="180" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">向量数据库</text>
      <text x="180" y="334" textAnchor="middle" fontSize="9" fill="#475569">Pinecone / Chroma</text>
      <text x="180" y="348" textAnchor="middle" fontSize="9" fill="#475569">Weaviate / FAISS</text>

      <rect x="260" y="296" width="120" height="64" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="320" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">文档加载</text>
      <text x="320" y="334" textAnchor="middle" fontSize="9" fill="#475569">PDF / HTML</text>
      <text x="320" y="348" textAnchor="middle" fontSize="9" fill="#475569">Notion / DB</text>

      <rect x="400" y="296" width="120" height="64" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="460" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">评测工具</text>
      <text x="460" y="334" textAnchor="middle" fontSize="9" fill="#475569">RAGAS / TruLens</text>
      <text x="460" y="348" textAnchor="middle" fontSize="9" fill="#475569">LangSmith</text>

      <rect x="540" y="296" width="120" height="64" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="600" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">观测平台</text>
      <text x="600" y="334" textAnchor="middle" fontSize="9" fill="#475569">Phoenix / Langfuse</text>
      <text x="600" y="348" textAnchor="middle" fontSize="9" fill="#475569">Weights &amp; Biases</text>

      <path d="M400 378 L400 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ll-arrow)" />

      {/* 第四层：应用层 */}
      <rect x="30" y="388" width="740" height="90" rx="10" fill="url(#bla-ll-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="50" y="410" fontSize="13" fontWeight="700" fill="#065f46">应用层</text>
      <text x="50" y="426" fontSize="10" fill="#64748b">面向用户的场景</text>

      <rect x="120" y="400" width="120" height="64" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="180" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">对话助手</text>
      <text x="180" y="438" textAnchor="middle" fontSize="9" fill="#475569">Chatbot</text>
      <text x="180" y="452" textAnchor="middle" fontSize="9" fill="#475569">客服 / FAQ</text>

      <rect x="260" y="400" width="120" height="64" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="320" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">RAG系统</text>
      <text x="320" y="438" textAnchor="middle" fontSize="9" fill="#475569">知识问答</text>
      <text x="320" y="452" textAnchor="middle" fontSize="9" fill="#475569">文档检索</text>

      <rect x="400" y="400" width="120" height="64" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="460" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">Agent</text>
      <text x="460" y="438" textAnchor="middle" fontSize="9" fill="#475569">自主任务</text>
      <text x="460" y="452" textAnchor="middle" fontSize="9" fill="#475569">工具调用</text>

      <rect x="540" y="400" width="120" height="64" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="600" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">Copilot</text>
      <text x="600" y="438" textAnchor="middle" fontSize="9" fill="#475569">代码助手</text>
      <text x="600" y="452" textAnchor="middle" fontSize="9" fill="#475569">办公辅助</text>

      {/* 底部：核心选型维度 */}
      <text x="400" y="500" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心选型维度</text>

      <rect x="30" y="512" width="148" height="50" rx="8" fill="url(#bla-ll-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="104" y="532" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">能力与成本</text>
      <text x="104" y="548" textAnchor="middle" fontSize="9" fill="#475569">闭源vs开源</text>

      <rect x="194" y="512" width="148" height="50" rx="8" fill="url(#bla-ll-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="268" y="532" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">数据隐私</text>
      <text x="268" y="548" textAnchor="middle" fontSize="9" fill="#475569">私有化部署</text>

      <rect x="358" y="512" width="148" height="50" rx="8" fill="url(#bla-ll-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="432" y="532" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">延迟与吞吐</text>
      <text x="432" y="548" textAnchor="middle" fontSize="9" fill="#475569">实时vs批处理</text>

      <rect x="522" y="512" width="148" height="50" rx="8" fill="url(#bla-ll-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="596" y="532" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">可观测性</text>
      <text x="596" y="548" textAnchor="middle" fontSize="9" fill="#475569">监控与追踪</text>
    </svg>
  );
}
