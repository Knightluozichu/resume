/**
 * <Poeaa24Pattern11LazyLoad>：延迟加载策略对比图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 400;
export function Poeaa24Pattern11LazyLoad() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="延迟加载策略对比图。展示四种 Lazy Load 实现方式：懒初始化、值持有者、虚代理、幽灵对象，以及各自的触发时机和适用场景。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Lazy Load：四种延迟策略" />
          {/* 策略 1: 懒初始化 */}
          <rect x={48} y={60} width={150} height={130} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={123} y={82} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">懒初始化</text>
          <text x={60} y={104} fontSize="11" fontFamily="monospace" fill={T.primary}>get items():</text>
          <text x={60} y={120} fontSize="11" fontFamily="monospace" fill={T.primary}>  if _items=null</text>
          <text x={60} y={136} fontSize="11" fontFamily="monospace" fill="#E5B567">    _items=load()</text>
          <text x={60} y={152} fontSize="11" fontFamily="monospace" fill={T.primary}>  return _items</text>
          <text x={60} y={176} fontSize="11" fill={T.secondary}>最简单，null 检查</text>
          {/* 策略 2: 值持有者 */}
          <rect x={214} y={60} width={150} height={130} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={289} y={82} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">值持有者</text>
          <text x={226} y={104} fontSize="11" fontFamily="monospace" fill={T.primary}>ValueHolder&lt;T&gt;</text>
          <text x={226} y={120} fontSize="11" fontFamily="monospace" fill={T.primary}>  .getValue()</text>
          <text x={226} y={136} fontSize="11" fontFamily="monospace" fill="#E5B567">  → 触发加载</text>
          <text x={226} y={152} fontSize="11" fontFamily="monospace" fill={T.primary}>  .setValue(v)</text>
          <text x={226} y={176} fontSize="11" fill={T.secondary}>通用包装器</text>
          {/* 策略 3: 虚代理 */}
          <rect x={380} y={60} width={150} height={130} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.2" />
          <text x={455} y={82} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>虚代理</text>
          <text x={392} y={104} fontSize="11" fontFamily="monospace" fill={T.primary}>OrderProxy</text>
          <text x={392} y={120} fontSize="11" fontFamily="monospace" fill={T.primary}>  extends Order</text>
          <text x={392} y={136} fontSize="11" fontFamily="monospace" fill="#E5B567">  覆写 getter</text>
          <text x={392} y={152} fontSize="11" fontFamily="monospace" fill={T.primary}>  → 首次访问加载</text>
          <text x={392} y={176} fontSize="11" fill={T.secondary}>对调用者透明</text>
          {/* 策略 4: 幽灵对象 */}
          <rect x={546} y={60} width={150} height={130} rx="8" fill={T.danger} fillOpacity="0.06" stroke={T.danger} strokeWidth="1.2" />
          <text x={621} y={82} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.danger}>幽灵对象</text>
          <text x={558} y={104} fontSize="11" fontFamily="monospace" fill={T.primary}>Order (ghost)</text>
          <text x={558} y={120} fontSize="11" fontFamily="monospace" fill={T.primary}>  id=42 已填充</text>
          <text x={558} y={136} fontSize="11" fontFamily="monospace" fill="#E5B567">  其余=null</text>
          <text x={558} y={152} fontSize="11" fontFamily="monospace" fill={T.primary}>  访问时自动加载</text>
          <text x={558} y={176} fontSize="11" fill={T.secondary}>部分数据先行</text>
          {/* 底部：触发时机对比 */}
          <rect x={48} y={216} width={624} height={120} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={240} fontSize="11" fontWeight="600" fill={T.primary}>触发时机与代价：</text>
          <text x={64} y={264} fontSize="11" fill="#3FB97F">懒初始化：首次 getter → 侵入领域代码（每个字段加 if）</text>
          <text x={64} y={284} fontSize="11" fill="#E5B567">值持有者：getValue() → 调用者需知道包装存在</text>
          <text x={64} y={304} fontSize="11" fill={T.accent}>虚代理：任意方法调用 → 需为每个类生成代理子类</text>
          <text x={64} y={324} fontSize="11" fill={T.danger}>幽灵对象：访问空字段 → 需框架拦截，实现最复杂</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="四种策略从简单到复杂，透明度递增但实现成本也递增" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lazy Load 将数据加载推迟到真正需要时。四种实现策略各有取舍：
        懒初始化最简单，虚代理最透明，幽灵对象最复杂但最无缝。
      </figcaption>
    </figure>
  );
}
