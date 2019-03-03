<!DOCTYPE html> 
<html>
<head>
  <title>jQuery Ajax Example</title>
  <script 
  src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" >
  </script>
</head>
<body>
  
  <form id="form_register" "action="register.php" method="post">

  <p>
    Provide Your E-mail Address <br />
    <input type="text" name="email" value="" /> 
  </p>

  <p>
    Choose a Username <br />
    <input type="text" id="username" name="username" value=""  /> 
    <a href="nojs.html" class="button" id="check_un">Check Username</a>
    <output id="valid"></output>
  </p>
  
  <p>
    Choose and Confirm Password<br />
    <input type="password" name="password1" value="" /> <br />
    <input type="password" name="password2" value="" /> 
  </p>

  <p>
    <input type="submit" name="submit" value="Register" /> 
  </p>

</form>


  <script src="ex02_ajax.js"></script>
</body>
</html>