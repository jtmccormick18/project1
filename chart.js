const ctx = document.getElementById("myChart").getContext('2d');

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.Tooltip.positioners.custom = function(elements, eventPosition) {
    return {
        x: 12,
        y: -7
    }
}
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx = this.chart.ctx,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.scales['y-axis-0'].top,
             bottomY = this.chart.scales['y-axis-0'].bottom;

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 2;
         ctx.strokeStyle = 'rgba(0, 255, 255, .7)';
         ctx.stroke();
         ctx.restore();
      }
   }
});

window.myChart = new Chart(ctx, {
    type: 'LineWithLine',
    data: {
        datasets: [{
            backgroundColor: 'rgba(0, 255, 255, .3)',
            borderColor: 'rgba(0, 255, 255, 1)',
            fill: false,
            borderWidth: 2,
            pointRadius: 0
        }]
    },
    options: {
        tooltips: {
            intersect: false,
            position: 'custom',
            mode: 'index'
        },
        legend: {
            display: false
        },
        title: {
            display: true,
            fontColor: '#f0f0f0',
            fontSize: 18,
        },
        layout: {
            padding: {
                top: 6,
                left: -10
            }
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: true,
                    drawBorder: false
                },
                ticks: {
                    display: false,
                    fontColor: '#f0f0f0'
                }
            }],
            xAxes: [{
                gridLines: {
                    display: true,
                    drawBorder: false
                },
                ticks: {
                    display: false,
                    fontColor: '#f0f0f0'
                }
            }]
        }
    }
})

