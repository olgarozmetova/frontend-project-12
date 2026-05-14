import * as yup from 'yup'

export const configureChannelSchema = (t, channels) => yup.object().shape({
  name: yup
    .string()
    .test(
      'length',
      t('channels.validation.length'),
      value => value && value.length >= 3 && value.length <= 20,
    )
    .test(
      'unique',
      t('channels.validation.duplicate'),
      value => !channels.some(c => c.name === value),
    )
    .required(t('channels.validation.required')),
})
