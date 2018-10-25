/*
    需求:
    1.获取想要的标签。
    2.判断某个元素中是否有某个class。
    3.如果有就删除掉这个class。
    4.如果没有就添加这个class。
 */
function M(selec)
{
    var ch=selec.substring(0,1);
    var str=selec.split(' ');
    if(ch=='#')
        return document.getElementById(selec);
    else
    {
        var arr=Array.from(document.querySelectorAll(selec));
        if(arr.length==1)
            return arr[0];
        else
            return arr;
    }
}

function hasClass(obj,cls)
{
    var re=new RegExp(`${cls}`);
    var sing=re.test(obj.className);
    if(sing)
        return true;
    else
        return false;
}

function addClass(obj,cls)
{
    if(!hasClass(obj,cls))
        $(obj).addClass(cls);
}

function rmClass(obj,cls)
{
    if(hasClass(obj,cls))
    {
        $(obj).removeClass(cls);
        console.log('移除完毕!');
    }
}