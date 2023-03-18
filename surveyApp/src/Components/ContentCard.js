import { useState } from 'react'
import { StyledAnswer } from './Answer-style';
import { StyledButton } from './Button-style'
import { StyledProgressButtonHolder } from './ProgressButtonHolder-style'
import { StyledInnerCard } from './InnerCard-style'
import { StyledContainer } from './Container-style'
import { StyledButtonHolder } from './ButtonHolder-style.js'
import { saveQuestions } from '../integration.ts'

const ContentCard = ({data, numberQuestions, userID, surveyID}) => {
    console.log('ContentCard: ', data, numberQuestions, userID, surveyID)

    const [answerArray, setAnswerArray] = useState(new Array(numberQuestions).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(0)

    function fillArray(newArray) {
        setAnswerArray(newArray);
    }

    const getButtonsUsingForLoop = (numberQuestions) => {
        const array = []
        for(var i = 0; i < numberQuestions; i++){
          let a = i;
          array.push(
            <StyledButton width={"auto"}
                onClick={()=>{
                    setCurrentQuestion(a);
                }}
                key={i}
                >Q{i+1}
            </StyledButton>)
        }
        return array
    }

    console.log('surveyID is ', surveyID)
    return (
        <div>
            {!surveyID ? (
                <StyledContainer>
                    <p>You have no incomplete surveys!</p>
                </StyledContainer>
            
            ) : (
            <>      <StyledContainer>
                        <StyledInnerCard width={"100%"} maxwidth={"80px"} height={"100%"} justify={"center"}>
                            {getButtonsUsingForLoop(numberQuestions)}
                        </StyledInnerCard>
                        <StyledInnerCard height="fit-content">
                            <h2 id='question-text'>{data[currentQuestion].questionTitle}</h2>
                            <StyledAnswer type={data[currentQuestion].questionType} options={data[currentQuestion].selections} qNum={currentQuestion} arrayChangeFunction={fillArray} answerArray={answerArray}></StyledAnswer>
                            <StyledProgressButtonHolder>
                                <StyledButton right={"9px"} width={"80px"}
                                    onClick={() => {
                                        setCurrentQuestion(Math.max(0, currentQuestion - 1));
                                    } }
                                >Previous</StyledButton>
                                <StyledButton right={"9px"} width={"80px"}
                                    onClick={() => {
                                        setCurrentQuestion(Math.min(numberQuestions - 1, currentQuestion + 1));
                                    } }
                                >Next</StyledButton>
                            </StyledProgressButtonHolder>
                        </StyledInnerCard>
                    </StyledContainer>
                    <StyledButtonHolder>
                            <button onClick={() => {
                                console.log(answerArray);
                                saveQuestions(surveyID, userID, answerArray);
                                surveyID = null;
                            } }>Submit</button>
                    </StyledButtonHolder></>
            )}
        </div>
        
     );
}
 
export default ContentCard;