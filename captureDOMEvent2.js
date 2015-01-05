
  var titleGrounp=new ClickedElements("title");
$(document).ready(function(){


});

//DOM事件注册函数
function documentOnclick(e){
	e.preventDefault();
    
    var targetElement=e.target;
    
    var clickNode=new ClickedNodeElement(targetElement);
    titleGrounp.nodeElements.push(clickNode);

	
	console.log("xpath: "+clickNode._xpath);
}
document.onclick=documentOnclick;

/**
 * [给页面增加mouseover和mouseout事件，当鼠标移动到元素上和移除元素时触发]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function documentOnmouseover(e){
	var target=e.target;
	e.preventDefault();
	$(target).addClass("parser_cover_style");
	$(target).attr("title",target.tagName);
	/*console.log(this+" over: "+$(e.target).attr("class")+" "+e.currentTarget);
	console.log(e.target.tagName+"["+getChildIndexOfParent(e.target)+"]");*/

}
document.onmouseover=documentOnmouseover;

function documentOnmouseout(e){
	e.preventDefault();
	$(e.target).removeClass("parser_cover_style");
	/*console.log(this+" out"+e.target+" "+e.currentTarget);
	console.log(e.target.tagName+"["+getChildIndexOfParent(e.target)+"]");*/

}
document.onmouseout=documentOnmouseout;


/**
 * [ClickedNodeElement 这个类表示一个被点击的节点]
 * @param {[type]} domElement [description]
 */
function ClickedNodeElement(domElement){
	var element=$(domElement);
	this._tagName=domElement.tagName;//节点的tagName
	this._calss=element.attr("class");//节点
	this._id=element.attr("id");
	this._xpath=getAnodeOfXpath(domElement).join("\/");
};
/**
 * [ClickedElements 这个类表示一组点击节点]
 * @param {[type]} nodesGroupNanme [description]
 */
function ClickedElements(nodesGroupNanme){
	this.nodesGroupNanme=nodesGroupNanme;
	this.nodeElements=[];//中间存储的是一组ClickedNodeElement对象
}



/**
 * [getChildIndexOfParent 获取某个节点是其父节点的第几个孩子]
 * @param  {domElement}
 * @return {number}
 */
var getChildIndexOfParent=function(domElement){
	return $(domElement).index();
};
/**
 * [获取一个dom元素的xpath路径]
 * @param  {[type]} domElement [description]
 * @return {[array]}          xpath组成的array对象
 */

var getAnodeOfXpath=function(domElement){
	var xpath=[];
	if(!domElement) return xpath;
	else{
		var _parentNode=null;
		_parentNode=domElement.parentNode;
		while(_parentNode&&_parentNode.tagName.toLowerCase()!="body"){
			xpath.unshift(_parentNode.tagName+"["+getChildIndexOfParent(_parentNode)+"]");
      _parentNode=_parentNode.parentNode;
		}
	}
	return xpath;
}
var XML=window.XML||{
	serializer:function(dom){
		var serializer=new XMLSerializer();
		return serializer.serializerToString(dom);
	}
};
function addWindowToPage(){
	var windowHTML='<div id="_plugInselectWindow" class="easyui-window" data-options="closed:true,modal:false,title:\'Test Window\'" style="width:300px;height:100px;"></div>';
   document.body.innerHTML+=windowHTML;
    $("#_plugInselectWindow").window(
    	"open");
}
addWindowToPage();
