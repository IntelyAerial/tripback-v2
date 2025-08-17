export function formatDate(date) {
  return new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export function showToast(message) {
  alert(message); // Kan ersättas med snyggare toast senare
}

export async function reverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.address.city || data.address.town || data.address.village || "Okänd plats";
}
