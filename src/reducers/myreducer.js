const initialState = {
  num: 0,
  malicious: null,
  submissions: null,
  totalActive: null,
  totalCompleted: null,
  totalMalicious: null,
  totalSubmissions: null,
  totalNonSpecific: null,
  totalPrivate: null,
  totalPublic: null,
  totalSuspicious: null,
  totalUsers: null,
  error: ""
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      console.log(state.num)
      return {
        ...state,
        num: state.num + 1
      }
    case "FetchData":
      return {
        ...state,
        malicious: action.payload.malicious,
        submissions: action.payload.submissions,
        totalActive: action.payload.totalActive,
        totalCompleted: action.payload.totalCompleted,
        totalMalicious: action.payload.totalMalicious,
        totalSubmissions: action.payload.totalSubmissions,
        totalNonSpecific: action.payload.totalNonSpecific,
        totalPrivate: action.payload.totalPrivate,
        totalPublic: action.payload.totalPublic,
        totalSuspicious: action.payload.totalSuspicious,
        totalUsers: action.payload.totalUsers
      }
    case "ERROR":
      return {
        ...state,
        error: action.msg
      }
    default:
      return state
  }
}

export default reducer;