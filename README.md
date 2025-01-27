# MIRACL Custom Client Sample

## Preliminary Steps

1. Go to the MIRACL Trust Portal (https://trust.miracl.cloud) and create a project.
2. On the General page, set Allowed CORS Domains to `http://127.0.0.1:9090`.
3. On the User Verification page, set the Verification Method to `Email Code`.

## Set Up the Sample

Start by cloning the project:

```sh
git clone https://github.com/miracl/custom-client-sample.git
```

Install the project dependencies:

```sh
npm install
```

Create a `.env` file under the root project directory:

```sh
touch .env
```

Populate it with the following environment variable:

```
VITE_MIRACL_PROJECT_ID=<YOUR_PROJECT_ID>
```

Execute the following command to run the sample:

```
npm start
```

You can now visit `http://127.0.0.1:9090` to access the sample.
