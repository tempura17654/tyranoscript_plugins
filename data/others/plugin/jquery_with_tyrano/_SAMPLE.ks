[plugin name=jquery_with_tyrano]

; 前景レイヤをすべて表示
[$show layer_d=chara]

; メッセージレイヤをすべて非表示
[$hide layer_d=message]

; name=akane で画像を出す
[image name=akane layer=0 x=0   y=0 storage=https://tempura17654.github.io/tyranoscript_plugins/data/fgimage/chara/akane/normal.png]
[image            layer=0 x=450 y=0 storage=https://tempura17654.github.io/tyranoscript_plugins/data/fgimage/chara/akane/normal.png]

[l]

; akaneオブジェクトにborderプロパティをセット
[$css name=akane border=5px;solid;pink]

[l]

; 前景レイヤに存在するすべてのimg要素にbackground-colorプロパティをセット
[$css layer=chara slct=img background-color=rgba(255,255,255,.2)]

[l]

; akaneオブジェクトのtopプロパティを300pxまでアニメーション
[$animate name=akane top=300px time=1000]

[l]

; レイヤー0の中身を空にする
[$empty layer_d=0]

[l]

; name=akane で画像を出す
[image name=akane layer=0 x=0   y=0 storage=https://tempura17654.github.io/tyranoscript_plugins/data/fgimage/chara/akane/normal.png]

[l]

; akaneオブジェクトをフェードアウト
[$fadeOut name=akane]

[l]

; akaneオブジェクトをフェードイン
[$fadeIn name=akane]

[l]

; 3000ミリ秒後にakaneオブジェクトにhogehogeクラスとfugafugaクラスを追加
[$addClass name=akane class=hogehoge,fugafuga delay=3000]

[l]

; akaneオブジェクトのsrc属性を変更
[$attr name=akane src=https://tempura17654.github.io/tyranoscript_plugins/data/fgimage/chara/akane/angry.png]

[l]

; akaneオブジェクトのsrc属性とstyle属性とclass属性を削除
[$removeAttr name=akane key=src,style,class]

[s]