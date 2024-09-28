import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import RootLayout from "./components/RootLayout/RootLayout"
import AnnotationItem from "./components/RootLayout/Annotation/AnnotationItem"



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="annotations">
              <Route path="" element={<AnnotationItem />}></Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/annotations" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
