/**
 * <Poeaa24Pattern41Gateway>：入口（Gateway）结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 300;
export function Poeaa24Pattern41Gateway() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Gateway 结构图。Gateway 封装对外部系统或复杂资源的访问，调用者只依赖内部契约，可用测试替身替换外部系统。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Gateway：封装外部访问的统一入口" />
          {/* 调用者 */}
          <rect x={48} y={64} width={180} height={80} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={138} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">领域代码</text>
          <text x={64} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>gateway.send(msg)</text>
          <text x={64} y={128} fontSize="9" fill={T.secondary}>只依赖内部契约</text>
          {/* 箭头 */}
          <line x1={228} y1={104} x2={290} y2={104} stroke={T.accent} strokeWidth="1.5" />
          {/* Gateway */}
          <rect x={290} y={64} width={170} height={80} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={290} y={64} width={170} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={290} y={84} width={170} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={375} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>EmailGateway</text>
          <text x={306} y={112} fontSize="9" fill={T.secondary}>协议适配 · 错误翻译</text>
          <text x={306} y={130} fontSize="9" fill={T.secondary}>可替换为测试替身</text>
          {/* 箭头到外部 */}
          <line x1={460} y1={104} x2={520} y2={104} stroke="#E5B567" strokeWidth="1.2" strokeDasharray="4 3" />
          {/* 外部系统 */}
          <rect x={520} y={64} width={160} height={80} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={600} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">外部系统</text>
          <text x={536} y={110} fontSize="9" fill={T.secondary}>SMTP / API / MQ</text>
          <text x={536} y={128} fontSize="9" fill={T.secondary}>协议复杂、易变</text>
          {/* 底部说明 */}
          <rect x={48} y={172} width={624} height={72} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={196} fontSize="11" fontWeight="600" fill={T.primary}>核心价值：</text>
          <text x={64} y={218} fontSize="11" fill={T.secondary}>• 调用者不感知外部协议细节  • 统一错误翻译  • 测试时替换为 Fake/Stub</text>
          <text x={64} y={236} fontSize="11" fill={T.secondary}>• 常见实例：Table Data Gateway、Row Data Gateway、Remote Facade</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="Gateway 封装外部系统访问，调用者只依赖内部契约" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Gateway 封装对外部系统或复杂资源的访问，调用者只依赖内部契约，
        可用测试替身替换外部系统，统一翻译错误。
      </figcaption>
    </figure>
  );
}
