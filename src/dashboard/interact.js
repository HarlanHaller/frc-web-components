import interact from 'interactjs';

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

export function removeInteraction(womNode) {
  interact(womNode.getNode()).unset();
}

export function addInteraction(wom, womNode) {

  const metadata = womNode.getMetadata() || {};
  const resizable = metadata.resizable || { 
    left: true, right: true, bottom: true, top: true
  };
  const movable = 'movable' in metadata ? metadata.movable : true;
  const minSize = metadata.minSize || { width: 20, height: 20 };

  const interactive = interact(womNode.getNode());

  interactive.resizable({
    // resize from all edges and corners
    edges: resizable,
    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        if (resizable.left || resizable.right) {
          target.style.width = event.rect.width + 'px';
        }
        if (resizable.top || resizable.bottom) {
          target.style.height = event.rect.height + 'px';
        }

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      },
      end: async () => {
        wom.history.push(await wom.getHtml());
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: minSize
      })
    ],

    inertia: true
  });
    
  if (movable) {
    interactive.draggable({
      listeners: { 
        move: dragMoveListener,
        end: async () => {
          wom.history.push(await wom.getHtml());
        }
      },
      inertia: true,
    });
  }
}
