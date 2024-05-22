import Rox from 'rox-browser'
import { betaAccess, isLoggedIn, getCompany } from './users'

export const configurationFetchedHandler = fetcherResults => {
  console.log(fetcherResults)
  if (fetcherResults.hasChanges && fetcherResults.fetcherStatus === 'APPLIED_FROM_NETWORK') {
    window.location.reload(false)
  }
}

export const impressionHandler = (reporting) => {
  if (reporting.targeting) {
    console.log('flag ' + reporting.name + ' value is ' + reporting.value)
  } else {
    console.log('No experiment configured for flag ' + reporting.name + '. default value ' + reporting.value + ' was used')
  }
}

//const API_HOST = 'https://api.cloudbees.io'
//const API_HOST = 'https://api-staging.saas-dev.beescloud.com'
const options = {
  configurationFetchedHandler: configurationFetchedHandler,
  impressionHandler: impressionHandler,
  configuration: {
    ANALYTICS_ENDPOINT: 'https://fm-analytics.cloudbees.io'
  }
  /*,
  configuration: {
    API_HOST: API_HOST,
    CD_API_ENDPOINT: `${API_HOST}/device/get_configuration`,
    CD_S3_ENDPOINT: 'https://development-conf.rollout.io/',
    SS_API_ENDPOINT: `${API_HOST}/device/update_state_store/`,
    SS_S3_ENDPOINT: 'https://development-statestore.rollout.io/',
    CLIENT_DATA_CACHE_KEY: 'client_data',
    ANALYTICS_ENDPOINT: 'https://localhost:8787',
    NOTIFICATIONS_ENDPOINT: 'https://api-staging.saas-dev.beescloud.com/sse'
  },
  debugLevel: 'verbose',
  disableSignatureVerification: true*/
}

export const Flags = {
  score: new Rox.Flag(false),
  ask: new Rox.Flag(false),
  show: new Rox.Flag(false),
  headerColor: new Rox.RoxString('is-dark', ['is-dark', 'is-primary', 'is-white'])
  
}

Rox.setCustomBooleanProperty('isBetaUser', betaAccess())
Rox.setCustomBooleanProperty('isLoggedIn', isLoggedIn())
Rox.setCustomStringProperty('company', getCompany())

Rox.register('default', Flags)
Rox.setup('16dad1c8-4617-49e9-7823-c699a57c89c2', options) //Pre prod el suborg
// Rox.setup('597b8a9b-6869-4a63-7371-828bf21a0c5c', options) //PROD
