import Brand from "./component/Brand";
import Header from "./component/Header";
import Login from "./component/login";
import Product from "./component/Product";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Error from "./utils/error";
import Category from "./component/Category";

function App() {
  /*return (
    <>
      <div>
        <nav className="flex gap-10 bg-sky-500 border-2 rounded-sm py-2 pl-[1200px]">
          <div>Home</div>
          <div>Contact</div>
          <div>Profile</div>
        </nav>
      </div>
      <div className="border-2 p-2 m-2 flex gap-2 flex-wrap">
        <div className="w-[350px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
        <div className="w-[350px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
        <div className="w-[350px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
        <div className="w-[350px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
        <div className="w-[350px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
        <div className="w-[350px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
        <div className="w-[350px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
        <div className="w-[350px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
      </div>

      <div className="grid border-2 p-2 m-2 gap-2 grid-cols-2">
        <div className="w-[550px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
        <div className="w-[550px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
        <div className="w-[550px]">
          <img alt="image" src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_1920,c_limit/DSC_5903.jpg" />
        </div>
      </div>
    </>
  );*/

  const AppLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement : <Error/>
    },
    {
      path: "/",
      element: <AppLayout/>,
      errorElement : <Error/>,
      children: [
        {
          path: "product",
          element: <Product/>,
          //errorElement : <Error/>
        }, 
        {
          path: "brand",
          element : <Brand />,
          //errorElement : <Error/>
        },
        {
          path: "category",
          element : <Category/>
        },
        {
          path: "brand/:id",
          element : <Brand/>
        }
      ]

    }
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
} 

export default App;
