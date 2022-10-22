import React from 'react';
import styles from './error-404.module.css';

export default function Error404() {
  return (
    <div className={styles.error_text}>
      <p className="text text_type_main-large">Ошибка 404...</p>
      <p className="text text_type_main-large">Страница не найдена</p>
    </div>
  );
}
