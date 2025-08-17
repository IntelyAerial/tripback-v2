// 🔥 Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyAptTU7F2FD5G6ayNWldG1UQlAgycqpoGA",
  authDomain: "travelmate-2025.firebaseapp.com",
  projectId: "travelmate-2025",
  storageBucket: "travelmate-2025.firebasestorage.app",
  messagingSenderId: "717656692605",
  appId: "1:717656692605:web:d7ea4a0ca62e68ec885e14",
  measurementId: "G-2R8W7J6DBQ"
};


// ✅ Initiera Firebase med compat-version
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// 🗺️ Mapbox-karta
mapboxgl.accessToken = 'pk.eyJ1IjoibWFnbnVzc2pvbG9mIiwiYSI6ImNtZGRwNnA3czA3bjUybnNidnJvamJ1MnMifQ.ndMGGOP-nNL-BwAB_vJuLQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [13, 58.5],
  zoom: 5
});

// 📸 Bildgalleri
const imageGallery = document.getElementById('imageGallery');
const imageList = ['bild1.jpg', 'bild2.jpg', 'bild3.jpg']; // Lägg till dina bilder här
imageList.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = "Resebild";
  imageGallery.appendChild(img);
});

// 🎬 Demo-sekvens
document.getElementById('startDemo').onclick = () => {
  map.flyTo({ center: [12.5, 57.8], zoom: 7 });
  setTimeout(() => map.flyTo({ center: [14.2, 59.3], zoom: 6 }), 3000);
  setTimeout(() => map.flyTo({ center: [13, 58.5], zoom: 5 }), 6000);
};

// ✨ AI-genererad dagbok (mock)
document.getElementById('generateDiary').onclick = () => {
  const input = document.getElementById('diaryInput').value;
  const output = document.getElementById('diaryOutput');
  if (!input.trim()) {
    output.innerText = "Skriv något först!";
    return;
  }
  output.innerText = `AI-genererad text baserat på: "${input}"\n\nDet var en fantastisk dag med vackra vyer och minnesvärda möten.`;
};

// 📄 PDF-export
document.getElementById('exportPDF').onclick = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const text = document.getElementById('diaryOutput').innerText;
  doc.text(text || "Ingen dagbokstext tillgänglig.", 10, 10);
  doc.save("resedagbok.pdf");
};

// 🔗 Dela resa via Firebase
document.getElementById('shareTrip').onclick = () => {
  const diary = document.getElementById('diaryOutput').innerText;
  if (!diary.trim()) {
    alert("Du måste generera eller skriva dagbok först.");
    return;
  }
  const ref = db.ref('resor').push();
  ref.set({ diary });
  alert(`Resan är delad!\nLänk: https://travelmate-2025.firebaseapp.com/resor/${ref.key}`);
};

// 🖼️ Slideshow / Återblick
const slideshowImages = [...imageList];
let currentSlide = 0;
const slideshowImage = document.getElementById('slideshowImage');

function showSlide(index) {
  slideshowImage.src = slideshowImages[index];
}

function startSlideshow() {
  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slideshowImages.length;
    showSlide(currentSlide);
  }, 4000);
}

window.onload = startSlideshow;
