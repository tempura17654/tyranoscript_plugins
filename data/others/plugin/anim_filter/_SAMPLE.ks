
[plugin name=anim_filter]

[layopt layer=message0 visible=false]
[layopt layer=0 visible=true]
[chara_new name=akane storage=http://tempura.html.xdomain.jp/tyranoscript/data/fgimage/chara/akane/normal.png jname=あかね]
[bg storage=http://tempura.html.xdomain.jp/tyranoscript/data/bgimage/room.jpg time=0]
[chara_show name=akane time=0]

[layopt layer=message0 visible=true]
フィルタアニメーション[l][cm]
[layopt layer=message0 visible=false]

[anim_filter      layer=0 name=akane time=1000 blur=10       ]
[anim_filter      layer=0 name=akane time=1000 brightness=0  ]
[anim_filter      layer=0 name=akane time=1000 brightness=200]
[free_anim_filter layer=0 name=akane time=1000               ]
[anim_filter      layer=0 name=akane time=1000 hue=360       ]
[free_anim_filter layer=1 name=akane time=0                  ]

[layopt layer=message0 visible=true]

end.

[s]
