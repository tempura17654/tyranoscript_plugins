; ティラノスクリプト標準テーマプラグイン

;=========================================
; コンフィグ モード　画面作成
;=========================================

;	メッセージレイヤ０を不可視に
	[layopt layer=message0 visible=false]
;	fixボタン消し
	[clearfix]
	
;　イメージ消去

[iscript]
$(".layer_camera").empty();
[endscript]

;	メニューボタン非表示
	[hidemenubutton]

;	コンフィグ用の背景を読み込んでトランジション
	[bg storage="../../tyrano/images/system/bg_base.png" time=100]

;	画面右上の「Back」ボタン
	[button name="button_back" graphic="config/c_btn_back.png" enterimg="config/c_btn_back2.png" target="*backtitle" x=840 y=20]

;	画面右上の「←」ボタン
	[button name="button_back" graphic="config/arrow_prev.png" target="*go_config_normal" x=740 y=30]

	; ＨＴＭＬ挿入
	@html name=config_mouse_gesture
		<div class="gesture_title">
			<img src="./data/others/plugin/mouseGesture/config_title.png" />
		</div>
		<div class="gesture_menu">
			<div class="gesture gesture-top"><p></p></div>
			<div class="gesture gesture-left"><p></p></div>
			<div class="gesture gesture-right"><p></p></div>
			<div class="gesture gesture-bottom"><p></p></div>
		</div>
		<div class="gesture-sensitivity">
			ジェスチャー感度<br />
			<div class="sensitivity sensitivity-25 ">敏</div>
			<div class="sensitivity sensitivity-50 "></div>
			<div class="sensitivity sensitivity-100"></div>
			<div class="sensitivity sensitivity-200"></div>
			<div class="sensitivity sensitivity-400">鈍</div>
		</div>
		<div class="gesture-button">
			ボタン<br />
			<div class="button button-left  ">左</div>
			<div class="button button-center">中</div>
			<div class="button button-right selected">右</div>
		</div>
		<div class="gesture-palette">
			<div class="gesture-palette-cover" style="width:960px;height:640px"></div>
			<div class="gesture-palette-message"></div>
			<!-- ここにロールパレットをjQueryで挿入していく -->
		</div>
	@endhtml
	@loadjs storage=plugin/mouseGesture/config.js
	@s
	
;=========================================
; 通常コンフィグに行く
;=========================================
*go_config_normal
[iscript]
	$('.config_mouse_gesture').remove();
[endscript]
[cm]
[layopt layer=message1 visible=false]
[freeimage layer=1]
[clearfix]
[jump storage=config.ks]
	
;=========================================
; タイトルに戻る
;=========================================
*backtitle
[iscript]
	$('.config_mouse_gesture').remove();
[endscript]
[cm]
[layopt layer=message1 visible=false]
[freeimage layer=1]
[clearfix]
;コンフィグの呼び出しに sleepgame を使っているので、必ず awakegame で戻してやってください
[awakegame]