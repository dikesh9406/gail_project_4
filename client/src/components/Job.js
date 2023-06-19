import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

const Job = ({
  _id,
  motorName,
  motorBrand,
  motorLocation,
  motorStatus,
  createdAt,
  motorType,
}) => {
  const { setEditJob, deleteJob } = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{motorBrand.charAt(0)}</div>
        <div className='info'>
          <h5>{motorName}</h5>
          <p>{motorBrand}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={motorLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={motorStatus} />
          <div className={`motorType ${motorType}`}>{motorType}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
