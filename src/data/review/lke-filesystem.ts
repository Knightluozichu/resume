import type { ReviewQuestion } from "./types";

export const lkeFilesystemQuestions: ReviewQuestion[] = [
  {
    id: "lke-fs-1",
    chapter: "lke-filesystem",
    level: 2,
    question: `VFS的四大对象各负责什么？它们之间的关系是什么？`,
    answer:
      `四大对象：①super_block——描述一个已挂载的文件系统实例，包含设备号、块大小、超级操作表s_op；②inode——描述一个文件的元数据，包含inode号、权限、大小、文件操作表i_fop和inode操作表i_op，一个文件一个inode；③dentry——描述路径中的一个目录项，将文件名与inode关联，构成路径树，同时作为路径查找缓存；④file——描述一个已打开的文件实例，包含偏移量f_pos、打开模式f_flags、指向inode的指针，每次open创建一个。关系：super_block管理一棵dentry树，dentry指向inode，file引用inode。同一个inode可被多次open产生多个file实例，每个有独立读写偏移。`,
    tags: ["文件系统", "VFS"],
  },
  {
    id: "lke-fs-2",
    chapter: "lke-filesystem",
    level: 2,
    question: `write()返回后数据是否已经在磁盘上？fsync()的作用是什么？`,
    answer:
      `默认write()只把数据写到Page Cache并标记脏页就返回了——数据在内存中，尚未落盘。如果此时断电，数据丢失。ext4默认ordered模式保证元数据一致性（文件系统不会损坏），但不保证数据不丢失——可能元数据已写入但数据块未写入，导致文件内容为空或旧数据。fsync(fd)强制将该文件的所有脏页立即写回磁盘，等待I/O完成后才返回，保证掉电后数据不丢失。对数据安全要求高的应用必须在关键写入后调用fsync。此外，ordered模式保证数据块在元数据之前写入，避免「数据未写但文件大小已更新」导致读到垃圾数据。`,
    tags: ["文件系统", "Page Cache"],
  },
  {
    id: "lke-fs-3",
    chapter: "lke-filesystem",
    level: 3,
    question: `read()命中和未命中Page Cache的路径有什么不同？`,
    answer:
      `命中路径：①fget(fd)取file；②调用file.f_op->read_iter→generic_file_read_iter()；③预读相邻页；④在address_space的XArray中查找页索引——命中，直接copy_to_user()从Page Cache拷贝到用户缓冲区，无需任何I/O，微秒级返回。未命中路径：①~③相同；④XArray中未找到——分配新物理页（alloc_pages→Buddy）；⑤将页加入Page Cache；⑥调用readpage→submit_bio()构造块I/O请求，经I/O调度器到驱动；⑦当前进程在页等待队列上睡眠（wait_on_page_locked）；⑧DMA完成数据读取，硬中断+softirq唤醒等待进程；⑨页就绪，copy_to_user()拷贝数据返回。未命中路径涉及磁盘I/O，延迟比命中高2~3个数量级。`,
    tags: ["文件系统", "Page Cache"],
  },
  {
    id: "lke-fs-4",
    chapter: "lke-filesystem",
    level: 3,
    question: `ext4的Extent相比ext3的间接块有什么优势？延迟分配如何减少碎片？`,
    answer:
      `ext3用间接块映射逻辑块到物理块：大文件需要多级间接块表，元数据开销大，且一个文件可能需要数百个间接块。ext4用Extent（区段）：一个extent记录一段连续的逻辑块到物理块的映射（ee_block逻辑起始 + ee_len长度 + ee_start物理起始），一个extent最多映射32768个连续块（128MB），大文件只需少量extent。优势：元数据开销大幅减少，连续物理块提升I/O性能。延迟分配（Delalloc）：write时不分配物理块，只写入Page Cache，在脏页写回时（writepages）才批量分配物理块。优势：写回时能看到完整的写入模式，一次性分配连续物理块，减少碎片；而ext3在write时就分配，无法预知后续写入模式，容易产生碎片。`,
    tags: ["文件系统", "ext4"],
  },
];
