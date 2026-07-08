/**
 * <LopShellScriptingDiagram>：Shell脚本编程——执行流程与核心语法图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function LopShellScriptingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Shell脚本编程执行流程与核心语法图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Shell 脚本：执行流程与核心语法
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Shebang &gt; 变量 &gt; 条件 &gt; 循环 &gt; 函数 &gt; 管道组合
          </text>

          {/* 执行流程 */}
          <rect x="40" y="70" width="660" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="94" fontSize="13" fontWeight="600" fill="var(--accent)">脚本执行流程</text>

          <rect x="60" y="108" width="100" height="30" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="110" y="128" textAnchor="middle" fontSize="10" fill="var(--warning)">#!/bin/bash</text>

          <text x="175" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="195" y="108" width="100" height="30" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="245" y="128" textAnchor="middle" fontSize="10" fill="var(--accent)">逐行读取</text>

          <text x="310" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="330" y="108" width="100" height="30" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="380" y="128" textAnchor="middle" fontSize="10" fill="var(--success)">变量展开</text>

          <text x="445" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="465" y="108" width="100" height="30" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="515" y="128" textAnchor="middle" fontSize="10" fill="var(--danger)">命令执行</text>

          <text x="580" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="600" y="108" width="80" height="30" rx="6" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="640" y="128" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">退出码$?</text>

          {/* 核心语法 */}
          <rect x="40" y="170" width="320" height="250" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="194" fontSize="13" fontWeight="600" fill="var(--text-primary)">变量与条件</text>

          <text x="60" y="216" fontSize="10" fill="var(--success)" fontFamily="monospace">name="Linux"      # 变量赋值</text>
          <text x="60" y="232" fontSize="10" fill="var(--success)" fontFamily="monospace">echo $name         # 引用变量</text>
          <text x="60" y="248" fontSize="10" fill="var(--success)" fontFamily="monospace">$1 $2 ...          # 位置参数</text>
          <text x="60" y="264" fontSize="10" fill="var(--success)" fontFamily="monospace">$(command)         # 命令替换</text>

          <text x="60" y="290" fontSize="11" fontWeight="600" fill="var(--accent)">条件判断</text>
          <text x="60" y="310" fontSize="10" fill="var(--accent)" fontFamily="monospace">if [ -f file ]; then</text>
          <text x="60" y="324" fontSize="10" fill="var(--accent)" fontFamily="monospace">  echo "exists"</text>
          <text x="60" y="338" fontSize="10" fill="var(--accent)" fontFamily="monospace">elif [ -d file ]; then</text>
          <text x="60" y="352" fontSize="10" fill="var(--accent)" fontFamily="monospace">  echo "is dir"</text>
          <text x="60" y="366" fontSize="10" fill="var(--accent)" fontFamily="monospace">else</text>
          <text x="60" y="380" fontSize="10" fill="var(--accent)" fontFamily="monospace">  echo "not found"</text>
          <text x="60" y="394" fontSize="10" fill="var(--accent)" fontFamily="monospace">fi</text>
          <text x="60" y="412" fontSize="10" fill="var(--text-tertiary)">-f 文件  -d 目录  -x 可执行</text>

          {/* 循环与函数 */}
          <rect x="380" y="170" width="320" height="250" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="400" y="194" fontSize="13" fontWeight="600" fill="var(--text-primary)">循环与函数</text>

          <text x="400" y="216" fontSize="11" fontWeight="600" fill="var(--warning)">for 循环</text>
          <text x="400" y="236" fontSize="10" fill="var(--warning)" fontFamily="monospace">for f in *.txt; do</text>
          <text x="400" y="250" fontSize="10" fill="var(--warning)" fontFamily="monospace">  cp $f /backup/</text>
          <text x="400" y="264" fontSize="10" fill="var(--warning)" fontFamily="monospace">done</text>

          <text x="400" y="290" fontSize="11" fontWeight="600" fill="var(--danger)">while 循环</text>
          <text x="400" y="310" fontSize="10" fill="var(--danger)" fontFamily="monospace">while read line; do</text>
          <text x="400" y="324" fontSize="10" fill="var(--danger)" fontFamily="monospace">  echo $line</text>
          <text x="400" y="338" fontSize="10" fill="var(--danger)" fontFamily="monospace">done &lt; input.txt</text>

          <text x="400" y="364" fontSize="11" fontWeight="600" fill="var(--success)">函数定义</text>
          <text x="400" y="384" fontSize="10" fill="var(--success)" fontFamily="monospace">backup() &lbrace;</text>
          <text x="400" y="398" fontSize="10" fill="var(--success)" fontFamily="monospace">  tar czf $1.tar.gz $1</text>
          <text x="400" y="412" fontSize="10" fill="var(--success)" fontFamily="monospace">&rbrace;</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Shell脚本编程图解——执行流程、变量条件、循环函数与管道组合
      </figcaption>
    </figure>
  );
}
