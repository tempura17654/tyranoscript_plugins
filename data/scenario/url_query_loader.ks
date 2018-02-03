;copyright STRIKEWORKS/ShikemokuMK
[iscript]
var vars = {}, max = 0, hash = "", array = "";
var url = window.location.search;
hash  = url.slice(1).split('&');
max = hash.length;
for (var i = 0; i < max; i++) {
  array = hash[i].split('=');
  vars[array[0]] = array[1];
}
tf.flag = false;
if(vars.storage){
  mp.storage = $.replaceAll(vars.storage, "www", "/") + ".ks";
  tf.flag = true;
}
else if (vars.koneta) {
  mp.storage = "koneta/" + vars.koneta + ".ks";
  tf.flag = true;
}
else if (vars.plugin) {
  mp.storage = "../others/plugin/" + vars.plugin + "/_SAMPLE.ks";
  tf.flag = true;
}
if(vars.target){
  mp.target=vars.target;
}
[endscript]
[if exp="tf.flag == true"]
  [clearstack]
  [jump storage="&mp.storage" target="&mp.target"]
[endif]