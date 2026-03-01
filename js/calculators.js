/* ============================================
   FLINT PERFORMANCE — Calculator Functions
   ============================================ */

// --- Utility Helpers ---

function getUnitSystem(panelId) {
  var panel = document.getElementById('calc-' + panelId);
  if (!panel) return 'imperial';
  var activeBtn = panel.querySelector('.unit-btn.active');
  return activeBtn ? activeBtn.dataset.unit : 'imperial';
}

function feetInchesToCm(feet, inches) {
  return ((feet * 12) + inches) * 2.54;
}

function lbsToKg(lbs) {
  return lbs * 0.453592;
}

function inchesToCm(inches) {
  return inches * 2.54;
}

function showResult(elementId, html) {
  var el = document.getElementById(elementId);
  el.innerHTML = html;
  el.classList.add('show');
}

function validateInputs(ids) {
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (!el) return false;
    var val = parseFloat(el.value);
    if (isNaN(val) || val <= 0) return false;
  }
  return true;
}

// --- BMI Calculator ---

function calculateBMI() {
  var unit = getUnitSystem('bmi');
  var heightCm, weightKg;

  if (unit === 'imperial') {
    var feet = parseFloat(document.getElementById('bmi-feet').value);
    var inches = parseFloat(document.getElementById('bmi-inches').value) || 0;
    var weight = parseFloat(document.getElementById('bmi-weight').value);
    if (isNaN(feet) || isNaN(weight) || feet <= 0 || weight <= 0) {
      showResult('bmi-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
    heightCm = feetInchesToCm(feet, inches);
    weightKg = lbsToKg(weight);
  } else {
    var cm = parseFloat(document.getElementById('bmi-cm').value);
    var weight = parseFloat(document.getElementById('bmi-weight').value);
    if (isNaN(cm) || isNaN(weight) || cm <= 0 || weight <= 0) {
      showResult('bmi-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
    heightCm = cm;
    weightKg = weight;
  }

  var heightM = heightCm / 100;
  var bmi = weightKg / (heightM * heightM);
  var category, catClass;

  if (bmi < 18.5) {
    category = 'Underweight';
    catClass = 'cat-under';
  } else if (bmi < 25) {
    category = 'Normal';
    catClass = 'cat-normal';
  } else if (bmi < 30) {
    category = 'Overweight';
    catClass = 'cat-over';
  } else {
    category = 'Obese';
    catClass = 'cat-obese';
  }

  var html = '<div class="result-main">' +
    '<p class="result-label">Your BMI</p>' +
    '<p class="result-value">' + bmi.toFixed(1) + '</p>' +
    '<span class="result-category ' + catClass + '">' + category + '</span>' +
  '</div>' +
  '<div class="result-details">' +
    '<div class="result-detail-item"><p class="result-detail-label">Underweight</p><p class="result-detail-value">&lt; 18.5</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Normal</p><p class="result-detail-value">18.5 - 24.9</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Overweight</p><p class="result-detail-value">25 - 29.9</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Obese</p><p class="result-detail-value">30+</p></div>' +
  '</div>';

  showResult('bmi-result', html);
}

// --- FFMI Calculator ---

function calculateFFMI() {
  var unit = getUnitSystem('ffmi');
  var heightCm, weightKg;

  if (unit === 'imperial') {
    var feet = parseFloat(document.getElementById('ffmi-feet').value);
    var inches = parseFloat(document.getElementById('ffmi-inches').value) || 0;
    var weight = parseFloat(document.getElementById('ffmi-weight').value);
    if (isNaN(feet) || isNaN(weight) || feet <= 0 || weight <= 0) {
      showResult('ffmi-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
    heightCm = feetInchesToCm(feet, inches);
    weightKg = lbsToKg(weight);
  } else {
    var cm = parseFloat(document.getElementById('ffmi-cm').value);
    var weight = parseFloat(document.getElementById('ffmi-weight').value);
    if (isNaN(cm) || isNaN(weight) || cm <= 0 || weight <= 0) {
      showResult('ffmi-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
    heightCm = cm;
    weightKg = weight;
  }

  var bf = parseFloat(document.getElementById('ffmi-bf').value);
  if (isNaN(bf) || bf <= 0 || bf >= 100) {
    showResult('ffmi-result', '<div class="result-main"><p class="text-danger">Please enter a valid body fat percentage.</p></div>');
    return;
  }

  var heightM = heightCm / 100;
  var fatFreeMass = weightKg * (1 - bf / 100);
  var ffmi = fatFreeMass / (heightM * heightM);
  var adjustedFFMI = ffmi + (6.1 * (1.8 - heightM));

  var category, catClass;
  if (adjustedFFMI < 18) {
    category = 'Below Average';
    catClass = 'cat-under';
  } else if (adjustedFFMI < 20) {
    category = 'Average';
    catClass = 'cat-normal';
  } else if (adjustedFFMI < 22) {
    category = 'Above Average';
    catClass = 'cat-normal';
  } else if (adjustedFFMI < 25) {
    category = 'Excellent';
    catClass = 'cat-over';
  } else {
    category = 'Superior / Suspect';
    catClass = 'cat-obese';
  }

  var html = '<div class="result-main">' +
    '<p class="result-label">Your Adjusted FFMI</p>' +
    '<p class="result-value">' + adjustedFFMI.toFixed(1) + '</p>' +
    '<span class="result-category ' + catClass + '">' + category + '</span>' +
  '</div>' +
  '<div class="result-details">' +
    '<div class="result-detail-item"><p class="result-detail-label">FFMI</p><p class="result-detail-value accent">' + ffmi.toFixed(1) + '</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Fat-Free Mass</p><p class="result-detail-value">' + fatFreeMass.toFixed(1) + ' kg</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Fat Mass</p><p class="result-detail-value">' + (weightKg - fatFreeMass).toFixed(1) + ' kg</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Natural Limit</p><p class="result-detail-value">~25</p></div>' +
  '</div>' +
  '<p class="info-note mt-1">An adjusted FFMI of 25 is generally considered the upper limit of natural muscle development for men. Values above 25 may indicate exceptional genetics or pharmaceutical assistance.</p>';

  showResult('ffmi-result', html);
}

// --- TDEE Calculator ---

function calculateTDEE() {
  var unit = getUnitSystem('tdee');
  var heightCm, weightKg;

  if (unit === 'imperial') {
    var feet = parseFloat(document.getElementById('tdee-feet').value);
    var inches = parseFloat(document.getElementById('tdee-inches').value) || 0;
    var weight = parseFloat(document.getElementById('tdee-weight').value);
    if (isNaN(feet) || isNaN(weight) || feet <= 0 || weight <= 0) {
      showResult('tdee-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
    heightCm = feetInchesToCm(feet, inches);
    weightKg = lbsToKg(weight);
  } else {
    heightCm = parseFloat(document.getElementById('tdee-cm').value);
    weightKg = parseFloat(document.getElementById('tdee-weight').value);
    if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
      showResult('tdee-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
  }

  var sex = document.getElementById('tdee-sex').value;
  var age = parseFloat(document.getElementById('tdee-age').value);
  var activity = parseFloat(document.getElementById('tdee-activity').value);

  if (isNaN(age) || age <= 0) {
    showResult('tdee-result', '<div class="result-main"><p class="text-danger">Please enter your age.</p></div>');
    return;
  }

  // Mifflin-St Jeor equation
  var bmr;
  if (sex === 'male') {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }

  var tdee = bmr * activity;

  // Macro ratio breakdown
  var ratioSelect = document.getElementById('tdee-macro-ratio');
  var ratioKey = ratioSelect ? ratioSelect.value : 'balanced';

  var macroRatios = {
    'balanced':      { carb: 40, protein: 30, fat: 30, label: 'Balanced' },
    'high-protein':  { carb: 35, protein: 40, fat: 25, label: 'High Protein' },
    'low-carb':      { carb: 20, protein: 40, fat: 40, label: 'Low Carb' },
    'low-fat':       { carb: 50, protein: 30, fat: 20, label: 'Low Fat' },
    'keto':          { carb: 5,  protein: 30, fat: 65, label: 'Keto' },
    'zone':          { carb: 40, protein: 30, fat: 30, label: 'Zone Diet' }
  };

  var ratio = macroRatios[ratioKey] || macroRatios['balanced'];
  var proteinGrams = Math.round((tdee * ratio.protein / 100) / 4);
  var carbGrams = Math.round((tdee * ratio.carb / 100) / 4);
  var fatGrams = Math.round((tdee * ratio.fat / 100) / 9);
  var maxGrams = Math.max(proteinGrams, carbGrams, fatGrams);

  var html = '<div class="result-main">' +
    '<p class="result-label">Your TDEE</p>' +
    '<p class="result-value">' + Math.round(tdee) + '<span class="result-unit">cal/day</span></p>' +
  '</div>' +
  '<div class="result-details">' +
    '<div class="result-detail-item"><p class="result-detail-label">BMR</p><p class="result-detail-value accent">' + Math.round(bmr) + '</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Fat Loss</p><p class="result-detail-value">' + Math.round(tdee - 500) + '</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Maintain</p><p class="result-detail-value">' + Math.round(tdee) + '</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Lean Bulk</p><p class="result-detail-value">' + Math.round(tdee + 300) + '</p></div>' +
  '</div>' +
  '<div class="macro-section mt-2">' +
    '<p class="macro-section-title">Macro Breakdown &middot; ' + ratio.label + '</p>' +
    '<div class="macro-bar">' +
      '<div class="macro-bar-header"><span class="macro-bar-name">Protein (' + ratio.protein + '%)</span><span class="macro-bar-value">' + proteinGrams + 'g &middot; ' + Math.round(tdee * ratio.protein / 100) + ' cal</span></div>' +
      '<div class="result-bar"><div class="result-bar-fill protein" style="width: ' + (proteinGrams / maxGrams * 100) + '%"></div></div>' +
    '</div>' +
    '<div class="macro-bar">' +
      '<div class="macro-bar-header"><span class="macro-bar-name">Carbs (' + ratio.carb + '%)</span><span class="macro-bar-value">' + carbGrams + 'g &middot; ' + Math.round(tdee * ratio.carb / 100) + ' cal</span></div>' +
      '<div class="result-bar"><div class="result-bar-fill carbs" style="width: ' + (carbGrams / maxGrams * 100) + '%"></div></div>' +
    '</div>' +
    '<div class="macro-bar">' +
      '<div class="macro-bar-header"><span class="macro-bar-name">Fat (' + ratio.fat + '%)</span><span class="macro-bar-value">' + fatGrams + 'g &middot; ' + Math.round(tdee * ratio.fat / 100) + ' cal</span></div>' +
      '<div class="result-bar"><div class="result-bar-fill fat" style="width: ' + (fatGrams / maxGrams * 100) + '%"></div></div>' +
    '</div>' +
  '</div>' +
  '<p class="info-note mt-1">Calculated using the Mifflin-St Jeor equation. Macro grams are based on your selected ratio applied to your TDEE. Adjust the ratio above to see different splits.</p>';

  showResult('tdee-result', html);
}

// --- 1 Rep Max Calculator ---

function calculateOneRepMax() {
  var weight = parseFloat(document.getElementById('orm-weight').value);
  var reps = parseInt(document.getElementById('orm-reps').value);

  if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0) {
    showResult('orm-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
    return;
  }

  if (reps === 1) {
    showResult('orm-result', '<div class="result-main"><p class="text-danger">You already did 1 rep — that\'s your 1RM!</p></div>');
    return;
  }

  // Epley formula
  var epley = weight * (1 + reps / 30);
  // Brzycki formula
  var brzycki = weight * (36 / (37 - reps));
  // Lombardi
  var lombardi = weight * Math.pow(reps, 0.1);
  // Average
  var avg = (epley + brzycki + lombardi) / 3;

  // Build percentage table
  var percentages = [
    { pct: 100, reps: '1', label: '1RM' },
    { pct: 95, reps: '2', label: '95%' },
    { pct: 90, reps: '3-4', label: '90%' },
    { pct: 85, reps: '5-6', label: '85%' },
    { pct: 80, reps: '7-8', label: '80%' },
    { pct: 75, reps: '9-10', label: '75%' },
    { pct: 70, reps: '11-12', label: '70%' },
    { pct: 65, reps: '13-15', label: '65%' },
    { pct: 60, reps: '16-20', label: '60%' },
  ];

  var tableRows = '';
  for (var i = 0; i < percentages.length; i++) {
    var p = percentages[i];
    var w = Math.round(avg * p.pct / 100);
    tableRows += '<tr><td>' + p.label + '</td><td>' + p.reps + '</td><td>' + w + ' lbs</td></tr>';
  }

  var html = '<div class="result-main">' +
    '<p class="result-label">Estimated 1 Rep Max</p>' +
    '<p class="result-value">' + Math.round(avg) + '<span class="result-unit">lbs</span></p>' +
  '</div>' +
  '<div class="result-details mb-2">' +
    '<div class="result-detail-item"><p class="result-detail-label">Epley</p><p class="result-detail-value accent">' + Math.round(epley) + '</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Brzycki</p><p class="result-detail-value accent">' + Math.round(brzycki) + '</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Lombardi</p><p class="result-detail-value accent">' + Math.round(lombardi) + '</p></div>' +
  '</div>' +
  '<table class="rep-max-table">' +
    '<thead><tr><th>% of 1RM</th><th>Est. Reps</th><th>Weight</th></tr></thead>' +
    '<tbody>' + tableRows + '</tbody>' +
  '</table>';

  showResult('orm-result', html);
}

// --- Wilks Score Calculator ---

function calculateWilks() {
  var sex = document.getElementById('wilks-sex').value;
  var bwLbs = parseFloat(document.getElementById('wilks-bw').value);
  var totalLbs = parseFloat(document.getElementById('wilks-total').value);

  if (isNaN(bwLbs) || isNaN(totalLbs) || bwLbs <= 0 || totalLbs <= 0) {
    showResult('wilks-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
    return;
  }

  var bwKg = lbsToKg(bwLbs);
  var totalKg = lbsToKg(totalLbs);

  // Wilks coefficients
  var a, b, c, d, e, f;
  if (sex === 'male') {
    a = -216.0475144;
    b = 16.2606339;
    c = -0.002388645;
    d = -0.00113732;
    e = 7.01863e-06;
    f = -1.291e-08;
  } else {
    a = 594.31747775582;
    b = -27.23842536447;
    c = 0.82112226871;
    d = -0.00930733913;
    e = 4.731582e-05;
    f = -9.054e-08;
  }

  var x = bwKg;
  var coeff = 500 / (a + b * x + c * x * x + d * x * x * x + e * x * x * x * x + f * x * x * x * x * x);
  var wilks = totalKg * coeff;

  var rating;
  if (wilks < 200) rating = 'Beginner';
  else if (wilks < 300) rating = 'Intermediate';
  else if (wilks < 400) rating = 'Advanced';
  else if (wilks < 500) rating = 'Elite';
  else rating = 'World Class';

  var html = '<div class="result-main">' +
    '<p class="result-label">Your Wilks Score</p>' +
    '<p class="result-value">' + wilks.toFixed(1) + '</p>' +
    '<span class="result-category cat-normal">' + rating + '</span>' +
  '</div>' +
  '<div class="result-details">' +
    '<div class="result-detail-item"><p class="result-detail-label">Body Weight</p><p class="result-detail-value">' + bwKg.toFixed(1) + ' kg</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Total</p><p class="result-detail-value">' + totalKg.toFixed(1) + ' kg</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Coefficient</p><p class="result-detail-value accent">' + coeff.toFixed(4) + '</p></div>' +
  '</div>' +
  '<div class="result-details mt-1">' +
    '<div class="result-detail-item"><p class="result-detail-label">Beginner</p><p class="result-detail-value">&lt; 200</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Intermediate</p><p class="result-detail-value">200-300</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Advanced</p><p class="result-detail-value">300-400</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Elite</p><p class="result-detail-value">400-500</p></div>' +
  '</div>';

  showResult('wilks-result', html);
}

