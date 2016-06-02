function touchMove() {
    var main = document.querySelector("#main");
    var oLis = document.querySelectorAll("#main>ul>li");
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var desW = 640;
    var desH = 1008;
    //缩放原理
    if (winW / winH <= desW / desH) {
        main.style.webkitTransform = "scale(" + winH / desH + ")";
    } else {
        main.style.webkitTransform = "scale(" + winW / desW + ")";
    }

    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);
    })

    function start(e) {
        this.startX = e.changedTouches[0].pageX;
        this.startY = e.changedTouches[0].pageY;
        this.startTime = +new Date();
    }

    function move(e) {
        e.preventDefault();
        this.style.webkitTransition = "";
        var moveTime = +new Date();
        e.preventDefault();
        if (moveTime - this.startTime > 30) {
            var moveY = e.changedTouches[0].pageY;
            var moveX = e.changedTouches[0].pageX;
            var movePos = moveY - this.startY;
            var movePosX = moveX - this.startX;
            if (Math.abs(movePos) > Math.abs(movePosX)) {
                this.flag = true;
                var index = this.index;
                [].forEach.call(oLis, function () {
                    var oLi = arguments[0];
                    if (arguments[1] != index) {
                        oLi.style.display = "none";
                    }
                    oLi.className = "";
                })
                if (movePos > 0) {//下
                    this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
                    var duration = -desH / 2 + movePos;
                } else if (movePos < 0) {//上
                    this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
                    var duration = desH / 2 + movePos;
                }
                oLis[this.prevsIndex].className = "zIndex";
                oLis[this.prevsIndex].style.display = "block";
                oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";
                oLis[index].style.webkitTransform = "scale(" + (1 - Math.abs(movePos) / desH) + ") translate(0," + movePos + "px)";
            }

        }
    }

    function end() {
        if (this.flag) {
            oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";

            oLis[this.prevsIndex].style.webkitTransition = "0.7s";
            var index = this.index;
            oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
                oLis[index].style.webkitTransform = "translate(0,0)";
            })
            this.flag = false;
        }

    }
}
touchMove();