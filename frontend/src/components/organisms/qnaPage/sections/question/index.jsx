/* external imports */
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getAnswerById } from '../../qnaPage.service';
/* styles */
import styles from './question.module.scss';

const Question = () => {
  const { qid } = useParams();
  const [answerData, setAnswerData] = useState(null);
  const {
    qTitle = '',
    qDesc = '',
    timeStamp = '',
    // answers = [],
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
