/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import moment from 'moment';
// import tick from '../../../../../public/assets/tick.svg';
import { /* replyToComment, */ getCommentByQid } from './comment.service';
import {
  setAllComments,
  setCommentText,
} from './slice/commentsSlice';
import styles from './comment.module.scss';

const Comment = () => {
  const { qId } = useParams();
  const dispatch = useDispatch();
  const allComments = useSelector(state => state.qnaPageReducer.commentReducer.allComment);
  const commentText = useSelector(state => state.qnaPageReducer.commentReducer.commentText);

  useEffect(() => {
    getCommentByQid({ qId })
      .then(({ data: allComments }) => {
        dispatch(setAllComments(allComments));
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);

  const handlePostClick = () => {
    // if (!commentText.trim()) {
    //   message.warning('Please enter a comment');
    //   return;
    // }
    // const payload = { qId, userName: 'disha', comment: commentText };
    // replyToComment(qId, payload)
    //   .then((response) => {
    //     dispatch(setAllComments(response.data));
    //     dispatch(setCommentText(''));
    //   })
    //   .catch((error) => {
    //     message.error(error);
    //   });
  };

  return (
    <div className={styles.commentsContainer}>
      <section className={styles.totalAnswers}>
        <div className={styles.totalAnswers__count}>
          {(allComments || []).length} answers
        </div>
        <input
          type="text"
          className={styles.commentText}
          placeholder="Add a comment ..."
          value={commentText}
          onChange={e => dispatch(setCommentText(e.target.value))}
        />
        <button
          type="button"
          className={styles.commentButton}
          onClick={handlePostClick}
          style={{
            backgroundColor: '#065fd4',
            color: '#fff',
            marginTop: '1rem',
            padding: '0.3rem',
            borderRadius: '1rem',
          }}
        >
          Comment
        </button>
      </section>

      <section className={styles.answerSection}>
        {(allComments || []).map((comment, index) => {
          const { userName = '', timeStamp = '' } = comment || {};
          const answeredDate = moment(timeStamp).format(
            'MMM DD, YYYY [at] HH:mm',
          );
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.answerSegment} key={index}>
              {/* <div>
                {selectedAnswer === index && (
                  <img
                    src={tick}
                    alt="selected answer"
                    height={25}
                    width={25}
                  />
                )}
              </div> */}
              <div className={styles.answerCard}>
                <p className={styles.answerBody}>{comment.comment}</p>
                <span>Reply</span>
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
          );
        })}
      </section>
    </div>
  );
};

export default Comment;
