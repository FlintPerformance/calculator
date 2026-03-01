/* ============================================
   FLINT PERFORMANCE — App Controller
   Tab navigation, shared data sync, unit toggle
   ============================================ */

(function () {
  'use strict';

  // --- Tab Navigation ---

  var tabs = document.querySelectorAll('.tab');
  var screens = document.querySelectorAll('.screen');
  var titleEl = document.getElementById('active-calc-title');

  var tabTitles = {
    'bmi': 'BMI',
    'ffmi': 'FFMI',
    'tdee': 'TDEE',
    'one-rep-max': '1 REP MAX',
    'wilks': 'WILKS'
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetCalc = tab.dataset.calc;

      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      screens.forEach(function (s) { s.classList.remove('active'); });
      var target = document.getElementById('calc-' + targetCalc);
      if (target) target.classList.add('active');

      if (titleEl) titleEl.textContent = tabTitles[targetCalc] || '';
    });
  });

  // --- Shared Data Sync ---
  // Inputs with data-sync="weight" etc. propagate values across all calculators

  var syncKeys = ['weight', 'feet', 'inches', 'cm', 'sex', 'age'];

  syncKeys.forEach(function (key) {
    var fields = document.querySelectorAll('[data-sync="' + key + '"]');
    fields.forEach(function (field) {
      var eventName = field.tagName === 'SELECT' ? 'change' : 'input';
      field.addEventListener(eventName, function () {
        var val = field.value;
        fields.forEach(function (other) {
          if (other !== field) other.value = val;
        });
      });
    });
  });

  // --- Global Unit Toggle Sync ---
  // When you switch units on one calculator, all calculators switch

  document.querySelectorAll('.unit-toggle').forEach(function (toggle) {
    var unitBtns = toggle.querySelectorAll('.unit-btn');

    unitBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var unit = btn.dataset.unit;

        // Sync ALL unit toggles across all screens
        document.querySelectorAll('.unit-toggle').forEach(function (otherToggle) {
          otherToggle.querySelectorAll('.unit-btn').forEach(function (b) {
            b.classList.toggle('active', b.dataset.unit === unit);
          });
        });

        // Show/hide imperial vs metric fields in ALL screens
        document.querySelectorAll('.screen').forEach(function (screen) {
          var imperialFields = screen.querySelectorAll('.imperial-fields');
          var metricFields = screen.querySelectorAll('.metric-fields');

          if (unit === 'metric') {
            imperialFields.forEach(function (f) { f.style.display = 'none'; });
            metricFields.forEach(function (f) { f.style.display = 'block'; });
          } else {
            imperialFields.forEach(function (f) { f.style.display = 'block'; });
            metricFields.forEach(function (f) { f.style.display = 'none'; });
          }

          // Update weight unit labels
          screen.querySelectorAll('.dynamic-weight-unit').forEach(function (el) {
            el.textContent = unit === 'metric' ? 'kg' : 'lbs';
          });
        });

        // Collapse any open results
        document.querySelectorAll('.screen-result').forEach(function (r) {
          r.classList.remove('show');
        });
      });
    });
  });

  // --- Keyboard: Enter to calculate ---

  document.querySelectorAll('.screen').forEach(function (screen) {
    screen.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var btn = screen.querySelector('.action-btn');
        if (btn) btn.click();
      }
    });
  });

})();
