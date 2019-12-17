# creatorexDTS
Cocos Creator d.ts 

官方cocos creator TS版本的 creator.d.ts文件缺失很多信息，特别jsb模式，很多API接口调用起来要么凭经验要么要去查c++接口，使用其他非常不便。
本项目主要用于针对creator.d.ts的扩展，也非常期待广大开发者一起维护或者提PR. :)

1. 如果你不还不懂d.ts是什么，你可能需要去了解一下 https://www.tslang.cn/docs/handbook/declaration-files/library-structures.html
2. 本项目d.ts只允许补充和覆盖已有creator.d.ts里面未声明（但是已导出jsb）或是声明成any类型的对象（如localStorage），尽可能保证不会影响已有的creator.d.ts提示。
3. ccreator_patch2.1.3.d.ts的命名规则，希望是和引擎版本关联
4. 如果大家平常有自己写的d.ts书写代码，欢迎一并提交issues修改，方便广大开发者一起使用。
