'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    // this.date = ... (Old version JS)
    // this.id = ... (Old version JS)
    this.coords = coords; // {lat, lng}
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence; // The total number of steps a runner takes per minute (SPM)
    this.calcPace();
  }

  calcPace() {
    // (min/km)
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain; // meters (m)
    this.calcSpeed();
  }

  calcSpeed() {
    // (km/h)
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

////////////////////////////////
// APPLICATION STRUCTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type'); // Identify type Running or Cycling
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;
  #workouts = [];
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));

    // Toggle the mode "Running" and "Cycling" in the input form to change the input unit to the corresponding unit: step/min ("Running") and meters ("Cycling")
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert('Need to turn on the location');
      },
    );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},15z?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D`,
    );

    this.#map = L.map('map').setView(coords, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const validInput = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout is running, create a running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        !validInput(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs must be positive numbers');
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling, create a cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // Check if data is valid
      if (
        !validInput(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs must be positive numbers');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add that new object to the workout array
    this.#workouts.push(workout);
    console.log(workout);

    // Render the workout on the map as marker
    this.renderWorkoutMarker(workout);

    // Hide form + clear input fields
    inputDistance.value =
      inputDuration.value =
        inputCadence.value =
          inputElevation.value =
            '';
  }

  // Display marker
  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxHeight: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`, // Color for notification of what type of exercise
        }),
      )
      .setPopupContent(workout.type)
      .openPopup();
  }

}

const app = new App();
