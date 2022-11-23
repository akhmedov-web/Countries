import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [value, setValue] = useState(false);
  const [data, setData] = useState([]);

  //1) Sahifani yangilaganda birinchi ishlaydigan funksiya
  useEffect(() => {
    axios.get("https://restcountries.com/v2/name/Uzbekistan")
      .then(response => setData(response.data[0]))
      .catch(err => console.log(err))
  }, [])

  //2) "Search" tugmasini bosganda ishlaydigan funksiya
  function getData() {
    if (value.length > 0) {
      axios.get(`https://restcountries.com/v2/name/${value}`)
        .then(response => setData(response.data[0]))
        .catch(err => notifyError());
    } else if (value == false) {
      notifyEmpty();
    }
  }

  //3) Form bo'sh bo'lganda ishlaydigan funksiya
  const notifyEmpty = () => {
    toast.warn("Form to'ldirilishi shart!!!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  //4) Bazada yo'q bo'lgan ma'lumotni qidirganda ishlaydigan funksiya
  const notifyError = () => {
    toast.error("Bunaqa davlat topilmadi!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <div className='container d-flex flex-xl-row flex-column'>
      <div className="leftBlock col-xl-6 col-12">
        <div className="input-group w-50">
          <input type="text" className='form form-control' placeholder='Mamlakat nomi...' onKeyPress={(e)=>{e.key=="Enter" ? getData() : setValue(e.target.value)}} onChange={(e) => setValue(e.target.value)} />
          <button className='btn btn-primary' onClick={() => getData()}>Search</button>
        </div>
      </div>
      <div className="rightBlock col-xl-6 col-12">
        <div className="card w-75">
          <img src={data.flag} alt="flag" className="card-img-top" />
          <div className="card-body">
            <table className='table'>
              <tbody>
                <tr>
                  <th>Nomi</th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>Poytaxti</th>
                  <td>{data.capital}</td>
                </tr>
                <tr>
                  <th>Qit'asi</th>
                  <td>{data.region}</td>
                </tr>
                <tr>
                  <th>Aholisi</th>
                  <td>{data.population}</td>
                </tr>
                <tr>
                  <th>Yer maydoni</th>
                  <td>{data.area} km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
