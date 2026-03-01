/* ============================================
   FLINT PERFORMANCE — App Controller
   Navigation, unit toggling, and interactivity
   ============================================ */

(function () {
  'use strict';

  // --- Calculator Navigation ---

  var navBtns = document.querySelectorAll('.calc-nav-btn');
  var panels = document.querySelectorAll('.calc-panel');

  navBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetCalc = btn.dataset.calc;

      // Update active nav button
      navBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Update active panel
      panels.forEach(function (p) { p.classList.remove('active'); });
      var targetPanel = document.getElementById('calc-' + targetCalc);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      // Scroll nav button into view on mobile
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // --- Unit Toggle System ---

  document.querySelectorAll('.unit-toggle').forEach(function (toggle) {
    var panel = toggle.closest('.calc-panel');
    var unitBtns = toggle.querySelectorAll('.unit-btn');

    unitBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var unit = btn.dataset.unit;

        // Update active button
        unitBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Show/hide imperial vs metric fields
        var imperialFields = panel.querySelectorAll('.imperial-fields');
        var metricFields = panel.querySelectorAll('.metric-fields');

        if (unit === 'metric') {
          imperialFields.forEach(function (f) { f.style.display = 'none'; });
          metricFields.forEach(function (f) { f.style.display = 'block'; });
        } else {
          imperialFields.forEach(function (f) { f.style.display = 'block'; });
          metricFields.forEach(function (f) { f.style.display = 'none'; });
        }

        // Update weight unit labels
        var weightUnits = panel.querySelectorAll('.dynamic-weight-unit');
        weightUnits.forEach(function (el) {
          el.textContent = unit === 'metric' ? 'kg' : 'lbs';
        });

        // Update length unit labels (for body fat calculator)
        var lengthUnits = panel.querySelectorAll('.dynamic-length-unit');
        lengthUnits.forEach(function (el) {
          el.textContent = unit === 'metric' ? 'cm' : 'in';
        });

        // Hide result when switching units
        var result = panel.querySelector('.calc-result');
        if (result) {
          result.classList.remove('show');
        }
      });
    });
  });

  // --- Keyboard support: Enter to calculate ---

  document.querySelectorAll('.calc-panel').forEach(function (panel) {
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var calcBtn = panel.querySelector('.calc-btn');
        if (calcBtn) {
          calcBtn.click();
        }
      }
    });
  });

})();
