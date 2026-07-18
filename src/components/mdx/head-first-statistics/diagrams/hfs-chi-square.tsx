import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"观察频数",data:"卡方统计量把观察频数与原假设期望频数的差异按期望尺度标准化。拟合优度检验比较一个分类分布，独立性检验比较列联表变量关系；自由度来自可自由变化的单元数量。",model:"样本中实际落入每个类别或列联表单元的计数。",evidence:"用计数、图形和反例验证观察频数",warning:"期望频数很小仍机械使用卡方近似，尾部概率不可靠。"},
  {label:"期望频数",data:"观察频数",model:"原假设与边际总数决定的理论计数。",evidence:"用计数、图形和反例验证期望频数",warning:"检验显著后直接宣称因果，卡方只说明分类变量关联。"},
  {label:"卡方统计量",data:"期望频数",model:"累加平方差除以期望，使不同规模单元可比较。",evidence:"用计数、图形和反例验证卡方统计量",warning:"期望频数很小仍机械使用卡方近似，尾部概率不可靠。"},
  {label:"自由度",data:"卡方统计量",model:"约束后可独立变化的信息数量，列联表为(r-1)(c-1)。",evidence:"用计数、图形和反例验证自由度",warning:"检验显著后直接宣称因果，卡方只说明分类变量关联。"},
  {label:"独立性检验",data:"自由度",model:"检验两个分类变量联合频数是否可由边际概率乘积解释。",evidence:"转化率按设备和版本做列联表，可检验变量是否独立。但期望频数太小会破坏渐近近似，应合并有意义类别或用精确检验；显著后还要查看标准化残差定位差异单元。",warning:"期望频数很小仍机械使用卡方近似，尾部概率不可靠。"},
];
export function HfsChiSquareDataLab(){return <HeadFirstStatsLab title="第14章 卡方分布：事情不对劲：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsChiSquareModelLab(){return <HeadFirstStatsLab title="第14章 卡方分布：事情不对劲：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsChiSquareEvidenceLab(){return <HeadFirstStatsLab title="第14章 卡方分布：事情不对劲：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
