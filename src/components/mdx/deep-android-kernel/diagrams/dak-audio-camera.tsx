/**
 * <DakAudioCameraDiagram>：音频与摄像头服务架构图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function DakAudioCameraDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="音频与摄像头服务架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            音频服务与摄像头服务架构
          </text>

          {/* 左半：音频服务 */}
          <text x="185" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">音频服务（AudioFlinger）</text>

          <rect x="40" y="66" width="290" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="185" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">App 层：AudioTrack / AudioRecord</text>
          <text x="185" y="98" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Java API 播放/录制 PCM 数据</text>

          <text x="185" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="40" y="130" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="185" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Framework 层：AudioSystem</text>
          <text x="185" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">音频策略管理 / 路由选择</text>

          <text x="185" y="184" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="40" y="194" width="290" height="46" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">AudioFlinger（media进程）</text>
          <text x="185" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">混音 / 音量控制 / 效果链 / 缓冲管理</text>

          <text x="185" y="256" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="40" y="266" width="290" height="40" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="185" y="284" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">HAL 层：Audio HAL</text>
          <text x="185" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">厂商驱动 / ALSA / TinyAlsa</text>

          <text x="185" y="320" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="40" y="330" width="290" height="40" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="185" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Linux 内核：ALSA 驱动</text>
          <text x="185" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">硬件 DAC/ADC</text>

          {/* 右半：摄像头服务 */}
          <text x="555" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">摄像头服务（CameraService）</text>

          <rect x="410" y="66" width="290" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="555" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">App 层：Camera2 API</text>
          <text x="555" y="98" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CameraManager / CameraDevice</text>

          <text x="555" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="410" y="130" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="555" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Framework 层：CameraService</text>
          <text x="555" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">设备管理 / 会话调度 / 预览拍照</text>

          <text x="555" y="184" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="410" y="194" width="290" height="46" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="555" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">CameraService（mediaserver进程）</text>
          <text x="555" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Pipeline管理 / 帧捕获 / 图像处理</text>

          <text x="555" y="256" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="410" y="266" width="290" height="40" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="555" y="284" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">HAL 层：Camera HAL 3</text>
          <text x="555" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">厂商 ISP / 传感器驱动</text>

          <text x="555" y="320" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="410" y="330" width="290" height="40" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="555" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Linux 内核：V4L2 驱动</text>
          <text x="555" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">摄像头硬件接口</text>

          {/* 底部对比说明 */}
          <rect x="40" y="390" width="660" height="110" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="412" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">共同设计模式：C/S 架构 + 分层解耦</text>
          <text x="60" y="436" fontSize="11" fill="var(--text-secondary)">&bull; App 通过 Binder IPC 跨进程调用 mediaserver 进程中的 AudioFlinger / CameraService</text>
          <text x="60" y="454" fontSize="11" fill="var(--text-secondary)">&bull; 共享内存（ashmem/ION）传输大数据（音频PCM流/摄像头帧），Binder 只传控制命令</text>
          <text x="60" y="472" fontSize="11" fill="var(--text-secondary)">&bull; HAL 层屏蔽厂商差异，统一接口规范（Audio HAL / Camera HAL 3），内核层 V4L2/ALSA</text>
          <text x="60" y="490" fontSize="11" fill="var(--text-secondary)">&bull; 权限管控：录音/拍照需 RECORD_AUDIO/CAMERA 权限，服务端校验调用方 UID</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        音频与摄像头服务——AudioFlinger混音管线、CameraService帧捕获管线，C/S架构与分层HAL解耦
      </figcaption>
    </figure>
  );
}
