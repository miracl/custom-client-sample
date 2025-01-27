import mcl from '../miracl.js'
import AuthenticationForm from './AuthenticationForm.js'
import PinPrompt from './PinPrompt.js'

export default function (container, data) {
  container.innerHTML = `
    <div class="view">
      <p>An email with a verification code was sent to the email address you have provided. To finish the verification process, enter the code in the form.</p>
      <form id="confirmationForm">
        <div class="mb-3">
          <input id="userIdInput" type="text" name="user_id" required="required" class="form-control" placeholder="User ID" readonly="readonly">
        </div>
        <div class="mb-3">
          <input type="text" name="code" required="required" class="form-control" placeholder="Verification code">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `

  // Set the User ID to the email address filled in the previous form.
  document.getElementById('userIdInput').value = data.email

  document.getElementById('confirmationForm').addEventListener('submit', async event => {
    event.preventDefault()

    const form = event.target

    // Show errors if the form data is not valid.
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const verificationData = new URLSearchParams(new FormData(form)).toString()

    let result

    try {
      result = await mcl.getActivationToken(verificationData)
    } catch (err) {
      console.error(err)
      return
    }

    try {
      await mcl.register(result.userId, result.actToken, passPin => {
        // Here we need to prompt the user to choose their PIN.
        // And then call the passPin argument with the value.
        PinPrompt(container, passPin)
      })
    } catch (err) {
      console.error(err)
      return
    }

    // Show the authentication form, so the user can authenticate after the registration.
    // Alternatively, you can invoke the authentication immediately.
    AuthenticationForm(container)
  })
}
