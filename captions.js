/* Caption on/off buttons for videos with custom controls.
   A button with [data-captions-toggle] controls the first captions
   track of the video in the same media block. Captions start on. */
(function () {
  document.querySelectorAll('[data-captions-toggle]').forEach(function (btn) {
    var box = btn.closest('[class*="__media"], .video-wrap, section');
    var video = box && box.querySelector('video');
    if (!video) return;
    function track() {
      for (var i = 0; i < video.textTracks.length; i++) {
        var t = video.textTracks[i];
        if (t.kind === 'captions' || t.kind === 'subtitles') return t;
      }
      return null;
    }
    function set(on) {
      var t = track(); if (!t) return;
      t.mode = on ? 'showing' : 'hidden';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? 'CC On' : 'CC Off';
      btn.setAttribute('aria-label', on ? 'Turn captions off' : 'Turn captions on');
    }
    set(true);
    video.textTracks.addEventListener && video.textTracks.addEventListener('addtrack', function () { set(btn.getAttribute('aria-pressed') === 'true'); });
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-pressed') !== 'true'); });
  });
})();
