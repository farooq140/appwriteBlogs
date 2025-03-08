
import PropTypes from 'prop-types'

function Logo({width='100px'}) {
  return (
    <div className='p-4' style={{ width }}>Logo</div>
  )
}

Logo.propTypes = {
  width: PropTypes.string
}

export default Logo