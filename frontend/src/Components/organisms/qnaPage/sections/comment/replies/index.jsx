/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styles from '../comment.module.scss';

const Comment = ({ comment = {} }) => {
  const [replyText, setReplyText] = useState('');
  const {
    userName = 'anonymous',
    parentId = '',
    replies = '',
    text: commentText = '',
    _id: docId = '',
    answeredDate = new Date().valueOf(),
  } = comment || {};

  const onReply = (parentId) => {
    console.log(parentId);
  };

  return (
    <div className={styles.commentsContainer}>
      <section className={styles.answerSection}>
        <div className={styles.answerSegment} key={docId}>
          <div className={styles.answerCard}>
            <p className={styles.answerBody}>{commentText}</p>
            <div role="button" tabIndex={0} onClick={() => onReply(parentId)}>
              <input
                type="text"
                value={replyText}
                onChange={e => setReplyText(e?.target.value)}
              />
              <button type="button">Reply</button>
            </div>
            <div className={styles.userDetailSection}>
              {answeredDate !== 'Invalid date' && (
                <div className={styles.answeredDate}>
                  <span>answered</span>
                  <span>{answeredDate}</span>
                </div>
              )}
              <div className={styles.answeredBy}>{userName}</div>
            </div>
          </div>
        </div>
        {(replies || []).map(reply => (
          <Comment comment={reply} />
        ))}
      </section>
    </div>
  );
};

export default Comment;
