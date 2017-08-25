/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Display} from './Display'
export {default as LineGraph} from './LineGraph'
export {default as PieGraph} from './PieGraph'
export {default as myForm} from './myForm'
export {default as Scatter} from './Scatter'
export {default as Home} from './Home'
export {default as BarGraph} from './BarGraph'
export {default as TableDB} from './TableDB'
export {default as AreaGraph} from './AreaGraph'
export {default as CustomQuery} from './CustomQuery'
export {default as Settings} from './Settings'
