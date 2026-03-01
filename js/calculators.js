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
  '<p class="info-note mt-1">Calculated using the Mifflin-St Jeor equation. BMR is your resting metabolic rate — the calories your body needs at complete rest. TDEE factors in your activity level.</p>';

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

// --- Body Fat % Calculator (US Navy Method) ---

function toggleBFFields() {
  var sex = document.getElementById('bf-sex').value;
  var hipGroup = document.querySelector('.bf-hip-group');
  if (sex === 'female') {
    hipGroup.style.display = 'block';
  } else {
    hipGroup.style.display = 'none';
  }
}

function calculateBodyFat() {
  var unit = getUnitSystem('body-fat');
  var sex = document.getElementById('bf-sex').value;
  var heightCm;

  if (unit === 'imperial') {
    var feet = parseFloat(document.getElementById('bf-feet').value);
    var inches = parseFloat(document.getElementById('bf-inches').value) || 0;
    if (isNaN(feet) || feet <= 0) {
      showResult('bf-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
    heightCm = feetInchesToCm(feet, inches);
  } else {
    heightCm = parseFloat(document.getElementById('bf-cm').value);
    if (isNaN(heightCm) || heightCm <= 0) {
      showResult('bf-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
  }

  var neckVal = parseFloat(document.getElementById('bf-neck').value);
  var waistVal = parseFloat(document.getElementById('bf-waist').value);

  if (isNaN(neckVal) || isNaN(waistVal) || neckVal <= 0 || waistVal <= 0) {
    showResult('bf-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
    return;
  }

  // Convert to cm if imperial
  var neckCm = unit === 'imperial' ? inchesToCm(neckVal) : neckVal;
  var waistCm = unit === 'imperial' ? inchesToCm(waistVal) : waistVal;

  var bodyFat;

  if (sex === 'male') {
    // US Navy formula for men
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
  } else {
    var hipVal = parseFloat(document.getElementById('bf-hip').value);
    if (isNaN(hipVal) || hipVal <= 0) {
      showResult('bf-result', '<div class="result-main"><p class="text-danger">Please enter hip circumference (required for women).</p></div>');
      return;
    }
    var hipCm = unit === 'imperial' ? inchesToCm(hipVal) : hipVal;
    // US Navy formula for women
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
  }

  bodyFat = Math.max(2, Math.min(bodyFat, 60));

  var category, catClass;
  if (sex === 'male') {
    if (bodyFat < 6) { category = 'Essential Fat'; catClass = 'cat-under'; }
    else if (bodyFat < 14) { category = 'Athletic'; catClass = 'cat-normal'; }
    else if (bodyFat < 18) { category = 'Fitness'; catClass = 'cat-normal'; }
    else if (bodyFat < 25) { category = 'Average'; catClass = 'cat-over'; }
    else { category = 'Above Average'; catClass = 'cat-obese'; }
  } else {
    if (bodyFat < 14) { category = 'Essential Fat'; catClass = 'cat-under'; }
    else if (bodyFat < 21) { category = 'Athletic'; catClass = 'cat-normal'; }
    else if (bodyFat < 25) { category = 'Fitness'; catClass = 'cat-normal'; }
    else if (bodyFat < 32) { category = 'Average'; catClass = 'cat-over'; }
    else { category = 'Above Average'; catClass = 'cat-obese'; }
  }

  var barWidth = Math.min(bodyFat / (sex === 'male' ? 40 : 50) * 100, 100);

  var html = '<div class="result-main">' +
    '<p class="result-label">Estimated Body Fat</p>' +
    '<p class="result-value">' + bodyFat.toFixed(1) + '<span class="result-unit">%</span></p>' +
    '<span class="result-category ' + catClass + '">' + category + '</span>' +
  '</div>' +
  '<div class="result-bar-wrap">' +
    '<div class="result-bar-label"><span>0%</span><span>' + (sex === 'male' ? '40%' : '50%') + '</span></div>' +
    '<div class="result-bar"><div class="result-bar-fill" style="width: ' + barWidth + '%"></div></div>' +
  '</div>' +
  '<p class="info-note">Estimated using the U.S. Navy circumference method. For more accurate results, consider DEXA scanning or hydrostatic weighing.</p>';

  showResult('bf-result', html);
}

// --- Macro Calculator ---

function calculateMacros() {
  var unit = getUnitSystem('macro');
  var heightCm, weightKg;

  if (unit === 'imperial') {
    var feet = parseFloat(document.getElementById('macro-feet').value);
    var inches = parseFloat(document.getElementById('macro-inches').value) || 0;
    var weight = parseFloat(document.getElementById('macro-weight').value);
    if (isNaN(feet) || isNaN(weight) || feet <= 0 || weight <= 0) {
      showResult('macro-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
    heightCm = feetInchesToCm(feet, inches);
    weightKg = lbsToKg(weight);
  } else {
    heightCm = parseFloat(document.getElementById('macro-cm').value);
    weightKg = parseFloat(document.getElementById('macro-weight').value);
    if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
      showResult('macro-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
  }

  var sex = document.getElementById('macro-sex').value;
  var age = parseFloat(document.getElementById('macro-age').value);
  var activity = parseFloat(document.getElementById('macro-activity').value);
  var goal = document.getElementById('macro-goal').value;

  if (isNaN(age) || age <= 0) {
    showResult('macro-result', '<div class="result-main"><p class="text-danger">Please enter your age.</p></div>');
    return;
  }

  // BMR (Mifflin-St Jeor)
  var bmr;
  if (sex === 'male') {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }

  var tdee = bmr * activity;
  var targetCal;

  if (goal === 'cut') {
    targetCal = tdee - 500;
  } else if (goal === 'bulk') {
    targetCal = tdee + 300;
  } else {
    targetCal = tdee;
  }

  // Macro splits
  var proteinGrams, fatGrams, carbGrams;

  if (goal === 'cut') {
    // High protein for muscle retention
    proteinGrams = weightKg * 2.2; // ~1g per lb
    fatGrams = weightKg * 0.9;
    carbGrams = (targetCal - (proteinGrams * 4) - (fatGrams * 9)) / 4;
  } else if (goal === 'bulk') {
    proteinGrams = weightKg * 2.0;
    fatGrams = weightKg * 0.9;
    carbGrams = (targetCal - (proteinGrams * 4) - (fatGrams * 9)) / 4;
  } else {
    proteinGrams = weightKg * 1.8;
    fatGrams = weightKg * 0.9;
    carbGrams = (targetCal - (proteinGrams * 4) - (fatGrams * 9)) / 4;
  }

  carbGrams = Math.max(carbGrams, 50); // minimum carbs

  var proteinCal = proteinGrams * 4;
  var carbCal = carbGrams * 4;
  var fatCal = fatGrams * 9;
  var totalCal = proteinCal + carbCal + fatCal;

  var proteinPct = Math.round(proteinCal / totalCal * 100);
  var carbPct = Math.round(carbCal / totalCal * 100);
  var fatPct = 100 - proteinPct - carbPct;

  var maxGrams = Math.max(proteinGrams, carbGrams, fatGrams);

  var html = '<div class="result-main">' +
    '<p class="result-label">Daily Calorie Target</p>' +
    '<p class="result-value">' + Math.round(targetCal) + '<span class="result-unit">cal</span></p>' +
  '</div>' +
  '<div class="macro-bar">' +
    '<div class="macro-bar-header"><span class="macro-bar-name">Protein (' + proteinPct + '%)</span><span class="macro-bar-value">' + Math.round(proteinGrams) + 'g &middot; ' + Math.round(proteinCal) + ' cal</span></div>' +
    '<div class="result-bar"><div class="result-bar-fill protein" style="width: ' + (proteinGrams / maxGrams * 100) + '%"></div></div>' +
  '</div>' +
  '<div class="macro-bar">' +
    '<div class="macro-bar-header"><span class="macro-bar-name">Carbs (' + carbPct + '%)</span><span class="macro-bar-value">' + Math.round(carbGrams) + 'g &middot; ' + Math.round(carbCal) + ' cal</span></div>' +
    '<div class="result-bar"><div class="result-bar-fill carbs" style="width: ' + (carbGrams / maxGrams * 100) + '%"></div></div>' +
  '</div>' +
  '<div class="macro-bar">' +
    '<div class="macro-bar-header"><span class="macro-bar-name">Fat (' + fatPct + '%)</span><span class="macro-bar-value">' + Math.round(fatGrams) + 'g &middot; ' + Math.round(fatCal) + ' cal</span></div>' +
    '<div class="result-bar"><div class="result-bar-fill fat" style="width: ' + (fatGrams / maxGrams * 100) + '%"></div></div>' +
  '</div>' +
  '<p class="info-note mt-1">Protein set at ~' + (goal === 'cut' ? '1g' : goal === 'bulk' ? '0.9g' : '0.8g') + '/lb body weight. Adjust based on your training intensity and individual response.</p>';

  showResult('macro-result', html);
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

// --- Calorie Calculator ---

function calculateCalories() {
  var unit = getUnitSystem('calorie');
  var heightCm, weightKg;

  if (unit === 'imperial') {
    var feet = parseFloat(document.getElementById('cal-feet').value);
    var inches = parseFloat(document.getElementById('cal-inches').value) || 0;
    var weight = parseFloat(document.getElementById('cal-weight').value);
    if (isNaN(feet) || isNaN(weight) || feet <= 0 || weight <= 0) {
      showResult('cal-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
    heightCm = feetInchesToCm(feet, inches);
    weightKg = lbsToKg(weight);
  } else {
    heightCm = parseFloat(document.getElementById('cal-cm').value);
    weightKg = parseFloat(document.getElementById('cal-weight').value);
    if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
      showResult('cal-result', '<div class="result-main"><p class="text-danger">Please fill in all required fields.</p></div>');
      return;
    }
  }

  var sex = document.getElementById('cal-sex').value;
  var age = parseFloat(document.getElementById('cal-age').value);
  var activity = parseFloat(document.getElementById('cal-activity').value);
  var goal = document.getElementById('cal-goal').value;

  if (isNaN(age) || age <= 0) {
    showResult('cal-result', '<div class="result-main"><p class="text-danger">Please enter your age.</p></div>');
    return;
  }

  var bmr;
  if (sex === 'male') {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }

  var tdee = bmr * activity;
  var adjustments = {
    'lose-fast': -1000,
    'lose': -500,
    'maintain': 0,
    'gain': 300,
    'gain-fast': 500
  };
  var target = tdee + (adjustments[goal] || 0);
  target = Math.max(target, 1200); // safety floor

  var goalLabel = {
    'lose-fast': 'Aggressive Cut',
    'lose': 'Fat Loss',
    'maintain': 'Maintenance',
    'gain': 'Lean Bulk',
    'gain-fast': 'Bulk'
  };

  // Weekly projection
  var weeklyChange = (adjustments[goal] || 0) * 7 / 3500; // lbs per week

  var html = '<div class="result-main">' +
    '<p class="result-label">Daily Calorie Target &middot; ' + goalLabel[goal] + '</p>' +
    '<p class="result-value">' + Math.round(target) + '<span class="result-unit">cal/day</span></p>' +
  '</div>' +
  '<div class="result-details">' +
    '<div class="result-detail-item"><p class="result-detail-label">BMR</p><p class="result-detail-value">' + Math.round(bmr) + '</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">TDEE</p><p class="result-detail-value accent">' + Math.round(tdee) + '</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Weekly Cals</p><p class="result-detail-value">' + Math.round(target * 7).toLocaleString() + '</p></div>' +
    '<div class="result-detail-item"><p class="result-detail-label">Est. Weekly Change</p><p class="result-detail-value">' + (weeklyChange >= 0 ? '+' : '') + weeklyChange.toFixed(1) + ' lbs</p></div>' +
  '</div>' +
  '<p class="info-note mt-1">These are estimates. Track your weight over 2-3 weeks and adjust by 100-200 calories if you\'re not seeing expected progress.</p>';

  showResult('cal-result', html);
}
