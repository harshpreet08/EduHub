/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styles from '../../../qnaPage.module.scss';

const Replies = ({ comment = {} }) => {
  const [replyText, setReplyText] = useState('');
  const [commentCollapse, setCommentCollapse] = useState(false);
  const {
    userName = 'anonymous',
    parentId = '',
    replies = '',
    text: commentText = '',
    _id: docId = '',
    answeredDate = new Date().valueOf(),
  } = comment || {};

  const onReply = (/* parentId */) => {
    // console.log(parentId);
  };

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentCard} key={docId}>
        <p className={styles.commentText}>{commentText}</p>
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
      {(replies || []).map(reply => (
        <Replies comment={reply} />
      ))}
    </div>
  );
};

export default Replies;
