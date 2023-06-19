<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>kt</title>
    {{-- <link rel="stylesheet" href="cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css"> --}}
    {{-- <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js"></script> --}}

    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{asset('Adminlte/plugins/fontawesome-free/css/all.min.css')}}">
    <!-- DataTables -->
    <link rel="stylesheet" href="{{asset('Adminlte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css')}}">
    <link rel="stylesheet" href="{{asset('Adminlte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css')}}">
    <link rel="stylesheet" href="{{asset('Adminlte/plugins/datatables-buttons/css/buttons.bootstrap4.min.css')}}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{asset('Adminlte/dist/css/adminlte.min.css')}}">



    {{-- <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script> --}}
    {{-- <script type="text/javascript" language="javascript" src="cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script> --}}

    <!-- jQuery -->
    <script src="{{asset('Adminlte/plugins/jquery/jquery.min.js')}}"></script>

    <!-- Bootstrap 4 -->
    <script src="{{asset('Adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <!-- DataTables  & Plugins -->
    <script src="{{asset('Adminlte/plugins/datatables/jquery.dataTables.min.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/datatables-responsive/js/dataTables.responsive.min.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/datatables-buttons/js/dataTables.buttons.min.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/datatables-buttons/js/buttons.bootstrap4.min.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/jszip/jszip.min.j')}}s"></script>
    <script src="{{asset('Adminlte/plugins/pdfmake/pdfmake.min.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/pdfmake/vfs_fonts.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/datatables-buttons/js/buttons.html5.min.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/datatables-buttons/js/buttons.print.min.js')}}"></script>
    <script src="{{asset('Adminlte/plugins/datatables-buttons/js/buttons.colVis.min.js')}}"></script>

    <!-- AdminLTE App -->
    <script src="{{asset('Adminlte/dist/js/adminlte.min.js')}}"></script>

</head>
<body>
    {{-- <h1>KT</h1> --}}
    <div class="container">
    <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">tes</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                  <table id="example1" class="table table-bordered table-hover">
                    <thead>
                    <tr>
                      <th>no</th>
                      <th>id</th>
                      <th>pengepul</th>
                      <th>date</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section> 
    </div>
</body>

<script>
    $(function () {
        var table = $("#example1").DataTable({
            "responsive": true, "lengthChange": false, "autoWidth": false,
            dom: 'Bfrtip',
        // "serverSide" : true,
        // "lengthChange": false, 
        // "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print"],
        ajax : "{{route('kt')}}",
        columns: [
            {data: 'DT_RowIndex'},
            {data: '_id', name: '_id'},
            {data: 'pengepul'},
            // {data: 'date'},
            {data: 'action', name: 'action', orderable: false, searchable: false},
        ]


        })
        // .buttons().container().appendTo('#example2_wrapper .col-md-6:eq(0)');
        
    });
</script>

</html>