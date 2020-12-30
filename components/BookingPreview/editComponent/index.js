import React from 'react';
import styles from './style.module.scss';

const BookingEditComponent = (props) => {
  const {str, editFunc} = props;

  return(
    <div className={styles.container}>
      <div>
        {str}
      </div>
      <div onClick={editFunc}>
        EDIT
      </div>
    </div>
  )
}

export default BookingEditComponent;