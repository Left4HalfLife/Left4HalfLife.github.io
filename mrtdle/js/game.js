
SVG.on(document, 'DOMContentLoaded', function() {
    var draw = SVG().addTo('#game').size('100%', '100%')

    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(width,height)

    circlePath = draw.path('M 150 75 a 75,75 0 1,1 -150,0 a 75,75 0 1,1 150,0')
            .fill('none')
            .stroke({ width: 5, color: 'orange' });

        // Get the length of the path
        const length = circlePath.length();

        // Set the stroke-dasharray and stroke-dashoffset for the animation
        circlePath.attr({ 'stroke-dasharray': length, 'stroke-dashoffset': length });

        // Perform the animation
        circlePath.animate(1000, '<>').attr({ 'stroke-dashoffset': 0 });

        circlePath.move(300,100)
        circlePath.transform({rotate:-90})
  })