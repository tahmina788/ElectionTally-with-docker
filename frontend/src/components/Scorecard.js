import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import mobileicon from "../images/mobileicon.png";

const Scorecard = () => {
		
	const history = useHistory();
	const [formLayout, setFormLayout] = useState('default');
	
	const [scoreData, setScoreData] = useState({
		teamname: "", match: "", winresult: "", point: ""
	});

	let name, value;
	
	const handleDropdownChange = (event) => {
	setFormLayout(event.target.value);
	  }
	
	// we are storing data in states
	
	const handleInputs = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		//setScoreData({..scoreData, name: scoreData.teamname, match: scoreData.match, winresult: scoreData.winresult, point: scoreData.point});
		setScoreData({...scoreData, [name]:value});
	}

// send the data to backend
	
	const scorecardForm = async (e) => {
		e.preventDefault();
		
		const { teamname, match, winresult, point } = scoreData;
		
		console.log('score post data');
	    console.log(scoreData);
		
		const res = await fetch('/scorecard', {
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				teamname,
				match,
				winresult,
				point
			})
		});
		const data = await res.json();
		
		if(!data){
		  window.alert("score value not send");	
		} else {
			window.alert("score value send Successfull");
			setScoreData({ ...scoreData, message: ""})	
		}
	}


return(
        <>
		  <div className="contact_form">
			  <div className="container">
				  <div className="row">
					   <div className="col-lg-10 offset-lg-l">
							   <div className="contact_form_container py-5">
							   <div className="contact_form_title">
								  <div> Contact Form </div>
								</div>
								<div className="contact_form_title">
								   <select onChange={handleDropdownChange}>
                                   <option value="default">khulna city Election</option>
                                   <option value="alternate">Alternate layout</option>
                                  </select>
								</div>
								
								<form method="POST" id="contact_form">
								 {formLayout === 'default' ? (
								  <>
								  <div className="contact_form_name d-flex justify-content-between align-items-between">
									<input type="text" id="contact_form_name" className="contact_form_name input_field" name="teamname" value={scoreData.teamname} onChange={handleInputs} placeholder="team name" required="true" /> 
									<input type="email" id="contact_form_email" className="contact_form_email input_field" name="match" value={scoreData.match} onChange={handleInputs} placeholder="match number" required="true" />     
									<input type="text" id="contact_form_email" className="contact_form_email input_field" name="winresult" value={scoreData.winresult} onChange={handleInputs} placeholder="winresult number" required="true" />     
									<input type="text" id="contact_form_email" className="contact_form_email input_field" name="point" value={scoreData.point} onChange={handleInputs} placeholder="point number" required="true" />     
								  </div>
								 </>
									) : (
									  <>
								    <div className="contact_form_name d-flex justify-content-between align-items-between">
									<input type="text" id="contact_form_name" className="contact_form_name input_field" name="teamname" value={scoreData.teamname} onChange={handleInputs} placeholder="team name" required="true" /> 
									<input type="text" id="contact_form_email" className="contact_form_email input_field" name="winresult" value={scoreData.winresult} onChange={handleInputs} placeholder="winresult number" required="true" />     
									<input type="email" id="contact_form_email" className="contact_form_email input_field" name="match" value={scoreData.match} onChange={handleInputs} placeholder="match number" required="true" />     
									
									<input type="text" id="contact_form_email" className="contact_form_email input_field" name="point" value={scoreData.point} onChange={handleInputs} placeholder="point number" required="true" />     
								  </div>
								 </>
								 )}
								  <div className="contact_form_button">
									 <input type="submit" name="scoresubmit" id="scoresubmit" className="form-submit" value="scoresubmit" onClick={scorecardForm} />
								   </div>
								
								
								</form>
							  </div>
					  </div>
				  </div>
			  </div>
		</div>
		</>
)
}

export default Scorecard
	