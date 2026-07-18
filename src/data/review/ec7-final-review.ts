import type { ReviewQuestion } from "./types";

export const ec7FinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ec7-final-review-1",
    chapter: "ec7-final-review",
    level: 1,
    question: "整书验收中的contract chain包含哪些连续层？",
    answer: "从input/static type开始，经conversion与method binding、object invariant、generic/delegate/query protocol、operation/shared-state/native lifetime，到output/fault/cancel/dispose；最后用tests、timeline、ABI layout、CIL/metadata和manifest证明实际artifact与解释一致。",
    tags: ["contract-chain", "artifact-proof", "review"],
  },
  {
    id: "ec7-final-review-2",
    chapter: "ec7-final-review",
    level: 2,
    question: "deferred query在background Task枚举时发生CollectionModified，应怎样定位？",
    answer: "第15-17章确认deferred enumeration、version与mutation contract，第13章检查closure capture，第19-20章画producer mutation和consumer MoveNext timeline。修复应建立snapshot/thread ownership或统一coordination，并用barrier稳定复现；外层catch不能修复race。",
    tags: ["enumeration", "timeline", "synchronization"],
  },
  {
    id: "ec7-final-review-3",
    chapter: "ec7-final-review",
    level: 3,
    question: "native callback在Dispose后访问handle，完整ownership proof是什么？",
    answer: "第21章确认ABI、delegate root、buffer与SafeHandle owner；第14章确认handler retention；第19-20章协调callback与Dispose。顺序是停止新work、unregister、drain in-flight callbacks，再释放handle/buffer和delegate root；callback exception在managed边界转换，并测试concurrent unregister。",
    tags: ["callback", "Dispose", "ownership"],
  },
  {
    id: "ec7-final-review-4",
    chapter: "ec7-final-review",
    level: 4,
    question: "AOT发布后reflection plugin type消失，应收集并修复哪些层的证据？",
    answer: "第18章检查attribute/type discovery和string-based activation，第22章检查assembly manifest/references、published files、target API与AOT metadata reachability。保存build warnings、metadata query与loader trace；用explicit registry/static reference或toolchain preservation声明修复，并在真实target验证load与behavior。",
    tags: ["reflection", "AOT", "metadata"],
  },
];
