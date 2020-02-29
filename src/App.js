import React, { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { LeftDrawer } from './LeftDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';


function App() {

  const baseURL = 'http://newsapi.org/v2/top-headlines?country=in'
  const apiKey = 'dfcd91fa823d419c81a1cdbbf7f0f68a'

  const [state, setState] = useState({ category: '' })
  const { category } = state

  useEffect(() => {
   
    setState({ ...state, isLoading: true })
    const url = category ? `${baseURL}&category=${category}&apiKey=${apiKey}`
      : `${baseURL}&apiKey=${apiKey}`

    fetch(url)
      .then(res => res.json())
      .then(({ articles }) => {
        setState({ ...state, isLoading: false, articles })
      }, (error) => {
        setState({ ...state, isLoading: false, error })
      })
  }, [category])

  const { articles, isLoading } = state
  return (
    <div style={{
      display: 'flex', height: '100vh',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <LeftDrawer
        onItemClick={(category) => setState({ category })} />
      {isLoading && <CircularProgress />}
      <div style={{
        position: 'absolute',
        padding: 16, top: 40
      }}>
        {articles && articles.map((article, index) => (<NewsCard key={`${index}`} article={article} />))}
      </div>

    </div>
  );
}

export default App;
