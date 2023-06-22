import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';



const ScorecardFrontend = () => {
	
		const history = useHistory();
        const [scorecardData, setScorecardData] = useState({});
		let name, value;
		
   const scorecardValue = async() => {
	try{
	const res = await fetch('/getdatascorecard',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
	console.log('score data');
	console.log(data);
	setScorecardData(data);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
	//history.push('./login');
	}
	}
	useEffect(()=>{
	   scorecardValue();
	},[]);
	
	return(
	 <>
	    <div className="contact_info">
		<div className="container-fluid">
		  <div className="row">
		    <div className="col-lg-10 offset-lg-l d-flex justify-content-between">
			{/* mobile number */}
		     <div className="contact_info_item d-flex justify-content-start align-items-center">
				 
				  <div className="contact_info_content">
					  <div className="contact_info_title">
					  name
					   </div>
						<div className="contact_info_text">
						   {scorecardData.teamname}
					   </div>
					   <div className="contact_info_text">
						   {scorecardData.match}
					   </div>
					   <div className="contact_info_text">
						   {scorecardData.winresult}
					   </div>
					    <div className="contact_info_text">
						   {scorecardData.point}
					   </div>
			
				   </div>
		
		     </div>
			 
			  </div>
		
		   </div>
		
		</div>
		
		</div>
		
	 
	 
	  </>
	)
	
}

export default ScorecardFrontend