
//
// KeyConfig.js で設定できるアクションはすべて設定できます。
//
// "save"        セーブ画面を開きます
// "load"        ロード画面を開きます
// "next"        次の文章に移ります。左クリックの操作
// "menu"        メニュー画面を表示します。
// "title"       タイトルへ戻ります
// "skip"        スキップを開始します
// "backlog"     バックログを表示します
// "fullscreen"  フルスクリーン切り替え
// "qsave"       クイックセーブ実行
// "qload"       クイックロード実行
// "auto"        オートモード開始
// "hidemessage" メッセージ消去
//
// それに加え、次のアクションも設定できます。
// 
// "endgame"     ゲームを終了する
// "config"      コンフィグ画面に行く
//
// ★ あるボタンに対してジェスチャーを設定するときは、
//   「そのボタンをクリックしたときのアクション」
//   （KeyConfig.jsで設定してるやつ）をなしにするとよいです。
//    もともとそのボタンのクリックに割り当てていたアクションは、
//    ジェスチャーの nomove に割り当て直すのがオススメです。
//
// ★ [stop_keyconfig][start_keyconfig]に対応しています。
//

//========================================
//# マウスジェスチャー管理オブジェクト作成
//========================================

window.gMouseGesture = {
	
	//
	//## ここで初期設定（システム変数をロードする前の設定）を決定します。
	//
	
	 sensitivity: 50 // 何ピクセル動いたらジェスチャー反応するか。25 / 50 / 100 / 200 / 400
	// 通常のマウスチャー設定
	// ↓の設定は付属の専用コンフィグ画面で変更することができます
	,map: [
		 {}
		,{// マウスの左ボタンジェスチャー
			 nomove: ""
			,top   : ""
			,left  : ""
			,right : ""
			,bottom: ""
		 }
		,{// マウスのホイールボタンジェスチャー
			 nomove: ""
			,top   : ""
			,left  : ""
			,right : ""
			,bottom: ""
		 }
		,{// マウスの右ボタンジェスチャー
			 nomove: "hidemessage"
			,top   : "load"
			,left  : "auto"
			,right : "skip"
			,bottom: "save"
		 }
	 ]
	 // [mgesture_tmp_on] で一時的に↓の設定に切り替わります
	 // [mgesture_tmp_off] で↑の設定にもどります
	 // ↓の設定は付属の専用コンフィグ画面ではいじることができません
	,map_tmp: [
		 {}
		,{// マウスの左ボタンジェスチャー
			 nomove: ""
			,top   : ""
			,left  : ""
			,right : ""
			,bottom: ""
		 }
		,{// マウスのホイールボタンジェスチャー
			 nomove: ""
			,top   : ""
			,left  : ""
			,right : ""
			,bottom: ""
		 }
		,{// マウスの右ボタンジェスチャー
			 nomove: "menu"
			,top   : ""
			,left  : ""
			,right : ""
			,bottom: ""
		 }
	]
	,disable: [
		 false // 全てのボタンのジェスチャーを無効にするか？ true / false
		,false // 左ボタンジェスチャーを無効にするか？ true / false
		,false // ホイールジェスチャーを無効にするか？ true / false
		,false // 右ボタンジェスチャーを無効にするか？ true / false
	 ]
	 
	//
	//## 以下は、挙動を改造したい場合以外、そのままにしておいてください。
	//
	
	,power: 0
	,start_x: -1
	,start_y: -1
	,move_x: -1
	,move_y: -1
	,on: function( button ) {
		switch ( button ) {
		case "left":
			this.disable[ 1 ] = false;
			break;
		case "center":
			this.disable[ 2 ] = false;
			break;
		case "right":
			this.disable[ 3 ] = false;
			break;
		case undefined:
			this.disable[ 0 ] = false;
			break;
		};
	 }
	,off: function( button ) {
		switch ( button ) {
		case "left":
			this.disable[ 1 ] = true;
			break;
		case "center":
			this.disable[ 2 ] = true;
			break;
		case "right":
			this.disable[ 3 ] = true;
			break;
		case undefined:
			this.disable[ 0 ] = true;
			break;
		};
	 }
	,set: function( button, val, val2 ) {
		if ( val2 && typeof val == 'string' ) {
			var obj = {};
			obj[ val ] = val2;
			val = obj;
		};
		switch ( button ) {
		case "left":
			$.extend( this.map[ 1 ], val );
			break;
		case "center":
			$.extend( this.map[ 2 ], val );
			break;
		case "right":
			$.extend( this.map[ 3 ], val );
			break;
		case "sensitivity":
			val = parseInt( val );
			gMouseGesture.sensitivity = val;
			break;
		};
	 }
	 // 仕事をしてもらいます。dir = direction（方向）の意
	,work: function( dir ) {
		if ( tyrano.plugin.kag.stat.is_skip == true ) {
			tyrano.plugin.kag.stat.is_skip = false;
			this.power = 0;
			return false;
		};
		var target = null;
		var that = TYRANO.kag.key_mouse;
		target = TYRANO.kag.stat.is_gesture_tmp ? this.map_tmp[ this.power ][ dir ] : this.map[ this.power ][ dir ];
		// 関数型ならば即実行
		if ( typeof target == "function" ) {
			target();
		}
		// key_configのメンバーならば…
		else if ( that[ target ] ) {
			if ( target == "next" || target == "hidemessage" ||
			     target == "skip" || target == "showmenu" ) {
				that[ target ]();
			}
			else if ( target == "qsave" ) {
				that._role("quicksave");
			}
			else if ( target == "qload" ) {
				that._role("quickload");
			}
			else {
				that._role( target );
			};
		}
		// "config"ならば
		else if ( target == "config" ) {
			var stat = TYRANO.kag.stat;
			if ( stat.is_adding_text != true && stat.enable_keyconfig != false )
			  TYRANO.kag.ftag.startTag("sleepgame", {storage:"config.ks"});
		}
		// "endgame"ならば
		else if ( target == "endgame" ) {
			var stat = TYRANO.kag.stat;
			if ( stat.is_adding_text != true && stat.enable_keyconfig != false )
			  TYRANO.kag.ftag.startTag("close", {ask:"true"});
		};
		// いずれにも該当しないなら何もしない
		this.power = 0;
		return false;
	 }
};
	
//========================================
//# [mgesture_tmp_on][mgesture_tmp_off]タグの作成
//========================================

var log_default = "false";
var mes_on = "マウスジェスチャー設定が一時的に変更されました。";
var mes_off = "マウスジェスチャー設定がもとにもどりました。";
var log = function (message)
{
	alertify.log(message,"",3000);
};
var new_tag = {};
new_tag["mgesture_tmp_on"] = {
	pm: {
		log: log_default
	},
	start: function (pm) {
		var that = this;
		this.kag.stat.is_gesture_tmp = true;
		this.kag.ftag.nextOrder();
		if (pm.log == "true") log(mes_on);
	}
};
new_tag["mgesture_tmp_off"] = {
	pm: {
		log: log_default
	},
	start: function (pm) {
		var that = this;
		this.kag.stat.is_gesture_tmp = false;
		this.kag.ftag.nextOrder();
		if (pm.log == "true") log(mes_off);
	}
};
var TG = TYRANO.kag;
var master_tag = TG.ftag.master_tag;
for (var tag_name in new_tag) {
	master_tag[tag_name] = object(new_tag[tag_name]);
	master_tag[tag_name].kag = TG;
};
TG.stat.is_gesture_tmp = false;

//========================================
//# イベントの登録他
//========================================

(function(MG){
	
	//========================
	//## イベント追加
	//========================
	
	var target = ".layer_event_click";
	
	$(target).on("mousedown", function(e) {
		if ( !MG.disable[ 0 ] && !MG.disable[ e.which ] ) {
			MG.power   = e.which;
			MG.start_x = e.pageX;
			MG.start_y = e.pageY;
			MG.move_x  = 0;
			MG.move_y  = 0;
		};
	});
	$(target).on("mousemove", function(e) {
		if ( MG.power != 0 ) {
			var x = MG.move_x = e.pageX - MG.start_x;
			var y = MG.move_y = e.pageY - MG.start_y;
			var t = MG.sensitivity;
			var dir = null;
			if      ( x < -t ) dir = "left";
			else if ( x > t  ) dir = "right";
			else if ( y < -t ) dir = "top";
			else if ( y > t  ) dir = "bottom";
			if ( dir ) {
				MG.work( dir );
			};
		};
	});
	$(target).on("mouseup", function(e) {
		if ( MG.power != 0 ) {
			MG.work("nomove");
		}
	});

	//========================
	//## システム変数からロード（データがあれば）
	//========================

	var sf = tyrano.plugin.kag.variable.sf;
	var left_map    = sf._config_mouse_gesture_left_map;
	var center_map  = sf._config_mouse_gesture_center_map;
	var right_map   = sf._config_mouse_gesture_right_map;
	var sensitivity = sf._config_mouse_gesture_sensitivity;
	if ( left_map   ) MG.set('left'  , left_map   );
	if ( center_map ) MG.set('center', center_map );
	if ( right_map  ) MG.set('right' , right_map  );
	if ( sensitivity ) MG.set('sensitivity', sensitivity );
	
}(gMouseGesture));

/*


#             ～　改造の手引き　～


■■
■■

ゲームの途中でジェスチャー設定を変更するために、
次の関数を使うことができます。

構文

	gMouseGesture.set( ボタン, 方向, ロール );

引数

	ボタン　　　…　文字列。"left", "center", "right" のいずれか。
	方向      　…　文字列。"nomove", "top", "left", "right", "bottom" のいずれか。
	ロール    　…　文字列または関数。

例
	
	gMouseGesture.set("right", "right", "config");



■■
■■

次の構文によって、まとめて登録することも可能です。

構文

	gMouseGesture.set( ボタン, パラメータ );

引数

	ボタン　　　…　文字列。"left", "center", "right" のいずれか
	パラメータ　…　オブジェクト。{ 方向: ロール } という構造にすること。

例
	
	gMouseGesture.set("center", {
		 right : "save"
		,left  : "load"
		,bottom: function(){
			alert("!");
		 }
	});



■■
■■

ゲームの途中でジェスチャー感度を変更するためには、
次の関数をお使いください。

構文

	gMouseGesture.set( "sensitive", 感度 );

引数

	感度　…　数値または文字列。何ピクセル動いたらジェスチャー認識するか。

例

	gMouseGesture.set( "sensitive", "100" );



■■
■■

ゲームの途中でジェスチャー設定を無効化するために、
次の関数を使うことができます。

※ [stop_keyconfig]タグはジェスチャーにも有効です。
   ですので、「演出の都合で一時的に止めたい」という場合には[stop_keyconfig]で十分です。
   以下の関数はユーザーにコンフィグ設定をしてもらう場合にお使いください。

構文

	gMouseGesture.off( ボタン );

引数

	ボタン　…　文字列。"left"、"center"、"right"のいずれか。
	            省略すると、すべてのボタンを一括して管理する「マスター設定」を無効化する。
	            ※「マスター設定」と「各ボタン個別の設定」が別個に存在する。

例

	gMouseGesture.off("right");



■■
■■

ゲームの途中でジェスチャー設定を有効化するために、
次の関数を使うことができます。

構文

	gMouseGesture.on( ボタン );

引数

	ボタン　…　文字列。"left"、"center"、"right"のいずれか。
	            省略すると、すべてのボタンを一括して管理する「マスター設定」を有効化する。
	            ※「マスター設定」と「各ボタン個別の設定」が別個に存在する。

例

	gMouseGesture.on();

*/