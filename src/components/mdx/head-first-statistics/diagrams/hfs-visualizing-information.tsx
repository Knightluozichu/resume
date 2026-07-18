import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"分类数据",data:"本章从饼图、条形图、直方图和累积频数图入手，要求先识别数据类型，再让图形编码与问题匹配。图表不是装饰：比例尺、组距和面积都会改变读者看到的模式。",model:"取值表示类别而非可运算数量，适合频数表和条形图。",evidence:"用计数、图形和反例验证分类数据",warning:"用饼图比较许多接近的比例，角度难以精确比较；改用同基线条形图。"},
  {label:"数值数据",data:"分类数据",model:"取值具有数量意义，可进一步区分离散与连续并选择分组。",evidence:"用计数、图形和反例验证数值数据",warning:"组距不等仍把频数直接当柱高，使面积不再代表频数并扭曲分布。"},
  {label:"直方图面积",data:"数值数据",model:"组距不等时柱高应使用频数密度，使柱面积而非高度与频数成正比。",evidence:"用计数、图形和反例验证直方图面积",warning:"用饼图比较许多接近的比例，角度难以精确比较；改用同基线条形图。"},
  {label:"累积频数",data:"直方图面积",model:"按有序组逐步累加频数或比例，用于读取阈值以下的数量和分位点。",evidence:"用计数、图形和反例验证累积频数",warning:"组距不等仍把频数直接当柱高，使面积不再代表频数并扭曲分布。"},
  {label:"图表选择",data:"累积频数",model:"根据比较类别、观察分布或读取累计值选择编码，并固定清楚的尺度与基线。",evidence:"产品看板比较不同宽度的延迟区间时，应画频数密度而非原始计数高度；同时保留样本量、时间窗和缺失比例。若纵轴截断，必须明确标注，避免把微小差异渲染成巨大变化。",warning:"用饼图比较许多接近的比例，角度难以精确比较；改用同基线条形图。"},
];
export function HfsVisualizingInformationDataLab(){return <HeadFirstStatsLab title="第1章 信息可视化：第一印象：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsVisualizingInformationModelLab(){return <HeadFirstStatsLab title="第1章 信息可视化：第一印象：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsVisualizingInformationEvidenceLab(){return <HeadFirstStatsLab title="第1章 信息可视化：第一印象：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
