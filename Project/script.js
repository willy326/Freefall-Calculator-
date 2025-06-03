// Drop times with air resistance (seconds, 10m, 1kg, k=0.5)
const planetTimesAir = {
    Mercury: 2.64,
    Venus: 1.66,
    Earth: 1.58,
    Mars: 2.63,
    Jupiter: 0.98,
    Saturn: 1.53,
    Uranus: 1.68,
    Neptune: 1.48
  };
  // Drop times without air resistance (seconds, 10m, g)
  const planetTimesNoAir = {
    Mercury: Math.sqrt(20/3.7),
    Venus: Math.sqrt(20/8.87),
    Earth: Math.sqrt(20/9.807),
    Mars: Math.sqrt(20/3.73),
    Jupiter: Math.sqrt(20/24.79),
    Saturn: Math.sqrt(20/10.44),
    Uranus: Math.sqrt(20/8.69),
    Neptune: Math.sqrt(20/11.15)
  };
  const planetGravity = {
    Mercury: 3.7,
    Venus: 8.87,
    Earth: 9.807,
    Mars: 3.73,
    Jupiter: 24.79,
    Saturn: 10.44,
    Uranus: 8.69,
    Neptune: 11.15
  };
  const planetNames = {
    Mercury: 'Mercury',
    Venus: 'Venus',
    Earth: 'Earth',
    Mars: 'Mars',
    Jupiter: 'Jupiter',
    Saturn: 'Saturn',
    Uranus: 'Uranus',
    Neptune: 'Neptune'
  };
  
  // Parameters for calculation
  const height = 10; // meters
  const mass = 1;    // kg
  
  /**
   * Compute impulse (no air resistance): impulse = mass * sqrt(2 * g * h)
   * Written by AI
   * @param {number} mass - Mass in kg
   * @param {number} gravity - Gravity in m/s^2
   * @param {number} height - Height in meters
   * @returns {number} Impulse in N·s
   */
  function computeImpulse(mass, gravity, height) {
    const velocity = Math.sqrt(2 * gravity * height);
    return mass * velocity;
  }
  
  // DOM elements
  const planetSelect = document.getElementById('planet');
  const dropBtn = document.getElementById('dropBtn');
  const ball = document.getElementById('ball');
  const info = document.getElementById('info');
  const body = document.body;
  const timer = document.getElementById('timer');
  const airToggle = document.getElementById('airToggle');
  const airLabel = document.getElementById('airLabel');
  
  let intervalId = null; // For timer interval
  
  /**
   * Change the background according to the selected planet.
   * @param {string} planet - The selected planet key.
   */
  function updateBackground(planet) {
    body.className = '';
    body.classList.add(planet);
  }
  //This part is written by AI
  /**
   * Display gravity and drop time information for the selected planet.
   * If air resistance is OFF, also display impulse (Written by AI)
   * @param {string} planet - The selected planet key.
   * @param {boolean} withAir - Whether air resistance is considered.
   */
  function showInfo(planet, withAir) {
    const time = withAir ? planetTimesAir[planet] : planetTimesNoAir[planet];
    let html = `
      <b>${planetNames[planet]}</b> gravity: <b>${planetGravity[planet]} m/s²</b><br>
      Drop from 10m, 1kg ball<br>
      <span style="color:#9cf">${withAir ? 'With' : 'Without'} air resistance: <b>${time.toFixed(2)} s</b></span>
    `;
    // Impulse is displayed only when there is no air resistance
    // Written by AI
    if (!withAir) {
      const impulse = computeImpulse(mass, planetGravity[planet], height); // Written by AI
      html += `<span class="impulse">Impulse upon impact: <b>${impulse.toFixed(2)} N·s</b></span>`; // Written by AI
    }
    info.innerHTML = html;
  }
  
  /**
   * Animate the timer from 0 up to the planet's fall time.
   * This part is written by AI
   * @param {number} duration - The fall time in seconds.
   */
  function startTimer(duration) {
    let start = null;
    if (intervalId) clearInterval(intervalId);
    timer.textContent = 'Time: 0.00 s';
  
    function update(now) {
      if (!start) start = now;
      let elapsed = (now - start) / 1000;
      if (elapsed > duration) elapsed = duration;
      timer.textContent = `Time: ${elapsed.toFixed(2)} s`;
      if (elapsed < duration) {
        requestAnimationFrame(update);
      } else {
        timer.textContent = `Time: ${duration.toFixed(2)} s`;
      }
    }
    requestAnimationFrame(update);
  }
  
  function updateAirLabel() {
    airLabel.textContent = airToggle.checked ? 'Air Resistance: ON' : 'Air Resistance: OFF';
  }
  
  planetSelect.addEventListener('change', function() {
    const planet = planetSelect.value;
    updateBackground(planet);
    showInfo(planet, airToggle.checked);
    ball.style.background = '';
    timer.textContent = 'Time: 0.00 s';
  });
  airToggle.addEventListener('change', function() {
    updateAirLabel();
    showInfo(planetSelect.value, airToggle.checked);
    timer.textContent = 'Time: 0.00 s';
  });
  
  dropBtn.addEventListener('click', function() {
    const planet = planetSelect.value;
    const withAir = airToggle.checked;
    const fallTime = withAir ? planetTimesAir[planet] : planetTimesNoAir[planet];
  
    ball.classList.remove('fall');
    void ball.offsetWidth;
    ball.style.setProperty('--fall-time', fallTime + 's');
    ball.classList.add('fall');
  
    ball.style.background = 'radial-gradient(circle at 30% 30%, #fff, #' +
      Math.floor(Math.random()*999) + ', #888 70%)';
  
    startTimer(fallTime);
  });
  
  updateBackground('Earth');
  updateAirLabel();
  showInfo('Earth', true);
  timer.textContent = 'Time: 0.00 s';
  