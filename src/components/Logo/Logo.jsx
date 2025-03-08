import "../../../public/logo.png"


function Logo({width = '100px'}) {
  return (
    <div className='p-4 '  >
      
      <img src="../../../public/logo.png" alt="Logo" width={width} className=" rounded-lg" />
    </div>
  )
}


export default Logo