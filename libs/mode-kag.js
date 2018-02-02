/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */


/****************************
 *      Highlightの定義
 ****************************/
ace.define("ace/mode/kag_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;


// Unicode escape sequences
var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*";

var KAGHighlightRules = function() {
    this.$rules = {
        "start": [
            {
                // 空白行
                token : "text",
                regex : "\\s+|^$",
                next : "start"
            }, {
                // その他
                token: "empty",
                regex: "",
                next: "KAGScenario"
            }
        ],
        "KAGScenario" : [
            {
                // 「;」のコメントアウト
                token : "kag.comment",
                regex : "\\;",
                next: [
                    {token : "kag.comment", regex : "$|^", next : "start"},
                    {defaultToken : "kag.comment", caseInsensitive: true}
                ]
            },
            {
                // [iscript]内の記述→JS
                token: ["paren.lparen", "keyword", "text", "kag.tag.parameter", "keyword.operator", "kag.tag.value", "paren.rparen"],
                regex: "(\\[?)((?:\\s*iscript)|(?:@iscript))(\\s*)((?:cond)?)((?:=)?)(.*?)(\\]?)",
                next: "javascript-start"
            },
            {
                // []式のタグ
                token : ["paren.lparen", "text", "kag.tag.name", "text"],
                regex : "(\\[)(\\s*)(" + identifierRe + ")(\\s*)",
                next  : "KAGParam"
            },
            {
                // @式のタグ
                token : ["kag.tag.name", "text"],
                regex : "(@" + identifierRe + ")(\\s*)",
                next  : "KAGParam"
            },
            {
                // ラベル
                token : ["kag.label.key", "keyword.operator", "kag.label.value"],
                regex : "(\\*" + identifierRe + ")(\\|*)(.*?)$",
                next  : "start"
            }
        ],
        "KAGParam":[
            {
                // 1.「パラメータ名＝パラメータ値」の後に空白 → 再度パラメータ記述へ
                token: ["kag.tag.parameter", "keyword.operator", "kag.tag.value", "text"],
                regex: "(.+?)(=)(.+?)(\\s+)",
                next : "KAGParam"
            }, {
                // 2.「パラメータ名＝パラメータ値」の後に閉じ句 → タグ記述終了
                token: ["kag.tag.parameter", "keyword.operator", "kag.tag.value", "paren.rparen"],
                regex: "(.+?)(=)(.+?)(\\]|$)",
                next : "start"
            }, {
                // パターン1を通過したが、その空白の後にパラメータ記述がなかった場合 → タグ記述終了
                token : "paren.rparen",
                regex : "\\]|$",
                next : "start"
            }, {
                // その他 → startに戻る
                token: "empty",
                regex: "",
                next: "start"
            }
        ],
    };

    this.embedRules(JavaScriptHighlightRules, "javascript-", [
        {
            token: ["paran.lparen", "keyword", "paren.rparen"],
            regex: "(\\[?\\s*)(@?endscript)(\\s*\\]?)",
            next : "start"
        }
    ]);

    this.normalizeRules();
};

oop.inherits(KAGHighlightRules, TextHighlightRules);

exports.KAGHighlightRules = KAGHighlightRules;
});



/****************************
 *      Modeの定義
 *      1.  先頭の define でmode/kagを定義
 *      2.  `var KAGHighlightRules = require("./kag_highlight_rules").KAGHighlightRules;`
 *          の用にRuleを読み込む
 *      3.  `this.HighlightRules = KAGHighlightRules;` Modeに代入
 * ****************************/
ace.define("ace/mode/kag",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/kag_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;

// Rule読み込み
var KAGHighlightRules = require("./kag_highlight_rules").KAGHighlightRules;
//var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;
var WorkerClient = require("../worker/worker_client").WorkerClient;

var Mode = function() {
    this.HighlightRules = KAGHighlightRules;
};
oop.inherits(Mode, TextMode);
exports.Mode = Mode;
});
