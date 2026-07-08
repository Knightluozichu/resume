/**
 * <UcnUnityIntegrationDiagram>：Unity 客户端集成——Native Plugin 与 P/Invoke 调用链图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function UcnUnityIntegrationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 客户端集成——Native Plugin 与 P-Invoke 调用链图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity ↔ C++ Native Plugin 调用链
          </text>

          {/* 左侧：Unity C# 层 */}
          <rect x="30" y="55" width="300" height="360" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="180" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Unity C# 层（托管）</text>

          <rect x="50" y="95" width="260" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="180" y="113" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">NetworkManager（MonoBehaviour）</text>
          <text x="180" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Update() 轮询取消息</text>

          <text x="180" y="153" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; DllImport</text>

          <rect x="50" y="160" width="260" height="55" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="180" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">P/Invoke 声明</text>
          <text x="180" y="194" textAnchor="middle" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">[DllImport("net")] static extern</text>
          <text x="180" y="208" textAnchor="middle" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">int net_poll(byte[] buf, int size);</text>

          <text x="180" y="233" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 回调</text>

          <rect x="50" y="240" width="260" height="55" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="180" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">消息分发器</text>
          <text x="180" y="274" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按 MsgId 调用对应 C# 回调</text>
          <text x="180" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">触发事件 → UI/角色/场景更新</text>

          <text x="180" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Marshal.Copy 拷贝 native → managed</text>
          <text x="180" y="333" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">主线程执行，天然线程安全</text>
          <text x="180" y="355" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">数据量大时考虑 unsafe 指针免拷贝</text>
          <text x="180" y="375" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">DLL 放 Assets/Plugins/对应平台目录</text>
          <text x="180" y="395" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">iOS 用 .a 静态库，Android 用 .so</text>

          {/* 右侧：C++ Native 层 */}
          <rect x="410" y="55" width="300" height="360" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="560" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">C++ Native 层（非托管）</text>

          <rect x="430" y="95" width="260" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="560" y="113" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">网络线程（std::thread）</text>
          <text x="560" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">epoll/IOCP 收包 → 写入队列</text>

          <text x="560" y="153" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; C ABI 导出</text>

          <rect x="430" y="160" width="260" height="55" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="560" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">extern "C" 导出函数</text>
          <text x="560" y="194" textAnchor="middle" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">extern "C" int net_poll(</text>
          <text x="560" y="208" textAnchor="middle" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">    char* buf, int max_size)</text>

          <text x="560" y="233" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 拷贝到 C# 缓冲区</text>

          <rect x="430" y="240" width="260" height="55" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="560" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">消息队列（线程安全）</text>
          <text x="560" y="274" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">网络线程写，Unity 主线程读</text>
          <text x="560" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">互斥锁或无锁环形队列</text>

          <text x="560" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">网络线程独立于 Unity 主线程</text>
          <text x="560" y="333" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不阻塞游戏帧，不调用 Unity API</text>
          <text x="560" y="355" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">net_poll 返回 0 = 无消息</text>
          <text x="560" y="375" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">返回 &gt;0 = 拷贝的字节数</text>
          <text x="560" y="395" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Protobuf 在 C++ 侧反序列化后传结构体</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 客户端集成——C# 通过 P/Invoke 调用 C++ Native Plugin，网络线程收包、主线程轮询分发
      </figcaption>
    </figure>
  );
}
