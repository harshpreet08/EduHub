/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input, Button, message,
} from 'antd';
import { useQuill } from 'react-quilljs';
/* internal components */
import Modal from '../../atom/modal/index';
/* slices */
import { setDescription, setTitle, setModalVisible } from './slice/modalSlice';
/* services */
import { postQuestion } from '../questions/Questions.service';
/* styles */
import styles from './index.module.scss';
import 'quill/dist/quill.snow.css';

const ModalWrapper = ({
  title = '',
  onSubmit = () => {},
}) => {
  const { quill, quillRef } = useQuill();
  const dispatch = useDispatch();
  const qTitle = useSelector(state => state.modalReducer.qTitle);
  const qDesc = useSelector(state => state.modalReducer.qDesc);
  const isModalVisible = useSelector(state => state.modalReducer.isModalVisible);
  const { firstName, lastName } = useSelector(state => state.userReducer.userDetails)

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        dispatch(setDescription(quill.getText()));
      });
    }
  }, [quill]);
  const handleCancel = () => {
    dispatch(setModalVisible(false));
  };
  const resetData = () => {
    dispatch(setModalVisible(false));
    dispatch(setTitle(''));
    dispatch(setDescription(''));
  };

  const handleSave = () => {
    const payload = {
      qTitle,
      qDesc,
      askedByUsername: `${firstName}, ${lastName}`,
    };
    postQuestion(payload)
      .then((response) => {
        if (response.statusText === 'OK') {
          onSubmit();
          resetData();
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };
  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      title={title}
      className={styles.modalContainer}
      footer={[<Button key="post" onClick={handleSave}>Post</Button>]}
    >
      <div className={styles.postCreationContainer}>
        <section>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            value={qTitle}
            onChange={e => dispatch(setTitle(e.target.value))}
          />
        </section>
        <section>
          <label htmlFor="description">Description</label>
          <div className={styles.quilEditor}>
            <div ref={quillRef} />
          </div>
        </section>
      </div>
    </Modal>
  );
};
export default ModalWrapper;
