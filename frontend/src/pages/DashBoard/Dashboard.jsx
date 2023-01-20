import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getGoals, reset } from '../../features/goals/goalSlice'
import Spinner from '../../components/Spinner'
import Header from '../../components/Header';
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getGoals)

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading){
    return <Spinner />
  }

  return (
  <>
    <Header />
    <div className="row">
      <div className="column">
        <div className="card">
          <h3>Tender</h3>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <h3>S/M</h3>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <h3>Cost</h3>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <h3>SP & T</h3>
        </div>
      </div>
    </div>
    
    <div className="row">

    <div className="column">
        <div className="card">
          <h3>RFI</h3>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <h3>Rep</h3>
        </div>
      </div>
    </div>
  </>
  )
}

export default Dashboard