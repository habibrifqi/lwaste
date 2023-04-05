// function initMap() {
   
//   }

// initMap();


function apiGetWaste() {
  $(document).ready(function(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -6.21462, lng: 106.84513},
      zoom: 11,
      mapTypeControl: true,
      // mapTypeControlOptions: {
      //   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      //   position: google.maps.ControlPosition.TOP_RIGHT
      // }
    });
    
    $.ajax({
       url: 'http://wastemanagement.tubagusariq.repl.co/waste',
       type: 'GET',
       dataType: 'json',
       success: function(data){
          data.forEach(function(item) {
            console.log(item._id);
            // console.log(item.pengepul);
            // console.log(item.date);
            // console.log(item.jalur);
          });

          var marker = new google.maps.Marker({
            position: {lat: -6.21462, lng: 106.84513},
            map: map
         });

       },
       error: function(){
          alert('Error');
       }
    });
 });
//  console.log(dataWaste);
}

apiGetWaste();
    

  