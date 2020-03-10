import React, { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { LeftDrawer } from './LeftDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import FetchError from './FetchError';
import GenericModal from './GenericModal';
import { initializeFirebase, getFCMToken, addPushMessageListener } from './fcmconfig'

function App() {

  const baseURL = 'https://newsapi.org/v2/top-headlines?country=in'
  const apiKey = 'dfcd91fa823d419c81a1cdbbf7f0f68a'

  const [state, setState] = useState({ category: '' })

  const [installEvent, setInstallEvent] = useState(null)
  const { category } = state




  useEffect(() => {

    initializeFirebase()


    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('Got install event')
      e.preventDefault();
      setInstallEvent(e)
    });

    fetchNews()

  }, [category])

  const fetchNews = () => {
    setState({ ...state, isLoading: true, error: null })
    const url = category ? `${baseURL}&category=${category}&apiKey=${apiKey}`
      : `${baseURL}&apiKey=${apiKey}`

    fetch(url)
      .then(res => res.json())
      .then(({ articles }) => {
        setState({ ...state, error: null, isLoading: false, articles })
      }, (error) => {
        setState({ ...state, isLoading: false, error })
      })
  }

  const handleNotification = () => {

    getFCMToken()
      .then((token) => {
        console.log(token)
        addPushMessageListener((message) => {
          alert(message.notification.body)
        })

      })
      .catch((err) => console.log(err))

  }
  const { articles, isLoading, error } = state

  return (
    <div style={{
      display: 'flex', height: '100vh',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <LeftDrawer
        onItemClick={(category) => setState({ category })}
        onNotificationIconClick={handleNotification} />
      {isLoading && <CircularProgress />}
      <div style={{
        position: 'absolute',
        padding: 16, top: 40
      }}>
        {articles && articles.map((article, index) => (<NewsCard key={`${index}`} article={article} />))}
      </div>

      {error && <FetchError message={error.message} onRetry={fetchNews} />}

      {installEvent && <GenericModal onSubmit={() => { installEvent.prompt() }} />}
    </div >
  );
}

export default App;
