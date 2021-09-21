import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/meanmenu.min.css'
import '../styles/animate.css'
import './toogle.css'
import '../styles/responesive.css'
import '../styles/header.css'
import '../styles/message.css'
import '../styles/channel.css'
import './modal.css'
import './regulations.css'
import '../styles/forum.css'
import '../styles/download.css'
import '../styles/createpost.css'
import '../styles/register.css'
import '../styles/reply.png'
import '../styles/alert.css'
import '../styles/account.css'
import { Provider } from 'react-redux'
import { useStore } from '../store'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
