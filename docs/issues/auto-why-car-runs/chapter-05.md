# Auto Why Car Runs Issue Log：Chapter 05

## AWR-CH05-001

- 所属章节：第 5 章：传动系统
- 问题类型：材料完整性
- 问题描述：当前只有用户提供的预读目录，没有可读取的原书 PDF、章节笔记或截图。
- 严重级别：medium
- 修复建议：将章节标记为 `content_missing`，只做目录驱动原创教学框架；拿到材料后复核传动系统、四驱系统和差速器小节。
- 指派 Agent：Curriculum Agent
- 状态：verified
- 验收结果：第 5 章 MDX 明确标记 `content_missing`，未复制原书正文。

## AWR-CH05-002

- 所属章节：第 5 章：传动系统
- 问题类型：教学质量
- 问题描述：小白容易把变速器之后的路径理解成“直接连车轮”，看不见传动轴、半轴、差速器和四驱分配节点。
- 严重级别：high
- 修复建议：加入传动形式切换、动力路径图、前后轴分配、内外轮差速、差速策略和单轮打滑模拟。
- 指派 Agent：Visual Design Agent / Interaction Agent
- 状态：verified
- 验收结果：`DrivetrainLab` 覆盖前驱、后驱、全时四驱、分时/适时四驱，支持转弯半径、差速模式、打滑模拟和差速器小测。
