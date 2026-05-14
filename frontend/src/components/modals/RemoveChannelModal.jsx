import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { deleteChannel } from '../../store/channelsThunks'
import { setCurrentChannel } from '../../store/channelsSlice'

import {
  Modal,
  Button,
} from '../bootstrap'

const RemoveChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const defaultChannelId = useSelector(
    state => state.channels.defaultChannelId,
  )

  const handleRemove = async () => {
    try {
      await dispatch(deleteChannel(channel.id)).unwrap()

      dispatch(setCurrentChannel(defaultChannelId))

      onHide()
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{t('modals.removeConfirm')}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          {t('modals.cancel')}
        </Button>

        <Button
          variant="danger"
          onClick={handleRemove}
        >
          {t('channels.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
