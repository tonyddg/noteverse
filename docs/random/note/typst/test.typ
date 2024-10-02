// 修改表格图表的的类型名
#show figure.where(kind: table): set figure(supplement: "表")
// 修改表格标题的对齐, 默认为向下对齐
#show figure.where(kind: table): set figure.caption(position: top)

#figure(
    caption: "greet",
    kind: table
// 通常在图表容器后紧接标签, 以标记图表
)[#rect()[This is tables]] <tab:test> 
