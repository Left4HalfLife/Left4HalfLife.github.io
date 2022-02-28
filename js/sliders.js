// Step 1
//import interact from 'interactjs'
const interact = require('interactjs')
const slider = interact('.slider')    // target elements with the "slider" class

slider
  // Step 2
  .draggable({                        // make the element fire drag events
    origin: 'self',                   // (0, 0) will be the element's top-left
    inertia: true,                    // start inertial movement if thrown
    modifiers: [
      interact.modifiers.restrict({
        restriction: 'self'           // keep the drag coords within the element
      })
    ],
    // Step 3
    listeners: {
      move (event) {                  // call this listener on every dragmove
        const sliderWidth = interact.getElementRect(event.target).width
        const value = event.pageX / sliderWidth

        event.target.style.paddingLeft = (value * 100) + '%'
        event.target.setAttribute('data-value', value.toFixed(2))
      }
    }
  })