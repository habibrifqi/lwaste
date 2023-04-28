var dateValue = 0;
var markers = [];
function tampilKalender() {
    $("#reservationdate").datetimepicker({
        autoclose: true,
        closeOnSelect: true,
        format: "DD/MM/YYYY",
        useCurrent: true,
        defaultDate: new Date(),

        // format: "L",
        // useCurrent: true,
        // defaultDate: new Date(),
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

    anorganikPersend =
        ((sampah.anorganik / totalSampah) * 100).toFixed(2) + " %";
    organikPersend = ((sampah.organik / totalSampah) * 100).toFixed(2) + " %";
    b3Persend = ((sampah.b3 / totalSampah) * 100).toFixed(2) + " %";
    residuPersend = ((sampah.residu / totalSampah) * 100).toFixed(2) + " %";
    // console.log(totalSampah);
    
    //colorset1
    //     dodgerblue
    // limegreen
    // chocolate
    // mediumorchid
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
            content: "{label}: {y} Kg" // menampilkan label dan nilai y pada tooltip
          }
    };
    $("#chartContainer").CanvasJSChart(options);
    // const chart = new CanvasJS.Chart("#chartContainer", options);

    // chart.render();
}

function tampilChart(sampah) {
    console.log(sampah);
    var donutData = {
        labels: ["Anorgamik", "Organik", "B3", "Residu"],
        datasets: [
            {
                data: [
                    `${sampah.anorganik}`,
                    `${sampah.organik}`,
                    `${sampah.b3}`,
                    `${sampah.residu}`,
                ],
                backgroundColor: ["#f56954", "#00a65a", "#f39c12", "#00c0ef"],
            },
        ],
    };

    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");

    var pieData = donutData;
    var pieOptions = {
        legend: {
            display: true,
            position: "right",
            labels: {
                fontColor: "#333",
                fontSize: 14,
                generateLabels: function (chart) {
                    var data = chart.data;
                    if (data.labels.length && data.datasets.length) {
                        return data.labels.map(function (label, index) {
                            var dataset = data.datasets[0];
                            var backgroundColor =
                                dataset.backgroundColor[index];
                            var value = dataset.data[index];
                            return {
                                text: label + ": " + value + " Kg",
                                fillStyle: backgroundColor,
                                hidden: isNaN(dataset.data[index]),
                                index: index,
                            };
                        });
                    }
                    return [];
                },
            },
        },
        tooltips: {
            mode: "index",
            // intersect: true,
            // callbacks: {
            //     label: function (tooltipItem, data) {
            //         var label = data.labels[tooltipItem.index];
            //         var value =
            //             data.datasets[tooltipItem.datasetIndex].data[
            //                 tooltipItem.index
            //             ];
            //         let arr_dataChart = data.datasets[0].data;
            //         let total_arr_dataChart = 0;

            //         for (let i = 0; i < arr_dataChart.length; i++) {
            //             total_arr_dataChart += parseInt(arr_dataChart[i]);
            //         }
            //         // console.log(total_arr_dataChart);
            //         value_tt = (value / total_arr_dataChart) * 100;

            //         // return label + ": " + value_tt.toFixed(2) + "%";
            //         return ` ${label} : ${value} Kg`;
            //     },
            // },
        },
        // animation: false, // menonaktifkan animasi
        maintainAspectRatio: false,
        responsive: true,
    };

    new Chart(pieChartCanvas, {
        type: "pie",
        data: pieData,
        options: pieOptions,
    });
}
function maps() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -6.21462, lng: 106.84513 },
        zoom: 15,
        disableDefaultUI: false,
        mapId: "9c7c6601edbd542f",
    });

    var st = [
        {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
                {
                    visibility: "off",
                },
            ],
        },
        {
            featureType: "poi",
            stylers: [
                {
                    visibility: "off",
                },
            ],
        },
        {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
                {
                    visibility: "off",
                },
            ],
        },
        {
            featureType: "transit",
            stylers: [
                {
                    visibility: "off",
                },
            ],
        },
    ];

    // map.setOptions({styles : st})

    // var mapOptions = {
    //     zoom: 15,
    //     center: { lat: -6.21462, lng: 106.84513 },
    //   };
    // var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
function apiGetWaste(tanngal = 0) {
    // for (let i = 0; i < markers.length; i++) {
    //     markers[i].setMap(null);
    //     console.log('reset');
    // }
    //   console.log("2"+markers)

    var urlApi = "";
    if (tanngal == 0) {
        var urlApi = "https://waste.tubagusariq.repl.co/waste";
    } else {
        let sDate = tanngal;
        var urlApi = `https://wastemanagement.habibbaru.repl.co/ww/date=${sDate}`;
        // marker.setMap(null);
    }
    console.log(urlApi);

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

    // var marker = new google.maps.Marker({
    //     position: {
    //         lat: -6.202934,
    //         lng: 106.912649,
    //     },
    //     map: map
    //     // icon: markerImage_lokasi_sampah,
    // });

    var marker = new google.maps.Marker({
        position: {
            lat: -6.202934,
            lng: 106.912649,
        },
        map: map,
    });

    // var circle = new google.maps.Circle({
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: '#FF0000',
    //     fillOpacity: 0.35,
    //     map: map,
    //     center: {lat: 6.202934, lng: 106.912649},
    //     radius: 5
    // });

    // marker.bindTo('position', circle);

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
            // aa({anorganik: 35.5, organik: 10, b3: 25.5, residu: 10});

            // tampilChart(sampah);
            sampah.anorganik = 0;
            sampah.organik = 0;
            sampah.b3 = 0;
            sampah.residu = 0;
            $("#reservationdate").on("change.datetimepicker", function () {
                console.log("ini markers");
                console.log(markers.length);
                for (let i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                    console.log("reset");
                }
                dateValue = $("#tanggal1").val();

                //     console.log(dateValue);
                const dateStr = dateValue;
                //convert format
                const dateParts = dateStr.split("/");
                const year = dateParts[2];
                const month = dateParts[1].padStart(2, "0");
                const day = dateParts[0].padStart(2, "0");
                const formattedDate = `${year}-${month}-${day}`;
                // marker.setMap(null);
                console.log(formattedDate);
                // apiGetWaste(formattedDate).reload();
                apiGetWaste(formattedDate);
                maps();
            });

            // console.log(`sampah.anorganik ${sampah.anorganik}`);
            // tampilChart(sampah);
        },
        error: function () {
            alert("Error");
        },
    });

    // marker.setMap(null);
    // console.log(berat_anorganik);
    //  });
    //  console.log(dataWaste);
    console.log("asdas");
}

// setInterval(function() {
// apiGetWaste();
// },6000);

function ff() {
    // console.log(markers.length);
}

$(() => {
    maps();
    apiGetWaste("2023-04-18");
    ff();
    // $('#reservationdate').on('change.datetimepicker', function() {
    //     console.log("dateValue");
    //     dateValue = $('#tanggal1').val();

    //     console.log(dateValue);
    //     const dateStr = dateValue;
    //     //convert format
    //     const dateParts = dateStr.split("/");
    //     const year = dateParts[2];
    //     const month = dateParts[1].padStart(2, "0");
    //     const day = dateParts[0].padStart(2, "0");
    //     const formattedDate = `${year}-${month}-${day}`;
    //     // marker.setMap(null);
    //     console.log(formattedDate);
    //     apiGetWaste(formattedDate).reload();
    //     maps().reload();
    //   });

    //  for (let i = 0; i < markers.length; i++) {
    //     // markers[i].setMap(null);
    //     console.log('reset');
    // }
});
