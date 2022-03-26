import './index.css'

const AppointmentItem = props => {
  const {appointment, onClickStar} = props
  const {id, title, date, isStarred} = appointment
  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const toggleStar = () => {
    onClickStar(id)
  }

  return (
    <li>
      <div className="title-container">
        <p className="title">{title}</p>
        <button
          type="button"
          testid="star"
          className="star-btn"
          onClick={toggleStar}
        >
          <img src={imageUrl} alt="star" />
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
