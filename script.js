// ==========================================
// STAYMATE PG ACCOMMODATION
// Tamil Nadu - 38 Districts
// ==========================================


// ------------------------------------------
// 1. TAMIL NADU DISTRICTS
// -----------------------------------------

const districts = [

    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Kanniyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"

];


// ------------------------------------------
// 2. SELECT HTML ELEMENTS
// ------------------------------------------

const districtSelect =
    document.getElementById("district");

const genderSelect =
    document.getElementById("gender");

const sharingSelect =
    document.getElementById("sharing");

const budgetSelect =
    document.getElementById("budget");

const searchBtn =
    document.getElementById("searchBtn");

const roomContainer =
    document.getElementById("roomContainer");

const resultCount =
    document.getElementById("resultCount");


// ------------------------------------------
// 3. ADD DISTRICTS TO DROPDOWN
// ------------------------------------------

districts.forEach(function(district) {

    const option =
        document.createElement("option");

    option.value = district;

    option.textContent = district;

    districtSelect.appendChild(option);

});


// ------------------------------------------
// 4. CREATE ROOM DATA
// ------------------------------------------

const rooms = [];


// Budget based on sharing
const prices = {

    1: {
        low: 8000,
        medium: 10000,
        premium: 12000
    },

    2: {
        low: 5000,
        medium: 6500,
        premium: 8000
    },

    3: {
        low: 3500,
        medium: 4500,
        premium: 6000
    },

    4: {
        low: 2500,
        medium: 3500,
        premium: 4500
    }

};


// ------------------------------------------
// 5. GENERATE ROOMS FOR ALL 38 DISTRICTS
// ------------------------------------------

districts.forEach(function(district) {

    // Boys
    for (let sharing = 1; sharing <= 4; sharing++) {

        rooms.push({

            district: district,

            gender: "boys",

            sharing: sharing,

            budget: sharing === 1
                ? "premium"
                : sharing === 2
                ? "medium"
                : "low",

            price:
                prices[sharing][
                    sharing === 1
                    ? "premium"
                    : sharing === 2
                    ? "medium"
                    : "low"
                ]

        });

    }


    // Girls
    for (let sharing = 1; sharing <= 4; sharing++) {

        rooms.push({

            district: district,

            gender: "girls",

            sharing: sharing,

            budget: sharing === 1
                ? "premium"
                : sharing === 2
                ? "medium"
                : "low",

            price:
                prices[sharing][
                    sharing === 1
                    ? "premium"
                    : sharing === 2
                    ? "medium"
                    : "low"
                ]

        });

    }

});


// ------------------------------------------
// 6. DISPLAY ROOMS
// ------------------------------------------

function displayRooms(data) {

    roomContainer.innerHTML = "";


    data.forEach(function(room) {

        const card =
            document.createElement("div");

        card.classList.add("room-card");

        let icon; if (room.gender === "girls")
             { icon = " ";

         } else
             { icon = " ";

              }
        // Room name
        const roomName =
             room.gender === "girls"
            ? "Girls PG"
            : "boys pg" ;
      


        card.innerHTML = `

            <div class="room-icon">
                ${icon}
            </div>

            <h3>
                ${roomName} - ${room.sharing} Sharing
            </h3>

            <p class="location">
                📍 ${room.district}
            </p>

            <div class="details">

                <span class="tag">
                    ${room.sharing} Sharing
                </span>

                <span class="tag">
                    ${room.gender}
                </span>

                <span class="tag">
                    ${room.budget}
                </span>

            </div>

            <p class="price">
                ₹${room.price.toLocaleString("en-IN")}
                <span>/ month</span>
            </p>

            <button
                class="view-btn"
                onclick="viewRoom('${room.district}',
                                 '${room.gender}',
                                 '${room.sharing}',
                                 '${room.price}')">

                View Room

            </button>

        `;


        roomContainer.appendChild(card);

    });


    resultCount.textContent =
        `${data.length} rooms`;

}


// ------------------------------------------
// 7. SEARCH / FILTER
// ------------------------------------------

searchBtn.addEventListener(
    "click",
    function() {

        const selectedDistrict =
            districtSelect.value;

        const selectedGender =
            genderSelect.value;

        const selectedSharing =
            sharingSelect.value;

        const selectedBudget =
            budgetSelect.value;


        const filteredRooms =
            rooms.filter(function(room) {


                // District

                const districtMatch =
                    selectedDistrict === "all" ||
                    room.district === selectedDistrict;


                // Gender

                const genderMatch =
                    selectedGender === "all" ||
                    room.gender === selectedGender;


                // Sharing

                const sharingMatch =
                    selectedSharing === "all" ||
                    room.sharing ===
                    Number(selectedSharing);


                // Budget

                const budgetMatch =
                    selectedBudget === "all" ||
                    room.budget === selectedBudget;


                return (
                    districtMatch &&
                    genderMatch &&
                    sharingMatch &&
                    budgetMatch
                );

            });


        displayRooms(filteredRooms);

    }
);


// ------------------------------------------
// 8. VIEW ROOM BUTTON
// ------------------------------------------


function viewRoom(district, gender, sharing, price) {

    const genderText =
        gender === "boys"
        ? "Boys"
        : "Girls";

    const form = document.createElement("div");

    form.classList.add("registration-popup");

    form.innerHTML = `
        <div class="registration-box">

            <button class="close-btn" id="closeForm"> </button>

            <h2>🏠 StayNest Registration</h2>

            <p class="selected-room">
                ${genderText} PG - ${district}
            </p>

            <form id="registrationForm">

                <label>Full Name</label>
                <input
                    type="text"
                    id="userName"
                    placeholder="Enter your name"
                    required
                >

                <label>Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    required
                >

                <label>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                >

                <label>Room</label>
                <input
                    type="text"
                    value="${sharing} Sharing"
                    readonly
                >

                <label>Monthly Rent</label>
                <input
                    type="text"
                    value="₹${Number(price).toLocaleString("en-IN")}"
                    readonly
                >

                <button type="submit" class="register-btn">
                    Register Now
                </button>

            </form>

        </div>
    `;

    document.body.appendChild(form);


    // CLOSE FORM
    document
        .getElementById("closeForm")
        .addEventListener("click", function() {

            form.remove();

        });


    // SUBMIT FORM
    document
        .getElementById("registrationForm")
        .addEventListener("submit", function(event) {

            event.preventDefault();

            form.innerHTML = `
                <div class="success-box">

                    <div class="success-icon">
                        ✓
                    </div>

                    <h2>Registration Successful!</h2>

                    <p>
                        Thank you for registering with StayNest.
                    </p>

                    <p>
                        Our team will contact you soon.
                    </p>

                    <button
                        class="register-btn"
                        id="successClose">
                        Done
                    </button>

                </div>
            `;


            document
                .getElementById("successClose")
                .addEventListener("click", function() {

                    form.remove();

                });

        });

}




// ------------------------------------------
// 9. SHOW INITIAL ROOMS
// ------------------------------------------

displayRooms(rooms);

