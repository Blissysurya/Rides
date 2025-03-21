import React from 'react'

const Home = () => {
const [pickup, setPickup] = useState('')
const [destination, setDestination] = useState('')
con
    const submitHandler=(e)=>{
        e.preventDefault()
        // console.log('Form submitted')

    }

  return (
    <div className='h-screen relative'>
        <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
        <div className='h-screen w-screen'>
            {/* Temporary image*/}
            <img className='h-full w-full object-cover object-fit' src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt='background' />
        </div>
        <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
            <div className='h-[30%] p-5 bg-white relative'>
            <h4 className='text-3xl font-semibold'>Find a trip</h4>
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
                <input
                value={pickup}
                onChange={(e)=>{setPickup(e.target.value)}}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pickup location' />
                <input
                value={destination}
                onChange={(e)=>{setDestination(e.target.value)}}
                className='bg-[#eee] px-12  py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Add a destination' />
            </form>
        </div>
        <div className=' bg-red-500  h-0' />

        </div>
    </div>
  )
}

export default Home