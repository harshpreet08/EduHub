/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-expressions */
/* external imports */
import React, { useEffect } from 'react';
import {
  message, Modal, Button, Input,
} from 'antd';
import moment from 'moment';
import cx from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
/* styles */
// import { response } from 'express';
import styles from './Questions.module.scss';
/* services */
import { getAllQuestions, postAllQuestions } from './Questions.service';
/* internal components */
import Navbar from '../navbar';
import {
  setquestionData, setModalVisible, setTitle, setDescription,
} from './slice/questionSlice';

const Questions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const questionData = useSelector(state => state.questionsDisplay.questionData);
  const isModalVisible = useSelector(state => state.questionsDisplay.isModalVisible);
  const title = useSelector(state => state.questionsDisplay.title);
  const description = useSelector(state => state.questionsDisplay.description);

  useEffect(() => {
    fetchQuestionData();
  }, []);

  const fetchQuestionData = () => {
    getAllQuestions()
      .then(({ data }) => {
        dispatch(setquestionData(data));
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const handleSave = () => {
    const payload = {
      title,
      description,
    };
    postAllQuestions(payload)
      .then(() => {
      });
  };

  const handleQuestionClick = (questionId) => {
    navigate(`${location.pathname}/${questionId}`);
  };

  const handleButtonClick = () => {
    dispatch(setModalVisible(true));
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <button type="button" className={styles.askButton} onClick={handleButtonClick}>
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
      <Modal
        description="write message"
        open={isModalVisible}
        className={styles.modalContainer}
        footer={[<Button key="post" onClick={handleSave}>Post</Button>]}
      >
        <div className={styles.postContainer}>
          <section>
            <label htmlFor="title">
              Title:
            </label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </section>
          <section>
            <label htmlFor="description">
              Description
            </label>
            <Input
              id="description"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </section>
        </div>
      </Modal>
    </div>
  );
};

export default Questions;
