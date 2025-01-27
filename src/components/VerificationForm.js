import mcl from '../miracl.js'
import ConfirmationForm from './ConfirmationForm.js'

export default function (container) {
  container.innerHTML = `
    <div class="view">
      <p>Before authentication, you must first register the device. The registration starts with some type of verification of the user's identity. In this case, we will send an email with a verification code to confirm possession of the entered email address.</p>
      <form id="registrationForm">
        <div class="mb-3">
          <input type="email" name="email" required="required" class="form-control" placeholder="Email address">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `

  document.getElementById('registrationForm').addEventListener('submit', async event => {
    event.preventDefault()

    const form = event.target

    // Show errors if the form data is not valid.
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)
    const email = formData.get('email')

    try {
      await mcl.sendVerificationEmail(email)
    } catch (err) {
      console.error(err)
      return
    }

    // The registration process is completed by entering the email verification code in the confirmation form.
    ConfirmationForm(container, { email })
  })
}
