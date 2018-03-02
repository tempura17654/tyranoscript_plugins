; エンジンの関数loadGameDataを改造する
; loadGameDataの前に[mask]タグを実行し、
; その処理が終わってから本来のloadGameDataが実行されるようにする
; ==============================================================================
[iscript]

// nextOrder関数のオリジナルを保存
var nextOrder__ORIGIN = TYRANO.kag.ftag.nextOrder;

// loadGameData関数のオリジナルを保存
var loadGameData__ORIGIN = TYRANO.kag.menu.loadGameData;

// loadGameData関数改造。セーブデータをロードするとき、
TYRANO.kag.menu.loadGameData = function () {
    // この関数に渡された引数の配列を保存して、
    var args = arguments;
    // nextOrder関数改造。任意のタグの処理が完了したとき、
    TYRANO.kag.ftag.nextOrder = function () {
        // nextOrder関数をオリジナルに戻して、
        TYRANO.kag.ftag.nextOrder = nextOrder__ORIGIN;
        // loadGameData関数のオリジナルを実行する
        loadGameData__ORIGIN.apply(TYRANO.kag.menu, args);
    };
    // [mask]タグを実行
    // この[mask]タグの処理が終わったとき、
    // 上で改造したnextOrder関数が火を噴く
    TYRANO.kag.ftag.startTag("mask", {
        time: "300",
        color: "black",
    });
};
[endscript]
; ==============================================================================




; ※このスクリプトを動作チェッカー上で動作させるためだけに入れている処理
; エンジンを騙して、make.ksに[mask_off][return]が記録されていることにする
; ※実際には普通にmake.ksに[mask_off][return]と書けばよいです
; ==============================================================================
[iscript]
TYRANO.kag.cache_scenraio["./data/scenario/make.ks"] = {
    array_s: [
        {
            name: "mask_off",
            pm: {
                time: "300",
            },
        },{
            name: "return",
            pm: {},
        },
    ],
};
[endscript]
; ==============================================================================




[bg storage=room.jpg time=0]
[deffont color=0x454D51]
[resetfont]
[position layer=message0 width=960 height=210 top=430 left=0]
[position layer=message0 page=fore frame=frame.png margint=45 marginl=50 marginr=70 marginb=60 opacity=230 ]
[ptext name=chara_name_area layer=message0 color=0xFAFAFA size=24 x=40 y=435]
[chara_config ptext=chara_name_area]
[hidemenubutton]
[button name=role_button role=skip graphic=button/skip.png enterimg=button/skip2.png x=35 y=610]
[button name=role_button role=auto graphic=button/auto.png enterimg=button/auto2.png x=110 y=610]
[button name=role_button role=save graphic=button/save.png enterimg=button/save2.png x=185 y=610]
[button name=role_button role=load graphic=button/load.png enterimg=button/load2.png x=260 y=610]
[button name=role_button role=quicksave graphic=button/qsave.png enterimg=button/qsave2.png x=335 y=610]
[button name=role_button role=quickload graphic=button/qload.png enterimg=button/qload2.png x=410 y=610]
[button name=role_button role=backlog graphic=button/log.png enterimg=button/log2.png x=485 y=610]
[button name=role_button role=window graphic=button/close.png enterimg=button/close2.png x=560 y=610]
[button name=role_button role=fullscreen graphic=button/screen.png enterimg=button/screen2.png x=635 y=610]
[button name=role_button role=menu graphic=button/menu.png enterimg=button/menu2.png x=710 y=610]
[button name=role_button role=sleepgame graphic=button/sleep.png enterimg=button/sleep2.png x=785 y=610 storage=config.ks]
[button name=role_button role=title graphic=button/title.png enterimg=button/title2.png x=860 y=610]

*dummy

ダミーテキスト0[p]
ダミーテキスト1[p]
ダミーテキスト2[p]
ダミーテキスト3[p]
ダミーテキスト4[p]
ダミーテキスト5[p]
ダミーテキスト6[p]
ダミーテキスト7[p]
ダミーテキスト8[p]
ダミーテキスト9[p]

[jump target=dummy]