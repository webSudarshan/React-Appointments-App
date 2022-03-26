/* eslint-disable no-alert */
import {Component} from 'react'
import {format, parseISO} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], starred: false}

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onChangeDate = e => {
    const date = e.target.value
    const formattedDate = format(parseISO(date), 'dd MMMM yyyy, EEEE')
    this.setState({date: formattedDate})
  }

  addAppointment = e => {
    e.preventDefault()
    const {title, date} = this.state
    if (title === '') {
      alert('Enter Title')
    } else if (date === '') {
      alert('Enter Date')
    } else {
      const id = uuidv4()
      const appointmentItem = {
        id,
        title,
        date,
        isStarred: false,
      }
      this.setState(prevState => ({
        title: '',
        date: '',
        appointmentsList: [...prevState.appointmentsList, appointmentItem],
      }))
    }
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          const appointmentItem = {...eachItem, isStarred: !eachItem.isStarred}
          return appointmentItem
        }
        return eachItem
      }),
    }))
  }

  toggleStarred = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  render() {
    const {title, appointmentsList, starred} = this.state
    const filteredList = starred
      ? appointmentsList.filter(eachItem => eachItem.isStarred === true)
      : appointmentsList
    return (
      <div className="container">
        <div className="card">
          <form onSubmit={this.addAppointment}>
            <div className="input-container">
              <h1>Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <br />
              <label htmlFor="date">DATE</label>
              <br />
              <input type="date" id="date" onChange={this.onChangeDate} />
              <br />
              <button className="add-btn" type="submit">
                Add
              </button>
            </div>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </form>
          <div className="btm-container">
            <div className="appointments-heading">
              <h2>Appointments</h2>
              {starred ? (
                <button
                  className="starred-btn clicked"
                  type="button"
                  onClick={this.toggleStarred}
                >
                  Starred
                </button>
              ) : (
                <button
                  className="starred-btn"
                  type="button"
                  onClick={this.toggleStarred}
                >
                  Starred
                </button>
              )}
            </div>
            <ul>
              {filteredList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointment={eachItem}
                  onClickStar={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
