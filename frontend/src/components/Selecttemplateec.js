//addelectionname
//  banglaelectionname  ,  englishelectionname ,  politicalpartylogo

import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import mobileicon from "../images/mobileicon.png";

const Addelectionname = () => {
		
	const history = useHistory();
	const [formLayout, setFormLayout] = useState('default');
	
	const [electionNameData, setelectionNameData] = useState({
		banglaelectionname: "", englishelectionname: "", politicalpartylogo: ""
	});
	
	const [ecKhulnaData, setecKhulnaData] = useState({
		pollstitle: "", politicalparty: "", candidatename: "", numberofseats: "" , numberofvotes: "", receivedcenterresults: ""
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
		setelectionNameData({...electionNameData, [name]:value});
	}
	
	
		// we are storing data in states
	
	const handleeckhulnaInputs = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		setecKhulnaData({...ecKhulnaData, [name]:value});
	}

// send the data to backend
	
	const electionNameForm = async (e) => {
		e.preventDefault();
		
		const { banglaelectionname, englishelectionname, politicalpartylogo } = electionNameData;
		
		console.log('election post data');
	    console.log(electionNameData);
		
		const res = await fetch('/addelectionname', {
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				banglaelectionname,
				englishelectionname,
				politicalpartylogo
			})
		});
		const data = await res.json();
		
		if(!data){
		  window.alert("election value not send");	
		} else {
			window.alert("election value send Successfull");
			setelectionNameData({ ...electionNameData, message: ""})	
		}
	}
	
	const ecKhulnaNameForm = async (e) => {
		e.preventDefault();
		
		
		const { pollstitle, politicalparty, candidatename, numberofseats, numberofvotes, receivedcenterresults  } = ecKhulnaData;
		
		console.log('election post data');
	    console.log(ecKhulnaData);
		
		const res = await fetch('/addcityelection', {
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				pollstitle,
				politicalparty,
				candidatename,
				numberofseats,
				numberofvotes,
				receivedcenterresults
				
			})
		});
		const data = await res.json();
		
		if(!data){
		  window.alert("election value not send");	
		} else {
			window.alert("election value send Successfull");
			setecKhulnaData({ ...ecKhulnaData, message: ""})	
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
								  <div> Select dropdown value  </div>
								</div>
								<div className="contact_form_title">
								   <select onChange={handleDropdownChange}>
                                   <option value="default">Add Election Name</option>
								   <option value="khulnacityelection">Khulna Election layout</option>
                                  </select>
								</div>
								
								<br/>
												
	<form method="POST" id="contact_form">
	 {formLayout === 'default' ? (
	  <>
	  <div className="contact_form_name d-flex justify-content-between align-items-between">
		<input type="text" id="contact_form_name" className="contact_form_name input_field" name="banglaelectionname" value={electionNameData.banglaelectionname} onChange={handleInputs} placeholder="banglaelectionname" required="true" /> 
		<input type="text" id="contact_form_name" className="contact_form_name input_field" name="englishelectionname" value={electionNameData.englishelectionname} onChange={handleInputs} placeholder="englishelectionname" required="true" />          
		<input type="text" id="contact_form_name" className="contact_form_name input_field" name="englishelectionname" value={electionNameData.politicalpartylogo} onChange={handleInputs} placeholder="englishelectionname" required="true" />          
	  </div>
	  <br/>
	   <div className="contact_form_button">
		 <input type="submit" name="electionnamesubmit" id="electionnamesubmit" className="form-submit" value="submit" onClick={electionNameForm} />
	   </div>
	 </>
		) : (
		  <>
		<div className="election_form_name d-flex justify-content-between align-items-between">
		<input type="text" id="election_form_name" name="pollstitle" value={ecKhulnaData.pollstitle} onChange={handleeckhulnaInputs} placeholder="pollstitle" required="true" />  <br/>
		<input type="text" id="election_form_email" name="politicalparty" value={ecKhulnaData.politicalparty} onChange={handleeckhulnaInputs} placeholder="politicalparty" required="true" />    <br/>  
		<input type="text" id="election_form_email" name="candidatename" value={ecKhulnaData.candidatename} onChange={handleeckhulnaInputs} placeholder="candidatename" required="true" />     <br/> 
		
		<input type="text" id="election_form_email" name="numberofseats" value={ecKhulnaData.numberofseats} onChange={handleeckhulnaInputs} placeholder="numberofseats" required="true" />    <br/>  
		<input type="text" id="election_form_email" name="numberofvotes" value={ecKhulnaData.numberofvotes} onChange={handleeckhulnaInputs} placeholder="numberofvotes" required="true" />    <br/>  
		<input type="text" id="election_form_email" name="receivedcenterresults" value={ecKhulnaData.receivedcenterresults} onChange={handleeckhulnaInputs} placeholder="receivedcenterresults" required="true" />     
	  </div>
	  <br/>
		<div className="contact_form_button">
		 <input type="submit" name="ecKhulnasubmit" id="ecKhulnasubmit" className="form-submit" value="submit" onClick={ecKhulnaNameForm} />
	   </div>
	 </>
	 )}
	</form>
							  </div>
					  </div>
				  </div>
			  </div>
		</div>
		</>
)
}

export default Addelectionname
	