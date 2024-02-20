/* external imports */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import moment from 'moment';
import { getAnswerById } from '../../qnaPage.service';
/* styles */
import styles from './comment.module.scss';
/* assets */
import tick from '../../../../../public/assets/tick.svg';

const Comment = () => {
  const { qid } = useParams();
  const [answerData, setAnswerData] = useState(null);
  const {
    answers = [],
    selectedAnswer = 0,
  } = answerData || {};

  useEffect(() => {
    const questionId = Number(qid);
    getAnswerById({ qid: questionId })
      .then(({ data }) => {
        setAnswerData(data);
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);

  return (
    <div className={styles.commentsContainer}>
      {/* 1. total answers */}
      <section className={styles.totalAnswers}>
        <span className={styles.totalAnswers__count}>
          {(answers || []).length} answers
        </span>
      </section>

      {/* 2. render answer */}
      <section className={styles.answerSection}>
        {(answers || []).map((answer, index) => {
          const {
            userName = '',
            answerUnixStamp = '',
            comment = '',
          } = answer || {};
          const answeredDate = moment(answerUnixStamp).format('MMM DD, YYYY [at] HH:mm');
          return (
            <div className={styles.answerSegment}>
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
