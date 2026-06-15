/**
 * <Wasm2023Diagram>：WebAssembly 2023 编译管线 vs 旧版。
 * 展示 IL2CPP（C#）→ Wasm 2023 字节码的编译路径 + 新指令集带来的体积/速度改善。
 */

export function Wasm2023Diagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 600 280"
          role="img"
          aria-label="WebAssembly 2023 编译管线：C# → IL2CPP → C++ → Emscripten → Wasm 2023，新指令集减少绕路代码、缩小体积"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <text x="20" y="28" fontSize="13" fontWeight="600" fill="var(--text-primary)">Unity IL2CPP → Wasm 2023 编译管线</text>

          {/* Pipeline flow */}
          <rect x="20" y="48" width="90" height="40" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="65" y="72" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">C# 源码</text>

          <text x="118" y="72" fontSize="14" fill="var(--accent)">→</text>

          <rect x="130" y="48" width="90" height="40" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="175" y="72" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">IL2CPP</text>

          <text x="228" y="72" fontSize="14" fill="var(--accent)">→</text>

          <rect x="240" y="48" width="100" height="40" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="290" y="72" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">C++ 中间码</text>

          <text x="348" y="72" fontSize="14" fill="var(--accent)">→</text>

          <rect x="360" y="48" width="110" height="40" rx="6" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x="415" y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Emscripten</text>
          <text x="415" y="82" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">+ Wasm 2023</text>

          <text x="478" y="72" fontSize="14" fill="var(--accent)">→</text>

          <rect x="490" y="48" width="100" height="40" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="2" />
          <text x="540" y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">.wasm</text>
          <text x="540" y="82" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">字节码</text>

          {/* 2023 improvements box */}
          <rect x="20" y="108" width="570" height="110" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="40" y="132" fontSize="12" fontWeight="600" fill="var(--accent)">Wasm 2023 关键改进 vs 旧版 Wasm</text>

          <text x="40" y="156" fontSize="10" fill="var(--text-primary)">❶ Sign Extension · Non-Trapping FP-to-Int · Bulk Memory 指令集完成</text>
          <text x="56" y="174" fontSize="9" fill="var(--text-secondary)">旧版缺失这些指令 → IL2CPP 绕路生成大量辅助指令 → .wasm 体积大 5–15%、解析更慢</text>

          <text x="40" y="194" fontSize="10" fill="var(--text-primary)">❷ Wasm GC（部分落地）→ IL2CPP 托管对象与浏览器 JS 引擎 GC 直接协作</text>
          <text x="56" y="212" fontSize="9" fill="var(--text-secondary)">旧版全靠手动引用计数桥接 · 开销高 · 易泄漏 · 2023 版效率大幅提升</text>

          {/* Threads */}
          <rect x="20" y="236" width="570" height="34" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="40" y="258" fontSize="10" fill="var(--text-primary)">❸ Native Wasm Threads：多线程 Worker → Job System + Burst 在浏览器里并行跑</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Unity IL2CPP 将 C# → C++ → Wasm 2023 字节码。Wasm 2023 的完整指令集避免了
        旧版的「绕路」实现——体积缩 5–15%、解析加速，是 WebGL Build 性能的基础支柱。
      </figcaption>
    </figure>
  );
}
