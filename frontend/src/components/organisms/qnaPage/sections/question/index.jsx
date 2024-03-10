/* external imports */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
/* services */
import { getQuestionById } from '../../qnaPage.service';
/* styles */
import styles from './question.module.scss';
/* slices */
import { setAnswerData } from '../comment/slice/questionAnswerSlice';

const Question = () => {
  const { qid } = useParams();
  const dispatch = useDispatch();
  const answerData = useSelector(state => state.answerReducer.answerData);
  const {
    qTitle = '',
    qDesc = '',
    timeStamp = '',
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
    <div>
      <div className={styles.questionContainer}>
        {/* title */}
        <section
          className={styles.qTitle}
        >
          <p>{qTitle}</p>
          <div
            className={styles.qTimeStamp}
          >
            <span className={styles.qTimeStamp__asked}>Asked</span>
            <span>{moment(timeStamp).fromNow()}</span>
          </div>
        </section>

        {/* description */}
        <section
          className={styles.qDesc}
        >
          <p>{qDesc}</p>
        </section>
      </div>
    </div>
  );
};

export default Question;
