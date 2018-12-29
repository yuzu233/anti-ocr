    function $(id) {
        return document.getElementById(id);
    }
    function textToImg() {
        var len = $('len').value || 30;
        var i = 0;
        var fontSize = $('fontSize').value || 15;
        var fontWeight = $('fontWeight').value || 'normal';
        var txt = $("txt").value;
        var canvas = $('canvas');
        if (txt == '') {
            alert('請輸入文字');
            $("txt").focus();
        }
        if (len > txt.length) {
            len = txt.length;
        }
        canvas.width = fontSize * len + 20;
        canvas.height = fontSize * (3 / 2)
                * (Math.ceil(txt.length / len)) + txt.split("\n").length * fontSize;
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = $("backcolor").innerHTML;
        context.fillRect(0,0,canvas.width,canvas.height);
        context.fillStyle = $("fontcolor").innerHTML;
        context.strokeStyle = $("fontcolor").innerHTML;
        
	n = txt.length/5;
        n2 = txt.length * 10;
        for (var i = 0; i < n2; i++) {
            x = random(0,canvas.width);
            y = random(0,canvas.height);
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x+1, y+1);//隨機畫點
            context.closePath();
            context.stroke();
        }
        i = 0;
        for (var i = 0; i < n; i++) {
            x = random(0,canvas.width);
            y = random(0,canvas.height);
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x+random(-random(0,canvas.width/3),random(0,canvas.width/3)), y+random(-random(0,canvas.width/3),random(0,canvas.width/3)));//隨機畫線
            context.closePath();
            context.stroke();
        }
        i = 0;

        context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
        context.textBaseline = 'top';
        canvas.style.display = 'none';
        function fillTxt(text) {
            while (text.length > len) {
                var txtLine = text.substring(0, len);
                text = text.substring(len);
                var r = random(-1,1)/random(50,100);
                context.rotate(r);//隨機旋轉每一行文字
                context.fillText(txtLine, 10, 5 + fontSize * (3 / 2) * i++,
                        canvas.width);
                context.rotate(r * -1);
            }
            context.fillText(text, 0, fontSize * (3 / 2) * i, canvas.width);
        }
        var txtArray = txt.split("\n");
        for ( var j = 0; j < txtArray.length; j++) {
            fillTxt(txtArray[j]);
            context.fillText('\n', 0, fontSize * (3 / 2) * i++, canvas.width);
        }
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var img = $("img");
        img.src = canvas.toDataURL("image/png");
    }
    function changeColor(name) {
        var c = $(name+"_c");
        var ctx = c.getContext("2d");
        var red = $(name+"_red");
        var green = $(name+"_green");
        var blue = $(name+"_blue");
        ctx.fillStyle = "rgb(" + red.value + "," + green.value + ","
                + blue.value + ")";
        $(name).innerHTML = ctx.fillStyle;
        ctx.fillRect(0, 0, 100, 100);
        //$('canvas').getContext('2d').fillStyle=$("fontcolor").innerHTML;
    }
    function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
    }
