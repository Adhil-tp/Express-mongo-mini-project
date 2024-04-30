const signUpButton = document.querySelector('.signup-button')

const nameError = document.querySelector('.name-error')
const emailError = document.querySelector('.email-error')
const passError = document.querySelector('.pass-error')
const confirmPassError = document.querySelector('.c-pass-error')

signUpButton.addEventListener('click', (event) => {
    const userName = document.querySelector('.userName').value
    const userMail = document.querySelector('.userMail').value
    const userPassword = document.querySelector('.userPassword').value
    const confirmPass = document.querySelector('.confirmPass').value


    if (userName == "" || userMail == "" || userPassword == "") {
        alert("enter your user Credentials to move forward");
        event.preventDefault()
        return;
    } else {
        const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^ ]{8,20}$/;
        const emailRegex = /^[a-zA-Z0-9]{5,30}@[a-zA-Z]{2,7}.[a-zA-Z]{1,5}$/;

        passError.style.display = "none"
        confirmPassError.style.display = "none"
        emailError.style.display = 'none'
        nameError.style.display = 'none'


        if (userName.length <= 2) {
            event.preventDefault()
            nameError.style.display = 'block'
        }


        if (!emailRegex.test(userMail)) {
            console.log("field must be in email format");
            emailError.style.display = "block"
            event.preventDefault()
            // return
        }

        if (!passRegex.test(userPassword)) {
            console.log("pass not valid");
            passError.style.display = "block";
            event.preventDefault()
            // return
        }

        if (userPassword != confirmPass) {
            console.log("password not match");
            confirmPassError.style.display = "block";
            event.preventDefault()
            // return
        }
    }
    return
})
