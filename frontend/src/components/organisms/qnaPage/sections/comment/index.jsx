import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import moment from 'moment';
import { getQuestionById } from '../../qnaPage.service';
import styles from './comment.module.scss';
import tick from '../../../../../public/assets/tick.svg';
import { setAnswerData, setComment } from './slice/questionAnswerSlice';

const Comment = () => {
  const { qid } = useParams();
  const dispatch = useDispatch();
  const answerData = useSelector(state => state.answerReducer.answerData);
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

  return (
    <div className={styles.commentsContainer}>
      <section className={styles.totalAnswers}>
        <div className={styles.totalAnswers__count}>
          {(answers || []).length} answers
        </div>
        <input
          type="text"
          className={styles.commentText}
          placeholder="Add a comment ..."
          onFocus={() => setIsFocused(true)} // Update focus state
          onBlur={() => setIsFocused(false)} // Update focus state
        />
        <div className={styles.comments}></div>

        {/* Render comment button conditionally */}
        {isFocused && (
          <button
            type="button"
            className={styles.commentButton}
            style={{
              backgroundColor: '#065fd4', color: '#fff', marginTop: '1rem', padding: '0.3rem', borderRadius: '1rem',
            }}
          >
            Comment
          </button>
        )}
      </section>

      <section className={styles.answerSection}>
        {(answers || []).map((answer, index) => {
          const {
            userName = '',
            answerUnixStamp = '',
            comment = '',
          } = answer || {};
          const answeredDate = moment(answerUnixStamp).format('MMM DD, YYYY [at] HH:mm');
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
                  {comment}
                </p>
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
