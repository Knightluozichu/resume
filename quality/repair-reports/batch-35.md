# Batch 35 可提交收口报告（草稿）

**状态：`closeout-ready-with-7-holds`**。报告可提交，不等于七个 hold 解除、整书获批或全库完成。
快照：`2026-10-18T15:47:37.572911+00:00`；权威：[transition-review.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-ledger-refresh/transition-review.json)。

## 1. 收口与台账

- 8页（map、ch01–07）：**仅 ch01 passed，7页 held（queued）**。全部 draft:true；ch01 qV2，其余7页qV1。
- 全库4609：failed1720→1712，queued196→203，passed1701→1702，published992→992；remaining=failed+queued，**1916→1915**。publishedBooks110。不能把failed减少8当作8章通过。
- 992条published解析条目逐项深比较完全相同，不仅数量相同；policy字节及解析值不变。全ledger更新时间/序列化变化不等于published条目变化。
- global update-ledger exit0（仍1915 selectedFailures）及invariants exit0，不等于本书/全库质量通过。
- 最新 [book-check.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-ledger-refresh/book-check.log) exit1，**38选中/37未通过**（本批7，批外30）。退出码由主控提供，日志本体仅JSON。aggregate passed2694 = 1702 passed + 992 published，不混用口径。

### 无关未发布 passed 审计重算（3条）

| 条目 | 变化 | 状态 |
|---|---|---|
| cpp-high-performance/07-official/memory-management | score99→98；visual20→19；visualized3→2，ratio0.5→1/3 | passed不变 |
| python-crash-course/09-official/classes | score97→96；visual18→17；visualized4→3，ratio0.5→0.375 | passed不变 |
| the-c-programming-language/04-struct-io/input-output | visualized3→4；visualEvidenceRatio0.6→0.8 | passed不变 |

前两项auditedAt也随审计更新；JSON保存完整字段级before/after。不计作本批额外通过，不误称published变化。

## 2. 八页逐项结论

| 页 | 分数 | transition | qV | official当前hash | disposition |
|---|---:|---|---:|---|---|
| map | 99 | failed→queued | 1 | PASS | held-draft |
| ch01 | 100 | failed→passed | 2 | PASS | accepted-draft |
| ch02 | 99 | failed→queued | 1 | PASS | held-draft |
| ch03 | 98 | failed→queued | 1 | PASS | held-draft |
| ch04 | 95 | failed→queued | 1 | PASS | held-draft |
| ch05 | 99 | failed→queued | 1 | PASS | held-draft |
| ch06 | 96 | failed→queued | 1 | PASS | held-draft |
| ch07 | 99 | failed→queued | 1 | PASS | held-draft |

8条official均pass:true，contentHash等于当前MDX SHA256前16位，各8张证据图。**official不能替代完整自定义交互、来源、原生边界或发布验收。** 分数使用最终transition（ch03=98），不沿用旧86分。

### map — unp-official-learning-map
- 保留 candidate3 自定义通过；未绑定后续全部共享依赖，不扩大旧记录的验收范围。
- HOLD：31章+5附录/A–E、Part II 3–11、Part III 12–31 未经独立权威目录核实。
- HOLD：中文版本等价/目录对应未核实。
- 当前 official：[official-unp-official-learning-map-shared-refresh.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/official-unp-official-learning-map-shared-refresh.log)。

### ch01 — unp-01-introduction
- 唯一实际通过。B是多次select观测拼合，不是单次运行全PASS；原timeout/错误读回仍保留。
- 当前 official：[official-unp-01-introduction-shared-refresh.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/official-unp-01-introduction-shared-refresh.log)。

### ch02 — unp-02-transport-layer
- TCP/UDP/LAST_ACK三宽观测保留；不能替代SCTP。
- HOLD：SCTP原生交互未覆盖。
- 当前 official：[official-unp-02-transport-layer-shared-refresh.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/official-unp-02-transport-layer-shared-refresh.log)。

### ch03 — unp-03-sockets-introduction
- 旧address/capacity及12 viewport×operation composite按原哈希保留；port0期望0实际8080。qV2→1后fresh official已PASS，但旧build/runtime不得重绑定。
- HOLD：port0/65535、Linux ABI原生选择及结果未核实。
- HOLD：chunk1/4、early EPIPE浏览器用例缺失。
- 当前 official：[official-ch03-held-metadata-refresh.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/official-ch03-held-metadata-refresh.log)。

### ch04 — unp-04-elementary-tcp-sockets
- 最终default-only：360/390聚焦valid draft后单击Reset仍fault=retained、cloexec=true；1440 valid/empty Reset通过。失败成立，根因unknown，不当harness误点豁免。
- HOLD：来源§4.9–4.11未核实。
- HOLD：窄屏Reset失败；native T01–T11/D03/D08–D10/CLOCK及失败后移动端用例NOT_RUN。
- 当前 official：[official-unp-04-elementary-tcp-sockets-shared-refresh.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/official-unp-04-elementary-tcp-sockets-shared-refresh.log)。

### ch05 — unp-05-tcp-client-server-example
- 初次360文本追加读回失败保留；恢复报告360/390/1440各69检查、无失败/顶层错误，仅有限运行结果。
- HOLD：来源§5.1–5.19未核实。
- 当前 official：[official-ch05-shared-refresh.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/official-ch05-shared-refresh.log)。

### ch06 — unp-06-io-multiplexing
- 保留既有局部runtime PASS及1440/idle recovery；第一运行超时和Cloudflare RUM错误不抹除；旧三章文件绑定不扩大为全部共享依赖。
- HOLD：来源§6.1–6.12未核实。
- HOLD：native边界未全覆盖；完整剩余枚举unknown。
- 当前 official：[official-unp-06-io-multiplexing-shared-refresh.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/official-unp-06-io-multiplexing-shared-refresh.log)。

### ch07 — unp-07-socket-options
- default-only 3×170检查，每宽169 PASS+1 console FAIL（Cloudflare telemetry CORS/resource）；46端点/宽NOT_RUN，执行数0。
- HOLD：来源§7.1–7.12未核实。
- HOLD：46端点/宽、CHANGE-REWIND/预测选择及默认场景之外geometry/AX未覆盖。
- 当前 official：[official-unp-07-socket-options-shared-refresh.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/official-unp-07-socket-options-shared-refresh.log)。

## 3. ch04 / ch07 最终证据不可弱化

- ch04只认最终 [report.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/ch04-runtime/2026-10-18T15-25-13.171Z/report.json)，SHA256 `23331c5813b306cf8824dccbb6a816ee5e0ce18cf1ef09c118b71c79ef3e0c0e`；独立终审 [independent-final-review.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/ch04-runtime/2026-10-18T15-25-13.171Z/independent-final-review.json)。
- 360/390 valid-focused-draft单击Reset读回retained、cloexec=true，期望none/false；1440 valid/empty两类Reset通过。native T01–T11/D03/D08–D10/CLOCK及移动失败后用例NOT_RUN，逐宽清单见JSON。
- 主控实际重看2图：360-045-EXCEPTION-viewport.png可见frame1/9和Reset、无明显横裁，但fault/CLOEXEC不在画面，不能证明值；1440-045-RESET_VALID_DRAFT_DEFAULT_ONLY-diagram-1.png可见无fault、CLOEXEC未选、fd3 server一引用、connection零。仅选择性复看，不是全章图像验收。
- [reset-hold-diagnosis.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/elementary-tcp/reset-hold-diagnosis.md)：blur提交引起步点/布局变化是候选机制，缺少同次pointer/blur/click轨迹及handler到达证据。**根因unknown；不能认定reset执行漏字段，也不能以harness误点豁免实际失败。**
- ch07 [report.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/ch07-runtime-qN4Uf4/report.json)：3×170检查，各169 PASS+1 console FAIL；唯一失败检查是Cloudflare telemetry CORS/resource错误，仍保留FAIL、不抑制。每宽46端点（合计138计划项）NOT_RUN，执行0；状态PARTIAL_DEFAULT_CHECKS_FAILED / PARTIAL_NOT_ACCEPTED。
- ch07默认场景两张截图的主控选择性复看，不能替代端点、CHANGE-REWIND/预测选择、其他场景geometry/AX。

## 4. 有限语义复核与来源限制

- 已详读 [REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/independent-semantic-map-03/REPORT.md) 与 [REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/independent-semantic-04-07/REPORT.md)：有限范围未确认新增事实/教学/练习缺陷；不代表全章、来源或发布通过。
- map的31章+5附录、Parts边界、中文等价未核实。已支持Part I 1–2及Part II从3起，不补推出Part II结束11、Part III12–31或A–E完整性。
- 来源hold：ch04§4.9–4.11，ch05§5.1–5.19，ch06§6.1–6.12，ch07§7.1–7.12。来源缺证不是虚构的新API错误，也不能因已披露缺证而放行。
- ch03 lawful publisher-linked sample不外推到其他章/全书；POSIX/RFC事实支持不证明书籍目录或中文版本对应；403/挑战页/429不等于取回正文。independent-rewrite不要求虚构开放许可，也不声称取得全文、完整授权或原文忠实度认证。

## 5. 工程与仓库门禁（既有记录，本次未运行）

- 已详读 [REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-shared-engineering-refresh/REPORT.md) 与 [REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-repository-gates/REPORT.md)。
- 旧shared refresh为PASS_WITH_WARNINGS：ESLint/Prettier/project TSC/diff/registry均exit0，单次isolated production build exit0、87.9s。dynamic-import、KaTeX/字符度量告警保留；整份fidelity-manifest历史Prettier警告不擅自标PASS。
- 24 chapter inputs=8MDX+8labs+8bridges，不是24 production页面；旧build草稿HTML0/8、prerender0/8，不证明生产渲染。共享控件24页回归是8路由×3宽，二者不可混淆；该回归未独立比较答案开/关文本AX，也不替代分章/official门禁。
- ch03仅qV2→1，旧SHA `8c3097320fa533fbe59bcee29371b3d344ad1b8cd890f4fb799ec3bffaea3c5c` → 当前 `da42553559fe3d736f98939aa710375bf122448ea6f7afdbb246218a7896cf11`。旧build/runtime/语义记录按旧哈希保留，**不得重绑定**；fresh official只更新当前哈希视觉门禁。
- 旧shared refresh有checkpoint/visual-results非范围并发漂移，不声称快照等同最终整个工作树。repository gate窗口仅checkpoint漂移，后续official/ledger更新也不追溯套用旧字节。
- **current-hash-build-refresh已完成：PASS_WITH_WARNINGS，真实1次build exit0，83.496s；timeout300s未触发。** 已读取[REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/current-hash-build-refresh/REPORT.md)、[VERDICT.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/current-hash-build-refresh/VERDICT.json)、[production-build-result.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/current-hash-build-refresh/production-build-result.json)。Bohr复用原owned isolated snapshot，归档旧isolated `.next` 后实际新构建，不是重绑定旧产物。
- 当前8MDX、16专属TSX、共享组件及声明的registry/fidelity输入before/after稳定；source-verification各drift/mismatch数组为空，ch03 qV1最新hash已绑定。**当前hash build缺口已闭环**；旧build元数据限制仅作历史保留，旧runtime/语义证据仍不得重绑定。
- 当前UNP production HTML=0，目标draft HTML=0/8、prerender=0/8；全部draft:true。这证明声明输入范围内构建兼容与草稿排除，**不证明生产渲染、自定义runtime、视觉验收或部署通过，不解除7 holds**。
- 两次准备阶段检查在Next启动前停止（observer sandbox阻断ps；过宽inventory纳入ignored public/pagefind），均不计build尝试。声明范围不包括ignored生成public/pagefind、环境文件/Git元数据；不是全工作目录镜像或Pagefind postbuild/deployment验收。原始warning及准备记录均保留。
- 仓库既有MDX4609/0 error、source anchors4609/0 error；源码内链全库2876/本书2（仅脚本识别范围）；registry2690 routes/2748 lazy modules。
- 本书TOC36/36=A，仅outline-only映射结构计数。**全库TOC exit1：225书中81 A/144 D，144失败书在本书之外，照留失败，不豁免或未经基线证明归因本批。**
- 既有HTML links2393页/0 errors、exit0，但本书HTML=0、BUILD_ID uORWhjQOmfRARN04RFU3N没有当前源输入绑定，只证明历史产物。
- 16未跟踪TSX whitespace no-index raw exit1且输出空表示有差异；clean fixture exit1、故意trailing whitespace exit3，真实退出码不改写。完整仓库门禁命令/exit见JSON。

## 6. 进程、提交与batch屏障

- 当前build PID14601已gone（主控确认）；cleanup记录rootReaped:true、remainingOwnedGroup=[]，0残留；protected dev PID91150身份before/after不变。未停止共享进程，本报告未运行ps/发信号。

- 主控ps当前确认11621/11622（ch04）、10645/10646（ch07）gone；本报告引用主控观测，未自己发信号/重跑ps；最新精确时间unknown。不仅凭closedAt证明清理，不声称整个工作区所有进程停止。
- 主控已提交8章：[chapter-commits.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/chapter-commits.json)（下表）；共享`3325b3648`、台账`40ef08555`由主控补充，未自行扩写完整SHA。本任务未git提交或推送。

| 章 | 主控已提交SHA |
|---|---|
| unp-official-learning-map | `d34ece02403ba4a22f562c0183f295e486caec4e` |
| unp-01-introduction | `09ff4125da378e764f06b0d800854d4efda5056f` |
| unp-02-transport-layer | `78f1ae67b976d7418719363fc07ee6ac53cccabe` |
| unp-03-sockets-introduction | `09c7a83d7e88341144c15929983f3a82769a3728` |
| unp-04-elementary-tcp-sockets | `4bbad560614789620991941b508163297348299e` |
| unp-05-tcp-client-server-example | `924d1a13cf60736b1569309722f08a20eaecfacb` |
| unp-06-io-multiplexing | `ac25a938ed8bc1fd5a1364122370ac3ea922e666` |
| unp-07-socket-options | `245c3f906a30d5b616eaee37866fcde6b1741c57` |

- 报告commit：待主控填写；push/origin==HEAD验证：待主控填写（unknown）。**未审批、未部署、全库未完成**；remaining1915。
- batch屏障关键路径仅报告/build，现报告已落盘、当前build已完成；source-only助手另行，不在此扩大调查。报告可提交或build成功不解除七个hold。

## 7. SHA256与本地证据

- [batch-35.json](/Users/luozichu/Repositories/learn/remuse/quality/repair-reports/batch-35.json) 的hashManifest是完整清单：8 MDX、16专属TSX、3共享组件；另9支持输入、1084本地证据文件（260,046,595 bytes）。
- 清单包括既有report/log（含失败与历史）、关键最终/来源/语义JSON、composite/hold/diagnosis、official截图/已存JSON及ch04复看图；已纳入完成的current-hash-build-refresh全部文件（含准备记录、报告、输入绑定与原始日志）。hash清单不是逐条完整语义审阅，也不表示全部PASS。
- 全部证据清单项ignored：`True`（.gitignore:43 /quality/artifacts/）；证据留本地，待跟踪报告只含摘要/路径/大小/SHA256。**不复制、上传或force-add巨大证据，不声称远程包含它们；远程可用性unknown。**
- 不自引用报告自身哈希。缺失引用不填假hash，列为unknown。
- 缺失引用数量：0。

### 8 MDX / 16 专属 TSX / 3 共享组件

| 文件 | SHA256 |
|---|---|
| [content/unix-network-programming-vol1/00-guide/unp-official-learning-map.mdx](/Users/luozichu/Repositories/learn/remuse/content/unix-network-programming-vol1/00-guide/unp-official-learning-map.mdx) | `0a13920bd5e8346197c3c59e44984fd25280c5f159c6e79219501f59522bf108` |
| [content/unix-network-programming-vol1/01-intro-tcpip/unp-01-introduction.mdx](/Users/luozichu/Repositories/learn/remuse/content/unix-network-programming-vol1/01-intro-tcpip/unp-01-introduction.mdx) | `00334a3a21e6ed7101cf9627ab6e74ae4de31e8d1ab310611606987b4e0e05ec` |
| [content/unix-network-programming-vol1/01-intro-tcpip/unp-02-transport-layer.mdx](/Users/luozichu/Repositories/learn/remuse/content/unix-network-programming-vol1/01-intro-tcpip/unp-02-transport-layer.mdx) | `9344969043d19ff34a0f0558b492c2267924d42fa85c8f70d474d959c9eb5964` |
| [content/unix-network-programming-vol1/02-elementary-sockets/unp-03-sockets-introduction.mdx](/Users/luozichu/Repositories/learn/remuse/content/unix-network-programming-vol1/02-elementary-sockets/unp-03-sockets-introduction.mdx) | `da42553559fe3d736f98939aa710375bf122448ea6f7afdbb246218a7896cf11` |
| [content/unix-network-programming-vol1/02-elementary-sockets/unp-04-elementary-tcp-sockets.mdx](/Users/luozichu/Repositories/learn/remuse/content/unix-network-programming-vol1/02-elementary-sockets/unp-04-elementary-tcp-sockets.mdx) | `2c8db784a9490d6224d023e6c75bd2c4bc830141d8254759251af6d442ce8bb1` |
| [content/unix-network-programming-vol1/02-elementary-sockets/unp-05-tcp-client-server-example.mdx](/Users/luozichu/Repositories/learn/remuse/content/unix-network-programming-vol1/02-elementary-sockets/unp-05-tcp-client-server-example.mdx) | `f005a1b9d22db443d41638bdeda6a622d802977d554e8f6831039b7485b08184` |
| [content/unix-network-programming-vol1/02-elementary-sockets/unp-06-io-multiplexing.mdx](/Users/luozichu/Repositories/learn/remuse/content/unix-network-programming-vol1/02-elementary-sockets/unp-06-io-multiplexing.mdx) | `edc4e7012e06331106fefb91c79dd47bce816240baa7fb68a565a49947c9f7e8` |
| [content/unix-network-programming-vol1/02-elementary-sockets/unp-07-socket-options.mdx](/Users/luozichu/Repositories/learn/remuse/content/unix-network-programming-vol1/02-elementary-sockets/unp-07-socket-options.mdx) | `b41e50783aeccf7715926375f511a870ce3db35a28375c70c51cf770dfadf2de` |
| [src/components/mdx/unix-network-programming-vol1/unp-03-address-bytes-lab.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/unp-03-address-bytes-lab.tsx) | `3925ef8e8f537a71d16c5899ef04e5fc3790b7a4dc285ca1a7630bb83d577ae6` |
| [src/components/mdx/unix-network-programming-vol1/unp-06-io-multiplexing-lab.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/unp-06-io-multiplexing-lab.tsx) | `b57032a15166bbd6aa90c57176a0abd4934ebff78d81a0f5db9d82e028ed3e75` |
| [src/components/mdx/unix-network-programming-vol1/unp-daytime-client-server-lab.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/unp-daytime-client-server-lab.tsx) | `4b941fa51c93aa0d47bdbb4cb8ca5be2d20bfa655722eea681e24131f20f12ee` |
| [src/components/mdx/unix-network-programming-vol1/unp-elementary-tcp-sockets-lab.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/unp-elementary-tcp-sockets-lab.tsx) | `4a9e114d72db5ec882bc796c99230709c4ecddd304bef51858ee41957bdc2c43` |
| [src/components/mdx/unix-network-programming-vol1/unp-learning-map-lab.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/unp-learning-map-lab.tsx) | `cbd7a04afdffffb14171dae4f00b1c3b16e7ab901e3390c1ccc14ed95686c536` |
| [src/components/mdx/unix-network-programming-vol1/unp-socket-options-lab.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/unp-socket-options-lab.tsx) | `bda77659188fdfb4a906d44f311df6f8b8135605d6871ad3f1b8328e030a8940` |
| [src/components/mdx/unix-network-programming-vol1/unp-tcp-client-server-lab.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/unp-tcp-client-server-lab.tsx) | `205433d3c64229c3636aece1732c3ef6e7c90d4ebe64820cac96f7065a091eaa` |
| [src/components/mdx/unix-network-programming-vol1/unp-transport-handshake-lab.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/unp-transport-handshake-lab.tsx) | `2afc8886db41cc90196c53783a38b64b91d0fe1ade4319543e343d5fce57b18d` |
| [src/components/mdx/unix-network-programming-vol1/v2/unp-01-introduction.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/v2/unp-01-introduction.tsx) | `4b95d63edfae62fce231fef870e85584d1102637a7ad6baea78486891a4a7b92` |
| [src/components/mdx/unix-network-programming-vol1/v2/unp-02-transport-layer.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/v2/unp-02-transport-layer.tsx) | `75d24eb35662c91da412992acf46b247f1bd76a15c8ab9346d8f0a337d55d8c8` |
| [src/components/mdx/unix-network-programming-vol1/v2/unp-03-sockets-introduction.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/v2/unp-03-sockets-introduction.tsx) | `7aaf1229e0759e0efc5ccdb4317e70e32121eb6fc861824ff2ac9cafae1427e2` |
| [src/components/mdx/unix-network-programming-vol1/v2/unp-04-elementary-tcp-sockets.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/v2/unp-04-elementary-tcp-sockets.tsx) | `21a20927e909702d6045dee07bc187f2b7f8e5074f17b0c0468d8b3c6efa9160` |
| [src/components/mdx/unix-network-programming-vol1/v2/unp-05-tcp-client-server-example.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/v2/unp-05-tcp-client-server-example.tsx) | `0464a27467b8dad164b2e32c94d6544123b741917384306be6e86c73a41c79be` |
| [src/components/mdx/unix-network-programming-vol1/v2/unp-06-io-multiplexing.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/v2/unp-06-io-multiplexing.tsx) | `8781f56a5ee4d4e5d9d1fd8b012efe4c8058f3d0ac30b2fca9ca8180ae52e758` |
| [src/components/mdx/unix-network-programming-vol1/v2/unp-07-socket-options.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/v2/unp-07-socket-options.tsx) | `c7a6cb287c66df255c60d8aeece1ba4bdf6e6681e78126197fba213a3719fd93` |
| [src/components/mdx/unix-network-programming-vol1/v2/unp-official-learning-map.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/unix-network-programming-vol1/v2/unp-official-learning-map.tsx) | `f3383c400d8e6fd0618363d644987eb2aaf2184034c95d8074a79036503114f1` |
| [src/components/mdx/term.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/term.tsx) | `5aa8183a40cb352b07c5ba69e9c6a5e6f57df47ff8e058a450f50ab516c999d5` |
| [src/components/mdx/exercises.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/exercises.tsx) | `eb11d97ab1cf2ed689078ab4222a86b62b5c536051af612850a29a237e86b333` |
| [src/components/mdx/anim/timeline-controls.tsx](/Users/luozichu/Repositories/learn/remuse/src/components/mdx/anim/timeline-controls.tsx) | `162513ccde9cddf1836376f4bbfc699f011b6e3b307ccf7c14b4c0c0c016b82a` |

### 关键证据（其余见JSON完整清单）

| 文件 | SHA256 |
|---|---|
| [quality/artifacts/batch-35/controller/final-ledger-refresh/transition-review.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-ledger-refresh/transition-review.json) | `ea61f58cc5312a2a4b199ea8f94c5962dc13067ddb4e5f79bc9dfde5eef0b602` |
| [quality/artifacts/batch-35/controller/chapter-commits.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/chapter-commits.json) | `787068735084fae81976db8db68b69f0f5fbe37340068c57727104f4bd0633a2` |
| [quality/artifacts/batch-35/controller/final-ledger-refresh/book-check.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-ledger-refresh/book-check.log) | `bad043ae0a14cea023cacd4421f857e5af9a250874e1cd9388894bc041360e61` |
| [quality/artifacts/batch-35/controller/final-ledger-refresh/audit-update-ledger.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-ledger-refresh/audit-update-ledger.log) | `b7d49c5bd7c81c4e0195442fa30fa3a8a7a075da28f75f466ff5b76a367fe009` |
| [quality/artifacts/batch-35/controller/final-ledger-refresh/invariants.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-ledger-refresh/invariants.log) | `c9a49009066dde7d57334d0686962f5555e761459ce91e5e9c188c0ce64b35af` |
| [quality/artifacts/batch-35/controller/final-shared-engineering-refresh/REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-shared-engineering-refresh/REPORT.md) | `256b798c894e1ddcc8bf46188fc833e33ebbf2db524b1ef272a3c1ed460802d2` |
| [quality/artifacts/batch-35/controller/final-repository-gates/REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/final-repository-gates/REPORT.md) | `07744925fc7e5eabb17f5a5a4a5b3349b16c062d3dde1c0124115018a8374171` |
| [quality/artifacts/batch-35/controller/independent-semantic-map-03/REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/independent-semantic-map-03/REPORT.md) | `8c927f62b9fb966e41ec262c47d89d395e48414e02062398756505a125187f4e` |
| [quality/artifacts/batch-35/controller/independent-semantic-04-07/REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/independent-semantic-04-07/REPORT.md) | `0157b369a25b643ce812b6ed36b3c0c4c9a9e027c5edf211ab069381e4175fbb` |
| [quality/artifacts/batch-35/controller/ch04-runtime/2026-10-18T15-25-13.171Z/report.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/ch04-runtime/2026-10-18T15-25-13.171Z/report.json) | `23331c5813b306cf8824dccbb6a816ee5e0ce18cf1ef09c118b71c79ef3e0c0e` |
| [quality/artifacts/batch-35/controller/ch04-runtime/2026-10-18T15-25-13.171Z/independent-final-review.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/ch04-runtime/2026-10-18T15-25-13.171Z/independent-final-review.json) | `a7d6480f6ed14ef800ed7cd03550de90ec163592869ab46049c0189c8f0e7f88` |
| [quality/artifacts/batch-35/controller/ch07-runtime-qN4Uf4/report.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/ch07-runtime-qN4Uf4/report.json) | `df823cef32b5588bb6798ee84579c040b5376d04e1ea293e9dc29a8336dd8edc` |
| [quality/artifacts/batch-35/sockets-introduction/revision3/acceptance-hold.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/sockets-introduction/revision3/acceptance-hold.json) | `3dd83c522646164bedde5017c0ab585dea970e82a1b886cf5557b2d30a2ae263` |
| [quality/artifacts/batch-35/elementary-tcp/reset-hold-diagnosis.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/elementary-tcp/reset-hold-diagnosis.md) | `59e62aebdc3e0ea8632916cb47159a9697f6eecbfe1a422117ef9f91cd536c4f` |
| [quality/artifacts/batch-35/controller/official-ch03-held-metadata-refresh.log](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/official-ch03-held-metadata-refresh.log) | `674532a733202c16c4131c942103c0679b546bc171ea81f8165e86d65f7138ce` |
| [quality/artifacts/batch-35/controller/ch01-revision3-B-composite.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/ch01-revision3-B-composite.json) | `081802d7e1da67101871cd63d12712f45804b25092bbe87bb3af69c7140254a9` |
| [quality/artifacts/batch-35/controller/ch03-revision3-io-composite.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/ch03-revision3-io-composite.json) | `1d2f847aad8c750f57748554400ecdd50218202573dd177740280d6e9ba7914e` |
| [quality/artifacts/batch-35/controller/mdx-controls/2026-10-18T14-52-04.557Z/report.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/mdx-controls/2026-10-18T14-52-04.557Z/report.json) | `4a87d63703c6ffb9af1d6150f18711b0e257f24d2c98fb45fbe384d03e92fee3` |

## 8. unknown与写入边界

- unknown：ch04事件链根因、ch06完整剩余native边界枚举、最新ps精确时间、报告commit/push、远程证据副本。缺证不补造。
- 索引只追加批35；历史前缀41983 bytes，SHA256 `3c015bc43ce4534a029ed1fd622316bb2763a9e94c2e3c3e2c0c223a605f1d38`，逐字节不改。
- 仅两份报告和追加小节可写；其他文件只读。未启动浏览器/测试/build、未git提交，不清理或还原用户/并发worker修改。

### 当前哈希构建补充证据摘要

| 证据 | SHA256 |
|---|---|
| [REPORT.md](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/current-hash-build-refresh/REPORT.md) | `88da37d0d078cb5ec76a0ad18bfccdf575b3d9fd8284c25329f1b70f9ac6907d` |
| [VERDICT.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/current-hash-build-refresh/VERDICT.json) | `aad01ad03a3eb72fa77681b72f23514aa800087848985aa25eeb5904da9cc97b` |
| [production-build-result.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/current-hash-build-refresh/production-build-result.json) | `bb8d7382350ccf95749d90e3b7a4be1b79460257224b96ae95048f0d46f5b071` |
| [source-verification.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/current-hash-build-refresh/source-verification.json) | `6a636f2328d6817044a71a3c53f59f36c002f92858bcdbec907134e6cb1f7441` |
| [cleanup.json](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/current-hash-build-refresh/cleanup.json) | `08fa432c913db742f94c182c37ddbb8b21bbf43868b475d17b8b938cfb8ebdbd` |
| [FILES.sha256](/Users/luozichu/Repositories/learn/remuse/quality/artifacts/batch-35/controller/current-hash-build-refresh/FILES.sha256) | `ca2119d2c87632332ce3be88d605feb661228292ebc661be28f54884bcc23a43` |

更新：2026-10-18T15:50:15.194533+00:00。仅纳入已保存构建证据；本报告任务未执行构建/测试。全部证据仍ignored本地保留，不声称远端包含巨大证据。
