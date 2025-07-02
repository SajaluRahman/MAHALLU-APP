

import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div >
     <ToastContainer
  position="top-right"
  autoClose={2500}
  limit={3} // avoid clutter
  closeOnClick
  pauseOnHover
  draggable
  hideProgressBar={false}
  toastStyle={{ fontSize: '0.9rem', borderRadius: '12px', padding: '12px 16px',width:'250px' }}

/>

    </div>
  )
}

export default App