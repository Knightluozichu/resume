/**
 * <CraMultimediaDiagram>：多媒体与图形图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function CraMultimediaDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android多媒体与图形编程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            多媒体与图形：音频 / 视频 / 2D绘图 / 动画 / 传感器
          </text>

          {/* 第一行：音频 与 视频 */}
          <text x="185" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">音频 Audio</text>
          <rect x="50" y="64" width="310" height="150" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <rect x="66" y="80" width="278" height="28" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="205" y="98" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">MediaPlayer — 播放音频/视频</text>

          <text x="66" y="126" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">create / setDataSource / prepare / start</text>
          <text x="66" y="142" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">pause / stop / release / seekTo</text>
          <text x="66" y="158" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">setLooping / setVolume / OnCompletionListener</text>

          <rect x="66" y="172" width="135" height="30" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="133" y="190" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">SoundPool</text>
          <text x="133" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">短音效/多路混音</text>

          <rect x="209" y="172" width="135" height="30" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="276" y="190" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">MediaRecorder</text>
          <text x="276" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">录音/录像</text>

          <text x="555" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">视频 Video</text>
          <rect x="400" y="64" width="310" height="150" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <rect x="416" y="80" width="278" height="28" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="555" y="98" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">VideoView — 简单视频播放</text>

          <text x="416" y="126" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">setVideoPath / setVideoURI / start</text>
          <text x="416" y="142" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">setMediaController — 控制条</text>

          <rect x="416" y="160" width="278" height="40" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="555" y="178" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">MediaPlayer + SurfaceView</text>
          <text x="555" y="194" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">灵活控制：setDisplay(SurfaceHolder) 自定义渲染</text>

          {/* 第二行：2D绘图 与 动画 */}
          <text x="185" y="240" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">2D绘图 Canvas</text>
          <rect x="50" y="252" width="310" height="150" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <rect x="66" y="268" width="278" height="24" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="205" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">自定义View onDraw(Canvas)</text>

          <text x="66" y="312" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">Canvas: drawRect / drawCircle / drawLine</text>
          <text x="66" y="328" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">drawText / drawBitmap / drawPath</text>
          <text x="66" y="344" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">drawArc / drawOval / drawRoundRect</text>

          <rect x="66" y="356" width="135" height="36" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="133" y="374" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Paint</text>
          <text x="133" y="386" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">颜色/抗锯齿/粗细</text>

          <rect x="209" y="356" width="135" height="36" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="276" y="374" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">Path</text>
          <text x="276" y="386" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">moveTo/lineTo/cubicTo</text>

          <text x="555" y="240" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">动画 Animation</text>
          <rect x="400" y="252" width="310" height="150" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          <rect x="416" y="268" width="135" height="56" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="483" y="286" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">Tween（补间动画）</text>
          <text x="483" y="300" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">AlphaAnimation</text>
          <text x="483" y="312" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Translate/Rotate/Scale</text>
          <text x="483" y="320" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">XML: res/anim/</text>

          <rect x="559" y="268" width="135" height="56" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="626" y="286" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">Frame（帧动画）</text>
          <text x="626" y="300" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">AnimationDrawable</text>
          <text x="626" y="312" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">逐帧播放图片序列</text>
          <text x="626" y="320" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">XML: res/drawable/</text>

          <rect x="416" y="332" width="278" height="60" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="555" y="352" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Property Animation（属性动画）</text>
          <text x="555" y="368" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--text-secondary)">ObjectAnimator / ValueAnimator</text>
          <text x="555" y="382" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">真正改变View属性值，非仅视觉变换</text>

          {/* 第三行：传感器 与 图形总结 */}
          <rect x="50" y="420" width="640" height="130" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="442" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">传感器 SensorManager</text>
          <text x="70" y="466" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">SensorManager.getDefaultSensor(TYPE_xxx) &rarr; registerListener</text>
          <text x="70" y="484" fontSize="10" fill="var(--text-secondary)">加速度传感器 TYPE_ACCELEROMETER — 计步/摇一摇/重力感应</text>
          <text x="70" y="502" fontSize="10" fill="var(--text-secondary)">方向传感器 TYPE_ORIENTATION — 指南针/旋转</text>
          <text x="70" y="520" fontSize="10" fill="var(--text-secondary)">光线/距离/温度/陀螺仪等 — 自动亮度/通话息屏</text>
          <text x="70" y="540" fontSize="10" fill="var(--danger)">onPause中必须 unregisterListener 释放传感器，避免耗电</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android多媒体：MediaPlayer音频播放、VideoView视频播放、Canvas 2D绘图、补间/帧/属性动画、传感器
      </figcaption>
    </figure>
  );
}
