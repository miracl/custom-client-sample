// Use the promise interface of the MIRACL Trust library
import MIRACLTrust from '@miracl/client-js/promise'

// Use the browser crypto library to generate a random hex encoded string
const getLocalEntropy = () => {
  const bufferSize = 8
  const bitsPerHex = 16

  const buffer = new Uint32Array(bufferSize)
  window.crypto.getRandomValues(buffer)

  let entropyHex = ''
  for (const chunk of buffer) {
    entropyHex += chunk.toString(bitsPerHex)
  }

  return entropyHex
}

// Export an instance to ensure only one is created
export default new MIRACLTrust({
  // Project ID obtained from the MIRACL Trust portal and set in the .env file
  projectId: import.meta.env.VITE_MIRACL_PROJECT_ID,
  // Seed with a random hex encoded string to ensure the MIRACL RNG has maximum entropy
  seed: getLocalEntropy(),
  // Human identifiable name of the device used as a label for the registration
  deviceName: 'Name of Device',
  // In the browser localStorage is used to persist device registrations
  userStorage: window.localStorage,
  // Required to allow cross-origin requests to MIRACL Trust
  cors: true
})
