import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRollbar } from '@rollbar/react'

const NotFound = () => {
  const { t } = useTranslation()
  const rollbar = useRollbar()

  return (
    <>
      <div className="m-4">
        <h1>404</h1>
        <p>{t('notFoundPage.notFound')}</p>
      </div>

      <div>
        <button onClick={() => rollbar.info('Test message from React')}>
          Send Test Message
        </button>
        <button
          onClick={() => {
            throw new Error('Test error from React ErrorBoundary')
          }}
        >
          Trigger Test Error
        </button>
      </div>
    </>
  )
}

export default NotFound
