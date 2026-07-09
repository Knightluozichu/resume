"use client";

export function LaeProductionPatternsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="生产环境最佳实践可靠性安全性与成本优化">
      <defs>
        <linearGradient id="lae-pp-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-pp-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-pp-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-pp-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lae-pp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生产环境最佳实践：可靠、安全、高效</text>

      {/* 三大支柱 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">生产化三大支柱</text>

      <rect x="30" y="76" width="240" height="200" rx="8" fill="url(#lae-pp-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="150" y="100" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e40af">可靠性 Reliability</text>
      <text x="150" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">确保服务稳定可用</text>
      <text x="150" y="146" textAnchor="middle" fontSize="10" fill="#475569">重试机制(指数退避)</text>
      <text x="150" y="162" textAnchor="middle" fontSize="10" fill="#475569">超时控制(请求级/全局)</text>
      <text x="150" y="178" textAnchor="middle" fontSize="10" fill="#475569">熔断器(故障隔离)</text>
      <text x="150" y="194" textAnchor="middle" fontSize="10" fill="#475569">降级策略(兜底响应)</text>
      <text x="150" y="210" textAnchor="middle" fontSize="10" fill="#475569">冗余部署(多副本)</text>
      <text x="150" y="226" textAnchor="middle" fontSize="10" fill="#475569">健康检查(自动恢复)</text>
      <text x="150" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">目标：99.9%可用性</text>
      <text x="150" y="266" textAnchor="middle" fontSize="10" fill="#475569">优雅降级而非全面崩溃</text>

      <rect x="280" y="76" width="240" height="200" rx="8" fill="url(#lae-pp-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="100" textAnchor="middle" fontSize="15" fontWeight="700" fill="#5b21b6">安全性 Security</text>
      <text x="400" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">确保输出安全合规</text>
      <text x="400" y="146" textAnchor="middle" fontSize="10" fill="#475569">输入过滤(注入防护)</text>
      <text x="400" y="162" textAnchor="middle" fontSize="10" fill="#475569">输出审核(内容过滤)</text>
      <text x="400" y="178" textAnchor="middle" fontSize="10" fill="#475569">PII脱敏(隐私保护)</text>
      <text x="400" y="194" textAnchor="middle" fontSize="10" fill="#475569">越狱防御(Prompt加固)</text>
      <text x="400" y="210" textAnchor="middle" fontSize="10" fill="#475569">速率限制(防滥用)</text>
      <text x="400" y="226" textAnchor="middle" fontSize="10" fill="#475569">审计日志(可追溯)</text>
      <text x="400" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">目标：零安全事件</text>
      <text x="400" y="266" textAnchor="middle" fontSize="10" fill="#475569">纵深防御多层过滤</text>

      <rect x="530" y="76" width="240" height="200" rx="8" fill="url(#lae-pp-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <text x="650" y="100" textAnchor="middle" fontSize="15" fontWeight="700" fill="#92400e">成本效率 Cost</text>
      <text x="650" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="#f59e0b">最大化投入产出比</text>
      <text x="650" y="146" textAnchor="middle" fontSize="10" fill="#475569">语义缓存(命中免调用)</text>
      <text x="650" y="162" textAnchor="middle" fontSize="10" fill="#475569">模型路由(简单→小模型)</text>
      <text x="650" y="178" textAnchor="middle" fontSize="10" fill="#475569">批量请求(合并处理)</text>
      <text x="650" y="194" textAnchor="middle" fontSize="10" fill="#475569">Token优化(压缩prompt)</text>
      <text x="650" y="210" textAnchor="middle" fontSize="10" fill="#475569">异步处理(非阻塞)</text>
      <text x="650" y="226" textAnchor="middle" fontSize="10" fill="#475569">自动伸缩(按需扩缩)</text>
      <text x="650" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">目标：降低单请求成本</text>
      <text x="650" y="266" textAnchor="middle" fontSize="10" fill="#475569">用最便宜的够用模型</text>

      {/* 可观测性 */}
      <text x="400" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">可观测性体系</text>

      <rect x="30" y="318" width="175" height="76" rx="8" fill="url(#lae-pp-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="117" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">日志 Logging</text>
      <text x="117" y="360" textAnchor="middle" fontSize="10" fill="#475569">请求/响应记录</text>
      <text x="117" y="376" textAnchor="middle" fontSize="10" fill="#475569">错误堆栈追踪</text>
      <text x="117" y="388" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">事后排查</text>

      <rect x="215" y="318" width="175" height="76" rx="8" fill="url(#lae-pp-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="302" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">指标 Metrics</text>
      <text x="302" y="360" textAnchor="middle" fontSize="10" fill="#475569">延迟/吞吐/错误率</text>
      <text x="302" y="376" textAnchor="middle" fontSize="10" fill="#475569">资源使用率</text>
      <text x="302" y="388" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">实时监控</text>

      <rect x="400" y="318" width="175" height="76" rx="8" fill="url(#lae-pp-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">追踪 Tracing</text>
      <text x="487" y="360" textAnchor="middle" fontSize="10" fill="#475569">请求全链路</text>
      <text x="487" y="376" textAnchor="middle" fontSize="10" fill="#475569">瓶颈定位</text>
      <text x="487" y="388" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">性能分析</text>

      <rect x="585" y="318" width="175" height="76" rx="8" fill="url(#lae-pp-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="672" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">告警 Alerting</text>
      <text x="672" y="360" textAnchor="middle" fontSize="10" fill="#475569">阈值触发通知</text>
      <text x="672" y="376" textAnchor="middle" fontSize="10" fill="#475569">异常自动响应</text>
      <text x="672" y="388" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">快速响应</text>

      {/* 持续优化 */}
      <text x="400" y="420" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">持续优化闭环</text>

      <rect x="30" y="434" width="740" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="456" textAnchor="middle" fontSize="11" fill="#475569">监控指标 → 发现瓶颈 → 分析根因 → 优化改进 → 灰度验证 → 全量发布 → 持续监控</text>
      <text x="400" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">数据驱动的持续迭代，而非一次性优化</text>

      {/* 底部总结 */}
      <rect x="30" y="506" width="740" height="50" rx="8" fill="url(#lae-pp-green)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="400" y="528" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">生产化核心公式</text>
      <text x="400" y="546" textAnchor="middle" fontSize="11" fill="#475569">高可用(重试+熔断+降级) + 高安全(过滤+脱敏+审计) + 低成本(缓存+路由+批处理) + 可观测(日志+指标+追踪)</text>
    </svg>
  );
}
