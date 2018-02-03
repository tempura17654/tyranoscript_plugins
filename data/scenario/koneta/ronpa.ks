/*
	./data/scenario/first.ks
	
	●アウトラインの設定
	
	　以下の項目（カギカッコの中身）を検索対象とし、
	　検索対象をすべて半角空白に置換しています。
	　
	　・レベル１「^\t*;#」
	　・レベル２「^\t*;##」
	　・レベル３「^\t*;###」
*/
	;[wait]タグの挙動を弄る
	@iscript
		tyrano.plugin.kag.tag.wait.start = function(pm) {
			var that = this;
			this.kag.stat.is_strong_stop = true;
			this.kag.stat.is_wait = true;
			this.kag.layer.hideEventLayer();
			// setTimeout(function() {
			// ↑の記述を↓のように変更。setTimeoutの返り値を受け取るようにした。
			this.kag.tag.wait.timer = setTimeout(function() {
				that.kag.stat.is_strong_stop = false;
				that.kag.stat.is_wait = false;
				that.kag.layer.showEventLayer();
				that.kag.ftag.nextOrder()
			}, pm.time)
		}
	@endscript
	
	
;#初期設定
	
	@title name="ティラノスクリプト"
	@call storage="tyrano.ks"
	@hidemenubutton
	@mask time=0
	
	;@jump storage="scene2.ks"
	
	@cm
	@clearfix
	@clearstack
	;@showmenubutton
	
	@ptext name=copy layer=2 x=10 y=0  size=30 text='立ち絵素材：keito × 大富寺 航©KYUBI-SOFT'
	@ptext name=copy layer=2 x=10 y=30 size=30 text='http://keito-works.com/'
	
	@delay speed=30
	@position left=10 width=940 top=380 height=220
	@position margint=58 marginl=53 marginr=100 marginb=50
	@ptext name='chara_name_area' layer='message0' color='white' size=40 x=50 y=390
	@chara_config ptext='chara_name_area'
	@deffont size=40
	; bold=true
	@resetfont
	@iscript
		$('.message0_fore, .2_fore').css({
			'text-shadow':'black 1px 1px 0px, black -1px 1px 0px, black 1px -1px 0px, black -1px -1px 0px'
		})
		$('.message_outer')
		.css({
			 'opacity':'1'
			,'background':'rgba(0,0,0,0.8)'
			,'background':'-moz-linear-gradient(top,    rgba(0,0,0,0.8) 38%,rgba(150,150,150,0.8) 100%)'
			,'background':'-webkit-linear-gradient(top, rgba(0,0,0,0.8) 38%,rgba(150,150,150,0.8) 100%)'
			,'background':'linear-gradient(to bottom,   rgba(0,0,0,0.8) 38%,rgba(150,150,150,0.8) 100%)'
		})
		// CSS規則追加
		var newStyle = document.createElement('style')
		newStyle.type = "text/css"
		document.getElementsByTagName('head').item(0).appendChild( newStyle )
		var css = document.styleSheets.item(0)
		var idx = document.styleSheets[0].cssRules.length;
		css.insertRule('.message_inner p{ line-height: 3em; }', idx);//末尾に追加
	@endscript
	
;#キーフレーム定義
	
	
	;##左から登場
		
		@keyframe name=textEntrL
			@frame p=0%   opacity=0   x=-1000
			@frame p=100% opacity=255 x=-25
		@endkeyframe
		
		@keyframe name=textStayL
			@frame p=100% x=50
		@endkeyframe
		
		@keyframe name=textExitL
			@frame p=100% opacity=0 x=1000
		@endkeyframe
		
		
	;##右から登場
		
		@keyframe name=textEntrR
			@frame p=0%   opacity=0   x=1000
			@frame p=100% opacity=255 x=25
		@endkeyframe
		
		@keyframe name=textStayR
			@frame p=100% x=-50
		@endkeyframe
		
		@keyframe name=textExitR
			@frame p=100% opacity=0 x=-1000
		@endkeyframe
		
	
	;##上から登場
		
		@keyframe name=textEntrT
			@frame p=0%   opacity=0   y=-600
			@frame p=100% opacity=255 y=-15
		@endkeyframe
		
		@keyframe name=textStayT
			@frame p=100% y=30 rotate=10deg
		@endkeyframe
		
		@keyframe name=textExitT
			@frame p=100% opacity=0 y=600
		@endkeyframe
		
	
	;##下から登場
		
		@keyframe name=textEntrB
			@frame p=0%   opacity=0   y=600
			@frame p=100% opacity=255 y=15
		@endkeyframe
		
		@keyframe name=textStayB
			@frame p=100% y=-30
		@endkeyframe
		
		@keyframe name=textExitB
			@frame p=100% opacity=0 y=-600
		@endkeyframe
		
		
	;##手前から登場
		
		@keyframe name=textEntrZ
			@frame p=0%   opacity=0   scale=5 rotate=360deg
			@frame p=100% opacity=255 scale=1 rotate=0deg
		@endkeyframe
		
		@keyframe name=textStayZ
			@frame p=2%   x=5  y=-5 scale=1
			@frame p=4%   x=0  y=5  
			@frame p=6%   x=-5 y=-5 
			@frame p=8%   x=5  y=5  
			@frame p=10%  x=0  y=0  
			@frame p=100%           scale=1.2
		@endkeyframe
		
		@keyframe name=textExitZ
			@frame p=100% opacity=0 y=110 x=1000 rotate=15deg
		@endkeyframe
		
		
	;##左上から登場
		
		@keyframe name=textEntrLT
			@frame p=0%   opacity=0   x=-1000 rotate=15deg
			@frame p=100% opacity=255 x=-25   rotate=15deg
		@endkeyframe
		
		@keyframe name=textStayLT
			@frame p=100% x=50
		@endkeyframe
		
		@keyframe name=textExitLT
			@frame p=100% opacity=0 x=1000
		@endkeyframe
		
		
	;##左下から登場
		
		@keyframe name=textEntrLB
			@frame p=0%   opacity=0   x=-1000 rotate=-15deg
			@frame p=100% opacity=255 x=-25   rotate=-15deg
		@endkeyframe
		
		@keyframe name=textStayLB
			@frame p=100% y=0 x=50
		@endkeyframe
		
		@keyframe name=textExitLB
			@frame p=100% opacity=0 x=1000
		@endkeyframe
		
		
	;##右上から登場
		
		@keyframe name=textEntrRT
			@frame p=0%   opacity=0   x=1000 rotate=-15deg
			@frame p=100% opacity=255 x=25   rotate=-15deg
		@endkeyframe
		
		@keyframe name=textStayRT
			@frame p=100% x=-50
		@endkeyframe
		
		@keyframe name=textExitRT
			@frame p=100% opacity=0 x=-1000
		@endkeyframe
		
		
	;##右下から登場
		
		@keyframe name=textEntrRB
			@frame p=0%   opacity=0   x=1000 rotate=15deg
			@frame p=100% opacity=255 x=25   rotate=15deg
		@endkeyframe
		
		@keyframe name=textStayRB
			@frame p=100% x=-50
		@endkeyframe
		
		@keyframe name=textExitRB
			@frame p=100% opacity=0 x=-1000
		@endkeyframe
		
		
;#描画色々
	
	
	;##レイヤオプション
	@layopt visible=false layer=message0
	@layopt visible=true  layer=base
	@layopt visible=true  layer=0
	@layopt visible=true  layer=1
	@layopt visible=true  layer=2
	
	
	;##背景描画
	@iscript
		// ベースレイヤに画像を挿入する処理
		// 仮に、単に @image layer=base storage=... とした場合、
		//「ベースレイヤの<div>要素の内部に<img>要素を挿入する処理」ではなく
		//「ベースレイヤの<div>要素のbackground-imageを変更する処理」が行われる。
		// 今回は前者の処理をしたいので、手動で挿入している。
		//（こんなことをしなくても、configを変更してレイヤー数を増やして、
		//  適当なレイヤーに @image を使えばいいだけではあるけれど、
		//  それだとベースレイヤがもったいない気がした...φ(・ω・｀)）
		$('.base_fore').append('<img src="./data/bgimage/room.jpg" width="2500" height="1280" style="position: absolute; left: -480px; top: -320px;">')
	@endscript
	
	
	@anim time=300 layer=message0 opacity=0
	@wa
	@layopt visible=false  layer=message0
	
	
	;##人物正面描画
	
	@iscript
		T = {}
		T.left = []
		T.left[0]    =-600
		var distance = 400
		var number   = 8
		for ( var i = 1; i < number; i++ ) {
			T.left[i] = T.left[i-1] + distance
		}
		T.storage = [
			 'fuyuko_normal'
			,'yuri_normal'
			,'takashi_normal'
			,'shikine_normal'
			,'koto_normal'
			,'sawako_normal'
			,'senior01_normal'
			,'senior02_normal'
		]
		var base = '../fgimage/chara/all_pack/'
		for ( var i = 0; i < T.storage.length; i++ ) {
			T.storage[i] = base + T.storage[i] + '.png'
		}
	@endscript
	
	@image layer=0 name=C0 left=&T.left[0] top=0 storage=&T.storage[0]
	@image layer=0 name=C1 left=&T.left[1] top=0 storage=&T.storage[1]
	@image layer=0 name=C2 left=&T.left[2] top=0 storage=&T.storage[2]
	@image layer=0 name=C3 left=&T.left[3] top=0 storage=&T.storage[3]
	@image layer=0 name=C4 left=&T.left[4] top=0 storage=&T.storage[4]
	@image layer=0 name=C5 left=&T.left[5] top=0 storage=&T.storage[5]
	@image layer=0 name=C6 left=&T.left[6] top=0 storage=&T.storage[6]
	@image layer=0 name=C7 left=&T.left[7] top=0 storage=&T.storage[7]
	
	
	;##人物背面描画
	
	@image layer=1 name=C0 left=&T.left[4] top=0 storage=&T.storage[0]
	@image layer=1 name=C1 left=&T.left[5] top=0 storage=&T.storage[1]
	@image layer=1 name=C2 left=&T.left[6] top=0 storage=&T.storage[2]
	@image layer=1 name=C3 left=&T.left[7] top=0 storage=&T.storage[3]
	@image layer=1 name=C4 left=&T.left[0] top=0 storage=&T.storage[4]
	@image layer=1 name=C5 left=&T.left[1] top=0 storage=&T.storage[5]
	@image layer=1 name=C6 left=&T.left[2] top=0 storage=&T.storage[6]
	@image layer=1 name=C7 left=&T.left[3] top=0 storage=&T.storage[7]
	
	;brightnessを0にすることで、真っ黒化する
	@filter layer=1 brightness=0
	
	;背面なので、左右反転する
	@iscript
		$('.1_fore img').css({
			 'transform':'scale(-1, 1)'
			,'opacity':'0'
		})
	@endscript
	
	
	;##空のテキスト描画
	@ptext layer=2 name=T,T0 time=0 x=000 y=0
	@ptext layer=2 name=T,T1 time=0 x=1000 y=0
	@ptext layer=2 name=T,T2 time=0 x=1000 y=0
	@ptext layer=2 name=T,T3 time=0 x=1000 y=0
	
	
	;##テキストの中身定義
	@iscript
		$('.T0').append('<span>わたしのスクール水着が</span><br /><span class="ivent ivent0">どこにもない</span><span>の…</span>')
		$('.T1').append('<span class="ivent ivent1">ひとりでに消えた</span><span><br>のでなければ…</span>')
		$('.T2').append('<span class="ivent ivent2">男子の誰か</span><span>が</span><br><span class="ivent ivent3">盗んだに違いない</span><span>わね！</span>')
		$('.T3').append('<span>ちなみに俺は何も知ら～ん！</span>')
		$('.T').css({
			 'width':'auto'
			,'line-height':'40px'
			,'text-align':'center'
			,'font-weight':'900'
			,'text-shadow':'black 1px 1px 0px, black -1px 1px 0px, black 1px -1px 0px, black -1px -1px 0px'
		})
		$('.T span').css({
			 'font-size':'50px'
		})
		// リンク文字部分
		$('.T span.ivent').css({
			 'color':'orange'
			,'font-size':'60px'
			,'line-height':'50px'
			,'cursor':'pointer'
			,'transition':'color 200ms ease-in 0s '
		})
		$('.T .ivent').hover(function(){
			$(this).css({
				 'color':'yellow'
			})
		}, function(){
			$(this).css({
				 'color':'orange'
			})
		})
		$('.T .ivent0').click(function(){
			clearTimeout( tyrano.plugin.kag.tag.wait.timer )
			TYRANO.kag.ftag.nextOrderWithLabel('B0')
		})
		$('.T .ivent1').click(function(){
			clearTimeout( tyrano.plugin.kag.tag.wait.timer )
			TYRANO.kag.ftag.nextOrderWithLabel('B1')
		})
		$('.T .ivent2').click(function(){
			clearTimeout( tyrano.plugin.kag.tag.wait.timer )
			TYRANO.kag.ftag.nextOrderWithLabel('B2')
		})
		$('.T .ivent3').click(function(){
			clearTimeout( tyrano.plugin.kag.tag.wait.timer )
			TYRANO.kag.ftag.nextOrderWithLabel('B3')
		})
		$('.T .ivent4').click(function(){
			clearTimeout( tyrano.plugin.kag.tag.wait.timer )
			TYRANO.kag.ftag.nextOrderWithLabel('B4')
		})
		*/
		// 以下のif文の判定式をtrueにすると各要素の枠の表示を行う
		if ( 0 ) {
			$('.T').css('background','hsla(100,100%,50%,0.5)')
			$('.0_fore>img').css('background','hsla(0,100%,50%,0.5)')
			$('.T .ivent').css('background','hsla(200,100%,50%,0.5)')
		}
	@endscript
	
	
;#ゲームデータ定義
	
	@iscript
		G = {} // ゲームデータ格納用（Game）
		T = {} // 一時的な変数格納用（Temporary）
		G.txt = [] // テキストデータ（text）
		G.chr = [] // キャラクターデータ（character）
		G.tim = [] // 演出時間データ（time）
		G.cam = {} // カメラ位置データ（camera）
		G.cam.base = [] // ├背景
		G.cam.fore = [] // ├人物-正面
		G.cam.back = [] // └人物-背
		G.alp = {}
		G.alp.back = []
		G.dat = {} // その他データ（data）
		G.dat.numT = 4 // ターン数。今回は4（number of turn）
		G.alp.back = [ 1, 0, 1, 1 ] // 各ターンにおける背面の表示／非表示
		// 各ターンにおいて誰の立ち絵を何に差し替えるか
		G.chr = [
			 { name: 'C1', src: './data/fgimage/chara/all_pack/yuri_lonely.png' }
			,{ name: 'C4', src: './data/fgimage/chara/all_pack/koto_normal.png' }
			,{ name: 'C4', src: './data/fgimage/chara/all_pack/koto_anger.png' }
			,{ name: 'C2', src: './data/fgimage/chara/all_pack/takashi_laughter.png' }
		]
		// G.cam.fore（人物正面）レイヤーのカメラデータ
		// .entrはenterの略で登場の意。各ターンの登場時のカメラ位置を記述する。zはzoom、rはrotate。zは100が基準。
		// .stayは滞在の意。各ターンのカメラ移動量を相対量で記述する。
		G.cam.fore = [
			 { entr  : { x:-600, y: 100, z: 150, r:-10 }, stay: { x: 80, y:  0, z:   0, r: 0 }, ease:'linear' }
			,{ entr  : { x: 700, y:   0, z: 120, r:  5 }, stay: { x:  0, y: 90, z:   0, r: 0 }, ease:'linear' }
			,{ entr  : { x: 700, y: 100, z: 180, r:  8 }, stay: { x:-20, y:  0, z: -60, r:-8 }, ease:'cubic-bezier(.22,-0.48,.52,-0.06)' }
			,{ entr  : { x:-200, y: 100, z: 140, r:  0 }, stay: { x:  0, y:-20, z:   0, r: 5 }, ease:'linear' }
		]
		// カメラデータの補正
		for ( var i = 0; i < G.dat.numT; i++ ) {
			var a  = 0.6 // 人物正面レイヤのカメラ移動量に対する背景レイヤのカメラ移動量の比
			var aa = 2.3 // 人物正面レイヤのカメラ移動量に対する人物背面レイヤのカメラ移動量の比
			var c  = G.cam.fore[i]
			var cc = G.cam.base[i] = {}
			var ccc= G.cam.back[i] = {}
			c.stay.x += c.entr.x // 相対量で記述していた.stayの各数値に.entrの各数値を足す
			c.stay.y += c.entr.y
			c.stay.z += c.entr.z
			c.stay.r += c.entr.r
			cc.stay = {}
			cc.entr = {}
			ccc.stay = {}
			ccc.entr = {}
			cc.stay.x = (c.stay.x * a)|0 // aをかけたあと小数部分は切り捨てる
			cc.stay.y = (c.stay.y * a)|0
			cc.stay.z = (c.stay.z * a)|0
			cc.stay.r = (c.stay.r * a)|0
			cc.entr.x = (c.entr.x * a)|0
			cc.entr.y = (c.entr.y * a)|0
			cc.entr.z = (c.entr.z * a)|0
			cc.entr.r = (c.entr.r * a)|0
			ccc.stay.x = (c.stay.x * aa)|0
			ccc.stay.y = (c.stay.y * aa)|0
			ccc.stay.z = (c.stay.z * aa)|0
			ccc.stay.r = (c.stay.r * aa)|0
			ccc.entr.x = (c.entr.x * aa)|0
			ccc.entr.y = (c.entr.y * aa)|0
			ccc.entr.z = (c.entr.z * aa)|0
			ccc.entr.r = (c.entr.r * aa)|0
			c.entr.z /= 100 // 実際にスクリプトに書くべきzoomは1が基準なので100で割る
			c.stay.z /= 100
			cc.entr.z /= 100
			cc.stay.z /= 100
			ccc.entr.z /= 100
			ccc.stay.z /= 100
		}
		// 各ターンの登場・滞在時間（ミリ秒）
		G.tim = [
			 { entr: 600, stay: 3000 }
			,{ entr: 600, stay: 3000 }
			,{ entr: 600, stay: 3000 }
			,{ entr: 600, stay: 3000 }
		]
		// 各ターンのテキストデータ（クラスネーム、xy座標、登場～退場演出のキーフレームネーム）
		// ※ x,yにはあとで補正をかける。(x,y)=(0,0)のとき、テキストの中央位置と画面の中央位置が一致する
		G.txt = [
			 { name:'T0', x: 0, y: 50, entr:'RT', stay:'RT', exit:'RT'  }
			,{ name:'T1', x: 0, y: 50, entr:'LT', stay:'LT', exit:'LT' }
			,{ name:'T2', x: 0, y: 50, entr:'Z',  stay:'Z',  exit:'Z'  }
			,{ name:'T3', x: 0, y: 50, entr:'T',  stay:'T',  exit:'T'  }
		]
		// テキストデータの補正
		for ( var i = 0; i < G.txt.length; i++ ) {
			var txt = G.txt[i]
			var dir = txt.entr
			txt.entr = 'textEntr' + dir
			txt.stay = 'textStay' + dir
			txt.exit = 'textExit' + dir
			// 以下はテキストの基準位置（x、y）を要素の【左上】ではなく【中央】に変更する処理
			// 要素の幅と高さの半分をそれぞれx、y座標に減算すれば中央基準になる
			var dom = document.getElementsByClassName( txt.name )[0] // DOM要素
			var jqy = $( '.'+txt.name ) // jQueryオブジェクト
			jqy.css({ // いったん画面内に映るように移す。こうしないとdomから正常にoffsetWidth、offsetHeightを取れない
				 'top':'0'
				,'left':'0'
			})
			var w = dom.offsetWidth // 要素の幅
			var h = dom.offsetHeight // 要素の高さ
			var ww = $('#tyrano_base').width() // 画面の幅
			var hh = $('#tyrano_base').height() // 画面の高さ
			var y = (hh/2 + txt.y - h/2).toFixed(0)
			var x = (ww/2 + txt.x - w/2).toFixed(0)
			jqy.css({
				 'top': y + 'px'
				,'left': x + 'px'
				,'opacity':'0'
			})
		}
		G.dat.cntT = 0 // 現在のターン（current turn）
		G.dat.preT = G.dat.numT - 1 // 前のターン（previous turn）
	@endscript
	
	
;#説明

	@camera time=600  layer=base x=-400 y=070 zoom=1.0 rotate=0 ease_type=linear wait=false
	@camera time=600  layer=0    x=-600 y=100 zoom=1.2 rotate=0 ease_type=linear wait=false
	
	@mask_off time=200 wait=false
	@layopt visible=true  layer=message0
	@anim time=300 layer=message0 opacity=255
	@wait time=600
	
	@camera time=10000 layer=base x=-350 y=070 zoom=1.0 rotate=0 ease_type=linear wait=false
	@camera time=10000 layer=0    x=-550 y=100 zoom=1.2 rotate=0 ease_type=linear wait=false
	
	#【ゆり】
	ティラノスクリプトで、某人気推理アクションゲーム風の演出をしてみるよ！[l][cm]
	演出のテストで、ゲームとしては完成してないから、クリアとかはないの……ごめんね。[l][cm]
	#
	
	@free time=300 wait=false layer=2 name=copy
	@anim time=300 layer=message0 opacity=0
	@wa
	@layopt visible=false  layer=message0
	
	@filter layer=base brightness=60
	@filter layer=0    brightness=60
	
	
;#*A 演出開始
*A
	
	; テキストは一旦すべて退場処理
	@kanim  time=0 layer=4 name=T0 keyframe=textExitL easing=linear mode=forwards
	@kanim  time=0 layer=4 name=T1 keyframe=textExitL easing=linear mode=forwards
	@kanim  time=0 layer=4 name=T2 keyframe=textExitL easing=linear mode=forwards
	@kanim  time=0 layer=4 name=T3 keyframe=textExitL easing=linear mode=forwards
	
	; カメラ移動演出が残っていたら待つ
	;@wait_camera
	
	
	;##*AA ターン開始
	*AA
	
		;一時変数の更新
		@iscript
			var n = G.dat.cntT
			var m = G.dat.preT
			T.tA  = G.tim[n].entr
			T.tB  = G.tim[n].stay
			T.x1  = G.txt[n]
			T.x2  = G.txt[m]
			T.c1A = G.cam.base[n].entr
			T.c1B = G.cam.base[n].stay
			T.c2A = G.cam.fore[n].entr
			T.c2B = G.cam.fore[n].stay
			T.c3A = G.cam.back[n].entr
			T.c3B = G.cam.back[n].stay
			T.eas = G.cam.fore[n].ease
			T.alp = G.alp.back[n]
			var c = G.chr[ G.dat.cntT ]
			if ( c.name != '' ) {
				$( '.'+c.name ).attr({
					'src': c.src
				})
			}
		@endscript
		
		;前のテキストの退場といまのテキストの登場
		@kanim  time=&T.tA layer=2 name=&T.x2.name keyframe=&T.x2.exit easing=linear mode=forwards
		@kanim  time=&T.tA layer=2 name=&T.x1.name keyframe=&T.x1.entr easing=linear mode=forwards
		;カメラの登場移動
		@camera time=&T.tA layer=base x=&T.c1A.x y=&T.c1A.y zoom=&T.c1A.z rotate=&T.c1A.r ease_type=&T.eas wait=false
		@camera time=&T.tA layer=0    x=&T.c2A.x y=&T.c2A.y zoom=&T.c2A.z rotate=&T.c2A.r ease_type=&T.eas wait=false
		@camera time=&T.tA layer=1    x=&T.c3A.x y=&T.c3A.y zoom=&T.c3A.z rotate=&T.c3A.r ease_type=&T.eas wait=false
		@anim   time=&T.tA layer=1 opacity=0   cond='T.alp<1'
		@anim   time=&T.tA layer=1 opacity=255 cond='T.alp>0'
		@wait   time=&T.tA
		
		;いまのテキストの滞在移動とカメラの滞在移動
		@kanim  time=&T.tB layer=2 name=&T.x1.name keyframe=&T.x1.stay easing=linear mode=forwards
		@camera time=&T.tB layer=base x=&T.c1B.x y=&T.c1B.y zoom=&T.c1B.z rotate=&T.c1B.r ease_type=linear wait=false
		@camera time=&T.tB layer=0    x=&T.c2B.x y=&T.c2B.y zoom=&T.c2B.z rotate=&T.c2B.r ease_type=linear wait=false
		@camera time=&T.tB layer=1    x=&T.c3B.x y=&T.c3B.y zoom=&T.c3B.z rotate=&T.c3B.r ease_type=linear wait=false
		@wait   time=&T.tB
		
		;ターンの増加
		@iscript
			G.dat.preT =  G.dat.cntT
			G.dat.cntT = (G.dat.cntT+1) % G.dat.numT
		@endscript
		
		;ループする
		@jump target=*AA
		
	
	;##*AB ターン終了
	*AB
	
	
;#*B0
*B0
	
	@mask time=200
	@kanim  time=&T.tA layer=4 name=&T.x1.name keyframe=&T.x1.exit easing=linear mode=forwards
	;@camera layer=base x=0 y=0 zoom=1 rotate=0 wait=false
	;@camera layer=0    x=0 y=0 zoom=1 rotate=0 wait=false
	@mask_off time=200
	@layopt visible=true  layer=message0
	@anim time=300 layer=message0 opacity=255
	@wa
	
	#【あなた】
	｢どこにもない」……[l][cm]
	とはいっても、本当に文字どおり「どこにもない」はずはないだろう。[l][cm]
	どこを探してそういう結論になったんだ？[l][cm]
	
	#【ゆり】
	えっ、それは……[l][r]
	自分のロッカーの中とか、机の周りとか。[l][cm]
	あとは、バスケ部の部室も見てみたけど。[r]ほら、わたし、バスケ部だから。[l][cm]
	
	#【あなた】
	それだけ？[l][cm]
	
	#【ゆり】
	それだけって……[l][cm]
	水着はもともと、今日学校に来てすぐ、[r]廊下のロッカーに入れたはずだったんだよ。[l][cm]
	だけど二限のあとにロッカーを見たら無かったから、記憶違いかもしれないと思って……[l][cm]
	貴重なお昼休みをつかって、ほかのところも駆けまわって探したんだから！[l][cm]
	
	#【あなた】
	――でも、なかった。[l][cm]
	
	#【ゆり】
	そう。[l][cm]
	
	#
	朝一にロッカーに入れたはずの水着が、[r]二限のあとにはなくなっていた。[l][cm]
	机の周りや部室の中も探したが、[r]見つからなかったということだ。[l][cm]
	
	#【あなた】
	ありがとう、よくわかったよ。続けてくれ。[l][cm]
	#
	
	@anim time=300 layer=message0 opacity=0
	@wa
	@layopt visible=false  layer=message0
	
	/*
	@reset_camera time=600 wait=false ease_type=linear layer=base
	@reset_camera time=600 wait=false ease_type=linear layer=0
	@reset_camera time=600 wait=false ease_type=linear layer=1
	*/
	
	@jump target=*A
	
	[s]
	
	
;#*B1
*B1
	
	@mask time=200
	@kanim  time=&T.tA layer=4 name=&T.x1.name keyframe=&T.x1.exit easing=linear mode=forwards
	;@camera layer=base x=0 y=0 zoom=1 rotate=0 wait=false
	;@camera layer=0    x=0 y=0 zoom=1 rotate=0 wait=false
	@mask_off time=200
	@layopt visible=true  layer=message0
	@anim time=300 layer=message0 opacity=255
	@wa
	
	#【あなた】
	｢ひとりでに消えた」……というのは？[l][cm]
	
	#【こと】
	水着に脚が生えて、勝手にどこかにいっちゃったとかいうことよ。[l][cm]
	もしくは……[l][cm]
	ゆりのロッカーの中にブラックホールが生まれて、水着が宙に吸い込まれてしまった……[l][cm]
	ということも考えられるわね。[l][cm]
	
	#【あなた】
	そんなことは考えられない。[l][cm]
	
	#【こと】
	…………[l][cm]
	もちろんそうね。[l][cm]
	そんなことはありえないから……ということで話を運ぼうとしてるのよ。[l][cm]
	話を続けていい？[l][cm]
	
	#【あなた】
	ああ。[l][cm]
	#
	
	@anim time=300 layer=message0 opacity=0
	@wa
	@layopt visible=false  layer=message0
	
	/*
	@reset_camera time=600 wait=false ease_type=linear layer=base
	@reset_camera time=600 wait=false ease_type=linear layer=0
	@reset_camera time=600 wait=false ease_type=linear layer=1
	*/
	
	@jump target=*A
	
	[s]
	
	
;#*B2
*B2
	
	@mask time=200
	@kanim  time=&T.tA layer=4 name=&T.x1.name keyframe=&T.x1.exit easing=linear mode=forwards
	;@camera layer=base x=0 y=0 zoom=1 rotate=0 wait=false
	;@camera layer=0    x=0 y=0 zoom=1 rotate=0 wait=false
	@mask_off time=200
	@layopt visible=true  layer=message0
	@anim time=300 layer=message0 opacity=255
	@wa
	
	#【あなた】
	ちょっと待ってくれ。[l][cm]
	なぜ容疑を男子に限定するんだ？[l][cm]
	
	#【こと】
	それはだって……女の子の水着が盗まれたとしたら、犯人は男でしょ。[l][cm]
	ゆりに欲情した変態男が盗んだに違いないわ。[l][cm]
	
	#【あなた】
	そうとは限らない。[l][cm]
	女子が女子の水着を盗む……[r]ということもあるかもしれない。[l][cm]
	
	#【こと】
	…………[l][cm]
	それって、百合ってやつ？[l][cm]
	あんた、そんなこと考えてるの？[r]気持ち悪いわね。[l][cm]
	
	#
	いささか差別的な言い草だ。[l][cm]
	#【あなた】
	まあ、そういうことも考えられるが……[l][cm]
	そもそも女子が女子の水着を盗む理由が[r]「レズビアンだから」とはかぎらない。[l][cm]
	たとえば、嫌がらせのために盗む、[r]ということも考えられる。[l][cm]
	それ以外にも、可能性はいくらでもある。[l][cm]
	
	
	#【こと】
	わかった、わかったわ！[r]そんなムキになっちゃって。[l][cm]
	よっぽど「男子に違いない」って響きが[r]お気に召さなかったようね。[l][cm]
	訂正してあげるわよ。[l][cm]
	#
	
	@iscript
		$('.ivent2').after('<span style="font-size: 50px;">誰か</span>').remove()
	@endscript
	
	@anim time=300 layer=message0 opacity=0
	@wa
	@layopt visible=false  layer=message0
	
	/*
	@reset_camera time=600 wait=false ease_type=linear layer=base
	@reset_camera time=600 wait=false ease_type=linear layer=0
	@reset_camera time=600 wait=false ease_type=linear layer=1
	*/
	
	@jump target=*A
	
	[s]
	
	
;#*B3
*B3
	
	@mask time=200
	@kanim  time=&T.tA layer=4 name=&T.x1.name keyframe=&T.x1.exit easing=linear mode=forwards
	;@camera layer=base x=0 y=0 zoom=1 rotate=0 wait=false
	;@camera layer=0    x=0 y=0 zoom=1 rotate=0 wait=false
	@mask_off time=200
	@layopt visible=true  layer=message0
	@anim time=300 layer=message0 opacity=255
	@wa
	
	#【あなた】
	｢盗んだに違いない｣……か。[l][cm]
	
	#【こと】
	そうよ。話、聞いてた？[l][cm]
	水着がひとりでに消えたんじゃなければ、[r]誰かの手で水着が運ばれたってことでしょ？[l][cm]
	そしてそのことが、ゆりの知らないところで行われた……[l][cm]
	それだけで、誰かがゆりの水着を盗んだ、[r]というのに十分よ。[l][cm]
	
	#【あなた】
	……たしかにそうだな。[l][cm]
	
	#【こと】
	そこにツッコんでくるとは思わなかったわ。[l][cm]
	#
	
	@anim time=300 layer=message0 opacity=0
	@wa
	@layopt visible=false  layer=message0
	
	/*
	@reset_camera time=600 wait=false ease_type=linear layer=base
	@reset_camera time=600 wait=false ease_type=linear layer=0
	@reset_camera time=600 wait=false ease_type=linear layer=1
	*/
	
	@jump target=*A
	
	[s]