# Auto Why Car Runs Issue Log：Chapter 12

## AWR-CH12-001

- 所属章节：第 12 章：设计制造
- 问题类型：材料完整性
- 问题描述：当前只有用户提供的预读目录，没有可读取的原书 PDF、章节笔记或截图。
- 严重级别：medium
- 修复建议：将章节标记为 `content_missing`，只做目录驱动原创教学框架；拿到材料后复核原书对设计、样车、风阻和制造工艺的表述。
- 指派 Agent：Curriculum Agent
- 状态：verified
- 验收结果：第 12 章 MDX 明确标记 `content_missing`，未复制原书正文。

## AWR-CH12-002

- 所属章节：第 12 章：设计制造
- 问题类型：教学质量
- 问题描述：小白容易把汽车设计理解成外观，把制造理解成简单装配，看不清目标定义、样车验证、风阻、四大工艺和质检之间的闭环。
- 严重级别：high
- 修复建议：加入整车开发流程、车身形状/风阻切换、冲压焊装涂装总装阶段切换、产线节拍/缺陷率/测试强度滑块和制造流程小测。
- 指派 Agent：Visual Design Agent / Interaction Agent
- 状态：verified
- 验收结果：`ManufacturingLab` 覆盖目标定义、样车验证、风阻优化、冲压、焊装、涂装、总装、质检、产线节拍、缺陷率和质量通过率反馈。
