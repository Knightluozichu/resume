# Auto Why Car Runs Issue Log：Final Review

## AWR-FINAL-001

- 所属章节：全书总复习
- 问题类型：产品完整性
- 问题描述：前 12 章完成后，还需要一个全书总复习入口，把汽车构造全局知识地图、动力链路、燃油车/新能源车差异和后续学习路线合并展示。
- 严重级别：high
- 修复建议：新增总复习 MDX 页面和 `AutoFinalReviewLab`，并接入章节导航。
- 指派 Agent：Director Agent / Curriculum Agent
- 状态：verified
- 验收结果：已新增 `content/auto-why-car-runs/13-final-review/final-review.mdx` 和 `AutoFinalReviewLab`，覆盖全局地图、三条链路、错误认知索引和综合小测。

## AWR-FINAL-002

- 所属章节：全书总复习
- 问题类型：练习系统
- 问题描述：章节内小测不足以证明全局复习系统已接入，现有 `/review` 题库缺少汽车课程题目。
- 严重级别：medium
- 修复建议：新增汽车复习题数据文件，接入 `REVIEW_QUESTIONS` 聚合器和 `CHAPTER_TITLES`。
- 指派 Agent：Interaction Agent / Engineering Agent
- 状态：verified
- 验收结果：已新增 `src/data/review/auto-why-car-runs.ts`，并在全局复习题库中注册 14 道汽车课程题。
