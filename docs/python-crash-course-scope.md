# Python Crash Course 第三版：教学范围与覆盖分母

核对日期：2026-09-24（Asia/Shanghai）。本文件是仓库内的范围说明，不是新增站点章节、发布批准或原书全文改编声明。

## 1. 两个分母，不能互换

采用 **Python Crash Course, Third Edition**，ISBN **9781718502703**（2022年12月）。当前只读核对的 [fidelity manifest](../quality/fidelity-manifests.json) 为本书登记了：

- **20 个主章单元**：`pcc3-01` 至 `pcc3-20`；第1–11章为基础，第12–14章为 Alien Invasion，第15–17章为数据可视化，第18–20章为 Learning Log。地图和总复习不增加或替代这20个单元。
- **126 个概念组**：20个单元的 `concepts` 数量之和；一组内的多个名称是同一概念的别名，不是多个分母项目，也不是命中若干关键词就证明掌握。

“20章均有对应入口”只描述结构。“已登记126组全部有解释与验证”需要逐组正文、实践与人工核验；本文件**不重新计算通过率，也不宣布已全部通过**。章节评分、已登记主章概念覆盖、原书完整技术范围、逐页忠实程度分别是不同结论。

**A–E 技术附录仍在教学支持范围内。** 它们没有作为五个独立主章加入当前 manifest，也没有独立计入126组分母；部分主题与主章重合，不能因此默默删除。下表记录合并位置与验收边界，而不是把分母臆改成131、另造五章或拿复习页抵扣缺项。以后若获得可核查的更详细技术范围，应由主维护者审核并更新范围与映射，而非为维持百分比删减内容。

因此，即使以后主章单元和已登记概念均通过，也只能限定地报告其分母与证据，**不能称为“原书全文100%”“含附录全部逐项覆盖”或“全文已读”**。

## 2. A–E 技术附录的支持材料映射

以下原书名称来自出版社可访问的目录，不代表已读附录正文。目标是保留这些技术主题，用独立中文说明和可验证实验支持读者；不主张与未取得的正文逐段对应。

链接是仓库内容文件及其标题锚点，不是站点路由。第01章与学习地图由并行任务维护：下列链接已按本批读取到的标题检查，**最终合并后的锚点、页面链接与教学验收仍须 main 核对**；不能将候选映射当作跨系统安装已经实测。

| 原书技术附录 | 合并位置（具体锚点） | 保留的教学范围与证据要求 |
| --- | --- | --- |
| **A — Installation and Troubleshooting** | 第01章：[尚未安装](../content/python-crash-course/01-official/getting-started.mdx#尚未安装先分清三个需要准备的东西)、[验证解释器](../content/python-crash-course/01-official/getting-started.mdx#选择解释器版本号只是第一份证据)、[分层排错](../content/python-crash-course/01-official/getting-started.mdx#troubleshooting按层定位而不是反复重装) | 区分解释器、编辑器与扩展；按 Windows/macOS/Linux 官方路径准备，确认版本及真实可执行路径；按命令发现、文件路径、语法定位失败。文档路线核对不等于三个系统均执行了安装。 |
| **B — Text Editors and IDEs** | 第01章：[VS Code 与扩展](../content/python-crash-course/01-official/getting-started.mdx#再准备-vs-code-与-python-扩展)、[选择解释器](../content/python-crash-course/01-official/getting-started.mdx#让编辑器选中已验证的解释器)、[保存与运行](../content/python-crash-course/01-official/getting-started.mdx#hello-world-program追踪文件到输出)、[语言模式](../content/python-crash-course/01-official/getting-started.mdx#1-syntax-highlighting-不出现) | 编辑器负责编辑，解释器负责执行；保存 `.py`、扩展与语言模式、解释器选择、终端／编辑器运行入口构成闭环。采用 VS Code 作为可操作实例，不宣称穷尽未读附录的编辑器清单。 |
| **C — Getting Help** | 第01章：[最小证据包](../content/python-crash-course/01-official/getting-started.mdx#把一次成功运行整理成最小证据包)、[缩小与脱敏求助](../content/python-crash-course/01-official/getting-started.mdx#卡住时怎样求助先缩小再脱敏) | 先查官方文档，再做最小复现；提供版本、命令、错误、预期／实际结果；删除令牌、密钥、个人路径信息，说明已尝试的排错。不能把“问别人”一句话当作求助能力已经覆盖。 |
| **D — Using Git for Version Control** | 第20章：[Git 微实验](../content/python-crash-course/20-official/styling-and-deploying-an-app.mdx#8-git-微实验保存比较再安全恢复)、[问题3的小分问及答案](../content/python-crash-course/20-official/styling-and-deploying-an-app.mdx#小结与练习) | 仅临时本地仓库执行 `init/status/add/commit/log/diff/restore`：区分工作区、暂存区、提交；保存→比较→仓库外备份→指定文件恢复。说明未提交修改丢失风险、忽略规则局限、密钥和数据库禁止入库、代码回退不回退数据库。不是以“git”关键词或推送部署替代版本管理教学。 |
| **E — Troubleshooting Deployments** | 第20章：[配置注入](../content/python-crash-course/20-official/styling-and-deploying-an-app.mdx#2-配置从启动入口就拒绝缺密钥)、[迁移与静态](../content/python-crash-course/20-official/styling-and-deploying-an-app.mdx#6-迁移收集导入不监听端口也能检查)、[错误页](../content/python-crash-course/20-official/styling-and-deploying-an-app.mdx#5-错误页在出错时减少依赖)、[测试与日志](../content/python-crash-course/20-official/styling-and-deploying-an-app.mdx#自动化验收真正发送测试请求)、[按边界排错](../content/python-crash-course/20-official/styling-and-deploying-an-app.mdx#常见误区按最先出错的边界找原因)、[平台时效](../content/python-crash-course/20-official/styling-and-deploying-an-app.mdx#平台时效保留历史知识不伪装当前教程) | 从启动失败／400／500／静态404分别检查密钥、Host、日志、迁移、静态路径及错误模板；分清代码、数据库与静态恢复。保留原书 Platform.sh 历史背景，依据当前官方变化说明时效，不能把历史 YAML 当现行可用配置。 |

D 的微实验只提交两个无敏感内容的教学文件；`.env` 和数据库是被忽略的模拟文件。本批实际执行地点为独立临时仓库，不在本站或 Learning Log 工程中 `add/commit`，不改变全局 Git 配置、设置远程或推送。恢复演示的是未暂存文本，不是生产回滚、历史重写或数据库恢复方案。

E 复用第20章第四批已验收的教学与测试，不重做其主体组件。第四批已验证真实 Gunicorn/WhiteNoise 的**本地 HTTP**；这不代表真实云账户、TLS、代理头信任链、远程存储或生产故障恢复已验证。`check --deploy` 的警告必须按实际 HTTPS/代理环境处理，不能用本地200响应替代上线安全结论。本批附录施工任务不启动服务器或浏览器；主任务另做页面浏览器验收，但不扩张上述云部署验证结论。

## 3. Introduction、Afterword 与非技术出版材料

- **Introduction**：出版社目录包含导言。本站[学习地图](../content/python-crash-course/00-basics/pcc-learning-map.mdx#为什么学习地图必须保留第三版20章)是原创的学习路线、前置依赖与证据规划，不是原书 Introduction 的翻译或正文复刻。[支持材料入口](../content/python-crash-course/00-basics/pcc-learning-map.mdx#附录-abc支持材料去哪里学)只负责引导，不能替代01／20的实际解释和练习。
- **Afterword**：出版社目录包含后记。本站[原创总复习](../content/python-crash-course/03-projects/pcc-final-review.mdx#为什么总复习必须以三个完整项目验收20章)面向三个项目的迁移、复盘与综合验收，**不等于原书 Afterword**，不用于补算主章或附录的缺失内容。
- **Preface、Acknowledgments、Index 等**：前言、致谢、索引属于出版叙述、署名或检索材料，本教学站不复刻其正文与编排，不伪造一一对应页。排除这些非技术出版材料不授权删除 A–E 技术支持范围，也不授权跳过在以后核验中发现的技术知识。

## 4. 来源可访问程度与版权边界

1. [出版社第三版页面](https://nostarch.com/python-crash-course-3rd-edition)的第三批成功归档为 **HTTP 200**，服务端日期 `Wed, 23 Sep 2026 13:42:20 GMT`：[响应正文](../quality/artifacts/repair-batches/2026-09-23-03/session/apis-worker/sources/publisher.body)、[请求记录](../quality/artifacts/repair-batches/2026-09-23-03/session/apis-worker/sources/publisher.http.json)。它支持版本、20主章与附录名称等目录结构判断，不是附录正文或全文授权。
2. 第四批覆盖审查请求[详细目录 PDF](https://nostarch.com/download/PCC3e_detailedTOC.pdf)返回 **403**：[记录](../quality/artifacts/repair-batches/2026-09-23-04/session/coverage-review/official-toc.json)。第20章另一次出版社请求同样是403；不同请求的结果分别保留，不拿旧200伪装本次成功，也不将拦截页当已读正文。范围问题的依据是[覆盖审查报告 §四](../quality/artifacts/repair-batches/2026-09-23-04/session/coverage-review/REPORT.md#四官方目录附录入门与复盘边界)。
3. 本批在 **2026-09-24（Asia/Shanghai；UTC为2026-09-23）** 实际访问 [Git 入门](https://git-scm.com/docs/gittutorial)、[diff](https://git-scm.com/docs/git-diff)、[restore](https://git-scm.com/docs/git-restore)、[gitignore](https://git-scm.com/docs/gitignore)、[commit](https://git-scm.com/docs/git-commit)，五个页面均 **HTTP 200**。原始正文、响应头、最终 URL、时间和 SHA-256 保存在本批 worker 证据目录的 `sources/`，用于独立核对 Git 行为，不用于声称已读原书附录 D。
4. 保持 `sourceAccess: outline-only` 与 `sourceMode: independent-rewrite` 的含义：目录限定范围，技术事实由官方文档与实际实验独立核查，中文说明与例子独立撰写。商业版权作品的目录可访问不等于许可逐页复制；不宣称取得原书全文，也不臆造未读附录的细目。

## 5. 本批交付与集成核对

本批附录施工任务仅修改第20章 MDX 并新增本范围文档；保留既有 `draft: true`、`qualityVersion: 2`，不改 manifest、质量台账、评分算法、注册表、组件或依赖。证据归档目标为 `quality/artifacts/repair-batches/2026-09-23-05/session/appendix-worker/`，归档、最终验收与清理状态以 `quality/repair-batches.md` 为准（不是站点下载入口）。

main 集成时仍需核对：

- 01／地图的最终标题锚点、A/B/C正文与练习证据；本文件不代替对应 worker 的安装与求助核验。
- 第20章新增 Git 段的实际命令输出、仓库外备份与恢复断言，以及 D/E 的映射边界。
- 最终页面链接、MDX与全书范围门禁；源文件锚点存在不等于已经完成浏览器验收或生产构建。
- 分开报告20主章、126已登记概念组、A–E支持主题、来源访问限制与验证环境。不得仅凭本文件、旧评分或关键词匹配宣布全书全文100%或批准发布。
