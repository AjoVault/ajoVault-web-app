import React, {useEffect, useState, useRef, useContext} from "react";
import "./modal.css";
import LilacButton from "../Button/LilacButton";
import forwardInbox from "../../assets/forward-inbox.png";
import {Link} from "react-router-dom";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import UserContext from "../../context/userContext";

const CaptureImage = () => {
	const {user} = useContext(UserContext);
	const webcamRef = useRef(null);

	const capture = async () => {
		const imageSrc = webcamRef.current.getScreenshot();
		console.log(imageSrc);

		const formData = {
			userId: user.id,
			email: user.email,
			nin: user.nin,
			bvn: user.bvn,
			base64Image: imageSrc,
			bankCode: user.bankCode,
			externalAcctNo: user.acctNumber,
			occupation: user.occupation,
		};
		console.log(formData);

		try {
			const response = await fetch(
				"https://ajovault.onrender.com/api/add-kyc-data",
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);
			const userDetails = await response.json();

			if (response.ok) {
				if (userDetails.success) {
					console.log(userDetails);
					console.log("Kyc details submitted successfully");
					navigateTo("/register/pin");
				} else {
					console.log("Verification failed");
				}
			} else {
				console.error("Registration failed");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div id="myModal" className="modal ">
				{/* Modal content */}

				<div className="modal-content modal-header">
					<div className="acct customer-div">
						<div className="">
							<h3 className="create">Capture Image</h3>
						</div>
					</div>
					<div className="modal-body">
						<Webcam
							audio={false}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							style={{width: "100%", height: "auto"}}
						/>

						<div className="short-btn">
							<div style={{width: "45%"}}>
								<Link to={"/knowyourcustomer"}>
									<LilacButton
										title="Back"
										color="var(--pink)"
										textColor="black"
										width="100%"
									/>
								</Link>
							</div>
							<div style={{width: "45%"}}>
								<Link to={"/kycsubmitted"}>
									<LilacButton title="Capture" onClick={capture} width="100%" />
								</Link>
							</div>
						</div>
						{/* { img&& <img src={`data:image/jpeg;base64,${capturedFace}`} alt="Captured Face" />} */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CaptureImage;
