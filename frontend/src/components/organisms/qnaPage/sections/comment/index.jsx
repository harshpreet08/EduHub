/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import Comment from './replies';
import { getCommentByQid } from './comment.service';
import { setComment, setNewCommentText } from './slice/commentsSlice';
import styles from './comment.module.scss';

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
    <>
      {/* Post Parent Level Comment */}
      <section className={styles.totalAnswersSection}>
        <div className={styles.totalAnswers__count}>
          {(comment?.replies || []).length} answers
        </div>
        <input
          type="text"
          className={styles.commentText}
          placeholder="Add a comment ..."
          value={newCommentText}
          onChange={e => dispatch(setNewCommentText(e.target.value))}
        />
        <button
          type="button"
          className={styles.commentButton}
          onClick={handlePostClick}
        >
          Comment
        </button>
      </section>
      {/* Comment Section */}
      <section className={styles.commentsSection}>
        <Comment comment={comment} />
      </section>
    </>
  );
};

export default CommentContainer;
