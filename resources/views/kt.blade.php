@extends('layouts.master')

@section('title')
    Dashoard
@endsection

@section('breadcrumb')
    @parent
    <li class="breadcrumb-item active">Dashboard</li>
@endsection

@section('css')
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
    <link rel="stylesheet" href=" {{ asset('Adminlte/plugins/daterangepicker/daterangepicker.css') }}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

    <link rel="stylesheet" href="{{ asset('Adminlte/plugins/fontawesome-free/css/all.min.css') }}">

    <link rel="stylesheet" href="{{ asset('Adminlte/plugins/daterangepicker/daterangepicker.css') }}">

    <link rel="stylesheet" href="{{ asset('Adminlte/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">

    <link rel="stylesheet" href="{{ asset('Adminlte/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css') }}">

    <link rel="stylesheet"
        href="{{ asset('Adminlte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css') }}">

    <link rel="stylesheet" href="{{ asset('Adminlte/plugins/select2/css/select2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('Adminlte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css') }}">

    <link rel="stylesheet" href="{{ asset('Adminlte/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css') }}">

    <link rel="stylesheet" href="{{ asset('Adminlte/plugins/bs-stepper/css/bs-stepper.min.css') }}">

    <link rel="stylesheet" href="{{ asset('Adminlte/plugins/dropzone/min/dropzone.min.css') }}">

    <link rel="stylesheet" href="{{ asset('Adminlte/dist/css/adminlte.min.css') }}">

    {{-- khusus page  --}}
     <!-- Font Awesome -->
     <link rel="stylesheet" href="{{asset('Adminlte/plugins/fontawesome-free/css/all.min.css')}}">
     <!-- DataTables -->
     <link rel="stylesheet" href="{{asset('Adminlte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css')}}">
     <link rel="stylesheet" href="{{asset('Adminlte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css')}}">
     <link rel="stylesheet" href="{{asset('Adminlte/plugins/datatables-buttons/css/buttons.bootstrap4.min.css')}}">
     <!-- Theme style -->
     <link rel="stylesheet" href="{{asset('Adminlte/dist/css/adminlte.min.css')}}">



@endsection

@section('js')
    {{-- <script src="{{ asset('Adminlte/plugins/chart.js/Chart.min.js') }}"></script> --}}
    <!-- jQuery -->
    <script src="{{ asset('Adminlte/plugins/jquery/jquery.min.js') }}"></script>
    <!-- Select2 -->
    {{-- <script src="{{ asset('Adminlte/plugins/select2/js/select2.full.min.js') }}"></script> --}}
    <!-- InputMask -->
    <script src="{{ asset('Adminlte/plugins/moment/moment.min.js') }}"></script>
    <script src="{{ asset('Adminlte/plugins/inputmask/jquery.inputmask.min.js') }}"></script>
    <!-- Tempusdominus Bootstrap 4 -->
    <script src="{{ asset('Adminlte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js') }}"></script>
    {{-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuPGla6SLDp0RWVzqaha4GkjPaEpn9pBg"></script> --}}

    <script type="text/javascript" src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>


    {{-- khsusus page --}}
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
        
    });
    </script>
@endsection

@section('content')
    <section class="content">
        <div class="container-fluid">

            <div class="row">
                <div class="col-md-12">
                    <div class="card card-success">
                        <div class="card-header">
                            <h3 class="card-title">Berat Sampah berdasarkan jenis</h3>

                        </div>
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
                </div><!-- /.container-fluid -->
    </section>

   
@endsection
