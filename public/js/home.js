function apiGetWaste() {
  $(document).ready(function(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -6.21462, lng: 106.84513},
      zoom: 11,
      mapTypeControl: true,
    });
    let lokasi_sampah = '/image/assest_dwms/recycling.png';
    let lokasi_tps = '/image/assest_dwms/industry.png';

    var markerImage_lokasi_sampah = new google.maps.MarkerImage(
      // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStumIUeVe66lIBO3yrPwJMnINgufc6_PCzT3lJFuIn1A&s',
      `${lokasi_sampah}`,
      null, // size is determined at runtime
      null, // origin is 0,0
      null, // anchor is bottom center of the image
      new google.maps.Size(30, 30) // size of the image in pixels
    );

    var markerImage_lokasi_tps = new google.maps.MarkerImage(
      // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStumIUeVe66lIBO3yrPwJMnINgufc6_PCzT3lJFuIn1A&s',
      `${lokasi_tps}`,
      null, // size is determined at runtime
      null, // origin is 0,0
      null, // anchor is bottom center of the image
      new google.maps.Size(30, 30) // size of the image in pixels
    );
    $.ajax({
       url: 'https://wastemanagement.tubagusariq.repl.co/waste',
       type: 'GET',
       dataType: 'json',
       success: function(data){
          // data.forEach(function(item) {
          //   console.log(item._id);
          // });

        //   var marker = new google.maps.Marker({
        //     position: {lat: -6.21462, lng: 106.84513},
        //     map: map
        //  });



          $.each(data, function(index, value) { // melakukan perulangan untuk setiap objek di dalam array data
            // console.log("ID: " + value._id);
            // console.log("Pengepul: " + value.pengepul);
            // console.log("Date: " + value.date);
            // console.log("Jalur: " + value.jalur);
            // console.log("Locations: ");
            $.each(value.locations, function(loc_index, loc_value) { // melakukan perulangan untuk setiap objek lokasi di dalam array locations
              // console.log("  Lat: " + loc_value.lat);
              // console.log("  Long: " + loc_value.long);
              // console.log("  Time: " + loc_value.time);
              // console.log("  Address: " + loc_value.address);
              // console.log("  Waste: " + loc_value.waste);
              // console.log("  ID: " + loc_value._id);
              var marker = new google.maps.Marker({
                position: {lat: parseFloat(loc_value.lat), lng: parseFloat(loc_value.long)},
                map: map,
                icon: markerImage_lokasi_sampah
             });
            });
            // Mengecek apakah atribut "tps_location" ada dalam objek JSON
            if (value.tps_location) {
              // console.log("Atribut 'tps_location' tersedia dalam objek JSON");
              // console.log("TPS Location: ");
            } else {
              // console.log("Atribut 'tps_location' tidak tersedia dalam objek JSON");
            }

            // console.log("TPS Location: ");
            // console.log("  Lat: " + value.tps_location.lat);
            // console.log("  Long: " + value.tps_location.long);
            // console.log("  Time: " + value.tps_location.time);
            // console.log("  Address: " + value.tps_location.address);
            // console.log("Recorded: " + value.recorded);
          });
    





















       },
       error: function(){
          alert('Error');
       }
    });
 });
//  console.log(dataWaste);
}

function tampilChart() {
      var donutData = {
        labels: [
            'Organik',
            'Anorgamik',
            'B3',
            'Residu',
        ],
        datasets: [{
            data: [700, 500, 400, 600],
            backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef'],
        }]
    }

    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')

    var pieData = donutData;
    
    var pieOptions = {
      legend: {
          display: true,
          position: 'right',
          labels: {
              fontColor: '#333',
              fontSize: 14,
              generateLabels: function(chart) {
                  var data = chart.data;
                  

                  if (data.labels.length && data.datasets.length) {
                      return data.labels.map(function(label, index) {
                          var dataset = data.datasets[0];
                          var backgroundColor = dataset.backgroundColor[index];
                          var value = dataset.data[index];
                          return {
                              text: label + ": " + value,
                              fillStyle: backgroundColor,
                              hidden: isNaN(dataset.data[index]),
                              index: index
                          };
                      });
                  }
                  return [];
              },
          }
      },
      tooltips: {
        mode: 'index',
        intersect: true,
        callbacks: {
          label: function(tooltipItem, data) {
            var label = data.labels[tooltipItem.index];
            var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            let arr_dataChart = data.datasets[0].data
            let total_arr_dataChart = 0;
            for(let i = 0; i <  arr_dataChart.length ; i++) {
              total_arr_dataChart += arr_dataChart[i];
            }
            value_tt = (value / total_arr_dataChart)*100;

            return label + ': '+  value_tt.toFixed(2) + "%";
          }
        }
      },
      maintainAspectRatio : false,
      responsive : true,
  };


  new Chart(pieChartCanvas, {
      type: 'pie',
      data: pieData,
      options: pieOptions
  });

  
}

apiGetWaste();
tampilChart();
    

  