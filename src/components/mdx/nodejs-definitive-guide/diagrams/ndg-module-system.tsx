/**
 * <NdgModuleSystemDiagram>：CommonJS 与 ESM 模块系统对比图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function NdgModuleSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CommonJS与ESM模块系统对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CommonJS vs ESM 模块系统对比
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            require/exports（同步动态） vs import/export（异步静态）
          </text>

          {/* 左侧：CommonJS */}
          <rect x="30" y="66" width="330" height="350" rx="12" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">CommonJS (CJS)</text>
          <text x="195" y="104" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">module.exports / require()</text>

          <rect x="50" y="118" width="290" height="50" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="134" fontSize="9" fill="var(--text-tertiary)">导出</text>
          <text x="60" y="150" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">module.exports = fn</text>
          <text x="60" y="162" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">exports.prop = val</text>

          <rect x="50" y="178" width="290" height="50" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="194" fontSize="9" fill="var(--text-tertiary)">导入</text>
          <text x="60" y="210" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">const fs = require("fs")</text>
          <text x="60" y="222" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">const {x} = require("./m")</text>

          <rect x="50" y="238" width="290" height="68" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="254" fontSize="9" fill="var(--text-tertiary)">require 机制</text>
          <text x="60" y="270" fontSize="9" fill="var(--text-secondary)">1. 路径解析（核心/文件/目录/node_modules）</text>
          <text x="60" y="284" fontSize="9" fill="var(--text-secondary)">2. 文件定位（.js/.json/.node + index）</text>
          <text x="60" y="298" fontSize="9" fill="var(--text-secondary)">3. 编译执行（包装函数 + 缓存）</text>

          <rect x="50" y="316" width="290" height="86" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="332" fontSize="9" fill="var(--text-tertiary)">特性</text>
          <text x="60" y="348" fontSize="9" fill="var(--text-secondary)">同步加载、运行时求值、值拷贝</text>
          <text x="60" y="362" fontSize="9" fill="var(--text-secondary)">缓存 module._cache、可条件加载</text>
          <text x="60" y="376" fontSize="9" fill="var(--text-secondary)">this === module.exports（非 window）</text>
          <text x="60" y="390" fontSize="9" fill="var(--text-secondary)">不支持顶层 await</text>

          {/* 右侧：ESM */}
          <rect x="380" y="66" width="330" height="350" rx="12" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">ES Modules (ESM)</text>
          <text x="545" y="104" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">export / import</text>

          <rect x="400" y="118" width="290" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="410" y="134" fontSize="9" fill="var(--text-tertiary)">导出</text>
          <text x="410" y="150" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">export default fn</text>
          <text x="410" y="162" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">export const x = val</text>

          <rect x="400" y="178" width="290" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="410" y="194" fontSize="9" fill="var(--text-tertiary)">导入</text>
          <text x="410" y="210" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">import fs from "fs"</text>
          <text x="410" y="222" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">import {x} from "./m.js"</text>

          <rect x="400" y="238" width="290" height="68" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="410" y="254" fontSize="9" fill="var(--text-tertiary)">加载机制</text>
          <text x="410" y="270" fontSize="9" fill="var(--text-secondary)">1. 解析（构建阶段静态分析）</text>
          <text x="410" y="284" fontSize="9" fill="var(--text-secondary)">2. 实例化（实时绑定 live binding）</text>
          <text x="410" y="298" fontSize="9" fill="var(--text-secondary)">3. 求值（异步拓扑排序执行）</text>

          <rect x="400" y="316" width="290" height="86" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="410" y="332" fontSize="9" fill="var(--text-tertiary)">特性</text>
          <text x="410" y="348" fontSize="9" fill="var(--text-secondary)">异步加载、静态分析、值引用（live binding）</text>
          <text x="410" y="362" fontSize="9" fill="var(--text-secondary)">支持 tree-shaking、顶层 await</text>
          <text x="410" y="376" fontSize="9" fill="var(--text-secondary)">this === undefined（严格模式）</text>
          <text x="410" y="390" fontSize="9" fill="var(--text-secondary)">import 必须在顶层、路径带扩展名</text>

          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键差异：CJS 值拷贝 + 同步动态 vs ESM 实时绑定 + 静态异步
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CommonJS与ESM模块系统对比——require机制、export/import语法、加载时机的本质差异
      </figcaption>
    </figure>
  );
}
