// 厳格モード
"use strict";





var KEYWORD = {
	"mode": ["",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	],
	"in_method": ["",
		"fadeIn",
		"fadeInDown",
		"fadeInLeft",
		"fadeInRight",
		"fadeInUp",
		"lightSpeedIn",
		"rotateIn",
		"rotateInDownLeft",
		"rotateInDownRight",
		"rotateInUpLeft",
		"rotateInUpRight",
		"zoomIn",
		"zoomInDown",
		"zoomInLeft",
		"zoomInRight",
		"zoomInUp",
		"slideInDown",
		"slideInLeft",
		"slideInRight",
		"slideInUp",
		"bounceIn ",
		"bounceInDown",
		"bounceInLeft",
		"bounceInRight",
		"bounceInUp",
		"rollIn",
		"flipInX",
		"flipInY"
	],
	"out_method": ["",
		"fadeOut",
		"fadeOutDownBig",
		"fadeOutLeftBig",
		"fadeOutRightBig",
		"fadeOutUpBig",
		"lightSpeedOut",
		"rotateOut",
		"rotateOutDownLeft",
		"rotateOutDownRight",
		"rotateOutUpLeft",
		"rotateOutUpRight",
		"zoomOut",
		"zoomOutDown",
		"zoomOutLeft",
		"zoomOutRight",
		"zoomOutUp",
		"slideOutDown",
		"slideOutLeft",
		"slideOutRight",
		"slideOutUp",
		"bounceOut ",
		"bounceOutDown",
		"bounceOutLeft",
		"bounceOutRight",
		"bounceOutUp",
		"rollOut",
		"flipOutX",
		"flipOutY"
	],
	"effect": ["",
		"linear",
		"easeInSine",
		"easeOutSine",
		"easeInOutSine",
		"easeInQuad",
		"easeOutQuad",
		"easeInOutQuad",
		"easeInCubic",
		"easeOutCubic",
		"easeInOutCubic",
		"easeInQuart",
		"easeOutQuart",
		"easeInOutQuart",
		"easeInQuint",
		"easeOutQuint",
		"easeInOutQuint",
		"easeInExpo",
		"easeOutExpo",
		"easeInOutExpo",
		"easeInCirc",
		"easeOutCirc",
		"easeInOutCirc",
		"easeInBack",
		"easeOutBack",
		"easeInOutBack",
		"easeInElastic",
		"easeOutElastic",
		"easeInOutElastic",
		"easeInBounce",
		"easeOutBounce",
		"easeInOutBounce"
	],
	"easing": ["",
		"ease",
		"linear",
		"ease-in",
		"ease-out",
		"ease-in-out",
		"cubic-bezier(0.47, 0, 0.745, 0.715)",
		"cubic-bezier(0.39, 0.575, 0.565, 1)",
		"cubic-bezier(0.445, 0.05, 0.55, 0.95)",
		"cubic-bezier(0.55, 0.085, 0.68, 0.53)",
		"cubic-bezier(0.25, 0.46, 0.45, 0.94)",
		"cubic-bezier(0.455, 0.03, 0.515, 0.955)",
		"cubic-bezier(0.55, 0.055, 0.675, 0.19)",
		"cubic-bezier(0.215, 0.61, 0.355, 1)",
		"cubic-bezier(0.645, 0.045, 0.355, 1)",
		"cubic-bezier(0.895, 0.03, 0.685, 0.22)",
		"cubic-bezier(0.165, 0.84, 0.44, 1)",
		"cubic-bezier(0.77, 0, 0.175, 1)",
		"cubic-bezier(0.755, 0.05, 0.855, 0.06)",
		"cubic-bezier(0.23, 1, 0.32, 1)",
		"cubic-bezier(0.86, 0, 0.07, 1)",
		"cubic-bezier(0.95, 0.05, 0.795, 0.035)",
		"cubic-bezier(0.19, 1, 0.22, 1)",
		"cubic-bezier(1, 0, 0, 1)",
		"cubic-bezier(0.6, 0.04, 0.98, 0.335)",
		"cubic-bezier(0.075, 0.82, 0.165, 1)",
		"cubic-bezier(0.785, 0.135, 0.15, 0.86)",
		"cubic-bezier(0.6, -0.28, 0.735, 0.045)",
		"cubic-bezier(0.175, 0.885, 0.32, 1.275)",
		"cubic-bezier(0.68, -0.55, 0.265, 1.55)"
	],
	"in_effect": ["",
		"flash",
		"bounce",
		"shake",
		"tada",
		"swing",
		"wobble",
		"pulse",
		"flip",
		"hinge",
		"flipInX",
		"flipInY",
		"fadeIn",
		"fadeInUp",
		"fadeInDown",
		"fadeInLeft",
		"fadeInRight",
		"fadeInUpBig",
		"fadeInDownBig",
		"fadeInLeftBig",
		"fadeInRightBig",
		"bounceIn",
		"bounceInDown",
		"bounceInUp",
		"bounceInLeft",
		"bounceInRight",
		"rotateIn",
		"rotateInDownLeft",
		"rotateInDownRight",
		"rotateInUpLeft",
		"rotateInUpRight",
		"rollIn"
	],
	"out_effect": ["",
		"flash",
		"bounce",
		"shake",
		"tada",
		"swing",
		"wobble",
		"pulse",
		"flip",
		"hinge",
		"flipOutX",
		"flipOutY",
		"fadeOut",
		"fadeOutUp",
		"fadeOutDown",
		"fadeOutLeft",
		"fadeOutRight",
		"fadeOutUpBig",
		"fadeOutDownBig",
		"fadeOutLeftBig",
		"fadeOutRightBig",
		"bounceOut",
		"bounceOutDown",
		"bounceOutUp",
		"bounceOutLeft",
		"bounceOutRight",
		"rotateOut",
		"rotateOutDownLeft",
		"rotateOutDownRight",
		"rotateOutUpLeft",
		"rotateOutUpRight",
		"rollOut"
	]
};



var TAG_KEYWORD = {
	"layermode": {
		"mode": KEYWORD.mode
	},
	"layermode_movie": {
		"mode": KEYWORD.mode
	},
	"mask": {
		"effect": KEYWORD.in_method
	},
	"mask_off": {
		"effect": KEYWORD.out_method
	},
	"bg": {
		"method": KEYWORD.in_method
	},
	"trans": {
		"method": KEYWORD.in_method
	},
	"anim": {
		"effect": KEYWORD.effect
	},
	"chara_move": {
		"effect": KEYWORD.effect
	},
	"mtext": {
		"in_effect": KEYWORD.in_effect,
		"out_effect": KEYWORD.out_effect
	},
	"kanim": {
		"easing": KEYWORD.easing
	},
	"camera": {
		"ease_type": KEYWORD.easing
	},
	"reset_camera": {
		"ease_type": KEYWORD.easing
	}
};





// 即時関数
(function(){
	
	
	
	// Windowオブジェクトについては右記のサイトが参考になる：https://github.com/nwjs/nw.js/wiki/window
	// global.__tempriderが定義されていなければテンプライダーウィンドウを開く
	if (!global.__temprider || !global.__temprider.tmpr) {
		
		var temprider;
		
		if (TYRANO.kag.stat.mp.temprider !== "false") {
			temprider = require("nw.gui").Window.open("./data/others/plugin/temprider/view.html", {
				"title"   : "TempRider",
				"toolbar" : false,
				"position": "center",
				"frame"   : true,
				"width"   : parseInt(TYRANO.kag.stat.mp.width)||260,
				"height"  : parseInt(TYRANO.kag.stat.mp.height)||600,
			});
		};
		
		
		// 開いたらすぐさまglobal.__tempriderを定義
		global.__temprider = {
			// ティラノライダーのWindowオブジェクト
			"rider": global.__nwWindowsStore["1"],
			// ゲームプレビュー画面のWindowオブジェクト
			"game" : require("nw.gui").Window.get(),
			// テンプライダーウィンドウを開き、その返り値であるWindowオブジェクトを格納
			"tmpr" : temprider
			// ↑このへんのプロパティについては右記サイトを参考：https://github.com/nwjs/nw.js/wiki/manifest-format
		};
		
		
		
		// 各Windowオブジェクトを短く参照できるようにしておく
		window.rWin = global.__temprider["rider"];
		window.gWin = global.__temprider["game"];
		window.tWin = global.__temprider["tmpr"];
		
		
		
		if (tWin) {
		
		
			// ウィンドウを閉じるとき用の関数
			var close = function () {
				global.__temprider = undefined;
				tWin.close(true);
				this.close(true);
			};
			
			// ゲームウィンドウを閉じるとき、テンプライダーウィンドウも閉じる
			gWin.on("close", close);
			
			
			// ティラノライダーウィンドウの「ゲーム開始」ボタンがクリックされたとき、
			// テンプライダーウィンドウを閉じる
			rWin.window.$(".button_preview").off("click.temputa");
			rWin.window.$(".button_preview").on("click.tempura", close);
			
			
			
			//# テンプライダーのイベントセット
			
			
			// テンプライダーウィンドウが読み込まれたら、
			// ボタンにイベントハンドラをセットしていく
			tWin.on("loaded", function() {
				
				
				
				
				// $$ … テンプライダーウィンドウにおけるjQueryオブジェクト
				// テンプライダーウィンドウのDOMはこれで操作することができる
				var $$ = tWin.window.$;
				
				
				
				
				$$.temp_data = [];
				
				
				
				
				//## タグを使用する
				var use = function (tag_name, pm, is_wait) {
					// ==========================================
					var $ = gWin.window.$;
					var that = gWin.window.TYRANO.kag.menu;
					that.snapSave("", function() {
						var data = that.snap;
						data.save_date = $.getNowDate() + "　" + $.getNowTime();
						$$.temp_data.push($.extend(true, {}, data));
						if ($$.temp_data.length > 100) $$.temp_data.shift();
					}, "false");
					if (!pm) pm = {};
					if (!is_wait) {
						$.extend(pm, {
							 "wait": "false"
							,"time": "0"
						});
					};
					var TYRANO = gWin.window.TYRANO;
					var that = TYRANO.kag.ftag;
					var tag = {
						name: tag_name,
						pm: pm
					};
					// ==========================================
					if((tag.name=="call" && tag.pm.storage=="make.ks") || that.kag.stat.current_scenario=="make.ks"){
					    if(that.kag.stat.flag_ref_page==true){
					        that.kag.tmp.loading_make_ref = true;
					        that.kag.stat.flag_ref_page = false;
					    }
					}else{
					    if (that.kag.stat.flag_ref_page == true) {
					        that.kag.stat.flag_ref_page = false;
					        that.kag.stat.log_clear = true;
					        that.kag.ftag.hideNextImg();
					        that.kag.getMessageInnerLayer().html("");
					    }
					}
					if (that.checkCond(tag) != true) {
					    return;
					}
					if (that.kag.stat.is_hide_message == true) {
					    that.kag.layer.showMessageLayers();
					    that.kag.stat.is_hide_message = false;
					}
					if (that.master_tag[tag.name]) {
					    tag.pm = that.convertEntity(tag.pm);
					    var err_str = that.checkVital(tag);
					    if(that.master_tag[tag.name].log_join){
					        that.kag.stat.log_join = "true";
					    }else{
					        if(tag.name=="text"){
					        }else{
					            that.kag.stat.log_join ="false";
					        }
					    }
					    if (that.checkCw(tag)) {
					        that.kag.layer.layer_event.show();
					    }
					    if (err_str != "") {
					        that.kag.error(err_str);
					    } else {
					        that.master_tag[tag.name].start($.extend(true, $.cloneObject(that.master_tag[tag.name].pm), tag.pm));
					    }
					} else if (that.kag.stat.map_macro[tag.name]) {
					    tag.pm = that.convertEntity(tag.pm);
					    var pms = tag.pm;
					    var map_obj = that.kag.stat.map_macro[tag.name];
					    var back_pm = {};
					    back_pm.index = that.kag.ftag.current_order_index;
					    back_pm.storage = that.kag.stat.current_scenario;
					    back_pm.pm = pms;
					    // ================================
					    // マクロが終わったらストップしよう
					    back_pm.auto_next = "stop";
					    // ================================
					    that.kag.stat.mp = pms;
					    that.kag.pushStack("macro", back_pm);
					    that.kag.ftag.nextOrderWithIndex(map_obj.index, map_obj.storage);
					} else {
					    $.error_message($.lang("tag")+"：[" + tag.name + "]"+$.lang("not_exists"));
					}
				};
				
				
				//## タグの文字列を生成する関数
				var makeTagStr = function (tag_name, pm) {
					var str = "[" + tag_name;
					for (var key in pm) {
						str += " " + key + "=\"" + pm[key] + "\"";
					};
					return str + "]";
				};
				
				
				
				//## いっこもどる
				$$(".prev").click(function () {
					var $ = gWin.window.$;
					var that = gWin.window.TYRANO.kag.menu;
					var data = $$.temp_data.pop();
					if (!data) return false;
					that.kag.menu.loadGameData($.extend(true, {}, data));
					TYRANO.kag.stat.is_click_text = TYRANO.kag.stat.is_adding_text = false;
							if (tWin.is_notime) {
								tWin.temp_ch_speed_def = TYRANO.kag.config.chSpeed;
								tWin.temp_ch_speed = TYRANO.kag.stat.ch_speed;
								tWin.temp_chara_time = TYRANO.kag.stat.chara_time;
								TYRANO.kag.config.chSpeed = "0";
								TYRANO.kag.stat.chara_time = "0";
								TYRANO.kag.stat.ch_speed = "0";
							} else {
								if (typeof tWin.temp_ch_speed_def !== "undefined") TYRANO.kag.config.chSpeed = tWin.temp_ch_speed_def;
								if (typeof tWin.temp_ch_speed !== "undefined") TYRANO.kag.stat.ch_speed = tWin.temp_ch_speed;
								if (typeof tWin.temp_chara_time !== "undefined") TYRANO.kag.stat.chara_time = tWin.temp_chara_time;
							};
				});
				
				
				
				//## ベースレイヤーをクリアする
				$$(".freeimage_base").click(function () {
					use("freeimage", {
						"layer": "base"
					})
				});
				
				
				//## レイヤー０をクリアする
				$$(".freeimage_0").click(function () {
					use("freeimage", {
						"layer": "0"
					})
				});
				
				//## レイヤー１をクリアする
				$$(".freeimage_1").click(function () {
					use("freeimage", {
						"layer": "1"
					})
				});

				//## レイヤー２をクリアする
				$$(".freeimage_2").click(function () {
					use("freeimage", {
						"layer": "2"
					})
				});
				
				//## レイヤーモードをクリアする
				$$(".free_layermode").click(function () {
					use("free_layermode")
				});
				
				//## カメラをリセットする
				$$(".reset_camera").click(function () {
					use("reset_camera")
				});
				
				//## フィルターをクリアする
				$$(".free_filter").click(function () {
					use("free_filter")
				});
				
				//## メッセージ、ボタン、フリーレイヤーなどをクリアする
				$$(".cm").click(function () {
					use("cm")
				});
				
				//## ゲームを停止させる
				$$(".pause").click(function () {
					var TYRANO = gWin.window.TYRANO;
					TYRANO.kag.stat.is_strong_stop = true;
					TYRANO.kag.layer.hideEventLayer()
				});
				
				//## 停止させていたゲームを再開する
				$$(".play").click(function () {
					var TYRANO = gWin.window.TYRANO;
					TYRANO.kag.stat.is_wait = false;
					TYRANO.kag.stat.is_stop = false;
					TYRANO.kag.stat.is_strong_stop = false;
					TYRANO.kag.stat.is_click_text = false;
					TYRANO.kag.stat.is_adding_text = false;
					TYRANO.kag.layer.showEventLayer()
				});
				
				//## fixボタンをクリアする
				$$(".clearfix").click(function () {
					use("clearfix")
				});
				
				var j_onebyone = $$(".onebyone");
				var j_do = $$(".do");
				var j_time_0 = $$(".time_0");
				var j_prevdo = $$(".prevdo");
				var j_prev = $$(".prev");
				
				//## タグを実行する
				$$(".do").click(function () {
					if (j_prevdo.prop("checked")) {
						$$(".prev").click();
					};
					var TYRANO = gWin.window.TYRANO;
					var $ = gWin.window.$;
					var tag_name = $.trim($$(".ipt_do").val());
					var param = {};
					if (tag_name.charAt(0) == "[" || tag_name.charAt(0) == "@") {
						var tag;
						if (tag_name.charAt(0) == "[") {
							tag = TYRANO.kag.parser.makeTag(tag_name.substr(1, tag_name.length - 2));
						}
						else {
							tag = TYRANO.kag.parser.makeTag(tag_name.substr(1, tag_name.length));
						}
						tag_name = tag.name;
						param = tag.pm;
					};					
					var len = $$(".ipt_pa").size();
					for (var i = 1; i <= len; i++) {
						var param_name = $$(".ipt_pa" + i).val();
						var param_value = $$(".ipt_pb" + i).val();
						if (param_name) {
							param[param_name] = param_value;
						};
					};
					var tag_str = makeTagStr(tag_name, param);
					if (j_time_0.prop("checked")) {
						param.time = "0";
					};
					require("nw.gui").Clipboard.get().set(tag_str, "text");
					use(tag_name, param, true);
				});
				
				//## キーダウン
				var fn_keydown = function (e) {
					var $ = gWin.window.$;
					var j_this = $(this);
					this.keyCode = e.keyCode;
					switch (this.keyCode) {
					case 38: // うえ
					case 40: // した
						// タグ名を取得
						var tag_name = $.trim($$(".ipt_do").val() || "");
						if (tag_name.charAt(0) == "[" || tag_name.charAt(0) == "@") {
							tag_name = tag_name.substring(1, tag_name.length);
							tag_name = tag_name.split(" ")[0];
						};
						// タグ名が特定できなければ帰る
						if (tag_name == "") return false;
						
						if (j_this.hasClass("ipt_pa")) {
						}
						else {
							// 入力されている文字を取得
							var str = this.value;
							var pre_str = str;
							var new_str = str;
							var a = this.selectionStart;
							var b = this.selectionEnd;
							var c = str.length;
							
							
							// 属性名を特定
							var pm_name = "";
							if (j_this.hasClass("ipt_pb")) {
								pm_name = j_this.prev().val() || "";
							};
							// 属性名があるなら
							if (pm_name != "" && TAG_KEYWORD[tag_name] && TAG_KEYWORD[tag_name][pm_name]) {
								var arr = TAG_KEYWORD[tag_name][pm_name];
								for (var i = 0; i < arr.length; i++) {
									if (arr[i] === str) {
										i += arr.length;
										if (this.keyCode == 38) i = (i - 1) % arr.length;
										else if (this.keyCode == 40) i = (i + 1) % arr.length;
										new_str = arr[i];
										a = b = new_str.length;
										break;
									};
								};
							}
							else {
								if (a == b) {
									var str1 = str.substring(0, a - 1);
									var str2 = str.substring(a - 1, a);
									var str3 = str.substring(a, c);
									var num = parseInt(str2);
									if (!isNaN(num)) {
										if (this.keyCode == 38) num++;
										else if (this.keyCode == 40) num--;
										if (num >= 10) num = 0;
										if (num <= -1) num = 9;
									}
									else num = str2;
									new_str = str1 + num + str3;
								}
								else {
									var str1 = str.substring(0, a);
									var str2 = str.substring(a, b);
									var str3 = str.substring(b, c);
									var num = parseInt(str2);
									if (!isNaN(num)) {
										var t_num = num;
										if (this.keyCode == 38) num++;
										else if (this.keyCode == 40) num--;
										if (("" + num).length > ("" + t_num).length) {
											b++;
										}
										else if (("" + num).length < ("" + t_num).length) {
											b--;
										};
									}
									else num = str2;
									new_str = str1 + num + str3;
								};
							};
							if (pre_str !== new_str) {
								this.value = new_str;
								this.setSelectionRange(a, b);
								if (j_onebyone.prop("checked") && this.keyCode != 8) {
									j_do.click();
								};
							};
						};
						return false;
						break;
					default:
						break;
					};
				};
				$$(".ipt_p,.ipt_do").on("keydown", fn_keydown);
				
				
				
				//## 入力
				var fn_input = function (e) {
					// 入力するたび実行モード、かつBackSpaceキーの入力ではないならば
					if (j_onebyone.prop("checked") && this.keyCode != 8) {
						j_do.click();
					};
					//var j_focused = $$(tWin.window.document.activeElement);
				};
				$$(".ipt_p,.ipt_do").on("input", fn_input);
				
				
				//## タグのパラメータをクリアする
				$$(".cleaript").click(function () {
					$$(".ipt_p,.ipt_do").val("");
				});
				
				//## タグのパラメータを追加する
				$$(".plus").click(function () {
					var TYRANO = gWin.window.TYRANO;
					var $ = gWin.window.$;
					var len = $$(".ipt_pa").size() + 1;
					var html_str = ""
					+   '<span class="ipt_span">'
					+	'<input class="ipt_p ipt_pa ipt_pa' + len + '" placeholder="属性名' + len + '"></input>\n'
					+	'<input class="ipt_p ipt_pb ipt_pb' + len + '" placeholder="属性値' + len + '"></input><br>'
					+   '</span>';
					var j_obj = $(html_str);
					$$(".frm_do").append(j_obj);
					j_obj.find("input").on("keydown", fn_keydown);
					j_obj.find("input").on("input", fn_input);
				});
				$$(".minus").click(function () {
					var j_span = $$(".ipt_span");
					j_span.eq(j_span.length - 1).remove();
				});
				
				//## 要素を削除する
				$$(".free").click(function () {
					var gWin   = global.__temprider["game"];
					var $      = gWin.window.$;
					var TYRANO = gWin.window.TYRANO;
					var that   = gWin.window.TYRANO.kag.menu;
					var name   = $$(".ipt_free").val();
					var tWin = global.__temprider["tmpr"];
					var temp_ch_speed_def = TYRANO.kag.config.chSpeed;
					var temp_ch_speed = TYRANO.kag.stat.ch_speed;
					var temp_chara_time = TYRANO.kag.stat.chara_time;
					if (typeof tWin.temp_ch_speed_def !== "undefined") TYRANO.kag.config.chSpeed = tWin.temp_ch_speed_def;
					if (typeof tWin.temp_ch_speed !== "undefined") TYRANO.kag.stat.ch_speed = tWin.temp_ch_speed;
					if (typeof tWin.temp_chara_time !== "undefined") TYRANO.kag.stat.chara_time = tWin.temp_chara_time;
					that.snapSave("", function() {
						var data = that.snap;
						data.save_date = $.getNowDate() + "　" + $.getNowTime();
						$$.temp_data.push($.extend(true, {}, data));
						if ($$.temp_data.length > 100) $$.temp_data.shift();
						$("." + name).remove();
						TYRANO.kag.config.chSpeed = temp_ch_speed_def;
						TYRANO.kag.stat.ch_speed = temp_ch_speed;
						TYRANO.kag.stat.chara_time = temp_chara_time;
					}, "false");
				});
				
				//## セーブする
				$$(".save").click(function() {
					var tWin = global.__temprider["tmpr"];
					var temp_ch_speed_def = TYRANO.kag.config.chSpeed;
					var temp_ch_speed = TYRANO.kag.stat.ch_speed;
					var temp_chara_time = TYRANO.kag.stat.chara_time;
					if (typeof tWin.temp_ch_speed_def !== "undefined") TYRANO.kag.config.chSpeed = tWin.temp_ch_speed_def;
					if (typeof tWin.temp_ch_speed !== "undefined") TYRANO.kag.stat.ch_speed = tWin.temp_ch_speed;
					if (typeof tWin.temp_chara_time !== "undefined") TYRANO.kag.stat.chara_time = tWin.temp_chara_time;
					var $ = gWin.window.$;
					var that = gWin.window.TYRANO.kag.menu;
					that.snapSave("", function() {
						var data = that.snap;
						data.save_date = $.getNowDate() + "　" + $.getNowTime();
						$.setStorage(that.kag.config.projectID + "_temprider", data, that.kag.config.configSave);
						TYRANO.kag.config.chSpeed = temp_ch_speed_def;
						TYRANO.kag.stat.ch_speed = temp_ch_speed;
						TYRANO.kag.stat.chara_time = temp_chara_time;
					}, "false");
				});
				
				//## ロードする
				$$(".load").click(function() {
					var $ = gWin.window.$;
					var that = gWin.window.TYRANO.kag.menu;
					var data = $.getStorage(that.kag.config.projectID + "_temprider", that.kag.config.configSave);
					if (data) data = JSON.parse(data);
					else return false;
					that.kag.menu.loadGameData($.extend(true, {}, data));
					TYRANO.kag.stat.is_click_text = TYRANO.kag.stat.is_adding_text = false;
							if (tWin.is_notime) {
								tWin.temp_ch_speed_def = TYRANO.kag.config.chSpeed;
								tWin.temp_ch_speed = TYRANO.kag.stat.ch_speed;
								tWin.temp_chara_time = TYRANO.kag.stat.chara_time;
								TYRANO.kag.config.chSpeed = "0";
								TYRANO.kag.stat.chara_time = "0";
								TYRANO.kag.stat.ch_speed = "0";
							} else {
								if (typeof tWin.temp_ch_speed_def !== "undefined") TYRANO.kag.config.chSpeed = tWin.temp_ch_speed_def;
								if (typeof tWin.temp_ch_speed !== "undefined") TYRANO.kag.stat.ch_speed = tWin.temp_ch_speed;
								if (typeof tWin.temp_chara_time !== "undefined") TYRANO.kag.stat.chara_time = tWin.temp_chara_time;
							};
				});
				
				//## 開発者ツールを開く
				$$(".devtool").click(function() {
					gWin.showDevTools();
				});
				
				//## 更新する
				$$(".reload").click(function() {
					gWin.reload();
				});
				
				//## 更新＋ロードする
				$$(".reload2").click(function() {
					tWin.is_load = true;
					gWin.reload();
				});
				
				
				// ファイルの書き出しについては右記サイトを参照：https://nodejs.org/api/fs.html
				
				//## スクリーンショットを撮影する
				$$(".scshot").click(function() {
					var project_path = rWin.window.app.getGameUrl().replace("index.html", "");
					var file_name = "screenshot_" + $.getNowDate().replace(/\//g, "-") + "-" + $.getNowTime().replace(/:|：/g, "-") + ".png";
					var gui = require("nw.gui");
					var win = gui.Window.get();
					win.capturePage(function(buffer){
						require("fs").writeFile(project_path + file_name, buffer, function (err) {
							if (err) throw err;
							console.log('It\'s saved!');
						});
					}, {
						format : "png",
						datatype : "buffer"
					});
				});
				
				
				//## 変数リストを書き出します。
				$$(".writevar").click(function() {
					var variable = {};
					variable.sf = $.extend(true, {}, TYRANO.kag.variable.sf);
					variable.f  = $.extend(true, {}, TYRANO.kag.stat.f);
					var variable_str = JSON.stringify(variable, null, "    ");
					var project_path = rWin.window.app.getGameUrl().replace("index.html", "");
					var file_name = "variable_" + $.getNowDate().replace(/\//g, "-") + "-" + $.getNowTime().replace(/:|：/g, "-") + ".json";
					require("fs").writeFile(project_path + file_name, variable_str, function (err) {
						if (err) throw err;
						console.log('It\'s saved!');
					});
				});
				
				
				//## 変数リストを書き出します。
				$$(".open").click(function() {
					var project_path = rWin.window.app.getGameUrl();
					require("nw.gui").Shell.showItemInFolder(project_path);
				});
				
				//## 強制ノータイム
				$$(".notime").click(function() {
					var TYRANO = gWin.window.TYRANO;
					var prop = $$(this).prop('checked');
					tWin.is_notime = prop;
					if (prop) {
						tWin.temp_ch_speed_def = TYRANO.kag.config.chSpeed;
						tWin.temp_ch_speed = TYRANO.kag.stat.ch_speed;
						tWin.temp_chara_time = TYRANO.kag.stat.chara_time;
						TYRANO.kag.config.chSpeed = "0";
						TYRANO.kag.stat.chara_time = "0";
						TYRANO.kag.stat.ch_speed = "0";
					} else {
						if (typeof tWin.temp_ch_speed_def !== "undefined") TYRANO.kag.config.chSpeed = tWin.temp_ch_speed_def;
						if (typeof tWin.temp_ch_speed !== "undefined") TYRANO.kag.stat.ch_speed = tWin.temp_ch_speed;
						if (typeof tWin.temp_chara_time !== "undefined") TYRANO.kag.stat.chara_time = tWin.temp_chara_time;
					};
				});
				
				
				// イベントハンドラセットおしまい
				
				//## テンプライダーウィンドウを移動させる
				var x = parseInt(TYRANO.kag.stat.mp.x);
				var y = parseInt(TYRANO.kag.stat.mp.y);
				if (typeof x === "number" && typeof y === "number") {
					this.moveTo(x, y);
				};
				
				
				
				
				// 開発者ツールをいま開く
				//this.showDevTools();
				//rWin.showDevTools();
				//gWin.showDevTools();
				
				
				
				global.__temprider.loaded = true;
			
			
			
			
			
				
			}); // イベントハンドラのセット終わり
		
		};
		
		
		//# ティラノライダーの改造
		// ティラノライダーウィンドウに要素を追加する
		// $$ … ここではティラノライダーウィンドウのjQueryオブジェクトを指す
		var $$ = rWin.window.$;
		// この処理は一度だけでいい
		if ($$("#tempura").size() < 1) {
			rWin.enable_toolbar = false;
			
			// ボタンを追加
			var button_area = $$("#button_select_project").parent();
			button_area.prepend('<img id="tempura" style="margin: -5px 3px 0px 7px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAcklEQVRIx2NgGApgGw/Df2xsqlsAomlmATZMU8PDWWloAdUM/38Au+FUtQDZEpoYDsM0NRyET0yjseEUW4DNYKoYjstgqgQNMYaTbQFNDCdk6Ag1nFgL6BKhFCVJkGZchlIlp2IzkKoWELKEgZqAmoYDANKHtRUrjRuvAAAAAElFTkSuQmCC" />');
			button_area.append('<input type="button" class="button_preview_notool" value="ツールバーなしでゲーム開始">');
			
			// ツールバーなしでゲーム開始
			$$(".button_preview_notool").click(function(){
				rWin.enable_toolbar = false;
				var e = rWin.window.app.getGameUrl();
				if ("" == e) return void $.alert("プロジェクトファイルを選択してください");
				rWin.window.app.io.exists(e) || $.alert("プロジェクトファイルが存在しません"), rWin.window.app.config.loadTyranoConfig();
				var a = rWin.window.app.tyrano.config.scWidth,
					t = rWin.window.app.tyrano.config.scHeight,
					i = rWin.window.app.gui.getModal("preview");
				i && rWin.window.app.gui.closeModal("preview");
				var o = rWin.window.app.gui.openWindow("file://" + e, {
					title: "preview",
					width: parseInt(a),
					height: parseInt(t),
					toolbar: false,
					menu: !1
				});
				rWin.window.app.gui.addModal("preview", o)
			});
			
			// ツールバーありでゲーム開始
			rWin.window.app.previewGame = function () {
				rWin.enable_toolbar = true;
				var e = rWin.window.app.getGameUrl();
				if ("" == e) return void $.alert("プロジェクトファイルを選択してください");
				rWin.window.app.io.exists(e) || $.alert("プロジェクトファイルが存在しません"), rWin.window.app.config.loadTyranoConfig();
				var a = rWin.window.app.tyrano.config.scWidth,
					t = rWin.window.app.tyrano.config.scHeight,
					i = rWin.window.app.gui.getModal("preview");
				i && rWin.window.app.gui.closeModal("preview");
				var o = rWin.window.app.gui.openWindow("file://" + e, {
					title: "preview",
					width: parseInt(a),
					height: parseInt(t),
					menu: !1
				});
				rWin.window.app.gui.addModal("preview", o)
			};
			rWin.enable_toolbar = true;
		};
	};
}());









//## wait=0の上書き関連
TYRANO.kag.ftag.nextOrder = function() {
    this.kag.layer.layer_event.hide();
    var that = this;
    if (this.kag.stat.is_strong_stop == true) {
        return false;
    }
    try {
        this.current_order_index++;
        if (this.array_tag.length <= this.current_order_index) {
            this.kag.endStorage();
            return false;
        }
        var tag = $.cloneObject(this.array_tag[this.current_order_index]);
        this.kag.stat.current_line = tag.line;
        if(this.kag.is_rider){
            tag.ks_file = this.kag.stat.current_scenario;
            this.kag.rider.pushConsoleLog(tag);
        }else{
            this.kag.log("**:" + this.current_order_index + "　line:" + tag.line);
            this.kag.log(tag);
        }
        if((tag.name=="call" && tag.pm.storage=="make.ks") || this.kag.stat.current_scenario=="make.ks"){
            if(this.kag.stat.flag_ref_page==true){
                this.kag.tmp.loading_make_ref = true;
                this.kag.stat.flag_ref_page = false;
            }
        }else{
            if (this.kag.stat.flag_ref_page == true) {
                this.kag.stat.flag_ref_page = false;
                this.kag.stat.log_clear = true;
                this.kag.ftag.hideNextImg();
                this.kag.getMessageInnerLayer().html("");
            }
        }
        if (this.checkCond(tag) != true) {
            this.nextOrder();
            return;
        }
        if (this.kag.stat.is_hide_message == true) {
            this.kag.layer.showMessageLayers();
            this.kag.stat.is_hide_message = false;
        }
        if (this.master_tag[tag.name]) {
            tag.pm = this.convertEntity(tag.pm);
            var err_str = this.checkVital(tag);
            if(this.master_tag[tag.name].log_join){
                this.kag.stat.log_join = "true";
            }else{
                if(tag.name=="text"){
                }else{
                    this.kag.stat.log_join ="false";
                }
            }
            if (this.checkCw(tag)) {
                this.kag.layer.layer_event.show();
            }
            if (err_str != "") {
                this.kag.error(err_str);
            } else {
            	// =============
            	// ここで上書き
				if (global.__temprider && global.__temprider["tmpr"] && global.__temprider["tmpr"].is_notime) {
					var pm = $.extend(true, $.cloneObject(this.master_tag[tag.name].pm), tag.pm);
					$.extend(pm, {
						time: "0",
						speed: "0"
					});
					this.master_tag[tag.name].start(pm);
				}
				else {
					this.master_tag[tag.name].start($.extend(true, $.cloneObject(this.master_tag[tag.name].pm), tag.pm));
            	}
            	// =============
            }
        } else if (this.kag.stat.map_macro[tag.name]) {
            tag.pm = this.convertEntity(tag.pm);
            var pms = tag.pm;
            var map_obj = this.kag.stat.map_macro[tag.name];
            var back_pm = {};
            back_pm.index = this.kag.ftag.current_order_index;
            back_pm.storage = this.kag.stat.current_scenario;
            back_pm.pm = pms;
            this.kag.stat.mp = pms;
            this.kag.pushStack("macro", back_pm);
            this.kag.ftag.nextOrderWithIndex(map_obj.index, map_obj.storage);
        } else {
            $.error_message($.lang("tag")+"：[" + tag.name + "]"+$.lang("not_exists"));
            this.nextOrder();
        }
    } catch(e) {
        console.log(e);
        that.kag.error($.lang("error_occurred"));
    }
};




TYRANO.kag.tag.endmacro.start = function(pm) {

    //解析チェック中にここに来た場合は、なにもしない
    if (this.kag.tmp.checking_macro == true) {
        this.kag.tmp.checking_macro = false;
        this.kag.ftag.nextOrder();
        return;
    }

    var map_obj = this.kag.getStack("macro");
    //最新のコールスタックを取得

    //もし、スタックが溜まっている状態なら、
    if (map_obj) {

        //呼び出し元に戻る
        this.kag.popStack("macro");
        this.kag.stat.mp = this.kag.getStack("macro");
        //参照用パラメータを設定
        
        this.kag.ftag.nextOrderWithIndex(map_obj.index, map_obj.storage, true, undefined, map_obj.auto_next);
       
        if (map_obj.auto_next == "stop") {
        	this.kag.stat.is_strong_stop = false;
        	this.kag.layer.showEventLayer();
        };
        //スタックを奪い取る

        
    } else {

        //呼び出し元がない場合、普通に次の処理を行えば良い
        //endmacroの場合はだめじゃないでしょうか。。。
        //this.kag.ftag.nextOrder();

    }

};




//# キャッシュを無効にしたい
var enable_cache = (TYRANO.kag.stat.mp.cache === "false") ? false : true;
TYRANO.kag.loadScenario = function (file_name, call_back) {
	var that = this;
	this.stat.is_strong_stop = true;
	this.stat.current_scenario = file_name;
	var file_url = "";
	if ($.isHTTP(file_name)) file_url = file_name;
	else file_url = "./data/scenario/" + file_name;
	if (enable_cache && that.cache_scenraio[file_url]) {
		if (call_back) {
			var result_obj = that.cache_scenraio[file_url];
			var tag_obj = result_obj.array_s;
			var map_label = result_obj.map_label;
			that.stat.map_label = map_label;
			that.stat.is_strong_stop = false;
			call_back(tag_obj)
		}
	} else $.loadText(file_url, function (text_str) {
		var result_obj = that.parser.parseScenario(text_str);
		that.cache_scenraio[file_url] = result_obj;
		var tag_obj = result_obj.array_s;
		var map_label = result_obj.map_label;
		that.stat.map_label = map_label;
		that.stat.is_strong_stop = false;
		if (call_back) call_back(tag_obj)
	})
};



//# 画面の移動とサイズ変更
(function(){
	var mp = TYRANO.kag.stat.mp;
	var x = parseInt(mp.g_x);
	var y = parseInt(mp.g_y);
	var w = parseInt(mp.g_width  || TYRANO.kag.config.scWidth);
	var h = parseInt(mp.g_height || TYRANO.kag.config.scHeight);
	if (global.__temprider && global.__temprider["rider"] && global.__temprider && global.__temprider["rider"].enable_toolbar == false) {
		resizeTo(w + 16, h + 40);
	} else {
		resizeTo(w + 16, h + 78);
	};
	if (typeof x === "number" && typeof y === "number") {
		moveTo(x, y);
	};
}());





//# 更新＋ロード
(function(){
	if (global.__temprider && global.__temprider.loaded == true) {
		var gWin = global.__temprider["game"];
		var tWin = global.__temprider["tmpr"];
		var TYRANO = gWin.window.TYRANO;
		if (tWin.is_notime) {
			tWin.temp_ch_speed_def = TYRANO.kag.config.chSpeed;
			tWin.temp_ch_speed = TYRANO.kag.stat.ch_speed;
			tWin.temp_chara_time = TYRANO.kag.stat.chara_time;
			TYRANO.kag.config.chSpeed = "0";
			TYRANO.kag.stat.chara_time = "0";
			TYRANO.kag.stat.ch_speed = "0";
		} else {
			if (typeof tWin.temp_ch_speed_def !== "undefined") TYRANO.kag.config.chSpeed = tWin.temp_ch_speed_def;
			if (typeof tWin.temp_ch_speed !== "undefined") TYRANO.kag.stat.ch_speed = tWin.temp_ch_speed;
			if (typeof tWin.temp_chara_time !== "undefined") TYRANO.kag.stat.chara_time = tWin.temp_chara_time;
		};
		if (tWin.is_load) {
			tWin.is_load = false;
			var that = TYRANO.kag.menu;
			var data = $.getStorage(that.kag.config.projectID + "_temprider", that.kag.config.configSave);
			if (data) {
				data = JSON.parse(data);
				that.kag.menu.loadGameData($.extend(true, {}, data));
				TYRANO.kag.stat.is_click_text = TYRANO.kag.stat.is_adding_text = false;
						if (tWin.is_notime) {
							tWin.temp_ch_speed_def = TYRANO.kag.config.chSpeed;
							tWin.temp_ch_speed = TYRANO.kag.stat.ch_speed;
							tWin.temp_chara_time = TYRANO.kag.stat.chara_time;
							TYRANO.kag.config.chSpeed = "0";
							TYRANO.kag.stat.chara_time = "0";
							TYRANO.kag.stat.ch_speed = "0";
						} else {
							if (typeof tWin.temp_ch_speed_def !== "undefined") TYRANO.kag.config.chSpeed = tWin.temp_ch_speed_def;
							if (typeof tWin.temp_ch_speed !== "undefined") TYRANO.kag.stat.ch_speed = tWin.temp_ch_speed;
							if (typeof tWin.temp_chara_time !== "undefined") TYRANO.kag.stat.chara_time = tWin.temp_chara_time;
						};
			};
		};
	};
}());








