import React from 'react';
import './Donut.css';
import './computer_pixel-7.ttf'

class Donut extends React.Component {
    render() {
        return (
            <div className="donut-frame">
                <button id='toggle-btn' onClick={this.handleClick}>DONUT PLEASE</button>
                <pre id='ascii'>{}</pre>
            </div>
     // <button id='toggle-btn' onClick={this.handleClick}>DONUT PLEASE</button>       
        )
    }
    handleClick() {
        var togglebtn = document.getElementById('toggle-btn');
        var pretag = document.getElementById('ascii');
        if(togglebtn.style.display !== "none"){
            togglebtn.style.display = "none";
            pretag.style.display = 'block';
            pretag.style.color = 'white';
        }
        spin();
    }
}

// Created by Andy Sloane. https://www.a1k0n.net/2011/07/20/donut-math.html
// Refactored to run in react.
function spin() {
    var pretag = document.getElementById('ascii');
    var tmr1 = undefined;
    var A=1, B=1;
    var i;

    var asciiframe=function() {
        var b=[];
        var z=[];
        var width = 80
        var height = 35

        A += 0.07;
        B += 0.03;
        var cA=Math.cos(A), sA=Math.sin(A),
            cB=Math.cos(B), sB=Math.sin(B);
        for(var k=0;k<width*height;k++) {
            b[k]=k%width === width-1 ? "\n" : " ";
            z[k]=0;
        }
        for(var j=0;j<6.28;j+=0.07) { // j <=> theta
            var ct=Math.cos(j),st=Math.sin(j);
            for(i=0;i<6.28;i+=0.02) {   // i <=> phi
            var sp=Math.sin(i),cp=Math.cos(i),
                h=ct+2, // R1 + R2*cos(theta)
                D=1/(sp*h*sA+st*cA+5), // this is 1/z
                t=sp*h*cA-st*sA; // this is a clever factoring of some of the terms in x' and y'

            var x=0|((width/2)+30*D*(cp*h*cB-t*sB)),
                y=0|((height/2)+15*D*(cp*h*sB+t*cB)),
                o=x+80*y,
                N=0|(8*((st*sA-sp*ct*cA)*cB-sp*ct*sA-st*cA-cp*ct*sB));
            if(y<height && x>=0 && x<width && D>z[o])
            {
                z[o]=D;
                b[o]=".,-~:;=!*#$@"[N>0?N:0];
            }
            }
        }
        pretag.innerHTML = b.join("");
    }

    if(tmr1 === undefined) {
        tmr1 = setInterval(asciiframe, 51);
    } else {
        clearInterval(tmr1);
        tmr1 = undefined;
    }
    asciiframe();
}

export default Donut;
