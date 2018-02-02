  ;一番最初に呼び出されるファイル
	[layopt layer="base" visible="true"]
	[layopt layer="0" visible="true"]
	[layopt layer="1" visible="true"]
	[layopt layer="2" visible="true"]
	[position layer="message0" page="fore" left="0" top="520" width="960" height="120" opacity="200" marginl="20" margint="10" marginr="20" opacity="100"]
	[deffont size="36"][resetfont]
	[bg storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/bg.png" time="0"]
	[nowait]
	
	
	
	
	
	
		[plugin name="celanim"]
	
	
	
	
	
	
	;■１．もっともシンプルな使用例
	
		; 基本的な使い方は、
		;
		; 　　① [define_celanim]でアニメーション情報を定義
		; 　　② [celanim]でそれを再生
		;
		; 以上のとおり。
		; [define_celanim]での定義は一度行うだけで十分なので、
		; あとは必要に応じて[celanim]を使おう。
	
		[define_celanim anim="A" storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/rixu1/00.png" cel_width="64" cel_height="64"]
		[celanim        anim="A" layer="0" x="100" y="100"]
		
		１．もっともシンプルな例。
		[p][freeimage layer="0"]
	
			; ※注意
			; ①のアニメーション情報の定義は「first.ks」などの
			;「ゲームを起動したら必ず通る場所」に書いておくことを強く勧める。
			;（アニメーションの定義状況がセーブされない仕様のため）
	
	
	
	
	
	
	;■２．定義について｜２通りの定義方法
	
		; 1コマあたりの横幅×高さのピクセル数を指定する方法(anim="B")と、
		; 素材画像を構成する横のコマ数×縦のコマ数を指定する方法(anim="C")がある。
		; 指定しやすいほうで指定しよう。
	
		[define_celanim anim="B" storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/rixu1/00.png" cel_width="64" cel_height="64"]
		[define_celanim anim="C" storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/rixu1/00.png" cel_xnum="8"   cel_ynum="8"   ]
		[celanim        anim="B" layer="0" x="100" y="100"]
		[celanim        anim="C" layer="0" x="200" y="100"]
		
		２．定義方法２通りの例。
		[p][freeimage layer="0"]
		
		; [define_celanim] リファレンス
		; - storage    … 素材画像の場所(imageフォルダが基準)。必須。
		; - cel_width  … 1コマあたりの横幅(ピクセル)。┐
		; - cel_height … 1コマあたりの高さ(ピクセル)。┘(イ)
		; - cel_xnum   … 素材画像を構成する横のコマ数。┐
		; - cel_ynum   … 素材画像を構成する縦のコマ数。┘(ロ)
		; - cel_allnum … 素材画像を構成するすべてのコマ数。これは省略可。
		
			; (イ)(ロ)のどちらかが必須で、省略したほうは自動で計算する。
			; 総コマ数を省略した場合、これも自動で計算する(横コマ数×縦コマ数となる)。
				
				; なお、上記パラメータについて0を指定すると
				; 省略したときと同じ挙動を示す。
	
	
	
	
	
	
	;■３．再生について｜時間
		
		; アニメーションの再生にかける時間を指定できる。
		
		[celanim anim="A" layer="0" x="100" y="100" fps="15"]
		[celanim anim="A" layer="0" x="200" y="100" fps="30"]
		[celanim anim="A" layer="0" x="300" y="100" fps="60"]
		[celanim anim="A" layer="0" x="400" y="100" fps="30" speed="2"]
		[celanim anim="A" layer="0" x="500" y="100" anim_time="5000"]
		
		３．再生時間指定の例。
		[p][freeimage layer="0"]
		
		; [celanim] リファレンス
		; - fps       … 1秒あたりに再生するコマ数。初期値は30。
		; - speed     … 再生速度倍率。2倍速、3倍速などができる。初期値は1。
		; - anim_time … 再生にかかる時間を直接ミリ秒で指定できる。初期値はなし。
		;                これを指定した場合、fps、speedはともに無視される。
	
	
	
	
	
	
	;■４．再生について｜回数や方向
		
		; アニメーションの再生回数や再生方向が指定できる。
		; このへんは[kanim]と同じ。
		
		[celanim anim="A" layer="0" x="100" y="100" fps="60" count="3"]
		[celanim anim="A" layer="0" x="200" y="100" fps="60" count="infinite"]
		[celanim anim="A" layer="0" x="300" y="100" fps="60" count="infinite" direction="reverse"]
		[celanim anim="A" layer="0" x="400" y="100" fps="60" count="infinite" direction="alternate"]
		
		４．再生回数および方向の指定例。
		[p][freeimage layer="0"]
		
		; [celanim] リファレンス
		; - count     … 再生する回数。1, 2, 3, ... infinite(無限) が指定できる。初期値は1。
		; - direction … 再生方向。normal(通常再生)、reverse(逆再生)、alternate(往復再生)が指定できる。初期値はnormal。
	
	
	
	
	
	
	;■５．定義について｜初期値の指定
		
		; 実は[celanim]に指定可能なパラメータはすべて[define_celanim]においても使用できる。
		; そうした場合、「そのanimを[celanim]で再生したときの初期値」にあたる内容を記録することができる。
		
		[define_celanim anim="D" storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/rixu1/00.png" cel_width="64" cel_height="64" layer="0" x="100" y="100" count="3" fps="60"]
		[celanim anim="D"]
		[celanim anim="D" x="200"]
		[celanim anim="D" x="300" count="5"]
		
		５．初期値指定の例①
		[p][freeimage layer="0"]
		
		; [define_celanim] リファレンス
		; - [celanim]で使用可能なすべてのパラメータ … そのanimの初期値を記録。
	
	
	
	
	
	;■６．さらに定義時の初期値も変更可能
		
		; 同じ素材作者のシリーズ素材はたいてい同じ規格で作られていることが多い。
		; そうした素材を複数[define_celanim]する場合に、いちいち
		; 
		; 　　[define_celanim anim="1" cel_width="192" cel_height="192" ... ]
		; 　　[define_celanim anim="2" cel_width="192" cel_height="192" ... ]
		; 　　[define_celanim anim="3" cel_width="192" cel_height="192" ... ]
		; 
		; と記述するのは冗長だ。どれも1コマあたりのサイズは同じなのだから。
		; そこで使えるタグとして、[default_define_celanim]を提供する。
		; これで定義時の初期値を変更することができる。
		
		[default_define_celanim cel_width="64" cel_height="64" fps="60"]
		[define_celanim anim="E" storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/rixu1/01.png"]
		[define_celanim anim="F" storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/rixu1/02.png"]
		[define_celanim anim="G" storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/rixu1/03.png"]
		[celanim anim="E" layer="0" x="100" y="100"]
		[celanim anim="F" layer="0" x="200" y="100"]
		[celanim anim="G" layer="0" x="300" y="100"]
		
		; reset="true"でリセット
		[default_define_celanim reset="true"]
		[define_celanim anim="H" storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/rixu1/04.png" cel_xnum="8" cel_ynum="8"]
		[celanim anim="H" layer="0" x="400" y="100"]
		
		６．初期値指定の例②
		[p][freeimage layer="0"]
		
		; [default_define_celanim] リファレンス
		; - [define_celanim]で使用可能なすべてのパラメータ 
		;         … [default_celanim]の初期値を指定可能。
		; - reset … trueを指定した場合、変更した初期値を元に戻す処理を行う。
	
	
	
	
	
	
	;■７．サイズの指定
		
		[celanim anim="D"         width ="100"]
		[celanim anim="D" x="200" height="100"]
		[celanim anim="D" x="300" width ="100" height="50"]
		[celanim anim="D" x="400" scale="3"]
		[celanim anim="D" x="584" scale="3" pixelate="true"]
		
		７．画像サイズを変更できる
		[p][freeimage layer="0"]
	
	
	
	
	
	
	;■８．合成モードの指定
		
		[celanim anim="D"         mode="normal"]
		[celanim anim="D" x="200" mode="screen"]
		[celanim anim="D" x="300" mode="color-dodge"]
		[celanim anim="D" x="400" mode="difference"]
		
		８．合成モードを使用することもできる
		[p]
		[free_celanim]
	
	
	
	
	
	
	;■９．

		[define_celanim anim="a00 " storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/archer/loop-a.png" cel_width="144" cel_height="144" count="infinite" ]
		[define_celanim anim="a01 " storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/archer/loop-b.png" cel_width="144" cel_height="144" count="infinite" ]
		[define_celanim anim="a02 " storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/archer/a.png"      cel_width="144" cel_height="144" nextanim="a00"   ]
		[define_celanim anim="a03 " storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/archer/b.png"      cel_width="144" cel_height="144" nextanim="a00"   ]
		[define_celanim anim="a04 " storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/archer/c-1.png"    cel_width="144" cel_height="144" nextanim="a04a"  ]
		[define_celanim anim="a04a" storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/archer/c-2.png"    cel_width="144" cel_height="144" nextanim="a00"   ]
		[define_celanim anim="a05 " storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/archer/e.png"      cel_width="144" cel_height="144" nextanim="a00"   ]
		[define_celanim anim="a06 " storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/archer/win.png"    cel_width="144" cel_height="144" autodel="false"  ]
		[define_celanim anim="a07 " storage="http://tempura.html.xdomain.jp/tyranoscript/data/image/anime/archer/lose.png"   cel_width="144" cel_height="144" autodel="false"  ]
		
		[celanim     name="a" anim="a01" centering="true"]
		
		９．再生中のアニメの変更もできる
		[l]
		[celanim_mod name="a" anim="a05"]
		[l]
		[celanim_mod name="a" anim="a02"]
		[l]
		[celanim_mod name="a" anim="a03"]
		[l]
		[celanim_mod name="a" anim="a04"]
		[l]
		[celanim_mod name="a" anim="a06"]
		[l]
		[celanim_mod name="a" anim="a00" time="700"]
		[l]
		[celanim_mod name="a" anim="a07"]
		[l]
		[celanim_mod name="a" anim="a00" time="700"]
		[p][freeimage layer="0"]
		
		
		
		おしまい
		[s]