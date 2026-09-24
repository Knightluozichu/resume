# Design Patterns：课程范围与实践边界

> **B7 归档定位（2026-09-24）**：本文审查的是 B7 启动时冻结的 24 页，表内哈希/行号和 G1–G4 是历史基线，不随后续修复自动改变。本批证据永久位置为 `quality/artifacts/repair-batches/2026-09-24-07/session/scope-worker/`。文中 `/tmp/remuse-quality-batch7-20260924/` 为原执行路径；归档后按 session/ARCHIVE.md 恢复到隔离临时目录重放。TypeScript 证据增加 `.txt` 后缀，原字节/哈希与恢复映射见 archive-mapping.json。章级通过不消除本文指出的原书范围限制。


> **B7 有限范围审查，2026-09-24（Asia/Shanghai）。不是整书完成声明、评分重算或发布批准。** 以本批启动时的 manifest / publication ledger 为基线，对 24 个既有 `passed` 页逐页核对练习、代码切片和来源声明，并对三个代码合同做最小复现。不评价本批正在修改的 Visitor、复合模式、最终复习，也不重新验收组件模型或浏览器交互。

## 1. 可直接引用的范围结论

本站是依据 GoF 官方书目范围组织的独立中文教学课程，使用原创 TypeScript 示例、实验和练习，不是原书全文翻译或完整复刻。**27 个站内页 = 导论 1 页 + 23 个模式页 + 3 个支持页**（学习地图、复合模式、最终复习）。Manifest 的 **24 个正式 unit = 导论 1 + 模式 23**；**310 个映射字段 = 导论名下的 11 个宏观目录项 + 23×13 个通用模式描述字段**，不能称为 310 个独立细知识点。

目录层面能定位原书六章及附录等宏观范围；正文教学层面已提供模式机制与若干局部实践，但**没有完成原书文档编辑器整案、附录完整内容、C++/Smalltalk 原版示例及其语言特性对照**。即使后续 27 页全部获得章级 passed，也不自动消除这些边界，更不等于整书审批或出版正文访问/改编授权。

### 1.1 基线与审查强度

- 基线：`/tmp/remuse-quality-batch7-20260924/baseline-manifest.json`、`baseline-ledger.json`，而不是并发施工期间可能更新的共享文件。
- 本次 24 页的 SHA-256 前 16 位均与基线 ledger 的 `contentHash` 一致；完整正文副本、SHA-256、练习/答案/代码行号在 `scope-worker/baseline/`、`baseline-files.json`、`inventory-24.json`。这只固定审查对象，不把 hash 一致当成正确性证明。
- 24 页均核对了题目与答案的实际任务、代码承担的职责及来源边界；**不是全量代码运行或逐个原书细目忠实度审查**。本次只执行 §5 的三个 MDX 反例，不新增章级 pass/fail 或评分。
- B6 四章的运行与交互结论引用 [B6 MAIN-REVIEW](../quality/artifacts/repair-batches/2026-09-24-06/session/MAIN-REVIEW.md)，不是本批新测。此前 20 页的旧通过记录不能代替此次内容抽样。
- 本文创建前不存在同名文件；未覆盖既有范围文档。唯一仓库写入为本文，其余新证据全部在 `/tmp/remuse-quality-batch7-20260924/scope-worker/`。

## 2. 资料分层：哪些访问过，哪些没有

### 2.1 本次复用的真实 GET，而非重新下载

复用 [B6 scope-review/REVIEW](../quality/artifacts/repair-batches/2026-09-24-06/session/scope-review/REVIEW.md) 与其留存 body。本批实际校验了 12 份 B6 body 的 SHA-256，均与各自获取记录一致；原始 URL、最终 URL、HTTP 状态、UTC 时间与完整 hash 汇总在 `scope-worker/reused-b6-sources.json`。**本批新增 GET 为 0**：新增判断来自本地 MDX 与执行结果，没有引入需另行联网核查的原书正文事实。

下表列主要可持久引用证据。时间保持获取记录的 UTC；这些记录在北京时间均属 2026-09-24。技术文档只支撑相应技术语义，不证明 GoF 某章原文写了同样的代码或案例。

| 证据及用途 | B6 获取时间（UTC）/ 状态 | body SHA-256 |
| --- | --- | --- |
| [InformIT 书目：版次、23 模式、11 宏观目录、样章入口](../quality/artifacts/repair-batches/2026-09-24-06/session/scope-review/source.json) | `2026-09-23T17:13:39.222617+00:00` / 200 | `703623f5d9f2736f9d82a7b1969aaf97660214f9a1dfcd1a4b530301cc5f0b77` |
| [Node.js events：同步事件与监听器语义（非原书正文）](../quality/artifacts/repair-batches/2026-09-24-06/session/observer-worker/sources/manifest.json) | `2026-09-23T16:59:16.264825+00:00` / 200 | `a2d8e878fc1eebf9a7a5bb294a7002413e36931a235c483b03000b8be153d20b` |
| [TypeScript classes：类、接口与 readonly 的技术语境](../quality/artifacts/repair-batches/2026-09-24-06/session/state-worker/sources/requests.json) | `2026-09-23T17:03:05.473916+00:00` / 200 | `bf4cdee8805035838c1b53986166460c0a0e1e5b7fbde05d7f0cd5cb9c1c491b` |
| [W3C SCXML：状态转换语义，不证明 GoF State 实现](../quality/artifacts/repair-batches/2026-09-24-06/session/state-worker/sources/requests.json) | `2026-09-23T17:03:06.332581+00:00` / 200 | `25da59a4a475e9751ad855b639c933b2d465911bb7eed7d33ffd600196e2a209` |
| [Boost 1.89 Dijkstra：非负权边界](../quality/artifacts/repair-batches/2026-09-24-06/session/strategy-worker/sources/boost-dijkstra-1.89.json) | `2026-09-23T17:08:22.178596+00:00` / 200 | `a848a61c36bafe664064909766e0405eefcdaa11d50669b2e7c8945e36e8cd3b` |
| [Oracle Java 21 AbstractList：骨架实现的现实参照](../quality/artifacts/repair-batches/2026-09-24-06/session/template-worker/sources/abstract-list.json) | `2026-09-23T17:04:29.137260+00:00` / 200 | `af993a47e2a5f181671a80643e88c1b3c346a9084d5ae78367cd3d3b57bd7939` |

其他已校验的 B6 技术证据包括 ECMAScript Map、WHATWG DOM、TypeScript functions、Stripe 幂等请求、GoF 作者回顾和 MDN try/catch；MDN 属平台技术参考，**不是 GoF 作者/出版社正文**。没有把 B6 失败或未完成的请求升级成成功证据。

### 2.2 四个不可互换的来源层级

| 层级 | 此次能据以判断什么 | 不能据以判断什么 |
| --- | --- | --- |
| 官方书目与宏观目录 | InformIT 第一版、ISBN 9780201633610、416 页、23 patterns；11 个大项；介绍提到 C++/Smalltalk 示例 | 当前页面没有展开导论/编辑器各节或逐模式细目；manifest 的 `complete-toc` 登记名不能代替这次未见的细目录 |
| 官方语言/API/标准与平台技术参考 | 核对本课程使用的类型、生命周期、状态转换、算法约束与现实 API 类比 | 不能证明原创 TS 示例是原书例子；现代 API 也不是自动成立的“GoF 原书已知应用” |
| 已登记授权样章 | Manifest `verifiedAt: 2026-07-19`、`sourceAccess: authorized-sample`；B6 书目实际显示 Abstract Factory、Adapter、Chain of Responsibility 三个样章入口 | 本批未重新 GET 样章正文，也未扩展/重新认定其许可证；入口存在不表示其他 20 模式有全文访问或改编授权 |
| 本批未访问的原书正文 | 明确保留未知：编辑器细节、完整附录、各模式原版实现变体和完整已知应用 | 不作逐段忠实、全文复刻、全书知识完成或原文代码等价声明 |

出版社 body 的可读摘录见 [informit.txt](../quality/artifacts/repair-batches/2026-09-24-06/session/scope-review/informit.txt)：L97–106 是版权年/版次/语言介绍，L135–150 是样章入口与宏观目录。Copyright 1995 与 manifest 的出版年 1994 不是同一字段，本次不据此改版次记录。

前 20 个既有页的 Attribution 使用 `authorized-sample`，B6 四页使用 `outline-only`；24 页均声明 `independent-rewrite`。这里把前者理解为**书级资料登记范围**，而非逐页取得正文。没有正文 body 支持的章节，只能维持独立重写与技术类比声明。后续如修来源措辞，应逐页明确样章/目录/技术文档分别支持什么，而非扩大 manifest 权限。

## 3. 分母、宏观目录与站内映射

### 3.1 原书 11 个宏观项如何落在课程中

“已覆盖”在本文只表示列明的局部教学目标已有正文/练习证据；“部分”不表示原章完成；“未覆盖”不要求立即扩写全文，也可以继续以明确范围限制交付。

| 官方大项 | 站内证据与判断 | 未覆盖/不能推出的部分 |
| --- | --- | --- |
| 1. Introduction | [导论](../content/design-patterns/00-intro/intro.mdx) L27–89：变化压力、参与者、后果与替代方案；L204–222 有选择/拒绝题。**局部已覆盖** | 未作原书导论逐节核对；11 项登记不是导论细节目录 |
| 2. A Case Study: Designing a Document Editor | 导论 L98–100 只有一个变化轴说明；[Command](../content/design-patterns/03-behavioral/command.mdx) L127–208 有重命名/历史切片，[Memento](../content/design-patterns/03-behavioral/memento.mdx) L176–212 有画布快照。**部分：若干独立局部案例** | 没有贯通的文档编辑器构建/运行/验收任务，不能把这几个独立对象当成原书案例的完整实现；不臆列未访问的原书子节 |
| 3. Creational Patterns | 5 个模式独立页，见 §3.2 与 §4。**模式入口与局部机制已覆盖** | 不保证原书每个实现变体与应用都已复现 |
| 4. Structural Pattern | 7 个模式页；Decorator 文件虽在 behavioral 目录，正文与学习地图按结构型教学。**模式入口已覆盖** | 文件目录位置不能用于把结构型计成 6 个或行为型计成 12 个 |
| 5. Behavioral Patterns | 11 个模式页，其中 Visitor 正在 B7 修改、不在本次 24 页验收对象内 | 不将未审 Visitor 或既有 passed 推导为 11 个模式本批全部复验 |
| 6. Conclusion | 导论 L114–116 为取舍性总结；最终复习是站内支持页且本次排除。**部分** | 不是原书结论全文教学，也不评价正在修改的最终复习 |
| Appendix A: Glossary | 导论 L118–120 说明作用，各页有局部 Glossary。**部分** | 未取得原附录术语全集并逐条对应；章末词典不等于附录 A 完整覆盖 |
| Appendix B: Guide to Notation | 导论 L122–124 说明箭头必须对应调用/创建/所有权。**部分，仅入口说明** | 缺少记号对照表与读图/纠错任务；不宣称本站图形符号与原书记号逐项等价 |
| Appendix C: Foundation Classes | 导论 L126–128 明示 TS 不复现原示例库。**范围说明已覆盖，附录实现明确未覆盖** | 无原基础类代码、构建环境或兼容性实践 |
| Bibliography | 导论 L130–132 解释追溯用途，各页有自己的来源链接。**部分** | 本站参考资料不是原书参考文献全集或逐条校订 |
| Index | 导论 L134–136 解释检索用途，学习地图提供路线。**部分** | 导航和章节名不是原书索引、页码和交叉引用的重建 |

**语言范围：** B6 官方介绍支持“原书包含 C++/Smalltalk 示例”这一宏观事实；本站抽样代码为 TS。原版语言的示例逐例对应、构建运行、对象/资源语义差异均未纳入本次覆盖承诺。不能把 JS/TS 的引用、readonly、同步回调实验等同于 C++/Smalltalk 原始实现，也不凭未访问正文罗列其具体用法。

### 3.2 24 个 formal unit 与 3 个支持页

正式 ID 沿用基线 manifest 的既有顺序，不按本站目录重新编号。每个模式映射相同的 13 个字段：**模式名称与分类、意图、别名、动机、适用性、结构、参与者、协作、后果、实现、示例代码、已知应用、相关模式**。这些是描述结构，不能把重复字段名累计成细知识完成率。

| formal unit | 站内页（去掉共同前缀 `content/design-patterns/` 与 `.mdx`） | 映射字段数 |
| --- | --- | --- |
| `designpatterns-01` 什么是设计模式 | [00-intro/intro](../content/design-patterns/00-intro/intro.mdx) | 11 |
| `designpatterns-02` 策略模式 | [03-behavioral/strategy](../content/design-patterns/03-behavioral/strategy.mdx) | 13 |
| `designpatterns-03` 观察者模式 | [03-behavioral/observer](../content/design-patterns/03-behavioral/observer.mdx) | 13 |
| `designpatterns-04` 装饰器模式 | [03-behavioral/decorator](../content/design-patterns/03-behavioral/decorator.mdx) | 13 |
| `designpatterns-05` 命令模式 | [03-behavioral/command](../content/design-patterns/03-behavioral/command.mdx) | 13 |
| `designpatterns-06` 状态模式 | [03-behavioral/state](../content/design-patterns/03-behavioral/state.mdx) | 13 |
| `designpatterns-07` 单例模式 | [01-creational/singleton](../content/design-patterns/01-creational/singleton.mdx) | 13 |
| `designpatterns-08` 工厂方法模式 | [01-creational/factory-method](../content/design-patterns/01-creational/factory-method.mdx) | 13 |
| `designpatterns-09` 抽象工厂模式 | [01-creational/abstract-factory](../content/design-patterns/01-creational/abstract-factory.mdx) | 13 |
| `designpatterns-10` 建造者模式 | [01-creational/builder](../content/design-patterns/01-creational/builder.mdx) | 13 |
| `designpatterns-11` 原型模式 | [01-creational/prototype](../content/design-patterns/01-creational/prototype.mdx) | 13 |
| `designpatterns-12` 适配器模式 | [02-structural/adapter](../content/design-patterns/02-structural/adapter.mdx) | 13 |
| `designpatterns-13` 桥接模式 | [02-structural/bridge](../content/design-patterns/02-structural/bridge.mdx) | 13 |
| `designpatterns-14` 组合模式 | [02-structural/composite](../content/design-patterns/02-structural/composite.mdx) | 13 |
| `designpatterns-15` 外观模式 | [02-structural/facade](../content/design-patterns/02-structural/facade.mdx) | 13 |
| `designpatterns-16` 享元模式 | [02-structural/flyweight](../content/design-patterns/02-structural/flyweight.mdx) | 13 |
| `designpatterns-17` 代理模式 | [02-structural/proxy](../content/design-patterns/02-structural/proxy.mdx) | 13 |
| `designpatterns-18` 责任链模式 | [03-behavioral/chain-of-responsibility](../content/design-patterns/03-behavioral/chain-of-responsibility.mdx) | 13 |
| `designpatterns-19` 迭代器模式 | [03-behavioral/iterator](../content/design-patterns/03-behavioral/iterator.mdx) | 13 |
| `designpatterns-20` 中介者模式 | [03-behavioral/mediator](../content/design-patterns/03-behavioral/mediator.mdx) | 13 |
| `designpatterns-21` 备忘录模式 | [03-behavioral/memento](../content/design-patterns/03-behavioral/memento.mdx) | 13 |
| `designpatterns-22` 模板方法模式 | [03-behavioral/template-method](../content/design-patterns/03-behavioral/template-method.mdx) | 13 |
| `designpatterns-23` 访问者模式 | [03-behavioral/visitor](../content/design-patterns/03-behavioral/visitor.mdx) | 13 |
| `designpatterns-24` 解释器模式 | [03-behavioral/interpreter](../content/design-patterns/03-behavioral/interpreter.mdx) | 13 |

三页支持页不新增 GoF 模式、也不新增 formal unit：

- `00-intro/learning-map`：本站学习路线，本次 24 passed 页之一。
- `04-compound/compound-patterns`：本站跨模式练习，不是“GoF 第 24 个模式”；本次排除。
- `04-compound/final-review`：本站综合复习，不是独立出版章节；本次排除。

因 Visitor 排除，**本次 24 页 = 导论 + 学习地图 + 22 个模式页**，不是 24 个正式模式，也不是 24 formal unit 全部完成。B7 启动基线为 24 passed / 3 failed；这只是启动快照，不抢写本批完成状态。

## 4. 24 个既有 passed 页：练习与代码范围清单

这是全量页面清单、有限深度实践审查，不是关键词得分。表内“题”包括该题紧随的折叠答案；完整范围在 `inventory-24.json`。每页均有 3 题和 3 个 Answer，但题数不等于落实了 11/13 个字段的全部实践。

**证据强度：** 前 20 页核对题面/答案/切片，不声称逐页运行；多数“改 Demo”答案是修改方向而非可执行参考解。B6 四页有明确追加/拼接说明与可执行断言，执行依据复用其归档。本次三个反例单列 §5。

| 页 / 基线 hash 前 16 位 | 实际练习覆盖（MDX 行） | 代码范围与未证明部分 |
| --- | --- | --- |
| [intro](../content/design-patterns/00-intro/intro.mdx)<br>`32d796e5758e1797` | L204–222：新增导出变化轴、比较相似结构、拒绝过早抽象 | L173–194 只校验评审记录部分字段，不实现编辑器或原书附录；不能以 L202 的“覆盖 11 节点”代替相应实践。 |
| [learning-map](../content/design-patterns/00-intro/learning-map.mdx)<br>`cd243148206fbac5` | L166–182：增加直接实现节点、产品族入门条件、找出未运行证据 | L142–156 只检查路线字段非空，不证明读者完成任何模式代码。 |
| [abstract-factory](../content/design-patterns/01-creational/abstract-factory.mdx)<br>`7346c7023a0aaf03` | L219–236：新增 Tooltip、单产品选型、平台生命周期混用 | L134–147 创建抽象产品，L192–209 检查非空同族标签；未检查角色齐全或真实生命周期兼容，不能把 sameFamily 当兼容性证明。 |
| [builder](../content/design-patterns/01-creational/builder.mdx)<br>`c024ca02bfc7b02d` | L231–247：增加 region、拒绝无顺序需求、产品快照边界 | L127–145 是协议/Director；L190–221 是另一个 SafePlanBuilder 表示。必需字段与数组拷贝已表达，不是同文件续接的完整双表示程序。 |
| [factory-method](../content/design-patterns/01-creational/factory-method.mdx)<br>`0cfdb3f98bbf2d70` | L211–227：YAML 扩展、独立工厂比较、具体产品泄漏 | L127–144 Creator 工厂钩子；finally 只有资源关闭注释，不能声称测试过关闭。L189–201 是产品调用切片，不是完整解析器。 |
| [prototype](../content/design-patterns/01-creational/prototype.mdx)<br>`92ea34e09bbf2b6e` | L220–236：字体资源重绑、拒绝轻量对象、子节点污染 | L127–145 树复制与 L190–210 带 seen 的图复制是两个示例；后者表达环/共享引用保留，不负责外部句柄重建。 |
| [singleton](../content/design-patterns/01-creational/singleton.mdx)<br>`24d83a87e0aa58f4` | L223–239：staging 替换、显式注入、作用域唯一性 | L127–146 进程内配置入口，L191–213 是显式注入替代方案，不应硬拼成单例续写；不证明跨进程唯一、并发安全或深不可变。 |
| [adapter](../content/design-patterns/02-structural/adapter.mdx)<br>`2a764ec470b851a1` | L215–231：单位扩展、外观比较、直接改接口 | L127–144 温度转换；L189–205 增加有限值/下界检查。缺失值的联合类型未接入返回接口，实际使用抛错；不是供应商完整协议。 |
| [bridge](../content/design-patterns/02-structural/bridge.mdx)<br>`5290b1230a48c7b6` | L231–247：Webhook、双轴必要性、适配器比较 | L127–148 与 L193–221 分别用双字符串/Notice 的 deliver 接口，属于变体，不能直接合并同名接口据此判错；应补独立文件说明。 |
| [composite](../content/design-patterns/02-structural/composite.mdx)<br>`da27bf91693a1cfb` | L227–243：增加叶子、拒绝非递归需求、稳定树加操作 | L127–153 聚合与 L198–217 防环组；后者沿调用路径传 visited。没有全量遍历混用普通/安全节点的执行证据，不把权限计数当真实鉴权。 |
| [facade](../content/design-patterns/02-structural/facade.mdx)<br>`ec7a9bcb8db7c631` | L220–236：优惠券编排、拒绝单查询、区分适配器 | L127–151、L196–210 为同步 reserve/authorize/create 切片；依赖服务未给实现，失败集合只含库存/支付，不是完整配送/远程事务。 |
| [flyweight](../content/design-patterns/02-structural/flyweight.mdx)<br>`0ac4985764445938` | L227–243：新增树种不共享坐标、小规模拒绝、与对象池区别 | L127–158 依赖未给出的 createTreeFlyweight 与 Canvas；L203–217 只传 x/y，虽定义 scale 却未应用。内存为估算，不是实测显存。 |
| [proxy](../content/design-patterns/02-structural/proxy.mdx)<br>`eb25139f61d25c39` | L211–227：登录前不创建真实对象、适配器/装饰器比较 | L127–142 依赖 RemoteImage；L187–201 依赖策略/缓存/真实对象等外部量。延迟创建与权限是分开切片，不是可复制运行的 CDN 实现。 |
| [chain-of-responsibility](../content/design-patterns/03-behavioral/chain-of-responsibility.mdx)<br>`679ac0f0c1ae47a5` | L204–220：审计是否终止、必经管线反例、与命令/中介者区别 | L127–137 抽象 Handler，L182–194 dispatch。后段引用前段类型时 by/handler 不一致；属于未说明组装方式下的合同缺口，见 G3。 |
| [command](../content/design-patterns/03-behavioral/command.mdx)<br>`02ac835b70ede440` | L218–234：发布命令补偿、失败不入历史、快照与责任链比较 | L127–150 依赖 DocumentReceiver，L195–208 是历史栈；不证明外部通知可撤销，也未给重用同一命令对象等完整生命周期测试。 |
| [decorator](../content/design-patterns/03-behavioral/decorator.mdx)<br>`087d5e74ca851518` | L201–217：脱敏顺序、固定管线拒绝、代理/适配器比较 | L123–136 压缩只是字符串包装，L181–191 audit 为外部依赖；不是加密/压缩算法或安全审计实现。文件归类路径不改变结构型模式身份。 |
| [interpreter](../content/design-patterns/03-behavioral/interpreter.mdx)<br>`5b4cafdd5c41739f` | L212–228：NotExpression、拒绝复杂语言、树结构/操作扩展 | L123–146 实现小型表达式求值；L191–202 假定 parse 已存在。没有文法解析器，不宣称覆盖优先级/错误恢复/编译优化。 |
| [iterator](../content/design-patterns/03-behavioral/iterator.mdx)<br>`79833c81e9f0d0af` | L219–235：过滤与独立游标、修改一致性、树与访问者比较 | L123–143 基础迭代器耗尽抛错；L188–209 版本化实现仅检查版本，空集 next 返回 undefined，见 G2。这里是自定义 Iterator，不是 JS 标准协议。 |
| [mediator](../content/design-patterns/03-behavioral/mediator.mdx)<br>`68b497bdc53419ff` | L216–232：选型、Bob 路由追踪、拆分上帝对象 | L176–206 注册/广播实现；三题均非实际改代码题，无可运行断言参考解（G4）。未承诺重复注册、失败隔离等未声明业务策略。 |
| [memento](../content/design-patterns/03-behavioral/memento.mdx)<br>`9484a99979258a8a` | L222–238：命令边界、快照恢复、容量/资源/隐私设计 | L176–212 可捕获/恢复，但 readonly state 仅固定引用，可直接改 state.title；与 L143 不可变声明矛盾（G1）。题 2 是观察，不是改代码验收。 |
| [observer](../content/design-patterns/03-behavioral/observer.mdx)<br>`a2b0cf7648f34036` | L304–378：清理代际、重入拒绝、事件快照/非法库存 | L161–250 实现/反例与题内断言明确追加；B6 运行证据可复用。合同是同步本地订阅，不保证离线补偿或网络 exactly-once。 |
| [state](../content/design-patterns/03-behavioral/state.mdx)<br>`e7d3148013d2c5b3` | L341–400：修提前提交、十二格转换、与策略/开关选型 | L134–288 顺序片段与题内断言；B6 已测允许/拒绝/写前失败。仅写前失败合同，不代表远程事务回滚；题面更广的失败测试依据见 B6 而非只看十二格代码。 |
| [strategy](../content/design-patterns/03-behavioral/strategy.mdx)<br>`740c42b80a119417` | L372–416：坏实现碰巧通过、零成本回边、固定目标拒绝 | L143–147 明确所有 TS 块含答案顺序拼接；B6 有图/边界测试。非负有限成本、小规模图，外部 JSON 形状校验另属入口责任。 |
| [template-method](../content/design-patterns/03-behavioral/template-method.mdx)<br>`66cc4637482c6045` | L387–426：early/bypass、追加 TSV、多轴改策略组合 | L140–329 与 TSV 答案可续接，B6 有失败轨迹/资源测试。TSV 限定小语法，不是通用 CSV/TSV 解析器；同步内存提交不等于远程事务。 |

**来源审查结论：** 前 20 页的官方目录/回顾/TS 链接主要提供范围与语言背景；“已知应用”中泛称 HTTP 中间件、UI、游戏、编辑器等，不能因此计为已核实的 GoF 原书案例。B6 四页已明确将 Node/.NET、SCXML、Boost、Java 骨架作为现代技术对照并声明差异，保留这种措辞，不要求四章再次重写。

## 5. 具体缺口与最小修复（不改正文、不改状态）

### 5.1 判定代码片段的规则

1. **明确续接/可运行合同**：例如 Strategy L143–147 明说全页含答案顺序拼接，Observer L309 说明答案接到前面的文件末尾，Template Method L399–400 说明直接追加。这类承诺可用完整拼接运行判断；本批复用 B6，不重做。
2. **独立示例或替代方案**：如 Bridge 两套参数表达、Singleton 的依赖注入替代、Builder 的两种产品表示。没有续接承诺时，不因同名类型冲突、表示不同或硬拼失败就认定代码错误。应优先补“独立文件/依赖/省略项”的边界说明。
3. **依赖前文命名合同的切片**：如 `dispatch(request, head: Handler)`、`VersionedIterator<T> implements Iterator<T>`。本批明确采用页面前文同名类型，并以独立模块隔离浏览器/标准库同名符号；其结果只说明这一可解释的组装方式，不冒称页面原本承诺了全页拼接。
4. **省略依赖的教学切片**不自动等同于错误，更不自动等同于可运行伪代码。Facade 等使用 `ts` 围栏且正文称“切片”，并非明示完整程序。缺少 fixture 是实践边界；若要声称练习可运行，再补必要依赖即可，不要求重做生产系统。

三项抽样的提取脚本、编译命令、原始 diagnostics 与执行结果在 `scope-worker/check-samples.py`、`sample-results.json`、`samples/`。保留原 MDX 代码，前置仅加 `export {}` 隔离全局名；责任链另补最小 `{ id: string }` 请求类型。无组件模型替身，无浏览器测试。**反例脚本 exit 0 表示缺陷被成功复现，不表示教学代码正确。**

### G1 — Memento：可直接篡改的“不可变”快照（实质运行缺口）

- 证据：[memento.mdx](../content/design-patterns/03-behavioral/memento.mdx) L93–97 的不变量/封装表、L133–143 的协作与“不可变 CanvasMemento”声明；L184–185 却公开 `readonly state: CanvasState`，L203–209 捕获/恢复只做浅复制。L174 虽说可进一步模块私有化，也不能解除已写出的不可变承诺。
- 复现：原两块顺序放入独立模块后，`saved = originator.capture(); saved.state.title = "tampered-by-caretaker"; originator.restore(saved)`；再次 capture 得到被篡改的标题。**strict TypeScript 编译通过，Node 复现通过，没有 any/cast/反射。**不是强行合并独立示例制造的冲突。
- 最小修复：按当前平面状态选择私有/不透明备忘录或受控只读且冻结的状态；明确看护者不能解释/写字段的边界。增加实际改代码题与捕获后篡改、恢复、再次捕获的断言。不要为仅四个标量引入通用序列化框架；深层图/版本迁移仍可明确不覆盖。

### G2 — Iterator：版本检查没有覆盖耗尽（实质边界缺口）

- 证据：[iterator.mdx](../content/design-patterns/03-behavioral/iterator.mdx) L124–140 定义 `next(): T` 且基础实现耗尽抛错；L202–206 的版本化实现即使版本未变也直接读取越界数组。
- 复现：`new TaskIterator([]).next()` 抛错，而 `new VersionedIterator<string>([], 0, () => 0).next()` 返回 `undefined`；两块在模块内采用本页自定义 Iterator，strict 编译通过，Node 确认差异。不是误用标准 JS `IteratorResult` 协议，也不依赖拼接同名全局接口。
- 最小修复：明确空集/耗尽的公共语义，并在版本化实现中兑现；或者统一改变接口与两实现，但不能静默返回未声明值。补空集、最后一项后再次 next、版本变化、两个游标互不干扰的可执行断言。快照一致性不必扩成并发容器教程。

### G3 — Chain of Responsibility：依赖前文 Handler 时结果字段不一致（条件明确的合同缺口）

- 证据：[chain-of-responsibility.mdx](../content/design-patterns/03-behavioral/chain-of-responsibility.mdx) L128–135 的 `Result` 使用 `by`；L183–192 的 `ChainResult` 使用 `handler`，`dispatch` 却直接返回 handled/rejected 的旧结果。
- 复现前提：后段没有自带另一个 Handler，也没说明换用另一套 Handler；因此**采用前文同名 Handler**并补最小 Request。编译出现 TS2322：返回值缺少 `handler`。这不是声称作者已写出“全部代码顺序拼接”的保证；如果作者本意为独立例子，必须把其独立 Handler/结果合同说明清楚。
- 另一个局部遗漏：L125 说切片“展示无法终结时交给后继、链尾显式结果”，但 L127–137 只有抽象方法，没有真实转交/链尾实现。这里不是复杂生产功能，而是该段自己承诺展示的行为。
- 最小修复：统一 by/handler 或显式转换，标注片段组装方式；给出最小具体处理者、未处理链尾与 handled/rejected/unhandled 三路断言即可。保留现有停止语义解释和审计选型题，不全章重写。

### G4 — 实践闭环：题面有答案不等于有可执行改动

- [mediator.mdx](../content/design-patterns/03-behavioral/mediator.mdx) L216–232 三题分别是选型、操作追踪和拆分设计，**没有实际改代码题或断言参考解**。L176–206 已有足够小的实现，可将路由题改为新增一个接收规则，并断言发送者不回收、接收顺序与路由变化；不用重做整套实验。
- Memento L222–238 同样只有边界、观察、生产设计题；可与 G1 一起补修复快照代码题，不再拆一份大改。
- Abstract Factory L219–224 的 Tooltip、Factory Method L211–215 的 YAML、Prototype L220–224 的字体句柄等已有针对性修改问题，应保留；当前答案是实现方向，不能叫作已执行参考解。后续按选中章节补最小 fixture/断言即可，**不以“都有文字答案”为由要求 20 页同时重写**。
- Facade L134–136 / L199–208、Flyweight L141、Proxy L133–139 / L193–199、Interpreter L197 等都有外部依赖。它们先列为“不可独立复制运行的切片”，不是发现未知实现必然错误；明确依赖和独立文件边界后再安排局部可运行实践。

### G5 — 原书宏观范围仍有未覆盖项（非代码错误）

- 导论 L98–100 的编辑器说明不能覆盖整案；L118–136 的附录/书目/索引说明不是内容重现；L202 把 11 个名称列作练习覆盖，但 L204–222 三题未要求基础类实现、原书记号辨析或参考文献/索引核验。目录命中不能补足这些任务。
- 必要处置首先是**保留本文明确的范围限制**。如未来扩大课程承诺，另立一个原创编辑器整合练习或记号读图任务，并补所需来源；不得凭未取得的正文补写“原书还讲了哪些细节”。未访问的完整原书、C++/Smalltalk 和基础类库，不列为本批已完成。
- 各旧页“练习覆盖 13 节点”的列名句只能视为检查提示，不得当作 13 个独立测验结果。§4 的具体题目覆盖比该句更适合引用。

## 6. 下一批建议：按可复现风险排序的四个任务

这是供 Main 排期的建议，**没有启动新任务、修复旧章或更新台账**。前三项只需局部修复；第四项补已确认的实践遗漏。对共享注册/台账/最终浏览器验收继续由 Main 决定，避免每个 worker 重跑整书。

| 顺序 / 任务 | 为什么先做 | 最小工作与完成证据 | 明确不做 |
| --- | --- | --- | --- |
| 1. **Memento 不可变与封装合同** | 无 cast 即可污染历史，直接违背正文；strict 编译不能拦截（G1） | 修公开可变状态边界；把现有观察题改成真实改代码题；从最终 MDX 提取，证明捕获后的外部操作不能改变历史、恢复保持四字段一致；沿用现有图，仅在合同改变时同步 | 不扩成跨版本存档/加密平台，不把所有浅复制都判错 |
| 2. **Iterator 空集/耗尽合同** | 自定义 next(): T 静默返回 undefined，普通/版本化实现不一致（G2） | 统一耗尽语义；运行空集、末尾、版本冲突和双游标测试，保留 fail-fast/快照的选型解释 | 不重做遍历体系或并发库，不借用标准 IteratorResult 掩盖本页协议 |
| 3. **责任链结果类型与最小转交链** | 依赖前文 Handler 的自然组装 TS2322；该前提已明确，风险低于无条件运行缺陷（G3） | 明确独立/续接关系，统一结果字段，补具体处理者和链尾；三种终局及不吞拒绝的断言来自最终正文 | 不将所有独立代码块硬拼，不将责任链重写成必经管线 |
| 4. **Mediator 实际改代码练习** | 现有三题确实没有代码修改和可执行参考解（G4），但不是已证明模型失效 | 保留选型/拆分题，将路由任务改成最小可执行修改；提供原实现与改后接收者序列断言、明确重复注册/异常是否在范围内；补精确来源用途说明 | 不泛化重写其余 20 页，不把编辑器/附录整案塞进此章，不重跑 B6 四章 |

编辑器整案、记号指南和 C++/Smalltalk 对照若要进入后续课程，应在这四个局部任务之外另行定范围；也可以继续明确未覆盖。Main 完成任何章级修复后，应更新本文相关行号/hash 与结论再引用，而非无条件继承本次发现或基线状态。

## 7. 交付证据与复查方法

- 仓库交付：`docs/design-patterns-scope.md`（本文）。
- 本批证据根：`/tmp/remuse-quality-batch7-20260924/scope-worker/`。
- `baseline-metadata.json`：基线 manifest/ledger 与 B6 REVIEW 的完整 hash、审查时间和方法。
- `manifest-excerpt.json`、`ledger-excerpt.json`：仅本书的启动基线；`baseline/` / `baseline-files.json` 固定 24 页文本与完整 hash。
- `inventory-24.json`、`*-excerpts.txt`：24 页题目/答案/代码定位及来源声明；字段抽取只用于导航，本文判断来自实际内容而非关键词得分。
- `reused-b6-sources.json`：12 份真实 GET 的日期、状态、最终 URL、body hash 与本批校验结果；body 继续引用 B6 archive，不制造重复 GET。
- `sample-results.json`、`check-samples.py`、`samples/`：三个原 MDX 样本及独立编译/运行命令。可运行 `python3 /tmp/remuse-quality-batch7-20260924/scope-worker/check-samples.py` 重现；脚本只读冻结副本，若后批修了正文，应另提取最终文本，不能据旧副本继续判失败。
- 本次**未测**：新 MDX/组件构建、组件模型、浏览器/键盘/移动端、链接全库验收、性能、安全、原书正文逐段对应与生产发布。B6 的已有通过项、保留的失败日志与原有局限保持不变。

> 本文可引用的结论是“范围被明确、三项局部合同风险可复现、后续任务可执行”，不是“本书完成”或“310 细知识点覆盖”。

## 8. B8 后续修复状态（2026-09-24）

以上 §§1–7 是 B7 冻结样本的历史审查，不覆盖或撤销其证据。B8 已对 G1–G4 完成定点修复与主验收：

| 历史项 | 最终合同与复验 | 当前结论 |
| --- | --- | --- |
| G1 Memento | 四标量状态复制、只读且冻结状态与外壳；恢复再复制；编译拒绝写入、运行时写入失败、版本拒绝和历史隔离；真实画布/历史浏览器复验 | 已解决；公开只读教学状态，不声称不透明安全或深层通用冻结 |
| G2 Iterator | 自定义 next(): T 对空集/耗尽一致抛错，两个方法先校验版本；独立双游标逐项走到 END | 已解决；UI 修改集合后重建游标，不冒称旧游标 fail-fast；固定深度顺序不是任意 DFS |
| G3 Chain | 同文件组装及 handler 字段统一，执行 Auth→Quota→Route→ChainTail；区分 handled/rejected/unhandled 与静默 undefined 故障 | 已解决；192 模型用例，真实短路浏览器轨迹；不是任意环检测器 |
| G4 Mediator | 现有练习加入 alert 仅投 Monitor 的真实代码修改与原版失败/修改后通过断言 | 已解决；交互图仍明确是原版广播，旁路实际执行投递，不混淆练习修改版 |

主验收在 390/1440 两视口完成：Memento 28 帧、Iterator 164 帧、Chain 32 轮、Mediator 72 轮；四章全部 Stepper、三题答案开关、完整状态和 SVG 精确 reset；最终图中文字边界检查及本批较严格的 13px 阅读目标通过（SOP 硬线仍为 11px）。最后六项浏览器验收前后八个文件 SHA256 一致。修前错误、反例和失败日志保留。

四章正式视觉各 checked=1/failed=0，按最终 MDX 哈希写回台账：备忘录96、迭代器97、责任链97、中介者97。它们原已自动 passed，因此本批不减少全库 failed 数量。其他23页没有重新做全量模型/人工浏览器验收，B7 的整书范围限制继续成立；不声称原书全部内容或310细知识点已覆盖。

证据归档：`quality/artifacts/repair-batches/2026-09-24-08/session/`。参见 `MAIN-REVIEW.md`、`sealed-browser-verification.json`、`final-ledger-verification.json`、各 worker 的提取代码与负对照。最终完整 SHA256：

- `content/design-patterns/03-behavioral/memento.mdx`：`71ca7b2a8425eb2ff83f10280cd855226e736e7b06516b0d3ff6be04285604c9`
- `src/components/mdx/design-patterns/memento-snapshot-canvas-lab.tsx`：`ae6a493e6620a07a22d49f17a38260111c3283bfd1640f523be1f017cadef26c`
- `content/design-patterns/03-behavioral/iterator.mdx`：`d3526a8352969313b062924705ab7a9a63216f9c93cccfa2d0534c2262150927`
- `src/components/mdx/design-patterns/iterator-cursor-traversal-lab.tsx`：`ac37c076a5b4b037cf8384f61fa61d38db6660c0ca435af7819435bb5cd847f5`
- `content/design-patterns/03-behavioral/mediator.mdx`：`2108c482aa46a67075cd85219666dfe5a3301c10b6018d0467e6f1dec8767c90`
- `src/components/mdx/design-patterns/mediator-communication-hub-lab.tsx`：`661eaa3ca3083098946e58bc07a57f6b1da9226b258db403a23e190b09abb5c4`
- `content/design-patterns/03-behavioral/chain-of-responsibility.mdx`：`4ffb5d458ef0fe571355c7475a0e6905937d919006ba7749eb5cc0e55553ad19`
- `src/components/mdx/design-patterns/chain-of-responsibility-request-pipeline-lab.tsx`：`9b72684b2d56f5b50394faedc22706d8a13a7bfa365d5304bfaf2306223a499b`
