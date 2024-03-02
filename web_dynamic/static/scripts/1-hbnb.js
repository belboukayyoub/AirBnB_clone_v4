$(document).ready(function () {
  const selectedAmenities = {};
  $(".amenities .popover input").change(function () {
    if ($(this).is(":checked")) {
      selectedAmenities[$(this).data("id")] = $(this).data("name");
    } else if ($(this).is(":not(:checked)")) {
      delete selectedAmenities[$(this).data("id")];
    }
    const names = Object.values(selectedAmenities);
    $(".amenities h4").text(names.sort().join(", "));
  });
});
