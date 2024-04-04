# EduHub

<p align="center">
    <img src="https://therealsujitk-vercel-badge.vercel.app/?app=eduhub-react-frontend&root=frontend" alt="Vercel Deploy Badge">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
</p>

EduHub is a comprehensive educational platform designed to facilitate online learning and community engagement. It offers a wide range of features including course management, a Q&A community forum, blog sharing, and test assessments, making it a one-stop solution for educators and students alike.

## Features

- **Course Management**: Browse, enroll in, and manage online courses.
- **Q&A Community Forum**: Engage with the community by asking questions and sharing knowledge.
- **Blog Sharing**: Read and share informative blogs on various educational topics.
- **Test Assessments**: Take tests and quizzes to assess your knowledge in different subjects.


## Features developed by me
### 1. Payment using stripe
**Backend file Path:** csci_5709_b00954473/Assignments/Assignment3/backend/controller/payment.js

**Frontend file Path:** csci_5709_b00954473/Assignments/Assignment3/frontend/src/Components/PricingPage.jsx

**Tasks included**
1. create a payment gateway to tutors using stripe integration.

### 2. community forum
**Backend file paths:** csci_5709_b00954473/Assignments/Assignment3/backend/controller/communityForum.js

csci_5709_b00954473/Assignments/Assignment3/backend/controller/comments.js

**Frontend file paths:** csci_5709_b00954473/Assignments/Assignment3/frontend/src/Components/organisms/qnaPage

csci_5709_b00954473/Assignments/Assignment3/frontend/src/Components/molecules/questions

**Tasks included**
1. Student and tutors both able to view the questionnarium page that consists of the interactions or the questions being asked

2. Students are able to even post a question which are then sorted with date and time

3. Once a particular question is clicked, a person can either answer to the question using the comment option or even reply to it

<br>

## Live Deployment
EduHub is deployed and accessible at the following URL:

Live Application: [eduhub-react-frontend.vercel.app](url) 

<br>

## Getting Started

### Prerequisites

- Node.js (version 12.x or higher)
- npm (version 6.x or higher) or Yarn (version 1.22.x or higher)
- MongoDB (version 4.x or higher)

### Installation

1. Clone the repository:

```bash
git clone https://git.cs.dal.ca/harshpreet/csci_5709_grp-06
cd eduhub
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Set up environment variables:

Copy the `.env.example` files in both the `frontend` and `backend` directories to `.env` and fill in the necessary details.

5. Start the backend server:

```bash
cd ../backend
npm start
```

6. Start the frontend application:

```bash
cd ../frontend
npm start
```

The application should now be running on `http://localhost:5173`.

## Usage

After installation, you can use EduHub to:

- **For Students**: Enroll in courses, participate in forums, read blogs, and take assessments.
- **For Educators**: Create and manage courses, engage with students in forums, and create assessments.

<!-- ## Contributing

We welcome contributions to EduHub! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests. -->

## Sources used:

**1. file path** : csci_5709_b00954473/Assignments/Assignment3/backend/controller/payment.js

const lineItems = product.map((products) => {
    return {
      price_data: {
        currency: "cad",
        product_data: {
          name: products.title
        },
        unit_amount: products.amount * 100,
      },
      quantity: 1
    };
  });


The above code was modified by using the code from below link
https://docs.stripe.com/payments

**2. file path:**
csci_5709_b00954473/Assignments/Assignment3/frontend/src/Components/organisms/qnaPage/sections/comment/index.jsx

/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import Replies from './replies';
import { getCommentByQid, replyToComment } from './comment.service';
import { setComment, setNewCommentText, resetCommentData } from './slice/commentsSlice';
import styles from '../../qnaPage.module.scss';

const CommentContainer = () => {
  const { qId } = useParams();
  const dispatch = useDispatch();
  const comment = useSelector(state => state.qnaPageReducer.commentReducer.comment);
  const newCommentText = useSelector(state => state.qnaPageReducer.commentReducer.newCommentText);
  const { userFullName = '' } = useSelector(state => state.userSlice);

  useEffect(() => {
    fetchComment();
    return () => {
      dispatch(resetCommentData());
    };
  }, []);

  const fetchComment = () => {
    getCommentByQid({ qId })
      .then(({ data: allComments }) => {
        dispatch(setComment(allComments));
        dispatch(setNewCommentText(''));
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const onAddNewComment = async () => {
    const payload = {
      questionId: qId,
      parentId: comment?._id,
      text: newCommentText,
      parentLvlCmt: true,
      userName: userFullName,
      answeredDate: new Date().valueOf(),
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

  const onAddNewCommmentHandler = async () => {
    await onAddNewComment();
    fetchComment();
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
          onClick={onAddNewCommmentHandler}
          style={{ display: newCommentText !== '' ? 'block' : 'none' }}
        >
          Comment
        </button>
      </section>
      {/* Comment Section */}
      <section className={styles.commentsSection}>
        <Replies
          comment={comment}
          fetchComment={fetchComment}
        />
      </section>
    </>
  );
};

export default CommentContainer;

The above code was modified by referring the code from the below link
https://dev.to/vigneshiyergithub/building-a-nested-comment-example-like-reddit-1o92


## License

EduHub is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to all contributors who have helped to build EduHub.
- Icons and visuals are credited to [FontAwesome](https://fontawesome.com/), [Ant Design Icons](https://ant.design/components/icon/), and other libraries used in the project.

## Project Status

EduHub is actively being developed and maintained. We aim to add more features and improve user experience continuously. For the latest updates, please check our [GitHub repository](https://github.com/dishaanand/eduhub).

---

This template is a starting point and can be customized further to include more specific details about the EduHub project, such as screenshots, code examples, technical architecture, and more.
