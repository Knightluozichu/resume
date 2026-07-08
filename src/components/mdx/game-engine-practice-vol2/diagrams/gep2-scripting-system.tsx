/**
 * <Gep2ScriptingSystemDiagram>：脚本系统——绑定与热重载图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2ScriptingSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="脚本系统绑定与热重载图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            脚本系统：C++ 引擎 ↔ 脚本绑定 ↔ 热重载
          </text>

          {/* 左：C++ 引擎层 */}
          <rect
            x="30"
            y="60"
            width="200"
            height="200"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x="130"
            y="82"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            C++ 引擎层
          </text>
          <text x="44" y="106" fontSize="11" fill="var(--text-secondary)">
            Native 性能敏感代码
          </text>
          <rect
            x="50"
            y="118"
            width="160"
            height="30"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.18"
          />
          <text
            x="130"
            y="138"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            Transform / 节点
          </text>
          <rect
            x="50"
            y="154"
            width="160"
            height="30"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.18"
          />
          <text
            x="130"
            y="174"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            Render / 物理 API
          </text>
          <rect
            x="50"
            y="190"
            width="160"
            height="30"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.18"
          />
          <text
            x="130"
            y="210"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            资源 / 输入
          </text>
          <text
            x="130"
            y="240"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-tertiary)"
          >
            注册到反射表供绑定
          </text>

          {/* 中：绑定桥 */}
          <rect
            x="270"
            y="60"
            width="200"
            height="200"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <text
            x="370"
            y="82"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            绑定层 Binding Bridge
          </text>
          <text x="284" y="106" fontSize="11" fill="var(--text-secondary)">
            自动生成胶水代码
          </text>
          <rect
            x="290"
            y="118"
            width="160"
            height="30"
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.18"
          />
          <text
            x="370"
            y="138"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            Lua / Python / C#
          </text>
          <rect
            x="290"
            y="154"
            width="160"
            height="30"
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.18"
          />
          <text
            x="370"
            y="174"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            反射 + 代码生成
          </text>
          <rect
            x="290"
            y="190"
            width="160"
            height="30"
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.18"
          />
          <text
            x="370"
            y="210"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            GC 句柄管理
          </text>
          <text
            x="370"
            y="240"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-tertiary)"
          >
            脚本调 Native 经 thunk
          </text>

          {/* 右：脚本层 */}
          <rect
            x="510"
            y="60"
            width="200"
            height="200"
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <text
            x="610"
            y="82"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--warning)"
          >
            脚本层 Game Logic
          </text>
          <text x="524" y="106" fontSize="11" fill="var(--text-secondary)">
            热重载、快速迭代
          </text>
          <rect
            x="530"
            y="118"
            width="160"
            height="44"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.18"
          />
          <text
            x="610"
            y="136"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            function Update() &lbrace;
          </text>
          <text
            x="610"
            y="152"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            &rbrace; // 每帧调用
          </text>
          <rect
            x="530"
            y="170"
            width="160"
            height="30"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.18"
          />
          <text
            x="610"
            y="190"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            玩法 / AI / UI
          </text>
          <text
            x="610"
            y="224"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-tertiary)"
          >
            解释执行，性能次要
          </text>

          {/* 双向箭头 */}
          <text
            x="250"
            y="166"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &harr;
          </text>
          <text
            x="250"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            调用
          </text>
          <text
            x="490"
            y="166"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-tertiary)"
          >
            &harr;
          </text>
          <text
            x="490"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            回调
          </text>

          {/* 热重载流程 */}
          <rect
            x="30"
            y="280"
            width="680"
            height="100"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <text
            x="370"
            y="300"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            热重载流程 Hot Reload
          </text>

          {[
            { x: 50, label: "改脚本", sub: "保存 .lua", c: "var(--warning)" },
            {
              x: 215,
              label: "文件监听",
              sub: "Watch 触发",
              c: "var(--accent)",
            },
            {
              x: 380,
              label: "重新加载",
              sub: "新 VM/状态机",
              c: "var(--success)",
            },
            {
              x: 545,
              label: "状态恢复",
              sub: "序列化重建",
              c: "var(--danger)",
            },
          ].map((s, i) => (
            <g key={i}>
              <rect
                x={s.x}
                y="312"
                width="150"
                height="50"
                rx="8"
                fill={s.c}
                fillOpacity="0.12"
                stroke={s.c}
                strokeWidth="1.2"
              />
              <text
                x={s.x + 75}
                y="334"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
              <text
                x={s.x + 75}
                y="352"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.sub}
              </text>
              {i < 3 && (
                <text
                  x={s.x + 165}
                  y="340"
                  textAnchor="middle"
                  fontSize="16"
                  fill="var(--text-tertiary)"
                >
                  &rarr;
                </text>
              )}
            </g>
          ))}

          {/* 底部 */}
          <rect
            x="30"
            y="394"
            width="680"
            height="30"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="414"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            分界：性能关键走 C++，频繁改动走脚本——热重载只重建脚本层，引擎不停
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        脚本系统——绑定层桥接 C++ 与脚本，热重载只替换脚本层、引擎运行时不中断
      </figcaption>
    </figure>
  );
}
