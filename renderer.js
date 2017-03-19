// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var tracker = new tracking.ColorTracker();

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    var now = Date.now();

    console.log(event);

    event.data.forEach(function(rect) {

      rect.time = now;
      console.log(rect);

      if (rect.color === 'custom') {
        rect.color = tracker.customColor;
      }

      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });
  });

  initGUIControllers(tracker);
};
