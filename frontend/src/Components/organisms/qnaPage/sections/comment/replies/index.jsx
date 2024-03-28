/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* external imports */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import moment from 'moment';
/* service */
import { replyToComment } from '../comment.service';
/* slice */
import { setComment } from '../slice/commentsSlice';
/* styles */
import styles from '../../../qnaPage.module.scss';

const Replies = ({ comment = {}, fetchComment }) => {
  const { qId } = useParams();
  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState('');
  const [replyCardCollapse, setReplyCardCollapse] = useState(true);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const {
    userName = 'anonymous',
    // parentId = '',
    replies = [],
    text: commentText = '',
    _id: docId = '',
    answeredDate = new Date().valueOf(),
  } = comment || {};

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

  const onReplyBtnClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const onReplyCardClick = () => {
    setReplyCardCollapse(!replyCardCollapse);
  };

  const onPostReplyHandler = async () => {
    if (!replyText.length) return;
    await onAddNewComment();
    await fetchComment();
    setReplyText('');
  };

  return (
    <div className={styles.commentsContainer}>
      <section
        role="button"
        tabIndex={0}
        className={styles.commentCard}
        key={docId}
        onClick={onReplyCardClick}
      >
        <p className={styles.commentText}>{commentText}</p>
        {showReplyInput && (
          <div role="button" tabIndex={0} onClick={e => e.stopPropagation()}>
            <textarea
              value={replyText}
              onChange={e => setReplyText(e?.target.value)}
              className={styles.replyTextArea}
            />
            <button
              type="button"
              className={styles.replyButton}
              onClick={e => onPostReplyHandler(e)}
            >
              <span className={styles.replyIcon}>💬</span>
              <span>Post</span>
            </button>
          </div>
        )}
        {!showReplyInput && (
          <div onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className={styles.replyButton}
              onClick={e => onReplyBtnClick(e)}
            >
              <span className={styles.replyIcon}>💬</span>
              <span>Reply</span>
            </button>
          </div>
        )}
        <div className={styles.userDetailSection}>
          {answeredDate !== 'Invalid date' && (
            <div className={styles.answeredDate}>
              <span>answered</span>
              <span>{moment(answeredDate).format('MMMM Do YYYY, h:mm a')}</span>
            </div>
          )}
          <div className={styles.answeredBy}>{userName}</div>
        </div>
        {replies.length && replyCardCollapse ? (
          <span className={styles.seeMoreReplies}>
            {replies.length} more replies
          </span>
        ) : null}
      </section>
      {!replyCardCollapse && (
        <div className={styles.repliesContainer}>
          {(replies || []).map(reply => (
            <Replies
              key={reply._id}
              comment={reply}
              fetchComment={fetchComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Replies;
