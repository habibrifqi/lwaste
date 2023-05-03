var dateValue = 0;
var markers = [];
function tampilKalender() {
  $("#reservationdate").datetimepicker({
    autoclose: true,
    closeOnSelect: true,
    format: "DD/MM/YYYY",
    useCurrent: true,
    defaultDate: new Date(),
  });
}

tampilKalender();

function ChartPie(sampah) {
  var textTitleSampah = "";
  if (
    sampah.anorganik == 0 ||
    sampah.organik == 0 ||
    sampah.b3 == 0 ||
    sampah.residu == 0
  ) {
    textTitleSampah = "Sampah Kosong";
    // console.log(textTitleSampah);
  }
  var totalSampah =
    sampah.anorganik + sampah.organik + sampah.b3 + sampah.residu;

  anorganikPersend = ((sampah.anorganik / totalSampah) * 100).toFixed(2) + " %";
  organikPersend = ((sampah.organik / totalSampah) * 100).toFixed(2) + " %";
  b3Persend = ((sampah.b3 / totalSampah) * 100).toFixed(2) + " %";
  residuPersend = ((sampah.residu / totalSampah) * 100).toFixed(2) + " %";

  const dataPoints = [
    {
      label: "Anorgamik",
      y: sampah.anorganik,
      description: anorganikPersend,
      color: "lightskyblue",
    },
    {
      label: "Organik",
      y: sampah.organik,
      description: organikPersend,
      color: "lightgreen",
    },
    {
      label: "B3",
      y: sampah.b3,
      description: b3Persend,
      color: "burlywood",
    },
    {
      label: "Residu",
      y: sampah.residu,
      description: residuPersend,
      color: "tomato",
    },
  ];

  var options = {
    title: {
      text: textTitleSampah,
    },
    data: [
      {
        type: "pie",
        startAngle: 10,
        showInLegend: "true",
        legendText: "{label}",
        indexLabel: "{label} ({y} Kg) ({description}) ",
        yValueFormatString: "#,##0.#" % "",
        dataPoints: dataPoints,
      },
    ],
    toolTip: {
      content: "{label}: {y} Kg", // menampilkan label dan nilai y pada tooltip
    },
  };
  $("#chartContainer").CanvasJSChart(options);
}

// function tampilChart(sampah) {
//     console.log(sampah);
//     var donutData = {
//         labels: ["Anorgamik", "Organik", "B3", "Residu"],
//         datasets: [
//             {
//                 data: [
//                     `${sampah.anorganik}`,
//                     `${sampah.organik}`,
//                     `${sampah.b3}`,
//                     `${sampah.residu}`,
//                 ],
//                 backgroundColor: ["#f56954", "#00a65a", "#f39c12", "#00c0ef"],
//             },
//         ],
//     };

//     var pieChartCanvas = $("#pieChart").get(0).getContext("2d");

//     var pieData = donutData;
//     var pieOptions = {
//         legend: {
//             display: true,
//             position: "right",
//             labels: {
//                 fontColor: "#333",
//                 fontSize: 14,
//                 generateLabels: function (chart) {
//                     var data = chart.data;
//                     if (data.labels.length && data.datasets.length) {
//                         return data.labels.map(function (label, index) {
//                             var dataset = data.datasets[0];
//                             var backgroundColor =
//                                 dataset.backgroundColor[index];
//                             var value = dataset.data[index];
//                             return {
//                                 text: label + ": " + value + " Kg",
//                                 fillStyle: backgroundColor,
//                                 hidden: isNaN(dataset.data[index]),
//                                 index: index,
//                             };
//                         });
//                     }
//                     return [];
//                 },
//             },
//         },
//         tooltips: {
//             mode: "index",
//             // intersect: true,
//             // callbacks: {
//             //     label: function (tooltipItem, data) {
//             //         var label = data.labels[tooltipItem.index];
//             //         var value =
//             //             data.datasets[tooltipItem.datasetIndex].data[
//             //                 tooltipItem.index
//             //             ];
//             //         let arr_dataChart = data.datasets[0].data;
//             //         let total_arr_dataChart = 0;

//             //         for (let i = 0; i < arr_dataChart.length; i++) {
//             //             total_arr_dataChart += parseInt(arr_dataChart[i]);
//             //         }
//             //         // console.log(total_arr_dataChart);
//             //         value_tt = (value / total_arr_dataChart) * 100;

//             //         // return label + ": " + value_tt.toFixed(2) + "%";
//             //         return ` ${label} : ${value} Kg`;
//             //     },
//             // },
//         },
//         // animation: false, // menonaktifkan animasi
//         maintainAspectRatio: false,
//         responsive: true,
//     };

//     new Chart(pieChartCanvas, {
//         type: "pie",
//         data: pieData,
//         options: pieOptions,
//     });
// }
function maps() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -6.21462, lng: 106.84513 },
    zoom: 15,
    disableDefaultUI: false,
    mapId: "9c7c6601edbd542f",
  });
}
function apiGetWaste(tanggal = 0) {
  var urlApi = "";
  if (tanggal == 0) {
    var urlApi = "https://wastemngmt.fdvsdeveloper.repl.co/waste";
  } else {
    let sDate = tanggal;
    var urlApi = `https://wastemngmt.fdvsdeveloper.repl.co/waste/date=${sDate}`;
    // marker.setMap(null);
  }

  let berat_anorganik = 0;
  let berat_organik = 0;
  let berat_b3 = 0;
  let berat_residu = 0;
  // $(document).ready(function(){

  let lokasi_sampah = "/image/assest_dwms/recycling.png";
  let lokasi_tps = "/image/assest_dwms/industry.png";

  //marker lokasi sampah
  var markerImage_lokasi_sampah = new google.maps.MarkerImage(
    `${lokasi_sampah}`,
    null, // size is determined at runtime
    null, // origin is 0,0
    null, // anchor is bottom center of the image
    new google.maps.Size(30, 30) // size of the image in pixels
  );

  // marker lokasi tps
  var markerImage_lokasi_tps = new google.maps.MarkerImage(
    `${lokasi_tps}`,
    null, // size is determined at runtime
    null, // origin is 0,0
    null, // anchor is bottom center of the image
    new google.maps.Size(30, 30) // size of the image in pixels
  );

  //contoh marker
  // new google.maps.Marker({
  //     position: {
  //         lat: -6.202934,
  //         lng: 106.912649,
  //     },
  //     map: map,
  // })

  //mangil api sampah

  $.ajax({
    // url: "https://wastemanagement.tubagusariq.repl.co/waste",
    // url: "https://waste.tubagusariq.repl.co/waste",
    url: urlApi,
    type: "GET",
    dataType: "json",
    success: function (data) {
      $.each(data, function (index, value) {
        // melakukan perulangan untuk setiap objek di dalam array data
        // console.log("ID: " + value._id);
        // console.log("Pengepul: " + value.pengepul);
        // console.log("Date: " + value.date);
        // console.log("Jalur: " + value.jalur);
        // console.log("Locations: ");
        // endmatikan
        $.each(value.location, function (loc_index, loc_value) {
          // melakukan perulangan untuk setiap objek lokasi di dalam array locations
          // console.log("  Lat: " + loc_value.lat);
          // console.log("  Long: " + loc_value.long);
          // console.log("  Time: " + loc_value.time);
          // console.log("  Address: " + loc_value.address);
          // console.log("  Waste: " + loc_value.waste);
          // console.log("  ID: " + loc_value._id);

          //marker normal
          // var marker = new google.maps.Marker({
          //     position: {
          //         lat: parseFloat(loc_value.lat),
          //         lng: parseFloat(loc_value.long),
          //     },
          //     map: map
          //     // icon: markerImage_lokasi_sampah,
          // });

          markers.push(
            new google.maps.Marker({
              position: {
                lat: parseFloat(loc_value.lat),
                lng: parseFloat(loc_value.long),
              },
              map: map,
              // icon: markerImage_lokasi_sampah,
            })
          );
        });
        // Mengecek apakah atribut "tps_location" ada dalam objek JSON
        // if (value.tps_location) {

        // } else {
        //   // console.log("Atribut 'tps_location' tidak tersedia dalam objek JSON");
        // }
        // endmatikan

        if (Array.isArray(value.image) && value.image.length > 0) {
          $.each(value.image, function (image_index, image_value) {
            // melakukan perulangan untuk setiap objek lokasi di dalam array locations
            // console.log("  typePhoto: " + image_value.typePhoto);
            if (image_value.typePhoto == "anorganik") {
              berat_anorganik += image_value.weight;
              // console.log(berat_anorganik);
            } else if (image_value.typePhoto == "organik") {
              berat_organik += image_value.weight;
            } else if (image_value.typePhoto == "b3") {
              berat_b3 += image_value.weight;
            } else {
              berat_residu += image_value.weight;
            }

            // console.log("  Long: " + loc_value.long);
            // console.log("  Time: " + loc_value.time);
            // console.log("  Address: " + loc_value.address);
            // console.log("  Waste: " + loc_value.waste);
            // console.log("  ID: " + loc_value._id);
          });
        }

        // console.log("TPS Location: ");
        // console.log("  Lat: " + value.tps_location.lat);
        // console.log("  Long: " + value.tps_location.long);
        // console.log("  Time: " + value.tps_location.time);
        // console.log("  Address: " + value.tps_location.address);
        // console.log("Recorded: " + value.recorded);
      });

      // console.log(berat_anorganik);
      // console.log(berat_organik);
      // console.log(berat_b3);
      // console.log(berat_residu);
      let sampah = {
        anorganik: berat_anorganik,
        organik: berat_organik,
        b3: berat_b3,
        residu: berat_residu,
      };
      // console.log(sampah);
      ChartPie(sampah);

      let copiedObj1 = Object.assign({}, sampah);
      const samppahArray = Object.entries(copiedObj1).map(([key, value]) => [
        key,
        value,
      ]);
      const judulsampah = ["jenis sampah", "berat Kg"];
      samppahArray.unshift(judulsampah);

      // tampilChart(sampah);
      sampah.anorganik = 0;
      sampah.organik = 0;
      sampah.b3 = 0;
      sampah.residu = 0;

      //kalau tangal onchange
      $("#reservationdate").on("change.datetimepicker", function () {
        //menghapus object markers
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

        //mengambil data dari tanggal
        dateValue = $("#tanggal1").val();
        const dateStr = dateValue;
        //convert format
        const dateParts = dateStr.split("/");
        const year = dateParts[2];
        const month = dateParts[1].padStart(2, "0");
        const day = dateParts[0].padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        apiGetWaste(formattedDate);
        maps();
      });

      $("#export-btn").click(function () {
        // exportCSV();
        console.log(copiedObj1);
        dateValue = $("#tanggal1").val();
        const judulTanggal = [`${dateValue}`];
        samppahArray.unshift(judulTanggal);
        var token = $("input[name=_token").val();
        // console.log(token);
        var form_data = $("#form-data").serialize();

        $.ajax({
          // url: '/export',
          url: "/export",
          type: "POST",
          data: {
            datasampah: samppahArray,
            tanggal: dateValue,
            _token: token,
          },
          // dataType: 'json',
          success: function (data) {
            window.location.href = data.download_url;
            // console.log(data);
            // window.location.href = data.file;
          },
          error: function (data) {
            // console.log(data);
            alert("GAGL");
          },
        });
      });
    },
    error: function () {
      alert("Error");
    },
  });
}

//jika ada permintaan realtime
// setInterval(function() {
// apiGetWaste();
// },6000);

$(() => {
  tanggalAwalload = $("#tanggal1").val();

  function formattanggal(params) {
    const dateParts = params.split("/");
    const year = dateParts[2];
    const month = dateParts[1].padStart(2, "0");
    const day = dateParts[0].padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  maps();
  apiGetWaste(formattanggal(tanggalAwalload));
});
