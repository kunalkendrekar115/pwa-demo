import React, { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { AppToolbar } from './AppToolbar';
import CircularProgress from '@material-ui/core/CircularProgress';


function App() {

  const [state, setState] = useState({})
  useEffect(() => {
    setState({ isLoading: true })
    fetch("http://newsapi.org/v2/top-headlines?country=in&apiKey=dfcd91fa823d419c81a1cdbbf7f0f68a")
      .then(res => res.json())
      .then(({ articles }) => {
        setState({ isLoading: false, articles })
      }, (error) => {
        setState({ isLoading: false, error })
      })
  }, [])

  const { articles, isLoading } = state
  return (
    <div style={{
      display: 'flex', height: '100vh',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <AppToolbar />
      {isLoading && <CircularProgress />}
      <div style={{
        position:'absolute',
        padding: 16, top: 40
      }}>
        {articles && articles.map((article, index) => (<NewsCard key={`${index}`} article={article} />))}
      </div>

    </div>
  );
}

export default App;
