import { useEffect } from 'react'
import PouchDB from 'pouchdb'

import config from '../lib/db'

function customLogin() {
  fetch(`${config.url}/_session`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Host: config.url,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include', // SUPER IMPORTANT!
    body: 'name=' + config.username + '&password=' + config.password,
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(function (responseAsJson) {
      console.log(responseAsJson)

      const couchDB = new PouchDB(`${config.url}/main`, {
        skip_setup: true,
      })
      const db = new PouchDB('custom-login')
      db.sync(couchDB, { live: true, retry: true }).on('error', console.log.bind(console))
    })
    .catch(function (error) {
      console.log('Looks like there was a problem: \n', error)
    })
}

export default function Main() {
  useEffect(() => {
    customLogin()
  })
  return <div>Custom login</div>
}
