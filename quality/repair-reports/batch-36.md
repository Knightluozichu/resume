# 第36批 · Go Web Programming 第1–4章

四章验收通过，提交推送待完成；不是整书发布。

|章节|Owner|分数|状态|
|---|---|---:|---|
|go-web-programming/01-foundations/gwp-chitchat|Goodall|95|passed，零硬阻断|
|go-web-programming/01-foundations/gwp-http-basics|Faraday|96|passed，零硬阻断|
|go-web-programming/02-request-response/gwp-processing-requests|Rawls|96|passed，零硬阻断|
|go-web-programming/02-request-response/gwp-routing|Kepler|95|passed，零硬阻断|

## 证据与边界

- 当前15文件冻结哈希、各章归属、完整维度和证据SHA-256见 `batch-36.json`。原始截图/日志保留在本地 ignored artifacts，未强制加入git。
- 自定义 headful system Chrome + Metal，360/390/1440，共3639项读回检查；全部关键截图实际人工查看。控制台、页面错误及请求失败均为0。
- 官方原始视觉脚本独立串行 concurrency=1，四章各10分。
- 独立语义复核74主题/28概念，42顶层Go测试+157子测试，0skip。不是199个独立场景。
- 隔离快照工程12命令全部exit0，生产构建88.671秒；主目录与依赖漂移0。
- 原始book审计exit1：仅剩8页失败；全库ledger更新与invariants exit0。
- 台账只有本批四章变化，992个published条目和白名单原样保留。

- Outline-only independent rewrite, not full-body fidelity or open-license claim.
- Go 1.26.0 assertions; modern behavior not retroactively attributed to 2016.
- No real PostgreSQL integration or load benchmark; teaching fake-store/driver boundaries retained.
- Production build excludes draft routes: not production rendering proof for these four chapters.
- Internal-link check observed zero links; not complete hyperlink validation.
- KaTeX/Turbopack warnings retained; previous qV1 engineering FAIL_OR_BINDING_GAP retained.
- All four remain draft:true; eight other book pages unresolved; no approval/deployment.

## 重算总进度

4609章：failed1708、queued203、passed1706、published992；待修复1911。已发布110本不变。

## 后续

本批提交/push核验完成后立即取第37批（第5–8章）；不能把本报告当任务终点。
