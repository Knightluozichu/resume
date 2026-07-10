import type { ReviewQuestion } from "./types";

/** 有意义的命名复习题 */
export const cqrNamingQuestions: ReviewQuestion[] = [
  {
    id: "cqr-naming-01",
    chapter: "cqr-naming",
    level: 1,
    question: `好命名的三要素是什么？分别是什么含义？`,
    answer:
      `好命名要同时满足三个要求：\n\n1. 名副其实（Reveals Intent）：\n名字要能说清楚「它是什么、做什么、怎么用」，读者不需要看实现就能理解意图。好名字回答「是什么」，坏名字只回答「占了个位置」。\n\n2. 避免误导（Avoid Disinformation）：\n名字不能让人产生错误联想。例如不要用 \`accountList\` 来装一个非 List 类型的容器（用 \`accounts\` 或 \`accountGroup\` 更安全）；不要用 \`O\`、\`l\` 这种和数字 \`0\`、\`1\` 难区分的字符做变量名；不要在名字里保留已过时的语义。\n\n3. 有意义的区分（Make Meaningful Distinctions）：\n当多个名字相似时，区分要靠「语义」而非「噪音」。反例：\`a1\`/\`a2\`、\`data\`/\`data2\`、\`getAccount\`/\`getAccountInfo\`/\`getAccountData\`——这些「区别」没有传达任何信息。正例：\`sourceAccount\`/\`destinationAccount\`——区分点明确。\n\n记忆口诀：好名字让人「一看就懂、不会误解、相似能分清」。`,
    tags: ["命名", "名副其实", "避免误导", "有意义的区分"],
  },
  {
    id: "cqr-naming-02",
    chapter: "cqr-naming",
    level: 2,
    question: `变量名、函数名、类名各自的命名规范是什么？为什么要区分？`,
    answer:
      `不同符号承担不同角色，命名风格区分能让读者「看名字就知道它是什么」，降低认知成本：\n\n1. 变量名（含常量）：\n- 用名词或名词短语，表达「它是什么/装了什么」：\`daysSinceCreation\`、\`totalCount\`、\`httpClient\`。\n- 布尔变量用 \`is\`/\`has\`/\`can\`/\`should\` 前缀，让真假一目了然：\`isValid\`、\`hasPermission\`、\`canRetry\`。\n- 常量用全大写下划线分隔：\`MAX_RETRY_COUNT\`、\`DEFAULT_TIMEOUT_MS\`。\n- 作用域越小名字可以越短（循环计数器 \`i\` 可接受）；作用域越大名字要越详尽（全局/成员变量要完整描述）。\n\n2. 函数名：\n- 用动词或动词短语，表达「它做什么」：\`calculateTotal\`、\`sendEmail\`、\`loadConfig\`。\n- 有返回值的函数可以用名词性短语（返回什么就叫什么）：\`userName\`、\`activeUsers\`。\n- 改变状态的用动词，查询状态的用 \`get\`/\`is\`/\`has\` 前缀（配合 CQS 原则）。\n- 重载/工厂方法可用 \`from\`/\`of\`/\`create\` 前缀体现构造语义。\n\n3. 类名/接口名：\n- 用名词或名词短语，表达「它是什么/代表什么概念」：\`Customer\`、\`OrderRepository\`、\`PaymentProcessor\`。\n- 避免用动词或「Manager」「Processor」「Helper」这类空泛后缀——除非确实贴切，否则它们往往是「职责不清」的遮羞布。\n- 接口名可直接用名词（\`Shape\`），实现类加后缀（\`CircleShape\`），或反过来接口加 \`I\` 前缀（\`IShape\`）——团队统一即可。\n\n为什么要区分：\n- 语法层面：动词做函数名、名词做变量/类名，符合自然语言习惯，读代码像读句子：\`customer.sendEmail(email)\` 像「顾客发邮件」。\n- 语义层面：一眼看出「这是数据（变量）、行为（函数）、还是概念（类）」，减少来回查定义的成本。\n- 一致性：全团队统一规范后，命名本身就是「自带文档」的——不需要额外说明就知道怎么用。`,
    tags: ["命名规范", "变量名", "函数名", "类名", "动词名词"],
  },
  {
    id: "cqr-naming-03",
    chapter: "cqr-naming",
    level: 3,
    question: `给几个烂命名示例并改好，说明为什么改名后更好。`,
    answer:
      `以下是几组典型烂命名及其改法，每组都说明问题与改进：\n\n1. 含糊单字母：\n- 烂：\`int d;\`\n- 好：\`int daysSinceCreation;\`\n- 改进：\`d\` 完全不传达意图；\`daysSinceCreation\` 一眼看出是「自创建以来的天数」，单位也明确。循环计数器 \`i\` 可以短，但业务变量必须明确。\n\n2. 误导性后缀：\n- 烂：\`List<Account> accountList = new ArrayList<>();\`（如果后来换成数组就误导了）\n- 好：\`List<Account> accounts = new ArrayList<>();\`\n- 改进：\`accountList\` 把「实现类型 List」写进了名字，一旦容器类型变化名字就撒谎。\`accounts\` 只表达「账户集合」语义，与具体类型解耦。\n\n3. 无意义区分：\n- 烂：\`getAccount()\` / \`getAccountInfo()\` / \`getAccountData()\`（三个方法区别不清）\n- 好：\`getAccount()\`（取账户）/ \`getAccountSummary()\`（取摘要）/ \`getAccountBalance()\`（取余额）\n- 改进：\`Info\`/\`Data\` 是「噪音词」，没说清返回什么。改为具体名词后，调用者一眼知道该调哪个。\n\n4. 误导缩写：\n- 烂：\`int hp;  // 2: Story building or 3: Article\`\n- 好：\`int hitsPerPage;\`\n- 改进：\`hp\` 在不同上下文可能是「血量」「马力」「首页」，注释都救不了。\`hitsPerPage\` 无歧义。\n\n5. 布尔名含糊：\n- 烂：\`bool flag;\` / \`bool status;\`\n- 好：\`bool isEmailVerified;\`\n- 改进：\`flag\`/\`status\` 不告诉读者「真代表什么、假代表什么」。\`isEmailVerified\` 让 \`if (isEmailVerified)\` 读起来像自然语言。\n\n6. 函数名误导（动词名不符）：\n- 烂：\`void addUser(User u)\`（实际是「如果不存在则添加，已存在则更新」）\n- 好：\`void upsertUser(User u)\` 或 \`void addOrUpdateUser(User u)\`\n- 改进：名字 \`add\` 暗示「纯新增」，但实际有更新副作用，调用者会误判。改名后行为与名字一致。\n\n总原则：改名时问自己「如果读者只看名字、不看实现，会不会误解？」会的话就继续改。`,
    tags: ["命名示例", "烂命名", "改进", "名副其实"],
  },
  {
    id: "cqr-naming-04",
    chapter: "cqr-naming",
    level: 4,
    question: `命名过长和命名过短如何权衡？有没有可操作的判断准则？`,
    answer:
      `命名长度不是越短越好、也不是越长越好，核心权衡点是「清晰度」与「噪音」的平衡。可操作准则如下：\n\n1. 核心原则——「作用域决定详尽度」：\n- 作用域小（几行内的局部变量、循环计数器）：可用短名。\`for (int i = 0; ...)\` 里的 \`i\` 完全够用，因为它的「身份」由上下文框定，长名反而是噪音。\n- 作用域大（类成员、全局、跨文件常量、公开 API）：必须详尽。一个被几十处引用的字段，名字长一点每次都省一次「查定义」的成本，收益巨大。\n这条准则来自「名字的使用次数 × 单次理解成本」——使用越多，值得投入越长名字。\n\n2. 长名的代价与「噪音阈值」：\n- 代价：名字太长会挤占行宽、打断阅读节奏、增加拼写错误概率。\n- 阈值：当一个名字超过 3-4 个词、或一行放不下时，要反思是否「在名字里塞了太多职责」。常常长名是「类职责过重」的信号——比如 \`CustomerOrderInvoicePaymentProcessor\` 暗示这个类做了太多事，应该拆分而非改名。\n- 解决：通过「更好的抽象/分层」缩短名字，而非强行缩写。把 \`processCustomerOrderPaymentAndSendReceipt\` 拆成 \`processPayment\` + \`sendReceipt\` 两个职责，名字自然变短。\n\n3. 短名的代价与「歧义阈值」：\n- 代价：太短导致歧义、误导，读者要靠注释或上下文猜测，维护成本高。\n- 阈值：当名字短到「换个文件/换个函数就读不懂」时，就是太短了。局部变量 \`tmp\` 在三行内可接受，跨百行就不可接受。\n- 禁忌：为「打字省事」而缩写（\`usr\`、\`btn\`、\`cfg\`）——读比写多得多，省下的输入成本远不如多花的理解成本。\n\n4. 上下文可以「免费」提供信息，避免名字重复：\n- 类 \`User\` 的方法不需要叫 \`getUserAge()\`，叫 \`getAge()\` 即可——上下文已说明是 User 的。\n- 命名时问：「把上下文去掉，这名字还说得清吗？」说不清的就要补全，能说清的就不必重复。\n\n5. 团队统一比个人偏好更重要：\n- 长短之争没有绝对答案，但全库一致很重要。约定一套缩写表（如 \`config\` 可接受、\`cfg\` 不可接受）、前缀规范（\`is\`/\`has\`/\`can\`）、并配 linter 强制。\n- 改名时优先用 IDE 的重构功能全量替换，避免「一半改了一半没改」的混乱。\n\n判断公式：好名字 = 「最短的、能消除歧义的名字」。先写清楚（哪怕长一点），再压缩噪音；不要为了短而牺牲清晰，也不要为了「显得专业」而堆砌冗长。`,
    tags: ["命名长度", "权衡", "作用域", "噪音", "权衡准则"],
  },
];
