import React from 'react'
import { Pie } from 'react-chartjs-2'
import { MDBContainer } from 'mdbreact'

class PercentOfTotal extends React.Component {
  state = {
    token: this.props.user.token,
    clientCurrentData: this.props.current,
    clientGoalData: this.props.goal,
    data: {},
    dataPie: {
      labels: ['Squat 1RM', 'Bench 1RM', 'Deadlift 1RM'],
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#F7464A',
            '#46BFBD',
            '#FDB45C'
          ],
          hoverBackgroundColor: [
            '#FF5A5E',
            '#5AD3D1',
            '#FFC870'
          ]
        }
      ]
    }
  }

  render () {
    console.log(this.props)
    console.log(this.props.current)
    const squat = this.props.squat
    const bench = this.props.bench
    const deadlift = this.props.deadlift
    const dataCopy = Object.assign({}, this.state.dataPie)
    console.log(dataCopy.datasets)
    dataCopy.datasets[0].data[0] = squat
    dataCopy.datasets[0].data[1] = bench
    dataCopy.datasets[0].data[2] = deadlift
    return (
      <MDBContainer>
        <Pie data={dataCopy} options={{ responsive: true }} />
      </MDBContainer>
    )
  }
}

export default PercentOfTotal
