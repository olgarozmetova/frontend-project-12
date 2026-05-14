import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Formik, Form as FormikForm, Field } from 'formik'
import profanityFilter from '../../utils/profanityFilter'
import { configureChannelSchema } from '../../validation/channelSchema'
import { updateChannel } from '../../store/channelsThunks'

import {
  Modal,
  Button,
} from '../bootstrap'

const RenameChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const channels = useSelector(state => state.channels.list)
  const error = useSelector(state => state.channels.error)

  const channelSchema = configureChannelSchema(t, channels)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const cleanName = profanityFilter(values.name)

      await dispatch(
        updateChannel({
          id: channel.id,
          name: cleanName,
        }),
      ).unwrap()

      onHide()
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: channel?.name ?? '' }}
        validationSchema={channelSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              {error && (
                <div className="alert alert-danger">
                  {t(error)}
                </div>
              )}

              <label
                htmlFor="rename-channel-name"
                className="form-label"
              >
                {t('channels.name')}
              </label>

              <Field
                id="rename-channel-name"
                name="name"
                autoFocus
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />

              {errors.name && (
                <div className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={onHide}
              >
                {t('modals.cancel')}
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {t('modals.send')}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  )
}

export default RenameChannelModal
