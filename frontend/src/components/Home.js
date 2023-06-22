import React, {useState, useEffect} from 'react';
import cors from 'cors';

const Home = () => {

	const hostname = "localhost";
	const port = "5000";
	const [userName, setUserName] = useState('');
	const [show, setShow] = useState(false);
	//const show = true;
	const userHomePage = async() => {
		try{
			const res = await fetch('http://localhost:5000/getdatanew', {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			});
			const data = await res.json();
			
			setUserName(data.name);
			setShow(true);
		}catch(err){
			console.log(err);
		}
		
	}
	useEffect(() => {
		userHomePage();
	}, []);
	return(
	 <>
	 <div className="container">
	 <div className="home-page">
	   <div className="home-div">
	     <p className="pt-5">WELCOME {userName}</p>
		 <h2>{show ? 'welcome this project' : 'welcome this project'}</h2>
	   </div>
	 </div>
	 </div>  
	 </>
	)
}

export default Home