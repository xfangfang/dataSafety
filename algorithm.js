
function vigeneer(strin,key,encode){
    let input=strin.toUpperCase()
    let password = key.toUpperCase()
    let A = 65
    let output = ""
    for (var char in input) {
        let inc = input.charCodeAt(char)-A;
        let start = (password.charCodeAt(char%password.length)-A)
        if (encode) {
            var ans = String.fromCharCode((start+inc)%26+A)
        } else {
            var ans = inc-start
            ans = ans<0?ans+26:ans
            ans = String.fromCharCode((ans)%26+A)
        }
        output += ans
    }
    return output
}
/**
*nope 为未使用参数，统一样式使测试更加方便
*/
function twoPath(strin,nope,encode){
    let a = strin.replace(/\s/g, "").split("")
    if(encode){
        return a.reduce((acc,value,index) => index%2?acc:acc+value ,"") +
        a.reduce((acc,value,index) => index%2?acc+value:acc ,"")
    }else{
        let ans = new Array();
        for (var i = 0; i < a.length; i++) {
            if(i < a.length/2){
                ans[i+i] = a[i]
            }
            else {
                ans[i+i-a.length+!(a.length%2)] = a[i]
            }
        }
        ans = ans.join("")
        return ans
    }

}

//将相同的密钥去掉了，多余补#
function keyControl(strin,key,encode){
    let a = strin.replace(/\s/g, "").split("")
    let b = key.replace(/\s/g, "").split("")

    //check key
    b = Array.from(new Set(b))


    //创建矩阵
    let c = new Array()
    let len = Math.ceil(a.length/b.length)
    for (let i = 0; i < len; i++) {
        c[i] = new Array()
    }
    //密钥的一个字符
    function KeyChar(index,char){
        let obj = new Object();
        obj.index = index
        obj.char = char
        obj.rindex = index
        return obj
    }
    //填充矩阵
    let x=0,y=0;
    for (let i = 1; i <= a.length; i++) {
        c[x][y] = a[i-1]
        if(encode){
            y++
            if(i%b.length==0){
                x++
                y=0
            }
        }else{
            x++
            if(i%len==0){
                x=0
                y++
            }
        }

    }


    //生成keys
    let keys = new Array()
    for(let i=0;i<b.length;i++){
        keys[i] = KeyChar(i,b[i])
    }

    keys.sort(function(a, b){
        return a.char > b.char
    });
    if(!encode){
        for (let i=0;i<keys.length;i++) {
            keys[i].rindex = i
        }
        keys.sort(function(a, b){
            return a.index > b.index
        });
    }


    let ans = ""
    if(encode){
        for(let i=0;i<keys.length;i++){
            for(let j=0;j<len;j++){
                if(c[j][keys[i].index]){
                    ans += c[j][keys[i].index]
                }else{
                    ans += '#'
                }
            }
        }
    }else{
        for(let i=0;i<len;i++){
            for(let j=0;j<b.length;j++){
                if(c[i][keys[j].rindex]){
                    ans += c[i][keys[j].rindex]
                }else{
                    ans += '#'
                }
            }
        }
    }

    return ans
}
