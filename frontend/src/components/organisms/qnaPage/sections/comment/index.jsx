/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import Replies from './replies';
import { getCommentByQid, replyToComment } from './comment.service';
import { setComment, setNewCommentText, resetCommentData } from './slice/commentsSlice';
import styles from '../../qnaPage.module.scss';

const CommentContainer = () => {
  const { qId } = useParams();
  const dispatch = useDispatch();
  const comment = useSelector(state => state.qnaPageReducer.commentReducer.comment);
  const newCommentText = useSelector(state => state.qnaPageReducer.commentReducer.newCommentText);

  useEffect(() => {
    getCommentByQid({ qId })
      .then(({ data: allComments }) => {
        dispatch(setComment(allComments));
      })
      .catch((err) => {
        message.error(err);
      });
    return () => dispatch(resetCommentData());
  }, []);

  const handlePostClick = () => {
    if (!newCommentText.trim()) {
      message.warning('Please enter a comment');
      return;
    }
    const parentId = uuidv4();
    const payload = { questionId: qId, parentId, text: newCommentText };
    replyToComment(payload)
      .then((response) => {
        dispatch(setComment(response.data));
      })
      .catch((error) => {
        const errorMessage = error.message || 'An error occurred';
        message.error(errorMessage);
      });
  };

  return (
    <>
      {/* Post Parent Level Comment */}
      <section className={styles.totalAnswersSection}>
        <div className={styles.totalAnswers__count}>
          {(comment?.replies || []).length} answers
        </div>
        <input
          type="text"
          className={styles.answerText}
          placeholder="Add a comment ..."
          value={newCommentText}
          onChange={e => dispatch(setNewCommentText(e.target.value))}
        />
        <button
          type="button"
          className={styles.answerButton}
          onClick={handlePostClick}
        >
          Comment
        </button>
      </section>
      {/* Comment Section */}
      <section className={styles.commentsSection}>
        <Replies comment={comment} />
      </section>
    </>
  );
};

export default CommentContainer;
