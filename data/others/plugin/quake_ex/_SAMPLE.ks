
[plugin name=quake_ex]

[layopt layer=message0 visible=false]
[layopt layer=0 visible=true]
[chara_new name=akane storage=https://tempura17654.github.io/tyranoscript_plugins/data/fgimage/chara/akane/normal.png jname=あかね]
[bg storage=https://tempura17654.github.io/tyranoscript_plugins/data/bgimage/room.jpg time=0]
[chara_show name=akane time=0]

[layopt layer=message0 visible=true]
タテ揺れ[l][cm]
[layopt layer=message0 visible=false]

[quake_ex vmax=100          time=500 ]
[quake_ex vmax=200          time=1000]
[quake_ex vmax=300          time=1500]

[layopt layer=message0 visible=true]
ヨコ揺れ[l][cm]
[layopt layer=message0 visible=false]

[quake_ex          hmax=100 time=500 ]
[quake_ex          hmax=200 time=1000]
[quake_ex          hmax=300 time=1500]

[layopt layer=message0 visible=true]
ナナメ揺れ[l][cm]
[layopt layer=message0 visible=false]

[quake_ex vmax=100 hmax=200 time=800]
[quake_ex vmax=200 hmax=100 time=800]
[quake_ex vmax=200 hmax=200 time=800]

[layopt layer=message0 visible=true]

end.

[s]
