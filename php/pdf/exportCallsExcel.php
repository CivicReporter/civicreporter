<?php

/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

if (PHP_SAPI == 'cli')
	die('This example should only be run from a Web Browser');

/** Include PHPExcel */
require_once '../PHPExcel/Classes/PHPExcel.php';

require_once("../db/db.php");

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();

// Set document properties
$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
							 ->setLastModifiedBy("Maarten Balliauw")
							 ->setTitle("Office 2007 XLSX Test Document")
							 ->setSubject("Office 2007 XLSX Test Document")
							 ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
							 ->setKeywords("office 2007 openxml php")
							 ->setCategory("Test result file");

//load data
$sql = "SELECT * FROM call_engineering ";
$sql .= "ORDER BY call_id DESC ";
//$sql .= "inner join language l on f.language_id = l.language_id LIMIT 0,100";

$result = array();
if ($resultdb = pg_query($dbh, $sql)) {

	// Add some headers
	$objPHPExcel->setActiveSheetIndex(0)
		->setCellValue('A1', 'Call ID')
		->setCellValue('B1', 'Fault Code')
		->setCellValue('C1', 'Caller Name')
		->setCellValue('D1', 'Stand No.')
		->setCellValue('E1', 'Suburb')
		->setCellValue('F1', 'Severity')
		->setCellValue('G1', 'Property Damage')
		->setCellValue('H1', 'Status')
		->setCellValue('I1', 'Time Reported');
		
	while($record = pg_fetch_assoc($resultdb)) {

		array_push($result, $record);
	}	

	pg_close($dbh);
}
	for ($i = 0; $i < count($result); $i++) {
		$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A'.($i+2), $result[$i]['call_id'])
            ->setCellValue('B'.($i+2), $result[$i]['code'])
            ->setCellValue('C'.($i+2), $result[$i]['caller'])
            ->setCellValue('D'.($i+2), $result[$i]['stand_no'])
            ->setCellValue('E'.($i+2), $result[$i]['suburb'])
            ->setCellValue('F'.($i+2), $result[$i]['severity'])
            ->setCellValue('G'.($i+2), $result[$i]['property_damage'])
            ->setCellValue('H'.($i+2), $result[$i]['status'])
            ->setCellValue('I'.($i+2), $result[$i]['reported_on']);
	}
// Rename worksheet
$objPHPExcel->getActiveSheet()->setTitle('calls');


// Set active sheet index to the first sheet, so Excel opens this as the first sheet
$objPHPExcel->setActiveSheetIndex(0);


// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="calls.xls"');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output');
exit;
