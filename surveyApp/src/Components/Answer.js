import { StyledMultipleAnswer } from "./MultipleOptions-style";
import { StyledShortAnswer } from "./ShortText-style";

const Answer = ( {className,type, options, qNum, arrayChangeFunction, answerArray} ) => {

    const getDropdownOptions = (num) => {
        const array = []
        for(var i = 0; i < num; i++){
          let a = i;
          array.push(
            <option key={a}>{options[a]}</option>)
        }
        return array
    }

    function changeAnswerArray(answerArray, qNum, value) {
        const newArray = [...answerArray]
        newArray[qNum] = value
        arrayChangeFunction(newArray)
    }

    const getMultipleOptions = (num) => {
        const optionsArray= new Array(num).fill("0");
        const array = []
        for(var i = 0; i < num; i++){
          let a = i;
          array.push(<div key={a}>
                <input onChange={
                    (event) => {
                            if (event.target.checked) {
                              optionsArray[a] = "1"
                            } else {
                              optionsArray[a] = "0"
                            }
                        changeAnswerArray(answerArray, qNum, optionsArray.join())
                    }
                }
                type="checkbox"
                id={a}
                />
                    <p>{options[a]}</p>
                </div>
          )
        }
        return array
    }

    const findCorrectArea = (type) => {
        if (type === "LONG_ANSWER") {
            return <textarea name="" id="" cols="30" rows="10" onChange={
                (event) => {
                    changeAnswerArray(answerArray, qNum, event.target.value)
                }
            }></textarea>
        } else if (type === "MULTIPLE_SELECTION") {
            const numberOptions = Object.keys(options).length
            return <select name="" id="" onChange={
                (event) => {
                    changeAnswerArray(answerArray, qNum, event.target.value)
                }
            }>
                {getDropdownOptions(numberOptions)}
            </select>
        } else if (type === "SHORT_ANSWER") {
            return <StyledShortAnswer>
                        <input type="text" onChange={
                            (event) => {
                                changeAnswerArray(answerArray, qNum, event.target.value)
                            }
                        }></input>
                    </StyledShortAnswer>
        } else if (type === "SINGLE_SELECTION") {
            const numberOptions = Object.keys(options).length
            return <StyledMultipleAnswer>
                {getMultipleOptions(numberOptions)}
            </StyledMultipleAnswer>
        }
    }

    return ( 
        <div className={className}>
            {findCorrectArea(type)}
        </div>
     );
}
 
export default Answer;