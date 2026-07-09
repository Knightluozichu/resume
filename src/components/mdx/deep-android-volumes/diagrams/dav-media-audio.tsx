"use client";

export function DavMediaAudioDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="媒体与音频框架架构图">
      <defs>
        <linearGradient id="dav-ma-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dav-ma-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dav-ma-kernel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <marker id="dav-ma-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">媒体与音频框架 · C/S架构</text>

      {/* App layer */}
      <rect x="30" y="50" width="740" height="70" rx="12" fill="url(#dav-ma-app)" opacity="0.92" />
      <text x="400" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">App进程 · Java API</text>
      <text x="180" y="98" textAnchor="middle" fontSize="11" fill="#dbeafe">MediaPlayer（播放）</text>
      <text x="400" y="98" textAnchor="middle" fontSize="11" fill="#dbeafe">AudioTrack（音频输出）</text>
      <text x="620" y="98" textAnchor="middle" fontSize="11" fill="#dbeafe">MediaRecorder（录制）</text>
      <text x="400" y="114" textAnchor="middle" fontSize="10" fill="#bfdbfe">JNI → Native → Binder跨进程调用mediaserver</text>

      {/* mediaserver */}
      <rect x="30" y="140" width="740" height="170" rx="12" fill="url(#dav-ma-server)" opacity="0.92" />
      <text x="400" y="164" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">mediaserver进程（由init.rc启动）</text>

      <rect x="50" y="180" width="220" height="110" rx="8" fill="#fff" opacity="0.15" />
      <text x="160" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ede9fe">MediaPlayerService</text>
      <text x="160" y="222" textAnchor="middle" fontSize="10" fill="#ddd6fe">StagefrightPlayer</text>
      <text x="160" y="240" textAnchor="middle" fontSize="10" fill="#ddd6fe">→ MediaExtractor解复用</text>
      <text x="160" y="258" textAnchor="middle" fontSize="10" fill="#ddd6fe">→ MediaDecoder解码</text>
      <text x="160" y="278" textAnchor="middle" fontSize="10" fill="#ddd6fe">→ AudioTrack/Surface输出</text>

      <rect x="290" y="180" width="220" height="110" rx="8" fill="#fff" opacity="0.18" />
      <text x="400" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ede9fe">AudioFlinger</text>
      <text x="400" y="222" textAnchor="middle" fontSize="10" fill="#ddd6fe">MixerThread混音线程</text>
      <text x="400" y="240" textAnchor="middle" fontSize="10" fill="#ddd6fe">→ 读取各Track Buffer</text>
      <text x="400" y="258" textAnchor="middle" fontSize="10" fill="#ddd6fe">→ AudioMixer合并混音</text>
      <text x="400" y="278" textAnchor="middle" fontSize="10" fill="#ddd6fe">→ HAL → ALSA驱动</text>

      <rect x="530" y="180" width="220" height="110" rx="8" fill="#fff" opacity="0.12" />
      <text x="640" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ede9fe">Stagefright引擎</text>
      <text x="640" y="222" textAnchor="middle" fontSize="10" fill="#ddd6fe">DataSource（数据源）</text>
      <text x="640" y="240" textAnchor="middle" fontSize="10" fill="#ddd6fe">→ MPEG4/MP3/WAV Extractor</text>
      <text x="640" y="258" textAnchor="middle" fontSize="10" fill="#ddd6fe">→ OpenMAX解码器</text>
      <text x="640" y="278" textAnchor="middle" fontSize="10" fill="#ddd6fe">→ MediaCodec API</text>

      {/* HAL */}
      <rect x="30" y="330" width="740" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="400" y="355" textAnchor="middle" fontSize="11" fill="#92400e">HAL（硬件抽象层）· Audio HAL / Camera HAL · 屏蔽厂商硬件差异</text>

      {/* Kernel */}
      <rect x="30" y="385" width="740" height="40" rx="8" fill="url(#dav-ma-kernel)" opacity="0.85" />
      <text x="400" y="410" textAnchor="middle" fontSize="11" fill="#e2e8f0">Linux Kernel · ALSA（音频驱动）/ V4L2（视频驱动）</text>

      {/* ashmem */}
      <rect x="30" y="440" width="360" height="65" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="210" y="462" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">ashmem共享内存传输</text>
      <text x="210" y="482" textAnchor="middle" fontSize="10" fill="#1e3a8a">App与mediaserver mmap同一物理页</text>
      <text x="210" y="498" textAnchor="middle" fontSize="10" fill="#1e40af">零拷贝 · 避免Binder大数据开销</text>

      {/* AudioTrack modes */}
      <rect x="410" y="440" width="360" height="65" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="462" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">AudioTrack两种模式</text>
      <text x="590" y="482" textAnchor="middle" fontSize="10" fill="#475569">MODE_STATIC: 一次性写入（短音效）</text>
      <text x="590" y="498" textAnchor="middle" fontSize="10" fill="#475569">MODE_STREAM: 流式边播边写（音乐）</text>
    </svg>
  );
}
