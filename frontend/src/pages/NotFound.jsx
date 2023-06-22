import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {

  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">404</h1>
      <h2 className="not-found-page__subtitle">Oops! Page not found</h2><br/>
      <button className="not-found-page__buttom" type='submit' onClick={() => navigate('/')}>Go home</button>
    </div>
  );
};

export default NotFoundPage;

