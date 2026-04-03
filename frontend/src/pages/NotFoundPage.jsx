import React from 'react'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="m-4">
      <h1>404</h1>
      <p>{t('notFoundPage.notFound')}</p>
    </div>
  )
}

export default NotFound
