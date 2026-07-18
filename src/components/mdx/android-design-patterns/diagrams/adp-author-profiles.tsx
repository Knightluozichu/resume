"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "著者紹介（作者与案例责任）",
  focus:
    "用最终商品页和样章作者页建立作者、章节、项目案例和可验证来源之间的关系",
  nodes: [
    "著者紹介",
    "日高正博：第1章から第3章",
    "吉岡毅：第4章",
    "小西裕介：第5章",
    "藤原聖：第6章と第8章",
    "今井智章：第7章",
  ],
  invariant:
    "最终成书作者固定为日高正博、小西裕介、藤原聖、吉岡毅、今井智章；章节观点按实际署名归因",
  failure:
    "复制众筹页会错误列入八木俊広并错配章节；把所有案例统一归于TechBooster也会抹去Mercari、DroidKaigi与CyberAgent的实践语境",
  patterns: [
    {
      label: "日高正博",
      mechanism: "奠定TODO、MVVM与MVP共同基线",
      evidence: "第1至3章署名",
    },
    {
      label: "吉岡毅",
      mechanism: "记录Mercari日本版差分演进",
      evidence: "第4章署名",
    },
    {
      label: "小西裕介",
      mechanism: "解释DroidKaigi OSS设计",
      evidence: "第5章署名",
    },
    {
      label: "藤原聖 / 今井智章",
      mechanism: "Flux、AAC与团队混合架构",
      evidence: "第6、8章及第7章署名",
    },
  ],
  gates: [
    "正式目录、作者、日期与版本边界",
    "职责、依赖方向与状态所有权",
    "生命周期、异步与释放轨迹",
    "单变量失败反例与恢复结果",
    "测试、业务或团队可观察证据",
    "停止、回退、复核人与交接记录",
  ],
} as const;

export function AdpAuthorProfilesArchitectureLab() {
  return (
    <AndroidDesignPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="architecture"
    />
  );
}

export function AdpAuthorProfilesCounterexampleLab() {
  return (
    <AndroidDesignPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="counterexample"
    />
  );
}

export function AdpAuthorProfilesEvidenceLab() {
  return (
    <AndroidDesignPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
