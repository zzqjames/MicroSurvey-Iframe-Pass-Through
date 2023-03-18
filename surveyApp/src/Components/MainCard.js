import useFetch from './useFetch.js';
import ContentCard from './ContentCard.js';
import { StyledLoading } from './Loader-style.js';

const MainCard = ({className, url, userID}) => {
    const {data, isLoading, numberQuestions, surveyID} = useFetch(url, userID)
    console.log('MainCard: ', userID, numberQuestions, surveyID)

    return ( 
        <div className={className}>
            {!isLoading && <h1>MicroSurvey</h1>}
            {!isLoading && <p>Details about the survey (optional)</p>}
            <span>
                {isLoading && <StyledLoading></StyledLoading>}
            </span>

            {true && <ContentCard data={data} numberQuestions={numberQuestions} userID={userID} surveyID={surveyID}></ContentCard>}
        </div>
     );
}
 
export default MainCard;