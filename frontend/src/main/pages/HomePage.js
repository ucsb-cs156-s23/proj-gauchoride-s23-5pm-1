import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function HomePage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <img src="UCSBLogo.png" style={{width: "150px", display: "inline-block", verticalAlign: "middle", margin:"0px 20px"}} alt="UCSB Logo"></img>
        <h1 style={{display: "inline-block", verticalAlign:"middle"}}>Gauchoride</h1>

        <div style={{margin:"0px 20px", backgroundColor:"#f5f5f5", padding: "20px"}}>
          <h3>
            About this application
          </h3>

          <br></br>
          <p>
            This app is being built by the students of CMPSC 156 at UCSB to assist an effort to provide transportation for UCSB students with mobility issues to be better able to get to and from class.
          </p>

          <p>
            The end goal of this application is to give student's to book rides in a similar fasion to ridesharing applications like Uber and Lyft.
          </p>
        </div>
      </div>
    </BasicLayout>
  )
}