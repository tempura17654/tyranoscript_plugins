[loadjs storage="plugin/special_char/kag.parser.js"]
[macro name="special_end"]
	[iscript]
		//初期値の代入
		mp["mean"] = mp["mean"] || "";
		//:を半角の空白に置換する
		mp["mean"] = mp["mean"].replace(/:/g, " ");
		//不正でないか確認
		var success;
		if (mp["mean"] == "") success = false;
		else success = true;
		//不正ならば
		if (!success) {
			alert("[special_end]に不正な入力があります。");
		}
		//不正でなければ
		else {
			TYRANO.kag.parser.specialCharEnd = mp["mean"];
		}
	[endscript]
[endmacro]
[macro name="special_char"]
	[iscript]
		//初期値の代入
		mp["type"] = mp["type"] || "append";
		mp["char"] = mp["char"] || "";
		mp["mean"] = mp["mean"] || "";
		//:を半角の空白に置換する
		mp["mean"] = mp["mean"].replace(/:/g, " ");
		//不正でないか確認
		var success;
		if (mp["char"] == "" || mp["mean"] == "") success = false;
		else success = true;
		//不正ならば
		if (!success) {
			alert("[special_char]に不正な入力があります。");
		}
		//不正でなければ
		else {
			var from, to, froms = mp["char"].split("");
			for (var i = 0; i < froms.length; i++) {
				from = froms[i];
				switch (mp["type"]) {
				case "append":
					to = from + mp["mean"];
					break;
				case "prepend":
					to = mp["mean"] + from;
					break;
				case "replace":
					to = mp["mean"];
					break;
				};
				TYRANO.kag.parser.specialChars.push({
					from: from,
					to: to
				});
			};
		};
	[endscript]
[endmacro]
[return]