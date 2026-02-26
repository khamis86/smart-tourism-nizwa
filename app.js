// Initialize Map centered on Nizwa
var map = L.map('map').setView([22.9333, 57.5333], 14);

// OpenStreetMap Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Marker
var marker = L.marker([22.9333, 57.5333]).addTo(map);

// Firebase Reference
var userRef = database.ref("smartTourism/users/T001");

// Listen for updates
userRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (data) {
    document.getElementById("steps").innerText = data.stats.total_steps;
    document.getElementById("points").innerText = data.stats.total_points;
    document.getElementById("status").innerText = "Online";

    const lat = data.current_location.lat;
    const lng = data.current_location.lng;

    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], 15);
  }
});
