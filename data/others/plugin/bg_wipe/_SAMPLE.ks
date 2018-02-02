[layopt layer=message0 visible=false]
[layopt layer=0 visible=true]
[chara_new name=akane storage=http://tempura.html.xdomain.jp/tyranoscript/data/fgimage/chara/akane/normal.png jname=あかね]
[bg storage=http://tempura.html.xdomain.jp/tyranoscript/data/bgimage/room.jpg time=0]
[chara_show name=akane time=0]



[plugin name=bg_wipe]



[layopt layer=message0 visible=true]
ワイプ方向の変更[l][cm]
[layopt layer=message0 visible=false]

[bg_wipe storage=rouka.jpg direction=leftTop       ]
[bg_wipe storage=room.jpg  direction=left          ]
[bg_wipe storage=rouka.jpg direction=leftBottom    ]
[bg_wipe storage=room.jpg  direction=center        ]
[bg_wipe storage=rouka.jpg direction=centerVertical]
[bg_wipe storage=room.jpg  direction=outHorizon    ]

[layopt layer=message0 visible=true]
トランジション画像の変更[l][cm]
[layopt layer=message0 visible=false]

[def_bg_wipe method=image]

[bg_wipe storage=rouka.jpg  i_name=column]
[bg_wipe storage=room.jpg   i_name=mosaic]
[bg_wipe color=black        i_name=smoke ]
[bg_wipe storage=room.jpg   i_name=spiral]

[layopt layer=message0 visible=true]
トランジション図形の変更[l][cm]
[layopt layer=message0 visible=false]

[def_bg_wipe method=shape]

[bg_wipe storage=rouka.jpg s_name=star    ]
[bg_wipe storage=room.jpg  s_name=square  ]
[bg_wipe storage=rouka.jpg s_name=circle  ]
[bg_wipe storage=room.jpg  s_name=triangle]

[layopt layer=message0 visible=true]
図形の数の変更[l][cm]
[layopt layer=message0 visible=false]

[def_bg_wipe method=shape s_name=circle]

[bg_wipe storage=rouka.jpg num_shape = 1]
[bg_wipe storage=room.jpg  num_shape = 5]
[bg_wipe storage=rouka.jpg num_shape = 10]
[bg_wipe storage=room.jpg  num_shape = 15]

[layopt layer=message0 visible=true]
自作関数の指定[l][cm]
[layopt layer=message0 visible=false]

[def_bg_wipe method=custom]

[bg_wipe storage=rouka.jpg c_name=myWipe  ]
[bg_wipe storage=room.jpg  c_name=myWipe2 ]
[bg_wipe storage=rouka.jpg c_name=myWipe3 ]

[def_bg_wipe method=wipe]


[layopt layer=message0 visible=true]

end.

[s]
