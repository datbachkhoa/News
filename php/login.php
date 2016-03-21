<?php 
	$host = 'localhost';
	$user = 'root';
	$pass = '';
	$db = 'test';

	$mySqli = new mySqli($host, $user, $pass, $db);

	if($mySqli->connect_errno){
		echo "Connect to database failed: " . mysqli_connect_error();
		exit();
	}

	session_start();

	$username = $_POST['user'];
	$password = $_POST['password'];

	$username = stripcslashes($username);
	$password = stripcslashes($password);

	$username = $mySqli->real_escape_string($username);
	$password = $mySqli->real_escape_string($password);

	$sql = "SELECT * FROM user WHERE username='$username' and 
			password='$password'";

	if($stmt = $mySqli->query($sql)){
		$count = $resultdb->num_rows;

		if($count==1){ 
			$_SESSION['authenticated'] = "yes"; // #13
			$_SESSION['username'] = $userName; // #14
			$result['success'] = true; // #15
			$result['msg'] = 'User authenticated!'; // #16
		} else {
			$result['success'] = false; // #17
			$result['msg'] = 'Incorrect user or password.'; // #18
		}

		$stmt->close();
	}

	$mySqli->close(); // #20
	echo json_encode($result);
	exit();
?>