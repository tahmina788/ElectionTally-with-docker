import React , { useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./4.1.2bootstrap.min.css";
import "./electiontally2.css";


const ElectionResult4 = () => {
	
	const { t } = useTranslation();
	const { lng } = useParams();
	const { eid } = useParams();
	const { cid1 } = useParams();
	const { cid2 } = useParams();
	const { temptype } = useParams();
	const [electionData, setElectionData] = useState([]);
	const [constitutionData, setConstitutionData] = useState([]);
	const [candidateData, setCandidateData] = useState([]);
	
	
	
	const getElectionValue = async() => {
	try{
	const res = await fetch('/getelectiondata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})
	const data = await res.json();
	console.log('electiondata')
	console.log(data)
	setElectionData(data);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
	}
	}
	useEffect(()=>{
	   getElectionValue();
	},[]);
	const getConstitutionOptionValue = async() => {
	try{
	const res = await fetch('/getconstbangladata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})
	
	const optionsdata = await res.json();
	console.log('optionsdata')
	console.log(optionsdata)
	setConstitutionData(optionsdata);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(error){
		console.log(error);
		}
	}
	useEffect(()=>{
	   getConstitutionOptionValue();
	},[]);   
    const getCandidateValue = async() => {
	try{
	const res = await fetch('/getcandidatebangladata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
    setCandidateData(data);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
  	}
	}
	useEffect(()=>{
	   getCandidateValue();
	},[]);

	
	function convertToBengaliDigit(number) {
	  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
	  const numberString = number.toString();
	  let result = '';
	  
	  for (let i = 0; i < numberString.length; i++) {
		const digit = parseInt(numberString[i]);
		result += bengaliDigits[digit];
	  }
	  
	  return result;
	}
	

	   
   	const electionfilteredData = electionData.filter(
	  electionDataItem => electionDataItem.electionid === parseInt(eid)
	);

	const electionnameTitle = electionfilteredData.map(electionDataItem => {
	  return `${lng === 'bng' ? t(electionDataItem.englishelectionname) : electionDataItem.englishelectionname}`;
	});
	 console.log('electionnameTitle');console.log(electionnameTitle);
	 
	 const filteredConstitutionData = [];
     const filteredCandidateData = [];
	
	const constitutionfilteredData = constitutionData.filter(
	  constiDataItem => constiDataItem.electionid === `${eid}`
	);
	console.log('constitutionfilteredData');console.log(constitutionfilteredData);
	
	const candidatefilteredData = candidateData.filter(
	  candidateDataItem => candidateDataItem.electionid === `${eid}`
	);
	console.log('candidatefilteredData');console.log(candidatefilteredData);
	
	console.log('eid')
	console.log(eid)
	
	console.log('*************************************************************8888')
	
	const forConsElectionIds = constitutionData
	  .filter((data) => data.electionid === '9')
	  .map((data) => data.electionid);
	  
	  console.log('forConsElectionIds'); console.log(forConsElectionIds);

	const forCandidates = candidateData.filter((candidate) =>
	  forConsElectionIds.includes(candidate.electionid)
	);
	
	
  const mergedDataCandidates1st = constitutionData.filter((data) => data.constitutionid === `${cid1}`).map((data) => {
  const electionItem = electionData.find((item) => item.electionid === `${eid}`);
  const candidateItems = candidateData.filter((item) => item.electionid === `${eid}` && item.constitutionid === '12'); 
  return {
    ...electionItem,
    ...data,
    candidates: candidateItems // add the filtered candidate items to the merged object
  };
});

console.log('mergedDataCandidates1st'); console.log(mergedDataCandidates1st);

  const mergedDataCandidates2nd = constitutionData.filter((data) => data.constitutionid === `${cid2}`).map((data) => {
  const electionItem = electionData.find((item) => item.electionid === `${eid}`);
  const candidateItems = candidateData.filter((item) => item.electionid === `${eid}` && item.constitutionid === '13'); 
  return {
    ...electionItem,
    ...data,
    candidates: candidateItems // add the filtered candidate items to the merged object
  };
});

console.log('mergedDataCandidates2nd'); console.log(mergedDataCandidates2nd);
	
let partysymbol,candidatenamebangla,totalvote;

const filtered_array1 = [];   const filtered_array2 = [];

  mergedDataCandidates1st.map((mergedDataItem1st, index) => (	
  mergedDataItem1st.candidates
						 .sort((a, b) => b.totalvote - a.totalvote) // sort the candidates array in descending order based on their total votes
						 .map((candidate, candidateIndex) => (
						  filtered_array1.push({
         partysymbol: candidate.partysymbol,
         candidatenamebangla: candidate.candidatenamebangla,
         totalvote: candidate.totalvote
       })
	   ))
  ))



  const [totalcenter1] = mergedDataCandidates1st.map(dataCandidate => dataCandidate.totalcenter);
    console.log(totalcenter1);
   
  const [obtainedcenter1] = mergedDataCandidates1st.map(dataCandidate => dataCandidate.obtainedcenter);
    console.log(obtainedcenter1);
	const [candidatenamebangla1, candidatenamebangla2] = filtered_array1.map(filtered => filtered.candidatenamebangla);
	console.log(candidatenamebangla1);
	console.log(candidatenamebangla2);

	const [totalvote1, totalvote2] = filtered_array1.map(filtered => filtered.totalvote);
	console.log(totalvote1);
	console.log(totalvote2);

	const [partysymbol1, partysymbol2] = filtered_array1.map(filtered => filtered.partysymbol);
	console.log(partysymbol1);
	console.log(partysymbol2);


  mergedDataCandidates2nd.map((mergedDataItem2nd, index) => (	
  mergedDataItem2nd.candidates
						 .sort((a, b) => b.totalvote - a.totalvote) // sort the candidates array in descending order based on their total votes
						 .map((candidate, candidateIndex) => (
						  filtered_array2.push({
         partysymbol: candidate.partysymbol,
         candidatenamebangla: candidate.candidatenamebangla,
         totalvote: candidate.totalvote
       })
	   ))
  ));
  
  const [totalcenter2] = mergedDataCandidates2nd.map(dataCandidate => dataCandidate.totalcenter);
    console.log(totalcenter2);
   
  const [obtainedcenter2] = mergedDataCandidates2nd.map(dataCandidate => dataCandidate.obtainedcenter);
    console.log(obtainedcenter2);
	const [candidatenamebangla3, candidatenamebangla4] = filtered_array2.map(filtered => filtered.candidatenamebangla);
	console.log(candidatenamebangla3);
	console.log(candidatenamebangla4);

	const [totalvote3, totalvote4] = filtered_array2.map(filtered => filtered.totalvote);
	console.log(totalvote3);
	console.log(totalvote4);

	const [partysymbol3, partysymbol4] = filtered_array2.map(filtered => filtered.partysymbol);
	console.log(partysymbol3);
	console.log(partysymbol4);



	
	
  return (
    <div className="election-widget-container" style={{ width:'980px', background: '#fff' , margin: '0 auto' }}>
      <div className="heading">
         <a href="https://bangla.bdnews24.com/election/city-corporation-vote">
		  {electionnameTitle}
		  </a>
      </div>
	  
	  <div style={{ width: '100%' , margin: '0 0 5px 0' }}>
	    <div style={{ width: '100%', margin: '3px 0' }}>
	       
		   <div className="candidate" style={{ border: '1px solid #ccc', height: '75px' , float: 'left', width: '33%' }}>
		       <div style={{  margin: '0 3px' }}>
		          <div className="candidate-logo" style={{ float: 'left' }}>
				    <img style={{ width: 105, height: 70 }} src={partysymbol1} alt="Nowka Marka" />     
				  </div>
				  <div style={{ textAlign: 'center', float: 'left', padding: '0 0 0 15px' }}>
					  <div className="candidate-name" style={{ color: 'red', fontWeight: 700, padding: '10px 5px', borderBottom: '2px dotted #ddd' }}>  
					  {candidatenamebangla1}
					  </div>
				       <div className="candidate-votecount" style={{color:'red', fontWeight: '700', padding: '5px'}}>  
						{totalvote1}
					   </div>
				  </div>
		       </div>
		    </div>
			
			<div className="candidate" style={{height:'75px',float:'left',width:'34%'}}>
			   <div style={{border: '1px solid #ccc', margin: '0 3px' }}>
			    <div className="candidate-logo" style={{ float:'left', height:'70px'}}></div>
			     <div style={{margin: 'auto',padding:'0 0 0 15px', width:'90%',textAlign:'center'}}>
			      <div className="candidate-name" style={{color:'#666',fontWeight:'1000',padding:'10px 5px', borderBottom:'2px dotted #ddd'}}>
                    Mayoral results from 
                  </div>
				  <div className="candidate-votecount" style={{color:'#666',fontWeight:'1000',padding:'5px'}}>
					 {totalcenter1} centres out of {' '}
					 {obtainedcenter1} centres               
				  </div>
			    </div>
			   </div>
			</div>
			
			<div className="candidate" style={{border:'1px solid #ccc',height:'75px',borderTop: '1px dotted #ccc',float:'left',width:'33%'}}>
			 <div style={{ margin: '0 3px'}}>
			   <div className="candidate-logo" style={{ float:'left' }}>
			     <img style={{ width: 105, height: 70 }} src={partysymbol1} alt="Nowka Marka" />     
			   </div>
                <div style={{textAlign:'center',float:'left',padding:'0 0 0 15px'}}>
				<div className="candidate-name" style={{color:'red',fontWeight:'700',padding:'10px 5px', borderBottom:'2px dotted #ddd'}}> 
						{candidatenamebangla2} 
				</div>
                <div className="candidate-votecount" style={{color:'red',fontWeight:'700',padding:'5px'}}>  
						{totalvote2}
				</div>
			   
			   </div>
			 </div>
			</div>
			
			
	    </div>
	  </div>
	  
	  
	  <div style={{ width: '100%' , margin: '0 0 5px 0' }}>
	    <div style={{ width: '100%', margin: '3px 0' }}>
	       
		   <div className="candidate" style={{ border: '1px solid #ccc', float: 'left', width: '33%' }}>
		       <div style={{  margin: '0px 3px' }}>
		          <div className="candidate-logo" style={{ float:'left', height:'70px'}}>
				    <img style={{ width: 105, height: 70 }} src={partysymbol3} alt="candidate logo" />     
				  </div>
				  <div style={{ textAlign: 'center', float: 'left', padding: '0 0 0 15px' }}>
					  <div className="candidate-name" style={{ color: 'red', fontWeight: 700, padding: '10px 5px', borderBottom: '2px dotted #ddd' }}>  
					  {candidatenamebangla3}
					  </div>
				       <div className="candidate-votecount" style={{color:'red', fontWeight: '700', padding: '5px'}}>  
						{totalvote3}
					   </div>
				  </div>
		       </div>
		    </div>
			
			<div className="candidate" style={{height:'75px',float:'left',width:'34%'}}>
			   <div style={{border: '1px solid #ccc', margin: '0 3px' }}>
			    <div className="candidate-logo" style={{ float:'left', height:'70px'}}></div>
			     <div style={{margin: 'auto',padding:'0 0 0 15px', width:'90%',textAlign:'center'}}>
			      <div className="candidate-name" style={{color:'#666',fontWeight:'1000',padding:'10px 5px', borderBottom:'2px dotted #ddd'}}>
                    Mayoral results from 
                  </div>
				  <div className="candidate-votecount" style={{color:'#666',fontWeight:'1000',padding:'5px'}}>
					 {totalcenter2} centres out of {' '}
					 {obtainedcenter2} centres               
				  </div>
			    </div>
			   </div>
			</div>
			
			<div className="candidate" style={{border:'1px solid #ccc', padding:'0px 0px',borderTop: '1px dotted #ccc',float:'left',width:'33%'}}>
			 <div style={{ margin: '0 3px'}}>
			   <div className="candidate-logo" style={{ float:'left' }}>
			     <img style={{ width: 105, height: 70 }} src={partysymbol4} alt="candidate logo" />     
			   </div>
                <div style={{textAlign:'center',float:'left',padding:'0 0 0 15px'}}>
				<div className="candidate-name" style={{color:'red',fontWeight:'700',padding:'10px 5px', borderBottom:'2px dotted #ddd'}}> 
						{candidatenamebangla4} 
				</div>
                <div className="candidate-votecount" style={{color:'red',fontWeight:'700',padding:'5px'}}>  
						{totalvote4}
				</div>
			   
			   </div>
			 </div>
			</div>
			
			
	    </div>
	  </div>
	  
	  
	  
     
    </div>  
  );
};

export default ElectionResult4;
