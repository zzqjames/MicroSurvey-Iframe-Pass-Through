import { useEffect, useState } from "react"

import { getQuestions } from '../integration.ts'
 
const useFetch = (url, userID) => {

    const [data, setData] = useState(null)
    const [surveyID, setSurveyId] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [numberQuestions, setNumberQuestions] = useState(0)

    useEffect(() => {
        getQuestions(userID)
        .then(dataFetched => {
            setData(dataFetched.questions)
            setSurveyId(dataFetched.surveyId)
            setIsLoading(false)
            if (dataFetched.questions) {
                setNumberQuestions(dataFetched.questions.length)
            } else {
                setNumberQuestions(0)
            }
        })
        .catch(err => {
            console.log(err.message)
        })
    }, [url, userID, data, surveyID])
    return {data, isLoading, numberQuestions, surveyID}
}

export default useFetch;