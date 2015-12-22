// Copyright (c) 2015 Alberto Moreno.
// Use of this source code is governed by a MIT-style license that
// can be found in the LICENSE.md file.

'use strict';


// function initMap() {
//   var myLatLng = {lat: -25.363, lng: 131.044};

//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: myLatLng
//   });
// }


$(function () {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(37.195400, -4.049474),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    scrollwheel: false,
    draggable: false,
  });

  new google.maps.Marker({
    position: new google.maps.LatLng(37.195400, -4.049474),
    title: 'Nico Garcia Seleccion',
    map: map,
  });

  new google.maps.Marker({
    position: new google.maps.LatLng(37.197305, -4.045948),
    title: 'Nico Garcia Seleccion',
    map: map,
  });

});