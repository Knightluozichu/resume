"use client";

import { useState } from "react";

type View = "scope" | "decision" | "recovery";
type Scenario = "baseline" | "fault" | "recovery";
type VisualKind = "pipeline" | "timeline" | "ladder" | "claims" | "matrix" | "budget" | "topology" | "ecosystem" | "layers" | "boundary" | "scheduler" | "lifecycle" | "raci" | "stack" | "gates" | "scenarios" | "closure";
type HmiModel = {
  studio: string;
  boundary: string;
  axisA: { label: string; levels: readonly [string, string, string] };
  axisB: { label: string; levels: readonly [string, string, string] };
  fault: string;
  invariant: string;
  artifact: string;
  signal: string;
  practiceMode: string;
};
type Props = { unitId: string; title: string; concepts: readonly string[]; chain: readonly string[]; model: HmiModel; view: View };

type VisualSpec = {
  kind: VisualKind;
  heading: string;
  caption: string;
  items: readonly string[];
  columns?: readonly [string, string, string];
  center?: string;
};

const visualByUnit: Record<string, VisualSpec> = {
  "uhm-2024-official-learning-map": { kind: "pipeline", heading: "从演讲页到发布决定", caption: "任何箭头都不能跨过配置锁与目标机反例。", items: ["演讲原页与时点", "主张分类与边界", "SoC/OS/构建配置锁", "目标机实验与故障", "发布或回滚签署"] },
  "uhm-2024-slide-01-cover": { kind: "topology", heading: "车载 HMI 对象边界", caption: "Unity 运行时只是座舱链路中的一段；信号源、显示所有者和安全兜底另有责任主体。", center: "Unity HMI 运行时", items: ["车辆信号网关", "定位/地图数据", "驾驶员输入", "后台业务服务", "仪表 Cluster", "中控 IVI", "副驾/后排屏", "安全兜底通道"] },
  "uhm-2024-slide-02-new-chapter": { kind: "timeline", heading: "主张的时间坐标", caption: "演讲事实、项目假设与当前产品资料必须并列留档，不能互相覆盖。", items: ["演讲题名与讲者", "UNITE 2024 现场语境", "2024-08-01 PDF 元数据", "项目立项与平台锁定", "当前官方资料复核"] },
  "uhm-2024-slide-03-made-with-unity": { kind: "ladder", heading: "展示材料的证据上限", caption: "车型展示只能支持“存在”，不能跳级推出适用、稳定或量产通过。", items: ["展示页出现", "存在性主张", "版本与配置补证", "目标机复现实验", "量产签署证据"] },
  "uhm-2024-slide-04-production-evidence": { kind: "claims", heading: "采用数字的口径拆解", caption: "数字保留原演讲口径与 2024 时点；不把采用规模当成技术保证。", items: ["85%：先核对分母与统计对象", "35：先核对车企/伙伴口径", "68：先核对车型、配置与截止日"] },
  "uhm-2024-slide-05-beijing-auto-show": { kind: "matrix", heading: "车展样本配置矩阵", caption: "同名车型、展车画面与目标量产配置不是同一证据。", columns: ["展车", "工程样车", "量产车"], items: ["车型 + 配置版本", "SoC + BSP + OS", "显示角色 + 分辨率", "Unity 构建 ID", "冷启动/休眠恢复", "证据来源与责任人"] },
  "uhm-2024-slide-06-model-performance-budget": { kind: "budget", heading: "目标机一帧的证据通道", caption: "33.3 ms 只是 30 FPS 的期限；瓶颈归因必须来自同一目标构建的多通道采集。", items: ["主线程：脚本与信号绑定", "渲染线程：剔除与提交", "GPU：几何/像素/后处理", "系统合成：Surface 与显示等待"] },
  "uhm-2024-slide-07-soc-os-compatibility": { kind: "matrix", heading: "SoC—OS 组合验收矩阵", caption: "芯片名和 OS 名分别出现，不等于该版本组合受支持。", columns: ["启动显示", "压力长跑", "休眠恢复"], items: ["SoC 型号与步进", "BSP 与 GPU 驱动", "OS 镜像与补丁", "GLES/Vulkan 配置", "Unity 运行时版本", "签名构建与回滚包"] },
  "uhm-2024-slide-08-architecture-combinations": { kind: "topology", heading: "座舱部署与跨域边界", caption: "每条信号、图像和输入边都要定义超时、所有者、降级与重连。", center: "SoC / VM / OS 域", items: ["车辆信号源", "触控/旋钮输入", "跨域 IPC", "共享渲染服务", "仪表进程", "中控进程", "Surface/共享纹理", "系统合成器"] },
  "uhm-2024-slide-09-ecosystem": { kind: "ecosystem", heading: "第三方依赖的隔离与兜底", caption: "伙伴名单不等于已授权、已集成或失效时仍安全。", center: "依赖适配与隔离层", items: ["地图 SDK + 许可", "实时车辆信号", "地图数据新鲜度", "音画伙伴服务", "版本化数据接口", "Unity HMI View", "超时/坏数据检测", "安全通道兜底"] },
  "uhm-2024-slide-10-head-unit-edition": { kind: "gates", heading: "车机版进入项目的五道门", caption: "产品名称不能替代许可、平台和车辆接口确认。", items: ["受众与显示对象", "许可/支持范围", "SoC/OS 版本锁", "车辆信号合同", "量产验收与回滚"] },
  "uhm-2024-slide-11-tuanjie-head-unit": { kind: "matrix", heading: "共享内容与平台差异", caption: "一次制作可以复用内容，但每个平台仍要单独构建、诊断与恢复。", columns: ["Android", "QNX/Linux", "OpenHarmony"], items: ["2022 LTS 内容基线", "平台模块与许可", "BSP/图形驱动", "图层与输入路由", "签名/符号/日志", "目标机回滚"] },
  "uhm-2024-slide-12-qnx-support": { kind: "layers", heading: "QNX 目标机诊断栈", caption: "编辑器不能证明 Screen 图层、多点触控和目标调度行为。", items: ["Unity HMI Player", "Screen Window / Surface", "触控坐标与输入路由", "线程策略与资源限制", "QNX 图形驱动/BSP", "slogger2 + Target Profiler"] },
  "uhm-2024-slide-13-embedded-linux-support": { kind: "layers", heading: "Embedded Linux 系统集成栈", caption: "开发 PC 与 ARM 目标镜像的 ABI、合成器、驱动和实时行为不能混用。", items: ["Unity HMI 服务", "systemd 启动与看门狗", "Wayland/系统合成器", "CPU 亲和与资源限制", "BSP/图形驱动", "系统日志与恢复记录"] },
  "uhm-2024-slide-14-tuanjie-engine": { kind: "boundary", heading: "公开信息的可推理边界", caption: "越过目标机行为以后属于未公开实现，必须停止猜测。", items: ["公开演讲主张", "公开产品接口", "项目合同与版本", "目标机可观察行为", "未公开内部实现"] },
  "uhm-2024-slide-15-uras-architecture": { kind: "topology", heading: "URAS 服务所有权拓扑", caption: "View、Surface、客户端和系统合成器分别拥有不同生命周期。", center: "URAS 后台渲染服务", items: ["车辆应用客户端", "地图应用客户端", "ADAS 应用客户端", "View 注册/尺寸合同", "GPU 配额与调度", "Surface 所有权", "输入路由", "系统合成器"] },
  "uhm-2024-slide-16-uras-unified-rendering": { kind: "scheduler", heading: "多 View 统一渲染调度", caption: "共享引擎节省多少资源要实测；关键 View 的优先级、配额和故障隔离必须显式。", items: ["注册请求", "优先级", "GPU 配额", "内存上限", "帧截止时间", "车控 View", "ADAS View", "APA View", "音乐 View", "地图 View"] },
  "uhm-2024-slide-17-uras-view-isolation": { kind: "lifecycle", heading: "View 与 Surface 生命周期", caption: "杀死一个客户端后，其他 View 应继续显示，遗留 Surface 与 GPU 资源必须按时回收。", items: ["注册 View", "绑定 Surface", "尺寸/输入变化", "客户端退出", "资源回收与重连"] },
  "uhm-2024-slide-18-unity-china": { kind: "raci", heading: "组织主张到项目责任", caption: "组织介绍不自动生成 SLA；每个承诺都要落到合同、交付物和升级人。", items: ["产品许可与版本支持", "平台集成与构建", "整车验收与发布"] },
  "uhm-2024-slide-19-timeline": { kind: "timeline", heading: "组织史与产品史分轨", caption: "组织、资本事件不能当作 HMI 功能发布日期。", items: ["2004：组织节点", "2012：进入中国语境", "2020：资本/组织节点", "2022：Unity 中国节点", "产品版本日期：另表核对"] },
  "uhm-2024-slide-20-capability-foundation": { kind: "stack", heading: "43 项能力的依赖分层", caption: "能力标签表示范围，不表示许可、成熟度或目标机通过。", items: ["应用创新场景", "引擎能力", "制作与低代码工具", "平台适配", "项目验收证据"] },
  "uhm-2024-slide-21-service-model": { kind: "gates", heading: "创新到接管的阶段门", caption: "PoC 画面通过不等于量产交付；每个阶段都有退出条件与下一责任人。", items: ["创新咨询与问题定义", "PoC 可行性验证", "量产实施与集成", "ISS 迭代与运维", "团队接管/回滚"] },
  "uhm-2024-slide-22-innovation-scenarios": { kind: "scenarios", heading: "六类场景的信号与安全降级", caption: "视觉创意必须服从驾驶条件、显示优先级和失效降级。", items: ["车模：状态信号与材质", "座舱：车控与舒适功能", "地图：定位与数据时效", "智驾：感知结果与警示", "OS：窗口/输入/生命周期", "跨域：信号/图像/控制边界"] },
  "uhm-2024-slide-23-evidence-closure": { kind: "closure", heading: "演讲结束后的证据关闭", caption: "Thank you 只结束演讲；未决主张必须有状态、责任人和截止条件。", items: ["页码与主张索引", "已验证/待验证/不适用", "目标机原始证据", "阻塞项与回滚条件", "产品/平台/质量签署"] },
  "uhm-2024-official-final-review": { kind: "gates", heading: "全材料量产答辩路径", caption: "只接受同一构建和配置下的来源、性能、恢复与签署证据。", items: ["23 页来源与边界", "平台版本坐标锁", "场景预算与长尾", "故障隔离与恢复", "发布/有条件通过/退回"] },
};

const scenarioLabels: Record<Scenario, string> = { baseline: "基线路径", fault: "故障传播", recovery: "隔离后恢复" };
const palette = ["var(--accent)", "var(--success)", "var(--warning)", "var(--danger)", "#0891b2", "#7c3aed"];
const short = (value: string, limit = 24) => value.length > limit ? `${value.slice(0, limit)}…` : value;

function Pipeline({ stages, active }: { stages: readonly string[]; active: number }) {
  return <ol className="grid gap-2 sm:grid-cols-5">{stages.slice(0, 5).map((stage, index) => <li key={stage} className={`relative min-h-20 rounded border p-3 text-xs leading-5 ${active === index ? "border-violet-600 bg-violet-50 text-violet-950 dark:bg-violet-950 dark:text-violet-50" : "border-zinc-300 dark:border-zinc-700"}`}><span className="mb-2 block font-mono font-bold">0{index + 1}</span>{stage}{index < 4 && <span className="absolute -right-2 top-7 z-10 hidden bg-white px-1 text-zinc-500 sm:block dark:bg-zinc-950" aria-hidden>→</span>}</li>)}</ol>;
}

function Timeline({ items, active }: { items: readonly string[]; active: number }) {
  return <ol className="relative pl-5 before:absolute before:left-[9px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-zinc-300 before:content-[''] dark:before:bg-zinc-700">{items.slice(0, 7).map((item, index) => <li key={`${item}-${index}`} className={`relative mb-2 min-h-11 w-full rounded border px-4 py-2 text-left text-xs ${active === index ? "border-cyan-600 bg-cyan-50 font-semibold dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}><span className="absolute -left-[21px] top-4 size-3 rounded-full border-2 border-white bg-cyan-600 dark:border-zinc-950" aria-hidden />{item}</li>)}</ol>;
}

function Ladder({ items, active }: { items: readonly string[]; active: number }) {
  const labels = ["原页出现", "边界解释", "项目配置", "目标机反例", "发布证据"];
  return <div className="grid gap-2">{labels.map((label, index) => <div key={label} className={`grid min-h-12 grid-cols-[2rem_8rem_1fr] items-center gap-3 rounded border px-3 py-2 text-xs ${active === index ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "border-zinc-300 dark:border-zinc-700"}`}><strong className="font-mono">{index + 1}</strong><span>{label}</span><span className="text-zinc-600 dark:text-zinc-300">{items[index % items.length]}</span></div>)}</div>;
}

function Claims({ items, active }: { items: readonly string[]; active: number }) {
  return <div className="grid gap-3 sm:grid-cols-3">{items.slice(0, 3).map((item, index) => { const number = item.match(/85%|35|68/)?.[0] ?? String(index + 1); return <div key={item} className={`rounded border p-4 ${active === index ? "border-amber-600 bg-amber-50 dark:bg-amber-950" : "border-zinc-300 dark:border-zinc-700"}`}><strong className="block text-3xl text-amber-700 dark:text-amber-300">{number}</strong><p className="mt-2 text-xs leading-5">{item}</p><p className="mt-3 border-t border-current/20 pt-2 text-[11px] text-zinc-600 dark:text-zinc-300">必须附：口径 · 分母 · 2024时点</p></div>; })}</div>;
}

function Matrix({ rows, columns, activeRow, activeColumn }: { rows: readonly string[]; columns: readonly string[]; activeRow: number; activeColumn: number }) {
  const selectedRow = rows[activeRow] ?? rows[0];
  return <><div className="grid gap-2 sm:hidden"><div className="rounded border border-cyan-600 bg-cyan-50 p-3 text-xs text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50"><span className="block text-[11px] opacity-75">当前目标对象</span><strong className="mt-1 block">{selectedRow}</strong></div>{columns.map((column, columnIndex) => <div key={column} className={`grid min-h-12 grid-cols-[1fr_auto] items-center gap-3 rounded border p-3 text-xs ${columnIndex === activeColumn ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}><strong>{column}</strong><span>{columnIndex === activeColumn ? "当前待验" : "独立确认"}</span></div>)}<p className="text-[11px] text-zinc-500">其余目标对象逐项切换核对，不能用一格结果外推整行或整表。</p></div><div className="hidden overflow-x-auto sm:block"><div className="min-w-[560px] rounded border border-zinc-300 dark:border-zinc-700"><div className="grid grid-cols-[1.5fr_repeat(3,1fr)] bg-zinc-100 text-xs font-semibold dark:bg-zinc-900"><span className="p-2">目标对象</span>{columns.map((column) => <span key={column} className="border-l border-zinc-300 p-2 text-center dark:border-zinc-700">{column}</span>)}</div>{rows.slice(0, 6).map((row, rowIndex) => <div key={`${row}-${rowIndex}`} className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-t border-zinc-300 text-xs dark:border-zinc-700"><span className="p-2">{short(row, 28)}</span>{columns.map((column, columnIndex) => <span key={column} className={`border-l border-zinc-300 p-2 text-center dark:border-zinc-700 ${rowIndex === activeRow && columnIndex === activeColumn ? "bg-cyan-100 font-semibold text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50" : "text-zinc-500"}`}>{rowIndex === activeRow && columnIndex === activeColumn ? "当前待验组合" : "需独立确认"}</span>)}</div>)}</div></div></>;
}

function Budget({ items, active }: { items: readonly string[]; active: number }) {
  return <div><div className="mb-3 grid gap-2 rounded border border-dashed border-amber-500 bg-amber-50 p-3 text-xs text-amber-950 sm:grid-cols-[1fr_auto] dark:bg-amber-950 dark:text-amber-50"><strong>30 FPS 的显示期限：33.3 ms</strong><span>验收：P50 / P95 / P99 + 峰值 + 画质差异</span></div><div className="grid gap-2 sm:grid-cols-2">{items.map((lane, index) => <div key={lane} className={`min-h-20 rounded border p-3 text-xs ${active === index ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}><span className="mb-2 block size-3 rounded-full" style={{ background: palette[index] }} aria-hidden /><strong>{lane}</strong><p className="mt-2 text-zinc-600 dark:text-zinc-300">采集原始时间线；禁止用任意宽度或平均 FPS 伪造占比。</p></div>)}</div><div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs"><span className="rounded border px-2 py-1">固定构建/场景</span><span aria-hidden>→</span><span className="rounded border px-2 py-1">同步采集四通道</span><span aria-hidden>→</span><span className="rounded border px-2 py-1">定位首个过界通道</span></div></div>;
}

function Topology({ center, items, active }: { center: string; items: readonly string[]; active: number }) {
  return <div className="grid gap-3 md:grid-cols-[1fr_12rem_1fr] md:items-center"><div className="grid gap-2">{items.slice(0, 4).map((item, index) => <div key={`${item}-${index}`} className={`min-h-11 rounded border p-2 text-xs ${active === index ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}>{short(item)}</div>)}</div><div className="rounded border-2 border-violet-600 bg-violet-50 p-4 text-center text-xs font-bold text-violet-950 dark:bg-violet-950 dark:text-violet-50"><span className="mb-2 block text-lg" aria-hidden>⇄</span>{center}</div><div className="grid gap-2">{items.slice(4, 8).map((item, index) => <div key={`${item}-${index}`} className={`min-h-11 rounded border p-2 text-xs ${active === index + 4 ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "border-zinc-300 dark:border-zinc-700"}`}>{short(item)}</div>)}</div></div>;
}

function Layers({ stages, active }: { stages: readonly string[]; active: number }) {
  return <div className="mx-auto grid max-w-xl gap-1">{stages.slice(0, 6).map((stage, index) => <div key={stage} className={`min-h-12 rounded border px-4 py-3 text-center text-xs ${active === index ? "border-orange-600 bg-orange-50 font-semibold text-orange-950 dark:bg-orange-950 dark:text-orange-50" : "border-zinc-300 dark:border-zinc-700"}`} style={{ marginInline: `${index * 10}px` }}>{stage}</div>)}</div>;
}

function Scheduler({ items, active }: { items: readonly string[]; active: number }) {
  const clients = items.slice(5, 10);
  return <div className="grid gap-4"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{clients.map((client, index) => <div key={client} className={`rounded border p-2 text-center text-xs ${active === index ? "border-rose-600 bg-rose-50 dark:bg-rose-950" : "border-zinc-300 dark:border-zinc-700"}`}>{short(client, 14)}<span className="mt-2 block" aria-hidden>↓</span></div>)}</div><div className="rounded border-2 border-cyan-600 bg-cyan-50 p-3 text-center text-sm font-semibold text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50">统一渲染服务：注册 · 优先级 · 配额 · 帧调度</div><div className="grid grid-cols-3 gap-2 text-center text-xs"><span className="rounded border p-2">关键 View</span><span className="rounded border p-2">普通 View</span><span className="rounded border p-2">系统合成器</span></div></div>;
}

function Lifecycle({ active }: { active: number }) { return <Pipeline stages={["注册 View", "绑定 Surface", "尺寸/输入变化", "客户端退出", "回收并重连"]} active={active} />; }

function Raci({ items, active }: { items: readonly string[]; active: number }) {
  const roles = ["供应商", "集成方", "车企"];
  return <div className="grid gap-2 sm:grid-cols-3">{roles.map((role, index) => <div key={role} className={`rounded border p-3 ${active === index ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}><strong className="text-sm">{role}</strong><ul className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-300"><li>负责：{items[index % items.length]}</li><li>交付：接口/构建/证据</li><li>升级：具名责任人与时限</li></ul></div>)}</div>;
}

function Stack({ items, active }: { items: readonly string[]; active: number }) {
  const layers = ["应用创新", "引擎创新", "制作与低代码工具", "运行时与平台适配", "目标车验收证据"];
  return <div className="grid gap-2">{layers.map((layer, index) => <div key={layer} className={`rounded border px-4 py-3 text-xs ${active === index ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}><strong>{layer}</strong><span className="ml-3 text-zinc-500">{short(items[(active * 5 + index) % items.length], 34)}</span></div>)}</div>;
}

function Gates({ stages, active }: { stages: readonly string[]; active: number }) { return <Pipeline stages={stages.length >= 5 ? stages : ["范围确认", "平台确认", "目标机构建", "故障与恢复", "发布/回滚"]} active={active} />; }

function Scenarios({ items, active }: { items: readonly string[]; active: number }) {
  const groups = ["3D车模", "3D座舱", "地图导航", "智能驾驶", "OS创新", "跨域创新"];
  return <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{groups.map((group, index) => <div key={group} className={`rounded border p-3 ${active === index ? "border-rose-600 bg-rose-50 dark:bg-rose-950" : "border-zinc-300 dark:border-zinc-700"}`}><strong className="text-sm">{group}</strong><p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">{short(items[index * 10] ?? items[index], 30)}</p><p className="mt-2 text-[11px]">信号源 · 驾驶条件 · 显示优先级 · 失效降级</p></div>)}</div>;
}

function DomainVisual({ spec, active, axisA, axisB, view }: { spec: VisualSpec; active: number; axisA: number; axisB: number; view: View }) {
  const { kind, items } = spec;
  if (kind === "timeline") return <Timeline items={items} active={active % Math.min(items.length, 7)} />;
  if (kind === "ladder" || kind === "closure") return <Ladder items={items} active={active % 5} />;
  if (kind === "claims") return <Claims items={items} active={active % 3} />;
  if (kind === "matrix") return <Matrix rows={items} columns={spec.columns ?? ["基线", "变化", "恢复"]} activeRow={view === "decision" ? (axisA * 2) % Math.min(items.length, 6) : active % Math.min(items.length, 6)} activeColumn={view === "decision" ? axisB : view === "recovery" ? active === 3 ? 1 : active === 4 ? 2 : 0 : 0} />;
  if (kind === "budget") return <Budget items={items} active={view === "decision" ? (axisA + axisB) % items.length : active % items.length} />;
  if (kind === "topology" || kind === "ecosystem") return <Topology center={spec.center ?? spec.heading} items={items} active={active % Math.min(items.length, 8)} />;
  if (kind === "layers" || kind === "boundary") return <Layers stages={items} active={active % Math.min(items.length, 6)} />;
  if (kind === "scheduler") return <Scheduler items={items} active={active % 5} />;
  if (kind === "lifecycle") return <Lifecycle active={active % 5} />;
  if (kind === "raci") return <Raci items={items} active={active % 3} />;
  if (kind === "stack") return <Stack items={items} active={active % 5} />;
  if (kind === "scenarios") return <Scenarios items={items} active={active % 6} />;
  if (kind === "gates") return <Gates stages={items} active={active % 5} />;
  return <Pipeline stages={items} active={active % 5} />;
}

export function OfficialUnityHmiLab({ unitId, title, concepts, chain, model, view }: Props) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [axisA, setAxisA] = useState(1);
  const [axisB, setAxisB] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const reset = () => { setConceptIndex(0); setAxisA(1); setAxisB(1); setScenario("baseline"); };
  const spec = visualByUnit[unitId] ?? { kind: "pipeline", heading: title, caption: model.boundary, items: chain };
  const active = view === "scope" ? conceptIndex : view === "decision" ? axisA * 3 + axisB : scenario === "baseline" ? 0 : scenario === "fault" ? 3 : 4;
  const current = concepts[conceptIndex] ?? title;

  return <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={`${title} · ${spec.heading}专属图`} data-uhm-unit={unitId} data-visual-kind={spec.kind}>
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"><div className="min-w-0"><p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">Unity for HMI 2024 · {view === "scope" ? "机制图" : view === "decision" ? "变量实验" : "故障路径"}</p><h3 className="break-words text-base font-semibold">{spec.heading}</h3><p className="mt-1 max-w-3xl text-xs font-normal text-zinc-600 dark:text-zinc-300">{spec.caption}</p></div><button type="button" onClick={reset} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-zinc-300 bg-white px-3 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950" aria-label={`重置${model.studio}`}><span aria-hidden>↺</span></button></header>
    <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
      <div className="min-w-0 border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
        {view === "scope" && <><p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">点击原演讲节点，图中只高亮该对象在本页机制里的位置。</p><div className="mb-4 flex max-h-32 flex-wrap gap-2 overflow-y-auto">{concepts.map((concept, index) => <button key={`${concept}-${index}`} type="button" onClick={() => setConceptIndex(index)} aria-pressed={conceptIndex === index} className={`min-h-11 rounded border px-3 py-2 text-left text-xs ${conceptIndex === index ? "border-cyan-700 bg-cyan-50 font-semibold dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}>{short(concept, 34)}</button>)}</div></>}
        {view === "decision" && <div className="mb-5 grid gap-4 sm:grid-cols-2">{[[model.axisA, axisA, setAxisA], [model.axisB, axisB, setAxisB]].map(([axis, value, setter]) => { const typed = axis as HmiModel["axisA"]; return <fieldset key={typed.label}><legend className="mb-2 text-sm font-semibold">{typed.label}</legend><div className="grid grid-cols-3 gap-2">{typed.levels.map((level, index) => <button key={level} type="button" onClick={() => (setter as (next: number) => void)(index)} aria-pressed={value === index} className={`min-h-11 rounded border px-2 py-2 text-xs [overflow-wrap:anywhere] ${value === index ? "border-violet-700 bg-violet-50 font-semibold dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}>{level}</button>)}</div></fieldset>; })}</div>}
        {view === "recovery" && <div className="mb-5 grid grid-cols-3 gap-2">{(Object.keys(scenarioLabels) as Scenario[]).map((item) => <button key={item} type="button" onClick={() => setScenario(item)} aria-pressed={scenario === item} className={`min-h-11 rounded border px-2 py-2 text-xs ${scenario === item ? "border-zinc-950 bg-zinc-950 font-semibold text-white dark:border-white dark:bg-white dark:text-zinc-950" : "border-zinc-300 dark:border-zinc-700"}`}>{scenarioLabels[item]}</button>)}</div>}
        <DomainVisual spec={spec} active={active} axisA={axisA} axisB={axisB} view={view} />
      </div>
      <aside className="min-w-0 p-4"><p className="text-xs font-semibold text-zinc-500">当前真实对象</p><p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">{current}</p><p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">{model.boundary}</p>{view === "decision" && <dl className="mt-4 grid gap-3 text-xs"><div className="rounded border p-3"><dt className="text-zinc-500">当前单变量</dt><dd className="mt-1 font-semibold">{model.axisA.levels[axisA]} × {model.axisB.levels[axisB]}</dd></div><div className="rounded border p-3"><dt className="text-zinc-500">必须观察</dt><dd className="mt-1 font-semibold">{model.signal}</dd></div></dl>}{view === "recovery" && <div className="mt-4 grid gap-3 text-xs"><div className={`rounded border p-3 ${scenario === "fault" ? "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50" : "border-zinc-300 dark:border-zinc-700"}`}><strong>故障：{model.fault}</strong></div><div className={`rounded border p-3 ${scenario === "recovery" ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-zinc-300 dark:border-zinc-700"}`}><strong>恢复断言：{model.invariant}</strong></div></div>}<div className="mt-4 rounded border border-cyan-500 bg-cyan-50 p-3 text-xs text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50"><strong>应保存的真实工件</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.artifact}</p></div></aside>
    </div>
  </section>;
}
