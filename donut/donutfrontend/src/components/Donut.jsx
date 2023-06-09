import React, { useEffect } from 'react';
import * as math from 'mathjs';
import * as colorsys from 'colorsys';

export default function Donut() {
  useEffect(() => {
    const canvas = document.getElementById('donut-canvas');
    const ctx = canvas.getContext('2d');

    const width = 800;
    const height = 600;
    const x_offset = width / 2;
    const y_offset = height / 2;
    const chars = '.,-~:;=!*#$@';
    let hue = 0;

    const renderDonut = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const theta_spacing = 10;
      const phi_spacing = 1;

      const donut = [];
      for (let i = 0; i < width * height; i++) {
        donut[i] = 0;
      }

      for (let j = 0; j < math.pi * 2; j += theta_spacing) {
        for (let i = 0; i < math.pi * 2; i += phi_spacing) {
          const sinI = math.sin(i);
          const cosJ = math.cos(j);
          const sinA = math.sin(A);
          const sinJ = math.sin(j);
          const cosA = math.cos(A);
          const cosJ2 = cosJ + 2;
          const denominator = 1 / (sinI * cosJ2 * sinA + sinJ * cosA + 5);
          const cosI = math.cos(i);
          const cosB = math.cos(B);
          const sinB = math.sin(B);
          const temp1 = sinI * cosJ2 * cosA - sinJ * sinA;
          const x = x_offset + 40 * denominator * (cosI * cosJ2 * cosB - temp1 * sinB);
          const y = y_offset + 20 * denominator * (cosI * cosJ2 * sinB + temp1 * cosB);
          const z = x + width * y;
          const luminanceIndex = math.round(
            8 * ((sinJ * sinA - sinI * cosJ * cosA) * cosB - sinI * cosJ * sinA - sinJ * cosA - cosI * cosJ * sinB)
          );

          if (y < height && y >= 0 && x >= 0 && x < width && denominator > donut[z]) {
            donut[z] = denominator;
            ctx.fillStyle = colorsys.hsvToRgb(hue, 1, 1);
            ctx.fillText(chars[luminanceIndex > 0 ? luminanceIndex : 0], x, y);
          }
        }
      }

      A += 0.04;
      B += 0.02;
      hue += 0.005;

    //   requestAnimationFrame(renderDonut);
    };

    let A = 0;
    let B = 0;
    renderDonut();
  }, []);

  return <canvas id="donut-canvas" width="800" height="600"></canvas>;
};


