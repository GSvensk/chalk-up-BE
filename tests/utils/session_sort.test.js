const sessionSort = require('../../utils/session_sort')

const sessions = [
    {
        dateTime: new Date('2020-01-01')
    },
    {
        dateTime: new Date('2018-01-01')
    },
    {
        dateTime: new Date('2019-01-01')
    }
]

describe('session sort', () => {

    test('sorts a list according to the datetime attribute', () => {

        const sortedList = [
            {
                dateTime: new Date('2020-01-01')
            },
            {
                dateTime: new Date('2019-01-01')
            },
            {
                dateTime: new Date('2018-01-01')
            }
        ]
        expect(sessionSort(sessions)).toEqual(sortedList)
    })

    test('returns an empty list when it is inputted', () => {
        expect(sessionSort([])).toEqual([])
    })
})