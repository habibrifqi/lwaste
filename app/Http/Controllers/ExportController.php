<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Writer\Csv;

class ExportController extends Controller
{
    //
    public function export(Request $request)
    {
        
        
        // $data = $request->datas;
        $dataSampahArray = $request->datasampah;

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
    
        // Menambahkan data ke dalam objek Spreadsheet
        // $sheet->setCellValue('A1', "asdas");
        $sheet->fromArray($dataSampahArray, null, 'A1');
    
         $filename = 'export.csv';
        $writer = new Csv($spreadsheet);
        $writer->setUseBOM(true);
        $writer->setDelimiter(',');
        $writer->setEnclosure('"');
        $writer->setLineEnding("\r\n");
        $writer->setSheetIndex(0);
        $writer->save($filename);

        $url = asset($filename);
        return response()->json(['download_url' => $url]);
}

    
}