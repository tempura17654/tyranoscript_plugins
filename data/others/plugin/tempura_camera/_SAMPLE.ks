[call target=setting]
[image layer=base storage=room.jpg time=0]
[chara_show layer=0 name=yamato left=300 top=1   time=0]
[chara_show layer=1 name=mascot left=600 top=100 time=0]
[chara_show layer=2 name=akane  left=1   top=50  time=0]
プラグインを読み込む前。[p]



; プラグインを読み込む。マネージャを有効に。使うレイヤはbase,0,1,2。
[plugin name=jquery_a3d_update]
[plugin name=tempura_camera manager=true layer=base,0,1,2 deftime=0]



プラグインを読み込んだ！　疑似3Dカメラ移動が簡単にできるぞ。[p]
まずはレイヤー深度の設定とカメラの初期化。
; それぞれのレイヤのz深度を設定する。base,0,1,2の順に200,120,100,80。数値が大きいほど奥。
; カメラのz深度とレイヤのz深度の差(＝距離)が100のとき1倍ズームとなる。
[tcamera_setting z=200,120,100,80]
; ただしベースレイヤについては特別に2.5倍ズームを基本とする。
[tcamera_setting zoom=2.5,1,1,1]
; カメラを初期位置に
[tcamera_init time=0][p]



カメラをz=20の位置に。
[tcamera z=20][p]
カメラをx=100の位置に。
[tcamera x=100][p]
カメラをy=100の位置に。
[tcamera y=100][p]



カメラの移動先にキャラクターを指定することもできる！[p]
あかねが1.5倍ズームで画面中央に映るように移動。
#akane
[tcamera name=akane zoom=1.5 y=20][p]
やまとに移動。
#yamato
[tcamera name=yamato][p]
マスコットに移動。
#mascot
[tcamera name=mascot][p]



#mascot
キーボードの「C」でカメラマネージャのオン・オフが切り替えられる！[r]
オン状態になると画面が青枠で囲まれて、ゲームが進まなくなるぞ。[p]
青枠が出ている状態で画面中央をマウスドラッグするとカメラが動く。[p]
画面端をマウスドラッグするとカメラが回転する。[r]
さらにマウスホイールでz深度操作もできる。[p]
［リセット］をクリックでカメラのリセット、[r]
タグ文字のところをクリックでタグのコピーができるぞ。[p]
#mascot
以上！[p]

#
[tcamera_init][p]
[tcamera_setting_init]
[tcamera_init]
[s]


*setting
[position width=920 height=161 top=451 left=20]
[position page=fore margint=45 marginl=10 marginr=20 marginb=10 vertical=false opacity=180 color=0x000000]
[ptext name=chara_name_area layer=message0 color=0xFFFFFF size=26 x=30 y=466 bold=bold]
[chara_config ptext=chara_name_area]
[chara_config talk_focus=brightness talk_anim=up talk_anim_time=180]
[button name=role_button role=quicksave graphic=button/qsave.png enterimg=button/qsave2.png x=770 y=470]
[button name=role_button role=quickload graphic=button/qload.png enterimg=button/qload2.png x=850 y=470]
[layopt layer=base visible=true]
[layopt layer=0    visible=true]
[layopt layer=1    visible=true]
[layopt layer=2    visible=true]
[chara_new name=yamato storage=chara/yamato/normal.png jname=やまと]
[chara_new name=mascot storage=chara/mascot/normal.png jname=？？？]
[chara_new name=akane  storage=chara/akane/normal.png jname=あかね]
[delay speed=1]
[return]