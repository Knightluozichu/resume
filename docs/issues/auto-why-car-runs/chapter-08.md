# Auto Why Car Runs Issue Log：Chapter 08

## AWR-CH08-001

- 所属章节：第 8 章：制动系统
- 问题类型：材料完整性
- 问题描述：当前只有用户提供的预读目录，没有可读取的原书 PDF、章节笔记或截图。
- 严重级别：medium
- 修复建议：将章节标记为 `content_missing`，只做目录驱动原创教学框架；拿到材料后复核制动形式、驻车制动、陶瓷复合制动盘和制动助力器小节。
- 指派 Agent：Curriculum Agent
- 状态：verified
- 验收结果：第 8 章 MDX 明确标记 `content_missing`，未复制原书正文。

## AWR-CH08-002

- 所属章节：第 8 章：制动系统
- 问题类型：教学质量
- 问题描述：小白容易把制动理解成“踩得越重越短”，看不见液压传递、轮胎抓地、车速平方和热衰减。
- 严重级别：high
- 修复建议：加入踏板到总泵/管路/卡钳的液压路径、盘刹/鼓刹切换、车速/踏板/温度滑块、路况切换和热衰减小测。
- 指派 Agent：Visual Design Agent / Interaction Agent
- 状态：verified
- 验收结果：`BrakeLab` 覆盖液压制动链路、盘式/鼓式制动、干燥/湿滑/热衰减场景、制动距离和热衰减反馈。
