export default function (container, callback) {
  container.innerHTML = `
    <div class="view">
      <p>You have reached the last step of the registration process. Choose a PIN specific for this device.</p>
      <form id="pinForm">
        <div class="mb-3">
          <input type="password" name="pin" required="required" minlength="4" maxlength="4" pattern="[0-9]+" class="form-control" placeholder="PIN">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `

  document.getElementById('pinForm').addEventListener('submit', event => {
    event.preventDefault()

    const form = event.target

    // Show errors if the form data is not valid.
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)
    const pin = formData.get('pin')

    callback(pin)
  })
}
