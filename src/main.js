import mcl from './miracl.js'
import AuthenticationForm from './components/AuthenticationForm.js'
import VerificationForm from './components/VerificationForm.js'

// Get a reference to the main application container in the HTML
const appContainer = document.getElementById('app')

// Check if there are registered users
if (mcl.users.count()) {
  // If users exist, render the AuthenticationForm for login
  AuthenticationForm(appContainer)
} else {
  // If no users exist, render the VerificationForm to start user registration
  VerificationForm(appContainer)
}
