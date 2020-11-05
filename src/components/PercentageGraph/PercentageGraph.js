import React from 'react'
import { Pie } from 'react-chartjs-2'
import { MDBContainer } from 'mdbreact'

class PercentageGraph extends React.Component {
  state = {
    token: this.props.user.token,
    clientCurrentData: this.props.current,
    clientGoalData: this.props.goal,
    data: {},
    dataPie: {
      labels: ['Left to attain goal', 'Current Performance'],
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#F7464A',
            '#46BFBD'
          ],
          hoverBackgroundColor: [
            '#FF5A5E',
            '#5AD3D1'
          ]
        }
      ]
    }
  }

  render () {
    console.log(this.props)
    console.log(this.props.current)
    const weightLeft = (this.props.goal - this.props.current)
    const currentData = this.props.current
    console.log(currentData)
    const dataCopy = Object.assign({}, this.state.dataPie)
    console.log(dataCopy.datasets)
    dataCopy.datasets[0].data[0] = weightLeft
    dataCopy.datasets[0].data[1] = currentData
    return (
      <MDBContainer>
        <Pie data={dataCopy} options={{ responsive: true }} />
      </MDBContainer>
    )
  }
}

export default PercentageGraph
