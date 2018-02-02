[layopt layer=message0 visible=false]
[layopt layer=0 visible=true]
[chara_new name=akane storage=http://tempura.html.xdomain.jp/tyranoscript/data/fgimage/chara/akane/normal.png jname=あかね]
[bg storage=http://tempura.html.xdomain.jp/tyranoscript/data/bgimage/room.jpg time=0]
[chara_show name=akane time=0]



[plugin name=bg_tile]



[layopt layer=message0 visible=true]
タイル数の変更[l][cm]
[layopt layer=message0 visible=false]

; デフォルト値の書き換え
; bgimageフォルダ内の、拡張子が.jpgであるファイル名を探すようにする
[def_bg_tile folder=bgimage ext=jpg]

; [def_bg_tile] でフォルダを指定済みなので、storageパラメータに「bgimage/」を書く必要はない
; [def_bg_tile] で拡張子を指定済みなので、storageパラメータに「.jpg」を書く必要はない
; nx を省略すると、タイルが正方形になるように nx が自動調整される
[bg_tile storage=rouka           ]
[bg_tile storage=room  ny=8      ]
[bg_tile storage=rouka       nx=8]
[bg_tile storage=room  ny=1  nx=8]

; デフォルト設定の変更をリセットする
[reset_def_bg_tile]

[layopt layer=message0 visible=true]
ワイプ方向の変更[l][cm]
[layopt layer=message0 visible=false]

[def_bg_tile time=1000 delay=1000 light=white]

[bg_tile storage=rouka.jpg dir=top    ]
[bg_tile storage=room.jpg  dir=left   ]
[bg_tile storage=rouka.jpg dir=leftTop]
[bg_tile storage=room.jpg  dir=random ]

[layopt layer=message0 visible=true]
「色」へのトランジション[l][cm]
[layopt layer=message0 visible=false]

[def_bg_tile delay=400 dir=random light=none]

[bg_tile color=#FFFFFF]
[bg_tile color=black  ]
[bg_tile color=orange ]
[bg_tile color=skyblue]

[layopt layer=message0 visible=true]
タイル光の変更[l][cm]
[layopt layer=message0 visible=false]

[def_bg_tile delay=1000 dir=random]

[bg_tile storage=rouka.jpg light=red  ]
[bg_tile storage=room.jpg  light=green]
[bg_tile storage=rouka.jpg light=blue ]
[bg_tile storage=room.jpg  light=none ]

[layopt layer=message0 visible=true]
ディレイの変更[l][cm]
[layopt layer=message0 visible=false]

[def_bg_tile dir="leftTop" light=none]

[bg_tile storage=rouka.jpg time=1000 delay=2000 ]
[bg_tile storage=room.jpg  time=1000 delay=1000 ]
[bg_tile storage=rouka.jpg time=1000 delay=500  ]
[bg_tile storage=room.jpg  time=1000 delay=0    ]

[layopt layer=message0 visible=true]
フェード時間の変更[l][cm]
[layopt layer=message0 visible=false]

[def_bg_tile light=white]

[bg_tile storage=rouka.jpg time=4000 delay=1000 ]
[bg_tile storage=room.jpg  time=2000 delay=1000 ]
[bg_tile storage=rouka.jpg time=1000 delay=1000 ]
[bg_tile storage=room.jpg  time=0    delay=1000 ]

[reset_def_bg_tile]

[layopt layer=message0 visible=true]

end.

[s]
