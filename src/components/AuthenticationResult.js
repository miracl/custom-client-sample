export default function (container, data) {
  container.innerHTML = `
    <div class="view">
      <p>The result of the authentication is a signed JSON Web Token (JWT):</p>
      <pre style="white-space: pre-wrap; word-break: break-all;">${data.jwt}</pre>
      <p>
        To properly finish the authentication process, the token must be sent
        to the application server for verification. You must use a JWT library
        that is suitable for your back end. To verify the token signature, use
        the <a href="https://api.mpin.io/.well-known/jwks">MIRACL Trust JSON
        Web Key Set (JWKS) endpoint</a>. The keys should be cached for subsequent
        requests, so you might need to fetch them again periodically to ensure
        they are up to date or to request them again if a token arrives with
        an unknown key ID. Make sure your implementation does not assume the
        keys don’t change as they will be periodically rotated.
      </p>
    </div>
  `
}
