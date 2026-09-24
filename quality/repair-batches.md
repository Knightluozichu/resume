# 分批章节修复记录

## 执行约束

- 每批最多四个并发施工任务，章节及组件写集合互不重叠。
- 主任务串行维护组件注册表、视觉证据、审计台账和待办索引。
- 每批完成实现、源码复核、MDX/类型检查、桌面与移动交互验收后收尾；失败项继续修复，不伪造通过。
- 只清理本批测试进程与临时文件；保留有效截图证据、章节交付物及开始前已有修改。
- 不自动设置 draft:false、不自动加入发布白名单、不自动部署。
- 2026-09-24 用户追加指令：第11批验收与清理结束后，push 并按现有门禁更新服务器；保留草稿和发布治理，不擅自绕过门禁。完成后等待用户命令，禁止自动开启第12批。

## 基线（2026-09-23）

- 既有台账（2026-08-21）：4609章，failed 1852、queued 211、passed 1701、published 845。
- 仓库开始时已有 Python 章节、质量台账与依赖等未提交修改；全部保留。
- 首先续修 python-crash-course；初次实时检查：22章中14章未通过。旧台账中的字典章实际已有可通过实现，因此同时复核其正确性。

## 批次 1：基础语法（完成并已清理）

| 章节 | 施工范围 | 状态 |
|---|---|---|
| 06 dictionaries | 正文及字典专属组件 | 审计通过：92；双视口通过 |
| 07 user-input-and-while-loops | 正文及循环专属组件 | 审计通过：94；双视口通过；补齐列表搬运/问卷边界及术语对应 |
| 08 functions | 正文及函数专属组件 | 审计通过：97；双视口通过 |
| 09 classes | 正文及类专属组件 | 审计通过：92；双视口通过 |

### 已执行验收

- 4章真实桌面1440×900/移动390×844视觉审计：均通过，交互变化和完整重置均验证；证据在 `quality/artifacts/visual/python-crash-course/` 对应章节目录。
- 真实浏览器领域用例：字典视图/快照与嵌套错误、跨模式重置；while上限0/6、故障循环截断、quit保留未读输入；函数关键字绑定、3种错误不执行函数体、return/print与默认对象共享；实例别名、独立/共享列表与拒绝里程回退。
- TypeScript全库检查与本批组件/审计脚本ESLint通过；组件注册表2616路由/2674模块通过。
- 全库4609章MDX编译0错误（既有KaTeX警告保留），2650条内链与4609文件来源锚点检查通过；审计器13个回归用例通过。
- 修复视觉审计器的原生select驱动：之前仅点击下拉框，不会改变选项；现在真实选取另一合法选项，继续校验状态/画面变化与重置，并未放宽门禁。
- 发布不变量仍有基线的76项失败，与开始时输出完全一致。未声称生产构建、整库通过或可部署。
- 本批4章均保留 `draft:true`；只更新本书审计条目并由脚本生成总览/待办，其他书条目不重算。

循环章首次89分未强行放行：补齐取模分组解释、列表搬运中间态/漏项反例、问卷逐轮状态及准确中英术语对应，重跑视觉后94分通过。

本书当前11章passed、11章queued；整库当前1852 failed、207 queued、1705 passed、845 published。第一批已验收。

### 收尾清理

- 四个施工子任务均已关闭（循环章返修后再次关闭）。
- 本批3100开发服务器及其next-server子进程已退出；3100端口无监听，本批审计/浏览器/类型检查进程无残留。
- 本批临时目录已移出 `/tmp`，测试脚本、结果日志、初始脏文件清单与人工截图归档到 `quality/artifacts/repair-batches/2026-09-23-01/session/`；正式视觉截图保留在各章证据目录。
- 既有 `.next`、`tmp`、依赖缓存、用户未提交修改均未清理。
- 清理确认后才开始批次2。


## 批次 2：文件、测试与游戏基础（完成并已清理）

| 章节 | 施工范围 | 状态 |
|---|---|---|
| 10 files-and-exceptions | 正文及文件/异常专属组件 | 审计通过：93；双视口通过 |
| 11 testing-your-code | 正文及pytest专属组件 | 审计通过：92；双视口通过 |
| 12 a-ship-that-fires-bullets | 正文及飞船/子弹专属组件 | 审计通过：94；双视口通过；补齐类职责与输入阶段观测 |
| 13 aliens | 正文及外星舰队专属组件 | 审计通过：91；双视口通过 |

主任务只在施工结束后串行更新注册表及质量文件，双视口验收和清理完成前不启动批次3。

### 第二批验收记录

- 四章实际浏览器领域用例通过：路径工作目录/绝对路径、UTF-8/JSON/缺失文件分流；fixture独立与共享对象、样本量、顺序隐藏污染；飞船浮点/整数位置、松键故障、边界、子弹容量与离场、真实键盘；舰队单次转向、贴边与重叠、双弹删除顺序、换波及生命结束。
- 已查看四章桌面与390px移动截图；正式双视口审计四章均通过。文件章首次捕获React挂载警告，完整日志保留；无源文件变更后完整复跑通过，未过滤错误或降低规则。后续如复现须继续定位。
- 真实Python执行：文件14段示例与80输入组合；测试章31次pytest预期失败/修复运行（主线5 passed）；飞船8组Pygame无头测试、32位置对照和40帧主循环；舰队main用真实Pygame Rect/Group与实际章节函数验证306场景。无头SDL检查不冒充可见窗口手工操作。
- 全库TypeScript、本批ESLint、注册表2620路由/2678模块、4609章MDX编译（0错误）、2650内链、4609来源锚点、审计器13回归用例通过。既有KaTeX警告保留。
- 发布不变量仍为基线76项失败，输出与第一批初始基线逐字一致；未执行生产构建，未发布。
- 只在本批临时目录创建Python3.12隔离环境（pygame2.6.1、pytest9.1.1），没有改项目依赖；批末待删除环境并归档证据。

- 飞船章首次89分未放行：补齐设置类/飞船类职责、共享配置引用/构造时复制、同帧按下松开行为，新增两项真实Pygame观测通过，最终94分；MDX变化后重新完成双视口审计。
- 本批四章最终93、92、94、91分，均无硬阻断且保持 `draft:true`。本书当前15 passed、7 queued；整库1852 failed、203 queued、1709 passed、845 published。待办清单已重新生成。

### 第二批收尾清理

- 四个施工子任务均已关闭，飞船返修子任务也再次关闭。
- 本批开发服务器94841/94856退出，3100无监听，本批测试/浏览器进程无残留。
- 临时Python虚拟环境和本批测试缓存已删除；脚本/日志/截图归档到 `quality/artifacts/repair-batches/2026-09-23-02/session/`。原 `/tmp/remuse-quality-batch2-20260923` 不再存在。
- 时间线播放/暂停/重置、键盘range及reduced-motion最终串行复跑通过；初次播放超时日志保留。原生select键盘自动驱动未验证成功，不计为通过；select通过真实浏览器选项API验证因果与重置。
- 保留既有 `.next`、repo `tmp`、用户修改及项目依赖。完成清理确认后才开启第三批。

## 批次 3：计分与数据可视化（完成并已清理）

| 章节 | 施工范围 | 状态 |
|---|---|---|
| 14 scoring | 正文及计分/重开专属组件 | 审计通过：93；双视口通过 |
| 15 generating-data | 正文及随机游走/骰子分布专属组件 | 审计通过：96；双视口通过 |
| 16 downloading-data | 正文及天气/地震数据专属组件 | 审计通过：97；双视口通过 |
| 17 working-with-apis | 正文及API数据处理专属组件 | 审计通过：96；双视口通过 |

主任务维护共享注册表和质量文件；第三批验收与清理完成前不启动第四批。

### 第三批验收与清理

- 四章人工源码与桌面/390px浏览器领域验证通过，最终正式双视口审计匹配当前哈希。计分半开边界/实际SVG坐标点击/跨局高分/错误计分/难度重置，生成数据种子/N600/无效输入/理论分布，天气缺日/坏数据及地震坐标/筛选，API错误分层/未知值/排序/重置均有实测。
- 计分hydration真实错误已修；生成数据默认状态说明与完整重置统一；初次失败证据保留。Next曾因内存阈值自动重启，受影响的测试完整重跑通过，未忽略错误。
- 真实Python与Plotly输出浏览器检查、完整工程门禁及限制见归档 `ARCHIVE.md`。未声称生产构建或发布就绪。
- 全库TypeScript、本批ESLint、2624路由/2682模块、4609MDX0错误、2650内链、4609来源锚点、13审计回归通过；发布不变量仍是基线76项失败。
- 本书19 passed、3 queued；整库1852 failed、199 queued、1713 passed、845 published。台账及待办已生成。
- 所有施工/返修worker关闭，server11038/19293退出，3100无监听；本批Python环境/测试缓存删除，证据移到 `quality/artifacts/repair-batches/2026-09-23-03/session/`，原临时目录移除。
- 保留初始dirty、既有`.next`、repo`tmp`及依赖。完成清理后才开启第四批。

## 批次 4：Django收尾与整书覆盖核查（完成并已清理）

| 任务 | 写集合 | 状态 |
|---|---|---|
| 18 getting-started-with-django | 正文及Django请求/数据关系专属组件 | 97分；双视口通过 |
| 19 user-accounts | 正文及身份/所有权专属组件 | 94分；双视口通过 |
| 20 styling-and-deploying-an-app | 正文及样式/部署边界专属组件 | 96分；双视口通过 |
| 整书覆盖核查 | 只读项目；报告已归档 | 完成；后续补实质缺口和漏检映射 |

最多4任务，第四项不改质量台账或章节。主任务负责运行环境、共享集成与最终验收。批末先关闭任务和清理，再继续下一批。

### 第四批验收与清理

- 三章领域交互、桌面/390px、严格reset、时间线播放暂停/键盘/reduced-motion通过；正式双视口审计均匹配最终MDX哈希。全部保持draft:true。
- Django真实测试27项；账户新库/旧迁移17项以及72种请求模型对照；部署基础5项、练习后6项、84模型组合。main另以真实localhost HTTP验证Django路由/ORM/CSRF、账户注册/写入/退出、Gunicorn/WhiteNoise/Host/静态404，不冒称TLS或云部署已测。
- 账户SSR注释造成严格reset DOM差异已修复；部署初次JSON500、测试脚本按钮文案错误、时间线一次超时与最终完整复跑日志均保留。未过滤错误。
- TypeScript、限定ESLint、2627路由/2685模块、4609MDX0错误、2650内链、4609来源锚点、13审计回归通过；不变量仍为基线76项失败，台账更新后仍逐字一致。未做生产构建/部署。
- 本书22 passed、0 queued；整库1852 failed、196 queued、1716 passed、845 published。整书概念自动覆盖84.1%，12单元证据不完整，未获发布审批，不能宣称整书完成。
- 独立报告指出01安装前置链、07/09/15短练习、附录A–E范围与Git实践需要后续补齐；既有18个概念漏检主要是别名/解释识别问题。最终18/20各另有1个漏检，下一批逐条核实，不改阈值或手写分数。
- 四worker均关闭；Next27520/27529、Django32958/34488、Gunicorn34455/34465停止，3100/3181/3182/3183端口清空。删除本批Python环境和测试cache；证据归档至`quality/artifacts/repair-batches/2026-09-23-04/session/`。保留初始dirty、.next、repo tmp和项目依赖。

## 批次 5：Python整书覆盖与小缺口（完成并已清理）

第四批已关闭/归档/清理后才启动。最多4并发，写集合不重叠：

| 任务 | 写集合 | 目标 |
|---|---|---|
| 启动与入门范围 | 01、学习地图、复习页 | 官方安装前置链、A/B/C支持路径、修正自动高分即知识齐全措辞 |
| 针对性练习 | 07、09、15正文 | 补少量缺失检验，保留已验收实现 |
| 概念证据别名 | manifest仅本书 | 逐项核实20漏检，添加精准中文/API同义映射，不改门槛/计数/评分逻辑 |
| Git及附录范围 | 20正文、专属范围文档 | 独立临时Git保存比较恢复实践、A–E明确合并/边界，不冒称原书全文 |

主任务负责共享集成/真实复验/最终质量文件；本批结束清理前不开下一批。


### 第五批验收与清理

- 本批跨至2026-09-24；7页增量修复：地图97、启动95、复习97、循环94、类97、生成数据96、部署97，均draft:true；本书22/22章级通过。27步逐项浏览器核对，空Step和Glossary接口错误已修复。
- main复跑56基础/异常测试、13练习测试、12真实Django/SQLite所有权测试；Git独立临时仓库4阶段和陈旧备份保护通过。只核对安装文档，不冒称三系统安装或VSCode实装；Django包装视图不冒称完整第19章再次验收。
- manifest只对16概念组增加20精准别名，20主章/126概念身份不变。最终自动解释覆盖123/126=97.6%；3组仍漏检。140词法/边界检查通过，但40个长目录/关键词反例仍被原算法误判，原英文别名32例同样误判；不删分母、不改规则或称全文100%。A–E技术支持范围明示于`docs/python-crash-course-scope.md`。
- 7页双视口正式结果与最终MDX匹配；22页全部台账/视觉/MDX hash一致。01一次React未挂载警告留证，独立完整双视口复跑两次通过，根因未确证；手动答案点击一次未展开，居中目标/观察实际aria状态后完整两视口通过。Cloudflare遥测localhost CORS失败与应用错误分开记录，未过滤应用异常。
- TS、2627路由/2685模块、4609MDX、2650链接、4609来源锚点、13审计回归通过；既有KaTeX警告保留。不变量仍为76项历史失败且更新前后逐字一致。其他4587台账条目未变；整库1852 failed /196 queued /1716 passed /845 published。
- 四worker关闭；Next45816/45820退出，3100空，无本批浏览器残留。已删除本批runtime/cache/临时Git对象库，保留证据，归档`quality/artifacts/repair-batches/2026-09-23-05/session/`，原tmp不存在。保留用户原dirty、.next、repo tmp和依赖。
- 无生产构建、发布审批、提交或部署。清理确认后才进入下一批。

## 批次 6：设计模式四章（完成并已清理）

第五批tmp已移除、worker关闭、Next退出和3100空后启动。当前重跑基线确认27页中7章失败（不是沿用旧分数宣布完成）。

| 任务 | 写集合 | 正式单元 |
|---|---|---|
| observer / Maxwell | observer.mdx + observer-subscription-delivery-lab.tsx | designpatterns-03 |
| state / Volta | state.mdx + state-transition-ownership-lab.tsx | designpatterns-06 |
| strategy / Meitner | strategy.mdx + strategy-route-cost-lab.tsx | designpatterns-02 |
| template-method / James | template-method.mdx + template-method-import-pipeline-lab.tsx | designpatterns-22 |

最多4并行；MDX均在`content/design-patterns/03-behavioral/`，独立组件在`src/components/mdx/design-patterns/`。Main负责book范围核对、registry、全库工程检查、真浏览器、质量记录及批末清理；其他visitor/compound/final-review留后批，不并发开启第五任务。证据临时目录`/tmp/remuse-quality-batch6-20260924/`。


### 第六批验收与清理

- observer、state、strategy、template-method 各95分通过，均draft:true；真实模型、最终正文提取执行与独立反例验证，不是通用图换标题。
- Main实际双视口复验：观察者18配置/214帧、策略16配置、模板方法40配置全帧，状态合法/拒绝/两故障路径；精确SVG重置与实际键盘按钮/checkbox通过。原生select方向键尝试未成功，最终用select API，不冒称全键盘完成。
- 修复观察者订阅提示、模板负数条位置及aria语义、策略重置DOM属性顺序。实际发现的问题与失败日志保留。13字段规范标题及3题编号修复审计识别，保留原解释/代码/答案；未改规则或填关键词。
- 四页最终MDX/正式视觉/台账hash一致，3答案开合×4页×双视口重跑通过；本书旧20页仅hash新鲜度复核，不等于重做全文人工验收。所有24个passed页hash一致。
- TS、限定ESLint、2631路由/2689模块、4609MDX0错误、2642内链、4609来源锚点、13回归通过；既有KaTeX警告保留。76项历史不变量失败逐字不变。其他4582条台账未变。
- 设计模式24passed/3failed，剩visitor、compound-patterns、final-review。整库1848failed/196queued/1720passed/845published。权威目录11宏观项+23×13模式描述字段不等于原书310细粒度知识点；正文/附录范围限制另有审查报告，不宣称整书完成。
- 四worker均关闭；本批Next59788/59792及子59811退出、3100空，tmp已移除。清除本批编译runtime与node_modules链接，证据归档`quality/artifacts/repair-batches/2026-09-24-06/session/`。12个TS族证据改后缀为.txt、字节/hash不变，避免被项目tsc当源码；第五批2个归档tsx同样修正并留证。保留用户dirty、.next、repo tmp与项目依赖。
- 无生产构建、提交、审批、发布或部署。归档后再验tsc，确认通过才启动下一批。

## 批次 7：设计模式末三页与范围核对（进行中）

第六批四worker关闭、Next树退出/3100空、tmp移除归档且归档后tsc通过，才启动本批。最多4并发：visitor、compound-patterns、final-review各自MDX+独立lab；第4任务只写独立整书范围/实践审查文档。Main负责共享registry、工程/浏览器、台账和清理。临时证据`/tmp/remuse-quality-batch7-20260924/`。

## 批次 7：设计模式末三页与独立范围审查（完成并已清理）

第六批已归档、进程退出、tmp移除且归档后TypeScript通过后才启动；最多4并发。

| 任务 | 写集合 | 本批结果 |
| --- | --- | --- |
| 访问者 | visitor.mdx + visitor-double-dispatch-ast-lab.tsx | 95 / passed |
| 复合模式 | compound-patterns.mdx + compound-patterns-order-notification-lab.tsx | 96 / passed |
| 全书复习 | final-review.mdx + final-review-contract-lab.tsx | 99 / passed |
| 独立范围审查 | docs/design-patterns-scope.md | 24旧页清单、3可复现合同问题、1实践缺口；非整书验收 |

- 三页draft:true；来源14次真实GET均200。Scope复用B6的12份真实来源并校验body hash，新增GET为0，不冒称全文访问。
- Visitor最终15代码块编译执行、18配置/122内部帧/514边界运行；Main真实浏览器18配置、每视口86可访问帧，AST结构、双分派、漏右/重复左与严格双SVGreset通过。
- Compound最终17代码块、24配置/20504断言；Main24配置×2视口。实际发现条件fill增删导致SVG序列重置不一致，已定点修复后完整复跑；guest零访问、金额、邮件失败不回滚且审计继续均验证。修前失败日志保留。
- Review最终8代码块、48模型帧、4096序列/40960步骤/46边界；Main4配置×6帧×2视口验证真实引用、值/活引用快照、LIFO撤销与跨文档拒绝，严格reset通过。两组件命名补入真实chapterSlug，保持组件字节不变，不加空桥、不改评分器。
- 三页3题答案均双视口打开/关闭；新命名后复跑正式视觉与相关手动验收。Select使用Puppeteer原生选值，按钮/checkbox实测键盘，不冒称触摸实机或读屏验收。截图中的固定header/开发标记保留。
- TS、限定ESLint、2634路由/2692模块、4609MDX0错误、2641内链、4609来源锚点、13审计回归通过。既有KaTeX警告保留。不变量仍76项历史失败，更新前后逐字一致。
- 仅更新本书；其他4582台账与报告条目完全不变。全库1845 failed /196 queued /1723 passed /845 published；设计模式27/27章级passed，全部台账/MDX/visual hash一致。旧24页哈希新鲜不等于重新全验收。
- 整书范围仍有限：27页≠24正式单元≠310细知识点；310是11宏观目录项+23×13描述字段。原书编辑器案例/完整附录/实现变体未全部覆盖。下一批修G1备忘录、G2迭代器、G3责任链、G4中介者，不因自动passed忽略真实缺陷。
- 四worker已关闭；Next72542/72544及子进程72555退出，3100空，本批tmp移除；清理13运行时/软链目录，14份TS-family证据加.txt并校验字节hash，归档`quality/artifacts/repair-batches/2026-09-24-07/session/`。归档后再次检查TypeScript；保留原dirty、.next、repo tmp、依赖。无生产构建、审批、提交或部署。

## 批次 8：设计模式实质合同与实践缺口（已完成并清理）

B7归档后TypeScript通过、四worker关闭、3100空且tmp移除后才开始；四并发写集合互斥：

| 任务 | 写集合 | 必须修复 |
| --- | --- | --- |
| Memento / Mencius | memento.mdx + memento-snapshot-canvas-lab.tsx | G1快照readonly/运行时不可变合同、实际改代码断言 |
| Iterator / Russell | iterator.mdx + iterator-cursor-traversal-lab.tsx | G2自定义next耗尽/版本一致、独立游标与实践 |
| Chain / Anscombe | chain-of-responsibility.mdx + chain-of-responsibility-request-pipeline-lab.tsx | G3组装说明及by/handler返回合同、真实三终态与短路 |
| Mediator / Confucius | mediator.mdx + mediator-communication-hub-lab.tsx | G4可执行路由修改练习与真实收件人断言 |

Main重读发现这四个旧组件均只有HTML状态卡、没有概念结构图；责任链还依赖预写scenario结果而非执行Handler，中介者旁路只是文案。已要求在原控件/布局内补最小真实领域模型与图形（画布历史、序列游标、短路请求路径、hub/spoke投递），不把历史自动passed当人工合格。迭代器旧peek显示cursor+1、next却返回cursor；备忘录故障在React updater原地修改还需检查重放副作用。

- G1–G4已修复；最终四章分数96/97/97/97，均draft:true。原本自动passed，故不计作减少4个failed。
- 10新GET+3诚实复用GET，全部200且body hash校验；最终提取代码/模型/负对照通过。Memento28帧、Iterator164帧、Chain32轮、Mediator72轮，390/1440双视口、全部Stepper/答案、精确全状态/SVG reset与图形边界通过。六项最终浏览器验收八文件哈希不变。
- 正式视觉各checked1/failed0；真实发现的updater重放、SVG hydration、移动字号、桌面裁切、标签遮挡均定点修复后复验；原失败证据保留。本批13px阅读目标不是改写SOP11px硬线。
- 工程2634路由/2692模块、4609MDX0错误、2641内链、4609来源锚点、13审计回归通过；76历史不变量失败完整日志前后一致。
- 其他4582台账/报告条目不变；全库1845 failed /196 queued /1723 passed /845 published；本书27passed。其他23页未重新全量人工验收，整书原文覆盖不作完成声明。
- 四worker已关闭；Next89388/89389/89407退出、3100空、本批tmp不存在；证据归档`quality/artifacts/repair-batches/2026-09-24-08/session/`，21份TS-family证据映射/去重均校验hash，归档中无可执行TS-family文件，归档后全库TypeScript exit0。首次归档遇既有.txt证据同名安全停止，恢复时保留差异版本、校验相同副本后去重，过程如实记录。原dirty、.next、repo tmp与依赖保留；无生产构建、审批、提交、发布或部署。

## 批次 9：DSA C++ 基础合同与可执行证据（已完成并清理）

B8四worker关闭、服务停止、tmp移除、归档后TS通过后启动；最大四并发。导论(dsaa3-01)、算法分析(dsaa3-02)、并查集(dsaa3-08)、类模板分离编译(dsaa3-a)。各写一章MDX与独立领域组件，Main负责注册、最终浏览器/正式视觉/选择性台账与归档清理。启动基线1845failed/196queued/1723passed/845published，本书11failed/2passed。证据临时目录`/tmp/remuse-quality-batch9-20260924/`。尚未验收，不代表通过或发布。


### B9 最终验收
- 导论/算法分析/并查集/类模板分离编译：97/97/95/97，四章failed→passed，均draft:true、qualityVersion:2；原书全文未取得，按权威目录+实际作者/标准/编译器资料独立重写，不冒称忠实复现或开放授权。出版社版权2007与冻结manifest2006差异保留，不改manifest。
- 45来源记录，39个保存body经hash验证：35次200、3次404、1次403；另6条无body错误明确未验证。目录只证明范围，未证实P Word扩写已删除。
- 实际最终MDX代码提取/编译/运行与负对照通过。导论10用例；分析19531数组；并查集22620穷举、2048分区、2133 C++/TS对照；模板24多TU情形（11运行成功/13链接失败），7个C++文件块+4个shell文件块。主独立oracle含19200DSU操作、1795200成对分区断言。
- 双视口390/1440：导论260状态、分析84配置、并查集46轮、模板48配置，10组图形与8个阅读视图，全部答案/图形Stepper/严格完整reset通过。SVG阅读目标13px，原SOP11px未改；真实checkbox外层可点击label≥44px，不冒称物理触屏/读屏验收。
- 真实修复了移动所有权箭头、MDX目标列表扁平化和结果语义role。正式视觉首次DSU桌面失败：实际图变，但已有live结果未标status；加唯一真实role=status行后复验四页各checked1/failed0。最后增量seal明确复用3个MDX+组件hash完全不变章节的既有交互检查，重跑所有模型/DSU交互/全部图形/全部阅读；没有冒称7项脚本都重跑。失败及诊断证据保留，未改审计器。
- 注册2638路由/2696模块，4609MDX零错误、2641内链、4609来源锚点、13审计回归通过；全库TS与限定lint/format通过。76历史不变量完整日志前后一致；其他4596台账和报告条目不变、其余9页MDX与共享规则hash不变。
- 全库1841failed /196queued /1727passed /845published。本书6passed/7failed，选择性整书审计仍exit1是其余7章未修，不宣称整书通过；13页亦不代表原书细节全覆盖。
- 四worker关闭，归档清理与归档后TypeScript执行结果以本批cleanup-verification.json为准；全部通过前不启动B10。无生产构建、审批、提交、发布或部署。

B9清理确认：四worker关闭；本批PID [14568, 14572, 14599]全部退出、3100空、原tmp不存在。归档`quality/artifacts/repair-batches/2026-09-24-09/session/`，0份TS-family证据映射hash校验、6个运行时/软链路径清理、108个生成二进制/对象清理；归档内TS-family为0，归档后全库TypeScript exit0。保留原dirty、.next、repo tmp、依赖与锁文件。

## 批次 10：DSA C++ 容器、树、散列与堆（已完成并清理）

B9四worker关闭、PID退出/3100空/tmp移除且归档后TS0后开始。四并发写集合互斥：dsaa3-03表/栈/队列，dsaa3-04树，dsaa3-05散列，dsaa3-06优先队列/堆；各自一章MDX+独立组件模块。Main负责原始基线、来源复核、实际浏览器/正式视觉/选择性台账和清理。启动1841failed/196queued/1727passed/845published，本书6passed/7failed。临时证据`/tmp/remuse-quality-batch10-20260924/`；未验收，不表示通过或发布。


### B10 最终验收
- 表/栈/队列、树、散列、优先队列/堆：94/95/94/94，4章failed→passed；均draft:true、qualityVersion:2。原书全文未取得，实际目录、作者代码、C++17草案与研究论文用于独立重写；43来源记录/43保存body全SHA256核对，诚实保留403及复用记录，不冒称原书授权或全文忠实。
- 主提取最终40个C++代码块，9个程序严格C++17编译与ASan/UBSan运行通过；独立27200表/栈/环形队列、14000树旋转、10200散列表+7200目录、3078堆结构/多重集合检查通过。worker额外oracle/负对照单独记录。
- 390/1440真浏览器：完整操作、真实故障、精确全状态/SVG重置、堆26用例逐帧对照，全部8阅读视图/答案/图形Stepper/目标列表/语义误区通过。44px控件、13px SVG阅读目标（原11px门禁未改），无水平溢出/运行错误。最终内容hash匹配正式视觉，4章各checked1/failed0。
- 主发现并修复堆复杂度遗漏vector扩容成本；首次正式审计lists总分90但教学11不足，且heaps虽自动passed同样遗漏规范Callout结构。退回原2worker只将实际4组误区正确包入语义提示块，不灌水/改审计器；保留首次失败记录，复验后通过。两个浏览器测试基础设施故障和Python提取转义错误均留真实日志，未伪装内容缺陷。
- 全库TS、限定lint/format、2641路由/2699模块注册、4609MDX、2641内链、4609来源锚点、13审计回归通过。76历史不变量完整前后日志相同，其余4596台账/报告条目和受保护9页/共享规则hash不变。
- 当前全库1837failed /196queued /1731passed /845published；dsa-cpp10passed/3failed。选择性整书审计exit1只因剩余排序/图算法/高级数据结构，非整书已完成。无生产构建、审批、提交、发布、部署。四worker已关闭（两者经同批返修后再关闭）；归档清理及归档后TS通过前不启B11。

B10清理确认：四worker关闭；PID40627/40628/40656均退出、3100空、原tmp不存在；归档`quality/artifacts/repair-batches/2026-09-24-10/session/`。清理7个运行时/软链路径、41个生成二进制，归档TS-family0，归档后全库TypeScript exit0。原dirty/.next/repo tmp/依赖保留。

## 批次 11：DSA C++ 收尾三章与有效管理学习地图（完成）

B10全部关闭/服务退出/tmp清理/归档后TS0完成后开始。四个互斥写集合：排序dsaa3-07、图算法dsaa3-09、高级数据结构dsaa3-12、effective-executive学习地图。启动1837failed/196queued/1731passed/845published；Main负责双书冻结范围、事实来源复核、模型/浏览器/正式门禁与清理，worker各负责单章+独立模块。启动时临时证据`/tmp/remuse-quality-batch11-20260924/`（现已归档）。当时尚未验收，不代表通过/整书完成/发布。

### B11 最终验收

| 章节 | 内容评分 | 最终状态 |
|---|---:|---|
| sorting | 94 | passed；draft:true |
| graph-algorithms | 97 | passed；draft:true |
| advanced-data-structures | 95 | passed；draft:true |
| eex19-official-learning-map | 99 | passed；draft:true |

- DSA C++13/13章通过；有效管理1章通过、其余13章未通过，不宣称整书完成。
- 主控独立TS模型4372排序/4496图/7000AA操作及地图36合法+4非法状态；最终MDX实际26段C++组成3程序，严格编译和ASan/UBSan执行通过。另有独立9837排序、4096图×4源、5040AA排列/4000kd查询/100配对堆测试。
- 四章最终正式视觉hash匹配，390/1440八个正文交互视图通过；地图全36状态双视口通过，排序正常动画播放/暂停/拖动/重置通过。算法穷举浏览器证据复用只针对字节未变组件；未声称原生select键盘改值验证成功。
- 图章首次90分knowledge15、地图首次95分visual15均未放行。分别补齐真实概念解释、精确重命名章节专属模块后重审通过；不改阈值/清单。模块热更期间一次React未挂载错误留档，冻结后重跑无非CF控制台错误；不武断归因HMR。
- 最终全库TS、限定lint/format、2645路由/2703模块注册、4609MDX、内链、来源锚点、13审计回归通过。76历史不变量完整日志前后相同，其余4582台账/报告条目与23页/共享规则hash不变。
- 工作区全库1833failed/196queued/1735passed/845published。来源核验仅限实际保存与阅读材料，未取得整本书。所有新修页保持草稿；未擅自批准上架。
- 用户要求本批结束后push并尝试正常发布门禁，随后等待命令；禁止自动开启B12。提交时隔离开始前已有的无关修改，不强行纳入技能、依赖、python-advanced发布开关或PCC2–5章。

B11清理确认：四worker已关闭，所属PID91440/91441/91469退出，3100空，原/tmp批次目录不存在；证据归档`quality/artifacts/repair-batches/2026-09-24-11/session/`。移除本批2个运行时/软链路径和17个生成二进制，归档无TS-family文件，归档后全库TypeScript exit0。原dirty/.next/repo tmp/依赖保留。首次清理脚本因PID清单格式不同在发送信号前失败，已留日志并修正读取格式后完成。

提交范围说明：本轮B1–B11共41篇实际修订章及其必要组件/文档/视觉驱动修复；以HEAD为底单独合成提交快照，仅合入这些章节的质量条目并重建注册表、汇总与待办。原先未提交的16篇python-advanced发布开关与PCC2–5章不纳入本次push，原文件仍留工作区。因此提交快照为1833failed/200queued/1747passed/829published，与包含用户原修改的工作区总数不同，不应混为发布退回或本批退步。未修订的4568项提交台账保持HEAD原值。
