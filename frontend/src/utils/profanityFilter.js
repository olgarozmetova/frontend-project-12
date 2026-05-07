import filter from 'leo-profanity'

const englishDict = filter.list()

// load Russian Dictionary
filter.loadDictionary('ru')

// add Russian & English
filter.add(englishDict)

export const profanityFilter = text => {
  if (!text || typeof text !== 'string') return text

  return filter.clean(text)
}

export default profanityFilter
