/*!

=========================================================
* FIT Sixes 2023 Official page
=========================================================

* Designed by FIT batch 19

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, Col, Row } from 'reactstrap'
import axios from 'axios'
// reactstrap components

export default function ScoreCard({ matchData }) {
  const [match, setMatch] = useState()
  useEffect(() => {
    getOngoingMatch()
  }, [matchData])

  const getOngoingMatch = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL ||
          `https://j1kydf6tp3.execute-api.ap-south-1.amazonaws.com/dev/v1`
        }/matches/ongoing`
      )
      .then((res) => {
        setMatch(
          res.data.data.matches.matches.find(
            (obj) => obj.id === matchData.match_id
          )
        )
      })
      .catch((err) => {})
  }
  return (
    <>
      <Row className='justify-content-center'>
        <Col sm lg='12'>
          <Card className='card-live-score'>
            <CardBody>
              <Row className='row-grid justify-content-center'>
                <Col xs='4'>
                  <div className='info-live-score'>
                    <div className='live-score-title'>{match?.team1}</div>
                    <hr className='line-warning' />
                    <p>
                      {match?.scorecard.team1.marks || 0}/
                      {match?.scorecard.team1.wickets || 0}
                    </p>
                    <span>
                      {match?.scorecard.team1.overs || 0}.
                      {match?.scorecard.team1.balls || 0} ({match?.overs}.0)
                      overs
                    </span>
                  </div>
                </Col>
                <Col xs='4' lg='3' className=''></Col>
                <Col xs='4'>
                  <div className='info-live-score'>
                    <div className='live-score-title'>{match?.team2}</div>
                    <hr className='line-warning' />
                    <p>
                      {match?.scorecard.team2.marks || 0}/
                      {match?.scorecard.team2.wickets || 0}
                    </p>
                    <span>
                      {match?.scorecard.team2.overs || 0}.
                      {match?.scorecard.team2.balls || 0} ({match?.overs}.0)
                      overs
                    </span>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <div className='stats'>
                {match?.pitch_no ? ' Pitch  ' + match?.pitch_no : '-'}
              </div>
            </CardFooter>
            {/* test */}
          </Card>
        </Col>
      </Row>
    </>
  )
}
