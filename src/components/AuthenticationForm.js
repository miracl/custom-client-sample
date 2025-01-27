import mcl from '../miracl.js'
import AuthenticationResult from './AuthenticationResult.js'
import VerificationForm from './VerificationForm.js'
import ConfirmationForm from './ConfirmationForm.js'

const showError = (container, message) => {
  const wrapper = document.createElement('div')

  wrapper.innerHTML = `
    <div class="alert alert-danger alert-dismissible" role="alert">
      <div>${message}</div>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
  `

  // Close the alert when the close button is clicked.
  wrapper.querySelector('.btn-close').addEventListener('click', event => {
    event.preventDefault()

    wrapper.remove()
  })

  container.append(wrapper)
}

export default function (container) {
  // Get an object with all registered users for this device.
  const users = mcl.users.list()

  container.innerHTML = `
    <div class="view">
      <p>This device is registered. To authenticate, enter the PIN that was chosen during registration.</p>
      <div id="alertContainer"></div>
      <form id="authenticationForm">
        <div class="mb-3">
          <select id="registeredEmailList" name="userId" class="form-select">
            ${(function () {
              let options = ''
              for (const userId in users) {
                if (Object.hasOwn(users, userId)) {
                  options += `<option value="${userId}">${userId} (${users[userId]})</option>`
                }
              }

              return options
            })()}
          </select>
        </div>
        <div class="mb-3">
          <input type="password" name="pin" required="required" minlength="4" maxlength="4" pattern="[0-9]+" class="form-control" placeholder="PIN">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <p class="mt-3">
        <a id="linkResetPin" href="#">Forgot PIN?</a>
      </p>
      <p class="mt-3">
        <a id="linkRegistration" href="#">Register another account</a>
      </p>
    </div>
  `

  // Authenticate on form submit.
  document.getElementById('authenticationForm').addEventListener('submit', async event => {
    event.preventDefault()

    const form = event.target

    // Show errors if the form data is not valid.
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)
    const userId = formData.get('userId')
    const pin = formData.get('pin')

    let result

    try {
      result = await mcl.authenticate(userId, pin)
    } catch (err) {
      switch (err.message) {
        case 'Unsuccessful authentication':
          // The authentication failed, most likely due to a wrong PIN.
          // The user can retry until the device registration is revoked.
          showError(document.getElementById('alertContainer'), err.message)
          break

        case 'Revoked':
          // After 3 unsuccessful authentication attempts, the registration of the device is revoked.
          // This is done to prevent brute force attacks on the PIN.
          // A device registration can also be revoked manually or programmatically.
          // In these cases, the same `Revoked` error is returned during authentication.
          showError(document.getElementById('alertContainer'), err.message)
          break

        default:
          console.error(err)
      }

      return
    }

    AuthenticationResult(container, { jwt: result.jwt })
  })

  // Directly send a verification code to the selected email.
  document.getElementById('linkResetPin').addEventListener('click', async event => {
    event.preventDefault()

    // Get the currently selected User ID.
    const email = document.getElementById('registeredEmailList').value

    try {
      await mcl.sendVerificationEmail(email)
    } catch (err) {
      console.error(err)
      return
    }

    // Render the confirmation form to finish the registration.
    ConfirmationForm(container, { email })
  })

  // Render the registration form if the user wants to register another account.
  document.getElementById('linkRegistration').addEventListener('click', event => {
    event.preventDefault()

    VerificationForm(container)
  })
}
