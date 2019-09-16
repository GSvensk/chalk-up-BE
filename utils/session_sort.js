
const compareSessions = (sessionA, sessionB) => {

    const dateTimeA = new Date(sessionA.dateTime)
    const dateTimeB = new Date(sessionB.dateTime)

    if (dateTimeA < dateTimeB) {
        return 1;
    }
    if (dateTimeA > dateTimeB) {
        return -1;
    }
    return 0;
}

const sortSessions = (sessions) => sessions.sort(compareSessions)


module.exports = sortSessions