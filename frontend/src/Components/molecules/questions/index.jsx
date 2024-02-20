/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-expressions */
/* external imports */
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import moment from 'moment';
import cx from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
/* styles */
import styles from './Questions.module.scss';
/* services */
import { getAllQuestions } from './Questions.service';
/* internal components */
import Navbar from '../navbar';

const Questions = () => {
  const [questionData, setquestionData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    fetchQuestionData();
  }, []);

  const fetchQuestionData = () => {
    getAllQuestions()
      .then(({ data }) => {
        setquestionData(data);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const handleQuestionClick = (questionId) => {
    navigate(`${location.pathname}/${questionId}`);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <button type="button" className={styles.askButton}>
          Ask a Question
        </button>
      </div>
      <div className={styles.questions}>
        <div className={styles.topQuestions}>Questionarium</div>
        {(questionData || []).map((questions) => {
          const {
            qTitle = '-',
            qDesc = '-',
            qId = '',
            totalAnswers = 0,
            askedByUsername = '',
            timeStamp = 0,
          } = questions || {};
          return (
          /* container */
            <div key={qId} className={styles.questionContainer}>
              {/* 1. answer section */}
              <section className={styles.answerCountSection}>
                <p
                  className={cx(
                    styles.answers,
                    totalAnswers === 0 ? styles.noAnswer : '',
                  )}
                >
                  { totalAnswers || 0} answers
                </p>
              </section>
              {/* 2. main question */}
              <section
                className={styles.questionArea}
                onClick={() => handleQuestionClick(qId)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.qTitle}>
                  <p className={styles.qTitle__para} title={qTitle}>
                    {qTitle}
                  </p>
                </div>
                <div className={styles.qDesc}>
                  <p className={styles.qDesc__para} title={qDesc}>
                    {qDesc}
                  </p>
                </div>
              </section>
              {/* 3. author */}
              <section className={styles.authorSection}>
                <p className={styles.creator}>
                  <span className={styles.icon}>
                    <FaUser />
                  </span>
                </p>
                <span className={styles.authorName}>
                  { askedByUsername}
                </span>
                <p className={styles.created}>
                  asked {moment(timeStamp).fromNow()}
                </p>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
