
[plugin name=switch]



[iscript]
f.name = '太郎'
f.num = 25
[endscript]



f.name=[emb exp=f.name]、f.num=[emb exp=f.num]でテスト。[r][r]



f.nameでswitch分岐-->
[switch exp=f.name]
[case is=太郎]
  太郎だ。
[case is=花子]
  花子だ。
[case]
  花子でも太郎でもない。
[endswitch]
[l][r][r]



f.numでswitch分岐-->
[switch exp=f.num]
[case is=20]
  20だ。
[case is=40]
  40だ。
[case]
  20でも40でもない。
[endswitch]
[l][r][r]



f.numでswitch分岐2-->
[switch exp=f.num]
[case is=~20]
  20以下だ。
[case is=~40]
  40以下だ。
[case]
  40より大きい。
[endswitch]
[l][r][r]



f.numでswitch分岐3-->
[switch exp=f.num]
[case is=20~40]
  20以上40以下だ。
[case]
  20以上40以下、ではない。
[endswitch]
[l][r][r]



f.numでswitch分岐4-->
[switch exp=f.num]
[case is=~0]
  0以下だ。
[case is=0~100]
  0より大きく100以下だ。
[case]
  100より大きい。
[endswitch]
[l][r][r]



[s]