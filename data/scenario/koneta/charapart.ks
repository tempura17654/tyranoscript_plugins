[bg storage=room.jpg time=0]
[position width=920 height=211 top=371 left=20]
[position page=fore margint=45 marginl=10 marginr=20 marginb=10 vertical=false opacity=180 color=0x000000]
[ptext name=chara_name_area layer=message0 color=0xFFFFFF size=26 x=30 y=381 bold=bold]
[chara_config ptext=chara_name_area]
[chara_config talk_focus=brightness]

;サブルーチンであかねを定義
[call target=sub_define_akane]

;サブルーチンでゆうこを定義
[call target=sub_define_yuko]

;ゆうこを表示
[chara_show name=yuko width=470 time=500]

#yuko
ゆうこです。[r]
キャラクターパーツのテストを開始します。[l]

;目の差分パーツを変更
[chara_part name=yuko eye=2][l]

;目と口の差分パーツを変更
[chara_part name=yuko eye=1 mouse=3][l]

;メガネを出す
[chara_part name=yuko megane=1][l]

;あかねを出す
[chara_show name=akane time=500]

#akane
[er]通常のキャラクターを出してみます。[l]

#yuko
[er]トークフォーカス機能や自動位置調整機能は、[l]

#akane
[er]このとおり、そのまま使えます。[l]

[chara_hide name=yuko time=500]

#akane
[er]テストを終わります。[l]
[chara_hide name=akane time=500]
#
[er][s]



*sub_define_akane

[chara_new  name=akane storage=chara/akane/normal.png jname=あかね]
[chara_face name=akane face=angry storage=chara/akane/angry.png]
[chara_face name=akane face=doki storage=chara/akane/doki.png]
[chara_face name=akane face=happy storage=chara/akane/happy.png]
[chara_face name=akane face=sad storage=chara/akane/sad.png]

[return]



*sub_define_yuko

;yuko
[chara_new name=yuko storage=chara/yuko/hair_back/ロング.png jname=ゆうこ ] 

;yuko--body_back:体後面
[chara_layer name=yuko part=body_back id=breza storage=chara/yuko/body_back/ブレザー1.png zindex=9 ]

;yuko--body_front:体前面
[chara_layer name=yuko part=body_front id=breza storage=chara/yuko/body_front/ブレザー1.png zindex=10 ]

;yuko--eye:目
[chara_layer name=yuko part=eye id=1 storage=chara/yuko/eye/普通な目(黒め)1.png zindex=20 ]
[chara_layer name=yuko part=eye id=2 storage=chara/yuko/eye/デフォルメ目1.png ]

;yuko--hair_front:髪前面
[chara_layer name=yuko part=hair_front id=ナチュラル storage=chara/yuko/hair_front/ナチュラル.png zindex=40 ]
[chara_layer name=yuko part=hair_front id=くせ毛 storage=chara/yuko/hair_front/くせ毛.png ]

;yuko--head:顔
[chara_layer name=yuko part=head id=1 storage=chara/yuko/head/普通な顔1.png zindex=11]
[chara_layer name=yuko part=head id=2 storage=chara/yuko/head/青ざめた顔1.png ]

;yuko--face:表情
[chara_layer name=yuko part=face id=1 storage=chara/yuko/face_front/素.png zindex=20 ]
[chara_layer name=yuko part=face id=2 storage=chara/yuko/face_front/驚き.png]

;yuko--megane:アクセサリ
[chara_layer name=yuko part=megane id=0 storage=none zindex=30 ]
[chara_layer name=yuko part=megane id=1 storage=chara/yuko/accessory_front/メガネ.png]

[return]
