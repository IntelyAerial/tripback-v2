import { formatDate, showToast, reverseGeocode } from "./utils.js";
import { saveTrip, loadTrips, clearTrips } from "./tripback.js";

const map = L.map("map").setView([57.7, 11.8], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

document.getElementById("photoInput").addEventListener("change", handlePhoto);
document.getElementById("clearTrips").addEventListener("click", async () => {
  await clearTrips();
  showToast("Alla resor rensade.");
  renderTrips([]);
});

async function handlePhoto(event) {
  const file = event.target.files[0];
  if (!file) return;

  EXIF.getData(file, async function () {
    const lat = EXIF.getTag(this, "GPSLatitude");
    const lng = EXIF.getTag(this, "GPSLongitude");
    const date = EXIF.getTag(this, "DateTimeOriginal");

    if (!lat || !lng || !date) {
      showToast("Ingen GPS-data hittades.");
      return;
    }

    const coords = [lat[0] + lat[1]/60 + lat[2]/3600, lng[0] + lng[1]/60 + lng[2]/3600];
    const place = await reverseGeocode(coords[0], coords[1]);

    const trip = {
      date,
      place,
      lat: coords[0],
      lng: coords[1],
      photo: URL.createObjectURL(file)
    };

    await saveTrip(trip);
    renderTrips(await loadTrips());
  });
}

function renderTrips(trips) {
  const container = document.getElementById("tripList");
  container.innerHTML = "";

  trips.forEach(trip => {
    const div = document.createElement("div");
    div.className = "trip";
    div.innerHTML = `
      <h3>${trip.place}</h3>
      <p>${formatDate(trip.date)}</p>
      <img src="${trip.photo}" alt="Foto från ${trip.place}" loading="lazy" />
    `;
    container.appendChild(div);

    L.marker([trip.lat, trip.lng]).addTo(map).bindPopup(`${trip.place}<br>${formatDate(trip.date)}`);
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  const trips = await loadTrips();
  renderTrips(trips);
});
