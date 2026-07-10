import type { ReviewQuestion } from "./types";

export const tcgLanguageFoundationsQuestions: ReviewQuestion[] = [
  {
    id: "tcg-language-foundations-1",
    chapter: "tcg-language-foundations",
    level: 1,
    question: `什么是Token？为什么ChatGPT需要将文本切分为Token？`,
    answer:
      `Token是文本被切分后的离散单元，可以是词、子词或字符片段。ChatGPT需要将文本切分为Token的原因：①将连续的自然语言文本转换为离散的序列，使模型能够处理。②每个Token对应一个整数ID，模型通过ID查找对应的嵌入向量，将文字转化为数学表示。③Token化使模型能够处理任何文本，包括未见过的词（通过拆分为已知子词）。④GPT的词汇表约5万个Token，常见词独占一个Token，罕见词被拆分为多个子词Token。Token化是语言到数学的第一步，是整个ChatGPT处理流程的起点。`,
    tags: ["Token", "token化", "语言基础"],
  },
  {
    id: "tcg-language-foundations-2",
    chapter: "tcg-language-foundations",
    level: 2,
    question: `语言理解的核心挑战有哪些？这些挑战如何影响ChatGPT的设计？`,
    answer:
      `语言理解的核心挑战有三个：①无限句子——有限词汇可以组合出无限多的句子，无法穷举所有可能，因此模型必须学习语言的规律而非记忆所有句子。②上下文依赖——同一个词在不同语境下含义不同（如\"bank\"可以指银行或河岸），模型必须理解上下文才能确定含义，这促使了注意力机制的设计。③语义组合性——整体意义不等于部分之和，语序和结构会改变含义（\"狗咬人\"和\"人咬狗\"含义完全不同），模型需要理解词与词之间的关系。这些挑战影响了ChatGPT的设计：需要Token化处理无限句子，需要自注意力机制处理上下文依赖，需要Transformer架构捕获组合语义。`,
    tags: ["语言挑战", "上下文依赖", "语义组合性"],
  },
  {
    id: "tcg-language-foundations-3",
    chapter: "tcg-language-foundations",
    level: 2,
    question: `从原始文本到语义空间经历了哪些转换步骤？每步的作用是什么？`,
    answer:
      `从原始文本到语义空间经历三层转换：①原始文本→Token序列：通过tokenizer将连续文本切分为离散的Token单元，每个Token对应一个整数ID。作用是将人类可读的自然语言转换为机器可处理的离散序列。②Token序列→嵌入向量：通过嵌入矩阵将每个Token ID映射为一个高维向量。作用是将离散的Token转化为连续的数学表示，使语义可计算。③嵌入向量→语义空间：向量在高维空间中的位置编码了Token的语义信息，相似含义的词距离更近。作用是使语义关系（如相似度、类比关系）可以通过向量运算（如距离、加减）来计算。这三步完成了从语言到数学的完整转换。`,
    tags: ["文本转换", "三层转换", "语义空间"],
  },
  {
    id: "tcg-language-foundations-4",
    chapter: "tcg-language-foundations",
    level: 3,
    question: `Wolfram认为语言与意义之间是什么关系？这对理解ChatGPT有何启示？`,
    answer:
      `Wolfram认为语言是意义的符号表示，但语言本身并不等于意义——意义存在于人类的思维和世界的结构中，语言只是对意义的一种编码。这一观点对理解ChatGPT的启示：①ChatGPT学习的是语言的统计规律（符号模式），而非真正的意义——它能生成语法正确、看似合理的文本，但不保证内容真实。②这解释了ChatGPT的\"幻觉\"现象——当统计规律指向一个不正确但\"看起来合理\"的答案时，模型会自信地生成错误信息。③ChatGPT的惊人能力来自于海量文本中的统计模式匹配——人类语言中蕴含了大量关于世界的知识，模型通过学习语言规律间接\"学到\"了这些知识。④真正的AI理解可能需要超越纯语言模型，结合符号推理、感知和交互。核心启示：ChatGPT是强大的语言模式匹配器，但不是真正的意义理解者。`,
    tags: ["语言与意义", "Wolfram观点", "幻觉", "统计规律"],
  },
];
