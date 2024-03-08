/* external imports */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getAnswerById } from '../../qnaPage.service';
/* styles */
import styles from './question.module.scss';
import { setAnswerData } from './slice/questionSlice';

const Question = () => {
  const { qid } = useParams();
  const dispatch = useDispatch();
  // const [answerData, setAnswerData] = useState(null);
  const answerData = useSelector(state => state.question.answerData);
  const {
    qTitle = '',
    qDesc = '',
    timeStamp = '',
  } = answerData || {};

  useEffect(() => {
    const questionId = Number(qid);
    getAnswerById({ qid: questionId })
      .then(({ data }) => {
        // setAnswerData(data);
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
