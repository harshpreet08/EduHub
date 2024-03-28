import React from 'react';
/* internal components */
import Navbar from '../../NavBar';
import Question from './sections/question';
import Comment from './sections/comment';

const QnAPage = () => (
  <div>
    <Navbar />
    <Question />
    <Comment />
  </div>
);

export default QnAPage;
