/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import moment from 'moment';
import { getCommentByQid, replyToComment } from '../comment.service';
import { setComment, resetCommentData } from '../slice/commentsSlice';
import styles from '../../../qnaPage.module.scss';

const Replies = ({ comment = {} }) => {
  const { qId } = useParams();
  const [replyText, setReplyText] = useState('');
  const [commentCollapse, setCommentCollapse] = useState(true);
  const dispatch = useDispatch();

  const {
    userName = 'anonymous',
    parentId = '',
    replies = [],
    text: commentText = '',
    _id: docId = '',
    answeredDate = new Date().valueOf(),
  } = comment || {};

  useEffect(
    () =>
    // fetchComment();
      () => dispatch(resetCommentData()),
    [],
  );

  const fetchComment = () => {
    getCommentByQid({ qId })
      .then(({ data: allComments }) => {
        dispatch(setComment(allComments));
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const onAddNewComment = async () => {
    const payload = {
      questionId: qId,
      parentId: comment?._id,
      text: replyText,
    };
    await replyToComment(payload)
      .then((response) => {
        dispatch(setComment(response.data));
      })
      .catch((error) => {
        const errorMessage = error.message || 'An error occurred';
        message.error(errorMessage);
      });
  };

  const onReply = async (e) => {
    await onAddNewComment();
    fetchComment();
  };

  if (parentId === '0') {
    return (replies || []).map(reply => <Replies comment={reply} />);
  }
  const formattedAnsweredDate = answeredDate !== 'Invalid date' ? moment(answeredDate).format('MMMM Do YYYY, h:mm a') : '';

  return (
    <div className={styles.commentsContainer}>
      <section
        role="button"
        tabIndex={0}
        className={styles.commentCard}
        key={docId}
        onClick={() => setCommentCollapse(!commentCollapse)}
      >
        <p className={styles.commentText}>{commentText}</p>
        <div role="button" tabIndex={0}>
          <input
            type="text"
            value={replyText}
            onChange={e => setReplyText(e?.target.value)}
          />
          <button
            type="button"
            className={styles.replyButton}
            onClick={e => onReply(e)}
          >
            <span className={styles.replyIcon}>💬</span>Reply
          </button>
        </div>
        <div className={styles.userDetailSection}>
          {answeredDate !== 'Invalid date' && (
            <div className={styles.answeredDate}>
              <span>answered</span>
              <span>{formattedAnsweredDate}</span>
            </div>
          )}
          <div className={styles.answeredBy}>{userName}</div>
        </div>
        {replies.length && commentCollapse ? (
          <span className={styles.seeMoreReplies}>
            {replies.length} more replies
          </span>
        ) : null}
      </section>
      {!commentCollapse
        && (replies || []).map(reply => <Replies comment={reply} />)}
    </div>
  );
};

export default Replies;
