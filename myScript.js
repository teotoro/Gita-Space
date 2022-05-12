//add 'active' class to nav-item for all pages
const currentLocation = location.href;
const navItem = document.querySelectorAll('.header-navbar a');
const navLength = navItem.length;
for (let i = 0; i < navLength; i++) {
    if (navItem[i].href === currentLocation) {
        navItem[i].className = "active";
    }
}

/*hamburger menu: toggler close class, hide nav bar and appear
dropdown menu*/
$(document).ready(function () {
    $(".dropdown").click(function () {
        $(".icon").toggleClass("close");
        $(".header-nav").toggleClass("dropdown-navbar");
    });
});

//destination page
// switch planet's name tabs and add active class
if ($("body#destination").length > 0) {
    function openPlanet(evt, planetName) {
        // define variables
        var i, tabcontent, tablinks;

        // hides inactive content
        tabcontent = document.getElementsByClassName("destination-name");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        // adds active class
        tablinks = document.getElementsByClassName("planet-item");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active_", "");
        }
        document.getElementById(planetName).style.display = "flex";
        evt.currentTarget.className += " active_";
    }

    // first tab clicked by default
    document.getElementById("default").click();

    //   get info from json file
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);

            // destination info from json
            // takes "destination" object info from json
            var destination = response.destinations;
            for (var i = 0; i < destination.length; i++) {
                // planet name from json
                var planetName = document.getElementsByClassName('name');
                planetName[i].innerHTML = destination[i].name;
                // planet description from json
                var descrip = document.getElementsByClassName('destination');
                descrip[i].innerHTML = destination[i].description;
                // distance info from json
                var dist = document.getElementsByClassName('distance_');
                dist[i].innerHTML = destination[i].distance;
                // travel time info from
                var time = document.getElementsByClassName('time_');
                time[i].innerHTML = destination[i].travel;
                // planet image from json
                var image = document.getElementsByClassName('destination-img_');
                image[i].src = destination[i].images.png;
            }
        }
    }
    // call for infomation
    xhttp.open("GET", "data.json", true);
    xhttp.send();

}

// for crew 
// get info from json
if ($("body#crew").length > 0) {
    $.getJSON("data.json", function (data) {
        // takes crew object from json
        var crew = data.crew;
        // clones as meny crew item as object in json
        for (var b = 0; b < crew.length - 1; b++) {
            var crewMember = document.getElementById('copy-member');
            var divClone = crewMember.cloneNode(true);
            document.getElementById('crew-member-wrapper').appendChild(divClone);
        }

        // inserts information about crew members in elements from json file
        for (var a = 0; a < crew.length; a++) {
            // role from json
            var crewRole = document.getElementsByClassName('role');
            crewRole[a].innerHTML = crew[a].role
            // name from json
            var memberName = document.getElementsByClassName('member-name');
            memberName[a].innerHTML = crew[a].name
            // bio from json
            var bio = document.getElementsByClassName('bio');
            bio[a].innerHTML = crew[a].bio
            // img from json
            var crewImg = document.getElementsByClassName('member-img_');
            crewImg[a].src = crew[a].images.png
        }

        /* Initialize Swiper with arrows */
        var swiper = new Swiper(".mySwiper", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
    });
}

// for technology
// get info from json
if ($("body#technology").length > 0) {
    $.getJSON("data.json", function (data) {
        // takes technology object from json
        var tech = data.technology;
        // clones as many technology item as object in json
        for (var t = 0; t < tech.length - 1; t++) {
            var techCont = document.getElementById('copy-tech');
            var divClone = techCont.cloneNode(true);
            document.getElementById('tech-content-wrapper').appendChild(divClone);

        }
        // inserts information in elements from json file
        for (var b = 0; b < tech.length; b++) {

            var techMeta = document.getElementsByClassName('tech_');
            techMeta[b].innerHTML = "THE TERMINOLOGY…";
            // heading info from json
            var techHeading = document.getElementsByClassName('tech-heading');
            techHeading[b].innerHTML = tech[b].name;
            // description info from json
            var info = document.getElementsByClassName('tech-info');
            info[b].innerHTML = tech[b].description;
            // img from json
            var techImg = document.getElementsByClassName('tech-img_');
            techImg[b].src = tech[b].images.portrait;

            /* Initialize Swiper with numbers*/
            var swiper = new Swiper(".mySwiper", {
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                },
            });
        }
    });
}