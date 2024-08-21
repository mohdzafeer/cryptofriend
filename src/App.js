import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Headrer";
import Home from "./Pages/Home";
import CoinPage from "./Pages/CoinPage";
import Footer from "./Components/Footer";




function App() {

  // const useStyles = makeStyles(()=>({
  //   App:{
  //     backgroundColor:'#14161a',
  //     color:'#F8F9FA',
  //     minHeight:'100vh',
  //     display:'flex',
  //     justifyContent:'center',
  //     alignItems:'center',
  //   }
  // }))

  // const classes=useStyles()


  return (
    <div className="bg-black min-h-screen text-yellow-600 font-semibold ">
      {/* // <div className={classes.App}> */}
      <BrowserRouter>
        <div className="flex h-full  flex-col ">
          <div>
            <div>
              <Header />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coins/:id" element={<CoinPage />} />
            </Routes>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
