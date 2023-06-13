import React from 'react';
import './Donut.css';
import './computer_pixel-7.ttf';

class AnotherDonut extends React.Component {
  componentDidMount() {
    this.spin();
  }

  componentWillUnmount() {
    clearInterval(this.tmr1);
  }

  spin = () => {
    var tmr1 = undefined;
    var A = 1,
      B = 1;
    var i;

    var asciiframe = function () {
      var b = [];
      var z = [];
      var width = 80;
      var height = 22;

      A += 0.07;
      B += 0.03;
      var cA = Math.cos(A),
        sA = Math.sin(A),
        cB = Math.cos(B),
        sB = Math.sin(B);
      for (var k = 0; k < width * height; k++) {
        b[k] = k % width === width - 1 ? '\n' : ' ';
        z[k] = 0;
      }
      for (var j = 0; j < 6.28; j += 0.07) {
        var ct = Math.cos(j),
          st = Math.sin(j);
        for (i = 0; i < 6.28; i += 0.02) {
          var sp = Math.sin(i),
            cp = Math.cos(i),
            h = ct + 2,
            D = 1 / (sp * h * sA + st * cA + 5),
            t = sp * h * cA - st * sA;

          var x = 0 | ((width / 2) + 30 * D * (cp * h * cB - t * sB)),
            y = 0 | ((height / 2) + 15 * D * (cp * h * sB + t * cB)),
            o = x + width * y,
            N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
          if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
            z[o] = D;
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }
      console.clear();
      console.log(b.join(''));
    };

    this.tmr1 = setInterval(asciiframe, 51);
  };

  handleClick = () => {
    this.spin();
  };

  render() {
    return (
      <div className="donut-frame">
        <button id="toggle-btn" onClick={this.handleClick}>
          DONUT PLEASE
        </button>
      </div>
    );
  }
}

export default AnotherDonut;
