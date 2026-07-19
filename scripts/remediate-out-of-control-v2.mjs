#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "out-of-control";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/out-of-control/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/out-of-control-v2-profiles.json");

const SOURCES = {
  chineseCatalog: "https://read.douban.com/ebook/17495983/",
  officialToc: "https://kk.org/outofcontrol/contents.php",
  officialBook: "https://kk.org/books/out-of-control/",
};

function model(
  studio,
  axisA,
  levelsA,
  axisB,
  levelsB,
  success,
  risk,
  fault,
  task,
  practiceMode,
  riskA = 1,
  riskB = -1,
) {
  return {
    studio,
    axisA: { label: axisA, levels: levelsA },
    axisB: { label: axisB, levels: levelsB },
    outcomes: { success, risk, evidence: "证据可追溯度" },
    fault,
    task,
    practiceMode,
    riskEffects: [riskA, riskB],
  };
}

const MODELS = {
  "ooc16-official-learning-map": model(
    "四段路线编排台",
    "跨章连线密度",
    ["只读单章", "连接相邻章", "贯通四段"],
    "一次装载节点数",
    ["5个", "12个", "24个"],
    "路线覆盖率",
    "认知过载率",
    "只看九律结论而跳过逐章证据",
    "为一个陌生复杂系统选择首读章节并说明依赖",
    "design",
    -1,
    1,
  ),
  "ooc16-chinese-preface": model(
    "预测复盘时间轴",
    "原始主张冻结度",
    ["只留印象", "保留摘要", "保留原时点文本"],
    "反例采样强度",
    ["只找命中", "命中与偏差", "主动找未实现项"],
    "历史可解释度",
    "事后偏差",
    "用今天的术语反写1994年的预测",
    "把一条技术预测拆成原始主张、后来实现和仍未成立三栏",
    "diagnosis",
    -1,
    -1,
  ),
  "ooc16-chapter-01": model(
    "机械—生物设计连续谱",
    "局部自治",
    ["逐步命令", "边界内自治", "规则自修改"],
    "反馈可见度",
    ["结果不可见", "关键事件留痕", "全链路可回放"],
    "环境适应度",
    "责任漂移",
    "自治提升但没有收回权限",
    "为一台会适应环境的设备划定培育边界与停机条件",
    "design",
    1,
    -1,
  ),
  "ooc16-chapter-02": model(
    "蜂群信号聚合器",
    "信号独立性",
    ["共同来源", "部分独立", "异质独立"],
    "聚合门槛",
    ["单点触发", "简单多数", "带置信度法定数"],
    "群体判断质量",
    "级联误判率",
    "高连接度节点传播错误信号",
    "比较同质群体与异质群体在噪声任务中的首个分岔",
    "simulation",
    -1,
    -1,
  ),
  "ooc16-chapter-03": model(
    "具身行为栈",
    "传感回路延迟",
    ["长延迟", "周期采样", "动作即反馈"],
    "行为层互补度",
    ["同一策略", "两层抑制", "多层可退化"],
    "任务完成率",
    "内部模型漂移",
    "高层规划覆盖了避障反射",
    "注入传感延迟并定位具身机器的第一个错误动作",
    "diagnosis",
    -1,
    -1,
  ),
  "ooc16-chapter-04": model(
    "生态装配序列器",
    "增量步长",
    ["整套投入", "分批装配", "小步培育"],
    "路径试验数",
    ["单一路径", "三个复本", "多路径留档"],
    "稳定关系形成度",
    "路径锁定风险",
    "部件齐全但关键关系未形成",
    "安排一条从可活简单系统到复杂整体的装配顺序",
    "simulation",
    -1,
    -1,
  ),
  "ooc16-chapter-05": model(
    "共同进化收益地形",
    "策略多样性",
    ["单一", "两类互补", "多类并存"],
    "对手响应速度",
    ["静态", "滞后调整", "同步适应"],
    "动态共存窗口",
    "军备竞赛强度",
    "把移动中的适应度误当成固定最优值",
    "让两个相互适应的群体交换一次领先并解释为何没有永久赢家",
    "calculation",
    -1,
    1,
  ),
  "ooc16-chapter-06": model(
    "开放系统通量台",
    "自由能输入",
    ["接近停流", "维持通量", "高通量"],
    "变化来源",
    ["抑制差异", "保留扰动", "持续生成变异"],
    "非均衡持续度",
    "熵债务",
    "只量系统内部而忽略能量与废物边界",
    "画出一个活系统的能量输入、废物输出和身份更新环",
    "calculation",
    1,
    1,
  ),
  "ooc16-chapter-07": model(
    "机械反馈调速器",
    "反馈增益",
    ["不足", "适中", "过强"],
    "执行延迟",
    ["长延迟", "可测延迟", "近实时"],
    "目标跟踪度",
    "振荡幅度",
    "校正动作晚到并再次放大偏差",
    "根据偏差—动作—新状态轨迹诊断闭环振荡",
    "calculation",
    1,
    -1,
  ),
  "ooc16-chapter-08": model(
    "封闭生态收支表",
    "物质循环闭合度",
    ["大量外排", "部分回收", "主要闭合"],
    "慢变量监测",
    ["不监测", "抽样", "连续趋势"],
    "自持时长",
    "隐性耗竭",
    "短期氧气正常掩盖土壤或微量元素下降",
    "为瓶装生态系统做一张输入输出与救援阈值清单",
    "diagnosis",
    -1,
    -1,
  ),
  "ooc16-chapter-09": model(
    "生物圈共同驾驶舱",
    "生命角色多样性",
    ["少数计划物种", "保留边缘种", "允许角色迁移"],
    "人工干预频率",
    ["持续接管", "阈值干预", "只守安全边界"],
    "生态角色生成度",
    "管理依赖度",
    "每次意外都被管理者立即抹平",
    "判断一次季节调整是在救援系统还是阻断系统学习",
    "diagnosis",
    -1,
    1,
  ),
  "ooc16-chapter-10": model(
    "工业生态流量网",
    "副产物互补度",
    ["各自排放", "两点交换", "多节点循环"],
    "环境感知粒度",
    ["全局平均", "区域状态", "局部实时"],
    "资源循环收益",
    "外部性转移",
    "厂内废物下降但系统边界外污染上升",
    "为三个工序匹配副产物并检查被转移到边界外的代价",
    "design",
    -1,
    -1,
  ),
  "ooc16-chapter-11": model(
    "网络收益与错误预算",
    "有效连接数",
    ["孤立", "小群互通", "广域互联"],
    "错误隔离能力",
    ["全网传播", "分区降级", "局部熔断"],
    "网络共同价值",
    "系统级联半径",
    "连接增长快于错误治理能力",
    "比较增加一个节点带来的边际价值与新增攻击面",
    "calculation",
    1,
    -1,
  ),
  "ooc16-chapter-12": model(
    "电子货币协议沙盘",
    "兼容网络规模",
    ["封闭孤岛", "有限互通", "广泛可接受"],
    "结算与隐私门禁",
    ["无门禁", "事后审计", "最小披露并可追责"],
    "小额流通能力",
    "治理攻击面",
    "技术可转移被误写成经济可持续",
    "为一笔纳米支付分别核对密码、激励和治理三层",
    "design",
    1,
    -1,
  ),
  "ooc16-chapter-13": model(
    "可运行理论世界",
    "模型规则透明度",
    ["黑箱规则", "可读参数", "可修改并留痕"],
    "参与者自治",
    ["脚本角色", "局部选择", "开放策略"],
    "反事实探索力",
    "模型盲区",
    "模拟内胜利被直接外推为现实结论",
    "改动一条世界规则并记录参与者策略如何重组",
    "simulation",
    -1,
    1,
  ),
  "ooc16-chapter-14": model(
    "形式空间育种器",
    "候选变异跨度",
    ["微调", "重组", "跨区域跳变"],
    "选择反馈信息量",
    ["只给输赢", "排序", "多目标解释"],
    "新颖可用形态",
    "过早收敛率",
    "选择压力过强导致形式库迅速坍缩",
    "用变异、重组和选择找到一个未被直接画出的形态",
    "simulation",
    1,
    -1,
  ),
  "ooc16-chapter-15": model(
    "数字进化种群",
    "变异供给",
    ["几乎不变", "局部变异", "高变异"],
    "死亡选择压力",
    ["不淘汰", "资源竞争", "强淘汰"],
    "搜索改进幅度",
    "目标投机率",
    "种群利用评分漏洞而非解决任务",
    "设计一个包含表示、变异、评价和释放资源的进化回合",
    "simulation",
    1,
    1,
  ),
  "ooc16-chapter-16": model(
    "合成角色协同控制台",
    "代理动作自治",
    ["逐帧脚本", "目标驱动", "局部自选动作"],
    "人工收回速度",
    ["无法收回", "延迟覆盖", "即时降级"],
    "角色可信行为",
    "越界持续时间",
    "角色表现更自然但安全覆盖失效",
    "给合成角色分配目标、物理边界与人工接管条件",
    "design",
    1,
    -1,
  ),
  "ooc16-chapter-17": model(
    "开放式新奇性孵化器",
    "规则可修改度",
    ["规则固定", "参数可变", "生成规则可变"],
    "生存门槛多样性",
    ["单一目标", "双目标", "多生态位"],
    "持续新奇性",
    "无界失稳率",
    "把随机噪声误判成可持续创新",
    "区分一次偶然新形态与能继续产生后代的新规则",
    "simulation",
    1,
    -1,
  ),
  "ooc16-chapter-18": model(
    "三时间尺度变更台",
    "跨代保留强度",
    ["只改个体", "保留部分差异", "稳定遗传"],
    "规则元更新",
    ["规则固定", "学习率变化", "变化方式演化"],
    "跨环境适应度",
    "机制混淆率",
    "把个体学习结果误报成群体遗传变化",
    "用日志区分状态更新、跨代选择和元规则变化",
    "diagnosis",
    -1,
    1,
  ),
  "ooc16-chapter-19": model(
    "后达尔文机制拼图",
    "变异生成约束",
    ["假设均匀随机", "发育偏置", "结构化可达集"],
    "筛选层级",
    ["单层个体", "个体与群体", "网络与环境共同筛选"],
    "现象解释覆盖",
    "万能叙事风险",
    "选择被用来事后解释任何观察结果",
    "为一个形态分别列出变异供给、发育约束和选择证据",
    "diagnosis",
    -1,
    1,
  ),
  "ooc16-chapter-20": model(
    "自催化网络阈值台",
    "关系密度",
    ["碎片化", "接近阈值", "高度连通"],
    "功能选择反馈",
    ["不筛选", "弱筛选", "持续反馈"],
    "自调节闭合度",
    "脆弱级联率",
    "连通出现被误当成功能已经出现",
    "逐步增加连接并识别自催化闭环首次形成的时点",
    "calculation",
    1,
    -1,
  ),
  "ooc16-chapter-21": model(
    "长时序趋势审计器",
    "观察时间跨度",
    ["短窗口", "多阶段", "跨世代"],
    "逆向反例权重",
    ["忽略", "同权", "主动放大"],
    "趋势可信度",
    "目的论偏差",
    "只保留复杂性上升的谱系",
    "对七个趋势各找一条逆向记录并限制结论范围",
    "diagnosis",
    -1,
    -1,
  ),
  "ooc16-chapter-22": model(
    "局部预测转舵台",
    "预测时间跨度",
    ["全局长期", "局部中期", "动作级短期"],
    "模型多样性",
    ["单一模型", "两个模型", "异质模型组合"],
    "可行动准确度",
    "过度确信率",
    "预测发布后改变了被预测对象",
    "把一次全球预言改写为可反馈的短期行动循环",
    "simulation",
    -1,
    -1,
  ),
  "ooc16-chapter-23": model(
    "知识网络空洞扫描器",
    "来源链接可追踪度",
    ["无出处", "单向引用", "双向语境链"],
    "阅读路径多样性",
    ["唯一顺序", "有限分叉", "多路径可回溯"],
    "缺口发现率",
    "权威碎片化",
    "链接增加但来源责任被稀释",
    "在一张知识图上同时标出节点、连接和没有连接的空洞",
    "design",
    -1,
    1,
  ),
  "ooc16-chapter-24": model(
    "九律取舍矩阵",
    "自下而上授权",
    ["中央指定", "局部提案", "局部生成并审计"],
    "错误与多目标容纳",
    ["零错误单目标", "允许试错", "多目标保留反例"],
    "涌现设计收益",
    "责任真空风险",
    "九律被当成无需情境的保证公式",
    "为陌生系统选三条九律，并为每条写一项反例门禁",
    "design",
    1,
    -1,
  ),
  "ooc16-translator-postscript": model(
    "协作翻译版本网",
    "术语分歧可见度",
    ["覆盖分歧", "保留批注", "分歧与决策并存"],
    "版本责任链",
    ["匿名合并", "记录贡献", "修改可回溯到来源"],
    "协作校对质量",
    "语义漂移",
    "多数意见抹去关键少数译法",
    "对一个核心术语保留候选译法、选择理由和回退版本",
    "design",
    -1,
    -1,
  ),
  "ooc16-official-final-review": model(
    "九律反证答辩台",
    "跨章证据覆盖",
    ["只报结论", "引用相邻章", "贯通24章"],
    "失效注入强度",
    ["不做反例", "边界扰动", "故障与迁移双测"],
    "机制迁移可信度",
    "口号化风险",
    "九律全部勾选但没有任何可重放轨迹",
    "为一个陌生系统提交局部规则、涌现、故障和责任四份证据",
    "diagnosis",
    -1,
    -1,
  ),
};

function quotedArray(source, name) {
  const match = source.match(new RegExp(`${name}: \\[([\\s\\S]*?)\\],`));
  return match
    ? [...match[1].matchAll(/"([^"]*)"/g)].map((item) => item[1])
    : [];
}

function pascal(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function listPages() {
  return fs
    .readdirSync(CONTENT_ROOT)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .flatMap((sectionSlug) => {
      const sectionDir = path.join(CONTENT_ROOT, sectionSlug);
      return fs
        .readdirSync(sectionDir)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => ({
          sectionSlug,
          chapterSlug: file.replace(/\.mdx$/, ""),
          filePath: path.join(sectionDir, file),
        }));
    });
}

function outlineNotes(body) {
  const start = body.indexOf("## 权威目录坐标与核心知识");
  const end = body.indexOf("\n## 把主张变成", start);
  if (start < 0 || end < 0) return [];
  const section = body.slice(start, end);
  const headings = [...section.matchAll(/^### (.+)$/gm)];
  return headings.map((heading, index) => {
    const title = heading[1].trim();
    const from = heading.index + heading[0].length;
    const to = headings[index + 1]?.index ?? section.length;
    const block = section.slice(from, to);
    const note = block.match(/\*\*目录节点[^\n]*\*\*\s*([^\n]+)/)?.[1]?.trim();
    return {
      title,
      note: note || `${title}需要回到作者原文与可复核实验解释。`,
    };
  });
}

function bootstrapProfiles(pages, manifest) {
  const units = new Map(manifest.units.map((unit) => [unit.id, unit]));
  const profiles = pages.map((page, index) => {
    const raw = fs.readFileSync(page.filePath, "utf8");
    const parsed = matter(raw);
    const wrapperPath = path.join(COMPONENT_ROOT, `${page.chapterSlug}.tsx`);
    const wrapper = fs.readFileSync(wrapperPath, "utf8");
    const modelSpec = MODELS[page.chapterSlug];
    if (!modelSpec) throw new Error(`缺少章专属模型：${page.chapterSlug}`);
    const notes = outlineNotes(parsed.content);
    const unit = units.get(page.chapterSlug);
    const concepts = unit
      ? unit.concepts.map((alternatives) => alternatives[0])
      : notes.map((item) => item.title);
    return {
      ...page,
      order: index,
      title: String(parsed.data.title),
      description: String(parsed.data.description ?? ""),
      duty:
        parsed.content.match(/承担 \*\*([^*]+)\*\*/)?.[1]?.trim() ||
        parsed.content.match(/围绕 \*\*([^*]+)\*\*/)?.[1]?.trim() ||
        `${parsed.data.title}负责把作者命题转化为可复核的系统判断。`,
      nodes: quotedArray(wrapper, "nodes"),
      focuses: quotedArray(wrapper, "focuses"),
      concepts,
      notes: Object.fromEntries(notes.map((item) => [item.title, item.note])),
      componentBase: pascal(page.chapterSlug),
      officialUrl: /^ooc16-chapter-(\d+)$/.test(page.chapterSlug)
        ? `https://kk.org/outofcontrol/ch${Number(RegExp.$1)}-a.html`
        : page.chapterSlug.includes("official")
          ? SOURCES.officialToc
          : SOURCES.chineseCatalog,
      sourceBasis: /^ooc16-chapter-\d+$/.test(page.chapterSlug)
        ? "full-text"
        : "outline-only",
      model: modelSpec,
    };
  });
  fs.writeFileSync(
    PROFILE_PATH,
    `${JSON.stringify({ version: 2, bookSlug: BOOK, profiles }, null, 2)}\n`,
  );
  return profiles;
}

function replaceSection(body, startHeading, endHeading, replacement) {
  const start = body.indexOf(`## ${startHeading}`);
  const end = body.indexOf(`\n## ${endHeading}`, start);
  if (start < 0 || end < 0)
    throw new Error(`无法替换章节区段：${startHeading} → ${endHeading}`);
  return `${body.slice(0, start)}${replacement.trim()}\n${body.slice(end)}`;
}

function termEntries(profile) {
  const terms = [
    ...profile.focuses,
    profile.model.outcomes.success,
    profile.model.outcomes.risk,
  ].filter((value, index, array) => value && array.indexOf(value) === index);
  while (terms.length < 6)
    terms.push(`${profile.model.studio}证据${terms.length}`);
  return terms.slice(0, 6).map((term, index) => ({
    term,
    definition: [
      `${term}是${profile.title}中需要先固定对象与观察窗口的核心坐标。`,
      `${term}表示${profile.model.studio}里可被单变量改变并留下轨迹的因果候选。`,
      `${term}必须同时报告基线、故障和恢复，不能只截取最有利的一次运行。`,
      `${term}用于连接正式目录节点与${profile.model.outcomes.success}，并接受反事实检验。`,
      `${term}的适用范围受${profile.model.axisA.label}和${profile.model.axisB.label}共同限制。`,
      `${term}是${profile.title}的结论门禁；出现“${profile.model.fault}”时必须降级主张。`,
    ][index],
  }));
}

function sourceSection(profile) {
  const sourceDetail =
    profile.sourceBasis === "full-text"
      ? `作者官网[本章公开英文正文入口](${profile.officialUrl})用于核定机制、案例方向和1994年的时代语境，其余小节从官方目录逐项进入`
      : `公开页面仅用[2016中文版目录](${SOURCES.chineseCatalog})核定该单元名称与版次边界`;
  return `## 为什么从“${profile.model.studio}”开始

${profile.title}承担 **${profile.duty}**。本页不以“失控”“涌现”之类口号代替机制，而把${profile.model.axisA.label}与${profile.model.axisB.label}分开控制，以${profile.model.outcomes.success}和${profile.model.outcomes.risk}记录结果。直觉上，局部自由增加可能带来新能力，也可能同步扩大故障；只有反馈路径、边界和责任主体都可见时，放权才是设计选择。

先预测：把${profile.model.axisA.label}从“${profile.model.axisA.levels[1]}”改为“${profile.model.axisA.levels[2]}”，哪项结果先变化？再写下能推翻预测的观测，不允许运行后移动系统边界。

## 来源、版次与独立重写边界

本课程以[凯文·凯利官方完整目录](${SOURCES.officialToc})和[作者书目页](${SOURCES.officialBook})校对1994年原版24章结构，以[豆瓣阅读授权电子书目录](${SOURCES.chineseCatalog})核定陈新武译、电子工业出版社2016修订版ISBN 9787121272295及173个中文版目录节点。${sourceDetail}。

${profile.title}的中文解释、模型、图示、参数、练习与答案均为独立教学重写，不复制原作叙事或表达。课程沙盘不是作者量表；若涉及后来技术，只能作为迁移反例，不能倒填成1994年的原始判断。`;
}

function termsSection(profile) {
  const entries = termEntries(profile);
  return `## 本章术语与观察合同

${entries
  .map(
    ({ term, definition }) =>
      `<Term def=${JSON.stringify(definition)}>${term}</Term>`,
  )
  .join("、")}。

这六个词为${profile.title}建立最小观察语言：对象是${entries[0].term}，可控输入是${profile.model.axisA.label}和${profile.model.axisB.label}，主结果看${profile.model.outcomes.success}，副作用看${profile.model.outcomes.risk}。任何结论都要能回到一次可重放轨迹，而不能从目录标题直接推出。`;
}

function signedTerm(value, symbol) {
  return value < 0 ? `- ${Math.abs(value)}${symbol}` : `+ ${value}${symbol}`;
}

function modelSection(profile) {
  const symbolA = "A";
  const symbolB = "B";
  return `## ${profile.model.studio}的可复算模型

把${profile.model.axisA.label}编码为 ${symbolA}∈{0,1,2}，把${profile.model.axisB.label}编码为 ${symbolB}∈{0,1,2}。课程沙盘先用下式记录${profile.model.outcomes.success}，再单独报告风险，避免把收益与代价压成一个总分：

$$
S_{${profile.order}} = 42 + 16${symbolA} + 12${symbolB} - 20I_{fault} + 8I_{recovery}
$$

$$
R_{${profile.order}} = 36 ${signedTerm(profile.model.riskEffects[0] * 11, symbolA)} ${signedTerm(profile.model.riskEffects[1] * 9, symbolB)} + 28I_{fault} - 14I_{recovery}
$$

这里的 $S_{${profile.order}}$ 只表示${profile.model.outcomes.success}，$R_{${profile.order}}$ 只表示${profile.model.outcomes.risk}；两个式子是本课程的透明交互规则，不是原书公式。有效实验必须同时保存输入档位、故障“${profile.model.fault}”、首个分岔和复位后的初值。`;
}

function outlineSection(profile) {
  return `## 正式目录逐项深读

${profile.concepts
  .map((concept, index) => {
    const note =
      profile.notes[concept] ||
      `${concept}需要放回${profile.title}的机制链中解释，不能只列标题。`;
    const stage = profile.nodes[index % profile.nodes.length];
    const focus = profile.focuses[index % profile.focuses.length];
    return `### ${concept}

**目录证据 ${index + 1}/${profile.concepts.length}。** ${note}

验证节点${concept}时，先执行“${stage}”，仅改变${profile.model.axisA.label}或${profile.model.axisB.label}之一，并以${focus}定位首个可观察差异。若故障“${profile.model.fault}”没有改变预期轨迹，应拒绝当前因果解释，而不是补写事后故事。`;
  })
  .join("\n\n")}`;
}

function methodSection(profile) {
  return `## 把${profile.title}变成三段可操作实验

本页的任务是：${profile.model.task}。先冻结场景、初始状态和观察窗口；随后只调整${profile.model.axisA.label}或${profile.model.axisB.label}；最后注入“${profile.model.fault}”并回到初值。正常、故障、恢复三条轨迹缺一不可。

## 章专属交互实验

<Callout type="info" title="先预测，再操作${profile.model.studio}">
  先写下${profile.model.outcomes.success}与${profile.model.outcomes.risk}的变化方向，再点击控件。结果与预测不一致时，应修改机制假设，不得删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 目录节点与机制链">
    选择正式节点，核对它落在${profile.nodes.join("、")}的哪一步。

    <${profile.componentBase}MapLab />
  </Step>
  <Step title="2. 单变量反事实">
    一次只切换一个输入档位，比较正常与故障场景中的两个结果量。

    <${profile.componentBase}ExperimentLab />
  </Step>
  <Step title="3. 故障、恢复与复位">
    注入“${profile.model.fault}”，保存拒绝理由，再恢复并点击重置核对初值。

    <${profile.componentBase}EvidenceLab />
  </Step>
</Stepper>`;
}

function implementationSection(profile) {
  return (
    `## 可重放实验合同

\`\`\`yaml
unit: ${profile.chapterSlug}
studio: ${JSON.stringify(profile.model.studio)}
inputs:
  ${profile.model.axisA.label}: ${JSON.stringify(profile.model.axisA.levels)}
  ${profile.model.axisB.label}: ${JSON.stringify(profile.model.axisB.levels)}
scenarios: [baseline, fault, recovery]
fault: ${JSON.stringify(profile.model.fault)}
observe: [${profile.model.outcomes.success}, ${profile.model.outcomes.risk}, 证据可追溯度]
reset: restore_initial_inputs_and_clear_trace
\`\`\`

这份合同要求${profile.title}在相同输入下可重放。` +
    `若复位后${profile.model.outcomes.success}或${profile.model.outcomes.risk}没有回到初值，交互状态已泄漏，本次证据无效。

## ${profile.model.studio}决策矩阵

| 场景 | ${profile.model.axisA.label} | ${profile.model.axisB.label} | 观察重点 | 拒绝条件 |
| --- | --- | --- | --- | --- |
| 基线 | ${profile.model.axisA.levels[1]} | ${profile.model.axisB.levels[1]} | ${profile.model.outcomes.success} | 初值不可复现 |
| 单变量 | ${profile.model.axisA.levels[2]} | ${profile.model.axisB.levels[1]} | 首个分岔 | 同时改变两个输入 |
| 故障 | ${profile.model.axisA.levels[2]} | ${profile.model.axisB.levels[2]} | ${profile.model.outcomes.risk} | ${profile.model.fault}未留痕 |
| 恢复 | ${profile.model.axisA.levels[1]} | ${profile.model.axisB.levels[1]} | 复位一致性 | 依赖隐藏操作者 |

<Callout type="trap" title="误区：用${profile.model.outcomes.success}遮住代价">
  ${profile.title}若只展示收益峰值，却不报告${profile.model.outcomes.risk}和故障轨迹，就不能证明${profile.model.studio}可迁移。
</Callout>

<Callout type="trap" title="误区：把目录比喻当作因果结论">
  “${profile.concepts[0]}”提供问题坐标，不提供自动答案；必须通过${profile.model.axisA.label}与${profile.model.axisB.label}的反事实变化排除替代解释。
</Callout>`
  );
}

function synthesisSection(profile) {
  const entries = termEntries(profile);
  const conceptList = profile.concepts
    .map(
      (concept, index) =>
        `${index + 1}. ${concept}：用${profile.focuses[index % profile.focuses.length]}核对${profile.nodes[index % profile.nodes.length]}。`,
    )
    .join("\n");
  return `## 九律坐标与证据边界

${profile.title}最接近九律中的“分布式存在、自下而上控制、礼待错误、保留多目标、寻求持久非均衡”中的若干条，但不能把九条原则全部机械勾选。对${profile.model.studio}而言，只有能解释${profile.model.outcomes.success}的原则才进入主张；出现${profile.model.outcomes.risk}或“${profile.model.fault}”时，必须同时写出不适用边界和责任主体。

证据包至少保存${profile.model.axisA.label}、${profile.model.axisB.label}、场景、初始状态、节点选择、首个分岔、${profile.model.outcomes.success}、${profile.model.outcomes.risk}、恢复结果和复位校验。独立复核者应先盲跑基线，再重放故障，最后检查同一主张能否在相邻目录节点上成立。

## 本章回顾

掌握${profile.title}，不是记住“${profile.concepts[0]}”这句话，而是能操作${profile.model.studio}并说明：${profile.duty} 当实验触发“${profile.model.fault}”时，学习者应主动缩小结论，而不是把异常归为随机噪声。

<Glossary>
${entries
  .map(
    ({ term, definition }) =>
      `  <GlossaryItem term=${JSON.stringify(term)}>${definition}</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>

<Exercises>

1. 怎样为${profile.title}建立可重放的单变量基线？

<Answer>
  固定其余条件，把${profile.model.axisA.label}设为“${profile.model.axisA.levels[1]}”、${profile.model.axisB.label}设为“${profile.model.axisB.levels[1]}”，记录${profile.model.outcomes.success}与${profile.model.outcomes.risk}；随后只改变一个输入并保存首个分岔。
</Answer>

2. 正式目录的每个节点怎样进入验证，而不是只出现在清单里？

<Answer>
${conceptList}
</Answer>

3. 哪个观察会推翻${profile.title}的强结论，复位又要核对什么？

<Answer>
  故障“${profile.model.fault}”若让${profile.model.outcomes.risk}上升且无法恢复，就应拒绝强结论；修正后重放基线、故障、恢复三条轨迹，并确认输入、节点、计数和结果全部回到相同初值。
</Answer>

</Exercises>`;
}

function attribution(profile) {
  return `<Attribution
  mode="independent-rewrite"
  sourceBasis="${profile.sourceBasis}"
  workTitle="凯文·凯利《失控》与2016中文版目录"
  adaptedUrl="${profile.officialUrl}"
/>`;
}

function objectives(profile) {
  return `<Objectives>

- 能用${profile.model.studio}解释${profile.title}的核心机制，并指出目录标题本身不构成因果证据
- 能区分${profile.model.axisA.label}与${profile.model.axisB.label}，通过单变量切换定位${profile.model.outcomes.success}的首个分岔
- 能注入“${profile.model.fault}”，根据${profile.model.outcomes.risk}决定接受、缩小或拒绝主张
- 能完成“${profile.model.task}”，保存基线、故障、恢复与复位四类可重放证据

</Objectives>`;
}

function transformPage(profile) {
  const raw = fs.readFileSync(profile.filePath, "utf8");
  const parsed = matter(raw);
  let body = parsed.content;
  const alreadyV2 = body.includes("OOC_QUALITY_V2");
  const headings = alreadyV2
    ? {
        why: `为什么从“${profile.model.studio}”开始`,
        source: "来源、版次与独立重写边界",
        terms: "本章术语与观察合同",
        model: `${profile.model.studio}的可复算模型`,
        outline: "正式目录逐项深读",
        method: `把${profile.title}变成三段可操作实验`,
        implementation: "可重放实验合同",
        synthesis: "九律坐标与证据边界",
      }
    : {
        why: "为什么本单元必须按系统而不是口号阅读",
        source: "版次、目录与改编合同",
        terms: "五个贯穿全书的术语",
        model: "四个可手算观察指标",
        outline: "权威目录坐标与核心知识",
        method: "把主张变成可重放的活系统实验",
        implementation: "最小可重放实现",
        synthesis: "九律坐标、局限与独立复核",
      };
  body = body.replace(/\n?\{\/\* OOC_QUALITY_V2 \*\/\}\n?/g, "\n");
  if (!/<Objectives>[\s\S]*?<\/Objectives>/.test(body))
    throw new Error(`缺少 Objectives：${profile.chapterSlug}`);
  body = body.replace(
    /<Objectives>[\s\S]*?<\/Objectives>/,
    `${objectives(profile)}\n\n{/* OOC_QUALITY_V2 */}`,
  );
  body = replaceSection(
    body,
    headings.why,
    headings.source,
    sourceSection(profile).split("\n\n## 来源")[0],
  );
  body = replaceSection(
    body,
    headings.source,
    headings.terms,
    `## 来源${sourceSection(profile).split("\n\n## 来源")[1]}`,
  );
  body = replaceSection(
    body,
    headings.terms,
    headings.model,
    termsSection(profile),
  );
  body = replaceSection(
    body,
    headings.model,
    headings.outline,
    modelSection(profile),
  );
  body = replaceSection(
    body,
    headings.outline,
    headings.method,
    outlineSection(profile),
  );
  body = replaceSection(
    body,
    headings.method,
    headings.implementation,
    methodSection(profile),
  );
  body = replaceSection(
    body,
    headings.implementation,
    headings.synthesis,
    implementationSection(profile),
  );
  body = replaceSection(
    body,
    headings.synthesis,
    "前后导航",
    synthesisSection(profile),
  );
  body = body.replace(/<Attribution[\s\S]*?\/>\s*$/, attribution(profile));

  const data = {
    ...parsed.data,
    qualityVersion: 2,
    practiceMode: profile.model.practiceMode,
    sourceMode: "independent-rewrite",
    sourceUrl: profile.officialUrl,
  };
  fs.writeFileSync(profile.filePath, matter.stringify(body.trimStart(), data));
}

function wrapperSource(profile) {
  const props = {
    unitId: profile.chapterSlug,
    title: profile.title,
    concepts: profile.concepts,
    nodes: profile.nodes,
    focuses: profile.focuses,
    model: profile.model,
  };
  return `import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = ${JSON.stringify(props, null, 2)} as const;

export function ${profile.componentBase}MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function ${profile.componentBase}ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function ${profile.componentBase}EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
`;
}

function updateManifest(manifest, profiles) {
  manifest.status = "verified-mixed-full-text-and-outline";
  manifest.verifiedAt = "2026-07-20";
  manifest.sourceAccess = "outline-only";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.coverage = { formalUnits: 26, outlineNodes: 173, pages: 28 };
  manifest.disclosureNote =
    "2016中文版公开授权电子书目录核定致中文版、24章全部小节与译后记，共173个正式节点；作者官网完整英文目录和公开全文核验24章机制与1994年语境。中文版序、译后记只按目录界定范围；全页均为独立教学重写，不宣称复现中文原书正文。";
  manifest.factSourcePolicy =
    "章节目录节点须同时具备出现、独立解释、章专属沙盘与练习证据；1994年原始主张以作者公开英文全文为准，后来的技术不得倒填，课程公式必须标明不是作者量表。";
  manifest.factSourcesVerifiedAt = "2026-07-20";
  manifest.factSources = {
    chineseCatalog: {
      kind: "authorized-ebook-complete-outline",
      label: "豆瓣阅读2016中文版授权电子书完整目录",
      url: SOURCES.chineseCatalog,
    },
    officialToc: {
      kind: "author-official-complete-outline",
      label: "Kevin Kelly官方24章完整目录",
      url: SOURCES.officialToc,
    },
    officialFullText: {
      kind: "author-official-full-text",
      label: "Kevin Kelly官方公开英文全文",
      url: "https://kk.org/outofcontrol/",
    },
    officialBook: {
      kind: "author-official-bibliography",
      label: "Kevin Kelly官方书目与版本信息",
      url: SOURCES.officialBook,
    },
  };
  const bySlug = new Map(
    profiles.map((profile) => [profile.chapterSlug, profile]),
  );
  for (const unit of manifest.units) {
    const profile = bySlug.get(unit.id);
    if (!profile) throw new Error(`manifest 单元无页面：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = `${profile.sectionSlug}/${profile.chapterSlug}`;
    unit.sourceMode = "independent-rewrite";
    unit.sourceAccess =
      profile.sourceBasis === "full-text"
        ? "full-text-primary"
        : "outline-only";
    unit.factSourceIds = [
      "chineseCatalog",
      "officialToc",
      ...(profile.sourceBasis === "full-text" ? ["officialFullText"] : []),
      "officialBook",
    ];
  }
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
const pages = listPages();
const rawProfiles = fs.existsSync(PROFILE_PATH)
  ? JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8")).profiles
  : bootstrapProfiles(pages, manifest);
const portableProfiles = rawProfiles.map((profile) => ({
  ...profile,
  filePath: path.relative(
    ROOT,
    path.isAbsolute(profile.filePath)
      ? profile.filePath
      : path.join(ROOT, profile.filePath),
  ),
}));
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify({ version: 2, bookSlug: BOOK, profiles: portableProfiles }, null, 2)}\n`,
);
const profiles = portableProfiles.map((profile) => ({
  ...profile,
  filePath: path.join(ROOT, profile.filePath),
}));

if (profiles.length !== 28) throw new Error(`应有28页，实际${profiles.length}`);
for (const profile of profiles) {
  transformPage(profile);
  fs.writeFileSync(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapperSource(profile),
  );
}
updateManifest(manifest, profiles);
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);

console.log(
  `已重构 ${profiles.length} 页、${manifest.units.length} 个正式单元。`,
);
