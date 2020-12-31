import React from 'react';
import styles from './style.module.scss';

const AddOnComponent = (props) => {
  const {addOn, addFunc} = props;

  return(
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        {addOn.type}
      </div>
      <div className={styles.addBtnWrapper}>
        <div className={styles.price}>
          ${addOn.price}
        </div>
        <div className={styles.add} onClick={addFunc}>
          ADD
        </div>
      </div>
    </div>
  )
}

export default AddOnComponent;