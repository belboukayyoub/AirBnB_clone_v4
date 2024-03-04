$(document).ready(function () {
  const selectedAmenities = {};
  const selectedstates = {};
  const selectedCities = {};
  $(".amenities .popover input").change(function () {
    if ($(this).is(":checked")) {
      selectedAmenities[$(this).data("id")] = $(this).data("name");
    } else if ($(this).is(":not(:checked)")) {
      delete selectedAmenities[$(this).data("id")];
    }
    const names = Object.values(selectedAmenities);
    $(".amenities h4").text(names.sort().join(", "));
  });

  $(".locations .popover .state_input").change(function () {
    if ($(this).is(":checked")) {
      selectedstates[$(this).data("id")] = $(this).data("name");
    } else if ($(this).is(":not(:checked)")) {
      delete selectedstates[$(this).data("id")];
    }
    const names = [
      ...Object.values(selectedstates),
      ...Object.values(selectedCities),
    ];
    $(".locations h4").text(names.sort().join(", "));
  });

  $(".locations .popover .city_input").change(function () {
    if ($(this).is(":checked")) {
      selectedCities[$(this).data("id")] = $(this).data("name");
    } else if ($(this).is(":not(:checked)")) {
      delete selectedCities[$(this).data("id")];
    }
    const names = [
      ...Object.values(selectedstates),
      ...Object.values(selectedCities),
    ];
    $(".locations h4").text(names.sort().join(", "));
  });

  $.get(`http://0.0.0.0:5001/api/v1/status/`, (data) => {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  getPlaces({}, {}, {});

  $(".filters button").click(function () {
    getPlaces(selectedAmenities, selectedstates, selectedCities);
  });
});

const getPlaces = function (amenities, states, cities) {
  $.post({
    url: `http://0.0.0.0:5001/api/v1/places_search/`,
    contentType: "application/json",
    data: JSON.stringify({ amenities, states, cities }),
    dataType: "json",
    success: function (response) {
      $("SECTION.places").empty();
      for (const r of response) {
        const article = `<article>
            <div class="title_box">
            <h2>${r.name}</h2>
            <div class="price_by_night">$${r.price_by_night}</div>
            </div>
            <div class="information">
            <div class="max_guest">${r.max_guest} Guest(s)</div>
            <div class="number_rooms">${r.number_rooms} Bedroom(s)</div>
            <div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>
            </div>
            <div class="description"> ${r.description} </div>
        </article>`;
        $("SECTION.places").append(article);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
};
