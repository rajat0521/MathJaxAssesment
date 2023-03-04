import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Pagination from '@mui/material/Pagination';

const totalQuestions = 3; //as mentioned in question

const questionIds = [
  "AreaUnderTheCurve_901",
  "BinomialTheorem_901",
  "DifferentialCalculus2_901",
]

function App() {

  const [questionNumber, setQuestionNumber] = useState(1)
  const [questionDetail, setQuestionDetail] = useState('')

  useEffect(() => {
    const Url = `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionIds[questionNumber-1]}`;
    axios.get(Url)
    .then((res) => {
      console.log(res)
      setQuestionDetail(res.data[0].Question);
    })
  }, [questionNumber])


  const handleChange = (event, value) => {
    setQuestionNumber(value);
  };

  return (
    <div className="App">
      <h1 style={{display: "flex", justifyContent: "center"}}>
        Welcome to NioClass
      </h1>

      <div 
        style={{
          marginLeft: "20px", 
          marginRight: "20px"
        }}
      >
        <h2 
          style={{
            marginBottom: "30px"
          }}
        >
          Question No. {questionNumber}
        </h2>
        <MathJaxContext>
          <MathJax>
            <h3>
              {questionDetail}
            </h3>
          </MathJax>
        </MathJaxContext>
      </div>

      <Pagination 
        count={totalQuestions} 
        page={questionNumber} 
        onChange={handleChange} 
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center"
        }}
      />


    </div>
  );
}

export default App;
