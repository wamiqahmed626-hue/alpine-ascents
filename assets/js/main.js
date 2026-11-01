(function () {
    var visits = localStorage.getItem("alpine_visitor_count");
    if (!visits) {
        visits = 1248;
    } else {
        visits = parseInt(visits, 10) + 1;
    }
    localStorage.setItem("alpine_visitor_count", visits);
    var visitorEl = document.getElementById("visitorCount");
    if (visitorEl) {
        visitorEl.textContent = visits;
    }

    function updateClock() {
        var now = new Date();
        var dateStr = now.toLocaleDateString();
        var timeStr = now.toLocaleTimeString();

        var topClock = document.getElementById("liveDateTime");
        if (topClock) {
            topClock.textContent = dateStr + " " + timeStr;
        }

        var trackerClock = document.getElementById("trackerDateTime");
        if (trackerClock) {
            trackerClock.textContent = dateStr + " | " + timeStr;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);

    var trackerLoc = document.getElementById("trackerLocation");
    if (trackerLoc) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var lat = position.coords.latitude.toFixed(2);
                    var lon = position.coords.longitude.toFixed(2);
                    trackerLoc.textContent = "Lat: " + lat + ", Lon: " + lon + " (Detected)";
                },
                function () {
                    trackerLoc.textContent = "Islamabad, Pakistan";
                },
                { timeout: 6000 }
            );
        } else {
            trackerLoc.textContent = "Islamabad, Pakistan";
        }
    }

    var topicSearch = document.getElementById("topicSearch");
    if (topicSearch) {
        topicSearch.addEventListener("keyup", function () {
            var q = this.value.toLowerCase();
            var cols = document.querySelectorAll(".topic-card-col");
            cols.forEach(function (col) {
                var text = col.textContent.toLowerCase();
                if (text.indexOf(q) !== -1) {
                    col.style.display = "";
                } else {
                    col.style.display = "none";
                }
            });
        });
    }

    var clubSearch = document.getElementById("clubSearchInput");
    if (clubSearch) {
        clubSearch.addEventListener("keyup", function () {
            var q = this.value.toLowerCase();
            var rows = document.querySelectorAll("#clubsTable tbody tr");
            rows.forEach(function (row) {
                var text = row.textContent.toLowerCase();
                if (text.indexOf(q) !== -1) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }

    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you! Your feedback message has been submitted successfully.");
            contactForm.reset();
        });
    }

    var galleryCards = document.querySelectorAll(".gallery-card");
    var modalImg = document.getElementById("modalImg");
    var modalTitle = document.getElementById("modalTitle");
    if (galleryCards.length && modalImg && modalTitle) {
        galleryCards.forEach(function (card) {
            card.addEventListener("click", function () {
                var img = card.querySelector("img");
                var caption = card.querySelector(".caption");
                if (img && caption) {
                    modalImg.src = img.src;
                    modalTitle.textContent = caption.textContent;
                }
            });
        });
    }
})();