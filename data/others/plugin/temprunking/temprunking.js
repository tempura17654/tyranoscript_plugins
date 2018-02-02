(function (global) {
	
	var url = TYRANO.kag.stat.mp.url;
	if (url.charAt(url.length - 1) !== "/") {
	  url += "/";
	}
	
	//
	// 管理用オブジェクトtemprunkingを定義
	//
	
	//# temprunking
	var temprunking = {
		
		
		
		//## .urls
		// ランキングの送受信に使うファイルの場所を格納する
		urls: {
			'base'   : url,            // 下記の4ファイルがあるアドレス
			'get'    : 'get.php',      // アップロードを行うPHPファイル
			'put'    : 'put.php',      // アップロードを行うPHPファイル
			'getip'  : 'getip.php',    // IPアドレスを取得するPHPファイル
			'runking': 'runking.json'  // ランキングデータを保存するJSONファイル
		},
		
		
		
		//## .data ランキングに関わるデータなどを格納する。
		data: {
			'runking'        : [],       // ランキングデータ（後に配列となる）
			'lengthOfRunking': 100,      // ランキングの長さ
			'ipAddress      ': 'unknown' // IPアドレス
		},
		
		
		
		//## .logRunking () ランキングデータをコンソールに書き出す。
		logRunking: function () {
			var i, item, runking = this.data['runking'];
			for (i = 0; i < runking.length; i++) {
				item = runking[i];
				console.log((i + 1) + ' ' + item.name + ' ' + item.score);
			};
			console.log('-');
			return this;
		},
		
		
		
		//## .pushRunking (data) ランキングデータに新規データをプッシュする。
		// 1) data --- Object 新規ランキングデータ。
		//      .name      --- String 名前。
		//      .score     --- Number スコア。
		//      .ipAddress --- String IPアドレス。
		pushRunking: function (data) {
			var i, item, isOverwrite = false, runking = this.data['runking'];
			/* 以下は同一IPアドレスのデータをランキングにおいて上書きしたい場合の処理
			// 配列 runking を走査して、
			// 同一IPアドレスのデータがすでにランキングにあるかどうかチェック
			if (data.ipAddress !== 'unknown') {
				for (i = 0; i < runking.length; i++) {
					item = runking[i];
					
					 // あったら
					if (item.ipAddress === data.ipAddress) {
						
						// 上書き
						item.name = data.name;
						item.score = data.score;
						isOverwrite = true;
					};
				};
			}
			*/
			// 新規IPアドレスのデータならばプッシュ
			if (! isOverwrite) runking.push(data);
			// ついでにポップもしておく
			return this.popRunking();
		},
		
		
		
		//## .popRunking () ランキングデータから不要なデータを飛ばす。
		popRunking: function () {
			var runking = this.data['runking'];
			while (runking.length > this.data['lengthOfRunking']) runking.pop();　// 長さを超えている限りポップ
			return this;
		},
		
		
		
		//## .sortRunking ()
		// ランキングデータを並べ替える
		sortRunking: function () {
			var runking = this.data['runking'];
			// 配列 runking の要素(オブジェクト)について、.scoreプロパティの値を比較しながら降順で並べ替える
			runking.sort(function (a, b) {
				// ----------------------------------------
				// a を b より前に並べたい → -1 をリターン
				//            後に並べたい →  1 をリターン
				// ----------------------------------------
				// a が b より大きいならば、a を b より前に → -1 をリターン
				if(a.score > b.score) return -1;
				// a が b より小さいならば、a を b より後に →  1 をリターン
				if(a.score < b.score) return 1;
				return 0;
			});
			return this;
		},
		
		
		
		//## .checkRunking (score)
		// スコアを引数にとって、それがランキング中何位かを返す
		// (アルゴリズム：自身以上のスコアの数を数えて、その数＋１を返す)
		checkRunking: function (score) {
			var i, item, runking = this.data['runking'], runk = 0;
			for (i = 0; i < runking.length; i++) {
				item = runking[i];
				if (score <= item.score) runk++;
				else break;
			};
			return runk + 1;
		},
		
		
		
		//## .get (opt) サーバーからファイルを持ってくる。
		// 1) opt --- Object オプション。
		//     .fileName --- String get.phpに渡す引数。
		//     .success  --- Function 通信成功時に呼ばれる関数。
		//     .error    --- Function 通信失敗時に呼ばれる関数。
		get: function (opt) {
			var that = this;
			$.ajax({
				'url': this.urls['base'] + this.urls['get'], // get.phpを呼び出す
				'data': {
					'fileName': opt.fileName // o$_GET['fileName'] 持ってくるファイル名
				},
				beforeSend : function (xhr) {
					xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				}
			}).done(function (data, textStatus, jqXHR) {
				if (typeof data === 'string') data = JSON.parse(data); // 文字列ならパースしておく
				if (opt.success) opt.success(data);
			}).fail(function (jqXHR, textStatus, errorThrown) {
				if (opt.error) opt.error();
			});
		},
		
		
		
		//## .getRunking (success, error) サーバーからランキングを取ってくる。
		// 1) success --- Funciton 通信成功時に呼ばれる関数。
		// 2) error   --- Function 通信失敗時に呼ばれる関数。
		getRunking: function (success, error) {
			var that = this;
			// .get メソッドを使用
			that.get({
				'fileName': this.urls['runking'],
				'success': function (data) {
					that.data['runking'] = data;
					if (success) success();
				},
				'error': function () {
					var data = [];
					that.data['runking'] = data;
					if (error) error();
				}
			});
		},
		
		
		
		//## .put (opt) サーバーにファイルを置く。
		// 1) opt --- Object オプション。
		//     .fileName --- String put.phpに渡す引数。
		//     .contents --- String put.phpに渡す引数。
		//     .success  --- Function 通信成功時に呼ばれる関数。
		//     .error    --- Function 通信失敗時に呼ばれる関数。
		put: function (opt) {
			$.ajax({
				'url': this.urls['base'] + this.urls['put'], // put.php を呼び出す
				'data': {
					'fileName': opt.fileName,                // $_GET['fileName'] 保存するファイル名
					'contents': JSON.stringify(opt.contents) // $_GET['contents'] JSONで保存するデータ
				},
				beforeSend : function (xhr) {
					xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				}
			}).done(function (echo, textStatus, jqXHR) {
				if (opt.success) opt.success();
			}).fail(function (jqXHR, textStatus, errorThrown) {
				if (opt.error) opt.error();
			});
		},
		
		
		
		//## .putRunking (success, error) いまプロパティとして持っているランキングデータをサーバーに置く。
		// 1) success --- Funciton 通信成功時に呼ばれる関数。
		// 2) error   --- Function 通信失敗時に呼ばれる関数。
		putRunking: function (success, error) {
			this.put({
				'fileName': this.urls['runking'],
				'contents': this.data['runking'],
				'success': success,
				'error': error
			});
		},
		
		
		
		//## .getIPAddress () IPアドレスを取得する。
			// 1) success --- Funciton 通信成功時に呼ばれる関数。
			// 2) error   --- Function 通信失敗時に呼ばれる関数。
		getIPAddress: function (success, error) {
			var that = this;
			$.ajax({
				'url': that.urls['base'] + that.urls['getip'] // getip.phpを呼び出す
			}).done(function (data, textStatus, jqXHR) {
				that.data['ipAddress'] = data; // temprunking.data.ipAddressに格納
				if (success) success();
			}).fail(function (jqXHR, textStatus, errorThrown) {
				that.data['ipAddress'] = 'unknown';
				if (error) error();
			});
		},
		
		
		
		// test
		test: {}
	};
	
	
	//temprunking.getIPAddress();
	
	
	//
	// ティラノスクリプト用のタグを登録
	//
	
	//# new_tag
	var new_tag = {};
	
	
	
	//## [download_runking]
	// ランキングデータをサーバーからダウンロードする。
	// 通信に成功した場合は次のスクリプトに進むが、
	// 失敗した場合は storage + target にジャンプする。
	new_tag['download_runking'] = {
		kag: TYRANO.kag,
		pm: {
			storage: '',
			target: ''
		},
		start: function (pm) {
			var that = this;
			temprunking.getRunking(
				// 通信に成功したとき
				function () {
					that.kag.ftag.nextOrder();
				},
				// 通信に失敗したとき
				function () {
					that.kag.ftag.startTag('jump', pm);
				}
			);
		}
	};
	
	
	
	//## [check_runking]
	// score がランキングにおいて何位に該当するかをチェックして、
	// variable で指定した変数に順位を格納する。
	new_tag['check_runking'] = {
		kag: TYRANO.kag,
		pm: {
			variable: 'tf.runk',
			score: '1000'
		},
		start: function (pm) {
			// 順位をチェック
			var runk = temprunking.checkRunking(parseInt(pm.score));
			// 所定の変数に順位を格納する
			this.kag.evalScript(pm.variable + '=' + runk + ';');
			this.kag.ftag.nextOrder();
		}
	};
	
	
	
	//## [push_runking]
	// name + score をランキングデータに放り込む。
	new_tag['push_runking'] = {
		kag: TYRANO.kag,
		pm: {
			name: '',
			score: '0'
		},
		start: function (pm) {
			// ランキングにプッシュ＋ソートする
			temprunking.pushRunking({
			//'ipAddress': temprunking.data.ipAddress,
				'name': pm.name,
				'score': parseInt(pm.score)
			}).sortRunking();
			this.kag.ftag.nextOrder();
		}
	};
	
	
	
	//## [upload_runking]
	// 現在のランキングデータをサーバーにアップロードする。
	// 通信に成功した場合は次のスクリプトに進むが、
	// 失敗した場合は storage + target にジャンプする。
	new_tag['upload_runking'] = {
		kag: TYRANO.kag,
		pm: {
			storage: '',
			target: ''
		},
		start: function (pm) {
			var that = this;
			// サーバーにデータを置きに行く
			temprunking.putRunking(
				// 通信に成功したとき
				function () {
					that.kag.ftag.nextOrder()
				},
				// 通信に失敗したとき
				function () {
					that.kag.ftag.startTag('jump', pm);
				}
			);
		}
	};
	
	
	
	//## [copy_runking]
	// variable で指定した変数にランキングデータをコピーする。
	new_tag['copy_runking'] = {
		kag: TYRANO.kag,
		pm: {
			variable: 'tf.runking'
		},
		start: function (pm) {
			var that = this;
			// ランキングをコピーする
			var runking = temprunking.data['runking'] || [];
			// 空欄となるダミーデータの生成
			for (var i = 0; i < temprunking.data['lengthOfRunking']; i++) {
				runking[i] = runking[i] || {
					'name': '-',
					'score': '-'
				};
			};
			// 指定した変数にコピーする
			var f  = TYRANO.kag.stat.f;
			var tf = TYRANO.kag.variable.tf;
			var sf = TYRANO.kag.variable.sf;
			eval(pm.variable + '= runking;');
			this.kag.ftag.nextOrder();
		}
	};
	
	
	
	for (var key in new_tag) {
		TYRANO.kag.ftag.master_tag[key] = new_tag[key];
	};
	
	
	
}(window));