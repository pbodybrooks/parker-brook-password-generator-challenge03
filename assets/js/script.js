// Assignment Code
// finds the location of the button in the HTML doc by the "#generate" ID and stores it in the generateBtn var.
var generateBtn = document.querySelector("#generate");

// define arrays for all (upper and lower case) letters, numbers, and special characters that can be used in a generated password.
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var characters = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", "|", ";", ":", "'", "<", ">", ",", ".", "?"];
var lettersUppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lettersLowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  
// generateFunction is the primary function in this program that will:
// 1. Prompt & collect desired password length.
// 2. Prompt & collect the specified types of characters the user wants their password to include.
// 3. Generate a random password according to the above user specifications.
function generatePassword(){
  // this prompt will ask the user how long they want their password to be (req. 8-128 chars.)
  // the below lines will display a prompt asking for a password length, 8-128 chars. The text field will also display "password length". Parse int will convert the user-entered string to a number with base 10.
  var passwordLength = parseInt(
    prompt(" Please specify a desired password length from 8 to 128 characters.", "password length"),
    10
  );

  // now we need to validate the user's input and confirm their entry is usable data.
  // first, check to confirm the user's input consists only of numeric digits, 0 - 9, and no letters or special characters. If it does not, show an alert, then go back to the prompt.
  if (isNaN(passwordLength) === true){
    alert("❗ Password length must be specified using only numeric characters (0 - 9). ❗");
    generatePassword();
  };

  // second, check to confirm the user's input is 8 characters or greater in length. If it is not, show an alert, then go back to the prompt.
  // note: I'm using Logical NOT "!" and ">=" instead of simply "<" to directly align with the logic above, even though it is slightly less efficient.
  if (!(passwordLength >= 8)){
    alert("❗ Password length must be no fewer than 8 characters. ❗");
    generatePassword();
  };

  // third, check to confirm the user's input is 128 characters in length or shorter. If it is not, show an alert, then go back to the prompt.
  if (!(passwordLength <= 128)){
    alert("❗ Password length must be no greater than 128 characters. ❗");
    generatePassword();
  };

  // define what types of characters the password will be comprised of
  // ask user if password should include numbers using window.confirm() method, then store the value (true/false boolean) in a var for later.
  var useNumbers = window.confirm("Click 'OK' if you'd like your password to include numbers.\n\nClick 'Cancel' to exclude them.");

  // ask user if password should include special characters using window confirm, then store the value (true/false boolean) in a var for later.
  var useCharacters = window.confirm("Click 'OK' if you'd like your password to include special characters.\n\nClick 'Cancel' to exclude them.");

  // ask user if password should include *uppercase* letters using window confirm, then store the value (true/false boolean) in a var for later.
  var useUppercase = window.confirm("Click 'OK' if you'd like your password to include uppercase letters.\n\nClick 'Cancel' to exclude them.");

  // ask user if password should include *lowercase* letters using window confirm, then store the value (true/false boolean) in a var for later.
  var useLowercase = window.confirm("Click 'OK' if you'd like your password to include lowercase letters.\n\nClick 'Cancel' to exclude them.");

  // check to confirm that the user selected *at least* one of the above four types of characters for their password to contain
  // if they did not, show an alert stating the requirement
  if (!useNumbers && !useCharacters && !useUppercase && !useLowercase){
    alert("❗ Please select one or more character-types in order to proceed with password generation. ❗")
    generatePassword();
  }
  
  // now that all the parameters pertaining to password generation have been gathered from the user, i can store the values as properties of the object passwordParameters to be used later.
  var passwordParameters = {
    useNumbers: useNumbers,
    useCharacters: useCharacters,
    useUppercase: useUppercase,
    useLowercase: useLowercase,
  };

  // this variable is set as an empty string to begin with and will be used as "bucket" to hold all characters associated with the character types the user specified.
  // i'm doing it this way so that I can use the "bucket" as a separate container from the character arrays ensuring the generated password will never contain characters from a type the user did not want.
  var generatedPassword = '';

  // next, i use an if statement validate the user's previous inputs and add the requested characters to the "generatedPassword" bucket via the for loop.
  // if user clicked "OK" on the numbers confirm() prompt, the for loop will iterate through the numbers array, adding the contents of each index to the generatedPassword bucket.
  if (passwordParameters.useNumbers){
    for (var i=0; i<numbers.length; i++){
      generatedPassword += numbers[i];
    }
  }

  // if the user clicked "OK" in the special characters confirm() prompt, the for loop will iterate through the characters array, adding the contents of each index to the generatedPassword bucket.
  if (passwordParameters.useCharacters){
    for (var i=0; i<characters.length; i++){
      generatedPassword += characters[i];
    }
  }

  // if the user clicked "OK" in the uppercase letters confirm() prompt, the for loop will iterate through the lettersUppercase array, adding the contents of each index to the generatedPassword bucket.
  if (passwordParameters.useUppercase){
    for (var i=0; i<lettersUppercase.length; i++){
      generatedPassword += lettersUppercase[i];
    }
  }

  // if the user clicked "OK" in the lower letters confirm() prompt, the for loop will iterate through the lettersLowercase array, adding the contents of each index to the generatedPassword bucket.
  if (passwordParameters.useLowercase){
    for (var i=0; i<lettersLowercase.length; i++){
      generatedPassword += lettersLowercase[i];
    }
  }

  // now i am creating a new variable to store the final password. i set it as an emptry string for now, but it will be filled by picking and pulling random characters from the generatedPassword "bucket".
  var finalPassword = '';


  // this for loop iterates through the length of the previously specified passwordLength, filling in each index with a randomly selected index of generatedPassword.
  // randomIndex is a randomly generated number created using math.floor and math.random multiplied by the length of the generatedPassword array
  // finalPassword is then filled using the random index value of(generatedPassword)
  for (var i=0; i<passwordLength; i++){
    var randomIndex = Math.floor(Math.random()*generatedPassword.length);
    finalPassword += generatedPassword[randomIndex];
  }

  // return this generated password for use in writing back to the HTML
  return finalPassword;
}


// Write password to the #password input
// the variable "password" is now containing the generatePassword function's return, finalPassword.
// identifies the <textarea> element by "#password" ID, sets the selection to var passwordText.
// passwordText's value (<textarea> in HTML) is set to password, thus displaying the password to the user.
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
// runs writePassword when the button is clicked.
generateBtn.addEventListener("click", writePassword);
