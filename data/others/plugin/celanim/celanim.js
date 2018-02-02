// 即時関数
(function(){
	
	// 何かの間違いでプラグインが2回以上読み込まれたらなにもしない
	if (typeof window.CSSCelAnime !== 'undefined') return;
	
	//
	// グローバルオブジェクト CSSCelAnime 定義
	//
	
	window.CSSCelAnime = {
		data: {},
		default_default_data: {},
		default_data: {
			
			 layer     : '0'
			,page      : 'fore'
			,time      : '0'
			,name      : ''
			,id        : ''
			,anim      : ''
			,nextanim  : ''
			
			,x         : '0'
			,y         : '0'
			,left      : ''
			,top       : ''
			,width     : ''
			,height    : ''
			,scale     : ''
			,zindex    : ''
			,anim_time : ''
			,centering : ''
			
			,cel_xnum  : '0'
			,cel_ynum  : '0'
			,cel_width : '0'
			,cel_height: '0'
			,cel_allnum: '0'
			,frames    : ''
			,folder    : 'image'
			,storage   : ''
			
			,count     : '1'
			,direction : 'normal'
			,fps       : '30'
			,speed     : '1'
			,mode      : 'normal'
			,delay     : '0'
			
			,autodel   : 'true'
			,wait      : 'false'
			
			,se        : ''
			,buf       : ''
			,volume    : ''
			
			,stop      : 'false'
		},
		get: function (name) {
			return $.extend(true, {}, this.data[name]);
		},
		set: function(img, that, pm){
				
			// 数値変換
			pm.cel_xnum    = parseInt(pm.cel_xnum);    // ヨコのコマ数
			pm.cel_ynum    = parseInt(pm.cel_ynum);    // タテのコマ数
			pm.cel_width   = parseInt(pm.cel_width);   // 1コマの横幅
			pm.cel_height  = parseInt(pm.cel_height);  // 1コマの高さ
			pm.fps         = parseInt(pm.fps);         // 1秒あたりのコマ数
			pm.cel_allnum  = parseInt(pm.cel_allnum);  // 
			
			// 他と被らないidを生成。これはキーフレームアニメーションの名前となる。
			pm.id = 'celanim_' + pm.anim;
			
			// 全体の幅と高さを取得。
			pm.total_width  = img.width;
			pm.total_height = img.height;
			
			// 1コマあたりの幅と高さ、横コマ数、縦コマ数などを定義。
			if (!pm.cel_width  ) pm.cel_width   = (pm.total_width  / pm.cel_xnum  )|0;
			if (!pm.cel_height ) pm.cel_height  = (pm.total_height / pm.cel_ynum  )|0;
			if (!pm.cel_xnum   ) pm.cel_xnum    = (pm.total_width  / pm.cel_width )|0;
			if (!pm.cel_ynum   ) pm.cel_ynum    = (pm.total_height / pm.cel_height)|0;
			if (!pm.cel_allnum ) pm.cel_allnum  = pm.cel_xnum * pm.cel_ynum;
			
			var i, arr1, arr2, wait_data = {}, wait_flag = false;
			if (pm.frames !== '') {
				wait_flag = true;
				if (pm.frames.indexOf('{') > -1) {
					pm.frames = pm.frames.substring(1, pm.frames.length - 1);
					arr1 = pm.frames.split(',');
					for (i = 0; i < arr1.length; i++) {
						arr2 = arr1[i].split(':');
						wait_data[parseInt(arr2[0])-1] = parseInt(arr2[1]);
					};
				}
				else {
					arr1 = pm.frames.split(',');
					for (i = 0; i < arr1.length; i++) {
						wait_data[i] = parseInt(arr1[i]) || 1;
					};
				}
			};
			
			if (true || wait_flag) {
				for (var j, i = 0, frames1 = [], frames2 = [], x, y, len = pm.cel_allnum; i < len; i++) {
					x1 =  i % pm.cel_xnum;
					x2 =  x1 + 1;
					y  = (i / pm.cel_xnum)|0;
					var loop_num = wait_data[i] || 1;
					for (j = 0; j < loop_num; j++) {
						frames1.push({
							 x: - x1 * pm.cel_width
							,y: - y  * pm.cel_height
						});
						frames2.push({
							 x: - x2 * pm.cel_width
							,y: - y  * pm.cel_height
						});
					};
				};
				frames1.push($.extend(true, {}, frames1[frames1.length - 1]));
				pm.step_num = 1;
				pm.cel_allnum = frames1.length;
			}
			else {
				for (var j, i = 0, frames1 = [], frames2 = [], x, y, len = pm.cel_ynum; i < len; i++) {
					x1 = 0;
					x2 = pm.cel_xnum;
					y  = i;
					frames1.push({
						 x: - x1 * pm.cel_width
						,y: - y  * pm.cel_height
					});
					frames2.push({
						 x: - x2 * pm.cel_width
						,y: - y  * pm.cel_height
					});
				};
				frames1.push({
					 x: - pm.total_width  + pm.cel_width
					,y: - pm.total_height - pm.cel_height
				});
				pm.step_num = pm.cel_xnum;
			}
			
			// keyframesのcssルールを生成して追加。
			for (var per, p1, p2, i = 0, len = frames2.length, css = ''; i < len; i++) {
				per = Math.floor((100 / len) * 10000) / 10000;
				if (i == 0) p1 = 0;
				else p1 = i * per + 0.0001;
				if (i + 1 == len) p2 = '99.9999';
				else p2 = (i + 1) * per;
				css += p1 + '%{background-position:' + frames1[i].x + 'px ' + frames1[i].y + 'px} ';
				css += p2 + '%{background-position:' + frames2[i].x + 'px ' + frames2[i].y + 'px} ';
			};
			css += '100%{background-position:' + frames1[i].x + 'px ' + frames1[i].y + 'px}';
			var lastSheet = document.styleSheets[document.styleSheets.length - 1];
			var css_rule = '@-' + vendor + '-keyframes ' + pm.id + ' {' + css + '} ';
			lastSheet.insertRule(css_rule, lastSheet.cssRules.length);
			
			pm.css_rule = css_rule;
			pm.css_rule_length = css_rule.length;
			
			// 定義が完了したので、CSSCelAnimeオブジェクトに登録します。
			CSSCelAnime.data[pm.anim] = pm;
			
			// ネクストオーダー!
			that.kag.ftag.nextOrder();
			
		}
	};
	CSSCelAnime.default_default_data = $.extend(true, {}, CSSCelAnime.default_data);
	
	
	//
	// ローカル関数 overwrite 定義
	// 
	
	var overwrite = function (obj1, obj2) {
		for (var key in obj2) {
			if (obj2[key] !== '') obj1[key] = obj2[key];
		};
		return obj1;
	};
	
	//
	// vendor の特定
	//
	
	var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'Moz' : (/Trident/i).test(navigator.userAgent) ? 'ms' : 'opera' in window ? 'O' : '';  
	
	//
	// 画面の横幅と高さの半分の値を整数値でゲット
	//
	
	var sc_width_h  = (parseInt(TYRANO.kag.config.scWidth )/2)|0;
	var sc_height_h = (parseInt(TYRANO.kag.config.scHeight)/2)|0;
	
	//
	// 新規タグの作成
	//
	
	var new_tag = {};
	
	//
	//#[free_celanim]
	//
	
	new_tag['free_celanim'] = {
		pm: {},
		start: function (pm) {
			$('.celanim').remove();
			this.kag.ftag.nextOrder();
		}
	};
	
	//
	//#[default_define_celanim]
	//
	
	new_tag['default_define_celanim'] = {
		pm: {},
		start: function (pm) {
			if (pm.reset === 'true') {
				delete pm.reset;
				CSSCelAnime.default_data = $.extend(true, {}, CSSCelAnime.default_default_data);
			};
			$.extend(true, CSSCelAnime.default_data, pm);
			this.kag.ftag.nextOrder();
		}
	};
	
	//
	//#[celanim_mod]
	//
	
	new_tag['celanim_mod'] = {
		pm: {},
		start: function (pm) {
			pm.overwrite = 'true';
			this.kag.ftag.startTag('celanim', pm);
		}
	};
	
	//
	//#[define_celanim]
	//
	
	new_tag['define_celanim'] = {
		pm: {},
		start: function (pm) {
			var that = this;
			pm = $.extend(true, {}, CSSCelAnime.default_data, pm);
			// storageの特定を行います。
			var storage_url = pm.storage;
			if (!$.isHTTP(storage_url)) storage_url = './data/' + pm.folder + '/' + pm.storage;
			pm.storage = storage_url;
			// プリロードします。
			$('<img />').attr('src', storage_url).load(function(e){
				// プリロードができたら…。
				CSSCelAnime.set(this, that, pm)
			}).error(function(e){
				// プリロードが正常に行えなかったら…。
				console.error('画像が正常にロードできませんでした(´・ω・`)');
				that.kag.ftag.nextOrder();
			});
		}
	};
	
	//
	//#[celanim]
	//
	
	new_tag['celanim'] = {
		pm: {},
		start: function (pm) {
			var that = this;
			
			//
			// 定義データの取得と上書き
			//
			
			var data = overwrite(CSSCelAnime.get(pm.anim), pm);
			
			//
			// 矛盾パラメータの上書き
			//
			
			if (data.count === 'infinite' || data.overwrite === 'true') data.wait = 'false';
			
			//
			// divの生成
			//
			
			var j_div, j_origin, j_wrap;
			//【上書きモード】かつ【識別子あり】ならオリジナルを取得しにいく
			if (data.overwrite === 'true') {
				j_origin = $('.' + data.name).eq(0);
				if (j_origin.size() < 1) {
					return that.kag.ftag.nextOrder();
				}
				else {
					//【所要時間ゼロ】ならオリジナルをそのまま取得
					if (data.time === '0') {
						j_wrap = true;
						j_div = j_origin.find('div');
					}
					//【所要時間ゼロ】でなければオリジナルを複製する
					else {
						j_wrap = j_origin.clone();
						j_div = j_wrap.find('div');
					}
				};
			};
			//【上書きモード】ではないか【識別子なし】ならば新たに生成
			if (!j_div) j_div = $('<div />');
			
			//
			// 基本スタイルの設定
			//
			
			var css;
			css = {
				 'background': 'url(' + data.storage + ') no-repeat'
				,'width': data.cel_width + 'px'
				,'height': data.cel_height + 'px'
				,'image-rendering': 'pixelated'
			};
			if (!j_wrap) {
				css['image-rendering']  = (data.pixelate  === 'true') ? 'pixelated'     : 'auto'    ;
				css['transform-origin'] = (data.centering === 'true') ? 'center center' : 'left top';
			}
			j_div.css(css);
			
			//
			// スケールの設定
			//
			
			var scale_css = '';
			if (data.scale !== '') {
				scale_css = 'scale(' + data.scale + ')';
			}
			else {
				var isset_w = data.width  !== '';
				var isset_h = data.height !== '';
				var scale_w = 1;
				var scale_h = 1;
				if (isset_w && isset_h) {
					scale_w = parseInt(data.width)  / data.cel_width;
					scale_h = parseInt(data.height) / data.cel_height;
				}
				else if (isset_w) scale_h = scale_w = parseInt(data.width)  / data.cel_width;
				else if (isset_h) scale_w = scale_h = parseInt(data.height)  / data.cel_height;
				if (isset_w || isset_h) scale_css = 'scale(' + scale_w + ',' + scale_h + ') ';
			};
			if (scale_css !== '') j_div.css('transform', scale_css);
			
			//
			// CSSアニメーションの設定
			//
			
			var time = (data.anim_time !== '') ? data.anim_time: (1000 / parseInt(data.fps) * data.cel_allnum / parseFloat(data.speed))|0;
			var original_css_param = {
				 '-animation-name'           : data.id
				,'-animation-duration'       : time + 'ms'
				,'-animation-play-state'     : 'running'
				,'-animation-delay'          : data.delay + 'ms'
				,'-animation-iteration-count': data.count
				,'-animation-direction'      : data.direction
				,'-animation-fill-mode'      : 'forwards'
				,'-animation-timing-function': 'steps(' + data.step_num + ')'
			};
			var css_param = {};
			for(var key in original_css_param){
				css_param['-' + vendor + key] = original_css_param[key];
			};
			j_div.css(css_param);
			
			//
			// ラッパー要素の生成＋位置とクラスの装着
			//
			
			if (!j_wrap) {
				j_wrap = $('<div />');
				if (data.left !== '') data.x = data.left;
				if (data.top  !== '') data.y = data.top;
				data.x = parseInt(data.x) || 0;
				data.y = parseInt(data.y) || 0;
				css = {'position': 'absolute'};
				css['left'] = (data.centering === 'true') ? (data.x + sc_width_h  - data.cel_width  / 2) | 0 + 'px': data.x + 'px';
				css['top']  = (data.centering === 'true') ? (data.y + sc_height_h - data.cel_height / 2) | 0 + 'px': data.y + 'px';
				j_wrap.css(css);
				$.setName(j_wrap, data.name);
				j_wrap.addClass('celanim');
				data.id = 'id_' + (new Date).getTime();
				j_wrap.addClass(data.id);
				if (data.zindex !== '') j_wrap.zIndex(data.zindex);
			};
			
			//
			// アペンドターゲットの特定
			//
			
			var j_target;
			
			//【ノーマルブレンド】なら、
			if (data.mode === 'normal') {
				// ふつうに layer & page から取得します。
				j_target = that.kag.layer.getLayer(data.layer, data.page);
			}
			
			//【ノーマルブレンド】でなければ…。
			else {
				// tyrano_baseをターゲットとし、mix-blend-modeの設定を行います。
				j_target = $('#tyrano_base');
				j_wrap.css({
					  'mix-blend-mode': data.mode
					 ,'z-index': 99
				});
				j_wrap.addClass('blend_celanim');
			};
			
			//
			// 効果音の再生
			//
			
			if (data.se !== '') {
				that.kag.ftag.startTag('playse', {
					 'storage': data.se
					,'buf'    : data.buf
					,'volume' : data.volume
					,'stop'   : 'true'
				});
			};
			
			//
			// 要素のアペンド
			//
			
			// nextOrder ローカル関数を定義します。
			var nextOrder = function () {
				if (data.stop !== 'true') that.kag.ftag.nextOrder();
			};
			
			//【所要時間ゼロ】かつ【上書き】のときは要素を追加する必要はない
			if (data.overwrite === 'true' && data.time === '0') nextOrder();
			// どちらか一方でも違えば
			else {
				j_wrap.append(j_div);
				//【所要時間ゼロ】なら単にアペンド
				if (data.time === '0') {
					j_target.append(j_wrap);
					if(data.wait !== 'true'){
						nextOrder();
					};
				}
				//【所要時間ゼロ】でなければフェードイン処理
				else {
					j_wrap.css('opacity', 0);
					j_target.append(j_wrap);
					j_wrap.animate(
						{'opacity': 1},
						parseInt(data.time)
					);
					//【上書き】時にはオリジナルをフェードアウト削除
					if (j_origin) {
						j_origin.removeClass(data.name);
						j_origin.fadeOut(parseInt(data.time), function () {
							$(this).remove();
						});
					};
					if(data.wait !== 'true'){
						nextOrder();
					};
				};
			}
			
			//
			// アニメーション終了時
			//
			
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			j_div.on(animationEnd, function() {
				$(this).off(animationEnd);
				if (data.autodel  === 'true' && data.count !== 'infinite' && data.nextanim === '') {
					if (j_wrap instanceof jQuery) j_wrap.remove();
					if (j_origin instanceof jQuery) j_origin.remove();
				};
				if (data.nextanim !== ''    ) {
					that.kag.ftag.startTag('celanim', {
						 stop: 'true'
						,name: data.name || data.id
						,anim: data.nextanim
						,overwrite: 'true'
					});
				}
				else {
					var j_this = $(this);
					var css = {};
					css['-' + vendor + '-animation-duration'] = '0';
					css['-' + vendor + '-animation-play-state'] = 'paused';
					j_this.css(css);
				}
				if (data.wait     === 'true') nextOrder();
			});
		}
	}
	
	//
	// 作成したタグの登録
	//
	
	for (var key in new_tag) {
		var tag = new_tag[key];
		tag.kag = TYRANO.kag;
		TYRANO.kag.ftag.master_tag[key] = tag;
	};
	
}());