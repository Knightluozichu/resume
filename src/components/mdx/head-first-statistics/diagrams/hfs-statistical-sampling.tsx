import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"目标总体",data:"抽样的难点不是随机数，而是目标总体、抽样单位和抽样框是否对齐。简单随机、分层、整群和系统抽样各有成本与方差结构；偏差不能靠扩大错误样本修复。",model:"研究结论希望推广到的完整对象集合。",evidence:"用计数、图形和反例验证目标总体",warning:"把方便样本当随机样本，样本量再大也不能消除选择偏差。"},
  {label:"抽样单位",data:"目标总体",model:"实际被选择的基本对象，可能与观测记录粒度不同。",evidence:"用计数、图形和反例验证抽样单位",warning:"混淆分层与整群：一个在每层抽，另一个抽整组，方差与成本不同。"},
  {label:"抽样框",data:"抽样单位",model:"可被抽取对象的清单；漏覆盖和重复条目会造成选择偏差。",evidence:"用计数、图形和反例验证抽样框",warning:"把方便样本当随机样本，样本量再大也不能消除选择偏差。"},
  {label:"简单随机抽样",data:"抽样框",model:"每个同规模样本有相同机会被选，需可靠随机机制。",evidence:"用计数、图形和反例验证简单随机抽样",warning:"混淆分层与整群：一个在每层抽，另一个抽整组，方差与成本不同。"},
  {label:"分层与整群",data:"简单随机抽样",model:"分层在组内抽样提高代表性，整群抽取整组降低成本但增加相关。",evidence:"只向活跃用户发问卷即使回收百万份，也无法代表流失用户。先定义目标总体，再补齐抽样框和响应权重；报告覆盖率与非响应，而不是用大样本量掩盖选择偏差。",warning:"把方便样本当随机样本，样本量再大也不能消除选择偏差。"},
];
export function HfsStatisticalSamplingDataLab(){return <HeadFirstStatsLab title="第10章 统计抽样：取得样本：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsStatisticalSamplingModelLab(){return <HeadFirstStatsLab title="第10章 统计抽样：取得样本：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsStatisticalSamplingEvidenceLab(){return <HeadFirstStatsLab title="第10章 统计抽样：取得样本：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
