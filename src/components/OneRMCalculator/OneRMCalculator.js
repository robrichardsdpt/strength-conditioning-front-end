import React from 'react'

class OneRMCalculator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rmEstimate: 0
    }
  }

  render () {
    return (
      console.log('one rm')
    //   const repsToOneRM = function (reps, weight) {
    //     let oneRepMax = null
    //     if (reps === 1) {
    //         oneRepMax = weight
    //         return oneRepMax
    //     } else if (reps >= 2 && reps <= 15) {
    //         oneRepMax = Math.floor(weight * (36/(37-reps)))
    //         return oneRepMax
    //     } else {
    //         return 'Unable to accurately estimate 1RM.  Please enter appropriate amount of repetitions performed.'
    //     }
    // }
    )
  }
}

export default OneRMCalculator
