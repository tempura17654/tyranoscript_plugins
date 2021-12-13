
[plugin name=trim]

[layopt layer=message0 visible=false]
[layopt layer=0 visible=true]
[chara_new name=akane storage=https://tempura17654.github.io/tyranoscript_plugins/data/fgimage/chara/akane/normal.png jname=あかね]
[bg storage=https://tempura17654.github.io/tyranoscript_plugins/data/bgimage/room.jpg time=0]
[chara_show name=akane time=0]

[layopt layer=message0 visible=true]
背景色の変更[l][cm]
[layopt layer=message0 visible=false]
[freeimage layer=0]

[def_trim layer=0 preload=false time=800 folder=fgimage/chara/akane ext=png trim=90,20,240,240]
[trim storage=normal draw=60,200  color=none   ]
[trim storage=doki   draw=360,200 color=orange ]
[trim storage=happy  draw=660,200 color=skyblue]

[layopt layer=message0 visible=true]
枠の形状の変更[l][cm]
[layopt layer=message0 visible=false]
[freeimage layer=0]

[def_trim layer=0 preload=false time=800 folder=fgimage/chara/akane ext=png trim=90,20,240,240 color=brown]
[trim storage=normal draw=60,200              ]
[trim storage=doki   draw=360,200  radius=50px]
[trim storage=happy  draw=660,200  radius=50% ]

[layopt layer=message0 visible=true]
アニメーションの変更[l][cm]
[layopt layer=message0 visible=false]
[freeimage layer=0]

[def_trim layer=0 preload=false time=800 folder=fgimage/chara/akane ext=png trim=90,20,240,240 color=brown]
[trim storage=normal draw=60,200   anim=,50  ]
[trim storage=doki   draw=360,200  anim=50   ]
[trim storage=happy  draw=660,200  anim=50,50]

[layopt layer=message0 visible=true]
その他の変更[l][cm]
[layopt layer=message0 visible=false]
[freeimage layer=0]

[def_trim layer=0 zindex=999 radius=50%]
[trim storage=normal draw=60,200  color=rgba(165,42,42,0.5)]
[trim storage=doki   draw=360,200 opacity=150              ]
[trim storage=happy  draw=660,200 rotate=45                ]
[reset_def_trim]

[freeimage layer=0]
[chara_show name=akane time=0]

[layopt layer=message0 visible=true]

end.

[s]
