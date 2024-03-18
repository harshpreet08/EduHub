/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import moment from 'moment';
import { getQuestionById } from '../../qnaPage.service';
import { postComment } from './comment.service';
import styles from './comment.module.scss';
import tick from '../../../../../public/assets/tick.svg';
import { setAnswerData, setCommentText, setComments } from './slice/questionAnswerSlice';

const Comment = () => {
  const { qid } = useParams();
  const dispatch = useDispatch();
  const answerData = useSelector(state => state.answerReducer.answerData);
  const commentText = useSelector(state => state.answerReducer.commentText);
  const comments = useSelector(state => state.answerReducer.comments);
  const [isFocused, setIsFocused] = useState(false);

  const {
    answers = [],
    selectedAnswer = 0,
  } = answerData || {};

  useEffect(() => {
    getQuestionById({ qid })
      .then(({ data }) => {
        dispatch(setAnswerData(data));
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);

  const handlePostClick = () => {
    if (!commentText.trim()) {
      message.warning('Please enter a comment');
      return;
    }
    const payload = { qid, userName: 'disha', comment: commentText };
    postComment(qid, payload)
      .then((response) => {
        dispatch(setComments(response.data));
        dispatch(setCommentText(''));
      }).catch((error) => {
        message.error(error);
      });
  };

  return (
    <div className={styles.commentsContainer}>
      <section className={styles.totalAnswers}>
        <div className={styles.totalAnswers__count}>
          {(comments || []).length} answers
        </div>
        <input
          type="text"
          className={styles.commentText}
          placeholder="Add a comment ..."
          onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
          value={commentText}
          onChange={e => dispatch(setCommentText(e.target.value))}
        />
        <div className={styles.comments}></div>

        {isFocused && (
          <button
            type="button"
            className={styles.commentButton}
            onClick={handlePostClick}
            style={{
              backgroundColor: '#065fd4', color: '#fff', marginTop: '1rem', padding: '0.3rem', borderRadius: '1rem',
            }}
          >
            Comment
          </button>
        )}
      </section>

      <section className={styles.answerSection}>
        {(comments || []).map((comment, index) => {
          const {
            userName = '',
            timeStamp = '',
          } = comment || {};
          const answeredDate = moment(timeStamp).format('MMM DD, YYYY [at] HH:mm');
          return (
            <div className={styles.answerSegment} key={index}>
              <div>
                {selectedAnswer === index && (
                  <img
                    src={tick}
                    alt="selected answer"
                    height={25}
                    width={25}
                  />
                )}
              </div>
              <div className={styles.answerCard}>
                <p className={styles.answerBody}>
                  {comment.comment}
                </p>
                <span>Reply</span>
                <div className={styles.userDetailSection}>
                  {answeredDate !== 'Invalid date' && (
                    <div className={styles.answeredDate}>
                      <span>answered</span>
                      <span>{answeredDate}</span>
                    </div>
                  )}
                  <div className={styles.answeredBy}>
                    {userName}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Comment;
