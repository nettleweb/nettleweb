/*! For license information please see out.js.LICENSE.txt */
https://nettleweb.com/


/*! Copyright (C) 2024 nettleweb.com; All rights reserved. !*/
"use strict";

(()=>{function e(n){var s=i[n]
if(void 0!==s)return s.exports
var r=i[n]={id:n,loaded:!1,exports:{}}
return t[n](r,r.exports,e),r.loaded=!0,r.exports}var t={5152:(e,t,i)=>{var n=i(215),s=i(4074).Q,r=i(4342).K,o=i(9276).f,a=i(258).a,l=i(916).t
i(6862),i(1686),i(9818),i(6981),i(6034),i(4707),i(7914),t.config=i(5133),t.edit=function(e,i){if("string"==typeof e){var s=e
if(!(e=document.getElementById(s)))throw Error("ace.edit can't find div #"+s)}if(e&&e.env&&e.env.editor instanceof r)return e.env.editor
var o=""
if(e&&/input|textarea/i.test(e.tagName)){var a=e
o=a.value,e=n.createElement("pre"),a.parentNode.replaceChild(e,a)}else e&&(o=e.textContent,e.innerHTML="")
var h=t.createEditSession(o),c=new r(new l(e),h,i),u={document:h,editor:c,onResize:c.resize.bind(c,null)}
return a&&(u.textarea=a),c.on("destroy",(function(){u.editor.container.env=null})),c.container.env=c.env=u,c},t.createEditSession=function(e,t){var i=new o(e,t)
return i.setUndoManager(new a),i},t.Range=s,t.Editor=r,t.EditSession=o,t.UndoManager=a,t.VirtualRenderer=l,t.version=t.config.version},9486:(e,t,i)=>{function n(e,t,i){var n=i?e.column<=t.column:e.column<t.column
return e.row<t.row||e.row==t.row&&n}var s=i(8297),r=i(8770).b
class o{constructor(e,t,i){this.$onChange=this.onChange.bind(this),this.attach(e),"number"!=typeof t?this.setPosition(t.row,t.column):this.setPosition(t,i)}getPosition(){return this.$clipPositionToDocument(this.row,this.column)}getDocument(){return this.document}onChange(e){if(!(e.start.row==e.end.row&&e.start.row!=this.row||e.start.row>this.row)){var t=function(e,t,i){var s="insert"==e.action,r=(s?1:-1)*(e.end.row-e.start.row),o=(s?1:-1)*(e.end.column-e.start.column),a=e.start,l=s?a:e.end
return n(t,a,i)?{row:t.row,column:t.column}:n(l,t,!i)?{row:t.row+r,column:t.column+(t.row==l.row?o:0)}:{row:a.row,column:a.column}}(e,{row:this.row,column:this.column},this.$insertRight)
this.setPosition(t.row,t.column,!0)}}setPosition(e,t,i){var n
if(n=i?{row:e,column:t}:this.$clipPositionToDocument(e,t),this.row!=n.row||this.column!=n.column){var s={row:this.row,column:this.column}
this.row=n.row,this.column=n.column,this._signal("change",{old:s,value:n})}}detach(){this.document.off("change",this.$onChange)}attach(e){this.document=e||this.document,this.document.on("change",this.$onChange)}$clipPositionToDocument(e,t){var i={}
return e>=this.document.getLength()?(i.row=Math.max(0,this.document.getLength()-1),i.column=this.document.getLine(i.row).length):e<0?(i.row=0,i.column=0):(i.row=e,i.column=Math.min(this.document.getLine(i.row).length,Math.max(0,t))),t<0&&(i.column=0),i}}o.prototype.$insertRight=!1,s.implement(o.prototype,r),t.M=o},3610:(e,t)=>{t.T=function(e,t){var i=t.start.row,n=t.start.column,s=e[i]||""
switch(t.action){case"insert":if(1===t.lines.length)e[i]=s.substring(0,n)+t.lines[0]+s.substring(n)
else{var r=[i,1].concat(t.lines)
e.splice.apply(e,r),e[i]=s.substring(0,n)+e[i],e[i+t.lines.length-1]+=s.substring(n)}break
case"remove":var o=t.end.column,a=t.end.row
i===a?e[i]=s.substring(0,n)+s.substring(o):e.splice(i,a-i+1,s.substring(0,n)+e[a].substring(o))}}},8549:(e,t,i)=>{var n=i(8297),s=i(8770).b
class r{constructor(e,t){this.running=!1,this.lines=[],this.states=[],this.currentLine=0,this.tokenizer=e
var i=this
this.$worker=function(){if(i.running){for(var e=new Date,t=i.currentLine,n=-1,s=i.doc,r=t;i.lines[t];)t++
var o=s.getLength(),a=0
for(i.running=!1;t<o;){i.$tokenizeRow(t),n=t
do{t++}while(i.lines[t])
if(++a%5==0&&new Date-e>20){i.running=setTimeout(i.$worker,20)
break}}i.currentLine=t,-1==n&&(n=t),r<=n&&i.fireUpdateEvent(r,n)}}}setTokenizer(e){this.tokenizer=e,this.lines=[],this.states=[],this.start(0)}setDocument(e){this.doc=e,this.lines=[],this.states=[],this.stop()}fireUpdateEvent(e,t){var i={first:e,last:t}
this._signal("update",{data:i})}start(e){this.currentLine=Math.min(e||0,this.currentLine,this.doc.getLength()),this.lines.splice(this.currentLine,this.lines.length),this.states.splice(this.currentLine,this.states.length),this.stop(),this.running=setTimeout(this.$worker,700)}scheduleStart(){this.running||(this.running=setTimeout(this.$worker,700))}$updateOnChange(e){var t=e.start.row,i=e.end.row-t
if(0===i)this.lines[t]=null
else if("remove"==e.action)this.lines.splice(t,i+1,null),this.states.splice(t,i+1,null)
else{var n=Array(i+1)
n.unshift(t,1),this.lines.splice.apply(this.lines,n),this.states.splice.apply(this.states,n)}this.currentLine=Math.min(t,this.currentLine,this.doc.getLength()),this.stop()}stop(){this.running&&clearTimeout(this.running),this.running=!1}getTokens(e){return this.lines[e]||this.$tokenizeRow(e)}getState(e){return this.currentLine==e&&this.$tokenizeRow(e),this.states[e]||"start"}$tokenizeRow(e){var t=this.doc.getLine(e),i=this.states[e-1],n=this.tokenizer.getLineTokens(t,i,e)
return this.states[e]+""!=n.state+""?(this.states[e]=n.state,this.lines[e+1]=null,this.currentLine>e+1&&(this.currentLine=e+1)):this.currentLine==e&&(this.currentLine=e+1),this.lines[e]=n.tokens}cleanup(){this.running=!1,this.lines=[],this.states=[],this.currentLine=0,this.removeAllListeners()}}n.implement(r.prototype,s),t.K=r},2789:(e,t,i)=>{var n=i(8953),s=i(3927),r=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\u202B]/
t.t=class{constructor(e){this.session=e,this.bidiMap={},this.currentRow=null,this.bidiUtil=n,this.charWidths=[],this.EOL="\xac",this.showInvisibles=!0,this.isRtlDir=!1,this.$isRtl=!1,this.line="",this.wrapIndent=0,this.EOF="\xb6",this.RLE="\u202b",this.contentWidth=0,this.fontMetrics=null,this.rtlLineOffset=0,this.wrapOffset=0,this.isMoveLeftOperation=!1,this.seenBidi=r.test(e.getValue())}isBidiRow(e,t,i){return!!this.seenBidi&&(e!==this.currentRow&&(this.currentRow=e,this.updateRowLine(t,i),this.updateBidiMap()),this.bidiMap.bidiLevels)}onChange(e){this.seenBidi?this.currentRow=null:"insert"==e.action&&r.test(e.lines.join("\n"))&&(this.seenBidi=!0,this.currentRow=null)}getDocumentRow(){var e=0,t=this.session.$screenRowCache
if(t.length){var i=this.session.$getRowCacheIndex(t,this.currentRow)
i>=0&&(e=this.session.$docRowCache[i])}return e}getSplitIndex(){var e=0,t=this.session.$screenRowCache
if(t.length)for(var i,n=this.session.$getRowCacheIndex(t,this.currentRow);this.currentRow-e>0&&(i=this.session.$getRowCacheIndex(t,this.currentRow-e-1))===n;)n=i,e++
else e=this.currentRow
return e}updateRowLine(e,t){void 0===e&&(e=this.getDocumentRow())
var i=e===this.session.getLength()-1?this.EOF:this.EOL
if(this.wrapIndent=0,this.line=this.session.getLine(e),this.isRtlDir=this.$isRtl||this.line.charAt(0)===this.RLE,this.session.$useWrapMode){var r=this.session.$wrapData[e]
r&&(void 0===t&&(t=this.getSplitIndex()),t>0&&r.length?(this.wrapIndent=r.indent,this.wrapOffset=this.wrapIndent*this.charWidths[n.L],this.line=t<r.length?this.line.substring(r[t-1],r[t]):this.line.substring(r[r.length-1])):this.line=this.line.substring(0,r[t]),t==r.length&&(this.line+=this.showInvisibles?i:n.DOT))}else this.line+=this.showInvisibles?i:n.DOT
var o,a=this.session,l=0
this.line=this.line.replace(/\t|[\u1100-\u2029, \u202F-\uFFE6]/g,(function(e,t){return"\t"===e||a.isFullWidth(e.charCodeAt(0))?(o="\t"===e?a.getScreenTabSize(t+l):2,l+=o-1,s.stringRepeat(n.DOT,o)):e})),this.isRtlDir&&(this.fontMetrics.$main.textContent=this.line.charAt(this.line.length-1)==n.DOT?this.line.substr(0,this.line.length-1):this.line,this.rtlLineOffset=this.contentWidth-this.fontMetrics.$main.getBoundingClientRect().width)}updateBidiMap(){var e=[]
n.hasBidiCharacters(this.line,e)||this.isRtlDir?this.bidiMap=n.doBidiReorder(this.line,e,this.isRtlDir):this.bidiMap={}}markAsDirty(){this.currentRow=null}updateCharacterWidths(e){if(this.characterWidth!==e.$characterSize.width){this.fontMetrics=e
var t=this.characterWidth=e.$characterSize.width,i=e.$measureCharWidth("\u05d4")
this.charWidths[n.L]=this.charWidths[n.EN]=this.charWidths[n.ON_R]=t,this.charWidths[n.R]=this.charWidths[n.AN]=i,this.charWidths[n.R_H]=.45*i,this.charWidths[n.B]=this.charWidths[n.RLE]=0,this.currentRow=null}}setShowInvisibles(e){this.showInvisibles=e,this.currentRow=null}setEolChar(e){this.EOL=e}setContentWidth(e){this.contentWidth=e}isRtlLine(e){return!!this.$isRtl||(null!=e?this.session.getLine(e).charAt(0)==this.RLE:this.isRtlDir)}setRtlDirection(e,t){for(var i=e.getCursorPosition(),n=e.selection.getSelectionAnchor().row;n<=i.row;n++)t||e.session.getLine(n).charAt(0)!==e.session.$bidiHandler.RLE?t&&e.session.getLine(n).charAt(0)!==e.session.$bidiHandler.RLE&&e.session.doc.insert({column:0,row:n},e.session.$bidiHandler.RLE):e.session.doc.removeInLine(n,0,1)}getPosLeft(e){e-=this.wrapIndent
var t=this.line.charAt(0)===this.RLE?1:0,i=e>t?this.session.getOverwrite()?e:e-1:t,s=n.getVisualFromLogicalIdx(i,this.bidiMap),r=this.bidiMap.bidiLevels,o=0
!this.session.getOverwrite()&&e<=t&&r[s]%2!=0&&s++
for(var a=0;a<s;a++)o+=this.charWidths[r[a]]
return!this.session.getOverwrite()&&e>t&&r[s]%2==0&&(o+=this.charWidths[r[s]]),this.wrapIndent&&(o+=this.isRtlDir?-1*this.wrapOffset:this.wrapOffset),this.isRtlDir&&(o+=this.rtlLineOffset),o}getSelections(e,t){var i,n=this.bidiMap,s=n.bidiLevels,r=[],o=0,a=Math.min(e,t)-this.wrapIndent,l=Math.max(e,t)-this.wrapIndent,h=!1,c=!1,u=0
this.wrapIndent&&(o+=this.isRtlDir?-1*this.wrapOffset:this.wrapOffset)
for(var d,g=0;g<s.length;g++)d=n.logicalFromVisual[g],i=s[g],(h=d>=a&&d<l)&&!c?u=o:!h&&c&&r.push({left:u,width:o-u}),o+=this.charWidths[i],c=h
if(h&&g===s.length&&r.push({left:u,width:o-u}),this.isRtlDir)for(var p=0;p<r.length;p++)r[p].left+=this.rtlLineOffset
return r}offsetToCol(e){this.isRtlDir&&(e-=this.rtlLineOffset)
var t=0,i=(e=Math.max(e,0),0),n=0,s=this.bidiMap.bidiLevels,r=this.charWidths[s[n]]
for(this.wrapIndent&&(e-=this.isRtlDir?-1*this.wrapOffset:this.wrapOffset);e>i+r/2;){if(i+=r,n===s.length-1){r=0
break}r=this.charWidths[s[++n]]}return n>0&&s[n-1]%2!=0&&s[n]%2==0?(e<i&&n--,t=this.bidiMap.logicalFromVisual[n]):n>0&&s[n-1]%2==0&&s[n]%2!=0?t=1+(e>i?this.bidiMap.logicalFromVisual[n]:this.bidiMap.logicalFromVisual[n-1]):this.isRtlDir&&n===s.length-1&&0===r&&s[n-1]%2==0||!this.isRtlDir&&0===n&&s[n]%2!=0?t=1+this.bidiMap.logicalFromVisual[n]:(n>0&&s[n-1]%2!=0&&0!==r&&n--,t=this.bidiMap.logicalFromVisual[n]),0===t&&this.isRtlDir&&t++,t+this.wrapIndent}}},2317:e=>{var t
e.exports={lineMode:!1,pasteCancelled:function(){return!!(t&&t>Date.now()-50)||(t=!1)},cancel:function(){t=Date.now()}}},7439:(e,t,i)=>{var n=i(8297),s=i(1686).MultiHashHandler,r=i(8770).b
class o extends s{constructor(e,t){super(t,e),this.byName=this.commands,this.setDefaultHandler("exec",(function(e){return e.args?e.command.exec(e.editor,e.args,e.event,!1):e.command.exec(e.editor,{},e.event,!0)}))}exec(e,t,i){if(Array.isArray(e)){for(var n=e.length;n--;)if(this.exec(e[n],t,i))return!0
return!1}if("string"==typeof e&&(e=this.commands[e]),!this.canExecute(e,t))return!1
var s={editor:t,command:e,args:i}
return s.returnValue=this._emit("exec",s),this._signal("afterExec",s),!1!==s.returnValue}canExecute(e,t){return"string"==typeof e&&(e=this.commands[e]),!(!e||t&&t.$readOnly&&!e.readOnly||0!=this.$checkCommandState&&e.isAvailable&&!e.isAvailable(t))}toggleRecording(e){if(!this.$inReplay)return e&&e._emit("changeStatus"),this.recording?(this.macro.pop(),this.off("exec",this.$addCommandToMacro),this.macro.length||(this.macro=this.oldMacro),this.recording=!1):(this.$addCommandToMacro||(this.$addCommandToMacro=function(e){this.macro.push([e.command,e.args])}.bind(this)),this.oldMacro=this.macro,this.macro=[],this.on("exec",this.$addCommandToMacro),this.recording=!0)}replay(e){if(!this.$inReplay&&this.macro){if(this.recording)return this.toggleRecording(e)
try{this.$inReplay=!0,this.macro.forEach((function(t){"string"==typeof t?this.exec(t,e):this.exec(t[0],e,t[1])}),this)}finally{this.$inReplay=!1}}}trimMacro(e){return e.map((function(e){return"string"!=typeof e[0]&&(e[0]=e[0].name),e[1]||(e=e[0]),e}))}}n.implement(o.prototype,r),t.F=o},4696:(e,t,i)=>{function n(e,t){return{win:e,mac:t}}var s=i(3927),r=i(5133),o=i(4074).Q
t.P=[{name:"showSettingsMenu",description:"Show settings menu",bindKey:n("Ctrl-,","Command-,"),exec:function(e){r.loadModule("ace/ext/settings_menu",(function(t){t.init(e),e.showSettingsMenu()}))},readOnly:!0},{name:"goToNextError",description:"Go to next error",bindKey:n("Alt-E","F4"),exec:function(e){r.loadModule("ace/ext/error_marker",(function(t){t.showErrorMarker(e,1)}))},scrollIntoView:"animate",readOnly:!0},{name:"goToPreviousError",description:"Go to previous error",bindKey:n("Alt-Shift-E","Shift-F4"),exec:function(e){r.loadModule("ace/ext/error_marker",(function(t){t.showErrorMarker(e,-1)}))},scrollIntoView:"animate",readOnly:!0},{name:"selectall",description:"Select all",bindKey:n("Ctrl-A","Command-A"),exec:function(e){e.selectAll()},readOnly:!0},{name:"centerselection",description:"Center selection",bindKey:n(null,"Ctrl-L"),exec:function(e){e.centerSelection()},readOnly:!0},{name:"gotoline",description:"Go to line...",bindKey:n("Ctrl-L","Command-L"),exec:function(e,t){"number"!=typeof t||isNaN(t)||e.gotoLine(t),e.prompt({$type:"gotoLine"})},readOnly:!0},{name:"fold",bindKey:n("Alt-L|Ctrl-F1","Command-Alt-L|Command-F1"),exec:function(e){e.session.toggleFold(!1)},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"unfold",bindKey:n("Alt-Shift-L|Ctrl-Shift-F1","Command-Alt-Shift-L|Command-Shift-F1"),exec:function(e){e.session.toggleFold(!0)},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"toggleFoldWidget",description:"Toggle fold widget",bindKey:n("F2","F2"),exec:function(e){e.session.toggleFoldWidget()},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"toggleParentFoldWidget",description:"Toggle parent fold widget",bindKey:n("Alt-F2","Alt-F2"),exec:function(e){e.session.toggleFoldWidget(!0)},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"foldall",description:"Fold all",bindKey:n(null,"Ctrl-Command-Option-0"),exec:function(e){e.session.foldAll()},scrollIntoView:"center",readOnly:!0},{name:"foldAllComments",description:"Fold all comments",bindKey:n(null,"Ctrl-Command-Option-0"),exec:function(e){e.session.foldAllComments()},scrollIntoView:"center",readOnly:!0},{name:"foldOther",description:"Fold other",bindKey:n("Alt-0","Command-Option-0"),exec:function(e){e.session.foldAll(),e.session.unfold(e.selection.getAllRanges())},scrollIntoView:"center",readOnly:!0},{name:"unfoldall",description:"Unfold all",bindKey:n("Alt-Shift-0","Command-Option-Shift-0"),exec:function(e){e.session.unfold()},scrollIntoView:"center",readOnly:!0},{name:"findnext",description:"Find next",bindKey:n("Ctrl-K","Command-G"),exec:function(e){e.findNext()},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"findprevious",description:"Find previous",bindKey:n("Ctrl-Shift-K","Command-Shift-G"),exec:function(e){e.findPrevious()},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"selectOrFindNext",description:"Select or find next",bindKey:n("Alt-K","Ctrl-G"),exec:function(e){e.selection.isEmpty()?e.selection.selectWord():e.findNext()},readOnly:!0},{name:"selectOrFindPrevious",description:"Select or find previous",bindKey:n("Alt-Shift-K","Ctrl-Shift-G"),exec:function(e){e.selection.isEmpty()?e.selection.selectWord():e.findPrevious()},readOnly:!0},{name:"find",description:"Find",bindKey:n("Ctrl-F","Command-F"),exec:function(e){r.loadModule("ace/ext/searchbox",(function(t){t.Search(e)}))},readOnly:!0},{name:"overwrite",description:"Overwrite",bindKey:"Insert",exec:function(e){e.toggleOverwrite()},readOnly:!0},{name:"selecttostart",description:"Select to start",bindKey:n("Ctrl-Shift-Home","Command-Shift-Home|Command-Shift-Up"),exec:function(e){e.getSelection().selectFileStart()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"gotostart",description:"Go to start",bindKey:n("Ctrl-Home","Command-Home|Command-Up"),exec:function(e){e.navigateFileStart()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"selectup",description:"Select up",bindKey:n("Shift-Up","Shift-Up|Ctrl-Shift-P"),exec:function(e){e.getSelection().selectUp()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"golineup",description:"Go line up",bindKey:n("Up","Up|Ctrl-P"),exec:function(e,t){e.navigateUp(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selecttoend",description:"Select to end",bindKey:n("Ctrl-Shift-End","Command-Shift-End|Command-Shift-Down"),exec:function(e){e.getSelection().selectFileEnd()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"gotoend",description:"Go to end",bindKey:n("Ctrl-End","Command-End|Command-Down"),exec:function(e){e.navigateFileEnd()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"selectdown",description:"Select down",bindKey:n("Shift-Down","Shift-Down|Ctrl-Shift-N"),exec:function(e){e.getSelection().selectDown()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"golinedown",description:"Go line down",bindKey:n("Down","Down|Ctrl-N"),exec:function(e,t){e.navigateDown(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectwordleft",description:"Select word left",bindKey:n("Ctrl-Shift-Left","Option-Shift-Left"),exec:function(e){e.getSelection().selectWordLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotowordleft",description:"Go to word left",bindKey:n("Ctrl-Left","Option-Left"),exec:function(e){e.navigateWordLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selecttolinestart",description:"Select to line start",bindKey:n("Alt-Shift-Left","Command-Shift-Left|Ctrl-Shift-A"),exec:function(e){e.getSelection().selectLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotolinestart",description:"Go to line start",bindKey:n("Alt-Left|Home","Command-Left|Home|Ctrl-A"),exec:function(e){e.navigateLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectleft",description:"Select left",bindKey:n("Shift-Left","Shift-Left|Ctrl-Shift-B"),exec:function(e){e.getSelection().selectLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotoleft",description:"Go to left",bindKey:n("Left","Left|Ctrl-B"),exec:function(e,t){e.navigateLeft(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectwordright",description:"Select word right",bindKey:n("Ctrl-Shift-Right","Option-Shift-Right"),exec:function(e){e.getSelection().selectWordRight()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotowordright",description:"Go to word right",bindKey:n("Ctrl-Right","Option-Right"),exec:function(e){e.navigateWordRight()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selecttolineend",description:"Select to line end",bindKey:n("Alt-Shift-Right","Command-Shift-Right|Shift-End|Ctrl-Shift-E"),exec:function(e){e.getSelection().selectLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotolineend",description:"Go to line end",bindKey:n("Alt-Right|End","Command-Right|End|Ctrl-E"),exec:function(e){e.navigateLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectright",description:"Select right",bindKey:n("Shift-Right","Shift-Right"),exec:function(e){e.getSelection().selectRight()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotoright",description:"Go to right",bindKey:n("Right","Right|Ctrl-F"),exec:function(e,t){e.navigateRight(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectpagedown",description:"Select page down",bindKey:"Shift-PageDown",exec:function(e){e.selectPageDown()},readOnly:!0},{name:"pagedown",description:"Page down",bindKey:n(null,"Option-PageDown"),exec:function(e){e.scrollPageDown()},readOnly:!0},{name:"gotopagedown",description:"Go to page down",bindKey:n("PageDown","PageDown|Ctrl-V"),exec:function(e){e.gotoPageDown()},readOnly:!0},{name:"selectpageup",description:"Select page up",bindKey:"Shift-PageUp",exec:function(e){e.selectPageUp()},readOnly:!0},{name:"pageup",description:"Page up",bindKey:n(null,"Option-PageUp"),exec:function(e){e.scrollPageUp()},readOnly:!0},{name:"gotopageup",description:"Go to page up",bindKey:"PageUp",exec:function(e){e.gotoPageUp()},readOnly:!0},{name:"scrollup",description:"Scroll up",bindKey:n("Ctrl-Up",null),exec:function(e){e.renderer.scrollBy(0,-2*e.renderer.layerConfig.lineHeight)},readOnly:!0},{name:"scrolldown",description:"Scroll down",bindKey:n("Ctrl-Down",null),exec:function(e){e.renderer.scrollBy(0,2*e.renderer.layerConfig.lineHeight)},readOnly:!0},{name:"selectlinestart",description:"Select line start",bindKey:"Shift-Home",exec:function(e){e.getSelection().selectLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectlineend",description:"Select line end",bindKey:"Shift-End",exec:function(e){e.getSelection().selectLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"togglerecording",description:"Toggle recording",bindKey:n("Ctrl-Alt-E","Command-Option-E"),exec:function(e){e.commands.toggleRecording(e)},readOnly:!0},{name:"replaymacro",description:"Replay macro",bindKey:n("Ctrl-Shift-E","Command-Shift-E"),exec:function(e){e.commands.replay(e)},readOnly:!0},{name:"jumptomatching",description:"Jump to matching",bindKey:n("Ctrl-\\|Ctrl-P","Command-\\"),exec:function(e){e.jumpToMatching()},multiSelectAction:"forEach",scrollIntoView:"animate",readOnly:!0},{name:"selecttomatching",description:"Select to matching",bindKey:n("Ctrl-Shift-\\|Ctrl-Shift-P","Command-Shift-\\"),exec:function(e){e.jumpToMatching(!0)},multiSelectAction:"forEach",scrollIntoView:"animate",readOnly:!0},{name:"expandToMatching",description:"Expand to matching",bindKey:n("Ctrl-Shift-M","Ctrl-Shift-M"),exec:function(e){e.jumpToMatching(!0,!0)},multiSelectAction:"forEach",scrollIntoView:"animate",readOnly:!0},{name:"passKeysToBrowser",description:"Pass keys to browser",bindKey:n(null,null),exec:function(){},passEvent:!0,readOnly:!0},{name:"copy",description:"Copy",exec:function(){},readOnly:!0},{name:"cut",description:"Cut",exec:function(e){var t=e.$copyWithEmptySelection&&e.selection.isEmpty()?e.selection.getLineRange():e.selection.getRange()
e._emit("cut",t),t.isEmpty()||e.session.remove(t),e.clearSelection()},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"paste",description:"Paste",exec:function(e,t){e.$handlePaste(t)},scrollIntoView:"cursor"},{name:"removeline",description:"Remove line",bindKey:n("Ctrl-D","Command-D"),exec:function(e){e.removeLines()},scrollIntoView:"cursor",multiSelectAction:"forEachLine"},{name:"duplicateSelection",description:"Duplicate selection",bindKey:n("Ctrl-Shift-D","Command-Shift-D"),exec:function(e){e.duplicateSelection()},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"sortlines",description:"Sort lines",bindKey:n("Ctrl-Alt-S","Command-Alt-S"),exec:function(e){e.sortLines()},scrollIntoView:"selection",multiSelectAction:"forEachLine"},{name:"togglecomment",description:"Toggle comment",bindKey:n("Ctrl-/","Command-/"),exec:function(e){e.toggleCommentLines()},multiSelectAction:"forEachLine",scrollIntoView:"selectionPart"},{name:"toggleBlockComment",description:"Toggle block comment",bindKey:n("Ctrl-Shift-/","Command-Shift-/"),exec:function(e){e.toggleBlockComment()},multiSelectAction:"forEach",scrollIntoView:"selectionPart"},{name:"modifyNumberUp",description:"Modify number up",bindKey:n("Ctrl-Shift-Up","Alt-Shift-Up"),exec:function(e){e.modifyNumber(1)},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"modifyNumberDown",description:"Modify number down",bindKey:n("Ctrl-Shift-Down","Alt-Shift-Down"),exec:function(e){e.modifyNumber(-1)},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"replace",description:"Replace",bindKey:n("Ctrl-H","Command-Option-F"),exec:function(e){r.loadModule("ace/ext/searchbox",(function(t){t.Search(e,!0)}))}},{name:"undo",description:"Undo",bindKey:n("Ctrl-Z","Command-Z"),exec:function(e){e.undo()}},{name:"redo",description:"Redo",bindKey:n("Ctrl-Shift-Z|Ctrl-Y","Command-Shift-Z|Command-Y"),exec:function(e){e.redo()}},{name:"copylinesup",description:"Copy lines up",bindKey:n("Alt-Shift-Up","Command-Option-Up"),exec:function(e){e.copyLinesUp()},scrollIntoView:"cursor"},{name:"movelinesup",description:"Move lines up",bindKey:n("Alt-Up","Option-Up"),exec:function(e){e.moveLinesUp()},scrollIntoView:"cursor"},{name:"copylinesdown",description:"Copy lines down",bindKey:n("Alt-Shift-Down","Command-Option-Down"),exec:function(e){e.copyLinesDown()},scrollIntoView:"cursor"},{name:"movelinesdown",description:"Move lines down",bindKey:n("Alt-Down","Option-Down"),exec:function(e){e.moveLinesDown()},scrollIntoView:"cursor"},{name:"del",description:"Delete",bindKey:n("Delete","Delete|Ctrl-D|Shift-Delete"),exec:function(e){e.remove("right")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"backspace",description:"Backspace",bindKey:n("Shift-Backspace|Backspace","Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),exec:function(e){e.remove("left")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"cut_or_delete",description:"Cut or delete",bindKey:n("Shift-Delete",null),exec:function(e){if(!e.selection.isEmpty())return!1
e.remove("left")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolinestart",description:"Remove to line start",bindKey:n("Alt-Backspace","Command-Backspace"),exec:function(e){e.removeToLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolineend",description:"Remove to line end",bindKey:n("Alt-Delete","Ctrl-K|Command-Delete"),exec:function(e){e.removeToLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolinestarthard",description:"Remove to line start hard",bindKey:n("Ctrl-Shift-Backspace",null),exec:function(e){var t=e.selection.getRange()
t.start.column=0,e.session.remove(t)},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolineendhard",description:"Remove to line end hard",bindKey:n("Ctrl-Shift-Delete",null),exec:function(e){var t=e.selection.getRange()
t.end.column=Number.MAX_VALUE,e.session.remove(t)},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removewordleft",description:"Remove word left",bindKey:n("Ctrl-Backspace","Alt-Backspace|Ctrl-Alt-Backspace"),exec:function(e){e.removeWordLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removewordright",description:"Remove word right",bindKey:n("Ctrl-Delete","Alt-Delete"),exec:function(e){e.removeWordRight()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"outdent",description:"Outdent",bindKey:n("Shift-Tab","Shift-Tab"),exec:function(e){e.blockOutdent()},multiSelectAction:"forEach",scrollIntoView:"selectionPart"},{name:"indent",description:"Indent",bindKey:n("Tab","Tab"),exec:function(e){e.indent()},multiSelectAction:"forEach",scrollIntoView:"selectionPart"},{name:"blockoutdent",description:"Block outdent",bindKey:n("Ctrl-[","Ctrl-["),exec:function(e){e.blockOutdent()},multiSelectAction:"forEachLine",scrollIntoView:"selectionPart"},{name:"blockindent",description:"Block indent",bindKey:n("Ctrl-]","Ctrl-]"),exec:function(e){e.blockIndent()},multiSelectAction:"forEachLine",scrollIntoView:"selectionPart"},{name:"insertstring",description:"Insert string",exec:function(e,t){e.insert(t)},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"inserttext",description:"Insert text",exec:function(e,t){e.insert(s.stringRepeat(t.text||"",t.times||1))},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"splitline",description:"Split line",bindKey:n(null,"Ctrl-O"),exec:function(e){e.splitLine()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"transposeletters",description:"Transpose letters",bindKey:n("Alt-Shift-X","Ctrl-T"),exec:function(e){e.transposeLetters()},multiSelectAction:function(e){e.transposeSelections(1)},scrollIntoView:"cursor"},{name:"touppercase",description:"To uppercase",bindKey:n("Ctrl-U","Ctrl-U"),exec:function(e){e.toUpperCase()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"tolowercase",description:"To lowercase",bindKey:n("Ctrl-Shift-U","Ctrl-Shift-U"),exec:function(e){e.toLowerCase()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"autoindent",description:"Auto Indent",bindKey:n(null,null),exec:function(e){e.autoIndent()},scrollIntoView:"animate"},{name:"expandtoline",description:"Expand to line",bindKey:n("Ctrl-Shift-L","Command-Shift-L"),exec:function(e){var t=e.selection.getRange()
t.start.column=t.end.column=0,t.end.row++,e.selection.setRange(t,!1)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"openlink",bindKey:n("Ctrl+F3","F3"),exec:function(e){e.openLink()}},{name:"joinlines",description:"Join lines",bindKey:n(null,null),exec:function(e){for(var t=e.selection.isBackwards(),i=t?e.selection.getSelectionLead():e.selection.getSelectionAnchor(),n=t?e.selection.getSelectionAnchor():e.selection.getSelectionLead(),r=e.session.doc.getLine(i.row).length,a=e.session.doc.getTextRange(e.selection.getRange()).replace(/\n\s*/," ").length,l=e.session.doc.getLine(i.row),h=i.row+1;h<=n.row+1;h++){var c=s.stringTrimLeft(s.stringTrimRight(e.session.doc.getLine(h)))
0!==c.length&&(c=" "+c),l+=c}n.row+1<e.session.doc.getLength()-1&&(l+=e.session.doc.getNewLineCharacter()),e.clearSelection(),e.session.doc.replace(new o(i.row,0,n.row+2,0),l),a>0?(e.selection.moveCursorTo(i.row,i.column),e.selection.selectTo(i.row,i.column+a)):(r=e.session.doc.getLine(i.row).length>r?r+1:r,e.selection.moveCursorTo(i.row,r))},multiSelectAction:"forEach",readOnly:!0},{name:"invertSelection",description:"Invert selection",bindKey:n(null,null),exec:function(e){var t=e.session.doc.getLength()-1,i=e.session.doc.getLine(t).length,n=e.selection.rangeList.ranges,s=[]
n.length<1&&(n=[e.selection.getRange()])
for(var r=0;r<n.length;r++)r==n.length-1&&(n[r].end.row===t&&n[r].end.column===i||s.push(new o(n[r].end.row,n[r].end.column,t,i))),0===r?0===n[r].start.row&&0===n[r].start.column||s.push(new o(0,0,n[r].start.row,n[r].start.column)):s.push(new o(n[r-1].end.row,n[r-1].end.column,n[r].start.row,n[r].start.column))
for(e.exitMultiSelectMode(),e.clearSelection(),r=0;r<s.length;r++)e.selection.addRange(s[r],!1)},readOnly:!0,scrollIntoView:"none"},{name:"addLineAfter",description:"Add new line after the current line",exec:function(e){e.selection.clearSelection(),e.navigateLineEnd(),e.insert("\n")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"addLineBefore",description:"Add new line before the current line",exec:function(e){e.selection.clearSelection()
var t=e.getCursorPosition()
e.selection.moveTo(t.row-1,Number.MAX_VALUE),e.insert("\n"),0===t.row&&e.navigateUp()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"openCommandPallete",exec:function(e){e.prompt({$type:"commands"})},readOnly:!0},{name:"openCommandPalette",description:"Open command palette",bindKey:n("F1","F1"),exec:function(e){e.prompt({$type:"commands"})},readOnly:!0},{name:"modeSelect",description:"Change language mode...",bindKey:n(null,null),exec:function(e){e.prompt({$type:"modes"})},readOnly:!0}]
for(var a=1;a<9;a++)t.P.push({name:"foldToLevel"+a,description:"Fold To Level "+a,level:a,exec:function(e){e.session.foldToLevel(this.level)},scrollIntoView:"center",readOnly:!0})},8675:(e,t,i)=>{t.defaultCommands=[{name:"addCursorAbove",description:"Add cursor above",exec:function(e){e.selectMoreLines(-1)},bindKey:{win:"Ctrl-Alt-Up",mac:"Ctrl-Alt-Up"},scrollIntoView:"cursor",readOnly:!0},{name:"addCursorBelow",description:"Add cursor below",exec:function(e){e.selectMoreLines(1)},bindKey:{win:"Ctrl-Alt-Down",mac:"Ctrl-Alt-Down"},scrollIntoView:"cursor",readOnly:!0},{name:"addCursorAboveSkipCurrent",description:"Add cursor above (skip current)",exec:function(e){e.selectMoreLines(-1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Up",mac:"Ctrl-Alt-Shift-Up"},scrollIntoView:"cursor",readOnly:!0},{name:"addCursorBelowSkipCurrent",description:"Add cursor below (skip current)",exec:function(e){e.selectMoreLines(1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Down",mac:"Ctrl-Alt-Shift-Down"},scrollIntoView:"cursor",readOnly:!0},{name:"selectMoreBefore",description:"Select more before",exec:function(e){e.selectMore(-1)},bindKey:{win:"Ctrl-Alt-Left",mac:"Ctrl-Alt-Left"},scrollIntoView:"cursor",readOnly:!0},{name:"selectMoreAfter",description:"Select more after",exec:function(e){e.selectMore(1)},bindKey:{win:"Ctrl-Alt-Right",mac:"Ctrl-Alt-Right"},scrollIntoView:"cursor",readOnly:!0},{name:"selectNextBefore",description:"Select next before",exec:function(e){e.selectMore(-1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Left",mac:"Ctrl-Alt-Shift-Left"},scrollIntoView:"cursor",readOnly:!0},{name:"selectNextAfter",description:"Select next after",exec:function(e){e.selectMore(1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Right",mac:"Ctrl-Alt-Shift-Right"},scrollIntoView:"cursor",readOnly:!0},{name:"toggleSplitSelectionIntoLines",description:"Split selection into lines",exec:function(e){e.multiSelect.rangeCount>1?e.multiSelect.joinSelections():e.multiSelect.splitIntoLines()},bindKey:{win:"Ctrl-Alt-L",mac:"Ctrl-Alt-L"},readOnly:!0},{name:"splitSelectionIntoLines",description:"Split into lines",exec:function(e){e.multiSelect.splitIntoLines()},readOnly:!0},{name:"alignCursors",description:"Align cursors",exec:function(e){e.alignCursors()},bindKey:{win:"Ctrl-Alt-A",mac:"Ctrl-Alt-A"},scrollIntoView:"cursor"},{name:"findAll",description:"Find all",exec:function(e){e.findAll()},bindKey:{win:"Ctrl-Alt-K",mac:"Ctrl-Alt-G"},scrollIntoView:"cursor",readOnly:!0}],t.multiSelectCommands=[{name:"singleSelection",description:"Single selection",bindKey:"esc",exec:function(e){e.exitMultiSelectMode()},scrollIntoView:"cursor",readOnly:!0,isAvailable:function(e){return e&&e.inMultiSelectMode}}]
var n=i(1686).HashHandler
t.keyboardHandler=new n(t.multiSelectCommands)},5133:(e,t,i)=>{e=i.nmd(e)
var n=i(3927),s=i(5700),r=i(215),o=i(8913).o
e.exports=t=new o
var a,l={packaged:!1,workerPath:null,modePath:null,themePath:null,basePath:"",suffix:".js",$moduleUrls:{},loadWorkerFromBlob:!0,sharedPopups:!1,useStrictCSP:null}
t.get=function(e){if(!l.hasOwnProperty(e))throw Error("Unknown config key: "+e)
return l[e]},t.set=function(e,t){if(l.hasOwnProperty(e))l[e]=t
else if(0==this.setDefaultValue("",e,t))throw Error("Unknown config key: "+e)
"useStrictCSP"==e&&r.useStrictCSP(t)},t.all=function(){return n.copyObject(l)},t.$modes={},t.moduleUrl=function(e,t){if(l.$moduleUrls[e])return l.$moduleUrls[e]
var i=e.split("/"),n="snippets"==(t=t||i[i.length-2]||"")?"/":"-",s=i[i.length-1]
if("worker"==t&&"-"==n){var r=RegExp("^"+t+"[\\-_]|[\\-_]"+t+"$","g")
s=s.replace(r,"")}(!s||s==t)&&i.length>1&&(s=i[i.length-2])
var o=l[t+"Path"]
return null==o?o=l.basePath:"/"==n&&(t=n=""),o&&"/"!=o.slice(-1)&&(o+="/"),o+t+n+s+this.get("suffix")},t.setModuleUrl=function(e,t){return l.$moduleUrls[e]=t},t.setLoader=function(e){a=e},t.dynamicModules=Object.create(null),t.$loading={},t.$loaded={},t.loadModule=function(e,n){var r
if(Array.isArray(e))var o=e[0],l=e[1]
else"string"==typeof e&&(l=e)
var c=function(e){if(e&&!t.$loading[l])return n&&n(e)
if(t.$loading[l]||(t.$loading[l]=[]),t.$loading[l].push(n),!(t.$loading[l].length>1)){var r=function(){!function(e,t){"ace/theme/textmate"===e||"./theme/textmate"===e?t(null,i(4707)):a&&a(e,t)}(l,(function(e,i){i&&(t.$loaded[l]=i),t._emit("load.module",{name:l,module:i})
var n=t.$loading[l]
t.$loading[l]=null,n.forEach((function(e){e&&e(i)}))}))}
if(!t.get("packaged"))return r()
s.loadScript(t.moduleUrl(l,o),r),h()}}
if(t.dynamicModules[l])t.dynamicModules[l]().then((function(e){e.default?c(e.default):c(e)}))
else{try{r=this.$require(l)}catch(e){}c(r||t.$loaded[l])}},t.$require=function(t){if("function"==typeof e.require)return e.require(t)},t.setModuleLoader=function(e,i){t.dynamicModules[e]=i}
var h=function(){l.basePath||l.workerPath||l.modePath||l.themePath||Object.keys(l.$moduleUrls).length||(h=function(){})}
t.version="1.36.2"},2364:e=>{e.exports='\n.ace_br1 {border-top-left-radius    : 3px;}\n.ace_br2 {border-top-right-radius   : 3px;}\n.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}\n.ace_br4 {border-bottom-right-radius: 3px;}\n.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}\n.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}\n.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}\n.ace_br8 {border-bottom-left-radius : 3px;}\n.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}\n.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}\n.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}\n.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}\n.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}\n.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}\n.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}\n\n\n.ace_editor {\n    position: relative;\n    overflow: hidden;\n    padding: 0;\n    font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'Source Code Pro\', \'source-code-pro\', monospace;\n    direction: ltr;\n    text-align: left;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    forced-color-adjust: none;\n}\n\n.ace_scroller {\n    position: absolute;\n    overflow: hidden;\n    top: 0;\n    bottom: 0;\n    background-color: inherit;\n    -ms-user-select: none;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    cursor: text;\n}\n\n.ace_content {\n    position: absolute;\n    box-sizing: border-box;\n    min-width: 100%;\n    contain: style size layout;\n    font-variant-ligatures: no-common-ligatures;\n}\n\n.ace_keyboard-focus:focus {\n    box-shadow: inset 0 0 0 2px #5E9ED6;\n    outline: none;\n}\n\n.ace_dragging .ace_scroller:before{\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    content: \'\';\n    background: rgba(250, 250, 250, 0.01);\n    z-index: 1000;\n}\n.ace_dragging.ace_dark .ace_scroller:before{\n    background: rgba(0, 0, 0, 0.01);\n}\n\n.ace_gutter {\n    position: absolute;\n    overflow : hidden;\n    width: auto;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    cursor: default;\n    z-index: 4;\n    -ms-user-select: none;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    contain: style size layout;\n}\n\n.ace_gutter-active-line {\n    position: absolute;\n    left: 0;\n    right: 0;\n}\n\n.ace_scroller.ace_scroll-left:after {\n    content: "";\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;\n    pointer-events: none;\n}\n\n.ace_gutter-cell, .ace_gutter-cell_svg-icons {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    padding-left: 19px;\n    padding-right: 6px;\n    background-repeat: no-repeat;\n}\n\n.ace_gutter-cell_svg-icons .ace_gutter_annotation {\n    margin-left: -14px;\n    float: left;\n}\n\n.ace_gutter-cell .ace_gutter_annotation {\n    margin-left: -19px;\n    float: left;\n}\n\n.ace_gutter-cell.ace_error, .ace_icon.ace_error, .ace_icon.ace_error_fold, .ace_gutter-cell.ace_security, .ace_icon.ace_security, .ace_icon.ace_security_fold {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");\n    background-repeat: no-repeat;\n    background-position: 2px center;\n}\n\n.ace_gutter-cell.ace_warning, .ace_icon.ace_warning, .ace_icon.ace_warning_fold {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");\n    background-repeat: no-repeat;\n    background-position: 2px center;\n}\n\n.ace_gutter-cell.ace_info, .ace_icon.ace_info, .ace_gutter-cell.ace_hint, .ace_icon.ace_hint {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");\n    background-repeat: no-repeat;\n    background-position: 2px center;\n}\n\n.ace_dark .ace_gutter-cell.ace_info, .ace_dark .ace_icon.ace_info, .ace_dark .ace_gutter-cell.ace_hint, .ace_dark .ace_icon.ace_hint {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");\n}\n\n.ace_icon_svg.ace_error {\n    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxNiI+CjxnIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJyZWQiIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIj4KPGNpcmNsZSBmaWxsPSJub25lIiBjeD0iOCIgY3k9IjgiIHI9IjciIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGxpbmUgeDE9IjExIiB5MT0iNSIgeDI9IjUiIHkyPSIxMSIvPgo8bGluZSB4MT0iMTEiIHkxPSIxMSIgeDI9IjUiIHkyPSI1Ii8+CjwvZz4KPC9zdmc+");\n    background-color: crimson;\n}\n.ace_icon_svg.ace_security {\n    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iZGFya29yYW5nZSIgZmlsbD0ibm9uZSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iPgogICAgICAgIDxwYXRoIGNsYXNzPSJzdHJva2UtbGluZWpvaW4tcm91bmQiIGQ9Ik04IDE0LjgzMDdDOCAxNC44MzA3IDIgMTIuOTA0NyAyIDguMDg5OTJWMy4yNjU0OEM1LjMxIDMuMjY1NDggNy45ODk5OSAxLjM0OTE4IDcuOTg5OTkgMS4zNDkxOEM3Ljk4OTk5IDEuMzQ5MTggMTAuNjkgMy4yNjU0OCAxNCAzLjI2NTQ4VjguMDg5OTJDMTQgMTIuOTA0NyA4IDE0LjgzMDcgOCAxNC44MzA3WiIvPgogICAgICAgIDxwYXRoIGQ9Ik0yIDguMDg5OTJWMy4yNjU0OEM1LjMxIDMuMjY1NDggNy45ODk5OSAxLjM0OTE4IDcuOTg5OTkgMS4zNDkxOCIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMy45OSA4LjA4OTkyVjMuMjY1NDhDMTAuNjggMy4yNjU0OCA4IDEuMzQ5MTggOCAxLjM0OTE4Ii8+CiAgICAgICAgPHBhdGggY2xhc3M9InN0cm9rZS1saW5lam9pbi1yb3VuZCIgZD0iTTggNFY5Ii8+CiAgICAgICAgPHBhdGggY2xhc3M9InN0cm9rZS1saW5lam9pbi1yb3VuZCIgZD0iTTggMTBWMTIiLz4KICAgIDwvZz4KPC9zdmc+");\n    background-color: crimson;\n}\n.ace_icon_svg.ace_warning {\n    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxNiI+CjxnIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJkYXJrb3JhbmdlIiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+Cjxwb2x5Z29uIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9Im5vbmUiIHBvaW50cz0iOCAxIDE1IDE1IDEgMTUgOCAxIi8+CjxyZWN0IHg9IjgiIHk9IjEyIiB3aWR0aD0iMC4wMSIgaGVpZ2h0PSIwLjAxIi8+CjxsaW5lIHgxPSI4IiB5MT0iNiIgeDI9IjgiIHkyPSIxMCIvPgo8L2c+Cjwvc3ZnPg==");\n    background-color: darkorange;\n}\n.ace_icon_svg.ace_info {\n    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxNiI+CjxnIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJibHVlIiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+CjxjaXJjbGUgZmlsbD0ibm9uZSIgY3g9IjgiIGN5PSI4IiByPSI3IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjxwb2x5bGluZSBwb2ludHM9IjggMTEgOCA4Ii8+Cjxwb2x5bGluZSBwb2ludHM9IjkgOCA2IDgiLz4KPGxpbmUgeDE9IjEwIiB5MT0iMTEiIHgyPSI2IiB5Mj0iMTEiLz4KPHJlY3QgeD0iOCIgeT0iNSIgd2lkdGg9IjAuMDEiIGhlaWdodD0iMC4wMSIvPgo8L2c+Cjwvc3ZnPg==");\n    background-color: royalblue;\n}\n.ace_icon_svg.ace_hint {\n    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0ic2lsdmVyIiBmaWxsPSJub25lIiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+CiAgICAgICAgPHBhdGggY2xhc3M9InN0cm9rZS1saW5lam9pbi1yb3VuZCIgZD0iTTYgMTRIMTAiLz4KICAgICAgICA8cGF0aCBkPSJNOCAxMUg5QzkgOS40NzAwMiAxMiA4LjU0MDAyIDEyIDUuNzYwMDJDMTIuMDIgNC40MDAwMiAxMS4zOSAzLjM2MDAyIDEwLjQzIDIuNjcwMDJDOSAxLjY0MDAyIDcuMDAwMDEgMS42NDAwMiA1LjU3MDAxIDIuNjcwMDJDNC42MTAwMSAzLjM2MDAyIDMuOTggNC40MDAwMiA0IDUuNzYwMDJDNCA4LjU0MDAyIDcuMDAwMDEgOS40NzAwMiA3LjAwMDAxIDExSDhaIi8+CiAgICA8L2c+Cjwvc3ZnPg==");\n    background-color: silver;\n}\n\n.ace_icon_svg.ace_error_fold {\n    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxNiIgZmlsbD0ibm9uZSI+CiAgPHBhdGggZD0ibSAxOC45Mjk4NTEsNy44Mjk4MDc2IGMgMC4xNDYzNTMsNi4zMzc0NjA0IC02LjMyMzE0Nyw3Ljc3Nzg0NDQgLTcuNDc3OTEyLDcuNzc3ODQ0NCAtMi4xMDcyNzI2LC0wLjEyODc1IDUuMTE3Njc4LDAuMzU2MjQ5IDUuMDUxNjk4LC03Ljg3MDA2MTggLTAuNjA0NjcyLC04LjAwMzk3MzQ5IC03LjA3NzI3MDYsLTcuNTYzMTE4OSAtNC44NTczLC03LjQzMDM5NTU2IDEuNjA2LC0wLjExNTE0MjI1IDYuODk3NDg1LDEuMjYyNTQ1OTYgNy4yODM1MTQsNy41MjI2MTI5NiB6IiBmaWxsPSJjcmltc29uIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0ibSA4LjExNDc1NjIsMi4wNTI5ODI4IGMgMy4zNDkxNjk4LDAgNi4wNjQxMzI4LDIuNjc2ODYyNyA2LjA2NDEzMjgsNS45Nzg5NTMgMCwzLjMwMjExMjIgLTIuNzE0OTYzLDUuOTc4OTIwMiAtNi4wNjQxMzI4LDUuOTc4OTIwMiAtMy4zNDkxNDczLDAgLTYuMDY0MTc3MiwtMi42NzY4MDggLTYuMDY0MTc3MiwtNS45Nzg5MjAyIDAuMDA1MzksLTMuMjk5ODg2MSAyLjcxNzI2NTYsLTUuOTczNjQwOCA2LjA2NDE3NzIsLTUuOTc4OTUzIHogbSAwLC0xLjczNTgyNzE5IGMgLTQuMzIxNDgzNiwwIC03LjgyNDc0MDM4LDMuNDU0MDE4NDkgLTcuODI0NzQwMzgsNy43MTQ3ODAxOSAwLDQuMjYwNzI4MiAzLjUwMzI1Njc4LDcuNzE0NzQ1MiA3LjgyNDc0MDM4LDcuNzE0NzQ1MiA0LjMyMTQ0OTgsMCA3LjgyNDY5OTgsLTMuNDU0MDE3IDcuODI0Njk5OCwtNy43MTQ3NDUyIDAsLTIuMDQ2MDkxNCAtMC44MjQzOTIsLTQuMDA4MzY3MiAtMi4yOTE3NTYsLTUuNDU1MTc0NiBDIDEyLjE4MDIyNSwxLjEyOTk2NDggMTAuMTkwMDEzLDAuMzE3MTU1NjEgOC4xMTQ3NTYyLDAuMzE3MTU1NjEgWiBNIDYuOTM3NDU2Myw4LjI0MDU5ODUgNC42NzE4Njg1LDEwLjQ4NTg1MiA2LjAwODY4MTQsMTEuODc2NzI4IDguMzE3MDAzNSw5LjYwMDc5MTEgMTAuNjI1MzM3LDExLjg3NjcyOCAxMS45NjIxMzgsMTAuNDg1ODUyIDkuNjk2NTUwOCw4LjI0MDU5ODUgMTEuOTYyMTM4LDYuMDA2ODA2NiAxMC41NzMyNDYsNC42Mzc0MzM1IDguMzE3MDAzNSw2Ljg3MzQyOTcgNi4wNjA3NjA3LDQuNjM3NDMzNSA0LjY3MTg2ODUsNi4wMDY4MDY2IFoiIGZpbGw9ImNyaW1zb24iIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=");\n    background-color: crimson;\n}\n.ace_icon_svg.ace_security_fold {\n    -webkit-mask-image: url("data:image/svg+xml;base64,CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTcgMTQiIGZpbGw9Im5vbmUiPgogICAgPHBhdGggZD0iTTEwLjAwMDEgMTMuNjk5MkMxMC4wMDAxIDEzLjY5OTIgMTEuOTI0MSAxMy40NzYzIDEzIDEyLjY5OTJDMTQuNDEzOSAxMS42NzgxIDE2IDEwLjUgMTYuMTI1MSA2LjgxMTI2VjIuNTg5ODdDMTYuMTI1MSAyLjU0NzY4IDE2LjEyMjEgMi41MDYxOSAxNi4xMTY0IDIuNDY1NTlWMS43MTQ4NUgxNS4yNDE0TDE1LjIzMDcgMS43MTQ4NEwxNC42MjUxIDEuNjk5MjJWNi44MTEyM0MxNC42MjUxIDguNTEwNjEgMTQuNjI1MSA5LjQ2NDYxIDEyLjc4MjQgMTEuNzIxQzEyLjE1ODYgMTIuNDg0OCAxMC4wMDAxIDEzLjY5OTIgMTAuMDAwMSAxMy42OTkyWiIgZmlsbD0iY3JpbXNvbiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuMzM2MDkgMC4zNjc0NzVDNy4wMzIxNCAwLjE1MjY1MiA2LjYyNTQ4IDAuMTUzNjE0IDYuMzIyNTMgMC4zNjk5OTdMNi4zMDg2OSAwLjM3OTU1NEM2LjI5NTUzIDAuMzg4NTg4IDYuMjczODggMC40MDMyNjYgNi4yNDQxNyAwLjQyMjc4OUM2LjE4NDcxIDAuNDYxODYgNi4wOTMyMSAwLjUyMDE3MSA1Ljk3MzEzIDAuNTkxMzczQzUuNzMyNTEgMC43MzQwNTkgNS4zNzk5IDAuOTI2ODY0IDQuOTQyNzkgMS4xMjAwOUM0LjA2MTQ0IDEuNTA5NyAyLjg3NTQxIDEuODgzNzcgMS41ODk4NCAxLjg4Mzc3SDAuNzE0ODQ0VjIuNzU4NzdWNi45ODAxNUMwLjcxNDg0NCA5LjQ5Mzc0IDIuMjg4NjYgMTEuMTk3MyAzLjcwMjU0IDEyLjIxODVDNC40MTg0NSAxMi43MzU1IDUuMTI4NzQgMTMuMTA1MyA1LjY1NzMzIDEzLjM0NTdDNS45MjI4NCAxMy40NjY0IDYuMTQ1NjYgMTMuNTU1OSA2LjMwNDY1IDEzLjYxNjFDNi4zODQyMyAxMy42NDYyIDYuNDQ4MDUgMTMuNjY5IDYuNDkzNDkgMTMuNjg0OEM2LjUxNjIyIDEzLjY5MjcgNi41MzQzOCAxMy42OTg5IDYuNTQ3NjQgMTMuNzAzM0w2LjU2MzgyIDEzLjcwODdMNi41NjkwOCAxMy43MTA0TDYuNTcwOTkgMTMuNzExTDYuODM5ODQgMTMuNzUzM0w2LjU3MjQyIDEzLjcxMTVDNi43NDYzMyAxMy43NjczIDYuOTMzMzUgMTMuNzY3MyA3LjEwNzI3IDEzLjcxMTVMNy4xMDg3IDEzLjcxMUw3LjExMDYxIDEzLjcxMDRMNy4xMTU4NyAxMy43MDg3TDcuMTMyMDUgMTMuNzAzM0M3LjE0NTMxIDEzLjY5ODkgNy4xNjM0NiAxMy42OTI3IDcuMTg2MTkgMTMuNjg0OEM3LjIzMTY0IDEzLjY2OSA3LjI5NTQ2IDEzLjY0NjIgNy4zNzUwMyAxMy42MTYxQzcuNTM0MDMgMTMuNTU1OSA3Ljc1Njg1IDEzLjQ2NjQgOC4wMjIzNiAxMy4zNDU3QzguNTUwOTUgMTMuMTA1MyA5LjI2MTIzIDEyLjczNTUgOS45NzcxNSAxMi4yMTg1QzExLjM5MSAxMS4xOTczIDEyLjk2NDggOS40OTM3NyAxMi45NjQ4IDYuOTgwMThWMi43NTg4QzEyLjk2NDggMi43MTY2IDEyLjk2MTkgMi42NzUxMSAxMi45NTYxIDIuNjM0NTFWMS44ODM3N0gxMi4wODExQzEyLjA3NzUgMS44ODM3NyAxMi4wNzQgMS44ODM3NyAxMi4wNzA0IDEuODgzNzdDMTAuNzk3OSAxLjg4MDA0IDkuNjE5NjIgMS41MTEwMiA4LjczODk0IDEuMTI0ODZDOC43MzUzNCAxLjEyMzI3IDguNzMxNzQgMS4xMjE2OCA4LjcyODE0IDEuMTIwMDlDOC4yOTEwMyAwLjkyNjg2NCA3LjkzODQyIDAuNzM0MDU5IDcuNjk3NzkgMC41OTEzNzNDNy41Nzc3MiAwLjUyMDE3MSA3LjQ4NjIyIDAuNDYxODYgNy40MjY3NiAwLjQyMjc4OUM3LjM5NzA1IDAuNDAzMjY2IDcuMzc1MzkgMC4zODg1ODggNy4zNjIyNCAwLjM3OTU1NEw3LjM0ODk2IDAuMzcwMzVDNy4zNDg5NiAwLjM3MDM1IDcuMzQ4NDcgMC4zNzAwMiA3LjM0NTYzIDAuMzc0MDU0TDcuMzM3NzkgMC4zNjg2NTlMNy4zMzYwOSAwLjM2NzQ3NVpNOC4wMzQ3MSAyLjcyNjkxQzguODYwNCAzLjA5MDYzIDkuOTYwNjYgMy40NjMwOSAxMS4yMDYxIDMuNTg5MDdWNi45ODAxNUgxMS4yMTQ4QzExLjIxNDggOC42Nzk1MyAxMC4xNjM3IDkuOTI1MDcgOC45NTI1NCAxMC43OTk4QzguMzU1OTUgMTEuMjMwNiA3Ljc1Mzc0IDExLjU0NTQgNy4yOTc5NiAxMS43NTI3QzcuMTE2NzEgMTEuODM1MSA2Ljk2MDYyIDExLjg5OTYgNi44Mzk4NCAxMS45NDY5QzYuNzE5MDYgMTEuODk5NiA2LjU2Mjk3IDExLjgzNTEgNi4zODE3MyAxMS43NTI3QzUuOTI1OTUgMTEuNTQ1NCA1LjMyMzczIDExLjIzMDYgNC43MjcxNSAxMC43OTk4QzMuNTE2MDMgOS45MjUwNyAyLjQ2NDg0IDguNjc5NTUgMi40NjQ4NCA2Ljk4MDE4VjMuNTg5MDlDMy43MTczOCAzLjQ2MjM5IDQuODIzMDggMy4wODYzOSA1LjY1MDMzIDIuNzIwNzFDNi4xNDIyOCAyLjUwMzI0IDYuNTQ0ODUgMi4yODUzNyA2LjgzMjU0IDIuMTE2MjRDNy4xMjE4MSAyLjI4NTM1IDcuNTI3IDIuNTAzNTIgOC4wMjE5NiAyLjcyMTMxQzguMDI2MiAyLjcyMzE3IDguMDMwNDUgMi43MjUwNCA4LjAzNDcxIDIuNzI2OTFaTTUuOTY0ODQgMy40MDE0N1Y3Ljc3NjQ3SDcuNzE0ODRWMy40MDE0N0g1Ljk2NDg0Wk01Ljk2NDg0IDEwLjQwMTVWOC42NTE0N0g3LjcxNDg0VjEwLjQwMTVINS45NjQ4NFoiIGZpbGw9ImNyaW1zb24iIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=");\n    background-color: crimson;\n}\n.ace_icon_svg.ace_warning_fold {\n    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyMCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC43NzY5IDE0LjczMzdMOC42NTE5MiAyLjQ4MzY5QzguMzI5NDYgMS44Mzg3NyA3LjQwOTEzIDEuODM4NzcgNy4wODY2NyAyLjQ4MzY5TDAuOTYxNjY5IDE0LjczMzdDMC42NzA3NzUgMTUuMzE1NSAxLjA5MzgzIDE2IDEuNzQ0MjkgMTZIMTMuOTk0M0MxNC42NDQ4IDE2IDE1LjA2NzggMTUuMzE1NSAxNC43NzY5IDE0LjczMzdaTTMuMTYwMDcgMTQuMjVMNy44NjkyOSA0LjgzMTU2TDEyLjU3ODUgMTQuMjVIMy4xNjAwN1pNOC43NDQyOSAxMS42MjVWMTMuMzc1SDYuOTk0MjlWMTEuNjI1SDguNzQ0MjlaTTYuOTk0MjkgMTAuNzVWNy4yNUg4Ljc0NDI5VjEwLjc1SDYuOTk0MjlaIiBmaWxsPSIjRUM3MjExIi8+CjxwYXRoIGQ9Ik0xMS4xOTkxIDIuOTUyMzhDMTAuODgwOSAyLjMxNDY3IDEwLjM1MzcgMS44MDUyNiA5LjcwNTUgMS41MDlMMTEuMDQxIDEuMDY5NzhDMTEuNjg4MyAwLjk0OTgxNCAxMi4zMzcgMS4yNzI2MyAxMi42MzE3IDEuODYxNDFMMTcuNjEzNiAxMS44MTYxQzE4LjM1MjcgMTMuMjkyOSAxNy41OTM4IDE1LjA4MDQgMTYuMDE4IDE1LjU3NDVDMTYuNDA0NCAxNC40NTA3IDE2LjMyMzEgMTMuMjE4OCAxNS43OTI0IDEyLjE1NTVMMTEuMTk5MSAyLjk1MjM4WiIgZmlsbD0iI0VDNzIxMSIvPgo8L3N2Zz4=");\n    background-color: darkorange;\n}\n\n.ace_scrollbar {\n    contain: strict;\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    z-index: 6;\n}\n\n.ace_scrollbar-inner {\n    position: absolute;\n    cursor: text;\n    left: 0;\n    top: 0;\n}\n\n.ace_scrollbar-v{\n    overflow-x: hidden;\n    overflow-y: scroll;\n    top: 0;\n}\n\n.ace_scrollbar-h {\n    overflow-x: scroll;\n    overflow-y: hidden;\n    left: 0;\n}\n\n.ace_print-margin {\n    position: absolute;\n    height: 100%;\n}\n\n.ace_text-input {\n    position: absolute;\n    z-index: 0;\n    width: 0.5em;\n    height: 1em;\n    opacity: 0;\n    background: transparent;\n    -moz-appearance: none;\n    appearance: none;\n    border: none;\n    resize: none;\n    outline: none;\n    overflow: hidden;\n    font: inherit;\n    padding: 0 1px;\n    margin: 0 -1px;\n    contain: strict;\n    -ms-user-select: text;\n    -moz-user-select: text;\n    -webkit-user-select: text;\n    user-select: text;\n    /*with `pre-line` chrome inserts &nbsp; instead of space*/\n    white-space: pre!important;\n}\n.ace_text-input.ace_composition {\n    background: transparent;\n    color: inherit;\n    z-index: 1000;\n    opacity: 1;\n}\n.ace_composition_placeholder { color: transparent }\n.ace_composition_marker { \n    border-bottom: 1px solid;\n    position: absolute;\n    border-radius: 0;\n    margin-top: 1px;\n}\n\n[ace_nocontext=true] {\n    transform: none!important;\n    filter: none!important;\n    clip-path: none!important;\n    mask : none!important;\n    contain: none!important;\n    perspective: none!important;\n    mix-blend-mode: initial!important;\n    z-index: auto;\n}\n\n.ace_layer {\n    z-index: 1;\n    position: absolute;\n    overflow: hidden;\n    /* workaround for chrome bug https://github.com/ajaxorg/ace/issues/2312*/\n    word-wrap: normal;\n    white-space: pre;\n    height: 100%;\n    width: 100%;\n    box-sizing: border-box;\n    /* setting pointer-events: auto; on node under the mouse, which changes\n        during scroll, will break mouse wheel scrolling in Safari */\n    pointer-events: none;\n}\n\n.ace_gutter-layer {\n    position: relative;\n    width: auto;\n    text-align: right;\n    pointer-events: auto;\n    height: 1000000px;\n    contain: style size layout;\n}\n\n.ace_text-layer {\n    font: inherit !important;\n    position: absolute;\n    height: 1000000px;\n    width: 1000000px;\n    contain: style size layout;\n}\n\n.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {\n    contain: style size layout;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n}\n\n.ace_hidpi .ace_text-layer,\n.ace_hidpi .ace_gutter-layer,\n.ace_hidpi .ace_content,\n.ace_hidpi .ace_gutter {\n    contain: strict;\n}\n.ace_hidpi .ace_text-layer > .ace_line, \n.ace_hidpi .ace_text-layer > .ace_line_group {\n    contain: strict;\n}\n\n.ace_cjk {\n    display: inline-block;\n    text-align: center;\n}\n\n.ace_cursor-layer {\n    z-index: 4;\n}\n\n.ace_cursor {\n    z-index: 4;\n    position: absolute;\n    box-sizing: border-box;\n    border-left: 2px solid;\n    /* workaround for smooth cursor repaintng whole screen in chrome */\n    transform: translatez(0);\n}\n\n.ace_multiselect .ace_cursor {\n    border-left-width: 1px;\n}\n\n.ace_slim-cursors .ace_cursor {\n    border-left-width: 1px;\n}\n\n.ace_overwrite-cursors .ace_cursor {\n    border-left-width: 0;\n    border-bottom: 1px solid;\n}\n\n.ace_hidden-cursors .ace_cursor {\n    opacity: 0.2;\n}\n\n.ace_hasPlaceholder .ace_hidden-cursors .ace_cursor {\n    opacity: 0;\n}\n\n.ace_smooth-blinking .ace_cursor {\n    transition: opacity 0.18s;\n}\n\n.ace_animate-blinking .ace_cursor {\n    animation-duration: 1000ms;\n    animation-timing-function: step-end;\n    animation-name: blink-ace-animate;\n    animation-iteration-count: infinite;\n}\n\n.ace_animate-blinking.ace_smooth-blinking .ace_cursor {\n    animation-duration: 1000ms;\n    animation-timing-function: ease-in-out;\n    animation-name: blink-ace-animate-smooth;\n}\n    \n@keyframes blink-ace-animate {\n    from, to { opacity: 1; }\n    60% { opacity: 0; }\n}\n\n@keyframes blink-ace-animate-smooth {\n    from, to { opacity: 1; }\n    45% { opacity: 1; }\n    60% { opacity: 0; }\n    85% { opacity: 0; }\n}\n\n.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {\n    position: absolute;\n    z-index: 3;\n}\n\n.ace_marker-layer .ace_selection {\n    position: absolute;\n    z-index: 5;\n}\n\n.ace_marker-layer .ace_bracket {\n    position: absolute;\n    z-index: 6;\n}\n\n.ace_marker-layer .ace_error_bracket {\n    position: absolute;\n    border-bottom: 1px solid #DE5555;\n    border-radius: 0;\n}\n\n.ace_marker-layer .ace_active-line {\n    position: absolute;\n    z-index: 2;\n}\n\n.ace_marker-layer .ace_selected-word {\n    position: absolute;\n    z-index: 4;\n    box-sizing: border-box;\n}\n\n.ace_line .ace_fold {\n    box-sizing: border-box;\n\n    display: inline-block;\n    height: 11px;\n    margin-top: -2px;\n    vertical-align: middle;\n\n    background-image:\n        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),\n        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");\n    background-repeat: no-repeat, repeat-x;\n    background-position: center center, top left;\n    color: transparent;\n\n    border: 1px solid black;\n    border-radius: 2px;\n\n    cursor: pointer;\n    pointer-events: auto;\n}\n\n.ace_dark .ace_fold {\n}\n\n.ace_fold:hover{\n    background-image:\n        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),\n        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");\n}\n\n.ace_tooltip {\n    background-color: #f5f5f5;\n    border: 1px solid gray;\n    border-radius: 1px;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n    color: black;\n    max-width: 100%;\n    padding: 3px 4px;\n    position: fixed;\n    z-index: 999999;\n    box-sizing: border-box;\n    cursor: default;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n    line-height: normal;\n    font-style: normal;\n    font-weight: normal;\n    letter-spacing: normal;\n    pointer-events: none;\n    overflow: auto;\n    max-width: min(60em, 66vw);\n    overscroll-behavior: contain;\n}\n.ace_tooltip pre {\n    white-space: pre-wrap;\n}\n\n.ace_tooltip.ace_dark {\n    background-color: #636363;\n    color: #fff;\n}\n\n.ace_tooltip:focus {\n    outline: 1px solid #5E9ED6;\n}\n\n.ace_icon {\n    display: inline-block;\n    width: 18px;\n    vertical-align: top;\n}\n\n.ace_icon_svg {\n    display: inline-block;\n    width: 12px;\n    vertical-align: top;\n    -webkit-mask-repeat: no-repeat;\n    -webkit-mask-size: 12px;\n    -webkit-mask-position: center;\n}\n\n.ace_folding-enabled > .ace_gutter-cell, .ace_folding-enabled > .ace_gutter-cell_svg-icons {\n    padding-right: 13px;\n}\n\n.ace_fold-widget {\n    box-sizing: border-box;\n\n    margin: 0 -12px 0 1px;\n    display: none;\n    width: 11px;\n    vertical-align: top;\n\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");\n    background-repeat: no-repeat;\n    background-position: center;\n\n    border-radius: 3px;\n    \n    border: 1px solid transparent;\n    cursor: pointer;\n}\n\n.ace_folding-enabled .ace_fold-widget {\n    display: inline-block;   \n}\n\n.ace_fold-widget.ace_end {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");\n}\n\n.ace_fold-widget.ace_closed {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");\n}\n\n.ace_fold-widget:hover {\n    border: 1px solid rgba(0, 0, 0, 0.3);\n    background-color: rgba(255, 255, 255, 0.2);\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n}\n\n.ace_fold-widget:active {\n    border: 1px solid rgba(0, 0, 0, 0.4);\n    background-color: rgba(0, 0, 0, 0.05);\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\n}\n/**\n * Dark version for fold widgets\n */\n.ace_dark .ace_fold-widget {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");\n}\n.ace_dark .ace_fold-widget.ace_end {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");\n}\n.ace_dark .ace_fold-widget.ace_closed {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");\n}\n.ace_dark .ace_fold-widget:hover {\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\n    background-color: rgba(255, 255, 255, 0.1);\n}\n.ace_dark .ace_fold-widget:active {\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\n}\n\n.ace_inline_button {\n    border: 1px solid lightgray;\n    display: inline-block;\n    margin: -1px 8px;\n    padding: 0 5px;\n    pointer-events: auto;\n    cursor: pointer;\n}\n.ace_inline_button:hover {\n    border-color: gray;\n    background: rgba(200,200,200,0.2);\n    display: inline-block;\n    pointer-events: auto;\n}\n\n.ace_fold-widget.ace_invalid {\n    background-color: #FFB4B4;\n    border-color: #DE5555;\n}\n\n.ace_fade-fold-widgets .ace_fold-widget {\n    transition: opacity 0.4s ease 0.05s;\n    opacity: 0;\n}\n\n.ace_fade-fold-widgets:hover .ace_fold-widget {\n    transition: opacity 0.05s ease 0.05s;\n    opacity:1;\n}\n\n.ace_underline {\n    text-decoration: underline;\n}\n\n.ace_bold {\n    font-weight: bold;\n}\n\n.ace_nobold .ace_bold {\n    font-weight: normal;\n}\n\n.ace_italic {\n    font-style: italic;\n}\n\n\n.ace_error-marker {\n    background-color: rgba(255, 0, 0,0.2);\n    position: absolute;\n    z-index: 9;\n}\n\n.ace_highlight-marker {\n    background-color: rgba(255, 255, 0,0.2);\n    position: absolute;\n    z-index: 8;\n}\n\n.ace_mobile-menu {\n    position: absolute;\n    line-height: 1.5;\n    border-radius: 4px;\n    -ms-user-select: none;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    background: white;\n    box-shadow: 1px 3px 2px grey;\n    border: 1px solid #dcdcdc;\n    color: black;\n}\n.ace_dark > .ace_mobile-menu {\n    background: #333;\n    color: #ccc;\n    box-shadow: 1px 3px 2px grey;\n    border: 1px solid #444;\n\n}\n.ace_mobile-button {\n    padding: 2px;\n    cursor: pointer;\n    overflow: hidden;\n}\n.ace_mobile-button:hover {\n    background-color: #eee;\n    opacity:1;\n}\n.ace_mobile-button:active {\n    background-color: #ddd;\n}\n\n.ace_placeholder {\n    position: relative;\n    font-family: arial;\n    transform: scale(0.9);\n    transform-origin: left;\n    white-space: pre;\n    opacity: 0.7;\n    margin: 0 10px;\n    z-index: 1;\n}\n\n.ace_ghost_text {\n    opacity: 0.5;\n    font-style: italic;\n}\n\n.ace_ghost_text_container > div {\n    white-space: pre;\n}\n\n.ghost_text_line_wrapped::after {\n    content: "\u21a9";\n    position: absolute;\n}\n\n.ace_lineWidgetContainer.ace_ghost_text {\n    margin: 0px 4px\n}\n\n.ace_screenreader-only {\n    position:absolute;\n    left:-10000px;\n    top:auto;\n    width:1px;\n    height:1px;\n    overflow:hidden;\n}\n\n.ace_hidden_token {\n    display: none;\n}'},8086:(e,t,i)=>{var n=i(8297),s=i(3610).T,r=i(8770).b,o=i(4074).Q,a=i(9486).M
class l{constructor(e){this.$lines=[""],0===e.length?this.$lines=[""]:Array.isArray(e)?this.insertMergedLines({row:0,column:0},e):this.insert({row:0,column:0},e)}setValue(e){var t=this.getLength()-1
this.remove(new o(0,0,t,this.getLine(t).length)),this.insert({row:0,column:0},e||"")}getValue(){return this.getAllLines().join(this.getNewLineCharacter())}createAnchor(e,t){return new a(this,e,t)}$detectNewLine(e){var t=e.match(/^.*?(\r\n|\r|\n)/m)
this.$autoNewLine=t?t[1]:"\n",this._signal("changeNewLineMode")}getNewLineCharacter(){switch(this.$newLineMode){case"windows":return"\r\n"
case"unix":return"\n"
default:return this.$autoNewLine||"\n"}}setNewLineMode(e){this.$newLineMode!==e&&(this.$newLineMode=e,this._signal("changeNewLineMode"))}getNewLineMode(){return this.$newLineMode}isNewLine(e){return"\r\n"==e||"\r"==e||"\n"==e}getLine(e){return this.$lines[e]||""}getLines(e,t){return this.$lines.slice(e,t+1)}getAllLines(){return this.getLines(0,this.getLength())}getLength(){return this.$lines.length}getTextRange(e){return this.getLinesForRange(e).join(this.getNewLineCharacter())}getLinesForRange(e){var t
if(e.start.row===e.end.row)t=[this.getLine(e.start.row).substring(e.start.column,e.end.column)]
else{(t=this.getLines(e.start.row,e.end.row))[0]=(t[0]||"").substring(e.start.column)
var i=t.length-1
e.end.row-e.start.row==i&&(t[i]=t[i].substring(0,e.end.column))}return t}insertLines(e,t){return this.insertFullLines(e,t)}removeLines(e,t){return this.removeFullLines(e,t)}insertNewLine(e){return this.insertMergedLines(e,["",""])}insert(e,t){return this.getLength()<=1&&this.$detectNewLine(t),this.insertMergedLines(e,this.$split(t))}insertInLine(e,t){var i=this.clippedPos(e.row,e.column),n=this.pos(e.row,e.column+t.length)
return this.applyDelta({start:i,end:n,action:"insert",lines:[t]},!0),this.clonePos(n)}clippedPos(e,t){var i=this.getLength()
void 0===e?e=i:e<0?e=0:e>=i&&(e=i-1,t=void 0)
var n=this.getLine(e)
return null==t&&(t=n.length),{row:e,column:t=Math.min(Math.max(t,0),n.length)}}clonePos(e){return{row:e.row,column:e.column}}pos(e,t){return{row:e,column:t}}$clipPosition(e){var t=this.getLength()
return e.row>=t?(e.row=Math.max(0,t-1),e.column=this.getLine(t-1).length):(e.row=Math.max(0,e.row),e.column=Math.min(Math.max(e.column,0),this.getLine(e.row).length)),e}insertFullLines(e,t){var i=0;(e=Math.min(Math.max(e,0),this.getLength()))<this.getLength()?(t=t.concat([""]),i=0):(t=[""].concat(t),e--,i=this.$lines[e].length),this.insertMergedLines({row:e,column:i},t)}insertMergedLines(e,t){var i=this.clippedPos(e.row,e.column),n={row:i.row+t.length-1,column:(1==t.length?i.column:0)+t[t.length-1].length}
return this.applyDelta({start:i,end:n,action:"insert",lines:t}),this.clonePos(n)}remove(e){var t=this.clippedPos(e.start.row,e.start.column),i=this.clippedPos(e.end.row,e.end.column)
return this.applyDelta({start:t,end:i,action:"remove",lines:this.getLinesForRange({start:t,end:i})}),this.clonePos(t)}removeInLine(e,t,i){var n=this.clippedPos(e,t),s=this.clippedPos(e,i)
return this.applyDelta({start:n,end:s,action:"remove",lines:this.getLinesForRange({start:n,end:s})},!0),this.clonePos(n)}removeFullLines(e,t){e=Math.min(Math.max(0,e),this.getLength()-1)
var i=(t=Math.min(Math.max(0,t),this.getLength()-1))==this.getLength()-1&&e>0,n=t<this.getLength()-1,s=i?e-1:e,r=i?this.getLine(s).length:0,a=n?t+1:t,l=n?0:this.getLine(a).length,h=new o(s,r,a,l),c=this.$lines.slice(e,t+1)
return this.applyDelta({start:h.start,end:h.end,action:"remove",lines:this.getLinesForRange(h)}),c}removeNewLine(e){e<this.getLength()-1&&e>=0&&this.applyDelta({start:this.pos(e,this.getLine(e).length),end:this.pos(e+1,0),action:"remove",lines:["",""]})}replace(e,t){return e instanceof o||(e=o.fromPoints(e.start,e.end)),0===t.length&&e.isEmpty()?e.start:t==this.getTextRange(e)?e.end:(this.remove(e),t?this.insert(e.start,t):e.start)}applyDeltas(e){for(var t=0;t<e.length;t++)this.applyDelta(e[t])}revertDeltas(e){for(var t=e.length-1;t>=0;t--)this.revertDelta(e[t])}applyDelta(e,t){var i="insert"==e.action;(i?e.lines.length<=1&&!e.lines[0]:!o.comparePoints(e.start,e.end))||(i&&e.lines.length>2e4?this.$splitAndapplyLargeDelta(e,2e4):(s(this.$lines,e,t),this._signal("change",e)))}$safeApplyDelta(e){var t=this.$lines.length;("remove"==e.action&&e.start.row<t&&e.end.row<t||"insert"==e.action&&e.start.row<=t)&&this.applyDelta(e)}$splitAndapplyLargeDelta(e,t){for(var i=e.lines,n=i.length-t+1,s=e.start.row,r=e.start.column,o=0,a=0;o<n;o=a){a+=t-1
var l=i.slice(o,a)
l.push(""),this.applyDelta({start:this.pos(s+o,r),end:this.pos(s+a,r=0),action:e.action,lines:l},!0)}e.lines=i.slice(o),e.start.row=s+o,e.start.column=r,this.applyDelta(e,!0)}revertDelta(e){this.$safeApplyDelta({start:this.clonePos(e.start),end:this.clonePos(e.end),action:"insert"==e.action?"remove":"insert",lines:e.lines.slice()})}indexToPosition(e,t){for(var i=this.$lines||this.getAllLines(),n=this.getNewLineCharacter().length,s=t||0,r=i.length;s<r;s++)if((e-=i[s].length+n)<0)return{row:s,column:e+i[s].length+n}
return{row:r-1,column:e+i[r-1].length+n}}positionToIndex(e,t){for(var i=this.$lines||this.getAllLines(),n=this.getNewLineCharacter().length,s=0,r=Math.min(e.row,i.length),o=t||0;o<r;++o)s+=i[o].length+n
return s+e.column}$split(e){return e.split(/\r\n|\r|\n/)}}l.prototype.$autoNewLine="",l.prototype.$newLineMode="auto",n.implement(l.prototype,r),t.y=l},9276:(e,t,i)=>{function n(e){return!(e<4352)&&(e>=4352&&e<=4447||e>=4515&&e<=4519||e>=4602&&e<=4607||e>=9001&&e<=9002||e>=11904&&e<=11929||e>=11931&&e<=12019||e>=12032&&e<=12245||e>=12272&&e<=12283||e>=12288&&e<=12350||e>=12353&&e<=12438||e>=12441&&e<=12543||e>=12549&&e<=12589||e>=12593&&e<=12686||e>=12688&&e<=12730||e>=12736&&e<=12771||e>=12784&&e<=12830||e>=12832&&e<=12871||e>=12880&&e<=13054||e>=13056&&e<=19903||e>=19968&&e<=42124||e>=42128&&e<=42182||e>=43360&&e<=43388||e>=44032&&e<=55203||e>=55216&&e<=55238||e>=55243&&e<=55291||e>=63744&&e<=64255||e>=65040&&e<=65049||e>=65072&&e<=65106||e>=65108&&e<=65126||e>=65128&&e<=65131||e>=65281&&e<=65376||e>=65504&&e<=65510)}var s=i(8297),r=i(3927),o=i(2789).t,a=i(5133),l=i(8770).b,h=i(3933).L,c=i(6044).K,u=i(4074).Q,d=i(8086).y,g=i(8549).K,p=i(8748).V,m=i(258).a
class f{constructor(e,t){this.doc,this.$breakpoints=[],this.$decorations=[],this.$frontMarkers={},this.$backMarkers={},this.$markerId=1,this.$undoSelect=!0,this.$foldData=[],this.id="session"+ ++f.$uid,this.$foldData.toString=function(){return this.join("\n")},this.bgTokenizer=new g((new c).getTokenizer(),this)
var i=this
this.bgTokenizer.on("update",(function(e){i._signal("tokenizerUpdate",e)})),this.on("changeFold",this.onChangeFold.bind(this)),this.$onChange=this.onChange.bind(this),"object"==typeof e&&e.getLine||(e=new d(e)),this.setDocument(e),this.selection=new h(this),this.$bidiHandler=new o(this),a.resetOptions(this),this.setMode(t),a._signal("session",this),this.destroyed=!1}setDocument(e){this.doc&&this.doc.off("change",this.$onChange),this.doc=e,e.on("change",this.$onChange,!0),this.bgTokenizer.setDocument(this.getDocument()),this.resetCaches()}getDocument(){return this.doc}$resetRowCache(e){if(!e)return this.$docRowCache=[],void(this.$screenRowCache=[])
var t=this.$docRowCache.length,i=this.$getRowCacheIndex(this.$docRowCache,e)+1
t>i&&(this.$docRowCache.splice(i,t),this.$screenRowCache.splice(i,t))}$getRowCacheIndex(e,t){for(var i=0,n=e.length-1;i<=n;){var s=i+n>>1,r=e[s]
if(t>r)i=s+1
else{if(!(t<r))return s
n=s-1}}return i-1}resetCaches(){this.$modified=!0,this.$wrapData=[],this.$rowLengthCache=[],this.$resetRowCache(0),this.destroyed||this.bgTokenizer.start(0)}onChangeFold(e){var t=e.data
this.$resetRowCache(t.start.row)}onChange(e){this.$modified=!0,this.$bidiHandler.onChange(e),this.$resetRowCache(e.start.row)
var t=this.$updateInternalDataOnChange(e)
!this.$fromUndo&&this.$undoManager&&(t&&t.length&&(this.$undoManager.add({action:"removeFolds",folds:t},this.mergeUndoDeltas),this.mergeUndoDeltas=!0),this.$undoManager.add(e,this.mergeUndoDeltas),this.mergeUndoDeltas=!0,this.$informUndoManager.schedule()),this.bgTokenizer.$updateOnChange(e),this._signal("change",e)}setValue(e){this.doc.setValue(e),this.selection.moveTo(0,0),this.$resetRowCache(0),this.setUndoManager(this.$undoManager),this.getUndoManager().reset()}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e))
const t=new m
t.$undoStack=e.history.undo,t.$redoStack=e.history.redo,t.mark=e.history.mark,t.$rev=e.history.rev
const i=new f(e.value)
return e.folds.forEach((function(e){i.addFold("...",u.fromPoints(e.start,e.end))})),i.setAnnotations(e.annotations),i.setBreakpoints(e.breakpoints),i.setMode(e.mode),i.setScrollLeft(e.scrollLeft),i.setScrollTop(e.scrollTop),i.setUndoManager(t),i.selection.fromJSON(e.selection),i}toJSON(){return{annotations:this.$annotations,breakpoints:this.$breakpoints,folds:this.getAllFolds().map((function(e){return e.range})),history:this.getUndoManager(),mode:this.$mode.$id,scrollLeft:this.$scrollLeft,scrollTop:this.$scrollTop,selection:this.selection.toJSON(),value:this.doc.getValue()}}toString(){return this.doc.getValue()}getSelection(){return this.selection}getState(e){return this.bgTokenizer.getState(e)}getTokens(e){return this.bgTokenizer.getTokens(e)}getTokenAt(e,t){var i,n=this.bgTokenizer.getTokens(e),s=0
if(null==t){var r=n.length-1
s=this.getLine(e).length}else for(r=0;r<n.length&&!((s+=n[r].value.length)>=t);r++);return(i=n[r])?(i.index=r,i.start=s-i.value.length,i):null}setUndoManager(e){if(this.$undoManager=e,this.$informUndoManager&&this.$informUndoManager.cancel(),e){var t=this
e.addSession(this),this.$syncInformUndoManager=function(){t.$informUndoManager.cancel(),t.mergeUndoDeltas=!1},this.$informUndoManager=r.delayedCall(this.$syncInformUndoManager)}else this.$syncInformUndoManager=function(){}}markUndoGroup(){this.$syncInformUndoManager&&this.$syncInformUndoManager()}getUndoManager(){return this.$undoManager||this.$defaultUndoManager}getTabString(){return this.getUseSoftTabs()?r.stringRepeat(" ",this.getTabSize()):"\t"}setUseSoftTabs(e){this.setOption("useSoftTabs",e)}getUseSoftTabs(){return this.$useSoftTabs&&!this.$mode.$indentWithTabs}setTabSize(e){this.setOption("tabSize",e)}getTabSize(){return this.$tabSize}isTabStop(e){return this.$useSoftTabs&&e.column%this.$tabSize==0}setNavigateWithinSoftTabs(e){this.setOption("navigateWithinSoftTabs",e)}getNavigateWithinSoftTabs(){return this.$navigateWithinSoftTabs}setOverwrite(e){this.setOption("overwrite",e)}getOverwrite(){return this.$overwrite}toggleOverwrite(){this.setOverwrite(!this.$overwrite)}addGutterDecoration(e,t){this.$decorations[e]||(this.$decorations[e]=""),this.$decorations[e]+=" "+t,this._signal("changeBreakpoint",{})}removeGutterDecoration(e,t){this.$decorations[e]=(this.$decorations[e]||"").replace(" "+t,""),this._signal("changeBreakpoint",{})}getBreakpoints(){return this.$breakpoints}setBreakpoints(e){this.$breakpoints=[]
for(var t=0;t<e.length;t++)this.$breakpoints[e[t]]="ace_breakpoint"
this._signal("changeBreakpoint",{})}clearBreakpoints(){this.$breakpoints=[],this._signal("changeBreakpoint",{})}setBreakpoint(e,t){void 0===t&&(t="ace_breakpoint"),t?this.$breakpoints[e]=t:delete this.$breakpoints[e],this._signal("changeBreakpoint",{})}clearBreakpoint(e){delete this.$breakpoints[e],this._signal("changeBreakpoint",{})}addMarker(e,t,i,n){var s=this.$markerId++,r={range:e,type:i||"line",renderer:"function"==typeof i?i:null,clazz:t,inFront:!!n,id:s}
return n?(this.$frontMarkers[s]=r,this._signal("changeFrontMarker")):(this.$backMarkers[s]=r,this._signal("changeBackMarker")),s}addDynamicMarker(e,t){if(e.update){var i=this.$markerId++
return e.id=i,e.inFront=!!t,t?(this.$frontMarkers[i]=e,this._signal("changeFrontMarker")):(this.$backMarkers[i]=e,this._signal("changeBackMarker")),e}}removeMarker(e){var t=this.$frontMarkers[e]||this.$backMarkers[e]
t&&(delete(t.inFront?this.$frontMarkers:this.$backMarkers)[e],this._signal(t.inFront?"changeFrontMarker":"changeBackMarker"))}getMarkers(e){return e?this.$frontMarkers:this.$backMarkers}highlight(e){if(!this.$searchHighlight){var t=new p(null,"ace_selected-word","text")
this.$searchHighlight=this.addDynamicMarker(t)}this.$searchHighlight.setRegexp(e)}highlightLines(e,t,i,n){"number"!=typeof t&&(i=t,t=e),i||(i="ace_step")
var s=new u(e,0,t,1/0)
return s.id=this.addMarker(s,i,"fullLine",n),s}setAnnotations(e){this.$annotations=e,this._signal("changeAnnotation",{})}getAnnotations(){return this.$annotations||[]}clearAnnotations(){this.setAnnotations([])}$detectNewLine(e){var t=e.match(/^.*?(\r?\n)/m)
this.$autoNewLine=t?t[1]:"\n"}getWordRange(e,t){var i=this.getLine(e),n=!1
if(t>0&&(n=!!i.charAt(t-1).match(this.tokenRe)),n||(n=!!i.charAt(t).match(this.tokenRe)),n)var s=this.tokenRe
else s=/^\s+$/.test(i.slice(t-1,t+1))?/\s/:this.nonTokenRe
var r=t
if(r>0){do{r--}while(r>=0&&i.charAt(r).match(s))
r++}for(var o=t;o<i.length&&i.charAt(o).match(s);)o++
return new u(e,r,e,o)}getAWordRange(e,t){for(var i=this.getWordRange(e,t),n=this.getLine(i.end.row);n.charAt(i.end.column).match(/[ \t]/);)i.end.column+=1
return i}setNewLineMode(e){this.doc.setNewLineMode(e)}getNewLineMode(){return this.doc.getNewLineMode()}setUseWorker(e){this.setOption("useWorker",e)}getUseWorker(){return this.$useWorker}onReloadTokenizer(e){var t=e.data
this.bgTokenizer.start(t.first),this._signal("tokenizerUpdate",e)}setMode(e,t){if(e&&"object"==typeof e){if(e.getTokenizer)return this.$onChangeMode(e)
var i=e,n=i.path}else n=e||"ace/mode/text"
if(this.$modes["ace/mode/text"]||(this.$modes["ace/mode/text"]=new c),this.$modes[n]&&!i)return this.$onChangeMode(this.$modes[n]),void(t&&t())
this.$modeId=n,a.loadModule(["mode",n],function(e){if(this.$modeId!==n)return t&&t()
this.$modes[n]&&!i?this.$onChangeMode(this.$modes[n]):e&&e.Mode&&(e=new e.Mode(i),i||(this.$modes[n]=e,e.$id=n),this.$onChangeMode(e)),t&&t()}.bind(this)),this.$mode||this.$onChangeMode(this.$modes["ace/mode/text"],!0)}$onChangeMode(e,t){if(t||(this.$modeId=e.$id),this.$mode!==e){var i=this.$mode
this.$mode=e,this.$stopWorker(),this.$useWorker&&this.$startWorker()
var n=e.getTokenizer()
if(void 0!==n.on){var s=this.onReloadTokenizer.bind(this)
n.on("update",s)}this.bgTokenizer.setTokenizer(n),this.bgTokenizer.setDocument(this.getDocument()),this.tokenRe=e.tokenRe,this.nonTokenRe=e.nonTokenRe,t||(e.attachToSession&&e.attachToSession(this),this.$options.wrapMethod.set.call(this,this.$wrapMethod),this.$setFolding(e.foldingRules),this.bgTokenizer.start(0),this._emit("changeMode",{oldMode:i,mode:e}))}}$stopWorker(){this.$worker&&(this.$worker.terminate(),this.$worker=null)}$startWorker(){try{this.$worker=this.$mode.createWorker(this)}catch(e){a.warn("Could not load worker",e),this.$worker=null}}getMode(){return this.$mode}setScrollTop(e){this.$scrollTop===e||isNaN(e)||(this.$scrollTop=e,this._signal("changeScrollTop",e))}getScrollTop(){return this.$scrollTop}setScrollLeft(e){this.$scrollLeft===e||isNaN(e)||(this.$scrollLeft=e,this._signal("changeScrollLeft",e))}getScrollLeft(){return this.$scrollLeft}getScreenWidth(){return this.$computeWidth(),this.lineWidgets?Math.max(this.getLineWidgetMaxWidth(),this.screenWidth):this.screenWidth}getLineWidgetMaxWidth(){if(null!=this.lineWidgetsWidth)return this.lineWidgetsWidth
var e=0
return this.lineWidgets.forEach((function(t){t&&t.screenWidth>e&&(e=t.screenWidth)})),this.lineWidgetWidth=e}$computeWidth(e){if(this.$modified||e){if(this.$modified=!1,this.$useWrapMode)return this.screenWidth=this.$wrapLimit
for(var t=this.doc.getAllLines(),i=this.$rowLengthCache,n=0,s=0,r=this.$foldData[s],o=r?r.start.row:1/0,a=t.length,l=0;l<a;l++){if(l>o){if((l=r.end.row+1)>=a)break
o=(r=this.$foldData[s++])?r.start.row:1/0}null==i[l]&&(i[l]=this.$getStringScreenWidth(t[l])[0]),i[l]>n&&(n=i[l])}this.screenWidth=n}}getLine(e){return this.doc.getLine(e)}getLines(e,t){return this.doc.getLines(e,t)}getLength(){return this.doc.getLength()}getTextRange(e){return this.doc.getTextRange(e||this.selection.getRange())}insert(e,t){return this.doc.insert(e,t)}remove(e){return this.doc.remove(e)}removeFullLines(e,t){return this.doc.removeFullLines(e,t)}undoChanges(e,t){if(e.length){this.$fromUndo=!0
for(var i=e.length-1;-1!=i;i--){var n=e[i]
"insert"==n.action||"remove"==n.action?this.doc.revertDelta(n):n.folds&&this.addFolds(n.folds)}!t&&this.$undoSelect&&(e.selectionBefore?this.selection.fromJSON(e.selectionBefore):this.selection.setRange(this.$getUndoSelection(e,!0))),this.$fromUndo=!1}}redoChanges(e,t){if(e.length){this.$fromUndo=!0
for(var i=0;i<e.length;i++){var n=e[i]
"insert"!=n.action&&"remove"!=n.action||this.doc.$safeApplyDelta(n)}!t&&this.$undoSelect&&(e.selectionAfter?this.selection.fromJSON(e.selectionAfter):this.selection.setRange(this.$getUndoSelection(e,!1))),this.$fromUndo=!1}}setUndoSelect(e){this.$undoSelect=e}$getUndoSelection(e,t){function i(e){return t?"insert"!==e.action:"insert"===e.action}for(var n,s,r=0;r<e.length;r++){var o=e[r]
o.start&&(n?i(o)?(s=o.start,-1==n.compare(s.row,s.column)&&n.setStart(s),s=o.end,1==n.compare(s.row,s.column)&&n.setEnd(s)):(s=o.start,-1==n.compare(s.row,s.column)&&(n=u.fromPoints(o.start,o.start))):n=i(o)?u.fromPoints(o.start,o.end):u.fromPoints(o.start,o.start))}return n}replace(e,t){return this.doc.replace(e,t)}moveText(e,t,i){var n=this.getTextRange(e),s=this.getFoldsInRange(e),r=u.fromPoints(t,t)
if(!i){this.remove(e)
var o=e.start.row-e.end.row;(h=o?-e.end.column:e.start.column-e.end.column)&&(r.start.row==e.end.row&&r.start.column>e.end.column&&(r.start.column+=h),r.end.row==e.end.row&&r.end.column>e.end.column&&(r.end.column+=h)),o&&r.start.row>=e.end.row&&(r.start.row+=o,r.end.row+=o)}if(r.end=this.insert(r.start,n),s.length){var a=e.start,l=r.start,h=(o=l.row-a.row,l.column-a.column)
this.addFolds(s.map((function(e){return(e=e.clone()).start.row==a.row&&(e.start.column+=h),e.end.row==a.row&&(e.end.column+=h),e.start.row+=o,e.end.row+=o,e})))}return r}indentRows(e,t,i){i=i.replace(/\t/g,this.getTabString())
for(var n=e;n<=t;n++)this.doc.insertInLine({row:n,column:0},i)}outdentRows(e){for(var t=e.collapseRows(),i=new u(0,0,0,0),n=this.getTabSize(),s=t.start.row;s<=t.end.row;++s){var r=this.getLine(s)
i.start.row=s,i.end.row=s
for(var o=0;o<n&&" "==r.charAt(o);++o);o<n&&"\t"==r.charAt(o)?(i.start.column=o,i.end.column=o+1):(i.start.column=0,i.end.column=o),this.remove(i)}}$moveLines(e,t,i){if(e=this.getRowFoldStart(e),t=this.getRowFoldEnd(t),i<0){if((s=this.getRowFoldStart(e+i))<0)return 0
var n=s-e}else if(i>0){var s
if((s=this.getRowFoldEnd(t+i))>this.doc.getLength()-1)return 0
n=s-t}else e=this.$clipRowToDocument(e),n=(t=this.$clipRowToDocument(t))-e+1
var r=new u(e,0,t,Number.MAX_VALUE),o=this.getFoldsInRange(r).map((function(e){return(e=e.clone()).start.row+=n,e.end.row+=n,e})),a=0==i?this.doc.getLines(e,t):this.doc.removeFullLines(e,t)
return this.doc.insertFullLines(e+n,a),o.length&&this.addFolds(o),n}moveLinesUp(e,t){return this.$moveLines(e,t,-1)}moveLinesDown(e,t){return this.$moveLines(e,t,1)}duplicateLines(e,t){return this.$moveLines(e,t,0)}$clipRowToDocument(e){return Math.max(0,Math.min(e,this.doc.getLength()-1))}$clipColumnToRow(e,t){return t<0?0:Math.min(this.doc.getLine(e).length,t)}$clipPositionToDocument(e,t){if(t=Math.max(0,t),e<0)e=0,t=0
else{var i=this.doc.getLength()
e>=i?(e=i-1,t=this.doc.getLine(i-1).length):t=Math.min(this.doc.getLine(e).length,t)}return{row:e,column:t}}$clipRangeToDocument(e){e.start.row<0?(e.start.row=0,e.start.column=0):e.start.column=this.$clipColumnToRow(e.start.row,e.start.column)
var t=this.doc.getLength()-1
return e.end.row>t?(e.end.row=t,e.end.column=this.doc.getLine(t).length):e.end.column=this.$clipColumnToRow(e.end.row,e.end.column),e}setUseWrapMode(e){if(e!=this.$useWrapMode){if(this.$useWrapMode=e,this.$modified=!0,this.$resetRowCache(0),e){var t=this.getLength()
this.$wrapData=Array(t),this.$updateWrapData(0,t-1)}this._signal("changeWrapMode")}}getUseWrapMode(){return this.$useWrapMode}setWrapLimitRange(e,t){this.$wrapLimitRange.min===e&&this.$wrapLimitRange.max===t||(this.$wrapLimitRange={min:e,max:t},this.$modified=!0,this.$bidiHandler.markAsDirty(),this.$useWrapMode&&this._signal("changeWrapMode"))}adjustWrapLimit(e,t){var i=this.$wrapLimitRange
i.max<0&&(i={min:t,max:t})
var n=this.$constrainWrapLimit(e,i.min,i.max)
return n!=this.$wrapLimit&&n>1&&(this.$wrapLimit=n,this.$modified=!0,this.$useWrapMode&&(this.$updateWrapData(0,this.getLength()-1),this.$resetRowCache(0),this._signal("changeWrapLimit")),!0)}$constrainWrapLimit(e,t,i){return t&&(e=Math.max(t,e)),i&&(e=Math.min(i,e)),e}getWrapLimit(){return this.$wrapLimit}setWrapLimit(e){this.setWrapLimitRange(e,e)}getWrapLimitRange(){return{min:this.$wrapLimitRange.min,max:this.$wrapLimitRange.max}}$updateInternalDataOnChange(e){var t=this.$useWrapMode,i=e.action,n=e.start,s=e.end,r=n.row,o=s.row,a=o-r,l=null
if(this.$updating=!0,0!=a)if("remove"===i){this[t?"$wrapData":"$rowLengthCache"].splice(r,a)
var h=this.$foldData
l=this.getFoldsInRange(e),this.removeFolds(l)
var c=0
if(m=this.getFoldLine(s.row)){m.addRemoveChars(s.row,s.column,n.column-s.column),m.shiftRow(-a)
var u=this.getFoldLine(r)
u&&u!==m&&(u.merge(m),m=u),c=h.indexOf(m)+1}for(;c<h.length;c++)(m=h[c]).start.row>=s.row&&m.shiftRow(-a)
o=r}else{var d=Array(a)
d.unshift(r,0)
var g=t?this.$wrapData:this.$rowLengthCache
if(g.splice.apply(g,d),h=this.$foldData,c=0,m=this.getFoldLine(r)){var p=m.range.compareInside(n.row,n.column)
0==p?(m=m.split(n.row,n.column))&&(m.shiftRow(a),m.addRemoveChars(o,0,s.column-n.column)):-1==p&&(m.addRemoveChars(r,0,s.column-n.column),m.shiftRow(a)),c=h.indexOf(m)+1}for(;c<h.length;c++){var m;(m=h[c]).start.row>=r&&m.shiftRow(a)}}else a=Math.abs(e.start.column-e.end.column),"remove"===i&&(l=this.getFoldsInRange(e),this.removeFolds(l),a=-a),(m=this.getFoldLine(r))&&m.addRemoveChars(r,n.column,a)
return t&&(this.$wrapData.length,this.doc.getLength()),this.$updating=!1,t?this.$updateWrapData(r,o):this.$updateRowLengthCache(r,o),l}$updateRowLengthCache(e,t){this.$rowLengthCache[e]=null,this.$rowLengthCache[t]=null}$updateWrapData(e,t){var i,n,s=this.doc.getAllLines(),r=this.getTabSize(),o=this.$wrapData,a=this.$wrapLimit,l=e
for(t=Math.min(t,s.length-1);l<=t;)(n=this.getFoldLine(l,n))?(i=[],n.walk(function(e,t,n,r){var o
if(null!=e){(o=this.$getDisplayTokens(e,i.length))[0]=y
for(var a=1;a<o.length;a++)o[a]=x}else o=this.$getDisplayTokens(s[t].substring(r,n),i.length)
i=i.concat(o)}.bind(this),n.end.row,s[n.end.row].length+1),o[n.start.row]=this.$computeWrapSplits(i,a,r),l=n.end.row+1):(i=this.$getDisplayTokens(s[l]),o[l]=this.$computeWrapSplits(i,a,r),l++)}$computeWrapSplits(e,t,i){function n(t){for(var n=t-o,r=o;r<t;r++){var d=e[r]
12!==d&&2!==d||(n-=1)}s.length||(u=function(){var t=0
if(0===c)return t
if(h)for(var n=0;n<e.length;n++){var s=e[n]
if(s==C)t+=1
else{if(s!=S){if(s==k)continue
break}t+=i}}return l&&!1!==h&&(t+=i),Math.min(t,c)}(),s.indent=u),a+=n,s.push(a),o=t}if(0==e.length)return[]
for(var s=[],r=e.length,o=0,a=0,l=this.$wrapAsCode,h=this.$indentedSoftWrap,c=t<=Math.max(2*i,8)||!1===h?0:Math.floor(t/2),u=0;r-o>t-u;){var d=o+t-u
if(e[d-1]>=C&&e[d]>=C)n(d)
else if(e[d]!=y&&e[d]!=x){for(var g=Math.max(d-(t-(t>>2)),o-1);d>g&&e[d]<y;)d--
if(l){for(;d>g&&e[d]<y;)d--
for(;d>g&&e[d]==b;)d--}else for(;d>g&&e[d]<C;)d--
d>g?n(++d):(e[d=o+t]==w&&d--,n(d-u))}else{for(;d!=o-1&&e[d]!=y;d--);if(d>o){n(d)
continue}for(d=o+t;d<e.length&&e[d]==x;d++);if(d==e.length)break
n(d)}}return s}$getDisplayTokens(e,t){var i,s=[]
t=t||0
for(var r=0;r<e.length;r++){var o=e.charCodeAt(r)
if(9==o){i=this.getScreenTabSize(s.length+t),s.push(S)
for(var a=1;a<i;a++)s.push(k)}else 32==o?s.push(C):o>39&&o<48||o>57&&o<64?s.push(b):o>=4352&&n(o)?s.push(v,w):s.push(v)}return s}$getStringScreenWidth(e,t,i){if(0==t)return[0,0]
var s,r
for(null==t&&(t=1/0),i=i||0,r=0;r<e.length&&(9==(s=e.charCodeAt(r))?i+=this.getScreenTabSize(i):s>=4352&&n(s)?i+=2:i+=1,!(i>t));r++);return[i,r]}getRowLength(e){var t=1
return this.lineWidgets&&(t+=this.lineWidgets[e]&&this.lineWidgets[e].rowCount||0),this.$useWrapMode&&this.$wrapData[e]?this.$wrapData[e].length+t:t}getRowLineCount(e){return this.$useWrapMode&&this.$wrapData[e]?this.$wrapData[e].length+1:1}getRowWrapIndent(e){if(this.$useWrapMode){var t=this.screenToDocumentPosition(e,Number.MAX_VALUE),i=this.$wrapData[t.row]
return i.length&&i[0]<t.column?i.indent:0}return 0}getScreenLastRowColumn(e){var t=this.screenToDocumentPosition(e,Number.MAX_VALUE)
return this.documentToScreenColumn(t.row,t.column)}getDocumentLastRowColumn(e,t){var i=this.documentToScreenRow(e,t)
return this.getScreenLastRowColumn(i)}getDocumentLastRowColumnPosition(e,t){var i=this.documentToScreenRow(e,t)
return this.screenToDocumentPosition(i,Number.MAX_VALUE/10)}getRowSplitData(e){return this.$useWrapMode?this.$wrapData[e]:void 0}getScreenTabSize(e){return this.$tabSize-(e%this.$tabSize|0)}screenToDocumentRow(e,t){return this.screenToDocumentPosition(e,t).row}screenToDocumentColumn(e,t){return this.screenToDocumentPosition(e,t).column}screenToDocumentPosition(e,t,i){if(e<0)return{row:0,column:0}
var n,s,r=0,o=0,a=0,l=0,h=this.$screenRowCache,c=this.$getRowCacheIndex(h,e),u=h.length
if(u&&c>=0){a=h[c],r=this.$docRowCache[c]
var d=e>h[u-1]}else d=!u
for(var g=this.getLength()-1,p=this.getNextFoldLine(r),m=p?p.start.row:1/0;a<=e&&!(a+(l=this.getRowLength(r))>e||r>=g);)a+=l,++r>m&&(r=p.end.row+1,m=(p=this.getNextFoldLine(r,p))?p.start.row:1/0),d&&(this.$docRowCache.push(r),this.$screenRowCache.push(a))
if(p&&p.start.row<=r)n=this.getFoldDisplayLine(p),r=p.start.row
else{if(a+l<=e||r>g)return{row:g,column:this.getLine(g).length}
n=this.getLine(r),p=null}var f=0,v=Math.floor(e-a)
if(this.$useWrapMode){var w=this.$wrapData[r]
w&&(s=w[v],v>0&&w.length&&(f=w.indent,o=w[v-1]||w[w.length-1],n=n.substring(o)))}return void 0!==i&&this.$bidiHandler.isBidiRow(a+v,r,v)&&(t=this.$bidiHandler.offsetToCol(i)),o+=this.$getStringScreenWidth(n,t-f)[1],this.$useWrapMode&&o>=s&&(o=s-1),p?p.idxToPosition(o):{row:r,column:o}}documentToScreenPosition(e,t){if(void 0===t)var i=this.$clipPositionToDocument(e.row,e.column)
else i=this.$clipPositionToDocument(e,t)
e=i.row,t=i.column
var n,s=0,r=null;(n=this.getFoldAt(e,t,1))&&(e=n.start.row,t=n.start.column)
var o,a=0,l=this.$docRowCache,h=this.$getRowCacheIndex(l,e),c=l.length
if(c&&h>=0){a=l[h],s=this.$screenRowCache[h]
var u=e>l[c-1]}else u=!c
for(var d=this.getNextFoldLine(a),g=d?d.start.row:1/0;a<e;){if(a>=g){if((o=d.end.row+1)>e)break
g=(d=this.getNextFoldLine(o,d))?d.start.row:1/0}else o=a+1
s+=this.getRowLength(a),a=o,u&&(this.$docRowCache.push(a),this.$screenRowCache.push(s))}var p=""
d&&a>=g?(p=this.getFoldDisplayLine(d,e,t),r=d.start.row):(p=this.getLine(e).substring(0,t),r=e)
var m=0
if(this.$useWrapMode){var f=this.$wrapData[r]
if(f){for(var v=0;p.length>=f[v];)s++,v++
p=p.substring(f[v-1]||0,p.length),m=v>0?f.indent:0}}return this.lineWidgets&&this.lineWidgets[a]&&this.lineWidgets[a].rowsAbove&&(s+=this.lineWidgets[a].rowsAbove),{row:s,column:m+this.$getStringScreenWidth(p)[0]}}documentToScreenColumn(e,t){return this.documentToScreenPosition(e,t).column}documentToScreenRow(e,t){return this.documentToScreenPosition(e,t).row}getScreenLength(){var e=0,t=null
if(this.$useWrapMode)for(var i=this.$wrapData.length,n=0,s=(a=0,(t=this.$foldData[a++])?t.start.row:1/0);n<i;){var r=this.$wrapData[n]
e+=r?r.length+1:1,++n>s&&(n=t.end.row+1,s=(t=this.$foldData[a++])?t.start.row:1/0)}else{e=this.getLength()
for(var o=this.$foldData,a=0;a<o.length;a++)e-=(t=o[a]).end.row-t.start.row}return this.lineWidgets&&(e+=this.$getWidgetScreenLength()),e}$setFontMetrics(e){this.$enableVarChar&&(this.$getStringScreenWidth=function(t,i,n){if(0===i)return[0,0]
var s,r
for(i||(i=1/0),n=n||0,r=0;r<t.length&&!((n+="\t"===(s=t.charAt(r))?this.getScreenTabSize(n):e.getCharacterWidth(s))>i);r++);return[n,r]})}getPrecedingCharacter(){var e=this.selection.getCursor()
return 0===e.column?0===e.row?"":this.doc.getNewLineCharacter():this.getLine(e.row)[e.column-1]}destroy(){this.destroyed||(this.bgTokenizer.setDocument(null),this.bgTokenizer.cleanup(),this.destroyed=!0),this.$stopWorker(),this.removeAllListeners(),this.doc&&this.doc.off("change",this.$onChange),this.selection.detach()}}f.$uid=0,f.prototype.$modes=a.$modes,f.prototype.getValue=f.prototype.toString,f.prototype.$defaultUndoManager={undo:function(){},redo:function(){},hasUndo:function(){},hasRedo:function(){},reset:function(){},add:function(){},addSelection:function(){},startNewGroup:function(){},addSession:function(){}},f.prototype.$overwrite=!1,f.prototype.$mode=null,f.prototype.$modeId=null,f.prototype.$scrollTop=0,f.prototype.$scrollLeft=0,f.prototype.$wrapLimit=80,f.prototype.$useWrapMode=!1,f.prototype.$wrapLimitRange={min:null,max:null},f.prototype.lineWidgets=null,f.prototype.isFullWidth=n,s.implement(f.prototype,l)
var v=1,w=2,y=3,x=4,b=9,C=10,S=11,k=12
i(9706).M.call(f.prototype),i(7845).k.call(f.prototype),a.defineOptions(f.prototype,"session",{wrap:{set:function(e){if(e&&"off"!=e?"free"==e?e=!0:"printMargin"==e?e=-1:"string"==typeof e&&(e=parseInt(e,10)||!1):e=!1,this.$wrap!=e)if(this.$wrap=e,e){var t="number"==typeof e?e:null
this.setWrapLimitRange(t,t),this.setUseWrapMode(!0)}else this.setUseWrapMode(!1)},get:function(){return this.getUseWrapMode()?-1==this.$wrap?"printMargin":this.getWrapLimitRange().min?this.$wrap:"free":"off"},handlesSet:!0},wrapMethod:{set:function(e){(e="auto"==e?"text"!=this.$mode.type:"text"!=e)!=this.$wrapAsCode&&(this.$wrapAsCode=e,this.$useWrapMode&&(this.$useWrapMode=!1,this.setUseWrapMode(!0)))},initialValue:"auto"},indentedSoftWrap:{set:function(){this.$useWrapMode&&(this.$useWrapMode=!1,this.setUseWrapMode(!0))},initialValue:!0},firstLineNumber:{set:function(){this._signal("changeBreakpoint")},initialValue:1},useWorker:{set:function(e){this.$useWorker=e,this.$stopWorker(),e&&this.$startWorker()},initialValue:!0},useSoftTabs:{initialValue:!0},tabSize:{set:function(e){(e=parseInt(e))>0&&this.$tabSize!==e&&(this.$modified=!0,this.$rowLengthCache=[],this.$tabSize=e,this._signal("changeTabSize"))},initialValue:4,handlesSet:!0},navigateWithinSoftTabs:{initialValue:!1},foldStyle:{set:function(e){this.setFoldStyle(e)},handlesSet:!0},overwrite:{set:function(){this._signal("changeOverwrite")},initialValue:!1},newLineMode:{set:function(e){this.doc.setNewLineMode(e)},get:function(){return this.doc.getNewLineMode()},handlesSet:!0},mode:{set:function(e){this.setMode(e)},get:function(){return this.$modeId},handlesSet:!0}}),t.f=f},7845:(e,t,i)=>{var n=i(1871).TokenIterator,s=i(4074).Q
t.k=function(){this.findMatchingBracket=function(e,t){if(0==e.column)return null
var i=t||this.getLine(e.row).charAt(e.column-1)
if(""==i)return null
var n=i.match(/([\(\[\{])|([\)\]\}])/)
return n?n[1]?this.$findClosingBracket(n[1],e):this.$findOpeningBracket(n[2],e):null},this.getBracketRange=function(e){var t,i=this.getLine(e.row),n=!0,r=i.charAt(e.column-1),o=r&&r.match(/([\(\[\{])|([\)\]\}])/)
if(o||(r=i.charAt(e.column),e={row:e.row,column:e.column+1},o=r&&r.match(/([\(\[\{])|([\)\]\}])/),n=!1),!o)return null
if(o[1]){if(!(a=this.$findClosingBracket(o[1],e)))return null
t=s.fromPoints(e,a),n||(t.end.column++,t.start.column--),t.cursor=t.end}else{var a
if(!(a=this.$findOpeningBracket(o[2],e)))return null
t=s.fromPoints(a,e),n||(t.start.column++,t.end.column--),t.cursor=t.start}return t},this.getMatchingBracketRanges=function(e,t){var i=this.getLine(e.row),n=/([\(\[\{])|([\)\]\}])/,r=!t&&i.charAt(e.column-1),o=r&&r.match(n)
if(o||(r=(void 0===t||t)&&i.charAt(e.column),e={row:e.row,column:e.column+1},o=r&&r.match(n)),!o)return null
var a=new s(e.row,e.column-1,e.row,e.column),l=o[1]?this.$findClosingBracket(o[1],e):this.$findOpeningBracket(o[2],e)
return l?[a,new s(l.row,l.column,l.row,l.column+1)]:[a]},this.$brackets={")":"(","(":")","]":"[","[":"]","{":"}","}":"{","<":">",">":"<"},this.$findOpeningBracket=function(e,t,i){var s=this.$brackets[e],r=1,o=new n(this,t.row,t.column),a=o.getCurrentToken()
if(a||(a=o.stepForward()),a){i||(i=RegExp("(\\.?"+a.type.replace(".","\\.").replace("rparen",".paren").replace(/\b(?:end)\b/,"(?:start|begin|end)").replace(/-close\b/,"-(close|open)")+")+"))
for(var l=t.column-o.getCurrentTokenColumn()-2,h=a.value;;){for(;l>=0;){var c=h.charAt(l)
if(c==s){if(0==(r-=1))return{row:o.getCurrentTokenRow(),column:l+o.getCurrentTokenColumn()}}else c==e&&(r+=1)
l-=1}do{a=o.stepBackward()}while(a&&!i.test(a.type))
if(null==a)break
l=(h=a.value).length-1}return null}},this.$findClosingBracket=function(e,t,i){var s=this.$brackets[e],r=1,o=new n(this,t.row,t.column),a=o.getCurrentToken()
if(a||(a=o.stepForward()),a){i||(i=RegExp("(\\.?"+a.type.replace(".","\\.").replace("lparen",".paren").replace(/\b(?:start|begin)\b/,"(?:start|begin|end)").replace(/-open\b/,"-(close|open)")+")+"))
for(var l=t.column-o.getCurrentTokenColumn();;){for(var h=a.value,c=h.length;l<c;){var u=h.charAt(l)
if(u==s){if(0==(r-=1))return{row:o.getCurrentTokenRow(),column:l+o.getCurrentTokenColumn()}}else u==e&&(r+=1)
l+=1}do{a=o.stepForward()}while(a&&!i.test(a.type))
if(null==a)break
l=0}return null}},this.getMatchingTags=function(e){var t=new n(this,e.row,e.column),i=this.$findTagName(t)
if(i)return"<"===t.stepBackward().value?this.$findClosingTag(t,i):this.$findOpeningTag(t,i)},this.$findTagName=function(e){var t=e.getCurrentToken(),i=!1,n=!1
if(t&&-1===t.type.indexOf("tag-name"))do{(t=n?e.stepBackward():e.stepForward())&&("/>"===t.value?n=!0:-1!==t.type.indexOf("tag-name")&&(i=!0))}while(t&&!i)
return t},this.$findClosingTag=function(e,t){var i,n=t.value,r=t.value,o=0,a=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+1)
t=e.stepForward()
var l=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+t.value.length),h=!1
do{if(-1!==(i=t).type.indexOf("tag-close")&&!h){var c=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+1)
h=!0}if(t=e.stepForward())if(">"!==t.value||h||(c=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+1),h=!0),-1!==t.type.indexOf("tag-name")){if(r===(n=t.value))if("<"===i.value)o++
else if("</"===i.value&&--o<0){e.stepBackward()
var u=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+2)
t=e.stepForward()
var d=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+t.value.length)
if(-1===t.type.indexOf("tag-close")&&(t=e.stepForward()),!t||">"!==t.value)return
var g=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+1)}}else r===n&&"/>"===t.value&&--o<0&&(g=d=u=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+2),c=new s(l.end.row,l.end.column,l.end.row,l.end.column+1))}while(t&&o>=0)
if(a&&c&&u&&g&&l&&d)return{openTag:new s(a.start.row,a.start.column,c.end.row,c.end.column),closeTag:new s(u.start.row,u.start.column,g.end.row,g.end.column),openTagName:l,closeTagName:d}},this.$findOpeningTag=function(e,t){var i=e.getCurrentToken(),n=t.value,r=0,o=e.getCurrentTokenRow(),a=e.getCurrentTokenColumn(),l=a+2,h=new s(o,a,o,l)
e.stepForward()
var c=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+t.value.length)
if(-1===t.type.indexOf("tag-close")&&(t=e.stepForward()),t&&">"===t.value){var u=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+1)
e.stepBackward(),e.stepBackward()
do{if(t=i,o=e.getCurrentTokenRow(),l=(a=e.getCurrentTokenColumn())+t.value.length,i=e.stepBackward(),t)if(-1!==t.type.indexOf("tag-name")){if(n===t.value)if("<"===i.value){if(++r>0){var d=new s(o,a,o,l),g=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+1)
do{t=e.stepForward()}while(t&&">"!==t.value)
var p=new s(e.getCurrentTokenRow(),e.getCurrentTokenColumn(),e.getCurrentTokenRow(),e.getCurrentTokenColumn()+1)}}else"</"===i.value&&r--}else if("/>"===t.value){for(var m=0,f=i;f;){if(-1!==f.type.indexOf("tag-name")&&f.value===n){r--
break}if("<"===f.value)break
f=e.stepBackward(),m++}for(var v=0;v<m;v++)e.stepForward()}}while(i&&r<=0)
return g&&p&&h&&u&&d&&c?{openTag:new s(g.start.row,g.start.column,p.end.row,p.end.column),closeTag:new s(h.start.row,h.start.column,u.end.row,u.end.column),openTagName:d,closeTagName:c}:void 0}}}},2684:(e,t,i)=>{function n(e,t){e.row-=t.row,0==e.row&&(e.column-=t.column)}function s(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row}var r=i(9537).U
class o extends r{constructor(e,t){super(),this.foldLine=null,this.placeholder=t,this.range=e,this.start=e.start,this.end=e.end,this.sameRow=e.start.row==e.end.row,this.subFolds=this.ranges=[]}toString(){return'"'+this.placeholder+'" '+this.range.toString()}setFoldLine(e){this.foldLine=e,this.subFolds.forEach((function(t){t.setFoldLine(e)}))}clone(){var e=this.range.clone(),t=new o(e,this.placeholder)
return this.subFolds.forEach((function(e){t.subFolds.push(e.clone())})),t.collapseChildren=this.collapseChildren,t}addSubFold(e){if(!this.range.isEqual(e)){var t,i
t=e,i=this.start,n(t.start,i),n(t.end,i)
for(var s=e.start.row,r=e.start.column,o=0,a=-1;o<this.subFolds.length&&1==(a=this.subFolds[o].range.compare(s,r));o++);var l=this.subFolds[o],h=0
if(0==a){if(l.range.containsRange(e))return l.addSubFold(e)
h=1}s=e.range.end.row,r=e.range.end.column
var c=o
for(a=-1;c<this.subFolds.length&&1==(a=this.subFolds[c].range.compare(s,r));c++);0==a&&c++
for(var u=this.subFolds.splice(o,c-o,e),d=0==a?u.length-1:u.length,g=h;g<d;g++)e.addSubFold(u[g])
return e.setFoldLine(this.foldLine),e}}restoreRange(e){return function(e,t){s(e.start,t),s(e.end,t)}(e,this.start)}}t.a=o},9365:(e,t,i)=>{var n=i(4074).Q
class s{constructor(e,t){this.foldData=e,Array.isArray(t)?this.folds=t:t=this.folds=[t]
var i=t[t.length-1]
this.range=new n(t[0].start.row,t[0].start.column,i.end.row,i.end.column),this.start=this.range.start,this.end=this.range.end,this.folds.forEach((function(e){e.setFoldLine(this)}),this)}shiftRow(e){this.start.row+=e,this.end.row+=e,this.folds.forEach((function(t){t.start.row+=e,t.end.row+=e}))}addFold(e){if(e.sameRow){if(e.start.row<this.startRow||e.endRow>this.endRow)throw Error("Can't add a fold to this FoldLine as it has no connection")
this.folds.push(e),this.folds.sort((function(e,t){return-e.range.compareEnd(t.start.row,t.start.column)})),this.range.compareEnd(e.start.row,e.start.column)>0?(this.end.row=e.end.row,this.end.column=e.end.column):this.range.compareStart(e.end.row,e.end.column)<0&&(this.start.row=e.start.row,this.start.column=e.start.column)}else if(e.start.row==this.end.row)this.folds.push(e),this.end.row=e.end.row,this.end.column=e.end.column
else{if(e.end.row!=this.start.row)throw Error("Trying to add fold to FoldRow that doesn't have a matching row")
this.folds.unshift(e),this.start.row=e.start.row,this.start.column=e.start.column}e.foldLine=this}containsRow(e){return e>=this.start.row&&e<=this.end.row}walk(e,t,i){var n,s,r=0,o=this.folds,a=!0
null==t&&(t=this.end.row,i=this.end.column)
for(var l=0;l<o.length;l++){if(-1==(s=(n=o[l]).range.compareStart(t,i)))return void e(null,t,i,r,a)
if(!e(null,n.start.row,n.start.column,r,a)&&e(n.placeholder,n.start.row,n.start.column,r)||0===s)return
a=!n.sameRow,r=n.end.column}e(null,t,i,r,a)}getNextFoldTo(e,t){for(var i,n,s=0;s<this.folds.length;s++){if(-1==(n=(i=this.folds[s]).range.compareEnd(e,t)))return{fold:i,kind:"after"}
if(0===n)return{fold:i,kind:"inside"}}return null}addRemoveChars(e,t,i){var n,s,r=this.getNextFoldTo(e,t)
if(r)if(n=r.fold,"inside"==r.kind&&n.start.column!=t&&n.start.row!=e)window.console&&window.console.log(e,t,n)
else if(n.start.row==e){var o=(s=this.folds).indexOf(n)
for(0===o&&(this.start.column+=i);o<s.length;o++){if((n=s[o]).start.column+=i,!n.sameRow)return
n.end.column+=i}this.end.column+=i}}split(e,t){var i=this.getNextFoldTo(e,t)
if(!i||"inside"==i.kind)return null
var n=i.fold,r=this.folds,o=this.foldData,a=r.indexOf(n),l=r[a-1]
this.end.row=l.end.row,this.end.column=l.end.column,r=r.splice(a,r.length-a)
var h=new s(o,r)
return o.splice(o.indexOf(this)+1,0,h),h}merge(e){for(var t=e.folds,i=0;i<t.length;i++)this.addFold(t[i])
var n=this.foldData
n.splice(n.indexOf(e),1)}toString(){var e=[this.range.toString()+": ["]
return this.folds.forEach((function(t){e.push("  "+t.toString())})),e.push("]"),e.join("\n")}idxToPosition(e){for(var t=0,i=0;i<this.folds.length;i++){var n=this.folds[i]
if((e-=n.start.column-t)<0)return{row:n.start.row,column:n.start.column+e}
if((e-=n.placeholder.length)<0)return n.start
t=n.end.column}return{row:this.end.row,column:this.end.column+e}}}t.M=s},9706:(e,t,i)=>{var n=i(4074).Q,s=i(9365).M,r=i(2684).a,o=i(1871).TokenIterator,a=i(6475).C
t.M=function(){this.getFoldAt=function(e,t,i){var n=this.getFoldLine(e)
if(!n)return null
for(var s=n.folds,r=0;r<s.length;r++){var o=s[r].range
if(o.contains(e,t)){if(1==i&&o.isEnd(e,t)&&!o.isEmpty())continue
if(-1==i&&o.isStart(e,t)&&!o.isEmpty())continue
return s[r]}}},this.getFoldsInRange=function(e){var t=e.start,i=e.end,n=this.$foldData,s=[]
t.column+=1,i.column-=1
for(var r=0;r<n.length;r++){var o=n[r].range.compareRange(e)
if(2!=o){if(-2==o)break
for(var a=n[r].folds,l=0;l<a.length;l++){var h=a[l]
if(-2==(o=h.range.compareRange(e)))break
if(2!=o){if(42==o)break
s.push(h)}}}}return t.column-=1,i.column+=1,s},this.getFoldsInRangeList=function(e){if(Array.isArray(e)){var t=[]
e.forEach((function(e){t=t.concat(this.getFoldsInRange(e))}),this)}else t=this.getFoldsInRange(e)
return t},this.getAllFolds=function(){for(var e=[],t=this.$foldData,i=0;i<t.length;i++)for(var n=0;n<t[i].folds.length;n++)e.push(t[i].folds[n])
return e},this.getFoldStringAt=function(e,t,i,n){if(!(n=n||this.getFoldLine(e)))return null
for(var s,r,o={end:{column:0}},a=0;a<n.folds.length;a++){var l=(r=n.folds[a]).range.compareEnd(e,t)
if(-1==l){s=this.getLine(r.start.row).substring(o.end.column,r.start.column)
break}if(0===l)return null
o=r}return s||(s=this.getLine(r.start.row).substring(o.end.column)),-1==i?s.substring(0,t-o.end.column):1==i?s.substring(t-o.end.column):s},this.getFoldLine=function(e,t){var i=this.$foldData,n=0
for(t&&(n=i.indexOf(t)),-1==n&&(n=0);n<i.length;n++){var s=i[n]
if(s.start.row<=e&&s.end.row>=e)return s
if(s.end.row>e)return null}return null},this.getNextFoldLine=function(e,t){var i=this.$foldData,n=0
for(t&&(n=i.indexOf(t)),-1==n&&(n=0);n<i.length;n++){var s=i[n]
if(s.end.row>=e)return s}return null},this.getFoldedRowCount=function(e,t){for(var i=this.$foldData,n=t-e+1,s=0;s<i.length;s++){var r=i[s],o=r.end.row,a=r.start.row
if(o>=t){a<t&&(a>=e?n-=t-a:n=0)
break}o>=e&&(n-=a>=e?o-a:o-e+1)}return n},this.$addFoldLine=function(e){return this.$foldData.push(e),this.$foldData.sort((function(e,t){return e.start.row-t.start.row})),e},this.addFold=function(e,t){var i,n=this.$foldData,o=!1
e instanceof r?i=e:(i=new r(t,e)).collapseChildren=t.collapseChildren,this.$clipRangeToDocument(i.range)
var a=i.start.row,l=i.start.column,h=i.end.row,c=i.end.column,u=this.getFoldAt(a,l,1),d=this.getFoldAt(h,c,-1)
if(u&&d==u)return u.addSubFold(i)
u&&!u.range.isStart(a,l)&&this.removeFold(u),d&&!d.range.isEnd(h,c)&&this.removeFold(d)
var g=this.getFoldsInRange(i.range)
g.length>0&&(this.removeFolds(g),i.collapseChildren||g.forEach((function(e){i.addSubFold(e)})))
for(var p=0;p<n.length;p++){var m=n[p]
if(h==m.start.row){m.addFold(i),o=!0
break}if(a==m.end.row){if(m.addFold(i),o=!0,!i.sameRow){var f=n[p+1]
if(f&&f.start.row==h){m.merge(f)
break}}break}if(h<=m.start.row)break}return o||(m=this.$addFoldLine(new s(this.$foldData,i))),this.$useWrapMode?this.$updateWrapData(m.start.row,m.start.row):this.$updateRowLengthCache(m.start.row,m.start.row),this.$modified=!0,this._signal("changeFold",{data:i,action:"add"}),i},this.addFolds=function(e){e.forEach((function(e){this.addFold(e)}),this)},this.removeFold=function(e){var t=e.foldLine,i=t.start.row,n=t.end.row,s=this.$foldData,r=t.folds
if(1==r.length)s.splice(s.indexOf(t),1)
else if(t.range.isEnd(e.end.row,e.end.column))r.pop(),t.end.row=r[r.length-1].end.row,t.end.column=r[r.length-1].end.column
else if(t.range.isStart(e.start.row,e.start.column))r.shift(),t.start.row=r[0].start.row,t.start.column=r[0].start.column
else if(e.sameRow)r.splice(r.indexOf(e),1)
else{var o=t.split(e.start.row,e.start.column);(r=o.folds).shift(),o.start.row=r[0].start.row,o.start.column=r[0].start.column}this.$updating||(this.$useWrapMode?this.$updateWrapData(i,n):this.$updateRowLengthCache(i,n)),this.$modified=!0,this._signal("changeFold",{data:e,action:"remove"})},this.removeFolds=function(e){for(var t=[],i=0;i<e.length;i++)t.push(e[i])
t.forEach((function(e){this.removeFold(e)}),this),this.$modified=!0},this.expandFold=function(e){this.removeFold(e),e.subFolds.forEach((function(t){e.restoreRange(t),this.addFold(t)}),this),e.collapseChildren>0&&this.foldAll(e.start.row+1,e.end.row,e.collapseChildren-1),e.subFolds=[]},this.expandFolds=function(e){e.forEach((function(e){this.expandFold(e)}),this)},this.unfold=function(e,t){var i,s
if(null==e)i=new n(0,0,this.getLength(),0),null==t&&(t=!0)
else if("number"==typeof e)i=new n(e,0,e,this.getLine(e).length)
else if("row"in e)i=n.fromPoints(e,e)
else{if(Array.isArray(e))return s=[],e.forEach((function(e){s=s.concat(this.unfold(e))}),this),s
i=e}for(var r=s=this.getFoldsInRangeList(i);1==s.length&&n.comparePoints(s[0].start,i.start)<0&&n.comparePoints(s[0].end,i.end)>0;)this.expandFolds(s),s=this.getFoldsInRangeList(i)
if(0!=t?this.removeFolds(s):this.expandFolds(s),r.length)return r},this.isRowFolded=function(e,t){return!!this.getFoldLine(e,t)},this.getRowFoldEnd=function(e,t){var i=this.getFoldLine(e,t)
return i?i.end.row:e},this.getRowFoldStart=function(e,t){var i=this.getFoldLine(e,t)
return i?i.start.row:e},this.getFoldDisplayLine=function(e,t,i,n,s){null==n&&(n=e.start.row),null==s&&(s=0),null==t&&(t=e.end.row),null==i&&(i=this.getLine(t).length)
var r=this.doc,o=""
return e.walk((function(e,t,i,a){if(!(t<n)){if(t==n){if(i<s)return
a=Math.max(s,a)}o+=null!=e?e:r.getLine(t).substring(a,i)}}),t,i),o},this.getDisplayLine=function(e,t,i,n){var s,r=this.getFoldLine(e)
return r?this.getFoldDisplayLine(r,e,t,i,n):(s=this.doc.getLine(e)).substring(n||0,t||s.length)},this.$cloneFoldData=function(){var e=[]
return e=this.$foldData.map((function(t){var i=t.folds.map((function(e){return e.clone()}))
return new s(e,i)}))},this.toggleFold=function(e){var t,i,n=this.selection.getRange()
if(n.isEmpty()){var s=n.start
if(t=this.getFoldAt(s.row,s.column))return void this.expandFold(t);(i=this.findMatchingBracket(s))?1==n.comparePoint(i)?n.end=i:(n.start=i,n.start.column++,n.end.column--):(i=this.findMatchingBracket({row:s.row,column:s.column+1}))?(1==n.comparePoint(i)?n.end=i:n.start=i,n.start.column++):n=this.getCommentFoldRange(s.row,s.column)||n}else{var r=this.getFoldsInRange(n)
if(e&&r.length)return void this.expandFolds(r)
1==r.length&&(t=r[0])}if(t||(t=this.getFoldAt(n.start.row,n.start.column)),t&&t.range.toString()==n.toString())this.expandFold(t)
else{var o="..."
if(!n.isMultiLine()){if((o=this.getTextRange(n)).length<4)return
o=o.trim().substring(0,2)+".."}this.addFold(o,n)}},this.getCommentFoldRange=function(e,t,i){var s=new o(this,e,t),r=s.getCurrentToken(),a=r&&r.type
if(r&&/^comment|string/.test(a)){"comment"==(a=a.match(/comment|string/)[0])&&(a+="|doc-start|\\.doc")
var l=RegExp(a),h=new n
if(1!=i){do{r=s.stepBackward()}while(r&&l.test(r.type))
r=s.stepForward()}h.start.row=s.getCurrentTokenRow(),h.start.column=s.getCurrentTokenColumn()+r.value.length,s=new o(this,e,t)
var c=this.getState(s.$row)
if(-1!=i){var u=-1
do{if(r=s.stepForward(),-1==u){var d=this.getState(s.$row)
c.toString()!==d.toString()&&(u=s.$row)}else if(s.$row>u)break}while(r&&l.test(r.type))
r=s.stepBackward()}else r=s.getCurrentToken()
return h.end.row=s.getCurrentTokenRow(),h.end.column=s.getCurrentTokenColumn(),h}},this.foldAll=function(e,t,i,n){null==i&&(i=1e5)
var s=this.foldWidgets
if(s){t=t||this.getLength()
for(var r=e=e||0;r<t;r++)if(null==s[r]&&(s[r]=this.getFoldWidget(r)),"start"==s[r]&&(!n||n(r))){var o=this.getFoldWidgetRange(r)
o&&o.isMultiLine()&&o.end.row<=t&&o.start.row>=e&&(r=o.end.row,o.collapseChildren=i,this.addFold("...",o))}}},this.foldToLevel=function(e){for(this.foldAll();e-- >0;)this.unfold(null,!1)},this.foldAllComments=function(){var e=this
this.foldAll(null,null,null,(function(t){for(var i=e.getTokens(t),n=0;n<i.length;n++){var s=i[n]
if("text"!=s.type||!/^\s+$/.test(s.value))return!!/comment/.test(s.type)}}))},this.$foldStyles={manual:1,markbegin:1,markbeginend:1},this.$foldStyle="markbegin",this.setFoldStyle=function(e){if(!this.$foldStyles[e])throw Error("invalid fold style: "+e+"["+Object.keys(this.$foldStyles).join(", ")+"]")
if(this.$foldStyle!=e){this.$foldStyle=e,"manual"==e&&this.unfold()
var t=this.$foldMode
this.$setFolding(null),this.$setFolding(t)}},this.$setFolding=function(e){this.$foldMode!=e&&(this.$foldMode=e,this.off("change",this.$updateFoldWidgets),this.off("tokenizerUpdate",this.$tokenizerUpdateFoldWidgets),this._signal("changeAnnotation"),e&&"manual"!=this.$foldStyle?(this.foldWidgets=[],this.getFoldWidget=e.getFoldWidget.bind(e,this,this.$foldStyle),this.getFoldWidgetRange=e.getFoldWidgetRange.bind(e,this,this.$foldStyle),this.$updateFoldWidgets=this.updateFoldWidgets.bind(this),this.$tokenizerUpdateFoldWidgets=this.tokenizerUpdateFoldWidgets.bind(this),this.on("change",this.$updateFoldWidgets),this.on("tokenizerUpdate",this.$tokenizerUpdateFoldWidgets)):this.foldWidgets=null)},this.getParentFoldRangeData=function(e,t){var i=this.foldWidgets
if(!i||t&&i[e])return{}
for(var n,s=e-1;s>=0;){var r=i[s]
if(null==r&&(r=i[s]=this.getFoldWidget(s)),"start"==r){var o=this.getFoldWidgetRange(s)
if(n||(n=o),o&&o.end.row>=e)break}s--}return{range:-1!==s&&o,firstRange:n}},this.onFoldWidgetClick=function(e,t){t instanceof a&&(t=t.domEvent)
var i={children:t.shiftKey,all:t.ctrlKey||t.metaKey,siblings:t.altKey}
if(!this.$toggleFoldWidget(e,i)){var n=t.target||t.srcElement
n&&/ace_fold-widget/.test(n.className)&&(n.className+=" ace_invalid")}},this.$toggleFoldWidget=function(e,t){if(this.getFoldWidget){var i=this.getFoldWidget(e),n=this.getLine(e),s="end"===i?-1:1,r=this.getFoldAt(e,-1===s?0:n.length,s)
if(r)return t.children||t.all?this.removeFold(r):this.expandFold(r),r
var o=this.getFoldWidgetRange(e,!0)
if(o&&!o.isMultiLine()&&(r=this.getFoldAt(o.start.row,o.start.column,1))&&o.isEqual(r.range))return this.removeFold(r),r
if(t.siblings){var a=this.getParentFoldRangeData(e)
if(a.range)var l=a.range.start.row+1,h=a.range.end.row
this.foldAll(l,h,t.all?1e4:0)}else t.children?(h=o?o.end.row:this.getLength(),this.foldAll(e+1,h,t.all?1e4:0)):o&&(t.all&&(o.collapseChildren=1e4),this.addFold("...",o))
return o}},this.toggleFoldWidget=function(){var e=this.selection.getCursor().row
e=this.getRowFoldStart(e)
var t=this.$toggleFoldWidget(e,{})
if(!t){var i=this.getParentFoldRangeData(e,!0)
if(t=i.range||i.firstRange){e=t.start.row
var n=this.getFoldAt(e,this.getLine(e).length,1)
n?this.removeFold(n):this.addFold("...",t)}}},this.updateFoldWidgets=function(e){var t=e.start.row,i=e.end.row-t
if(0===i)this.foldWidgets[t]=null
else if("remove"==e.action)this.foldWidgets.splice(t,i+1,null)
else{var n=Array(i+1)
n.unshift(t,1),this.foldWidgets.splice.apply(this.foldWidgets,n)}},this.tokenizerUpdateFoldWidgets=function(e){var t=e.data
t.first!=t.last&&this.foldWidgets.length>t.first&&this.foldWidgets.splice(t.first,this.foldWidgets.length)}}},4342:(e,t,i)=>{var n=i(8297),s=i(215),r=i(3927),o=i(6483),a=i(8004).k,l=i(423).e,h=i(3939).e,c=i(4369).$,u=i(9276).f,d=i(1143).v,g=i(4074).Q,p=i(8770).b,m=i(7439).F,f=i(4696).P,v=i(5133),w=i(1871).TokenIterator,y=i(3175).G,x=i(1293).S,b=i(5133).nls,C=i(2317),S=i(3679)
class k{constructor(e,t,i){this.session,this.$toDestroy=[]
var n=e.getContainerElement()
this.container=n,this.renderer=e,this.id="editor"+ ++k.$uid,this.commands=new m(o.isMac?"mac":"win",f),"object"==typeof document&&(this.textInput=new a(e.getTextAreaContainer(),this),this.renderer.textarea=this.textInput.getElement(),this.$mouseHandler=new l(this),new h(this)),this.keyBinding=new c(this),this.$search=(new d).set({wrap:!0}),this.$historyTracker=this.$historyTracker.bind(this),this.commands.on("exec",this.$historyTracker),this.$initOperationListeners(),this._$emitInputEvent=r.delayedCall(function(){this._signal("input",{}),this.session&&!this.session.destroyed&&this.session.bgTokenizer.scheduleStart()}.bind(this)),this.on("change",(function(e,t){t._$emitInputEvent.schedule(31)})),this.setSession(t||i&&i.session||new u("")),v.resetOptions(this),i&&this.setOptions(i),v._signal("editor",this)}$initOperationListeners(){this.commands.on("exec",this.startOperation.bind(this),!0),this.commands.on("afterExec",this.endOperation.bind(this),!0),this.$opResetTimer=r.delayedCall(this.endOperation.bind(this,!0)),this.on("change",function(){this.curOp||(this.startOperation(),this.curOp.selectionBefore=this.$lastSel),this.curOp.docChanged=!0}.bind(this),!0),this.on("changeSelection",function(){this.curOp||(this.startOperation(),this.curOp.selectionBefore=this.$lastSel),this.curOp.selectionChanged=!0}.bind(this),!0)}startOperation(e){if(this.curOp){if(!e||this.curOp.command)return
this.prevOp=this.curOp}e||(this.previousCommand=null,e={}),this.$opResetTimer.schedule(),this.curOp=this.session.curOp={command:e.command||{},args:e.args,scrollTop:this.renderer.scrollTop},this.curOp.selectionBefore=this.selection.toJSON()}endOperation(e){if(this.curOp&&this.session){if(e&&!1===e.returnValue||!this.session)return this.curOp=null
if(1==e&&this.curOp.command&&"mouse"==this.curOp.command.name)return
if(this._signal("beforeEndOperation"),!this.curOp)return
var t=this.curOp.command,i=t&&t.scrollIntoView
if(i){switch(i){case"center-animate":i="animate"
case"center":this.renderer.scrollCursorIntoView(null,.5)
break
case"animate":case"cursor":this.renderer.scrollCursorIntoView()
break
case"selectionPart":var n=this.selection.getRange(),s=this.renderer.layerConfig;(n.start.row>=s.lastRow||n.end.row<=s.firstRow)&&this.renderer.scrollSelectionIntoView(this.selection.anchor,this.selection.lead)}"animate"==i&&this.renderer.animateScrolling(this.curOp.scrollTop)}var r=this.selection.toJSON()
this.curOp.selectionAfter=r,this.$lastSel=this.selection.toJSON(),this.session.getUndoManager().addSelection(r),this.prevOp=this.curOp,this.curOp=null}}$historyTracker(e){if(this.$mergeUndoDeltas){var t=this.prevOp,i=this.$mergeableCommands,n=t.command&&e.command.name==t.command.name
if("insertstring"==e.command.name){var s=e.args
void 0===this.mergeNextCommand&&(this.mergeNextCommand=!0),n=n&&this.mergeNextCommand&&(!/\s/.test(s)||/\s/.test(t.args)),this.mergeNextCommand=!0}else n=n&&-1!==i.indexOf(e.command.name)
"always"!=this.$mergeUndoDeltas&&Date.now()-this.sequenceStartTime>2e3&&(n=!1),n?this.session.mergeUndoDeltas=!0:-1!==i.indexOf(e.command.name)&&(this.sequenceStartTime=Date.now())}}setKeyboardHandler(e,t){if(e&&"string"==typeof e&&"ace"!=e){this.$keybindingId=e
var i=this
v.loadModule(["keybinding",e],(function(n){i.$keybindingId==e&&i.keyBinding.setKeyboardHandler(n&&n.handler),t&&t()}))}else this.$keybindingId=null,this.keyBinding.setKeyboardHandler(e),t&&t()}getKeyboardHandler(){return this.keyBinding.getKeyboardHandler()}setSession(e){if(this.session!=e){this.curOp&&this.endOperation(),this.curOp={}
var t=this.session
if(t){this.session.off("change",this.$onDocumentChange),this.session.off("changeMode",this.$onChangeMode),this.session.off("tokenizerUpdate",this.$onTokenizerUpdate),this.session.off("changeTabSize",this.$onChangeTabSize),this.session.off("changeWrapLimit",this.$onChangeWrapLimit),this.session.off("changeWrapMode",this.$onChangeWrapMode),this.session.off("changeFold",this.$onChangeFold),this.session.off("changeFrontMarker",this.$onChangeFrontMarker),this.session.off("changeBackMarker",this.$onChangeBackMarker),this.session.off("changeBreakpoint",this.$onChangeBreakpoint),this.session.off("changeAnnotation",this.$onChangeAnnotation),this.session.off("changeOverwrite",this.$onCursorChange),this.session.off("changeScrollTop",this.$onScrollTopChange),this.session.off("changeScrollLeft",this.$onScrollLeftChange)
var i=this.session.getSelection()
i.off("changeCursor",this.$onCursorChange),i.off("changeSelection",this.$onSelectionChange)}this.session=e,e?(this.$onDocumentChange=this.onDocumentChange.bind(this),e.on("change",this.$onDocumentChange),this.renderer.setSession(e),this.$onChangeMode=this.onChangeMode.bind(this),e.on("changeMode",this.$onChangeMode),this.$onTokenizerUpdate=this.onTokenizerUpdate.bind(this),e.on("tokenizerUpdate",this.$onTokenizerUpdate),this.$onChangeTabSize=this.renderer.onChangeTabSize.bind(this.renderer),e.on("changeTabSize",this.$onChangeTabSize),this.$onChangeWrapLimit=this.onChangeWrapLimit.bind(this),e.on("changeWrapLimit",this.$onChangeWrapLimit),this.$onChangeWrapMode=this.onChangeWrapMode.bind(this),e.on("changeWrapMode",this.$onChangeWrapMode),this.$onChangeFold=this.onChangeFold.bind(this),e.on("changeFold",this.$onChangeFold),this.$onChangeFrontMarker=this.onChangeFrontMarker.bind(this),this.session.on("changeFrontMarker",this.$onChangeFrontMarker),this.$onChangeBackMarker=this.onChangeBackMarker.bind(this),this.session.on("changeBackMarker",this.$onChangeBackMarker),this.$onChangeBreakpoint=this.onChangeBreakpoint.bind(this),this.session.on("changeBreakpoint",this.$onChangeBreakpoint),this.$onChangeAnnotation=this.onChangeAnnotation.bind(this),this.session.on("changeAnnotation",this.$onChangeAnnotation),this.$onCursorChange=this.onCursorChange.bind(this),this.session.on("changeOverwrite",this.$onCursorChange),this.$onScrollTopChange=this.onScrollTopChange.bind(this),this.session.on("changeScrollTop",this.$onScrollTopChange),this.$onScrollLeftChange=this.onScrollLeftChange.bind(this),this.session.on("changeScrollLeft",this.$onScrollLeftChange),this.selection=e.getSelection(),this.selection.on("changeCursor",this.$onCursorChange),this.$onSelectionChange=this.onSelectionChange.bind(this),this.selection.on("changeSelection",this.$onSelectionChange),this.onChangeMode(),this.onCursorChange(),this.onScrollTopChange(),this.onScrollLeftChange(),this.onSelectionChange(),this.onChangeFrontMarker(),this.onChangeBackMarker(),this.onChangeBreakpoint(),this.onChangeAnnotation(),this.session.getUseWrapMode()&&this.renderer.adjustWrapLimit(),this.renderer.updateFull()):(this.selection=null,this.renderer.setSession(e)),this._signal("changeSession",{session:e,oldSession:t}),this.curOp=null,t&&t._signal("changeEditor",{oldEditor:this}),e&&e._signal("changeEditor",{editor:this}),e&&!e.destroyed&&e.bgTokenizer.scheduleStart()}}getSession(){return this.session}setValue(e,t){return this.session.doc.setValue(e),t?1==t?this.navigateFileEnd():-1==t&&this.navigateFileStart():this.selectAll(),e}getValue(){return this.session.getValue()}getSelection(){return this.selection}resize(e){this.renderer.onResize(e)}setTheme(e,t){this.renderer.setTheme(e,t)}getTheme(){return this.renderer.getTheme()}setStyle(e){this.renderer.setStyle(e)}unsetStyle(e){this.renderer.unsetStyle(e)}getFontSize(){return this.getOption("fontSize")||s.computedStyle(this.container).fontSize}setFontSize(e){this.setOption("fontSize",e)}$highlightBrackets(){if(!this.$highlightPending){var e=this
this.$highlightPending=!0,setTimeout((function(){e.$highlightPending=!1
var t=e.session
if(t&&!t.destroyed){t.$bracketHighlight&&(t.$bracketHighlight.markerIds.forEach((function(e){t.removeMarker(e)})),t.$bracketHighlight=null)
var i=e.getCursorPosition(),n=e.getKeyboardHandler(),s=n&&n.$getDirectionForHighlight&&n.$getDirectionForHighlight(e),r=t.getMatchingBracketRanges(i,s)
if(!r){var o=new w(t,i.row,i.column).getCurrentToken()
if(o&&/\b(?:tag-open|tag-name)/.test(o.type)){var a=t.getMatchingTags(i)
a&&(r=[a.openTagName.isEmpty()?a.openTag:a.openTagName,a.closeTagName.isEmpty()?a.closeTag:a.closeTagName])}}if(!r&&t.$mode.getMatching&&(r=t.$mode.getMatching(e.session)),r){var l="ace_bracket"
Array.isArray(r)?1==r.length&&(l="ace_error_bracket"):r=[r],2==r.length&&(0==g.comparePoints(r[0].end,r[1].start)?r=[g.fromPoints(r[0].start,r[1].end)]:0==g.comparePoints(r[0].start,r[1].end)&&(r=[g.fromPoints(r[1].start,r[0].end)])),t.$bracketHighlight={ranges:r,markerIds:r.map((function(e){return t.addMarker(e,l,"text")}))},e.getHighlightIndentGuides()&&e.renderer.$textLayer.$highlightIndentGuide()}else e.getHighlightIndentGuides()&&e.renderer.$textLayer.$highlightIndentGuide()}}),50)}}focus(){this.textInput.focus()}isFocused(){return this.textInput.isFocused()}blur(){this.textInput.blur()}onFocus(e){this.$isFocused||(this.$isFocused=!0,this.renderer.showCursor(),this.renderer.visualizeFocus(),this._emit("focus",e))}onBlur(e){this.$isFocused&&(this.$isFocused=!1,this.renderer.hideCursor(),this.renderer.visualizeBlur(),this._emit("blur",e))}$cursorChange(){this.renderer.updateCursor(),this.$highlightBrackets(),this.$updateHighlightActiveLine()}onDocumentChange(e){var t=this.session.$useWrapMode,i=e.start.row==e.end.row?e.end.row:1/0
this.renderer.updateLines(e.start.row,i,t),this._signal("change",e),this.$cursorChange()}onTokenizerUpdate(e){var t=e.data
this.renderer.updateLines(t.first,t.last)}onScrollTopChange(){this.renderer.scrollToY(this.session.getScrollTop())}onScrollLeftChange(){this.renderer.scrollToX(this.session.getScrollLeft())}onCursorChange(){this.$cursorChange(),this._signal("changeSelection")}$updateHighlightActiveLine(){var e,t=this.getSession()
if(this.$highlightActiveLine&&("line"==this.$selectionStyle&&this.selection.isMultiLine()||(e=this.getCursorPosition()),this.renderer.theme&&this.renderer.theme.$selectionColorConflict&&!this.selection.isEmpty()&&(e=!1),!this.renderer.$maxLines||1!==this.session.getLength()||this.renderer.$minLines>1||(e=!1)),t.$highlightLineMarker&&!e)t.removeMarker(t.$highlightLineMarker.id),t.$highlightLineMarker=null
else if(!t.$highlightLineMarker&&e){var i=new g(e.row,e.column,e.row,1/0)
i.id=t.addMarker(i,"ace_active-line","screenLine"),t.$highlightLineMarker=i}else e&&(t.$highlightLineMarker.start.row=e.row,t.$highlightLineMarker.end.row=e.row,t.$highlightLineMarker.start.column=e.column,t._signal("changeBackMarker"))}onSelectionChange(e){var t=this.session
if(t.$selectionMarker&&t.removeMarker(t.$selectionMarker),t.$selectionMarker=null,this.selection.isEmpty())this.$updateHighlightActiveLine()
else{var i=this.selection.getRange(),n=this.getSelectionStyle()
t.$selectionMarker=t.addMarker(i,"ace_selection",n)}var s=this.$highlightSelectedWord&&this.$getSelectionHighLightRegexp()
this.session.highlight(s),this._signal("changeSelection")}$getSelectionHighLightRegexp(){var e=this.session,t=this.getSelectionRange()
if(!t.isEmpty()&&!t.isMultiLine()){var i=t.start.column,n=t.end.column,s=e.getLine(t.start.row),r=s.substring(i,n)
if(!(r.length>5e3)&&/[\w\d]/.test(r)){var o=this.$search.$assembleRegExp({wholeWord:!0,caseSensitive:!0,needle:r}),a=s.substring(i-1,n+1)
if(o.test(a))return o}}}onChangeFrontMarker(){this.renderer.updateFrontMarkers()}onChangeBackMarker(){this.renderer.updateBackMarkers()}onChangeBreakpoint(){this.renderer.updateBreakpoints()}onChangeAnnotation(){this.renderer.setAnnotations(this.session.getAnnotations())}onChangeMode(e){this.renderer.updateText(),this._emit("changeMode",e)}onChangeWrapLimit(){this.renderer.updateFull()}onChangeWrapMode(){this.renderer.onResize(!0)}onChangeFold(){this.$updateHighlightActiveLine(),this.renderer.updateFull()}getSelectedText(){return this.session.getTextRange(this.getSelectionRange())}getCopyText(){var e=this.getSelectedText(),t=this.session.doc.getNewLineCharacter(),i=!1
if(!e&&this.$copyWithEmptySelection){i=!0
for(var n=this.selection.getAllRanges(),s=0;s<n.length;s++){var r=n[s]
s&&n[s-1].start.row==r.start.row||(e+=this.session.getLine(r.start.row)+t)}}var o={text:e}
return this._signal("copy",o),C.lineMode=!!i&&o.text,o.text}onCopy(){this.commands.exec("copy",this)}onCut(){this.commands.exec("cut",this)}onPaste(e,t){var i={text:e,event:t}
this.commands.exec("paste",this,i)}$handlePaste(e){"string"==typeof e&&(e={text:e}),this._signal("paste",e)
var t=e.text,i=t===C.lineMode,n=this.session
if(!this.inMultiSelectMode||this.inVirtualSelectionMode)i?n.insert({row:this.selection.lead.row,column:0},t):this.insert(t)
else if(i)this.selection.rangeList.ranges.forEach((function(e){n.insert({row:e.start.row,column:0},t)}))
else{var s=t.split(/\r\n|\r|\n/),r=this.selection.rangeList.ranges,o=!(2!=s.length||s[0]&&s[1])
if(s.length!=r.length||o)return this.commands.exec("insertstring",this,t)
for(var a=r.length;a--;){var l=r[a]
l.isEmpty()||n.remove(l),n.insert(l.start,s[a])}}}execCommand(e,t){return this.commands.exec(e,this,t)}insert(e,t){var i=this.session,n=i.getMode(),s=this.getCursorPosition()
if(this.getBehavioursEnabled()&&!t){var r=n.transformAction(i.getState(s.row),"insertion",this,i,e)
r&&(e!==r.text&&(this.inVirtualSelectionMode||(this.session.mergeUndoDeltas=!1,this.mergeNextCommand=!1)),e=r.text)}if("\t"==e&&(e=this.session.getTabString()),this.selection.isEmpty())this.session.getOverwrite()&&-1==e.indexOf("\n")&&((o=g.fromPoints(s,s)).end.column+=e.length,this.session.remove(o))
else{var o=this.getSelectionRange()
s=this.session.remove(o),this.clearSelection()}if("\n"==e||"\r\n"==e){var a=i.getLine(s.row)
if(s.column>a.search(/\S|$/)){var l=a.substr(s.column).search(/\S|$/)
i.doc.removeInLine(s.row,s.column,s.column+l)}}this.clearSelection()
var h=s.column,c=i.getState(s.row),u=(a=i.getLine(s.row),n.checkOutdent(c,a,e))
if(i.insert(s,e),r&&r.selection&&(2==r.selection.length?this.selection.setSelectionRange(new g(s.row,h+r.selection[0],s.row,h+r.selection[1])):this.selection.setSelectionRange(new g(s.row+r.selection[0],r.selection[1],s.row+r.selection[2],r.selection[3]))),this.$enableAutoIndent){if(i.getDocument().isNewLine(e)){var d=n.getNextLineIndent(c,a.slice(0,s.column),i.getTabString())
i.insert({row:s.row+1,column:0},d)}u&&n.autoOutdent(c,i,s.row)}}autoIndent(){for(var e=this.session,t=e.getMode(),i=this.selection.isEmpty()?[new g(0,0,e.doc.getLength()-1,0)]:this.selection.getAllRanges(),n="",s="",r="",o=e.getTabString(),a=0;a<i.length;a++)for(var l=i[a].start.row,h=i[a].end.row,c=l;c<=h;c++){c>0&&(n=e.getState(c-1),s=e.getLine(c-1),r=t.getNextLineIndent(n,s,o))
var u=e.getLine(c),d=t.$getIndent(u)
if(r!==d){if(d.length>0){var p=new g(c,0,c,d.length)
e.remove(p)}r.length>0&&e.insert({row:c,column:0},r)}t.autoOutdent(n,e,c)}}onTextInput(e,t){if(!t)return this.keyBinding.onTextInput(e)
this.startOperation({command:{name:"insertstring"}})
var i=this.applyComposition.bind(this,e,t)
this.selection.rangeCount?this.forEachSelection(i):i(),this.endOperation()}applyComposition(e,t){var i;(t.extendLeft||t.extendRight)&&((i=this.selection.getRange()).start.column-=t.extendLeft,i.end.column+=t.extendRight,i.start.column<0&&(i.start.row--,i.start.column+=this.session.getLine(i.start.row).length+1),this.selection.setRange(i),e||i.isEmpty()||this.remove()),!e&&this.selection.isEmpty()||this.insert(e,!0),(t.restoreStart||t.restoreEnd)&&((i=this.selection.getRange()).start.column-=t.restoreStart,i.end.column-=t.restoreEnd,this.selection.setRange(i))}onCommandKey(e,t,i){return this.keyBinding.onCommandKey(e,t,i)}setOverwrite(e){this.session.setOverwrite(e)}getOverwrite(){return this.session.getOverwrite()}toggleOverwrite(){this.session.toggleOverwrite()}setScrollSpeed(e){this.setOption("scrollSpeed",e)}getScrollSpeed(){return this.getOption("scrollSpeed")}setDragDelay(e){this.setOption("dragDelay",e)}getDragDelay(){return this.getOption("dragDelay")}setSelectionStyle(e){this.setOption("selectionStyle",e)}getSelectionStyle(){return this.getOption("selectionStyle")}setHighlightActiveLine(e){this.setOption("highlightActiveLine",e)}getHighlightActiveLine(){return this.getOption("highlightActiveLine")}setHighlightGutterLine(e){this.setOption("highlightGutterLine",e)}getHighlightGutterLine(){return this.getOption("highlightGutterLine")}setHighlightSelectedWord(e){this.setOption("highlightSelectedWord",e)}getHighlightSelectedWord(){return this.$highlightSelectedWord}setAnimatedScroll(e){this.renderer.setAnimatedScroll(e)}getAnimatedScroll(){return this.renderer.getAnimatedScroll()}setShowInvisibles(e){this.renderer.setShowInvisibles(e)}getShowInvisibles(){return this.renderer.getShowInvisibles()}setDisplayIndentGuides(e){this.renderer.setDisplayIndentGuides(e)}getDisplayIndentGuides(){return this.renderer.getDisplayIndentGuides()}setHighlightIndentGuides(e){this.renderer.setHighlightIndentGuides(e)}getHighlightIndentGuides(){return this.renderer.getHighlightIndentGuides()}setShowPrintMargin(e){this.renderer.setShowPrintMargin(e)}getShowPrintMargin(){return this.renderer.getShowPrintMargin()}setPrintMarginColumn(e){this.renderer.setPrintMarginColumn(e)}getPrintMarginColumn(){return this.renderer.getPrintMarginColumn()}setReadOnly(e){this.setOption("readOnly",e)}getReadOnly(){return this.getOption("readOnly")}setBehavioursEnabled(e){this.setOption("behavioursEnabled",e)}getBehavioursEnabled(){return this.getOption("behavioursEnabled")}setWrapBehavioursEnabled(e){this.setOption("wrapBehavioursEnabled",e)}getWrapBehavioursEnabled(){return this.getOption("wrapBehavioursEnabled")}setShowFoldWidgets(e){this.setOption("showFoldWidgets",e)}getShowFoldWidgets(){return this.getOption("showFoldWidgets")}setFadeFoldWidgets(e){this.setOption("fadeFoldWidgets",e)}getFadeFoldWidgets(){return this.getOption("fadeFoldWidgets")}remove(e){this.selection.isEmpty()&&("left"==e?this.selection.selectLeft():this.selection.selectRight())
var t=this.getSelectionRange()
if(this.getBehavioursEnabled()){var i=this.session,n=i.getState(t.start.row),s=i.getMode().transformAction(n,"deletion",this,i,t)
if(0===t.end.column){var r=i.getTextRange(t)
if("\n"==r[r.length-1]){var o=i.getLine(t.end.row);/^\s+$/.test(o)&&(t.end.column=o.length)}}s&&(t=s)}this.session.remove(t),this.clearSelection()}removeWordRight(){this.selection.isEmpty()&&this.selection.selectWordRight(),this.session.remove(this.getSelectionRange()),this.clearSelection()}removeWordLeft(){this.selection.isEmpty()&&this.selection.selectWordLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection()}removeToLineStart(){this.selection.isEmpty()&&this.selection.selectLineStart(),this.selection.isEmpty()&&this.selection.selectLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection()}removeToLineEnd(){this.selection.isEmpty()&&this.selection.selectLineEnd()
var e=this.getSelectionRange()
e.start.column==e.end.column&&e.start.row==e.end.row&&(e.end.column=0,e.end.row++),this.session.remove(e),this.clearSelection()}splitLine(){this.selection.isEmpty()||(this.session.remove(this.getSelectionRange()),this.clearSelection())
var e=this.getCursorPosition()
this.insert("\n"),this.moveCursorToPosition(e)}setGhostText(e,t){this.session.widgetManager||(this.session.widgetManager=new y(this.session),this.session.widgetManager.attach(this)),this.renderer.setGhostText(e,t)}removeGhostText(){this.session.widgetManager&&this.renderer.removeGhostText()}transposeLetters(){if(this.selection.isEmpty()){var e=this.getCursorPosition(),t=e.column
if(0!==t){var i,n,s=this.session.getLine(e.row)
t<s.length?(i=s.charAt(t)+s.charAt(t-1),n=new g(e.row,t-1,e.row,t+1)):(i=s.charAt(t-1)+s.charAt(t-2),n=new g(e.row,t-2,e.row,t)),this.session.replace(n,i),this.session.selection.moveToPosition(n.end)}}}toLowerCase(){var e=this.getSelectionRange()
this.selection.isEmpty()&&this.selection.selectWord()
var t=this.getSelectionRange(),i=this.session.getTextRange(t)
this.session.replace(t,i.toLowerCase()),this.selection.setSelectionRange(e)}toUpperCase(){var e=this.getSelectionRange()
this.selection.isEmpty()&&this.selection.selectWord()
var t=this.getSelectionRange(),i=this.session.getTextRange(t)
this.session.replace(t,i.toUpperCase()),this.selection.setSelectionRange(e)}indent(){var e=this.session,t=this.getSelectionRange()
if(!(t.start.row<t.end.row)){if(t.start.column<t.end.column){var i=e.getTextRange(t)
if(!/^\s+$/.test(i))return c=this.$getSelectedRows(),void e.indentRows(c.first,c.last,"\t")}var n=e.getLine(t.start.row),s=t.start,o=e.getTabSize(),a=e.documentToScreenColumn(s.row,s.column)
if(this.session.getUseSoftTabs())var l=o-a%o,h=r.stringRepeat(" ",l)
else{for(l=a%o;" "==n[t.start.column-1]&&l;)t.start.column--,l--
this.selection.setSelectionRange(t),h="\t"}return this.insert(h)}var c=this.$getSelectedRows()
e.indentRows(c.first,c.last,"\t")}blockIndent(){var e=this.$getSelectedRows()
this.session.indentRows(e.first,e.last,"\t")}blockOutdent(){var e=this.session.getSelection()
this.session.outdentRows(e.getRange())}sortLines(){for(var e=this.$getSelectedRows(),t=this.session,i=[],n=e.first;n<=e.last;n++)i.push(t.getLine(n))
i.sort((function(e,t){return e.toLowerCase()<t.toLowerCase()?-1:e.toLowerCase()>t.toLowerCase()?1:0}))
var s=new g(0,0,0,0)
for(n=e.first;n<=e.last;n++){var r=t.getLine(n)
s.start.row=n,s.end.row=n,s.end.column=r.length,t.replace(s,i[n-e.first])}}toggleCommentLines(){var e=this.session.getState(this.getCursorPosition().row),t=this.$getSelectedRows()
this.session.getMode().toggleCommentLines(e,this.session,t.first,t.last)}toggleBlockComment(){var e=this.getCursorPosition(),t=this.session.getState(e.row),i=this.getSelectionRange()
this.session.getMode().toggleBlockComment(t,this.session,i,e)}getNumberAt(e,t){var i=/[\-]?[0-9]+(?:\.[0-9]+)?/g
i.lastIndex=0
for(var n=this.session.getLine(e);i.lastIndex<t;){var s=i.exec(n)
if(s.index<=t&&s.index+s[0].length>=t)return{value:s[0],start:s.index,end:s.index+s[0].length}}return null}modifyNumber(e){var t=this.selection.getCursor().row,i=this.selection.getCursor().column,n=new g(t,i-1,t,i),s=this.session.getTextRange(n)
if(!isNaN(parseFloat(s))&&isFinite(s)){var r=this.getNumberAt(t,i)
if(r){var o=r.value.indexOf(".")>=0?r.start+r.value.indexOf(".")+1:r.end,a=r.start+r.value.length-o,l=parseFloat(r.value)
l*=Math.pow(10,a),o!==r.end&&i<o?e*=Math.pow(10,r.end-i-1):e*=Math.pow(10,r.end-i),l+=e
var h=(l/=Math.pow(10,a)).toFixed(a),c=new g(t,r.start,t,r.end)
this.session.replace(c,h),this.moveCursorTo(t,Math.max(r.start+1,i+h.length-r.value.length))}}else this.toggleWord()}toggleWord(){var e=this.selection.getCursor().row,t=this.selection.getCursor().column
this.selection.selectWord()
var i=this.getSelectedText(),n=this.selection.getWordRange().start.column,s=i.replace(/([a-z]+|[A-Z]+)(?=[A-Z_]|$)/g,"$1 ").split(/\s/),o=t-n-1
o<0&&(o=0)
var a=0,l=0,h=this
i.match(/[A-Za-z0-9_]+/)&&s.forEach((function(t){l=a+t.length,o>=a&&o<=l&&(i=t,h.selection.clearSelection(),h.moveCursorTo(e,a+n),h.selection.selectTo(e,l+n)),a=l}))
for(var c,u=this.$toggleWordPairs,d=0;d<u.length;d++)for(var g=u[d],p=0;p<=1;p++){var m=+!p,f=i.match(RegExp("^\\s?_?("+r.escapeRegExp(g[p])+")\\s?$","i"))
f&&i.match(RegExp("([_]|^|\\s)("+r.escapeRegExp(f[1])+")($|\\s)","g"))&&(c=i.replace(RegExp(r.escapeRegExp(g[p]),"i"),(function(e){var t=g[m]
return e.toUpperCase()==e?t=t.toUpperCase():e.charAt(0).toUpperCase()==e.charAt(0)&&(t=t.substr(0,0)+g[m].charAt(0).toUpperCase()+t.substr(1)),t})),this.insert(c),c="")}}findLinkAt(e,t){var i=this.session.getLine(e).split(/((?:https?|ftp):\/\/[\S]+)/),n=t
n<0&&(n=0)
var s,r=0,o=0
for(let e of i){if(o=r+e.length,n>=r&&n<=o&&e.match(/((?:https?|ftp):\/\/[\S]+)/)){s=e.replace(/[\s:.,'";}\]]+$/,"")
break}r=o}return s}openLink(){var e=this.selection.getCursor(),t=this.findLinkAt(e.row,e.column)
return t&&window.open(t,"_blank"),null!=t}removeLines(){var e=this.$getSelectedRows()
this.session.removeFullLines(e.first,e.last),this.clearSelection()}duplicateSelection(){var e=this.selection,t=this.session,i=e.getRange(),n=e.isBackwards()
if(i.isEmpty()){var s=i.start.row
t.duplicateLines(s,s)}else{var r=n?i.start:i.end,o=t.insert(r,t.getTextRange(i))
i.start=r,i.end=o,e.setSelectionRange(i,n)}}moveLinesDown(){this.$moveLines(1,!1)}moveLinesUp(){this.$moveLines(-1,!1)}moveText(e,t,i){return this.session.moveText(e,t,i)}copyLinesUp(){this.$moveLines(-1,!0)}copyLinesDown(){this.$moveLines(1,!0)}$moveLines(e,t){var i,n,s=this.selection
if(!s.inMultiSelectMode||this.inVirtualSelectionMode){var r=s.toOrientedRange()
i=this.$getSelectedRows(r),n=this.session.$moveLines(i.first,i.last,t?0:e),t&&-1==e&&(n=0),r.moveBy(n,0),s.fromOrientedRange(r)}else{var o=s.rangeList.ranges
s.rangeList.detach(this.session),this.inVirtualSelectionMode=!0
for(var a=0,l=0,h=o.length,c=0;c<h;c++){var u=c
o[c].moveBy(a,0)
for(var d=(i=this.$getSelectedRows(o[c])).first,g=i.last;++c<h;){l&&o[c].moveBy(l,0)
var p=this.$getSelectedRows(o[c])
if(t&&p.first!=g)break
if(!t&&p.first>g+1)break
g=p.last}for(c--,a=this.session.$moveLines(d,g,t?0:e),t&&-1==e&&(u=c+1);u<=c;)o[u].moveBy(a,0),u++
t||(a=0),l+=a}s.fromOrientedRange(s.ranges[0]),s.rangeList.attach(this.session),this.inVirtualSelectionMode=!1}}$getSelectedRows(e){return e=(e||this.getSelectionRange()).collapseRows(),{first:this.session.getRowFoldStart(e.start.row),last:this.session.getRowFoldEnd(e.end.row)}}onCompositionStart(e){this.renderer.showComposition(e)}onCompositionUpdate(e){this.renderer.setCompositionText(e)}onCompositionEnd(){this.renderer.hideComposition()}getFirstVisibleRow(){return this.renderer.getFirstVisibleRow()}getLastVisibleRow(){return this.renderer.getLastVisibleRow()}isRowVisible(e){return e>=this.getFirstVisibleRow()&&e<=this.getLastVisibleRow()}isRowFullyVisible(e){return e>=this.renderer.getFirstFullyVisibleRow()&&e<=this.renderer.getLastFullyVisibleRow()}$getVisibleRowCount(){return this.renderer.getScrollBottomRow()-this.renderer.getScrollTopRow()+1}$moveByPage(e,t){var i=this.renderer,n=this.renderer.layerConfig,s=e*Math.floor(n.height/n.lineHeight)
!0===t?this.selection.$moveSelection((function(){this.moveCursorBy(s,0)})):!1===t&&(this.selection.moveCursorBy(s,0),this.selection.clearSelection())
var r=i.scrollTop
i.scrollBy(0,s*n.lineHeight),null!=t&&i.scrollCursorIntoView(null,.5),i.animateScrolling(r)}selectPageDown(){this.$moveByPage(1,!0)}selectPageUp(){this.$moveByPage(-1,!0)}gotoPageDown(){this.$moveByPage(1,!1)}gotoPageUp(){this.$moveByPage(-1,!1)}scrollPageDown(){this.$moveByPage(1)}scrollPageUp(){this.$moveByPage(-1)}scrollToRow(e){this.renderer.scrollToRow(e)}scrollToLine(e,t,i,n){this.renderer.scrollToLine(e,t,i,n)}centerSelection(){var e=this.getSelectionRange(),t={row:Math.floor(e.start.row+(e.end.row-e.start.row)/2),column:Math.floor(e.start.column+(e.end.column-e.start.column)/2)}
this.renderer.alignCursor(t,.5)}getCursorPosition(){return this.selection.getCursor()}getCursorPositionScreen(){return this.session.documentToScreenPosition(this.getCursorPosition())}getSelectionRange(){return this.selection.getRange()}selectAll(){this.selection.selectAll()}clearSelection(){this.selection.clearSelection()}moveCursorTo(e,t){this.selection.moveCursorTo(e,t)}moveCursorToPosition(e){this.selection.moveCursorToPosition(e)}jumpToMatching(e,t){var i=this.getCursorPosition(),n=new w(this.session,i.row,i.column),s=n.getCurrentToken(),r=0
s&&-1!==s.type.indexOf("tag-name")&&(s=n.stepBackward())
var o=s||n.stepForward()
if(o){var a,l,h=!1,c={},u=i.column-o.start,d={")":"(","(":"(","]":"[","[":"[","{":"{","}":"{"}
do{if(o.value.match(/[{}()\[\]]/g)){for(;u<o.value.length&&!h;u++)if(d[o.value[u]])switch(l=d[o.value[u]]+"."+o.type.replace("rparen","lparen"),isNaN(c[l])&&(c[l]=0),o.value[u]){case"(":case"[":case"{":c[l]++
break
case")":case"]":case"}":c[l]--,-1===c[l]&&(a="bracket",h=!0)}}else-1!==o.type.indexOf("tag-name")&&(isNaN(c[o.value])&&(c[o.value]=0),"<"===s.value&&r>1?c[o.value]++:"</"===s.value&&c[o.value]--,-1===c[o.value]&&(a="tag",h=!0))
h||(s=o,r++,o=n.stepForward(),u=0)}while(o&&!h)
if(a){var p,m
if("bracket"===a)(p=this.session.getBracketRange(i))||(m=(p=new g(n.getCurrentTokenRow(),n.getCurrentTokenColumn()+u-1,n.getCurrentTokenRow(),n.getCurrentTokenColumn()+u-1)).start,(t||m.row===i.row&&Math.abs(m.column-i.column)<2)&&(p=this.session.getBracketRange(m)))
else if("tag"===a){if(!o||-1===o.type.indexOf("tag-name"))return
if(0===(p=new g(n.getCurrentTokenRow(),n.getCurrentTokenColumn()-2,n.getCurrentTokenRow(),n.getCurrentTokenColumn()-2)).compare(i.row,i.column)){var f=this.session.getMatchingTags(i)
f&&(f.openTag.contains(i.row,i.column)?m=(p=f.closeTag).start:(p=f.openTag,m=f.closeTag.start.row===i.row&&f.closeTag.start.column===i.column?p.end:p.start))}m=m||p.start}(m=p&&p.cursor||m)&&(e?p&&t?this.selection.setRange(p):p&&p.isEqual(this.getSelectionRange())?this.clearSelection():this.selection.selectTo(m.row,m.column):this.selection.moveTo(m.row,m.column))}}}gotoLine(e,t,i){this.selection.clearSelection(),this.session.unfold({row:e-1,column:t||0}),this.exitMultiSelectMode&&this.exitMultiSelectMode(),this.moveCursorTo(e-1,t||0),this.isRowFullyVisible(e-1)||this.scrollToLine(e-1,!0,i)}navigateTo(e,t){this.selection.moveTo(e,t)}navigateUp(e){if(this.selection.isMultiLine()&&!this.selection.isBackwards()){var t=this.selection.anchor.getPosition()
return this.moveCursorToPosition(t)}this.selection.clearSelection(),this.selection.moveCursorBy(-e||-1,0)}navigateDown(e){if(this.selection.isMultiLine()&&this.selection.isBackwards()){var t=this.selection.anchor.getPosition()
return this.moveCursorToPosition(t)}this.selection.clearSelection(),this.selection.moveCursorBy(e||1,0)}navigateLeft(e){if(this.selection.isEmpty())for(e=e||1;e--;)this.selection.moveCursorLeft()
else{var t=this.getSelectionRange().start
this.moveCursorToPosition(t)}this.clearSelection()}navigateRight(e){if(this.selection.isEmpty())for(e=e||1;e--;)this.selection.moveCursorRight()
else{var t=this.getSelectionRange().end
this.moveCursorToPosition(t)}this.clearSelection()}navigateLineStart(){this.selection.moveCursorLineStart(),this.clearSelection()}navigateLineEnd(){this.selection.moveCursorLineEnd(),this.clearSelection()}navigateFileEnd(){this.selection.moveCursorFileEnd(),this.clearSelection()}navigateFileStart(){this.selection.moveCursorFileStart(),this.clearSelection()}navigateWordRight(){this.selection.moveCursorWordRight(),this.clearSelection()}navigateWordLeft(){this.selection.moveCursorWordLeft(),this.clearSelection()}replace(e,t){t&&this.$search.set(t)
var i=this.$search.find(this.session),n=0
return i?(this.$tryReplace(i,e)&&(n=1),this.selection.setSelectionRange(i),this.renderer.scrollSelectionIntoView(i.start,i.end),n):n}replaceAll(e,t){t&&this.$search.set(t)
var i=this.$search.findAll(this.session),n=0
if(!i.length)return n
var s=this.getSelectionRange()
this.selection.moveTo(0,0)
for(var r=i.length-1;r>=0;--r)this.$tryReplace(i[r],e)&&n++
return this.selection.setSelectionRange(s),n}$tryReplace(e,t){var i=this.session.getTextRange(e)
return null!==(t=this.$search.replace(i,t))?(e.end=this.session.replace(e,t),e):null}getLastSearchOptions(){return this.$search.getOptions()}find(e,t,i){t||(t={}),"string"==typeof e||e instanceof RegExp?t.needle=e:"object"==typeof e&&n.mixin(t,e)
var s=this.selection.getRange()
null==t.needle&&((e=this.session.getTextRange(s)||this.$search.$options.needle)||(s=this.session.getWordRange(s.start.row,s.start.column),e=this.session.getTextRange(s)),this.$search.set({needle:e})),this.$search.set(t),t.start||this.$search.set({start:s})
var r=this.$search.find(this.session)
return t.preventScroll?r:r?(this.revealRange(r,i),r):(t.backwards?s.start=s.end:s.end=s.start,void this.selection.setRange(s))}findNext(e,t){this.find({skipCurrent:!0,backwards:!1},e,t)}findPrevious(e,t){this.find(e,{skipCurrent:!0,backwards:!0},t)}revealRange(e,t){this.session.unfold(e),this.selection.setSelectionRange(e)
var i=this.renderer.scrollTop
this.renderer.scrollSelectionIntoView(e.start,e.end,.5),!1!==t&&this.renderer.animateScrolling(i)}undo(){this.session.getUndoManager().undo(this.session),this.renderer.scrollCursorIntoView(null,.5)}redo(){this.session.getUndoManager().redo(this.session),this.renderer.scrollCursorIntoView(null,.5)}destroy(){this.$toDestroy&&(this.$toDestroy.forEach((function(e){e.destroy()})),this.$toDestroy=null),this.$mouseHandler&&this.$mouseHandler.destroy(),this.renderer.destroy(),this._signal("destroy",this),this.session&&this.session.destroy(),this._$emitInputEvent&&this._$emitInputEvent.cancel(),this.removeAllListeners()}setAutoScrollEditorIntoView(e){if(e){var t,i=this,n=!1
this.$scrollAnchor||(this.$scrollAnchor=document.createElement("div"))
var s=this.$scrollAnchor
s.style.cssText="position:absolute",this.container.insertBefore(s,this.container.firstChild)
var r=this.on("changeSelection",(function(){n=!0})),o=this.renderer.on("beforeRender",(function(){n&&(t=i.renderer.container.getBoundingClientRect())})),a=this.renderer.on("afterRender",(function(){if(n&&t&&(i.isFocused()||i.searchBox&&i.searchBox.isFocused())){var e=i.renderer,r=e.$cursorLayer.$pixelPos,o=e.layerConfig,a=r.top-o.offset
null!=(n=r.top>=0&&a+t.top<0||!(r.top<o.height&&r.top+t.top+o.lineHeight>window.innerHeight)&&null)&&(s.style.top=a+"px",s.style.left=r.left+"px",s.style.height=o.lineHeight+"px",s.scrollIntoView(n)),n=t=null}}))
this.setAutoScrollEditorIntoView=function(e){e||(delete this.setAutoScrollEditorIntoView,this.off("changeSelection",r),this.renderer.off("afterRender",a),this.renderer.off("beforeRender",o))}}}$resetCursorStyle(){var e=this.$cursorStyle||"ace",t=this.renderer.$cursorLayer
t&&(t.setSmoothBlinking(/smooth/.test(e)),t.isBlinking=!this.$readOnly&&"wide"!=e,s.setCssClass(t.element,"ace_slim-cursors",/slim/.test(e)))}prompt(e,t,i){var n=this
v.loadModule("ace/ext/prompt",(function(s){s.prompt(n,e,t,i)}))}}k.$uid=0,k.prototype.curOp=null,k.prototype.prevOp={},k.prototype.$mergeableCommands=["backspace","del","insertstring"],k.prototype.$toggleWordPairs=[["first","last"],["true","false"],["yes","no"],["width","height"],["top","bottom"],["right","left"],["on","off"],["x","y"],["get","set"],["max","min"],["horizontal","vertical"],["show","hide"],["add","remove"],["up","down"],["before","after"],["even","odd"],["in","out"],["inside","outside"],["next","previous"],["increase","decrease"],["attach","detach"],["&&","||"],["==","!="]],n.implement(k.prototype,p),v.defineOptions(k.prototype,"editor",{selectionStyle:{set:function(e){this.onSelectionChange(),this._signal("changeSelectionStyle",{data:e})},initialValue:"line"},highlightActiveLine:{set:function(){this.$updateHighlightActiveLine()},initialValue:!0},highlightSelectedWord:{set:function(){this.$onSelectionChange()},initialValue:!0},readOnly:{set:function(e){this.textInput.setReadOnly(e),this.$resetCursorStyle()},initialValue:!1},copyWithEmptySelection:{set:function(e){this.textInput.setCopyWithEmptySelection(e)},initialValue:!1},cursorStyle:{set:function(){this.$resetCursorStyle()},values:["ace","slim","smooth","wide"],initialValue:"ace"},mergeUndoDeltas:{values:[!1,!0,"always"],initialValue:!0},behavioursEnabled:{initialValue:!0},wrapBehavioursEnabled:{initialValue:!0},enableAutoIndent:{initialValue:!0},autoScrollEditorIntoView:{set:function(e){this.setAutoScrollEditorIntoView(e)}},keyboardHandler:{set:function(e){this.setKeyboardHandler(e)},get:function(){return this.$keybindingId},handlesSet:!0},value:{set:function(e){this.session.setValue(e)},get:function(){return this.getValue()},handlesSet:!0,hidden:!0},session:{set:function(e){this.setSession(e)},get:function(){return this.session},handlesSet:!0,hidden:!0},showLineNumbers:{set:function(e){this.renderer.$gutterLayer.setShowLineNumbers(e),this.renderer.$loop.schedule(this.renderer.CHANGE_GUTTER),e&&this.$relativeLineNumbers?$.attach(this):$.detach(this)},initialValue:!0},relativeLineNumbers:{set:function(e){this.$showLineNumbers&&e?$.attach(this):$.detach(this)}},placeholder:{set:function(){this.$updatePlaceholder||(this.$updatePlaceholder=function(){var e=this.session&&(this.renderer.$composition||this.session.getLength()>1||this.session.getLine(0).length>0)
if(e&&this.renderer.placeholderNode)this.renderer.off("afterRender",this.$updatePlaceholder),s.removeCssClass(this.container,"ace_hasPlaceholder"),this.renderer.placeholderNode.remove(),this.renderer.placeholderNode=null
else if(e||this.renderer.placeholderNode)!e&&this.renderer.placeholderNode&&(this.renderer.placeholderNode.textContent=this.$placeholder||"")
else{this.renderer.on("afterRender",this.$updatePlaceholder),s.addCssClass(this.container,"ace_hasPlaceholder")
var t=s.createElement("div")
t.className="ace_placeholder",t.textContent=this.$placeholder||"",this.renderer.placeholderNode=t,this.renderer.content.appendChild(this.renderer.placeholderNode)}}.bind(this),this.on("input",this.$updatePlaceholder)),this.$updatePlaceholder()}},enableKeyboardAccessibility:{set:function(e){var t,i={name:"blurTextInput",description:"Set focus to the editor content div to allow tabbing through the page",bindKey:"Esc",exec:function(e){e.blur(),e.renderer.scroller.focus()},readOnly:!0},n=function(e){if(e.target==this.renderer.scroller&&e.keyCode===S.enter){e.preventDefault()
var t=this.getCursorPosition().row
this.isRowVisible(t)||this.scrollToLine(t,!0,!0),this.focus()}}
e?(this.renderer.enableKeyboardAccessibility=!0,this.renderer.keyboardFocusClassName="ace_keyboard-focus",this.textInput.getElement().setAttribute("tabindex",-1),this.textInput.setNumberOfExtraLines(o.isWin?3:0),this.renderer.scroller.setAttribute("tabindex",0),this.renderer.scroller.setAttribute("role","group"),this.renderer.scroller.setAttribute("aria-roledescription",b("editor.scroller.aria-roledescription","editor")),this.renderer.scroller.classList.add(this.renderer.keyboardFocusClassName),this.renderer.scroller.setAttribute("aria-label",b("editor.scroller.aria-label","Editor content, press Enter to start editing, press Escape to exit")),this.renderer.scroller.addEventListener("keyup",n.bind(this)),this.commands.addCommand(i),this.renderer.$gutter.setAttribute("tabindex",0),this.renderer.$gutter.setAttribute("aria-hidden",!1),this.renderer.$gutter.setAttribute("role","group"),this.renderer.$gutter.setAttribute("aria-roledescription",b("editor.gutter.aria-roledescription","editor")),this.renderer.$gutter.setAttribute("aria-label",b("editor.gutter.aria-label","Editor gutter, press Enter to interact with controls using arrow keys, press Escape to exit")),this.renderer.$gutter.classList.add(this.renderer.keyboardFocusClassName),this.renderer.content.setAttribute("aria-hidden",!0),t||(t=new x(this)),t.addListener(),this.textInput.setAriaOptions({setLabel:!0})):(this.renderer.enableKeyboardAccessibility=!1,this.textInput.getElement().setAttribute("tabindex",0),this.textInput.setNumberOfExtraLines(0),this.renderer.scroller.setAttribute("tabindex",-1),this.renderer.scroller.removeAttribute("role"),this.renderer.scroller.removeAttribute("aria-roledescription"),this.renderer.scroller.classList.remove(this.renderer.keyboardFocusClassName),this.renderer.scroller.removeAttribute("aria-label"),this.renderer.scroller.removeEventListener("keyup",n.bind(this)),this.commands.removeCommand(i),this.renderer.content.removeAttribute("aria-hidden"),this.renderer.$gutter.setAttribute("tabindex",-1),this.renderer.$gutter.setAttribute("aria-hidden",!0),this.renderer.$gutter.removeAttribute("role"),this.renderer.$gutter.removeAttribute("aria-roledescription"),this.renderer.$gutter.removeAttribute("aria-label"),this.renderer.$gutter.classList.remove(this.renderer.keyboardFocusClassName),t&&t.removeListener())},initialValue:!1},textInputAriaLabel:{set:function(e){this.$textInputAriaLabel=e},initialValue:""},enableMobileMenu:{set:function(e){this.$enableMobileMenu=e},initialValue:!0},customScrollbar:"renderer",hScrollBarAlwaysVisible:"renderer",vScrollBarAlwaysVisible:"renderer",highlightGutterLine:"renderer",animatedScroll:"renderer",showInvisibles:"renderer",showPrintMargin:"renderer",printMarginColumn:"renderer",printMargin:"renderer",fadeFoldWidgets:"renderer",showFoldWidgets:"renderer",displayIndentGuides:"renderer",highlightIndentGuides:"renderer",showGutter:"renderer",fontSize:"renderer",fontFamily:"renderer",maxLines:"renderer",minLines:"renderer",scrollPastEnd:"renderer",fixedWidthGutter:"renderer",theme:"renderer",hasCssTransforms:"renderer",maxPixelHeight:"renderer",useTextareaForIME:"renderer",useResizeObserver:"renderer",useSvgGutterIcons:"renderer",showFoldedAnnotations:"renderer",scrollSpeed:"$mouseHandler",dragDelay:"$mouseHandler",dragEnabled:"$mouseHandler",focusTimeout:"$mouseHandler",tooltipFollowsMouse:"$mouseHandler",firstLineNumber:"session",overwrite:"session",newLineMode:"session",useWorker:"session",useSoftTabs:"session",navigateWithinSoftTabs:"session",tabSize:"session",wrap:"session",indentedSoftWrap:"session",foldStyle:"session",mode:"session"})
var $={getText:function(e,t){return(Math.abs(e.selection.lead.row-t)||t+1+(t<9?"\xb7":""))+""},getWidth:function(e,t,i){return Math.max(t.toString().length,(""+(i.lastRow+1)).length,2)*i.characterWidth},update:function(e,t){t.renderer.$loop.schedule(t.renderer.CHANGE_GUTTER)},attach:function(e){e.renderer.$gutterLayer.$renderer=this,e.on("changeSelection",this.update),this.update(null,e)},detach:function(e){e.renderer.$gutterLayer.$renderer==this&&(e.renderer.$gutterLayer.$renderer=null),e.off("changeSelection",this.update),this.update(null,e)}}
t.K=k},7914:(e,t,i)=>{var n=i(3175).G,s=i(215),r=i(4074).Q,o=i(5133).nls
t.showErrorMarker=function(e,t){var i=e.session
i.widgetManager||(i.widgetManager=new n(i),i.widgetManager.attach(e))
var a=e.getCursorPosition(),l=a.row,h=i.widgetManager.getWidgetsAtRow(l).filter((function(e){return"errorMarker"==e.type}))[0]
h?h.destroy():l-=t
var c,u=function(e,t,i){var n=e.getAnnotations().sort(r.comparePoints)
if(n.length){var s=function(e,t,i){for(var n=0,s=e.length-1;n<=s;){var r=n+s>>1,o=i(t,e[r])
if(o>0)n=r+1
else{if(!(o<0))return r
s=r-1}}return-(n+1)}(n,{row:t,column:-1},r.comparePoints)
s<0&&(s=-s-1),s>=n.length?s=i>0?0:n.length-1:0===s&&i<0&&(s=n.length-1)
var o=n[s]
if(o&&i){if(o.row===t){do{o=n[s+=i]}while(o&&o.row===t)
if(!o)return n.slice()}var a=[]
t=o.row
do{a[i<0?"unshift":"push"](o),o=n[s+=i]}while(o&&o.row==t)
return a.length&&a}}}(i,l,t)
if(u){var d=u[0]
a.column=(d.pos&&"number"!=typeof d.column?d.pos.sc:d.column)||0,a.row=d.row,c=e.renderer.$gutterLayer.$annotations[a.row]}else{if(h)return
c={displayText:[o("error-marker.good-state","Looks good!")],className:"ace_ok"}}e.session.unfold(a.row),e.selection.moveToPosition(a)
var g={row:a.row,fixedWidth:!0,coverGutter:!0,el:s.createElement("div"),type:"errorMarker"},p=g.el.appendChild(s.createElement("div")),m=g.el.appendChild(s.createElement("div"))
m.className="error_widget_arrow "+c.className
var f=e.renderer.$cursorLayer.getPixelPosition(a).left
m.style.left=f+e.renderer.gutterWidth-5+"px",g.el.className="error_widget_wrapper",p.className="error_widget "+c.className,c.displayText.forEach((function(e,t){p.appendChild(s.createTextNode(e)),t<c.displayText.length-1&&p.appendChild(s.createElement("br"))})),p.appendChild(s.createElement("div"))
var v=function(e,t,i){if(0===t&&("esc"===i||"return"===i))return g.destroy(),{command:"null"}}
g.destroy=function(){e.$mouseHandler.isMousePressed||(e.keyBinding.removeKeyboardHandler(v),i.widgetManager.removeLineWidget(g),e.off("changeSelection",g.destroy),e.off("changeSession",g.destroy),e.off("mouseup",g.destroy),e.off("change",g.destroy))},e.keyBinding.addKeyboardHandler(v),e.on("changeSelection",g.destroy),e.on("changeSession",g.destroy),e.on("mouseup",g.destroy),e.on("change",g.destroy),e.session.widgetManager.addLineWidget(g),g.el.onmousedown=e.focus.bind(e),e.renderer.scrollCursorIntoView(null,.5,{bottom:g.el.offsetHeight})},s.importCssString("\n    .error_widget_wrapper {\n        background: inherit;\n        color: inherit;\n        border:none\n    }\n    .error_widget {\n        border-top: solid 2px;\n        border-bottom: solid 2px;\n        margin: 5px 0;\n        padding: 10px 40px;\n        white-space: pre-wrap;\n    }\n    .error_widget.ace_error, .error_widget_arrow.ace_error{\n        border-color: #ff5a5a\n    }\n    .error_widget.ace_warning, .error_widget_arrow.ace_warning{\n        border-color: #F1D817\n    }\n    .error_widget.ace_info, .error_widget_arrow.ace_info{\n        border-color: #5a5a5a\n    }\n    .error_widget.ace_ok, .error_widget_arrow.ace_ok{\n        border-color: #5aaa5a\n    }\n    .error_widget_arrow {\n        position: absolute;\n        border: solid 5px;\n        border-top-color: transparent!important;\n        border-right-color: transparent!important;\n        border-left-color: transparent!important;\n        top: -5px;\n    }\n","error_marker.css",!1)},1293:(e,t,i)=>{var n=i(3679),s=i(1689).Z
t.S=class{constructor(e){this.editor=e,this.gutterLayer=e.renderer.$gutterLayer,this.element=e.renderer.$gutter,this.lines=e.renderer.$gutterLayer.$lines,this.activeRowIndex=null,this.activeLane=null,this.annotationTooltip=new s(this.editor)}addListener(){this.element.addEventListener("keydown",this.$onGutterKeyDown.bind(this)),this.element.addEventListener("focusout",this.$blurGutter.bind(this)),this.editor.on("mousewheel",this.$blurGutter.bind(this))}removeListener(){this.element.removeEventListener("keydown",this.$onGutterKeyDown.bind(this)),this.element.removeEventListener("focusout",this.$blurGutter.bind(this)),this.editor.off("mousewheel",this.$blurGutter.bind(this))}$onGutterKeyDown(e){if(this.annotationTooltip.isOpen)return e.preventDefault(),void(e.keyCode===n.escape&&this.annotationTooltip.hideTooltip())
if(e.target===this.element){if(e.keyCode!=n.enter)return
e.preventDefault()
var t=this.editor.getCursorPosition().row
return this.editor.isRowVisible(t)||this.editor.scrollToLine(t,!0,!0),void setTimeout(function(){var e=this.$rowToRowIndex(this.gutterLayer.$cursorCell.row),t=this.$findNearestFoldWidget(e),i=this.$findNearestAnnotation(e)
if(null!==t||null!==i)return null===t&&null!==i?(this.activeRowIndex=i,this.activeLane="annotation",void this.$focusAnnotation(this.activeRowIndex)):null!==t&&null===i?(this.activeRowIndex=t,this.activeLane="fold",void this.$focusFoldWidget(this.activeRowIndex)):Math.abs(i-e)<Math.abs(t-e)?(this.activeRowIndex=i,this.activeLane="annotation",void this.$focusAnnotation(this.activeRowIndex)):(this.activeRowIndex=t,this.activeLane="fold",void this.$focusFoldWidget(this.activeRowIndex))}.bind(this),10)}this.$handleGutterKeyboardInteraction(e),setTimeout(function(){this.editor._signal("gutterkeydown",new r(e,this))}.bind(this),10)}$handleGutterKeyboardInteraction(e){if(e.keyCode!==n.tab){if(e.keyCode===n.escape)return e.preventDefault(),this.$blurGutter(),this.element.focus(),void(this.lane=null)
if(e.keyCode!==n.up)if(e.keyCode!==n.down){if(e.keyCode===n.left)return e.preventDefault(),void this.$switchLane("annotation")
if(e.keyCode===n.right)return e.preventDefault(),void this.$switchLane("fold")
if(e.keyCode!==n.enter&&e.keyCode!==n.space);else switch(e.preventDefault(),this.activeLane){case"fold":if("start"===this.gutterLayer.session.foldWidgets[this.$rowIndexToRow(this.activeRowIndex)]){var t=this.$rowIndexToRow(this.activeRowIndex)
this.editor.session.onFoldWidgetClick(this.$rowIndexToRow(this.activeRowIndex),e),setTimeout(function(){this.$rowIndexToRow(this.activeRowIndex)!==t&&(this.$blurFoldWidget(this.activeRowIndex),this.activeRowIndex=this.$rowToRowIndex(t),this.$focusFoldWidget(this.activeRowIndex))}.bind(this),10)
break}if("end"===this.gutterLayer.session.foldWidgets[this.$rowIndexToRow(this.activeRowIndex)])break
return
case"annotation":var i=this.lines.cells[this.activeRowIndex].element.childNodes[2].getBoundingClientRect(),s=this.annotationTooltip.getElement().style
s.left=i.right+"px",s.top=i.bottom+"px",this.annotationTooltip.showTooltip(this.$rowIndexToRow(this.activeRowIndex))}}else switch(e.preventDefault(),this.activeLane){case"fold":this.$moveFoldWidgetDown()
break
case"annotation":this.$moveAnnotationDown()}else switch(e.preventDefault(),this.activeLane){case"fold":this.$moveFoldWidgetUp()
break
case"annotation":this.$moveAnnotationUp()}}else e.preventDefault()}$blurGutter(){if(null!==this.activeRowIndex)switch(this.activeLane){case"fold":this.$blurFoldWidget(this.activeRowIndex)
break
case"annotation":this.$blurAnnotation(this.activeRowIndex)}this.annotationTooltip.isOpen&&this.annotationTooltip.hideTooltip()}$isFoldWidgetVisible(e){var t=this.editor.isRowFullyVisible(this.$rowIndexToRow(e)),i="none"!==this.$getFoldWidget(e).style.display
return t&&i}$isAnnotationVisible(e){var t=this.editor.isRowFullyVisible(this.$rowIndexToRow(e)),i="none"!==this.$getAnnotation(e).style.display
return t&&i}$getFoldWidget(e){return this.lines.get(e).element.childNodes[1]}$getAnnotation(e){return this.lines.get(e).element.childNodes[2]}$findNearestFoldWidget(e){if(this.$isFoldWidgetVisible(e))return e
for(var t=0;e-t>0||e+t<this.lines.getLength()-1;){if(e-++t>=0&&this.$isFoldWidgetVisible(e-t))return e-t
if(e+t<=this.lines.getLength()-1&&this.$isFoldWidgetVisible(e+t))return e+t}return null}$findNearestAnnotation(e){if(this.$isAnnotationVisible(e))return e
for(var t=0;e-t>0||e+t<this.lines.getLength()-1;){if(e-++t>=0&&this.$isAnnotationVisible(e-t))return e-t
if(e+t<=this.lines.getLength()-1&&this.$isAnnotationVisible(e+t))return e+t}return null}$focusFoldWidget(e){if(null!=e){var t=this.$getFoldWidget(e)
t.classList.add(this.editor.renderer.keyboardFocusClassName),t.focus()}}$focusAnnotation(e){if(null!=e){var t=this.$getAnnotation(e)
t.classList.add(this.editor.renderer.keyboardFocusClassName),t.focus()}}$blurFoldWidget(e){var t=this.$getFoldWidget(e)
t.classList.remove(this.editor.renderer.keyboardFocusClassName),t.blur()}$blurAnnotation(e){var t=this.$getAnnotation(e)
t.classList.remove(this.editor.renderer.keyboardFocusClassName),t.blur()}$moveFoldWidgetUp(){for(var e=this.activeRowIndex;e>0;)if(e--,this.$isFoldWidgetVisible(e))return this.$blurFoldWidget(this.activeRowIndex),this.activeRowIndex=e,void this.$focusFoldWidget(this.activeRowIndex)}$moveFoldWidgetDown(){for(var e=this.activeRowIndex;e<this.lines.getLength()-1;)if(e++,this.$isFoldWidgetVisible(e))return this.$blurFoldWidget(this.activeRowIndex),this.activeRowIndex=e,void this.$focusFoldWidget(this.activeRowIndex)}$moveAnnotationUp(){for(var e=this.activeRowIndex;e>0;)if(e--,this.$isAnnotationVisible(e))return this.$blurAnnotation(this.activeRowIndex),this.activeRowIndex=e,void this.$focusAnnotation(this.activeRowIndex)}$moveAnnotationDown(){for(var e=this.activeRowIndex;e<this.lines.getLength()-1;)if(e++,this.$isAnnotationVisible(e))return this.$blurAnnotation(this.activeRowIndex),this.activeRowIndex=e,void this.$focusAnnotation(this.activeRowIndex)}$switchLane(e){switch(e){case"annotation":if("annotation"===this.activeLane)break
var t=this.$findNearestAnnotation(this.activeRowIndex)
if(null==t)break
this.activeLane="annotation",this.$blurFoldWidget(this.activeRowIndex),this.activeRowIndex=t,this.$focusAnnotation(this.activeRowIndex)
break
case"fold":if("fold"===this.activeLane)break
var i=this.$findNearestFoldWidget(this.activeRowIndex)
if(null==i)break
this.activeLane="fold",this.$blurAnnotation(this.activeRowIndex),this.activeRowIndex=i,this.$focusFoldWidget(this.activeRowIndex)}}$rowIndexToRow(e){var t=this.lines.get(e)
return t?t.row:null}$rowToRowIndex(e){for(var t=0;t<this.lines.getLength();t++)if(this.lines.get(t).row==e)return t
return null}}
class r{constructor(e,t){this.gutterKeyboardHandler=t,this.domEvent=e}getKey(){return n.keyCodeToString(this.domEvent.keyCode)}getRow(){return this.gutterKeyboardHandler.$rowIndexToRow(this.gutterKeyboardHandler.activeRowIndex)}isInAnnotationLane(){return"annotation"===this.gutterKeyboardHandler.activeLane}isInFoldLane(){return"fold"===this.gutterKeyboardHandler.activeLane}}},1686:(e,t,i)=>{function n(e){return"object"==typeof e&&e.bindKey&&e.bindKey.position||(e.isDefault?-100:0)}var s=i(3679),r=i(6483),o=s.KEY_MODS
class a{constructor(e,t){this.$init(e,t,!1)}$init(e,t,i){this.platform=t||(r.isMac?"mac":"win"),this.commands={},this.commandKeyBinding={},this.addCommands(e),this.$singleCommand=i}addCommand(e){this.commands[e.name]&&this.removeCommand(e),this.commands[e.name]=e,e.bindKey&&this._buildKeyHash(e)}removeCommand(e,t){var i=e&&("string"==typeof e?e:e.name)
e=this.commands[i],t||delete this.commands[i]
var n=this.commandKeyBinding
for(var s in n){var r=n[s]
if(r==e)delete n[s]
else if(Array.isArray(r)){var o=r.indexOf(e);-1!=o&&(r.splice(o,1),1==r.length&&(n[s]=r[0]))}}}bindKey(e,t,i){if("object"==typeof e&&e&&(null==i&&(i=e.position),e=e[this.platform]),e)return"function"==typeof t?this.addCommand({exec:t,bindKey:e,name:t.name||e}):void e.split("|").forEach((function(e){var n=""
if(-1!=e.indexOf(" ")){var s=e.split(/\s+/)
e=s.pop(),s.forEach((function(e){var t=this.parseKeys(e),i=o[t.hashId]+t.key
n+=(n?" ":"")+i,this._addCommandToBinding(n,"chainKeys")}),this),n+=" "}var r=this.parseKeys(e),a=o[r.hashId]+r.key
this._addCommandToBinding(n+a,t,i)}),this)}_addCommandToBinding(e,t,i){var s,r=this.commandKeyBinding
if(t)if(!r[e]||this.$singleCommand)r[e]=t
else{Array.isArray(r[e])?-1!=(s=r[e].indexOf(t))&&r[e].splice(s,1):r[e]=[r[e]],"number"!=typeof i&&(i=n(t))
var o=r[e]
for(s=0;s<o.length&&!(n(o[s])>i);s++);o.splice(s,0,t)}else delete r[e]}addCommands(e){e&&Object.keys(e).forEach((function(t){var i=e[t]
if(i){if("string"==typeof i)return this.bindKey(i,t)
"function"==typeof i&&(i={exec:i}),"object"==typeof i&&(i.name||(i.name=t),this.addCommand(i))}}),this)}removeCommands(e){Object.keys(e).forEach((function(t){this.removeCommand(e[t])}),this)}bindKeys(e){Object.keys(e).forEach((function(t){this.bindKey(t,e[t])}),this)}_buildKeyHash(e){this.bindKey(e.bindKey,e)}parseKeys(e){var t=e.toLowerCase().split(/[\-\+]([\-\+])?/).filter((function(e){return e})),i=t.pop(),n=s[i]
if(s.FUNCTION_KEYS[n])i=s.FUNCTION_KEYS[n].toLowerCase()
else{if(!t.length)return{key:i,hashId:-1}
if(1==t.length&&"shift"==t[0])return{key:i.toUpperCase(),hashId:-1}}for(var r=0,o=t.length;o--;){var a=s.KEY_MODS[t[o]]
if(null==a)return!1
r|=a}return{key:i,hashId:r}}findKeyCommand(e,t){var i=o[e]+t
return this.commandKeyBinding[i]}handleKeyboard(e,t,i,n){if(!(n<0)){var s=o[t]+i,r=this.commandKeyBinding[s]
return e.$keyChain&&(e.$keyChain+=" "+s,r=this.commandKeyBinding[e.$keyChain]||r),!r||"chainKeys"!=r&&"chainKeys"!=r[r.length-1]?(e.$keyChain&&(t&&4!=t||1!=i.length?(-1==t||n>0)&&(e.$keyChain=""):e.$keyChain=e.$keyChain.slice(0,-s.length-1)),{command:r}):(e.$keyChain=e.$keyChain||s,{command:"null"})}}getStatusText(e,t){return t.$keyChain||""}}class l extends a{constructor(e,t){super(e,t),this.$singleCommand=!0}}l.call=function(e,t,i){a.prototype.$init.call(e,t,i,!0)},a.call=function(e,t,i){a.prototype.$init.call(e,t,i,!1)},t.HashHandler=l,t.MultiHashHandler=a},4369:(e,t,i)=>{var n=i(3679),s=i(2507)
t.$=class{constructor(e){this.$editor=e,this.$data={editor:e},this.$handlers=[],this.setDefaultHandler(e.commands)}setDefaultHandler(e){this.removeKeyboardHandler(this.$defaultHandler),this.$defaultHandler=e,this.addKeyboardHandler(e,0)}setKeyboardHandler(e){var t=this.$handlers
if(t[t.length-1]!=e){for(;t[t.length-1]&&t[t.length-1]!=this.$defaultHandler;)this.removeKeyboardHandler(t[t.length-1])
this.addKeyboardHandler(e,1)}}addKeyboardHandler(e,t){if(e){"function"!=typeof e||e.handleKeyboard||(e.handleKeyboard=e)
var i=this.$handlers.indexOf(e);-1!=i&&this.$handlers.splice(i,1),null==t?this.$handlers.push(e):this.$handlers.splice(t,0,e),-1==i&&e.attach&&e.attach(this.$editor)}}removeKeyboardHandler(e){var t=this.$handlers.indexOf(e)
return-1!=t&&(this.$handlers.splice(t,1),e.detach&&e.detach(this.$editor),!0)}getKeyboardHandler(){return this.$handlers[this.$handlers.length-1]}getStatusText(){var e=this.$data,t=e.editor
return this.$handlers.map((function(i){return i.getStatusText&&i.getStatusText(t,e)||""})).filter(Boolean).join(" ")}$callKeyboardHandlers(e,t,i,n){for(var r,o=!1,a=this.$editor.commands,l=this.$handlers.length;l--&&!((r=this.$handlers[l].handleKeyboard(this.$data,e,t,i,n))&&r.command&&((o="null"==r.command||a.exec(r.command,this.$editor,r.args,n))&&n&&-1!=e&&1!=r.passEvent&&1!=r.command.passEvent&&s.stopEvent(n),o)););return o||-1!=e||(r={command:"insertstring"},o=a.exec("insertstring",this.$editor,t)),o&&this.$editor._signal&&this.$editor._signal("keyboardActivity",r),o}onCommandKey(e,t,i){var s=n.keyCodeToString(i)
return this.$callKeyboardHandlers(t,s,i,e)}onTextInput(e){return this.$callKeyboardHandlers(-1,e)}}},8004:(e,t,i)=>{var n,s=i(2507),r=i(5133).nls,o=i(6483),a=i(215),l=i(3927),h=i(2317),c=o.isChrome<18,u=o.isIE,d=o.isChrome>63,g=400,p=i(3679),m=p.KEY_MODS,f=o.isIOS,v=f?/\s/:/\n/,w=o.isMobile
n=function(e,t){function i(){A=!0,y.blur(),y.focus(),A=!1}function n(){clearTimeout(G),G=setTimeout((function(){k&&(y.style.cssText=k,k=""),t.renderer.$isMousePressed=!1,t.renderer.$keepTextAreaAtCursor&&t.renderer.$moveTextAreaToCursor()}),0)}var y=a.createElement("textarea")
y.className="ace_text-input",y.setAttribute("wrap","off"),y.setAttribute("autocorrect","off"),y.setAttribute("autocapitalize","off"),y.setAttribute("spellcheck","false"),y.style.opacity="0",e.insertBefore(y,e.firstChild)
var x=!1,b=!1,C=!1,S=!1,k=""
w||(y.style.fontSize="1px")
var $=!1,A=!1,M="",L=0,T=0,E=0,I=Number.MAX_SAFE_INTEGER,R=Number.MIN_SAFE_INTEGER,_=0
try{var N=document.activeElement===y}catch(e){}this.setNumberOfExtraLines=function(e){I=Number.MAX_SAFE_INTEGER,R=Number.MIN_SAFE_INTEGER,_=e<0?0:e},this.setAriaOptions=function(e){if(e.activeDescendant?(y.setAttribute("aria-haspopup","true"),y.setAttribute("aria-autocomplete",e.inline?"both":"list"),y.setAttribute("aria-activedescendant",e.activeDescendant)):(y.setAttribute("aria-haspopup","false"),y.setAttribute("aria-autocomplete","both"),y.removeAttribute("aria-activedescendant")),e.role&&y.setAttribute("role",e.role),e.setLabel){y.setAttribute("aria-roledescription",r("text-input.aria-roledescription","editor"))
var i=""
if(t.$textInputAriaLabel&&(i+=t.$textInputAriaLabel+", "),t.session){var n=t.session.selection.cursor.row
i+=r("text-input.aria-label","Cursor at row $0",[n+1])}y.setAttribute("aria-label",i)}},this.setAriaOptions({role:"textbox"}),s.addListener(y,"blur",(function(e){A||(t.onBlur(e),N=!1)}),t),s.addListener(y,"focus",(function(e){if(!A){if(N=!0,o.isEdge)try{if(!document.hasFocus())return}catch(e){}t.onFocus(e),o.isEdge?setTimeout(O):O()}}),t),this.$focusScroll=!1,this.focus=function(){if(this.setAriaOptions({setLabel:t.renderer.enableKeyboardAccessibility}),k||d||"browser"==this.$focusScroll)return y.focus({preventScroll:!0})
var e=y.style.top
y.style.position="fixed",y.style.top="0px"
try{var i=0!=y.getBoundingClientRect().top}catch(e){return}var n=[]
if(i)for(var s=y.parentElement;s&&1==s.nodeType;)n.push(s),s.setAttribute("ace_nocontext","true"),s=!s.parentElement&&s.getRootNode?s.getRootNode().host:s.parentElement
y.focus({preventScroll:!0}),i&&n.forEach((function(e){e.removeAttribute("ace_nocontext")})),setTimeout((function(){y.style.position="","0px"==y.style.top&&(y.style.top=e)}),0)},this.blur=function(){y.blur()},this.isFocused=function(){return N},t.on("beforeEndOperation",(function(){var e=t.curOp,i=e&&e.command&&e.command.name
if("insertstring"!=i){var n=i&&(e.docChanged||e.selectionChanged)
C&&n&&(M=y.value="",Y()),O()}}))
var D=function(e,i){for(var n=i,s=1;s<=e-I&&s<2*_+1;s++)n+=t.session.getLine(e-s).length+1
return n},O=f?function(e){if(N&&(!x||e)&&!S){e||(e="")
var i="\n ab"+e+"cde fg\n"
i!=y.value&&(y.value=M=i)
var n=4+(e.length||(t.selection.isEmpty()?0:1))
4==L&&T==n||y.setSelectionRange(4,n),L=4,T=n}}:function(){if(!C&&!S&&(N||P)){C=!0
var e=0,i=0,n=""
if(t.session){var s=t.selection,r=s.getRange(),o=s.cursor.row
o===R+1?R=(I=R+1)+2*_:o===I-1?I=(R=I-1)-2*_:(o<I-1||o>R+1)&&(I=o>_?o-_:0,R=o>_?o+_:2*_)
for(var a=[],l=I;l<=R;l++)a.push(t.session.getLine(l))
if(n=a.join("\n"),e=D(r.start.row,r.start.column),i=D(r.end.row,r.end.column),r.start.row<I){var h=t.session.getLine(I-1)
e=r.start.row<I-1?0:e,i+=h.length+1,n=h+"\n"+n}else if(r.end.row>R){var c=t.session.getLine(R+1)
i=r.end.row>R+1?c.length:r.end.column,i+=n.length+1,n=n+"\n"+c}else w&&o>0&&(n="\n"+n,i+=1,e+=1)
n.length>g&&(e<g&&i<g?n=n.slice(0,g):(n="\n",e==i?e=i=0:(e=0,i=1)))
var u=n+"\n\n"
u!=M&&(y.value=M=u,L=T=u.length)}if(P&&(L=y.selectionStart,T=y.selectionEnd),T!=i||L!=e||y.selectionEnd!=T)try{y.setSelectionRange(e,i),L=e,T=i}catch(e){}C=!1}}
this.resetSelection=O,N&&t.onFocus()
var F=null
this.setInputHandler=function(e){F=e},this.getInputHandler=function(){return F}
var P=!1,W=function(e,i){if(P&&(P=!1),b)return O(),e&&t.onPaste(e),b=!1,""
for(var n=y.selectionStart,s=y.selectionEnd,r=L,a=M.length-T,l=e,h=e.length-n,c=e.length-s,u=0;r>0&&M[u]==e[u];)u++,r--
for(l=l.slice(u),u=1;a>0&&M.length-u>L-1&&M[M.length-u]==e[e.length-u];)u++,a--
h-=u-1,c-=u-1
var d=l.length-u+1
if(d<0&&(r=-d,d=0),l=l.slice(0,d),!(i||l||h||r||a||c))return""
S=!0
var g=!1
return o.isAndroid&&". "==l&&(l="  ",g=!0),l&&!r&&!a&&!h&&!c||$?t.onTextInput(l):t.onTextInput(l,{extendLeft:r,extendRight:a,restoreStart:h,restoreEnd:c}),S=!1,M=e,L=n,T=s,E=c,g?"\n":l},B=function(e){if(C)return K()
if(e&&e.inputType){if("historyUndo"==e.inputType)return t.execCommand("undo")
if("historyRedo"==e.inputType)return t.execCommand("redo")}var i=y.value,n=W(i,!0);(i.length>500||v.test(n)||w&&L<1&&L==T)&&O()},z=function(e,t,i){var n=e.clipboardData||window.clipboardData
if(n&&!c){var s=u||i?"Text":"text/plain"
try{return t?!1!==n.setData(s,t):n.getData(s)}catch(e){if(!i)return z(e,t,!0)}}},H=function(e,i){var n=t.getCopyText()
if(!n)return s.preventDefault(e)
z(e,n)?(f&&(O(n),x=n,setTimeout((function(){x=!1}),10)),i?t.onCut():t.onCopy(),s.preventDefault(e)):(x=!0,y.value=n,y.select(),setTimeout((function(){x=!1,O(),i?t.onCut():t.onCopy()})))},V=function(e){H(e,!0)},j=function(e){H(e,!1)},U=function(e){var i=z(e)
h.pasteCancelled()||("string"==typeof i?(i&&t.onPaste(i,e),o.isIE&&setTimeout(O),s.preventDefault(e)):(y.value="",b=!0))}
s.addCommandKeyListener(y,(function(e,i,n){if(!C)return t.onCommandKey(e,i,n)}),t),s.addListener(y,"select",(function(){C||(x?x=!1:function(e){return 0===e.selectionStart&&e.selectionEnd>=M.length&&e.value===M&&M&&e.selectionEnd!==T}(y)?(t.selectAll(),O()):w&&y.selectionStart!=L&&O())}),t),s.addListener(y,"input",B,t),s.addListener(y,"cut",V,t),s.addListener(y,"copy",j,t),s.addListener(y,"paste",U,t),"oncut"in y&&"oncopy"in y&&"onpaste"in y||s.addListener(e,"keydown",(function(e){if((!o.isMac||e.metaKey)&&e.ctrlKey)switch(e.keyCode){case 67:j(e)
break
case 86:U(e)
break
case 88:V(e)}}),t)
var G,K=function(){if(C&&t.onCompositionUpdate&&!t.$readOnly){if($)return i()
if(C.useTextareaForIME)t.onCompositionUpdate(y.value)
else{var e=y.value
W(e),C.markerRange&&(C.context&&(C.markerRange.start.column=C.selectionStart=C.context.compositionStartOffset),C.markerRange.end.column=C.markerRange.start.column+T-C.selectionStart+E)}}},Y=function(e){t.onCompositionEnd&&!t.$readOnly&&(C=!1,t.onCompositionEnd(),t.off("mousedown",i),e&&B())},Q=l.delayedCall(K,50).schedule.bind(null,null)
s.addListener(y,"compositionstart",(function(e){if(!C&&t.onCompositionStart&&!t.$readOnly&&(C={},!$)){e.data&&(C.useTextareaForIME=!1),setTimeout(K,0),t._signal("compositionStart"),t.on("mousedown",i)
var n=t.getSelectionRange()
n.end.row=n.start.row,n.end.column=n.start.column,C.markerRange=n,C.selectionStart=L,t.onCompositionStart(C),C.useTextareaForIME?(M=y.value="",L=0,T=0):(y.msGetInputContext&&(C.context=y.msGetInputContext()),y.getInputContext&&(C.context=y.getInputContext()))}}),t),s.addListener(y,"compositionupdate",K,t),s.addListener(y,"keyup",(function(e){27==e.keyCode&&y.value.length<y.selectionStart&&(C||(M=y.value),L=T=-1,O()),Q()}),t),s.addListener(y,"keydown",Q,t),s.addListener(y,"compositionend",Y,t),this.getElement=function(){return y},this.setCommandMode=function(e){$=e,y.readOnly=!1},this.setReadOnly=function(e){$||(y.readOnly=e)},this.setCopyWithEmptySelection=function(){},this.onContextMenu=function(e){P=!0,O(),t._emit("nativecontextmenu",{target:t,domEvent:e}),this.moveToMouse(e,!0)},this.moveToMouse=function(e,i){k||(k=y.style.cssText),y.style.cssText=(i?"z-index:100000;":"")+(o.isIE?"opacity:0.1;":"")+"text-indent: -"+(L+T)*t.renderer.characterWidth*.5+"px;"
var r=t.container.getBoundingClientRect(),l=a.computedStyle(t.container),h=r.top+(parseInt(l.borderTopWidth)||0),c=r.left+(parseInt(r.borderLeftWidth)||0),u=r.bottom-h-y.clientHeight-2,d=function(e){a.translate(y,e.clientX-c-2,Math.min(e.clientY-h-2,u))}
d(e),"mousedown"==e.type&&(t.renderer.$isMousePressed=!0,clearTimeout(G),o.isWin&&s.capture(t.container,d,n))},this.onContextMenuClose=n
var Z=function(e){t.textInput.onContextMenu(e),n()}
s.addListener(y,"mouseup",Z,t),s.addListener(y,"mousedown",(function(e){e.preventDefault(),n()}),t),s.addListener(t.renderer.scroller,"contextmenu",Z,t),s.addListener(y,"contextmenu",Z,t),f&&function(e,t,i){var n=null,s=!1
i.addEventListener("keydown",(function(){n&&clearTimeout(n),s=!0}),!0),i.addEventListener("keyup",(function(){n=setTimeout((function(){s=!1}),100)}),!0)
var r=function(){if(document.activeElement===i&&!(s||C||t.$mouseHandler.isMousePressed||x)){var e=i.selectionStart,n=i.selectionEnd,r=null,o=0
if(0==e?r=p.up:1==e?r=p.home:n>T&&"\n"==M[n]?r=p.end:e<L&&" "==M[e-1]?(r=p.left,o=m.option):e<L||e==L&&T!=L&&e==n?r=p.left:n>T&&M.slice(0,n).split("\n").length>2?r=p.down:n>T&&" "==M[n-1]?(r=p.right,o=m.option):(n>T||n==T&&T!=L&&e==n)&&(r=p.right),e!==n&&(o|=m.shift),r){if(!t.onCommandKey({},o,r)&&t.commands){r=p.keyCodeToString(r)
var a=t.commands.findKeyCommand(o,r)
a&&t.execCommand(a)}L=e,T=n,O("")}}}
document.addEventListener("selectionchange",r),t.on("destroy",(function(){document.removeEventListener("selectionchange",r)}))}(0,t,y),this.destroy=function(){y.parentElement&&y.parentElement.removeChild(y)}},t.k=n},3655:(e,t,i)=>{var n=i(215)
class s{constructor(e){this.element=n.createElement("div"),this.element.className="ace_layer ace_cursor-layer",e.appendChild(this.element),this.isVisible=!1,this.isBlinking=!0,this.blinkInterval=1e3,this.smoothBlinking=!1,this.cursors=[],this.cursor=this.addCursor(),n.addCssClass(this.element,"ace_hidden-cursors"),this.$updateCursors=this.$updateOpacity.bind(this)}$updateOpacity(e){for(var t=this.cursors,i=t.length;i--;)n.setStyle(t[i].style,"opacity",e?"":"0")}$startCssAnimation(){for(var e=this.cursors,t=e.length;t--;)e[t].style.animationDuration=this.blinkInterval+"ms"
this.$isAnimating=!0,setTimeout(function(){this.$isAnimating&&n.addCssClass(this.element,"ace_animate-blinking")}.bind(this))}$stopCssAnimation(){this.$isAnimating=!1,n.removeCssClass(this.element,"ace_animate-blinking")}setPadding(e){this.$padding=e}setSession(e){this.session=e}setBlinking(e){e!=this.isBlinking&&(this.isBlinking=e,this.restartTimer())}setBlinkInterval(e){e!=this.blinkInterval&&(this.blinkInterval=e,this.restartTimer())}setSmoothBlinking(e){e!=this.smoothBlinking&&(this.smoothBlinking=e,n.setCssClass(this.element,"ace_smooth-blinking",e),this.$updateCursors(!0),this.restartTimer())}addCursor(){var e=n.createElement("div")
return e.className="ace_cursor",this.element.appendChild(e),this.cursors.push(e),e}removeCursor(){if(this.cursors.length>1){var e=this.cursors.pop()
return e.parentNode.removeChild(e),e}}hideCursor(){this.isVisible=!1,n.addCssClass(this.element,"ace_hidden-cursors"),this.restartTimer()}showCursor(){this.isVisible=!0,n.removeCssClass(this.element,"ace_hidden-cursors"),this.restartTimer()}restartTimer(){var e=this.$updateCursors
if(clearInterval(this.intervalId),clearTimeout(this.timeoutId),this.$stopCssAnimation(),this.smoothBlinking&&(this.$isSmoothBlinking=!1,n.removeCssClass(this.element,"ace_smooth-blinking")),e(!0),this.isBlinking&&this.blinkInterval&&this.isVisible)if(this.smoothBlinking&&(this.$isSmoothBlinking=!0,setTimeout(function(){this.$isSmoothBlinking&&n.addCssClass(this.element,"ace_smooth-blinking")}.bind(this))),n.HAS_CSS_ANIMATION)this.$startCssAnimation()
else{var t=function(){this.timeoutId=setTimeout((function(){e(!1)}),.6*this.blinkInterval)}.bind(this)
this.intervalId=setInterval((function(){e(!0),t()}),this.blinkInterval),t()}else this.$stopCssAnimation()}getPixelPosition(e,t){if(!this.config||!this.session)return{left:0,top:0}
e||(e=this.session.selection.getCursor())
var i=this.session.documentToScreenPosition(e)
return{left:this.$padding+(this.session.$bidiHandler.isBidiRow(i.row,e.row)?this.session.$bidiHandler.getPosLeft(i.column):i.column*this.config.characterWidth),top:(i.row-(t?this.config.firstRowScreen:0))*this.config.lineHeight}}isCursorInView(e,t){return e.top>=0&&e.top<t.maxHeight}update(e){this.config=e
var t=this.session.$selectionMarkers,i=0,s=0
void 0!==t&&0!==t.length||(t=[{cursor:null}]),i=0
for(var r=t.length;i<r;i++){var o=this.getPixelPosition(t[i].cursor,!0)
if(!((o.top>e.height+e.offset||o.top<0)&&i>1)){var a=this.cursors[s++]||this.addCursor(),l=a.style
this.drawCursor?this.drawCursor(a,o,e,t[i],this.session):this.isCursorInView(o,e)?(n.setStyle(l,"display","block"),n.translate(a,o.left,o.top),n.setStyle(l,"width",Math.round(e.characterWidth)+"px"),n.setStyle(l,"height",e.lineHeight+"px")):n.setStyle(l,"display","none")}}for(;this.cursors.length>s;)this.removeCursor()
var h=this.session.getOverwrite()
this.$setOverwrite(h),this.$pixelPos=o,this.restartTimer()}$setOverwrite(e){e!=this.overwrite&&(this.overwrite=e,e?n.addCssClass(this.element,"ace_overwrite-cursors"):n.removeCssClass(this.element,"ace_overwrite-cursors"))}destroy(){clearInterval(this.intervalId),clearTimeout(this.timeoutId)}}s.prototype.$padding=0,s.prototype.drawCursor=null,t.b=s},4227:(e,t,i)=>{var n=i(215),s=i(8297),r=i(8770).b
class o{constructor(e,t){this.canvas=n.createElement("canvas"),this.renderer=t,this.pixelRatio=1,this.maxHeight=t.layerConfig.maxHeight,this.lineHeight=t.layerConfig.lineHeight,this.canvasHeight=e.parent.scrollHeight,this.heightRatio=this.canvasHeight/this.maxHeight,this.canvasWidth=e.width,this.minDecorationHeight=2*this.pixelRatio|0,this.halfMinDecorationHeight=this.minDecorationHeight/2|0,this.canvas.width=this.canvasWidth,this.canvas.height=this.canvasHeight,this.canvas.style.top="0px",this.canvas.style.right="0px",this.canvas.style.zIndex="7px",this.canvas.style.position="absolute",this.colors={},this.colors.dark={error:"rgba(255, 18, 18, 1)",warning:"rgba(18, 136, 18, 1)",info:"rgba(18, 18, 136, 1)"},this.colors.light={error:"rgb(255,51,51)",warning:"rgb(32,133,72)",info:"rgb(35,68,138)"},e.element.appendChild(this.canvas)}$updateDecorators(e){var t=!0===this.renderer.theme.isDark?this.colors.dark:this.colors.light
e&&(this.maxHeight=e.maxHeight,this.lineHeight=e.lineHeight,this.canvasHeight=e.height,(e.lastRow+1)*this.lineHeight<this.canvasHeight?this.heightRatio=1:this.heightRatio=this.canvasHeight/this.maxHeight)
var i=this.canvas.getContext("2d"),n=this.renderer.session.$annotations
if(i.clearRect(0,0,this.canvas.width,this.canvas.height),n){var s={info:1,warning:2,error:3}
n.forEach((function(e){e.priority=s[e.type]||null})),n=n.sort((function(e,t){return e.priority<t.priority?-1:e.priority>t.priority?1:0}))
var r=this.renderer.session.$foldData
for(let e=0;e<n.length;e++){let s=n[e].row,o=this.compensateFoldRows(s,r),a=Math.round((s-o)*this.lineHeight*this.heightRatio),l=Math.round((s-o)*this.lineHeight*this.heightRatio),h=Math.round(((s-o)*this.lineHeight+this.lineHeight)*this.heightRatio)
if(h-l<this.minDecorationHeight){let e=(l+h)/2|0
e<this.halfMinDecorationHeight?e=this.halfMinDecorationHeight:e+this.halfMinDecorationHeight>this.canvasHeight&&(e=this.canvasHeight-this.halfMinDecorationHeight),l=Math.round(e-this.halfMinDecorationHeight),h=Math.round(e+this.halfMinDecorationHeight)}i.fillStyle=t[n[e].type]||null,i.fillRect(0,a,this.canvasWidth,h-l)}}var o=this.renderer.session.selection.getCursor()
if(o){let e=this.compensateFoldRows(o.row,r),t=Math.round((o.row-e)*this.lineHeight*this.heightRatio)
i.fillStyle="rgba(0, 0, 0, 0.5)",i.fillRect(0,t,this.canvasWidth,2)}}compensateFoldRows(e,t){let i=0
if(t&&t.length>0)for(let n=0;n<t.length;n++)e>t[n].start.row&&e<t[n].end.row?i+=e-t[n].start.row:e>=t[n].end.row&&(i+=t[n].end.row-t[n].start.row)
return i}}s.implement(o.prototype,r),t.K=o},5722:(e,t,i)=>{var n=i(8297),s=i(215),r=i(3927),o=i(2507),a=i(6483),l=i(8770).b,h=512,c="function"==typeof ResizeObserver,u=200
class d{constructor(e){this.el=s.createElement("div"),this.$setMeasureNodeStyles(this.el.style,!0),this.$main=s.createElement("div"),this.$setMeasureNodeStyles(this.$main.style),this.$measureNode=s.createElement("div"),this.$setMeasureNodeStyles(this.$measureNode.style),this.el.appendChild(this.$main),this.el.appendChild(this.$measureNode),e.appendChild(this.el),this.$measureNode.textContent=r.stringRepeat("X",h),this.$characterSize={width:0,height:0},c?this.$addObserver():this.checkForSizeChanges()}$setMeasureNodeStyles(e,t){e.width=e.height="auto",e.left=e.top="0px",e.visibility="hidden",e.position="absolute",e.whiteSpace="pre",a.isIE<8?e["font-family"]="inherit":e.font="inherit",e.overflow=t?"hidden":"visible"}checkForSizeChanges(e){if(void 0===e&&(e=this.$measureSizes()),e&&(this.$characterSize.width!==e.width||this.$characterSize.height!==e.height)){this.$measureNode.style.fontWeight="bold"
var t=this.$measureSizes()
this.$measureNode.style.fontWeight="",this.$characterSize=e,this.charSizes=Object.create(null),this.allowBoldFonts=t&&t.width===e.width&&t.height===e.height,this._emit("changeCharacterSize",{data:e})}}$addObserver(){var e=this
this.$observer=new window.ResizeObserver((function(){e.checkForSizeChanges()})),this.$observer.observe(this.$measureNode)}$pollSizeChanges(){if(this.$pollSizeChangesTimer||this.$observer)return this.$pollSizeChangesTimer
var e=this
return this.$pollSizeChangesTimer=o.onIdle((function t(){e.checkForSizeChanges(),o.onIdle(t,500)}),500)}setPolling(e){e?this.$pollSizeChanges():this.$pollSizeChangesTimer&&(clearInterval(this.$pollSizeChangesTimer),this.$pollSizeChangesTimer=0)}$measureSizes(e){var t={height:(e||this.$measureNode).clientHeight,width:(e||this.$measureNode).clientWidth/h}
return 0===t.width||0===t.height?null:t}$measureCharWidth(e){return this.$main.textContent=r.stringRepeat(e,h),this.$main.getBoundingClientRect().width/h}getCharacterWidth(e){var t=this.charSizes[e]
return void 0===t&&(t=this.charSizes[e]=this.$measureCharWidth(e)/this.$characterSize.width),t}destroy(){clearInterval(this.$pollSizeChangesTimer),this.$observer&&this.$observer.disconnect(),this.el&&this.el.parentNode&&this.el.parentNode.removeChild(this.el)}$getZoom(e){return e&&e.parentElement?(Number(window.getComputedStyle(e).zoom)||1)*this.$getZoom(e.parentElement):1}$initTransformMeasureNodes(){var e=function(e,t){return["div",{style:"position: absolute;top:"+e+"px;left:"+t+"px;"}]}
this.els=s.buildDom([e(0,0),e(u,0),e(0,u),e(u,u)],this.el)}transformCoordinates(e,t){function i(e,t,i){var n=e[1]*t[0]-e[0]*t[1]
return[(-t[1]*i[0]+t[0]*i[1])/n,(+e[1]*i[0]-e[0]*i[1])/n]}function n(e,t){return[e[0]-t[0],e[1]-t[1]]}function s(e,t){return[e[0]+t[0],e[1]+t[1]]}function r(e,t){return[e*t[0],e*t[1]]}function o(e){var t=e.getBoundingClientRect()
return[t.left,t.top]}e&&(e=r(1/this.$getZoom(this.el),e)),this.els||this.$initTransformMeasureNodes()
var a=o(this.els[0]),l=o(this.els[1]),h=o(this.els[2]),c=o(this.els[3]),d=i(n(c,l),n(c,h),n(s(l,h),s(c,a))),g=r(1+d[0],n(l,a)),p=r(1+d[1],n(h,a))
if(t){var m=t,f=d[0]*m[0]/u+d[1]*m[1]/u+1,v=s(r(m[0],g),r(m[1],p))
return s(r(1/f/u,v),a)}var w=n(e,a),y=i(n(g,r(d[0],w)),n(p,r(d[1],w)),w)
return r(u,y)}}d.prototype.$characterSize={width:0,height:0},n.implement(d.prototype,l),t.X=d},4226:(e,t,i)=>{function n(e){var t=document.createTextNode("")
e.appendChild(t)
var i=s.createElement("span")
e.appendChild(i)
var n=s.createElement("span")
e.appendChild(n)
var r=s.createElement("span")
return n.appendChild(r),e}var s=i(215),r=i(8297),o=i(3927),a=i(8770).b,l=i(3034).q,h=i(5133).nls
class c{constructor(e){this.element=s.createElement("div"),this.element.className="ace_layer ace_gutter-layer",e.appendChild(this.element),this.setShowFoldWidgets(this.$showFoldWidgets),this.gutterWidth=0,this.$annotations=[],this.$updateAnnotations=this.$updateAnnotations.bind(this),this.$lines=new l(this.element),this.$lines.$offsetCoefficient=1}setSession(e){this.session&&this.session.off("change",this.$updateAnnotations),this.session=e,e&&e.on("change",this.$updateAnnotations)}addGutterDecoration(e,t){window.console,this.session.addGutterDecoration(e,t)}removeGutterDecoration(e,t){window.console,this.session.removeGutterDecoration(e,t)}setAnnotations(e){this.$annotations=[]
for(var t=0;t<e.length;t++){var i=e[t],n=i.row,s=this.$annotations[n]
s||(s=this.$annotations[n]={text:[],type:[],displayText:[]})
var r=i.text,a=i.text,l=i.type
r=r?o.escapeHTML(r):i.html||"",a=a||i.html||"",-1===s.text.indexOf(r)&&(s.text.push(r),s.type.push(l),s.displayText.push(a))
var h=i.className
h?s.className=h:"error"===l?s.className=" ace_error":"security"!==l||/\bace_error\b/.test(s.className)?"warning"!==l||/\bace_(error|security)\b/.test(s.className)?"info"!==l||s.className?"hint"!==l||s.className||(s.className=" ace_hint"):s.className=" ace_info":s.className=" ace_warning":s.className=" ace_security"}}$updateAnnotations(e){if(this.$annotations.length){var t=e.start.row,i=e.end.row-t
if(0===i);else if("remove"==e.action)this.$annotations.splice(t,i+1,null)
else{var n=Array(i+1)
n.unshift(t,1),this.$annotations.splice.apply(this.$annotations,n)}}}update(e){this.config=e
var t=this.session,i=e.firstRow,s=Math.min(e.lastRow+e.gutterOffset,t.getLength()-1)
this.oldLastRow=s,this.config=e,this.$lines.moveContainer(e),this.$updateCursorRow()
for(var r=t.getNextFoldLine(i),o=r?r.start.row:1/0,a=null,l=-1,h=i;;){if(h>o&&(h=r.end.row+1,o=(r=t.getNextFoldLine(h,r))?r.start.row:1/0),h>s){for(;this.$lines.getLength()>l+1;)this.$lines.pop()
break}(a=this.$lines.get(++l))?a.row=h:(a=this.$lines.createCell(h,e,this.session,n),this.$lines.push(a)),this.$renderCell(a,e,r,h),h++}this._signal("afterRender"),this.$updateGutterWidth(e)}$updateGutterWidth(e){var t=this.session,i=t.gutterRenderer||this.$renderer,n=t.$firstLineNumber,s=this.$lines.last()?this.$lines.last().text:"";(this.$fixedWidth||t.$useWrapMode)&&(s=t.getLength()+n-1)
var r=i?i.getWidth(t,s,e):s.toString().length*e.characterWidth,o=this.$padding||this.$computePadding();(r+=o.left+o.right)===this.gutterWidth||isNaN(r)||(this.gutterWidth=r,this.element.parentNode.style.width=this.element.style.width=Math.ceil(this.gutterWidth)+"px",this._signal("changeGutterWidth",r))}$updateCursorRow(){if(this.$highlightGutterLine){var e=this.session.selection.getCursor()
this.$cursorRow!==e.row&&(this.$cursorRow=e.row)}}updateLineHighlight(){if(this.$highlightGutterLine){var e=this.session.selection.cursor.row
if(this.$cursorRow=e,!this.$cursorCell||this.$cursorCell.row!=e){this.$cursorCell&&(this.$cursorCell.element.className=this.$cursorCell.element.className.replace("ace_gutter-active-line ",""))
var t=this.$lines.cells
this.$cursorCell=null
for(var i=0;i<t.length;i++){var n=t[i]
if(n.row>=this.$cursorRow){if(n.row>this.$cursorRow){var s=this.session.getFoldLine(this.$cursorRow)
if(!(i>0&&s&&s.start.row==t[i-1].row))break
n=t[i-1]}n.element.className="ace_gutter-active-line "+n.element.className,this.$cursorCell=n
break}}}}}scrollLines(e){var t=this.config
if(this.config=e,this.$updateCursorRow(),this.$lines.pageChanged(t,e))return this.update(e)
this.$lines.moveContainer(e)
var i=Math.min(e.lastRow+e.gutterOffset,this.session.getLength()-1),n=this.oldLastRow
if(this.oldLastRow=i,!t||n<e.firstRow)return this.update(e)
if(i<t.firstRow)return this.update(e)
if(t.firstRow<e.firstRow)for(var s=this.session.getFoldedRowCount(t.firstRow,e.firstRow-1);s>0;s--)this.$lines.shift()
if(n>i)for(s=this.session.getFoldedRowCount(i+1,n);s>0;s--)this.$lines.pop()
e.firstRow<t.firstRow&&this.$lines.unshift(this.$renderLines(e,e.firstRow,t.firstRow-1)),i>n&&this.$lines.push(this.$renderLines(e,n+1,i)),this.updateLineHighlight(),this._signal("afterRender"),this.$updateGutterWidth(e)}$renderLines(e,t,i){for(var s=[],r=t,o=this.session.getNextFoldLine(r),a=o?o.start.row:1/0;r>a&&(r=o.end.row+1,a=(o=this.session.getNextFoldLine(r,o))?o.start.row:1/0),!(r>i);){var l=this.$lines.createCell(r,e,this.session,n)
this.$renderCell(l,e,o,r),s.push(l),r++}return s}$renderCell(e,t,i,n){var r=e.element,o=this.session,a=r.childNodes[0],l=r.childNodes[1],c=r.childNodes[2],u=c.firstChild,d=o.$firstLineNumber,g=o.$breakpoints,p=o.$decorations,m=o.gutterRenderer||this.$renderer,f=this.$showFoldWidgets&&o.foldWidgets,v=i?i.start.row:Number.MAX_VALUE,w=t.lineHeight+"px",y=this.$useSvgGutterIcons?"ace_gutter-cell_svg-icons ":"ace_gutter-cell ",x=this.$useSvgGutterIcons?"ace_icon_svg":"ace_icon",b=(m?m.getText(o,n):n+d).toString()
if(this.$highlightGutterLine&&(n==this.$cursorRow||i&&n<this.$cursorRow&&n>=v&&this.$cursorRow<=i.end.row)&&(y+="ace_gutter-active-line ",this.$cursorCell!=e&&(this.$cursorCell&&(this.$cursorCell.element.className=this.$cursorCell.element.className.replace("ace_gutter-active-line ","")),this.$cursorCell=e)),g[n]&&(y+=g[n]),p[n]&&(y+=p[n]),this.$annotations[n]&&n!==v&&(y+=this.$annotations[n].className),f){var C=f[n]
null==C&&(C=f[n]=o.getFoldWidget(n))}if(C){var S="ace_fold-widget ace_"+C,k="start"==C&&n==v&&n<i.end.row
if(k){S+=" ace_closed"
for(var $="",A=!1,M=n+1;M<=i.end.row;M++)if(this.$annotations[M]){if(" ace_error"===this.$annotations[M].className){A=!0,$=" ace_error_fold"
break}" ace_security"===this.$annotations[M].className?(A=!0,$=" ace_security_fold"):" ace_warning"===this.$annotations[M].className&&" ace_security_fold"!==$&&(A=!0,$=" ace_warning_fold")}y+=$}else S+=" ace_open"
l.className!=S&&(l.className=S),s.setStyle(l.style,"height",w),s.setStyle(l.style,"display","inline-block"),l.setAttribute("role","button"),l.setAttribute("tabindex","-1")
var L=o.getFoldWidgetRange(n)
L?l.setAttribute("aria-label",h("gutter.code-folding.range.aria-label","Toggle code folding, rows $0 through $1",[L.start.row+1,L.end.row+1])):i?l.setAttribute("aria-label",h("gutter.code-folding.closed.aria-label","Toggle code folding, rows $0 through $1",[i.start.row+1,i.end.row+1])):l.setAttribute("aria-label",h("gutter.code-folding.open.aria-label","Toggle code folding, row $0",[n+1])),k?(l.setAttribute("aria-expanded","false"),l.setAttribute("title",h("gutter.code-folding.closed.title","Unfold code"))):(l.setAttribute("aria-expanded","true"),l.setAttribute("title",h("gutter.code-folding.open.title","Fold code")))}else l&&(s.setStyle(l.style,"display","none"),l.setAttribute("tabindex","0"),l.removeAttribute("role"),l.removeAttribute("aria-label"))
if(A&&this.$showFoldedAnnotations){switch(c.className="ace_gutter_annotation",u.className=x,u.className+=$,s.setStyle(u.style,"height",w),s.setStyle(c.style,"display","block"),s.setStyle(c.style,"height",w),$){case" ace_error_fold":T=h("gutter.annotation.aria-label.error","Error, read annotations row $0",[b])
break
case" ace_security_fold":T=h("gutter.annotation.aria-label.security","Security finding, read annotations row $0",[b])
break
case" ace_warning_fold":T=h("gutter.annotation.aria-label.warning","Warning, read annotations row $0",[b])}c.setAttribute("aria-label",T),c.setAttribute("tabindex","-1"),c.setAttribute("role","button")}else if(this.$annotations[n]){var T
switch(c.className="ace_gutter_annotation",u.className=x,this.$useSvgGutterIcons?u.className+=this.$annotations[n].className:r.classList.add(this.$annotations[n].className.replace(" ","")),s.setStyle(u.style,"height",w),s.setStyle(c.style,"display","block"),s.setStyle(c.style,"height",w),this.$annotations[n].className){case" ace_error":T=h("gutter.annotation.aria-label.error","Error, read annotations row $0",[b])
break
case" ace_security":T=h("gutter.annotation.aria-label.security","Security finding, read annotations row $0",[b])
break
case" ace_warning":T=h("gutter.annotation.aria-label.warning","Warning, read annotations row $0",[b])
break
case" ace_info":T=h("gutter.annotation.aria-label.info","Info, read annotations row $0",[b])
break
case" ace_hint":T=h("gutter.annotation.aria-label.hint","Suggestion, read annotations row $0",[b])}c.setAttribute("aria-label",T),c.setAttribute("tabindex","-1"),c.setAttribute("role","button")}else s.setStyle(c.style,"display","none"),c.removeAttribute("aria-label"),c.removeAttribute("role"),c.setAttribute("tabindex","0")
return b!==a.data&&(a.data=b),r.className!=y&&(r.className=y),s.setStyle(e.element.style,"height",this.$lines.computeLineHeight(n,t,o)+"px"),s.setStyle(e.element.style,"top",this.$lines.computeLineTop(n,t,o)+"px"),e.text=b,"none"===c.style.display&&"none"===l.style.display?e.element.setAttribute("aria-hidden",!0):e.element.setAttribute("aria-hidden",!1),e}setHighlightGutterLine(e){this.$highlightGutterLine=e}setShowLineNumbers(e){this.$renderer=!e&&{getWidth:function(){return 0},getText:function(){return""}}}getShowLineNumbers(){return this.$showLineNumbers}setShowFoldWidgets(e){e?s.addCssClass(this.element,"ace_folding-enabled"):s.removeCssClass(this.element,"ace_folding-enabled"),this.$showFoldWidgets=e,this.$padding=null}getShowFoldWidgets(){return this.$showFoldWidgets}$computePadding(){if(!this.element.firstChild)return{left:0,right:0}
var e=s.computedStyle(this.element.firstChild)
return this.$padding={},this.$padding.left=(parseInt(e.borderLeftWidth)||0)+(parseInt(e.paddingLeft)||0)+1,this.$padding.right=(parseInt(e.borderRightWidth)||0)+(parseInt(e.paddingRight)||0),this.$padding}getRegion(e){var t=this.$padding||this.$computePadding(),i=this.element.getBoundingClientRect()
return e.x<t.left+i.left?"markers":this.$showFoldWidgets&&e.x>i.right-t.right?"foldWidgets":void 0}}c.prototype.$fixedWidth=!1,c.prototype.$highlightGutterLine=!0,c.prototype.$renderer="",c.prototype.$showLineNumbers=!0,c.prototype.$showFoldWidgets=!0,r.implement(c.prototype,a),t.W=c},3034:(e,t,i)=>{var n=i(215)
t.q=class{constructor(e,t){this.element=e,this.canvasHeight=t||5e5,this.element.style.height=2*this.canvasHeight+"px",this.cells=[],this.cellCache=[],this.$offsetCoefficient=0}moveContainer(e){n.translate(this.element,0,-e.firstRowScreen*e.lineHeight%this.canvasHeight-e.offset*this.$offsetCoefficient)}pageChanged(e,t){return Math.floor(e.firstRowScreen*e.lineHeight/this.canvasHeight)!==Math.floor(t.firstRowScreen*t.lineHeight/this.canvasHeight)}computeLineTop(e,t,i){var n=t.firstRowScreen*t.lineHeight,s=Math.floor(n/this.canvasHeight)
return i.documentToScreenRow(e,0)*t.lineHeight-s*this.canvasHeight}computeLineHeight(e,t,i){return t.lineHeight*i.getRowLineCount(e)}getLength(){return this.cells.length}get(e){return this.cells[e]}shift(){this.$cacheCell(this.cells.shift())}pop(){this.$cacheCell(this.cells.pop())}push(e){if(Array.isArray(e)){this.cells.push.apply(this.cells,e)
for(var t=n.createFragment(this.element),i=0;i<e.length;i++)t.appendChild(e[i].element)
this.element.appendChild(t)}else this.cells.push(e),this.element.appendChild(e.element)}unshift(e){if(Array.isArray(e)){this.cells.unshift.apply(this.cells,e)
for(var t=n.createFragment(this.element),i=0;i<e.length;i++)t.appendChild(e[i].element)
this.element.firstChild?this.element.insertBefore(t,this.element.firstChild):this.element.appendChild(t)}else this.cells.unshift(e),this.element.insertAdjacentElement("afterbegin",e.element)}last(){return this.cells.length?this.cells[this.cells.length-1]:null}$cacheCell(e){e&&(e.element.remove(),this.cellCache.push(e))}createCell(e,t,i,s){var r=this.cellCache.pop()
if(!r){var o=n.createElement("div")
s&&s(o),this.element.appendChild(o),r={element:o,text:"",row:e}}return r.row=e,r}}},3631:(e,t,i)=>{var n=i(4074).Q,s=i(215)
class r{constructor(e){this.element=s.createElement("div"),this.element.className="ace_layer ace_marker-layer",e.appendChild(this.element)}setPadding(e){this.$padding=e}setSession(e){this.session=e}setMarkers(e){this.markers=e}elt(e,t){var i=-1!=this.i&&this.element.childNodes[this.i]
i?this.i++:(i=document.createElement("div"),this.element.appendChild(i),this.i=-1),i.style.cssText=t,i.className=e}update(e){if(e){var t
for(var i in this.config=e,this.i=0,this.markers){var n=this.markers[i]
if(n.range){var s=n.range.clipRows(e.firstRow,e.lastRow)
if(!s.isEmpty())if(s=s.toScreenRange(this.session),n.renderer){var r=this.$getTop(s.start.row,e),o=this.$padding+s.start.column*e.characterWidth
n.renderer(t,s,o,r,e)}else"fullLine"==n.type?this.drawFullLineMarker(t,s,n.clazz,e):"screenLine"==n.type?this.drawScreenLineMarker(t,s,n.clazz,e):s.isMultiLine()?"text"==n.type?this.drawTextMarker(t,s,n.clazz,e):this.drawMultiLineMarker(t,s,n.clazz,e):this.drawSingleLineMarker(t,s,n.clazz+" ace_start ace_br15",e)}else n.update(t,this,this.session,e)}if(-1!=this.i)for(;this.i<this.element.childElementCount;)this.element.removeChild(this.element.lastChild)}}$getTop(e,t){return(e-t.firstRowScreen)*t.lineHeight}drawTextMarker(e,t,i,s,r){for(var o=this.session,a=t.start.row,l=t.end.row,h=a,c=0,u=0,d=o.getScreenLastRowColumn(h),g=new n(h,t.start.column,h,u);h<=l;h++)g.start.row=g.end.row=h,g.start.column=h==a?t.start.column:o.getRowWrapIndent(h),g.end.column=d,c=u,u=d,d=h+1<l?o.getScreenLastRowColumn(h+1):h==l?0:t.end.column,this.drawSingleLineMarker(e,g,i+(h==a?" ace_start":"")+" ace_br"+((h==a||h==a+1&&t.start.column?1:0)|(c<u?2:0)|(u>d?4:0)|(h==l?8:0)),s,h==l?0:1,r)}drawMultiLineMarker(e,t,i,n,s){var r=this.$padding,o=n.lineHeight,a=this.$getTop(t.start.row,n),l=r+t.start.column*n.characterWidth
if(s=s||"",this.session.$bidiHandler.isBidiRow(t.start.row)?((h=t.clone()).end.row=h.start.row,h.end.column=this.session.getLine(h.start.row).length,this.drawBidiSingleLineMarker(e,h,i+" ace_br1 ace_start",n,null,s)):this.elt(i+" ace_br1 ace_start","height:"+o+"px;right:"+r+"px;top:"+a+"px;left:"+l+"px;"+(s||"")),this.session.$bidiHandler.isBidiRow(t.end.row)){var h;(h=t.clone()).start.row=h.end.row,h.start.column=0,this.drawBidiSingleLineMarker(e,h,i+" ace_br12",n,null,s)}else{a=this.$getTop(t.end.row,n)
var c=t.end.column*n.characterWidth
this.elt(i+" ace_br12","height:"+o+"px;width:"+c+"px;top:"+a+"px;left:"+r+"px;"+(s||""))}if(!((o=(t.end.row-t.start.row-1)*n.lineHeight)<=0)){a=this.$getTop(t.start.row+1,n)
var u=(t.start.column?1:0)|(t.end.column?0:8)
this.elt(i+(u?" ace_br"+u:""),"height:"+o+"px;right:"+r+"px;top:"+a+"px;left:"+r+"px;"+(s||""))}}drawSingleLineMarker(e,t,i,n,s,r){if(this.session.$bidiHandler.isBidiRow(t.start.row))return this.drawBidiSingleLineMarker(e,t,i,n,s,r)
var o=n.lineHeight,a=(t.end.column+(s||0)-t.start.column)*n.characterWidth,l=this.$getTop(t.start.row,n),h=this.$padding+t.start.column*n.characterWidth
this.elt(i,"height:"+o+"px;width:"+a+"px;top:"+l+"px;left:"+h+"px;"+(r||""))}drawBidiSingleLineMarker(e,t,i,n,s,r){var o=n.lineHeight,a=this.$getTop(t.start.row,n),l=this.$padding
this.session.$bidiHandler.getSelections(t.start.column,t.end.column).forEach((function(e){this.elt(i,"height:"+o+"px;width:"+(e.width+(s||0))+"px;top:"+a+"px;left:"+(l+e.left)+"px;"+(r||""))}),this)}drawFullLineMarker(e,t,i,n,s){var r=this.$getTop(t.start.row,n),o=n.lineHeight
t.start.row!=t.end.row&&(o+=this.$getTop(t.end.row,n)-r),this.elt(i,"height:"+o+"px;top:"+r+"px;left:0;right:0;"+(s||""))}drawScreenLineMarker(e,t,i,n,s){var r=this.$getTop(t.start.row,n),o=n.lineHeight
this.elt(i,"height:"+o+"px;top:"+r+"px;left:0;right:0;"+(s||""))}}r.prototype.$padding=0,t.p=r},3698:(e,t,i)=>{var n=i(8297),s=i(215),r=i(3927),o=i(3034).q,a=i(8770).b,l=i(5133).nls
const h=i(2185).t
class c{constructor(e){this.dom=s,this.element=this.dom.createElement("div"),this.element.className="ace_layer ace_text-layer",e.appendChild(this.element),this.$updateEolChar=this.$updateEolChar.bind(this),this.$lines=new o(this.element)}$updateEolChar(){var e=this.session.doc,t="\n"==e.getNewLineCharacter()&&"windows"!=e.getNewLineMode()?this.EOL_CHAR_LF:this.EOL_CHAR_CRLF
if(this.EOL_CHAR!=t)return this.EOL_CHAR=t,!0}setPadding(e){this.$padding=e,this.element.style.margin="0 "+e+"px"}getLineHeight(){return this.$fontMetrics.$characterSize.height||0}getCharacterWidth(){return this.$fontMetrics.$characterSize.width||0}$setFontMetrics(e){this.$fontMetrics=e,this.$fontMetrics.on("changeCharacterSize",function(e){this._signal("changeCharacterSize",e)}.bind(this)),this.$pollSizeChanges()}checkForSizeChanges(){this.$fontMetrics.checkForSizeChanges()}$pollSizeChanges(){return this.$pollSizeChangesTimer=this.$fontMetrics.$pollSizeChanges()}setSession(e){this.session=e,e&&this.$computeTabString()}setShowInvisibles(e){return this.showInvisibles!=e&&(this.showInvisibles=e,"string"==typeof e?(this.showSpaces=/tab/i.test(e),this.showTabs=/space/i.test(e),this.showEOL=/eol/i.test(e)):this.showSpaces=this.showTabs=this.showEOL=e,this.$computeTabString(),!0)}setDisplayIndentGuides(e){return this.displayIndentGuides!=e&&(this.displayIndentGuides=e,this.$computeTabString(),!0)}setHighlightIndentGuides(e){return this.$highlightIndentGuides!==e&&(this.$highlightIndentGuides=e,e)}$computeTabString(){var e=this.session.getTabSize()
this.tabSize=e
for(var t=this.$tabStrings=[0],i=1;i<e+1;i++)this.showTabs?((n=this.dom.createElement("span")).className="ace_invisible ace_invisible_tab",n.textContent=r.stringRepeat(this.TAB_CHAR,i),t.push(n)):t.push(this.dom.createTextNode(r.stringRepeat(" ",i),this.element))
if(this.displayIndentGuides){this.$indentGuideRe=/\s\S| \t|\t |\s$/
var n,s="ace_indent-guide",o=this.showSpaces?" ace_invisible ace_invisible_space":"",a=this.showSpaces?r.stringRepeat(this.SPACE_CHAR,this.tabSize):r.stringRepeat(" ",this.tabSize),l=this.showTabs?" ace_invisible ace_invisible_tab":"",h=this.showTabs?r.stringRepeat(this.TAB_CHAR,this.tabSize):a;(n=this.dom.createElement("span")).className=s+o,n.textContent=a,this.$tabStrings[" "]=n,(n=this.dom.createElement("span")).className=s+l,n.textContent=h,this.$tabStrings["\t"]=n}}updateLines(e,t,i){if(this.config.lastRow!=e.lastRow||this.config.firstRow!=e.firstRow)return this.update(e)
this.config=e
for(var n=Math.max(t,e.firstRow),s=Math.min(i,e.lastRow),r=this.element.childNodes,o=0,a=e.firstRow;a<n;a++){if(l=this.session.getFoldLine(a)){if(l.containsRow(n)){n=l.start.row
break}a=l.end.row}o++}for(var l,h=!1,c=(a=n,(l=this.session.getNextFoldLine(a))?l.start.row:1/0);a>c&&(a=l.end.row+1,c=(l=this.session.getNextFoldLine(a,l))?l.start.row:1/0),!(a>s);){var u=r[o++]
if(u){this.dom.removeChildren(u),this.$renderLine(u,a,a==c&&l),h&&(u.style.top=this.$lines.computeLineTop(a,e,this.session)+"px")
var d=e.lineHeight*this.session.getRowLength(a)+"px"
u.style.height!=d&&(h=!0,u.style.height=d)}a++}if(h)for(;o<this.$lines.cells.length;){var g=this.$lines.cells[o++]
g.element.style.top=this.$lines.computeLineTop(g.row,e,this.session)+"px"}}scrollLines(e){var t=this.config
if(this.config=e,this.$lines.pageChanged(t,e))return this.update(e)
this.$lines.moveContainer(e)
var i=e.lastRow,n=t?t.lastRow:-1
if(!t||n<e.firstRow)return this.update(e)
if(i<t.firstRow)return this.update(e)
if(!t||t.lastRow<e.firstRow)return this.update(e)
if(e.lastRow<t.firstRow)return this.update(e)
if(t.firstRow<e.firstRow)for(var s=this.session.getFoldedRowCount(t.firstRow,e.firstRow-1);s>0;s--)this.$lines.shift()
if(t.lastRow>e.lastRow)for(s=this.session.getFoldedRowCount(e.lastRow+1,t.lastRow);s>0;s--)this.$lines.pop()
e.firstRow<t.firstRow&&this.$lines.unshift(this.$renderLinesFragment(e,e.firstRow,t.firstRow-1)),e.lastRow>t.lastRow&&this.$lines.push(this.$renderLinesFragment(e,t.lastRow+1,e.lastRow)),this.$highlightIndentGuide()}$renderLinesFragment(e,t,i){for(var n=[],r=t,o=this.session.getNextFoldLine(r),a=o?o.start.row:1/0;r>a&&(r=o.end.row+1,a=(o=this.session.getNextFoldLine(r,o))?o.start.row:1/0),!(r>i);){var l=this.$lines.createCell(r,e,this.session),h=l.element
this.dom.removeChildren(h),s.setStyle(h.style,"height",this.$lines.computeLineHeight(r,e,this.session)+"px"),s.setStyle(h.style,"top",this.$lines.computeLineTop(r,e,this.session)+"px"),this.$renderLine(h,r,r==a&&o),this.$useLineGroups()?h.className="ace_line_group":h.className="ace_line",n.push(l),r++}return n}update(e){this.$lines.moveContainer(e),this.config=e
for(var t=e.firstRow,i=e.lastRow,n=this.$lines;n.getLength();)n.pop()
n.push(this.$renderLinesFragment(e,t,i))}$renderToken(e,t,i,n){for(var s,o=this,a=/(\t)|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\uFEFF\uFFF9-\uFFFC\u2066\u2067\u2068\u202A\u202B\u202D\u202E\u202C\u2069]+)|(\u3000)|([\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g,c=this.dom.createFragment(this.element),u=0;s=a.exec(n);){var d=s[1],g=s[2],p=s[3],m=s[4],f=s[5]
if(o.showSpaces||!g){var v=u!=s.index?n.slice(u,s.index):""
if(u=s.index+s[0].length,v&&c.appendChild(this.dom.createTextNode(v,this.element)),d){var w=o.session.getScreenTabSize(t+s.index)
c.appendChild(o.$tabStrings[w].cloneNode(!0)),t+=w-1}else g?o.showSpaces?((x=this.dom.createElement("span")).className="ace_invisible ace_invisible_space",x.textContent=r.stringRepeat(o.SPACE_CHAR,g.length),c.appendChild(x)):c.appendChild(this.dom.createTextNode(g,this.element)):p?((x=this.dom.createElement("span")).className="ace_invisible ace_invisible_space ace_invalid",x.textContent=r.stringRepeat(o.SPACE_CHAR,p.length),c.appendChild(x)):m?(t+=1,(x=this.dom.createElement("span")).style.width=2*o.config.characterWidth+"px",x.className=o.showSpaces?"ace_cjk ace_invisible ace_invisible_space":"ace_cjk",x.textContent=o.showSpaces?o.SPACE_CHAR:m,c.appendChild(x)):f&&(t+=1,(x=this.dom.createElement("span")).style.width=2*o.config.characterWidth+"px",x.className="ace_cjk",x.textContent=f,c.appendChild(x))}}if(c.appendChild(this.dom.createTextNode(u?n.slice(u):n,this.element)),h(i.type))e.appendChild(c)
else{var y="ace_"+i.type.replace(/\./g," ace_"),x=this.dom.createElement("span")
"fold"==i.type&&(x.style.width=i.value.length*this.config.characterWidth+"px",x.setAttribute("title",l("inline-fold.closed.title","Unfold code"))),x.className=y,x.appendChild(c),e.appendChild(x)}return t+n.length}renderIndentGuide(e,t,i){var n=t.search(this.$indentGuideRe)
if(n<=0||n>=i)return t
if(" "==t[0]){for(var s=(n-=n%this.tabSize)/this.tabSize,r=0;r<s;r++)e.appendChild(this.$tabStrings[" "].cloneNode(!0))
return this.$highlightIndentGuide(),t.substr(n)}if("\t"==t[0]){for(r=0;r<n;r++)e.appendChild(this.$tabStrings["\t"].cloneNode(!0))
return this.$highlightIndentGuide(),t.substr(n)}return this.$highlightIndentGuide(),t}$highlightIndentGuide(){if(this.$highlightIndentGuides&&this.displayIndentGuides){this.$highlightIndentGuideMarker={indentLevel:void 0,start:void 0,end:void 0,dir:void 0}
var e=this.session.doc.$lines
if(e){var t=this.session.selection.getCursor(),i=/^\s*/.exec(this.session.doc.getLine(t.row))[0].length,n=Math.floor(i/this.tabSize)
if(this.$highlightIndentGuideMarker={indentLevel:n,start:t.row},this.session.$bracketHighlight)for(var s=this.session.$bracketHighlight.ranges,r=0;r<s.length;r++)if(t.row!==s[r].start.row){this.$highlightIndentGuideMarker.end=s[r].start.row,t.row>s[r].start.row?this.$highlightIndentGuideMarker.dir=-1:this.$highlightIndentGuideMarker.dir=1
break}if(!this.$highlightIndentGuideMarker.end&&""!==e[t.row]&&t.column===e[t.row].length)for(this.$highlightIndentGuideMarker.dir=1,r=t.row+1;r<e.length;r++){var o=e[r],a=/^\s*/.exec(o)[0].length
if(""!==o&&(this.$highlightIndentGuideMarker.end=r,a<=i))break}this.$renderHighlightIndentGuide()}}}$clearActiveIndentGuide(){for(var e=this.$lines.cells,t=0;t<e.length;t++){var i=e[t].element.childNodes
if(i.length>0)for(var n=0;n<i.length;n++)if(i[n].classList&&i[n].classList.contains("ace_indent-guide-active")){i[n].classList.remove("ace_indent-guide-active")
break}}}$setIndentGuideActive(e,t){if(""!==this.session.doc.getLine(e.row)){var i=e.element.childNodes
if(i){let e=i[t-1]
e&&e.classList&&e.classList.contains("ace_indent-guide")&&e.classList.add("ace_indent-guide-active")}}}$renderHighlightIndentGuide(){if(this.$lines){var e=this.$lines.cells
this.$clearActiveIndentGuide()
var t=this.$highlightIndentGuideMarker.indentLevel
if(0!==t)if(1===this.$highlightIndentGuideMarker.dir)for(var i=0;i<e.length;i++){var n=e[i]
if(this.$highlightIndentGuideMarker.end&&n.row>=this.$highlightIndentGuideMarker.start+1){if(n.row>=this.$highlightIndentGuideMarker.end)break
this.$setIndentGuideActive(n,t)}}else for(i=e.length-1;i>=0;i--)if(n=e[i],this.$highlightIndentGuideMarker.end&&n.row<this.$highlightIndentGuideMarker.start){if(n.row<=this.$highlightIndentGuideMarker.end)break
this.$setIndentGuideActive(n,t)}}}$createLineElement(e){var t=this.dom.createElement("div")
return t.className="ace_line",t.style.height=this.config.lineHeight+"px",t}$renderWrappedLine(e,t,i){var n=0,s=0,o=i[0],a=0,l=this.$createLineElement()
e.appendChild(l)
for(var h=0;h<t.length;h++){var c=t[h],u=c.value
if(0==h&&this.displayIndentGuides){if(n=u.length,!(u=this.renderIndentGuide(l,u,o)))continue
n-=u.length}if(n+u.length<o)a=this.$renderToken(l,a,c,u),n+=u.length
else{for(;n+u.length>=o;)a=this.$renderToken(l,a,c,u.substring(0,o-n)),u=u.substring(o-n),n=o,l=this.$createLineElement(),e.appendChild(l),l.appendChild(this.dom.createTextNode(r.stringRepeat("\xa0",i.indent),this.element)),a=0,o=i[++s]||Number.MAX_VALUE
0!=u.length&&(n+=u.length,a=this.$renderToken(l,a,c,u))}}i[i.length-1]>this.MAX_LINE_LENGTH&&this.$renderOverflowMessage(l,a,null,"",!0)}$renderSimpleLine(e,t){for(var i=0,n=0;n<t.length;n++){var s=t[n],r=s.value
if(0!=n||!this.displayIndentGuides||(r=this.renderIndentGuide(e,r))){if(i+r.length>this.MAX_LINE_LENGTH)return this.$renderOverflowMessage(e,i,s,r)
i=this.$renderToken(e,i,s,r)}}}$renderOverflowMessage(e,t,i,n,s){i&&this.$renderToken(e,t,i,n.slice(0,this.MAX_LINE_LENGTH-t))
var r=this.dom.createElement("span")
r.className="ace_inline_button ace_keyword ace_toggle_wrap",r.textContent=s?"<hide>":"<click to see more...>",e.appendChild(r)}$renderLine(e,t,i){if(i||0==i||(i=this.session.getFoldLine(t)),i)var n=this.$getFoldLineTokens(t,i)
else n=this.session.getTokens(t)
var s=e
if(n.length){var r=this.session.getRowSplitData(t)
r&&r.length?(this.$renderWrappedLine(e,n,r),s=e.lastChild):(s=e,this.$useLineGroups()&&(s=this.$createLineElement(),e.appendChild(s)),this.$renderSimpleLine(s,n))}else this.$useLineGroups()&&(s=this.$createLineElement(),e.appendChild(s))
if(this.showEOL&&s){i&&(t=i.end.row)
var o=this.dom.createElement("span")
o.className="ace_invisible ace_invisible_eol",o.textContent=t==this.session.getLength()-1?this.EOF_CHAR:this.EOL_CHAR,s.appendChild(o)}}$getFoldLineTokens(e,t){var i=this.session,n=[],s=i.getTokens(e)
return t.walk((function(e,t,r,o,a){null!=e?n.push({type:"fold",value:e}):(a&&(s=i.getTokens(t)),s.length&&function(e,t,i){for(var s=0,r=0;r+e[s].value.length<t;)if(r+=e[s].value.length,++s==e.length)return
for(r!=t&&((o=e[s].value.substring(t-r)).length>i-t&&(o=o.substring(0,i-t)),n.push({type:e[s].type,value:o}),r=t+o.length,s+=1);r<i&&s<e.length;){var o;(o=e[s].value).length+r>i?n.push({type:e[s].type,value:o.substring(0,i-r)}):n.push(e[s]),r+=o.length,s+=1}}(s,o,r))}),t.end.row,this.session.getLine(t.end.row).length),n}$useLineGroups(){return this.session.getUseWrapMode()}}c.prototype.EOF_CHAR="\xb6",c.prototype.EOL_CHAR_LF="\xac",c.prototype.EOL_CHAR_CRLF="\xa4",c.prototype.EOL_CHAR=c.prototype.EOL_CHAR_LF,c.prototype.TAB_CHAR="\u2014",c.prototype.SPACE_CHAR="\xb7",c.prototype.$padding=0,c.prototype.MAX_LINE_LENGTH=1e4,c.prototype.showInvisibles=!1,c.prototype.showSpaces=!1,c.prototype.showTabs=!1,c.prototype.showEOL=!1,c.prototype.displayIndentGuides=!0,c.prototype.$highlightIndentGuides=!0,c.prototype.$tabStrings=[],c.prototype.destroy={},c.prototype.onChangeTabSize=c.prototype.$computeTabString,n.implement(c.prototype,a),t.E=c},2185:(e,t)=>{const i=new Set(["text","rparen","lparen"])
t.t=function(e){return i.has(e)}},8913:(e,t,i)=>{function n(e){}var s=i(8297),r=i(8770).b
const o=i(3536).N,a=i(2228).q
var l,h,c={setOptions:function(e){Object.keys(e).forEach((function(t){this.setOption(t,e[t])}),this)},getOptions:function(e){var t={}
if(e)Array.isArray(e)||(e=Object.keys(t=e))
else{var i=this.$options
e=Object.keys(i).filter((function(e){return!i[e].hidden}))}return e.forEach((function(e){t[e]=this.getOption(e)}),this),t},setOption:function(e,t){if(this["$"+e]!==t){var i=this.$options[e]
if(i){if(i.forwardTo)return this[i.forwardTo]&&this[i.forwardTo].setOption(e,t)
i.handlesSet||(this["$"+e]=t),i&&i.set&&i.set.call(this,t)}}},getOption:function(e){var t=this.$options[e]
if(t)return t.forwardTo?this[t.forwardTo]&&this[t.forwardTo].getOption(e):t&&t.get?t.get.call(this):this["$"+e]}}
class u{constructor(){this.$defaultOptions={},l=a,h="dollarSigns"}defineOptions(e,t,i){return e.$options||(this.$defaultOptions[t]=e.$options={}),Object.keys(i).forEach((function(t){var n=i[t]
"string"==typeof n&&(n={forwardTo:n}),n.name||(n.name=t),e.$options[n.name]=n,"initialValue"in n&&(e["$"+n.name]=n.initialValue)})),s.implement(e,c),this}resetOptions(e){Object.keys(e.$options).forEach((function(t){var i=e.$options[t]
"value"in i&&e.setOption(t,i.value)}))}setDefaultValue(e,t,i){if(!e){for(e in this.$defaultOptions)if(this.$defaultOptions[e][t])break
if(!this.$defaultOptions[e][t])return!1}var n=this.$defaultOptions[e]||(this.$defaultOptions[e]={})
n[t]&&(n.forwardTo?this.setDefaultValue(n.forwardTo,t,i):n[t].value=i)}setDefaultValues(e,t){Object.keys(t).forEach((function(i){this.setDefaultValue(e,i,t[i])}),this)}setMessages(e,t){l=e,t&&t.placeholders&&(h=t.placeholders)}nls(e,t,i){l[e]||l[t]
var n=l[e]||l[t]||t
return i&&("dollarSigns"===h&&(n=n.replace(/\$(\$|[\d]+)/g,(function(e,t){return"$"==t?"$":i[t]}))),"curlyBrackets"===h&&(n=n.replace(/\{([^\}]+)\}/g,(function(e,t){return i[t]})))),n}}u.prototype.warn=n,u.prototype.reportError=o,s.implement(u.prototype,r),t.o=u},8953:(e,t)=>{function i(e,t,i){if(!(o<e))if(1!=e||1!=r||l)for(var n,s,a,h,c=i.length,u=0;u<c;){if(t[u]>=e){for(n=u+1;n<c&&t[n]>=e;)n++
for(s=u,a=n-1;s<a;s++,a--)h=i[s],i[s]=i[a],i[a]=h
u=n}u++}else i.reverse()}function n(e,t,i,n){var s,o,c,u,I=t[n]
switch(I){case d:case g:a=!1
case f:case m:return I
case p:return a?m:p
case y:return a=!0,g
case x:return f
case b:return n<1||n+1>=t.length||(s=i[n-1])!=p&&s!=m||(o=t[n+1])!=p&&o!=m?f:(a&&(o=m),o==s?o:f)
case C:return(s=n>0?i[n-1]:v)==p&&n+1<t.length&&t[n+1]==p?p:f
case S:if(n>0&&i[n-1]==p)return p
if(a)return f
for(u=n+1,c=t.length;u<c&&t[u]==S;)u++
return u<c&&t[u]==p?p:f
case k:for(c=t.length,u=n+1;u<c&&t[u]==k;)u++
if(u<c){var R=e[n],_=R>=1425&&R<=2303||64286==R
if(s=t[u],_&&(s==g||s==y))return g}return n<1||(s=t[n-1])==v?f:i[n-1]
case v:return a=!1,l=!0,r
case w:return h=!0,f
case $:case A:case L:case T:case M:a=!1
case E:return f}}function s(e){var t=e.charCodeAt(0),i=t>>8
return 0==i?t>191?d:I[t]:5==i?/[\u0591-\u05f4]/.test(e)?g:d:6==i?/[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(e)?k:/[\u0660-\u0669\u066b-\u066c]/.test(e)?m:1642==t?S:/[\u06f0-\u06f9]/.test(e)?p:y:32==i&&t<=8287?R[255&t]:254==i&&t>=65136?y:f}var r=0,o=0,a=!1,l=!1,h=!1,c=[[0,3,0,1,0,0,0],[0,3,0,1,2,2,0],[0,3,0,17,2,0,1],[0,3,5,5,4,1,0],[0,3,21,21,4,0,1],[0,3,5,5,4,2,0]],u=[[2,0,1,1,0,1,0],[2,0,1,1,0,2,0],[2,0,2,1,3,2,0],[2,0,2,33,3,1,1]],d=0,g=1,p=2,m=3,f=4,v=5,w=6,y=7,x=8,b=9,C=10,S=11,k=12,$=13,A=14,M=15,L=16,T=17,E=18,I=[E,E,E,E,E,E,E,E,E,w,v,w,x,v,E,E,E,E,E,E,E,E,E,E,E,E,E,E,v,v,v,w,x,f,f,S,S,S,f,f,f,f,f,C,b,C,b,b,p,p,p,p,p,p,p,p,p,p,b,f,f,f,f,f,f,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,f,f,f,f,f,f,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,f,f,f,f,E,E,E,E,E,E,v,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,b,f,S,S,S,S,f,f,f,f,d,f,f,E,f,f,S,S,p,p,f,d,f,f,f,p,d,f,f,f,f,f],R=[x,x,x,x,x,x,x,x,x,x,x,E,E,E,d,g,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,x,v,$,A,M,L,T,b,S,S,S,S,S,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,b,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,x]
t.L=d,t.R=g,t.EN=p,t.ON_R=3,t.AN=4,t.R_H=5,t.B=6,t.RLE=7,t.DOT="\xb7",t.doBidiReorder=function(e,d,p){if(e.length<2)return{}
var b=e.split(""),C=Array(b.length),S=Array(b.length),k=[]
r=p?1:0,function(e,t,i,d){var g=r?u:c,p=null,m=null,f=null,y=0,b=null,C=-1,S=null,k=null,$=[]
if(!d)for(S=0,d=[];S<i;S++)d[S]=s(e[S])
for(o=r,a=!1,l=!1,h=!1,k=0;k<i;k++){if(p=y,$[k]=m=n(e,d,$,k),b=240&(y=g[p][m]),y&=15,t[k]=f=g[y][5],b>0)if(16==b){for(S=C;S<k;S++)t[S]=1
C=-1}else C=-1
if(g[y][6])-1==C&&(C=k)
else if(C>-1){for(S=C;S<k;S++)t[S]=f
C=-1}d[k]==v&&(t[k]=0),o|=f}if(h)for(S=0;S<i;S++)if(d[S]==w){t[S]=r
for(var A=S-1;A>=0&&d[A]==x;A--)t[A]=r}}(b,k,b.length,d)
for(var A=0;A<C.length;C[A]=A,A++);for(i(2,k,C),i(1,k,C),A=0;A<C.length-1;A++)d[A]===m?k[A]=t.AN:k[A]===g&&(d[A]>y&&d[A]<$||d[A]===f||d[A]===E)?k[A]=t.ON_R:A>0&&"\u0644"===b[A-1]&&/\u0622|\u0623|\u0625|\u0627/.test(b[A])&&(k[A-1]=k[A]=t.R_H,A++)
for(b[b.length-1]===t.DOT&&(k[b.length-1]=t.B),"\u202b"===b[0]&&(k[0]=t.RLE),A=0;A<C.length;A++)S[A]=k[C[A]]
return{logicalFromVisual:C,bidiLevels:S}},t.hasBidiCharacters=function(e,t){for(var i=!1,n=0;n<e.length;n++)t[n]=s(e.charAt(n)),i||t[n]!=g&&t[n]!=y&&t[n]!=m||(i=!0)
return i},t.getVisualFromLogicalIdx=function(e,t){for(var i=0;i<t.logicalFromVisual.length;i++)if(t.logicalFromVisual[i]==e)return i
return 0}},2001:(e,t)=>{t.deepCopy=function e(t){if("object"!=typeof t||!t)return t
var i
if(Array.isArray(t)){i=[]
for(let n=0;n<t.length;n++)i[n]=e(t[n])
return i}if("[object Object]"!==Object.prototype.toString.call(t))return t
i={}
for(let n in t)i[n]=e(t[n])
return i}},2228:(e,t)=>{t.q={"autocomplete.popup.aria-roledescription":"Autocomplete suggestions","autocomplete.popup.aria-label":"Autocomplete suggestions","autocomplete.popup.item.aria-roledescription":"item","autocomplete.loading":"Loading...","editor.scroller.aria-roledescription":"editor","editor.scroller.aria-label":"Editor content, press Enter to start editing, press Escape to exit","editor.gutter.aria-roledescription":"editor","editor.gutter.aria-label":"Editor gutter, press Enter to interact with controls using arrow keys, press Escape to exit","error-marker.good-state":"Looks good!","prompt.recently-used":"Recently used","prompt.other-commands":"Other commands","prompt.no-matching-commands":"No matching commands","search-box.find.placeholder":"Search for","search-box.find-all.text":"All","search-box.replace.placeholder":"Replace with","search-box.replace-next.text":"Replace","search-box.replace-all.text":"All","search-box.toggle-replace.title":"Toggle Replace mode","search-box.toggle-regexp.title":"RegExp Search","search-box.toggle-case.title":"CaseSensitive Search","search-box.toggle-whole-word.title":"Whole Word Search","search-box.toggle-in-selection.title":"Search In Selection","search-box.search-counter":"$0 of $1","text-input.aria-roledescription":"editor","text-input.aria-label":"Cursor at row $0","gutter.code-folding.range.aria-label":"Toggle code folding, rows $0 through $1","gutter.code-folding.closed.aria-label":"Toggle code folding, rows $0 through $1","gutter.code-folding.open.aria-label":"Toggle code folding, row $0","gutter.code-folding.closed.title":"Unfold code","gutter.code-folding.open.title":"Fold code","gutter.annotation.aria-label.error":"Error, read annotations row $0","gutter.annotation.aria-label.warning":"Warning, read annotations row $0","gutter.annotation.aria-label.info":"Info, read annotations row $0","inline-fold.closed.title":"Unfold code","gutter-tooltip.aria-label.error.singular":"error","gutter-tooltip.aria-label.error.plural":"errors","gutter-tooltip.aria-label.warning.singular":"warning","gutter-tooltip.aria-label.warning.plural":"warnings","gutter-tooltip.aria-label.info.singular":"information message","gutter-tooltip.aria-label.info.plural":"information messages","gutter.annotation.aria-label.security":"Security finding, read annotations row $0","gutter.annotation.aria-label.hint":"Suggestion, read annotations row $0","gutter-tooltip.aria-label.security.singular":"security finding","gutter-tooltip.aria-label.security.plural":"security findings","gutter-tooltip.aria-label.hint.singular":"suggestion","gutter-tooltip.aria-label.hint.plural":"suggestions"}},215:(e,t,i)=>{function n(){var e=a
a=null,e&&e.forEach((function(e){s(e[0],e[1])}))}function s(e,i,s){if("undefined"!=typeof document){if(a)if(s)n()
else if(!1===s)return a.push([e,i])
if(!r){var o=s
s&&s.getRootNode&&(o=s.getRootNode())&&o!=s||(o=document)
var l=o.ownerDocument||o
if(i&&t.hasCssString(i,o))return null
i&&(e+="\n/*# sourceURL=ace/css/"+i+" */")
var h=t.createElement("style")
h.appendChild(l.createTextNode(e)),i&&(h.id=i),o==l&&(o=t.getDocumentHead(l)),o.insertBefore(h,o.firstChild)}}}var r,o=i(6483)
t.buildDom=function e(t,i,n){if("string"==typeof t&&t){var s=document.createTextNode(t)
return i&&i.appendChild(s),s}if(!Array.isArray(t))return t&&t.appendChild&&i&&i.appendChild(t),t
if("string"!=typeof t[0]||!t[0]){for(var r=[],o=0;o<t.length;o++){var a=e(t[o],i,n)
a&&r.push(a)}return r}var l=document.createElement(t[0]),h=t[1],c=1
for(h&&"object"==typeof h&&!Array.isArray(h)&&(c=2),o=c;o<t.length;o++)e(t[o],l,n)
return 2==c&&Object.keys(h).forEach((function(e){var t=h[e]
"class"===e?l.className=Array.isArray(t)?t.join(" "):t:"function"==typeof t||"value"==e||"$"==e[0]?l[e]=t:"ref"===e?n&&(n[t]=l):"style"===e?"string"==typeof t&&(l.style.cssText=t):null!=t&&l.setAttribute(e,t)})),i&&i.appendChild(l),l},t.getDocumentHead=function(e){return e||(e=document),e.head||e.getElementsByTagName("head")[0]||e.documentElement},t.createElement=function(e,t){return document.createElementNS?document.createElementNS(t||"http://www.w3.org/1999/xhtml",e):document.createElement(e)},t.removeChildren=function(e){e.innerHTML=""},t.createTextNode=function(e,t){return(t?t.ownerDocument:document).createTextNode(e)},t.createFragment=function(e){return(e?e.ownerDocument:document).createDocumentFragment()},t.hasCssClass=function(e,t){return-1!==(e.className+"").split(/\s+/g).indexOf(t)},t.addCssClass=function(e,i){t.hasCssClass(e,i)||(e.className+=" "+i)},t.removeCssClass=function(e,t){for(var i=e.className.split(/\s+/g);;){var n=i.indexOf(t)
if(-1==n)break
i.splice(n,1)}e.className=i.join(" ")},t.toggleCssClass=function(e,t){for(var i=e.className.split(/\s+/g),n=!0;;){var s=i.indexOf(t)
if(-1==s)break
n=!1,i.splice(s,1)}return n&&i.push(t),e.className=i.join(" "),n},t.setCssClass=function(e,i,n){n?t.addCssClass(e,i):t.removeCssClass(e,i)},t.hasCssString=function(e,t){var i,n=0
if(i=(t=t||document).querySelectorAll("style"))for(;n<i.length;)if(i[n++].id===e)return!0},t.removeElementById=function(e,t){(t=t||document).getElementById(e)&&t.getElementById(e).remove()}
var a=[]
if(t.useStrictCSP=function(e){r=e,0==e?n():a||(a=[])},t.importCssString=s,t.importCssStylsheet=function(e,i){t.buildDom(["link",{rel:"stylesheet",href:e}],t.getDocumentHead(i))},t.scrollbarWidth=function(e){var i=t.createElement("ace_inner")
i.style.width="100%",i.style.minWidth="0px",i.style.height="200px",i.style.display="block"
var n=t.createElement("ace_outer"),s=n.style
s.position="absolute",s.left="-10000px",s.overflow="hidden",s.width="200px",s.minWidth="0px",s.height="150px",s.display="block",n.appendChild(i)
var r=e&&e.documentElement||document&&document.documentElement
if(!r)return 0
r.appendChild(n)
var o=i.offsetWidth
s.overflow="scroll"
var a=i.offsetWidth
return o===a&&(a=n.clientWidth),r.removeChild(n),o-a},t.computedStyle=function(e){return window.getComputedStyle(e,"")||{}},t.setStyle=function(e,t,i){e[t]!==i&&(e[t]=i)},t.HAS_CSS_ANIMATION=!1,t.HAS_CSS_TRANSFORMS=!1,t.HI_DPI=!o.isWin||"undefined"!=typeof window&&window.devicePixelRatio>=1.5,o.isChromeOS&&(t.HI_DPI=!1),"undefined"!=typeof document){var l=document.createElement("div")
t.HI_DPI&&void 0!==l.style.transform&&(t.HAS_CSS_TRANSFORMS=!0),o.isEdge||void 0===l.style.animationName||(t.HAS_CSS_ANIMATION=!0),l=null}t.HAS_CSS_TRANSFORMS?t.translate=function(e,t,i){e.style.transform="translate("+Math.round(t)+"px, "+Math.round(i)+"px)"}:t.translate=function(e,t,i){e.style.top=Math.round(i)+"px",e.style.left=Math.round(t)+"px"}},2507:(e,t,i)=>{function n(){return null==a&&function(){a=!1
try{document.createComment("").addEventListener("test",(function(){}),{get passive(){return a={passive:!1},!0}})}catch(e){}}(),a}function s(e,t,i){this.elem=e,this.type=t,this.callback=i}function r(e){return(e.ctrlKey?1:0)|(e.altKey?2:0)|(e.shiftKey?4:0)|(e.metaKey?8:0)}function o(){c=Object.create(null)}var a,l=i(3679),h=i(6483),c=null,u=0
s.prototype.destroy=function(){g(this.elem,this.type,this.callback),this.elem=this.type=this.callback=void 0}
var d=t.addListener=function(e,t,i,r){e.addEventListener(t,i,n()),r&&r.$toDestroy.push(new s(e,t,i))},g=t.removeListener=function(e,t,i){e.removeEventListener(t,i,n())}
if(t.stopEvent=function(e){return t.stopPropagation(e),t.preventDefault(e),!1},t.stopPropagation=function(e){e.stopPropagation&&e.stopPropagation()},t.preventDefault=function(e){e.preventDefault&&e.preventDefault()},t.getButton=function(e){return"dblclick"==e.type?0:"contextmenu"==e.type||h.isMac&&e.ctrlKey&&!e.altKey&&!e.shiftKey?2:e.button},t.capture=function(e,t,i){function n(e){t&&t(e),i&&i(e),g(s,"mousemove",t),g(s,"mouseup",n),g(s,"dragstart",n)}var s=e&&e.ownerDocument||document
return d(s,"mousemove",t),d(s,"mouseup",n),d(s,"dragstart",n),n},t.addMouseWheelListener=function(e,t,i){d(e,"wheel",(function(e){var i=e.deltaX||0,n=e.deltaY||0
switch(e.deltaMode){case e.DOM_DELTA_PIXEL:e.wheelX=.15*i,e.wheelY=.15*n
break
case e.DOM_DELTA_LINE:e.wheelX=15*i,e.wheelY=15*n
break
case e.DOM_DELTA_PAGE:e.wheelX=150*i,e.wheelY=150*n}t(e)}),i)},t.addMultiMouseDownListener=function(e,i,n,s,r){function o(e){if(0!==t.getButton(e)?u=0:e.detail>1?++u>4&&(u=1):u=1,h.isIE){var r=Math.abs(e.clientX-a)>5||Math.abs(e.clientY-l)>5
c&&!r||(u=1),c&&clearTimeout(c),c=setTimeout((function(){c=null}),i[u-1]||600),1==u&&(a=e.clientX,l=e.clientY)}if(e._clicks=u,n[s]("mousedown",e),u>4)u=0
else if(u>1)return n[s](g[u],e)}var a,l,c,u=0,g={2:"dblclick",3:"tripleclick",4:"quadclick"}
Array.isArray(e)||(e=[e]),e.forEach((function(e){d(e,"mousedown",o,r)}))},t.getModifierString=function(e){return l.KEY_MODS[r(e)]},t.addCommandKeyListener=function(e,i,n){var s=null
d(e,"keydown",(function(e){c[e.keyCode]=(c[e.keyCode]||0)+1
var t=function(e,t,i){var n=r(t)
if(!i&&t.code&&(i=l.$codeToKeyCode[t.code]||i),!h.isMac&&c){if(t.getModifierState&&(t.getModifierState("OS")||t.getModifierState("Win"))&&(n|=8),c.altGr){if(!(3&~n))return
c.altGr=0}if(18===i||17===i){var s=t.location
17===i&&1===s?1==c[i]&&(u=t.timeStamp):18===i&&3===n&&2===s&&t.timeStamp-u<50&&(c.altGr=!0)}}if(i in l.MODIFIER_KEYS&&(i=-1),n||13!==i||3!==t.location||(e(t,n,-i),!t.defaultPrevented)){if(h.isChromeOS&&8&n){if(e(t,n,i),t.defaultPrevented)return
n&=-9}return!!(n||i in l.FUNCTION_KEYS||i in l.PRINTABLE_KEYS)&&e(t,n,i)}}(i,e,e.keyCode)
return s=e.defaultPrevented,t}),n),d(e,"keypress",(function(e){s&&(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)&&(t.stopEvent(e),s=null)}),n),d(e,"keyup",(function(e){c[e.keyCode]=null}),n),c||(o(),d(window,"focus",o))},"object"==typeof window&&window.postMessage&&!h.isOldIE){var p=1
t.nextTick=function(e,i){i=i||window
var n="zero-timeout-message-"+p++,s=function(r){r.data==n&&(t.stopPropagation(r),g(i,"message",s),e())}
d(i,"message",s),i.postMessage(n,"*")}}t.$idleBlocked=!1,t.onIdle=function(e,i){return setTimeout((function i(){t.$idleBlocked?setTimeout(i,100):e()}),i)},t.$idleBlockId=null,t.blockIdle=function(e){t.$idleBlockId&&clearTimeout(t.$idleBlockId),t.$idleBlocked=!0,t.$idleBlockId=setTimeout((function(){t.$idleBlocked=!1}),e||100)},t.nextFrame="object"==typeof window&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame),t.nextFrame?t.nextFrame=t.nextFrame.bind(window):t.nextFrame=function(e){setTimeout(e,17)}},8770:(e,t)=>{var i={},n=function(){this.propagationStopped=!0},s=function(){this.defaultPrevented=!0}
i._emit=i._dispatchEvent=function(e,t){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={})
var i=this._eventRegistry[e]||[],r=this._defaultHandlers[e]
if(i.length||r){"object"==typeof t&&t||(t={}),t.type||(t.type=e),t.stopPropagation||(t.stopPropagation=n),t.preventDefault||(t.preventDefault=s),i=i.slice()
for(var o=0;o<i.length&&(i[o](t,this),!t.propagationStopped);o++);return r&&!t.defaultPrevented?r(t,this):void 0}},i._signal=function(e,t){var i=(this._eventRegistry||{})[e]
if(i){i=i.slice()
for(var n=0;n<i.length;n++)i[n](t,this)}},i.once=function(e,t){var i=this
if(this.on(e,(function n(){i.off(e,n),t.apply(null,arguments)})),!t)return new Promise((function(e){t=e}))},i.setDefaultHandler=function(e,t){var i=this._defaultHandlers
if(i||(i=this._defaultHandlers={_disabled_:{}}),i[e]){var n=i[e],s=i._disabled_[e]
s||(i._disabled_[e]=s=[]),s.push(n)
var r=s.indexOf(t);-1!=r&&s.splice(r,1)}i[e]=t},i.removeDefaultHandler=function(e,t){var i=this._defaultHandlers
if(i){var n=i._disabled_[e]
if(i[e]==t)n&&this.setDefaultHandler(e,n.pop())
else if(n){var s=n.indexOf(t);-1!=s&&n.splice(s,1)}}},i.on=i.addEventListener=function(e,t,i){this._eventRegistry=this._eventRegistry||{}
var n=this._eventRegistry[e]
return n||(n=this._eventRegistry[e]=[]),-1==n.indexOf(t)&&n[i?"unshift":"push"](t),t},i.off=i.removeListener=i.removeEventListener=function(e,t){this._eventRegistry=this._eventRegistry||{}
var i=this._eventRegistry[e]
if(i){var n=i.indexOf(t);-1!==n&&i.splice(n,1)}},i.removeAllListeners=function(e){e||(this._eventRegistry=this._defaultHandlers=void 0),this._eventRegistry&&(this._eventRegistry[e]=void 0),this._defaultHandlers&&(this._defaultHandlers[e]=void 0)},t.b=i},3679:(e,t,i)=>{for(var n=i(8297),s={MODIFIER_KEYS:{16:"Shift",17:"Ctrl",18:"Alt",224:"Meta",91:"MetaLeft",92:"MetaRight",93:"ContextMenu"},KEY_MODS:{ctrl:1,alt:2,option:2,shift:4,super:8,meta:8,command:8,cmd:8,control:1},FUNCTION_KEYS:{8:"Backspace",9:"Tab",13:"Return",19:"Pause",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"Print",45:"Insert",46:"Delete","-13":"NumpadEnter",144:"Numlock",145:"Scrolllock"},PRINTABLE_KEYS:{32:" ",59:";",61:"=",107:"+",109:"-",110:".",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",111:"/",106:"*"}},r={Command:224,Backspace:8,Tab:9,Return:13,Enter:13,Pause:19,Escape:27,PageUp:33,PageDown:34,End:35,Home:36,Insert:45,Delete:46,ArrowLeft:37,ArrowUp:38,ArrowRight:39,ArrowDown:40,Backquote:192,Minus:189,Equal:187,BracketLeft:219,Backslash:220,BracketRight:221,Semicolon:186,Quote:222,Comma:188,Period:190,Slash:191,Space:32,NumpadAdd:107,NumpadDecimal:110,NumpadSubtract:109,NumpadDivide:111,NumpadMultiply:106},o=0;o<10;o++)r["Digit"+o]=48+o,r["Numpad"+o]=96+o,s.PRINTABLE_KEYS[48+o]=""+o,s.FUNCTION_KEYS[96+o]="Numpad"+o
for(o=65;o<91;o++){var a=String.fromCharCode(o+32)
r["Key"+a.toUpperCase()]=o,s.PRINTABLE_KEYS[o]=a}for(o=1;o<13;o++)r["F"+o]=111+o,s.FUNCTION_KEYS[111+o]="F"+o
var l={Shift:16,Control:17,Alt:18,Meta:224}
for(var h in l)r[h]=r[h+"Left"]=r[h+"Right"]=l[h]
for(var c in t.$codeToKeyCode=r,s.PRINTABLE_KEYS[173]="-",s.FUNCTION_KEYS){var u=s.FUNCTION_KEYS[c].toLowerCase()
s[u]=parseInt(c,10)}for(var c in s.PRINTABLE_KEYS)u=s.PRINTABLE_KEYS[c].toLowerCase(),s[u]=parseInt(c,10)
n.mixin(s,s.MODIFIER_KEYS),n.mixin(s,s.PRINTABLE_KEYS),n.mixin(s,s.FUNCTION_KEYS),s.enter=s.return,s.escape=s.esc,s.del=s.delete,function(){for(var e=["cmd","ctrl","alt","shift"],t=Math.pow(2,e.length);t--;)s.KEY_MODS[t]=e.filter((function(e){return t&s.KEY_MODS[e]})).join("-")+"-"}(),s.KEY_MODS[0]="",s.KEY_MODS[-1]="input-",n.mixin(t,s),t.default=t,t.keyCodeToString=function(e){var t=s[e]
return"string"!=typeof t&&(t=String.fromCharCode(e)),t.toLowerCase()}},3927:(e,t,i)=>{t.last=function(e){return e[e.length-1]},t.stringReverse=function(e){return e.split("").reverse().join("")},t.stringRepeat=function(e,t){for(var i="";t>0;)1&t&&(i+=e),(t>>=1)&&(e+=e)
return i}
var n=/^\s\s*/,s=/\s\s*$/
t.stringTrimLeft=function(e){return e.replace(n,"")},t.stringTrimRight=function(e){return e.replace(s,"")},t.copyObject=function(e){var t={}
for(var i in e)t[i]=e[i]
return t},t.copyArray=function(e){for(var t=[],i=0,n=e.length;i<n;i++)e[i]&&"object"==typeof e[i]?t[i]=this.copyObject(e[i]):t[i]=e[i]
return t},t.deepCopy=i(2001).deepCopy,t.arrayToMap=function(e){for(var t={},i=0;i<e.length;i++)t[e[i]]=1
return t},t.createMap=function(e){var t=Object.create(null)
for(var i in e)t[i]=e[i]
return t},t.arrayRemove=function(e,t){for(var i=0;i<=e.length;i++)t===e[i]&&e.splice(i,1)},t.escapeRegExp=function(e){return e.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},t.escapeHTML=function(e){return(""+e).replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},t.getMatchOffsets=function(e,t){var i=[]
return e.replace(t,(function(e){i.push({offset:arguments[arguments.length-2],length:e.length})})),i},t.deferredCall=function(e){var t=null,i=function(){t=null,e()},n=function(e){return n.cancel(),t=setTimeout(i,e||0),n}
return n.schedule=n,n.call=function(){return this.cancel(),e(),n},n.cancel=function(){return clearTimeout(t),t=null,n},n.isPending=function(){return t},n},t.delayedCall=function(e,t){var i=null,n=function(){i=null,e()},s=function(e){null==i&&(i=setTimeout(n,e||t))}
return s.delay=function(e){i&&clearTimeout(i),i=setTimeout(n,e||t)},s.schedule=s,s.call=function(){this.cancel(),e()},s.cancel=function(){i&&clearTimeout(i),i=null},s.isPending=function(){return i},s},t.supportsLookbehind=function(){try{RegExp("(?<=.)")}catch(e){return!1}return!0},t.skipEmptyMatch=function(e,t,i){return i&&e.codePointAt(t)>65535?2:1}},5700:(e,t,i)=>{var n=i(215)
t.get=function(e,t){var i=new XMLHttpRequest
i.open("GET",e,!0),i.onreadystatechange=function(){4===i.readyState&&t(i.responseText)},i.send(null)},t.loadScript=function(e,t){var i=n.getDocumentHead(),s=document.createElement("script")
s.src=e,i.appendChild(s),s.onload=s.onreadystatechange=function(e,i){!i&&s.readyState&&"loaded"!=s.readyState&&"complete"!=s.readyState||(s=s.onload=s.onreadystatechange=null,i||t())}},t.qualifyURL=function(e){var t=document.createElement("a")
return t.href=e,t.href}},8297:(e,t)=>{t.inherits=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})},t.mixin=function(e,t){for(var i in t)e[i]=t[i]
return e},t.implement=function(e,i){t.mixin(e,i)}},3536:(e,t)=>{t.N=function(e,t){var i=Error(e)
i.data=t,setTimeout((function(){throw i}))}},6558:(e,t)=>{t.K=function(e){e.stopPropagation()
var t=e.currentTarget
t.scrollHeight>t.clientHeight||e.preventDefault()}},6483:(e,t)=>{t.OS={LINUX:"LINUX",MAC:"MAC",WINDOWS:"WINDOWS"},t.getOS=function(){return t.isMac?t.OS.MAC:t.isLinux?t.OS.LINUX:t.OS.WINDOWS}
var i="object"==typeof navigator?navigator:{},n=(/mac|win|linux/i.exec(i.platform)||["other"])[0].toLowerCase(),s=i.userAgent||"",r=i.appName||""
t.isWin="win"==n,t.isMac="mac"==n,t.isLinux="linux"==n,t.isIE="Microsoft Internet Explorer"==r||r.indexOf("MSAppHost")>=0?parseFloat((s.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]):parseFloat((s.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]),t.isOldIE=t.isIE&&t.isIE<9,t.isGecko=t.isMozilla=s.match(/ Gecko\/\d+/),t.isOpera="object"==typeof opera&&"[object Opera]"==Object.prototype.toString.call(window.opera),t.isWebKit=parseFloat(s.split("WebKit/")[1])||void 0,t.isChrome=parseFloat(s.split(" Chrome/")[1])||void 0,t.isSafari=parseFloat(s.split(" Safari/")[1])&&!t.isChrome||void 0,t.isEdge=parseFloat(s.split(" Edge/")[1])||void 0,t.isAIR=s.indexOf("AdobeAIR")>=0,t.isAndroid=s.indexOf("Android")>=0,t.isChromeOS=s.indexOf(" CrOS ")>=0,t.isIOS=/iPad|iPhone|iPod/.test(s)&&!window.MSStream,t.isIOS&&(t.isMac=!0),t.isMobile=t.isIOS||t.isAndroid},3175:(e,t,i)=>{var n=i(215)
t.G=class{constructor(e){this.session=e,this.session.widgetManager=this,this.session.getRowLength=this.getRowLength,this.session.$getWidgetScreenLength=this.$getWidgetScreenLength,this.updateOnChange=this.updateOnChange.bind(this),this.renderWidgets=this.renderWidgets.bind(this),this.measureWidgets=this.measureWidgets.bind(this),this.session._changedWidgets=[],this.$onChangeEditor=this.$onChangeEditor.bind(this),this.session.on("change",this.updateOnChange),this.session.on("changeFold",this.updateOnFold),this.session.on("changeEditor",this.$onChangeEditor)}getRowLength(e){var t
return t=this.lineWidgets&&this.lineWidgets[e]&&this.lineWidgets[e].rowCount||0,this.$useWrapMode&&this.$wrapData[e]?this.$wrapData[e].length+1+t:1+t}$getWidgetScreenLength(){var e=0
return this.lineWidgets.forEach((function(t){t&&t.rowCount&&!t.hidden&&(e+=t.rowCount)})),e}$onChangeEditor(e){this.attach(e.editor)}attach(e){e&&e.widgetManager&&e.widgetManager!=this&&e.widgetManager.detach(),this.editor!=e&&(this.detach(),this.editor=e,e&&(e.widgetManager=this,e.renderer.on("beforeRender",this.measureWidgets),e.renderer.on("afterRender",this.renderWidgets)))}detach(e){var t=this.editor
if(t){this.editor=null,t.widgetManager=null,t.renderer.off("beforeRender",this.measureWidgets),t.renderer.off("afterRender",this.renderWidgets)
var i=this.session.lineWidgets
i&&i.forEach((function(e){e&&e.el&&e.el.parentNode&&(e._inDocument=!1,e.el.parentNode.removeChild(e.el))}))}}updateOnFold(e,t){var i=t.lineWidgets
if(i&&e.action){for(var n=e.data,s=n.start.row,r=n.end.row,o="add"==e.action,a=s+1;a<r;a++)i[a]&&(i[a].hidden=o)
i[r]&&(o?i[s]?i[r].hidden=o:i[s]=i[r]:(i[s]==i[r]&&(i[s]=void 0),i[r].hidden=o))}}updateOnChange(e){var t=this.session.lineWidgets
if(t){var i=e.start.row,n=e.end.row-i
if(0===n);else if("remove"==e.action){var s=t.splice(i+1,n)
!t[i]&&s[s.length-1]&&(t[i]=s.pop()),s.forEach((function(e){e&&this.removeLineWidget(e)}),this),this.$updateRows()}else{var r=Array(n)
t[i]&&null!=t[i].column&&e.start.column>t[i].column&&i++,r.unshift(i,0),t.splice.apply(t,r),this.$updateRows()}}}$updateRows(){var e=this.session.lineWidgets
if(e){var t=!0
e.forEach((function(e,i){if(e)for(t=!1,e.row=i;e.$oldWidget;)e.$oldWidget.row=i,e=e.$oldWidget})),t&&(this.session.lineWidgets=null)}}$registerLineWidget(e){this.session.lineWidgets||(this.session.lineWidgets=Array(this.session.getLength()))
var t=this.session.lineWidgets[e.row]
return t&&(e.$oldWidget=t,t.el&&t.el.parentNode&&(t.el.parentNode.removeChild(t.el),t._inDocument=!1)),this.session.lineWidgets[e.row]=e,e}addLineWidget(e){if(this.$registerLineWidget(e),e.session=this.session,!this.editor)return e
var t=this.editor.renderer
e.html&&!e.el&&(e.el=n.createElement("div"),e.el.innerHTML=e.html),e.text&&!e.el&&(e.el=n.createElement("div"),e.el.textContent=e.text),e.el&&(n.addCssClass(e.el,"ace_lineWidgetContainer"),e.className&&n.addCssClass(e.el,e.className),e.el.style.position="absolute",e.el.style.zIndex="5",t.container.appendChild(e.el),e._inDocument=!0,e.coverGutter||(e.el.style.zIndex="3"),null==e.pixelHeight&&(e.pixelHeight=e.el.offsetHeight)),null==e.rowCount&&(e.rowCount=e.pixelHeight/t.layerConfig.lineHeight)
var i=this.session.getFoldAt(e.row,0)
if(e.$fold=i,i){var s=this.session.lineWidgets
e.row!=i.end.row||s[i.start.row]?e.hidden=!0:s[i.start.row]=e}return this.session._emit("changeFold",{data:{start:{row:e.row}}}),this.$updateRows(),this.renderWidgets(null,t),this.onWidgetChanged(e),e}removeLineWidget(e){if(e._inDocument=!1,e.session=null,e.el&&e.el.parentNode&&e.el.parentNode.removeChild(e.el),e.editor&&e.editor.destroy)try{e.editor.destroy()}catch(e){}if(this.session.lineWidgets){var t=this.session.lineWidgets[e.row]
if(t==e)this.session.lineWidgets[e.row]=e.$oldWidget,e.$oldWidget&&this.onWidgetChanged(e.$oldWidget)
else for(;t;){if(t.$oldWidget==e){t.$oldWidget=e.$oldWidget
break}t=t.$oldWidget}}this.session._emit("changeFold",{data:{start:{row:e.row}}}),this.$updateRows()}getWidgetsAtRow(e){for(var t=this.session.lineWidgets,i=t&&t[e],n=[];i;)n.push(i),i=i.$oldWidget
return n}onWidgetChanged(e){this.session._changedWidgets.push(e),this.editor&&this.editor.renderer.updateFull()}measureWidgets(e,t){var i=this.session._changedWidgets,n=t.layerConfig
if(i&&i.length){for(var s=1/0,r=0;r<i.length;r++){var o=i[r]
if(o&&o.el&&o.session==this.session){if(!o._inDocument){if(this.session.lineWidgets[o.row]!=o)continue
o._inDocument=!0,t.container.appendChild(o.el)}o.h=o.el.offsetHeight,o.fixedWidth||(o.w=o.el.offsetWidth,o.screenWidth=Math.ceil(o.w/n.characterWidth))
var a=o.h/n.lineHeight
o.coverLine&&(a-=this.session.getRowLineCount(o.row))<0&&(a=0),o.rowCount!=a&&(o.rowCount=a,o.row<s&&(s=o.row))}}s!=1/0&&(this.session._emit("changeFold",{data:{start:{row:s}}}),this.session.lineWidgetWidth=null),this.session._changedWidgets=[]}}renderWidgets(e,t){var i=t.layerConfig,n=this.session.lineWidgets
if(n){for(var s=Math.min(this.firstRow,i.firstRow),r=Math.max(this.lastRow,i.lastRow,n.length);s>0&&!n[s];)s--
this.firstRow=i.firstRow,this.lastRow=i.lastRow,t.$cursorLayer.config=i
for(var o=s;o<=r;o++){var a=n[o]
if(a&&a.el)if(a.hidden)a.el.style.top=-100-(a.pixelHeight||0)+"px"
else{a._inDocument||(a._inDocument=!0,t.container.appendChild(a.el))
var l=t.$cursorLayer.getPixelPosition({row:o,column:0},!0).top
a.coverLine||(l+=i.lineHeight*this.session.getRowLineCount(a.row)),a.el.style.top=l-i.offset+"px"
var h=a.coverGutter?0:t.gutterWidth
a.fixedWidth||(h-=t.scrollLeft),a.el.style.left=h+"px",a.fullWidth&&a.screenWidth&&(a.el.style.minWidth=i.width+2*i.padding+"px"),a.fixedWidth?a.el.style.right=t.scrollBar.getWidth()+"px":a.el.style.right=""}}}}}},8104:(e,t)=>{var i;(function(){this.add=function(e,t,i){switch(void 0){case this.$behaviours:this.$behaviours={}
case this.$behaviours[e]:this.$behaviours[e]={}}this.$behaviours[e][t]=i},this.addBehaviours=function(e){for(var t in e)for(var i in e[t])this.add(t,i,e[t][i])},this.remove=function(e){this.$behaviours&&this.$behaviours[e]&&delete this.$behaviours[e]},this.inherit=function(e,t){if("function"==typeof e)var i=(new e).getBehaviours(t)
else i=e.getBehaviours(t)
this.addBehaviours(i)},this.getBehaviours=function(e){if(e){for(var t={},i=0;i<e.length;i++)this.$behaviours[e[i]]&&(t[e[i]]=this.$behaviours[e[i]])
return t}return this.$behaviours}}).call((i=function(){this.$behaviours={}}).prototype),t.Q=i},5801:(e,t,i)=>{var n,s,r=i(8297),o=i(8104).Q,a=i(1871).TokenIterator,l=i(3927),h=["text","paren.rparen","rparen","paren","punctuation.operator"],c=["text","paren.rparen","rparen","paren","punctuation.operator","comment"],u={},d={'"':'"',"'":"'"},g=function(e){var t=-1
if(e.multiSelect&&(t=e.selection.index,u.rangeCount!=e.multiSelect.rangeCount&&(u={rangeCount:e.multiSelect.rangeCount})),u[t])return n=u[t]
n=u[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""}},p=function(e,t,i,n){var s=e.end.row-e.start.row
return{text:i+t+n,selection:[0,e.start.column+1,s,e.end.column+(s?0:1)]}};(s=function(e){e=e||{},this.add("braces","insertion",(function(t,i,r,o,a){var h=r.getCursorPosition(),c=o.doc.getLine(h.row)
if("{"==a){g(r)
var u=r.getSelectionRange(),d=o.doc.getTextRange(u),m=o.getTokenAt(h.row,h.column)
if(""!==d&&"{"!==d&&r.getWrapBehavioursEnabled())return p(u,d,"{","}")
if(m&&/(?:string)\.quasi|\.xml/.test(m.type)){if([/tag\-(?:open|name)/,/attribute\-name/].some((e=>e.test(m.type)))||/(string)\.quasi/.test(m.type)&&"$"!==m.value[h.column-m.start-1])return
return s.recordAutoInsert(r,o,"}"),{text:"{}",selection:[1,1]}}if(s.isSaneInsertion(r,o))return/[\]\}\)]/.test(c[h.column])||r.inMultiSelectMode||e.braces?(s.recordAutoInsert(r,o,"}"),{text:"{}",selection:[1,1]}):(s.recordMaybeInsert(r,o,"{"),{text:"{",selection:[1,1]})}else if("}"==a){if(g(r),"}"==c.substring(h.column,h.column+1)&&null!==o.$findOpeningBracket("}",{column:h.column+1,row:h.row})&&s.isAutoInsertedClosing(h,c,a))return s.popAutoInsertedClosing(),{text:"",selection:[1,1]}}else{if("\n"==a||"\r\n"==a){g(r)
var f=""
if(s.isMaybeInsertedClosing(h,c)&&(f=l.stringRepeat("}",n.maybeInsertedBrackets),s.clearMaybeInsertedClosing()),"}"===c.substring(h.column,h.column+1)){var v=o.findMatchingBracket({row:h.row,column:h.column+1},"}")
if(!v)return null
var w=this.$getIndent(o.getLine(v.row))}else{if(!f)return void s.clearMaybeInsertedClosing()
w=this.$getIndent(c)}var y=w+o.getTabString()
return{text:"\n"+y+"\n"+w+f,selection:[1,y.length,1,y.length]}}s.clearMaybeInsertedClosing()}})),this.add("braces","deletion",(function(e,t,i,s,r){var o=s.doc.getTextRange(r)
if(!r.isMultiLine()&&"{"==o){if(g(i),"}"==s.doc.getLine(r.start.row).substring(r.end.column,r.end.column+1))return r.end.column++,r
n.maybeInsertedBrackets--}})),this.add("parens","insertion",(function(e,t,i,n,r){if("("==r){g(i)
var o=i.getSelectionRange(),a=n.doc.getTextRange(o)
if(""!==a&&i.getWrapBehavioursEnabled())return p(o,a,"(",")")
if(s.isSaneInsertion(i,n))return s.recordAutoInsert(i,n,")"),{text:"()",selection:[1,1]}}else if(")"==r){g(i)
var l=i.getCursorPosition(),h=n.doc.getLine(l.row)
if(")"==h.substring(l.column,l.column+1)&&null!==n.$findOpeningBracket(")",{column:l.column+1,row:l.row})&&s.isAutoInsertedClosing(l,h,r))return s.popAutoInsertedClosing(),{text:"",selection:[1,1]}}})),this.add("parens","deletion",(function(e,t,i,n,s){var r=n.doc.getTextRange(s)
if(!s.isMultiLine()&&"("==r&&(g(i),")"==n.doc.getLine(s.start.row).substring(s.start.column+1,s.start.column+2)))return s.end.column++,s})),this.add("brackets","insertion",(function(e,t,i,n,r){if("["==r){g(i)
var o=i.getSelectionRange(),a=n.doc.getTextRange(o)
if(""!==a&&i.getWrapBehavioursEnabled())return p(o,a,"[","]")
if(s.isSaneInsertion(i,n))return s.recordAutoInsert(i,n,"]"),{text:"[]",selection:[1,1]}}else if("]"==r){g(i)
var l=i.getCursorPosition(),h=n.doc.getLine(l.row)
if("]"==h.substring(l.column,l.column+1)&&null!==n.$findOpeningBracket("]",{column:l.column+1,row:l.row})&&s.isAutoInsertedClosing(l,h,r))return s.popAutoInsertedClosing(),{text:"",selection:[1,1]}}})),this.add("brackets","deletion",(function(e,t,i,n,s){var r=n.doc.getTextRange(s)
if(!s.isMultiLine()&&"["==r&&(g(i),"]"==n.doc.getLine(s.start.row).substring(s.start.column+1,s.start.column+2)))return s.end.column++,s})),this.add("string_dquotes","insertion",(function(e,t,i,n,s){var r=n.$mode.$quotes||d
if(1==s.length&&r[s]){if(this.lineCommentStart&&-1!=this.lineCommentStart.indexOf(s))return
g(i)
var o=s,a=i.getSelectionRange(),l=n.doc.getTextRange(a)
if(!(""===l||1==l.length&&r[l])&&i.getWrapBehavioursEnabled())return p(a,l,o,o)
if(!l){var h=i.getCursorPosition(),c=n.doc.getLine(h.row),u=c.substring(h.column-1,h.column),m=c.substring(h.column,h.column+1),f=n.getTokenAt(h.row,h.column),v=n.getTokenAt(h.row,h.column+1)
if("\\"==u&&f&&/escape/.test(f.type))return null
var w,y=f&&/string|escape/.test(f.type),x=!v||/string|escape/.test(v.type)
if(m==o)(w=y!==x)&&/string\.end/.test(v.type)&&(w=!1)
else{if(y&&!x)return null
if(y&&x)return null
var b=n.$mode.tokenRe
b.lastIndex=0
var C=b.test(u)
b.lastIndex=0
var S=b.test(m),k=n.$mode.$pairQuotesAfter
if(!(k&&k[o]&&k[o].test(u))&&C||S)return null
if(m&&!/[\s;,.})\]\\]/.test(m))return null
var $=c[h.column-2]
if(u==o&&($==o||b.test($)))return null
w=!0}return{text:w?o+o:"",selection:[1,1]}}}})),this.add("string_dquotes","deletion",(function(e,t,i,n,s){var r=n.$mode.$quotes||d,o=n.doc.getTextRange(s)
if(!s.isMultiLine()&&r.hasOwnProperty(o)&&(g(i),n.doc.getLine(s.start.row).substring(s.start.column+1,s.start.column+2)==o))return s.end.column++,s})),!1!==e.closeDocComment&&this.add("doc comment end","insertion",(function(e,t,i,n,s){if("doc-start"===e&&("\n"===s||"\r\n"===s)&&i.selection.isEmpty()){var r=i.getCursorPosition()
if(0===r.column)return
for(var o=n.doc.getLine(r.row),a=n.doc.getLine(r.row+1),l=n.getTokens(r.row),h=0,c=0;c<l.length;c++){h+=l[c].value.length
var u=l[c]
if(h>=r.column){if(h===r.column){if(!/\.doc/.test(u.type))return
if(/\*\//.test(u.value)){var d=l[c+1]
if(!d||!/\.doc/.test(d.type))return}}var g=r.column-(h-u.value.length),p=u.value.indexOf("*/"),m=u.value.indexOf("/**",p>-1?p+2:0)
if(-1!==m&&g>m&&g<m+3)return
if(-1!==p&&-1!==m&&g>=p&&g<=m||!/\.doc/.test(u.type))return
break}}var f=this.$getIndent(o)
if(/\s*\*/.test(a))return/^\s*\*/.test(o)?{text:s+f+"* ",selection:[1,2+f.length,1,2+f.length]}:{text:s+f+" * ",selection:[1,3+f.length,1,3+f.length]}
if(/\/\*\*/.test(o.substring(0,r.column)))return{text:s+f+" * "+s+" "+f+"*/",selection:[1,4+f.length,1,4+f.length]}}}))}).isSaneInsertion=function(e,t){var i=e.getCursorPosition(),n=new a(t,i.row,i.column)
if(!this.$matchTokenType(n.getCurrentToken()||"text",h)){if(/[)}\]]/.test(e.session.getLine(i.row)[i.column]))return!0
var s=new a(t,i.row,i.column+1)
if(!this.$matchTokenType(s.getCurrentToken()||"text",h))return!1}return n.stepForward(),n.getCurrentTokenRow()!==i.row||this.$matchTokenType(n.getCurrentToken()||"text",c)},s.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},s.recordAutoInsert=function(e,t,i){var s=e.getCursorPosition(),r=t.doc.getLine(s.row)
this.isAutoInsertedClosing(s,r,n.autoInsertedLineEnd[0])||(n.autoInsertedBrackets=0),n.autoInsertedRow=s.row,n.autoInsertedLineEnd=i+r.substr(s.column),n.autoInsertedBrackets++},s.recordMaybeInsert=function(e,t,i){var s=e.getCursorPosition(),r=t.doc.getLine(s.row)
this.isMaybeInsertedClosing(s,r)||(n.maybeInsertedBrackets=0),n.maybeInsertedRow=s.row,n.maybeInsertedLineStart=r.substr(0,s.column)+i,n.maybeInsertedLineEnd=r.substr(s.column),n.maybeInsertedBrackets++},s.isAutoInsertedClosing=function(e,t,i){return n.autoInsertedBrackets>0&&e.row===n.autoInsertedRow&&i===n.autoInsertedLineEnd[0]&&t.substr(e.column)===n.autoInsertedLineEnd},s.isMaybeInsertedClosing=function(e,t){return n.maybeInsertedBrackets>0&&e.row===n.maybeInsertedRow&&t.substr(e.column)===n.maybeInsertedLineEnd&&t.substr(0,e.column)==n.maybeInsertedLineStart},s.popAutoInsertedClosing=function(){n.autoInsertedLineEnd=n.autoInsertedLineEnd.substr(1),n.autoInsertedBrackets--},s.clearMaybeInsertedClosing=function(){n&&(n.maybeInsertedBrackets=0,n.maybeInsertedRow=-1)},r.inherits(s,o),t._=s},9860:(e,t,i)=>{var n=i(8297)
const{TokenIterator:s}=i(1871)
var r=i(5801)._,o=i(1358).F,a=function(){var e=new o({closeCurlyBraces:!0}).getBehaviours()
this.addBehaviours(e),this.inherit(r),this.add("autoclosing-fragment","insertion",(function(e,t,i,n,r){if(">"==r){var o=i.getSelectionRange().start,a=new s(n,o.row,o.column),l=a.getCurrentToken()||a.stepBackward()
if(!l)return
if("<"==l.value)return{text:"></>",selection:[1,1]}}}))}
n.inherits(a,r),t.d=a},1358:(e,t,i)=>{function n(e,t){return e&&e.type.lastIndexOf(t+".xml")>-1}var s=i(8297),r=i(8104).Q,o=i(1871).TokenIterator,a=function(){this.add("string_dquotes","insertion",(function(e,t,i,s,r){if('"'==r||"'"==r){var a=r,l=s.doc.getTextRange(i.getSelectionRange())
if(""!==l&&"'"!==l&&'"'!=l&&i.getWrapBehavioursEnabled())return{text:a+l+a,selection:!1}
var h=i.getCursorPosition(),c=s.doc.getLine(h.row).substring(h.column,h.column+1),u=new o(s,h.row,h.column),d=u.getCurrentToken()
if(c==a&&(n(d,"attribute-value")||n(d,"string")))return{text:"",selection:[1,1]}
if(d||(d=u.stepBackward()),!d)return
for(;n(d,"tag-whitespace")||n(d,"whitespace");)d=u.stepBackward()
var g=!c||c.match(/\s/)
if(n(d,"attribute-equals")&&(g||">"==c)||n(d,"decl-attribute-equals")&&(g||"?"==c))return{text:a+a,selection:[1,1]}}})),this.add("string_dquotes","deletion",(function(e,t,i,n,s){var r=n.doc.getTextRange(s)
if(!s.isMultiLine()&&('"'==r||"'"==r)&&n.doc.getLine(s.start.row).substring(s.start.column+1,s.start.column+2)==r)return s.end.column++,s})),this.add("autoclosing","insertion",(function(e,t,i,s,r){if(">"==r){var a=i.getSelectionRange().start,l=new o(s,a.row,a.column),h=l.getCurrentToken()||l.stepBackward()
if(!h||!(n(h,"tag-name")||n(h,"tag-whitespace")||n(h,"attribute-name")||n(h,"attribute-equals")||n(h,"attribute-value")))return
if(n(h,"reference.attribute-value"))return
if(n(h,"attribute-value")){var c=l.getCurrentTokenColumn()+h.value.length
if(a.column<c)return
if(a.column==c){var u=l.stepForward()
if(u&&n(u,"attribute-value"))return
l.stepBackward()}}if(/^\s*>/.test(s.getLine(a.row).slice(a.column)))return
for(;!n(h,"tag-name");)if("<"==(h=l.stepBackward()).value){h=l.stepForward()
break}var d=l.getCurrentTokenRow(),g=l.getCurrentTokenColumn()
if(n(l.stepBackward(),"end-tag-open"))return
var p=h.value
if(d==a.row&&(p=p.substring(0,a.column-g)),this.voidElements&&this.voidElements.hasOwnProperty(p.toLowerCase()))return
return{text:"></"+p+">",selection:[1,1]}}})),this.add("autoindent","insertion",(function(e,t,i,s,r){if("\n"==r){var a=i.getCursorPosition(),l=s.getLine(a.row),h=new o(s,a.row,a.column),c=h.getCurrentToken()
if(n(c,"")&&-1!==c.type.indexOf("tag-close")){if("/>"==c.value)return
for(;c&&-1===c.type.indexOf("tag-name");)c=h.stepBackward()
if(!c)return
var u=c.value,d=h.getCurrentTokenRow()
if(!(c=h.stepBackward())||-1!==c.type.indexOf("end-tag"))return
if(this.voidElements&&!this.voidElements[u]||!this.voidElements){var g=s.getTokenAt(a.row,a.column+1),p=(l=s.getLine(d),this.$getIndent(l)),m=p+s.getTabString()
return g&&"</"===g.value?{text:"\n"+m+"\n"+p,selection:[1,m.length,1,m.length]}:{text:"\n"+m}}}}}))}
s.inherits(a,r),t.F=a},4411:(e,t,i)=>{var n=i(8297),s=i(4074).Q,r=i(6034).FoldMode,o=t.l=function(e){e&&(this.foldingStartMarker=RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))}
n.inherits(o,r),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,i){var n=e.getLine(i)
if(this.singleLineBlockCommentRe.test(n)&&!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return""
var s=this._getFoldWidgetBase(e,t,i)
return!s&&this.startRegionRe.test(n)?"start":s},this.getFoldWidgetRange=function(e,t,i,n){var s,r=e.getLine(i)
if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,i)
if(s=r.match(this.foldingStartMarker)){var o=s.index
if(s[1])return this.openingBracketBlock(e,s[1],i,o)
var a=e.getCommentFoldRange(i,o+s[0].length,1)
return a&&!a.isMultiLine()&&(n?a=this.getSectionRange(e,i):"all"!=t&&(a=null)),a}return"markbegin"!==t&&(s=r.match(this.foldingStopMarker))?(o=s.index+s[0].length,s[1]?this.closingBracketBlock(e,s[1],i,o):e.getCommentFoldRange(i,o,-1)):void 0},this.getSectionRange=function(e,t){for(var i=e.getLine(t),n=i.search(/\S/),r=t,o=i.length,a=t+=1,l=e.getLength();++t<l;){var h=(i=e.getLine(t)).search(/\S/)
if(-1!==h){if(n>h)break
var c=this.getFoldWidgetRange(e,"all",t)
if(c){if(c.start.row<=r)break
if(c.isMultiLine())t=c.end.row
else if(n==h)break}a=t}}return new s(r,o,a,e.getLine(a).length)},this.getCommentRegionBlock=function(e,t,i){for(var n=t.search(/\s*$/),r=e.getLength(),o=i,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++i<r;){t=e.getLine(i)
var h=a.exec(t)
if(h&&(h[1]?l--:l++,!l))break}if(i>o)return new s(o,n,i,t.length)}}.call(o.prototype)},6034:(e,t,i)=>{var n=i(4074).Q,s=t.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(e,t,i){var n=e.getLine(i)
return this.foldingStartMarker.test(n)?"start":"markbeginend"==t&&this.foldingStopMarker&&this.foldingStopMarker.test(n)?"end":""},this.getFoldWidgetRange=function(){return null},this.indentationBlock=function(e,t,i){var s=/\S/,r=e.getLine(t),o=r.search(s)
if(-1!=o){for(var a=i||r.length,l=e.getLength(),h=t,c=t;++t<l;){var u=e.getLine(t).search(s)
if(-1!=u){if(u<=o){var d=e.getTokenAt(t,0)
if(!d||"string"!==d.type)break}c=t}}if(c>h){var g=e.getLine(c).length
return new n(h,a,c,g)}}},this.openingBracketBlock=function(e,t,i,s,r){var o={row:i,column:s+1},a=e.$findClosingBracket(t,o,r)
if(a){var l=e.foldWidgets[a.row]
return null==l&&(l=e.getFoldWidget(a.row)),"start"==l&&a.row>o.row&&(a.row--,a.column=e.getLine(a.row).length),n.fromPoints(o,a)}},this.closingBracketBlock=function(e,t,i,s){var r={row:i,column:s},o=e.$findOpeningBracket(t,r)
if(o)return o.column++,r.column--,n.fromPoints(o,r)}}).call(s.prototype)},6826:(e,t,i)=>{var n=i(8297),s=i(8524).l,r=i(4411).l,o=t.l=function(e){e&&(this.foldingStartMarker=RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))),this.xmlFoldMode=new s}
n.inherits(o,r),function(){this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,i){var n=this.getFoldWidgetBase(e,t,i)
return n||this.xmlFoldMode.getFoldWidget(e,t,i)},this.getFoldWidgetRange=function(e,t,i,n){var s=this.getFoldWidgetRangeBase(e,t,i,n)
return s||this.xmlFoldMode.getFoldWidgetRange(e,t,i)}}.call(o.prototype)},8524:(e,t,i)=>{function n(e,t){return e.type.lastIndexOf(t+".xml")>-1}var s=i(8297),r=i(4074).Q,o=i(6034).FoldMode,a=t.l=function(e,t){o.call(this),this.voidElements=e||{},this.optionalEndTags=s.mixin({},this.voidElements),t&&s.mixin(this.optionalEndTags,t)}
s.inherits(a,o)
var l=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};(function(){this.getFoldWidget=function(e,t,i){var n=this._getFirstTagInLine(e,i)
return n?n.closing||!n.tagName&&n.selfClosing?"markbeginend"===t?"end":"":!n.tagName||n.selfClosing||this.voidElements.hasOwnProperty(n.tagName.toLowerCase())||this._findEndTagInLine(e,i,n.tagName,n.end.column)?"":"start":this.getCommentFoldWidget(e,i)},this.getCommentFoldWidget=function(e,t){return/comment/.test(e.getState(t))&&/<!-/.test(e.getLine(t))?"start":""},this._getFirstTagInLine=function(e,t){for(var i=e.getTokens(t),s=new l,r=0;r<i.length;r++){var o=i[r]
if(n(o,"tag-open")){if(s.end.column=s.start.column+o.value.length,s.closing=n(o,"end-tag-open"),!(o=i[++r]))return null
if(s.tagName=o.value,""===o.value){if(!(o=i[++r]))return null
s.tagName=o.value}for(s.end.column+=o.value.length,r++;r<i.length;r++)if(o=i[r],s.end.column+=o.value.length,n(o,"tag-close")){s.selfClosing="/>"==o.value
break}return s}if(n(o,"tag-close"))return s.selfClosing="/>"==o.value,s
s.start.column+=o.value.length}return null},this._findEndTagInLine=function(e,t,i,s){for(var r=e.getTokens(t),o=0,a=0;a<r.length;a++){var l=r[a]
if(!((o+=l.value.length)<s-1)&&n(l,"end-tag-open")&&(n(l=r[a+1],"tag-name")&&""===l.value&&(l=r[a+2]),l&&l.value==i))return!0}return!1},this.getFoldWidgetRange=function(e,t,i){if(!this._getFirstTagInLine(e,i))return this.getCommentFoldWidget(e,i)&&e.getCommentFoldRange(i,e.getLine(i).length)
var n=e.getMatchingTags({row:i,column:0})
return n?new r(n.openTag.end.row,n.openTag.end.column,n.closeTag.start.row,n.closeTag.start.column):void 0}}).call(a.prototype)},6968:(e,t,i)=>{var n=i(8297),s=i(6044).K,r=i(4211).z,o=i(5274).G,a=i(6862).WorkerClient,l=i(9860).d,h=i(6826).l,c=function(){this.HighlightRules=r,this.$outdent=new o,this.$behaviour=new l,this.foldingRules=new h}
n.inherits(c,s),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$quotes={'"':'"',"'":"'","`":"`"},this.$pairQuotesAfter={"`":/\w/},this.getNextLineIndent=function(e,t,i){var n=this.$getIndent(t),s=this.getTokenizer().getLineTokens(t,e),r=s.tokens,o=s.state
if(r.length&&"comment"==r[r.length-1].type)return n
if("start"==e||"no_regex"==e)t.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/)&&(n+=i)
else if("doc-start"==e&&("start"==o||"no_regex"==o))return""
return n},this.checkOutdent=function(e,t,i){return this.$outdent.checkOutdent(t,i)},this.autoOutdent=function(e,t,i){this.$outdent.autoOutdent(t,i)},this.createWorker=function(e){var t=new a(["ace"],"ace/mode/javascript_worker","JavaScriptWorker")
return t.attachToDocument(e.getDocument()),t.on("annotate",(function(t){e.setAnnotations(t.data)})),t.on("terminate",(function(){e.clearAnnotations()})),t},this.$id="ace/mode/javascript",this.snippetFileId="ace/snippets/javascript"}.call(c.prototype),t.K=c},4211:(e,t,i)=>{function n(){var e=l.replace("\\d","\\d\\-"),t={onMatch:function(e,t,i){var n="/"==e.charAt(1)?2:1
return 1==n?(t!=this.nextState?i.unshift(this.next,this.nextState,0):i.unshift(this.next),i[2]++):2==n&&t==this.nextState&&(i[1]--,(!i[1]||i[1]<0)&&(i.shift(),i.shift())),[{type:"meta.tag.punctuation."+(1==n?"":"end-")+"tag-open.xml",value:e.slice(0,n)},{type:"meta.tag.tag-name.xml",value:e.substr(n)}]},regex:"</?(?:"+e+"|(?=>))",next:"jsxAttributes",nextState:"jsx"}
this.$rules.start.unshift(t)
var i={regex:"{",token:"paren.quasi.start",push:"start"}
this.$rules.jsx=[i,t,{include:"reference"},{defaultToken:"string.xml"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(e,t,i){return t==i[0]&&i.shift(),2==e.length&&(i[0]==this.nextState&&i[1]--,(!i[1]||i[1]<0)&&i.splice(0,2)),this.next=i[0]||"start",[{type:this.token,value:e}]},nextState:"jsx"},i,s("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:e},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},t],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function s(e){return[{token:"comment",regex:/\/\*/,next:[o.getTagRule(),{token:"comment",regex:"\\*\\/",next:e||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[o.getTagRule(),{token:"comment",regex:"$|^",next:e||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}var r=i(8297),o=i(9453).U,a=i(3151).r,l="[a-zA-Z\\$_\xa1-\uffff][a-zA-Z\\d\\$_\xa1-\uffff]*",h=function(e){var t={"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},i=this.createKeywordMapper(t,"identifier"),r="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)",a="(function)(\\s*)(\\*?)",h={token:["identifier","text","paren.lparen"],regex:"(\\b(?!"+Object.values(t).join("|")+"\\b)"+l+")(\\s*)(\\()"}
this.$rules={no_regex:[o.getStartRule("doc-start"),s("no_regex"),h,{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+l+")(\\s*)(=)(\\s*)"+a+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))("+l+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+l+")(\\s*)(:)(\\s*)"+a+"(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)"+a+"(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"from(?=\\s*('|\"))"},{token:"keyword",regex:"(?:case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void)\\b",next:"start"},{token:"support.constant",regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|debug|time|trace|timeEnd|assert)\b/},{token:i,regex:l},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:"keyword.operator",regex:/=/},{token:["storage.type","text","storage.type","text","paren.lparen"],regex:a+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:"prototype"},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:l},{regex:"",token:"empty",next:"no_regex"}],start:[o.getStartRule("doc-start"),s("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],default_parameter:[{token:"string",regex:"'(?=.)",push:[{token:"string",regex:"'|$",next:"pop"},{include:"qstring"}]},{token:"string",regex:'"(?=.)',push:[{token:"string",regex:'"|$',next:"pop"},{include:"qqstring"}]},{token:"constant.language",regex:"null|Infinity|NaN|undefined"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:"punctuation.operator",regex:",",next:"function_arguments"},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],function_arguments:[s("function_arguments"),{token:"variable.parameter",regex:l},{token:"punctuation.operator",regex:","},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:r},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:r},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},e&&e.noES6||(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(e,t,i){if(this.next="{"==e?this.nextState:"","{"==e&&i.length)i.unshift("start",t)
else if("}"==e&&i.length&&(i.shift(),this.next=i.shift(),-1!=this.next.indexOf("string")||-1!=this.next.indexOf("jsx")))return"paren.quasi.end"
return"{"==e?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:r},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]},{token:["variable.parameter","text"],regex:"("+l+")(\\s*)(?=\\=>)"},{token:"paren.lparen",regex:"(\\()(?=[^\\(]+\\s*=>)",next:"function_arguments"},{token:"variable.language",regex:"(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b"}),this.$rules.function_arguments.unshift({token:"keyword.operator",regex:"=",next:"default_parameter"},{token:"keyword.operator",regex:"\\.{3}"}),this.$rules.property.unshift({token:"support.function",regex:"(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()"},{token:"constant.language",regex:"(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b"}),e&&0==e.jsx||n.call(this)),this.embedRules(o,"doc-",[o.getEndRule("no_regex")]),this.normalizeRules()}
r.inherits(h,a),t.z=h},9453:(e,t,i)=>{var n=i(8297),s=i(3151).r,r=function(){this.$rules={start:[{token:["comment.doc.tag","comment.doc.text","lparen.doc"],regex:"(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:["rparen.doc","text.doc","variable.parameter.doc","lparen.doc","variable.parameter.doc","rparen.doc"],regex:/(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.\-\'\" ]+)(\])))/,next:"pop"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","lparen.doc"],regex:"(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|implements|external|exception|throws|enum|define|extends))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:'(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|requires|param|implements|function|extends|typedef|mixes|constructor|var|memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#.:/~"\\-]*)?'},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:"(@method)(\\s+)(\\w[\\w.\\(\\)]*)"},{token:"comment.doc.tag",regex:"@access\\s+(?:private|public|protected)"},{token:"comment.doc.tag",regex:"@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)"},{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},r.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}],"doc-syntax":[{token:"operator.doc",regex:/[|:]/},{token:"paren.doc",regex:/[\[\]]/}]},this.normalizeRules()}
n.inherits(r,s),r.getTagRule=function(){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},r.getStartRule=function(e){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:e}},r.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.U=r},5274:(e,t,i)=>{var n=i(4074).Q,s=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var i=e.getLine(t).match(/^(\s*\})/)
if(!i)return 0
var s=i[1].length,r=e.findMatchingBracket({row:t,column:s})
if(!r||r.row==t)return 0
var o=this.$getIndent(e.getLine(r.row))
e.replace(new n(t,0,t,s-1),o)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(s.prototype),t.G=s},6044:(e,t,i)=>{var n,s=i(5133),r=i(9266)._,o=i(3151).r,a=i(5801)._,l=i(3196),h=i(3927),c=i(1871).TokenIterator,u=i(4074).Q;(function(){this.$defaultBehaviour=new a,this.tokenRe=RegExp("^["+l.wordChars+"\\$_]+","g"),this.nonTokenRe=RegExp("^(?:[^"+l.wordChars+"\\$_]|\\s])+","g"),this.getTokenizer=function(){return this.$tokenizer||(this.$highlightRules=this.$highlightRules||new this.HighlightRules(this.$highlightRuleConfig),this.$tokenizer=new r(this.$highlightRules.getRules())),this.$tokenizer},this.lineCommentStart="",this.blockComment="",this.toggleCommentLines=function(e,t,i,n){function s(e){for(var t=i;t<=n;t++)e(r.getLine(t),t)}var r=t.doc,o=!0,a=!0,l=1/0,c=t.getTabSize(),u=!1
if(this.lineCommentStart){Array.isArray(this.lineCommentStart)?(f=this.lineCommentStart.map(h.escapeRegExp).join("|"),p=this.lineCommentStart[0]):(f=h.escapeRegExp(this.lineCommentStart),p=this.lineCommentStart),f=RegExp("^(\\s*)(?:"+f+") ?"),u=t.getUseSoftTabs(),y=function(e,t){var i=e.match(f)
if(i){var n=i[1].length,s=i[0].length
g(e,n,s)||" "!=i[0][s-1]||s--,r.removeInLine(t,n,s)}}
var d=p+" ",g=(w=function(e,t){o&&!/\S/.test(e)||(g(e,l,l)?r.insertInLine({row:t,column:l},d):r.insertInLine({row:t,column:l},p))},x=function(e){return f.test(e)},function(e,t,i){for(var n=0;t--&&" "==e.charAt(t);)n++
if(n%c!=0)return!1
for(n=0;" "==e.charAt(i++);)n++
return c>2?n%c!=c-1:n%c==0})}else{if(!this.blockComment)return!1
var p=this.blockComment.start,m=this.blockComment.end,f=RegExp("^(\\s*)(?:"+h.escapeRegExp(p)+")"),v=RegExp("(?:"+h.escapeRegExp(m)+")\\s*$"),w=function(e,t){x(e,t)||o&&!/\S/.test(e)||(r.insertInLine({row:t,column:e.length},m),r.insertInLine({row:t,column:l},p))},y=function(e,t){var i;(i=e.match(v))&&r.removeInLine(t,e.length-i[0].length,e.length),(i=e.match(f))&&r.removeInLine(t,i[1].length,i[0].length)},x=function(e,i){if(f.test(e))return!0
for(var n=t.getTokens(i),s=0;s<n.length;s++)if("comment"===n[s].type)return!0}}var b=1/0
s((function(e,t){var i=e.search(/\S/);-1!==i?(i<l&&(l=i),a&&!x(e,t)&&(a=!1)):b>e.length&&(b=e.length)})),l==1/0&&(l=b,o=!1,a=!1),u&&l%c!=0&&(l=Math.floor(l/c)*c),s(a?y:w)},this.toggleBlockComment=function(e,t,i,n){var s=this.blockComment
if(s){!s.start&&s[0]&&(s=s[0])
var r,o,a=(m=new c(t,n.row,n.column)).getCurrentToken(),l=(t.selection,t.selection.toOrientedRange())
if(a&&/comment/.test(a.type)){for(var h,d;a&&/comment/.test(a.type);){if(-1!=(f=a.value.indexOf(s.start))){var g=m.getCurrentTokenRow(),p=m.getCurrentTokenColumn()+f
h=new u(g,p,g,p+s.start.length)
break}a=m.stepBackward()}var m
for(a=(m=new c(t,n.row,n.column)).getCurrentToken();a&&/comment/.test(a.type);){var f
if(-1!=(f=a.value.indexOf(s.end))){g=m.getCurrentTokenRow(),p=m.getCurrentTokenColumn()+f,d=new u(g,p,g,p+s.end.length)
break}a=m.stepForward()}d&&t.remove(d),h&&(t.remove(h),r=h.start.row,o=-s.start.length)}else o=s.start.length,r=i.start.row,t.insert(i.end,s.end),t.insert(i.start,s.start)
l.start.row==r&&(l.start.column+=o),l.end.row==r&&(l.end.column+=o),t.selection.fromOrientedRange(l)}},this.getNextLineIndent=function(e,t){return this.$getIndent(t)},this.checkOutdent=function(){return!1},this.autoOutdent=function(){},this.$getIndent=function(e){return e.match(/^\s*/)[0]},this.createWorker=function(){return null},this.createModeDelegates=function(e){this.$embeds=[],this.$modes={}
for(let r in e)if(e[r]){var t=e[r],i=t.prototype.$id,n=s.$modes[i]
n||(s.$modes[i]=n=new t),s.$modes[r]||(s.$modes[r]=n),this.$embeds.push(r),this.$modes[r]=n}var r=["toggleBlockComment","toggleCommentLines","getNextLineIndent","checkOutdent","autoOutdent","transformAction","getCompletions"]
for(let e=0;e<r.length;e++)!function(t){var i=r[e],n=t[i]
t[r[e]]=function(){return this.$delegator(i,arguments,n)}}(this)},this.$delegator=function(e,t,i){var n=t[0]||"start"
if("string"!=typeof n){if(Array.isArray(n[2])){var s=n[2][n[2].length-1]
if(o=this.$modes[s])return o[e].apply(o,[n[1]].concat([].slice.call(t,1)))}n=n[0]||"start"}for(var r=0;r<this.$embeds.length;r++)if(this.$modes[this.$embeds[r]]){var o,a=n.split(this.$embeds[r])
if(!a[0]&&a[1])return t[0]=a[1],(o=this.$modes[this.$embeds[r]])[e].apply(o,t)}var l=i.apply(this,t)
return i?l:void 0},this.transformAction=function(e,t,i,n,s){if(this.$behaviour){var r=this.$behaviour.getBehaviours()
for(var o in r)if(r[o][t]){var a=r[o][t].apply(this,arguments)
if(a)return a}}},this.getKeywords=function(e){if(!this.completionKeywords){var t=this.$tokenizer.rules,i=[]
for(var n in t)for(var s=t[n],r=0,o=s.length;r<o;r++)if("string"==typeof s[r].token)/keyword|support|storage/.test(s[r].token)&&i.push(s[r].regex)
else if("object"==typeof s[r].token)for(var a=0,l=s[r].token.length;a<l;a++)/keyword|support|storage/.test(s[r].token[a])&&(n=s[r].regex.match(/\(.+?\)/g)[a],i.push(n.substr(1,n.length-2)))
this.completionKeywords=i}return e?i.concat(this.$keywordList||[]):this.$keywordList},this.$createKeywordList=function(){return this.$highlightRules||this.getTokenizer(),this.$keywordList=this.$highlightRules.$keywordList||[]},this.getCompletions=function(){return(this.$keywordList||this.$createKeywordList()).map((function(e){return{name:e,value:e,score:0,meta:"keyword"}}))},this.$id="ace/mode/text"}).call((n=function(){this.HighlightRules=o}).prototype),t.K=n},3151:(e,t,i)=>{const n=i(2001).deepCopy
var s;(function(){this.addRules=function(e,t){if(t)for(var i in e){for(var n=e[i],s=0;s<n.length;s++){var r=n[s];(r.next||r.onMatch)&&("string"==typeof r.next&&0!==r.next.indexOf(t)&&(r.next=t+r.next),r.nextState&&0!==r.nextState.indexOf(t)&&(r.nextState=t+r.nextState))}this.$rules[t+i]=n}else for(var i in e)this.$rules[i]=e[i]},this.getRules=function(){return this.$rules},this.embedRules=function(e,t,i,s,r){var o="function"==typeof e?(new e).getRules():e
if(s)for(var a=0;a<s.length;a++)s[a]=t+s[a]
else for(var l in s=[],o)s.push(t+l)
if(this.addRules(o,t),i){var h=Array.prototype[r?"push":"unshift"]
for(a=0;a<s.length;a++)h.apply(this.$rules[s[a]],n(i))}this.$embeds||(this.$embeds=[]),this.$embeds.push(t)},this.getEmbeds=function(){return this.$embeds}
var e=function(e,t){return("start"!=e||t.length)&&t.unshift(this.nextState,e),this.nextState},t=function(e,t){return t.shift(),t.shift()||"start"}
this.normalizeRules=function(){var i=0,n=this.$rules
Object.keys(n).forEach((function s(r){var o=n[r]
o.processed=!0
for(var a=0;a<o.length;a++){var l=o[a],h=null
Array.isArray(l)&&(h=l,l={}),!l.regex&&l.start&&(l.regex=l.start,l.next||(l.next=[]),l.next.push({defaultToken:l.token},{token:l.token+".end",regex:l.end||l.start,next:"pop"}),l.token=l.token+".start",l.push=!0)
var c=l.next||l.push
if(c&&Array.isArray(c)){var u=l.stateName
u||("string"!=typeof(u=l.token)&&(u=u[0]||""),n[u]&&(u+=i++)),n[u]=c,l.next=u,s(u)}else"pop"==c&&(l.next=t)
if(l.push&&(l.nextState=l.next||l.push,l.next=e,delete l.push),l.rules)for(var d in l.rules)n[d]?n[d].push&&n[d].push.apply(n[d],l.rules[d]):n[d]=l.rules[d]
var g="string"==typeof l?l:l.include
if(g&&("$self"===g&&(g="start"),h=Array.isArray(g)?g.map((function(e){return n[e]})):n[g]),h){var p=[a,1].concat(h)
l.noEscape&&(p=p.filter((function(e){return!e.next}))),o.splice.apply(o,p),a--}l.keywordMap&&(l.token=this.createKeywordMapper(l.keywordMap,l.defaultToken||"text",l.caseInsensitive),delete l.defaultToken)}}),this)},this.createKeywordMapper=function(e,t,i,n){var s=Object.create(null)
return this.$keywordList=[],Object.keys(e).forEach((function(t){for(var r=e[t].split(n||"|"),o=r.length;o--;){var a=r[o]
this.$keywordList.push(a),i&&(a=a.toLowerCase()),s[a]=t}}),this),e=null,i?function(e){return s[e.toLowerCase()]||t}:function(e){return s[e]||t}},this.getKeywords=function(){return this.$keywords}}).call((s=function(){this.$rules={start:[{token:"empty_line",regex:"^$"},{defaultToken:"text"}]}}).prototype),t.r=s},984:(e,t,i)=>{var n=i(8297),s=i(6968).K,r=i(6563).n,o=i(4411).l,a=i(5274).G,l=function(){this.HighlightRules=r,this.$outdent=new a,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new o}
n.inherits(l,s),function(){this.createWorker=function(){return null},this.$id="ace/mode/typescript"}.call(l.prototype),t.K=l},6563:(e,t,i)=>{var n=i(8297),s=i(4211).z,r=function(e){var t=new s({jsx:1==(e&&e.jsx)}).getRules()
t.no_regex=[{token:["storage.type","text","entity.name.function.ts"],regex:"(function)(\\s+)([a-zA-Z0-9$_\xa1-\uffff][a-zA-Z0-9d$_\xa1-\uffff]*)"},{token:"keyword",regex:"(?:\\b(constructor|declare|interface|as|AS|public|private|extends|export|super|readonly|module|namespace|abstract|implements)\\b)"},{token:["keyword","storage.type.variable.ts"],regex:"(class|type)(\\s+[a-zA-Z0-9_?.$][\\w?.$]*)"},{token:"keyword",regex:"\\b(?:super|export|import|keyof|infer)\\b"},{token:["storage.type.variable.ts"],regex:"(?:\\b(this\\.|string\\b|bool\\b|boolean\\b|number\\b|true\\b|false\\b|undefined\\b|any\\b|null\\b|(?:unique )?symbol\\b|object\\b|never\\b|enum\\b))"}].concat(t.no_regex),this.$rules=t}
n.inherits(r,s),t.n=r},1689:(e,t,i)=>{var n=i(215),s=i(2507),r=i(2980).m_,o=i(5133).nls
i(3927),t.Y=function(e){function t(){r&&(r=clearTimeout(r)),c.isOpen&&(c.hideTooltip(),l.off("mousewheel",t))}function i(e){c.setPosition(e.x,e.y)}var r,o,l=e.editor,h=l.renderer.$gutterLayer,c=new a(l)
e.editor.setDefaultHandler("guttermousedown",(function(t){if(l.isFocused()&&0==t.getButton()&&"foldWidgets"!=h.getRegion(t)){var i=t.getDocumentPosition().row,n=l.session.selection
if(t.getShiftKey())n.selectTo(i,0)
else{if(2==t.domEvent.detail)return l.selectAll(),t.preventDefault()
e.$clickSelection=l.selection.getLineRange(i)}return e.setState("selectByLines"),e.captureMouse(t),t.preventDefault()}})),e.editor.setDefaultHandler("guttermousemove",(function(s){var a=s.domEvent.target||s.domEvent.srcElement
if(n.hasCssClass(a,"ace_fold-widget"))return t()
c.isOpen&&e.$tooltipFollowsMouse&&i(s),o=s,r||(r=setTimeout((function(){r=null,o&&!e.isMousePressed?function(){var n=o.getDocumentPosition().row
if(n==l.session.getLength()){var s=l.renderer.pixelToScreenCoordinates(0,o.y).row,r=o.$pos
if(s>l.session.documentToScreenRow(r.row,r.column))return t()}if(c.showTooltip(n),c.isOpen)if(l.on("mousewheel",t),e.$tooltipFollowsMouse)i(o)
else{var a=o.getGutterRow(),u=h.$lines.get(a)
if(u){var d=u.element.querySelector(".ace_gutter_annotation").getBoundingClientRect(),g=c.getElement().style
g.left=d.right+"px",g.top=d.bottom+"px"}else i(o)}}():t()}),50))})),s.addListener(l.renderer.$gutter,"mouseout",(function(){o=null,c.isOpen&&!r&&(r=setTimeout((function(){r=null,t()}),50))}),l),l.on("changeSession",t),l.on("input",t)}
class a extends r{constructor(e){super(e.container),this.editor=e}setPosition(e,t){var i=window.innerWidth||document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight,s=this.getWidth(),o=this.getHeight();(e+=15)+s>i&&(e-=e+s-i),(t+=15)+o>n&&(t-=20+o),r.prototype.setPosition.call(this,e,t)}static get annotationLabels(){return{error:{singular:o("gutter-tooltip.aria-label.error.singular","error"),plural:o("gutter-tooltip.aria-label.error.plural","errors")},security:{singular:o("gutter-tooltip.aria-label.security.singular","security finding"),plural:o("gutter-tooltip.aria-label.security.plural","security findings")},warning:{singular:o("gutter-tooltip.aria-label.warning.singular","warning"),plural:o("gutter-tooltip.aria-label.warning.plural","warnings")},info:{singular:o("gutter-tooltip.aria-label.info.singular","information message"),plural:o("gutter-tooltip.aria-label.info.plural","information messages")},hint:{singular:o("gutter-tooltip.aria-label.hint.singular","suggestion"),plural:o("gutter-tooltip.aria-label.hint.plural","suggestions")}}}showTooltip(e){var t,i=this.editor.renderer.$gutterLayer,s=i.$annotations[e]
t=s?{displayText:Array.from(s.displayText),type:Array.from(s.type)}:{displayText:[],type:[]}
var r=i.session.getFoldLine(e)
if(r&&i.$showFoldedAnnotations){var o,l={error:[],security:[],warning:[],info:[],hint:[]},h={error:1,security:2,warning:3,info:4,hint:5}
for(let t=e+1;t<=r.end.row;t++)if(i.$annotations[t])for(var c=0;c<i.$annotations[t].text.length;c++){var u=i.$annotations[t].type[c]
l[u].push(i.$annotations[t].text[c]),(!o||h[u]<h[o])&&(o=u)}if(["error","security","warning"].includes(o)){var d=a.annotationsToSummaryString(l)+" in folded code."
t.displayText.push(d),t.type.push(o+"_fold")}}if(0===t.displayText.length)return this.hide()
var g={error:[],security:[],warning:[],info:[],hint:[]},p=i.$useSvgGutterIcons?"ace_icon_svg":"ace_icon"
for(let e=0;e<t.displayText.length;e++){var m=n.createElement("span"),f=n.createElement("span")
f.classList.add("ace_"+t.type[e],p),f.setAttribute("aria-label",""+a.annotationLabels[t.type[e].replace("_fold","")].singular),f.setAttribute("role","img"),f.appendChild(n.createTextNode(" ")),m.appendChild(f),m.appendChild(n.createTextNode(t.displayText[e])),m.appendChild(n.createElement("br")),g[t.type[e].replace("_fold","")].push(m)}var v=this.getElement()
n.removeChildren(v),g.error.forEach((e=>v.appendChild(e))),g.security.forEach((e=>v.appendChild(e))),g.warning.forEach((e=>v.appendChild(e))),g.info.forEach((e=>v.appendChild(e))),g.hint.forEach((e=>v.appendChild(e))),v.setAttribute("aria-live","polite"),this.isOpen||(this.setTheme(this.editor.renderer.theme),this.setClassName("ace_gutter-tooltip")),this.show(),this.editor._signal("showGutterTooltip",this)}hideTooltip(){this.$element.removeAttribute("aria-live"),this.hide(),this.editor._signal("hideGutterTooltip",this)}static annotationsToSummaryString(e){const t=[],i=["error","security","warning","info","hint"]
for(const n of i){if(!e[n].length)continue
const i=1===e[n].length?a.annotationLabels[n].singular:a.annotationLabels[n].plural
t.push(`${e[n].length} ${i}`)}return t.join(", ")}}t.Z=a},8636:(e,t,i)=>{function n(e,t){if(e.start.row==e.end.row)var i=2*t.column-e.start.column-e.end.column
else if(e.start.row!=e.end.row-1||e.start.column||e.end.column)i=2*t.row-e.start.row-e.end.row
else var i=t.column-4
return i<0?{cursor:e.start,anchor:e.end}:{cursor:e.end,anchor:e.start}}var s=i(6483)
class r{constructor(e){e.$clickSelection=null
var t=e.editor
t.setDefaultHandler("mousedown",this.onMouseDown.bind(e)),t.setDefaultHandler("dblclick",this.onDoubleClick.bind(e)),t.setDefaultHandler("tripleclick",this.onTripleClick.bind(e)),t.setDefaultHandler("quadclick",this.onQuadClick.bind(e)),t.setDefaultHandler("mousewheel",this.onMouseWheel.bind(e)),["select","startSelect","selectEnd","selectAllEnd","selectByWordsEnd","selectByLinesEnd","dragWait","dragWaitEnd","focusWait"].forEach((function(t){e[t]=this[t]}),this),e.selectByLines=this.extendSelectionBy.bind(e,"getLineRange"),e.selectByWords=this.extendSelectionBy.bind(e,"getWordRange")}onMouseDown(e){var t=e.inSelection(),i=e.getDocumentPosition()
this.mousedownEvent=e
var n=this.editor,r=e.getButton()
return 0!==r?((n.getSelectionRange().isEmpty()||1==r)&&n.selection.moveToPosition(i),void(2==r&&(n.textInput.onContextMenu(e.domEvent),s.isMozilla||e.preventDefault()))):(this.mousedownEvent.time=Date.now(),!t||n.isFocused()||(n.focus(),!this.$focusTimeout||this.$clickSelection||n.inMultiSelectMode)?(this.captureMouse(e),this.startSelect(i,e.domEvent._clicks>1),e.preventDefault()):(this.setState("focusWait"),void this.captureMouse(e)))}startSelect(e,t){e=e||this.editor.renderer.screenToTextCoordinates(this.x,this.y)
var i=this.editor
this.mousedownEvent&&(this.mousedownEvent.getShiftKey()?i.selection.selectToPosition(e):t||i.selection.moveToPosition(e),t||this.select(),i.setStyle("ace_selecting"),this.setState("select"))}select(){var e,t=this.editor,i=t.renderer.screenToTextCoordinates(this.x,this.y)
if(this.$clickSelection){var s=this.$clickSelection.comparePoint(i)
if(-1==s)e=this.$clickSelection.end
else if(1==s)e=this.$clickSelection.start
else{var r=n(this.$clickSelection,i)
i=r.cursor,e=r.anchor}t.selection.setSelectionAnchor(e.row,e.column)}t.selection.selectToPosition(i),t.renderer.scrollCursorIntoView()}extendSelectionBy(e){var t,i=this.editor,s=i.renderer.screenToTextCoordinates(this.x,this.y),r=i.selection[e](s.row,s.column)
if(this.$clickSelection){var o=this.$clickSelection.comparePoint(r.start),a=this.$clickSelection.comparePoint(r.end)
if(-1==o&&a<=0)t=this.$clickSelection.end,r.end.row==s.row&&r.end.column==s.column||(s=r.start)
else if(1==a&&o>=0)t=this.$clickSelection.start,r.start.row==s.row&&r.start.column==s.column||(s=r.end)
else if(-1==o&&1==a)s=r.end,t=r.start
else{var l=n(this.$clickSelection,s)
s=l.cursor,t=l.anchor}i.selection.setSelectionAnchor(t.row,t.column)}i.selection.selectToPosition(s),i.renderer.scrollCursorIntoView()}selectByLinesEnd(){this.$clickSelection=null,this.editor.unsetStyle("ace_selecting")}focusWait(){var e,t,i,n,s=(e=this.mousedownEvent.x,t=this.mousedownEvent.y,i=this.x,n=this.y,Math.sqrt(Math.pow(i-e,2)+Math.pow(n-t,2))),r=Date.now();(s>0||r-this.mousedownEvent.time>this.$focusTimeout)&&this.startSelect(this.mousedownEvent.getDocumentPosition())}onDoubleClick(e){var t=e.getDocumentPosition(),i=this.editor,n=i.session.getBracketRange(t)
n?(n.isEmpty()&&(n.start.column--,n.end.column++),this.setState("select")):(n=i.selection.getWordRange(t.row,t.column),this.setState("selectByWords")),this.$clickSelection=n,this.select()}onTripleClick(e){var t=e.getDocumentPosition(),i=this.editor
this.setState("selectByLines")
var n=i.getSelectionRange()
n.isMultiLine()&&n.contains(t.row,t.column)?(this.$clickSelection=i.selection.getLineRange(n.start.row),this.$clickSelection.end=i.selection.getLineRange(n.end.row).end):this.$clickSelection=i.selection.getLineRange(t.row),this.select()}onQuadClick(e){var t=this.editor
t.selectAll(),this.$clickSelection=t.getSelectionRange(),this.setState("selectAll")}onMouseWheel(e){if(!e.getAccelKey()){e.getShiftKey()&&e.wheelY&&!e.wheelX&&(e.wheelX=e.wheelY,e.wheelY=0)
var t=this.editor
this.$lastScroll||(this.$lastScroll={t:0,vx:0,vy:0,allowed:0})
var i=this.$lastScroll,n=e.domEvent.timeStamp,s=n-i.t,r=s?e.wheelX/s:i.vx,o=s?e.wheelY/s:i.vy
s<550&&(r=(r+i.vx)/2,o=(o+i.vy)/2)
var a=Math.abs(r/o),l=!1
return a>=1&&t.renderer.isScrollableBy(e.wheelX*e.speed,0)&&(l=!0),a<=1&&t.renderer.isScrollableBy(0,e.wheelY*e.speed)&&(l=!0),l?i.allowed=n:n-i.allowed<550&&(Math.abs(r)<=1.5*Math.abs(i.vx)&&Math.abs(o)<=1.5*Math.abs(i.vy)?(l=!0,i.allowed=n):i.allowed=0),i.t=n,i.vx=r,i.vy=o,l?(t.renderer.scrollBy(e.wheelX*e.speed,e.wheelY*e.speed),e.stop()):void 0}}}r.prototype.selectEnd=r.prototype.selectByLinesEnd,r.prototype.selectAllEnd=r.prototype.selectByLinesEnd,r.prototype.selectByWordsEnd=r.prototype.selectByLinesEnd,t.J=r},5323:(e,t,i)=>{function n(e){function t(){var e=w;(function(e,t){var i=Date.now(),n=!t||e.row!=t.row,r=!t||e.column!=t.column
!C||n||r?(u.moveCursorToPosition(e),C=i,S={x:p,y:m}):s(S.x,S.y,p,m)>5?C=null:i-C>=200&&(u.renderer.scrollCursorIntoView(),C=null)})(w=u.renderer.screenToTextCoordinates(p,m),e),function(e,t){var i=Date.now(),n=u.renderer.layerConfig.lineHeight,s=u.renderer.layerConfig.characterWidth,r=u.renderer.scroller.getBoundingClientRect(),o={x:{left:p-r.left,right:r.right-p},y:{top:m-r.top,bottom:r.bottom-m}},a=Math.min(o.x.left,o.x.right),l=Math.min(o.y.top,o.y.bottom),h={row:e.row,column:e.column}
a/s<=2&&(h.column+=o.x.left<o.x.right?-3:2),l/n<=1&&(h.row+=o.y.top<o.y.bottom?-1:1)
var c=e.row!=h.row,d=e.column!=h.column,g=!t||e.row!=t.row
c||d&&!g?b?i-b>=200&&u.renderer.scrollCursorIntoView(h):b=i:b=null}(w,e)}function i(){v=u.selection.toOrientedRange(),g=u.session.addMarker(v,"ace_selection",u.getSelectionStyle()),u.clearSelection(),u.isFocused()&&u.renderer.$cursorLayer.setBlinking(!1),clearInterval(f),t(),f=setInterval(t,20),$=0,o.addListener(document,"mousemove",l)}function n(){clearInterval(f),u.session.removeMarker(g),g=null,u.selection.fromOrientedRange(v),u.isFocused()&&!x&&u.$resetCursorStyle(),v=null,w=null,$=0,b=null,C=null,o.removeListener(document,"mousemove",l)}function l(){null==A&&(A=setTimeout((function(){null!=A&&g&&n()}),20))}function h(e){var t=e.types
return!t||Array.prototype.some.call(t,(function(e){return"text/plain"==e||"Text"==e}))}function c(e){var t=["copy","copymove","all","uninitialized"],i=a.isMac?e.altKey:e.ctrlKey,n="uninitialized"
try{n=e.dataTransfer.effectAllowed.toLowerCase()}catch(e){}var s="none"
return i&&t.indexOf(n)>=0?s="copy":["move","copymove","linkmove","all","uninitialized"].indexOf(n)>=0?s="move":t.indexOf(n)>=0&&(s="copy"),s}var u=e.editor,d=r.createElement("div")
d.style.cssText="top:-100px;position:absolute;z-index:2147483647;opacity:0.5",d.textContent="\xa0",["dragWait","dragWaitEnd","startDrag","dragReadyEnd","onMouseDrag"].forEach((function(t){e[t]=this[t]}),this),u.on("mousedown",this.onMouseDown.bind(e))
var g,p,m,f,v,w,y,x,b,C,S,k=u.container,$=0
this.onDragStart=function(e){if(this.cancelDrag||!k.draggable){var t=this
return setTimeout((function(){t.startSelect(),t.captureMouse(e)}),0),e.preventDefault()}v=u.getSelectionRange()
var i=e.dataTransfer
i.effectAllowed=u.getReadOnly()?"copy":"copyMove",u.container.appendChild(d),i.setDragImage&&i.setDragImage(d,0,0),setTimeout((function(){u.container.removeChild(d)})),i.clearData(),i.setData("Text",u.session.getTextRange()),x=!0,this.setState("drag")},this.onDragEnd=function(e){if(k.draggable=!1,x=!1,this.setState(null),!u.getReadOnly()){var t=e.dataTransfer.dropEffect
y||"move"!=t||u.session.remove(u.getSelectionRange()),u.$resetCursorStyle()}this.editor.unsetStyle("ace_dragging"),this.editor.renderer.setCursorStyle("")},this.onDragEnter=function(e){if(!u.getReadOnly()&&h(e.dataTransfer))return p=e.clientX,m=e.clientY,g||i(),$++,e.dataTransfer.dropEffect=y=c(e),o.preventDefault(e)},this.onDragOver=function(e){if(!u.getReadOnly()&&h(e.dataTransfer))return p=e.clientX,m=e.clientY,g||(i(),$++),null!==A&&(A=null),e.dataTransfer.dropEffect=y=c(e),o.preventDefault(e)},this.onDragLeave=function(e){if(--$<=0&&g)return n(),y=null,o.preventDefault(e)},this.onDrop=function(e){if(w){var t=e.dataTransfer
if(x)switch(y){case"move":v=v.contains(w.row,w.column)?{start:w,end:w}:u.moveText(v,w)
break
case"copy":v=u.moveText(v,w,!0)}else{var i=t.getData("Text")
v={start:w,end:u.session.insert(w,i)},u.focus(),y=null}return n(),o.preventDefault(e)}},o.addListener(k,"dragstart",this.onDragStart.bind(e),u),o.addListener(k,"dragend",this.onDragEnd.bind(e),u),o.addListener(k,"dragenter",this.onDragEnter.bind(e),u),o.addListener(k,"dragover",this.onDragOver.bind(e),u),o.addListener(k,"dragleave",this.onDragLeave.bind(e),u),o.addListener(k,"drop",this.onDrop.bind(e),u)
var A=null}function s(e,t,i,n){return Math.sqrt(Math.pow(i-e,2)+Math.pow(n-t,2))}var r=i(215),o=i(2507),a=i(6483);(function(){this.dragWait=function(){Date.now()-this.mousedownEvent.time>this.editor.getDragDelay()&&this.startDrag()},this.dragWaitEnd=function(){this.editor.container.draggable=!1,this.startSelect(this.mousedownEvent.getDocumentPosition()),this.selectEnd()},this.dragReadyEnd=function(){this.editor.$resetCursorStyle(),this.editor.unsetStyle("ace_dragging"),this.editor.renderer.setCursorStyle(""),this.dragWaitEnd()},this.startDrag=function(){this.cancelDrag=!1
var e=this.editor
e.container.draggable=!0,e.renderer.$cursorLayer.setBlinking(!1),e.setStyle("ace_dragging")
var t=a.isWin?"default":"move"
e.renderer.setCursorStyle(t),this.setState("dragReady")},this.onMouseDrag=function(){var e=this.editor.container
a.isIE&&"dragReady"==this.state&&s(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y)>3&&e.dragDrop(),"dragWait"===this.state&&s(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y)>0&&(e.draggable=!1,this.startSelect(this.mousedownEvent.getDocumentPosition()))},this.onMouseDown=function(e){if(this.$dragEnabled){this.mousedownEvent=e
var t=this.editor,i=e.inSelection(),n=e.getButton()
if(1===(e.domEvent.detail||1)&&0===n&&i){if(e.editor.inMultiSelectMode&&(e.getAccelKey()||e.getShiftKey()))return
this.mousedownEvent.time=Date.now()
var s=e.domEvent.target||e.domEvent.srcElement
"unselectable"in s&&(s.unselectable="on"),t.getDragDelay()?(a.isWebKit&&(this.cancelDrag=!0,t.container.draggable=!0),this.setState("dragWait")):this.startDrag(),this.captureMouse(e,this.onMouseDrag.bind(this)),e.defaultPrevented=!0}}}}).call(n.prototype),t.O=n},3939:(e,t,i)=>{var n=i(215)
t.e=class{constructor(e){e.on("click",(function(t){var i=t.getDocumentPosition(),s=e.session,r=s.getFoldAt(i.row,i.column,1)
r&&(t.getAccelKey()?s.removeFold(r):s.expandFold(r),t.stop())
var o=t.domEvent&&t.domEvent.target
o&&n.hasCssClass(o,"ace_inline_button")&&n.hasCssClass(o,"ace_toggle_wrap")&&(s.setOption("wrap",!s.getUseWrapMode()),e.renderer.scrollCursorIntoView())})),e.on("gutterclick",(function(t){if("foldWidgets"==e.renderer.$gutterLayer.getRegion(t)){var i=t.getDocumentPosition().row,n=e.session
n.foldWidgets&&n.foldWidgets[i]&&e.session.onFoldWidgetClick(i,t),e.isFocused()||e.focus(),t.stop()}})),e.on("gutterdblclick",(function(t){if("foldWidgets"==e.renderer.$gutterLayer.getRegion(t)){var i=t.getDocumentPosition().row,n=e.session,s=n.getParentFoldRangeData(i,!0),r=s.range||s.firstRange
if(r){i=r.start.row
var o=n.getFoldAt(i,n.getLine(i).length,1)
o?n.removeFold(o):(n.addFold("...",r),e.renderer.scrollCursorIntoView({row:r.start.row,column:0}))}t.stop()}}))}}},6475:(e,t,i)=>{var n=i(2507),s=i(6483)
t.C=class{constructor(e,t){this.speed,this.wheelX,this.wheelY,this.domEvent=e,this.editor=t,this.x=this.clientX=e.clientX,this.y=this.clientY=e.clientY,this.$pos=null,this.$inSelection=null,this.propagationStopped=!1,this.defaultPrevented=!1}stopPropagation(){n.stopPropagation(this.domEvent),this.propagationStopped=!0}preventDefault(){n.preventDefault(this.domEvent),this.defaultPrevented=!0}stop(){this.stopPropagation(),this.preventDefault()}getDocumentPosition(){return this.$pos||(this.$pos=this.editor.renderer.screenToTextCoordinates(this.clientX,this.clientY)),this.$pos}getGutterRow(){var e=this.getDocumentPosition().row
return this.editor.session.documentToScreenRow(e,0)-this.editor.session.documentToScreenRow(this.editor.renderer.$gutterLayer.$lines.get(0).row,0)}inSelection(){if(null!==this.$inSelection)return this.$inSelection
var e=this.editor.getSelectionRange()
if(e.isEmpty())this.$inSelection=!1
else{var t=this.getDocumentPosition()
this.$inSelection=e.contains(t.row,t.column)}return this.$inSelection}getButton(){return n.getButton(this.domEvent)}getShiftKey(){return this.domEvent.shiftKey}getAccelKey(){return s.isMac?this.domEvent.metaKey:this.domEvent.ctrlKey}}},423:(e,t,i)=>{var n=i(2507),s=i(6483),r=i(8636).J,o=i(1689).Y,a=i(6475).C,l=i(5323).O,h=i(6011).A,c=i(5133)
class u{constructor(e){this.$dragDelay,this.$dragEnabled,this.$mouseMoved,this.mouseEvent,this.$focusTimeout
var t=this
this.editor=e,new r(this),new o(this),new l(this)
var i=function(){(!document.hasFocus||!document.hasFocus()||!e.isFocused()&&document.activeElement==(e.textInput&&e.textInput.getElement()))&&window.focus(),e.focus(),setTimeout((function(){e.isFocused()||e.focus()}))},a=e.renderer.getMouseEventTarget()
n.addListener(a,"click",this.onMouseEvent.bind(this,"click"),e),n.addListener(a,"mousemove",this.onMouseMove.bind(this,"mousemove"),e),n.addMultiMouseDownListener([a,e.renderer.scrollBarV&&e.renderer.scrollBarV.inner,e.renderer.scrollBarH&&e.renderer.scrollBarH.inner,e.textInput&&e.textInput.getElement()].filter(Boolean),[400,300,250],this,"onMouseEvent",e),n.addMouseWheelListener(e.container,this.onMouseWheel.bind(this,"mousewheel"),e),h(e.container,e)
var c=e.renderer.$gutter
n.addListener(c,"mousedown",this.onMouseEvent.bind(this,"guttermousedown"),e),n.addListener(c,"click",this.onMouseEvent.bind(this,"gutterclick"),e),n.addListener(c,"dblclick",this.onMouseEvent.bind(this,"gutterdblclick"),e),n.addListener(c,"mousemove",this.onMouseEvent.bind(this,"guttermousemove"),e),n.addListener(a,"mousedown",i,e),n.addListener(c,"mousedown",i,e),s.isIE&&e.renderer.scrollBarV&&(n.addListener(e.renderer.scrollBarV.element,"mousedown",i,e),n.addListener(e.renderer.scrollBarH.element,"mousedown",i,e)),e.on("mousemove",(function(i){if(!t.state&&!t.$dragDelay&&t.$dragEnabled){var n=e.renderer.screenToTextCoordinates(i.x,i.y),s=e.session.selection.getRange(),r=e.renderer
!s.isEmpty()&&s.insideStart(n.row,n.column)?r.setCursorStyle("default"):r.setCursorStyle("")}}),e)}onMouseEvent(e,t){this.editor.session&&this.editor._emit(e,new a(t,this.editor))}onMouseMove(e,t){var i=this.editor._eventRegistry&&this.editor._eventRegistry.mousemove
i&&i.length&&this.editor._emit(e,new a(t,this.editor))}onMouseWheel(e,t){var i=new a(t,this.editor)
i.speed=2*this.$scrollSpeed,i.wheelX=t.wheelX,i.wheelY=t.wheelY,this.editor._emit(e,i)}setState(e){this.state=e}captureMouse(e,t){this.x=e.x,this.y=e.y,this.isMousePressed=!0
var i=this.editor,r=this.editor.renderer
r.$isMousePressed=!0
var o=this,l=function(e){if(e){if(s.isWebKit&&!e.which&&o.releaseMouse)return o.releaseMouse()
o.x=e.clientX,o.y=e.clientY,t&&t(e),o.mouseEvent=new a(e,o.editor),o.$mouseMoved=!0}},h=function(e){i.off("beforeEndOperation",u),clearInterval(d),i.session&&c(),o[o.state+"End"]&&o[o.state+"End"](e),o.state="",o.isMousePressed=r.$isMousePressed=!1,r.$keepTextAreaAtCursor&&r.$moveTextAreaToCursor(),o.$onCaptureMouseMove=o.releaseMouse=null,e&&o.onMouseEvent("mouseup",e),i.endOperation()},c=function(){o[o.state]&&o[o.state](),o.$mouseMoved=!1}
if(s.isOldIE&&"dblclick"==e.domEvent.type)return setTimeout((function(){h(e)}))
var u=function(){o.releaseMouse&&i.curOp.command.name&&i.curOp.selectionChanged&&(o[o.state+"End"]&&o[o.state+"End"](),o.state="",o.releaseMouse())}
i.on("beforeEndOperation",u),i.startOperation({command:{name:"mouse"}}),o.$onCaptureMouseMove=l,o.releaseMouse=n.capture(this.editor.container,l,h)
var d=setInterval(c,20)}cancelContextMenu(){var e=function(t){t&&t.domEvent&&"contextmenu"!=t.domEvent.type||(this.editor.off("nativecontextmenu",e),t&&t.domEvent&&n.stopEvent(t.domEvent))}.bind(this)
setTimeout(e,10),this.editor.on("nativecontextmenu",e)}destroy(){this.releaseMouse&&this.releaseMouse()}}u.prototype.releaseMouse=null,c.defineOptions(u.prototype,"mouseHandler",{scrollSpeed:{initialValue:2},dragDelay:{initialValue:s.isMac?150:0},dragEnabled:{initialValue:!0},focusTimeout:{initialValue:0},tooltipFollowsMouse:{initialValue:!0}}),t.e=u},4774:(e,t,i)=>{function n(e,t){return e.row==t.row&&e.column==t.column}var s=i(2507),r=i(6483)
t.r=function(e){var t=e.domEvent,i=t.altKey,o=t.shiftKey,a=t.ctrlKey,l=e.getAccelKey(),h=e.getButton()
if(a&&r.isMac&&(h=t.button),e.editor.inMultiSelectMode&&2==h)e.editor.textInput.onContextMenu(e.domEvent)
else if(a||i||l){if(0===h){var c,u=e.editor,d=u.selection,g=u.inMultiSelectMode,p=e.getDocumentPosition(),m=d.getCursor(),f=e.inSelection()||d.isEmpty()&&n(p,m),v=e.x,w=e.y,y=u.session,x=u.renderer.pixelToScreenCoordinates(v,w),b=x
if(u.$mouseHandler.$enableJumpToDef)a&&i||l&&i?c=o?"block":"add":i&&u.$blockSelectEnabled&&(c="block")
else if(l&&!i){if(c="add",!g&&o)return}else i&&u.$blockSelectEnabled&&(c="block")
if(c&&r.isMac&&t.ctrlKey&&u.$mouseHandler.cancelContextMenu(),"add"==c){if(!g&&f)return
if(!g){var C=d.toOrientedRange()
u.addSelectionMarker(C)}var S=d.rangeList.rangeAtPoint(p)
u.inVirtualSelectionMode=!0,o&&(S=null,C=d.ranges[0]||C,u.removeSelectionMarker(C)),u.once("mouseup",(function(){var e=d.toOrientedRange()
S&&e.isEmpty()&&n(S.cursor,e.cursor)?d.substractPoint(e.cursor):(o?d.substractPoint(C.cursor):C&&(u.removeSelectionMarker(C),d.addRange(C)),d.addRange(e)),u.inVirtualSelectionMode=!1}))}else if("block"==c){var k
e.stop(),u.inVirtualSelectionMode=!0
var $=[],A=function(){var e=u.renderer.pixelToScreenCoordinates(v,w),t=y.screenToDocumentPosition(e.row,e.column,e.offsetX)
n(b,e)&&n(t,d.lead)||(b=e,u.selection.moveToPosition(t),u.renderer.scrollCursorIntoView(),u.removeSelectionMarkers($),$=d.rectangularRangeBlock(b,x),u.$mouseHandler.$clickSelection&&1==$.length&&$[0].isEmpty()&&($[0]=u.$mouseHandler.$clickSelection.clone()),$.forEach(u.addSelectionMarker,u),u.updateSelectionMarkers())}
g&&!l?d.toSingleRange():!g&&l&&(k=d.toOrientedRange(),u.addSelectionMarker(k)),o?x=y.documentToScreenPosition(d.lead):d.moveToPosition(p),b={row:-1,column:-1}
var M=A
s.capture(u.container,(function(e){v=e.clientX,w=e.clientY}),(function(){A(),clearInterval(L),u.removeSelectionMarkers($),$.length||($=[d.toOrientedRange()]),k&&(u.removeSelectionMarker(k),d.toSingleRange(k))
for(var e=0;e<$.length;e++)d.addRange($[e])
u.inVirtualSelectionMode=!1,u.$mouseHandler.$clickSelection=null}))
var L=setInterval((function(){M()}),20)
return e.preventDefault()}}}else 0===h&&e.editor.inMultiSelectMode&&e.editor.exitMultiSelectMode()}},6011:(e,t,i)=>{var n=i(6475).C,s=i(2507),r=i(215)
t.A=function(e,t){function i(){var e=window.navigator&&window.navigator.clipboard,i=!1,n=function(e){return t.commands.canExecute(e,t)},s=function(s){var o,a,l=s.target.getAttribute("action")
if("more"==l||!i)return i=!i,o=t.getCopyText(),a=t.session.getUndoManager().hasUndo(),void v.replaceChild(r.buildDom(i?["span",!o&&n("selectall")&&["span",{class:"ace_mobile-button",action:"selectall"},"Select All"],o&&n("copy")&&["span",{class:"ace_mobile-button",action:"copy"},"Copy"],o&&n("cut")&&["span",{class:"ace_mobile-button",action:"cut"},"Cut"],e&&n("paste")&&["span",{class:"ace_mobile-button",action:"paste"},"Paste"],a&&n("undo")&&["span",{class:"ace_mobile-button",action:"undo"},"Undo"],n("find")&&["span",{class:"ace_mobile-button",action:"find"},"Find"],n("openCommandPalette")&&["span",{class:"ace_mobile-button",action:"openCommandPalette"},"Palette"]]:["span"]),v.firstChild)
"paste"==l?e.readText().then((function(e){t.execCommand(l,e)})):l&&("cut"!=l&&"copy"!=l||(e?e.writeText(t.getCopyText()):document.execCommand("copy")),t.execCommand(l)),v.firstChild.style.display="none",i=!1,"openCommandPalette"!=l&&t.focus()}
v=r.buildDom(["div",{class:"ace_mobile-menu",ontouchstart:function(e){w="menu",e.stopPropagation(),e.preventDefault(),t.textInput.focus()},ontouchend:function(e){e.stopPropagation(),e.preventDefault(),s(e)},onclick:s},["span"],["span",{class:"ace_mobile-button",action:"more"},"..."]],t.container)}function o(){if(t.getOption("enableMobileMenu")){v||i()
var e=t.selection.cursor,n=t.renderer.textToScreenCoordinates(e.row,e.column),s=t.renderer.textToScreenCoordinates(0,0).pageX,r=t.renderer.scrollLeft,o=t.container.getBoundingClientRect()
v.style.top=n.pageY-o.top-3+"px",n.pageX-o.left<o.width-70?(v.style.left="",v.style.right="10px"):(v.style.right="",v.style.left=s+r-o.left+"px"),v.style.display="",v.firstChild.style.display="none",t.on("input",a)}else v&&a()}function a(){v&&(v.style.display="none"),t.off("input",a)}function l(){clearTimeout(g=null)
var e=t.selection.getRange(),i=e.contains(m.row,m.column)
!e.isEmpty()&&i||(t.selection.moveToPosition(m),t.selection.selectWord()),w="wait",o()}var h,c,u,d,g,p,m,f,v,w="scroll",y=0,x=0,b=0,C=0
s.addListener(e,"contextmenu",(function(){f&&t.textInput.getElement().focus()}),t),s.addListener(e,"touchstart",(function(e){var i=e.touches
if(g||i.length>1)return clearTimeout(g),g=null,u=-1,void(w="zoom")
f=t.$mouseHandler.isMousePressed=!0
var s=t.renderer.layerConfig.lineHeight,r=t.renderer.layerConfig.lineHeight,o=e.timeStamp
d=o
var a=i[0],p=a.clientX,v=a.clientY
Math.abs(h-p)+Math.abs(c-v)>s&&(u=-1),h=e.clientX=p,c=e.clientY=v,b=C=0
var S=new n(e,t)
if(m=S.getDocumentPosition(),o-u<500&&1==i.length&&!y)x++,e.preventDefault(),e.button=0,function(){clearTimeout(g=null),t.selection.moveToPosition(m)
var e=x>=2?t.selection.getLineRange(m.row):t.session.getBracketRange(m)
e&&!e.isEmpty()?t.selection.setRange(e):t.selection.selectWord(),w="wait"}()
else{x=0
var k=t.selection.cursor,$=t.selection.isEmpty()?k:t.selection.anchor,A=t.renderer.$cursorLayer.getPixelPosition(k,!0),M=t.renderer.$cursorLayer.getPixelPosition($,!0),L=t.renderer.scroller.getBoundingClientRect(),T=t.renderer.layerConfig.offset,E=t.renderer.scrollLeft,I=function(e,t){return(e/=r)*e+(t=t/s-.75)*t}
if(e.clientX<L.left)return void(w="zoom")
var R=I(e.clientX-L.left-A.left+E,e.clientY-L.top-A.top+T),_=I(e.clientX-L.left-M.left+E,e.clientY-L.top-M.top+T)
R<3.5&&_<3.5&&(w=R>_?"cursor":"anchor"),w=_<3.5?"anchor":R<3.5?"cursor":"scroll",g=setTimeout(l,450)}u=o}),t),s.addListener(e,"touchend",(function(){f=t.$mouseHandler.isMousePressed=!1,p&&clearInterval(p),"zoom"==w?(w="",y=0):g?(t.selection.moveToPosition(m),y=0,o()):"scroll"==w?(y+=60,p=setInterval((function(){y--<=0&&(clearInterval(p),p=null),Math.abs(b)<.01&&(b=0),Math.abs(C)<.01&&(C=0),y<20&&(b*=.9),y<20&&(C*=.9)
var e=t.session.getScrollTop()
t.renderer.scrollBy(10*b,10*C),e==t.session.getScrollTop()&&(y=0)}),10),a()):o(),clearTimeout(g),g=null}),t),s.addListener(e,"touchmove",(function(e){g&&(clearTimeout(g),g=null)
var i=e.touches
if(!(i.length>1||"zoom"==w)){var s=i[0],r=h-s.clientX,o=c-s.clientY
if("wait"==w){if(!(r*r+o*o>4))return e.preventDefault()
w="cursor"}h=s.clientX,c=s.clientY,e.clientX=s.clientX,e.clientY=s.clientY
var a=e.timeStamp,l=a-d
if(d=a,"scroll"==w){var u=new n(e,t)
u.speed=1,u.wheelX=r,u.wheelY=o,10*Math.abs(r)<Math.abs(o)&&(r=0),10*Math.abs(o)<Math.abs(r)&&(o=0),0!=l&&(b=r/l,C=o/l),t._emit("mousewheel",u),u.propagationStopped||(b=C=0)}else{var p=new n(e,t).getDocumentPosition()
"cursor"==w?t.selection.moveCursorToPosition(p):"anchor"==w&&t.selection.setSelectionAnchor(p.row,p.column),t.renderer.scrollCursorIntoView(p),e.preventDefault()}}}),t)}},6981:(e,t,i)=>{function n(e){e.$multiselectOnSessionChange||(e.$onAddRange=e.$onAddRange.bind(e),e.$onRemoveRange=e.$onRemoveRange.bind(e),e.$onMultiSelect=e.$onMultiSelect.bind(e),e.$onSingleSelect=e.$onSingleSelect.bind(e),e.$multiselectOnSessionChange=t.onSessionChange.bind(e),e.$checkMultiselectChange=e.$checkMultiselectChange.bind(e),e.$multiselectOnSessionChange(e),e.on("changeSession",e.$multiselectOnSessionChange),e.on("mousedown",a),e.commands.addCommands(c.defaultCommands),function(e){function t(){n&&(e.renderer.setMouseCursor(""),n=!1)}if(e.textInput){var i=e.textInput.getElement(),n=!1
l.addListener(i,"keydown",(function(i){var s=18==i.keyCode&&!(i.ctrlKey||i.shiftKey||i.metaKey)
e.$blockSelectEnabled&&s?n||(e.renderer.setMouseCursor("crosshair"),n=!0):n&&t()}),e),l.addListener(i,"keyup",t,e),l.addListener(i,"blur",t,e)}}(e))}var s=i(9537).U,r=i(4074).Q,o=i(3933).L,a=i(4774).r,l=i(2507),h=i(3927),c=i(8675)
t.commands=c.defaultCommands.concat(c.multiSelectCommands)
var u=new(0,i(1143).v),d=i(9276).f;(function(){this.getSelectionMarkers=function(){return this.$selectionMarkers}}).call(d.prototype),function(){this.ranges=null,this.rangeList=null,this.addRange=function(e,t){if(e){if(!this.inMultiSelectMode&&0===this.rangeCount){var i=this.toOrientedRange()
if(this.rangeList.add(i),this.rangeList.add(e),2!=this.rangeList.ranges.length)return this.rangeList.removeAll(),t||this.fromOrientedRange(e)
this.rangeList.removeAll(),this.rangeList.add(i),this.$onAddRange(i)}e.cursor||(e.cursor=e.end)
var n=this.rangeList.add(e)
return this.$onAddRange(e),n.length&&this.$onRemoveRange(n),this.rangeCount>1&&!this.inMultiSelectMode&&(this._signal("multiSelect"),this.inMultiSelectMode=!0,this.session.$undoSelect=!1,this.rangeList.attach(this.session)),t||this.fromOrientedRange(e)}},this.toSingleRange=function(e){e=e||this.ranges[0]
var t=this.rangeList.removeAll()
t.length&&this.$onRemoveRange(t),e&&this.fromOrientedRange(e)},this.substractPoint=function(e){var t=this.rangeList.substractPoint(e)
if(t)return this.$onRemoveRange(t),t[0]},this.mergeOverlappingRanges=function(){var e=this.rangeList.merge()
e.length&&this.$onRemoveRange(e)},this.$onAddRange=function(e){this.rangeCount=this.rangeList.ranges.length,this.ranges.unshift(e),this._signal("addRange",{range:e})},this.$onRemoveRange=function(e){if(this.rangeCount=this.rangeList.ranges.length,1==this.rangeCount&&this.inMultiSelectMode){var t=this.rangeList.ranges.pop()
e.push(t),this.rangeCount=0}for(var i=e.length;i--;){var n=this.ranges.indexOf(e[i])
this.ranges.splice(n,1)}this._signal("removeRange",{ranges:e}),0===this.rangeCount&&this.inMultiSelectMode&&(this.inMultiSelectMode=!1,this._signal("singleSelect"),this.session.$undoSelect=!0,this.rangeList.detach(this.session)),(t=t||this.ranges[0])&&!t.isEqual(this.getRange())&&this.fromOrientedRange(t)},this.$initRangeList=function(){this.rangeList||(this.rangeList=new s,this.ranges=[],this.rangeCount=0)},this.getAllRanges=function(){return this.rangeCount?this.rangeList.ranges.concat():[this.getRange()]},this.splitIntoLines=function(){for(var e=this.ranges.length?this.ranges:[this.getRange()],t=[],i=0;i<e.length;i++){var n=e[i],s=n.start.row,o=n.end.row
if(s===o)t.push(n.clone())
else{for(t.push(new r(s,n.start.column,s,this.session.getLine(s).length));++s<o;)t.push(this.getLineRange(s,!0))
t.push(new r(o,0,o,n.end.column))}0!=i||this.isBackwards()||(t=t.reverse())}for(this.toSingleRange(),i=t.length;i--;)this.addRange(t[i])},this.joinSelections=function(){var e=this.rangeList.ranges,t=e[e.length-1],i=r.fromPoints(e[0].start,t.end)
this.toSingleRange(),this.setSelectionRange(i,t.cursor==t.start)},this.toggleBlockSelection=function(){if(this.rangeCount>1){var e=this.rangeList.ranges,t=e[e.length-1],i=r.fromPoints(e[0].start,t.end)
this.toSingleRange(),this.setSelectionRange(i,t.cursor==t.start)}else{var n=this.session.documentToScreenPosition(this.cursor),s=this.session.documentToScreenPosition(this.anchor)
this.rectangularRangeBlock(n,s).forEach(this.addRange,this)}},this.rectangularRangeBlock=function(e,t,i){var n=[],s=e.column<t.column
if(s)var o=e.column,a=t.column,l=e.offsetX,h=t.offsetX
else o=t.column,a=e.column,l=t.offsetX,h=e.offsetX
var c,u,d,g=e.row<t.row
if(g)var p=e.row,m=t.row
else p=t.row,m=e.row
o<0&&(o=0),p<0&&(p=0),p==m&&(i=!0)
for(var f=p;f<=m;f++){var v=r.fromPoints(this.session.screenToDocumentPosition(f,o,l),this.session.screenToDocumentPosition(f,a,h))
if(v.isEmpty()){if(c&&(u=v.end,d=c,u.row==d.row&&u.column==d.column))break
c=v.end}v.cursor=s?v.start:v.end,n.push(v)}if(g&&n.reverse(),!i){for(var w=n.length-1;n[w].isEmpty()&&w>0;)w--
if(w>0)for(var y=0;n[y].isEmpty();)y++
for(var x=w;x>=y;x--)n[x].isEmpty()&&n.splice(x,1)}return n}}.call(o.prototype)
var g=i(4342).K;(function(){this.updateSelectionMarkers=function(){this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.addSelectionMarker=function(e){e.cursor||(e.cursor=e.end)
var t=this.getSelectionStyle()
return e.marker=this.session.addMarker(e,"ace_selection",t),this.session.$selectionMarkers.push(e),this.session.selectionMarkerCount=this.session.$selectionMarkers.length,e},this.removeSelectionMarker=function(e){if(e.marker){this.session.removeMarker(e.marker)
var t=this.session.$selectionMarkers.indexOf(e);-1!=t&&this.session.$selectionMarkers.splice(t,1),this.session.selectionMarkerCount=this.session.$selectionMarkers.length}},this.removeSelectionMarkers=function(e){for(var t=this.session.$selectionMarkers,i=e.length;i--;){var n=e[i]
if(n.marker){this.session.removeMarker(n.marker)
var s=t.indexOf(n);-1!=s&&t.splice(s,1)}}this.session.selectionMarkerCount=t.length},this.$onAddRange=function(e){this.addSelectionMarker(e.range),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onRemoveRange=function(e){this.removeSelectionMarkers(e.ranges),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onMultiSelect=function(){this.inMultiSelectMode||(this.inMultiSelectMode=!0,this.setStyle("ace_multiselect"),this.keyBinding.addKeyboardHandler(c.keyboardHandler),this.commands.setDefaultHandler("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers())},this.$onSingleSelect=function(){this.session.multiSelect.inVirtualMode||(this.inMultiSelectMode=!1,this.unsetStyle("ace_multiselect"),this.keyBinding.removeKeyboardHandler(c.keyboardHandler),this.commands.removeDefaultHandler("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers(),this._emit("changeSelection"))},this.$onMultiSelectExec=function(e){var t=e.command,i=e.editor
if(i.multiSelect){if(t.multiSelectAction)"forEach"==t.multiSelectAction?n=i.forEachSelection(t,e.args):"forEachLine"==t.multiSelectAction?n=i.forEachSelection(t,e.args,!0):"single"==t.multiSelectAction?(i.exitMultiSelectMode(),n=t.exec(i,e.args||{})):n=t.multiSelectAction(i,e.args||{})
else{var n=t.exec(i,e.args||{})
i.multiSelect.addRange(i.multiSelect.toOrientedRange()),i.multiSelect.mergeOverlappingRanges()}return n}},this.forEachSelection=function(e,t,i){if(!this.inVirtualSelectionMode){var n,s=i&&i.keepOrder,r=1==i||i&&i.$byLines,a=this.session,l=this.selection,h=l.rangeList,c=(s?l:h).ranges
if(!c.length)return e.exec?e.exec(this,t||{}):e(this,t||{})
var u=l._eventRegistry
l._eventRegistry={}
var d=new o(a)
this.inVirtualSelectionMode=!0
for(var g=c.length;g--;){if(r)for(;g>0&&c[g].start.row==c[g-1].end.row;)g--
d.fromOrientedRange(c[g]),d.index=g,this.selection=a.selection=d
var p=e.exec?e.exec(this,t||{}):e(this,t||{})
n||void 0===p||(n=p),d.toOrientedRange(c[g])}d.detach(),this.selection=a.selection=l,this.inVirtualSelectionMode=!1,l._eventRegistry=u,l.mergeOverlappingRanges(),l.ranges[0]&&l.fromOrientedRange(l.ranges[0])
var m=this.renderer.$scrollAnimation
return this.onCursorChange(),this.onSelectionChange(),m&&m.from==m.to&&this.renderer.animateScrolling(m.from),n}},this.exitMultiSelectMode=function(){this.inMultiSelectMode&&!this.inVirtualSelectionMode&&this.multiSelect.toSingleRange()},this.getSelectedText=function(){var e=""
if(this.inMultiSelectMode&&!this.inVirtualSelectionMode){for(var t=this.multiSelect.rangeList.ranges,i=[],n=0;n<t.length;n++)i.push(this.session.getTextRange(t[n]))
var s=this.session.getDocument().getNewLineCharacter();(e=i.join(s)).length==(i.length-1)*s.length&&(e="")}else this.selection.isEmpty()||(e=this.session.getTextRange(this.getSelectionRange()))
return e},this.$checkMultiselectChange=function(e,t){if(this.inMultiSelectMode&&!this.inVirtualSelectionMode){var i=this.multiSelect.ranges[0]
if(this.multiSelect.isEmpty()&&t==this.multiSelect.anchor)return
var n=t==this.multiSelect.anchor?i.cursor==i.start?i.end:i.start:i.cursor
n.row!=t.row||this.session.$clipPositionToDocument(n.row,n.column).column!=t.column?this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange()):this.multiSelect.mergeOverlappingRanges()}},this.findAll=function(e,t,i){if((t=t||{}).needle=e||t.needle,null==t.needle){var n=this.selection.isEmpty()?this.selection.getWordRange():this.selection.getRange()
t.needle=this.session.getTextRange(n)}this.$search.set(t)
var s=this.$search.findAll(this.session)
if(!s.length)return 0
var r=this.multiSelect
i||r.toSingleRange(s[0])
for(var o=s.length;o--;)r.addRange(s[o],!0)
return n&&r.rangeList.rangeAtPoint(n.start)&&r.addRange(n,!0),s.length},this.selectMoreLines=function(e,t){var i=this.selection.toOrientedRange(),n=i.cursor==i.end,s=this.session.documentToScreenPosition(i.cursor)
this.selection.$desiredColumn&&(s.column=this.selection.$desiredColumn)
var o,a=this.session.screenToDocumentPosition(s.row+e,s.column)
if(i.isEmpty())h=a
else var l=this.session.documentToScreenPosition(n?i.end:i.start),h=this.session.screenToDocumentPosition(l.row+e,l.column)
if(n?(o=r.fromPoints(a,h)).cursor=o.start:(o=r.fromPoints(h,a)).cursor=o.end,o.desiredColumn=s.column,this.selection.inMultiSelectMode){if(t)var c=i.cursor}else this.selection.addRange(i)
this.selection.addRange(o),c&&this.selection.substractPoint(c)},this.transposeSelections=function(e){for(var t=this.session,i=t.multiSelect,n=i.ranges,s=n.length;s--;)if((o=n[s]).isEmpty()){let e=t.getWordRange(o.start.row,o.start.column)
o.start.row=e.start.row,o.start.column=e.start.column,o.end.row=e.end.row,o.end.column=e.end.column}i.mergeOverlappingRanges()
var r=[]
for(s=n.length;s--;){var o=n[s]
r.unshift(t.getTextRange(o))}for(e<0?r.unshift(r.pop()):r.push(r.shift()),s=n.length;s--;){var a=(o=n[s]).clone()
t.replace(o,r[s]),o.start.row=a.start.row,o.start.column=a.start.column}i.fromOrientedRange(i.ranges[0])},this.selectMore=function(e,t,i){var n=this.session,s=n.multiSelect.toOrientedRange()
if(!s.isEmpty()||((s=n.getWordRange(s.start.row,s.start.column)).cursor=-1==e?s.start:s.end,this.multiSelect.addRange(s),!i)){var r=n.getTextRange(s),o=function(e,t,i){return u.$options.wrap=!0,u.$options.needle=t,u.$options.backwards=-1==i,u.find(e)}(n,r,e)
o&&(o.cursor=-1==e?o.start:o.end,this.session.unfold(o),this.multiSelect.addRange(o),this.renderer.scrollCursorIntoView(null,.5)),t&&this.multiSelect.substractPoint(s.cursor)}},this.alignCursors=function(){var e=this.session,t=e.multiSelect,i=t.ranges,n=-1,s=i.filter((function(e){if(e.cursor.row==n)return!0
n=e.cursor.row}))
if(i.length&&s.length!=i.length-1){s.forEach((function(e){t.substractPoint(e.cursor)}))
var o=0,a=1/0,l=i.map((function(t){var i=t.cursor,n=e.getLine(i.row).substr(i.column).search(/\S/g)
return-1==n&&(n=0),i.column>o&&(o=i.column),n<a&&(a=n),n}))
i.forEach((function(t,i){var n=t.cursor,s=o-n.column,c=l[i]-a
s>c?e.insert(n,h.stringRepeat(" ",s-c)):e.remove(new r(n.row,n.column,n.row,n.column-s+c)),t.start.column=t.end.column=o,t.start.row=t.end.row=n.row,t.cursor=t.end})),t.fromOrientedRange(i[0]),this.renderer.updateCursor(),this.renderer.updateBackMarkers()}else{var c=this.selection.getRange(),u=c.start.row,d=c.end.row,g=u==d
if(g){var p,m=this.session.getLength()
do{p=this.session.getLine(d)}while(/[=:]/.test(p)&&++d<m)
do{p=this.session.getLine(u)}while(/[=:]/.test(p)&&--u>0)
u<0&&(u=0),d>=m&&(d=m-1)}var f=this.session.removeFullLines(u,d)
f=this.$reAlignText(f,g),this.session.insert({row:u,column:0},f.join("\n")+"\n"),g||(c.start.column=0,c.end.column=f[f.length-1].length),this.selection.setRange(c)}},this.$reAlignText=function(e,t){function i(e){return h.stringRepeat(" ",e)}function n(e){return e[2]?i(s)+e[2]+i(r-e[2].length+o)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]}var s,r,o,a=!0,l=!0
return e.map((function(e){var t=e.match(/(\s*)(.*?)(\s*)([=:].*)/)
return t?null==s?(s=t[1].length,r=t[2].length,o=t[3].length,t):(s+r+o!=t[1].length+t[2].length+t[3].length&&(l=!1),s!=t[1].length&&(a=!1),s>t[1].length&&(s=t[1].length),r<t[2].length&&(r=t[2].length),o>t[3].length&&(o=t[3].length),t):[e]})).map(t?n:a?l?function(e){return e[2]?i(s+r-e[2].length)+e[2]+i(o)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]}:n:function(e){return e[2]?i(s)+e[2]+i(o)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]})}}).call(g.prototype),t.onSessionChange=function(e){var t=e.session
t&&!t.multiSelect&&(t.$selectionMarkers=[],t.selection.$initRangeList(),t.multiSelect=t.selection),this.multiSelect=t&&t.multiSelect
var i=e.oldSession
i&&(i.multiSelect.off("addRange",this.$onAddRange),i.multiSelect.off("removeRange",this.$onRemoveRange),i.multiSelect.off("multiSelect",this.$onMultiSelect),i.multiSelect.off("singleSelect",this.$onSingleSelect),i.multiSelect.lead.off("change",this.$checkMultiselectChange),i.multiSelect.anchor.off("change",this.$checkMultiselectChange)),t&&(t.multiSelect.on("addRange",this.$onAddRange),t.multiSelect.on("removeRange",this.$onRemoveRange),t.multiSelect.on("multiSelect",this.$onMultiSelect),t.multiSelect.on("singleSelect",this.$onSingleSelect),t.multiSelect.lead.on("change",this.$checkMultiselectChange),t.multiSelect.anchor.on("change",this.$checkMultiselectChange)),t&&this.inMultiSelectMode!=t.selection.inMultiSelectMode&&(t.selection.inMultiSelectMode?this.$onMultiSelect():this.$onSingleSelect())},t.MultiSelect=n,i(5133).defineOptions(g.prototype,"editor",{enableMultiselect:{set:function(e){n(this),e?this.on("mousedown",a):this.off("mousedown",a)},value:!0},enableBlockSelect:{set:function(e){this.$blockSelectEnabled=e},value:!0}})},9818:(e,t,i)=>{var n=i(4074).Q,s=i(8770).b,r=i(8297)
class o{constructor(e,t,i,n,s,r){var o=this
this.length=t,this.session=e,this.doc=e.getDocument(),this.mainClass=s,this.othersClass=r,this.$onUpdate=this.onUpdate.bind(this),this.doc.on("change",this.$onUpdate,!0),this.$others=n,this.$onCursorChange=function(){setTimeout((function(){o.onCursorChange()}))},this.$pos=i
var a=e.getUndoManager().$undoStack||e.getUndoManager().$undostack||{length:-1}
this.$undoStackDepth=a.length,this.setup(),e.selection.on("changeCursor",this.$onCursorChange)}setup(){var e=this,t=this.doc,i=this.session
this.selectionBefore=i.selection.toJSON(),i.selection.inMultiSelectMode&&i.selection.toSingleRange(),this.pos=t.createAnchor(this.$pos.row,this.$pos.column)
var s=this.pos
s.$insertRight=!0,s.detach(),s.markerId=i.addMarker(new n(s.row,s.column,s.row,s.column+this.length),this.mainClass,null,!1),this.others=[],this.$others.forEach((function(i){var n=t.createAnchor(i.row,i.column)
n.$insertRight=!0,n.detach(),e.others.push(n)})),i.setUndoSelect(!1)}showOtherMarkers(){if(!this.othersActive){var e=this.session,t=this
this.othersActive=!0,this.others.forEach((function(i){i.markerId=e.addMarker(new n(i.row,i.column,i.row,i.column+t.length),t.othersClass,null,!1)}))}}hideOtherMarkers(){if(this.othersActive){this.othersActive=!1
for(var e=0;e<this.others.length;e++)this.session.removeMarker(this.others[e].markerId)}}onUpdate(e){if(this.$updating)return this.updateAnchors(e)
var t=e
if(t.start.row===t.end.row&&t.start.row===this.pos.row){this.$updating=!0
var i="insert"===e.action?t.end.column-t.start.column:t.start.column-t.end.column,s=t.start.column>=this.pos.column&&t.start.column<=this.pos.column+this.length+1,r=t.start.column-this.pos.column
if(this.updateAnchors(e),s&&(this.length+=i),s&&!this.session.$fromUndo)if("insert"===e.action)for(var o=this.others.length-1;o>=0;o--){var a={row:(l=this.others[o]).row,column:l.column+r}
this.doc.insertMergedLines(a,e.lines)}else if("remove"===e.action)for(o=this.others.length-1;o>=0;o--){var l
a={row:(l=this.others[o]).row,column:l.column+r},this.doc.remove(new n(a.row,a.column,a.row,a.column-i))}this.$updating=!1,this.updateMarkers()}}updateAnchors(e){this.pos.onChange(e)
for(var t=this.others.length;t--;)this.others[t].onChange(e)
this.updateMarkers()}updateMarkers(){if(!this.$updating){var e=this,t=this.session,i=function(i,s){t.removeMarker(i.markerId),i.markerId=t.addMarker(new n(i.row,i.column,i.row,i.column+e.length),s,null,!1)}
i(this.pos,this.mainClass)
for(var s=this.others.length;s--;)i(this.others[s],this.othersClass)}}onCursorChange(e){if(!this.$updating&&this.session){var t=this.session.selection.getCursor()
t.row===this.pos.row&&t.column>=this.pos.column&&t.column<=this.pos.column+this.length?(this.showOtherMarkers(),this._emit("cursorEnter",e)):(this.hideOtherMarkers(),this._emit("cursorLeave",e))}}detach(){this.session.removeMarker(this.pos&&this.pos.markerId),this.hideOtherMarkers(),this.doc.off("change",this.$onUpdate),this.session.selection.off("changeCursor",this.$onCursorChange),this.session.setUndoSelect(!0),this.session=null}cancel(){if(-1!==this.$undoStackDepth){for(var e=this.session.getUndoManager(),t=(e.$undoStack||e.$undostack).length-this.$undoStackDepth,i=0;i<t;i++)e.undo(this.session,!0)
this.selectionBefore&&this.session.selection.fromJSON(this.selectionBefore)}}}r.implement(o.prototype,s),t.PlaceHolder=o},4074:(e,t)=>{class i{constructor(e,t,i,n){this.start={row:e,column:t},this.end={row:i,column:n}}isEqual(e){return this.start.row===e.start.row&&this.end.row===e.end.row&&this.start.column===e.start.column&&this.end.column===e.end.column}toString(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"}contains(e,t){return 0==this.compare(e,t)}compareRange(e){var t,i=e.end,n=e.start
return 1==(t=this.compare(i.row,i.column))?1==(t=this.compare(n.row,n.column))?2:0==t?1:0:-1==t?-2:-1==(t=this.compare(n.row,n.column))?-1:1==t?42:0}comparePoint(e){return this.compare(e.row,e.column)}containsRange(e){return 0==this.comparePoint(e.start)&&0==this.comparePoint(e.end)}intersects(e){var t=this.compareRange(e)
return-1==t||0==t||1==t}isEnd(e,t){return this.end.row==e&&this.end.column==t}isStart(e,t){return this.start.row==e&&this.start.column==t}setStart(e,t){"object"==typeof e?(this.start.column=e.column,this.start.row=e.row):(this.start.row=e,this.start.column=t)}setEnd(e,t){"object"==typeof e?(this.end.column=e.column,this.end.row=e.row):(this.end.row=e,this.end.column=t)}inside(e,t){return 0==this.compare(e,t)&&!this.isEnd(e,t)&&!this.isStart(e,t)}insideStart(e,t){return 0==this.compare(e,t)&&!this.isEnd(e,t)}insideEnd(e,t){return 0==this.compare(e,t)&&!this.isStart(e,t)}compare(e,t){return this.isMultiLine()||e!==this.start.row?e<this.start.row?-1:e>this.end.row?1:this.start.row===e?t>=this.start.column?0:-1:this.end.row===e?t<=this.end.column?0:1:0:t<this.start.column?-1:t>this.end.column?1:0}compareStart(e,t){return this.start.row==e&&this.start.column==t?-1:this.compare(e,t)}compareEnd(e,t){return this.end.row==e&&this.end.column==t?1:this.compare(e,t)}compareInside(e,t){return this.end.row==e&&this.end.column==t?1:this.start.row==e&&this.start.column==t?-1:this.compare(e,t)}clipRows(e,t){if(this.end.row>t)var n={row:t+1,column:0}
else this.end.row<e&&(n={row:e,column:0})
if(this.start.row>t)var s={row:t+1,column:0}
else this.start.row<e&&(s={row:e,column:0})
return i.fromPoints(s||this.start,n||this.end)}extend(e,t){var n=this.compare(e,t)
if(0==n)return this
if(-1==n)var s={row:e,column:t}
else var r={row:e,column:t}
return i.fromPoints(s||this.start,r||this.end)}isEmpty(){return this.start.row===this.end.row&&this.start.column===this.end.column}isMultiLine(){return this.start.row!==this.end.row}clone(){return i.fromPoints(this.start,this.end)}collapseRows(){return 0==this.end.column?new i(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new i(this.start.row,0,this.end.row,0)}toScreenRange(e){var t=e.documentToScreenPosition(this.start),n=e.documentToScreenPosition(this.end)
return new i(t.row,t.column,n.row,n.column)}moveBy(e,t){this.start.row+=e,this.start.column+=t,this.end.row+=e,this.end.column+=t}}i.fromPoints=function(e,t){return new i(e.row,e.column,t.row,t.column)},i.comparePoints=function(e,t){return e.row-t.row||e.column-t.column},t.Q=i},9537:(e,t,i)=>{var n=i(4074).Q.comparePoints
class s{constructor(){this.ranges=[],this.$bias=1}pointIndex(e,t,i){for(var s=this.ranges,r=i||0;r<s.length;r++){var o=s[r],a=n(e,o.end)
if(!(a>0)){var l=n(e,o.start)
return 0===a?t&&0!==l?-r-2:r:l>0||0===l&&!t?r:-r-1}}return-r-1}add(e){var t=!e.isEmpty(),i=this.pointIndex(e.start,t)
i<0&&(i=-i-1)
var n=this.pointIndex(e.end,t,i)
return n<0?n=-n-1:n++,this.ranges.splice(i,n-i,e)}addList(e){for(var t=[],i=e.length;i--;)t.push.apply(t,this.add(e[i]))
return t}substractPoint(e){var t=this.pointIndex(e)
if(t>=0)return this.ranges.splice(t,1)}merge(){for(var e,t=[],i=this.ranges,s=(i=i.sort((function(e,t){return n(e.start,t.start)})))[0],r=1;r<i.length;r++){e=s,s=i[r]
var o=n(e.end,s.start)
o<0||(0!=o||e.isEmpty()||s.isEmpty())&&(n(e.end,s.end)<0&&(e.end.row=s.end.row,e.end.column=s.end.column),i.splice(r,1),t.push(s),s=e,r--)}return this.ranges=i,t}contains(e,t){return this.pointIndex({row:e,column:t})>=0}containsPoint(e){return this.pointIndex(e)>=0}rangeAtPoint(e){var t=this.pointIndex(e)
if(t>=0)return this.ranges[t]}clipRows(e,t){var i=this.ranges
if(i[0].start.row>t||i[i.length-1].start.row<e)return[]
var n=this.pointIndex({row:e,column:0})
n<0&&(n=-n-1)
var s=this.pointIndex({row:t,column:0},n)
s<0&&(s=-s-1)
for(var r=[],o=n;o<s;o++)r.push(i[o])
return r}removeAll(){return this.ranges.splice(0,this.ranges.length)}attach(e){this.session&&this.detach(),this.session=e,this.onChange=this.$onChange.bind(this),this.session.on("change",this.onChange)}detach(){this.session&&(this.session.removeListener("change",this.onChange),this.session=null)}$onChange(e){for(var t=e.start,i=e.end,n=t.row,s=i.row,r=this.ranges,o=0,a=r.length;o<a&&!((c=r[o]).end.row>=n);o++);if("insert"==e.action){for(var l=s-n,h=-t.column+i.column;o<a&&!((c=r[o]).start.row>n);o++)if(c.start.row==n&&c.start.column>=t.column&&(c.start.column==t.column&&this.$bias<=0||(c.start.column+=h,c.start.row+=l)),c.end.row==n&&c.end.column>=t.column){if(c.end.column==t.column&&this.$bias<0)continue
c.end.column==t.column&&h>0&&o<a-1&&c.end.column>c.start.column&&c.end.column==r[o+1].start.column&&(c.end.column-=h),c.end.column+=h,c.end.row+=l}}else for(l=n-s,h=t.column-i.column;o<a&&!((c=r[o]).start.row>s);o++)c.end.row<s&&(n<c.end.row||n==c.end.row&&t.column<c.end.column)?(c.end.row=n,c.end.column=t.column):c.end.row==s?c.end.column<=i.column?(l||c.end.column>t.column)&&(c.end.column=t.column,c.end.row=t.row):(c.end.column+=h,c.end.row+=l):c.end.row>s&&(c.end.row+=l),c.start.row<s&&(n<c.start.row||n==c.start.row&&t.column<c.start.column)?(c.start.row=n,c.start.column=t.column):c.start.row==s?c.start.column<=i.column?(l||c.start.column>t.column)&&(c.start.column=t.column,c.start.row=t.row):(c.start.column+=h,c.start.row+=l):c.start.row>s&&(c.start.row+=l)
if(0!=l&&o<a)for(;o<a;o++){var c;(c=r[o]).start.row+=l,c.end.row+=l}}}s.prototype.comparePoints=n,t.U=s},1197:(e,t,i)=>{var n=i(2507)
t.x=class{constructor(e,t){this.onRender=e,this.pending=!1,this.changes=0,this.$recursionLimit=2,this.window=t||window
var i=this
this._flush=function(){i.pending=!1
var e=i.changes
if(e&&(n.blockIdle(100),i.changes=0,i.onRender(e)),i.changes){if(i.$recursionLimit--<0)return
i.schedule()}else i.$recursionLimit=2}}schedule(e){this.changes=this.changes|e,this.changes&&!this.pending&&(n.nextFrame(this._flush),this.pending=!0)}clear(e){var t=this.changes
return this.changes=0,t}}},5405:(e,t,i)=>{var n=i(8297),s=i(215),r=i(2507),o=i(8770).b,a=32768
class l{constructor(e,t){this.element=s.createElement("div"),this.element.className="ace_scrollbar ace_scrollbar"+t,this.inner=s.createElement("div"),this.inner.className="ace_scrollbar-inner",this.inner.textContent="\xa0",this.element.appendChild(this.inner),e.appendChild(this.element),this.setVisible(!1),this.skipEvent=!1,r.addListener(this.element,"scroll",this.onScroll.bind(this)),r.addListener(this.element,"mousedown",r.preventDefault)}setVisible(e){this.element.style.display=e?"":"none",this.isVisible=e,this.coeff=1}}n.implement(l.prototype,o)
class h extends l{constructor(e,t){super(e,"-v"),this.scrollTop=0,this.scrollHeight=0,t.$scrollbarWidth=this.width=s.scrollbarWidth(e.ownerDocument),this.inner.style.width=this.element.style.width=(this.width||15)+5+"px",this.$minWidth=0}onScroll(){if(!this.skipEvent){if(this.scrollTop=this.element.scrollTop,1!=this.coeff){var e=this.element.clientHeight/this.scrollHeight
this.scrollTop=this.scrollTop*(1-e)/(this.coeff-e)}this._emit("scroll",{data:this.scrollTop})}this.skipEvent=!1}getWidth(){return Math.max(this.isVisible?this.width:0,this.$minWidth||0)}setHeight(e){this.element.style.height=e+"px"}setScrollHeight(e){this.scrollHeight=e,e>a?(this.coeff=a/e,e=a):1!=this.coeff&&(this.coeff=1),this.inner.style.height=e+"px"}setScrollTop(e){this.scrollTop!=e&&(this.skipEvent=!0,this.scrollTop=e,this.element.scrollTop=e*this.coeff)}}h.prototype.setInnerHeight=h.prototype.setScrollHeight
class c extends l{constructor(e,t){super(e,"-h"),this.scrollLeft=0,this.height=t.$scrollbarWidth,this.inner.style.height=this.element.style.height=(this.height||15)+5+"px"}onScroll(){this.skipEvent||(this.scrollLeft=this.element.scrollLeft,this._emit("scroll",{data:this.scrollLeft})),this.skipEvent=!1}getHeight(){return this.isVisible?this.height:0}setWidth(e){this.element.style.width=e+"px"}setInnerWidth(e){this.inner.style.width=e+"px"}setScrollWidth(e){this.inner.style.width=e+"px"}setScrollLeft(e){this.scrollLeft!=e&&(this.skipEvent=!0,this.scrollLeft=this.element.scrollLeft=e)}}t.vB=h,t.V1=c},2083:(e,t,i)=>{var n=i(8297),s=i(215),r=i(2507),o=i(8770).b
s.importCssString(".ace_editor>.ace_sb-v div, .ace_editor>.ace_sb-h div{\n  position: absolute;\n  background: rgba(128, 128, 128, 0.6);\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  border: 1px solid #bbb;\n  border-radius: 2px;\n  z-index: 8;\n}\n.ace_editor>.ace_sb-v, .ace_editor>.ace_sb-h {\n  position: absolute;\n  z-index: 6;\n  background: none;\n  overflow: hidden!important;\n}\n.ace_editor>.ace_sb-v {\n  z-index: 6;\n  right: 0;\n  top: 0;\n  width: 12px;\n}\n.ace_editor>.ace_sb-v div {\n  z-index: 8;\n  right: 0;\n  width: 100%;\n}\n.ace_editor>.ace_sb-h {\n  bottom: 0;\n  left: 0;\n  height: 12px;\n}\n.ace_editor>.ace_sb-h div {\n  bottom: 0;\n  height: 100%;\n}\n.ace_editor>.ace_sb_grabbed {\n  z-index: 8;\n  background: #000;\n}","ace_scrollbar.css",!1)
class a{constructor(e,t){this.element=s.createElement("div"),this.element.className="ace_sb"+t,this.inner=s.createElement("div"),this.inner.className="",this.element.appendChild(this.inner),this.VScrollWidth=12,this.HScrollHeight=12,e.appendChild(this.element),this.setVisible(!1),this.skipEvent=!1,r.addMultiMouseDownListener(this.element,[500,300,300],this,"onMouseDown")}setVisible(e){this.element.style.display=e?"":"none",this.isVisible=e,this.coeff=1}}n.implement(a.prototype,o)
class l extends a{constructor(e,t){super(e,"-v"),this.scrollTop=0,this.scrollHeight=0,this.parent=e,this.width=this.VScrollWidth,this.renderer=t,this.inner.style.width=this.element.style.width=(this.width||15)+"px",this.$minWidth=0}onMouseDown(e,t){if("mousedown"===e&&0===r.getButton(t)&&2!==t.detail){if(t.target===this.inner){var i=this,n=t.clientY,s=t.clientY,o=this.thumbTop
r.capture(this.inner,(function(e){n=e.clientY}),(function(){clearInterval(a)}))
var a=setInterval((function(){if(void 0!==n){var e=i.scrollTopFromThumbTop(o+n-s)
e!==i.scrollTop&&i._emit("scroll",{data:e})}}),20)
return r.preventDefault(t)}var l=t.clientY-this.element.getBoundingClientRect().top-this.thumbHeight/2
return this._emit("scroll",{data:this.scrollTopFromThumbTop(l)}),r.preventDefault(t)}}getHeight(){return this.height}scrollTopFromThumbTop(e){var t=e*(this.pageHeight-this.viewHeight)/(this.slideHeight-this.thumbHeight)
return(t|=0)<0?t=0:t>this.pageHeight-this.viewHeight&&(t=this.pageHeight-this.viewHeight),t}getWidth(){return Math.max(this.isVisible?this.width:0,this.$minWidth||0)}setHeight(e){this.height=Math.max(0,e),this.slideHeight=this.height,this.viewHeight=this.height,this.setScrollHeight(this.pageHeight,!0)}setScrollHeight(e,t){(this.pageHeight!==e||t)&&(this.pageHeight=e,this.thumbHeight=this.slideHeight*this.viewHeight/this.pageHeight,this.thumbHeight>this.slideHeight&&(this.thumbHeight=this.slideHeight),this.thumbHeight<15&&(this.thumbHeight=15),this.inner.style.height=this.thumbHeight+"px",this.scrollTop>this.pageHeight-this.viewHeight&&(this.scrollTop=this.pageHeight-this.viewHeight,this.scrollTop<0&&(this.scrollTop=0),this._emit("scroll",{data:this.scrollTop})))}setScrollTop(e){this.scrollTop=e,e<0&&(e=0),this.thumbTop=e*(this.slideHeight-this.thumbHeight)/(this.pageHeight-this.viewHeight),this.inner.style.top=this.thumbTop+"px"}}l.prototype.setInnerHeight=l.prototype.setScrollHeight
class h extends a{constructor(e,t){super(e,"-h"),this.scrollLeft=0,this.scrollWidth=0,this.height=this.HScrollHeight,this.inner.style.height=this.element.style.height=(this.height||12)+"px",this.renderer=t}onMouseDown(e,t){if("mousedown"===e&&0===r.getButton(t)&&2!==t.detail){if(t.target===this.inner){var i=this,n=t.clientX,s=t.clientX,o=this.thumbLeft
r.capture(this.inner,(function(e){n=e.clientX}),(function(){clearInterval(a)}))
var a=setInterval((function(){if(void 0!==n){var e=i.scrollLeftFromThumbLeft(o+n-s)
e!==i.scrollLeft&&i._emit("scroll",{data:e})}}),20)
return r.preventDefault(t)}var l=t.clientX-this.element.getBoundingClientRect().left-this.thumbWidth/2
return this._emit("scroll",{data:this.scrollLeftFromThumbLeft(l)}),r.preventDefault(t)}}getHeight(){return this.isVisible?this.height:0}scrollLeftFromThumbLeft(e){var t=e*(this.pageWidth-this.viewWidth)/(this.slideWidth-this.thumbWidth)
return(t|=0)<0?t=0:t>this.pageWidth-this.viewWidth&&(t=this.pageWidth-this.viewWidth),t}setWidth(e){this.width=Math.max(0,e),this.element.style.width=this.width+"px",this.slideWidth=this.width,this.viewWidth=this.width,this.setScrollWidth(this.pageWidth,!0)}setScrollWidth(e,t){(this.pageWidth!==e||t)&&(this.pageWidth=e,this.thumbWidth=this.slideWidth*this.viewWidth/this.pageWidth,this.thumbWidth>this.slideWidth&&(this.thumbWidth=this.slideWidth),this.thumbWidth<15&&(this.thumbWidth=15),this.inner.style.width=this.thumbWidth+"px",this.scrollLeft>this.pageWidth-this.viewWidth&&(this.scrollLeft=this.pageWidth-this.viewWidth,this.scrollLeft<0&&(this.scrollLeft=0),this._emit("scroll",{data:this.scrollLeft})))}setScrollLeft(e){this.scrollLeft=e,e<0&&(e=0),this.thumbLeft=e*(this.slideWidth-this.thumbWidth)/(this.pageWidth-this.viewWidth),this.inner.style.left=this.thumbLeft+"px"}}h.prototype.setInnerWidth=h.prototype.setScrollWidth,t.vB=l,t.V1=h},1143:(e,t,i)=>{var n=i(3927),s=i(8297),r=i(4074).Q
t.v=class{constructor(){this.$options={}}set(e){return s.mixin(this.$options,e),this}getOptions(){return n.copyObject(this.$options)}setOptions(e){this.$options=e}find(e){var t=this.$options,i=this.$matchIterator(e,t)
if(!i)return!1
var n=null
return i.forEach((function(e,i,s,o){return n=new r(e,i,s,o),!(i==o&&t.start&&t.start.start&&0!=t.skipCurrent&&n.isEqual(t.start)&&(n=null,1))})),n}findAll(e){var t=this.$options
if(!t.needle)return[]
this.$assembleRegExp(t)
var i=t.range,s=i?e.getLines(i.start.row,i.end.row):e.doc.getAllLines(),o=[],a=t.re
if(t.$isMultiLine){var l,h=a.length,c=s.length-h
e:for(var u=a.offset||0;u<=c;u++){for(var d=0;d<h;d++)if(-1==s[u+d].search(a[d]))continue e
var g=s[u],p=s[u+h-1],m=g.length-g.match(a[0])[0].length,f=p.match(a[h-1])[0].length
l&&l.end.row===u&&l.end.column>m||(o.push(l=new r(u,m,u+h-1,f)),h>2&&(u=u+h-2))}}else for(var v=0;v<s.length;v++){var w=n.getMatchOffsets(s[v],a)
for(d=0;d<w.length;d++){var y=w[d]
o.push(new r(v,y.offset,v,y.offset+y.length))}}if(i){var x=i.start.column,b=i.end.column
for(v=0,d=o.length-1;v<d&&o[v].start.column<x&&0==o[v].start.row;)v++
for(var C=i.end.row-i.start.row;v<d&&o[d].end.column>b&&o[d].end.row==C;)d--
for(o=o.slice(v,d+1),v=0,d=o.length;v<d;v++)o[v].start.row+=i.start.row,o[v].end.row+=i.start.row}return o}replace(e,t){var i=this.$options,n=this.$assembleRegExp(i)
if(i.$isMultiLine)return t
if(n){var s=n.exec(e)
if(!s||s[0].length!=e.length)return null
if(i.regExp||(t=t.replace(/\$/g,"$$$$")),t=e.replace(n,t),i.preserveCase){t=t.split("")
for(var r=Math.min(e.length,e.length);r--;){var o=e[r]
o&&o.toLowerCase()!=o?t[r]=t[r].toUpperCase():t[r]=t[r].toLowerCase()}t=t.join("")}return t}}$assembleRegExp(e,t){if(e.needle instanceof RegExp)return e.re=e.needle
var i=e.needle
if(!e.needle)return e.re=!1
e.regExp||(i=n.escapeRegExp(i))
var s=e.caseSensitive?"gm":"gmi"
try{RegExp(i,"u"),e.$supportsUnicodeFlag=!0,s+="u"}catch(t){e.$supportsUnicodeFlag=!1}if(e.wholeWord&&(i=function(e,t){function i(e,i=!0){return(s&&t.$supportsUnicodeFlag?RegExp("[\\p{L}\\p{N}_]","u"):/\w/).test(e)||t.regExp?s&&t.$supportsUnicodeFlag?i?"(?<=^|[^\\p{L}\\p{N}_])":"(?=[^\\p{L}\\p{N}_]|$)":"\\b":""}let s=n.supportsLookbehind(),r=Array.from(e),o=r[0],a=r[r.length-1]
return i(o)+e+i(a,!1)}(i,e)),e.$isMultiLine=!t&&/[\n\r]/.test(i),e.$isMultiLine)return e.re=this.$assembleMultilineRegExp(i,s)
try{var r=RegExp(i,s)}catch(e){r=!1}return e.re=r}$assembleMultilineRegExp(e,t){for(var i=e.replace(/\r\n|\r|\n/g,"$\n^").split("\n"),n=[],s=0;s<i.length;s++)try{n.push(RegExp(i[s],t))}catch(e){return!1}return n}$matchIterator(e,t){var i=this.$assembleRegExp(t)
if(!i)return!1
var s=1==t.backwards,r=0!=t.skipCurrent,o=i.unicode,a=t.range,l=t.start
l||(l=a?a[s?"end":"start"]:e.selection.getRange()),l.start&&(l=l[r!=s?"end":"start"])
var h=a?a.start.row:0,c=a?a.end.row:e.getLength()-1
if(s)var u=function(e){var i=l.row
if(!g(i,l.column,e)){for(i--;i>=h;i--)if(g(i,Number.MAX_VALUE,e))return
if(0!=t.wrap)for(i=c,h=l.row;i>=h;i--)if(g(i,Number.MAX_VALUE,e))return}}
else u=function(e){var i=l.row
if(!g(i,l.column,e)){for(i+=1;i<=c;i++)if(g(i,0,e))return
if(0!=t.wrap)for(i=h,c=l.row;i<=c;i++)if(g(i,0,e))return}}
if(t.$isMultiLine)var d=i.length,g=function(t,n,r){var o=s?t-d+1:t
if(!(o<0||o+d>e.getLength())){var a=e.getLine(o),l=a.search(i[0])
if(!(!s&&l<n||-1===l)){for(var h=1;h<d;h++)if(-1==(a=e.getLine(o+h)).search(i[h]))return
var c=a.match(i[d-1])[0].length
if(!(s&&c>n))return!!r(o,l,o+d-1,c)||void 0}}}
else g=s?function(t,s,r){var a,l=e.getLine(t),h=[],c=0
for(i.lastIndex=0;a=i.exec(l);){var u=a[0].length
if(c=a.index,!u){if(c>=l.length)break
i.lastIndex=c+=n.skipEmptyMatch(l,c,o)}if(a.index+u>s)break
h.push(a.index,u)}for(var d=h.length-1;d>=0;d-=2){var g=h[d-1]
if(r(t,g,t,g+(u=h[d])))return!0}}:function(t,s,r){var a,l,h=e.getLine(t)
for(i.lastIndex=s;l=i.exec(h);){var c=l[0].length
if(r(t,a=l.index,t,a+c))return!0
if(!c&&(i.lastIndex=a+=n.skipEmptyMatch(h,a,o),a>=h.length))return!1}}
return{forEach:u}}}},8748:(e,t,i)=>{var n=i(3927),s=i(4074).Q
class r{constructor(e,t,i="text"){this.setRegexp(e),this.clazz=t,this.type=i}setRegexp(e){this.regExp+""!=e+""&&(this.regExp=e,this.cache=[])}update(e,t,i,r){if(this.regExp)for(var o=r.firstRow,a=r.lastRow,l={},h=o;h<=a;h++){var c=this.cache[h]
null==c&&((c=n.getMatchOffsets(i.getLine(h),this.regExp)).length>this.MAX_RANGES&&(c=c.slice(0,this.MAX_RANGES)),c=c.map((function(e){return new s(h,e.offset,h,e.offset+e.length)})),this.cache[h]=c.length?c:"")
for(var u=c.length;u--;){var d=c[u].toScreenRange(i),g=d.toString()
l[g]||(l[g]=!0,t.drawSingleLineMarker(e,d,this.clazz,r))}}}}r.prototype.MAX_RANGES=500,t.V=r},3933:(e,t,i)=>{var n=i(8297),s=i(3927),r=i(8770).b,o=i(4074).Q
class a{constructor(e){this.session=e,this.doc=e.getDocument(),this.clearSelection(),this.cursor=this.lead=this.doc.createAnchor(0,0),this.anchor=this.doc.createAnchor(0,0),this.$silent=!1
var t=this
this.cursor.on("change",(function(e){t.$cursorChanged=!0,t.$silent||t._emit("changeCursor"),t.$isEmpty||t.$silent||t._emit("changeSelection"),t.$keepDesiredColumnOnChange||e.old.column==e.value.column||(t.$desiredColumn=null)})),this.anchor.on("change",(function(){t.$anchorChanged=!0,t.$isEmpty||t.$silent||t._emit("changeSelection")}))}isEmpty(){return this.$isEmpty||this.anchor.row==this.lead.row&&this.anchor.column==this.lead.column}isMultiLine(){return!this.$isEmpty&&this.anchor.row!=this.cursor.row}getCursor(){return this.lead.getPosition()}setAnchor(e,t){this.$isEmpty=!1,this.anchor.setPosition(e,t)}getAnchor(){return this.$isEmpty?this.getSelectionLead():this.anchor.getPosition()}getSelectionLead(){return this.lead.getPosition()}isBackwards(){var e=this.anchor,t=this.lead
return e.row>t.row||e.row==t.row&&e.column>t.column}getRange(){var e=this.anchor,t=this.lead
return this.$isEmpty?o.fromPoints(t,t):this.isBackwards()?o.fromPoints(t,e):o.fromPoints(e,t)}clearSelection(){this.$isEmpty||(this.$isEmpty=!0,this._emit("changeSelection"))}selectAll(){this.$setSelection(0,0,Number.MAX_VALUE,Number.MAX_VALUE)}setRange(e,t){var i=t?e.end:e.start,n=t?e.start:e.end
this.$setSelection(i.row,i.column,n.row,n.column)}$setSelection(e,t,i,n){if(!this.$silent){var s=this.$isEmpty,r=this.inMultiSelectMode
this.$silent=!0,this.$cursorChanged=this.$anchorChanged=!1,this.anchor.setPosition(e,t),this.cursor.setPosition(i,n),this.$isEmpty=!o.comparePoints(this.anchor,this.cursor),this.$silent=!1,this.$cursorChanged&&this._emit("changeCursor"),(this.$cursorChanged||this.$anchorChanged||s!=this.$isEmpty||r)&&this._emit("changeSelection")}}$moveSelection(e){var t=this.lead
this.$isEmpty&&this.setSelectionAnchor(t.row,t.column),e.call(this)}selectTo(e,t){this.$moveSelection((function(){this.moveCursorTo(e,t)}))}selectToPosition(e){this.$moveSelection((function(){this.moveCursorToPosition(e)}))}moveTo(e,t){this.clearSelection(),this.moveCursorTo(e,t)}moveToPosition(e){this.clearSelection(),this.moveCursorToPosition(e)}selectUp(){this.$moveSelection(this.moveCursorUp)}selectDown(){this.$moveSelection(this.moveCursorDown)}selectRight(){this.$moveSelection(this.moveCursorRight)}selectLeft(){this.$moveSelection(this.moveCursorLeft)}selectLineStart(){this.$moveSelection(this.moveCursorLineStart)}selectLineEnd(){this.$moveSelection(this.moveCursorLineEnd)}selectFileEnd(){this.$moveSelection(this.moveCursorFileEnd)}selectFileStart(){this.$moveSelection(this.moveCursorFileStart)}selectWordRight(){this.$moveSelection(this.moveCursorWordRight)}selectWordLeft(){this.$moveSelection(this.moveCursorWordLeft)}getWordRange(e,t){if(void 0===t){var i=e||this.lead
e=i.row,t=i.column}return this.session.getWordRange(e,t)}selectWord(){this.setSelectionRange(this.getWordRange())}selectAWord(){var e=this.getCursor(),t=this.session.getAWordRange(e.row,e.column)
this.setSelectionRange(t)}getLineRange(e,t){var i,n="number"==typeof e?e:this.lead.row,s=this.session.getFoldLine(n)
return s?(n=s.start.row,i=s.end.row):i=n,!0===t?new o(n,0,i,this.session.getLine(i).length):new o(n,0,i+1,0)}selectLine(){this.setSelectionRange(this.getLineRange())}moveCursorUp(){this.moveCursorBy(-1,0)}moveCursorDown(){this.moveCursorBy(1,0)}wouldMoveIntoSoftTab(e,t,i){var n=e.column,s=e.column+t
return i<0&&(n=e.column-t,s=e.column),this.session.isTabStop(e)&&this.doc.getLine(e.row).slice(n,s).split(" ").length-1==t}moveCursorLeft(){var e,t=this.lead.getPosition()
if(e=this.session.getFoldAt(t.row,t.column,-1))this.moveCursorTo(e.start.row,e.start.column)
else if(0===t.column)t.row>0&&this.moveCursorTo(t.row-1,this.doc.getLine(t.row-1).length)
else{var i=this.session.getTabSize()
this.wouldMoveIntoSoftTab(t,i,-1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,-i):this.moveCursorBy(0,-1)}}moveCursorRight(){var e,t=this.lead.getPosition()
if(e=this.session.getFoldAt(t.row,t.column,1))this.moveCursorTo(e.end.row,e.end.column)
else if(this.lead.column==this.doc.getLine(this.lead.row).length)this.lead.row<this.doc.getLength()-1&&this.moveCursorTo(this.lead.row+1,0)
else{var i=this.session.getTabSize()
t=this.lead,this.wouldMoveIntoSoftTab(t,i,1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,i):this.moveCursorBy(0,1)}}moveCursorLineStart(){var e=this.lead.row,t=this.lead.column,i=this.session.documentToScreenRow(e,t),n=this.session.screenToDocumentPosition(i,0),s=this.session.getDisplayLine(e,null,n.row,n.column).match(/^\s*/)
s[0].length==t||this.session.$useEmacsStyleLineStart||(n.column+=s[0].length),this.moveCursorToPosition(n)}moveCursorLineEnd(){var e=this.lead,t=this.session.getDocumentLastRowColumnPosition(e.row,e.column)
if(this.lead.column==t.column){var i=this.session.getLine(t.row)
if(t.column==i.length){var n=i.search(/\s+$/)
n>0&&(t.column=n)}}this.moveCursorTo(t.row,t.column)}moveCursorFileEnd(){var e=this.doc.getLength()-1,t=this.doc.getLine(e).length
this.moveCursorTo(e,t)}moveCursorFileStart(){this.moveCursorTo(0,0)}moveCursorLongWordRight(){var e=this.lead.row,t=this.lead.column,i=this.doc.getLine(e),n=i.substring(t)
this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0
var s=this.session.getFoldAt(e,t,1)
if(s)this.moveCursorTo(s.end.row,s.end.column)
else{if(this.session.nonTokenRe.exec(n)&&(t+=this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex=0,n=i.substring(t)),t>=i.length)return this.moveCursorTo(e,i.length),this.moveCursorRight(),void(e<this.doc.getLength()-1&&this.moveCursorWordRight())
this.session.tokenRe.exec(n)&&(t+=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0),this.moveCursorTo(e,t)}}moveCursorLongWordLeft(){var e,t=this.lead.row,i=this.lead.column
if(e=this.session.getFoldAt(t,i,-1))this.moveCursorTo(e.start.row,e.start.column)
else{var n=this.session.getFoldStringAt(t,i,-1)
null==n&&(n=this.doc.getLine(t).substring(0,i))
var r=s.stringReverse(n)
if(this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0,this.session.nonTokenRe.exec(r)&&(i-=this.session.nonTokenRe.lastIndex,r=r.slice(this.session.nonTokenRe.lastIndex),this.session.nonTokenRe.lastIndex=0),i<=0)return this.moveCursorTo(t,0),this.moveCursorLeft(),void(t>0&&this.moveCursorWordLeft())
this.session.tokenRe.exec(r)&&(i-=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0),this.moveCursorTo(t,i)}}$shortWordEndIndex(e){var t,i=0,n=/\s/,s=this.session.tokenRe
if(s.lastIndex=0,this.session.tokenRe.exec(e))i=this.session.tokenRe.lastIndex
else{for(;(t=e[i])&&n.test(t);)i++
if(i<1)for(s.lastIndex=0;(t=e[i])&&!s.test(t);)if(s.lastIndex=0,i++,n.test(t)){if(i>2){i--
break}for(;(t=e[i])&&n.test(t);)i++
if(i>2)break}}return s.lastIndex=0,i}moveCursorShortWordRight(){var e=this.lead.row,t=this.lead.column,i=this.doc.getLine(e),n=i.substring(t),s=this.session.getFoldAt(e,t,1)
if(s)return this.moveCursorTo(s.end.row,s.end.column)
if(t==i.length){var r=this.doc.getLength()
do{e++,n=this.doc.getLine(e)}while(e<r&&/^\s*$/.test(n));/^\s+/.test(n)||(n=""),t=0}var o=this.$shortWordEndIndex(n)
this.moveCursorTo(e,t+o)}moveCursorShortWordLeft(){var e,t=this.lead.row,i=this.lead.column
if(e=this.session.getFoldAt(t,i,-1))return this.moveCursorTo(e.start.row,e.start.column)
var n=this.session.getLine(t).substring(0,i)
if(0===i){do{t--,n=this.doc.getLine(t)}while(t>0&&/^\s*$/.test(n))
i=n.length,/\s+$/.test(n)||(n="")}var r=s.stringReverse(n),o=this.$shortWordEndIndex(r)
return this.moveCursorTo(t,i-o)}moveCursorWordRight(){this.session.$selectLongWords?this.moveCursorLongWordRight():this.moveCursorShortWordRight()}moveCursorWordLeft(){this.session.$selectLongWords?this.moveCursorLongWordLeft():this.moveCursorShortWordLeft()}moveCursorBy(e,t){var i,n=this.session.documentToScreenPosition(this.lead.row,this.lead.column)
if(0===t&&(0!==e&&(this.session.$bidiHandler.isBidiRow(n.row,this.lead.row)?(i=this.session.$bidiHandler.getPosLeft(n.column),n.column=Math.round(i/this.session.$bidiHandler.charWidths[0])):i=n.column*this.session.$bidiHandler.charWidths[0]),this.$desiredColumn?n.column=this.$desiredColumn:this.$desiredColumn=n.column),0!=e&&this.session.lineWidgets&&this.session.lineWidgets[this.lead.row]){var s=this.session.lineWidgets[this.lead.row]
e<0?e-=s.rowsAbove||0:e>0&&(e+=s.rowCount-(s.rowsAbove||0))}var r=this.session.screenToDocumentPosition(n.row+e,n.column,i)
0!==e&&0===t&&r.row===this.lead.row&&(r.column,this.lead.column),this.moveCursorTo(r.row,r.column+t,0===t)}moveCursorToPosition(e){this.moveCursorTo(e.row,e.column)}moveCursorTo(e,t,i){var n=this.session.getFoldAt(e,t,1)
n&&(e=n.start.row,t=n.start.column),this.$keepDesiredColumnOnChange=!0
var s=this.session.getLine(e);/[\uDC00-\uDFFF]/.test(s.charAt(t))&&s.charAt(t-1)&&(this.lead.row==e&&this.lead.column==t+1?t-=1:t+=1),this.lead.setPosition(e,t),this.$keepDesiredColumnOnChange=!1,i||(this.$desiredColumn=null)}moveCursorToScreen(e,t,i){var n=this.session.screenToDocumentPosition(e,t)
this.moveCursorTo(n.row,n.column,i)}detach(){this.lead.detach(),this.anchor.detach()}fromOrientedRange(e){this.setSelectionRange(e,e.cursor==e.start),this.$desiredColumn=e.desiredColumn||this.$desiredColumn}toOrientedRange(e){var t=this.getRange()
return e?(e.start.column=t.start.column,e.start.row=t.start.row,e.end.column=t.end.column,e.end.row=t.end.row):e=t,e.cursor=this.isBackwards()?e.start:e.end,e.desiredColumn=this.$desiredColumn,e}getRangeOfMovements(e){var t=this.getCursor()
try{e(this)
var i=this.getCursor()
return o.fromPoints(t,i)}catch(e){return o.fromPoints(t,t)}finally{this.moveCursorToPosition(t)}}toJSON(){if(this.rangeCount)var e=this.ranges.map((function(e){var t=e.clone()
return t.isBackwards=e.cursor==e.start,t}))
else(e=this.getRange()).isBackwards=this.isBackwards()
return e}fromJSON(e){if(null==e.start){if(this.rangeList&&e.length>1){this.toSingleRange(e[0])
for(var t=e.length;t--;){var i=o.fromPoints(e[t].start,e[t].end)
e[t].isBackwards&&(i.cursor=i.start),this.addRange(i,!0)}return}e=e[0]}this.rangeList&&this.toSingleRange(e),this.setSelectionRange(e,e.isBackwards)}isEqual(e){if((e.length||this.rangeCount)&&e.length!=this.rangeCount)return!1
if(!e.length||!this.ranges)return this.getRange().isEqual(e)
for(var t=this.ranges.length;t--;)if(!this.ranges[t].isEqual(e[t]))return!1
return!0}}a.prototype.setSelectionAnchor=a.prototype.setAnchor,a.prototype.getSelectionAnchor=a.prototype.getAnchor,a.prototype.setSelectionRange=a.prototype.setRange,n.implement(a.prototype,r),t.L=a},2241:e=>{e.exports='.ace-tm .ace_gutter {\n  background: #f0f0f0;\n  color: #333;\n}\n\n.ace-tm .ace_print-margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-tm .ace_fold {\n    background-color: #6B72E6;\n}\n\n.ace-tm {\n  background-color: #FFFFFF;\n  color: black;\n}\n\n.ace-tm .ace_cursor {\n  color: black;\n}\n        \n.ace-tm .ace_invisible {\n  color: rgb(191, 191, 191);\n}\n\n.ace-tm .ace_storage,\n.ace-tm .ace_keyword {\n  color: blue;\n}\n\n.ace-tm .ace_constant {\n  color: rgb(197, 6, 11);\n}\n\n.ace-tm .ace_constant.ace_buildin {\n  color: rgb(88, 72, 246);\n}\n\n.ace-tm .ace_constant.ace_language {\n  color: rgb(88, 92, 246);\n}\n\n.ace-tm .ace_constant.ace_library {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_invalid {\n  background-color: rgba(255, 0, 0, 0.1);\n  color: red;\n}\n\n.ace-tm .ace_support.ace_function {\n  color: rgb(60, 76, 114);\n}\n\n.ace-tm .ace_support.ace_constant {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_support.ace_type,\n.ace-tm .ace_support.ace_class {\n  color: rgb(109, 121, 222);\n}\n\n.ace-tm .ace_keyword.ace_operator {\n  color: rgb(104, 118, 135);\n}\n\n.ace-tm .ace_string {\n  color: rgb(3, 106, 7);\n}\n\n.ace-tm .ace_comment {\n  color: rgb(76, 136, 107);\n}\n\n.ace-tm .ace_comment.ace_doc {\n  color: rgb(0, 102, 255);\n}\n\n.ace-tm .ace_comment.ace_doc.ace_tag {\n  color: rgb(128, 159, 191);\n}\n\n.ace-tm .ace_constant.ace_numeric {\n  color: rgb(0, 0, 205);\n}\n\n.ace-tm .ace_variable {\n  color: rgb(49, 132, 149);\n}\n\n.ace-tm .ace_xml-pe {\n  color: rgb(104, 104, 91);\n}\n\n.ace-tm .ace_entity.ace_name.ace_function {\n  color: #0000A2;\n}\n\n\n.ace-tm .ace_heading {\n  color: rgb(12, 7, 255);\n}\n\n.ace-tm .ace_list {\n  color:rgb(185, 6, 144);\n}\n\n.ace-tm .ace_meta.ace_tag {\n  color:rgb(0, 22, 142);\n}\n\n.ace-tm .ace_string.ace_regex {\n  color: rgb(255, 0, 0)\n}\n\n.ace-tm .ace_marker-layer .ace_selection {\n  background: rgb(181, 213, 255);\n}\n.ace-tm.ace_multiselect .ace_selection.ace_start {\n  box-shadow: 0 0 3px 0px white;\n}\n.ace-tm .ace_marker-layer .ace_step {\n  background: rgb(252, 255, 0);\n}\n\n.ace-tm .ace_marker-layer .ace_stack {\n  background: rgb(164, 229, 101);\n}\n\n.ace-tm .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgb(192, 192, 192);\n}\n\n.ace-tm .ace_marker-layer .ace_active-line {\n  background: rgba(0, 0, 0, 0.07);\n}\n\n.ace-tm .ace_gutter-active-line {\n    background-color : #dcdcdc;\n}\n\n.ace-tm .ace_marker-layer .ace_selected-word {\n  background: rgb(250, 250, 255);\n  border: 1px solid rgb(200, 200, 250);\n}\n\n.ace-tm .ace_indent-guide {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;\n}\n\n.ace-tm .ace_indent-guide-active {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;\n}\n'},4707:(e,t,i)=>{t.isDark=!1,t.cssClass="ace-tm",t.cssText=i(2241),t.$id="ace/theme/textmate",i(215).importCssString(t.cssText,t.cssClass,!1)},1871:(e,t,i)=>{var n=i(4074).Q
t.TokenIterator=class{constructor(e,t,i){this.$session=e,this.$row=t,this.$rowTokens=e.getTokens(t)
var n=e.getTokenAt(t,i)
this.$tokenIndex=n?n.index:-1}stepBackward(){for(this.$tokenIndex-=1;this.$tokenIndex<0;){if(this.$row-=1,this.$row<0)return this.$row=0,null
this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=this.$rowTokens.length-1}return this.$rowTokens[this.$tokenIndex]}stepForward(){var e
for(this.$tokenIndex+=1;this.$tokenIndex>=this.$rowTokens.length;){if(this.$row+=1,e||(e=this.$session.getLength()),this.$row>=e)return this.$row=e-1,null
this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=0}return this.$rowTokens[this.$tokenIndex]}getCurrentToken(){return this.$rowTokens[this.$tokenIndex]}getCurrentTokenRow(){return this.$row}getCurrentTokenColumn(){var e=this.$rowTokens,t=this.$tokenIndex,i=e[t].start
if(void 0!==i)return i
for(i=0;t>0;)i+=e[t-=1].value.length
return i}getCurrentTokenPosition(){return{row:this.$row,column:this.getCurrentTokenColumn()}}getCurrentTokenRange(){var e=this.$rowTokens[this.$tokenIndex],t=this.getCurrentTokenColumn()
return new n(this.$row,t,this.$row,t+e.value.length)}}},9266:(e,t,i)=>{const n=i(3536).N
var s=2e3
class r{constructor(e){for(var t in this.splitRegex,this.states=e,this.regExps={},this.matchMappings={},this.states){for(var i=this.states[t],n=[],s=0,r=this.matchMappings[t]={defaultToken:"text"},o="g",a=[],l=0;l<i.length;l++){var h=i[l]
if(h.defaultToken&&(r.defaultToken=h.defaultToken),h.caseInsensitive&&-1===o.indexOf("i")&&(o+="i"),h.unicode&&-1===o.indexOf("u")&&(o+="u"),null!=h.regex){h.regex instanceof RegExp&&(h.regex=h.regex.toString().slice(1,-1))
var c=h.regex,u=RegExp("(?:("+c+")|(.))").exec("a").length-2
Array.isArray(h.token)?1==h.token.length||1==u?h.token=h.token[0]:u-1!=h.token.length?(this.reportError("number of classes and regexp groups doesn't match",{rule:h,groupCount:u-1}),h.token=h.token[0]):(h.tokenArray=h.token,h.token=null,h.onMatch=this.$arrayTokens):"function"!=typeof h.token||h.onMatch||(h.onMatch=u>1?this.$applyToken:h.token),u>1&&(/\\\d/.test(h.regex)?c=h.regex.replace(/\\([0-9]+)/g,(function(e,t){return"\\"+(parseInt(t,10)+s+1)})):(u=1,c=this.removeCapturingGroups(h.regex)),h.splitRegex||"string"==typeof h.token||a.push(h)),r[s]=l,s+=u,n.push(c),h.onMatch||(h.onMatch=null)}}n.length||(r[0]=0,n.push("$")),a.forEach((function(e){e.splitRegex=this.createSplitterRegexp(e.regex,o)}),this),this.regExps[t]=RegExp("("+n.join(")|(")+")|($)",o)}}$setMaxTokenCount(e){s=0|e}$applyToken(e){var t=this.splitRegex.exec(e).slice(1),i=this.token.apply(this,t)
if("string"==typeof i)return[{type:i,value:e}]
for(var n=[],s=0,r=i.length;s<r;s++)t[s]&&(n[n.length]={type:i[s],value:t[s]})
return n}$arrayTokens(e){if(!e)return[]
var t=this.splitRegex.exec(e)
if(!t)return"text"
for(var i=[],n=this.tokenArray,s=0,r=n.length;s<r;s++)t[s+1]&&(i[i.length]={type:n[s],value:t[s+1]})
return i}removeCapturingGroups(e){return e.replace(/\\.|\[(?:\\.|[^\\\]])*|\(\?[:=!<]|(\()/g,(function(e,t){return t?"(?:":e}))}createSplitterRegexp(e,t){if(-1!=e.indexOf("(?=")){var i=0,n=!1,s={}
e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g,(function(e,t,r,o,a,l){return n?n="]"!=a:a?n=!0:o?(i==s.stack&&(s.end=l+1,s.stack=-1),i--):r&&(i++,1!=r.length&&(s.stack=i,s.start=l)),e})),null!=s.end&&/^\)*$/.test(e.substr(s.end))&&(e=e.substring(0,s.start)+e.substr(s.end))}return"^"!=e.charAt(0)&&(e="^"+e),"$"!=e.charAt(e.length-1)&&(e+="$"),RegExp(e,(t||"").replace("g",""))}getLineTokens(e,t){if(t&&"string"!=typeof t){var i=t.slice(0)
"#tmp"===(t=i[0])&&(i.shift(),t=i.shift())}else i=[]
var n=t||"start",r=this.states[n]
r||(n="start",r=this.states[n])
var o=this.matchMappings[n],a=this.regExps[n]
a.lastIndex=0
for(var l,h=[],c=0,u=0,d={type:null,value:""};l=a.exec(e);){var g=o.defaultToken,p=null,m=l[0],f=a.lastIndex
if(f-m.length>c){var v=e.substring(c,f-m.length)
d.type==g?d.value+=v:(d.type&&h.push(d),d={type:g,value:v})}for(var w=0;w<l.length-2;w++)if(void 0!==l[w+1]){g=(p=r[o[w]]).onMatch?p.onMatch(m,n,i,e):p.token,p.next&&(n="string"==typeof p.next?p.next:p.next(n,i),(r=this.states[n])||(this.reportError("state doesn't exist",n),n="start",r=this.states[n]),o=this.matchMappings[n],c=f,(a=this.regExps[n]).lastIndex=f),p.consumeLineEnd&&(c=f)
break}if(m)if("string"==typeof g)p&&!1===p.merge||d.type!==g?(d.type&&h.push(d),d={type:g,value:m}):d.value+=m
else if(g)for(d.type&&h.push(d),d={type:null,value:""},w=0;w<g.length;w++)h.push(g[w])
if(c==e.length)break
if(c=f,u++>s){for(u>2*e.length&&this.reportError("infinite loop with in ace tokenizer",{startState:t,line:e});c<e.length;)d.type&&h.push(d),d={value:e.substring(c,c+=500),type:"overflow"}
n="start",i=[]
break}}return d.type&&h.push(d),i.length>1&&i[0]!==n&&i.unshift("#tmp",n),{tokens:h,state:i.length?i:n}}}r.prototype.reportError=n,t._=r},2980:(e,t,i)=>{var n=i(215),s=(i(2507),i(4074).Q,i(6558).K,"ace_tooltip")
class r{constructor(e){this.isOpen=!1,this.$element=null,this.$parentNode=e}$init(){return this.$element=n.createElement("div"),this.$element.className=s,this.$element.style.display="none",this.$parentNode.appendChild(this.$element),this.$element}getElement(){return this.$element||this.$init()}setText(e){this.getElement().textContent=e}setHtml(e){this.getElement().innerHTML=e}setPosition(e,t){this.getElement().style.left=e+"px",this.getElement().style.top=t+"px"}setClassName(e){n.addCssClass(this.getElement(),e)}setTheme(e){this.$element.className=s+" "+(e.isDark?"ace_dark ":"")+(e.cssClass||"")}show(e,t,i){null!=e&&this.setText(e),null!=t&&null!=i&&this.setPosition(t,i),this.isOpen||(this.getElement().style.display="block",this.isOpen=!0)}hide(e){this.isOpen&&(this.getElement().style.display="none",this.getElement().className=s,this.isOpen=!1)}getHeight(){return this.getElement().offsetHeight}getWidth(){return this.getElement().offsetWidth}destroy(){this.isOpen=!1,this.$element&&this.$element.parentNode&&this.$element.parentNode.removeChild(this.$element)}}new class{constructor(){this.popups=[]}addPopup(e){this.popups.push(e),this.updatePopups()}removePopup(e){const t=this.popups.indexOf(e);-1!==t&&(this.popups.splice(t,1),this.updatePopups())}updatePopups(){this.popups.sort(((e,t)=>t.priority-e.priority))
let e=[]
for(let t of this.popups){let i=!0
for(let n of e)if(this.doPopupsOverlap(n,t)){i=!1
break}i?e.push(t):t.hide()}}doPopupsOverlap(e,t){const i=e.getElement().getBoundingClientRect(),n=t.getElement().getBoundingClientRect()
return i.left<n.right&&i.right>n.left&&i.top<n.bottom&&i.bottom>n.top}}
t.m_=r},258:(e,t,i)=>{function n(e){return{row:e.row,column:e.column}}function s(e){if(Array.isArray(e=e||this))return e.map(s).join("\n")
var t=""
return e.action?(t="insert"==e.action?"+":"-",t+="["+e.lines+"]"):e.value&&(t=Array.isArray(e.value)?e.value.map(r).join("\n"):r(e.value)),e.start&&(t+=r(e)),(e.id||e.rev)&&(t+="\t("+(e.id||e.rev)+")"),t}function r(e){return e.start.row+":"+e.start.column+"=>"+e.end.row+":"+e.end.column}function o(e,t){var i="insert"==e.action,n="insert"==t.action
if(i&&n)if(m(t.start,e.end)>=0)h(t,e,-1)
else{if(!(m(t.start,e.start)<=0))return null
h(e,t,1)}else if(i&&!n)if(m(t.start,e.end)>=0)h(t,e,-1)
else{if(!(m(t.end,e.start)<=0))return null
h(e,t,-1)}else if(!i&&n)if(m(t.start,e.start)>=0)h(t,e,1)
else{if(!(m(t.start,e.start)<=0))return null
h(e,t,1)}else if(!i&&!n)if(m(t.start,e.start)>=0)h(t,e,1)
else{if(!(m(t.end,e.start)<=0))return null
h(e,t,-1)}return[t,e]}function a(e,t){for(var i=e.length;i--;)for(var n=0;n<t.length;n++)if(!o(e[i],t[n])){for(;i<e.length;){for(;n--;)o(t[n],e[i])
n=t.length,i++}return[e,t]}return e.selectionBefore=t.selectionBefore=e.selectionAfter=t.selectionAfter=null,[t,e]}function l(e,t){var i="insert"==e.action,n="insert"==t.action
if(i&&n)m(e.start,t.start)<0?h(t,e,1):h(e,t,1)
else if(i&&!n)m(e.start,t.end)>=0?h(e,t,-1):(m(e.start,t.start)<=0||h(e,p.fromPoints(t.start,e.start),-1),h(t,e,1))
else if(!i&&n)m(t.start,e.end)>=0?h(t,e,-1):(m(t.start,e.start)<=0||h(t,p.fromPoints(e.start,t.start),-1),h(e,t,1))
else if(!i&&!n)if(m(t.start,e.end)>=0)h(t,e,-1)
else{var s,r
if(!(m(t.end,e.start)<=0))return m(e.start,t.start)<0&&(s=e,e=u(e,t.start)),m(e.end,t.end)>0&&(r=u(e,t.end)),c(t.end,e.start,e.end,-1),r&&!s&&(e.lines=r.lines,e.start=r.start,e.end=r.end,r=e),[t,s,r].filter(Boolean)
h(e,t,-1)}return[t,e]}function h(e,t,i){c(e.start,t.start,t.end,i),c(e.end,t.start,t.end,i)}function c(e,t,i,n){e.row==(1==n?t:i).row&&(e.column+=n*(i.column-t.column)),e.row+=n*(i.row-t.row)}function u(e,t){var i=e.lines,s=e.end
e.end=n(t)
var r=e.end.row-e.start.row,o=i.splice(r,i.length),a=r?t.column:t.column-e.start.column
return i.push(o[0].substring(0,a)),o[0]=o[0].substr(a),{start:n(t),end:s,lines:o,action:e.action}}function d(e,t){t=function(e){return{start:n(e.start),end:n(e.end),action:e.action,lines:e.lines.slice()}}(t)
for(var i=e.length;i--;){for(var s=e[i],r=0;r<s.length;r++){var o=l(s[r],t)
t=o[0],2!=o.length&&(o[2]?(s.splice(r+1,1,o[1],o[2]),r++):o[1]||(s.splice(r,1),r--))}s.length||e.splice(i,1)}return e}class g{constructor(){this.$keepRedoStack,this.$maxRev=0,this.$fromUndo=!1,this.$undoDepth=1/0,this.reset()}addSession(e){this.$session=e}add(e,t,i){if(!this.$fromUndo&&e!=this.$lastDelta){if(this.$keepRedoStack||(this.$redoStack.length=0),!1===t||!this.lastDeltas){this.lastDeltas=[]
var n=this.$undoStack.length
n>this.$undoDepth-1&&this.$undoStack.splice(0,n-this.$undoDepth+1),this.$undoStack.push(this.lastDeltas),e.id=this.$rev=++this.$maxRev}"remove"!=e.action&&"insert"!=e.action||(this.$lastDelta=e),this.lastDeltas.push(e)}}addSelection(e,t){this.selections.push({value:e,rev:t||this.$rev})}startNewGroup(){return this.lastDeltas=null,this.$rev}markIgnored(e,t){null==t&&(t=this.$rev+1)
for(var i=this.$undoStack,n=i.length;n--;){var s=i[n][0]
if(s.id<=e)break
s.id<t&&(s.ignore=!0)}this.lastDeltas=null}getSelection(e,t){for(var i=this.selections,n=i.length;n--;){var s=i[n]
if(s.rev<e)return t&&(s=i[n+1]),s}}getRevision(){return this.$rev}getDeltas(e,t){null==t&&(t=this.$rev+1)
for(var i=this.$undoStack,n=null,s=0,r=i.length;r--;){var o=i[r][0]
if(o.id<t&&!n&&(n=r+1),o.id<=e){s=r+1
break}}return i.slice(s,n)}getChangedRanges(e,t){null==t&&(t=this.$rev+1)}getChangedLines(e,t){null==t&&(t=this.$rev+1)}undo(e,t){this.lastDeltas=null
var i=this.$undoStack
if(function(e,t){for(var i=t;i--;){var n=e[i]
if(n&&!n[0].ignore){for(;i<t-1;){var s=a(e[i],e[i+1])
e[i]=s[0],e[i+1]=s[1],i++}return!0}}}(i,i.length)){e||(e=this.$session),this.$redoStackBaseRev!==this.$rev&&this.$redoStack.length&&(this.$redoStack=[]),this.$fromUndo=!0
var n=i.pop(),s=null
return n&&(s=e.undoChanges(n,t),this.$redoStack.push(n),this.$syncRev()),this.$fromUndo=!1,s}}redo(e,t){if(this.lastDeltas=null,e||(e=this.$session),this.$fromUndo=!0,this.$redoStackBaseRev!=this.$rev){var i=this.getDeltas(this.$redoStackBaseRev,this.$rev+1)
!function(e,t){for(var i=0;i<t.length;i++)for(var n=t[i],s=0;s<n.length;s++)d(e,n[s])}(this.$redoStack,i),this.$redoStackBaseRev=this.$rev,this.$redoStack.forEach((function(e){e[0].id=++this.$maxRev}),this)}var n=this.$redoStack.pop(),s=null
return n&&(s=e.redoChanges(n,t),this.$undoStack.push(n),this.$syncRev()),this.$fromUndo=!1,s}$syncRev(){var e=this.$undoStack,t=e[e.length-1],i=t&&t[0].id||0
this.$redoStackBaseRev=i,this.$rev=i}reset(){this.lastDeltas=null,this.$lastDelta=null,this.$undoStack=[],this.$redoStack=[],this.$rev=0,this.mark=0,this.$redoStackBaseRev=this.$rev,this.selections=[]}canUndo(){return this.$undoStack.length>0}canRedo(){return this.$redoStack.length>0}bookmark(e){null==e&&(e=this.$rev),this.mark=e}isAtBookmark(){return this.$rev===this.mark}toJSON(){return{$redoStack:this.$redoStack,$undoStack:this.$undoStack}}fromJSON(e){this.reset(),this.$undoStack=e.$undoStack,this.$redoStack=e.$redoStack}$prettyPrint(e){return e?s(e):s(this.$undoStack)+"\n---\n"+s(this.$redoStack)}}g.prototype.hasUndo=g.prototype.canUndo,g.prototype.hasRedo=g.prototype.canRedo,g.prototype.isClean=g.prototype.isAtBookmark,g.prototype.markClean=g.prototype.bookmark
var p=i(4074).Q,m=p.comparePoints
p.comparePoints,t.a=g},3196:(e,t)=>{for(var i=[48,9,8,25,5,0,2,25,48,0,11,0,5,0,6,22,2,30,2,457,5,11,15,4,8,0,2,0,18,116,2,1,3,3,9,0,2,2,2,0,2,19,2,82,2,138,2,4,3,155,12,37,3,0,8,38,10,44,2,0,2,1,2,1,2,0,9,26,6,2,30,10,7,61,2,9,5,101,2,7,3,9,2,18,3,0,17,58,3,100,15,53,5,0,6,45,211,57,3,18,2,5,3,11,3,9,2,1,7,6,2,2,2,7,3,1,3,21,2,6,2,0,4,3,3,8,3,1,3,3,9,0,5,1,2,4,3,11,16,2,2,5,5,1,3,21,2,6,2,1,2,1,2,1,3,0,2,4,5,1,3,2,4,0,8,3,2,0,8,15,12,2,2,8,2,2,2,21,2,6,2,1,2,4,3,9,2,2,2,2,3,0,16,3,3,9,18,2,2,7,3,1,3,21,2,6,2,1,2,4,3,8,3,1,3,2,9,1,5,1,2,4,3,9,2,0,17,1,2,5,4,2,2,3,4,1,2,0,2,1,4,1,4,2,4,11,5,4,4,2,2,3,3,0,7,0,15,9,18,2,2,7,2,2,2,22,2,9,2,4,4,7,2,2,2,3,8,1,2,1,7,3,3,9,19,1,2,7,2,2,2,22,2,9,2,4,3,8,2,2,2,3,8,1,8,0,2,3,3,9,19,1,2,7,2,2,2,22,2,15,4,7,2,2,2,3,10,0,9,3,3,9,11,5,3,1,2,17,4,23,2,8,2,0,3,6,4,0,5,5,2,0,2,7,19,1,14,57,6,14,2,9,40,1,2,0,3,1,2,0,3,0,7,3,2,6,2,2,2,0,2,0,3,1,2,12,2,2,3,4,2,0,2,5,3,9,3,1,35,0,24,1,7,9,12,0,2,0,2,0,5,9,2,35,5,19,2,5,5,7,2,35,10,0,58,73,7,77,3,37,11,42,2,0,4,328,2,3,3,6,2,0,2,3,3,40,2,3,3,32,2,3,3,6,2,0,2,3,3,14,2,56,2,3,3,66,5,0,33,15,17,84,13,619,3,16,2,25,6,74,22,12,2,6,12,20,12,19,13,12,2,2,2,1,13,51,3,29,4,0,5,1,3,9,34,2,3,9,7,87,9,42,6,69,11,28,4,11,5,11,11,39,3,4,12,43,5,25,7,10,38,27,5,62,2,28,3,10,7,9,14,0,89,75,5,9,18,8,13,42,4,11,71,55,9,9,4,48,83,2,2,30,14,230,23,280,3,5,3,37,3,5,3,7,2,0,2,0,2,0,2,30,3,52,2,6,2,0,4,2,2,6,4,3,3,5,5,12,6,2,2,6,67,1,20,0,29,0,14,0,17,4,60,12,5,0,4,11,18,0,5,0,3,9,2,0,4,4,7,0,2,0,2,0,2,3,2,10,3,3,6,4,5,0,53,1,2684,46,2,46,2,132,7,6,15,37,11,53,10,0,17,22,10,6,2,6,2,6,2,6,2,6,2,6,2,6,2,6,2,31,48,0,470,1,36,5,2,4,6,1,5,85,3,1,3,2,2,89,2,3,6,40,4,93,18,23,57,15,513,6581,75,20939,53,1164,68,45,3,268,4,27,21,31,3,13,13,1,2,24,9,69,11,1,38,8,3,102,3,1,111,44,25,51,13,68,12,9,7,23,4,0,5,45,3,35,13,28,4,64,15,10,39,54,10,13,3,9,7,22,4,1,5,66,25,2,227,42,2,1,3,9,7,11171,13,22,5,48,8453,301,3,61,3,105,39,6,13,4,6,11,2,12,2,4,2,0,2,1,2,1,2,107,34,362,19,63,3,53,41,11,5,15,17,6,13,1,25,2,33,4,2,134,20,9,8,25,5,0,2,25,12,88,4,5,3,5,3,5,3,2],n=0,s=[],r=0;r<848;r+=2)s.push(n+=i[r]),i[r+1]&&s.push(45,n+=i[r+1])
t.wordChars=String.fromCharCode.apply(null,s)},916:(e,t,i)=>{var n=i(8297),s=i(215),r=i(3927),o=i(5133),a=i(4226).W,l=i(3631).p,h=i(3698).E,c=i(3655).b,u=i(5405).V1,d=i(5405).vB,g=i(2083).V1,p=i(2083).vB,m=i(1197).x,f=i(5722).X,v=i(8770).b,w=i(2364),y=i(4227).K,x=i(6483)
const b=i(2185).t
s.importCssString(w,"ace_editor.css",!1)
class C{constructor(e,t){var i=this
this.container=e||s.createElement("div"),s.addCssClass(this.container,"ace_editor"),s.HI_DPI&&s.addCssClass(this.container,"ace_hidpi"),this.setTheme(t),null==o.get("useStrictCSP")&&o.set("useStrictCSP",!1),this.$gutter=s.createElement("div"),this.$gutter.className="ace_gutter",this.container.appendChild(this.$gutter),this.$gutter.setAttribute("aria-hidden","true"),this.scroller=s.createElement("div"),this.scroller.className="ace_scroller",this.container.appendChild(this.scroller),this.content=s.createElement("div"),this.content.className="ace_content",this.scroller.appendChild(this.content),this.$gutterLayer=new a(this.$gutter),this.$gutterLayer.on("changeGutterWidth",this.onGutterResize.bind(this)),this.$markerBack=new l(this.content)
var n=this.$textLayer=new h(this.content)
this.canvas=n.element,this.$markerFront=new l(this.content),this.$cursorLayer=new c(this.content),this.$horizScroll=!1,this.$vScroll=!1,this.scrollBar=this.scrollBarV=new d(this.container,this),this.scrollBarH=new u(this.container,this),this.scrollBarV.on("scroll",(function(e){i.$scrollAnimation||i.session.setScrollTop(e.data-i.scrollMargin.top)})),this.scrollBarH.on("scroll",(function(e){i.$scrollAnimation||i.session.setScrollLeft(e.data-i.scrollMargin.left)})),this.scrollTop=0,this.scrollLeft=0,this.cursorPos={row:0,column:0},this.$fontMetrics=new f(this.container),this.$textLayer.$setFontMetrics(this.$fontMetrics),this.$textLayer.on("changeCharacterSize",(function(e){i.updateCharacterSize(),i.onResize(!0,i.gutterWidth,i.$size.width,i.$size.height),i._signal("changeCharacterSize",e)})),this.$size={width:0,height:0,scrollerHeight:0,scrollerWidth:0,$dirty:!0},this.layerConfig={width:1,padding:0,firstRow:0,firstRowScreen:0,lastRow:0,lineHeight:0,characterWidth:0,minHeight:1,maxHeight:1,offset:0,height:1,gutterOffset:1},this.scrollMargin={left:0,right:0,top:0,bottom:0,v:0,h:0},this.margin={left:0,right:0,top:0,bottom:0,v:0,h:0},this.$keepTextAreaAtCursor=!x.isIOS,this.$loop=new m(this.$renderChanges.bind(this),this.container.ownerDocument.defaultView),this.$loop.schedule(this.CHANGE_FULL),this.updateCharacterSize(),this.setPadding(4),this.$addResizeObserver(),o.resetOptions(this),o._signal("renderer",this)}updateCharacterSize(){this.$textLayer.allowBoldFonts!=this.$allowBoldFonts&&(this.$allowBoldFonts=this.$textLayer.allowBoldFonts,this.setStyle("ace_nobold",!this.$allowBoldFonts)),this.layerConfig.characterWidth=this.characterWidth=this.$textLayer.getCharacterWidth(),this.layerConfig.lineHeight=this.lineHeight=this.$textLayer.getLineHeight(),this.$updatePrintMargin(),s.setStyle(this.scroller.style,"line-height",this.lineHeight+"px")}setSession(e){this.session&&this.session.doc.off("changeNewLineMode",this.onChangeNewLineMode),this.session=e,e&&this.scrollMargin.top&&e.getScrollTop()<=0&&e.setScrollTop(-this.scrollMargin.top),this.$cursorLayer.setSession(e),this.$markerBack.setSession(e),this.$markerFront.setSession(e),this.$gutterLayer.setSession(e),this.$textLayer.setSession(e),e&&(this.$loop.schedule(this.CHANGE_FULL),this.session.$setFontMetrics(this.$fontMetrics),this.scrollBarH.scrollLeft=this.scrollBarV.scrollTop=null,this.onChangeNewLineMode=this.onChangeNewLineMode.bind(this),this.onChangeNewLineMode(),this.session.doc.on("changeNewLineMode",this.onChangeNewLineMode))}updateLines(e,t,i){if(void 0===t&&(t=1/0),this.$changedLines?(this.$changedLines.firstRow>e&&(this.$changedLines.firstRow=e),this.$changedLines.lastRow<t&&(this.$changedLines.lastRow=t)):this.$changedLines={firstRow:e,lastRow:t},this.$changedLines.lastRow<this.layerConfig.firstRow){if(!i)return
this.$changedLines.lastRow=this.layerConfig.lastRow}this.$changedLines.firstRow>this.layerConfig.lastRow||this.$loop.schedule(this.CHANGE_LINES)}onChangeNewLineMode(){this.$loop.schedule(this.CHANGE_TEXT),this.$textLayer.$updateEolChar(),this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR)}onChangeTabSize(){this.$loop.schedule(this.CHANGE_TEXT|this.CHANGE_MARKER),this.$textLayer.onChangeTabSize()}updateText(){this.$loop.schedule(this.CHANGE_TEXT)}updateFull(e){e?this.$renderChanges(this.CHANGE_FULL,!0):this.$loop.schedule(this.CHANGE_FULL)}updateFontSize(){this.$textLayer.checkForSizeChanges()}$updateSizeAsync(){this.$loop.pending?this.$size.$dirty=!0:this.onResize()}onResize(e,t,i,n){if(!(this.resizing>2)){this.resizing>0?this.resizing++:this.resizing=e?1:0
var s=this.container
n||(n=s.clientHeight||s.scrollHeight),!n&&this.$maxLines&&this.lineHeight>1&&(s.style.height&&"0px"!=s.style.height||(s.style.height="1px",n=s.clientHeight||s.scrollHeight)),i||(i=s.clientWidth||s.scrollWidth)
var r=this.$updateCachedSize(e,t,i,n)
if(this.$resizeTimer&&this.$resizeTimer.cancel(),!this.$size.scrollerHeight||!i&&!n)return this.resizing=0
e&&(this.$gutterLayer.$padding=null),e?this.$renderChanges(r|this.$changes,!0):this.$loop.schedule(r|this.$changes),this.resizing&&(this.resizing=0),this.scrollBarH.scrollLeft=this.scrollBarV.scrollTop=null,this.$customScrollbar&&this.$updateCustomScrollbar(!0)}}$updateCachedSize(e,t,i,n){n-=this.$extraHeight||0
var r=0,o=this.$size,a={width:o.width,height:o.height,scrollerHeight:o.scrollerHeight,scrollerWidth:o.scrollerWidth}
if(n&&(e||o.height!=n)&&(o.height=n,r|=this.CHANGE_SIZE,o.scrollerHeight=o.height,this.$horizScroll&&(o.scrollerHeight-=this.scrollBarH.getHeight()),this.scrollBarV.setHeight(o.scrollerHeight),this.scrollBarV.element.style.bottom=this.scrollBarH.getHeight()+"px",r|=this.CHANGE_SCROLL),i&&(e||o.width!=i)){r|=this.CHANGE_SIZE,o.width=i,null==t&&(t=this.$showGutter?this.$gutter.offsetWidth:0),this.gutterWidth=t,s.setStyle(this.scrollBarH.element.style,"left",t+"px"),s.setStyle(this.scroller.style,"left",t+this.margin.left+"px"),o.scrollerWidth=Math.max(0,i-t-this.scrollBarV.getWidth()-this.margin.h),s.setStyle(this.$gutter.style,"left",this.margin.left+"px")
var l=this.scrollBarV.getWidth()+"px"
s.setStyle(this.scrollBarH.element.style,"right",l),s.setStyle(this.scroller.style,"right",l),s.setStyle(this.scroller.style,"bottom",this.scrollBarH.getHeight()),this.scrollBarH.setWidth(o.scrollerWidth),(this.session&&this.session.getUseWrapMode()&&this.adjustWrapLimit()||e)&&(r|=this.CHANGE_FULL)}return o.$dirty=!i||!n,r&&this._signal("resize",a),r}onGutterResize(e){var t=this.$showGutter?e:0
t!=this.gutterWidth&&(this.$changes|=this.$updateCachedSize(!0,t,this.$size.width,this.$size.height)),this.session.getUseWrapMode()&&this.adjustWrapLimit()||this.$size.$dirty?this.$loop.schedule(this.CHANGE_FULL):this.$computeLayerConfig()}adjustWrapLimit(){var e=this.$size.scrollerWidth-2*this.$padding,t=Math.floor(e/this.characterWidth)
return this.session.adjustWrapLimit(t,this.$showPrintMargin&&this.$printMarginColumn)}setAnimatedScroll(e){this.setOption("animatedScroll",e)}getAnimatedScroll(){return this.$animatedScroll}setShowInvisibles(e){this.setOption("showInvisibles",e),this.session.$bidiHandler.setShowInvisibles(e)}getShowInvisibles(){return this.getOption("showInvisibles")}getDisplayIndentGuides(){return this.getOption("displayIndentGuides")}setDisplayIndentGuides(e){this.setOption("displayIndentGuides",e)}getHighlightIndentGuides(){return this.getOption("highlightIndentGuides")}setHighlightIndentGuides(e){this.setOption("highlightIndentGuides",e)}setShowPrintMargin(e){this.setOption("showPrintMargin",e)}getShowPrintMargin(){return this.getOption("showPrintMargin")}setPrintMarginColumn(e){this.setOption("printMarginColumn",e)}getPrintMarginColumn(){return this.getOption("printMarginColumn")}getShowGutter(){return this.getOption("showGutter")}setShowGutter(e){return this.setOption("showGutter",e)}getFadeFoldWidgets(){return this.getOption("fadeFoldWidgets")}setFadeFoldWidgets(e){this.setOption("fadeFoldWidgets",e)}setHighlightGutterLine(e){this.setOption("highlightGutterLine",e)}getHighlightGutterLine(){return this.getOption("highlightGutterLine")}$updatePrintMargin(){if(this.$showPrintMargin||this.$printMarginEl){if(!this.$printMarginEl){var e=s.createElement("div")
e.className="ace_layer ace_print-margin-layer",this.$printMarginEl=s.createElement("div"),this.$printMarginEl.className="ace_print-margin",e.appendChild(this.$printMarginEl),this.content.insertBefore(e,this.content.firstChild)}var t=this.$printMarginEl.style
t.left=Math.round(this.characterWidth*this.$printMarginColumn+this.$padding)+"px",t.visibility=this.$showPrintMargin?"visible":"hidden",this.session&&-1==this.session.$wrap&&this.adjustWrapLimit()}}getContainerElement(){return this.container}getMouseEventTarget(){return this.scroller}getTextAreaContainer(){return this.container}$moveTextAreaToCursor(){if(!this.$isMousePressed){var e=this.textarea.style,t=this.$composition
if(this.$keepTextAreaAtCursor||t){var i=this.$cursorLayer.$pixelPos
if(i){t&&t.markerRange&&(i=this.$cursorLayer.getPixelPosition(t.markerRange.start,!0))
var n=this.layerConfig,r=i.top,o=i.left
r-=n.offset
var a=t&&t.useTextareaForIME||x.isMobile?this.lineHeight:1
if(r<0||r>n.height-a)s.translate(this.textarea,0,0)
else{var l=1,h=this.$size.height-a
if(t)if(t.useTextareaForIME){var c=this.textarea.value
l=this.characterWidth*this.session.$getStringScreenWidth(c)[0]}else r+=this.lineHeight+2
else r+=this.lineHeight;(o-=this.scrollLeft)>this.$size.scrollerWidth-l&&(o=this.$size.scrollerWidth-l),o+=this.gutterWidth+this.margin.left,s.setStyle(e,"height",a+"px"),s.setStyle(e,"width",l+"px"),s.translate(this.textarea,Math.min(o,this.$size.scrollerWidth-l),Math.min(r,h))}}}else s.translate(this.textarea,-100,0)}}getFirstVisibleRow(){return this.layerConfig.firstRow}getFirstFullyVisibleRow(){return this.layerConfig.firstRow+(0===this.layerConfig.offset?0:1)}getLastFullyVisibleRow(){var e=this.layerConfig,t=e.lastRow
return this.session.documentToScreenRow(t,0)*e.lineHeight-this.session.getScrollTop()>e.height-e.lineHeight?t-1:t}getLastVisibleRow(){return this.layerConfig.lastRow}setPadding(e){this.$padding=e,this.$textLayer.setPadding(e),this.$cursorLayer.setPadding(e),this.$markerFront.setPadding(e),this.$markerBack.setPadding(e),this.$loop.schedule(this.CHANGE_FULL),this.$updatePrintMargin()}setScrollMargin(e,t,i,n){var s=this.scrollMargin
s.top=0|e,s.bottom=0|t,s.right=0|n,s.left=0|i,s.v=s.top+s.bottom,s.h=s.left+s.right,s.top&&this.scrollTop<=0&&this.session&&this.session.setScrollTop(-s.top),this.updateFull()}setMargin(e,t,i,n){var s=this.margin
s.top=0|e,s.bottom=0|t,s.right=0|n,s.left=0|i,s.v=s.top+s.bottom,s.h=s.left+s.right,this.$updateCachedSize(!0,this.gutterWidth,this.$size.width,this.$size.height),this.updateFull()}getHScrollBarAlwaysVisible(){return this.$hScrollBarAlwaysVisible}setHScrollBarAlwaysVisible(e){this.setOption("hScrollBarAlwaysVisible",e)}getVScrollBarAlwaysVisible(){return this.$vScrollBarAlwaysVisible}setVScrollBarAlwaysVisible(e){this.setOption("vScrollBarAlwaysVisible",e)}$updateScrollBarV(){var e=this.layerConfig.maxHeight,t=this.$size.scrollerHeight
!this.$maxLines&&this.$scrollPastEnd&&(e-=(t-this.lineHeight)*this.$scrollPastEnd,this.scrollTop>e-t&&(e=this.scrollTop+t,this.scrollBarV.scrollTop=null)),this.scrollBarV.setScrollHeight(e+this.scrollMargin.v),this.scrollBarV.setScrollTop(this.scrollTop+this.scrollMargin.top)}$updateScrollBarH(){this.scrollBarH.setScrollWidth(this.layerConfig.width+2*this.$padding+this.scrollMargin.h),this.scrollBarH.setScrollLeft(this.scrollLeft+this.scrollMargin.left)}freeze(){this.$frozen=!0}unfreeze(){this.$frozen=!1}$renderChanges(e,t){if(this.$changes&&(e|=this.$changes,this.$changes=0),this.session&&this.container.offsetWidth&&!this.$frozen&&(e||t)){if(this.$size.$dirty)return this.$changes|=e,this.onResize(!0)
this.lineHeight||this.$textLayer.checkForSizeChanges(),this._signal("beforeRender",e),this.session&&this.session.$bidiHandler&&this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics)
var i=this.layerConfig
if(e&this.CHANGE_FULL||e&this.CHANGE_SIZE||e&this.CHANGE_TEXT||e&this.CHANGE_LINES||e&this.CHANGE_SCROLL||e&this.CHANGE_H_SCROLL){if(e|=this.$computeLayerConfig()|this.$loop.clear(),i.firstRow!=this.layerConfig.firstRow&&i.firstRowScreen==this.layerConfig.firstRowScreen){var n=this.scrollTop+(i.firstRow-Math.max(this.layerConfig.firstRow,0))*this.lineHeight
n>0&&(this.scrollTop=n,e|=this.CHANGE_SCROLL,e|=this.$computeLayerConfig()|this.$loop.clear())}i=this.layerConfig,this.$updateScrollBarV(),e&this.CHANGE_H_SCROLL&&this.$updateScrollBarH(),s.translate(this.content,-this.scrollLeft,-i.offset)
var r=i.width+2*this.$padding+"px",o=i.minHeight+"px"
s.setStyle(this.content.style,"width",r),s.setStyle(this.content.style,"height",o)}if(e&this.CHANGE_H_SCROLL&&(s.translate(this.content,-this.scrollLeft,-i.offset),this.scroller.className=this.scrollLeft<=0?"ace_scroller ":"ace_scroller ace_scroll-left ",this.enableKeyboardAccessibility&&(this.scroller.className+=this.keyboardFocusClassName)),e&this.CHANGE_FULL)return this.$changedLines=null,this.$textLayer.update(i),this.$showGutter&&this.$gutterLayer.update(i),this.$customScrollbar&&this.$scrollDecorator.$updateDecorators(i),this.$markerBack.update(i),this.$markerFront.update(i),this.$cursorLayer.update(i),this.$moveTextAreaToCursor(),void this._signal("afterRender",e)
if(e&this.CHANGE_SCROLL)return this.$changedLines=null,e&this.CHANGE_TEXT||e&this.CHANGE_LINES?this.$textLayer.update(i):this.$textLayer.scrollLines(i),this.$showGutter&&(e&this.CHANGE_GUTTER||e&this.CHANGE_LINES?this.$gutterLayer.update(i):this.$gutterLayer.scrollLines(i)),this.$customScrollbar&&this.$scrollDecorator.$updateDecorators(i),this.$markerBack.update(i),this.$markerFront.update(i),this.$cursorLayer.update(i),this.$moveTextAreaToCursor(),void this._signal("afterRender",e)
e&this.CHANGE_TEXT?(this.$changedLines=null,this.$textLayer.update(i),this.$showGutter&&this.$gutterLayer.update(i),this.$customScrollbar&&this.$scrollDecorator.$updateDecorators(i)):e&this.CHANGE_LINES?((this.$updateLines()||e&this.CHANGE_GUTTER&&this.$showGutter)&&this.$gutterLayer.update(i),this.$customScrollbar&&this.$scrollDecorator.$updateDecorators(i)):e&this.CHANGE_TEXT||e&this.CHANGE_GUTTER?(this.$showGutter&&this.$gutterLayer.update(i),this.$customScrollbar&&this.$scrollDecorator.$updateDecorators(i)):e&this.CHANGE_CURSOR&&(this.$highlightGutterLine&&this.$gutterLayer.updateLineHighlight(i),this.$customScrollbar&&this.$scrollDecorator.$updateDecorators(i)),e&this.CHANGE_CURSOR&&(this.$cursorLayer.update(i),this.$moveTextAreaToCursor()),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_FRONT)&&this.$markerFront.update(i),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_BACK)&&this.$markerBack.update(i),this._signal("afterRender",e)}else this.$changes|=e}$autosize(){var e=this.session.getScreenLength()*this.lineHeight,t=this.$maxLines*this.lineHeight,i=Math.min(t,Math.max((this.$minLines||1)*this.lineHeight,e))+this.scrollMargin.v+(this.$extraHeight||0)
this.$horizScroll&&(i+=this.scrollBarH.getHeight()),this.$maxPixelHeight&&i>this.$maxPixelHeight&&(i=this.$maxPixelHeight)
var n=!(i<=2*this.lineHeight)&&e>t
if(i!=this.desiredHeight||this.$size.height!=this.desiredHeight||n!=this.$vScroll){n!=this.$vScroll&&(this.$vScroll=n,this.scrollBarV.setVisible(n))
var s=this.container.clientWidth
this.container.style.height=i+"px",this.$updateCachedSize(!0,this.$gutterWidth,s,i),this.desiredHeight=i,this._signal("autosize")}}$computeLayerConfig(){var e=this.session,t=this.$size,i=t.height<=2*this.lineHeight,n=this.session.getScreenLength()*this.lineHeight,s=this.$getLongestLine(),r=!i&&(this.$hScrollBarAlwaysVisible||t.scrollerWidth-s-2*this.$padding<0),o=this.$horizScroll!==r
o&&(this.$horizScroll=r,this.scrollBarH.setVisible(r))
var a=this.$vScroll
this.$maxLines&&this.lineHeight>1&&this.$autosize()
var l=t.scrollerHeight+this.lineHeight,h=!this.$maxLines&&this.$scrollPastEnd?(t.scrollerHeight-this.lineHeight)*this.$scrollPastEnd:0
n+=h
var c=this.scrollMargin
this.session.setScrollTop(Math.max(-c.top,Math.min(this.scrollTop,n-t.scrollerHeight+c.bottom))),this.session.setScrollLeft(Math.max(-c.left,Math.min(this.scrollLeft,s+2*this.$padding-t.scrollerWidth+c.right)))
var u=!i&&(this.$vScrollBarAlwaysVisible||t.scrollerHeight-n+h<0||this.scrollTop>c.top),d=a!==u
d&&(this.$vScroll=u,this.scrollBarV.setVisible(u))
var g,p,m=this.scrollTop%this.lineHeight,f=Math.ceil(l/this.lineHeight)-1,v=Math.max(0,Math.round((this.scrollTop-m)/this.lineHeight)),w=v+f,y=this.lineHeight
v=e.screenToDocumentRow(v,0)
var x=e.getFoldLine(v)
x&&(v=x.start.row),g=e.documentToScreenRow(v,0),p=e.getRowLength(v)*y,w=Math.min(e.screenToDocumentRow(w,0),e.getLength()-1),l=t.scrollerHeight+e.getRowLength(w)*y+p,m=this.scrollTop-g*y
var b=0
return(this.layerConfig.width!=s||o)&&(b=this.CHANGE_H_SCROLL),(o||d)&&(b|=this.$updateCachedSize(!0,this.gutterWidth,t.width,t.height),this._signal("scrollbarVisibilityChanged"),d&&(s=this.$getLongestLine())),this.layerConfig={width:s,padding:this.$padding,firstRow:v,firstRowScreen:g,lastRow:w,lineHeight:y,characterWidth:this.characterWidth,minHeight:l,maxHeight:n,offset:m,gutterOffset:y?Math.max(0,Math.ceil((m+t.height-t.scrollerHeight)/y)):0,height:this.$size.scrollerHeight},this.session.$bidiHandler&&this.session.$bidiHandler.setContentWidth(s-this.$padding),b}$updateLines(){if(this.$changedLines){var e=this.$changedLines.firstRow,t=this.$changedLines.lastRow
this.$changedLines=null
var i=this.layerConfig
if(!(e>i.lastRow+1||t<i.firstRow))return t===1/0?(this.$showGutter&&this.$gutterLayer.update(i),void this.$textLayer.update(i)):(this.$textLayer.updateLines(i,e,t),!0)}}$getLongestLine(){var e=this.session.getScreenWidth()
return this.showInvisibles&&!this.session.$useWrapMode&&(e+=1),this.$textLayer&&e>this.$textLayer.MAX_LINE_LENGTH&&(e=this.$textLayer.MAX_LINE_LENGTH+30),Math.max(this.$size.scrollerWidth-2*this.$padding,Math.round(e*this.characterWidth))}updateFrontMarkers(){this.$markerFront.setMarkers(this.session.getMarkers(!0)),this.$loop.schedule(this.CHANGE_MARKER_FRONT)}updateBackMarkers(){this.$markerBack.setMarkers(this.session.getMarkers()),this.$loop.schedule(this.CHANGE_MARKER_BACK)}addGutterDecoration(e,t){this.$gutterLayer.addGutterDecoration(e,t)}removeGutterDecoration(e,t){this.$gutterLayer.removeGutterDecoration(e,t)}updateBreakpoints(e){this._rows=e,this.$loop.schedule(this.CHANGE_GUTTER)}setAnnotations(e){this.$gutterLayer.setAnnotations(e),this.$loop.schedule(this.CHANGE_GUTTER)}updateCursor(){this.$loop.schedule(this.CHANGE_CURSOR)}hideCursor(){this.$cursorLayer.hideCursor()}showCursor(){this.$cursorLayer.showCursor()}scrollSelectionIntoView(e,t,i){this.scrollCursorIntoView(e,i),this.scrollCursorIntoView(t,i)}scrollCursorIntoView(e,t,i){if(0!==this.$size.scrollerHeight){var n=this.$cursorLayer.getPixelPosition(e),s=n.left,r=n.top,o=i&&i.top||0,a=i&&i.bottom||0
this.$scrollAnimation&&(this.$stopAnimation=!0)
var l=this.$scrollAnimation?this.session.getScrollTop():this.scrollTop
l+o>r?(t&&l+o>r+this.lineHeight&&(r-=t*this.$size.scrollerHeight),0===r&&(r=-this.scrollMargin.top),this.session.setScrollTop(r)):l+this.$size.scrollerHeight-a<r+this.lineHeight&&(t&&l+this.$size.scrollerHeight-a<r-this.lineHeight&&(r+=t*this.$size.scrollerHeight),this.session.setScrollTop(r+this.lineHeight+a-this.$size.scrollerHeight))
var h=this.scrollLeft,c=2*this.layerConfig.characterWidth
s-c<h?((s-=c)<this.$padding+c&&(s=-this.scrollMargin.left),this.session.setScrollLeft(s)):(s+=c,h+this.$size.scrollerWidth<s+this.characterWidth?this.session.setScrollLeft(Math.round(s+this.characterWidth-this.$size.scrollerWidth)):h<=this.$padding&&s-h<this.characterWidth&&this.session.setScrollLeft(0))}}getScrollTop(){return this.session.getScrollTop()}getScrollLeft(){return this.session.getScrollLeft()}getScrollTopRow(){return this.scrollTop/this.lineHeight}getScrollBottomRow(){return Math.max(0,Math.floor((this.scrollTop+this.$size.scrollerHeight)/this.lineHeight)-1)}scrollToRow(e){this.session.setScrollTop(e*this.lineHeight)}alignCursor(e,t){"number"==typeof e&&(e={row:e,column:0})
var i=this.$cursorLayer.getPixelPosition(e),n=this.$size.scrollerHeight-this.lineHeight,s=i.top-n*(t||0)
return this.session.setScrollTop(s),s}$calcSteps(e,t){var i,n,s=0,r=this.STEPS,o=[]
for(s=0;s<r;++s)o.push((i=s/this.STEPS,n=e,(t-e)*(Math.pow(i-1,3)+1)+n))
return o}scrollToLine(e,t,i,n){var s=this.$cursorLayer.getPixelPosition({row:e,column:0}).top
t&&(s-=this.$size.scrollerHeight/2)
var r=this.scrollTop
this.session.setScrollTop(s),!1!==i&&this.animateScrolling(r,n)}animateScrolling(e,t){function i(){s.$timer=clearInterval(s.$timer),s.$scrollAnimation=null,s.$stopAnimation=!1,t&&t()}var n=this.scrollTop
if(this.$animatedScroll){var s=this
if(e!=n){if(this.$scrollAnimation){var r=this.$scrollAnimation.steps
if(r.length&&(e=r[0])==n)return}var o=s.$calcSteps(e,n)
this.$scrollAnimation={from:e,to:n,steps:o},clearInterval(this.$timer),s.session.setScrollTop(o.shift()),s.session.$scrollTop=n,this.$timer=setInterval((function(){if(!s.$stopAnimation)return s.session?void(o.length?(s.session.setScrollTop(o.shift()),s.session.$scrollTop=n):null!=n?(s.session.$scrollTop=-1,s.session.setScrollTop(n),n=null):i()):clearInterval(s.$timer)
i()}),10)}}}scrollToY(e){this.scrollTop!==e&&(this.$loop.schedule(this.CHANGE_SCROLL),this.scrollTop=e)}scrollToX(e){this.scrollLeft!==e&&(this.scrollLeft=e),this.$loop.schedule(this.CHANGE_H_SCROLL)}scrollTo(e,t){this.session.setScrollTop(t),this.session.setScrollLeft(e)}scrollBy(e,t){t&&this.session.setScrollTop(this.session.getScrollTop()+t),e&&this.session.setScrollLeft(this.session.getScrollLeft()+e)}isScrollableBy(e,t){return t<0&&this.session.getScrollTop()>=1-this.scrollMargin.top||t>0&&this.session.getScrollTop()+this.$size.scrollerHeight-this.layerConfig.maxHeight<-1+this.scrollMargin.bottom||e<0&&this.session.getScrollLeft()>=1-this.scrollMargin.left||e>0&&this.session.getScrollLeft()+this.$size.scrollerWidth-this.layerConfig.width<-1+this.scrollMargin.right||void 0}pixelToScreenCoordinates(e,t){var i
if(this.$hasCssTransforms){i={top:0,left:0}
var n=this.$fontMetrics.transformCoordinates([e,t])
e=n[1]-this.gutterWidth-this.margin.left,t=n[0]}else i=this.scroller.getBoundingClientRect()
var s=e+this.scrollLeft-i.left-this.$padding,r=s/this.characterWidth,o=Math.floor((t+this.scrollTop-i.top)/this.lineHeight),a=this.$blockCursor?Math.floor(r):Math.round(r)
return{row:o,column:a,side:r-a>0?1:-1,offsetX:s}}screenToTextCoordinates(e,t){var i
if(this.$hasCssTransforms){i={top:0,left:0}
var n=this.$fontMetrics.transformCoordinates([e,t])
e=n[1]-this.gutterWidth-this.margin.left,t=n[0]}else i=this.scroller.getBoundingClientRect()
var s=e+this.scrollLeft-i.left-this.$padding,r=s/this.characterWidth,o=this.$blockCursor?Math.floor(r):Math.round(r),a=Math.floor((t+this.scrollTop-i.top)/this.lineHeight)
return this.session.screenToDocumentPosition(a,Math.max(o,0),s)}textToScreenCoordinates(e,t){var i=this.scroller.getBoundingClientRect(),n=this.session.documentToScreenPosition(e,t),s=this.$padding+(this.session.$bidiHandler.isBidiRow(n.row,e)?this.session.$bidiHandler.getPosLeft(n.column):Math.round(n.column*this.characterWidth)),r=n.row*this.lineHeight
return{pageX:i.left+s-this.scrollLeft,pageY:i.top+r-this.scrollTop}}visualizeFocus(){s.addCssClass(this.container,"ace_focus")}visualizeBlur(){s.removeCssClass(this.container,"ace_focus")}showComposition(e){this.$composition=e,e.cssText||(e.cssText=this.textarea.style.cssText),null==e.useTextareaForIME&&(e.useTextareaForIME=this.$useTextareaForIME),this.$useTextareaForIME?(s.addCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText="",this.$moveTextAreaToCursor(),this.$cursorLayer.element.style.display="none"):e.markerId=this.session.addMarker(e.markerRange,"ace_composition_marker","text")}setCompositionText(e){var t=this.session.selection.cursor
this.addToken(e,"composition_placeholder",t.row,t.column),this.$moveTextAreaToCursor()}hideComposition(){if(this.$composition){this.$composition.markerId&&this.session.removeMarker(this.$composition.markerId),s.removeCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText=this.$composition.cssText
var e=this.session.selection.cursor
this.removeExtraToken(e.row,e.column),this.$composition=null,this.$cursorLayer.element.style.display=""}}setGhostText(e,t){var i=this.session.selection.cursor,n=t||{row:i.row,column:i.column}
this.removeGhostText()
var r=this.$calculateWrappedTextChunks(e,n)
this.addToken(r[0].text,"ghost_text",n.row,n.column),this.$ghostText={text:e,position:{row:n.row,column:n.column}}
var o=s.createElement("div")
if(r.length>1){var a,l=this.hideTokensAfterPosition(n.row,n.column)
r.slice(1).forEach((e=>{var t=s.createElement("div"),i=s.createElement("span")
i.className="ace_ghost_text",e.wrapped&&(t.className="ghost_text_line_wrapped"),0===e.text.length&&(e.text=" "),i.appendChild(s.createTextNode(e.text)),t.appendChild(i),o.appendChild(t),a=t})),l.forEach((e=>{var t=s.createElement("span")
b(e.type)||(t.className="ace_"+e.type.replace(/\./g," ace_")),t.appendChild(s.createTextNode(e.value)),a.appendChild(t)})),this.$ghostTextWidget={el:o,row:n.row,column:n.column,className:"ace_ghost_text_container"},this.session.widgetManager.addLineWidget(this.$ghostTextWidget)
var h=this.$cursorLayer.getPixelPosition(n,!0),c=this.container.getBoundingClientRect().height,u=r.length*this.lineHeight
if(u<c-h.top)return
u<c?this.scrollBy(0,(r.length-1)*this.lineHeight):this.scrollToRow(n.row)}}$calculateWrappedTextChunks(e,t){var i=this.$size.scrollerWidth-2*this.$padding,n=Math.floor(i/this.characterWidth)-2
n=n<=0?60:n
for(var s=e.split(/\r?\n/),r=[],o=0;o<s.length;o++){var a=this.session.$getDisplayTokens(s[o],t.column),l=this.session.$computeWrapSplits(a,n,this.session.$tabSize)
if(l.length>0){var h=0
l.push(s[o].length)
for(var c=0;c<l.length;c++){let e=s[o].slice(h,l[c])
r.push({text:e,wrapped:!0}),h=l[c]}}else r.push({text:s[o],wrapped:!1})}return r}removeGhostText(){if(this.$ghostText){var e=this.$ghostText.position
this.removeExtraToken(e.row,e.column),this.$ghostTextWidget&&(this.session.widgetManager.removeLineWidget(this.$ghostTextWidget),this.$ghostTextWidget=null),this.$ghostText=null}}addToken(e,t,i,n){var s=this.session
s.bgTokenizer.lines[i]=null
var r={type:t,value:e},o=s.getTokens(i)
if(null!=n&&o.length)for(var a=0,l=0;l<o.length;l++){var h=o[l]
if(n<=(a+=h.value.length)){var c=h.value.length-(a-n),u=h.value.slice(0,c),d=h.value.slice(c)
o.splice(l,1,{type:h.type,value:u},r,{type:h.type,value:d})
break}}else o.push(r)
this.updateLines(i,i)}hideTokensAfterPosition(e,t){for(var i=this.session.getTokens(e),n=0,s=!1,r=[],o=0;o<i.length;o++){var a=i[o]
n+=a.value.length,"ghost_text"!==a.type&&(s?(r.push({type:a.type,value:a.value}),a.type="hidden_token"):n===t&&(s=!0))}return this.updateLines(e,e),r}removeExtraToken(e,t){this.session.bgTokenizer.lines[e]=null,this.updateLines(e,e)}setTheme(e,t){function i(i){if(n.$themeId!=e)return t&&t()
if(!i||!i.cssClass)throw Error("couldn't load module "+e+" or it didn't call define")
i.$id&&(n.$themeId=i.$id),s.importCssString(i.cssText,i.cssClass,n.container),n.theme&&s.removeCssClass(n.container,n.theme.cssClass)
var r="padding"in i?i.padding:"padding"in(n.theme||{})?4:n.$padding
n.$padding&&r!=n.$padding&&n.setPadding(r),n.$theme=i.cssClass,n.theme=i,s.addCssClass(n.container,i.cssClass),s.setCssClass(n.container,"ace_dark",i.isDark),n.$size&&(n.$size.width=0,n.$updateSizeAsync()),n._dispatchEvent("themeLoaded",{theme:i}),t&&t(),x.isSafari&&n.scroller&&(n.scroller.style.background="red",n.scroller.style.background="")}var n=this
if(this.$themeId=e,n._dispatchEvent("themeChange",{theme:e}),e&&"string"!=typeof e)i(e)
else{var r=e||this.$options.theme.initialValue
o.loadModule(["theme",r],i)}}getTheme(){return this.$themeId}setStyle(e,t){s.setCssClass(this.container,e,!1!==t)}unsetStyle(e){s.removeCssClass(this.container,e)}setCursorStyle(e){s.setStyle(this.scroller.style,"cursor",e)}setMouseCursor(e){s.setStyle(this.scroller.style,"cursor",e)}attachToShadowRoot(){s.importCssString(w,"ace_editor.css",this.container)}destroy(){this.freeze(),this.$fontMetrics.destroy(),this.$cursorLayer.destroy(),this.removeAllListeners(),this.container.textContent="",this.setOption("useResizeObserver",!1)}$updateCustomScrollbar(e){var t=this
this.$horizScroll=this.$vScroll=null,this.scrollBarV.element.remove(),this.scrollBarH.element.remove(),this.$scrollDecorator&&delete this.$scrollDecorator,!0===e?(this.scrollBarV=new p(this.container,this),this.scrollBarH=new g(this.container,this),this.scrollBarV.setHeight(this.$size.scrollerHeight),this.scrollBarH.setWidth(this.$size.scrollerWidth),this.scrollBarV.addEventListener("scroll",(function(e){t.$scrollAnimation||t.session.setScrollTop(e.data-t.scrollMargin.top)})),this.scrollBarH.addEventListener("scroll",(function(e){t.$scrollAnimation||t.session.setScrollLeft(e.data-t.scrollMargin.left)})),this.$scrollDecorator=new y(this.scrollBarV,this),this.$scrollDecorator.$updateDecorators()):(this.scrollBarV=new d(this.container,this),this.scrollBarH=new u(this.container,this),this.scrollBarV.addEventListener("scroll",(function(e){t.$scrollAnimation||t.session.setScrollTop(e.data-t.scrollMargin.top)})),this.scrollBarH.addEventListener("scroll",(function(e){t.$scrollAnimation||t.session.setScrollLeft(e.data-t.scrollMargin.left)})))}$addResizeObserver(){if(window.ResizeObserver&&!this.$resizeObserver){var e=this
this.$resizeTimer=r.delayedCall((function(){e.destroyed||e.onResize()}),50),this.$resizeObserver=new window.ResizeObserver((function(t){var i=t[0].contentRect.width,n=t[0].contentRect.height
Math.abs(e.$size.width-i)>1||Math.abs(e.$size.height-n)>1?e.$resizeTimer.delay():e.$resizeTimer.cancel()})),this.$resizeObserver.observe(this.container)}}}C.prototype.CHANGE_CURSOR=1,C.prototype.CHANGE_MARKER=2,C.prototype.CHANGE_GUTTER=4,C.prototype.CHANGE_SCROLL=8,C.prototype.CHANGE_LINES=16,C.prototype.CHANGE_TEXT=32,C.prototype.CHANGE_SIZE=64,C.prototype.CHANGE_MARKER_BACK=128,C.prototype.CHANGE_MARKER_FRONT=256,C.prototype.CHANGE_FULL=512,C.prototype.CHANGE_H_SCROLL=1024,C.prototype.$changes=0,C.prototype.$padding=null,C.prototype.$frozen=!1,C.prototype.STEPS=8,n.implement(C.prototype,v),o.defineOptions(C.prototype,"renderer",{useResizeObserver:{set:function(e){!e&&this.$resizeObserver?(this.$resizeObserver.disconnect(),this.$resizeTimer.cancel(),this.$resizeTimer=this.$resizeObserver=null):e&&!this.$resizeObserver&&this.$addResizeObserver()}},animatedScroll:{initialValue:!1},showInvisibles:{set:function(e){this.$textLayer.setShowInvisibles(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!1},showPrintMargin:{set:function(){this.$updatePrintMargin()},initialValue:!0},printMarginColumn:{set:function(){this.$updatePrintMargin()},initialValue:80},printMargin:{set:function(e){"number"==typeof e&&(this.$printMarginColumn=e),this.$showPrintMargin=!!e,this.$updatePrintMargin()},get:function(){return this.$showPrintMargin&&this.$printMarginColumn}},showGutter:{set:function(e){this.$gutter.style.display=e?"block":"none",this.$loop.schedule(this.CHANGE_FULL),this.onGutterResize()},initialValue:!0},useSvgGutterIcons:{set:function(e){this.$gutterLayer.$useSvgGutterIcons=e},initialValue:!1},showFoldedAnnotations:{set:function(e){this.$gutterLayer.$showFoldedAnnotations=e},initialValue:!1},fadeFoldWidgets:{set:function(e){s.setCssClass(this.$gutter,"ace_fade-fold-widgets",e)},initialValue:!1},showFoldWidgets:{set:function(e){this.$gutterLayer.setShowFoldWidgets(e),this.$loop.schedule(this.CHANGE_GUTTER)},initialValue:!0},displayIndentGuides:{set:function(e){this.$textLayer.setDisplayIndentGuides(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!0},highlightIndentGuides:{set:function(e){1==this.$textLayer.setHighlightIndentGuides(e)?this.$textLayer.$highlightIndentGuide():this.$textLayer.$clearActiveIndentGuide(this.$textLayer.$lines.cells)},initialValue:!0},highlightGutterLine:{set:function(e){this.$gutterLayer.setHighlightGutterLine(e),this.$loop.schedule(this.CHANGE_GUTTER)},initialValue:!0},hScrollBarAlwaysVisible:{set:function(){this.$hScrollBarAlwaysVisible&&this.$horizScroll||this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},vScrollBarAlwaysVisible:{set:function(){this.$vScrollBarAlwaysVisible&&this.$vScroll||this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},fontSize:{set:function(e){"number"==typeof e&&(e+="px"),this.container.style.fontSize=e,this.updateFontSize()},initialValue:12},fontFamily:{set:function(e){this.container.style.fontFamily=e,this.updateFontSize()}},maxLines:{set:function(){this.updateFull()}},minLines:{set:function(){this.$minLines<562949953421311||(this.$minLines=0),this.updateFull()}},maxPixelHeight:{set:function(){this.updateFull()},initialValue:0},scrollPastEnd:{set:function(e){e=+e||0,this.$scrollPastEnd!=e&&(this.$scrollPastEnd=e,this.$loop.schedule(this.CHANGE_SCROLL))},initialValue:0,handlesSet:!0},fixedWidthGutter:{set:function(e){this.$gutterLayer.$fixedWidth=!!e,this.$loop.schedule(this.CHANGE_GUTTER)}},customScrollbar:{set:function(e){this.$updateCustomScrollbar(e)},initialValue:!1},theme:{set:function(e){this.setTheme(e)},get:function(){return this.$themeId||this.theme},initialValue:"./theme/textmate",handlesSet:!0},hasCssTransforms:{},useTextareaForIME:{initialValue:!x.isMobile&&!x.isIE}}),t.t=C},6862:(e,t)=>{var i
i=function(){this.attachToDocument=function(){},this.on=function(){},this.terminate=function(){}},t.WorkerClient=i}},i={}
e.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{function t(e,t){for(var i=65536,n=0;n<t.length;n+=2){if((i+=t[n])>e)return!1
if((i+=t[n+1])>=e)return!0}return!1}function i(e,i){return e<65?36===e:e<91||(e<97?95===e:e<123||(e<=65535?e>=170&&Y.test(String.fromCharCode(e)):!1!==i&&t(e,H)))}function n(e,i){return e<48?36===e:e<58||!(e<65)&&(e<91||(e<97?95===e:e<123||(e<=65535?e>=170&&Q.test(String.fromCharCode(e)):!1!==i&&(t(e,H)||t(e,z)))))}function s(e,t){return new Z(e,{beforeExpr:!0,binop:t})}function r(e,t){return void 0===t&&(t={}),t.keyword=e,J[e]=new Z(e,t)}function o(e){return 10===e||13===e||8232===e||8233===e}function a(e,t,i){void 0===i&&(i=e.length)
for(var n=t;n<i;n++){var s=e.charCodeAt(n)
if(o(s))return n<i-1&&13===s&&10===e.charCodeAt(n+1)?n+2:n+1}return-1}function l(e){return ce[e]||(ce[e]=RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function h(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(55296+((e-=65536)>>10),56320+(1023&e))}function c(e,t){for(var i=1,n=0;;){var s=a(e,n,t)
if(s<0)return new de(i,t-n);++i,n=s}}function u(e){var t={}
for(var i in pe)t[i]=e&&le(e,i)?e[i]:pe[i]
if("latest"===t.ecmaVersion?t.ecmaVersion=1e8:null==t.ecmaVersion?(!me&&"object"==typeof console&&console.warn&&(me=!0),t.ecmaVersion=11):t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),null==t.allowReserved&&(t.allowReserved=t.ecmaVersion<5),e&&null!=e.allowHashBang||(t.allowHashBang=t.ecmaVersion>=14),he(t.onToken)){var n=t.onToken
t.onToken=function(e){return n.push(e)}}return he(t.onComment)&&(t.onComment=function(e,t){return function(i,n,s,r,o,a){var l={type:i?"Block":"Line",value:n,start:s,end:r}
e.locations&&(l.loc=new ge(this,o,a)),e.ranges&&(l.range=[s,r]),t.push(l)}}(t,t.onComment)),t}function d(e,t){return 2|(e?4:0)|(t?8:0)}function g(e,t){var i=t.key.name,n=e[i],s="true"
return"MethodDefinition"!==t.type||"get"!==t.kind&&"set"!==t.kind||(s=(t.static?"s":"i")+t.kind),"iget"===n&&"iset"===s||"iset"===n&&"iget"===s||"sget"===n&&"sset"===s||"sset"===n&&"sget"===s?(e[i]="true",!1):!!n||(e[i]=s,!1)}function p(e,t){var i=e.computed,n=e.key
return!i&&("Identifier"===n.type&&n.name===t||"Literal"===n.type&&n.value===t)}function m(e){return"Identifier"===e.type||"ParenthesizedExpression"===e.type&&m(e.expression)}function f(e){return"MemberExpression"===e.type&&"PrivateIdentifier"===e.property.type||"ChainExpression"===e.type&&f(e.expression)||"ParenthesizedExpression"===e.type&&f(e.expression)}function v(e,t,i,n){return e.type=t,e.end=i,this.options.locations&&(e.loc.end=n),this.options.ranges&&(e.range[1]=i),e}function w(e){var t=Xe[e]={binary:l(He[e]+" "+je),binaryOfStrings:l(Ve[e]),nonBinary:{General_Category:l(je),Script:l(Ze[e])}}
t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}function y(e){return 36===e||e>=40&&e<=43||46===e||63===e||e>=91&&e<=94||e>=123&&e<=125}function x(e){return e>=65&&e<=90||e>=97&&e<=122}function b(e){return x(e)||95===e}function C(e){return b(e)||S(e)}function S(e){return e>=48&&e<=57}function k(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function $(e){return e>=65&&e<=70?e-65+10:e>=97&&e<=102?e-97+10:e-48}function A(e){return e>=48&&e<=55}function M(e){return"function"!=typeof BigInt?null:BigInt(e.replace(/_/g,""))}function L(e,t){switch(t.type){case"Identifier":e.push('"'+t.name+'"')
break
case"RestElement":L(e,t.argument)
break
case"ArrayPattern":for(const i of t.elements)null!=i&&L(e,i)
break
case"ObjectPattern":for(const i of t.properties)"Property"===i.type?L(e,i.value):L(e,i.argument)
break
case"AssignmentPattern":L(e,t.left)}}function T(e,t){switch(t.type){case"Identifier":return t.name
case"RestElement":return"..."+T(e,t.argument)
case"ArrayPattern":return"["+t.elements.map((t=>null==t?"":T(e,t))).join(",")+"]"
case"ObjectPattern":return"{"+t.properties.map((t=>"Property"===t.type?t.computed?"["+R(e,t.key)+"]":R(e,t.key)+":"+T(e,t.value):"..."+T(e,t.argument))).join(",")+"}"
default:return e.slice(t.start,t.end).trim()}}function E(e,t){const i=[]
let n=""
for(const{id:s,init:r}of t.declarations)L(i,s),n+=T(e,s)+"=",n+=null!=r?R(e,r)+";\n":"void 0;\n"
return"module.global("+i.join(",")+");\n"+n}function I(e,t){return t.kind+" "+t.declarations.map((({id:t,init:i})=>{let n=T(e,t)
return null!=i&&(n+="="+R(e,i)),n})).join(",")}function R(e,t){let i=""
switch(t.type){case"MetaProperty":"import"===t.meta.name&&"meta"===t.property.name?i+="module.meta":i+=e.slice(t.start,t.end).trim()
break
case"ImportExpression":i+="module.import("+R(e,t.source)+")"
break
default:i+=e.slice(t.start,t.end).trim()}return i}function _(e,t){let i="class"
{const e=t.id
null!=e&&(i+=" "+e.name)}{const n=t.superClass
null!=n&&(i+=" extends "+R(e,n))}i+="{\n"
for(const n of t.body.body)switch(n.type){case"StaticBlock":i+="static{\n"+D(e,n.body)+"}\n"
break
case"MethodDefinition":{const t=n.value
n.static&&(i+="static "),t.async&&(i+="async "),t.generator&&(i+="*")
let s=!0
switch(n.kind){case"set":i+="set "
break
case"get":i+="get "
break
case"constructor":i+="constructor(",s=!1}if(s){const t=n.key
n.computed?i+="["+R(e,t)+"](":i+=e.slice(t.start,t.end).trim()+"("}i+=t.params.map((t=>T(e,t))).join(",")+"){\n",i+=D(e,t.body.body)+"}\n"}break
case"PropertyDefinition":n.static&&(i+="static ")
{const t=n.key
n.computed?i+="["+R(e,t)+"]":i+=e.slice(t.start,t.end).trim()}{const t=n.value
i+=null!=t?"="+R(e,t)+";\n":";\n"}}return i+"}\n"}function N(e,t){let i=""
switch(t.type){case"FunctionDeclaration":i+=function(e,t){let i=t.async?"async function":"function"
{const e=t.id
null!=e&&(i+=" "+e.name)}i+=t.generator?"*(":"("+t.params.map((t=>T(e,t))).join(",")+")"
{const n=t.body
"BlockStatement"===n.type?i+="{\n"+D(e,n.body)+"}\n":i+="{\nreturn "+R(e,n)+";\n}\n"}return i}(e,t)
break
case"VariableDeclaration":i+=I(e,t)+";\n"
break
case"ClassDeclaration":i+=_(e,t)
break
case"IfStatement":i+="if("+R(e,t.test)+")\n",i+=N(e,t.consequent)
{const n=t.alternate
null!=n&&(i+="else "+N(e,n))}break
case"TryStatement":i+="try{\n"+D(e,t.block.body)+"\n}"
{const n=t.handler
if(null!=n){i+="catch"
{const t=n.param
null!=t&&(i+="("+T(e,t)+")")}i+="{\n"+D(e,n.body.body)+"\n}"}}{const n=t.finalizer
null!=n&&(i+="finally{\n"+D(e,n.body)+"\n}")}break
case"ForStatement":i+="for("
{const n=t.init
null!=n&&("VariableDeclaration"===n.type?i+=I(e,n):i+=R(e,n))}i+=";"
{const n=t.test
null!=n&&(i+=R(e,n))}i+=";"
{const n=t.update
null!=n&&(i+=R(e,n))}i+=")\n"+N(e,t.body)
break
case"ForInStatement":i+="for("
{const n=t.left
"VariableDeclaration"===n.type?i+=I(e,n):i+=T(e,n)}i+=" in "+R(e,t.right)+")\n"+N(e,t.body)
break
case"ForOfStatement":i+=t.await?"for await(":"for("
{const n=t.left
"VariableDeclaration"===n.type?i+=I(e,n):i+=T(e,n)}i+=" of "+R(e,t.right)+")\n"+N(e,t.body)
break
case"SwitchStatement":i+="switch("+R(e,t.discriminant)+"){\n"
for(const{test:n,consequent:s}of t.cases)i+=null!=n?"case "+R(e,n)+":\n":"default:\n",i+=D(e,s)
i+="}\n"
break
case"ReturnStatement":{const n=t.argument
i+=null!=n?"return "+R(e,n)+";\n":"return;\n"}break
case"WithStatement":i+="with("+R(e,t.object)+")\n"+N(e,t.body)
break
case"WhileStatement":i+="while("+R(e,t.test)+")\n"+N(e,t.body)
break
case"DoWhileStatement":i+="do "+N(e,t.body)+"while("+R(e,t.test)+");\n"
break
case"BlockStatement":i+="{\n"+D(e,t.body)+"\n}\n"
break
case"ThrowStatement":i+="throw "+R(e,t.argument)+";\n"
break
case"LabeledStatement":i+=t.label.name+":\n"+N(e,t.body)
break
case"ExpressionStatement":i+=R(e,t.expression)+";\n"
break
case"EmptyStatement":case"DebuggerStatement":break
default:i+=e.slice(t.start,t.end).trim()+";\n"}return i}function D(e,t){let i=""
for(const n of t)i+=N(e,n)
return i}function O(e,t){let i=""
switch(t.type){case"FunctionDeclaration":i+='window["'+t.id.name+'"]='+(t.async?"async function":"function")+(t.generator?"*(":"("),i+=t.params.map((t=>T(e,t))).join(",")+"){\n",i+=D(e,t.body.body)+"}\n"
break
case"VariableDeclaration":"var"===t.kind?i+=E(e,t):i+=I(e,t)+";\n"
break
case"ClassDeclaration":i+=_(e,t)
break
case"IfStatement":i+="if("+R(e,t.test)+")\n",i+=O(e,t.consequent)
{const n=t.alternate
null!=n&&(i+="else "+O(e,n))}break
case"TryStatement":i+="try{\n"+F(e,t.block.body)+"\n}"
{const n=t.handler
if(null!=n){i+="catch"
{const t=n.param
null!=t&&(i+="("+T(e,t)+")")}i+="{\n"+F(e,n.body.body)+"\n}"}}{const n=t.finalizer
null!=n&&(i+="finally{\n"+F(e,n.body)+"\n}")}break
case"ForStatement":{const n=t.init
if(null!=n)if("VariableDeclaration"===n.type)if("var"===n.kind){const t=[],s=[]
for(const{id:i,init:r}of n.declarations)L(t,i),s.push(T(e,i)+"="+(null==r?"void 0":R(e,r)))
i+="module.global("+t.join(",")+");\nfor("+s.join(",")+";"}else i+="for("+I(e,n)+";"
else i+="for("+R(e,n)+";"
else i+="for(;"}{const n=t.test
null!=n&&(i+=R(e,n))}i+=";"
{const n=t.update
null!=n&&(i+=R(e,n))}i+=")\n"+O(e,t.body)
break
case"ForInStatement":{const n=t.left
if("VariableDeclaration"===n.type)if("var"===n.kind){const t=[],s=[]
for(const{id:i,init:r}of n.declarations)L(t,i),s.push(T(e,i)+"="+(null==r?"void 0":R(e,r)))
i+="module.global("+t.join(",")+");\nfor("+s.join(",")}else i+="for("+I(e,n)
else i+="for("+T(e,n)}i+=" in "+R(e,t.right)+")\n"+O(e,t.body)
break
case"ForOfStatement":{const n=t.left
if("VariableDeclaration"===n.type)if("var"===n.kind){const s=[],r=[]
for(const{id:t,init:i}of n.declarations)L(s,t),r.push(T(e,t)+"="+(null==i?"void 0":R(e,i)))
i+="module.global("+s.join(",")+");\n"+(t.await?"for await(":"for(")+r.join(",")}else i+=(t.await?"for await(":"for(")+I(e,n)
else i+=(t.await?"for await(":"for(")+T(e,n)}i+=" of "+R(e,t.right)+")\n"+O(e,t.body)
break
case"SwitchStatement":i+="switch("+R(e,t.discriminant)+"){\n"
for(const{test:n,consequent:s}of t.cases)i+=null!=n?"case "+R(e,n)+":\n":"default:\n",i+=F(e,s)
i+="}\n"
break
case"ReturnStatement":{const n=t.argument
i+=null!=n?"return "+R(e,n)+";\n":"return;\n"}break
case"WithStatement":i+="with("+R(e,t.object)+")\n"+O(e,t.body)
break
case"WhileStatement":i+="while("+R(e,t.test)+")\n"+O(e,t.body)
break
case"DoWhileStatement":i+="do "+O(e,t.body)+"while("+R(e,t.test)+");\n"
break
case"BlockStatement":i+="{\n"+F(e,t.body)+"\n}\n"
break
case"ThrowStatement":i+="throw "+R(e,t.argument)+";\n"
break
case"LabeledStatement":i+=t.label.name+":\n"+O(e,t.body)
break
case"ExpressionStatement":i+=R(e,t.expression)+";\n"
break
case"EmptyStatement":case"DebuggerStatement":break
default:i+=e.slice(t.start,t.end).trim()+";\n"}return i}function F(e,t){let i=""
for(const n of t)i+=O(e,n)
return i}function P(e,t){switch(t.type){case"VariableDeclaration":if("var"!==t.kind){const i=[]
let n=""
for(const{id:s,init:r}of t.declarations)L(i,s),n+=T(e,s)+"=",n+=null!=r?R(e,r)+";\n":"void 0;\n"
return"module.scope("+i.join(",")+");\n"+n}return E(e,t)
case"ClassDeclaration":const i=t.id.name
return'module.scope("'+i+'");\n'+i+"="+_(e,t)
case"ImportDeclaration":case"ExportAllDeclaration":case"ExportNamedDeclaration":case"ExportDefaultDeclaration":return""
default:return O(e,t)}}var W=e(5152),B=e(984),z=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,370,1,81,2,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,406,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,330,3,10,1,2,0,49,6,4,4,14,9,5351,0,7,14,13835,9,87,9,39,4,60,6,26,9,1014,0,2,54,8,3,82,0,12,1,19628,1,4706,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,983,6,110,6,6,9,4759,9,787719,239],H=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,68,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,349,41,7,1,79,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,264,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,328,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,4026,582,8634,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,689,63,129,74,6,0,67,12,65,1,2,0,29,6135,9,1237,43,8,8936,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,757,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4153,7,221,3,5761,15,7472,16,621,2467,541,1507,4938,6,4191],V="\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ca\ua7d0\ua7d1\ua7d3\ua7d5-\ua7d9\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",j={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},U="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",G={5:U,"5module":U+" export import",6:U+" const class extends export import super"},K=/^in(stanceof)?$/,Y=RegExp("["+V+"]"),Q=RegExp("["+V+"\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0898-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0cf3\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ece\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\u30fb\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f\uff65]"),Z=function(e,t){void 0===t&&(t={}),this.label=e,this.keyword=t.keyword,this.beforeExpr=!!t.beforeExpr,this.startsExpr=!!t.startsExpr,this.isLoop=!!t.isLoop,this.isAssign=!!t.isAssign,this.prefix=!!t.prefix,this.postfix=!!t.postfix,this.binop=t.binop||null,this.updateContext=null},X={beforeExpr:!0},q={startsExpr:!0},J={},ee={num:new Z("num",q),regexp:new Z("regexp",q),string:new Z("string",q),name:new Z("name",q),privateId:new Z("privateId",q),eof:new Z("eof"),bracketL:new Z("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new Z("]"),braceL:new Z("{",{beforeExpr:!0,startsExpr:!0}),braceR:new Z("}"),parenL:new Z("(",{beforeExpr:!0,startsExpr:!0}),parenR:new Z(")"),comma:new Z(",",X),semi:new Z(";",X),colon:new Z(":",X),dot:new Z("."),question:new Z("?",X),questionDot:new Z("?."),arrow:new Z("=>",X),template:new Z("template"),invalidTemplate:new Z("invalidTemplate"),ellipsis:new Z("...",X),backQuote:new Z("`",q),dollarBraceL:new Z("${",{beforeExpr:!0,startsExpr:!0}),eq:new Z("=",{beforeExpr:!0,isAssign:!0}),assign:new Z("_=",{beforeExpr:!0,isAssign:!0}),incDec:new Z("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new Z("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:s("||",1),logicalAND:s("&&",2),bitwiseOR:s("|",3),bitwiseXOR:s("^",4),bitwiseAND:s("&",5),equality:s("==/!=/===/!==",6),relational:s("</>/<=/>=",7),bitShift:s("<</>>/>>>",8),plusMin:new Z("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:s("%",10),star:s("*",10),slash:s("/",10),starstar:new Z("**",{beforeExpr:!0}),coalesce:s("??",1),_break:r("break"),_case:r("case",X),_catch:r("catch"),_continue:r("continue"),_debugger:r("debugger"),_default:r("default",X),_do:r("do",{isLoop:!0,beforeExpr:!0}),_else:r("else",X),_finally:r("finally"),_for:r("for",{isLoop:!0}),_function:r("function",q),_if:r("if"),_return:r("return",X),_switch:r("switch"),_throw:r("throw",X),_try:r("try"),_var:r("var"),_const:r("const"),_while:r("while",{isLoop:!0}),_with:r("with"),_new:r("new",{beforeExpr:!0,startsExpr:!0}),_this:r("this",q),_super:r("super",q),_class:r("class",q),_extends:r("extends",X),_export:r("export"),_import:r("import",q),_null:r("null",q),_true:r("true",q),_false:r("false",q),_in:r("in",{beforeExpr:!0,binop:7}),_instanceof:r("instanceof",{beforeExpr:!0,binop:7}),_typeof:r("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:r("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:r("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},te=/\r\n?|\n|\u2028|\u2029/,ie=RegExp(te.source,"g"),ne=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,se=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,re=Object.prototype,oe=re.hasOwnProperty,ae=re.toString,le=Object.hasOwn||function(e,t){return oe.call(e,t)},he=Array.isArray||function(e){return"[object Array]"===ae.call(e)},ce=Object.create(null),ue=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,de=function(e,t){this.line=e,this.column=t}
de.prototype.offset=function(e){return new de(this.line,this.column+e)}
var ge=function(e,t,i){this.start=t,this.end=i,null!==e.sourceFile&&(this.source=e.sourceFile)},pe={ecmaVersion:null,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},me=!1,fe=256,ve=function(e,t,i){this.options=e=u(e),this.sourceFile=e.sourceFile,this.keywords=l(G[e.ecmaVersion>=6?6:"module"===e.sourceType?"5module":5])
var n=""
!0!==e.allowReserved&&(n=j[e.ecmaVersion>=6?6:5===e.ecmaVersion?5:3],"module"===e.sourceType&&(n+=" await")),this.reservedWords=l(n)
var s=(n?n+" ":"")+j.strict
this.reservedWordsStrict=l(s),this.reservedWordsStrictBind=l(s+" "+j.strictBind),this.input=t+"",this.containsEsc=!1,i?(this.pos=i,this.lineStart=this.input.lastIndexOf("\n",i-1)+1,this.curLine=this.input.slice(0,this.lineStart).split(te).length):(this.pos=this.lineStart=0,this.curLine=1),this.type=ee.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule="module"===e.sourceType,this.strict=this.inModule||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),0===this.pos&&e.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(1),this.regexpState=null,this.privateNameStack=[]},we={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},inClassStaticBlock:{configurable:!0}}
ve.prototype.parse=function(){var e=this.options.program||this.startNode()
return this.nextToken(),this.parseTopLevel(e)},we.inFunction.get=function(){return(2&this.currentVarScope().flags)>0},we.inGenerator.get=function(){return(8&this.currentVarScope().flags)>0&&!this.currentVarScope().inClassFieldInit},we.inAsync.get=function(){return(4&this.currentVarScope().flags)>0&&!this.currentVarScope().inClassFieldInit},we.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e]
if(t.inClassFieldInit||t.flags&fe)return!1
if(2&t.flags)return(4&t.flags)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction},we.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags,i=e.inClassFieldInit
return(64&t)>0||i||this.options.allowSuperOutsideMethod},we.allowDirectSuper.get=function(){return(128&this.currentThisScope().flags)>0},we.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())},we.allowNewDotTarget.get=function(){var e=this.currentThisScope(),t=e.flags,i=e.inClassFieldInit
return(258&t)>0||i},we.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&fe)>0},ve.extend=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t]
for(var i=this,n=0;n<e.length;n++)i=e[n](i)
return i},ve.parse=function(e,t){return new this(t,e).parse()},ve.parseExpressionAt=function(e,t,i){var n=new this(i,e,t)
return n.nextToken(),n.parseExpression()},ve.tokenizer=function(e,t){return new this(t,e)},Object.defineProperties(ve.prototype,we)
var ye=ve.prototype,xe=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/
ye.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1
for(;;){se.lastIndex=e,e+=se.exec(this.input)[0].length
var t=xe.exec(this.input.slice(e))
if(!t)return!1
if("use strict"===(t[1]||t[2])){se.lastIndex=e+t[0].length
var i=se.exec(this.input),n=i.index+i[0].length,s=this.input.charAt(n)
return";"===s||"}"===s||te.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(s)||"!"===s&&"="===this.input.charAt(n+1))}e+=t[0].length,se.lastIndex=e,e+=se.exec(this.input)[0].length,";"===this.input[e]&&e++}},ye.eat=function(e){return this.type===e&&(this.next(),!0)},ye.isContextual=function(e){return this.type===ee.name&&this.value===e&&!this.containsEsc},ye.eatContextual=function(e){return!!this.isContextual(e)&&(this.next(),!0)},ye.expectContextual=function(e){this.eatContextual(e)||this.unexpected()},ye.canInsertSemicolon=function(){return this.type===ee.eof||this.type===ee.braceR||te.test(this.input.slice(this.lastTokEnd,this.start))},ye.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0},ye.semicolon=function(){this.eat(ee.semi)||this.insertSemicolon()||this.unexpected()},ye.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0},ye.expect=function(e){this.eat(e)||this.unexpected()},ye.unexpected=function(e){this.raise(null!=e?e:this.start,"Unexpected token")}
var be=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1}
ye.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element")
var i=t?e.parenthesizedAssign:e.parenthesizedBind
i>-1&&this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")}},ye.checkExpressionErrors=function(e,t){if(!e)return!1
var i=e.shorthandAssign,n=e.doubleProto
if(!t)return i>=0||n>=0
i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),n>=0&&this.raiseRecoverable(n,"Redefinition of __proto__ property")},ye.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")},ye.isSimpleAssignTarget=function(e){return"ParenthesizedExpression"===e.type?this.isSimpleAssignTarget(e.expression):"Identifier"===e.type||"MemberExpression"===e.type}
var Ce=ve.prototype
Ce.parseTopLevel=function(e){var t=Object.create(null)
for(e.body||(e.body=[]);this.type!==ee.eof;){var i=this.parseStatement(null,!0,t)
e.body.push(i)}if(this.inModule)for(var n=0,s=Object.keys(this.undefinedExports);n<s.length;n+=1){var r=s[n]
this.raiseRecoverable(this.undefinedExports[r].start,"Export '"+r+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType,this.finishNode(e,"Program")}
var Se={kind:"loop"},ke={kind:"switch"}
Ce.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1
se.lastIndex=this.pos
var t=se.exec(this.input),s=this.pos+t[0].length,r=this.input.charCodeAt(s)
if(91===r||92===r)return!0
if(e)return!1
if(123===r||r>55295&&r<56320)return!0
if(i(r,!0)){for(var o=s+1;n(r=this.input.charCodeAt(o),!0);)++o
if(92===r||r>55295&&r<56320)return!0
var a=this.input.slice(s,o)
if(!K.test(a))return!0}return!1},Ce.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1
se.lastIndex=this.pos
var e,t=se.exec(this.input),i=this.pos+t[0].length
return!(te.test(this.input.slice(this.pos,i))||"function"!==this.input.slice(i,i+8)||i+8!==this.input.length&&(n(e=this.input.charCodeAt(i+8))||e>55295&&e<56320))},Ce.parseStatement=function(e,t,i){var n,s=this.type,r=this.startNode()
switch(this.isLet(e)&&(s=ee._var,n="let"),s){case ee._break:case ee._continue:return this.parseBreakContinueStatement(r,s.keyword)
case ee._debugger:return this.parseDebuggerStatement(r)
case ee._do:return this.parseDoStatement(r)
case ee._for:return this.parseForStatement(r)
case ee._function:return e&&(this.strict||"if"!==e&&"label"!==e)&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(r,!1,!e)
case ee._class:return e&&this.unexpected(),this.parseClass(r,!0)
case ee._if:return this.parseIfStatement(r)
case ee._return:return this.parseReturnStatement(r)
case ee._switch:return this.parseSwitchStatement(r)
case ee._throw:return this.parseThrowStatement(r)
case ee._try:return this.parseTryStatement(r)
case ee._const:case ee._var:return n=n||this.value,e&&"var"!==n&&this.unexpected(),this.parseVarStatement(r,n)
case ee._while:return this.parseWhileStatement(r)
case ee._with:return this.parseWithStatement(r)
case ee.braceL:return this.parseBlock(!0,r)
case ee.semi:return this.parseEmptyStatement(r)
case ee._export:case ee._import:if(this.options.ecmaVersion>10&&s===ee._import){se.lastIndex=this.pos
var o=se.exec(this.input),a=this.pos+o[0].length,l=this.input.charCodeAt(a)
if(40===l||46===l)return this.parseExpressionStatement(r,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),s===ee._import?this.parseImport(r):this.parseExport(r,i)
default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(r,!0,!e)
var h=this.value,c=this.parseExpression()
return s===ee.name&&"Identifier"===c.type&&this.eat(ee.colon)?this.parseLabeledStatement(r,h,c,e):this.parseExpressionStatement(r,c)}},Ce.parseBreakContinueStatement=function(e,t){var i="break"===t
this.next(),this.eat(ee.semi)||this.insertSemicolon()?e.label=null:this.type!==ee.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon())
for(var n=0;n<this.labels.length;++n){var s=this.labels[n]
if(null==e.label||s.name===e.label.name){if(null!=s.kind&&(i||"loop"===s.kind))break
if(e.label&&i)break}}return n===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,i?"BreakStatement":"ContinueStatement")},Ce.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")},Ce.parseDoStatement=function(e){return this.next(),this.labels.push(Se),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(ee._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(ee.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")},Ce.parseForStatement=function(e){this.next()
var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1
if(this.labels.push(Se),this.enterScope(0),this.expect(ee.parenL),this.type===ee.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null)
var i=this.isLet()
if(this.type===ee._var||this.type===ee._const||i){var n=this.startNode(),s=i?"let":this.value
return this.next(),this.parseVar(n,!0,s),this.finishNode(n,"VariableDeclaration"),(this.type===ee._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&1===n.declarations.length?(this.options.ecmaVersion>=9&&(this.type===ee._in?t>-1&&this.unexpected(t):e.await=t>-1),this.parseForIn(e,n)):(t>-1&&this.unexpected(t),this.parseFor(e,n))}var r=this.isContextual("let"),o=!1,a=this.containsEsc,l=new be,h=this.start,c=t>-1?this.parseExprSubscripts(l,"await"):this.parseExpression(!0,l)
return this.type===ee._in||(o=this.options.ecmaVersion>=6&&this.isContextual("of"))?(t>-1?(this.type===ee._in&&this.unexpected(t),e.await=!0):o&&this.options.ecmaVersion>=8&&(c.start!==h||a||"Identifier"!==c.type||"async"!==c.name?this.options.ecmaVersion>=9&&(e.await=!1):this.unexpected()),r&&o&&this.raise(c.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(c,!1,l),this.checkLValPattern(c),this.parseForIn(e,c)):(this.checkExpressionErrors(l,!0),t>-1&&this.unexpected(t),this.parseFor(e,c))},Ce.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,Ae|(i?0:Me),!1,t)},Ce.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(ee._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")},Ce.parseReturnStatement=function(e){return this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(ee.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")},Ce.parseSwitchStatement=function(e){var t
this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(ee.braceL),this.labels.push(ke),this.enterScope(0)
for(var i=!1;this.type!==ee.braceR;)if(this.type===ee._case||this.type===ee._default){var n=this.type===ee._case
t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),n?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(ee.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null))
return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")},Ce.parseThrowStatement=function(e){return this.next(),te.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")}
var $e=[]
Ce.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t="Identifier"===e.type
return this.enterScope(t?32:0),this.checkLValPattern(e,t?4:2),this.expect(ee.parenR),e},Ce.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===ee._catch){var t=this.startNode()
this.next(),this.eat(ee.parenL)?t.param=this.parseCatchClauseParam():(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(ee._finally)?this.parseBlock():null,e.handler||e.finalizer||this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")},Ce.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")},Ce.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(Se),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")},Ce.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")},Ce.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")},Ce.parseLabeledStatement=function(e,t,i,n){for(var s=0,r=this.labels;s<r.length;s+=1)r[s].name===t&&this.raise(i.start,"Label '"+t+"' is already declared")
for(var o=this.type.isLoop?"loop":this.type===ee._switch?"switch":null,a=this.labels.length-1;a>=0;a--){var l=this.labels[a]
if(l.statementStart!==e.start)break
l.statementStart=this.start,l.kind=o}return this.labels.push({name:t,kind:o,statementStart:this.start}),e.body=this.parseStatement(n?-1===n.indexOf("label")?n+"label":n:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")},Ce.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")},Ce.parseBlock=function(e,t,i){for(void 0===e&&(e=!0),void 0===t&&(t=this.startNode()),t.body=[],this.expect(ee.braceL),e&&this.enterScope(0);this.type!==ee.braceR;){var n=this.parseStatement(null)
t.body.push(n)}return i&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")},Ce.parseFor=function(e,t){return e.init=t,this.expect(ee.semi),e.test=this.type===ee.semi?null:this.parseExpression(),this.expect(ee.semi),e.update=this.type===ee.parenR?null:this.parseExpression(),this.expect(ee.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")},Ce.parseForIn=function(e,t){var i=this.type===ee._in
return this.next(),"VariableDeclaration"===t.type&&null!=t.declarations[0].init&&(!i||this.options.ecmaVersion<8||this.strict||"var"!==t.kind||"Identifier"!==t.declarations[0].id.type)&&this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(ee.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")},Ce.parseVar=function(e,t,i,n){for(e.declarations=[],e.kind=i;;){var s=this.startNode()
if(this.parseVarId(s,i),this.eat(ee.eq)?s.init=this.parseMaybeAssign(t):n||"const"!==i||this.type===ee._in||this.options.ecmaVersion>=6&&this.isContextual("of")?n||"Identifier"===s.id.type||t&&(this.type===ee._in||this.isContextual("of"))?s.init=null:this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):this.unexpected(),e.declarations.push(this.finishNode(s,"VariableDeclarator")),!this.eat(ee.comma))break}return e},Ce.parseVarId=function(e,t){e.id=this.parseBindingAtom(),this.checkLValPattern(e.id,"var"===t?1:2,!1)}
var Ae=1,Me=2
Ce.parseFunction=function(e,t,i,n,s){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!n)&&(this.type===ee.star&&t&Me&&this.unexpected(),e.generator=this.eat(ee.star)),this.options.ecmaVersion>=8&&(e.async=!!n),t&Ae&&(e.id=4&t&&this.type!==ee.name?null:this.parseIdent(),!e.id||t&Me||this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?1:2:3))
var r=this.yieldPos,o=this.awaitPos,a=this.awaitIdentPos
return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(d(e.async,e.generator)),t&Ae||(e.id=this.type===ee.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,s),this.yieldPos=r,this.awaitPos=o,this.awaitIdentPos=a,this.finishNode(e,t&Ae?"FunctionDeclaration":"FunctionExpression")},Ce.parseFunctionParams=function(e){this.expect(ee.parenL),e.params=this.parseBindingList(ee.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()},Ce.parseClass=function(e,t){this.next()
var i=this.strict
this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e)
var n=this.enterClassBody(),s=this.startNode(),r=!1
for(s.body=[],this.expect(ee.braceL);this.type!==ee.braceR;){var o=this.parseClassElement(null!==e.superClass)
o&&(s.body.push(o),"MethodDefinition"===o.type&&"constructor"===o.kind?(r&&this.raiseRecoverable(o.start,"Duplicate constructor in the same class"),r=!0):o.key&&"PrivateIdentifier"===o.key.type&&g(n,o)&&this.raiseRecoverable(o.key.start,"Identifier '#"+o.key.name+"' has already been declared"))}return this.strict=i,this.next(),e.body=this.finishNode(s,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")},Ce.parseClassElement=function(e){if(this.eat(ee.semi))return null
var t=this.options.ecmaVersion,i=this.startNode(),n="",s=!1,r=!1,o="method",a=!1
if(this.eatContextual("static")){if(t>=13&&this.eat(ee.braceL))return this.parseClassStaticBlock(i),i
this.isClassElementNameStart()||this.type===ee.star?a=!0:n="static"}if(i.static=a,!n&&t>=8&&this.eatContextual("async")&&(!this.isClassElementNameStart()&&this.type!==ee.star||this.canInsertSemicolon()?n="async":r=!0),!n&&(t>=9||!r)&&this.eat(ee.star)&&(s=!0),!n&&!r&&!s){var l=this.value;(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?o=l:n=l)}if(n?(i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=n,this.finishNode(i.key,"Identifier")):this.parseClassElementName(i),t<13||this.type===ee.parenL||"method"!==o||s||r){var h=!i.static&&p(i,"constructor"),c=h&&e
h&&"method"!==o&&this.raise(i.key.start,"Constructor can't have get/set modifier"),i.kind=h?"constructor":o,this.parseClassMethod(i,s,r,c)}else this.parseClassField(i)
return i},Ce.isClassElementNameStart=function(){return this.type===ee.name||this.type===ee.privateId||this.type===ee.num||this.type===ee.string||this.type===ee.bracketL||this.type.keyword},Ce.parseClassElementName=function(e){this.type===ee.privateId?("constructor"===this.value&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)},Ce.parseClassMethod=function(e,t,i,n){var s=e.key
"constructor"===e.kind?(t&&this.raise(s.start,"Constructor can't be a generator"),i&&this.raise(s.start,"Constructor can't be an async method")):e.static&&p(e,"prototype")&&this.raise(s.start,"Classes may not have a static property named prototype")
var r=e.value=this.parseMethod(t,i,n)
return"get"===e.kind&&0!==r.params.length&&this.raiseRecoverable(r.start,"getter should have no params"),"set"===e.kind&&1!==r.params.length&&this.raiseRecoverable(r.start,"setter should have exactly one param"),"set"===e.kind&&"RestElement"===r.params[0].type&&this.raiseRecoverable(r.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")},Ce.parseClassField=function(e){if(p(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&p(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(ee.eq)){var t=this.currentThisScope(),i=t.inClassFieldInit
t.inClassFieldInit=!0,e.value=this.parseMaybeAssign(),t.inClassFieldInit=i}else e.value=null
return this.semicolon(),this.finishNode(e,"PropertyDefinition")},Ce.parseClassStaticBlock=function(e){e.body=[]
var t=this.labels
for(this.labels=[],this.enterScope(320);this.type!==ee.braceR;){var i=this.parseStatement(null)
e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")},Ce.parseClassId=function(e,t){this.type===ee.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,2,!1)):(!0===t&&this.unexpected(),e.id=null)},Ce.parseClassSuper=function(e){e.superClass=this.eat(ee._extends)?this.parseExprSubscripts(null,!1):null},Ce.enterClassBody=function(){var e={declared:Object.create(null),used:[]}
return this.privateNameStack.push(e),e.declared},Ce.exitClassBody=function(){var e=this.privateNameStack.pop(),t=e.declared,i=e.used
if(this.options.checkPrivateFields)for(var n=this.privateNameStack.length,s=0===n?null:this.privateNameStack[n-1],r=0;r<i.length;++r){var o=i[r]
le(t,o.name)||(s?s.used.push(o):this.raiseRecoverable(o.start,"Private field '#"+o.name+"' must be declared in an enclosing class"))}},Ce.parseExportAllDeclaration=function(e,t){return this.options.ecmaVersion>=11&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==ee.string&&this.unexpected(),e.source=this.parseExprAtom(),this.semicolon(),this.finishNode(e,"ExportAllDeclaration")},Ce.parseExport=function(e,t){if(this.next(),this.eat(ee.star))return this.parseExportAllDeclaration(e,t)
if(this.eat(ee._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration")
if(this.shouldParseExportStatement())e.declaration=this.parseExportDeclaration(e),"VariableDeclaration"===e.declaration.type?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null
else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==ee.string&&this.unexpected(),e.source=this.parseExprAtom()
else{for(var i=0,n=e.specifiers;i<n.length;i+=1){var s=n[i]
this.checkUnreserved(s.local),this.checkLocalExport(s.local),"Literal"===s.local.type&&this.raise(s.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")},Ce.parseExportDeclaration=function(){return this.parseStatement(null)},Ce.parseExportDefaultDeclaration=function(){var e
if(this.type===ee._function||(e=this.isAsyncFunction())){var t=this.startNode()
return this.next(),e&&this.next(),this.parseFunction(t,4|Ae,!1,e)}if(this.type===ee._class){var i=this.startNode()
return this.parseClass(i,"nullableID")}var n=this.parseMaybeAssign()
return this.semicolon(),n},Ce.checkExport=function(e,t,i){e&&("string"!=typeof t&&(t="Identifier"===t.type?t.name:t.value),le(e,t)&&this.raiseRecoverable(i,"Duplicate export '"+t+"'"),e[t]=!0)},Ce.checkPatternExport=function(e,t){var i=t.type
if("Identifier"===i)this.checkExport(e,t,t.start)
else if("ObjectPattern"===i)for(var n=0,s=t.properties;n<s.length;n+=1){var r=s[n]
this.checkPatternExport(e,r)}else if("ArrayPattern"===i)for(var o=0,a=t.elements;o<a.length;o+=1){var l=a[o]
l&&this.checkPatternExport(e,l)}else"Property"===i?this.checkPatternExport(e,t.value):"AssignmentPattern"===i?this.checkPatternExport(e,t.left):"RestElement"===i&&this.checkPatternExport(e,t.argument)},Ce.checkVariableExport=function(e,t){if(e)for(var i=0,n=t;i<n.length;i+=1){var s=n[i]
this.checkPatternExport(e,s.id)}},Ce.shouldParseExportStatement=function(){return"var"===this.type.keyword||"const"===this.type.keyword||"class"===this.type.keyword||"function"===this.type.keyword||this.isLet()||this.isAsyncFunction()},Ce.parseExportSpecifier=function(e){var t=this.startNode()
return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")},Ce.parseExportSpecifiers=function(e){var t=[],i=!0
for(this.expect(ee.braceL);!this.eat(ee.braceR);){if(i)i=!1
else if(this.expect(ee.comma),this.afterTrailingComma(ee.braceR))break
t.push(this.parseExportSpecifier(e))}return t},Ce.parseImport=function(e){return this.next(),this.type===ee.string?(e.specifiers=$e,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===ee.string?this.parseExprAtom():this.unexpected()),this.semicolon(),this.finishNode(e,"ImportDeclaration")},Ce.parseImportSpecifier=function(){var e=this.startNode()
return e.imported=this.parseModuleExportName(),this.eatContextual("as")?e.local=this.parseIdent():(this.checkUnreserved(e.imported),e.local=e.imported),this.checkLValSimple(e.local,2),this.finishNode(e,"ImportSpecifier")},Ce.parseImportDefaultSpecifier=function(){var e=this.startNode()
return e.local=this.parseIdent(),this.checkLValSimple(e.local,2),this.finishNode(e,"ImportDefaultSpecifier")},Ce.parseImportNamespaceSpecifier=function(){var e=this.startNode()
return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,2),this.finishNode(e,"ImportNamespaceSpecifier")},Ce.parseImportSpecifiers=function(){var e=[],t=!0
if(this.type===ee.name&&(e.push(this.parseImportDefaultSpecifier()),!this.eat(ee.comma)))return e
if(this.type===ee.star)return e.push(this.parseImportNamespaceSpecifier()),e
for(this.expect(ee.braceL);!this.eat(ee.braceR);){if(t)t=!1
else if(this.expect(ee.comma),this.afterTrailingComma(ee.braceR))break
e.push(this.parseImportSpecifier())}return e},Ce.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===ee.string){var e=this.parseLiteral(this.value)
return ue.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e}return this.parseIdent(!0)},Ce.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)},Ce.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&"ExpressionStatement"===e.type&&"Literal"===e.expression.type&&"string"==typeof e.expression.value&&('"'===this.input[e.start]||"'"===this.input[e.start])}
var Le=ve.prototype
Le.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&"await"===e.name&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function")
break
case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break
case"ObjectExpression":e.type="ObjectPattern",i&&this.checkPatternErrors(i,!0)
for(var n=0,s=e.properties;n<s.length;n+=1){var r=s[n]
this.toAssignable(r,t),"RestElement"!==r.type||"ArrayPattern"!==r.argument.type&&"ObjectPattern"!==r.argument.type||this.raise(r.argument.start,"Unexpected token")}break
case"Property":"init"!==e.kind&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t)
break
case"ArrayExpression":e.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(e.elements,t)
break
case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),"AssignmentPattern"===e.argument.type&&this.raise(e.argument.start,"Rest elements cannot have a default value")
break
case"AssignmentExpression":"="!==e.operator&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t)
break
case"ParenthesizedExpression":this.toAssignable(e.expression,t,i)
break
case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side")
break
case"MemberExpression":if(!t)break
default:this.raise(e.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0)
return e},Le.toAssignableList=function(e,t){for(var i=e.length,n=0;n<i;n++){var s=e[n]
s&&this.toAssignable(s,t)}if(i){var r=e[i-1]
6===this.options.ecmaVersion&&t&&r&&"RestElement"===r.type&&"Identifier"!==r.argument.type&&this.unexpected(r.argument.start)}return e},Le.parseSpread=function(e){var t=this.startNode()
return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")},Le.parseRestBinding=function(){var e=this.startNode()
return this.next(),6===this.options.ecmaVersion&&this.type!==ee.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")},Le.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case ee.bracketL:var e=this.startNode()
return this.next(),e.elements=this.parseBindingList(ee.bracketR,!0,!0),this.finishNode(e,"ArrayPattern")
case ee.braceL:return this.parseObj(!0)}return this.parseIdent()},Le.parseBindingList=function(e,t,i,n){for(var s=[],r=!0;!this.eat(e);)if(r?r=!1:this.expect(ee.comma),t&&this.type===ee.comma)s.push(null)
else{if(i&&this.afterTrailingComma(e))break
if(this.type===ee.ellipsis){var o=this.parseRestBinding()
this.parseBindingListItem(o),s.push(o),this.type===ee.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.expect(e)
break}s.push(this.parseAssignableListItem(n))}return s},Le.parseAssignableListItem=function(){var e=this.parseMaybeDefault(this.start,this.startLoc)
return this.parseBindingListItem(e),e},Le.parseBindingListItem=function(e){return e},Le.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(ee.eq))return i
var n=this.startNodeAt(e,t)
return n.left=i,n.right=this.parseMaybeAssign(),this.finishNode(n,"AssignmentPattern")},Le.checkLValSimple=function(e,t,i){void 0===t&&(t=0)
var n=0!==t
switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(n?"Binding ":"Assigning to ")+e.name+" in strict mode"),n&&(2===t&&"let"===e.name&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),i&&(le(i,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),i[e.name]=!0),5!==t&&this.declareName(e.name,t,e.start))
break
case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side")
break
case"MemberExpression":n&&this.raiseRecoverable(e.start,"Binding member expression")
break
case"ParenthesizedExpression":return n&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,i)
default:this.raise(e.start,(n?"Binding":"Assigning to")+" rvalue")}},Le.checkLValPattern=function(e,t,i){switch(void 0===t&&(t=0),e.type){case"ObjectPattern":for(var n=0,s=e.properties;n<s.length;n+=1){var r=s[n]
this.checkLValInnerPattern(r,t,i)}break
case"ArrayPattern":for(var o=0,a=e.elements;o<a.length;o+=1){var l=a[o]
l&&this.checkLValInnerPattern(l,t,i)}break
default:this.checkLValSimple(e,t,i)}},Le.checkLValInnerPattern=function(e,t,i){switch(void 0===t&&(t=0),e.type){case"Property":this.checkLValInnerPattern(e.value,t,i)
break
case"AssignmentPattern":this.checkLValPattern(e.left,t,i)
break
case"RestElement":this.checkLValPattern(e.argument,t,i)
break
default:this.checkLValPattern(e,t,i)}}
var Te=function(e,t,i,n,s){this.token=e,this.isExpr=!!t,this.preserveSpace=!!i,this.override=n,this.generator=!!s},Ee={b_stat:new Te("{",!1),b_expr:new Te("{",!0),b_tmpl:new Te("${",!1),p_stat:new Te("(",!1),p_expr:new Te("(",!0),q_tmpl:new Te("`",!0,!0,(function(e){return e.tryReadTemplateToken()})),f_stat:new Te("function",!1),f_expr:new Te("function",!0),f_expr_gen:new Te("function",!0,!1,null,!0),f_gen:new Te("function",!1,!1,null,!0)},Ie=ve.prototype
Ie.initialContext=function(){return[Ee.b_stat]},Ie.curContext=function(){return this.context[this.context.length-1]},Ie.braceIsBlock=function(e){var t=this.curContext()
return t===Ee.f_expr||t===Ee.f_stat||(e!==ee.colon||t!==Ee.b_stat&&t!==Ee.b_expr?e===ee._return||e===ee.name&&this.exprAllowed?te.test(this.input.slice(this.lastTokEnd,this.start)):e===ee._else||e===ee.semi||e===ee.eof||e===ee.parenR||e===ee.arrow||(e===ee.braceL?t===Ee.b_stat:e!==ee._var&&e!==ee._const&&e!==ee.name&&!this.exprAllowed):!t.isExpr)},Ie.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e]
if("function"===t.token)return t.generator}return!1},Ie.updateContext=function(e){var t,i=this.type
i.keyword&&e===ee.dot?this.exprAllowed=!1:(t=i.updateContext)?t.call(this,e):this.exprAllowed=i.beforeExpr},Ie.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)},ee.parenR.updateContext=ee.braceR.updateContext=function(){if(1!==this.context.length){var e=this.context.pop()
e===Ee.b_stat&&"function"===this.curContext().token&&(e=this.context.pop()),this.exprAllowed=!e.isExpr}else this.exprAllowed=!0},ee.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?Ee.b_stat:Ee.b_expr),this.exprAllowed=!0},ee.dollarBraceL.updateContext=function(){this.context.push(Ee.b_tmpl),this.exprAllowed=!0},ee.parenL.updateContext=function(e){var t=e===ee._if||e===ee._for||e===ee._with||e===ee._while
this.context.push(t?Ee.p_stat:Ee.p_expr),this.exprAllowed=!0},ee.incDec.updateContext=function(){},ee._function.updateContext=ee._class.updateContext=function(e){!e.beforeExpr||e===ee._else||e===ee.semi&&this.curContext()!==Ee.p_stat||e===ee._return&&te.test(this.input.slice(this.lastTokEnd,this.start))||(e===ee.colon||e===ee.braceL)&&this.curContext()===Ee.b_stat?this.context.push(Ee.f_stat):this.context.push(Ee.f_expr),this.exprAllowed=!1},ee.colon.updateContext=function(){"function"===this.curContext().token&&this.context.pop(),this.exprAllowed=!0},ee.backQuote.updateContext=function(){this.curContext()===Ee.q_tmpl?this.context.pop():this.context.push(Ee.q_tmpl),this.exprAllowed=!1},ee.star.updateContext=function(e){if(e===ee._function){var t=this.context.length-1
this.context[t]===Ee.f_expr?this.context[t]=Ee.f_expr_gen:this.context[t]=Ee.f_gen}this.exprAllowed=!0},ee.name.updateContext=function(e){var t=!1
this.options.ecmaVersion>=6&&e!==ee.dot&&("of"===this.value&&!this.exprAllowed||"yield"===this.value&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t}
var Re=ve.prototype
Re.checkPropClash=function(e,t,i){if(!(this.options.ecmaVersion>=9&&"SpreadElement"===e.type||this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var n,s=e.key
switch(s.type){case"Identifier":n=s.name
break
case"Literal":n=s.value+""
break
default:return}var r=e.kind
if(this.options.ecmaVersion>=6)"__proto__"===n&&"init"===r&&(t.proto&&(i?i.doubleProto<0&&(i.doubleProto=s.start):this.raiseRecoverable(s.start,"Redefinition of __proto__ property")),t.proto=!0)
else{var o=t[n="$"+n]
o?("init"===r?this.strict&&o.init||o.get||o.set:o.init||o[r])&&this.raiseRecoverable(s.start,"Redefinition of property"):o=t[n]={init:!1,get:!1,set:!1},o[r]=!0}}},Re.parseExpression=function(e,t){var i=this.start,n=this.startLoc,s=this.parseMaybeAssign(e,t)
if(this.type===ee.comma){var r=this.startNodeAt(i,n)
for(r.expressions=[s];this.eat(ee.comma);)r.expressions.push(this.parseMaybeAssign(e,t))
return this.finishNode(r,"SequenceExpression")}return s},Re.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e)
this.exprAllowed=!1}var n=!1,s=-1,r=-1,o=-1
t?(s=t.parenthesizedAssign,r=t.trailingComma,o=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new be,n=!0)
var a=this.start,l=this.startLoc
this.type!==ee.parenL&&this.type!==ee.name||(this.potentialArrowAt=this.start,this.potentialArrowInForAwait="await"===e)
var h=this.parseMaybeConditional(e,t)
if(i&&(h=i.call(this,h,a,l)),this.type.isAssign){var c=this.startNodeAt(a,l)
return c.operator=this.value,this.type===ee.eq&&(h=this.toAssignable(h,!1,t)),n||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=h.start&&(t.shorthandAssign=-1),this.type===ee.eq?this.checkLValPattern(h):this.checkLValSimple(h),c.left=h,this.next(),c.right=this.parseMaybeAssign(e),o>-1&&(t.doubleProto=o),this.finishNode(c,"AssignmentExpression")}return n&&this.checkExpressionErrors(t,!0),s>-1&&(t.parenthesizedAssign=s),r>-1&&(t.trailingComma=r),h},Re.parseMaybeConditional=function(e,t){var i=this.start,n=this.startLoc,s=this.parseExprOps(e,t)
if(this.checkExpressionErrors(t))return s
if(this.eat(ee.question)){var r=this.startNodeAt(i,n)
return r.test=s,r.consequent=this.parseMaybeAssign(),this.expect(ee.colon),r.alternate=this.parseMaybeAssign(e),this.finishNode(r,"ConditionalExpression")}return s},Re.parseExprOps=function(e,t){var i=this.start,n=this.startLoc,s=this.parseMaybeUnary(t,!1,!1,e)
return this.checkExpressionErrors(t)||s.start===i&&"ArrowFunctionExpression"===s.type?s:this.parseExprOp(s,i,n,-1,e)},Re.parseExprOp=function(e,t,i,n,s){var r=this.type.binop
if(null!=r&&(!s||this.type!==ee._in)&&r>n){var o=this.type===ee.logicalOR||this.type===ee.logicalAND,a=this.type===ee.coalesce
a&&(r=ee.logicalAND.binop)
var l=this.value
this.next()
var h=this.start,c=this.startLoc,u=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,s),h,c,r,s),d=this.buildBinary(t,i,e,u,l,o||a)
return(o&&this.type===ee.coalesce||a&&(this.type===ee.logicalOR||this.type===ee.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(d,t,i,n,s)}return e},Re.buildBinary=function(e,t,i,n,s,r){"PrivateIdentifier"===n.type&&this.raise(n.start,"Private identifier can only be left side of binary expression")
var o=this.startNodeAt(e,t)
return o.left=i,o.operator=s,o.right=n,this.finishNode(o,r?"LogicalExpression":"BinaryExpression")},Re.parseMaybeUnary=function(e,t,i,n){var s,r=this.start,o=this.startLoc
if(this.isContextual("await")&&this.canAwait)s=this.parseAwait(n),t=!0
else if(this.type.prefix){var a=this.startNode(),l=this.type===ee.incDec
a.operator=this.value,a.prefix=!0,this.next(),a.argument=this.parseMaybeUnary(null,!0,l,n),this.checkExpressionErrors(e,!0),l?this.checkLValSimple(a.argument):this.strict&&"delete"===a.operator&&m(a.argument)?this.raiseRecoverable(a.start,"Deleting local variable in strict mode"):"delete"===a.operator&&f(a.argument)?this.raiseRecoverable(a.start,"Private fields can not be deleted"):t=!0,s=this.finishNode(a,l?"UpdateExpression":"UnaryExpression")}else if(t||this.type!==ee.privateId){if(s=this.parseExprSubscripts(e,n),this.checkExpressionErrors(e))return s
for(;this.type.postfix&&!this.canInsertSemicolon();){var h=this.startNodeAt(r,o)
h.operator=this.value,h.prefix=!1,h.argument=s,this.checkLValSimple(s),this.next(),s=this.finishNode(h,"UpdateExpression")}}else(n||0===this.privateNameStack.length)&&this.options.checkPrivateFields&&this.unexpected(),s=this.parsePrivateIdent(),this.type!==ee._in&&this.unexpected()
return i||!this.eat(ee.starstar)?s:t?void this.unexpected(this.lastTokStart):this.buildBinary(r,o,s,this.parseMaybeUnary(null,!1,!1,n),"**",!1)},Re.parseExprSubscripts=function(e,t){var i=this.start,n=this.startLoc,s=this.parseExprAtom(e,t)
if("ArrowFunctionExpression"===s.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd))return s
var r=this.parseSubscripts(s,i,n,!1,t)
return e&&"MemberExpression"===r.type&&(e.parenthesizedAssign>=r.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=r.start&&(e.parenthesizedBind=-1),e.trailingComma>=r.start&&(e.trailingComma=-1)),r},Re.parseSubscripts=function(e,t,i,n,s){for(var r=this.options.ecmaVersion>=8&&"Identifier"===e.type&&"async"===e.name&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start==5&&this.potentialArrowAt===e.start,o=!1;;){var a=this.parseSubscript(e,t,i,n,r,o,s)
if(a.optional&&(o=!0),a===e||"ArrowFunctionExpression"===a.type){if(o){var l=this.startNodeAt(t,i)
l.expression=a,a=this.finishNode(l,"ChainExpression")}return a}e=a}},Re.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(ee.arrow)},Re.parseSubscriptAsyncArrow=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,n)},Re.parseSubscript=function(e,t,i,n,s,r,o){var a=this.options.ecmaVersion>=11,l=a&&this.eat(ee.questionDot)
n&&l&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions")
var h=this.eat(ee.bracketL)
if(h||l&&this.type!==ee.parenL&&this.type!==ee.backQuote||this.eat(ee.dot)){var c=this.startNodeAt(t,i)
c.object=e,h?(c.property=this.parseExpression(),this.expect(ee.bracketR)):this.type===ee.privateId&&"Super"!==e.type?c.property=this.parsePrivateIdent():c.property=this.parseIdent("never"!==this.options.allowReserved),c.computed=!!h,a&&(c.optional=l),e=this.finishNode(c,"MemberExpression")}else if(!n&&this.eat(ee.parenL)){var u=new be,d=this.yieldPos,g=this.awaitPos,p=this.awaitIdentPos
this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0
var m=this.parseExprList(ee.parenR,this.options.ecmaVersion>=8,!1,u)
if(s&&!l&&this.shouldParseAsyncArrow())return this.checkPatternErrors(u,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=d,this.awaitPos=g,this.awaitIdentPos=p,this.parseSubscriptAsyncArrow(t,i,m,o)
this.checkExpressionErrors(u,!0),this.yieldPos=d||this.yieldPos,this.awaitPos=g||this.awaitPos,this.awaitIdentPos=p||this.awaitIdentPos
var f=this.startNodeAt(t,i)
f.callee=e,f.arguments=m,a&&(f.optional=l),e=this.finishNode(f,"CallExpression")}else if(this.type===ee.backQuote){(l||r)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions")
var v=this.startNodeAt(t,i)
v.tag=e,v.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(v,"TaggedTemplateExpression")}return e},Re.parseExprAtom=function(e,t,i){this.type===ee.slash&&this.readRegexp()
var n,s=this.potentialArrowAt===this.start
switch(this.type){case ee._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),n=this.startNode(),this.next(),this.type!==ee.parenL||this.allowDirectSuper||this.raise(n.start,"super() call outside constructor of a subclass"),this.type!==ee.dot&&this.type!==ee.bracketL&&this.type!==ee.parenL&&this.unexpected(),this.finishNode(n,"Super")
case ee._this:return n=this.startNode(),this.next(),this.finishNode(n,"ThisExpression")
case ee.name:var r=this.start,o=this.startLoc,a=this.containsEsc,l=this.parseIdent(!1)
if(this.options.ecmaVersion>=8&&!a&&"async"===l.name&&!this.canInsertSemicolon()&&this.eat(ee._function))return this.overrideContext(Ee.f_expr),this.parseFunction(this.startNodeAt(r,o),0,!1,!0,t)
if(s&&!this.canInsertSemicolon()){if(this.eat(ee.arrow))return this.parseArrowExpression(this.startNodeAt(r,o),[l],!1,t)
if(this.options.ecmaVersion>=8&&"async"===l.name&&this.type===ee.name&&!a&&(!this.potentialArrowInForAwait||"of"!==this.value||this.containsEsc))return l=this.parseIdent(!1),!this.canInsertSemicolon()&&this.eat(ee.arrow)||this.unexpected(),this.parseArrowExpression(this.startNodeAt(r,o),[l],!0,t)}return l
case ee.regexp:var h=this.value
return(n=this.parseLiteral(h.value)).regex={pattern:h.pattern,flags:h.flags},n
case ee.num:case ee.string:return this.parseLiteral(this.value)
case ee._null:case ee._true:case ee._false:return(n=this.startNode()).value=this.type===ee._null?null:this.type===ee._true,n.raw=this.type.keyword,this.next(),this.finishNode(n,"Literal")
case ee.parenL:var c=this.start,u=this.parseParenAndDistinguishExpression(s,t)
return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(u)&&(e.parenthesizedAssign=c),e.parenthesizedBind<0&&(e.parenthesizedBind=c)),u
case ee.bracketL:return n=this.startNode(),this.next(),n.elements=this.parseExprList(ee.bracketR,!0,!0,e),this.finishNode(n,"ArrayExpression")
case ee.braceL:return this.overrideContext(Ee.b_expr),this.parseObj(!1,e)
case ee._function:return n=this.startNode(),this.next(),this.parseFunction(n,0)
case ee._class:return this.parseClass(this.startNode(),!1)
case ee._new:return this.parseNew()
case ee.backQuote:return this.parseTemplate()
case ee._import:return this.options.ecmaVersion>=11?this.parseExprImport(i):this.unexpected()
default:return this.parseExprAtomDefault()}},Re.parseExprAtomDefault=function(){this.unexpected()},Re.parseExprImport=function(e){var t=this.startNode()
if(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.next(),this.type===ee.parenL&&!e)return this.parseDynamicImport(t)
if(this.type===ee.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start)
return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}this.unexpected()},Re.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),!this.eat(ee.parenR)){var t=this.start
this.eat(ee.comma)&&this.eat(ee.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")},Re.parseImportMeta=function(e){this.next()
var t=this.containsEsc
return e.property=this.parseIdent(!0),"meta"!==e.property.name&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),"module"===this.options.sourceType||this.options.allowImportExportEverywhere||this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")},Re.parseLiteral=function(e){var t=this.startNode()
return t.value=e,t.raw=this.input.slice(this.start,this.end),110===t.raw.charCodeAt(t.raw.length-1)&&(t.bigint=t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")},Re.parseParenExpression=function(){this.expect(ee.parenL)
var e=this.parseExpression()
return this.expect(ee.parenR),e},Re.shouldParseArrow=function(){return!this.canInsertSemicolon()},Re.parseParenAndDistinguishExpression=function(e,t){var i,n=this.start,s=this.startLoc,r=this.options.ecmaVersion>=8
if(this.options.ecmaVersion>=6){this.next()
var o,a=this.start,l=this.startLoc,h=[],c=!0,u=!1,d=new be,g=this.yieldPos,p=this.awaitPos
for(this.yieldPos=0,this.awaitPos=0;this.type!==ee.parenR;){if(c?c=!1:this.expect(ee.comma),r&&this.afterTrailingComma(ee.parenR,!0)){u=!0
break}if(this.type===ee.ellipsis){o=this.start,h.push(this.parseParenItem(this.parseRestBinding())),this.type===ee.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element")
break}h.push(this.parseMaybeAssign(!1,d,this.parseParenItem))}var m=this.lastTokEnd,f=this.lastTokEndLoc
if(this.expect(ee.parenR),e&&this.shouldParseArrow(h)&&this.eat(ee.arrow))return this.checkPatternErrors(d,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=g,this.awaitPos=p,this.parseParenArrowList(n,s,h,t)
h.length&&!u||this.unexpected(this.lastTokStart),o&&this.unexpected(o),this.checkExpressionErrors(d,!0),this.yieldPos=g||this.yieldPos,this.awaitPos=p||this.awaitPos,h.length>1?((i=this.startNodeAt(a,l)).expressions=h,this.finishNodeAt(i,"SequenceExpression",m,f)):i=h[0]}else i=this.parseParenExpression()
if(this.options.preserveParens){var v=this.startNodeAt(n,s)
return v.expression=i,this.finishNode(v,"ParenthesizedExpression")}return i},Re.parseParenItem=function(e){return e},Re.parseParenArrowList=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,n)}
var _e=[]
Re.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new")
var e=this.startNode()
if(this.next(),this.options.ecmaVersion>=6&&this.type===ee.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start)
t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next()
var i=this.containsEsc
return e.property=this.parseIdent(!0),"target"!==e.property.name&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block"),this.finishNode(e,"MetaProperty")}var n=this.start,s=this.startLoc
return e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),n,s,!0,!1),this.eat(ee.parenL)?e.arguments=this.parseExprList(ee.parenR,this.options.ecmaVersion>=8,!1):e.arguments=_e,this.finishNode(e,"NewExpression")},Re.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode()
return this.type===ee.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value.replace(/\r\n?/g,"\n"),cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value},this.next(),i.tail=this.type===ee.backQuote,this.finishNode(i,"TemplateElement")},Re.parseTemplate=function(e){void 0===e&&(e={})
var t=e.isTagged
void 0===t&&(t=!1)
var i=this.startNode()
this.next(),i.expressions=[]
var n=this.parseTemplateElement({isTagged:t})
for(i.quasis=[n];!n.tail;)this.type===ee.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(ee.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(ee.braceR),i.quasis.push(n=this.parseTemplateElement({isTagged:t}))
return this.next(),this.finishNode(i,"TemplateLiteral")},Re.isAsyncProp=function(e){return!e.computed&&"Identifier"===e.key.type&&"async"===e.key.name&&(this.type===ee.name||this.type===ee.num||this.type===ee.string||this.type===ee.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===ee.star)&&!te.test(this.input.slice(this.lastTokEnd,this.start))},Re.parseObj=function(e,t){var i=this.startNode(),n=!0,s={}
for(i.properties=[],this.next();!this.eat(ee.braceR);){if(n)n=!1
else if(this.expect(ee.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(ee.braceR))break
var r=this.parseProperty(e,t)
e||this.checkPropClash(r,s,t),i.properties.push(r)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")},Re.parseProperty=function(e,t){var i,n,s,r,o=this.startNode()
if(this.options.ecmaVersion>=9&&this.eat(ee.ellipsis))return e?(o.argument=this.parseIdent(!1),this.type===ee.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.finishNode(o,"RestElement")):(o.argument=this.parseMaybeAssign(!1,t),this.type===ee.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(o,"SpreadElement"))
this.options.ecmaVersion>=6&&(o.method=!1,o.shorthand=!1,(e||t)&&(s=this.start,r=this.startLoc),e||(i=this.eat(ee.star)))
var a=this.containsEsc
return this.parsePropertyName(o),!e&&!a&&this.options.ecmaVersion>=8&&!i&&this.isAsyncProp(o)?(n=!0,i=this.options.ecmaVersion>=9&&this.eat(ee.star),this.parsePropertyName(o)):n=!1,this.parsePropertyValue(o,e,i,n,s,r,t,a),this.finishNode(o,"Property")},Re.parseGetterSetter=function(e){e.kind=e.key.name,this.parsePropertyName(e),e.value=this.parseMethod(!1)
var t="get"===e.kind?0:1
if(e.value.params.length!==t){var i=e.value.start
"get"===e.kind?this.raiseRecoverable(i,"getter should have no params"):this.raiseRecoverable(i,"setter should have exactly one param")}else"set"===e.kind&&"RestElement"===e.value.params[0].type&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")},Re.parsePropertyValue=function(e,t,i,n,s,r,o,a){(i||n)&&this.type===ee.colon&&this.unexpected(),this.eat(ee.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,o),e.kind="init"):this.options.ecmaVersion>=6&&this.type===ee.parenL?(t&&this.unexpected(),e.kind="init",e.method=!0,e.value=this.parseMethod(i,n)):t||a||!(this.options.ecmaVersion>=5)||e.computed||"Identifier"!==e.key.type||"get"!==e.key.name&&"set"!==e.key.name||this.type===ee.comma||this.type===ee.braceR||this.type===ee.eq?this.options.ecmaVersion>=6&&!e.computed&&"Identifier"===e.key.type?((i||n)&&this.unexpected(),this.checkUnreserved(e.key),"await"!==e.key.name||this.awaitIdentPos||(this.awaitIdentPos=s),e.kind="init",t?e.value=this.parseMaybeDefault(s,r,this.copyNode(e.key)):this.type===ee.eq&&o?(o.shorthandAssign<0&&(o.shorthandAssign=this.start),e.value=this.parseMaybeDefault(s,r,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.shorthand=!0):this.unexpected():((i||n)&&this.unexpected(),this.parseGetterSetter(e))},Re.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(ee.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(ee.bracketR),e.key
e.computed=!1}return e.key=this.type===ee.num||this.type===ee.string?this.parseExprAtom():this.parseIdent("never"!==this.options.allowReserved)},Re.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)},Re.parseMethod=function(e,t,i){var n=this.startNode(),s=this.yieldPos,r=this.awaitPos,o=this.awaitIdentPos
return this.initFunction(n),this.options.ecmaVersion>=6&&(n.generator=e),this.options.ecmaVersion>=8&&(n.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(64|d(t,n.generator)|(i?128:0)),this.expect(ee.parenL),n.params=this.parseBindingList(ee.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(n,!1,!0,!1),this.yieldPos=s,this.awaitPos=r,this.awaitIdentPos=o,this.finishNode(n,"FunctionExpression")},Re.parseArrowExpression=function(e,t,i,n){var s=this.yieldPos,r=this.awaitPos,o=this.awaitIdentPos
return this.enterScope(16|d(i,!1)),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!i),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,n),this.yieldPos=s,this.awaitPos=r,this.awaitIdentPos=o,this.finishNode(e,"ArrowFunctionExpression")},Re.parseFunctionBody=function(e,t,i,n){var s=t&&this.type!==ee.braceL,r=this.strict,o=!1
if(s)e.body=this.parseMaybeAssign(n),e.expression=!0,this.checkParams(e,!1)
else{var a=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params)
r&&!a||(o=this.strictDirective(this.end))&&a&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list")
var l=this.labels
this.labels=[],o&&(this.strict=!0),this.checkParams(e,!r&&!o&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,5),e.body=this.parseBlock(!1,void 0,o&&!r),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=l}this.exitScope()},Re.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1)if("Identifier"!==i[t].type)return!1
return!0},Re.checkParams=function(e,t){for(var i=Object.create(null),n=0,s=e.params;n<s.length;n+=1){var r=s[n]
this.checkLValInnerPattern(r,1,t?null:i)}},Re.parseExprList=function(e,t,i,n){for(var s=[],r=!0;!this.eat(e);){if(r)r=!1
else if(this.expect(ee.comma),t&&this.afterTrailingComma(e))break
var o=void 0
i&&this.type===ee.comma?o=null:this.type===ee.ellipsis?(o=this.parseSpread(n),n&&this.type===ee.comma&&n.trailingComma<0&&(n.trailingComma=this.start)):o=this.parseMaybeAssign(!1,n),s.push(o)}return s},Re.checkUnreserved=function(e){var t=e.start,i=e.end,n=e.name
this.inGenerator&&"yield"===n&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&"await"===n&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),this.currentThisScope().inClassFieldInit&&"arguments"===n&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),!this.inClassStaticBlock||"arguments"!==n&&"await"!==n||this.raise(t,"Cannot use "+n+" in class static initialization block"),this.keywords.test(n)&&this.raise(t,"Unexpected keyword '"+n+"'"),this.options.ecmaVersion<6&&-1!==this.input.slice(t,i).indexOf("\\")||(this.strict?this.reservedWordsStrict:this.reservedWords).test(n)&&(this.inAsync||"await"!==n||this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+n+"' is reserved"))},Re.parseIdent=function(e){var t=this.parseIdentNode()
return this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),"await"!==t.name||this.awaitIdentPos||(this.awaitIdentPos=t.start)),t},Re.parseIdentNode=function(){var e=this.startNode()
return this.type===ee.name?e.name=this.value:this.type.keyword?(e.name=this.type.keyword,"class"!==e.name&&"function"!==e.name||this.lastTokEnd===this.lastTokStart+1&&46===this.input.charCodeAt(this.lastTokStart)||this.context.pop(),this.type=ee.name):this.unexpected(),e},Re.parsePrivateIdent=function(){var e=this.startNode()
return this.type===ee.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields&&(0===this.privateNameStack.length?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e)),e},Re.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start)
var t=this.startNode()
return this.next(),this.type===ee.semi||this.canInsertSemicolon()||this.type!==ee.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(ee.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")},Re.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start)
var t=this.startNode()
return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")}
var Ne=ve.prototype
Ne.raise=function(e,t){var i=c(this.input,e)
t+=" ("+i.line+":"+i.column+")"
var n=new SyntaxError(t)
throw n.pos=e,n.loc=i,n.raisedAt=this.pos,n},Ne.raiseRecoverable=Ne.raise,Ne.curPosition=function(){if(this.options.locations)return new de(this.curLine,this.pos-this.lineStart)}
var De=ve.prototype,Oe=function(e){this.flags=e,this.var=[],this.lexical=[],this.functions=[],this.inClassFieldInit=!1}
De.enterScope=function(e){this.scopeStack.push(new Oe(e))},De.exitScope=function(){this.scopeStack.pop()},De.treatFunctionsAsVarInScope=function(e){return 2&e.flags||!this.inModule&&1&e.flags},De.declareName=function(e,t,i){var n=!1
if(2===t){var s=this.currentScope()
n=s.lexical.indexOf(e)>-1||s.functions.indexOf(e)>-1||s.var.indexOf(e)>-1,s.lexical.push(e),this.inModule&&1&s.flags&&delete this.undefinedExports[e]}else if(4===t)this.currentScope().lexical.push(e)
else if(3===t){var r=this.currentScope()
n=this.treatFunctionsAsVar?r.lexical.indexOf(e)>-1:r.lexical.indexOf(e)>-1||r.var.indexOf(e)>-1,r.functions.push(e)}else for(var o=this.scopeStack.length-1;o>=0;--o){var a=this.scopeStack[o]
if(a.lexical.indexOf(e)>-1&&!(32&a.flags&&a.lexical[0]===e)||!this.treatFunctionsAsVarInScope(a)&&a.functions.indexOf(e)>-1){n=!0
break}if(a.var.push(e),this.inModule&&1&a.flags&&delete this.undefinedExports[e],259&a.flags)break}n&&this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")},De.checkLocalExport=function(e){-1===this.scopeStack[0].lexical.indexOf(e.name)&&-1===this.scopeStack[0].var.indexOf(e.name)&&(this.undefinedExports[e.name]=e)},De.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]},De.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e]
if(259&t.flags)return t}},De.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e]
if(259&t.flags&&!(16&t.flags))return t}}
var Fe=function(e,t,i){this.type="",this.start=t,this.end=0,e.options.locations&&(this.loc=new ge(e,i)),e.options.directSourceFile&&(this.sourceFile=e.options.directSourceFile),e.options.ranges&&(this.range=[t,0])},Pe=ve.prototype
Pe.startNode=function(){return new Fe(this,this.start,this.startLoc)},Pe.startNodeAt=function(e,t){return new Fe(this,e,t)},Pe.finishNode=function(e,t){return v.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)},Pe.finishNodeAt=function(e,t,i,n){return v.call(this,e,t,i,n)},Pe.copyNode=function(e){var t=new Fe(this,e.start,this.startLoc)
for(var i in e)t[i]=e[i]
return t}
for(var We="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",Be=We+" Extended_Pictographic",ze=Be+" EBase EComp EMod EPres ExtPict",He={9:We,10:Be,11:Be,12:ze,13:ze,14:ze},Ve={9:"",10:"",11:"",12:"",13:"",14:"Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji"},je="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",Ue="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",Ge=Ue+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",Ke=Ge+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",Ye=Ke+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",Qe=Ye+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",Ze={9:Ue,10:Ge,11:Ke,12:Ye,13:Qe,14:Qe+" Hrkt Katakana_Or_Hiragana Kawi Nag_Mundari Nagm Unknown Zzzz"},Xe={},qe=0,Je=[9,10,11,12,13,14];qe<Je.length;qe+=1)w(Je[qe])
var et=ve.prototype,tt=function(e,t){this.parent=e,this.base=t||this}
tt.prototype.separatedFrom=function(e){for(var t=this;t;t=t.parent)for(var i=e;i;i=i.parent)if(t.base===i.base&&t!==i)return!0
return!1},tt.prototype.sibling=function(){return new tt(this.parent,this.base)}
var it=function(e){this.parser=e,this.validFlags="gim"+(e.options.ecmaVersion>=6?"uy":"")+(e.options.ecmaVersion>=9?"s":"")+(e.options.ecmaVersion>=13?"d":"")+(e.options.ecmaVersion>=15?"v":""),this.unicodeProperties=Xe[e.options.ecmaVersion>=14?14:e.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null}
it.prototype.reset=function(e,t,i){var n=-1!==i.indexOf("v"),s=-1!==i.indexOf("u")
this.start=0|e,this.source=t+"",this.flags=i,n&&this.parser.options.ecmaVersion>=15?(this.switchU=!0,this.switchV=!0,this.switchN=!0):(this.switchU=s&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=s&&this.parser.options.ecmaVersion>=9)},it.prototype.raise=function(e){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+e)},it.prototype.at=function(e,t){void 0===t&&(t=!1)
var i=this.source,n=i.length
if(e>=n)return-1
var s=i.charCodeAt(e)
if(!t&&!this.switchU||s<=55295||s>=57344||e+1>=n)return s
var r=i.charCodeAt(e+1)
return r>=56320&&r<=57343?(s<<10)+r-56613888:s},it.prototype.nextIndex=function(e,t){void 0===t&&(t=!1)
var i=this.source,n=i.length
if(e>=n)return n
var s,r=i.charCodeAt(e)
return!t&&!this.switchU||r<=55295||r>=57344||e+1>=n||(s=i.charCodeAt(e+1))<56320||s>57343?e+1:e+2},it.prototype.current=function(e){return void 0===e&&(e=!1),this.at(this.pos,e)},it.prototype.lookahead=function(e){return void 0===e&&(e=!1),this.at(this.nextIndex(this.pos,e),e)},it.prototype.advance=function(e){void 0===e&&(e=!1),this.pos=this.nextIndex(this.pos,e)},it.prototype.eat=function(e,t){return void 0===t&&(t=!1),this.current(t)===e&&(this.advance(t),!0)},it.prototype.eatChars=function(e,t){void 0===t&&(t=!1)
for(var i=this.pos,n=0,s=e;n<s.length;n+=1){var r=s[n],o=this.at(i,t)
if(-1===o||o!==r)return!1
i=this.nextIndex(i,t)}return this.pos=i,!0},et.validateRegExpFlags=function(e){for(var t=e.validFlags,i=e.flags,n=!1,s=!1,r=0;r<i.length;r++){var o=i.charAt(r);-1===t.indexOf(o)&&this.raise(e.start,"Invalid regular expression flag"),i.indexOf(o,r+1)>-1&&this.raise(e.start,"Duplicate regular expression flag"),"u"===o&&(n=!0),"v"===o&&(s=!0)}this.options.ecmaVersion>=15&&n&&s&&this.raise(e.start,"Invalid regular expression flag")},et.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&function(e){for(var t in e)return!0
return!1}(e.groupNames)&&(e.switchN=!0,this.regexp_pattern(e))},et.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape")
for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var n=i[t]
e.groupNames[n]||e.raise("Invalid named capture referenced")}},et.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16
for(t&&(e.branchID=new tt(e.branchID,null)),this.regexp_alternative(e);e.eat(124);)t&&(e.branchID=e.branchID.sibling()),this.regexp_alternative(e)
t&&(e.branchID=e.branchID.parent),this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")},et.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););},et.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):!!(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))&&(this.regexp_eatQuantifier(e),!0)},et.regexp_eatAssertion=function(e){var t=e.pos
if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0
if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0
e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1
if(this.options.ecmaVersion>=9&&(i=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!i,!0}return e.pos=t,!1},et.regexp_eatQuantifier=function(e,t){return void 0===t&&(t=!1),!!this.regexp_eatQuantifierPrefix(e,t)&&(e.eat(63),!0)},et.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)},et.regexp_eatBracedQuantifier=function(e,t){var i=e.pos
if(e.eat(123)){var n=0,s=-1
if(this.regexp_eatDecimalDigits(e)&&(n=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(s=e.lastIntValue),e.eat(125)))return-1!==s&&s<n&&!t&&e.raise("numbers out of order in {} quantifier"),!0
e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=i}return!1},et.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)},et.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos
if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0
e.pos=t}return!1},et.regexp_eatUncapturingGroup=function(e){var t=e.pos
if(e.eat(40)){if(e.eat(63)&&e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0
e.raise("Unterminated group")}e.pos=t}return!1},et.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):63===e.current()&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0
e.raise("Unterminated group")}return!1},et.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)},et.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1},et.regexp_eatSyntaxCharacter=function(e){var t=e.current()
return!!y(t)&&(e.lastIntValue=t,e.advance(),!0)},et.regexp_eatPatternCharacters=function(e){for(var t=e.pos,i=0;-1!==(i=e.current())&&!y(i);)e.advance()
return e.pos!==t},et.regexp_eatExtendedPatternCharacter=function(e){var t=e.current()
return!(-1===t||36===t||t>=40&&t<=43||46===t||63===t||91===t||94===t||124===t||(e.advance(),0))},et.regexp_groupSpecifier=function(e){if(e.eat(63)){this.regexp_eatGroupName(e)||e.raise("Invalid group")
var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue]
if(i)if(t)for(var n=0,s=i;n<s.length;n+=1)s[n].separatedFrom(e.branchID)||e.raise("Duplicate capture group name")
else e.raise("Duplicate capture group name")
t?(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID):e.groupNames[e.lastStringValue]=!0}},et.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0
e.raise("Invalid capture group name")}return!1},et.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=h(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=h(e.lastIntValue)
return!0}return!1},et.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,n=this.options.ecmaVersion>=11,s=e.current(n)
return e.advance(n),92===s&&this.regexp_eatRegExpUnicodeEscapeSequence(e,n)&&(s=e.lastIntValue),function(e){return i(e,!0)||36===e||95===e}(s)?(e.lastIntValue=s,!0):(e.pos=t,!1)},et.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,s=e.current(i)
return e.advance(i),92===s&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(s=e.lastIntValue),function(e){return n(e,!0)||36===e||95===e||8204===e||8205===e}(s)?(e.lastIntValue=s,!0):(e.pos=t,!1)},et.regexp_eatAtomEscape=function(e){return!!(this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e))||(e.switchU&&(99===e.current()&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)},et.regexp_eatBackReference=function(e){var t=e.pos
if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue
if(e.switchU)return i>e.maxBackReference&&(e.maxBackReference=i),!0
if(i<=e.numCapturingParens)return!0
e.pos=t}return!1},et.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0
e.raise("Invalid named reference")}return!1},et.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)},et.regexp_eatCControlLetter=function(e){var t=e.pos
if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0
e.pos=t}return!1},et.regexp_eatZero=function(e){return 48===e.current()&&!S(e.lookahead())&&(e.lastIntValue=0,e.advance(),!0)},et.regexp_eatControlEscape=function(e){var t=e.current()
return 116===t?(e.lastIntValue=9,e.advance(),!0):110===t?(e.lastIntValue=10,e.advance(),!0):118===t?(e.lastIntValue=11,e.advance(),!0):102===t?(e.lastIntValue=12,e.advance(),!0):114===t&&(e.lastIntValue=13,e.advance(),!0)},et.regexp_eatControlLetter=function(e){var t=e.current()
return!!x(t)&&(e.lastIntValue=t%32,e.advance(),!0)},et.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){void 0===t&&(t=!1)
var i,n=e.pos,s=t||e.switchU
if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var r=e.lastIntValue
if(s&&r>=55296&&r<=56319){var o=e.pos
if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var a=e.lastIntValue
if(a>=56320&&a<=57343)return e.lastIntValue=1024*(r-55296)+(a-56320)+65536,!0}e.pos=o,e.lastIntValue=r}return!0}if(s&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&(i=e.lastIntValue)>=0&&i<=1114111)return!0
s&&e.raise("Invalid unicode escape"),e.pos=n}return!1},et.regexp_eatIdentityEscape=function(e){if(e.switchU)return!!this.regexp_eatSyntaxCharacter(e)||!!e.eat(47)&&(e.lastIntValue=47,!0)
var t=e.current()
return!(99===t||e.switchN&&107===t||(e.lastIntValue=t,e.advance(),0))},et.regexp_eatDecimalEscape=function(e){e.lastIntValue=0
var t=e.current()
if(t>=49&&t<=57){do{e.lastIntValue=10*e.lastIntValue+(t-48),e.advance()}while((t=e.current())>=48&&t<=57)
return!0}return!1},et.regexp_eatCharacterClassEscape=function(e){var t=e.current()
if(function(e){return 100===e||68===e||115===e||83===e||119===e||87===e}(t))return e.lastIntValue=-1,e.advance(),1
var i=!1
if(e.switchU&&this.options.ecmaVersion>=9&&((i=80===t)||112===t)){var n
if(e.lastIntValue=-1,e.advance(),e.eat(123)&&(n=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125))return i&&2===n&&e.raise("Invalid property name"),n
e.raise("Invalid property name")}return 0},et.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos
if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue
if(this.regexp_eatUnicodePropertyValue(e)){var n=e.lastStringValue
return this.regexp_validateUnicodePropertyNameAndValue(e,i,n),1}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var s=e.lastStringValue
return this.regexp_validateUnicodePropertyNameOrValue(e,s)}return 0},et.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){le(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(i)||e.raise("Invalid property value")},et.regexp_validateUnicodePropertyNameOrValue=function(e,t){return e.unicodeProperties.binary.test(t)?1:e.switchV&&e.unicodeProperties.binaryOfStrings.test(t)?2:void e.raise("Invalid property name")},et.regexp_eatUnicodePropertyName=function(e){var t=0
for(e.lastStringValue="";b(t=e.current());)e.lastStringValue+=h(t),e.advance()
return""!==e.lastStringValue},et.regexp_eatUnicodePropertyValue=function(e){var t=0
for(e.lastStringValue="";C(t=e.current());)e.lastStringValue+=h(t),e.advance()
return""!==e.lastStringValue},et.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)},et.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e)
return e.eat(93)||e.raise("Unterminated character class"),t&&2===i&&e.raise("Negated character class may contain strings"),!0}return!1},et.regexp_classContents=function(e){return 93===e.current()?1:e.switchV?this.regexp_classSetExpression(e):(this.regexp_nonEmptyClassRanges(e),1)},et.regexp_nonEmptyClassRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue
if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue
!e.switchU||-1!==t&&-1!==i||e.raise("Invalid character class"),-1!==t&&-1!==i&&t>i&&e.raise("Range out of order in character class")}}},et.regexp_eatClassAtom=function(e){var t=e.pos
if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0
if(e.switchU){var i=e.current();(99===i||A(i))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var n=e.current()
return 93!==n&&(e.lastIntValue=n,e.advance(),!0)},et.regexp_eatClassEscape=function(e){var t=e.pos
if(e.eat(98))return e.lastIntValue=8,!0
if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0
if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0
e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)},et.regexp_classSetExpression=function(e){var t,i=1
if(this.regexp_eatClassSetRange(e));else if(t=this.regexp_eatClassSetOperand(e)){2===t&&(i=2)
for(var n=e.pos;e.eatChars([38,38]);)38!==e.current()&&(t=this.regexp_eatClassSetOperand(e))?2!==t&&(i=1):e.raise("Invalid character in character class")
if(n!==e.pos)return i
for(;e.eatChars([45,45]);)this.regexp_eatClassSetOperand(e)||e.raise("Invalid character in character class")
if(n!==e.pos)return i}else e.raise("Invalid character in character class")
for(;;)if(!this.regexp_eatClassSetRange(e)){if(!(t=this.regexp_eatClassSetOperand(e)))return i
2===t&&(i=2)}},et.regexp_eatClassSetRange=function(e){var t=e.pos
if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue
if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var n=e.lastIntValue
return-1!==i&&-1!==n&&i>n&&e.raise("Range out of order in character class"),!0}e.pos=t}return!1},et.regexp_eatClassSetOperand=function(e){return this.regexp_eatClassSetCharacter(e)?1:this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)},et.regexp_eatNestedClass=function(e){var t=e.pos
if(e.eat(91)){var i=e.eat(94),n=this.regexp_classContents(e)
if(e.eat(93))return i&&2===n&&e.raise("Negated character class may contain strings"),n
e.pos=t}if(e.eat(92)){var s=this.regexp_eatCharacterClassEscape(e)
if(s)return s
e.pos=t}return null},et.regexp_eatClassStringDisjunction=function(e){var t=e.pos
if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e)
if(e.eat(125))return i}else e.raise("Invalid escape")
e.pos=t}return null},et.regexp_classStringDisjunctionContents=function(e){for(var t=this.regexp_classString(e);e.eat(124);)2===this.regexp_classString(e)&&(t=2)
return t},et.regexp_classString=function(e){for(var t=0;this.regexp_eatClassSetCharacter(e);)t++
return 1===t?1:2},et.regexp_eatClassSetCharacter=function(e){var t=e.pos
if(e.eat(92))return!(!this.regexp_eatCharacterEscape(e)&&!this.regexp_eatClassSetReservedPunctuator(e)&&(e.eat(98)?(e.lastIntValue=8,0):(e.pos=t,1)))
var i=e.current()
return!(i<0||i===e.lookahead()&&function(e){return 33===e||e>=35&&e<=38||e>=42&&e<=44||46===e||e>=58&&e<=64||94===e||96===e||126===e}(i)||function(e){return 40===e||41===e||45===e||47===e||e>=91&&e<=93||e>=123&&e<=125}(i)||(e.advance(),e.lastIntValue=i,0))},et.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current()
return!!function(e){return 33===e||35===e||37===e||38===e||44===e||45===e||e>=58&&e<=62||64===e||96===e||126===e}(t)&&(e.lastIntValue=t,e.advance(),!0)},et.regexp_eatClassControlLetter=function(e){var t=e.current()
return!(!S(t)&&95!==t||(e.lastIntValue=t%32,e.advance(),0))},et.regexp_eatHexEscapeSequence=function(e){var t=e.pos
if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0
e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1},et.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0
for(e.lastIntValue=0;S(i=e.current());)e.lastIntValue=10*e.lastIntValue+(i-48),e.advance()
return e.pos!==t},et.regexp_eatHexDigits=function(e){var t=e.pos,i=0
for(e.lastIntValue=0;k(i=e.current());)e.lastIntValue=16*e.lastIntValue+$(i),e.advance()
return e.pos!==t},et.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue
if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue
t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=64*t+8*i+e.lastIntValue:e.lastIntValue=8*t+i}else e.lastIntValue=t
return!0}return!1},et.regexp_eatOctalDigit=function(e){var t=e.current()
return A(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)},et.regexp_eatFixedHexDigits=function(e,t){var i=e.pos
e.lastIntValue=0
for(var n=0;n<t;++n){var s=e.current()
if(!k(s))return e.pos=i,!1
e.lastIntValue=16*e.lastIntValue+$(s),e.advance()}return!0}
var nt=function(e){this.type=e.type,this.value=e.value,this.start=e.start,this.end=e.end,e.options.locations&&(this.loc=new ge(e,e.startLoc,e.endLoc)),e.options.ranges&&(this.range=[e.start,e.end])},st=ve.prototype
st.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new nt(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()},st.getToken=function(){return this.next(),new nt(this)},"undefined"!=typeof Symbol&&(st[Symbol.iterator]=function(){var e=this
return{next:function(){var t=e.getToken()
return{done:t.type===ee.eof,value:t}}}}),st.nextToken=function(){var e=this.curContext()
return e&&e.preserveSpace||this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length?this.finishToken(ee.eof):e.override?e.override(this):void this.readToken(this.fullCharCodeAtPos())},st.readToken=function(e){return i(e,this.options.ecmaVersion>=6)||92===e?this.readWord():this.getTokenFromCode(e)},st.fullCharCodeAtPos=function(){var e=this.input.charCodeAt(this.pos)
if(e<=55295||e>=56320)return e
var t=this.input.charCodeAt(this.pos+1)
return t<=56319||t>=57344?e:(e<<10)+t-56613888},st.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2)
if(-1===i&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations)for(var n=void 0,s=t;(n=a(this.input,s,this.pos))>-1;)++this.curLine,s=this.lineStart=n
this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())},st.skipLineComment=function(e){for(var t=this.pos,i=this.options.onComment&&this.curPosition(),n=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!o(n);)n=this.input.charCodeAt(++this.pos)
this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())},st.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos)
switch(e){case 32:case 160:++this.pos
break
case 13:10===this.input.charCodeAt(this.pos+1)&&++this.pos
case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos)
break
case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment()
break
case 47:this.skipLineComment(2)
break
default:break e}break
default:if(!(e>8&&e<14||e>=5760&&ne.test(String.fromCharCode(e))))break e;++this.pos}}},st.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition())
var i=this.type
this.type=e,this.value=t,this.updateContext(i)},st.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1)
if(e>=48&&e<=57)return this.readNumber(!0)
var t=this.input.charCodeAt(this.pos+2)
return this.options.ecmaVersion>=6&&46===e&&46===t?(this.pos+=3,this.finishToken(ee.ellipsis)):(++this.pos,this.finishToken(ee.dot))},st.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1)
return this.exprAllowed?(++this.pos,this.readRegexp()):61===e?this.finishOp(ee.assign,2):this.finishOp(ee.slash,1)},st.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,n=42===e?ee.star:ee.modulo
return this.options.ecmaVersion>=7&&42===e&&42===t&&(++i,n=ee.starstar,t=this.input.charCodeAt(this.pos+2)),61===t?this.finishOp(ee.assign,i+1):this.finishOp(n,i)},st.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1)
return t===e?this.options.ecmaVersion>=12&&61===this.input.charCodeAt(this.pos+2)?this.finishOp(ee.assign,3):this.finishOp(124===e?ee.logicalOR:ee.logicalAND,2):61===t?this.finishOp(ee.assign,2):this.finishOp(124===e?ee.bitwiseOR:ee.bitwiseAND,1)},st.readToken_caret=function(){return 61===this.input.charCodeAt(this.pos+1)?this.finishOp(ee.assign,2):this.finishOp(ee.bitwiseXOR,1)},st.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1)
return t===e?45!==t||this.inModule||62!==this.input.charCodeAt(this.pos+2)||0!==this.lastTokEnd&&!te.test(this.input.slice(this.lastTokEnd,this.pos))?this.finishOp(ee.incDec,2):(this.skipLineComment(3),this.skipSpace(),this.nextToken()):61===t?this.finishOp(ee.assign,2):this.finishOp(ee.plusMin,1)},st.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1
return t===e?(i=62===e&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+i)?this.finishOp(ee.assign,i+1):this.finishOp(ee.bitShift,i)):33!==t||60!==e||this.inModule||45!==this.input.charCodeAt(this.pos+2)||45!==this.input.charCodeAt(this.pos+3)?(61===t&&(i=2),this.finishOp(ee.relational,i)):(this.skipLineComment(4),this.skipSpace(),this.nextToken())},st.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1)
return 61===t?this.finishOp(ee.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===e&&62===t&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(ee.arrow)):this.finishOp(61===e?ee.eq:ee.prefix,1)},st.readToken_question=function(){var e=this.options.ecmaVersion
if(e>=11){var t=this.input.charCodeAt(this.pos+1)
if(46===t){var i=this.input.charCodeAt(this.pos+2)
if(i<48||i>57)return this.finishOp(ee.questionDot,2)}if(63===t)return e>=12&&61===this.input.charCodeAt(this.pos+2)?this.finishOp(ee.assign,3):this.finishOp(ee.coalesce,2)}return this.finishOp(ee.question,1)},st.readToken_numberSign=function(){var e=35
if(this.options.ecmaVersion>=13&&(++this.pos,i(e=this.fullCharCodeAtPos(),!0)||92===e))return this.finishToken(ee.privateId,this.readWord1())
this.raise(this.pos,"Unexpected character '"+h(e)+"'")},st.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot()
case 40:return++this.pos,this.finishToken(ee.parenL)
case 41:return++this.pos,this.finishToken(ee.parenR)
case 59:return++this.pos,this.finishToken(ee.semi)
case 44:return++this.pos,this.finishToken(ee.comma)
case 91:return++this.pos,this.finishToken(ee.bracketL)
case 93:return++this.pos,this.finishToken(ee.bracketR)
case 123:return++this.pos,this.finishToken(ee.braceL)
case 125:return++this.pos,this.finishToken(ee.braceR)
case 58:return++this.pos,this.finishToken(ee.colon)
case 96:if(this.options.ecmaVersion<6)break
return++this.pos,this.finishToken(ee.backQuote)
case 48:var t=this.input.charCodeAt(this.pos+1)
if(120===t||88===t)return this.readRadixNumber(16)
if(this.options.ecmaVersion>=6){if(111===t||79===t)return this.readRadixNumber(8)
if(98===t||66===t)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1)
case 34:case 39:return this.readString(e)
case 47:return this.readToken_slash()
case 37:case 42:return this.readToken_mult_modulo_exp(e)
case 124:case 38:return this.readToken_pipe_amp(e)
case 94:return this.readToken_caret()
case 43:case 45:return this.readToken_plus_min(e)
case 60:case 62:return this.readToken_lt_gt(e)
case 61:case 33:return this.readToken_eq_excl(e)
case 63:return this.readToken_question()
case 126:return this.finishOp(ee.prefix,1)
case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+h(e)+"'")},st.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t)
return this.pos+=t,this.finishToken(e,i)},st.readRegexp=function(){for(var e,t,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression")
var n=this.input.charAt(this.pos)
if(te.test(n)&&this.raise(i,"Unterminated regular expression"),e)e=!1
else{if("["===n)t=!0
else if("]"===n&&t)t=!1
else if("/"===n&&!t)break
e="\\"===n}++this.pos}var s=this.input.slice(i,this.pos);++this.pos
var r=this.pos,o=this.readWord1()
this.containsEsc&&this.unexpected(r)
var a=this.regexpState||(this.regexpState=new it(this))
a.reset(i,s,o),this.validateRegExpFlags(a),this.validateRegExpPattern(a)
var l=null
try{l=RegExp(s,o)}catch(e){}return this.finishToken(ee.regexp,{pattern:s,flags:o,value:l})},st.readInt=function(e,t,i){for(var n=this.options.ecmaVersion>=12&&void 0===t,s=i&&48===this.input.charCodeAt(this.pos),r=this.pos,o=0,a=0,l=0,h=null==t?1/0:t;l<h;++l,++this.pos){var c=this.input.charCodeAt(this.pos),u=void 0
if(n&&95===c)s&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),95===a&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),0===l&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),a=c
else{if((u=c>=97?c-97+10:c>=65?c-65+10:c>=48&&c<=57?c-48:1/0)>=e)break
a=c,o=o*e+u}}return n&&95===a&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===r||null!=t&&this.pos-r!==t?null:o},st.readRadixNumber=function(e){var t=this.pos
this.pos+=2
var n=this.readInt(e)
return null==n&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&110===this.input.charCodeAt(this.pos)?(n=M(this.input.slice(t,this.pos)),++this.pos):i(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(ee.num,n)},st.readNumber=function(e){var t=this.pos
e||null!==this.readInt(10,void 0,!0)||this.raise(t,"Invalid number")
var n=this.pos-t>=2&&48===this.input.charCodeAt(t)
n&&this.strict&&this.raise(t,"Invalid number")
var s=this.input.charCodeAt(this.pos)
if(!n&&!e&&this.options.ecmaVersion>=11&&110===s){var r=M(this.input.slice(t,this.pos))
return++this.pos,i(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(ee.num,r)}n&&/[89]/.test(this.input.slice(t,this.pos))&&(n=!1),46!==s||n||(++this.pos,this.readInt(10),s=this.input.charCodeAt(this.pos)),69!==s&&101!==s||n||(43!==(s=this.input.charCodeAt(++this.pos))&&45!==s||++this.pos,null===this.readInt(10)&&this.raise(t,"Invalid number")),i(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number")
var o,a=(o=this.input.slice(t,this.pos),n?parseInt(o,8):parseFloat(o.replace(/_/g,"")))
return this.finishToken(ee.num,a)},st.readCodePoint=function(){var e
if(123===this.input.charCodeAt(this.pos)){this.options.ecmaVersion<6&&this.unexpected()
var t=++this.pos
e=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,e>1114111&&this.invalidStringToken(t,"Code point out of bounds")}else e=this.readHexChar(4)
return e},st.readString=function(e){for(var t="",i=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant")
var n=this.input.charCodeAt(this.pos)
if(n===e)break
92===n?(t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos):8232===n||8233===n?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(o(n)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(i,this.pos++),this.finishToken(ee.string,t)}
var rt={}
st.tryReadTemplateToken=function(){this.inTemplateElement=!0
try{this.readTmplToken()}catch(e){if(e!==rt)throw e
this.readInvalidTemplateToken()}this.inTemplateElement=!1},st.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw rt
this.raise(e,t)},st.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template")
var i=this.input.charCodeAt(this.pos)
if(96===i||36===i&&123===this.input.charCodeAt(this.pos+1))return this.pos!==this.start||this.type!==ee.template&&this.type!==ee.invalidTemplate?(e+=this.input.slice(t,this.pos),this.finishToken(ee.template,e)):36===i?(this.pos+=2,this.finishToken(ee.dollarBraceL)):(++this.pos,this.finishToken(ee.backQuote))
if(92===i)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos
else if(o(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:10===this.input.charCodeAt(this.pos)&&++this.pos
case 10:e+="\n"
break
default:e+=String.fromCharCode(i)}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}},st.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos
break
case"$":if("{"!==this.input[this.pos+1])break
case"`":return this.finishToken(ee.invalidTemplate,this.input.slice(this.start,this.pos))
case"\r":"\n"===this.input[this.pos+1]&&++this.pos
case"\n":case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1}this.raise(this.start,"Unterminated template")},st.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos)
switch(++this.pos,t){case 110:return"\n"
case 114:return"\r"
case 120:return String.fromCharCode(this.readHexChar(2))
case 117:return h(this.readCodePoint())
case 116:return"\t"
case 98:return"\b"
case 118:return"\v"
case 102:return"\f"
case 13:10===this.input.charCodeAt(this.pos)&&++this.pos
case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),""
case 56:case 57:if(this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e){var i=this.pos-1
this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var n=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],s=parseInt(n,8)
return s>255&&(n=n.slice(0,-1),s=parseInt(n,8)),this.pos+=n.length-1,t=this.input.charCodeAt(this.pos),"0"===n&&56!==t&&57!==t||!this.strict&&!e||this.invalidStringToken(this.pos-1-n.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(s)}return o(t)?(this.options.locations&&(this.lineStart=this.pos,++this.curLine),""):String.fromCharCode(t)}},st.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e)
return null===i&&this.invalidStringToken(t,"Bad character escape sequence"),i},st.readWord1=function(){this.containsEsc=!1
for(var e="",t=!0,s=this.pos,r=this.options.ecmaVersion>=6;this.pos<this.input.length;){var o=this.fullCharCodeAtPos()
if(n(o,r))this.pos+=o<=65535?1:2
else{if(92!==o)break
this.containsEsc=!0,e+=this.input.slice(s,this.pos)
var a=this.pos
117!==this.input.charCodeAt(++this.pos)&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos
var l=this.readCodePoint();(t?i:n)(l,r)||this.invalidStringToken(a,"Invalid Unicode escape"),e+=h(l),s=this.pos}t=!1}return e+this.input.slice(s,this.pos)},st.readWord=function(){var e=this.readWord1(),t=ee.name
return this.keywords.test(e)&&(t=J[e]),this.finishToken(t,e)},ve.acorn={Parser:ve,version:"8.12.1",defaultOptions:pe,Position:de,SourceLocation:ge,getLineInfo:c,Node:Fe,TokenType:Z,tokTypes:ee,keywordTypes:J,TokContext:Te,tokContexts:Ee,isIdentifierChar:n,isIdentifierStart:i,Token:nt,isNewLine:o,lineBreak:te,lineBreakG:ie,nonASCIIwhitespace:ne}
const ot={rewrite:e=>{const t=ve.parse(e,{ranges:!0,locations:!1,sourceType:"script",ecmaVersion:2022,allowHashBang:!0,allowReserved:!1,checkPrivateFields:!0,allowAwaitOutsideFunction:!0,allowReturnOutsideFunction:!0}).body,i=t.pop()
if(null==i)return""
let n=""
for(const i of t)n+=P(e,i)
return"ExpressionStatement"===i.type?n+="return "+R(e,i.expression)+";\n":n+=P(e,i),n}}
Object.setPrototypeOf(ot,null)
const at=Object.freeze(ot)
var lt
class ht{get name(){throw Error("Stub!")}get meta(){throw Error("Stub!")}get exports(){throw Error("Stub!")}get sandbox(){throw Error("Stub!")}async import(e){throw Error("Stub!")}}lt=ht,(()=>{const e=lt.prototype
Object.defineProperty(e,Symbol.toStringTag,{value:"Module",writable:!1,enumerable:!1,configurable:!1}),Object.setPrototypeOf(e,null),Object.freeze(e)})()
const ct=ht;(async({window:e,document:t})=>{function i(e){const i=t.getElementById(e)
if(null==i)throw new p("Element does not exist: "+e)
return i}function n(e,i,n){const s=t.createElement("span")
return(n||x).appendChild(s),s.style.color=i||"",s.textContent=e,s}function s(e,t,i){return n(e+"\n",t,i)}function r(){const e=t.createElement("hr")
x.appendChild(e),e.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}function o(e,i){const s=t.createElement("span");(i||x).appendChild(s),s.style.display="inline-block"
const r=function(e){try{const t=e[v]
if("string"==typeof t)return t
const i=e.constructor
if("function"==typeof i){const e=i.name
if("string"==typeof e)return e}}catch(e){}return null}(e)||"",l=r.length>0?r+" { ... }":"{ ... }",c=n(l,void 0,s)
{const i=t.createElement("button")
i.type="button",i.title="Expand",i.style.backgroundImage='url("res/expand.svg")',s.appendChild(i),i.onclick=()=>{var t,s,u,d,g,p
if("Expand"===i.title){i.title="Collapse",i.style.backgroundImage='url("res/collapse.svg")',c.innerHTML="",n(r.length>0?r+" {\n":"{\n",void 0,c)
{const t=h.getPrototypeOf(e)
null!=t&&(n("\t#prototype: ",void 0,c),o(t,c),n(",\n",void 0,c))}for(const i of h.ownKeys(e)){n("\t",void 0,c)
const r=h.getOwnPropertyDescriptor(e,i)
null!=r&&("value"in r?(null===(t=r.writable)||void 0===t||t||n("readonly ","#000080",c),null===(s=r.configurable)||void 0===s||s||n("final ","#000080",c),n("string"==typeof i?i:"["+i.toString()+"]",null===(u=r.enumerable)||void 0===u||u?"#008000":"#808080",c),n(": ",void 0,c),a(r.value,c),n(",\n",void 0,c)):(null===(d=r.configurable)||void 0===d||d||n("final ","#000080",c),"get"in r&&(n("get ","#000080",c),n("string"==typeof i?i:"["+i.toString()+"]",null===(g=r.enumerable)||void 0===g||g?"#008000":"#808080",c),n("() { ... }, ",void 0,c)),"set"in r&&(n("set ","#000080",c),n("string"==typeof i?i:"["+i.toString()+"]",null===(p=r.enumerable)||void 0===p||p?"#008000":"#808080",c),n("(v) { ... }, ",void 0,c)),n("\n",void 0,c)))}n("}",void 0,c)}else i.title="Expand",i.style.backgroundImage='url("res/expand.svg")',c.textContent=l}}}function a(e,i){switch(typeof e){case"number":n(e.toString(10),"#0000ff",i)
break
case"bigint":n(g(e)+"n","#0000ff",i)
break
case"symbol":n(e.toString(),"#800080",i)
break
case"boolean":n(e?"true":"false","#000080",i)
break
case"undefined":n("undefined","#000080",i)
break
case"string":!function(e,i){const s=t.createElement("span")
if((i||x).appendChild(s),(e='"'+(r=e,r.replace(/[\"\'\\(\x00-\x1F)(\x7f-\x9f)(\ud800-\udfff)]/g,(e=>{switch(e){case'"':return'\\"'
case"'":return"\\'"
case"\\":return"\\\\"
case"\b":return"\\b"
case"\f":return"\\f"
case"\n":return"\\n"
case"\r":return"\\r"
case"\t":return"\\t"
default:return"\\u"+e.charCodeAt(0).toString(16).padStart(4,"0")}}))+'"')).length>30){const i=n("","#008000",s)
i.innerHTML=M
{const i=t.createElement("button")
i.type="button",i.title="Copy text",i.style.backgroundImage='url("res/copy.svg")',s.appendChild(i),i.onclick=()=>{navigator.clipboard.writeText(e)}}{const n=t.createElement("button")
n.type="button",n.title="Expand",n.style.backgroundImage='url("res/expand.svg")',s.appendChild(n),n.onclick=()=>{"Expand"===n.title?(n.title="Collapse",n.style.backgroundImage='url("res/collapse.svg")',i.textContent=e):(n.title="Expand",n.style.backgroundImage='url("res/expand.svg")',i.innerHTML=M)}}}else{n(e,"#008000",s)
{const i=t.createElement("button")
i.type="button",i.title="Copy text",i.style.backgroundImage='url("res/copy.svg")',s.appendChild(i),i.onclick=()=>{navigator.clipboard.writeText(e)}}}var r}(e,i)
break
case"function":!function(e,i){const s=t.createElement("span");(i||x).appendChild(s)
const r=n("",void 0,s)
r.innerHTML=L,e=e.toString().trim()
{const i=t.createElement("button")
i.type="button",i.title="Copy text",i.style.backgroundImage='url("res/copy.svg")',s.appendChild(i),i.onclick=()=>{navigator.clipboard.writeText(e)}}{const i=t.createElement("button")
i.type="button",i.title="Expand",i.style.backgroundImage='url("res/expand.svg")',s.appendChild(i),i.onclick=()=>{"Expand"===i.title?(i.title="Collapse",i.style.backgroundImage='url("res/collapse.svg")',r.textContent=e):(i.title="Expand",i.style.backgroundImage='url("res/expand.svg")',r.innerHTML=L)}}}(e,i)
break
default:null==e?n("null","#000080",i):m(e)?function(e,i){const s=t.createElement("span");(i||x).appendChild(s),s.style.display="inline-block"
const r=e.length>0?"[ ... ]":"[]",o=n(r,void 0,s)
{const i=t.createElement("button")
i.type="button",i.title="Expand",i.style.backgroundImage='url("res/expand.svg")',s.appendChild(i),i.onclick=()=>{if("Expand"===i.title){i.title="Collapse",i.style.backgroundImage='url("res/collapse.svg")',o.innerHTML="",n("[\n",void 0,o)
for(const t of e)n("\t",void 0,o),a(t,o),n(",\n",void 0,o)
n("]",void 0,o)}else i.title="Expand",i.style.backgroundImage='url("res/expand.svg")',o.textContent=r}}}(e,i):function(e){try{return new c(e,0,0),!0}catch(e){return!1}}(e)?n("ArrayBuffer {}",void 0,i):f(e)?n("ArrayBufferView {}",void 0,i):o(e,i)}}async function l(i){if(function(e){const i=t.createElement("div")
x.appendChild(i),i.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"}),W.edit(i,{value:e,tabSize:4,minLines:1,maxLines:99,readOnly:!0,fontSize:14,fontFamily:"Ubuntu Mono",showGutter:!1,cursorStyle:"ace",newLineMode:"unix",animatedScroll:!1,indentedSoftWrap:!0,highlightActiveLine:!1,wrapBehavioursEnabled:!0}).session.setMode(b)}(i=i.trim()),"/"===i.charAt(0)){const e=i.slice(1).replace(/\s+/g," ").split(" ")
switch(i=e[0]){case"clear":e.length>1?(s("Error: Invalid argument.","#ff0000"),s("Try '/help' for more information.","#ff0000"),r()):x.innerHTML=""
break
case"help":s("Embedded JSConsole version 0.1.0 by WhiteSpider Dev\n","#0000ff"),s("Basic usage notes:","#808000"),s("\tAll inputs that starts with '/' will be treated as a built-in command.","#808000"),s("\tAll other inputs will be executed as JavaScript code with 'eval(code)'.\n","#808000"),s("Built-in commands:","#008000"),s("\t/clear\t\t\t- Clear the console.","#008000"),s("\t/help\t\t\t- Display this help message.","#008000"),s("\t/version\t\t\t- Show version information.","#008000"),r()
break
case"version":e.length>1?(s("Error: Invalid argument.","#ff0000"),s("Try '/help' for more information.","#ff0000"),r()):(s("v0.1.0"),r())
break
default:s(i+": command not found.","#ff0000"),s("Try '/help' for a list of built-in commands.","#ff0000"),r()}return}try{i='"use strict";\n'+at.rewrite(";"+i)}catch(e){return s(g(e),"#ff0000"),void r()}let n
try{n=await h.apply(new u("arguments","self","window","globalThis",A,"module","with("+A+'){return(async()=>{"use strict";\n'+i+"\n;\n})();}"),e,[void 0,e,e,e,k,$])}catch(e){return s("Uncaught "+e,"#ff0000"),void r()}a(n),r()}"complete"!==t.readyState&&await new Promise((e=>{const i=()=>{"complete"===t.readyState&&(t.removeEventListener("readystatechange",i),setTimeout(e,50,null))}
t.addEventListener("readystatechange",i,{passive:!0})})),e.stop(),e.focus()
const{Reflect:h,DataView:c,Function:u,Object:d,String:g,Error:p}=e,m=Array.isArray.bind(Array),f=ArrayBuffer.isView.bind(ArrayBuffer),v=Symbol.toStringTag
d.freeze(d.setPrototypeOf(h,null)),e.addEventListener("error",(e=>{e.preventDefault(),e.stopPropagation()
const t="Unhandled error at "+(e.filename||"unknown source")+" "+(e.lineno||"X")+":"+(e.colno||"X")+"\n\n Message: "+g(e.error)
y.textContent=t,y.style.display="block"})),e.addEventListener("unhandledrejection",(e=>{e.preventDefault(),e.stopPropagation()}))
const w=[],y=i("error"),x=i("output"),b=new B.K
let C=0
const S=W.edit(function(e){const i=t.querySelector(e)
if(i instanceof HTMLElement)return i
throw new p("Failed to query selector: "+e)}("#input>div"),{tabSize:4,minLines:1,maxLines:99,fontSize:16,fontFamily:"Ubuntu Mono",showGutter:!1,cursorStyle:"ace",newLineMode:"unix",animatedScroll:!1,enableAutoIndent:!0,indentedSoftWrap:!0,highlightActiveLine:!1,wrapBehavioursEnabled:!0,autoScrollEditorIntoView:!0})
S.focus(),S.resize(!0),S.session.setMode(b),S.session.setUseWrapMode(!0),S.commands.addCommand({exec:()=>{const{row:e,column:t}=S.getCursorPosition()
0===e?C>0&&(S.moveCursorTo(0,0),S.setValue(w[--C],-1)):S.moveCursorTo(e-1,t)},name:"1",bindKey:"Up",readOnly:!1}),S.commands.addCommand({exec:()=>{const{row:e,column:t}=S.getCursorPosition()
e===S.getLastVisibleRow()?C<w.length&&(S.moveCursorTo(0,0),S.setValue(w[++C]||"",-1)):S.moveCursorTo(e+1,t)},name:"2",bindKey:"Down",readOnly:!1}),S.commands.addCommand({exec:()=>{const e=S.getValue().trim()
e.length>0&&(w.push(e),C=w.length,S.blur(),S.setValue("",-1),S.setReadOnly(!0),l(e).then((()=>{S.setReadOnly(!1),S.focus()})))},name:"3",bindKey:"Enter",readOnly:!1})
const k=d.create(null),$=new ct,A="scope_"+Date.now().toString(36),M='&quot;<span style="color:#808080">...</span>&quot;',L='<span style="color:#000080">function</span> (<span style="color:#808080">...</span>) { <span style="color:#808080">...</span> }'
d.defineProperty($,"global",{value:(...t)=>{for(const i of t)e[i]=void 0},writable:!1,enumerable:!1,configurable:!1}),d.defineProperty($,"scope",{value:(...e)=>{for(const t of e)k[t]=void 0},writable:!1,enumerable:!1,configurable:!1})})(window)})()})()
