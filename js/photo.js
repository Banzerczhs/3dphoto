window.onload=function()
{
    var Doms="";
    var navs="";
    var datalist=dataList;
    var Photo=M('.photo_warll');
    var Nav=M('.nav');
    for(var i=0;i<datalist.length;i++)
    {
        Doms+=`<div class="photo_i" id="photo_${i+1}">
                    <div class="photo_3d">
                        <div class="side photo_front">
                            <p><img src="${datalist[i].src}"></p>
                            <h2>${datalist[i].caption}</h2>
                        </div>
                        <div class="side photo_back">
                            <div class="desc">${datalist[i].desc}</div>
                        </div>
                    </div>
                </div>`;
        navs+='<span class="nav_i" id="nav_'+(i+1)+'">&#xe67e;</span>'
    }
    Nav.innerHTML=navs;
    var str=Photo.innerHTML.split('{{splice}}');
    Photo.innerHTML=Doms+str[1];

    setTimeout(function(){
        sortImg(0);
    },1);

    var onoff=true;
    var num=M('.nav_i')[0].id;
    function sortImg(n)
    {
        var imgs=M('.photo_i');
        var center=imgs.splice(n,1)[0];
        var oNav=M('.nav_i');
        addClass(center,'center');
        addClass(oNav[n],'active');

        imgs.sort(()=>{
            return 0.5-Math.random();
        });

        center.onclick=function()
        {
            transImg(this);
        }

        var pro=oNav[n];
        var photos=M('.photo_i');
        for(var j=0;j<oNav.length;j++)
        {
            oNav[j].index=j;
            oNav[j].onclick=function()
            {
                if(num[num.length-1]!=photos[this.index].id[photos[this.index].id.length-1])
                {
                    clearClass(photos[this.index]);
                    sortImg(this.index);
                }
                if(pro)
                    $(pro).removeClass('active');
                $(this).addClass('active');
                pro=this;
                transImg(photos[this.index]);
                num=this.id;
            }
        }

        var rp=rnarea();

        var oLeft=imgs.splice(Math.ceil((imgs.length-1)/2));
        var oRight=imgs;

        oLeft.forEach((item,i)=>{
            item.style.left=rn(rp.L.x)+'px';
            item.style.top=rn(rp.L.y)+'px';
            item.style.transform=`rotate(${rn([-2160,2160])}deg) scale(0.8) translate(0,0)`;
        });

        oRight.forEach((item,i)=>{
            item.style.left=rn(rp.R.x)+'px';
            item.style.top=rn(rp.R.y)+'px';
            item.style.transform=`rotate(${rn([-2160,2160])}deg) scale(0.8) translate(0,0)`;
        });
    }

    function rn(arr)
    {
        var max=Math.max.apply(null,arr);
        var min=Math.min.apply(null,arr);

        return parseFloat(Math.random()*(max-min)+min);
    }

    function rnarea()
    {
        var warll=M('.photo_warll');
        var photo=M('.center');
        var W=warll.clientWidth,
            H=warll.clientHeight,
            w=photo.clientWidth,
            h=photo.clientHeight;
        var data={
            L:{
                x:[-w/3,W/2-w],
                y:[-h/4,H-h/2],
            },
            R:{
                x:[W/2+w/3,W-w/2],
                y:[-h/4,H-h/2],
            },
        }
        return data;
    }


    function transImg(obj)
    {
        if(hasClass(obj,'center'))
        {
            if(num[num.length-1]==obj.id[obj.id.length-1])
            {
                if(hasClass(obj,'back'))
                {
                    $(obj).removeClass('back');
                    $(obj).addClass("front");
                }
                else
                {
                    $(obj).removeClass('front');
                    $(obj).addClass("back");
                }
            }
            else
            {
                $(obj).removeClass("back");
                $(obj).addClass("front");
            }
        }
        else
            $(obj).addClass('center');
    }

    var aImg=M('.photo_i');
    function clearClass(obj)
    {
        for(var i=0;i<aImg.length;i++)
        {
            if(hasClass(aImg[i],'center'))
                $(aImg[i]).removeClass('center');
            if(hasClass(aImg[i],'back'))
                $(aImg[i]).removeClass('back');
        }
        obj.style=null;
    }
}