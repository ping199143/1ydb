/*
 * 首页
 * Author	 	Cloud
 * CreateDate   2014-03-26
 * Copyright:	1997-2014 Netease Inc. All rights reserved.
 */

define("module/index/main",["require","pro","component/msgbox","common/dataaction","common/countdown","common/utils","component/tabs","common/lazyload","common/cookie","common/specialsupport","common/header"],function(e){function h(){var e=this;l.init(),s.initBackTop(),e._lazyload=new u,e.showMainSlide(),e.getNewReveal(),e.slideNewGoods(),e.scrollRecords(),e.scrollShare(),e.getNewRecord(),G.isLogin&&l.getNewestReward();var t=a.get("hasShownIntro");t!="true"&&(l.showPopIntro(),a.set("hasShownIntro","true",30)),e.showPromot(),e.alertBrowserUpgrade()}function p(){var e=$(".m-index-promot");e.slideShow({slide:e})}function d(){function u(e,i){r.ajax("goods/getWinner.do",{gid:i.goods.gid,period:i.period},function(r){r.code-0==0?(i=$.extend(i,r.result),i.status=3,i._isFree=i.goods.priceType==2?!0:!1,i.owner.userpage=s.getUserPage(i.owner.cid),i.ownerCost=i.cost,i.ratio=(i.goods.price/i.ownerCost).toFixed(1),e.empty().html(t.template(n[i.status-1],i))):r.code-0==-16&&setTimeout(function(){u(e,i)},1e3)})}var e=this,n=["",['<div class="w-goods-newReveal">','<i class="ico ico-label ico-label-revealing" title="正在揭晓"></i>','<p class="w-goods-title"><a href="{{goodsUrl}}" title="{{goods.gname}}">(第{{period}}期) {{goods.gname}}</a></p>','<div class="w-goods-pic">','<a title="{{goods.gname}}" href="{{goodsUrl}}">','<img width="140" height="105" src="{{goodsPic}}" />',"</a>","</div>",'<p class="w-goods-price">总需：{{goods.price}}人次</p>','<div class="w-goods-countdown">揭晓倒计时:','<div class="w-countdown" time="{{remainTime}}">','<span class="w-countdown-nums"><b>0</b><b>0</b>:<b>0</b><b>0</b>:<b>0</b><b>0</b></span>','<p class="w-countdown-ing txt-red" style="display:none;">请稍候，正在计算中…</p>',"</div>","</div>","</div>"].join(""),['<div class="w-goods-newReveal">','<i class="ico ico-label ico-label-newReveal" title="最新揭晓"></i>','<p class="w-goods-title"><a href="{{goodsUrl}}" title="{{goods.gname}}">(第{{period}}期) {{goods.gname}}</a></p>','<div class="w-goods-pic">','<a title="{{goods.gname}}" href="{{goodsUrl}}">','<img width="140" height="105" src="{{goodsPic}}" />',"</a>","</div>",'<p class="w-goods-price">总需：{{goods.price}}人次</p>','<div class="w-goods-record">','<p class="w-goods-owner f-txtabb">获奖者：<a href="{{owner.userpage}}" title="{{owner.nickname}}(ID:{{owner.cid}})"><b>{{owner.nickname}}</b></a></p>',"<p>本期参与：{{ownerCost}}人次</p>","<p>幸运号码：{{luckyCode}}</p>",'{{^_isFree}}<p class="w-goods-ratio">回报率：<b class="txt-red">{{ratio}}</b> 倍</p>{{/_isFree}}',"</div>","</div>"].join("")],i=$(".m-index-newReveal"),o=i.find(".w-silde-wrap-list");r.ajax("goods/revealList.do",{showAll:!1,pageSize:6,pageNum:1},function(r){var a=r.result.list,f=!0,l='<li><img style="margin: 30px auto 0;" src="'+G.url+'lib/img/common/alt_will_blank.jpg" /></li>',c="";o.empty();for(var h=0,p=a.length;h<p;h++){var d=a[h],v={};d.goodsUrl=s.getGoodsUrl(d.goods.gid,d.period,!0),d.goodsPic=s.getGoodsImg(d.goods.gpic,"m"),d.status==3&&(d._isFree=d.goods.priceType==2?!0:!1,d.owner.userpage=s.getUserPage(d.owner.cid),d.ratio=(d.goods.price/d.ownerCost).toFixed(1)),v=$("<li>"+t.template(n[d.status-1],d)+"</li>"),o.append(v),f&&d.status==2&&(f=!1),d.status==2&&e.countdownNewReveal(v,d.remainTime-0,d,n,function(e,t,n){e.find(".w-countdown-nums").hide(),e.find(".w-countdown-ing").show(),u(e,t)}),d=v=null}if(a.length==0){for(var m=2;m>0;m--)c+=l;o.append(c)}a.length%2!=0&&o.append(l),i.slideShow({slide:i,group:2,autoPlay:f})})}function v(e,n,r,s,o){var u="<b>{{m0}}</b><b>{{m1}}</b>:<b>{{s0}}</b><b>{{s1}}</b>:<b>{{ms0}}</b><b>{{ms1}}</b>",a,f=(new i({now:G.serverTime,interval:40,expires:n,listeners:{run:function(n){a={m0:n.m.substring(0,1),m1:n.m.substring(1),s0:n.s.substring(0,1),s1:n.s.substring(1),ms0:n.ms.substring(0,1),ms1:n.ms.substring(1)},e.find(".w-countdown-nums").html(t.template(u,a))},finish:function(){o&&o(e,r,s)}}})).start()}function m(){var e=$(".m-index-newGoods");e.slideShow({slide:e,autoPlay:!1})}function g(){function u(){n.animate({marginTop:0-r},i,function(){n.find("li:first").appendTo(n),n.css("marginTop",0)})}var e=this,t=$(".m-index-recordRank"),n=t.find("ul"),r=n.find("li").outerHeight(),i=500,s=5e3,o=null;if(t.length==0||n.find("li").length<8)return;o=setInterval(u,s),n.hover(function(){clearInterval(o)},function(){clearInterval(o),o=setInterval(u,s)})}function y(){var e=this;r.ajax("record/getNewAll.do",{size:50},e.showNewRecord)}function b(e){var n=c;if(e.code-0==0){var r=e.result.list,i=$(".w-record-newest-list");if(r.length==0){i.append('<li style="text-align:center;padding-top:320px;">暂无记录<li>');return}var o=['<li class="w-record-newest-item">','<div class="w-record-goods">','<a href="{{goodsUrl}}" target="_blank"><img width="64" height="48" src="{{goodsImg}}" onerror="this.src=\''+G.url+"lib/img/products/s.png'\" /></a>","</div>",'<div class="w-record-detail">','<p class="w-record-intro"><a class="w-record-user" title="{{nickname}}(ID:{{cid}})" href="{{userPage}}" target="_blank">{{nicknameAbb}}</a> 参与了</p>','<p class="w-record-title">{{num}}人次 <a title="{{gname}}" href="{{goodsUrl}}" target="_blank">{{gname}}</a></p>',"</div>","</li>"].join(""),u={},a="",f={};for(var l=0,h=r.length;l<h;l++)f=r[l],u={gname:f.gname,goodsUrl:s.getGoodsUrl(f.gid,f.period),goodsImg:s.getGoodsImg(f.gpic,"s"),num:f.num||1,cid:f.user.cid,nickname:f.user.nickname,nicknameAbb:f.user.nickname.length>7?f.user.nickname.substring(0,7)+"...":f.user.nickname,userPage:s.getUserPage(f.user.cid)},a+=t.template(o,u);i.append(a);var p=i.find("li").outerHeight(),d=500,v=5e3;if(i.find("li").length<7){setTimeout(function(){n.getNewRecord()},3e4);return}function m(){i.animate({marginTop:0-p},d,function(){i.find("li:first").remove(),i.css("marginTop",0),i.find("li").size()<10&&n.getNewRecord()})}clearInterval(n._recordInterval),n._recordInterval=setInterval(m,v),i.hover(function(){clearInterval(n._recordInterval)},function(){clearInterval(n._recordInterval),n._recordInterval=setInterval(m,v)})}}function w(){function a(){t.animate({marginTop:0-r},i,function(){t.find("li:lt(2)").appendTo(t),t.css("marginTop",0)})}var e=this,t=$(".m-index-share").find("ul"),n=t.find("li").length,r=t.find("li").outerHeight(),i=500,s=5e3,o=null;if(n<6)return;if(n%2!=0){var u=t.find("li:first").clone();u.removeClass("m-index-share-item-left").addClass("m-index-share-item-right"),t.append(u)}o=setInterval(a,s),t.hover(function(){clearInterval(o)},function(){clearInterval(o),o=setInterval(a,s)})}function E(){f.getSpecial("global",function(){f.eachSpecial(function(e){e.init("index")})})}function S(){var e=['<div class="g-alert">','<div class="g-wrap">','<p>亲爱的小伙伴，为了更好地体验一元夺宝的乐趣，快跟你过时的浏览器说声后会无期。建议您 <a href="http://windows.microsoft.com/zh-cn/windows/upgrade-your-browser" target="_blank">升级IE浏览器</a></p>',"</div>","</div>"].join("");try{(navigator.userAgent.indexOf("MSIE 6.0")>0||navigator.userAgent.indexOf("MSIE 7.0")>0)&&$(".g-header").prepend(e)}catch(t){}}var t=e("pro"),n=e("component/msgbox"),r=e("common/dataaction"),i=e("common/countdown"),s=e("common/utils"),o=e("component/tabs"),u=e("common/lazyload"),a=e("common/cookie"),f=e("common/specialsupport"),l=e("common/header"),c={init:h,showMainSlide:p,getNewReveal:d,countdownNewReveal:v,slideNewGoods:m,scrollRecords:g,getNewRecord:y,showNewRecord:b,scrollShare:w,showPromot:E,_lazyload:null,_recordInterval:0,alertBrowserUpgrade:S};return $.fn.slideShow=function(e){var t={slide:$(".w-slide"),autoPlay:!0,group:1,speed:500,gap:5e3};this.each(function(){function b(){g.removeClass("curr"),g.eq(c).addClass("curr"),i.animate({left:0-y*c+"px"},n.speed,function(){E()})}function w(){n.autoPlay&&(h&&clearInterval(h),h=setInterval(function(){u.trigger("click")},n.gap))}function E(){n.autoPlay&&(h&&clearInterval(h),w())}function S(){h&&clearInterval(h)}var n=$.extend(t,e),r=n.slide,i=r.find(".w-silde-wrap-list"),s=r.find(".w-silde-controller-nav"),o=r.find(".w-silde-controller-btn"),u=o.find(".next"),a=o.find(".prev"),f=i.children().length,l=f/n.group,c=0,h=0;if(f<=n.group)return;var p='<a href="javascript:void(0)"></a>',d="";for(var v=0,m=Math.ceil(l);v<m;v++)d+=p;s.append(d);var g=s.children("a");g.eq(0).addClass("curr");var y=i.find("li").outerWidth()*n.group;i.css("width",f*y),r.hover(function(){o.show()},function(){o.hide()}),r.mouseenter(function(){S()}).mouseleave(function(){w()}),g.bind("click",function(){var e=$(this).index();return c==e?!1:(c=e,b(),!1)}),u.bind("click",function(){return c<l-1?c++:c=0,b(),!1}),a.bind("click",function(){return c>0?c--:c=l-1,b(),!1}),w()})},c});