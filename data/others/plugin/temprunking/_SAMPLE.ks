	[bg storage="room.jpg" time="100"]
	[position layer="message0" left=20 top=400 width=920 height=200 page=fore visible=true]
	[position layer=message0 page=fore margint="45" marginl="50" marginr="70" marginb="60"]
	[layopt layer=message0 visible=true]
	[layopt layer=0 visible=true]
	[ptext name="chara_name_area" layer="message0" color="white" size=24 x=50 y=410]
	[chara_config ptext="chara_name_area"]
	[chara_new  name="akane" storage="chara/akane/normal.png" jname="あかね"  ]
	[chara_face name="akane" face="angry" storage="chara/akane/angry.png"]
	[chara_face name="akane" face="doki" storage="chara/akane/doki.png"]
	[chara_face name="akane" face="happy" storage="chara/akane/happy.png"]
	[chara_face name="akane" face="sad" storage="chara/akane/sad.png"]
	[chara_new  name="yamato"  storage="chara/yamato/normal.png" jname="やまと" ]
	
	
	
	[plugin name="temprunking" url="http://tempura.php.xdomain.jp/tyrano_runking/php"]
	
	
	
	[iscript]
		f.player_name = '名無しさん';
		f.player_score = 1000;
	[endscript]
	
	ランキングのテストを開始します。[l][r]
	まず、スコアを決めてください。[l][r]

*Edit_Score
	
	[clearstack]
	
	半角の数字でお願いいたします。
	
	[edit name="f.player_score" left="280" top="230" width="400" maxchars="10" size="30" height="40"]
	[eval exp="$('.text_box').val(f.player_score)"]
	[button graphic="config/arrow_next.png" target="*Commit_Score" x="440" y="290"]
	[s]

*Commit_Score
	
	[commit]
	[cm]
	[iscript]
		f.player_score = parseInt(f.player_score);
		tf.is_nan = isNaN(f.player_score);
	[endscript]
	[if exp="tf.is_nan"]
		数値に変換できませんでした。[l][r]
		[jump target="*Edit_Score"]
	[endif]
	
	スコアは[font color="yellow"][emb exp="f.player_score"]pt[resetfont]に決定されました。[p]
	
	[download_runking target="*Error"]
	[check_runking score="& f.player_score"]
	
	順位は[font color="yellow"][emb exp="tf.runk"]位[resetfont]です。[p]
	
	[jump target="*Edit_Name"]
	
*Edit_Name
	
	次に、ランキングに登録するための名前を決定してください。
	
	[edit name="f.player_name" left="280" top="230" width="400" maxchars="10" size="30" height="40"]
	[eval exp="$('.text_box').val(f.player_name)"]
	[button graphic="config/arrow_next.png" target="*Commit_Name" x="440" y="290"]
	[s]

*Commit_Name
	
	[commit]
	[cm]
	
	名前は[font color="yellow"][emb exp="f.player_name"][resetfont]ですね。[p]
	これで登録します。[p]
	
	[push_runking name="& f.player_name" score="& f.player_score"]
	[upload_runking target="*Error"]
	
　登録しました。[p]
	ランキングを確認しますか？
	
	[glink color="black" text="頼む"     x="310" y="200" target="*View_Runking" width="240"]
	[glink color="black" text="頼まない" x="310" y="300" target="*End"          width="240"]
	[s]
	
*View_Runking
	
	いまのランキングはこの通りです。
	
	[copy_runking]
	
	[ptext x="150" y=" 70" size="28" edge="0x000000" layer="0" text="1位"]
	[ptext x="250" y=" 70" size="28" edge="0x000000" layer="0" text="& tf.runking[0].name"]
	[ptext x="600" y=" 70" size="28" edge="0x000000" layer="0" text="& tf.runking[0].score + 'pt'"]
	
	[ptext x="150" y="120" size="28" edge="0x000000" layer="0" text="2位"]
	[ptext x="250" y="120" size="28" edge="0x000000" layer="0" text="& tf.runking[1].name"]
	[ptext x="600" y="120" size="28" edge="0x000000" layer="0" text="& tf.runking[1].score + 'pt'"]
	
	[ptext x="150" y="170" size="28" edge="0x000000" layer="0" text="3位"]
	[ptext x="250" y="170" size="28" edge="0x000000" layer="0" text="& tf.runking[2].name"]
	[ptext x="600" y="170" size="28" edge="0x000000" layer="0" text="& tf.runking[2].score + 'pt'"]
	
	[ptext x="150" y="220" size="28" edge="0x000000" layer="0" text="4位"]
	[ptext x="250" y="220" size="28" edge="0x000000" layer="0" text="& tf.runking[3].name"]
	[ptext x="600" y="220" size="28" edge="0x000000" layer="0" text="& tf.runking[3].score + 'pt'"]
	
	[ptext x="150" y="270" size="28" edge="0x000000" layer="0" text="5位"]
	[ptext x="250" y="270" size="28" edge="0x000000" layer="0" text="& tf.runking[4].name"]
	[ptext x="600" y="270" size="28" edge="0x000000" layer="0" text="& tf.runking[4].score + 'pt'"]
	
	[p]
	
	[jump target="*End"]
	
*Error
	
	うまく通信ができませんでした。[p]
	
*End
	
	ランキングのテストを終了します。[s]