/* Sends the Curriculum, For Educators and For Schools forms by email
   (same approach as the Contact page) until a form service is connected. */
(function () {
  var EMAIL = 'andrea@maisonglamouretgrace.com';
  var PAGE = (document.title.split('|')[0] || 'Website').trim();
  function labelFor(field) {
    var l = field.id && document.querySelector('label[for="' + field.id + '"]');
    var t = l ? l.textContent : (field.getAttribute('aria-label') || field.name || 'Field');
    return t.replace(/\s+/g, ' ').replace(/\(optional\)/i, '').trim();
  }
  document.querySelectorAll('form[data-email-form]').forEach(function (form) {
    var msg = form.querySelector('.form-message');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var lines = [], who = '';
      form.querySelectorAll('input, select, textarea').forEach(function (f) {
        if (f.type === 'submit' || f.type === 'button' || f.type === 'hidden') return;
        var v = f.type === 'checkbox' ? (f.checked ? 'Yes' : 'No') : (f.value || '').trim();
        if (!v) return;
        var label = labelFor(f);
        if (!who && /organi[sz]ation|school|district/i.test(label)) who = v;
        lines.push(label + ': ' + v);
      });
      if (!who) { var n = form.querySelector('input[type="text"]'); who = n ? n.value.trim() : ''; }
      var subject = 'Future Ready AI inquiry (' + PAGE + ')' + (who ? ' — ' + who : '');
      var body = lines.join('\n') + '\n\nSent from the ' + PAGE + ' page of the Future Ready AI website.';
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (msg) { msg.setAttribute('data-visible', 'true'); msg.setAttribute('tabindex', '-1'); msg.focus(); }
    });
  });
})();
