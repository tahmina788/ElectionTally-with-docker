import React, { useContext, useEffect,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink,useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';




import { UserContext } from "../App";

const Navbar = () => {
	const { state, dispatch } = useContext(UserContext);
	
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

  useEffect(() => {
    const authenticated = localStorage.getItem('authenticated');
    if (authenticated) {
      setIsLoggedIn(true);
    }
  }, []);
  
  function handleLogin() {
    // Make API call to your Express.js server to authenticate user
    // Once user is authenticated, set isLoggedIn to true and store in local storage
    setIsLoggedIn(true);
    localStorage.setItem('authenticated', 'true');
  }
  
  function handleLoginN() {
  window.location.href = '/login';
  localStorage.setItem('authenticated', 'true');
  }
  
  function handleLoginNew() {
    // Navigate to the login page using React Router
    history.push('/login');
  }

  function handleLogout() {
    // Make API call to your Express.js server to logout user
    // Once user is logged out, set isLoggedIn to false and remove from local storage
    setIsLoggedIn(false);
    localStorage.removeItem('authenticated');
  }

console.log('isLoggedIn')	
console.log(isLoggedIn)
console.log(state)
	
	const RenderMenu = () => {
		if ((!isLoggedIn && state) || (isLoggedIn && !state)) {
			return(
			  <>
				<li className="nav-item">
				   <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
				</li>
				<li className="nav-item">
				   <NavLink className="nav-link" to="/electionalldatalist">Election List</NavLink>
				</li> 
				<li className="nav-item">
			       <NavLink className="nav-link" to="/addelectionname">Add Election Name</NavLink>
			    </li>
	  <li className="nav-item dropdown">
        <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
         >
        Constitution
         </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
		 <NavLink className="dropdown-item" to="/constitutionbangla">Constitution Bangla</NavLink>
		 <NavLink className="dropdown-item" to="/constitutionenglish">Constitution English</NavLink>
		 <NavLink className="dropdown-item" to="/constitutionalldata">Constitution All data</NavLink>
        </div>
      </li>
	  
	
	 <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Candidate
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
		 <NavLink className="dropdown-item" to="/candidateenglish">Candidate English</NavLink>
		 <NavLink className="dropdown-item" to="/candidateforbangla">Candidate For Bangla </NavLink>     
		 <NavLink className="dropdown-item" to="/candidatealldatalist">Candidate All data </NavLink>
        </div>
      </li>
	  
				<li className="nav-item">
				   <li className="nav-item"><NavLink className="nav-link" onClick={handleLogout} to="/logout">Logout</NavLink></li>    
				</li>    		
			  </>
			)
		} else{
			return(
		<>
			<li className="nav-item">
			  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
			</li>
			<li className="nav-item">
			  <li className="nav-item"><NavLink className="nav-link" onClick={handleLoginNew} to="/login">Login</NavLink></li>
			</li>
			<li className="nav-item">
			  <NavLink className="nav-link" to="/signup">Register</NavLink>
			</li>    		
        </>	
			)
			
		}
		
	}
	
	return(
	 <>
	 <section id="nav-bar">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#"><img src="images/demo-logo.png"/></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <i className="fa fa-bars"></i>
  </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <RenderMenu />
      </ul>
    </div>
</nav>
</section>
	 </>
	)
}

export default Navbar