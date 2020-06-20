export const getNextCrypto = index => ({
    type: 'next',
    index: index === 3 ? 0 : (index + 1)
})