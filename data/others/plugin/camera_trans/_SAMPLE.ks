*loop
[call target=setting]

wait=falseでぐーるぐる（プラグイン読み込み前）[l]
[call target=guruguru]

; プラグイン読み込み！
[plugin name=camera_trans]

wait=falseでぐーるぐる（プラグイン読み込み後）[l]
[call target=guruguru]
[jump target=loop]


*guruguru
[camera x=-200 y= 200 wait=false][l]
[camera x= 200 y= 200 wait=false][l]
[camera x= 200 y=-200 wait=false][l]
[camera x=-200 y=-200 wait=false][l]
[camera x=-200 y= 200 wait=false][l]
[camera x= 200 y= 200 wait=false][l]
[camera x= 200 y=-200 wait=false][l]
[camera x=-200 y=-200 wait=false][l]
[reset_camera wait=false][cm]
[return]

*setting
[bg storage=room.jpg time=0]
[position width=920 height=161 top=451 left=20]
[position page=fore margint=45 marginl=10 marginr=20 marginb=10 vertical=false opacity=180 color=0x000000]
[clearfix]
[button name=role_button role=quicksave graphic=button/qsave.png enterimg=button/qsave2.png x=770 y=470]
[button name=role_button role=quickload graphic=button/qload.png enterimg=button/qload2.png x=850 y=470]
[loadjs storage=../../tyrano/libs/jquery.a3d.js]
[loadjs storage=../../tyrano/plugins/kag/kag.tag_camera.js]
[return]
