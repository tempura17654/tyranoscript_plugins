;=========================================
; コンフィグ モード　画面作成
;=========================================
*start
	
	; キーコンフィグ無効
	[stop_keyconfig]
	
	; bgmを流す
	[playbgm storage="../others/plugin/slider/_SAMPLE/music.ogg"]
	
	; いま画面にあるもの全部消す
	[layopt layer="message0" visible="false"]
	[cm]
	[clearfix]	
	[free_layermode time="0"]
	[reset_camera   time="0"]
	[iscript]
		$(".layer_camera").empty();
	[endscript]
	[hidemenubutton]
	
	; 変数の写し（システム変数→一時変数）
	[iscript]
		tf.current_bgm_vol    = parseInt(TG.config.defaultBgmVolume);
		tf.current_se_vol     = parseInt(TG.config.defaultSeVolume);
		tf.current_ch_speed   = parseInt(TG.config.chSpeed);
		tf.current_auto_speed = parseInt(TG.config.autoSpeed);
		tf.text_skip          =(TG.config.unReadTextSkip != "true") ? "OFF" : "ON";
	[endscript]
	
	; レイヤー１を可視に
	[layopt layer="1" visible="true"]
	
	; 背景
	[bg storage="../others/plugin/slider/_SAMPLE/bg_config.png" time=100]
	
	; Backボタン
	[button graphic="config/c_btn_back.png" fix=true enterimg="config/c_btn_back2.png" target="*backtitle" x=840 y=20]
	
	; 各種スライダー
	[slider target="*vol_bgm_change"    variable="tf.current_bgm_vol"    name="bgm"  min="0" max=" 100" init="&tf.current_bgm_vol"             x="318" y="183"]
	[slider target="*vol_se_change"     variable="tf.current_se_vol"     name="se"   min="0" max=" 100" init="&tf.current_se_vol"              x="318" y="234" height="4"  radius="24" col1="0x666666" col2="0x9e0e0e" col3="0xCe0e0e"]
	[slider target="*ch_speed_change"   variable="tf.current_ch_speed"   name="ch"   min="0" max="  99" init="&100 - tf.current_ch_speed"      x="318" y="304"             radius="50" img3="../others/plugin/slider/_SAMPLE/hane.png" img3_x="24" img3_y="-24"]
	[slider target="*auto_speed_change" variable="tf.current_auto_speed" name="auto" min="0" max="4500" init="&5000 - tf.current_auto_speed"   x="318" y="354" height="40" radius="0"  img1="../others/plugin/slider/_SAMPLE/sumi.png" img2="../others/plugin/slider/_SAMPLE/sumi2.png"]
	
	; ミュートボタン
	[button fix="true" name="vol" target="*vol_se_zero"  graphic="config/c_btn.png" width=35 height=35 x=780 y=220]
	[button fix="true" name="vol" target="*vol_bgm_zero" graphic="config/c_btn.png" width=35 height=35 x=780 y=170]
	
	; 未読スキップOFF（透明ボタン）
	[button name="unread_off" fix="true" target="*skip_off" graphic="config/c_btn.png" width=125 height=35  x=300 y=420]
	; 未読スキップON（透明ボタン）
	[button name="unread_on"  fix="true" target="*skip_on" graphic="config/c_btn.png" width=125 height=35 x=435 y=420]
	
	; 未読スキップON/OFFボタンのうち設定されているほうのボタンを透明でなくする
	[iscript]
		if(tf.text_skip == "OFF")
			$(".unread_off").attr("src","data/image/config/c_uts_off.png");
		else
			$(".unread_on").attr("src","data/image/config/c_uts_on.png");
	[endscript]
	
	[ptext layer=1 x=390 y=605 size=20 color=black text=音声素材：Music&ensp;is&ensp;VFR]
	;テストメッセージ出力開始
	[test_message_start]
	
	
[s]



;=========================================
; タイトルに戻る
;=========================================
*backtitle
	
	; キーコンフィグ有効
	[start_keyconfig]
	
	; テストメッセージ出力終了
	[test_message_end]
	
	; いろいろ消し
	[cm]
	[layopt layer="message1" visible="false"]
	[freeimage layer="1"]
	[clearfix]
	
	; 目覚める
	[awakegame]
	
[return]



;=========================================
; BGM音量変更
;=========================================
*vol_bgm_change
	
	; 変更
	[bgmopt volume="&tf.current_bgm_vol"]
	
[s]



*vol_bgm_zero
	
	; fixボタンで飛んできている⇒callされている⇒callスタックが残っている
	; callスタックはいらないので消す
	[clearstack]
	
	; 変更
	[slider_set name="bgm" value="0"]
	
[s]


;=========================================
; SE音量変更
;=========================================
*vol_se_change
	
	; 変更
	[seopt volume="&tf.current_se_vol"]
	
	; ついでにse再生
	[playse storage="../others/plugin/slider/_SAMPLE/se.ogg"]
	
[s]



*vol_se_zero
	
	; fixボタンで飛んできている⇒callされている⇒callスタックが残っている
	; callスタックはいらないので消す
	[clearstack]
	
	; 変更
	[slider_set name="se" value="0"]
	
[s]



;=========================================
; テキスト表示速度変更
;=========================================
*ch_speed_change
	
	; 変更
	[configdelay speed="&100 - tf.current_ch_speed"]
	
	; テストメッセージのリセット
	[test_message_reset]
	
[s]



;=========================================
; オートモード時改ページ速度変更
;=========================================
*auto_speed_change
	
	; 変更
	[autoconfig speed="&5000 - tf.current_auto_speed"]
	
	; テストメッセージのリセット
	[test_message_reset]
	
[s]



;=========================================
; 未読スキップOFF化
;=========================================
*skip_off
	
	; 画像の入れ替え
	[iscript]
		$(".unread_off").attr("src","data/image/config/c_uts_off.png");
		$(".unread_on" ).attr("src","data/image/config/c_btn.png");
		tf.text_skip = "OFF";
	[endscript]
	
	; 変更
	[config_record_label skip="false"]
	
[return]



;=========================================
; 未読スキップON化
;=========================================
*skip_on
	
	; 画像の入れ替え
	[iscript]
		$(".unread_off").attr("src","data/image/config/c_btn.png");
		$(".unread_on" ).attr("src","data/image/config/c_uts_on.png");
		tf.text_skip = "ON";
	[endscript]
	
	; 変更
	[config_record_label skip="true"]
	
[return]