import React, { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { LeftDrawer } from './LeftDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import FetchError from './FetchError';
import GenericModal from './GenericModal';
import { getFCMToken, addPushMessageListener } from './fcmconfig'

function App() {

  const baseURL = 'https://newsapi.org/v2/top-headlines?country=in'
  const apiKey = 'dfcd91fa823d419c81a1cdbbf7f0f68a'

  const [state, setState] = useState({ category: '' })

  const [installEvent, setInstallEvent] = useState(null)
  const { category } = state


  useEffect(() => {

    // window.addEventListener('beforeinstallprompt', (e) => {
    //   console.log('Got install event')
    //   e.preventDefault();
    //   setInstallEvent(e)
    // });

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

  const handleNotification = (event) => {

    if (event.target.checked) {

      getFCMToken()
        .then((token) => {
          console.log('FCM Token', token)
          sendFCMToken(token)
        }).catch((err) => console.log(err))
    }
  }

  const sendFCMToken = (token) => {

    fetch(" https://fcmdemo-d37f6.firebaseio.com/message_list.json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    }).then(res => res.json())
      .then((response) => {
        alert("Token updated Successfully\n" + response.name)
        addPushMessageListener((message) => {
          alert(message.notification.body)
        })
      }, (error) => {
        console.log(error)
        alert(JSON.stringify(error))
      })
  }

  const { articles, isLoading, error } = state

  return (
    <div style={{
      display: 'flex', height: '100vh',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <LeftDrawer
        onItemClick={(category) => {
          if (category !== state.category)
            setState({ category })
        }}
        toggleNotification={handleNotification} />
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
