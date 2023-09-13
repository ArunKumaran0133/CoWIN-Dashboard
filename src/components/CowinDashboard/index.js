import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusObj = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'IS_LOADING',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusObj.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    this.setState({apiStatus: apiStatusObj.isLoading})
    const {apiStatus} = this.state
    console.log(apiStatus)

    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        last7DaysVaccinationData: data.last_7_days_vaccination.map(
          eachData => ({
            vaccineDate: eachData.vaccine_date,
            dose1: eachData.dose_1,
            dose2: eachData.dose_2,
          }),
        ),
        vaccinationByAge: data.vaccination_by_age.map(eachData => ({
          age: eachData.age,
          count: eachData.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachData => ({
          gender: eachData.gender,
          count: eachData.count,
        })),
      }

      this.setState({
        apiStatus: apiStatusObj.success,
        vaccinationData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

  renderSuccessView = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <VaccinationCoverage
          last7DaysVaccinationData={vaccinationData.last7DaysVaccinationData}
        />

        <VaccinationByGender
          vaccinationByGender={vaccinationData.vaccinationByGender}
        />

        <VaccinationByAge vaccinationByAge={vaccinationData.vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#cbd5e1" />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObj.success:
        return this.renderSuccessView()
      case apiStatusObj.failure:
        return this.renderFailureView()
      case apiStatusObj.isLoading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {vaccinationData} = this.state
    console.log(vaccinationData.last7DaysVaccinationData)
    return (
      <div className="coWin-bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="coWin-logo"
          />
          <p className="coWin-text">co-Win</p>
        </div>
        <h1 className="coWin-heading">coWin Vaccination in India</h1>
        {this.renderResultView()}
      </div>
    )
  }
}

export default CowinDashboard
