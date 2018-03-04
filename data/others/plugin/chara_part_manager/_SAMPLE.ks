; 画面設定
[bg storage=room.jpg time=0]
[position width=920 height=161 top=451 left=20]
[position page=fore margint=45 marginl=10 marginr=20 marginb=10 vertical=false opacity=180 color=0x000000]
[ptext name=chara_name_area layer=message0 color=0xFFFFFF size=26 x=30 y=461 bold=bold]
[chara_config ptext=chara_name_area]
[chara_config talk_focus=brightness]
[button name=role_button role=quicksave graphic=button/qsave.png enterimg=button/qsave2.png x=770 y=470]
[button name=role_button role=quickload graphic=button/qload.png enterimg=button/qload2.png x=850 y=470]


; プラグイン「キャラクターパーツマネージャ」を読み込む
[plugin name=chara_part_manager autochange=true onlyexist=true partset=true]


; 独自マクロ[yuko_clone]定義
[call target=define_yuko_clone]

; 上で定義したマクロ[yuko_clone]を使ってクローンを生み出す
[yuko_clone name=yuko   jname=ゆうこ]
[yuko_clone name=haruka jname=はるか]
[yuko_clone name=aya    jname=あや  ]

;【NEW!!】ゆうこに表情セットを登録
[chara_layer_set set=うげげ name=yuko head=青ざめ eye=普通3 face=困り(口開き)]
[chara_layer_set set=わーい name=yuko head=普通 eye=閉じ2 face=怒り(口開き)]
[chara_layer_set set=は？   name=yuko head=普通 eye=だる3 face=困り(口開き)]


#
テストを開始します。[p]


*loop

[chara_show name=yuko time=300 width=470]
#yuko
こんにちは。ゆうこだよ[p]
パーツマネージャから自由にパーツを変えてみてね。[p]
「表情セット」機能を使うことで、複数のパーツをまとめて変更することもできるよ。[p]
[chara_part name=yuko set=うげげ]
うげげ！[p]
[chara_part name=yuko set=わーい body_front=ゴスロリ body_back=ゴスロリ]
わーい！[p]

[chara_show name=haruka time=300 width=470]
#haruka
こんにちは。はるかだよ。[p]
パーツマネージャから自由にパーツを変えてみてね。[p]

[chara_show name=aya time=300 width=470]
#aya
こんにちは。あやだよ。[p]
パーツマネージャから自由にパーツを変えてみてね。[p]

#yuko
3人は多いなあ～。[p]

#aya
みんな同じ顔だしね。[p]
じゃあ、はるかを消すよ。[p]

#haruka
そんなあ～。[p]
[chara_hide name=haruka]

#aya
消したよ。[p]
全員消すよ。[p]
[chara_hide_all time=300]

#
全員消えました。[p]

[jump target=loop]



*define_yuko_clone

; ゆうこのクローンを生み出すマクロ[yuko_clone]
; nameとjnameだけを指定して使う
[macro name=yuko_clone]

  [chara_new name=%name storage=chara/yuko/hair_back/ロング.png jname=%jname]

  ;yuko--body_back:体後面
  [chara_layer name=%name part=body_back id=ブレザー storage=chara/yuko/body_back/ブレザー1.png        zindex=10]
  [chara_layer name=%name part=body_back id=セーラー storage=chara/yuko/body_back/セーラー服1.png    ]
  [chara_layer name=%name part=body_back id=ゴスロリ storage=chara/yuko/body_back/ゴスロリ(ミニ)1.png]
  [chara_layer name=%name part=body_back id=私服     storage=chara/yuko/body_back/私服(シャツ)1.png  ]

  ;yuko--body_front:体前面
  [chara_layer name=%name part=body_front id=ブレザー storage=chara/yuko/body_front/ブレザー1.png        zindex=10]
  [chara_layer name=%name part=body_front id=セーラー storage=chara/yuko/body_front/セーラー服1.png    ]
  [chara_layer name=%name part=body_front id=ゴスロリ storage=chara/yuko/body_front/ゴスロリ(ミニ)1.png]
  [chara_layer name=%name part=body_front id=私服     storage=chara/yuko/body_front/私服(シャツ)1.png  ]

  ;yuko--hair_front:髪前面
  [chara_layer name=%name part=hair_front id=インテーク storage=chara/yuko/hair_front/インテーク.png zindex=40]
  [chara_layer name=%name part=hair_front id=ウェーブ   storage=chara/yuko/hair_front/ウェーブ.png  ]
  [chara_layer name=%name part=hair_front id=お嬢様     storage=chara/yuko/hair_front/お嬢様.png    ]
  [chara_layer name=%name part=hair_front id=くせ毛     storage=chara/yuko/hair_front/くせ毛.png    ]
  [chara_layer name=%name part=hair_front id=ナチュラル storage=chara/yuko/hair_front/ナチュラル.png]
  [chara_layer name=%name part=hair_front id=ぱっつん   storage=chara/yuko/hair_front/ぱっつん.png  ]
  [chara_layer name=%name part=hair_front id=ワイルド   storage=chara/yuko/hair_front/ワイルド.png  ]
  [chara_layer name=%name part=hair_front id=横分け     storage=chara/yuko/hair_front/横分け.png    ]
  [chara_layer name=%name part=hair_front id=中分け1    storage=chara/yuko/hair_front/中分け1.png   ]
  [chara_layer name=%name part=hair_front id=中分け2    storage=chara/yuko/hair_front/中分け2.png   ]

  ;yuko--megane:アクセサリ
  [chara_layer name=%name part=accessory id=なし                   storage=none zindex=45 ]
  [chara_layer name=%name part=accessory id=メガネ                 storage=chara/yuko/accessory_front/メガネ.png          ]
  [chara_layer name=%name part=accessory id=アホ毛細め(髪)         storage=chara/yuko/accessory_front/アホ毛細め(髪).png  ]
  [chara_layer name=%name part=accessory id=アホ毛太め(髪)         storage=chara/yuko/accessory_front/アホ毛太め(髪).png  ]
  [chara_layer name=%name part=accessory id=ヘアバントリボン       storage=chara/yuko/accessory_front/ヘアバントリボン.png]
  [chara_layer name=%name part=accessory id=ヘッドドレスリボン(服) storage=chara/yuko/accessory_front/ヘッドドレスリボン(服).png]
  [chara_layer name=%name part=accessory id=ホワイトブリム         storage=chara/yuko/accessory_front/ホワイトブリム.png  ]
  [chara_layer name=%name part=accessory id=メガネ(黒縁)           storage=chara/yuko/accessory_front/メガネ(黒縁).png    ]
  [chara_layer name=%name part=accessory id=触覚(髪)               storage=chara/yuko/accessory_front/触覚(髪).png        ]
  [chara_layer name=%name part=accessory id=天使の輪.              storage=chara/yuko/accessory_front/天使の輪.png        ]

  ;yuko--head:顔
  [chara_layer name=%name part=head id=普通    storage=chara/yuko/head/普通な顔1.png    zindex=11]
  [chara_layer name=%name part=head id=青ざめ  storage=chara/yuko/head/青ざめた顔1.png]

  ;yuko--eye:目
  [chara_layer name=%name part=eye id=普通  storage=chara/yuko/eye/普通な目(黒め)1.png   zindex=20]
  [chara_layer name=%name part=eye id=普通2 storage=chara/yuko/eye/普通な目(黒め)2.png]
  [chara_layer name=%name part=eye id=普通3 storage=chara/yuko/eye/普通な目(黒め)3.png]
  [chara_layer name=%name part=eye id=だる  storage=chara/yuko/eye/だる目(黒め)1.png  ]
  [chara_layer name=%name part=eye id=だる2 storage=chara/yuko/eye/だる目(黒め)2.png  ]
  [chara_layer name=%name part=eye id=だる3 storage=chara/yuko/eye/だる目(黒め)3.png  ]
  [chara_layer name=%name part=eye id=ワル  storage=chara/yuko/eye/ワル目(黒め)1.png  ]
  [chara_layer name=%name part=eye id=ワル2 storage=chara/yuko/eye/ワル目(黒め)2.png  ]
  [chara_layer name=%name part=eye id=ワル3 storage=chara/yuko/eye/ワル目(黒め)3.png  ]
  [chara_layer name=%name part=eye id=閉じ  storage=chara/yuko/eye/閉じ目1.png        ]
  [chara_layer name=%name part=eye id=閉じ2 storage=chara/yuko/eye/閉じ目2.png        ]
  [chara_layer name=%name part=eye id=閉じ3 storage=chara/yuko/eye/閉じ目3.png        ]

  ;yuko--face:表情(眉+口)
  [chara_layer name=%name part=face id=普通         storage=chara/yuko/face_front/素.png            zindex=20]
  [chara_layer name=%name part=face id=驚き         storage=chara/yuko/face_front/驚き.png        ]
  [chara_layer name=%name part=face id=困り(口開き) storage=chara/yuko/face_front/困り(口開き).png]
  [chara_layer name=%name part=face id=困り(口閉じ) storage=chara/yuko/face_front/困り(口閉じ).png]
  [chara_layer name=%name part=face id=三角口(困り) storage=chara/yuko/face_front/三角口(困り).png]
  [chara_layer name=%name part=face id=三角口(素)   storage=chara/yuko/face_front/三角口(素).png  ]
  [chara_layer name=%name part=face id=三角口(怒り) storage=chara/yuko/face_front/三角口(怒り).png]
  [chara_layer name=%name part=face id=照れ(口開き) storage=chara/yuko/face_front/照れ(口開き).png]
  [chara_layer name=%name part=face id=照れ(口閉じ) storage=chara/yuko/face_front/照れ(口閉じ).png]
  [chara_layer name=%name part=face id=笑い(口開き) storage=chara/yuko/face_front/笑い(口開き).png]
  [chara_layer name=%name part=face id=笑い(口閉じ) storage=chara/yuko/face_front/笑い(口閉じ).png]
  [chara_layer name=%name part=face id=怒り(口開き) storage=chara/yuko/face_front/怒り(口開き).png]
  [chara_layer name=%name part=face id=怒り(口閉じ) storage=chara/yuko/face_front/怒り(口閉じ).png]
  [chara_layer name=%name part=face id=猫口(口開き) storage=chara/yuko/face_front/猫口(口開き).png]
  [chara_layer name=%name part=face id=猫口(口閉じ) storage=chara/yuko/face_front/猫口(口閉じ).png]

[endmacro]
[return]