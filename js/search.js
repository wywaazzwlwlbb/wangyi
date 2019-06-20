function Search(){
        // 1.选择元素
        this.txt = document.querySelector("input");
        this.ul = document.querySelector("ul");
        // 4.定义接口
        this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
        console.log(this.url)
        // 8.设置index的初始值
        this.index = -1;

        // 2.准备绑定事件
        this.init();
    }
    Search.prototype.init = function(){
        var that = this;
        // 2-1.绑定事件
        this.txt.onkeyup = function(eve){
            var e = eve || window.event;
            var code = e.keycode || e.which;
            // console.log(this.value)
            // 3-1.拿到输入的文本
            that.value = this.value;
            console.log(that.value)
            // 3-2.准备开启请求
            if(code != 38 && code != 40 && code != 13){
                console.log(1)
                that.load();
            }
        }
        // 17.当输入框失去焦点,清空下拉菜单,重置index,准备下次效果
        this.txt.onblur = function(){
            that.ul.innerHTML = "";
            that.index = -1;
        }
        // 给txt加键盘事件找到上下键
        // 触发事件时，改变索引
        // 根据索引改变元素的当前项
        // 找到回车键，根据索引找到当前元素的内容，设置给输入框，下拉菜单消失

        // 12.绑定键盘事件
        this.txt.onkeydown = function(eve){
            var e = eve || window.event;
            var code = e.keycode || e.which;
            // 12-1.找到上\下\回车键
            if(code == 38){
                // 13-1.修改index
                if(that.index == -1 || that.index == 0){
                    that.index = that.ul.children.length-1;
                }else{
                    that.index--
                }
                // 14-1.准备设置当前项
                that.active()
            }
            if(code == 40){
                // 13-2.修改index
                if(that.index == that.ul.children.length-1){
                    that.index = 0;
                }else{
                    that.index++
                }
                // 14-2.准备设置当前项
                that.active()
            }
            // 16.回车的事件:让输入框失去焦点
            if(code == 13){
                that.txt.blur()
            }
        }
    }
    Search.prototype.load = function(){
        var that = this;
        // 3-3.开启请求
        jsonp(this.url,{
            // 5.发送数据
            wd:this.value,
            cb:"adasd",
            callbackNameColumns:"cb"
        }).then(function(res){
            // 6-1.请求成功，拿到数据
            that.data = res.s;
            // 6-2.准备渲染页面
            that.display()
        })
    }
    Search.prototype.display = function(){
        // 6-3.渲染页面
        var str = "";
        for(var i=0;i<this.data.length;i++){
            str += `<li abc="${i}">${this.data[i]}</li>`;
        }
        this.ul.innerHTML = str;
        console.log(str);
        // 7.准备做li的事件委托
        this.eveEnt()
    }
    // 选择元素li的页面上现有的共同父级，准备做鼠标事件委托
    // 绑定鼠标进入离开事件
    // 计算索引
    // 根据索引改变元素的当前项
    // 委托点击事件
    // 找到当前元素的内容设置给输入框，同时下拉菜单消失
    Search.prototype.eveEnt = function(){
        var that = this;
        // 7-1.li的事件委托
        this.ul.onmouseover = function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "LI"){
                // 9.修改index
                that.index = target.getAttribute("abc");
                // 10.准备修改当前项
                that.active()
            }
        }
        // 11.鼠标离开的事件委托,清除当前项
        this.ul.onmouseout = function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "LI"){
                target.style.background = "";
            }
        }
    }
    Search.prototype.active = function(){
        // 10-1.修改当前项
        // 15.设置当前项
        for(var i=0;i<this.ul.children.length;i++){
            this.ul.children[i].style.background = "";
        }
        this.ul.children[this.index].style.background = "#fff";
        this.txt.value = this.ul.children[this.index].innerHTML
    }
    


    new Search();