import { ALL_PATHS } from './app/content/paths.js'

/** Static site: every route is prerendered to real HTML at build time (SEO), then hydrated. */
export default {
  ssr: false,
  prerender: [...ALL_PATHS, '/404'],
}
