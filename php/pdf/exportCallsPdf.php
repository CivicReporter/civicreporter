<?php

session_start();

$userName = $_SESSION['username'];
require_once('../tcpdf/config/lang/eng.php');
require_once('../tcpdf/tcpdf.php');
require_once("../db/db.php");

// extend TCPF with custom functions
class MYPDF extends TCPDF {

	// Load table data from file
	public function LoadData($file) {
		// Read file lines
		$lines = file($file);
		$data = array();
		foreach($lines as $line) {
			$data[] = explode(';', chop($line));
		}
		return $data;
	}

	// Colored table
	public function ColoredTable($header,$data) {
		// Colors, line width and bold font
		$this->SetFillColor(71, 71, 71);
		$this->SetTextColor(255);
		$this->SetDrawColor(210, 210, 210);
		$this->SetLineWidth(0.3);
		$this->SetFont('', 'B');
		// Header
		$w = array(15, 20, 65, 40, 20, 40, 25, 40);
		$num_headers = count($header);
		for($i = 0; $i < $num_headers; ++$i) {
			$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
		}
		$this->Ln();
		// Color and font restoration
		$this->SetFillColor(240, 240, 240);
		$this->SetTextColor(0);
		$this->SetFont('');
		// Data
		$fill = 0;
		foreach($data as $row) {
			$this->Cell($w[0], 6, $row['call_id'], 'LR', 0, 'L', $fill);
			$this->Cell($w[1], 6, $row['code'], 'LR', 0, 'L', $fill);
			$this->Cell($w[2], 6, $row['caller'], 'LR', 0, 'L', $fill);
			$this->Cell($w[3], 6, $row['nid'], 'LR', 0, 'L', $fill);
			$this->Cell($w[4], 6, $row['stand_no'], 'LR', 0, 'L', $fill);
			$this->Cell($w[5], 6, $row['name'], 'LR', 0, 'L', $fill);
			$this->Cell($w[6], 6, $row['status'], 'LR', 0, 'L', $fill);
			$this->Cell($w[7], 6, $row['reported_on'], 'LR', 0, 'L', $fill);
			$this->Ln();
			$fill=!$fill;
		}
		$this->Cell(array_sum($w), 0, '', 'T');
	}
}

//load data
$sql = "SELECT ec.call_id, sfc.code, ec.caller, ec.nid, ec.stand_no, ss.name, ec.status, ec.reported_on
		FROM call_engineering ec 
		INNER JOIN staticdata.fault_codes sfc ON ec.code_id = sfc.code_id
		INNER JOIN gis.suburb ss ON ec.suburb_id = ss.suburb_id 
		ORDER BY status";

$result = array();
if ($resultdb = pg_query($dbh, $sql)) {

	while($record = pg_fetch_assoc($resultdb)) {

		array_push($result, $record);
	}	

	pg_close($dbh);
}

// create new PDF document
$pdf = new MYPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor($userName);
$pdf->SetTitle('List of Calls');
$pdf->SetSubject('CivicReporter');

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, 10, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(20);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// ---------------------------------------------------------

// set font
$pdf->SetFont('helvetica', '', 10);

// add a page
$pdf->AddPage();

//Column titles
$header = array('Call Id', 'Fault Code', 'Caller Name', 'ID Number', 'Stand No.', 'Suburb', ' Fault Status', 'Time Reported');

// print colored table
$pdf->ColoredTable($header, $result);

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('calls_pdf.pdf', 'I');

//============================================================+
// END OF FILE                                                
//============================================================+
