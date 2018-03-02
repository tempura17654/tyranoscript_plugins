[call target=setting]

[plugin name=tempura_camera uselayer=base,0,1,2]
[tcamera_set z=200,110,90,70 basezoom=1]
[tcamera time=0]


[image layer=base storage=room.jpg time=0]
[image layer=0    storage=chara/yamato/normal.png x=300 y=000 time=0 name=yamato]
[image layer=1    storage=chara/mascot/normal.png x=600 y=100 time=0 name=mascot]
[image layer=2    storage=chara/akane/normal.png  x=000 y=050 time=0 name=akane]

[tcamera name=akane][l]
[tcamera name=yamato][l]
[tcamera name=mascot][l]
[tcamera x=0 y=0 z=0][l]

[s]



*setting
[position width=920 height=161 top=451 left=20]
[position page=fore margint=45 marginl=10 marginr=20 marginb=10 vertical=false opacity=180 color=0x000000]
[ptext name=chara_name_area layer=message0 color=0xFFFFFF size=26 x=30 y=381 bold=bold]
[chara_config ptext=chara_name_area]
[chara_config talk_focus=brightness]
[layopt layer=base visible=true]
[layopt layer=0    visible=true]
[layopt layer=1    visible=true]
[layopt layer=2    visible=true]
[return]