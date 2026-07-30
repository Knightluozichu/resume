import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "org-problem-tools";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/org-problem-tools/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/org-problem-tools-v2-profiles.json",
);

const SOURCES = {
  publisher:
    "https://wap.phei.com.cn/module/goods/wssd_content.jsp?bookid=69707",
  ethics: "https://www.iaf-world.org/site/pages/statement-values-code-ethics",
  competencies: "https://iaf-world.org/the-iaf-core-competencies/",
  about: "https://iaf-world.org/about-facilitation/",
};

const PATHS = {
  learningMap:
    "00-official-learning-map/opt-23-official-learning-map",
  "opt-23-introduction": "01-introduction/opt-23-introduction",
  "opt-23-chapter-01": "02-chapter-01/opt-23-chapter-01",
  "opt-23-chapter-02": "03-chapter-02/opt-23-chapter-02",
  "opt-23-chapter-03": "04-chapter-03/opt-23-chapter-03",
  "opt-23-chapter-04": "05-chapter-04/opt-23-chapter-04",
  "opt-23-afterword": "06-afterword/opt-23-afterword",
  finalReview:
    "07-official-final-review/opt-23-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《引导工具箱》学习地图：从委托到行动复盘",
    duty: "按导论、四套工具与后记安排能力递进，并维护59个目录节点的唯一归属",
    question:
      "怎样按导论、8/13/16/12工具套装和后记安排能力递进，而不是按自造主题重排49个工具？",
    invariant: "59个正式目录节点各有唯一归属、使用阶段和复核边界",
    fault:
      "把49个工具按自创八类重新编排，丢失原书套装层级与前后依赖",
    scenario:
      "培训负责人要为跨部门改善项目设计六周学习路线，参与者既要能选工具，也要能说明为什么此刻不用另一个工具。",
    stageNames: ["核定目录分母", "建立阶段坐标", "组合端到端证据"],
    purposeOptions: ["核定学习边界", "安排能力递进", "验收迁移能力"],
    participantOptions: ["培训负责人", "业务参与者", "独立复核者"],
    authorityOptions: ["目录决定范围", "委托人定目标", "团队定行动"],
    artifact:
      "59节点映射表、六单元学习顺序、工具选择理由、跨单元案例轨迹、遗漏检查和综合复盘。",
    opening:
      "学习地图不是把工具名称排成一列，而是先确定公开目录分母，再把安全进入、共同建模、结构化参与和执行反馈组织成可迁移的能力链。",
    transfer:
      "地图页的验收对象是课程结构：若某个工具只能在清单中找到，却没有对应单元、情境、交互与练习，它仍然没有进入教学。",
  },
  "opt-23-introduction": {
    duty: "在选工具之前澄清委托、目的、参与者、权限与记录边界",
    question:
      "怎样在会议前明确客户、目的、参与者、决策权限和证据边界？",
    invariant: "委托人、参与者和主持人对目的、权限与产物达成可检查共识",
    fault: "主持人既控制流程又暗中推动自己的内容答案",
    scenario:
      "研发负责人邀请引导者处理版本延期，但参会者尚不清楚会议是找原因、选方案，还是由负责人宣布既定决定。",
    stageNames: ["澄清委托", "设计参与合同", "确认交付与回访"],
    purposeOptions: ["澄清共同问题", "形成可选方案", "确认行动承诺"],
    participantOptions: ["委托负责人", "受影响成员", "流程引导者"],
    authorityOptions: ["委托人最终决定", "团队共同决定", "会上只提建议"],
    artifact:
      "委托确认单、会议目的、参与者与缺席者、决策权限、保密边界、议程、记录模板和回访日期。",
    opening:
      "导论页先处理“谁有权决定、谁承担影响、会议要产出什么”这些前置问题；流程合同不清时，任何精彩工具都会放大错误任务。",
    transfer:
      "引导顾问的价值在于守护群体怎样工作，而不是借主持位置替组织做内容判断；角色冲突必须会前披露并重新分工。",
    teachingConcepts: [
      "委托合同",
      "会议目的",
      "参与者边界",
      "决策权限",
      "流程设计",
      "记录与保密",
    ],
  },
  "opt-23-chapter-01": {
    duty: "用八个入门工具建立安全开场、聚焦发散、目标共享与行动闭环",
    question:
      "怎样用8个入门工具建立安全开场、发散、聚类、目标和行动闭环？",
    invariant: "每个参与者知晓规则并能贡献，偏题可回访，创意被保留，行动有负责人",
    fault: "头脑风暴阶段立刻评价提议，导致少数人和第一个方案主导",
    scenario:
      "新组建的产品小组要在90分钟内提出试运行方案，成员彼此陌生，领导又习惯在别人发言后马上评价。",
    stageNames: ["安全进入与立规", "发散聚类与聚焦", "目标拆解与行动"],
    purposeOptions: ["让成员安全进入", "产生并组织想法", "形成首轮行动"],
    participantOptions: ["新成员", "业务负责人", "会议记录者"],
    authorityOptions: ["团队提出负责人确认", "团队共同承诺", "只形成试验建议"],
    artifact:
      "共同规则、停车场、原始想法卡、亲和分组、目标树、4W1H行动项、异议记录和回访安排。",
    opening:
      "入门套装解决一场会议的最低基础设施：成员先获得安全发言机会，再共同约定规则，把发散材料组织成目标与可追踪行动。",
    transfer:
      "入门工具看似简单，最容易被气氛替代证据；热闹不表示参与公平，贴满便签也不表示行动已经有人承担。",
  },
  "opt-23-chapter-02": {
    duty: "用十三个初级工具把现状、目标、因果、优先级与回顾变成共同模型",
    question:
      "怎样用13个初级工具把现状、目标、因果、优先级与回顾变成共同模型？",
    invariant: "事实、解释与选择分开，筛选标准在看到结论之前声明",
    fault: "收益矩阵的坐标和权重在看见喜欢的方案后才调整",
    scenario:
      "客服团队想降低重复工单，却把无法控制的上游限制、理想状态、流程瓶颈和优先任务混在一次讨论中。",
    stageNames: ["外化现状与边界", "展开因果与选项", "筛选重点并回顾"],
    purposeOptions: ["建立现状模型", "识别可控杠杆", "选择改善重点"],
    participantOptions: ["一线客服", "流程负责人", "数据支持者"],
    authorityOptions: ["负责人按标准拍板", "团队共同排序", "形成建议交上游"],
    artifact:
      "As is/To be差距、可控边界、流程图、正反理由、候选矩阵、帕累托数据、优先级理由和回顾记录。",
    opening:
      "初级套装把“大家都觉得有问题”推进到共同可见的现状、目标、流程和取舍；每一步都要区分观察事实与成员解释。",
    transfer:
      "矩阵、图形和排序只把判断外化，不能自动产生真相；轴、阈值和数据来源若在看见答案后变化，结果就不可复核。",
  },
  "opt-23-chapter-03": {
    duty: "用十六个中级工具设计大群体参与、结构化分析、战略视野与清晰表达",
    question:
      "怎样用16个中级工具设计大群体参与、结构化分析、战略视野与清晰表达？",
    invariant: "参与机会、信息来源、分析结构和投票权透明且可复核",
    fault: "n/5投票前未处理关联利益与信息不对称，却把票数当作事实",
    scenario:
      "120人的事业群要讨论协作障碍，职位、专业和地域差异显著，任何单一全体发言或简单投票都会压低边缘信息。",
    stageNames: ["建立大群体参与", "结构化拆解与反馈", "表达筛选并承诺"],
    purposeOptions: ["扩大参与覆盖", "建立问题结构", "形成透明收敛"],
    participantOptions: ["跨地域成员", "领域专家", "决策观察者"],
    authorityOptions: ["投票只做筛选", "负责人说明取舍", "团队共同承诺"],
    artifact:
      "分桌记录、逻辑树或鱼骨图、匿名反馈、关系边界、战略机会图、投票前提、少数意见和下一步承诺。",
    opening:
      "中级套装面对人数、关系与问题复杂度同时上升的场景，需要把参与结构、分析结构和收敛规则分开设计。",
    transfer:
      "世界咖啡、关系反馈和投票都会改变谁能说什么；引导者必须公开分组、汇总与筛选规则，并保护不愿公开的个人信息。",
  },
  "opt-23-chapter-04": {
    duty: "用十二个高级工具把动力、主体、风险、系统循环与战略转成执行组合",
    question:
      "怎样用12个高级工具把动力、利益相关者、风险、系统循环与战略转成可执行组合？",
    invariant: "行动方案有负责人、时间、风险与反馈，不把分析图当作执行结果",
    fault: "SWOT列完四格就直接选战略，没有连接证据、优先级与风险",
    scenario:
      "公司要上线统一供应链系统，支持者、受影响部门和外部伙伴的动力不同，延期因素还会形成相互强化的循环。",
    stageNames: ["识别动力与主体", "建模系统与风险", "形成战略执行组合"],
    purposeOptions: ["识别变化阻力", "比较风险路径", "形成执行组合"],
    participantOptions: ["项目负责人", "受影响部门", "外部合作方"],
    authorityOptions: ["治理委员会决策", "负责人在边界内决策", "团队提出组合建议"],
    artifact:
      "力场图、利益相关者地图、系统循环、风险表、决策路径、战略选项、责任与期限、反馈指标和升级条件。",
    opening:
      "高级套装不以复杂图表显示专业，而要把变化动力、关键主体、系统反馈和风险选择连接到明确执行责任。",
    transfer:
      "SWOT、风险表和系统图都是对现实的可质疑模型；若没有证据来源、时间窗口和行动所有者，分析精细也不会自动改变系统。",
  },
  "opt-23-afterword": {
    duty: "把工具知识沉淀为可适配、可复盘、可交接的流程能力",
    question:
      "怎样证明工具箱已经变成可适配、可复盘、可交接的流程能力？",
    invariant: "工具选择由目的、群体与风险决定，复盘能解释选择及结果",
    fault: "把会用的工具越多等同于专业，堆叠活动却没有决策和跟进",
    scenario:
      "内部引导师完成三个月实践后要把项目交给同事，必须说明每次选择、放弃与调整工具的理由，而非只交付活动清单。",
    stageNames: ["回看选择依据", "复盘结果与伦理", "形成交接资产"],
    purposeOptions: ["复盘工具适配", "识别能力缺口", "完成安全交接"],
    participantOptions: ["原引导者", "接任引导者", "项目委托人"],
    authorityOptions: ["委托人验收结果", "同行复核流程", "团队确认后续行动"],
    artifact:
      "工具选择日志、未采用理由、参与者反馈、伦理事件、行动结果、复盘结论、能力缺口和交接清单。",
    opening:
      "后记页把焦点从“学过多少工具”转向“能否根据目的、群体和风险做出选择，并让下一位引导者理解该选择”。",
    transfer:
      "专业成长依赖真实项目中的预测、操作、复盘与监督；工具数量只能描述接触范围，不能代替判断质量和伦理责任。",
    teachingConcepts: [
      "工具适配",
      "流程复盘",
      "伦理边界",
      "证据包",
      "持续改进",
      "能力交接",
    ],
  },
  finalReview: {
    title: "《引导工具箱》综合复核：跨部门延期工作坊",
    duty: "用一个跨部门延期项目串联导论、四套装与后记",
    question:
      "怎样用一个跨部门延期项目串联导论、四套装和后记？",
    invariant: "同一项目从委托到行动跟进保留目的、参与、公平、决策与证据",
    fault: "分别演示49个工具，却没有一场端到端会议证明组合能力",
    scenario:
      "产品、研发、测试和运营围绕连续延期进行两次工作坊与一次回访，需要从委托澄清走到行动验收。",
    stageNames: ["澄清并建立安全", "共同建模与选择", "执行回访与交接"],
    purposeOptions: ["澄清延期系统", "选择最小干预", "验收行动反馈"],
    participantOptions: ["交付团队", "依赖方代表", "项目委托人"],
    authorityOptions: ["负责人最终决定", "团队共同承诺", "升级事项另行授权"],
    artifact:
      "委托合同、两次工作坊议程、正式节点选择、参与轨迹、分析产物、决策理由、行动清单、回访结果和交接复盘。",
    opening:
      "综合复核不要求逐个表演49个工具，而要求学习者面对同一真实问题，说明每一阶段为何选择最小充分组合。",
    transfer:
      "端到端案例必须保留阶段转换：没有委托边界的分析、没有透明标准的投票、没有回访的行动，都不能由工具数量补救。",
  },
};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);

const unitTitles = previousManifest.units.map((unit) => unit.title);

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function mechanismFor(concept) {
  const rules = [
    [/破冰/, ["降低第一次发言风险", "自愿参与与退出记录", "强迫个人披露"]],
    [/基本规则/, ["共同声明可观察行为", "规则文本与提醒记录", "把口号当规则"]],
    [/停车场/, ["暂存越界议题并承诺回访", "议题、负责人和日期", "记录后永不处理"]],
    [/头脑风暴/, ["分离发散与评价", "原始想法与阶段切换", "生成时即时批判"]],
    [/亲和图/, ["按意义形成自然主题簇", "卡片移动与命名历史", "预设分类吞掉异类"]],
    [/目标树/, ["把目标连接必要条件", "层级因果与负责人", "把任务堆叠成树"]],
    [/4W1H/, ["把结论转成责任合同", "事项、理由、人员、期限与方法", "只写大家跟进"]],
    [/传球发言/, ["显式轮转发言机会", "轮次、跳过与补充记录", "把持球时间等同贡献"]],
    [/可控与不可控/, ["区分影响边界与关注边界", "边界理由和升级项", "把困难都归为不可控"]],
    [/更多与更少/, ["用方向差描述理想变化", "期望增减项及例证", "用模糊愿望代替状态"]],
    [/As is|To be/, ["并列当前证据与目标状态", "差距、基线与验收指标", "把愿景写成现状"]],
    [/毁誉分析/, ["同时外化支持与反对理由", "理由、证据与提出角色", "只保留多数立场"]],
    [/流程图/, ["沿真实交接暴露等待与返工", "步骤、输入、输出和耗时", "画规定流程冒充现实"]],
    [/收益矩阵/, ["在看答案前固定两条选择轴", "轴定义、位置依据与异议", "事后移动坐标"]],
    [/圆形分析/, ["用同心边界区分控制层次", "事项位置与边界理由", "用距离暗示精确度"]],
    [/报纸测试/, ["用外部可理解叙述检验问题真实性", "标题、受众和可核事实", "追求戏剧性措辞"]],
    [/曼陀罗/, ["围绕中心主题系统展开视角", "八方向候选与来源", "填满格子代替相关性"]],
    [/帕累托/, ["按一致口径排序累计贡献", "原始频数、区间和累计线", "把相关排序当因果"]],
    [/回顾时间/, ["从事件提取可执行学习", "事件、解释、试验和负责人", "复盘变成追责"]],
    [/团队建设/, ["围绕共同任务建立关系与角色", "协作约定与任务反馈", "用娱乐替代工作合同"]],
    [/三言两语/, ["用短轮次完成进入与离开", "每人状态与未解决事项", "要求公开敏感情绪"]],
    [/W\/C/, ["把愿望连接个人承诺", "愿望、承诺、条件和回访", "把自愿承诺变成命令"]],
    [/世界咖啡/, ["用多轮小组迁移观点", "桌面记录、轮换和汇总规则", "只汇总主持人喜欢的桌"]],
    [/二分重构/, ["用对立框架发现隐藏第三种视角", "原框架、反框架与新选项", "把复杂问题压成二选一"]],
    [/逻辑树/, ["按互斥且完整原则拆解问题", "分支规则、遗漏和重叠", "层级整齐却语义重叠"]],
    [/鱼骨图/, ["按类别提出可验证原因候选", "原因、证据与验证动作", "把猜测写成根因"]],
    [/思维导图/, ["从中心议题发散关联线索", "分支来源和交叉连接", "用漂亮布局代替关系"]],
    [/检查已做到/, ["从已有进展提取下一步能力", "完成项、促成条件和延伸动作", "忽略未解决风险"]],
    [/容器/, ["调整小组规模与交流边界", "分组规则、接口和汇总方式", "分组后信息不回流"]],
    [/领导融合/, ["在权力差异下交换期待与反馈", "匿名输入、回应和承诺", "要求下属当面表忠诚"]],
    [/乔哈里/, ["区分自知与他知的信息窗口", "自愿反馈和披露边界", "强迫暴露私人信息"]],
    [/使用说明书/, ["显性化个人协作偏好", "偏好、触发点和更新方式", "给成员贴永久标签"]],
    [/机会图/, ["并列外部机会与内部准备度", "机会证据、能力差距和时间窗", "只画乐观象限"]],
    [/PREP/, ["按结论、理由、例证、重申组织表达", "四段记录与听众反馈", "结构清楚但证据为空"]],
    [/n\/5/, ["用有限票数做候选初筛", "资格、票数、冲突披露和异议", "把票数当最终真理"]],
    [/力场/, ["同时识别推动力与阻力", "力量来源、强度依据和干预", "只增强推动而不减阻"]],
    [/利益相关者/, ["按影响、利益与关系制定参与策略", "主体地图和访谈依据", "替他人猜测立场"]],
    [/决策树/, ["把选择、条件与后果串成路径", "节点概率或判据及责任", "伪造精确概率"]],
    [/期望与课题/, ["把主体期待与问题候选交叉", "矩阵单元证据和空白项", "把所有格子都填满"]],
    [/思维系统图/, ["绘制变量间反馈与延迟", "连接方向、极性和时间窗", "把相关关系写成因果"]],
    [/要素图/, ["把延期拆成相互作用要素", "依赖、等待与首个瓶颈", "只罗列因素不连关系"]],
    [/风险评估/, ["分开估计可能性、影响与控制", "风险来源、等级依据和责任人", "用总分掩盖致命风险"]],
    [/双收益/, ["比较两类受益者或两种收益", "两轴定义、位置理由和争议", "用象限标签替代证据"]],
    [/时光机/, ["从未来成功状态反推里程碑", "未来叙事、前置条件和倒推路径", "愿景脱离资源限制"]],
    [/采访英雄/, ["从成功经历提取可复用条件", "事件、行为、条件和迁移假设", "制造个人英雄神话"]],
    [/SWOT/, ["连接内外部证据形成策略组合", "四类证据、组合逻辑和风险", "列完四格直接下结论"]],
    [/PPM/, ["比较改变与不改变的痛苦和收益", "四类后果、时间窗和主体", "用情绪强度代替事实"]],
    [/小专栏/, ["补充主持媒介或实践提醒", "工具用途、成本与可访问性", "把道具大小当专业度"]],
    [/导论|后记/, ["建立角色边界与持续复盘", "委托、选择理由和交接记录", "把引导者当内容裁判"]],
    [/第\d章/, ["界定该套装的学习范围", "正式节点与阶段映射", "跨套装任意重排"]],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录命题转成可观察流程",
      "输入、操作、产物与复盘",
      "只复述名称不验证结果",
    ]
  );
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? [
        ...unit.concepts.map((alternatives) => alternatives[0]),
        ...(specification.teachingConcepts ?? []),
      ]
    : role === "learning-map" || role === "final-review"
      ? unitTitles
      : specification.teachingConcepts;
  const title = specification.title ?? unit?.title;
  const stages = specification.stageNames.map((name, index) => ({
    name,
    action: [
      `在“${title}”的${name}阶段先声明目的、参与者和决策权限。`,
      `围绕“${specification.scenario}”只选择能解除当前流程障碍的最小工具。`,
      `保存${specification.artifact}，再由未主持该环节的人独立复核。`,
    ][index],
  }));
  return {
    key,
    id: unit?.id ?? key,
    officialUnitId: unit?.id ?? null,
    role,
    chapterPath,
    componentBase: toPascal(path.basename(chapterPath)),
    concepts,
    title,
    ...specification,
    stages,
    normalTrace: [
      `确认“${title}”的委托目的、受影响参与者和授权边界`,
      `按${stages[0].name}运行第一段，并保留原始输入与退出选择`,
      `进入${stages[1].name}，公开分析结构、筛选标准和少数意见`,
      `完成${stages[2].name}，交付${specification.artifact}`,
    ],
    failureTrace: [
      `复用“${title}”相同的场景、参与者和时间盒`,
      `只注入流程故障：${specification.fault}`,
      "标记第一处参与、信息、权力或决策轨迹发生偏离的位置",
      `依据“${specification.invariant}”拒绝、缩小或重做结论`,
    ],
    riskCases: [
      {
        label: "角色冲突",
        detail: `在“${title}”中检查主持人是否对内容答案有未披露利益。`,
      },
      {
        label: "参与偏差",
        detail: `在“${title}”中检查缺席者、低权力成员和退出选项。`,
      },
      {
        label: "保密边界",
        detail: `在“${title}”中限制个人披露、录音、逐字稿和传播范围。`,
      },
      {
        label: "行动失联",
        detail: `在“${title}”中核对负责人、期限、依赖与反馈日期。`,
      },
    ],
  };
}

const profiles = [
  enrichProfile("learningMap", PAGE_SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(unit.id, PAGE_SPECS[unit.id], "chapter", unit),
  ),
  enrichProfile("finalReview", PAGE_SPECS.finalReview, "final-review"),
];

if (profiles.length !== 8) throw new Error("《引导工具箱》课程必须恰好为8页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”为什么承担“${profile.duty}”，并守住公开目录与独立重写边界
- 能先预测“${profile.question}”的正常轨迹，再只注入“${profile.fault}”定位首个流程分岔
- 能按“${profile.invariant}”验收${profile.artifact}，说明接受、缩小或拒绝结论的理由

</Objectives>`;
}

function sourceSection(profile) {
  return `## 为什么从这个会议场景开始

${profile.opening} “${profile.title}”使用的贯穿情境是：${profile.scenario} 学习者先预测哪类声音、信息或责任最可能消失，再操作交互；运行后才补理由不能算预测。

${profile.transfer} 因而本页围绕“${profile.question}”建立正常、故障与恢复三条轨迹，验收标准是“${profile.invariant}”。

## 来源、版次与职业边界

“${profile.title}”以[电子工业出版社官方商品页](${SOURCES.publisher})核对森时彦、引导工具箱研究会著，朱彦泽、夏敏、李猛译，ISBN 9787121393174、208页以及导论、四章、49个具名工具、四个小专栏和后记。出版社当前页面显示2026年4月与“01-07”，这是后续印次信息；本课程沿用清单已交叉核定的2023年4月修订本第2版书目身份，不把重印日期解释为目录改版。

公开页面只提供书目、简介和完整目录，没有可授权逐段改写的正文。“${profile.title}”的中文解释、会议情境、交互、练习和答案均为独立教学重写；工具名称用于目录定位，不声称复刻作者案例、图示或原文论证。

“${profile.title}”的流程伦理以[IAF价值与职业伦理声明](${SOURCES.ethics})核对公正过程、群体自主、保密、安全与利益冲突，以[IAF核心能力](${SOURCES.competencies})核对六类职业能力，并参考[IAF对引导的说明](${SOURCES.about})区分流程支持与替群体决定内容。IAF材料用于校正实践边界，不冒充2023年中文版的原书内容。`;
}

const conceptParagraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的第${index + 1}个坐标中，${concept}用来${mechanism}；操作前写出会议阶段和预期变化，操作后以${evidence}判断是否真的改善群体工作，若出现${caution}就立即缩小工具适用范围。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${concept}进入“${profile.title}”时不靠名称产生效果，而靠第${index + 1}段协议完成${mechanism}；观察者需要保留${evidence}，并把${caution}作为可复现的拒绝样本。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，目录坐标${index + 1}把${concept}解释为${mechanism}；独立复核者先读取${evidence}，发现${caution}时不得用会议气氛或多数票覆盖异常。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，${concept}的最小合同是${mechanism}，第${index + 1}次观察必须留下${evidence}；${caution}说明流程已偏离“${profile.invariant}”。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个正式节点${concept}服务于${profile.duty}，其可检查机制是${mechanism}；交付${evidence}之前不能宣称有效，尤其要排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, _index) =>
    `学习者在“${profile.title}”中使用${concept}前先预测${mechanism}会改变哪条参与轨迹，再检查${evidence}；一旦观察到${caution}，就恢复初值并重新设计该环节。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${profile.scenario} 在第${index + 1}个节点采用${concept}时，要把${mechanism}写进主持脚本，把${evidence}写进记录模板，并把${caution}写进停止条件。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `“${profile.invariant}”为${concept}提供了验收边界：第${index + 1}个节点通过${mechanism}推进会议，只能由${evidence}证明，而${caution}构成反事实检查。`,
];

function termFor(concept, index) {
  const short = concept.split(/[：:]/, 1)[0].trim();
  return short.length <= 16 ? short : `目录节点${index + 1}`;
}

function conceptsSection(profile) {
  return `## 正式目录节点与可观察机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const definition = `${term}对应正式坐标“${concept}”，在“${profile.title}”中表示“${mechanism}”这一可观察流程。`;
    const paragraph = conceptParagraphPatterns[
      index % conceptParagraphPatterns.length
    ](profile, concept, mechanism, evidence, caution, index);
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**正式坐标 ${index + 1}/${profile.concepts.length}。** ${paragraph}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三段会议实验

<Callout type="info" title="先写预测，不在运行后移动标准">
  对“${profile.title}”先写下哪类参与者、信息或责任会在“${profile.fault}”中最先消失，再运行正常与故障轨迹；结果不同应修改机制假设，不删除失败记录。
</Callout>

<Stepper>
  <Step title="1. 目的、参与者与权限合同">
    为“${profile.title}”分别选择会议目的、关键参与者和决策权限，观察三者不一致时为什么不该继续挑工具。

    <${profile.componentBase}SessionContractLab />
  </Step>
  <Step title="2. 正常与失败参与轨迹">
    沿“${profile.stageNames.join(" → ")}”逐步推进，固定情境后只切换一次流程故障，并定位首个偏离。

    <${profile.componentBase}ParticipationTraceLab />
  </Step>
  <Step title="3. 伦理风险与证据包">
    检查角色冲突、参与偏差、保密边界和行动失联，展开“${profile.artifact}”后决定是否交付。

    <${profile.componentBase}EthicsProbeLab />
  </Step>
</Stepper>

<Callout type="trap" title="章专属故障：${profile.fault}">
  “${profile.title}”若出现该故障，会破坏“${profile.invariant}”。应保持场景、参与者和时间盒不变，只修改流程条件，保存第一处分岔后再复位。
</Callout>

<Callout type="trap" title="伦理边界不能交给工具自动处理">
  ${profile.scenario} “${profile.title}”必须提供知情、自愿、退出和适当保密；工具带来的高参与表象不能抵消权力压迫或未披露的主持人利益。
</Callout>

<Callout type="trap" title="产物数量不等于会议结果">
  对“${profile.title}”只统计便签、投票或图表，会遗漏责任、异议和回访；只有${profile.artifact}能够连接过程与后续行动。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放主持协议

| 阶段 | 主持动作 | 必留证据 | 停止条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage, index) =>
      `| ${stage.name} | ${stage.action} | ${index === 0 ? "目的、参与与权限" : index === 1 ? "原始输入、结构变化与异议" : "决定、责任、期限与反馈"} | ${index === 0 ? "目的或授权仍冲突" : index === 1 ? profile.fault : "行动没有负责人或回访"} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
stages: ${JSON.stringify(profile.stageNames)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_contract_participants_authority_trace_and_risk
\`\`\`

这份协议要求“${profile.title}”在同一委托、人员与时间盒下重放。复位后若目的、权限、轨迹位置或风险选择没有回到初值，本次比较就混入了状态泄漏，不能作为流程证据。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，必须连接场景、操作、证据与边界。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. ${concept}：用“${mechanism}”解释操作，以“${evidence}”提供复核。`;
    })
    .join("\n");

  return `## 本页回顾

掌握“${profile.title}”意味着能围绕“${profile.question}”选择最小充分流程，并用“${profile.invariant}”拒绝“${profile.fault}”。学习者交付的不是主持表演，而是${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：会前合同。** “${profile.title}”为什么不能先挑喜欢的工具，再补会议目的和参与者？

<Answer>
  ${profile.scenario} 应先确认目的、参与者、决策权限和产物，因为这些条件决定“${profile.title}”处于探索、收敛还是行动阶段；工具若与阶段不匹配，会把缺席、权力差异或隐藏决定包装成高效流程。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明“${profile.title}”的每个教学坐标都进入了机制、交互与练习？

<Answer>
${conceptList}
</Answer>

3. **问题 3：故障与恢复。** 怎样验证“${profile.fault}”已经被修复，而不是换了说法？

<Answer>
  为“${profile.title}”复用同一场景、参与者、权限与时间盒，先重放正常路径，再只注入“${profile.fault}”并保存首个分岔；撤销故障后，只有参与轨迹、少数意见、决定理由和${profile.artifact}重新满足“${profile.invariant}”，才允许交接。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="《引导工具箱：解决组织问题的49个工具（修订本·第2版）》"
  adaptedUrl="${SOURCES.publisher}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    purposeOptions: profile.purposeOptions,
    participantOptions: profile.participantOptions,
    authorityOptions: profile.authorityOptions,
    stages: profile.stages,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    riskCases: profile.riskCases,
  };
  return `"use client";

import {
  FacilitationEvidenceLab,
  type FacilitationEvidenceModel,
} from "./facilitation-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies FacilitationEvidenceModel;

export function ${profile.componentBase}SessionContractLab() {
  return <FacilitationEvidenceLab model={model} view="session-contract" />;
}

export function ${profile.componentBase}ParticipationTraceLab() {
  return <FacilitationEvidenceLab model={model} view="participation-trace" />;
}

export function ${profile.componentBase}EthicsProbeLab() {
  return <FacilitationEvidenceLab model={model} view="ethics-probe" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const slug = path.basename(profile.chapterPath);
  const componentImport = `import { ${profile.componentBase}SessionContractLab, ${profile.componentBase}ParticipationTraceLab, ${profile.componentBase}EthicsProbeLab } from "@/components/mdx/${BOOK}/v2/${slug}";`;
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
${componentImport}

${objectivesBlock(profile)}

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesisSection(profile)}
`;
  const description = `${profile.duty}；用正常、故障和恢复轨迹验收${profile.artifact}`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description,
    demo: true,
    math: false,
    sourceUrl: SOURCES.publisher,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId)
    data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${slug}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "森时彦、引导工具箱研究会《引导工具箱：解决组织问题的49个工具（修订本·第2版）》，朱彦泽、夏敏、李猛译，电子工业出版社，2023年4月，ISBN 9787121393174；出版社页当前显示后续印次2026年4月、版次01-07",
  sourceKind:
    "publisher-official-complete-catalog-and-international-facilitation-association-primary-professional-sources",
  sourceUrl: SOURCES.publisher,
  secondarySourceUrls: [
    SOURCES.ethics,
    SOURCES.competencies,
    SOURCES.about,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "电子工业出版社官方页确认作者、译者、ISBN、208页，以及导论、4章、49个具名工具、4个小专栏与后记共59个正式目录节点。商品页当前显示2026-04和01-07，属于后续印次信息；课程保留清单已交叉核定的2023年4月修订本第2版书目身份，不把重印日期解释为目录改版。8页课程按6个正式单元完整覆盖，另设学习地图与综合复核；解释、情境、交互、练习和答案均依据公开目录独立教学重写。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/org-problem-tools-v2-profiles.json",
  factSourcePolicy:
    "出版社目录只限定59节点与书目范围；流程公正、群体自主、保密、利益冲突和职业能力边界以IAF官方伦理与核心能力资料核对。课程情境、机制、交互、练习和答案独立编写。",
};
const manifestOutput = `${JSON.stringify(manifestDocument, null, 2)}\n`;
if (fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestOutput)
  fs.writeFileSync(MANIFEST_PATH, manifestOutput);

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      outlineSource: SOURCES.publisher,
      professionalSources: [
        SOURCES.ethics,
        SOURCES.competencies,
        SOURCES.about,
      ],
      officialUnits: previousManifest.units.length,
      officialCatalogNodes: previousManifest.units.reduce(
        (sum, unit) => sum + unit.concepts.length,
        0,
      ),
      namedTools: 49,
      coursePages: profiles.length,
      interactiveViews: profiles.length * 3,
      pages: profiles.map((profile) => ({
        chapterPath: profile.chapterPath,
        title: profile.title,
        role: profile.role,
        officialUnitId: profile.officialUnitId,
        concepts: profile.concepts,
        question: profile.question,
        invariant: profile.invariant,
        fault: profile.fault,
        artifact: profile.artifact,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);

console.log(
  `已重建 ${profiles.length} 页，覆盖 ${previousManifest.units.reduce((sum, unit) => sum + unit.concepts.length, 0)} 个正式目录节点，生成 ${profiles.length * 3} 个交互视图。`,
);
