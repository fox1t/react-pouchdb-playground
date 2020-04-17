import { useEffect } from 'react'
import PouchDB from 'pouchdb'
import authentication from 'pouchdb-authentication'

import config from '../lib/db'

PouchDB.plugin(authentication)

const couchDB = new PouchDB(`${config.url}/main`, {
  skip_setup: true,
})

export default function Main() {
  useEffect(() => {
    couchDB.logIn(config.username, config.password, (err, result) => {
      if (err) {
        console.log('Login error', err)
        return
      }
      const db = new PouchDB('pouchdb-authentication')
      db.sync(couchDB, { live: true, retry: true }).on('error', console.log.bind(console))
    })
  })
  return <div>pouchdb-authentication</div>
}
