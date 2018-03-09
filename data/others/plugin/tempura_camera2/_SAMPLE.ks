[call target=setting]
[image layer=base storage=room.jpg time=0]
[chara_show layer=0 name=mascot left=600 top=100 time=0]
[chara_show layer=1 name=yamato left=300 top=1   time=0]
[chara_show layer=2 name=akane  left=1   top=50  time=0]
プラグインを読み込む前。[p]



; プラグインを読み込む。マネージャを有効に。使うレイヤはbase,0,1,2。デフォルトの移動時間は500ミリ秒。
[plugin name=tempura_camera2 manager=true layer=base,0,1,2 deftime=500 newline=true]



プラグインを読み込んだ！　疑似3Dカメラ移動が簡単にできるぞ！[p]
まずはレイヤー深度を設定して、カメラ位置を初期化。
; それぞれのレイヤのz深度を設定する。base/0/1/2の順に200/120/100/80。数値が大きいほど奥で、基準は100。
; ＋それぞれのレイヤの基準拡大率を設定する。base/0/1/2の順に2.5/1/1/1。
; カメラのz座標とレイヤのz深度の差(＝距離)が100のとき、基準拡大率でのズームとなる。
[tcamera_setting z="170, 120, 100, 70" zoom="2, 1, 1, 1"]
; カメラを初期位置に
[tcamera_init][p]



カメラのz座標を20に。
[tcamera z=20][p]
カメラのx座標を-100に。
[tcamera x=-100][p]
カメラのy座標を100に。
[tcamera y=100][p]



Ver2で「相対指定」もできるようにしました。[p]
カメラのx座標を今の位置から+30。
[tcamera x="+=30"][p]
カメラのz座標を今の位置から-30。
[tcamera z="-=30"][p]



また、Ver2で「スクリーン操作」もできるようにしました。[p]
スクリーンの拡大率を0.5に。
[tcamera sczoom=0.5][p]
スクリーンの拡大率を2に。
[tcamera sczoom=2][p]
スクリーンのx座標を-100に。
[tcamera scx=-100][p]
スクリーンのy座標を-50に。
[tcamera scy=-50][p]



「カメラ操作」との違いがわかっていただけるでしょうか。[p]
カメラ位置とスクリーン位置を初期化。
[tcamera_init][p]






カメラの移動先にキャラクターを指定することもできる！[p]
#akane:happy
あかねを画面中央に映す。あかねが1.5倍で映るように。
[tcamera name=akane zoom=1.5][p]
#yamato:happy
やまとを映す。
[tcamera name=yamato][p]
#mascot:happy
てぃらのを映す。
[tcamera name=mascot][p]



もうちょっと細かい指定もできる！[p]
#akane:default
あかねを映すが、カメラのy座標は「あかねの上端y座標から200px下」。
[tcamera name=akane y=theY-200][p]
#mascot:default
てぃらのを映すが、完全に画面中央にまで持ってこなくていい（移動量半分）。
[tcamera name=mascot x=theCX/2 z=theZ/2][p]
#yamato:default
やまとを映す。
[tcamera name=yamato][p]
#akane:default
あかねを映す。
[tcamera name=akane][p]
#mascot:default
てぃらのを映す。完全に画面中央に持ってくる。
[tcamera name=mascot x=theCX y=theCY z=theZ][p]



#mascot:happy
カメラマネージャ機能もあるよ！[p]
#mascot:default
キーボードの「C」でカメラ制御モードのオン・オフが切り替えられる！[p]
Ver2ではキーボードの「V」でスクリーン制御モードも選べるようになったよ！[p]
オン状態になると画面が色枠で囲まれて、ゲームが進まなくなるよ。[p]
色枠が出ている状態で画面中央をマウスドラッグするとカメラが動く。[p]
画面端をマウスドラッグするとカメラが回転する。[r]
マウスホイールでz座標操作もできる。[p]
［リセット］をクリックでカメラのリセット、[r]
タグ文字のところをクリックでタグのコピーができるよ。[p]
#mascot:happy
以上！[p]



#
カメラの位置を初期化。
[tcamera_init][p]
レイヤーの深度設定を初期化＆カメラの位置を初期化。
[tcamera_setting_init]
[tcamera_init]
[s]


*setting
[position width=920 height=161 top=451 left=20]
[position page=fore margint=45 marginl=10 marginr=20 marginb=10 vertical=false opacity=180 color=0x000000]
[ptext name=chara_name_area layer=message0 color=0xFFFFFF size=26 x=30 y=466 bold=bold]
[chara_config ptext=chara_name_area]
[chara_config talk_focus=brightness talk_anim=up talk_anim_time=220]
[deffont bold=true]
[resetfont]
[button name=role_button role=quicksave graphic=button/qsave.png enterimg=button/qsave2.png x=770 y=470]
[button name=role_button role=quickload graphic=button/qload.png enterimg=button/qload2.png x=850 y=470]
[layopt layer=base visible=true]
[layopt layer=0    visible=true]
[layopt layer=1    visible=true]
[layopt layer=2    visible=true]
[chara_new  name=yamato storage=chara/yamato/normal.png jname=やまと]
[chara_face name=yamato storage=chara/yamato/happy.png face=happy]
[chara_new  name=mascot storage=chara/mascot/normal.png jname=てぃらの]
[chara_face name=mascot storage=chara/mascot/happy.png face=happy]
[chara_new  name=akane  storage=chara/akane/normal.png jname=あかね]
[chara_face name=akane  storage=chara/akane/happy.png face=happy]
[delay speed=1]
[return]