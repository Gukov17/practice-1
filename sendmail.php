<?php 
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;

   require 'phpmailer/src/Exception.php';
   require 'phpmailer/src/PHPMailer.php';

   $mail = new PHPMailer(true);
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('ru', 'phpmailer/language/');
   $mail->IsHTML(true);

   $mail->setFrom('Practice#1');
   $mail->addAdress('lapagur3@gmail.com');

   $mail->Subject = 'My test letter';

   $body = '<h1>Super Test</h1>';

   if(trim(!empty($_POST['name']))){
      $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
   }
   if(trim(!empty($_POST['email']))){
      $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
   }
   if(trim(!empty($_POST['message']))){
      $body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>';
   }

   $mail->Body = $body;

   if (!$mail->send()) {
      $message = 'Ошибка';
   } else{
      $message = 'Данные отправлены!';
   }

   $response = ['message' => $message];

   header('Content-type: application/json');
   echo json_encode($response);
   
?>


