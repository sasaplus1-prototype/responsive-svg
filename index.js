(function(){

  'use strict';

  var area = d3.select('#js-svg-frame'),
      size = parseFloat(area.style('width'));

  var pie = d3.layout.pie(),
      arc = d3.svg.arc().outerRadius(size / 2),
      svg = area.select('svg');

  var percentage = 70;

  svg
    .style('width', '100%')
    .style('height', '100%')
    .style('max-height', '100%')
    .attr('viewBox', [0, 0, size, size].join(' '))
    .attr('preserveAspectRatio', 'xMinYMin')
    .selectAll('path')
    .data(
      pie([percentage, 100 - percentage])
    )
    .enter()
    .append('path')
    .attr(
      'transform',
      'translate(' + [size / 2, size / 2].join(',') + ')'
    )
    .style('fill', function(d, i) {
      return (i === 0) ? '#9999ff' : 'transparent'
    })
    .transition()
    .duration(1500)
    .ease('bounce')
    .attrTween('d', function(d, i) {
      var percentageInterpolator = d3.interpolate(0, percentage),
          pieInterpolator = d3.interpolate(
            { startAngle: d.startAngle, endAngle: d.startAngle },
            { startAngle: d.startAngle, endAngle: d.endAngle }
          );

      return function(t) {
        var value = String(Math.floor(percentageInterpolator(t)));

        console.log(value);

        return arc(pieInterpolator(t));
      };
    })
    .each('end', function() {
      console.log('end');
    });

}());
