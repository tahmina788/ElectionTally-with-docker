import React from 'react';
import { useTranslation } from 'react-i18next';

function Greeting() {
  const { t } = useTranslation();

  return <h5>{t('Election id')}</h5>;
}

export default Greeting;