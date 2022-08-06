<?php

require_once 'vendor/autoload.php';

$document = new \PhpOffice\PhpWord\TemplateProcessor('./contract-template.docx');
$autoload_dir = __DIR__;

$data = json_decode($_POST['contract'], true);

$static_fields = $data['staticFields'];
$order_stages = $data['orderStages'];
$contract_number = $static_fields['contractNumber'];

$output_file = 'contract_' . $contract_number . '.docx';

if (!isset($data) || !count($data)) {
    print_r(json_encode(array(
        'success' => false
    )));
    exit();
}

$document->setValues($static_fields);
$document->cloneRowAndSetValues('orderStageName', $order_stages);

$document->saveAs($output_file);

print_r(json_encode(array(
    'success' => true
)));