<?php
error_reporting(E_ALL);
ini_set("display_errors","On");

use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\TemplateProcessor;

require_once './vendor/autoload.php';
$autoload_dir = __DIR__;
Settings::setTempDir('./templates');

$document = new TemplateProcessor('./contract-template.docx');

$data = json_decode($_POST['contract'], true);

$static_fields = $data['staticFields'];
$collections = $data['collections'];

$contract_number = $static_fields['contractNumber'];

$output_file = 'contract_' . $contract_number . '.docx';

if (!isset($data) || !count($data)) {
    echo json_encode(array(
        'success' => false
    ));
    exit();
}

$document->setValues($static_fields);

foreach ($collections as $collection_name => $collection) {
    $collectionWithId = $collection;

    for ($i = 0; $i < count($collectionWithId); $i++) {
        $collectionWithId[$i][$collection_name . 'Id'] = $i + 1;
    }

    $document->cloneRowAndSetValues($collection_name . 'Id', $collectionWithId);
}

$document->saveAs('./templates/' . $output_file);

echo json_encode(array(
    'success' => true,
    'file_name' => 'templates/' . $output_file,
));